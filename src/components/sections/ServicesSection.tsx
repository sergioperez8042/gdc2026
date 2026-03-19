import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

interface ServicesSectionProps {
  dict: Dictionary;
}

export default function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading title={dict.services.title} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Coffee card */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-coffee-50 rounded-3xl overflow-hidden border-l-4 border-coffee-500 transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 h-full">
              <div className="relative h-48 sm:h-56">
                <Image
                  src="/images/coffee-beans.jpg"
                  alt="Granos de cafe premium seleccionados"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-50 via-transparent to-transparent" />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-coffee-600">
                  {dict.services.coffee.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  {dict.services.coffee.description}
                </p>
                <ul className="space-y-3">
                  {dict.services.coffee.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-coffee-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-charcoal/70 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Food distribution card */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="bg-fresh-50 rounded-3xl overflow-hidden border-l-4 border-fresh-500 transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 h-full">
              <div className="relative h-48 sm:h-56">
                <Image
                  src="/images/food-distribution.jpg"
                  alt="Distribucion de alimentos frescos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fresh-50 via-transparent to-transparent" />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-fresh-600">
                  {dict.services.food.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  {dict.services.food.description}
                </p>
                <ul className="space-y-3">
                  {dict.services.food.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-fresh-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-charcoal/70 text-sm">{point}</span>
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
