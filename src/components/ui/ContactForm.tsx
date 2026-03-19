"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

interface ContactFormProps {
  dict: Dictionary["contact"]["form"];
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center rounded-2xl bg-fresh-500/10 border border-fresh-500/20 p-12 text-center">
        <div>
          <div className="w-12 h-12 mx-auto rounded-full bg-fresh-500/20 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-fresh-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-fresh-300 text-lg font-medium">{dict.success}</p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-dark-border bg-dark/50 px-4 py-3 text-cream placeholder:text-cream/25 outline-none transition-all duration-300 focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input type="text" placeholder={dict.name} required className={inputClass} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="email" placeholder={dict.email} required className={inputClass} />
        <input type="tel" placeholder={dict.phone} className={inputClass} />
      </div>
      <div>
        <select required className={inputClass}>
          <option value="" className="bg-dark-card">{dict.subject}</option>
          <option value="general" className="bg-dark-card">{dict.subjects.general}</option>
          <option value="coffee" className="bg-dark-card">{dict.subjects.coffee}</option>
          <option value="distribution" className="bg-dark-card">{dict.subjects.distribution}</option>
          <option value="other" className="bg-dark-card">{dict.subjects.other}</option>
        </select>
      </div>
      <div>
        <textarea placeholder={dict.message} required rows={5} className={`${inputClass} resize-none`} />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-gold-400 hover:bg-gold-500 px-8 py-3.5 text-dark font-bold transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/20 active:scale-[0.98]"
      >
        {dict.send}
      </button>
    </form>
  );
}
