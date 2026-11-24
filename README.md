# ZONA BARBER SHOP 💈

**Vive la experiencia Zona.** Sitio web de Zona Barber Shop, una barbería en San Borja, Lima.

- 📍 Av. Rosa Toro 1038, San Borja, Lima 15018
- 📅 Reservas: [zona.barbizo.com](https://zona.barbizo.com)
- 📱 WhatsApp: 933 543 020 · ✉️ zonabarbershop.pe@gmail.com
- 📸 [Instagram](https://www.instagram.com/zona_barbershop.pe) · [TikTok](https://www.tiktok.com/@zona_barbershop.pe) · [Facebook](https://www.facebook.com/profile.php?id=61595993871849)
- 🕓 Lun–Sáb 11:00 AM – 10:00 PM · Dom 11:00 AM – 5:00 PM (hora de Lima)

## Stack

- **Next.js 15** (App Router, `output: "export"`) + TypeScript estricto
- **Tailwind CSS v4** (tokens de marca en `src/app/globals.css`)
- **Framer Motion** + **Lenis** (animaciones y smooth scroll)
- `next/font`: Bebas Neue / Manrope / Playfair Display italic
- 100% estático, servido como **Static Assets de Cloudflare Workers**

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # exporta a ./out
npm run start      # sirve ./out con wrangler (igual que producción)
```

## Deploy (Cloudflare Workers)

```bash
npm run deploy     # next build && wrangler deploy
```

La configuración vive en `wrangler.jsonc` (assets en `./out`, 404 personalizado).
Los headers de caché están en `public/_headers`.

## Editar contenido

Todo el texto, servicios, horarios, redes y datos de contacto viven en un solo archivo:

```
src/content/site.ts
```

## Identidad visual

- **Paleta:** negro del sello (`ink`), blanco hueso (`bone`), oro metálico (`gold`/`gilt`)
  — sacada del logo, del local y de las piezas de Facebook.
- **Pared geométrica:** `public/brand/geo-lines.svg` replica las líneas blancas
  cruzadas de la pared negra del local (utilidad `bg-geo`).
- **Textura de sello:** utilidad `distressed` (máscara de ruido) como las letras del logo.
- Galería en blanco y negro que revela el color real al pasar el cursor.

Logo, favicons, OG image y patrón se regeneran con:

```bash
python3 scripts/brand-assets.py ruta/al/logo-original.png
```

## Créditos de imágenes

- `local-zona.webp` y el logo: material oficial de Zona Barber Shop (web de reservas).
- Fotos de stock, todas **CC0 / dominio público** (vía [Openverse](https://openverse.org)):

| Archivo | Fuente |
| --- | --- |
| corte-clipper, afeitado-navaja, herramientas, sillon-clasico, tijera-peine, tijeras-pared | [StockSnap.io](https://stocksnap.io) (CC0) |
| fade-blanco-negro | [rawpixel](https://www.rawpixel.com/image/6036967) (CC0) |
| arreglo-barba, corte-tijera, barbero-cliente, maquina-detalle, ambiente-luces, barbero-tijera | Wikimedia Commons, series "Barbershop In Iran" / "Barbers from Iran" (CC0) |

Reemplázalas por fotos reales de los cortes de Zona cuando estén disponibles
(mismos nombres en `public/images/`, o actualiza `src/content/site.ts`).
