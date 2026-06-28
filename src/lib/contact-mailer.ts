import type { ContactFormData } from "./contactSchema";

/**
 * Shared contact-email logic, framework-agnostic and dependency-free so the
 * same code runs inside the Cloudflare Pages Function (`functions/api/contact.ts`)
 * and stays unit-testable with an injected `fetch`.
 *
 * Imports use RELATIVE paths (not the `@/` alias) on purpose: the Pages Function
 * bundler resolves relative imports reliably, while the tsconfig path alias is
 * not guaranteed there.
 */

/** JSON body for Resend's `POST /emails` endpoint (snake_case `reply_to`). */
export interface ResendEmailPayload {
  from: string;
  to: string[];
  subject: string;
  text: string;
  reply_to: string;
}

export interface BuildPayloadOptions {
  /** Destination mailbox that receives the lead (e.g. info@globaldccorp.com). */
  to: string;
  /** Verified Resend sender, e.g. "GDC Web <web@globaldccorp.com>". */
  from: string;
}

/** Turn validated form data into a Resend payload. Pure — easy to test. */
export function buildResendPayload(
  data: ContactFormData,
  { to, from }: BuildPayloadOptions,
): ResendEmailPayload {
  const bodyLines = [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Teléfono: ${data.phone}` : null,
    `Tipo de consulta: ${data.subject_topic}`,
    "",
    "Mensaje:",
    data.message,
  ].filter((line): line is string => line !== null);

  return {
    from,
    to: [to],
    subject: `Consulta web — ${data.subject_topic}`,
    text: bodyLines.join("\n"),
    // Replies land in the visitor's inbox, not in the no-reply sender.
    reply_to: data.email,
  };
}

export type SendResult = { ok: true; id: string } | { ok: false; error: string };

/**
 * Deliver the email through Resend's REST API. `fetchImpl` is injectable so
 * tests run without network access and the Workers runtime uses its global fetch.
 */
export async function sendViaResend(
  payload: ResendEmailPayload,
  apiKey: string,
  fetchImpl: typeof fetch = fetch,
): Promise<SendResult> {
  let res: Response;
  try {
    res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: "NETWORK_ERROR" };
  }

  const body = (await res.json().catch(() => null)) as
    | { data?: { id?: string } | null; error?: { message?: string } | null }
    | null;

  if (res.ok && body?.data?.id) {
    return { ok: true, id: body.data.id };
  }
  return { ok: false, error: body?.error?.message ?? `HTTP ${res.status}` };
}
