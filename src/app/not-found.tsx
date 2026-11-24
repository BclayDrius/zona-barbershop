import Link from "next/link";
import { images, notFoundPage } from "@/content/site";
import { ScissorsIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Tijeras en la pared, muy tenue */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] grayscale"
        style={{
          backgroundImage: `url("${images.notFound}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-ink/60" />
      <div className="relative flex flex-col items-center">
        <p
          aria-hidden
          className="flex items-center gap-4 font-display text-[clamp(5rem,20vw,12rem)] leading-none text-stroke-gilt"
        >
          4<ScissorsIcon className="h-[0.7em] w-[0.7em] rotate-90 text-gold" />4
        </p>
        <h1 className="mt-6 font-display text-3xl uppercase tracking-wide text-bone sm:text-5xl">
          {notFoundPage.title}
        </h1>
        <p className="mt-4 max-w-sm text-bone/65">{notFoundPage.subtitle}</p>
        <Link
          href="/"
          className="mt-9 bg-gold-metal rounded-full px-8 py-4 font-display text-lg uppercase tracking-[0.15em] text-ink transition-transform hover:scale-105"
        >
          {notFoundPage.cta}
        </Link>
      </div>
    </main>
  );
}
