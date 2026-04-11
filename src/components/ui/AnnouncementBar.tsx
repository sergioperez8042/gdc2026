"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, X, ArrowUpRight } from "lucide-react";

// Single source of truth for the bar's geometry + Navbar contract.
// `AB_CSS_VAR` is read by Navbar via `var(--ab-h, 0px)` to offset its `top`.
const AB_HEIGHT_PX = 44;
const AB_CSS_VAR = "--ab-h";
const DISMISSED = "dismissed";

interface AnnouncementBarProps {
  message: string;
  messageShort: string;
  cta: string;
  url: string;
  /** ISO date string. The bar will hide automatically after this date. */
  endDate: string;
  /** Storage key — bumping this resets dismissal for all users. */
  storageKey?: string;
}

export default function AnnouncementBar({
  message,
  messageShort,
  cta,
  url,
  endDate,
  storageKey = "gdc-announce-salon-gourmets-2026",
}: AnnouncementBarProps) {
  // Start hidden so SSR + first paint match. We mount-detect on the client.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Date.now() > new Date(endDate).getTime()) return;
    if (localStorage.getItem(storageKey) === DISMISSED) return;

    setVisible(true);
    document.documentElement.style.setProperty(AB_CSS_VAR, `${AB_HEIGHT_PX}px`);

    return () => {
      document.documentElement.style.setProperty(AB_CSS_VAR, "0px");
    };
  }, [endDate, storageKey]);

  const dismiss = useCallback(() => {
    localStorage.setItem(storageKey, DISMISSED);
    document.documentElement.style.setProperty(AB_CSS_VAR, "0px");
    setVisible(false);
  }, [storageKey]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gold-400 text-dark shadow-lg">
      <div
        style={{ height: `${AB_HEIGHT_PX}px` }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 text-sm"
      >
        <Calendar className="w-4 h-4 shrink-0" strokeWidth={2.5} />
        <span className="hidden sm:inline font-semibold flex-1 truncate">{message}</span>
        <span className="sm:hidden font-semibold flex-1 truncate text-xs">{messageShort}</span>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold underline underline-offset-4 hover:opacity-80 transition-opacity shrink-0"
        >
          {cta}
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </a>

        <button
          type="button"
          onClick={dismiss}
          className="ml-1 p-1 -mr-1 hover:bg-dark/10 rounded transition-colors shrink-0"
          aria-label="Cerrar anuncio"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
