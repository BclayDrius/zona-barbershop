import { noiseBg } from "@/lib/noise";

/** Grano de película + viñeta suave sobre todo el sitio. */
export default function GrainOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{ backgroundImage: `url("${noiseBg}")` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 58%, rgba(10, 15, 9, 0.45) 100%)",
        }}
      />
    </div>
  );
}
