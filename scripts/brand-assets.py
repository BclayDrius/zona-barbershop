#!/usr/bin/env python3
"""
Genera los assets de marca de ZONA BARBER SHOP a partir del logo oficial.

- public/brand/logo.png    : medallón circular con fondo transparente (800px)
- public/brand/geo-lines.svg : patrón de líneas geométricas, inspirado en la
                               pared negra con líneas blancas del local
- src/app/icon.png         : 512px
- src/app/apple-icon.png   : 180px, fondo negro (Apple no admite alpha)
- src/app/favicon.ico      : 16/32/48
- public/og.jpg            : 1200x630 — negro, logo, texto blanco y oro

Uso: python3 scripts/brand-assets.py [ruta-logo-original]
"""
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC_LOGO = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "public" / "brand" / "logo.png"
APP = ROOT / "src" / "app"
BRAND = ROOT / "public" / "brand"

INK = (10, 10, 10)
BONE = (242, 239, 232)
GOLD = (201, 161, 74)
GOLD_LIGHT = (232, 207, 138)

# --- logo transparente --------------------------------------------------------
raw = Image.open(SRC_LOGO).convert("RGB")
S = 800
raw = raw.resize((S, S), Image.LANCZOS)
# Supersampling para un borde de círculo suave
big = 4 * S
mask = Image.new("L", (big, big), 0)
ImageDraw.Draw(mask).ellipse((10 * 4, 10 * 4, big - 10 * 4, big - 10 * 4), fill=255)
mask = mask.resize((S, S), Image.LANCZOS)
logo = raw.convert("RGBA")
logo.putalpha(mask)
logo.save(BRAND / "logo.png", optimize=True)

# --- favicons ------------------------------------------------------------------
logo.resize((512, 512), Image.LANCZOS).save(APP / "icon.png")
apple = Image.new("RGB", (180, 180), INK)
small = logo.resize((168, 168), Image.LANCZOS)
apple.paste(small, (6, 6), small)
apple.save(APP / "apple-icon.png")
logo.resize((64, 64), Image.LANCZOS).save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

# --- patrón geométrico (tile SVG) ------------------------------------------------
# Líneas largas que cruzan el tile y continúan en el tile vecino (wrap), para
# que el patrón se repita sin costuras, como la pared "rota" del local.
rnd = random.Random(1038)  # Av. Rosa Toro 1038
T = 600
lines = []
for _ in range(14):
    x1, y1 = rnd.uniform(0, T), rnd.uniform(0, T)
    ang = rnd.uniform(0, 3.14159)
    import math

    L = rnd.uniform(220, 520)
    x2, y2 = x1 + L * math.cos(ang), y1 + L * math.sin(ang)
    w = rnd.choice([1.5, 2, 2.5, 3])
    for dx in (-T, 0, T):
        for dy in (-T, 0, T):
            lines.append(
                f'<line x1="{x1+dx:.1f}" y1="{y1+dy:.1f}" x2="{x2+dx:.1f}" y2="{y2+dy:.1f}" stroke-width="{w}"/>'
            )
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{T}" height="{T}" viewBox="0 0 {T} {T}">'
    f'<g stroke="#f2efe8" stroke-linecap="square" fill="none">{"".join(lines)}</g></svg>'
)
(BRAND / "geo-lines.svg").write_text(svg)

# --- OG image ------------------------------------------------------------------
W, H = 1200, 630
og = Image.new("RGB", (W, H), INK)
d = ImageDraw.Draw(og)
# Líneas geométricas tenues de fondo
for _ in range(16):
    x1, y1 = rnd.uniform(-200, W), rnd.uniform(-200, H)
    ang = rnd.uniform(0, math.pi)
    L = rnd.uniform(300, 800)
    d.line((x1, y1, x1 + L * math.cos(ang), y1 + L * math.sin(ang)), fill=(38, 38, 38), width=3)
# Barra dorada inferior
d.rectangle((0, H - 10, W, H), fill=GOLD)

badge = logo.resize((380, 380), Image.LANCZOS)
og.paste(badge, (80, (H - 380) // 2), badge)


def font(size: int) -> ImageFont.FreeTypeFont:
    for name in (
        "/System/Library/Fonts/Supplemental/Impact.ttf",
        "/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default(size)


x = 520
d.text((x, 170), "ZONA", font=font(130), fill=BONE)
d.text((x, 318), "BARBER SHOP", font=font(54), fill=GOLD_LIGHT)
d.text((x, 400), "Av. Rosa Toro 1038 · San Borja, Lima", font=font(28), fill=(170, 170, 170))
d.text((x, 444), "Lun–Sáb 11 AM–10 PM · Dom 11 AM–5 PM", font=font(28), fill=(170, 170, 170))
og.save(ROOT / "public" / "og.jpg", quality=88)
print("OK: logo.png, geo-lines.svg, icon.png, apple-icon.png, favicon.ico, og.jpg")
