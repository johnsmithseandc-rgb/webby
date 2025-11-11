import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Calendar, Target } from "lucide-react";
import type { QuizSession } from "@shared/schema";
import { format } from "date-fns";

export default function History() {
  const [, setLocation] = useLocation();

  const { data: sessions, isLoading } = useQuery<QuizSession[]>({
    queryKey: ["/api/quiz/history"],
  });

  const subjectNames: Record<string, string> = {
    "araling-panlipunan": "Araling Panlipunan",
    "filipino": "Filipino",
    "math": "Math",
    "cle-values": "CLE Values",
    "english": "English",
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getSubjectStats = () => {
    if (!sessions) return [];
    
    const stats = new Map<string, { total: number; totalScore: number; attempts: number }>();
    
    sessions.forEach(session => {
      if (session.completedAt && session.score !== null) {
        const current = stats.get(session.subject) || { total: 0, totalScore: 0, attempts: 0 };
        stats.set(session.subject, {
          total: current.total + session.totalQuestions,
          totalScore: current.totalScore + session.score,
          attempts: current.attempts + 1,
        });
      }
    });

    return Array.from(stats.entries()).map(([subject, data]) => ({
      subject,
      name: subjectNames[subject],
      averageScore: Math.round((data.totalScore / data.total) * 100),
      attempts: data.attempts,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">Loading history...</div>
        </div>
      </div>
    );
  }

  const completedSessions = sessions?.filter(s => s.completedAt) || [];
  const subjectStats = getSubjectStats();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="safe-top px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/select")}
            data-testid="button-back-history"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800" data-testid="text-history-title">
            Quiz History
          </h1>
          <div className="w-10" />
        </div>

        {subjectStats.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Performance by Subject</h2>
            <div className="grid grid-cols-1 gap-3">
              {subjectStats.map((stat) => (
                <div
                  key={stat.subject}
                  className="bg-white rounded-xl shadow-md p-4"
                  data-testid={`stat-${stat.subject}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{stat.name}</h3>
                      <p className="text-sm text-gray-600">{stat.attempts} attempt{stat.attempts !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{stat.averageScore}%</div>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 px-6 pb-6">
        {completedSessions.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-600 mb-2">No quiz history yet</h2>
            <p className="text-gray-500 mb-6">Complete a quiz to see your history here!</p>
            <Button onClick={() => setLocation("/select")} data-testid="button-start-first-quiz">
              Start Your First Quiz
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Quizzes</h2>
            <div className="space-y-3">
              {completedSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-xl shadow-md p-4 hover-elevate cursor-pointer"
                  onClick={() => setLocation(`/results/${session.id}`)}
                  data-testid={`session-${session.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {subjectNames[session.subject]}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {session.completedAt && format(new Date(session.completedAt), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(session.score || 0, session.totalQuestions)}`}>
                        {session.score}/{session.totalQuestions}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Target className="h-3 w-3" />
                        <span>
                          {Math.round(((session.score || 0) / session.totalQuestions) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
