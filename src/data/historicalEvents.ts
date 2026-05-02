/**
 * Historical events GDC has participated in.
 * EventsSection renders nothing when this array is empty.
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
    // Media hosted on Cloudflare R2 (media.globaldccorp.com) to keep the
    // repo light and Pages builds fast. Poster doubles as the static image
    // for SEO + social share previews.
    image: "https://media.globaldccorp.com/fha-singapur-2026-poster.jpg",
    year: "2026",
    edition: { es: "Singapur · Asia", en: "Singapore · Asia" },
    name: "Food Hospitality Asia (FHA) — Singapur",
    location: "Singapore Expo · Singapur",
    description: {
      es: "Presentamos nuestro café de especialidad de Mérida (Venezuela) — APROARCA, Castillo, lavado, SCA 85 — a compradores asiáticos y consolidamos relaciones estratégicas con tostadores y distribuidores de la región.",
      en: "We presented our specialty coffee from Mérida (Venezuela) — APROARCA, Castillo, washed, SCA 85 — to Asian buyers and built strategic relationships with roasters and distributors in the region.",
    },
    video: {
      src: "https://media.globaldccorp.com/fha-singapur-2026.mp4",
      webm: "https://media.globaldccorp.com/fha-singapur-2026.webm",
      poster: "https://media.globaldccorp.com/fha-singapur-2026-poster.jpg",
    },
    url: "https://www.foodnhotelasia.com/",
  },
];
