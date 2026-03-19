import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface VisionSectionProps {
  dict: Dictionary;
}

export default function VisionSection({ dict }: VisionSectionProps) {
  return (
    <section id="vision" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark" />

      <div className="absolute right-[10%] top-1/3 w-16 h-16 opacity-10 animate-float-slow pointer-events-none hidden lg:block">
        <Image src="/images/coffee-beans-dark.jpg" alt="" width={64} height={64} className="rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-cream">
              {dict.vision.title}
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="bg-dark-card border border-dark-border rounded-3xl p-10 md:p-14 text-center glow-coffee">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-8" />
            <p className="text-cream/70 text-lg sm:text-xl md:text-2xl leading-relaxed font-light italic">
              {dict.vision.text}
            </p>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-8" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
