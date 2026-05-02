import { redirect } from "next/navigation";

// Static export no soporta middleware ni redirects() de next.config.
// Esta página actúa como redirect de la raíz "/" hacia el locale por defecto.
//
// `next/navigation`'s `redirect()` en Server Components con `output: "export"`
// genera un HTML estático con meta refresh + cliente <Link>, así que funciona
// tanto en dev local como en Cloudflare Pages estático.

export default function RootRedirect() {
  redirect("/es");
}
