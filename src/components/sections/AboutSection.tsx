import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

interface AboutSectionProps {
  dict: Dictionary;
}

const features = [
  { number: "01", key: "experience" as const, icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { number: "02", key: "compliance" as const, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { number: "03", key: "speed" as const, icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { number: "04", key: "quality" as const, icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
];

export default function AboutSection({ dict }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <Image src="/images/dark-coffee-bg.jpg" alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading title={dict.about.title} />
        </ScrollReveal>

        {/* Intro text */}
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

        {/* Feature grid - numbered like the reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative">
          {/* Center image - floating */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block z-10 pointer-events-none">
            <div className="animate-float-slow">
              <Image
                src="/logos/gdc-logo-full.png"
                alt="GDC"
                width={160}
                height={160}
                className="drop-shadow-2xl"
              />
            </div>
          </div>

          {features.map((f, i) => (
            <ScrollReveal key={f.key} delay={0.1 + i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="card-3d bg-dark-card border border-dark-border rounded-2xl p-8 relative group">
                {/* Big number */}
                <span className="absolute top-4 right-6 text-6xl font-heading font-bold text-coffee-800/40 select-none">
                  {f.number}
                </span>
                <div className="w-12 h-12 rounded-xl bg-coffee-500/15 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-cream mb-2">
                  {dict.about.highlights[f.key]}
                </h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
