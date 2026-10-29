/**
 * DATOS DE DEMOSTRACIÓN — agenda de noches.
 * Jueves, viernes y la noche de Halloween salen de los flyers del Instagram (26-oct-2026), sin confirmar.
 * El sábado «VIP secret night» es un EJEMPLO para que la agenda nunca quede vacía en la demo.
 * Las imágenes son fotos de muestra: reemplazar por los flyers reales.
 * @type {import('../../services/types.js').Night[]}
 */
export const nightsMock = [
  {
    id: 'jueves-cubeta',
    name: 'Jueves de cubeta',
    description: '6 cervezas $350 · ticket gratis',
    image: '/img/ev1.jpg',
    dayOfWeek: 4,
    date: null,
    doorsOpen: null,
    status: 'published',
  },
  {
    id: 'viernes-profesiones',
    name: 'Viernes de profesiones',
    description: 'Erotic shadow show · live show',
    image: '/img/ev2.jpg',
    dayOfWeek: 5,
    date: null,
    doorsOpen: null,
    status: 'published',
  },
  {
    id: 'sabado-vip-ejemplo',
    name: 'VIP secret night',
    description: 'Noche de ejemplo · live show',
    image: '/img/g3.jpg',
    dayOfWeek: 6,
    date: null,
    doorsOpen: null,
    status: 'published',
  },
  {
    id: 'noche-de-demonios-2026',
    name: 'Noche de demonios',
    description: 'Halloween · special guest Izak Alvarado',
    image: '/img/ev3.jpg',
    dayOfWeek: null,
    date: '2026-10-31',
    doorsOpen: null,
    status: 'published',
  },
];
