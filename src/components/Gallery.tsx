"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gallery, gallerySection, type GalleryCategory } from "@/content/site";
import { getLenis } from "@/lib/lenis";

type Filter = "todos" | GalleryCategory;

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const filtered =
    filter === "todos" ? gallery : gallery.filter((g) => g.category === filter);
  const current = index !== null ? filtered[index] : undefined;

  // Navegación por teclado del lightbox + bloqueo de scroll
  useEffect(() => {
    if (index === null) return;
    const lenis = getLenis();
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight")
        setIndex((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
  }, [index, filtered.length]);

  return (
    <section id="galeria" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gilt">
            <span aria-hidden className="inline-block h-px w-10 bg-gilt" />
            {gallerySection.kicker}
          </p>
          <h2 className="font-display text-5xl uppercase leading-[0.95] tracking-wide text-bone sm:text-7xl">
            {gallerySection.title}
          </h2>
          <p className="mt-4 text-smoke">{gallerySection.intro}</p>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar galería">
          {gallerySection.filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id as Filter);
                setIndex(null);
              }}
              className={`relative border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                filter === f.id
                  ? "border-gold bg-gold text-ink"
                  : "border-bone/25 text-bone/70 hover:border-gilt/60 hover:text-gilt"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid masonry con layout animations */}
      <motion.div
        layout
        className="grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[210px] md:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.button
              layout
              key={item.src}
              type="button"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
              onClick={() => setIndex(i)}
              aria-label={`Ampliar: ${item.alt}`}
              className={`group relative overflow-hidden border border-bone/5 ${
                item.tall ? "row-span-2" : ""
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover grayscale contrast-[1.08] transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              {/* Barrido dorado diagonal al pasar el cursor */}
              <span
                aria-hidden
                className="absolute inset-0 bg-gold/30 mix-blend-overlay transition-[clip-path] duration-500 ease-out [clip-path:polygon(0_0,0_0,-40%_140%,0_0)] group-hover:[clip-path:polygon(0_0,140%_0,100%_140%,0_100%)]"
              />
              <span aria-hidden className="absolute inset-0 border border-gold/0 transition-colors duration-300 group-hover:border-gold/70" />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/90 to-transparent p-3 pt-8 text-left text-xs text-bone/90 transition-transform duration-300 group-hover:translate-y-0">
                {item.alt}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-ink/95 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative h-[72vh] w-full max-w-3xl overflow-hidden rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 900px) 92vw, 768px"
                className="object-cover"
              />
            </motion.div>

            <div
              className="mt-5 flex items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => setIndex((index - 1 + filtered.length) % filtered.length)}
                className="rounded-full border border-bone/30 px-5 py-2.5 text-bone transition-colors hover:border-gilt hover:text-gilt"
              >
                ←
              </button>
              <p className="text-xs uppercase tracking-[0.25em] text-bone/60">
                {index + 1} / {filtered.length} — {current.alt}
              </p>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => setIndex((index + 1) % filtered.length)}
                className="rounded-full border border-bone/30 px-5 py-2.5 text-bone transition-colors hover:border-gilt hover:text-gilt"
              >
                →
              </button>
            </div>

            <button
              ref={closeRef}
              type="button"
              aria-label="Cerrar galería"
              onClick={() => setIndex(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 text-xl text-bone transition-colors hover:border-gilt hover:text-gilt"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
