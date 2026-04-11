"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface GallerySectionProps {
  dict: Dictionary;
}

const images = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/gallery/food-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Producto alimenticio ${i + 1}`,
}));

export default function GallerySection({ dict }: GallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [],
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-fresh-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-fresh-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              {dict.gallery.surtitle}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-4">
              {dict.gallery.title}
            </h2>
            <p className="text-cream/50 max-w-2xl mx-auto leading-relaxed">
              {dict.gallery.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, i) => (
            <ScrollReveal key={img.src} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                style={{ aspectRatio: "1 / 1" }}
                className="group relative block w-full overflow-hidden rounded-2xl border border-dark-border bg-dark-card focus:outline-none focus:ring-2 focus:ring-fresh-400 focus:ring-offset-2 focus:ring-offset-dark"
                aria-label={`Ver imagen ${i + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-cream hover:bg-dark-border transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-cream hover:bg-dark-border transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-cream hover:bg-dark-border transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
                priority
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream/70 text-sm font-medium">
                {lightboxIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
