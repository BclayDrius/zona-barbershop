"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Franja decorativa a lo ancho con parallax (background-attachment
 * simulado vía transform, compatible con Lenis y móvil).
 */
export default function ParallaxBand({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} aria-hidden className={`relative h-[40vh] overflow-hidden ${className}`}>
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-x-0 -inset-y-[15%]"
      >
        <Image src={src} alt="" fill sizes="100vw" className="object-cover grayscale" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
    </div>
  );
}
