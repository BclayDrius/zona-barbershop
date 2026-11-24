import type Lenis from "lenis";

/** Instancia global de Lenis para que cualquier componente pueda hacer scrollTo. */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Scroll suave a un ancla; cae a scrollIntoView nativo si Lenis no está activo. */
export function scrollToHash(hash: string): void {
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -72 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
