import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calculator, 
  Heart, 
  Globe, 
  Languages,
  Plane,
  ArrowLeft
} from "lucide-react";

const subjects = [
  {
    id: "araling-panlipunan",
    name: "Araling Panlipunan",
    icon: Globe,
  },
  {
    id: "filipino",
    name: "Filipino",
    icon: Languages,
  },
  {
    id: "math",
    name: "Math",
    icon: Calculator,
  },
  {
    id: "cle-values",
    name: "CLE Values",
    icon: Heart,
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
  },
];

export default function DestinationSelection() {
  const [, setLocation] = useLocation();

  const handleSubjectClick = (subjectId: string) => {
    setLocation(`/quiz/${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8 safe-area-inset">
      <div className="mb-6">
        <Button
          data-testid="button-back-select"
          onClick={() => setLocation("/")}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center w-full max-w-md mx-auto">
        <div className="text-center mb-8" data-testid="text-heading">
          <div className="relative inline-block mb-4">
            <h1 className="text-4xl font-black text-blue-500 leading-tight" style={{ 
              textShadow: "3px 3px 0px rgba(249, 115, 22, 0.3)",
              WebkitTextStroke: "2px rgba(249, 178, 51, 0.5)"
            }}>
              CHOOSE
            </h1>
            <div className="absolute -right-8 top-2">
              <Plane className="w-6 h-6 text-orange-400 rotate-45" />
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-orange-400 leading-tight mb-1" style={{ 
            textShadow: "2px 2px 0px rgba(59, 130, 246, 0.3)"
          }}>
            YOUR
          </h2>
          
          <h2 className="text-4xl font-black text-blue-500 leading-tight" style={{ 
            textShadow: "3px 3px 0px rgba(249, 115, 22, 0.3)",
            WebkitTextStroke: "2px rgba(249, 178, 51, 0.5)"
          }}>
            DESTINATION
          </h2>
          
          <div className="mt-2 flex items-center justify-center gap-1">
            <div className="w-12 h-0.5 bg-blue-400" />
            <Plane className="w-8 h-8 text-orange-400 -rotate-12" />
            <div className="w-20 h-px border-t-2 border-dashed border-blue-300" />
          </div>
        </div>

        <div className="w-full space-y-4 flex-1">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Button
                key={subject.id}
                data-testid={`button-subject-${subject.id}`}
                onClick={() => handleSubjectClick(subject.id)}
                className="w-full bg-blue-500 text-white rounded-2xl shadow-md flex items-center gap-4 justify-start"
                size="lg"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="bg-white/20 rounded-full p-3">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-bold">{subject.name}</span>
              </Button>
            );
          })}
        </div>

        <div className="mt-8 w-full max-w-xs flex gap-3">
          <Button
            data-testid="button-view-history"
            onClick={() => setLocation("/history")}
            variant="outline"
            className="flex-1 font-bold rounded-2xl border-2 border-orange-400 text-orange-600 bg-white shadow-md"
            size="lg"
          >
            History
          </Button>
        </div>
      </div>
    </div>
  );
}
