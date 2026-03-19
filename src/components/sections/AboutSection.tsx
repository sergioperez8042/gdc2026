import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

interface AboutSectionProps {
  dict: Dictionary;
}

export default function AboutSection({ dict }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading title={dict.about.title} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="space-y-6">
              <p className="text-lg text-charcoal/80 leading-relaxed">
                {dict.about.p1}
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                {dict.about.p2}
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed font-medium text-charcoal">
                {dict.about.p3}
              </p>
            </div>
          </ScrollReveal>

          {/* Decorative visual */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="bg-gradient-to-br from-coffee-100 to-globe-100 rounded-3xl p-12 text-center">
                {/* Stats or highlights */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="text-4xl font-heading font-bold text-coffee-500">
                      ☕
                    </div>
                    <p className="text-sm text-charcoal/60 font-medium">
                      Café Premium
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-heading font-bold text-fresh-500">
                      🌍
                    </div>
                    <p className="text-sm text-charcoal/60 font-medium">
                      Comercio Global
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-heading font-bold text-globe-500">
                      🚚
                    </div>
                    <p className="text-sm text-charcoal/60 font-medium">
                      Logística Integral
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-heading font-bold text-gold-500">
                      ✓
                    </div>
                    <p className="text-sm text-charcoal/60 font-medium">
                      Trazabilidad Completa
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-400/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-coffee-400/15 rounded-full blur-2xl" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
