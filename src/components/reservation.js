import { $ } from '../lib/dom.js';
import { DAYS, MONTHS_SHORT, ymdOf } from '../lib/time.js';
import { reservationForm } from '../lib/reservation.js';
import { site } from '../config/site.js';
import { dateLabel } from './agenda.js';

/**
 * Hoja de contactos: noche + plan + personas + nombre.
 * @param {{ night: import('../services/types.js').Night, date: Date }[]} list próximas noches (agenda)
 */
export function initReservation(list) {
  const form = $('#hoja');
  const { plans, defaultPlan, partySize } = site.reservation;
  const st = { noche: 0, plan: defaultPlan };
  const nb = $('#noches'), pb = $('#planes'), pax = $('#pax'), paxOut = $('#pax-o');

  nb.innerHTML = '';
  if (!list.length) nb.innerHTML = '<span class="fine">La agenda se anuncia en Instagram: dinos qué noche quieres.</span>';
  list.forEach(({ date }, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = dateLabel(date);
    b.onclick = () => { st.noche = i; paint(); };
    nb.appendChild(b);
  });
  pb.innerHTML = '';
  plans.forEach((p) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = p;
    b.onclick = () => { st.plan = p; paint(); };
    pb.appendChild(b);
  });

  pax.min = partySize.min; pax.max = partySize.max; pax.value = partySize.initial;
  const paxLabel = () => pax.value + (Number(pax.value) === partySize.max ? '+' : '');
  pax.oninput = () => (paxOut.textContent = paxLabel());
  paxOut.textContent = paxLabel();

  function paint() {
    [...nb.children].forEach((b, i) => b.setAttribute('aria-pressed', i === st.noche));
    [...pb.children].forEach((b) => b.setAttribute('aria-pressed', b.textContent === st.plan));
  }
  paint();

  const sender = reservationForm(form);
  form.onsubmit = (e) => {
    e.preventDefault();
    const sel = list[st.noche];
    const name = form.elements.name.value.trim();
    const when = sel ? `${sel.night.name} (${DAYS[sel.date.getUTCDay()]} ${sel.date.getUTCDate()} ${MONTHS_SHORT[sel.date.getUTCMonth()]})` : 'la próxima noche';
    const message = `Hola Dark Room 🔴 Quiero apartar:\n• Noche: ${when}\n• Plan: ${st.plan}\n• Personas: ${paxLabel()}\n• A nombre de: ${name}`;
    /** @type {import('../services/types.js').ReservationRequest} */
    const payload = {
      type: 'table',
      nightId: sel?.night.id ?? null,
      nightName: sel?.night.name ?? null,
      date: sel ? ymdOf(sel.date) : null,
      plan: st.plan,
      partySize: Number(pax.value),
      name,
    };
    sender.send(payload, message);
  };
}
