import { Timestamp } from "firebase-admin/firestore";

export interface ContactSubmission {
  id?: string;
  email: string;
  teamSize: "solo" | "small-team" | "department" | "enterprise";
  businessName?: string;
  contactMethods: {
    discord?: string;
    whatsapp?: string;
    phone?: string;
    linkedin?: string;
    xHandle?: string;
  };
  formType: "contact";
  status: "new" | "contacted" | "converted" | "closed";
  createdAt: Timestamp;
  emailsSent: {
    thankYou?: Timestamp;
    leadNotification?: Timestamp;
  };
  source?: string;
  userAgent?: string;
}

export interface EnhancedContactSubmission {
  id?: string;
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  interest: "consulting" | "learn" | "colab" | "other";
  projectType?: "ai-ml" | "workflow-automation" | "gcp" | "strategy";
  budget?: "under-5k" | "5k-15k" | "15k-50k" | "50k-plus" | "discuss";
  timeline?: "immediate" | "this-month" | "this-quarter" | "exploring";
  formType: "enhanced-contact";
  status: "new" | "contacted" | "converted" | "closed";
  createdAt: Timestamp;
  emailsSent: {
    thankYou?: Timestamp;
    leadNotification?: Timestamp;
  };
  source?: string;
  userAgent?: string;
}

export interface PartnerInquiry {
  id?: string;
  email: string;
  companyName: string;
  contactName: string;
  interest: "exploring" | "distribution-partner" | "direct-client" | "learn-more";
  message?: string;
  formType: "partner-inquiry";
  status: "new" | "contacted" | "converted" | "closed";
  createdAt: Timestamp;
  emailsSent: {
    partnerNotification?: Timestamp;
  };
  source?: string;
  userAgent?: string;
}

export type FormSubmission = ContactSubmission | EnhancedContactSubmission | PartnerInquiry;

export { LearnIntake, LearnAnalysis, LearnApproval, LearnIntakeInput, SlackActionPayload } from "./learn";
