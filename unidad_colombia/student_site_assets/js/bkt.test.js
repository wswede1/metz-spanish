/**
 * Browser: import('../../../unidad_colombia/student_site_assets/js/bkt.test.js')
 */

import { updateMastery, getDefaultParams } from './bkt.js';

const l2 = getDefaultParams('general', 'L2');
const familyH = getDefaultParams('family', 'heritage');
const familyL2 = getDefaultParams('family', 'L2');

console.assert(
  updateMastery(0.5, true, l2) > 0.5,
  'BKT 1: correct response should increase mastery'
);
console.assert(
  updateMastery(0.5, false, l2) < 0.5,
  'BKT 2: incorrect response should decrease mastery'
);

let p = 0.1;
for (let i = 0; i < 10; i += 1) {
  p = updateMastery(p, true, l2);
}
console.assert(p >= 0.9, `BKT 3: convergence after 10 correct (got ${p})`);

for (let t = 0; t < 50; t += 1) {
  const x = updateMastery(Math.random(), Math.random() > 0.5, l2);
  console.assert(x > 0 && x < 1, 'BKT 4: mastery stays in (0,1)');
}

console.assert(
  familyH.pL0 > familyL2.pL0,
  'BKT 5: heritage family pL0 > L2 family pL0'
);

console.log('BKT TESTS PASSED');
