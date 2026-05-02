"use client";

import {
  useState,
  useTransition,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import {
  ContactSchema,
  extractFieldErrors,
  type ContactErrorCode,
  type ContactFieldErrors,
  type ContactFieldName,
} from "@/lib/contactSchema";
import { COMPANY } from "@/lib/constants";
import type { Dictionary } from "@/i18n/dictionaries";

interface ContactFormProps {
  dict: Dictionary["contact"]["form"];
}

type ErrorMessageMap = Record<ContactErrorCode, string>;

export default function ContactForm({ dict }: ContactFormProps) {
  const { toast } = useToast();
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [pending, startTransition] = useTransition();

  // dict.errors is { REQUIRED: "...", INVALID_EMAIL: "...", ... }
  const errorMessages = dict.errors as ErrorMessageMap;

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const name = e.currentTarget.name as ContactFieldName;
    const value = e.currentTarget.value;
    validateSingleField(name, value);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    // Clear the error for this field as soon as the user starts typing again
    const name = e.currentTarget.name as ContactFieldName;
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateSingleField = (name: ContactFieldName, value: string) => {
    // Use the schema's per-field shape to validate one field at a time
    const fieldSchema = ContactSchema.shape[name];
    if (!fieldSchema) return;
    const result = fieldSchema.safeParse(value);
    if (result.success) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    } else {
      const code = result.error.issues[0]?.message as ContactErrorCode;
      setFieldErrors((prev) => ({ ...prev, [name]: code }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — bots fill it, real users never see it
    if (formData.get("botcheck")) return;

    const result = ContactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      subject_topic: formData.get("subject_topic"),
      message: formData.get("message"),
    });

    if (!result.success) {
      const errors = extractFieldErrors(result.error.issues);
      setFieldErrors(errors);
      toast.error(dict.error, dict.errorDescription);
      // Move focus to the first invalid field for keyboard users.
      // namedItem can return Element | RadioNodeList | null — only HTMLElement
      // exposes a typed focus() method.
      const firstInvalid = Object.keys(errors)[0] as ContactFieldName | undefined;
      if (firstInvalid) {
        const el = form.elements.namedItem(firstInvalid);
        if (el instanceof HTMLElement) el.focus();
      }
      return;
    }

    // Validation passed — build the mailto: URL and open the user's mail
    // client with the message pre-filled. Static export friendly: no backend,
    // no third-party dependencies. The visitor reviews and presses send from
    // their own client (Gmail / Outlook / Apple Mail).
    startTransition(() => {
      const { name, email, phone, subject_topic, message } = result.data;
      const url = buildMailtoUrl({
        to: COMPANY.email,
        name,
        email,
        userPhone: phone,
        subject: subject_topic,
        message,
      });

      toast.success(dict.success, dict.successDescription);
      // Use location.href instead of window.open: opening a tab to a mailto:
      // URL leaves an empty tab behind in many browsers. location.href hands
      // the URL to the OS handler without leaving an artifact.
      window.location.href = url;
      form.reset();
      setFieldErrors({});
    });
  };

  const inputClass = (name: ContactFieldName) =>
    `w-full rounded-xl border bg-dark/50 px-4 py-3 text-cream placeholder:text-cream/25 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
      fieldErrors[name]
        ? "border-red-500/50 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/15"
        : "border-dark-border focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/10"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — bots fill it, real users never see it */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      <Field error={fieldErrors.name && errorMessages[fieldErrors.name]}>
        <input
          type="text"
          name="name"
          placeholder={dict.name}
          required
          aria-required="true"
          aria-invalid={Boolean(fieldErrors.name)}
          disabled={pending}
          onBlur={handleBlur}
          onChange={handleChange}
          className={inputClass("name")}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field error={fieldErrors.email && errorMessages[fieldErrors.email]}>
          <input
            type="email"
            name="email"
            placeholder={dict.email}
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.email)}
            disabled={pending}
            onBlur={handleBlur}
            onChange={handleChange}
            className={inputClass("email")}
          />
        </Field>
        <Field error={fieldErrors.phone && errorMessages[fieldErrors.phone]}>
          <input
            type="tel"
            name="phone"
            placeholder={dict.phone}
            aria-invalid={Boolean(fieldErrors.phone)}
            disabled={pending}
            onBlur={handleBlur}
            onChange={handleChange}
            className={inputClass("phone")}
          />
        </Field>
      </div>

      <Field
        error={
          fieldErrors.subject_topic && errorMessages[fieldErrors.subject_topic]
        }
      >
        <select
          name="subject_topic"
          required
          aria-required="true"
          aria-invalid={Boolean(fieldErrors.subject_topic)}
          disabled={pending}
          defaultValue=""
          onBlur={handleBlur}
          onChange={handleChange}
          className={inputClass("subject_topic")}
        >
          <option value="" disabled className="bg-dark-card">
            {dict.subject}
          </option>
          <option value={dict.subjects.general} className="bg-dark-card">
            {dict.subjects.general}
          </option>
          <option value={dict.subjects.coffee} className="bg-dark-card">
            {dict.subjects.coffee}
          </option>
          <option value={dict.subjects.distribution} className="bg-dark-card">
            {dict.subjects.distribution}
          </option>
          <option value={dict.subjects.other} className="bg-dark-card">
            {dict.subjects.other}
          </option>
        </select>
      </Field>

      <Field error={fieldErrors.message && errorMessages[fieldErrors.message]}>
        <textarea
          name="message"
          placeholder={dict.message}
          required
          aria-required="true"
          aria-invalid={Boolean(fieldErrors.message)}
          disabled={pending}
          rows={5}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`${inputClass("message")} resize-none`}
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="btn-shimmer w-full rounded-xl bg-coffee-500 hover:bg-coffee-600 px-8 py-3.5 text-cream font-bold transition-all duration-300 hover:shadow-lg hover:shadow-coffee-500/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait disabled:hover:bg-coffee-500 inline-flex items-center justify-center gap-2"
      >
        {pending && (
          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
        )}
        {pending ? dict.sending : dict.send}
      </button>
    </form>
  );
}

// ---- Subcomponents ----

function Field({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {error && (
        <p
          role="alert"
          className="mt-1.5 px-1 flex items-start gap-1.5 text-xs text-red-300/90"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" strokeWidth={2.5} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

// ---- Helpers ----

interface BuildMailtoUrlInput {
  /** Destination mailbox (e.g. info@globaldccorp.com). */
  to: string;
  /** Visitor's name (used in body and reply-to context). */
  name: string;
  /** Visitor's email (set as Reply-To so replies go to them, not to the form). */
  email: string;
  /** Optional visitor phone. */
  userPhone?: string;
  /** Subject category from the dropdown. */
  subject: string;
  /** Free-text message body. */
  message: string;
}

function buildMailtoUrl({
  to,
  name,
  email,
  userPhone,
  subject,
  message,
}: BuildMailtoUrlInput): string {
  const bodyLines = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    userPhone ? `Teléfono: ${userPhone}` : null,
    `Tipo de consulta: ${subject}`,
    "",
    "Mensaje:",
    message,
  ].filter(Boolean);

  // mailto: spec requires query-string encoding for headers and body.
  // Use URLSearchParams which handles the percent-encoding correctly,
  // then post-process: spec wants `+` literal as `%20` inside mailto bodies
  // (some mail clients otherwise render `+` as space).
  const params = new URLSearchParams({
    subject: `Consulta web — ${subject}`,
    body: bodyLines.join("\n"),
    "reply-to": email,
  });
  return `mailto:${to}?${params.toString().replace(/\+/g, "%20")}`;
}
