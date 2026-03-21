"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || isNaN(numericPart)) return;
    const duration = 1500;
    const steps = 40;
    const increment = numericPart / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= numericPart) {
        setCount(numericPart);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [visible, numericPart]);

  return (
    <div ref={ref} className="glass rounded-xl px-5 py-3 text-center">
      <div className="font-heading text-2xl md:text-3xl font-bold text-gold-300">
        {visible ? `${count}${suffix}` : value}
      </div>
      <div className="text-[10px] md:text-xs tracking-[0.2em] text-cream/50 uppercase mt-1">
        {label}
      </div>
    </div>
  );
}
