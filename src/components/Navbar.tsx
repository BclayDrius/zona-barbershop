"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { nav, site } from "@/content/site";
import { getLenis, scrollToHash } from "@/lib/lenis";
import LogoBadge from "@/components/LogoBadge";
import { CalendarIcon, InstagramIcon, TikTokIcon, FacebookIcon } from "@/components/icons";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  function onNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const hash = href.split("#")[1];
    if (pathname === "/" && hash) {
      e.preventDefault();
      scrollToHash(`#${hash}`);
    }
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div className="px-3 sm:px-6">
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "mt-3 max-w-5xl rounded-full border border-gold/20 bg-ink/80 px-4 py-2 shadow-xl shadow-black/30 backdrop-blur-md sm:px-5"
              : "mt-0 max-w-7xl bg-transparent px-1 py-4 sm:px-2"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label={`${site.name} — inicio`}
            onClick={(e) => onNavClick(e, "/#inicio")}
          >
            <LogoBadge
              className={`transition-all duration-500 ${scrolled ? "h-8 w-8" : "h-10 w-10"}`}
            />
            <span
              className={`whitespace-nowrap font-display uppercase leading-none tracking-[0.2em] text-bone transition-all duration-500 ${
                scrolled ? "text-lg" : "text-xl"
              }`}
            >
              {site.shortName} <span className="text-gilt">Barber Shop</span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className="group relative whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-bone/80 transition-colors hover:text-gilt"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gilt transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-metal whitespace-nowrap rounded-full px-5 py-2 font-display text-base uppercase tracking-[0.12em] text-ink transition-transform hover:scale-105"
            >
              {nav.cta}
            </a>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`h-0.5 w-6 bg-gilt transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-gilt transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil fullscreen */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[-1] flex flex-col justify-center bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pared geométrica del local */}
            <div aria-hidden className="absolute inset-0 bg-geo opacity-[0.08]" />
            <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 barber-stripes-animated" />
            <motion.nav
              aria-label="Menú móvil"
              className="relative flex flex-col gap-2 px-10"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                closed: {},
              }}
            >
              {nav.links.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    closed: { y: 40, opacity: 0 },
                    open: { y: 0, opacity: 1 },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => onNavClick(e, l.href)}
                    className="block py-2 font-display text-6xl uppercase tracking-wide text-bone transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                variants={{ closed: { y: 40, opacity: 0 }, open: { y: 0, opacity: 1 } }}
                className="mt-8 flex items-center gap-5"
              >
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold-metal inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-lg uppercase tracking-widest text-ink"
                >
                  <CalendarIcon className="h-4 w-4" strokeWidth={2} /> {nav.cta}
                </a>
                {[
                  { href: site.socials.instagram.url, label: "Instagram", Icon: InstagramIcon },
                  { href: site.socials.tiktok.url, label: "TikTok", Icon: TikTokIcon },
                  { href: site.socials.facebook.url, label: "Facebook", Icon: FacebookIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de ${site.name}`}
                    className="text-bone/70 transition-colors hover:text-gilt"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </motion.div>
              <motion.p
                variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
                className="mt-6 text-xs uppercase tracking-[0.25em] text-bone/40"
              >
                {site.hoursSummary.map((h) => `${h.label} ${h.range}`).join(" · ")}
              </motion.p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
