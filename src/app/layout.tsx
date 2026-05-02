import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/contexts/ToastContext";

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
  metadataBase: new URL("https://globaldistribuidora.com"),
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
        url: "/videos/fha-singapur-2026-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Global Distribuidora Corp en FHA Singapore 2026 - Food Hospitality Asia",
      },
    ],
    videos: [
      {
        url: "https://globaldccorp.com/videos/fha-singapur-2026.mp4",
        secureUrl: "https://globaldccorp.com/videos/fha-singapur-2026.mp4",
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
                name: "Global Distribuidora y Comercializadora C.A",
                alternateName: "GDC",
                description:
                  "Importacion y exportacion de cafe premium y distribucion de alimentos de calidad superior.",
                url: "https://globaldccorp.com",
                logo: "https://globaldccorp.com/logos/gdc-logo-full.png",
                email: "info@globaldccorp.com",
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+58-416-832-5385",
                    contactType: "sales",
                    areaServed: "VE",
                    availableLanguage: ["Spanish", "English"],
                  },
                  {
                    "@type": "ContactPoint",
                    telephone: "+34-686-727715",
                    contactType: "sales",
                    areaServed: "ES",
                    availableLanguage: ["Spanish", "English"],
                  },
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Av. el cortijo, casa #55",
                  addressLocality: "Caracas",
                  addressRegion: "Distrito Capital",
                  addressCountry: "VE",
                },
                sameAs: [],
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: "Global Distribuidora Corp en FHA Singapore 2026",
                description:
                  "Participacion de Global Distribuidora y Comercializadora (GDC) en Food Hospitality Asia Singapore 2026, presentando cafe premium de Merida (Venezuela) y servicios de representacion empresarial internacional.",
                thumbnailUrl: [
                  "https://globaldccorp.com/videos/fha-singapur-2026-poster.jpg",
                ],
                uploadDate: "2026-05-02",
                duration: "PT34S",
                contentUrl: "https://globaldccorp.com/videos/fha-singapur-2026.mp4",
                embedUrl: "https://globaldccorp.com/#services",
                publisher: {
                  "@type": "Organization",
                  name: "Global Distribuidora y Comercializadora C.A",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://globaldccorp.com/logos/gdc-logo-full.png",
                  },
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
