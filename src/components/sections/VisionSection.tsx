import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

interface VisionSectionProps {
  dict: Dictionary;
}

export default function VisionSection({ dict }: VisionSectionProps) {
  return (
    <section id="vision" className="py-20 md:py-28 bg-coffee-50 relative overflow-hidden">
      {/* Subtle globe watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <svg
          width="500"
          height="500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-globe-500"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="0.5" />
          <path d="M2 12h20" strokeWidth="0.5" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading title={dict.vision.title} />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="text-center">
            <div className="bg-white rounded-3xl shadow-sm border border-coffee-100 p-10 md:p-14">
              <div className="text-coffee-300 text-6xl font-heading leading-none mb-6">
                🌎
              </div>
              <p className="text-charcoal/80 text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
                {dict.vision.text}
              </p>
              {/* Gold divider */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-8" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
