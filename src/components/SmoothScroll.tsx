"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/** Smooth scroll con inercia (Lenis). Se desactiva con prefers-reduced-motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);

    let rafId = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
