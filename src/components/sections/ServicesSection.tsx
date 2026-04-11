import { CircleCheck } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CardCarousel from "@/components/ui/CardCarousel";
import type { Dictionary } from "@/i18n/dictionaries";

interface ServicesSectionProps {
  dict: Dictionary;
}

const coffeeImages = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/coffee-gallery/coffee-${String(i).padStart(2, "0")}.jpg`,
  alt: "Granos de café premium",
}));

const foodImages = Array.from({ length: 12 }, (_, i) => ({
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
      </div>
    </section>
  );
}
