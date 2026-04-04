/**
 * Bayesian Knowledge Tracing (BKT) per skill cluster — Phase 3.
 */

import { bktSkills } from './db.js';

const HERITAGE_DEFAULT = { pL0: 0.45, pT: 0.35, pG: 0.25, pS: 0.1 };
const L2_DEFAULT = { pL0: 0.1, pT: 0.2, pG: 0.2, pS: 0.08 };

/** Cluster overrides: L2 values; heritage uses heritage* where noted */
const CLUSTER_OVERRIDES = {
  body_parts: { pL0: 0.3, heritagePL0: 0.55 },
  family: { pL0: 0.4, heritagePL0: 0.65 },
  numbers: { pL0: 0.5, heritagePL0: 0.6, pT: 0.4 },
  food_and_drink: { pL0: 0.35, heritagePL0: 0.6 },
  school_vocabulary: { pL0: 0.2, heritagePL0: 0.4 },
  grammar_ser_estar: { pL0: 0.1, pT: 0.15, pS: 0.15 },
  verb_conjugation: { pL0: 0.1, pT: 0.15 },
  colombia_geography: { pL0: 0.15, heritagePL0: 0.35 },
  colombia_culture: { pL0: 0.2, heritagePL0: 0.45 },
};

function clamp(x, lo, hi) {
  return Math.min(hi, Math.max(lo, x));
}

export function getDefaultParams(skillCluster, learnerTrack) {
  const base = learnerTrack === 'heritage' ? { ...HERITAGE_DEFAULT } : { ...L2_DEFAULT };
  const ov = CLUSTER_OVERRIDES[skillCluster];
  if (ov) {
    if (ov.pL0 != null) base.pL0 = ov.pL0;
    if (ov.heritagePL0 != null && learnerTrack === 'heritage') base.pL0 = ov.heritagePL0;
    if (ov.pT != null) base.pT = ov.pT;
    if (ov.pS != null) base.pS = ov.pS;
  }
  return base;
}

export function updateMastery(currentPMastery, correct, params) {
  let pCorrectGivenMastered;
  let pCorrectGivenNotMastered;
  if (correct) {
    pCorrectGivenMastered = 1 - params.pS;
    pCorrectGivenNotMastered = params.pG;
  } else {
    pCorrectGivenMastered = params.pS;
    pCorrectGivenNotMastered = 1 - params.pG;
  }
  const numerator = pCorrectGivenMastered * currentPMastery;
  const denominator = numerator + pCorrectGivenNotMastered * (1 - currentPMastery);
  const pMasteredGivenResponse = denominator === 0 ? currentPMastery : numerator / denominator;
  const updatedMastery = pMasteredGivenResponse + (1 - pMasteredGivenResponse) * params.pT;
  return clamp(updatedMastery, 0.001, 0.999);
}

function masteryLabel(p) {
  if (p < 0.4) return 'Just Starting';
  if (p < 0.7) return 'Building';
  if (p < 0.95) return 'Nearly There';
  return 'Mastered';
}

export async function getSkillState(studentId, skillCluster, learnerTrack) {
  const key = [skillCluster, studentId];
  const row = await bktSkills.get(key);
  if (row) return row;

  const params = getDefaultParams(skillCluster, learnerTrack);
  return {
    skillCluster,
    studentId,
    pMastery: params.pL0,
    pL0: params.pL0,
    pT: params.pT,
    pG: params.pG,
    pS: params.pS,
    totalAttempts: 0,
    lastUpdated: null,
    learnerTrack,
  };
}

export async function recordResponse(studentId, skillCluster, correct, learnerTrack) {
  const state = await getSkillState(studentId, skillCluster, learnerTrack);
  const params = getDefaultParams(skillCluster, learnerTrack);
  const prevMastery = state.pMastery ?? params.pL0;
  const nextMastery = updateMastery(prevMastery, !!correct, params);
  const row = {
    skillCluster,
    studentId,
    pMastery: nextMastery,
    pL0: params.pL0,
    pT: params.pT,
    pG: params.pG,
    pS: params.pS,
    totalAttempts: (state.totalAttempts ?? 0) + 1,
    lastUpdated: Date.now(),
    learnerTrack,
  };
  await bktSkills.put(row);
  return row;
}

export async function getClassMastery(skillCluster) {
  const rows = await bktSkills.where('skillCluster').equals(skillCluster).toArray();
  return rows
    .map((r) => ({
      studentId: r.studentId,
      pMastery: r.pMastery,
      learnerTrack: r.learnerTrack,
      totalAttempts: r.totalAttempts,
    }))
    .sort((a, b) => (b.pMastery ?? 0) - (a.pMastery ?? 0));
}

export async function getStudentMasteryProfile(studentId) {
  const rows = await bktSkills.where('studentId').equals(studentId).toArray();
  return rows.map((r) => ({
    skillCluster: r.skillCluster,
    pMastery: r.pMastery,
    masteryLabel: masteryLabel(r.pMastery ?? 0),
    totalAttempts: r.totalAttempts ?? 0,
  }));
}

export async function getAtRiskStudents(threshold = 0.4, minAttempts = 5) {
  const all = await bktSkills.toArray();
  const out = [];
  for (const r of all) {
    if ((r.pMastery ?? 1) < threshold && (r.totalAttempts ?? 0) >= minAttempts) {
      out.push({
        studentId: r.studentId,
        skillCluster: r.skillCluster,
        pMastery: r.pMastery,
        totalAttempts: r.totalAttempts,
      });
    }
  }
  return out.sort((a, b) => (a.pMastery ?? 0) - (b.pMastery ?? 0));
}

export { masteryLabel };
