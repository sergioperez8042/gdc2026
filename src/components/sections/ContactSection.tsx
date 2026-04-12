import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import type { Dictionary } from "@/i18n/dictionaries";

interface ContactSectionProps {
  dict: Dictionary;
}

export default function ContactSection({ dict }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-coffee-900/20 to-dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading title={dict.contact.title} />
          <p className="text-center text-cream/40 -mt-8 mb-14 max-w-xl mx-auto text-lg">
            {dict.contact.subtitle}
          </p>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-10">
              <ContactForm dict={dict.contact.form} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
