"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { services, servicesSection, site, type Service } from "@/content/site";
import { ArrowUpRightIcon } from "@/components/icons";

/** Tarjeta con tilt 3D, número de sello y subrayado de navaja. */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className={`group relative flex flex-col overflow-hidden border bg-ink2 p-7 transition-colors duration-300 ${
        hovered ? "border-gold/70" : "border-bone/10"
      }`}
    >
      {/* Esquinas doradas tipo marco */}
      <span aria-hidden className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-gold" />
      <span aria-hidden className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-gold" />

      {/* Número gigante de fondo */}
      <span
        aria-hidden
        className="distressed pointer-events-none absolute -right-2 -top-6 font-display text-[9rem] leading-none text-bone/[0.05] transition-colors duration-500 group-hover:text-gold/[0.12]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="self-start border border-gilt/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gilt">
        {service.tag}
      </span>
      <h3 className="mt-5 font-display text-4xl uppercase tracking-wide text-bone">
        {service.name}
      </h3>
      {/* Navaja que subraya el nombre */}
      <svg viewBox="0 0 220 12" className="mt-1 h-3 w-48 text-gold" fill="none" aria-hidden>
        <motion.path
          d="M2 8 C 50 2, 120 12, 218 5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-smoke">{service.desc}</p>

      <a
        href={site.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Reservar ${service.name}`}
        className="mt-7 inline-flex items-center gap-2 self-start font-display text-lg uppercase tracking-[0.18em] text-gold transition-colors hover:text-gilt"
      >
        {servicesSection.reserveCta}
        <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-coal py-24">
      <div aria-hidden className="absolute inset-0 bg-geo opacity-[0.035]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gilt">
              <span aria-hidden className="inline-block h-px w-10 bg-gilt" />
              {servicesSection.kicker}
            </p>
            <h2 className="font-display text-5xl uppercase leading-[0.95] tracking-wide text-bone sm:text-7xl">
              {servicesSection.title}
            </h2>
          </div>
          <p className="text-smoke md:pb-2">{servicesSection.intro}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        <p className="mt-10 flex flex-wrap items-center gap-x-2 text-sm text-smoke">
          <span aria-hidden className="text-gold">★</span>
          {servicesSection.priceNote}
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gilt underline decoration-gold/50 underline-offset-4 transition-colors hover:text-bone"
          >
            {site.bookingLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
