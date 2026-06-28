/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Lives outside the Next.js app (the site is `output: "export"`, pure static),
 * so this is the one piece of server code. It validates the contact payload
 * with the SAME zod schema the form uses, then sends the lead through Resend.
 *
 * Required Cloudflare Pages env vars (Settings → Environment variables):
 *   - RESEND_API_KEY  (secret)  — Resend API key
 *   - CONTACT_TO      (optional) — destination mailbox; defaults to info@globaldccorp.com
 *   - CONTACT_FROM    (optional) — verified Resend sender; defaults to web@globaldccorp.com
 *
 * Imports are RELATIVE so Cloudflare's bundler resolves them without the `@/` alias.
 */
import { ContactSchema } from "../../src/lib/contactSchema";
import { buildResendPayload, sendViaResend } from "../../src/lib/contact-mailer";

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

const DEFAULT_TO = "info@globaldccorp.com";
const DEFAULT_FROM = "GDC Web <web@globaldccorp.com>";

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    // Misconfiguration on the server side — never expose details to the client.
    return json({ ok: false, error: "SERVER_NOT_CONFIGURED" }, 500);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "INVALID_JSON" }, 400);
  }

  const payload = raw as Record<string, unknown>;

  // Honeypot — bots fill it, real users never see it. Pretend success.
  if (payload.botcheck) {
    return json({ ok: true }, 200);
  }

  const parsed = ContactSchema.safeParse({
    name: payload.name,
    email: payload.email,
    phone: payload.phone || undefined,
    subject_topic: payload.subject_topic,
    message: payload.message,
  });

  if (!parsed.success) {
    return json({ ok: false, error: "VALIDATION" }, 422);
  }

  const email = buildResendPayload(parsed.data, {
    to: env.CONTACT_TO || DEFAULT_TO,
    from: env.CONTACT_FROM || DEFAULT_FROM,
  });

  const result = await sendViaResend(email, env.RESEND_API_KEY);

  if (!result.ok) {
    return json({ ok: false, error: "SEND_FAILED" }, 502);
  }

  return json({ ok: true }, 200);
}
