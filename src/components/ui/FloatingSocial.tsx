"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Instagram, Youtube } from "lucide-react";
import { SOCIAL } from "@/lib/constants";

export default function FloatingSocial() {
  const [visible, setVisible] = useState(false);

  // Show pill after scrolling past the hero (300px)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
          aria-label="Redes sociales"
        >
          <a
            href={SOCIAL.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube — La Hora del Café"
            className="group flex items-center gap-2 px-3 py-3 sm:px-4 rounded-full glass border border-gold-400/15 hover:border-gold-400/35 shadow-lg hover:shadow-gold-400/10 transition-all duration-300"
          >
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF0000]/15 group-hover:bg-[#FF0000]/25 transition-colors duration-300"
            >
              <Youtube className="w-3.5 h-3.5 text-[#FF0000]" strokeWidth={2} />
            </motion.span>
            <span className="hidden sm:block text-cream/70 text-xs font-medium pr-1 whitespace-nowrap">
              La Hora del Café
            </span>
          </a>

          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram — @lahoradelcafe.tv"
            className="group flex items-center gap-2 px-3 py-3 sm:px-4 rounded-full glass border border-gold-400/15 hover:border-gold-400/35 shadow-lg hover:shadow-gold-400/10 transition-all duration-300"
          >
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-gold-400/15 group-hover:bg-gold-400/25 transition-colors duration-300"
            >
              <Instagram className="w-3.5 h-3.5 text-gold-400" strokeWidth={2} />
            </motion.span>
            <span className="hidden sm:block text-cream/70 text-xs font-medium pr-1 whitespace-nowrap">
              @lahoradelcafe.tv
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
