import { type User, type InsertUser, type DiaryEntry, type InsertDiaryEntry, type Memo, type InsertMemo } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Diary entries
  getAllDiaryEntries(): Promise<DiaryEntry[]>;
  getDiaryEntry(id: string): Promise<DiaryEntry | undefined>;
  createDiaryEntry(entry: InsertDiaryEntry): Promise<DiaryEntry>;
  updateDiaryEntry(id: string, entry: Partial<InsertDiaryEntry>): Promise<DiaryEntry | undefined>;
  deleteDiaryEntry(id: string): Promise<boolean>;
  searchDiaryEntries(query: string): Promise<DiaryEntry[]>;
  
  // Memos
  getAllMemos(): Promise<Memo[]>;
  getMemo(id: string): Promise<Memo | undefined>;
  createMemo(memo: InsertMemo): Promise<Memo>;
  updateMemo(id: string, memo: Partial<InsertMemo>): Promise<Memo | undefined>;
  deleteMemo(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private diaryEntries: Map<string, DiaryEntry>;
  private memos: Map<string, Memo>;

  constructor() {
    this.users = new Map();
    this.diaryEntries = new Map();
    this.memos = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Diary entries
  async getAllDiaryEntries(): Promise<DiaryEntry[]> {
    return Array.from(this.diaryEntries.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getDiaryEntry(id: string): Promise<DiaryEntry | undefined> {
    return this.diaryEntries.get(id);
  }

  async createDiaryEntry(insertEntry: InsertDiaryEntry): Promise<DiaryEntry> {
    const id = randomUUID();
    const entry: DiaryEntry = { 
      ...insertEntry, 
      id, 
      createdAt: new Date() 
    };
    this.diaryEntries.set(id, entry);
    return entry;
  }

  async updateDiaryEntry(id: string, updateData: Partial<InsertDiaryEntry>): Promise<DiaryEntry | undefined> {
    const entry = this.diaryEntries.get(id);
    if (!entry) return undefined;
    
    const updatedEntry = { ...entry, ...updateData };
    this.diaryEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  async deleteDiaryEntry(id: string): Promise<boolean> {
    return this.diaryEntries.delete(id);
  }

  async searchDiaryEntries(query: string): Promise<DiaryEntry[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.diaryEntries.values())
      .filter(entry => 
        entry.title.toLowerCase().includes(lowercaseQuery) || 
        entry.content.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Memos
  async getAllMemos(): Promise<Memo[]> {
    return Array.from(this.memos.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getMemo(id: string): Promise<Memo | undefined> {
    return this.memos.get(id);
  }

  async createMemo(insertMemo: InsertMemo): Promise<Memo> {
    const id = randomUUID();
    const memo: Memo = { 
      ...insertMemo, 
      id, 
      createdAt: new Date() 
    };
    this.memos.set(id, memo);
    return memo;
  }

  async updateMemo(id: string, updateData: Partial<InsertMemo>): Promise<Memo | undefined> {
    const memo = this.memos.get(id);
    if (!memo) return undefined;
    
    const updatedMemo = { ...memo, ...updateData };
    this.memos.set(id, updatedMemo);
    return updatedMemo;
  }

  async deleteMemo(id: string): Promise<boolean> {
    return this.memos.delete(id);
  }
}

export const storage = new MemStorage();
