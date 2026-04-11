import { getDictionary, type Locale } from "@/i18n/dictionaries";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import EventsSection from "@/components/sections/EventsSection";
import TrustSection from "@/components/sections/TrustSection";
import MissionSection from "@/components/sections/MissionSection";
import VisionSection from "@/components/sections/VisionSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

function SectionDivider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-dark-border/50 to-transparent" />
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <HeroSection dict={dict} />
      <SectionDivider />
      <AboutSection dict={dict} />
      <SectionDivider />
      <ServicesSection dict={dict} />
      <SectionDivider />
      <EventsSection dict={dict} />
      <SectionDivider />
      <TrustSection dict={dict} />
      <SectionDivider />
      <MissionSection dict={dict} />
      <SectionDivider />
      <VisionSection dict={dict} />
      <SectionDivider />
      <ContactSection dict={dict} />
      <Footer dict={dict} />
    </>
  );
}
