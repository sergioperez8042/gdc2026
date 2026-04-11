import { Calendar, MapPin, Clock, ArrowUpRight, CircleCheck } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface EventsSectionProps {
  dict: Dictionary;
}

export default function EventsSection({ dict }: EventsSectionProps) {
  const ev = dict.events;

  return (
    <section id="events" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-fresh-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              {ev.surtitle}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-cream">
              {ev.title}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
              {/* Date pillar */}
              <div className="bg-gradient-to-br from-gold-400/15 via-gold-400/5 to-transparent border-b lg:border-b-0 lg:border-r border-dark-border p-8 lg:p-10 flex flex-col justify-center items-center text-center">
                <Calendar className="w-8 h-8 text-gold-400 mb-4" strokeWidth={1.5} />
                <p className="font-heading text-3xl md:text-4xl font-bold text-cream leading-tight">
                  {ev.dateLabel}
                </p>
                <p className="font-heading text-2xl text-gold-400 mt-1">{ev.year}</p>
                <div className="mt-6 pt-6 border-t border-dark-border w-full space-y-3 text-left">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-cream text-sm font-semibold">{ev.venue}</p>
                      <p className="text-cream/50 text-xs">{ev.venueDetail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-cream/50 text-xs leading-snug">{ev.schedule}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10">
                <p className="text-cream/60 leading-relaxed mb-6">{ev.subtitle}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center md:text-left">
                    <p className="font-heading text-2xl md:text-3xl font-bold text-gold-300">
                      {ev.stats.exhibitorsValue}
                    </p>
                    <p className="text-cream/45 text-xs uppercase tracking-wider mt-1">
                      {ev.stats.exhibitors}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="font-heading text-2xl md:text-3xl font-bold text-gold-300">
                      {ev.stats.visitorsValue}
                    </p>
                    <p className="text-cream/45 text-xs uppercase tracking-wider mt-1">
                      {ev.stats.visitors}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="font-heading text-2xl md:text-3xl font-bold text-gold-300">
                      {ev.stats.productsValue}
                    </p>
                    <p className="text-cream/45 text-xs uppercase tracking-wider mt-1">
                      {ev.stats.products}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <p className="text-cream/70 text-sm font-semibold mb-3">{ev.highlights.intro}</p>
                <ul className="space-y-2.5 mb-8">
                  {ev.highlights.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CircleCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-cream/55 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={ev.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-500 text-dark font-semibold px-6 py-3 rounded-full transition-colors"
                  >
                    {ev.ctaPrimary}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                  </a>
                  <a
                    href={ev.venueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-dark-border hover:border-gold-400/50 text-cream/80 hover:text-cream font-semibold px-6 py-3 rounded-full transition-colors"
                  >
                    {ev.ctaSecondary}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
