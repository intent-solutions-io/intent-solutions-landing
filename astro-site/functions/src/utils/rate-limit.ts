import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { logger } from "firebase-functions/v2";

const RATE_LIMIT_COLLECTION = "rateLimits";

// Max 3 submissions per IP per hour
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * IP-based rate limiter using Firestore.
 * Returns true if the request should be BLOCKED.
 */
export async function isRateLimited(ip: string): Promise<boolean> {
  const db = getFirestore();
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const docId = ip.replace(/[./]/g, "_"); // Firestore-safe key

  const ref = db.collection(RATE_LIMIT_COLLECTION).doc(docId);

  try {
    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.data();
      // Filter to timestamps within the current window
      const timestamps: number[] = (data?.timestamps ?? []).filter(
        (t: number) => t > windowStart
      );

      if (timestamps.length >= MAX_REQUESTS) {
        logger.warn("Rate limit exceeded", { ip: docId, count: timestamps.length });
        return true; // blocked
      }

      // Record this request
      timestamps.push(now);
      tx.set(ref, {
        timestamps,
        lastRequest: Timestamp.now(),
        ip,
      });

      return false; // allowed
    });

    return result;
  } catch (error) {
    // If rate limiting fails, allow the request (fail open)
    // but log it so we can investigate
    logger.error("Rate limit check failed, allowing request", { ip: docId, error });
    return false;
  }
}
