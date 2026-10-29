import { $, $$, esc, safeUrl, setState } from '../lib/dom.js';
import { nowInPuebla, nextDow, ymdOf, shortDate, DAYS_SHORT, MONTHS_SHORT } from '../lib/time.js';
import { site } from '../config/site.js';

/** 'HH:mm' → '10 PM' / '10:30 PM' */
function doors(hhmm) {
  if (!hhmm) return site.hours.doorsOpenShort;
  const [h, m] = hhmm.split(':').map(Number);
  return `${((h + 11) % 12) + 1}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}`;
}

/**
 * Próximas fechas de la agenda: cada noche semanal en su próximo día y las especiales
 * que aún no pasan. Una especial reemplaza a la semanal del mismo día.
 * @param {import('../services/types.js').Night[]} nights
 * @returns {{ night: import('../services/types.js').Night, date: Date }[]}
 */
export function upcoming(nights, now = Date.now()) {
  const today = nowInPuebla(now).ymd;
  const specials = nights
    .filter((n) => n.date && n.date >= today)
    .map((n) => ({ night: n, date: new Date(n.date + 'T12:00:00Z') }));
  const weekly = nights
    .filter((n) => !n.date && n.dayOfWeek != null)
    .map((n) => ({ night: n, date: nextDow(n.dayOfWeek, now) }))
    .filter((w) => !specials.some((s) => ymdOf(s.date) === ymdOf(w.date)));
  return [...specials, ...weekly].sort((a, b) => a.date - b.date);
}

export const dateLabel = (d) => `${DAYS_SHORT[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]}`;

/** Agenda como tira de película. */
export function renderAgenda(box, list, state = list.length ? 'ready' : 'empty') {
  setState(box, state);
  if (state === 'error' || state === 'empty') {
    box.innerHTML = `<p class="vacio">${state === 'error'
      ? 'No pudimos cargar la agenda. La encuentras en Instagram.'
      : 'Estamos revelando la agenda de la semana. Síguenos en Instagram.'} <a href="${site.instagram.url}" target="_blank" rel="noopener">${site.instagram.handle}</a></p>`;
    return;
  }
  box.innerHTML = list.map(({ night: n, date }, i) => `
    <article class="frame reveal" tabindex="0">
      <span class="num">${String(i + 1).padStart(2, '0')}A ▸</span>
      <img src="${esc(safeUrl(n.image))}" alt="${esc(n.name)}" loading="lazy">
      <div class="lbl"><small>${shortDate(date)} · open door ${doors(n.doorsOpen)}</small><b>${esc(n.name)}</b><span>${esc(n.description)}</span></div>
    </article>`).join('');
  $$('.frame', box).forEach((f) => f.addEventListener('click', () => f.classList.toggle('dev-on')));
}

export const agendaBox = () => $('#frames');
