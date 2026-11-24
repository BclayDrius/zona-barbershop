import { site } from "@/content/site";

/** Construye un enlace de WhatsApp con mensaje precargado. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
