import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // React Compiler solo en producción.
  // En desarrollo con Turbopack analiza todos los componentes en cada HMR
  // y satura la CPU — causa el bloqueo de la PC al arrancar.
  reactCompiler: !isDev,

  // Redirects de locale: reemplaza al antiguo proxy.ts (Next.js 16
  // proxy.ts solo soporta runtime Node.js, incompatible con Cloudflare
  // Workers que solo soporta Edge). Estas redirects las evalúa el CDN,
  // no requieren runtime — funcionan en cualquier hosting.
  async redirects() {
    return [
      // Raíz → /es
      {
        source: "/",
        destination: "/es",
        permanent: false,
      },
      // Cualquier path top-level que no sea /es, /en, /_next, /api,
      // ni un archivo con extensión (contiene punto), redirige al locale.
      // Doble negative lookahead en path-to-regexp.
      {
        source: "/:path((?!es$|en$|es/|en/|_next/|api/)(?!.*\\..*).+)",
        destination: "/es/:path",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
