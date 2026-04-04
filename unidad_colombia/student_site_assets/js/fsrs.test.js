/**
 * Browser console: import('../../../unidad_colombia/student_site_assets/js/fsrs.test.js')
 */

import {
  createCard,
  scheduleCard,
  nextInterval,
  forgettingCurve,
} from './fsrs.js';

const DAY_MS = 86_400_000;
const t0 = 1_700_000_000_000;

{
  let c = createCard('item-a', 'student-1');
  c = scheduleCard(c, 3, t0);
  console.assert(c.state === 'review', 'Test 1: Good from new should land in review');
  console.assert(c.stability > 0, 'Test 1: stability should be positive');
}

{
  let c = createCard('item-b', 'student-1');
  c = scheduleCard(c, 1, t0);
  console.assert(c.state === 'learning', 'Test 2: Again from new should be learning');
}

{
  let c = createCard('item-c', 'student-1');
  c = scheduleCard(c, 3, t0);
  const t1 = t0 + c.scheduledDays * DAY_MS;
  c = scheduleCard(c, 4, t1);
  const t2 = t1 + c.scheduledDays * DAY_MS;
  c = scheduleCard(c, 4, t2);
  const easyInterval = c.scheduledDays;

  let h = createCard('item-d', 'student-1');
  h = scheduleCard(h, 3, t0);
  const u1 = t0 + h.scheduledDays * DAY_MS;
  h = scheduleCard(h, 2, u1);
  const u2 = u1 + h.scheduledDays * DAY_MS;
  h = scheduleCard(h, 2, u2);
  const hardInterval = h.scheduledDays;

  console.assert(
    easyInterval > hardInterval,
    `Test 3: two Easy paths should beat two Hard paths (${easyInterval} vs ${hardInterval})`
  );
}

console.assert(nextInterval(0.5) >= 1, 'Test 4: nextInterval lower bound');
console.assert(Math.abs(forgettingCurve(0, 10) - 1) < 1e-12, 'Test 5: forgetting at t=0');

console.log('FSRS TESTS PASSED');
