"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
}

/**
 * Marquee infinito que invierte su dirección según la dirección del scroll.
 * Basado en velocidad de scroll (sin listeners sin throttle: todo va por rAF).
 */
export default function Marquee({
  text,
  baseVelocity = 2.5,
  className = "",
}: {
  text: string;
  baseVelocity?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden>
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block pr-2">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
