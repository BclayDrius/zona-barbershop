"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  CombIcon,
  DryerIcon,
  RazorIcon,
  ScissorsIcon,
  SprayIcon,
} from "@/components/icons";

interface ToolSpec {
  Icon: typeof CombIcon;
  className: string;
  /** tono dorado tenue */
  color: string;
  speed: number;
  rotate: number;
}

const tools: ToolSpec[] = [
  { Icon: CombIcon, className: "left-[4%] top-[20%] h-14 w-14", color: "text-gilt/20", speed: -180, rotate: 24 },
  { Icon: RazorIcon, className: "right-[5%] top-[38%] h-16 w-16", color: "text-gilt/20", speed: -320, rotate: -30 },
  { Icon: SprayIcon, className: "left-[8%] top-[50%] h-12 w-12", color: "text-gilt/20", speed: -240, rotate: 18 },
  { Icon: DryerIcon, className: "right-[5%] top-[66%] h-16 w-16", color: "text-gilt/20", speed: -150, rotate: -20 },
  { Icon: ScissorsIcon, className: "left-[5%] top-[84%] h-12 w-12", color: "text-gilt/20", speed: -280, rotate: 40 },
];

function Tool({
  spec,
  progress,
}: {
  spec: ToolSpec;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [0, spec.speed]);
  const rotate = useTransform(progress, [0, 1], [0, spec.rotate]);
  const { Icon } = spec;
  return (
    <motion.div style={{ y, rotate }} className={`absolute ${spec.className} ${spec.color}`}>
      <Icon className="h-full w-full" strokeWidth={1.3} />
    </motion.div>
  );
}

/**
 * Herramientas de barbería line-art flotando con parallax multi-capa.
 * Decorativas: nunca interceptan clicks ni estorban el contenido.
 */
export default function FloatingTools() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {tools.map((t, i) => (
        <Tool key={i} spec={t} progress={scrollYProgress} />
      ))}
    </div>
  );
}
