/**
 * ÚNICO archivo de contenido del sitio.
 * Edita aquí textos, servicios, horarios y datos — nada está hardcodeado en componentes.
 *
 * Fuente: página oficial de Facebook de Zona Barber Shop (intro, contacto,
 * horario y publicaciones) y su web de reservas zona.barbizo.com.
 */

export type GalleryCategory = "fades" | "barba" | "clasico" | "ambiente";

export interface Service {
  id: string;
  name: string;
  desc: string;
  tag: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  category: GalleryCategory;
  tall?: boolean;
}

export interface DayHours {
  day: string;
  /** Hora de apertura/cierre en formato 24h, hora de Lima (GMT-5) */
  open: number;
  close: number;
}

export const site = {
  name: "ZONA BARBER SHOP",
  shortName: "ZONA",
  tagline: "Vive la experiencia Zona",
  description:
    "Barbería en San Borja, Lima. Cortes modernos, fades, barbería clásica y arreglo de barba. Agenda tu cita en línea. Lun–Sáb 11 AM–10 PM, Dom 11 AM–5 PM.",
  url: "https://zona-barbershop.barclaydario.workers.dev",
  phone: "933 543 020",
  whatsapp: "51933543020",
  email: "zonabarbershop.pe@gmail.com",
  bookingUrl: "https://zona.barbizo.com",
  bookingLabel: "zona.barbizo.com",
  socials: {
    instagram: { handle: "@zona_barbershop.pe", url: "https://www.instagram.com/zona_barbershop.pe" },
    tiktok: { handle: "@zona_barbershop.pe", url: "https://www.tiktok.com/@zona_barbershop.pe" },
    facebook: { handle: "Zona Barber Shop", url: "https://www.facebook.com/profile.php?id=61595993871849" },
  },
  location: {
    address: "Av. Rosa Toro 1038",
    district: "San Borja, Lima 15018",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.+Rosa+Toro+1038,+San+Borja,+Lima",
    embedUrl:
      "https://www.google.com/maps?q=Av.+Rosa+Toro+1038,+San+Borja,+Lima,+Peru&output=embed",
  },
  /** Índice = día de la semana de JS (0 = domingo) */
  schedule: [
    { day: "Domingo", open: 11, close: 17 },
    { day: "Lunes", open: 11, close: 22 },
    { day: "Martes", open: 11, close: 22 },
    { day: "Miércoles", open: 11, close: 22 },
    { day: "Jueves", open: 11, close: 22 },
    { day: "Viernes", open: 11, close: 22 },
    { day: "Sábado", open: 11, close: 22 },
  ] satisfies DayHours[],
  hoursSummary: [
    { label: "Lunes a Sábado", range: "11:00 AM – 10:00 PM" },
    { label: "Domingo", range: "11:00 AM – 5:00 PM" },
  ],
} as const;

/** Rutas de imágenes usadas por los componentes — nunca hardcodear en JSX. */
export const images = {
  logo: "/brand/logo.webp",
  geoLines: "/brand/geo-lines.svg",
  /* Foto real del local (web de reservas oficial) */
  local: "/images/local-zona.webp",
  about: "/images/barbero-tijera.webp",
  band: "/images/ambiente-luces.webp",
  notFound: "/images/tijeras-pared.webp",
} as const;

export const nav = {
  links: [
    { label: "Servicios", href: "/#servicios" },
    { label: "Reserva", href: "/#reserva" },
    { label: "Galería", href: "/#galeria" },
    { label: "La Zona", href: "/#nosotros" },
    { label: "Horario", href: "/#horario" },
  ],
  cta: "Agenda tu cita",
} as const;

export const hero = {
  kicker: "BARBER SHOP · SAN BORJA, LIMA",
  titleTop: "ZONA",
  titleBottom: "BARBER SHOP",
  subtitle:
    "Cortes modernos, fades, barbería clásica y arreglo de barba. Llega, siéntate y listo.",
  accent: "Sin colas ni esperas.",
  ctaPrimary: "Agenda tu cita",
  ctaSecondary: "Escríbenos",
  waMessage: "¡Hola Zona! Quiero agendar un corte 💈",
  photoCaption: "Nuestro local · Av. Rosa Toro 1038",
  marquee:
    "CORTES MODERNOS ★ FADES ★ BARBERÍA CLÁSICA ★ ARREGLO DE BARBA ★ SIN COLAS NI ESPERAS ★ ",
} as const;

