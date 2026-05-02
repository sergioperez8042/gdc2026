/**
 * Historical events GDC has participated in.
 *
 * HOW TO ADD A NEW EVENT:
 *   1. Add a new object to the `historicalEvents` array below.
 *   2. Place the image in `public/events/` and reference it as `/events/filename.jpg`.
 *      Recommended: 1600x1000px, JPG q92, landscape (16:10 aspect ratio).
 *   3. (Optional) If the event has a video, place the file under
 *      `public/videos/` and add a `video` block with paths to mp4, optional
 *      webm, and a poster JPG. The card will render a click-to-play player
 *      instead of the static image.
 *   4. Fill in year, edition, name, location, and bilingual description.
 *   5. Events render in the order defined here (most recent first is recommended).
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
  /** Optional video of the event. When present the card renders a
   *  click-to-play video player instead of the static image. */
  video?: {
    src: string;
    webm?: string;
    poster: string;
  };
};

export const historicalEvents: HistoricalEvent[] = [
  {
    // The poster doubles as the static image for SEO + social share previews.
    image: "/videos/fha-singapur-2026-poster.jpg",
    year: "2026",
    edition: { es: "Edición 2026", en: "2026 Edition" },
    name: "Food Hospitality Asia (FHA) — Singapur",
    location: "Singapore Expo · Singapur",
    description: {
      es: "Presentamos nuestro café de especialidad de Mérida (Venezuela) — APROARCA, Castillo, lavado, SCA 85 — a compradores asiáticos y consolidamos relaciones estratégicas con tostadores y distribuidores de la región.",
      en: "We presented our specialty coffee from Mérida (Venezuela) — APROARCA, Castillo, washed, SCA 85 — to Asian buyers and built strategic relationships with roasters and distributors in the region.",
    },
    video: {
      src: "/videos/fha-singapur-2026.mp4",
      webm: "/videos/fha-singapur-2026.webm",
      poster: "/videos/fha-singapur-2026-poster.jpg",
    },
    url: "https://www.foodnhotelasia.com/",
  },
];
