import './styles/main.css';
import { $, bindSite } from './lib/dom.js';
import { initHeader, initReveal } from './lib/reveal.js';
import { waLink } from './lib/whatsapp.js';
import { isDemo } from './config/env.js';
import { site } from './config/site.js';
import { getNights, getPromotions } from './services/index.js';
import { upcoming, renderAgenda, agendaBox } from './components/agenda.js';
import { renderPromotions } from './components/promotions.js';
import { initReservation } from './components/reservation.js';
import { renderFaq } from './components/faq.js';
import { initAgeGate, initDevelop, initDust } from './components/effects.js';

const STAGGER = '.frames,.reglas,.tragos,.aside';

document.getElementById('demo-flag').hidden = !isDemo;
bindSite(site);
renderFaq();
initAgeGate();
initHeader();
initDevelop();
initDust();
initReveal(STAGGER);

const wa = $('#wa');
wa.href = waLink('Hola Dark Room 🔴 Tengo una pregunta');
wa.target = '_blank';
wa.rel = 'noopener';

getNights()
  .then((nights) => {
    const list = upcoming(nights);
    renderAgenda(agendaBox(), list);
    initReservation(list);
  })
  .catch(() => {
    renderAgenda(agendaBox(), [], 'error');
    initReservation([]);
  })
  .finally(() => initReveal(STAGGER));

const tragos = $('#tragos');
getPromotions()
  .then((p) => renderPromotions(tragos, p))
  .catch(() => renderPromotions(tragos, [], 'error'))
  .finally(() => initReveal(STAGGER));
