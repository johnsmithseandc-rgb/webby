import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, Heart, Sparkles } from "lucide-react";

export default function AboutUs() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8 safe-area-inset">
      <div className="mb-6">
        <Button
          data-testid="button-back-about"
          onClick={() => setLocation("/")}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center w-full max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-orange-400 to-orange-500 flex items-center justify-center shadow-xl">
            <Lightbulb className="w-16 h-16 text-white fill-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-center mb-6 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent" data-testid="text-app-title">
          Quiz Pop!
        </h1>

        <div className="bg-card rounded-2xl p-6 shadow-md border border-card-border w-full space-y-4" data-testid="card-about-info">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Our Mission</h3>
              <p className="text-muted-foreground">
                Making learning fun and accessible for everyone through engaging quizzes and interactive challenges.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-orange-100 rounded-full p-2 mt-1">
              <Heart className="w-5 h-5 text-orange-600 fill-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">What We Offer</h3>
              <p className="text-muted-foreground">
                Quiz Pop! offers quizzes in multiple subjects including Filipino, Math, English, Social Studies, and CLE Values to help you test and improve your knowledge.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Made with Love</h3>
              <p className="text-muted-foreground">
                Created by Divas to bring joy and knowledge to students everywhere.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full">
          <Button
            data-testid="button-get-started"
            onClick={() => setLocation("/select")}
            className="w-full font-bold rounded-full bg-primary text-primary-foreground shadow-lg"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
