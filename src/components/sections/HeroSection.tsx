"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeroSectionProps {
  dict: Dictionary;
}

export default function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark">
      {/* Subtle radial gradient */}
      <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-gold-400/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em] mb-6"
            >
              Global Distribuidora y Comercializadora C.A
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-[1.05]"
            >
              {dict.hero.tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-cream/50 text-lg max-w-lg mb-8 leading-relaxed"
            >
              {dict.hero.subtitle}
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              href="#contact"
              className="btn-shimmer inline-flex items-center gap-3 bg-coffee-500 hover:bg-coffee-600 text-cream font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-coffee-500/25 active:scale-[0.97]"
            >
              {dict.hero.cta}
            </motion.a>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-6 mt-12 text-cream/40 text-sm tracking-wide"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {dict.hero.stats.countriesValue} {dict.hero.stats.countries}
              </span>
              <span className="w-px h-4 bg-cream/15" />
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {dict.hero.stats.traceabilityValue} {dict.hero.stats.traceability}
              </span>
              <span className="w-px h-4 bg-cream/15" />
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {dict.hero.stats.coldChainValue} {dict.hero.stats.coldChain}
              </span>
            </motion.div>
          </div>

          {/* Right: Floating coffee image with blobs */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Decorative circles */}
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-gold-400/20" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-gold-400/15" />
            <div className="absolute top-1/2 -right-12 w-10 h-10 rounded-full bg-coffee-400/25" />

            {/* Main image */}
            <div className="animate-float relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
              <Image
                src="/images/coffee-sacks.jpg"
                alt="Importación de café en grano"
                width={500}
                height={600}
                className="object-cover w-full h-[500px]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
