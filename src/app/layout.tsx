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
  title: "Global Distribuidora y Comercializadora, C.A.",
  description:
    "Importación, exportación y distribución de café premium y productos alimenticios de calidad superior. Caracas, Venezuela.",
  keywords: [
    "café",
    "coffee",
    "importación",
    "exportación",
    "distribución",
    "alimentos",
    "Venezuela",
    "comercio internacional",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
