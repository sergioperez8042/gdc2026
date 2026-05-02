import { CircleCheck, Globe2, Mail, MessageCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CardCarousel from "@/components/ui/CardCarousel";
import { COMPANY } from "@/lib/constants";
import type { Dictionary } from "@/i18n/dictionaries";

interface ServicesSectionProps {
  dict: Dictionary;
}

const coffeeImages = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/coffee-gallery/coffee-${String(i).padStart(2, "0")}.jpg`,
  alt: "Granos de café premium",
}));

const foodImages = Array.from({ length: 5 }, (_, i) => ({
  src: `/images/gallery/food-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: "Producto alimenticio internacional",
}));

export default function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              {dict.services.surtitle}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-cream">
              {dict.services.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 relative">
          {/* Coffee card */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="service-card card-3d bg-dark-card border border-dark-border rounded-3xl p-8 h-full">
              <CardCarousel
                images={coffeeImages}
                interval={4500}
                badge={{ label: "Premium", className: "bg-gold-400 text-dark" }}
              />
              <h3 className="font-heading text-2xl font-bold mb-3 text-gold-300">
                {dict.services.coffee.title}
              </h3>
              <p className="text-cream/45 leading-relaxed mb-5 text-sm">
                {dict.services.coffee.description}
              </p>
              <ul className="space-y-2.5">
                {dict.services.coffee.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CircleCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-cream/45 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Food card */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="service-card card-3d bg-dark-card border border-dark-border rounded-3xl p-8 h-full">
              <CardCarousel
                images={foodImages}
                interval={4000}
                badge={{ label: "24/7", className: "bg-fresh-500 text-white" }}
              />
              <h3 className="font-heading text-2xl font-bold mb-3 text-fresh-300">
                {dict.services.food.title}
              </h3>
              <p className="text-cream/45 leading-relaxed mb-5 text-sm">
                {dict.services.food.description}
              </p>
              <ul className="space-y-2.5">
                {dict.services.food.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CircleCheck className="w-4 h-4 text-fresh-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-cream/45 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Corporate representation card — full width below the two product cards.
            Conceptual service (no product gallery), so we use a Lucide icon hero
            and CTAs to email + WhatsApp instead of a CardCarousel. */}
        <ScrollReveal delay={0.3}>
          <div className="service-card card-3d bg-dark-card border border-dark-border rounded-3xl p-8 lg:p-10 mt-8 lg:mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-10 items-center">
              {/* Icon hero — stylized "international expansion" placeholder.
                  Globe centered with radial glow + decorative ring + concentric
                  dotted circles to evoke global reach without needing photos. */}
              <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-gold-400/10 via-gold-400/5 to-transparent border border-gold-400/20 rounded-2xl aspect-square lg:aspect-auto lg:h-full p-8 min-h-[260px]">
                {/* Soft radial glow behind the globe */}
                <div className="absolute inset-1/4 rounded-full bg-gold-400/15 blur-3xl" aria-hidden="true" />
                {/* Outer dotted ring */}
                <div
                  className="absolute inset-6 rounded-full border border-dashed border-gold-400/25"
                  aria-hidden="true"
                />
                {/* Inner faint ring */}
                <div
                  className="absolute inset-12 rounded-full border border-gold-400/10"
                  aria-hidden="true"
                />
                {/* Globe icon */}
                <Globe2
                  className="relative w-28 h-28 lg:w-36 lg:h-36 text-gold-400 drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                  strokeWidth={1.1}
                />
                {/* Caption under the globe */}
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400/70">
                  Worldwide
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-heading text-2xl font-bold mb-3 text-gold-300">
                  {dict.services.representation.title}
                </h3>
                <p className="text-cream/45 leading-relaxed mb-5 text-sm">
                  {dict.services.representation.description}
                </p>
                <ul className="space-y-2.5 mb-6">
                  {dict.services.representation.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CircleCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-cream/45 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs: email + WhatsApp */}
                <p className="text-cream/35 text-xs italic mb-3">
                  {dict.services.representation.cta}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(dict.services.representation.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 hover:bg-gold-500 text-dark font-semibold px-5 py-2.5 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" strokeWidth={2.2} />
                    {COMPANY.email}
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-400/40 hover:bg-gold-400/10 text-gold-300 font-semibold px-5 py-2.5 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={2.2} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
