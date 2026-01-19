import { initializeApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/v2";
import { z } from "zod";
import {
  saveEnhancedContactSubmission,
  savePartnerInquiry,
  saveSurveySubmission,
  markEmailSent,
} from "./services/firestore";
import {
  sendEnhancedContactThankYou,
  sendEnhancedLeadNotification,
  sendPartnerNotification,
  resendApiKey,
  resendFromEmail,
} from "./services/email";

// Initialize Firebase Admin
initializeApp();

// Validation schemas
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Please provide more details about your project"),
  company: z.string().optional(),
  phone: z.string().optional(),
  interest: z.enum(["consulting", "learn", "colab", "other"]),
  projectType: z.enum(["ai-ml", "workflow-automation", "gcp", "strategy"]).optional(),
  budget: z.enum(["under-5k", "5k-15k", "15k-50k", "50k-plus", "discuss"]).optional(),
  timeline: z.enum(["immediate", "this-month", "this-quarter", "exploring"]).optional(),
  website: z.string().max(0, "Spam detected").optional(), // Honeypot field
});

const partnerSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  interest: z.enum(["exploring", "distribution-partner", "direct-client", "learn-more"]),
  message: z.string().optional(),
});

// CORS configuration
const corsOrigins = [
  "https://intentsolutions.io",
  "https://www.intentsolutions.io",
  "https://intent-landing-page.web.app",
  "http://localhost:4321",
  "http://localhost:5000",
];

// ============================================
// CONTACT FORM HANDLER
// ============================================
export const submitContact = onRequest(
  {
    cors: corsOrigins,
    region: "us-central1",
    memory: "256MiB",
    timeoutSeconds: 60,
    secrets: [resendApiKey, resendFromEmail],
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const data = contactSchema.parse(req.body);

      // Honeypot check - if website field has content, it's a bot
      if (data.website && data.website.length > 0) {
        logger.warn("Honeypot triggered", { email: data.email });
        // Return success to not alert the bot, but don't save
        res.status(200).json({ success: true, id: "honeypot" });
        return;
      }

      logger.info("Contact form submission", {
        email: data.email,
        interest: data.interest,
        budget: data.budget,
      });

      // Save to Firestore
      const docId = await saveEnhancedContactSubmission({
        name: data.name,
        email: data.email,
        message: data.message,
        company: data.company,
        phone: data.phone,
        interest: data.interest,
        projectType: data.projectType,
        budget: data.budget,
        timeline: data.timeline,
        source: req.headers.referer as string || "direct",
        userAgent: req.headers["user-agent"] as string,
      });

      logger.info("Saved enhanced contact submission", { docId });

      // Send thank you email
      const emailId = await sendEnhancedContactThankYou(
        data.email,
        data.name,
        data.interest
      );
      if (emailId) {
        await markEmailSent(docId, "thankYou");
      }

      // Send notification to owner
      const notifId = await sendEnhancedLeadNotification({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        interest: data.interest,
        projectType: data.projectType,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        docId,
      });
      if (notifId) {
        await markEmailSent(docId, "leadNotification");
      }

      res.status(200).json({ success: true, id: docId });
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn("Contact validation failed", { errors: error.errors });
        res.status(400).json({ error: "Validation failed", details: error.errors });
        return;
      }
      const errMsg = error instanceof Error ? error.message : String(error);
      const errStack = error instanceof Error ? error.stack : undefined;
      logger.error("Contact submission failed", { message: errMsg, stack: errStack });
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ============================================
// PARTNER INQUIRY HANDLER
// ============================================
export const submitPartnerInquiry = onRequest(
  {
    cors: corsOrigins,
    region: "us-central1",
    memory: "256MiB",
    timeoutSeconds: 60,
    secrets: [resendApiKey, resendFromEmail],
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const data = partnerSchema.parse(req.body);
      logger.info("Partner inquiry", { company: data.companyName });

      const docId = await savePartnerInquiry({
        companyName: data.companyName,
        contactName: data.contactName,
        email: data.email,
        interest: data.interest,
        message: data.message,
        source: req.headers.referer as string || "direct",
        userAgent: req.headers["user-agent"] as string,
      });

      logger.info("Saved partner inquiry", { docId });

      const emailId = await sendPartnerNotification({
        companyName: data.companyName,
        contactName: data.contactName,
        email: data.email,
        interest: data.interest,
        message: data.message,
        docId,
      });
      if (emailId) {
        await markEmailSent(docId, "partnerNotification");
      }

      res.status(200).json({ success: true, id: docId });
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn("Partner validation failed", { errors: error.errors });
        res.status(400).json({ error: "Validation failed", details: error.errors });
        return;
      }
      logger.error("Partner inquiry failed", { error });
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ============================================
// SURVEY WEBHOOK HANDLER
// ============================================
export const submitSurvey = onRequest(
  {
    cors: corsOrigins,
    region: "us-central1",
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { email, responses } = req.body;

      if (!email) {
        res.status(200).json({ message: "No email to process" });
        return;
      }

      const docId = await saveSurveySubmission({
        email,
        responses: responses || {},
      });

      logger.info("Saved survey submission", { docId, email });
      res.status(200).json({ success: true, id: docId });
    } catch (error) {
      logger.error("Survey submission failed", { error });
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
