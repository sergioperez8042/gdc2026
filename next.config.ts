import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // React Compiler solo en producción.
  // En desarrollo con Turbopack analiza todos los componentes en cada HMR
  // y satura la CPU — causa el bloqueo de la PC al arrancar.
  reactCompiler: !isDev,

  // Static export: genera HTML/CSS/JS plano en `out/`, sin runtime de
  // servidor. Compatible con Cloudflare Pages, GitHub Pages, S3, etc.
  // El sitio es 100% SSG, así que no perdemos nada.
  output: "export",

  // next/image con `output: export` requiere desactivar el optimizer
  // (que necesita un servidor). Las imágenes se sirven tal cual.
  images: {
    unoptimized: true,
  },

  // trailingSlash genera /es/index.html en vez de /es.html — más
  // amigable para hosts estáticos que sirven directorios.
  trailingSlash: true,
};

export default nextConfig;
