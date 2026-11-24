"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { hero, images, site } from "@/content/site";
import { waLink } from "@/lib/wa";
import Marquee from "@/components/Marquee";
import LogoBadge from "@/components/LogoBadge";
import { CalendarIcon, WhatsAppIcon } from "@/components/icons";

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const geoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Máscara "corte de navaja": el clip-path diagonal revela el titular
  const clipHidden = "polygon(0 0, 0 0, -35% 100%, -35% 100%)";
  const clipShown = "polygon(0 0, 135% 0, 100% 100%, -35% 100%)";

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* Móvil: foto real del local de fondo */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={images.local}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale-[35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
      </div>

      {/* Pared geométrica del local (líneas blancas sobre negro) */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: geoY }}
        className="absolute -inset-y-[10%] inset-x-0 hidden bg-geo opacity-[0.07] md:block"
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(201,161,74,0.10), transparent 55%), linear-gradient(to top, #0a0a0a 0%, transparent 35%)",
        }}
      />

      <motion.div
        style={reduced ? undefined : { opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-6 pt-28 md:grid-cols-[1.25fr_1fr]"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gilt"
          >
            <span aria-hidden className="inline-block h-px w-10 bg-gilt" />
            {hero.kicker}
          </motion.p>

          <motion.h1
            initial={{ clipPath: reduced ? clipShown : clipHidden, opacity: reduced ? 0 : 1 }}
            animate={{ clipPath: clipShown, opacity: 1 }}
            transition={{ duration: reduced ? 0.6 : 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
            className="font-display uppercase leading-[0.82]"
          >
            <span className="distressed block text-[clamp(6rem,24vw,17rem)] text-bone">
              {hero.titleTop}
            </span>
            <span className="mt-2 flex items-center gap-4 text-[clamp(2rem,6.2vw,4.6rem)] tracking-[0.08em]">
              <span aria-hidden className="hidden h-[3px] w-12 bg-gold sm:block" />
              <span className="text-gold-metal">{hero.titleBottom}</span>
              <span aria-hidden className="hidden h-[3px] w-12 bg-gold sm:block" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-7 max-w-md text-lg leading-relaxed text-bone/85"
          >
            {hero.subtitle}{" "}
            <span className="font-script text-xl italic text-gilt">{hero.accent}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-metal inline-flex items-center gap-3 rounded-sm px-8 py-4 font-display text-xl uppercase tracking-[0.12em] text-ink shadow-lg shadow-gold/20 transition-transform hover:scale-[1.04]"
            >
              <CalendarIcon className="h-5 w-5" strokeWidth={2} />
              {hero.ctaPrimary}
            </a>
            <a
              href={waLink(hero.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-sm border border-bone/30 px-8 py-4 font-display text-xl uppercase tracking-[0.12em] text-bone transition-colors hover:border-gilt hover:text-gilt"
            >
              <WhatsAppIcon className="h-5 w-5" strokeWidth={2} />
              {hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Escritorio: foto real del local, enmarcada */}
        <motion.div
          style={reduced ? undefined : { y: photoY }}
          className="relative hidden md:block"
        >
          <motion.figure
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[420px]"
          >
            <span aria-hidden className="absolute -inset-3 border border-gilt/40" />
            <div className="relative aspect-[2/3] overflow-hidden bg-ink2">
              <Image
                src={images.local}
                alt="Interior de Zona Barber Shop: sillones, pared negra con líneas blancas y plantas en la entrada"
                fill
                priority
                sizes="420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            <figcaption className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.25em] text-bone/85">
              {hero.photoCaption}
            </figcaption>
            <motion.div
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 160, damping: 14 }}
              className="absolute -left-12 -top-10"
            >
              <LogoBadge className="h-28 w-28 drop-shadow-[0_12px_30px_rgba(0,0,0,0.7)]" />
            </motion.div>
          </motion.figure>
        </motion.div>
      </motion.div>

      {/* Marquee del borde inferior (invierte dirección con el scroll) */}
      <div className="relative z-10 mt-16 border-y border-gold/25 bg-ink/80 py-3 backdrop-blur-sm">
        <Marquee
          text={hero.marquee}
          baseVelocity={2.2}
          className="font-display text-xl uppercase tracking-[0.3em] text-gilt/90"
        />
      </div>
    </section>
  );
}
