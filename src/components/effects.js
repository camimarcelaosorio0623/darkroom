import { $, $$, reducedMotion } from '../lib/dom.js';
import { track } from '../lib/track.js';

/** Aviso +18 (se recuerda en la sesión). */
export function initAgeGate() {
  const g = $('#gate');
  let ok = false;
  try { ok = sessionStorage.getItem('dr18') === '1'; } catch { /* sin storage */ }
  if (ok) { g.hidden = true; return; }
  document.body.style.overflow = 'hidden';
  $('#gate-si').onclick = () => {
    g.hidden = true;
    document.body.style.overflow = '';
    try { sessionStorage.setItem('dr18', '1'); } catch { /* sin storage */ }
    track('age_gate_accepted');
  };
}

/** Revelado de la galería al entrar en pantalla, como en un cuarto oscuro. */
export function initDevelop() {
  const d = $$('.dev');
  if (!('IntersectionObserver' in window)) return d.forEach((x) => x.classList.add('on'));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('on'), 300); io.unobserve(e.target); }
  }), { threshold: 0.45 });
  d.forEach((x) => io.observe(x));
}

/** Partículas rojas en el hero. */
export function initDust() {
  if (reducedMotion()) return;
  const c = $('#polvo');
  for (let i = 0; i < 24; i++) {
    const e = document.createElement('i');
    const z = 2 + Math.random() * 3;
    e.style.width = e.style.height = z + 'px';
    e.style.left = Math.random() * 100 + '%';
    e.style.setProperty('--dx', Math.random() * 140 - 70 + 'px');
    e.style.animationDuration = 8 + Math.random() * 10 + 's';
    e.style.animationDelay = -Math.random() * 14 + 's';
    c.appendChild(e);
  }
}
