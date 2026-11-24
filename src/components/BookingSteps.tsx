"use client";

import { motion, useReducedMotion } from "framer-motion";
import { bookingSection, site } from "@/content/site";
import MagneticButton from "@/components/MagneticButton";
import LogoBadge from "@/components/LogoBadge";
import { CalendarIcon } from "@/components/icons";

/**
 * "¿Cómo reservar?" — los 5 pasos de la pieza oficial de Facebook
 * ("Agenda tu cita con nosotros"), con línea dorada que se dibuja al scroll.
 */
export default function BookingSteps() {
  const reduced = useReducedMotion();

  return (
    <section id="reserva" className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 20%, rgba(201,161,74,0.12), transparent 50%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gilt">
            <span aria-hidden className="inline-block h-px w-10 bg-gilt" />
            {bookingSection.kicker}
          </p>
          <h2 className="font-display text-6xl uppercase leading-[0.9] sm:text-8xl">
            <span className="text-gold-metal">Agenda tu cita</span>
            <br />
            <span className="text-bone">con nosotros</span>
          </h2>
          <p className="mt-6 max-w-md text-smoke">{bookingSection.intro}</p>

          {/* Ticket "¡Y listo!" */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: reduced ? 0 : -1.5 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mt-10 flex max-w-md items-center gap-5 border border-dashed border-gold/50 bg-ink2 p-5"
          >
            <LogoBadge className="h-16 w-16" />
            <div className="flex-1">
              <p className="font-display text-4xl uppercase leading-none text-gold-metal">
                {bookingSection.done}
              </p>
              <p className="mt-1 font-display text-xl uppercase tracking-[0.2em] text-bone/80">
                {bookingSection.doneSub}
              </p>
            </div>
          </motion.div>

          <div className="mt-8">
            <MagneticButton
              href={site.bookingUrl}
              external
              pole
              ariaLabel={`Reservar ahora en ${site.bookingLabel}`}
              className="text-xl text-bone"
            >
              <CalendarIcon className="h-5 w-5 text-gold" strokeWidth={2} />
              {bookingSection.cta}
            </MagneticButton>
          </div>
        </div>

        <ol className="relative space-y-4">
          {/* Línea vertical que se dibuja */}
          <motion.span
            aria-hidden
            className="absolute bottom-8 left-[2.15rem] top-8 w-px origin-top bg-gradient-to-b from-gold via-gold/60 to-gold/0"
            initial={{ scaleY: reduced ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {bookingSection.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex items-center gap-6 border border-bone/10 bg-ink2/80 p-4 pr-6 backdrop-blur-sm transition-colors hover:border-gold/50"
            >
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-ink font-display text-2xl text-gold">
                {i + 1}
              </span>
              <div>
                <p className="font-display text-2xl uppercase tracking-wide text-bone sm:text-3xl">
                  {step.title}
                </p>
                {i === 0 ? (
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-block bg-bone px-2 font-display text-lg uppercase tracking-[0.15em] text-ink transition-colors hover:bg-gilt"
                  >
                    www.{step.desc}
                  </a>
                ) : (
                  <p className="text-sm text-smoke">{step.desc}</p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
