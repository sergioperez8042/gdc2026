"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { usePathname } from "next/navigation";

const navLinks = [
  { id: "about", es: "Quiénes Somos", en: "About" },
  { id: "services", es: "Servicios", en: "Services" },
  { id: "mission", es: "Misión", en: "Mission" },
  { id: "vision", es: "Visión", en: "Vision" },
  { id: "contact", es: "Contacto", en: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-globe-500/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Image
            src="/logos/gdc-logo-stamp.png"
            alt="GDC"
            width={44}
            height={44}
            className="rounded-full transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden sm:block text-white font-heading text-lg font-bold tracking-wide">
            GDC
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link[locale]}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-globe-500/95 backdrop-blur-md px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              className="block text-white/80 hover:text-white py-2 text-base font-medium tracking-wide transition-colors duration-300"
            >
              {link[locale]}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
