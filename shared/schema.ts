import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact form submission schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  vehicle: text("vehicle").notNull(),
  message: text("message"),
  insuranceHelp: boolean("insurance_help").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // Banadir Main Integration
  syncedWithMain: boolean("synced_with_main").default(false),
  mainSystemId: text("main_system_id")
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
  syncedWithMain: true,
  mainSystemId: true
});

// Users table with Banadir Main integration
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  // Banadir Main Integration
  mainUserId: text("main_user_id"),
  mainSystemToken: text("main_system_token"),
  mainSystemTokenExpiry: timestamp("main_system_token_expiry"),
  isMainSystemLinked: boolean("is_main_system_linked").default(false)
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Banadir Main Appointments
export const mainAppointments = pgTable("main_appointments", {
  id: serial("id").primaryKey(),
  mainAppointmentId: text("main_appointment_id").notNull().unique(),
  userId: integer("user_id").references(() => users.id),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  serviceType: text("service_type").notNull(),
  vehicleInfo: jsonb("vehicle_info"),
  notes: text("notes"),
  status: text("status").default("pending"),
  lastSynced: timestamp("last_synced").defaultNow()
});

export const insertMainAppointmentSchema = createInsertSchema(mainAppointments).omit({
  id: true,
  lastSynced: true
});

// Banadir Main Service History
export const mainServiceHistory = pgTable("main_service_history", {
  id: serial("id").primaryKey(),
  mainServiceId: text("main_service_id").notNull().unique(),
  userId: integer("user_id").references(() => users.id),
  vehicleInfo: jsonb("vehicle_info").notNull(),
  serviceDate: timestamp("service_date").notNull(),
  serviceDetails: jsonb("service_details"),
  cost: integer("cost"),
  lastSynced: timestamp("last_synced").defaultNow()
});

export const insertMainServiceHistorySchema = createInsertSchema(mainServiceHistory).omit({
  id: true,
  lastSynced: true
});

// Banadir Main System Configuration
export const systemConfig = pgTable("system_config", {
  id: serial("id").primaryKey(),
  configKey: text("config_key").notNull().unique(),
  configValue: text("config_value"),
  lastUpdated: timestamp("last_updated").defaultNow().notNull()
});

// Types
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMainAppointment = z.infer<typeof insertMainAppointmentSchema>;
export type MainAppointment = typeof mainAppointments.$inferSelect;

export type InsertMainServiceHistory = z.infer<typeof insertMainServiceHistorySchema>;
export type MainServiceHistory = typeof mainServiceHistory.$inferSelect;

export type SystemConfig = typeof systemConfig.$inferSelect;
