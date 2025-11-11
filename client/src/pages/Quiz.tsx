import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Timer } from "lucide-react";
import type { Question, QuizSession } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Quiz() {
  const [, params] = useRoute("/quiz/:subject");
  const [, setLocation] = useLocation();
  const subject = params?.subject || "";
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, number>>(new Map());
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const { data: questions, isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions", subject],
    enabled: !!subject,
  });

  const startQuizMutation = useMutation({
    mutationFn: async (data: { subject: string; totalQuestions: number }) => {
      const res = await apiRequest("POST", "/api/quiz/start", data);
      return await res.json() as QuizSession;
    },
    onSuccess: (session) => {
      setSessionId(session.id);
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (data: {
      sessionId: number;
      questionId: number;
      selectedAnswerIndex: number;
      isCorrect: boolean;
    }) => {
      const res = await apiRequest("POST", `/api/quiz/${data.sessionId}/answer`, data);
      return await res.json();
    },
  });

  const completeQuizMutation = useMutation({
    mutationFn: async (data: { sessionId: number; score: number }) => {
      const res = await apiRequest("PUT", `/api/quiz/${data.sessionId}/complete`, { score: data.score });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quiz/history"] });
      setLocation(`/results/${sessionId}`);
    },
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  useEffect(() => {
    if (questions && questions.length > 0 && !sessionId && !startQuizMutation.isPending) {
      startQuizMutation.mutate({
        subject,
        totalQuestions: questions.length,
      });
    }
  }, [questions, sessionId, startQuizMutation]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentQuestion) {
      handleNext();
    }
  }, [timeLeft, currentQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!currentQuestion) return;
    setSelectedAnswers(new Map(selectedAnswers).set(currentQuestion.id, answerIndex));
  };

  const handleNext = async () => {
    if (!currentQuestion || !sessionId) return;

    const selectedAnswerIndex = selectedAnswers.get(currentQuestion.id);
    if (selectedAnswerIndex !== undefined) {
      const isCorrect = currentQuestion.answers[selectedAnswerIndex]?.correct || false;
      await submitAnswerMutation.mutateAsync({
        sessionId,
        questionId: currentQuestion.id,
        selectedAnswerIndex,
        isCorrect,
      });
    }

    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      const score = Array.from(selectedAnswers.entries()).reduce((acc, [questionId, answerIndex]) => {
        const question = questions?.find(q => q.id === questionId);
        if (question && question.answers[answerIndex]?.correct) {
          return acc + 1;
        }
        return acc;
      }, 0);
      
      await completeQuizMutation.mutateAsync({ sessionId, score });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">Loading quiz...</div>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No questions available</h2>
          <p className="text-gray-600 mb-6">This subject doesn't have any questions yet.</p>
          <Button onClick={() => setLocation("/select")} data-testid="button-back-to-select">
            Back to Selection
          </Button>
        </div>
      </div>
    );
  }

  const subjectNames: Record<string, string> = {
    "araling-panlipunan": "Araling Panlipunan",
    "filipino": "Filipino",
    "math": "Math",
    "cle-values": "CLE Values",
    "english": "English",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="safe-top px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/select")}
            data-testid="button-back-quiz"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-orange-600">
            <Timer className="h-5 w-5" />
            <span className="text-lg font-bold" data-testid="text-timer">{timeLeft}s</span>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-xl font-bold text-center text-gray-800 mb-2" data-testid="text-subject-name">
            {subjectNames[subject]}
          </h1>
          <p className="text-center text-sm text-gray-600" data-testid="text-question-progress">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <Progress value={progress} className="h-2 mb-6" data-testid="progress-quiz" />
      </div>

      <div className="flex-1 px-6 pb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6" data-testid="text-question">
            {currentQuestion?.questionText}
          </h2>

          <div className="space-y-3">
            {currentQuestion?.answers.map((answer, index) => {
              const isSelected = selectedAnswers.get(currentQuestion.id) === index;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                  }`}
                  data-testid={`button-answer-${index}`}
                >
                  <span className="text-base text-gray-800">{answer.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={handleNext}
          disabled={!selectedAnswers.has(currentQuestion?.id || 0)}
          data-testid="button-next-question"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </div>
    </div>
  );
}
