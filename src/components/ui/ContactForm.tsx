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
      <div className="flex items-center justify-center rounded-2xl bg-fresh-50 border border-fresh-200 p-12 text-center">
        <div>
          <div className="w-12 h-12 mx-auto rounded-full bg-fresh-100 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-fresh-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-fresh-700 text-lg font-medium">{dict.success}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input
          type="text"
          placeholder={dict.name}
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-charcoal placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-coffee-400 focus:ring-2 focus:ring-coffee-100"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder={dict.email}
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-charcoal placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-coffee-400 focus:ring-2 focus:ring-coffee-100"
        />
        <input
          type="tel"
          placeholder={dict.phone}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-charcoal placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-coffee-400 focus:ring-2 focus:ring-coffee-100"
        />
      </div>
      <div>
        <select
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-charcoal outline-none transition-all duration-300 focus:border-coffee-400 focus:ring-2 focus:ring-coffee-100"
        >
          <option value="">{dict.subject}</option>
          <option value="general">{dict.subjects.general}</option>
          <option value="coffee">{dict.subjects.coffee}</option>
          <option value="distribution">{dict.subjects.distribution}</option>
          <option value="other">{dict.subjects.other}</option>
        </select>
      </div>
      <div>
        <textarea
          placeholder={dict.message}
          required
          rows={5}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-charcoal placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-coffee-400 focus:ring-2 focus:ring-coffee-100 resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-coffee-500 px-8 py-3.5 text-white font-semibold transition-all duration-300 hover:bg-coffee-600 hover:shadow-lg hover:shadow-coffee-500/25 active:scale-[0.98]"
      >
        {dict.send}
      </button>
    </form>
  );
}
