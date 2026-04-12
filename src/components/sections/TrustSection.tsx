import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/i18n/dictionaries";
import { Award, Building2, MapPin } from "lucide-react";

interface TrustSectionProps {
  dict: Dictionary;
}

export default function TrustSection({ dict }: TrustSectionProps) {
  const items = dict.trust.items;
  const partners = dict.trust.partners;
  const duplicatedItems = [...items, ...items];
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 md:py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              {dict.trust.surtitle}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-cream mb-4">
              {dict.trust.title}
            </h2>
            <p className="text-cream/40 text-sm max-w-xl mx-auto leading-relaxed">
              {dict.trust.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Partner brands row */}
        <ScrollReveal delay={0.1}>
          <p className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-center">
            {dict.trust.partnersLabel}
          </p>
          <div className="relative mb-10">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <div className="animate-scroll-infinite flex gap-6 w-max">
                {duplicatedPartners.map((partner, i) => (
                  <div
                    key={`${partner.name}-${i}`}
                    className="glass rounded-2xl px-6 py-4 flex items-center gap-3 shrink-0 border border-gold-400/10"
                  >
                    <Building2 className="w-5 h-5 text-gold-400 shrink-0" strokeWidth={1.5} />
                    <div className="flex flex-col">
                      <span className="text-cream text-sm font-semibold whitespace-nowrap">
                        {partner.name}
                      </span>
                      <span className="flex items-center gap-1 text-cream/40 text-[11px]">
                        <MapPin className="w-3 h-3" strokeWidth={2} />
                        {partner.origin}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Certifications row */}
        <ScrollReveal delay={0.2}>
          <p className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-center">
            {dict.trust.certsLabel}
          </p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <div className="animate-scroll-infinite flex gap-8 w-max" style={{ animationDirection: "reverse" }}>
                {duplicatedItems.map((item, i) => (
                  <div
                    key={`${item}-${i}`}
                    className="glass rounded-2xl px-8 py-5 flex items-center gap-3 shrink-0"
                  >
                    <Award className="w-5 h-5 text-gold-400 shrink-0" strokeWidth={1.5} />
                    <span className="text-cream/60 text-sm font-medium whitespace-nowrap">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
