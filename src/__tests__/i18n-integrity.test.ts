import { describe, expect, it } from "vitest";
import es from "@/i18n/es.json";
import en from "@/i18n/en.json";

/**
 * Recursively extract all leaf-key paths from a nested object.
 * e.g. { a: { b: "x", c: "y" } } => ["a.b", "a.c"]
 */
function getKeyPaths(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...getKeyPaths(v as Record<string, unknown>, path));
    } else {
      keys.push(path);
    }
  }
  return keys.sort();
}

describe("i18n integrity", () => {
  const esKeys = getKeyPaths(es);
  const enKeys = getKeyPaths(en);

  it("es.json and en.json have the same number of keys", () => {
    expect(esKeys.length).toBe(enKeys.length);
  });

  it("every key in es.json exists in en.json", () => {
    const enSet = new Set(enKeys);
    const missing = esKeys.filter((k) => !enSet.has(k));
    expect(missing).toEqual([]);
  });

  it("every key in en.json exists in es.json", () => {
    const esSet = new Set(esKeys);
    const missing = enKeys.filter((k) => !esSet.has(k));
    expect(missing).toEqual([]);
  });

  it("no leaf value is an empty string", () => {
    const emptyEs = esKeys.filter((k) => {
      const val = k.split(".").reduce<unknown>((o, p) => (o as Record<string, unknown>)?.[p], es);
      return val === "";
    });
    const emptyEn = enKeys.filter((k) => {
      const val = k.split(".").reduce<unknown>((o, p) => (o as Record<string, unknown>)?.[p], en);
      return val === "";
    });
    expect(emptyEs).toEqual([]);
    expect(emptyEn).toEqual([]);
  });
});
