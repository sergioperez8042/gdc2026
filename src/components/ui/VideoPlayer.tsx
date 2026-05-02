"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  /** Path to the MP4 file (under /public). */
  src: string;
  /** Optional WebM source for better compression on modern browsers. */
  srcWebm?: string;
  /** Poster image shown before play (under /public). */
  poster: string;
  /** Accessible label for the play button + alt text for poster. */
  title: string;
  /** Tailwind classes for the outer container — caller controls border-radius. */
  className?: string;
  /** Aspect ratio class (default 16:9). */
  aspect?: string;
}

// No autoplay: gives the user control and avoids paying the multi-MB download
// cost during initial page load (keeps Core Web Vitals clean). The <video>
// element is only mounted after the user clicks, so the network request is
// deferred until intent is shown — autoPlay then works because the browser
// counts the click as user activation.
export default function VideoPlayer({
  src,
  srcWebm,
  poster,
  title,
  className = "",
  aspect = "aspect-video",
}: VideoPlayerProps) {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return (
      <div className={`relative overflow-hidden bg-black ${aspect} ${className}`}>
        <video
          autoPlay
          controls
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          <source src={src} type="video/mp4" />
          Tu navegador no puede reproducir este video.
        </video>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-black ${aspect} ${className}`}>
      <button
        type="button"
        onClick={() => setActivated(true)}
        aria-label={`Reproducir video: ${title}`}
        className="group absolute inset-0 cursor-pointer"
      >
        <Image
          src={poster}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-400/90 text-dark shadow-2xl shadow-gold-400/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-400">
            <Play className="h-8 w-8 translate-x-0.5" strokeWidth={2.5} fill="currentColor" />
          </span>
        </span>
        <span className="absolute bottom-4 left-4 right-4 text-left">
          <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">
            FHA Singapore 2026
          </span>
          <span className="block text-sm font-semibold text-white drop-shadow-lg">
            {title}
          </span>
        </span>
      </button>
    </div>
  );
}
