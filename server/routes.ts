import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { 
  initializeBanadirMain, 
  runCompleteSync, 
  syncContactSubmissions, 
  fetchAppointments 
} from "./banadirMain";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the incoming request body against our schema
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store the contact submission in our storage
      const submission = await storage.createContactSubmission(validatedData);
      
      // Return success response
      return res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        data: submission
      });
    } catch (error: unknown) {
      // If validation error, return formatted error message
      if (error instanceof Error && error.name === "ZodError") {
        const validationError = fromZodError(error as any);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.message
        });
      }
      
      // For other errors, return a generic error message
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });
  
  // Get all contact submissions (could be used in an admin dashboard)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.status(200).json({
        success: true,
        data: submissions
      });
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while retrieving contact submissions"
      });
    }
  });
  
  // Get a specific contact submission by ID
  app.get("/api/contact/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID format"
        });
      }
      
      const submission = await storage.getContactSubmissionById(id);
      
      if (!submission) {
        return res.status(404).json({
          success: false,
          message: "Contact submission not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: submission
      });
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while retrieving the contact submission"
      });
    }
  });

  // Banadir Main Integration API Endpoints
  
  // Initialize the Banadir Main integration
  app.post("/api/banadir-main/init", async (req, res) => {
    try {
      await initializeBanadirMain();
      return res.status(200).json({
        success: true,
        message: "Banadir Main integration initialized successfully"
      });
    } catch (error: unknown) {
      console.error("Error initializing Banadir Main:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while initializing Banadir Main integration"
      });
    }
  });
  
  // Manual sync endpoint for contact submissions
  app.post("/api/banadir-main/sync/contacts", async (req, res) => {
    try {
      const syncCount = await syncContactSubmissions();
      return res.status(200).json({
        success: true,
        message: `Synchronized ${syncCount} contact submissions with Banadir Main`,
        count: syncCount
      });
    } catch (error: unknown) {
      console.error("Error syncing contacts with Banadir Main:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while syncing contacts with Banadir Main"
      });
    }
  });
  
  // Manual fetch endpoint for appointments
  app.post("/api/banadir-main/sync/appointments", async (req, res) => {
    try {
      const fetchCount = await fetchAppointments();
      return res.status(200).json({
        success: true,
        message: `Fetched ${fetchCount} appointments from Banadir Main`,
        count: fetchCount
      });
    } catch (error: unknown) {
      console.error("Error fetching appointments from Banadir Main:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching appointments from Banadir Main"
      });
    }
  });
  
  // Run a complete sync with Banadir Main
  app.post("/api/banadir-main/sync/all", async (req, res) => {
    try {
      const results = await runCompleteSync();
      return res.status(200).json({
        success: true,
        message: "Complete sync with Banadir Main completed successfully",
        data: results
      });
    } catch (error: unknown) {
      console.error("Error running complete sync with Banadir Main:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while running complete sync with Banadir Main"
      });
    }
  });

  const httpServer = createServer(app);
  
  // Initialize Banadir Main integration when server starts
  initializeBanadirMain()
    .then(() => console.log("Banadir Main integration initialized"))
    .catch(err => console.error("Failed to initialize Banadir Main integration:", err));

  return httpServer;
}
