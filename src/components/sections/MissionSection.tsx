import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface MissionSectionProps {
  dict: Dictionary;
}

export default function MissionSection({ dict }: MissionSectionProps) {
  return (
    <section
      id="mission"
      className="py-20 md:py-28 bg-dark relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-globe-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-cream">
              {dict.mission.title}
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="bg-dark-card border border-dark-border rounded-3xl p-10 md:p-14 text-center glow-gold">
            <div className="text-gold-400/30 text-7xl font-heading leading-none mb-4">
              &ldquo;
            </div>
            <p className="text-cream/70 text-lg sm:text-xl md:text-2xl leading-relaxed font-light italic max-w-3xl mx-auto">
              {dict.mission.text}
            </p>
            <div className="text-gold-400/30 text-7xl font-heading leading-none mt-4 rotate-180">
              &ldquo;
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
