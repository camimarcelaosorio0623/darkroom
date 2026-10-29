/**
 * Modelo de datos que el frontend espera del backend.
 * Es la fuente de verdad de INTEGRATION_HANDOFF.md: si cambia aquí, se actualiza allá.
 *
 * @typedef {Object} Night  Noche de la agenda (semanal o fecha especial)
 * @property {string} id
 * @property {string} name
 * @property {string|null} description
 * @property {string|null} image        URL absoluta o ruta pública (flyer o foto)
 * @property {number|null} dayOfWeek    0=domingo … 6=sábado. Noche fija de cada semana.
 * @property {string|null} date         'YYYY-MM-DD' (hora de Puebla). Noche especial; si coincide con una semanal, la reemplaza.
 * @property {string|null} doorsOpen    'HH:mm' 24 h. null = horario general (site.hours.doorsOpen).
 * @property {'draft'|'published'|'cancelled'} status
 *
 * @typedef {Object} Promotion  Promo de la barra
 * @property {string} id
 * @property {string} title
 * @property {string|null} description
 * @property {string|null} image
 * @property {'draft'|'active'|'inactive'} status
 *
 * @typedef {Object} ReservationRequest
 * @property {'table'} type
 * @property {string} nightId
 * @property {string} nightName
 * @property {string} date          'YYYY-MM-DD' (hora de Puebla)
 * @property {string} plan          Uno de site.reservation.plans
 * @property {number} partySize     2–20 (20 = "20 o más")
 * @property {string|null} name
 * @property {string|null} phone    E.164 (+52…). null en el flujo 'whatsapp' (el número llega por WhatsApp).
 * @property {boolean} consent      Autorización de tratamiento de datos (LFPDPPP). false en el flujo 'whatsapp'.
 * @property {'whatsapp'|'web'} channel
 *
 * @typedef {'received'|'pending'|'confirmed'|'rejected'|'cancelled'} ReservationStatus
 *
 * @typedef {Object} ReservationResult
 * @property {string} requestId  Generado por el backend. El frontend nunca lo inventa.
 * @property {ReservationStatus} status
 * @property {string|null} [message]
 */

/** Error normalizado de la capa de servicios. */
export class ServiceError extends Error {
  /**
   * @param {'network'|'timeout'|'validation'|'not_found'|'server'|'unknown'} code
   * @param {string} message
   * @param {Record<string,string>} [fields] errores por campo devueltos por el backend
   */
  constructor(code, message, fields) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.fields = fields || null;
  }
}
