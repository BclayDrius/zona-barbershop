"use client";

import { motion } from "framer-motion";
import { hoursSection, site } from "@/content/site";
import { fmtHour, useOpenNow } from "@/lib/useOpenNow";
import { CalendarIcon, PinIcon } from "@/components/icons";

/** Orden de la semana empezando en lunes (índices de JS). */
const weekOrder = [1, 2, 3, 4, 5, 6, 0];

export default function Hours() {
  const { open, time, weekday } = useOpenNow();

  return (
    <section id="horario" className="relative overflow-hidden bg-bone py-24 text-ink">
      {/* Líneas geométricas en negro sobre hueso: la pared del local en negativo */}
      <div aria-hidden className="absolute inset-0 bg-geo opacity-[0.07] invert" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink/60">
              <span aria-hidden className="inline-block h-px w-10 bg-ink/60" />
              {hoursSection.kicker}
            </p>
            <h2 className="font-display text-5xl uppercase leading-[0.95] tracking-wide sm:text-7xl">
              {hoursSection.title}
            </h2>
          </div>

          {/* Badge ABIERTO / CERRADO calculado con hora de Lima */}
          <div className="inline-flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-bone shadow-lg">
            <span
              aria-hidden
              className={`h-2.5 w-2.5 rounded-full animate-pulse-dot ${
                open === null ? "bg-smoke" : open ? "bg-ok text-ok" : "bg-blood text-blood"
              }`}
            />
            <span
              className={`font-display text-lg uppercase tracking-[0.2em] ${
                open === null ? "text-smoke" : open ? "text-ok" : "text-blood"
              }`}
              aria-live="polite"
            >
              {open === null ? "···" : open ? hoursSection.openLabel : hoursSection.closedLabel}
            </span>
            {time && <span className="text-xs text-bone/60">{time} en Lima</span>}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Tabla semanal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-ink p-7 text-bone shadow-2xl shadow-ink/30"
          >
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gilt">
              <CalendarIcon className="h-4 w-4" /> Horario de atención
            </p>
            <ul className="mt-5 divide-y divide-bone/10">
              {weekOrder.map((i) => {
                const d = site.schedule[i];
                if (!d) return null;
                const isToday = i === weekday;
                return (
                  <li
                    key={d.day}
                    className={`flex items-center justify-between py-3 ${
                      isToday ? "text-gold" : "text-bone/80"
                    }`}
                  >
                    <span className="flex items-center gap-3 font-display text-2xl uppercase tracking-wide">
                      {d.day}
                      {isToday && (
                        <span className="bg-gold px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                          {hoursSection.todayLabel}
                        </span>
                      )}
                    </span>
                    <span className="text-sm font-semibold tabular-nums">
                      {fmtHour(d.open)} – {fmtHour(d.close)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-sm text-smoke">
              {open ? hoursSection.openHint : hoursSection.closedHint}
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-metal mt-6 inline-flex w-full items-center justify-center gap-2 py-3.5 font-display text-xl uppercase tracking-[0.15em] text-ink transition-transform hover:scale-[1.02]"
            >
              <CalendarIcon className="h-5 w-5" strokeWidth={2} /> Agenda tu cita
            </a>
          </motion.div>

          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col overflow-hidden border-2 border-ink bg-ink"
          >
            <iframe
              title="Mapa: Zona Barber Shop, Av. Rosa Toro 1038, San Borja"
              src={site.location.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full flex-1 grayscale invert-[0.92] hue-rotate-180 lg:h-auto lg:min-h-80"
            />
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 text-bone">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gilt">
                  <PinIcon className="h-4 w-4" /> {hoursSection.directionsTitle}
                </p>
                <p className="mt-2 font-display text-3xl uppercase tracking-wide">
                  {site.location.address}
                </p>
                <p className="text-sm text-smoke">{site.location.district}</p>
              </div>
              <a
                href={site.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-bone/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:border-gold hover:bg-gold hover:text-ink"
              >
                {hoursSection.directionsCta}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
