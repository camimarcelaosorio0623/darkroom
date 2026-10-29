/**
 * Contenido institucional de Dark Room (lo que NO viene del backend).
 * ÚNICO archivo que hay que tocar cuando lleguen los datos reales: el HTML los toma de aquí
 * (atributos data-site). Un valor null se muestra como «por confirmar».
 * Cada dato lleva su estado en CONTENT_STATUS.md.
 */
export const site = {
  name: 'Dark Room',
  city: 'Puebla',

  /** Del Instagram (pantallazo 26-oct-2026). PENDIENTE: número exterior. */
  address: {
    street: 'Av. Juárez',
    number: null,
    area: 'La Paz',
    city: 'Puebla, Pue.',
    mapsUrl: null, // enlace oficial de Google Maps: PENDIENTE
  },

  /** Open door y cover del Instagram. PENDIENTE: qué días abre y a qué hora cierra. */
  hours: {
    doorsOpen: '10:00 PM',
    doorsOpenShort: '10 PM',
    openDays: null, // ej. 'Jueves a sábado'
  },
  cover: '$100',

  /** Teléfono del Instagram. PENDIENTE confirmar si es el mismo WhatsApp de reservas (ver config/env.js). */
  phone: { display: '222 215 6443', href: 'tel:+522222156443' },
  instagram: { handle: '@dark_room_puebla', url: 'https://www.instagram.com/dark_room_puebla/' },

  minAge: 18,
  /** true mientras las fotos de public/img sean de muestra (Unsplash). Pasar a false con las reales. */
  samplePhotos: true,
  privacyPolicyUrl: null, // aviso de privacidad (LFPDPPP): PENDIENTE

  /** Opciones del formulario de reserva. DEMO: confirmar con Dark Room qué planes existen. */
  reservation: {
    plans: ['Entrada general', 'Mesa VIP', 'Cumpleaños 🎂', 'Cubeta'],
    defaultPlan: 'Mesa VIP',
    partySize: { min: 2, max: 20, initial: 6 },
  },

  faq: [
    ['¿Cobran cover?', 'El cover es de $100 y las puertas abren a las 10 PM. En noches especiales el flyer trae el precio.'],
    ['¿Puedo festejar mi cumpleaños?', 'Sí. Elige «Cumpleaños» al apartar y te preparamos la mesa.'],
    ['¿Cuál es la edad mínima?', '18 años con identificación oficial.'],
    ['¿Cómo aparto mesa?', 'Llena la hoja de arriba o escríbenos por WhatsApp.'],
  ],
};
