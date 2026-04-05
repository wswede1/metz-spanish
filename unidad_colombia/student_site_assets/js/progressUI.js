/**
 * Student-facing progress UI — Phase 5.
 */

import { masteryLabel, getStudentMasteryProfile } from './bkt.js';
import { getReviewStats, forgettingCurve } from './fsrs.js';
import { students } from './db.js';

const DAY_MS = 86_400_000;

const CLUSTER_LABELS = {
  body_parts: 'Body parts',
  family: 'Family',
  numbers: 'Numbers',
  food_and_drink: 'Food & drink',
  school_vocabulary: 'School',
  grammar_ser_estar: 'Ser / estar & gustar',
  verb_conjugation: 'Verbs',
  colombia_geography: 'Colombia — geography',
  colombia_culture: 'Colombia — culture',
  colombia_food: 'Colombia — food',
  greetings_and_phrases: 'Greetings & phrases',
  emotions: 'Emotions',
  general: 'General',
  colombia_sp2_vocab: 'Sp2 Colombia vocab',
};

function clusterTitle(id) {
  return CLUSTER_LABELS[id] || id.replace(/_/g, ' ');
}

function masteryBarColor(p) {
  if (p < 0.4) return '#ef4444';
  if (p < 0.7) return '#f59e0b';
  if (p < 0.95) return '#14b8a6';
  return '#22c55e';
}

/**
 * @param {HTMLElement} container
 * @param {string} skillCluster
 * @param {number} pMastery
 * @param {boolean} [animate]
 */
export function renderMasteryBar(container, skillCluster, pMastery, animate = true) {
  container.innerHTML = '';
  container.classList.add('metz-mastery-bar-wrap');

  const p = Math.max(0, Math.min(1, Number(pMastery) || 0));
  const label = document.createElement('div');
  label.className = 'metz-mastery-bar-head';
  label.innerHTML = `<span class="metz-mastery-title">${clusterTitle(skillCluster)}</span><span class="metz-mastery-label">${masteryLabel(p)}</span>`;

  const track = document.createElement('div');
  track.className = 'metz-mastery-track';
  const fill = document.createElement('div');
  fill.className = 'metz-mastery-fill';
  fill.style.background = masteryBarColor(p);
  if (animate) fill.style.transition = 'width 0.45s ease-out';
  fill.style.width = '0%';
  track.appendChild(fill);

  const pct = document.createElement('div');
  pct.className = 'metz-mastery-pct';
  pct.textContent = `${Math.round(p * 100)}%`;

  container.appendChild(label);
  container.appendChild(track);
  container.appendChild(pct);

  requestAnimationFrame(() => {
    fill.style.width = `${p * 100}%`;
  });
}

/**
 * @param {HTMLElement} container
 * @param {object} fsrsCard
 */
export function renderMemoryStrengthBar(container, fsrsCard) {
  container.innerHTML = '';
  container.classList.add('metz-memory-bar-wrap');

  const title = document.createElement('div');
  title.className = 'metz-memory-title';
  title.textContent = 'Memory strength';

  const track = document.createElement('div');
  track.className = 'metz-memory-track';
  const fill = document.createElement('div');
  fill.className = 'metz-memory-fill';

  let r = 0;
  let note = '';
  const last = fsrsCard?.lastReview;
  const stab = Number(fsrsCard?.stability);
  if (last && stab > 0) {
    const days = Math.max(0, (Date.now() - Number(last)) / DAY_MS);
    r = forgettingCurve(days, stab);
  }

  if (!last || !stab) {
    note = 'New — not reviewed yet';
    fill.style.width = '0%';
    fill.style.background = '#94a3b8';
  } else {
    fill.style.width = `${Math.round(r * 100)}%`;
    if (r < 0.5) {
      fill.style.background = '#f59e0b';
      note = 'Needs review';
    } else if (r >= 0.9) {
      fill.style.background = '#22c55e';
      note = 'Strong';
    } else {
      fill.style.background = '#14b8a6';
      note = 'Decaying';
    }
  }

  track.appendChild(fill);
  const sub = document.createElement('div');
  sub.className = 'metz-memory-note';
  sub.textContent = note;

  container.appendChild(title);
  container.appendChild(track);
  container.appendChild(sub);
}

