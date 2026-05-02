import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoPlayer from "@/components/ui/VideoPlayer";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { historicalEvents, type HistoricalEvent } from "@/data/historicalEvents";

interface EventsSectionProps {
  dict: Dictionary;
  locale: Locale;
}

// Card content extracted so we can render it inside either <a> or <article>
// without duplicating JSX. Kept as a pure function component (module-level,
// not defined inside EventsSection — avoids `rerender-no-inline-components`).
function EventCardContent({
  event,
  locale,
}: {
  event: HistoricalEvent;
  locale: Locale;
}) {
  return (
    <>
      {/* Media: video player when event.video is set, otherwise static image.
          When the card is a link <a>, the video can't go inside (would nest
          interactive controls inside an anchor). The parent component handles
          this — see EventsSection: events with video render as <article>, never
          as <a>, and the video sits beside any external link button. */}
      <div className="relative aspect-[16/10] overflow-hidden bg-dark-border">
        {event.video ? (
          <VideoPlayer
            src={event.video.src}
            srcWebm={event.video.webm}
            poster={event.video.poster}
            title={event.name}
            aspect="aspect-[16/10]"
            className="!rounded-none"
          />
        ) : (
          <>
            <Image
              src={event.image}
              alt={event.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Bottom gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent pointer-events-none" />
          </>
        )}

        {/* Edition + year badge — overlay above the media (image or video poster) */}
        <div className="absolute top-4 left-4 z-10 bg-gold-400 text-dark text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          {event.edition[locale]} · {event.year}
        </div>

        {/* External link arrow (only shown when card has url and is rendered as <a>) */}
        {event.url && !event.video && (
          <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-dark/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-4 h-4 text-gold-300" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-heading text-xl font-bold text-cream mb-2 leading-tight group-hover:text-gold-300 transition-colors">
          {event.name}
        </h3>
        <div className="flex items-center gap-1.5 text-cream/55 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" strokeWidth={2} />
          <span>{event.location}</span>
        </div>
        <p className="text-cream/55 text-sm leading-relaxed">{event.description[locale]}</p>
      </div>
    </>
  );
}

const CARD_CLASSES =
  "group bg-dark-card border border-dark-border rounded-3xl overflow-hidden hover:border-gold-400/40 transition-all duration-300 h-full flex flex-col";

export default function EventsSection({ dict, locale }: EventsSectionProps) {
  // Render nothing when there is no data yet — satisfies "no mostrar nada".
  if (historicalEvents.length === 0) return null;

  const ev = dict.events;

  return (
    <section id="events" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-fresh-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              {ev.surtitle}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-4">
              {ev.title}
            </h2>
            <p className="text-cream/50 max-w-2xl mx-auto leading-relaxed">{ev.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {historicalEvents.map((event, i) => {
            // When an event has a video, the whole card MUST NOT be an <a>:
            // a video player has its own interactive controls and nesting them
            // inside an anchor breaks accessibility (and HTML spec). Instead we
            // render an <article> and put a separate "official site" link in
            // the body when there is a url.
            const wrapAsLink = event.url && !event.video;
            return (
              <ScrollReveal key={`${event.name}-${event.year}-${i}`} delay={i * 0.08}>
                {wrapAsLink ? (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CARD_CLASSES}
                  >
                    <EventCardContent event={event} locale={locale} />
                  </a>
                ) : (
                  <article className={CARD_CLASSES}>
                    <EventCardContent event={event} locale={locale} />
                    {event.url && event.video && (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-6 mb-6 -mt-2 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        Sitio oficial del evento
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.2} />
                      </a>
                    )}
                  </article>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
