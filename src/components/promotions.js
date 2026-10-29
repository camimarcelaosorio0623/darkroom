import { esc, safeUrl, setState } from '../lib/dom.js';
import { site } from '../config/site.js';

/** Promos de la barra. */
export function renderPromotions(box, promos, state = promos.length ? 'ready' : 'empty') {
  setState(box, state);
  if (state !== 'ready') {
    box.innerHTML = `<p class="vacio">Las promos de la noche se publican en <a href="${site.instagram.url}" target="_blank" rel="noopener">${site.instagram.handle}</a>.</p>`;
    return;
  }
  box.innerHTML = promos.map((p) => `
    <div class="trago reveal">
      <div class="ph"><img src="${esc(safeUrl(p.image))}" alt="${esc(p.title)}" loading="lazy"></div>
      <div class="b"><b>${esc(p.title)}</b><span>${esc(p.description)}</span></div>
    </div>`).join('');
}
