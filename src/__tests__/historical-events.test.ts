import { describe, expect, it } from "vitest";
import { historicalEvents, type HistoricalEvent } from "@/data/historicalEvents";

describe("historicalEvents data", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(historicalEvents)).toBe(true);
    expect(historicalEvents.length).toBeGreaterThan(0);
  });

  it.each(historicalEvents.map((e, i) => [i, e] as [number, HistoricalEvent]))(
    "event[%i] has all required fields with correct types",
    (_index, event) => {
      expect(event.image).toEqual(expect.any(String));
      expect(event.image.length).toBeGreaterThan(0);

      expect(event.year).toMatch(/^\d{4}$/);

      expect(event.edition.es).toEqual(expect.any(String));
      expect(event.edition.en).toEqual(expect.any(String));

      expect(event.name.length).toBeGreaterThan(0);
      expect(event.location.length).toBeGreaterThan(0);

      expect(event.description.es.length).toBeGreaterThan(0);
      expect(event.description.en.length).toBeGreaterThan(0);
    },
  );

  it.each(historicalEvents.filter((e) => e.video).map((e, i) => [i, e] as [number, HistoricalEvent]))(
    "event[%i] with video has src, poster, and valid URLs",
    (_index, event) => {
      const v = event.video!;
      expect(v.src).toMatch(/^https?:\/\/.+\.(mp4|webm)$/);
      expect(v.poster).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/);
      if (v.webm) {
        expect(v.webm).toMatch(/^https?:\/\/.+\.webm$/);
      }
    },
  );

  it("event URLs (when present) are valid", () => {
    for (const event of historicalEvents) {
      if (event.url) {
        expect(() => new URL(event.url!)).not.toThrow();
      }
    }
  });
});
