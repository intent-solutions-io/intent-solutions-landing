import { initializeApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/v2";
import { z } from "zod";
import {
  saveContactSubmission,
  savePartnerInquiry,
  saveSurveySubmission,
  markEmailSent,
} from "./services/firestore";
import {
  sendContactThankYou,
  sendLeadNotification,
  sendPartnerNotification,
  resendApiKey,
  resendFromEmail,
} from "./services/email";

// Initialize Firebase Admin
initializeApp();

// Validation schemas
const contactSchema = z.object({
  email: z.string().email(),
  teamSize: z.enum(["solo", "small-team", "department", "enterprise"]),
  discord: z.string().optional(),
  whatsapp: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  xHandle: z.string().optional(),
  businessName: z.string().optional(),
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
      logger.info("Contact form submission", { email: data.email, teamSize: data.teamSize });

      const contactMethods = {
        discord: data.discord,
        whatsapp: data.whatsapp,
        phone: data.phone,
        linkedin: data.linkedin,
        xHandle: data.xHandle,
      };

      // Save to Firestore FIRST
      const docId = await saveContactSubmission({
        email: data.email,
        teamSize: data.teamSize,
        businessName: data.businessName,
        contactMethods,
        source: req.headers.referer as string || "direct",
        userAgent: req.headers["user-agent"] as string,
      });

      logger.info("Saved contact submission", { docId });

      // Send thank you email
      if (data.email) {
        const emailId = await sendContactThankYou(data.email, data.teamSize);
        if (emailId) {
          await markEmailSent(docId, "thankYou");
        }
      }

      // Send notification to owner
      const notifId = await sendLeadNotification({
        email: data.email,
        teamSize: data.teamSize,
        contactMethods,
        businessName: data.businessName,
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
      logger.error("Contact submission failed", { error });
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
