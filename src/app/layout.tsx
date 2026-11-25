import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site, services } from "@/content/site";
import SmoothScroll from "@/components/SmoothScroll";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Script from "next/script";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

const title = `${site.name} — Barbería en San Borja, Lima`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const pad = (h: number) => `${String(h).padStart(2, "0")}:00`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: `+51${site.phone.replace(/\s/g, "")}`,
  email: site.email,
  image: `${site.url}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.location.address,
    addressLocality: "San Borja",
    addressRegion: "Lima",
    postalCode: "15018",
    addressCountry: "PE",
  },
  openingHoursSpecification: site.schedule.map((d, i) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: dayNames[i],
    opens: pad(d.open),
    closes: pad(d.close),
  })),
  sameAs: Object.values(site.socials).map((s) => s.url),
  potentialAction: {
    "@type": "ReserveAction",
    target: site.bookingUrl,
  },
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.name, description: s.desc },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-PE"
      className={`${bebas.variable} ${manrope.variable} ${playfair.variable}`}
    >
      {/* suppressHydrationWarning: extensiones del navegador inyectan atributos
          en <body> antes de hidratar; solo silencia este elemento. */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
        <GrainOverlay />
        <CustomCursor />
        <Script src="/showcase.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
