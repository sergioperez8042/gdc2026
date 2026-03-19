import Navbar from "@/components/layout/Navbar";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div lang={locale}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
