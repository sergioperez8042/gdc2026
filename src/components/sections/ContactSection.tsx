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
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading title={dict.contact.title} />
          <p className="text-center text-charcoal/60 -mt-8 mb-14 max-w-xl mx-auto text-lg">
            {dict.contact.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-globe-50 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-globe-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">
                    {dict.contact.info.address}
                  </h4>
                  <p className="text-charcoal/60 leading-relaxed">
                    {COMPANY.fullAddress}
                  </p>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee-50 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-coffee-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">
                    {dict.contact.info.phones}
                  </h4>
                  <div className="space-y-1">
                    <a
                      href={`tel:${COMPANY.phone.ve.replace(/\s/g, "")}`}
                      className="block text-charcoal/60 hover:text-coffee-500 transition-colors duration-300"
                    >
                      🇻🇪 {COMPANY.phone.ve}
                    </a>
                    <a
                      href={`tel:${COMPANY.phone.es.replace(/\s/g, "")}`}
                      className="block text-charcoal/60 hover:text-coffee-500 transition-colors duration-300"
                    >
                      🇪🇸 {COMPANY.phone.es}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-fresh-50 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-fresh-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">
                    {dict.contact.info.emailLabel}
                  </h4>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-charcoal/60 hover:text-coffee-500 transition-colors duration-300"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              {/* RIF */}
              <div className="bg-globe-50 rounded-2xl p-6 mt-4">
                <p className="text-sm text-globe-500 font-medium">
                  RIF: {COMPANY.rif}
                </p>
                <p className="text-sm text-charcoal/50 mt-1">
                  {COMPANY.name}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10">
              <ContactForm dict={dict.contact.form} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
