"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Hair {
  id: number;
  x: number;
  y: number;
  dx: number;
  rot: number;
}

/**
 * Cursor personalizado (solo desktop): punto que se convierte en tijeras
 * sobre elementos clickeables; al click, "corta" y suelta pelitos.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [snipping, setSnipping] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hairs, setHairs] = useState<Hair[]>([]);
  const idRef = useRef(0);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 600, damping: 45, mass: 0.5 });
  const y = useSpring(my, { stiffness: 600, damping: 45, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add("jb-cursor");

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target;
      setHovering(
        t instanceof Element &&
          !!t.closest("a, button, [role='button'], input, label, [data-cursor]"),
      );
    };
    const onDown = (e: MouseEvent) => {
      setSnipping(true);
      const base = idRef.current;
      idRef.current += 6;
      const burst: Hair[] = Array.from({ length: 6 }, (_, i) => ({
        id: base + i,
        x: e.clientX,
        y: e.clientY,
        dx: (Math.random() - 0.5) * 70,
        rot: Math.random() * 180,
      }));
      setHairs((h) => [...h, ...burst]);
      window.setTimeout(() => setSnipping(false), 180);
      window.setTimeout(() => setHairs((h) => h.slice(burst.length)), 750);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("jb-cursor");
    };
  }, [mx, my]);

  if (!enabled) return null;

  const blade = "M16 16 L29 4";
  const bladeMirror = "M16 16 L29 28";

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120]"
        style={{ x, y }}
        animate={{ opacity: hidden ? 0 : 1 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          {/* Punto base */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gilt"
            animate={{ scale: hovering ? 0 : 1, opacity: hovering ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          />
          {/* Tijeras abiertas */}
          <motion.div
            className="relative h-9 w-9"
            animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "18px 18px" }}
              animate={{ rotate: snipping ? 2 : 20 }}
              transition={{ type: "spring", stiffness: 700, damping: 22 }}
            >
              <svg viewBox="0 0 32 32" className="h-9 w-9 text-gilt" fill="none">
                <path d={blade} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M16 16 L10 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="7" cy="24" r="3.4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "18px 18px" }}
              animate={{ rotate: snipping ? -2 : -20 }}
              transition={{ type: "spring", stiffness: 700, damping: 22 }}
            >
              <svg viewBox="0 0 32 32" className="h-9 w-9 text-gilt" fill="none">
                <path d={bladeMirror} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M16 16 L10 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="7" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </motion.div>
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
          </motion.div>
        </div>
      </motion.div>

      {/* Pelitos cortados */}
      {hairs.map((h) => (
        <motion.span
          key={h.id}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[119] h-[7px] w-[2px] rounded-full bg-gilt"
          initial={{ x: h.x, y: h.y, opacity: 1, rotate: h.rot }}
          animate={{ x: h.x + h.dx, y: h.y + 80, opacity: 0, rotate: h.rot + 90 }}
          transition={{ duration: 0.7, ease: "easeIn" }}
        />
      ))}
    </>
  );
}
