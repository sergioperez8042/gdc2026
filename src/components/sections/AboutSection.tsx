import Image from "next/image";
import { Globe2, ShieldCheck, Ship, Award } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

interface AboutSectionProps {
  dict: Dictionary;
}

const features = [
  { key: "experience" as const, icon: Globe2 },
  { key: "compliance" as const, icon: ShieldCheck },
  { key: "speed" as const, icon: Ship },
  { key: "quality" as const, icon: Award },
];

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
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <ScrollReveal key={f.key} delay={0.1 + i * 0.08} direction="up">
                <div className="card-3d bg-dark-card border border-dark-border rounded-2xl p-7 text-center h-full">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-gold-400/20 to-coffee-500/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-cream">
                    {dict.about.highlights[f.key]}
                  </h3>
                  <div className="w-8 h-0.5 bg-gold-400/30 mx-auto mt-4 rounded-full" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
