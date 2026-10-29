# INTEGRATION_HANDOFF — Dark Room

**Para:** equipo de backend / agentes de Agentia Labs
**De:** Marce (frontend)
**Fecha:** 29-oct-2026 · Frontend v2

> Este documento describe **lo que necesita el frontend**. Las rutas y formatos son una **propuesta**: ninguna API está implementada. Ustedes definen los contratos definitivos; el frontend se ajusta en un solo archivo (`src/services/adapters/http.js`).

## 1. Cómo se conecta

1. `VITE_DATA_SOURCE=http` y `VITE_API_BASE_URL=https://…` (variables de entorno del hosting).
2. Ajustar `ENDPOINTS` en `src/services/adapters/http.js` y, si hace falta, la forma de las respuestas.
3. Elegir el flujo de reservas con `VITE_RESERVATION_FLOW` (ver §4).
4. Los componentes no se tocan: solo consumen `src/services/index.js`.

Reglas que el frontend ya cumple:
- Ninguna credencial en el navegador (`credentials: 'omit'`). Autenticación, si la hay, en servidor (proxy / cookie httpOnly).
- Todo texto del backend se escapa antes de pintarse; URLs solo `https://`, `http://` o rutas relativas.
- La validación del frontend es solo ayuda: **el backend valida todo de nuevo**.
- El frontend nunca inventa IDs de reserva ni marca una reserva como confirmada por su cuenta.

## 2. Módulos que requieren backend

| Módulo | Función del frontend | Necesita | Estado |
|---|---|---|---|
| Agenda (tira de película) | `getNights()` | Noches semanales + fechas especiales | Mock |
| Promos de la barra | `getPromotions()` | Solo activas | Mock (3 del Instagram) |
| Reservas | `submitReservation()`, `getReservationStatus()` | Recibir solicitud, confirmación por el agente | Mock |
| WhatsApp | `VITE_WHATSAPP_NUMBER` | Número oficial + agente conversacional | Provisional `522222156443` (teléfono del Instagram) |
| CRM / analítica | `track()` en `src/lib/track.js` | Destino de eventos | Emite `CustomEvent('darkroom:track')`, no envía nada |

## 3. Estructuras de datos

Fuente de verdad: `src/services/types.js`.

```ts
Night {
  id: string; name: string; description: string|null; image: string|null;
  dayOfWeek: 0..6 | null;   // noche fija semanal
  date: 'YYYY-MM-DD'|null;  // noche especial (hora de Puebla); reemplaza a la semanal de ese día
  doorsOpen: 'HH:mm'|null;  // null = horario general (10 PM)
  status: 'draft'|'published'|'cancelled'
}
Promotion { id; title; description: string|null; image: string|null; status: 'draft'|'active'|'inactive' }

ReservationRequest {
  type: 'table';
  nightId: string|null; nightName: string|null; date: 'YYYY-MM-DD'|null;
  plan: string;              // 'Entrada general' | 'Mesa VIP' | 'Cumpleaños 🎂' | 'Cubeta' (site.js)
  partySize: number;         // 2–20 (20 = «20 o más»)
  name: string|null;
  phone: string|null;        // E.164; null en flujo whatsapp
  consent: boolean;          // false en flujo whatsapp
  channel: 'whatsapp'|'web'
}
ReservationResult { requestId: string; status: 'received'|'pending'|'confirmed'|'rejected'|'cancelled'; message?: string|null }
```

## 4. Flujos de reserva (`VITE_RESERVATION_FLOW`)

**`whatsapp` (por defecto, como funciona hoy):** al enviar la hoja se abre WhatsApp con el mensaje listo y, en paralelo, se hace `POST /reservations` con `channel: "whatsapp"`, `phone: null`. Sirve para que el agente reconozca la solicitud cuando llegue el mensaje. Si ese POST falla, el usuario no se entera (solo `track('reservation_log_failed')`).

Mensaje que llega por WhatsApp (el agente puede parsearlo):
```
Hola Dark Room 🔴 Quiero apartar:
• Noche: Viernes de profesiones (viernes 30 oct)
• Plan: Mesa VIP
• Personas: 6
• A nombre de: Ana
```

**`api`:** la hoja muestra además teléfono y autorización de datos, espera la respuesta y muestra «Solicitud recibida — todavía no confirmada» o «Confirmada» (solo si `status === 'confirmed'`). Si falla, ofrece WhatsApp con el mensaje listo.

## 5. Operaciones de API propuestas

| Método y ruta | Respuesta |
|---|---|
| `GET /nights?status=published` | `200 Night[]` |
| `GET /promotions?status=active` | `200 Promotion[]` |
| `POST /reservations` (body `ReservationRequest`) | `201 ReservationResult` |
| `GET /reservations/{requestId}` | `200 ReservationResult` *(preparado, sin interfaz pública aún)* |

Errores:

| HTTP | `ServiceError.code` | Interfaz |
|---|---|---|
| 400 / 422 | `validation` | Marca los campos de `fields` (`name`, `phone`, `consent`) |
| 404 | `not_found` | Mensaje genérico |
| 5xx / sin red / timeout 12 s | `server` / `network` / `timeout` | Error + enlace a WhatsApp |

Cuerpo de error sugerido: `{ "message": "Datos inválidos", "fields": { "phone": "Número no válido" } }`.

## 6. Eventos de analítica

`window` → `darkroom:track`, `detail.name` (sin datos personales):
`age_gate_accepted`, `reservation_whatsapp_opened {type}`, `reservation_log_failed {code}`, `reservation_submitted {type,status}`, `reservation_failed {type,code}`.

## 7. Dependencias pendientes

- [ ] Contratos API definitivos.
- [ ] CORS para el dominio del sitio (y `localhost:3033`).
- [ ] WhatsApp oficial de reservas → `VITE_WHATSAPP_NUMBER`.
- [ ] Destino de `track()`.
- [ ] Aviso de privacidad (LFPDPPP) → `privacyPolicyUrl` en `site.js`.
- [ ] Hosting de flyers/fotos (URLs en `image`).
- [ ] Dominio definitivo.

## 8. Preguntas técnicas

1. ¿La API va en dominio propio o detrás del mismo dominio (proxy)? Define CORS.
2. ¿Anti-spam en el flujo `api`? (Turnstile / rate-limit). El frontend puede montar el widget.
3. ¿Mesas con cupo limitado por noche? Si sí, proponemos `GET /nights/{id}/availability`.
4. ¿El aviso +18 debe registrar algo más (p. ej. fecha de nacimiento)? Hoy solo se recuerda en la sesión del navegador.
