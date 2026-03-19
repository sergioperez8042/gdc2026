import { getDictionary, type Locale } from "@/i18n/dictionaries";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import MissionSection from "@/components/sections/MissionSection";
import VisionSection from "@/components/sections/VisionSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

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
      <AboutSection dict={dict} />
      <ServicesSection dict={dict} />
      <MissionSection dict={dict} />
      <VisionSection dict={dict} />
      <ContactSection dict={dict} />
      <Footer dict={dict} />
    </>
  );
}
