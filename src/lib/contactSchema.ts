import { z } from "zod";

/**
 * Shared validation schema for the contact form. Used client-side by
 * ContactForm to validate fields on blur and on submit before opening
 * the wa.me deep link.
 *
 * Error messages are STABLE CODES, not localized strings. The form maps them
 * to the current locale via dict.contact.form.errors. This keeps the schema
 * locale-agnostic and the UI fully bilingual.
 */

export const ContactErrorCode = {
  REQUIRED: "REQUIRED",
  INVALID_EMAIL: "INVALID_EMAIL",
  TOO_SHORT: "TOO_SHORT",
  TOO_LONG: "TOO_LONG",
} as const;

export type ContactErrorCode =
  (typeof ContactErrorCode)[keyof typeof ContactErrorCode];

export const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, ContactErrorCode.REQUIRED)
    .max(120, ContactErrorCode.TOO_LONG),
  email: z
    .string()
    .trim()
    .min(1, ContactErrorCode.REQUIRED)
    .email(ContactErrorCode.INVALID_EMAIL)
    .max(200, ContactErrorCode.TOO_LONG),
  phone: z
    .string()
    .trim()
    .max(60, ContactErrorCode.TOO_LONG)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  subject_topic: z
    .string()
    .trim()
    .min(1, ContactErrorCode.REQUIRED)
    .max(200, ContactErrorCode.TOO_LONG),
  message: z
    .string()
    .trim()
    .min(10, ContactErrorCode.TOO_SHORT)
    .max(5000, ContactErrorCode.TOO_LONG),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export type ContactFieldName = keyof ContactFormData;

export type ContactFieldErrors = Partial<Record<ContactFieldName, ContactErrorCode>>;

/**
 * Convert a Zod parse failure into a flat `{ field: code }` map for the form.
 * If multiple issues touch the same field, only the first is kept.
 */
export function extractFieldErrors(
  issues: z.ZodIssue[],
): ContactFieldErrors {
  const out: ContactFieldErrors = {};
  for (const issue of issues) {
    const field = issue.path[0] as ContactFieldName | undefined;
    if (!field || out[field]) continue;
    out[field] = issue.message as ContactErrorCode;
  }
  return out;
}
