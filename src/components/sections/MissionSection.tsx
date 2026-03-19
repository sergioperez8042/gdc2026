import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

interface MissionSectionProps {
  dict: Dictionary;
}

export default function MissionSection({ dict }: MissionSectionProps) {
  return (
    <section
      id="mission"
      className="py-20 md:py-28 bg-gradient-to-br from-globe-600 via-globe-500 to-globe-700 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-coffee-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading title={dict.mission.title} light />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="text-center">
            {/* Decorative quote mark */}
            <div className="text-gold-400/40 text-8xl font-heading leading-none mb-4">
              &ldquo;
            </div>
            <p className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed font-light italic max-w-3xl mx-auto">
              {dict.mission.text}
            </p>
            <div className="text-gold-400/40 text-8xl font-heading leading-none mt-4 rotate-180">
              &ldquo;
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
