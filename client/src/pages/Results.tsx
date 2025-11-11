import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Trophy, Home, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import type { QuizSession, UserAnswer, Question } from "@shared/schema";

export default function Results() {
  const [, params] = useRoute("/results/:sessionId");
  const [, setLocation] = useLocation();
  const sessionId = params?.sessionId ? parseInt(params.sessionId) : null;

  const { data, isLoading } = useQuery<{
    session: QuizSession;
    answers: UserAnswer[];
  }>({
    queryKey: ["/api/quiz", sessionId],
    enabled: !!sessionId,
  });

  const { data: questions } = useQuery<Question[]>({
    queryKey: ["/api/questions", data?.session.subject],
    enabled: !!data?.session.subject,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">Loading results...</div>
        </div>
      </div>
    );
  }

  if (!data || !sessionId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Results not found</h2>
          <Button onClick={() => setLocation("/")} data-testid="button-home">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const { session, answers } = data;
  const percentage = session.totalQuestions > 0 
    ? Math.round((session.score || 0) / session.totalQuestions * 100) 
    : 0;

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 80) return "Excellent work! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Keep practicing! 💪";
    return "Don't give up! 🌟";
  };

  const subjectNames: Record<string, string> = {
    "araling-panlipunan": "Araling Panlipunan",
    "filipino": "Filipino",
    "math": "Math",
    "cle-values": "CLE Values",
    "english": "English",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
            <div className="mb-6">
              <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2" data-testid="text-results-title">
                Quiz Complete!
              </h1>
              <p className="text-lg text-gray-600" data-testid="text-subject">
                {subjectNames[session.subject]}
              </p>
            </div>

            <div className="mb-6">
              <div className="text-6xl font-bold text-primary mb-2" data-testid="text-score">
                {session.score}/{session.totalQuestions}
              </div>
              <div className="text-2xl text-gray-600" data-testid="text-percentage">
                {percentage}%
              </div>
              <p className="text-lg text-gray-700 mt-4" data-testid="text-performance-message">
                {getPerformanceMessage(percentage)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Answer Summary</h2>
            <div className="space-y-3">
              {answers.map((answer, index) => {
                const question = questions?.find(q => q.id === answer.questionId);
                return (
                  <div
                    key={answer.id}
                    className={`p-4 rounded-lg border-2 ${
                      answer.isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                    }`}
                    data-testid={`answer-summary-${index}`}
                  >
                    <div className="flex items-start gap-3">
                      {answer.isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-2">
                          Question {index + 1}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          {question?.questionText}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Your answer: </span>
                          <span className={answer.isCorrect ? "text-green-700" : "text-red-700"}>
                            {question?.answers[answer.selectedAnswerIndex]?.text}
                          </span>
                        </p>
                        {!answer.isCorrect && (
                          <p className="text-sm mt-1">
                            <span className="font-medium">Correct answer: </span>
                            <span className="text-green-700">
                              {question?.answers.find(a => a.correct)?.text}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setLocation("/")}
              data-testid="button-home-results"
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => setLocation(`/quiz/${session.subject}`)}
              data-testid="button-retry"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
