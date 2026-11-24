import Image from "next/image";
import { images } from "@/content/site";

/** Sello oficial de Zona (PNG/WebP circular con fondo transparente). */
export default function LogoBadge({
  className = "",
  alt = "",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`}>
      <Image src={images.logo} alt={alt} fill sizes="160px" className="object-contain" />
    </span>
  );
}
