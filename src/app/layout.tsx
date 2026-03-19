import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://globaldistribuidora.com"),
  title: {
    default:
      "Global Distribuidora y Comercializadora, C.A. | Cafe Premium y Alimentos",
    template: "%s | Global Distribuidora y Comercializadora",
  },
  description:
    "Importacion y exportacion de cafe premium con trazabilidad completa. Distribucion internacional de alimentos con cadena de frio. Desde Venezuela al mundo.",
  keywords: [
    "cafe premium Venezuela",
    "importacion cafe",
    "exportacion cafe",
    "distribucion alimentos",
    "comercio internacional alimentos",
    "cafe gourmet",
    "cadena de frio",
    "trazabilidad cafe",
    "Global Distribuidora",
    "premium coffee import export",
    "food distribution Latin America",
  ],
  authors: [{ name: "Global Distribuidora y Comercializadora, C.A." }],
  openGraph: {
    type: "website",
    locale: "es_VE",
    alternateLocale: "en_US",
    siteName: "Global Distribuidora y Comercializadora",
    title: "Global Distribuidora y Comercializadora | Cafe Premium y Alimentos",
    description:
      "Su socio estrategico en comercio internacional de cafe premium y productos alimenticios. Trazabilidad completa. Cadena de frio.",
    images: [
      {
        url: "/images/hero-coffee.jpg",
        width: 1200,
        height: 630,
        alt: "Global Distribuidora - Cafe Premium y Distribucion de Alimentos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Distribuidora y Comercializadora | Cafe Premium",
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
    <html className={`${playfair.variable} ${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Global Distribuidora y Comercializadora, C.A.",
              description:
                "Importacion y exportacion de cafe premium y distribucion de alimentos de calidad superior.",
              url: "https://globaldistribuidora.com",
              logo: "https://globaldistribuidora.com/logos/gdc-logo-full.png",
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
            }),
          }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