/**
 * @param {HTMLElement} container
 * @param {string} studentId
 */
export async function renderDueCount(container, studentId) {
  const stats = await getReviewStats(studentId);
  const n = stats.dueNow;
  container.classList.add('metz-due-count');
  if (n === 0) {
    container.textContent = "You're all caught up! 🎉";
  } else {
    container.textContent = `${n} word${n === 1 ? '' : 's'} due for review today`;
  }
}

/**
 * @param {HTMLElement} container
 * @param {number} streakDays
 */
export function renderStreakBadge(container, streakDays) {
  container.innerHTML = '';
  const d = Number(streakDays) || 0;
  if (d <= 0) {
    container.hidden = true;
    return;
  }
  container.hidden = false;
  container.className = 'metz-streak-badge';
  container.textContent = `🔥 ${d}-day streak`;
}

/**
 * @param {HTMLElement} container
 * @param {object} sessionSummary
 */
export function renderSessionSummary(container, sessionSummary) {
  const p = sessionSummary || {};
  const gains = p.masteryGains || [];
  const acc = p.accuracy != null ? Math.round(p.accuracy * 100) : 0;

  container.className = 'metz-session-summary';
  container.innerHTML = `
    <h3 class="metz-session-summary-title">Session complete</h3>
    <p class="metz-session-line"><strong>${p.itemsCompleted ?? 0}</strong> items practiced · <strong>${acc}%</strong> accuracy</p>
    ${p.streakDays != null ? `<p class="metz-session-line">Streak: <strong>${p.streakDays}</strong> day(s)</p>` : ''}
    <div class="metz-session-gains"></div>
  `;
  const gEl = container.querySelector('.metz-session-gains');
  if (!gains.length) {
    gEl.textContent = 'No mastery band changes this session.';
    return;
  }
  gEl.innerHTML = '<p class="metz-gains-title">Skills that moved up a level</p><ul></ul>';
  const ul = gEl.querySelector('ul');
  for (const g of gains) {
    if (g.before == null || g.after == null) continue;
    const li = document.createElement('li');
    li.textContent = `${clusterTitle(g.skillCluster)}: ${masteryLabel(g.before)} → ${masteryLabel(g.after)}`;
    ul.appendChild(li);
  }
}

/**
 * @param {HTMLElement} container
 * @param {string} studentId
 * @param {{ reviewHref?: string }} [opts]
 */
export async function renderStudentDashboard(container, studentId, opts = {}) {
  const reviewHref = opts.reviewHref || '../Colombia_Vocab_Review_Spanish1.html';
  container.innerHTML = '';
  container.classList.add('metz-student-dashboard');

  const st = await students.where('studentId').equals(studentId).first();
  const streak = st?.streakDays ?? 0;

  const top = document.createElement('div');
  top.className = 'metz-dash-top';

  const streakEl = document.createElement('div');
  renderStreakBadge(streakEl, streak);
  const dueEl = document.createElement('div');
  await renderDueCount(dueEl, studentId);

  top.appendChild(streakEl);
  top.appendChild(dueEl);

  const profile = await getStudentMasteryProfile(studentId);
  const sorted = [...profile].sort((a, b) => (a.pMastery ?? 0) - (b.pMastery ?? 0));

  const bars = document.createElement('div');
  bars.className = 'metz-dash-bars';
  for (const row of sorted) {
    const wrap = document.createElement('div');
    renderMasteryBar(wrap, row.skillCluster, row.pMastery, true);
    bars.appendChild(wrap);
  }

  const actions = document.createElement('div');
  actions.className = 'metz-dash-actions';
  const a = document.createElement('a');
  a.className = 'primary-btn metz-start-review';
  a.href = reviewHref;
  a.textContent = 'Start review';

  actions.appendChild(a);

  container.appendChild(top);
  if (sorted.length) container.appendChild(bars);
  else {
    const empty = document.createElement('p');
    empty.className = 'metz-dash-empty';
    empty.textContent = 'Practice a few words on the review page to see mastery by skill.';
    container.appendChild(empty);
  }
  container.appendChild(actions);
}
