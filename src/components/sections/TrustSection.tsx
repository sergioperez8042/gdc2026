"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/i18n/dictionaries";
import { Award, MapPin } from "lucide-react";

interface TrustSectionProps {
  dict: Dictionary;
}

export default function TrustSection({ dict }: TrustSectionProps) {
  const items = dict.trust.items;
  const partners = dict.trust.partners;
  const fhaItems = dict.trust.fhaItems;
  const duplicatedPartners = [...partners, ...partners];
  const duplicatedFha = [...fhaItems, ...fhaItems];

  return (
    <section className="py-16 md:py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              {dict.trust.surtitle}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-cream mb-4">
              {dict.trust.title}
            </h2>
            <p className="text-cream/40 text-sm max-w-xl mx-auto leading-relaxed">
              {dict.trust.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Partner brands row */}
        <ScrollReveal delay={0.1}>
          <p className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-center">
            {dict.trust.partnersLabel}
          </p>
          <div className="relative mb-10">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <div className="animate-scroll-infinite flex gap-6 w-max">
                {duplicatedPartners.map((partner, i) => (
                  <div
                    key={`${partner.name}-${i}`}
                    className="glass rounded-2xl px-6 py-4 flex items-center gap-3 shrink-0 border border-gold-400/10"
                  >
                    {partner.logo ? (
                      <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={40}
                          height={40}
                          className="object-contain max-h-10"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 shrink-0 rounded-full bg-gold-400/20 flex items-center justify-center">
                        <span className="text-gold-400 text-[11px] font-bold leading-none">
                          {partner.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-cream text-sm font-semibold whitespace-nowrap">
                        {partner.name}
                      </span>
                      <span className="flex items-center gap-1 text-cream/40 text-[11px]">
                        <MapPin className="w-3 h-3" strokeWidth={2} />
                        {partner.origin}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* FHA 2026 sectors row */}
        <ScrollReveal delay={0.2}>
          <p className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-center">
            {dict.trust.fhaLabel}
          </p>
          <div className="relative mb-10">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
            <div className="overflow-hidden">
              <div className="animate-scroll-infinite flex gap-6 w-max" style={{ animationDirection: "reverse" }}>
                {duplicatedFha.map((item, i) => (
                  <div
                    key={`${item.label}-${i}`}
                    className="glass rounded-2xl px-5 py-3 flex items-center gap-3 shrink-0 border border-gold-400/10"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={40}
                      height={40}
                      className="shrink-0"
                    />
                    <span className="text-cream text-sm font-semibold whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Certifications row — animated centered (only 2 items) */}
        <ScrollReveal delay={0.3}>
          <p className="text-gold-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-center">
            {dict.trust.certsLabel}
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <motion.div
                  animate={{
                    y: [0, i % 2 === 0 ? -6 : -4, 0],
                    boxShadow: [
                      "0 0 0px rgba(212,175,55,0)",
                      "0 0 18px rgba(212,175,55,0.12)",
                      "0 0 0px rgba(212,175,55,0)",
                    ],
                  }}
                  transition={{
                    duration: 3.5 + i * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 1.4,
                  }}
                  className="glass rounded-2xl px-8 py-5 flex items-center gap-3"
                >
                  {item.icon ? (
                    <Image src={item.icon} alt={item.label} width={32} height={32} className="shrink-0" />
                  ) : (
                    <Award className="w-5 h-5 text-gold-400 shrink-0" strokeWidth={1.5} />
                  )}
                  <span className="text-cream/60 text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
