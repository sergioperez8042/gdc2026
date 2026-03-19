import Image from "next/image";
import { CircleCheck } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface ServicesSectionProps {
  dict: Dictionary;
}

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
          {/* Center floating image (desktop) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block pointer-events-none">
            <div className="animate-float-slow rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border-4 border-dark">
              <Image
                src="/images/coffee-farm.jpg"
                alt="Café de origen"
                width={200}
                height={200}
                className="object-cover w-[180px] h-[180px]"
              />
            </div>
          </div>

          {/* Coffee card */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="card-3d bg-dark-card border border-dark-border rounded-3xl p-8 h-full">
              <div className="relative rounded-2xl overflow-hidden mb-6 h-48">
                <Image
                  src="/images/coffee-beans.jpg"
                  alt="Granos de café premium"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 right-3 bg-gold-400 text-dark text-xs font-bold px-3 py-1 rounded-full">
                  Premium
                </div>
              </div>
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
            <div className="card-3d bg-dark-card border border-dark-border rounded-3xl p-8 h-full">
              <div className="relative rounded-2xl overflow-hidden mb-6 h-48">
                <Image
                  src="/images/food-distribution.jpg"
                  alt="Distribución de alimentos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 right-3 bg-fresh-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  24/7
                </div>
              </div>
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
