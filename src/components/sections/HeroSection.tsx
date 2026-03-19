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
      {/* Background image with dark overlay */}
      <Image
        src="/images/dark-coffee-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />

      {/* Decorative floating coffee beans */}
      <div className="absolute top-20 right-[10%] w-16 h-16 opacity-20 animate-float-slow pointer-events-none hidden lg:block">
        <Image src="/images/coffee-beans-dark.jpg" alt="" width={64} height={64} className="rounded-full" />
      </div>
      <div className="absolute bottom-32 left-[8%] w-12 h-12 opacity-15 animate-float-delayed pointer-events-none hidden lg:block">
        <Image src="/images/coffee-beans-dark.jpg" alt="" width={48} height={48} className="rounded-full" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-coffee-500/8 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <span className="inline-block text-gold-400 text-sm font-bold uppercase tracking-[0.2em] border border-gold-400/30 rounded-full px-4 py-1.5">
                Global Distribuidora y Comercializadora
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-[1.05]"
            >
              {dict.hero.tagline.split(",")[0]},
              <span className="text-gold-300 italic block mt-1">
                {dict.hero.tagline.split(",")[1]}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-cream/50 text-lg max-w-lg mb-8 leading-relaxed"
            >
              {dict.hero.subtitle}
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              href="#contact"
              className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-500 text-dark font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/25 active:scale-[0.97]"
            >
              {dict.hero.cta}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
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

          {/* Right: Floating coffee cup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="animate-float relative z-10">
                <Image
                  src="/images/coffee-cup.jpg"
                  alt="Cafe premium"
                  width={400}
                  height={500}
                  className="rounded-3xl shadow-2xl shadow-black/50 object-cover w-[350px] h-[450px]"
                />
              </div>
              {/* Decorative glow behind */}
              <div className="absolute inset-0 -m-8 rounded-full bg-coffee-500/15 blur-[80px]" />
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
