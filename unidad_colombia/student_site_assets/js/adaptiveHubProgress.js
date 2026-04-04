/**
 * Mounts Phase 5 progress UI on the Colombia student hub.
 */

import { students } from './db.js';
import { renderStudentDashboard } from './progressUI.js';

const rootId = 'metz-adaptive-dashboard-root';

async function mount() {
  const root = document.getElementById(rootId);
  if (!root) return;

  try {
    const all = await students.toArray();
    if (!all.length) {
      root.innerHTML =
        '<p class="metz-dash-hint">Open the learner setup on this site to create a profile; then your progress will show here.</p>';
      return;
    }
    const pref = localStorage.getItem('metz-active-student-id');
    const row = pref ? all.find((s) => s.studentId === pref) : all[0];
    if (row) localStorage.setItem('metz-active-student-id', row.studentId);
    const reviewHref = root.dataset.reviewHref || undefined;
    await renderStudentDashboard(root, row.studentId, reviewHref ? { reviewHref } : {});
  } catch (e) {
    console.warn('[ADAPTIVE UI]', e?.message || e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => mount());
} else {
  mount();
}
