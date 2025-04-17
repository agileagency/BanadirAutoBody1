import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

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
    } catch (error) {
      // If validation error, return formatted error message
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
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
    } catch (error) {
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while retrieving the contact submission"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
