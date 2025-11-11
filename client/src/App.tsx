import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import DestinationSelection from "@/pages/DestinationSelection";
import AboutUs from "@/pages/AboutUs";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import History from "@/pages/History";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/select" component={DestinationSelection} />
      <Route path="/about" component={AboutUs} />
      <Route path="/quiz/:subject" component={Quiz} />
      <Route path="/results/:sessionId" component={Results} />
      <Route path="/history" component={History} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
