import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/contexts/ToastContext";
import { COMPANY } from "@/lib/constants";

const SITE_URL = "https://globaldccorp.com";
// Heavy media (videos + poster) lives on Cloudflare R2 under a custom
// domain to keep the static export bundle small and Pages builds fast.
const MEDIA_CDN = "https://media.globaldccorp.com";
const VIDEO_URL = `${MEDIA_CDN}/fha-singapur-2026.mp4`;
const POSTER_URL = `${MEDIA_CDN}/fha-singapur-2026-poster.jpg`;
const LOGO_URL = `${SITE_URL}/logos/gdc-logo-full.png`;

// `+34 686 72 77 15` -> `+34-686-727715`
const e164Hyphenated = (phone: string) => phone.replace(/\s+/g, "-").replace(/--/g, "-");

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://globaldccorp.com"),
  title: {
    default:
      "Global Distribuidora y Comercializadora C.A | Cafe Premium y Alimentos",
    template: "%s | Global Distribuidora y Comercializadora C.A",
  },
  description:
    "Importacion y exportacion de cafe premium con trazabilidad completa. Distribucion internacional de alimentos con cadena de frio. Desde Venezuela al mundo.",
  keywords: [
    "cafe premium Venezuela",
    "cafe especialidad Venezuela",
    "cafe Merida Venezuela",
    "APROARCA cafe",
    "importacion cafe Venezuela",
    "exportacion cafe Venezuela",
    "distribucion alimentos internacional",
    "comercio internacional alimentos",
    "cafe gourmet Venezuela",
    "cadena de frio internacional",
    "trazabilidad cafe finca tostador",
    "Global Distribuidora Corp",
    "GDC Venezuela",
    "representacion empresarial internacional",
    "expansion internacional Venezuela",
    "FHA Singapore 2026",
    "Food Hospitality Asia",
    "feria cafe internacional",
    "ferias alimentos Asia",
    "premium coffee import export",
    "food distribution Latin America",
    "Venezuela coffee exporter",
    "specialty coffee SCA score 85",
  ],
  authors: [{ name: "Global Distribuidora y Comercializadora C.A" }],
  openGraph: {
    type: "website",
    locale: "es_VE",
    alternateLocale: "en_US",
    siteName: "Global Distribuidora y Comercializadora C.A",
    title: "Global Distribuidora y Comercializadora C.A | Cafe Premium y Alimentos",
    description:
      "Su socio estrategico en comercio internacional de cafe premium y productos alimenticios. Presencia global, ferias internacionales (FHA Singapore 2026), trazabilidad completa.",
    images: [
      {
        url: "/images/hero-coffee.jpg",
        width: 1200,
        height: 630,
        alt: "Global Distribuidora - Cafe Premium y Distribucion de Alimentos",
      },
      {
        url: POSTER_URL,
        width: 1920,
        height: 1080,
        alt: "Global Distribuidora Corp en FHA Singapore 2026 - Food Hospitality Asia",
      },
    ],
    videos: [
      {
        url: VIDEO_URL,
        secureUrl: VIDEO_URL,
        type: "video/mp4",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Distribuidora y Comercializadora C.A | Cafe Premium",
    description:
      "Importacion, exportacion y distribucion de cafe premium y alimentos de calidad superior.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      es: "/es",
      en: "/en",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${lato.variable} antialiased`}>
      <body className="min-h-screen">
        <ToastProvider>{children}</ToastProvider>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: COMPANY.name,
                alternateName: COMPANY.shortName,
                description:
                  "Importacion y exportacion de cafe premium y distribucion de alimentos de calidad superior.",
                url: SITE_URL,
                logo: LOGO_URL,
                email: COMPANY.email,
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: e164Hyphenated(COMPANY.phone.ve),
                    contactType: "sales",
                    areaServed: "VE",
                    availableLanguage: ["Spanish", "English"],
                  },
                  {
                    "@type": "ContactPoint",
                    telephone: e164Hyphenated(COMPANY.phone.es),
                    contactType: "sales",
                    areaServed: "ES",
                    availableLanguage: ["Spanish", "English"],
                  },
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: COMPANY.address.street,
                  addressLocality: COMPANY.address.city,
                  addressRegion: COMPANY.address.state,
                  addressCountry: "VE",
                },
                sameAs: [],
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: `${COMPANY.shortName} en FHA Singapore 2026`,
                description:
                  "Participacion de Global Distribuidora y Comercializadora (GDC) en Food Hospitality Asia Singapore 2026, presentando cafe premium de Merida (Venezuela) y servicios de representacion empresarial internacional.",
                thumbnailUrl: [POSTER_URL],
                uploadDate: "2026-05-02",
                duration: "PT34S",
                contentUrl: VIDEO_URL,
                embedUrl: `${SITE_URL}/#events`,
                publisher: {
                  "@type": "Organization",
                  name: COMPANY.name,
                  logo: { "@type": "ImageObject", url: LOGO_URL },
                },
                inLanguage: "es",
                isFamilyFriendly: true,
                keywords:
                  "FHA Singapore 2026, Food Hospitality Asia, cafe Venezuela, Merida cafe, importacion exportacion, representacion empresarial internacional",
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
