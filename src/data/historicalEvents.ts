/**
 * Historical events GDC has participated in.
 *
 * HOW TO ADD A NEW EVENT:
 *   1. Add a new object to the `historicalEvents` array below.
 *   2. Place the image in `public/events/` and reference it as `/events/filename.jpg`.
 *      Recommended: 1600x1000px, JPG q92, landscape (16:10 aspect ratio).
 *   3. Fill in year, edition, name, location, and bilingual description.
 *   4. Events render in the order defined here (most recent first is recommended).
 *
 * The EventsSection renders nothing when this array is empty.
 */

export type HistoricalEvent = {
  /** Public path to the event image (landscape 16:10 recommended). */
  image: string;
  /** Year of the event, e.g. "2025". */
  year: string;
  /** Edition label, e.g. "38ª Edición" / "38th Edition". */
  edition: {
    es: string;
    en: string;
  };
  /** Official event name (usually not translated). */
  name: string;
  /** City + venue, e.g. "IFEMA Madrid". */
  location: string;
  /** One-line description of GDC's participation (bilingual). */
  description: {
    es: string;
    en: string;
  };
  /** Optional external link to event website. */
  url?: string;
};

export const historicalEvents: HistoricalEvent[] = [
  // TODO: Populate with real past events. Example structure:
  //
  // {
  //   image: "/events/salon-gourmets-2025.jpg",
  //   year: "2025",
  //   edition: { es: "38ª Edición", en: "38th Edition" },
  //   name: "Salón Gourmets",
  //   location: "IFEMA Madrid",
  //   description: {
  //     es: "Presentamos nuestra línea de café de especialidad a compradores internacionales.",
  //     en: "We showcased our specialty coffee line to international buyers.",
  //   },
  //   url: "https://www.gourmets.net/salon-gourmets",
  // },
];
