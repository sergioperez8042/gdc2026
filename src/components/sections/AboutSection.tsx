import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

interface AboutSectionProps {
  dict: Dictionary;
}

const featureKeys = ["experience", "compliance", "speed", "quality"] as const;

export default function AboutSection({ dict }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <Image src="/images/dark-coffee-bg.jpg" alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading title={dict.about.title} />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-cream/60 leading-relaxed mb-4">
              {dict.about.p1}
            </p>
            <p className="text-lg text-cream/60 leading-relaxed">
              {dict.about.p2}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {featureKeys.map((key, i) => (
            <ScrollReveal key={key} delay={0.1 + i * 0.08} direction="up">
              <div className="card-3d bg-dark-card border border-dark-border rounded-2xl p-7 text-center h-full relative overflow-hidden">
                {/* Top gold accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                <h3 className="font-heading text-xl font-bold text-cream mt-4">
                  {dict.about.highlights[key]}
                </h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
