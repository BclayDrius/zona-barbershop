"use client";

import { useRef } from "react";
import { footer, hero, nav, site } from "@/content/site";
import { waLink } from "@/lib/wa";
import BarberPole from "@/components/BarberPole";
import LogoBadge from "@/components/LogoBadge";
import Marquee from "@/components/Marquee";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PinIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";

/** Lluvia de tijeras (canvas) — easter egg al hacer 5 clicks en el poste. */
function rainScissors() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText =
    "position:fixed;inset:0;z-index:95;pointer-events:none;";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  const parts = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: -40 - Math.random() * canvas.height * 0.6,
    v: 2.5 + Math.random() * 4,
    r: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.12,
    s: 16 + Math.random() * 20,
  }));
  const start = performance.now();
  function frame(t: number) {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of parts) {
      p.y += p.v;
      p.r += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.font = `${p.s}px serif`;
      ctx.fillText("✂️", 0, 0);
      ctx.restore();
    }
    if (t - start < 4000) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}

export default function Footer() {
  const clicks = useRef(0);

  function onPoleClick() {
    clicks.current += 1;
    if (clicks.current >= 5) {
      clicks.current = 0;
      rainScissors();
    }
  }

  const socials = [
    { ...site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
    { ...site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
    { ...site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-ink2">
      {/* Marquee de redes */}
      <a
        href={site.socials.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${site.socials.instagram.handle}`}
        className="block border-b border-gold/15 bg-ink py-4 text-gilt/80 transition-colors hover:text-gilt"
      >
        <Marquee
          text={`${site.socials.instagram.handle} ★ SÍGUENOS EN INSTAGRAM Y TIKTOK ★ VIVE LA EXPERIENCIA ZONA ★ `}
          baseVelocity={1.6}
          className="font-display text-2xl uppercase tracking-[0.2em]"
        />
      </a>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-4">
            <LogoBadge className="h-24 w-24" alt={site.name} />
            <div>
              <p className="font-display text-4xl uppercase leading-none tracking-wide text-bone">
                {site.shortName}
              </p>
              <p className="font-display text-xl uppercase tracking-[0.2em] text-gilt">
                Barber Shop
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-smoke">{footer.blurb}</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ url, label, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/80 transition-colors hover:border-gold hover:bg-gold hover:text-ink"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Enlaces del sitio" className="space-y-3">
          <p className="font-display text-lg uppercase tracking-[0.25em] text-gilt">Navega</p>
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-sm text-bone/70 transition-colors hover:text-gilt"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-semibold text-gold transition-colors hover:text-gilt"
          >
            Reservas: {site.bookingLabel}
          </a>
        </nav>

        <div className="space-y-3">
          <p className="font-display text-lg uppercase tracking-[0.25em] text-gilt">Contacto</p>
          <a
            href={site.location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-sm text-bone/70 transition-colors hover:text-gilt"
          >
            <PinIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {site.location.address}
              <br />
              {site.location.district}
            </span>
          </a>
          <a
            href={waLink(hero.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-bone/70 transition-colors hover:text-gilt"
          >
            <WhatsAppIcon className="h-4 w-4" /> {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 break-all text-sm text-bone/70 transition-colors hover:text-gilt"
          >
            <MailIcon className="h-4 w-4 shrink-0" /> {site.email}
          </a>
          <div className="pt-2 text-sm text-bone/70">
            {site.hoursSummary.map((h) => (
              <p key={h.label}>
                <span className="text-smoke">{h.label}:</span> {h.range}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-bone/10 px-6 pb-24 pt-6 text-xs text-bone/40 sm:flex-row sm:items-center sm:pb-10">
        <p>
          {footer.rights} {footer.rightsSuffix}
        </p>
        <p>{footer.madeIn}</p>
        <p>
          Hecho por{" "}
          <a
            href="https://barclayleach.com/es/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gilt"
          >
            Barclay Leach
          </a>
          , impulsando{" "}
          <a
            href="https://cernextec.com/es"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gilt"
          >
            Cernext
          </a>
        </p>
      </div>

      {/* Poste permanente + easter egg (5 clicks) */}
      <button
        type="button"
        onClick={onPoleClick}
        aria-label="Poste de barbero — un secreto de la Zona"
        className="absolute bottom-6 right-6 hidden rounded-full sm:block"
      >
        <BarberPole className="h-24 w-5" />
      </button>
    </footer>
  );
}
