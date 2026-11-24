/** Poste de barbero girando (rayas animadas con CSS). */
export default function BarberPole({
  className = "",
  spinning = true,
}: {
  className?: string;
  spinning?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden rounded-full border-2 border-gilt/50 bg-bone shadow-[inset_0_0_10px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div
        className={`absolute inset-0 ${spinning ? "barber-stripes-animated" : "barber-stripes"}`}
      />
      <div className="absolute inset-0 rounded-full shadow-[inset_6px_0_10px_rgba(0,0,0,0.35),inset_-6px_0_10px_rgba(0,0,0,0.35)]" />
    </div>
  );
}
