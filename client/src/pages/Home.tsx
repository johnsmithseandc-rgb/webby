import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-6 py-12 safe-area-inset">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className="relative mb-8">
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-primary via-orange-400 to-orange-500 flex items-center justify-center shadow-2xl">
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-400 animate-pulse" />
            <div className="absolute top-8 -right-4 w-4 h-4 rounded-full bg-blue-300" />
            <div className="absolute -bottom-1 right-12 w-5 h-5 rounded-full bg-blue-400" />
            <div className="absolute top-4 -left-3 w-4 h-4 rounded-full bg-blue-300 animate-pulse" style={{ animationDelay: "0.5s" }} />
            
            <div className="flex flex-col items-center">
              <div className="text-white font-black text-5xl leading-none tracking-tight mb-1" style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.2)" }}>
                QUIZ
              </div>
              <div className="text-white font-black text-5xl leading-none tracking-tight" style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.2)" }}>
                POP!
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <Lightbulb className="w-9 h-9 text-white fill-white" />
          </div>
        </div>

        <div className="mt-12 w-full space-y-4 max-w-xs">
          <Button
            data-testid="button-start"
            onClick={() => setLocation("/select")}
            className="w-full font-bold rounded-full bg-primary text-primary-foreground shadow-lg"
            size="lg"
          >
            Start
          </Button>
          
          <Button
            data-testid="button-about"
            onClick={() => setLocation("/about")}
            variant="outline"
            className="w-full font-bold rounded-full border-2 border-primary text-primary"
            size="lg"
          >
            About us
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-block px-4 py-2 bg-white border border-foreground/20 rounded-md shadow-sm" data-testid="text-credits">
          <p className="text-sm font-medium text-foreground">Made by Divas</p>
        </div>
      </div>
    </div>
  );
}
