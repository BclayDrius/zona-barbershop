"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { about, images } from "@/content/site";

/** Contador animado que arranca al entrar en viewport. */
function Counter({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix: string;
  suffix: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="font-display text-6xl text-gold-metal sm:text-7xl">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="nosotros" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-16 md:grid-cols-2">
        {/* Foto con marco doble y sello */}
        <motion.div
          initial={{ opacity: 0, rotate: -3, y: 30 }}
          whileInView={{ opacity: 1, rotate: -1.5, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <span aria-hidden className="absolute -inset-4 border border-gold/30" />
          <span aria-hidden className="absolute -inset-4 translate-x-3 translate-y-3 border border-bone/10" />
          <div className="relative aspect-[3/4] overflow-hidden bg-ink2">
            <Image
              src={images.about}
              alt="Barbero de Zona trabajando a tijera"
              fill
              sizes="(max-width: 768px) 90vw, 384px"
              className="object-cover grayscale contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
          <p className="absolute -bottom-7 right-0 rotate-[-3deg] bg-ink px-3 font-script text-3xl italic text-gilt">
            {about.signature}
          </p>
        </motion.div>

        <div>
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gilt">
            <span aria-hidden className="inline-block h-px w-10 bg-gilt" />
            {about.kicker}
          </p>
          <h2 className="font-display text-5xl uppercase leading-[0.95] tracking-wide text-bone sm:text-7xl">
            {about.title}
          </h2>

          {/* Texto revelado línea por línea */}
          <motion.div
            className="mt-8 space-y-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ show: { transition: { staggerChildren: 0.18 } }, hidden: {} }}
          >
            {about.lines.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.p
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    show: { y: "0%", opacity: 1 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`text-lg leading-relaxed ${
                    i === about.lines.length - 1 ? "font-semibold text-gilt" : "text-bone/80"
                  }`}
                >
                  {line}
                </motion.p>
              </div>
            ))}
          </motion.div>

          {/* Stats con contador animado */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gold/20 pt-8">
            {about.stats.map((s) => (
              <div key={s.label}>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-smoke">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
