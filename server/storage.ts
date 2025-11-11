import { 
  type User, 
  type InsertUser,
  type Question,
  type InsertQuestion,
  type QuizSession,
  type InsertQuizSession,
  type UserAnswer,
  type InsertUserAnswer,
  users,
  questions,
  quizSessions,
  userAnswers
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getQuestionsBySubject(subject: string): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  createQuizSession(session: InsertQuizSession): Promise<QuizSession>;
  updateQuizSession(id: number, data: Partial<QuizSession>): Promise<QuizSession>;
  getQuizSession(id: number): Promise<QuizSession | undefined>;
  getAllQuizSessions(): Promise<QuizSession[]>;
  
  createUserAnswer(answer: InsertUserAnswer): Promise<UserAnswer>;
  getUserAnswersBySession(sessionId: number): Promise<UserAnswer[]>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getQuestionsBySubject(subject: string): Promise<Question[]> {
    return await db.select().from(questions).where(eq(questions.subject, subject));
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const result = await db.insert(questions).values(question).returning();
    return result[0];
  }

  async createQuizSession(session: InsertQuizSession): Promise<QuizSession> {
    const result = await db.insert(quizSessions).values(session).returning();
    return result[0];
  }

  async updateQuizSession(id: number, data: Partial<QuizSession>): Promise<QuizSession> {
    const result = await db.update(quizSessions)
      .set(data)
      .where(eq(quizSessions.id, id))
      .returning();
    return result[0];
  }

  async getQuizSession(id: number): Promise<QuizSession | undefined> {
    const result = await db.select().from(quizSessions).where(eq(quizSessions.id, id));
    return result[0];
  }

  async getAllQuizSessions(): Promise<QuizSession[]> {
    return await db.select().from(quizSessions).orderBy(desc(quizSessions.startedAt));
  }

  async createUserAnswer(answer: InsertUserAnswer): Promise<UserAnswer> {
    const result = await db.insert(userAnswers).values(answer).returning();
    return result[0];
  }

  async getUserAnswersBySession(sessionId: number): Promise<UserAnswer[]> {
    return await db.select().from(userAnswers).where(eq(userAnswers.sessionId, sessionId));
  }
}

export const storage = new DbStorage();
