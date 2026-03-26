"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("preloaded")) return;
    setVisible(true);
    sessionStorage.setItem("preloaded", "1");
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-dark"
      style={{ animation: "preloaderFade 2s ease-in-out forwards" }}
    >
      <div className="preloader-logo">
        <Image
          src="/logos/gdc-logo-full.png"
          alt="GDC"
          width={120}
          height={120}
          priority
        />
      </div>
    </div>
  );
}
