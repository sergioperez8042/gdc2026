import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import { COMPANY } from "@/lib/constants";
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
          <p className="text-center text-cream/40 -mt-8 mb-4 max-w-xl mx-auto text-lg">
            {dict.contact.subtitle}
          </p>
          <div className="flex items-center justify-center gap-6 mb-14 text-sm text-cream/25">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              Respuesta &lt; 24h
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
              Sin compromiso
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee-500/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-cream mb-1">{dict.contact.info.address}</h4>
                  <p className="text-cream/40 leading-relaxed">{COMPANY.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee-500/15 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-cream mb-1">{dict.contact.info.phones}</h4>
                  <div className="space-y-1">
                    <a href={`tel:${COMPANY.phone.ve.replace(/\s/g, "")}`} className="block text-cream/40 hover:text-gold-400 transition-colors duration-300">
                      VE {COMPANY.phone.ve}
                    </a>
                    <a href={`tel:${COMPANY.phone.es.replace(/\s/g, "")}`} className="block text-cream/40 hover:text-gold-400 transition-colors duration-300">
                      ES {COMPANY.phone.es}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee-500/15 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-cream mb-1">{dict.contact.info.emailLabel}</h4>
                  <a href={`mailto:${COMPANY.email}`} className="text-cream/40 hover:text-gold-400 transition-colors duration-300">
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="bg-dark-card border border-dark-border rounded-2xl p-6 mt-4">
                <p className="text-sm text-gold-400 font-medium">RIF: {COMPANY.rif}</p>
                <p className="text-sm text-cream/30 mt-1">{COMPANY.name}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-10">
              <ContactForm dict={dict.contact.form} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
