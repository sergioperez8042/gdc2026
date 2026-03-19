import Image from "next/image";
import { CircleCheck } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

interface ServicesSectionProps {
  dict: Dictionary;
}

export default function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-28 bg-coffee-900 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-coffee-900/80 to-dark" />

      {/* Floating beans decoration */}
      <div className="absolute top-16 right-[5%] w-20 h-20 opacity-10 animate-float pointer-events-none hidden md:block">
        <Image src="/images/coffee-beans-dark.jpg" alt="" width={80} height={80} className="rounded-full" />
      </div>
      <div className="absolute bottom-20 left-[5%] w-14 h-14 opacity-8 animate-float-delayed pointer-events-none hidden md:block">
        <Image src="/images/coffee-beans-dark.jpg" alt="" width={56} height={56} className="rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading title={dict.services.title} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Coffee card */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="card-3d bg-dark-card border border-dark-border rounded-3xl overflow-hidden h-full">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src="/images/coffee-beans.jpg"
                  alt="Granos de cafe premium"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/30 to-transparent" />
                {/* Floating badge */}
                <div className="absolute top-4 right-4 bg-gold-400/90 text-dark text-xs font-bold px-3 py-1 rounded-full">
                  Premium
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-gold-300">
                  {dict.services.coffee.title}
                </h3>
                <p className="text-cream/50 leading-relaxed mb-6">
                  {dict.services.coffee.description}
                </p>
                <ul className="space-y-3">
                  {dict.services.coffee.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CircleCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-cream/50 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Food distribution card */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="card-3d bg-dark-card border border-dark-border rounded-3xl overflow-hidden h-full">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src="/images/food-distribution.jpg"
                  alt="Distribucion de alimentos"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/30 to-transparent" />
                <div className="absolute top-4 right-4 bg-fresh-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                  24/7
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-fresh-300">
                  {dict.services.food.title}
                </h3>
                <p className="text-cream/50 leading-relaxed mb-6">
                  {dict.services.food.description}
                </p>
                <ul className="space-y-3">
                  {dict.services.food.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CircleCheck className="w-5 h-5 text-fresh-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-cream/50 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
