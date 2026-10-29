# Dark Room · Puebla — Frontend v2

Sitio de **Dark Room** (Av. Juárez, La Paz, Puebla). Concepto: *cuarto oscuro de revelado* (luz roja de seguridad, tira de película, fotos que se revelan al bajar), con aviso +18 al entrar.
Frontend completo, en modo demostración, listo para que Agentia conecte backend, agentes y canales.

- Vista previa: https://darkroompro.netlify.app/
- Documento para integración: [`INTEGRATION_HANDOFF.md`](INTEGRATION_HANDOFF.md)
- Estado de contenidos (qué es real y qué es de prueba): [`CONTENT_STATUS.md`](CONTENT_STATUS.md)

## Stack

| Pieza | Versión | Por qué |
|---|---|---|
| HTML + CSS + JavaScript (ES modules), sin framework | — | Conserva el diseño aprobado (v1.1) sin reconstruirlo. |
| [Vite](https://vite.dev) | 8.3.5 | Servidor de desarrollo, build de producción y variables `VITE_*`. |
| Node.js | ≥ 20.19 (Netlify usa 22) | Requisito de Vite 8. |

Misma arquitectura que El Güero (`el-guero-web`): capa de servicios + mocks + adaptador HTTP.

## Comandos

```bash
npm install
cp .env.example .env.local   # opcional; sin él corre en modo demo
npm run dev                  # http://localhost:3033
npm run build                # → dist/
npm run preview              # sirve dist/ en http://localhost:4173
```

**Despliegue:** Netlify publica solo con cada push a `main` usando `netlify.toml` (`npm ci && npm run build`, carpeta `dist`). En Cloudflare Pages: mismo comando y carpeta.

## Dónde se cambian los datos (para reemplazar los de prueba)

| Qué | Archivo |
|---|---|
| Dirección, horario, cover, teléfono, Instagram, planes de reserva, FAQ, aviso de privacidad | `src/config/site.js` — el HTML los toma de aquí. Un `null` se ve como «por confirmar» y desaparece al poner el dato. |
| Número de WhatsApp | `VITE_WHATSAPP_NUMBER` (o `WHATSAPP_PLACEHOLDER` en `src/config/env.js`) |
| Agenda de noches y promos de la barra (mientras no haya backend) | `src/data/mocks/nights.js`, `src/data/mocks/promotions.js` |
| Fotos | `public/img/` — reemplazar el archivo con el mismo nombre. Al tener las reales: `samplePhotos: false` en `site.js`. |
| Textos de diseño (titulares, manifiesto, reglas) | `index.html` |

## Estructura

```
index.html                 Estructura de todas las secciones (sin datos del cliente: vienen de site.js)
src/
  main.js                  Punto de entrada
  config/env.js            Configuración pública (VITE_*) y banderas de demo por URL
  config/site.js           Datos institucionales del cliente
  services/
    index.js               ÚNICA puerta de datos para los componentes
    types.js               Modelo de datos (JSDoc) + ServiceError
    adapters/mock.js       Adaptador de demostración
    adapters/http.js       Esqueleto para la API de Agentia (rutas PROPUESTAS)
    adapters/request.js    fetch con timeout y errores normalizados
  data/mocks/              nights.js, promotions.js
  components/              agenda (tira de película), promotions (barra), reservation (hoja de contactos), faq, effects (+18, revelado, partículas)
  lib/                     dom (escape, bindSite), time (hora de Puebla), reservation (flujos whatsapp/api),
                           validation, whatsapp, track (analítica), reveal (header y apariciones)
  styles/main.css          Tokens de marca y estilos
public/img/                Fotos (de muestra) y flyers
public/favicon.svg
```

## Variables de entorno

Ver [`.env.example`](.env.example). Todas son **públicas** (terminan en el JS del navegador): nunca poner tokens ni claves.

| Variable | Por defecto | Uso |
|---|---|---|
| `VITE_DATA_SOURCE` | `mock` | `mock` = demo · `http` = API de Agentia |
| `VITE_API_BASE_URL` | vacío | URL base de la API |
| `VITE_RESERVATION_FLOW` | `whatsapp` | `whatsapp` = abre WhatsApp con el mensaje y registra en segundo plano · `api` = pide nombre/teléfono y muestra el estado |
| `VITE_WHATSAPP_NUMBER` | vacío → `522222156443` | Número de WhatsApp (el actual es el del Instagram, **por confirmar**) |
| `VITE_SITE_URL` | `https://darkroompro.netlify.app` | URL pública |

## Banderas de demostración (solo con el mock)

| URL | Para qué |
|---|---|
| `?mock=error` | Los envíos fallan → estado de error |
| `?mock=confirmado` | El mock responde «confirmada» |
| `?mock=lento` | Respuestas 4× más lentas → estados de carga |
| `?mock=vacio` | Sin agenda ni promos → estados vacíos |

En modo mock aparece la cinta «Modo demostración · datos de prueba».

## Pruebas hechas (29-oct-2026)

Navegador (Playwright) a 390 y 1366 px, en ambos flujos: sin errores de consola, sin scroll horizontal, agenda/promos/FAQ cargan desde la capa de servicios, el flujo `whatsapp` abre el mensaje correcto, el flujo `api` valida campos y muestra «Solicitud recibida», y `?mock=error` muestra el error con enlace a WhatsApp.
