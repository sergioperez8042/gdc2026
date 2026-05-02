import { describe, expect, it } from "vitest";
import { COMPANY, SOCIAL, NAV_LINKS } from "@/lib/constants";

describe("COMPANY constants", () => {
  it("has the correct legal name (no comma, no period)", () => {
    expect(COMPANY.name).toBe("Global Distribuidora y Comercializadora C.A");
  });

  it("has the correct short name", () => {
    expect(COMPANY.shortName).toBe("GDC");
  });

  it("email is the corporate domain", () => {
    expect(COMPANY.email).toMatch(/@globaldccorp\.com$/);
  });

  it("phone numbers follow E.164-like format", () => {
    expect(COMPANY.phone.ve).toMatch(/^\+58\s/);
    expect(COMPANY.phone.es).toMatch(/^\+34\s/);
  });

  it("WhatsApp number is digits-only (no +, no spaces)", () => {
    expect(COMPANY.whatsapp).toMatch(/^\d+$/);
  });

  it("address has all required parts", () => {
    expect(COMPANY.address.street).toBeTruthy();
    expect(COMPANY.address.city).toBeTruthy();
    expect(COMPANY.address.state).toBeTruthy();
    expect(COMPANY.address.country).toBe("Venezuela");
  });
});

describe("SOCIAL constants", () => {
  it("Instagram is a valid URL", () => {
    expect(() => new URL(SOCIAL.instagram)).not.toThrow();
    expect(SOCIAL.instagram).toContain("instagram.com");
  });

  it("YouTube is a valid URL", () => {
    expect(() => new URL(SOCIAL.youtube)).not.toThrow();
    expect(SOCIAL.youtube).toContain("youtube.com");
  });
});

describe("NAV_LINKS", () => {
  it("has at least 4 navigation items", () => {
    expect(NAV_LINKS.length).toBeGreaterThanOrEqual(4);
  });

  it("every link has id, es, and en labels", () => {
    for (const link of NAV_LINKS) {
      expect(link.id).toEqual(expect.any(String));
      expect(link.es).toEqual(expect.any(String));
      expect(link.en).toEqual(expect.any(String));
    }
  });
});
