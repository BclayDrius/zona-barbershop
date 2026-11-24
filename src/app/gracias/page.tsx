import type { Metadata } from "next";
import Link from "next/link";
import { graciasPage, site } from "@/content/site";
import LogoBadge from "@/components/LogoBadge";
import { InstagramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "¡Silla separada!",
  description: "Tu cita en Zona Barber Shop está agendada.",
  robots: { index: false },
};

export default function GraciasPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <LogoBadge className="h-24 w-24" alt={site.name} />
      <h1 className="mt-8 font-display text-4xl uppercase tracking-wide text-bone sm:text-6xl">
        {graciasPage.title}
      </h1>
      <p className="mt-5 max-w-md text-bone/70">{graciasPage.subtitle}</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="bg-gold-metal rounded-full px-8 py-4 font-display text-lg uppercase tracking-[0.15em] text-ink transition-transform hover:scale-105"
        >
          {graciasPage.back}
        </Link>
        <a
          href={site.socials.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-bone/30 px-8 py-4 font-display text-lg uppercase tracking-[0.15em] text-bone transition-colors hover:border-gilt hover:text-gilt"
        >
          <InstagramIcon className="h-4 w-4" /> {graciasPage.follow}
        </a>
      </div>
    </main>
  );
}
