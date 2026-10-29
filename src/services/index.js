/**
 * Capa de servicios: el ÚNICO punto por el que los componentes piden o envían datos.
 * Los componentes no saben si detrás hay un mock o la API de Agentia.
 *
 * Para conectar el backend: VITE_DATA_SOURCE=http + VITE_API_BASE_URL, y ajustar
 * src/services/adapters/http.js a los contratos definitivos.
 */
import { config } from '../config/env.js';
import { mockAdapter } from './adapters/mock.js';
import { httpAdapter } from './adapters/http.js';

const adapter = config.dataSource === 'http' ? httpAdapter : mockAdapter;

/** @returns {Promise<import('./types.js').Night[]>} */
export async function getNights() {
  const nights = await adapter.getNights();
  return nights.filter((n) => n.status === 'published');
}

/** @returns {Promise<import('./types.js').Promotion[]>} */
export async function getPromotions() {
  const promos = await adapter.getPromotions();
  return promos.filter((p) => p.status === 'active');
}

/** @param {import('./types.js').ReservationRequest} req
 *  @returns {Promise<import('./types.js').ReservationResult>} */
export const submitReservation = (req) => adapter.submitReservation(req);

/** @returns {Promise<import('./types.js').ReservationResult>} */
export const getReservationStatus = (id) => adapter.getReservationStatus(id);
