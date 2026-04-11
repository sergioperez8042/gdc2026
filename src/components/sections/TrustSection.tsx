import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/i18n/dictionaries";
import { Award } from "lucide-react";

interface TrustSectionProps {
  dict: Dictionary;
}

export default function TrustSection({ dict }: TrustSectionProps) {
  const items = dict.trust.items;
  const duplicated = [...items, ...items];

  return (
    <section className="py-16 md:py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              {dict.trust.surtitle}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-4">
              {dict.trust.title}
            </h2>
            <p className="text-cream/40 text-sm max-w-xl mx-auto leading-relaxed">
              {dict.trust.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Infinite scroll carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div className="animate-scroll-infinite flex gap-8 w-max">
              {duplicated.map((item, i) => (
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
      </div>
    </section>
  );
}
