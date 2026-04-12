"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CardCarouselProps {
  images: { src: string; alt: string }[];
  interval?: number;
  badge?: {
    label: string;
    className: string;
  };
}

export default function CardCarousel({
  images,
  interval = 4000,
  badge,
}: CardCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [paused, images.length, interval]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/10] bg-dark-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { opacity: { duration: 1 }, scale: { duration: interval / 1000 + 1, ease: "linear" } },
          }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="absolute inset-0"
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none" />

      {/* Badge */}
      {badge && (
        <div
          className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full z-10 ${badge.className}`}
        >
          {badge.label}
        </div>
      )}

      {/* Progress dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-cream" : "w-1.5 bg-cream/40 hover:bg-cream/60"
              }`}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
