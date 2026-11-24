"use client";

import { motion } from "framer-motion";
import { pillars, pillarsSection } from "@/content/site";
import { CalendarIcon, ClockIcon, ScissorsIcon, SprayIcon } from "@/components/icons";

const icons = {
  clock: ClockIcon,
  spray: SprayIcon,
  scissors: ScissorsIcon,
  calendar: CalendarIcon,
} as const;

/** Los cuatro pilares de "la experiencia Zona", sacados de su intro de Facebook. */
export default function Pillars() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gilt">
            <span aria-hidden className="inline-block h-px w-10 bg-gilt" />
            {pillarsSection.kicker}
            <span aria-hidden className="inline-block h-px w-10 bg-gilt" />
          </p>
          <h2 className="font-display text-5xl uppercase tracking-wide text-bone sm:text-7xl">
            {pillarsSection.title}
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative bg-ink p-8 transition-colors duration-300 hover:bg-ink2"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold-metal transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 font-display text-3xl uppercase tracking-wide text-bone">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-smoke">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
