import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface AboutSectionProps {
  dict: Dictionary;
}

export default function AboutSection({ dict }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image with decorative blobs */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-gold-400/20 z-0" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gold-400/15 z-0" />
              <div className="absolute top-1/2 -left-10 w-10 h-10 rounded-full bg-coffee-400/20 z-0" />

              {/* Main image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                <Image
                  src="/images/coffee-cup.jpg"
                  alt="Café premium GDC"
                  width={600}
                  height={450}
                  className="object-cover w-full h-[350px] lg:h-[420px]"
                />
              </div>

              {/* Small floating image */}
              <div className="absolute -bottom-8 -right-4 z-20 rounded-2xl overflow-hidden shadow-xl shadow-black/40 border-4 border-dark hidden md:block">
                <Image
                  src="/images/coffee-beans.jpg"
                  alt="Granos de café"
                  width={180}
                  height={140}
                  className="object-cover w-[160px] h-[120px]"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Text */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <p className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                {dict.about.surtitle}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-6">
                {dict.about.title}
              </h2>
              <p className="text-cream/50 leading-relaxed mb-4">
                {dict.about.p1}
              </p>
              <p className="text-cream/50 leading-relaxed mb-8">
                {dict.about.p2}
              </p>
              <a
                href="#services"
                className="inline-block bg-gold-400 hover:bg-gold-500 text-dark font-bold px-7 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/20"
              >
                {dict.about.cta}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
