import { describe, expect, it, vi } from "vitest";
import {
  buildResendPayload,
  sendViaResend,
  type ResendEmailPayload,
} from "@/lib/contact-mailer";
import type { ContactFormData } from "@/lib/contactSchema";

const data: ContactFormData = {
  name: "Juan Perez",
  email: "juan@example.com",
  phone: "+34 600 123 456",
  subject_topic: "Cafe de especialidad",
  message: "Me interesa el cafe APROARCA. Necesito cotizacion para 500 kg.",
};

const opts = {
  to: "info@globaldccorp.com",
  from: "GDC Web <web@globaldccorp.com>",
};

describe("buildResendPayload", () => {
  it("sends to the company mailbox and replies to the visitor", () => {
    const payload = buildResendPayload(data, opts);
    expect(payload.to).toEqual(["info@globaldccorp.com"]);
    expect(payload.from).toBe("GDC Web <web@globaldccorp.com>");
    expect(payload.reply_to).toBe("juan@example.com");
  });

  it("puts the consultation topic in the subject", () => {
    const payload = buildResendPayload(data, opts);
    expect(payload.subject).toContain("Cafe de especialidad");
  });

  it("includes name, email and message in the body", () => {
    const payload = buildResendPayload(data, opts);
    expect(payload.text).toContain("Juan Perez");
    expect(payload.text).toContain("juan@example.com");
    expect(payload.text).toContain("APROARCA");
  });

  it("includes the phone line when present", () => {
    const payload = buildResendPayload(data, opts);
    expect(payload.text).toContain("+34 600 123 456");
  });

  it("omits the phone line when absent", () => {
    const { phone, ...withoutPhone } = data;
    void phone;
    const payload = buildResendPayload(withoutPhone, opts);
    expect(payload.text).not.toMatch(/Tel[eé]fono:/);
  });
});

describe("sendViaResend", () => {
  const payload: ResendEmailPayload = {
    from: opts.from,
    to: [opts.to],
    subject: "Consulta web",
    text: "hola",
    reply_to: "juan@example.com",
  };

  it("returns ok with the email id on a successful response", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: { id: "abc-123" }, error: null }),
    });
    const result = await sendViaResend(payload, "re_test", fetchImpl as unknown as typeof fetch);
    expect(result).toEqual({ ok: true, id: "abc-123" });
  });

  it("calls the Resend endpoint with a Bearer token and JSON payload", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: { id: "abc-123" }, error: null }),
    });
    await sendViaResend(payload, "re_test", fetchImpl as unknown as typeof fetch);
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.method).toBe("POST");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    expect(JSON.parse(init.body)).toMatchObject({ reply_to: "juan@example.com" });
  });

  it("returns an error when Resend responds with a failure", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({ data: null, error: { message: "Invalid recipient" } }),
    });
    const result = await sendViaResend(payload, "re_test", fetchImpl as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("Invalid recipient");
  });
});
