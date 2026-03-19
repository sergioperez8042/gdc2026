import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

interface ServicesSectionProps {
  dict: Dictionary;
}

function ServiceCard({
  title,
  description,
  points,
  icon,
  accentColor,
  bgColor,
  borderColor,
  delay,
}: {
  title: string;
  description: string;
  points: string[];
  icon: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  delay: number;
}) {
  return (
    <ScrollReveal direction="up" delay={delay}>
      <div
        className={`${bgColor} rounded-3xl p-8 md:p-10 border-l-4 ${borderColor} transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 group h-full`}
      >
        <div className="text-5xl mb-6">{icon}</div>
        <h3
          className={`font-heading text-2xl md:text-3xl font-bold mb-4 ${accentColor}`}
        >
          {title}
        </h3>
        <p className="text-charcoal/70 leading-relaxed mb-6">{description}</p>
        <ul className="space-y-3">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className={`mt-1.5 w-2 h-2 rounded-full ${borderColor.replace(
                  "border-",
                  "bg-"
                )} shrink-0`}
              />
              <span className="text-charcoal/70 text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

export default function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading title={dict.services.title} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <ServiceCard
            title={dict.services.coffee.title}
            description={dict.services.coffee.description}
            points={dict.services.coffee.points}
            icon="☕"
            accentColor="text-coffee-600"
            bgColor="bg-coffee-50"
            borderColor="border-coffee-500"
            delay={0.1}
          />
          <ServiceCard
            title={dict.services.food.title}
            description={dict.services.food.description}
            points={dict.services.food.points}
            icon="🌿"
            accentColor="text-fresh-600"
            bgColor="bg-fresh-50"
            borderColor="border-fresh-500"
            delay={0.25}
          />
        </div>
      </div>
    </section>
  );
}
