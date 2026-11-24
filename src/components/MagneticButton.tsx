"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Botón magnético que sigue el cursor. `pole` añade un borde de rayas
 * de poste de barbero girando alrededor.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  pole = false,
  external = false,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  pole?: boolean;
  external?: boolean;
  ariaLabel?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
  );

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full font-display uppercase tracking-widest ${
        pole ? "p-[3px]" : ""
      } ${className}`}
    >
      {pole && (
        <span aria-hidden className="absolute inset-0 gold-stripes-animated opacity-90" />
      )}
      {pole ? (
        <span className="relative z-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 transition-colors group-hover:bg-ink2">
          {inner}
        </span>
      ) : (
        inner
      )}
    </motion.a>
  );
}
