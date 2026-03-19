"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith("/en") ? "en" : "es";

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(es|en)/, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/20 p-0.5 text-sm">
      <button
        onClick={() => switchLocale("es")}
        className={`rounded-full px-3 py-1 transition-all duration-300 font-medium ${
          currentLocale === "es"
            ? "bg-white text-globe-500"
            : "text-white/70 hover:text-white"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`rounded-full px-3 py-1 transition-all duration-300 font-medium ${
          currentLocale === "en"
            ? "bg-white text-globe-500"
            : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