export const servicesSection = {
  kicker: "SERVICIOS",
  title: "Lo que hacemos en la Zona",
  intro:
    "Productos de calidad y atención personalizada para que luzcas tu mejor versión. Elige tu servicio y separa tu hora en línea.",
  priceNote: "Precios, barberos y horarios disponibles en tiempo real en nuestra web de reservas.",
  reserveCta: "Reservar",
} as const;

export const services: Service[] = [
  {
    id: "cortes",
    name: "Cortes modernos",
    desc: "Texturas, crops y estilos actuales adaptados a tu cara, tu tipo de cabello y tu rutina.",
    tag: "Tendencia",
  },
  {
    id: "fades",
    name: "Fades",
    desc: "Low, mid, high, taper o burst. Degradados limpios, transiciones sin cortes y acabado al detalle.",
    tag: "El favorito",
  },
  {
    id: "clasica",
    name: "Barbería clásica",
    desc: "Tijera, peine y navaja: la técnica de toda la vida para un acabado elegante y atemporal.",
    tag: "Old school",
  },
  {
    id: "barba",
    name: "Arreglo de barba",
    desc: "Perfilado, rebaje y líneas a navaja para una barba definida, pareja y bien cuidada.",
    tag: "Detalle",
  },
  {
    id: "lavado",
    name: "Lavado + corte",
    desc: "Lavado completo antes del corte para que el acabado quede impecable de principio a fin.",
    tag: "Combo",
  },
  {
    id: "asesoria",
    name: "Asesoría de estilo",
    desc: "¿No sabes qué hacerte? Te escuchamos y te recomendamos el corte que mejor va contigo.",
    tag: "Personalizado",
  },
];

export const bookingSection = {
  kicker: "¿CÓMO RESERVAR?",
  title: "Agenda tu cita con nosotros",
  intro: "Reserva en menos de un minuto desde tu celular. Sin llamadas, sin esperas.",
  steps: [
    { title: "Ingresa a nuestra web", desc: "zona.barbizo.com" },
    { title: "Elige tu servicio favorito", desc: "Corte, fade, barba o combo." },
    { title: "Escoge tu barbero", desc: "El que ya conoces o uno nuevo." },
    { title: "Selecciona día y hora", desc: "Disponibilidad en tiempo real." },
    { title: "Realiza tu adelanto", desc: "Y tu silla queda separada." },
  ],
  done: "¡Y listo!",
  doneSub: "Te esperamos.",
  cta: "Reservar ahora",
} as const;

export const gallerySection = {
  kicker: "GALERÍA",
  title: "Estilo que se nota",
  intro: "Fades, barbas y cortes clásicos. Pasa el cursor y mira el color real.",
  filters: [
    { id: "todos", label: "Todos" },
    { id: "fades", label: "Fades" },
    { id: "barba", label: "Barba" },
    { id: "clasico", label: "Clásico" },
    { id: "ambiente", label: "Ambiente" },
  ] as const,
} as const;

/* Imágenes de stock CC0 / dominio público (ver README → Créditos),
   excepto local-zona (foto oficial del local). */
export const gallery: GalleryItem[] = [
  { src: "/images/corte-clipper.webp", alt: "Barbero marcando un fade con máquina", category: "fades", tall: true },
  { src: "/images/fade-blanco-negro.webp", alt: "Degradado a máquina en blanco y negro", category: "fades" },
  { src: "/images/arreglo-barba.webp", alt: "Arreglo y perfilado de barba", category: "barba" },
  { src: "/images/local-zona.webp", alt: "Interior de Zona Barber Shop en San Borja", category: "ambiente", tall: true },
  { src: "/images/corte-tijera.webp", alt: "Corte a tijera con acabado clásico", category: "clasico" },
  { src: "/images/afeitado-navaja.webp", alt: "Afeitado tradicional a navaja", category: "barba" },
  { src: "/images/maquina-detalle.webp", alt: "Detalle de la máquina definiendo el contorno", category: "fades" },
  { src: "/images/barbero-tijera.webp", alt: "Barbero trabajando con tijera y peine", category: "clasico", tall: true },
  { src: "/images/barbero-cliente.webp", alt: "Barbero asesorando al cliente frente al espejo", category: "clasico" },
  { src: "/images/herramientas.webp", alt: "Navajas y brocha de barbería clásica", category: "ambiente" },
  { src: "/images/sillon-clasico.webp", alt: "Sillón de barbero clásico", category: "ambiente" },
  { src: "/images/tijera-peine.webp", alt: "Tijera y peine, las herramientas de siempre", category: "clasico" },
];

