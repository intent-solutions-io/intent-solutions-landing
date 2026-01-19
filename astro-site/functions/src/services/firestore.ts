import { getFirestore, Timestamp } from "firebase-admin/firestore";
import type { ContactSubmission, EnhancedContactSubmission, PartnerInquiry, SurveySubmission } from "../types";

const COLLECTION = "contactSubmissions";

function getDb() {
  return getFirestore();
}

export async function saveContactSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt" | "emailsSent" | "status" | "formType">
): Promise<string> {
  const db = getDb();
  const submission: Omit<ContactSubmission, "id"> = {
    ...data,
    formType: "contact",
    status: "new",
    createdAt: Timestamp.now(),
    emailsSent: {},
  };

  const docRef = await db.collection(COLLECTION).add(submission);
  return docRef.id;
}

export async function saveEnhancedContactSubmission(
  data: Omit<EnhancedContactSubmission, "id" | "createdAt" | "emailsSent" | "status" | "formType">
): Promise<string> {
  const db = getDb();

  // Filter out undefined values for Firestore
  const cleanData: Record<string, unknown> = {
    name: data.name,
    email: data.email,
    message: data.message,
    interest: data.interest,
    formType: "enhanced-contact",
    status: "new",
    createdAt: Timestamp.now(),
    emailsSent: {},
  };

  if (data.company) cleanData.company = data.company;
  if (data.phone) cleanData.phone = data.phone;
  if (data.projectType) cleanData.projectType = data.projectType;
  if (data.budget) cleanData.budget = data.budget;
  if (data.timeline) cleanData.timeline = data.timeline;
  if (data.source) cleanData.source = data.source;
  if (data.userAgent) cleanData.userAgent = data.userAgent;

  const docRef = await db.collection(COLLECTION).add(cleanData);
  return docRef.id;
}

export async function savePartnerInquiry(
  data: Omit<PartnerInquiry, "id" | "createdAt" | "emailsSent" | "status" | "formType">
): Promise<string> {
  const db = getDb();
  const submission: Omit<PartnerInquiry, "id"> = {
    ...data,
    formType: "partner-inquiry",
    status: "new",
    createdAt: Timestamp.now(),
    emailsSent: {},
  };

  const docRef = await db.collection(COLLECTION).add(submission);
  return docRef.id;
}

export async function saveSurveySubmission(
  data: Omit<SurveySubmission, "id" | "createdAt" | "emailsSent" | "formType">
): Promise<string> {
  const db = getDb();
  const submission: Omit<SurveySubmission, "id"> = {
    ...data,
    formType: "survey",
    createdAt: Timestamp.now(),
    emailsSent: {},
  };

  const docRef = await db.collection(COLLECTION).add(submission);
  return docRef.id;
}

export async function markEmailSent(docId: string, emailType: string): Promise<void> {
  const db = getDb();
  await db.collection(COLLECTION).doc(docId).update({
    [`emailsSent.${emailType}`]: Timestamp.now(),
  });
}

export async function updateSubmissionStatus(docId: string, status: string): Promise<void> {
  const db = getDb();
  await db.collection(COLLECTION).doc(docId).update({ status });
}
