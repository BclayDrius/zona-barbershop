import { hero } from "@/content/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "@/components/icons";

/** Botón flotante de WhatsApp (móvil), con latido cada 8s. */
export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(hero.waMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar por WhatsApp"
      className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-lg shadow-black/40 animate-heartbeat md:hidden"
    >
      <WhatsAppIcon className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}
