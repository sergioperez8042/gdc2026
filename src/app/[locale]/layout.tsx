import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Preloader from "@/components/ui/Preloader";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import { getDictionary, type Locale } from "@/i18n/dictionaries";

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
  const dict = await getDictionary(locale as Locale);
  const a = dict.announcement;

  return (
    <div lang={locale}>
      <AnnouncementBar
        message={a.banner}
        messageShort={a.bannerShort}
        cta={a.bannerCta}
        url={a.url}
        endDate={a.endDate}
      />
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
