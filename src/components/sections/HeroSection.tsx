"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeroSectionProps {
  dict: Dictionary;
}

export default function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-globe-800 via-globe-500 to-coffee-800" />

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-400 blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-coffee-400 blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-8"
        >
          <Image
            src="/logos/gdc-logo-full.png"
            alt="Global Distribuidora y Comercializadora"
            width={220}
            height={220}
            priority
            className="mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Company Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
        >
          Global
          <span className="block text-gold-300 mt-1">
            Distribuidora y Comercializadora
          </span>
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-white/80 text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto mb-3 leading-relaxed"
        >
          {dict.hero.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-10"
        >
          {dict.hero.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          href="#contact"
          className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-globe-900 font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/30 active:scale-[0.97]"
        >
          {dict.hero.cta}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
