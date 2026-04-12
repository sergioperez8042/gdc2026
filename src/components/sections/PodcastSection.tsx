"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube, Play } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SOCIAL } from "@/lib/constants";
import type { Dictionary } from "@/i18n/dictionaries";

interface PodcastSectionProps {
  dict: Dictionary;
}

export default function PodcastSection({ dict }: PodcastSectionProps) {
  const { surtitle, title, subtitle, ctaYoutube, ctaInstagram } = dict.podcast;
  const videoId = SOCIAL.youtubeLatestVideoId;
  const hasVideo = videoId !== "PLACEHOLDER";

  return (
    <section className="py-16 md:py-24 bg-dark relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-400/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <ScrollReveal>
              <p className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                {surtitle}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-cream mb-4">
                {title}
              </h2>
              <p className="text-cream/40 text-sm leading-relaxed mb-8 max-w-md">
                {subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 text-cream hover:bg-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300 text-sm font-semibold"
                >
                  <Youtube className="w-4 h-4 text-[#FF0000]" strokeWidth={2} />
                  {ctaYoutube}
                </a>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold-400/10 border border-gold-400/20 text-cream hover:bg-gold-400/15 hover:border-gold-400/40 transition-all duration-300 text-sm font-semibold"
                >
                  <Instagram className="w-4 h-4 text-gold-400" strokeWidth={2} />
                  {ctaInstagram}
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: YouTube embed or channel link card */}
          <ScrollReveal delay={0.2} direction="left">
            {hasVideo ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gold-400/10 shadow-2xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                  title="La Hora del Café"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center w-full aspect-video rounded-2xl overflow-hidden border border-gold-400/10 bg-coffee-900/30 hover:border-gold-400/30 transition-all duration-500"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-coffee-900/60 via-dark to-black/80" />

                {/* Play button */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-[#FF0000]/90 group-hover:bg-[#FF0000] transition-colors duration-300 shadow-lg shadow-[#FF0000]/30"
                >
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </motion.div>

                <p className="relative z-10 mt-4 text-cream/60 text-sm font-medium">
                  @lahoradelcafecondt
                </p>
              </a>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
