import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDiaryEntrySchema, insertMemoSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Diary entries routes
  app.get("/api/diary-entries", async (req, res) => {
    try {
      const entries = await storage.getAllDiaryEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch diary entries" });
    }
  });

  app.get("/api/diary-entries/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const entries = await storage.searchDiaryEntries(query);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to search diary entries" });
    }
  });

  app.get("/api/diary-entries/:id", async (req, res) => {
    try {
      const entry = await storage.getDiaryEntry(req.params.id);
      if (!entry) {
        return res.status(404).json({ message: "Diary entry not found" });
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch diary entry" });
    }
  });

  app.post("/api/diary-entries", async (req, res) => {
    try {
      const validatedData = insertDiaryEntrySchema.parse(req.body);
      const entry = await storage.createDiaryEntry(validatedData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create diary entry" });
    }
  });

  app.patch("/api/diary-entries/:id", async (req, res) => {
    try {
      const validatedData = insertDiaryEntrySchema.partial().parse(req.body);
      const entry = await storage.updateDiaryEntry(req.params.id, validatedData);
      if (!entry) {
        return res.status(404).json({ message: "Diary entry not found" });
      }
      res.json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update diary entry" });
    }
  });

  app.delete("/api/diary-entries/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteDiaryEntry(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Diary entry not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete diary entry" });
    }
  });

  // Memos routes
  app.get("/api/memos", async (req, res) => {
    try {
      const memos = await storage.getAllMemos();
      res.json(memos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch memos" });
    }
  });

  app.get("/api/memos/:id", async (req, res) => {
    try {
      const memo = await storage.getMemo(req.params.id);
      if (!memo) {
        return res.status(404).json({ message: "Memo not found" });
      }
      res.json(memo);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch memo" });
    }
  });

  app.post("/api/memos", async (req, res) => {
    try {
      const validatedData = insertMemoSchema.parse(req.body);
      const memo = await storage.createMemo(validatedData);
      res.status(201).json(memo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create memo" });
    }
  });

  app.patch("/api/memos/:id", async (req, res) => {
    try {
      const validatedData = insertMemoSchema.partial().parse(req.body);
      const memo = await storage.updateMemo(req.params.id, validatedData);
      if (!memo) {
        return res.status(404).json({ message: "Memo not found" });
      }
      res.json(memo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update memo" });
    }
  });

  app.delete("/api/memos/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMemo(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Memo not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete memo" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
