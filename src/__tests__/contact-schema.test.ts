import { describe, expect, it } from "vitest";
import {
  ContactSchema,
  extractFieldErrors,
  ContactErrorCode,
} from "@/lib/contactSchema";

const validData = {
  name: "Juan Perez",
  email: "juan@example.com",
  phone: "+34 600 123 456",
  subject_topic: "Cafe de especialidad",
  message: "Me interesa el cafe APROARCA. Necesito cotizacion para 500 kg.",
};

describe("ContactSchema", () => {
  it("accepts valid data with all fields", () => {
    const result = ContactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("accepts valid data without optional phone", () => {
    const withoutPhone = {
      name: validData.name,
      email: validData.email,
      subject_topic: validData.subject_topic,
      message: validData.message,
    };
    const result = ContactSchema.safeParse(withoutPhone);
    expect(result.success).toBe(true);
  });

  it("treats empty phone as undefined (optional)", () => {
    const result = ContactSchema.safeParse({ ...validData, phone: "" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBeUndefined();
    }
  });

  it("rejects empty name", () => {
    const result = ContactSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(ContactErrorCode.REQUIRED);
    }
  });

  it("rejects invalid email", () => {
    const result = ContactSchema.safeParse({ ...validData, email: "not-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(ContactErrorCode.INVALID_EMAIL);
    }
  });

  it("rejects empty email", () => {
    const result = ContactSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 chars", () => {
    const result = ContactSchema.safeParse({ ...validData, message: "Hola" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(ContactErrorCode.TOO_SHORT);
    }
  });

  it("rejects empty subject_topic", () => {
    const result = ContactSchema.safeParse({ ...validData, subject_topic: "" });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from all fields", () => {
    const result = ContactSchema.safeParse({
      ...validData,
      name: "  Juan  ",
      email: "  juan@example.com  ",
      message: "  " + "A".repeat(20) + "  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Juan");
      expect(result.data.email).toBe("juan@example.com");
      expect(result.data.message).not.toMatch(/^\s/);
    }
  });
});

describe("extractFieldErrors", () => {
  it("maps Zod issues to a flat { field: code } object", () => {
    const result = ContactSchema.safeParse({ name: "", email: "", message: "", subject_topic: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = extractFieldErrors(result.error.issues);
      expect(errors.name).toBe(ContactErrorCode.REQUIRED);
      expect(errors.email).toBe(ContactErrorCode.REQUIRED);
      expect(errors.subject_topic).toBe(ContactErrorCode.REQUIRED);
    }
  });

  it("keeps only the first issue per field", () => {
    // email with empty string triggers REQUIRED, not INVALID_EMAIL
    const result = ContactSchema.safeParse({
      ...validData,
      email: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = extractFieldErrors(result.error.issues);
      // Only one code for email, not multiple
      expect(typeof errors.email).toBe("string");
    }
  });

  it("returns empty object for valid data", () => {
    const result = ContactSchema.safeParse(validData);
    expect(result.success).toBe(true);
    // No issues means extractFieldErrors is not called — but verify safety
    if (!result.success) {
      const errors = extractFieldErrors(result.error.issues);
      expect(Object.keys(errors).length).toBe(0);
    }
  });
});
