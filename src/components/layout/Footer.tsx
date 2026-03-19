import Image from "next/image";
import { COMPANY } from "@/lib/constants";
import type { Dictionary } from "@/i18n/dictionaries";

interface FooterProps {
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="bg-coffee-900/30 border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top: Logo + description */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-12">
          <Image src="/logos/gdc-logo-full.png" alt="GDC" width={80} height={80} className="mb-3" />
          <h3 className="text-cream font-heading text-lg font-bold">
            Global Distribuidora y Comercializadora
          </h3>
          <p className="text-cream/25 text-xs mt-1">{COMPANY.rif}</p>
          <p className="text-cream/35 text-sm leading-relaxed mt-3 max-w-md">
            {dict.footer.description}
          </p>
        </div>

        {/* Middle: Links + Contact in 2 cols on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-10 lg:mb-12">
          {/* Nav links */}
          <div>
            <h4 className="text-cream font-semibold mb-3 text-xs uppercase tracking-wider">
              Menu
            </h4>
            <ul className="space-y-2">
              {(["about", "services", "mission", "vision", "contact"] as const).map((key) => (
                <li key={key}>
                  <a href={`#${key}`} className="text-cream/35 hover:text-gold-400 text-sm transition-colors duration-300">
                    {dict.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream font-semibold mb-3 text-xs uppercase tracking-wider">
              {dict.contact.info.address}
            </h4>
            <div className="space-y-2 text-sm text-cream/35">
              <p>{COMPANY.address.city}, {COMPANY.address.country}</p>
              <a href={`tel:${COMPANY.phone.ve.replace(/\s/g, "")}`} className="block hover:text-gold-400 transition-colors duration-300">
                {COMPANY.phone.ve}
              </a>
              <a href={`tel:${COMPANY.phone.es.replace(/\s/g, "")}`} className="block hover:text-gold-400 transition-colors duration-300">
                {COMPANY.phone.es}
              </a>
            </div>
          </div>

          {/* Email - hidden on mobile (shown in contact col), visible on lg */}
          <div className="col-span-2 lg:col-span-1">
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
