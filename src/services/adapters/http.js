/**
 * Adaptador HTTP — esqueleto para que Agentia conecte su API.
 *
 * ⚠️ Las rutas de ENDPOINTS son una PROPUESTA del frontend (ver INTEGRATION_HANDOFF.md),
 * no una API implementada. El equipo de backend define los contratos definitivos y ajusta
 * este archivo (o lo reemplaza) sin tocar los componentes visuales.
 */
import { request } from './request.js';

export const ENDPOINTS = {
  nights: '/nights?status=published',
  promotions: '/promotions?status=active',
  reservations: '/reservations',
  reservationStatus: (id) => `/reservations/${encodeURIComponent(id)}`,
};

export const httpAdapter = {
  getNights: () => request(ENDPOINTS.nights),
  getPromotions: () => request(ENDPOINTS.promotions),
  submitReservation: (req) => request(ENDPOINTS.reservations, { method: 'POST', body: req }),
  getReservationStatus: (id) => request(ENDPOINTS.reservationStatus(id)),
};
