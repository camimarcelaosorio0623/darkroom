# CONTENT_STATUS — Dark Room

Actualizado: 29-oct-2026 · Frontend v2

Todo lo que no está en «✅ Del cliente» es **de prueba** y se reemplaza sin tocar código de componentes (ver «Dónde se cambian los datos» en el README).

## ✅ Del cliente (Instagram @dark_room_puebla, pantallazo del 26-oct-2026)

| Dato | Dónde vive |
|---|---|
| Nombre, Av. Juárez, La Paz, Puebla | `site.js → address` |
| Open door 10 PM · cover $100 | `site.js → hours, cover` |
| Teléfono 222 215 6443 | `site.js → phone` |
| Live show · VIP secret night · Male to male | `index.html` (hero) |
| Promos: carta al 50% hasta la 1 AM, 10 cervezas $700, cubeta del jueves 6 × $350 | `data/mocks/promotions.js` |
| Noches: jueves de cubeta, viernes de profesiones, Noche de demonios (31-oct, Izak Alvarado) | `data/mocks/nights.js` |

Aun así, todo lo anterior está **por confirmar** con Dark Room (vigencias, precios, si siguen).

## 🧪 De prueba / por confirmar

| Dato | Estado en el sitio | Dónde se cambia |
|---|---|---|
| Número exterior | «por confirmar» | `site.js → address.number` |
| Días de apertura | «por confirmar» | `site.js → hours.openDays` |
| WhatsApp de reservas | Usa el teléfono del Instagram (no sabemos si es WhatsApp) | `VITE_WHATSAPP_NUMBER` |
| Enlace de Google Maps | No hay | `site.js → address.mapsUrl` |
| Sábado «VIP secret night» | **Ficticio** (noche de ejemplo) | borrar de `data/mocks/nights.js` |
| Planes de reserva (Entrada general, Mesa VIP, Cumpleaños, Cubeta) | Propuesta | `site.js → reservation.plans` |
| Textos de FAQ | Propuesta | `site.js → faq` |
| Aviso de privacidad | No hay (el enlace no aparece) | `site.js → privacyPolicyUrl` |

## 🖼️ Fotos

| Archivo | Uso | Estado |
|---|---|---|
| `public/img/hero.jpg` | Hero, imagen social | Muestra (Unsplash) |
| `public/img/ev1-3.jpg` | Agenda | Muestra → flyers reales |
| `public/img/g1-4.jpg`, `dj.jpg` | Revelado | Muestra |
| `public/img/barra.jpg`, `c1-3.jpg` | Barra | Muestra |

Con las fotos reales: reemplazar el archivo con el mismo nombre y poner `samplePhotos: false` (desaparecen las notas «Fotos de muestra»).

## Textos de metadatos

`<title>` y `<meta description>` en `index.html` mencionan Av. Juárez y open door 10 PM: revisar cuando se confirme la dirección.
