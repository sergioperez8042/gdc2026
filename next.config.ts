import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // React Compiler solo en producción.
  // En desarrollo con Turbopack analiza todos los componentes en cada HMR
  // y satura la CPU — causa el bloqueo de la PC al arrancar.
  reactCompiler: !isDev,
};

export default nextConfig;
