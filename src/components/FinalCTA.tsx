"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { finalCta, site } from "@/content/site";
import { waLink } from "@/lib/wa";
import MagneticButton from "@/components/MagneticButton";
import { CalendarIcon, WhatsAppIcon } from "@/components/icons";

export default function FinalCTA() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.25"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  const titleClass =
    "font-display uppercase leading-none tracking-tight text-[clamp(3.2rem,11vw,10rem)]";

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* Pared geométrica con viñeta */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-geo opacity-[0.09]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,161,74,0.10) 0%, transparent 45%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      <div className="relative">
        {/* Outline dorado que se rellena de oro metálico con el scroll */}
        <h2 className={`${titleClass} text-stroke-gilt`}>{finalCta.title}</h2>
        <motion.p
          aria-hidden
          style={reduced ? undefined : { clipPath: clip }}
          className={`${titleClass} absolute inset-0 text-gold-metal`}
        >
          {finalCta.title}
        </motion.p>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative mt-8 max-w-md font-script text-2xl italic text-bone/85"
      >
        {finalCta.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton
          href={site.bookingUrl}
          external
          pole
          ariaLabel="Agenda tu cita en línea"
          className="text-xl text-bone"
        >
          <CalendarIcon className="h-6 w-6 text-gold" strokeWidth={2} />
          {finalCta.cta}
        </MagneticButton>
        <a
          href={waLink(finalCta.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-bone/30 px-7 py-4 font-display text-xl uppercase tracking-widest text-bone transition-colors hover:border-gilt hover:text-gilt"
        >
          <WhatsAppIcon className="h-5 w-5" /> {finalCta.waCta}
        </a>
      </motion.div>
    </section>
  );
}
