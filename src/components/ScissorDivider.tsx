"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScissorsIcon } from "@/components/icons";

interface Tone {
  dashed: string;
  solid: string;
  mask: string;
  scissors: string;
}

const tones: Record<"dark" | "school", Tone> = {
  dark: {
    dashed: "border-gilt/25",
    solid: "border-gilt/40",
    mask: "border-ink",
    scissors: "text-gilt",
  },
  /* Estilo cuaderno escolar: línea celeste sobre fondo smoke */
  school: {
    dashed: "border-pole/50",
    solid: "border-pole/70",
    mask: "border-smoke",
    scissors: "text-coal",
  },
};

/**
 * Separador firma: una tijera recorre la línea punteada "cortándola"
 * y las dos mitades se separan 8px.
 */
export default function ScissorDivider({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "school";
}) {
  const reduced = useReducedMotion();
  const t = tones[tone];

  if (reduced) {
    return (
      <div aria-hidden className={`mx-auto max-w-6xl px-6 ${className}`}>
        <div className={`border-t-2 border-dashed ${t.dashed}`} />
      </div>
    );
  }

  return (
    <div aria-hidden className={`mx-auto max-w-6xl px-6 ${className}`}>
      <motion.div
        className="relative h-10 overflow-hidden"
        initial="idle"
        whileInView="cut"
        viewport={{ once: true, amount: 0.9 }}
      >
        {/* Margen rojo de cuaderno (solo tono escolar) */}
        {tone === "school" && (
          <span className="absolute -top-1 bottom-0 left-10 w-px bg-blood/40" />
        )}

        {/* Línea guía punteada (lado aún no cortado) */}
        <div className={`absolute inset-x-0 top-1/2 border-t-2 border-dashed ${t.dashed}`} />

        {/* Zona ya cortada: dos mitades separadas 8px */}
        <motion.div
          className="absolute inset-y-0 left-0 overflow-hidden"
          variants={{
            idle: { width: "0%" },
            cut: { width: "100%" },
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className={`absolute inset-x-0 top-1/2 -translate-y-[5px] border-t-2 ${t.solid}`} />
          <div className={`absolute inset-x-0 top-1/2 translate-y-[3px] border-t-2 ${t.solid}`} />
          <div className={`absolute inset-x-0 top-1/2 border-t-2 border-dashed ${t.mask}`} />
        </motion.div>

        {/* Tijeras viajeras */}
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 ${t.scissors}`}
          variants={{
            idle: { left: "-3%", opacity: 0 },
            cut: { left: "100%", opacity: [0, 1, 1, 1, 0] },
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div
            variants={{
              idle: { scaleY: 1 },
              cut: { scaleY: [1, 0.55, 1, 0.55, 1] },
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <ScissorsIcon className="h-7 w-7 rotate-180" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
