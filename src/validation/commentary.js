import { z } from "zod";

/**
 * Schema for validating commentary list query parameters
 * Validates optional limit as coerced positive integer with max 100
 */
export const listCommentaryQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

/**
 * Schema for creating a new commentary entry
 * Validates minute (non-negative int), sequence, period, eventType, actor, team,
 * message (required), metadata (record), and tags (array of strings)
 */
export const createCommentarySchema = z.object({
  minutes: z.number().int().nonnegative(),
  sequence: z.number().int().optional(),
  period: z.string(),
  eventType: z.string().optional(),
  actor: z.string().optional(),
  team: z.string().optional(),
  message: z.string().min(1),
  metadata: z.record(z.string(), z.any()).optional(),
  tags: z.array(z.string()).optional(),
});
