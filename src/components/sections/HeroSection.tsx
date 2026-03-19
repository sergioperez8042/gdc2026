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
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gold-400/15 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-coffee-500/20 blur-[60px] pointer-events-none" />
      <div className="absolute top-[20%] left-[15%] w-24 h-24 rounded-full bg-gold-400/20 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-[30%] left-[5%] w-14 h-14 rounded-full bg-gold-400/15 pointer-events-none hidden lg:block" />

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
              Global Distribuidora y Comercializadora
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
              className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-500 text-dark font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/25 active:scale-[0.97]"
            >
              {dict.hero.cta}
            </motion.a>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-10 mt-12"
            >
              {[
                { value: dict.hero.stats.countriesValue, label: dict.hero.stats.countries },
                { value: dict.hero.stats.traceabilityValue, label: dict.hero.stats.traceability },
                { value: dict.hero.stats.coldChainValue, label: dict.hero.stats.coldChain },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-heading font-bold text-gold-300">{stat.value}</div>
                  <div className="text-cream/35 text-xs uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
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
                src="/images/coffee-cup.jpg"
                alt="Cafe premium"
                width={500}
                height={600}
                className="object-cover w-full h-[500px]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-cream/15 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-cream/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
