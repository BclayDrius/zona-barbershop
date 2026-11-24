"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BarberPole from "@/components/BarberPole";
import { images, site } from "@/content/site";

const KEY = "zona-preloader-seen";

/**
 * Preloader: anillo dorado que se dibuja alrededor del sello de Zona,
 * cortina que se abre en dos mitades. Solo primera visita, saltable.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    document.documentElement.style.overflow = "";
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    setVisible(true);
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(dismiss, reduced ? 700 : 2100);
    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [dismiss, reduced]);

  const curtain = { duration: reduced ? 0.3 : 0.8, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100]"
          role="button"
          tabIndex={0}
          aria-label="Saltar introducción"
          onClick={dismiss}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") dismiss();
          }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-ink"
            exit={{ x: "-100%" }}
            transition={curtain}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 border-l border-gold/20 bg-ink"
            exit={{ x: "100%" }}
            transition={curtain}
          />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-7"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-8">
              <BarberPole className="h-24 w-4" />
              <div className="relative h-36 w-36">
                <svg viewBox="0 0 120 120" className="absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] -rotate-90 text-gold" fill="none" aria-hidden>
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="57"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    initial={{ pathLength: reduced ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                  />
                </svg>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: reduced ? 0 : 0.5, type: "spring", stiffness: 150, damping: 14 }}
                  className="absolute inset-0"
                >
                  <Image src={images.logo} alt="" fill sizes="144px" priority className="object-contain" />
                </motion.span>
              </div>
              <BarberPole className="h-24 w-4" />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.8, duration: 0.5 }}
              className="font-display text-xl uppercase tracking-[0.4em] text-gilt"
            >
              {site.tagline}
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1 }}
              className="text-xs text-bone"
            >
              toca para saltar
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
