import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizSessionSchema, insertUserAnswerSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/questions/:subject", async (req, res) => {
    try {
      const { subject } = req.params;
      const questions = await storage.getQuestionsBySubject(subject);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/quiz/start", async (req, res) => {
    try {
      const validatedData = insertQuizSessionSchema.parse(req.body);
      const session = await storage.createQuizSession(validatedData);
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid quiz session data" });
    }
  });

  app.post("/api/quiz/:sessionId/answer", async (req, res) => {
    try {
      const validatedData = insertUserAnswerSchema.parse(req.body);
      const answer = await storage.createUserAnswer(validatedData);
      res.json(answer);
    } catch (error) {
      res.status(400).json({ error: "Invalid answer data" });
    }
  });

  app.put("/api/quiz/:sessionId/complete", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      const { score } = req.body;
      const session = await storage.updateQuizSession(sessionId, {
        completedAt: new Date(),
        score,
      });
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Failed to complete quiz" });
    }
  });

  app.get("/api/quiz/:sessionId", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      const session = await storage.getQuizSession(sessionId);
      const answers = await storage.getUserAnswersBySession(sessionId);
      res.json({ session, answers });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz session" });
    }
  });

  app.get("/api/quiz/history", async (req, res) => {
    try {
      const sessions = await storage.getAllQuizSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
