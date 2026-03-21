"use client";

import Image from "next/image";

export default function Preloader() {
  return (
    <div className="preloader">
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
