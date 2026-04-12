import Image from "next/image";
import { Instagram, Youtube } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import type { Dictionary } from "@/i18n/dictionaries";

interface FooterProps {
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="bg-coffee-900/30 relative">
      <div className="gold-line w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top: Logo + description */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-12">
          <Image src="/logos/gdc-logo-full.png" alt="GDC" width={120} height={120} className="mb-3" />
          <h3 className="text-cream font-heading text-lg font-bold">
            Global Distribuidora y Comercializadora
          </h3>
          <p className="text-cream/25 text-xs mt-1">{COMPANY.rif}</p>
          <p className="text-cream/35 text-sm leading-relaxed mt-3 max-w-md">
            {dict.footer.description}
          </p>
          <div className="flex items-center gap-4 mt-5">
            <a
              href="https://www.instagram.com/lahoradelcafe.tv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream/30 hover:text-gold-400 transition-colors duration-300"
            >
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://youtube.com/@lahoradelcafecondt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-cream/30 hover:text-gold-400 transition-colors duration-300"
            >
              <Youtube className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Middle: single column on mobile, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 mb-10 lg:mb-12 text-center sm:text-left">
          {/* Nav links */}
          <div>
            <h4 className="text-cream font-semibold mb-3 text-xs uppercase tracking-wider">
              Menu
            </h4>
            <ul className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 sm:flex-col sm:space-y-1 sm:gap-0">
              {(["about", "services", "mission", "vision", "contact"] as const).map((key) => (
                <li key={key}>
                  <a href={`#${key}`} className="text-cream/35 hover:text-gold-400 text-sm transition-colors duration-300">
                    {dict.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-cream font-semibold mb-3 text-xs uppercase tracking-wider">
              Contacto
            </h4>
            <div className="space-y-2 text-sm text-cream/35">
              <p>{COMPANY.fullAddress}</p>
              <div className="flex flex-col items-center sm:items-start gap-1 mt-2">
                <a href={`tel:${COMPANY.phone.ve.replace(/\s/g, "")}`} className="hover:text-gold-400 transition-colors duration-300">
                  VE {COMPANY.phone.ve}
                </a>
                <a href={`tel:${COMPANY.phone.es.replace(/\s/g, "")}`} className="hover:text-gold-400 transition-colors duration-300">
                  ES {COMPANY.phone.es}
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <h4 className="text-cream font-semibold mb-3 text-xs uppercase tracking-wider">
              {dict.contact.info.emailLabel}
            </h4>
            <a href={`mailto:${COMPANY.email}`} className="text-cream/35 hover:text-gold-400 text-sm transition-colors duration-300 break-all">
              {COMPANY.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-border pt-6 text-center">
          <p className="text-cream/20 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} {COMPANY.name} {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
