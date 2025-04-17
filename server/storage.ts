import { users, type User, type InsertUser, contactSubmissions, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submission methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmissionById(id: number): Promise<ContactSubmission | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private userCurrentId: number;
  private contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact submission methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id,
      createdAt 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
  
  async getContactSubmissionById(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }
}

export const storage = new MemStorage();