export const about = {
  kicker: "LA ZONA",
  title: "Tu mejor versión empieza en la silla",
  lines: [
    "En Av. Rosa Toro 1038, San Borja, armamos un espacio para que cortarte deje de ser un trámite.",
    "Productos de calidad y atención personalizada: escuchamos lo que quieres y lo llevamos a tu estilo.",
    "Cortes modernos, fades, barbería clásica y arreglo de barba, todo en un solo lugar.",
    "Llega, siéntate y listo. Sin colas ni esperas.",
  ],
  signature: "Vive la experiencia Zona",
  stats: [
    { value: 7, prefix: "", suffix: "", label: "días a la semana" },
    { value: 11, prefix: "", suffix: "h", label: "de atención diaria" },
    { value: 5, prefix: "", suffix: "", label: "pasos para reservar" },
  ],
} as const;

export const pillarsSection = {
  kicker: "LA EXPERIENCIA ZONA",
  title: "Por qué volver",
} as const;

export const pillars = [
  {
    title: "Sin colas ni esperas",
    desc: "Reservas tu hora en línea y llegas directo a la silla. Tu tiempo vale.",
    icon: "clock",
  },
  {
    title: "Productos de calidad",
    desc: "Trabajamos con productos profesionales que cuidan tu cabello, tu barba y tu piel.",
    icon: "spray",
  },
  {
    title: "Atención personalizada",
    desc: "Cada corte se conversa. Te asesoramos según tu estilo y tu tipo de cabello.",
    icon: "scissors",
  },
  {
    title: "Abiertos los 7 días",
    desc: "De lunes a sábado hasta las 10 PM y los domingos hasta las 5 PM.",
    icon: "calendar",
  },
] as const;

export const hoursSection = {
  kicker: "HORARIO & UBICACIÓN",
  title: "Abiertos los 7 días",
  openLabel: "ABIERTO AHORA",
  closedLabel: "CERRADO AHORA",
  openHint: "Estamos atendiendo. Separa tu hora en línea y llega directo a la silla.",
  closedHint: "Ahora estamos cerrados, pero puedes agendar tu cita en línea para cuando abramos.",
  todayLabel: "Hoy",
  directionsTitle: "Cómo llegar",
  directionsCta: "Abrir en Google Maps",
} as const;

export const finalCta = {
  title: "¿LISTO PARA TU CORTE?",
  subtitle: "Agenda tu cita y vive la experiencia Zona.",
  cta: "Agenda tu cita",
  waCta: "WhatsApp",
  waMessage: "¡Hola Zona! Quiero separar mi cita 💈✂️",
} as const;

export const footer = {
  blurb:
    "Cortes modernos, fades, barbería clásica y arreglo de barba. Productos de calidad y atención personalizada en San Borja.",
  rights: `© ${new Date().getFullYear()} ZONA BARBER SHOP.`,
  rightsSuffix: "Todos los derechos reservados.",
  madeIn: "Hecho en Lima, Perú 🇵🇪",
} as const;

export const graciasPage = {
  title: "¡Cita agendada!",
  subtitle:
    "Gracias por reservar en Zona. Llega 5 minutos antes y vive la experiencia completa.",
  back: "Volver al inicio",
  follow: "Síguenos en Instagram",
} as const;

export const notFoundPage = {
  code: "404",
  title: "Este corte no existe",
  subtitle: "La página que buscas no está en la Zona. Vuelve al inicio y agenda tu cita.",
  cta: "Volver al inicio",
} as const;
