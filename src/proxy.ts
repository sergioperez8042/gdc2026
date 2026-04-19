import { NextRequest, NextResponse } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip _next internals, API routes, and any path containing a dot
  // (static files: .png, .jpg, .svg, .ico, .txt, .xml, .webp, .woff2,
  // including App Router generated /icon.png and /apple-icon.png).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
  // Cloudflare Workers (OpenNext) only ejecuta Edge runtime.
  // En Next.js 16 el default es Node.js, así que opt-in explícito.
  runtime: "edge",
};
