import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  questionText: text("question_text").notNull(),
  answers: jsonb("answers").notNull().$type<Array<{ text: string; correct: boolean }>>(),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;

export const quizSessions = pgTable("quiz_sessions", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  score: integer("score"),
  totalQuestions: integer("total_questions").notNull(),
});

export const insertQuizSessionSchema = createInsertSchema(quizSessions).omit({
  id: true,
  startedAt: true,
});

export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;
export type QuizSession = typeof quizSessions.$inferSelect;

export const userAnswers = pgTable("user_answers", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull().references(() => quizSessions.id),
  questionId: integer("question_id").notNull().references(() => questions.id),
  selectedAnswerIndex: integer("selected_answer_index").notNull(),
  isCorrect: boolean("is_correct").notNull(),
});

export const insertUserAnswerSchema = createInsertSchema(userAnswers).omit({
  id: true,
});

export type InsertUserAnswer = z.infer<typeof insertUserAnswerSchema>;
export type UserAnswer = typeof userAnswers.$inferSelect;
