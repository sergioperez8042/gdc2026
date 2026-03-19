import Image from "next/image";
import { COMPANY } from "@/lib/constants";
import type { Dictionary } from "@/i18n/dictionaries";

interface FooterProps {
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="bg-globe-900 text-globe-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logos/gdc-logo-full.png"
                alt="GDC"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="text-white font-heading text-lg font-bold">
                  GDC
                </h3>
                <p className="text-globe-400 text-xs">
                  {COMPANY.rif}
                </p>
              </div>
            </div>
            <p className="text-globe-300 text-sm leading-relaxed">
              {dict.footer.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {dict.nav.about}
            </h4>
            <ul className="space-y-2">
              {(["about", "services", "mission", "vision", "contact"] as const).map(
                (key) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      className="text-globe-300 hover:text-gold-400 text-sm transition-colors duration-300"
                    >
                      {dict.nav[key]}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact summary */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {dict.contact.title}
            </h4>
            <div className="space-y-3 text-sm text-globe-300">
              <p>{COMPANY.fullAddress}</p>
              <p>
                <a
                  href={`tel:${COMPANY.phone.ve.replace(/\s/g, "")}`}
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  {COMPANY.phone.ve}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${COMPANY.phone.es.replace(/\s/g, "")}`}
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  {COMPANY.phone.es}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-globe-700 mt-12 pt-8 text-center">
          <p className="text-globe-400 text-sm">
            &copy; {new Date().getFullYear()} {COMPANY.name}{" "}
            {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
