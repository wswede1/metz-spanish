/**
 * Explainability tooltips — Phase 5.
 */

import { masteryLabel } from './bkt.js';

let activeTip = null;

function removeTip() {
  if (activeTip) {
    activeTip.remove();
    activeTip = null;
  }
  document.removeEventListener('click', onDocClick, true);
}

function onDocClick(e) {
  if (activeTip && !activeTip.contains(e.target)) {
    removeTip();
  }
}

function stateMessage(card) {
  const st = card?.state || 'new';
  const sd = card?.scheduledDays;
  switch (st) {
    case 'new':
      return 'First time seeing this word!';
    case 'learning':
      return "Still learning — we'll show this again soon.";
    case 'review':
      return `Due for review after ${sd != null ? sd : '—'} days.`;
    case 'relearning':
      return "You missed this one — let's practice it again.";
    default:
      return 'Keep practicing!';
  }
}

/**
 * @param {HTMLElement} element
 * @param {object} fsrsCard
 * @param {number} pMastery
 */
export function attachItemTooltip(element, fsrsCard, pMastery) {
  const p = Number(pMastery) || 0;

  const show = (clientX, clientY) => {
    removeTip();
    const tip = document.createElement('div');
    tip.className = 'metz-adaptive-tooltip';
    const parts = [stateMessage(fsrsCard)];
    if (p < 0.4) parts.push('This skill needs more practice.');
    else if (p >= 0.95) parts.push("You've mastered this skill!");
    else parts.push(`Skill level: ${masteryLabel(p)}.`);
    tip.textContent = parts.join(' ');

    document.body.appendChild(tip);
    const rect = tip.getBoundingClientRect();
    let x = clientX + 12;
    let y = clientY + 12;
    if (x + rect.width > window.innerWidth - 8) x = window.innerWidth - rect.width - 8;
    if (y + rect.height > window.innerHeight - 8) y = clientY - rect.height - 12;
    tip.style.left = `${Math.max(8, x)}px`;
    tip.style.top = `${Math.max(8, y)}px`;
    activeTip = tip;
    setTimeout(() => document.addEventListener('click', onDocClick, true), 0);
  };

  element.addEventListener('mouseenter', (e) => show(e.clientX, e.clientY));
  element.addEventListener('focus', (e) => {
    const r = e.target.getBoundingClientRect();
    show(r.left + r.width / 2, r.bottom);
  });
  element.addEventListener('mouseleave', () => {
    removeTip();
  });
  element.addEventListener('blur', () => removeTip());
}
