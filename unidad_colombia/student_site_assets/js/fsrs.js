/**
 * FSRS-4.5 spaced repetition — pure JS + Dexie persistence (Phase 2).
 */

import { fsrsCards } from './db.js';

const MINUTE_MS = 60_000;
const DAY_MS = 86_400_000;

export const FSRS_PARAMS = {
  w: [
    0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0589, 1.533, 0.1544, 1.007, 1.9395, 0.11,
    0.29, 2.27, 0.25, 2.9898,
  ],
  requestRetention: 0.9,
  maximumInterval: 36500,
  easyBonus: 1.3,
  hardFactor: 1.2,
};

export const CARD_STATE = {
  NEW: 'new',
  LEARNING: 'learning',
  REVIEW: 'review',
  RELEARNING: 'relearning',
};

export const RATING = { AGAIN: 1, HARD: 2, GOOD: 3, EASY: 4 };

function clamp(x, lo, hi) {
  return Math.min(hi, Math.max(lo, x));
}

function wAt(i) {
  return FSRS_PARAMS.w[i];
}

export function forgettingCurve(elapsedDays, stability) {
  const s = Math.max(Number(stability) || 0, 1e-6);
  const t = Math.max(Number(elapsedDays) || 0, 0);
  return 0.9 ** (t / s);
}

export function initialStability(rating) {
  return wAt(rating - 1);
}

export function initialDifficulty(rating) {
  const d = wAt(4) - (rating - 3) * wAt(5);
  return clamp(d, 1, 10);
}

export function nextDifficulty(d, rating) {
  const w = FSRS_PARAMS.w;
  const deltaD = -w[6] * (rating - 3);
  let dPrime = clamp(d + deltaD * ((10 - d) / 9), 1, 10);
  dPrime = w[7] * initialDifficulty(4) + (1 - w[7]) * dPrime;
  return clamp(dPrime, 1, 10);
}

export function shortTermStability(s, rating) {
  const w = FSRS_PARAMS.w;
  if (rating === RATING.HARD) return s * w[15];
  if (rating === RATING.EASY) return s * w[15] * w[16];
  return s;
}

export function nextRecallStability(d, s, r, rating) {
  const w = FSRS_PARAMS.w;
  const hardPenalty = rating === RATING.HARD ? w[15] : 1;
  const easyB = rating === RATING.EASY ? w[16] : 1;
  const inner =
    Math.exp(w[8]) *
    (11 - d) *
    s ** -w[9] *
    (Math.exp(w[10] * (1 - r)) - 1) *
    hardPenalty *
    easyB +
    1;
  return s * inner;
}

export function nextForgetStability(d, s, r) {
  const w = FSRS_PARAMS.w;
  return w[11] * d ** -w[12] * ((s + 1) ** w[13] - 1) * Math.exp(w[14] * (1 - r));
}

export function nextInterval(stability) {
  const rr = FSRS_PARAMS.requestRetention;
  const raw = Math.round((Number(stability) * Math.log(rr)) / Math.log(0.9));
  return clamp(raw, 1, FSRS_PARAMS.maximumInterval);
}

function cloneCard(card) {
  return {
    itemId: card.itemId,
    studentId: card.studentId,
    stability: card.stability,
    difficulty: card.difficulty,
    due: card.due,
    lapses: card.lapses ?? 0,
    reps: card.reps ?? 0,
    state: card.state,
    lastReview: card.lastReview ?? null,
    elapsedDays: card.elapsedDays ?? 0,
    scheduledDays: card.scheduledDays ?? 0,
  };
}

export function createCard(itemId, studentId) {
  return {
    itemId,
    studentId,
    state: CARD_STATE.NEW,
    stability: null,
    difficulty: null,
    due: Date.now(),
    lapses: 0,
    reps: 0,
    lastReview: null,
    elapsedDays: 0,
    scheduledDays: 0,
  };
}

/**
 * @param {object} card
 * @param {1|2|3|4} rating
 * @param {number} [reviewTime]
 */
export function scheduleCard(card, rating, reviewTime = Date.now()) {
  if (rating < 1 || rating > 4 || rating !== Math.floor(rating)) {
    throw new Error('scheduleCard: rating must be 1, 2, 3, or 4');
  }

  const { easyBonus } = FSRS_PARAMS;
  const out = cloneCard(card);

  if (card.state === CARD_STATE.NEW) {
    const s0 = initialStability(rating);
    const d0 = initialDifficulty(rating);
    out.stability = s0;
    out.difficulty = d0;
    out.lastReview = reviewTime;

    if (rating === RATING.AGAIN) {
      out.state = CARD_STATE.LEARNING;
      out.due = reviewTime + MINUTE_MS;
      out.scheduledDays = 0;
      out.elapsedDays = 0;
    } else if (rating === RATING.HARD) {
      out.state = CARD_STATE.LEARNING;
      out.due = reviewTime + 5 * MINUTE_MS;
      out.scheduledDays = 0;
      out.elapsedDays = 0;
    } else if (rating === RATING.GOOD) {
      out.state = CARD_STATE.REVIEW;
      out.scheduledDays = nextInterval(s0);
      out.due = reviewTime + out.scheduledDays * DAY_MS;
      out.elapsedDays = 0;
      out.reps += 1;
    } else {
      out.state = CARD_STATE.REVIEW;
      out.scheduledDays = Math.max(1, Math.round(nextInterval(s0) * easyBonus));
      out.due = reviewTime + out.scheduledDays * DAY_MS;
      out.elapsedDays = 0;
      out.reps += 1;
    }
    return out;
  }

  if (card.state === CARD_STATE.LEARNING || card.state === CARD_STATE.RELEARNING) {
    const last = card.lastReview != null ? card.lastReview : reviewTime;
    const s = card.stability;
    const d = card.difficulty;

    if (rating === RATING.AGAIN) {
      out.state = card.state;
      out.due = reviewTime + 5 * MINUTE_MS;
      out.lastReview = reviewTime;
    } else if (rating === RATING.HARD) {
      out.state = card.state;
      out.due = reviewTime + 10 * MINUTE_MS;
      out.lastReview = reviewTime;
    } else {
      const elapsedDays = Math.max(0, (reviewTime - last) / DAY_MS);
      const r = forgettingCurve(elapsedDays, s);
      const newD = nextDifficulty(d, rating);
      const newS = nextRecallStability(newD, s, r, rating);
      out.state = CARD_STATE.REVIEW;
      out.difficulty = newD;
      out.stability = newS;
      out.scheduledDays = nextInterval(newS);
      out.due = reviewTime + out.scheduledDays * DAY_MS;
      out.lastReview = reviewTime;
      out.elapsedDays = elapsedDays;
      out.reps += 1;
    }
    return out;
  }

  if (card.state === CARD_STATE.REVIEW) {
    const last = card.lastReview != null ? card.lastReview : reviewTime;
    const elapsedDays = Math.max(0, (reviewTime - last) / DAY_MS);
    const s = card.stability;
    const d = card.difficulty;
    const r = forgettingCurve(elapsedDays, s);
    out.elapsedDays = elapsedDays;

    if (rating === RATING.AGAIN) {
      out.lapses += 1;
      out.state = CARD_STATE.RELEARNING;
      out.stability = nextForgetStability(d, s, r);
      out.due = reviewTime + 5 * MINUTE_MS;
      out.lastReview = reviewTime;
      out.scheduledDays = 0;
    } else {
      const newD = nextDifficulty(d, rating);
      const newS = nextRecallStability(newD, s, r, rating);
      out.difficulty = newD;
      out.stability = newS;
      out.state = CARD_STATE.REVIEW;
      out.scheduledDays = nextInterval(newS);
      out.due = reviewTime + out.scheduledDays * DAY_MS;
      out.lastReview = reviewTime;
      out.reps += 1;
    }
    return out;
  }

  throw new Error(`scheduleCard: unknown state ${card.state}`);
}

export async function saveCard(card) {
  await fsrsCards.put(card);
  return card;
}

export async function getCard(itemId, studentId) {
  const row = await fsrsCards.get([itemId, studentId]);
  if (row) return row;
  return createCard(itemId, studentId);
}

export async function getDueCards(studentId, limit = 20) {
  const now = Date.now();
  const rows = await fsrsCards.where('studentId').equals(studentId).toArray();
  return rows
    .filter((c) => Number(c.due) <= now)
    .sort((a, b) => Number(a.due) - Number(b.due))
    .slice(0, limit);
}

function startOfLocalDay(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function endOfLocalDay(ts) {
  const d = new Date(ts);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

function addLocalDays(ts, n) {
  const d = new Date(ts);
  d.setDate(d.getDate() + n);
  return d.getTime();
}

/** Start of local week (Sunday 00:00). */
function startOfLocalWeek(ts) {
  const d = new Date(startOfLocalDay(ts));
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return d.getTime();
}

function endOfLocalWeek(ts) {
  const s = startOfLocalWeek(ts);
  return endOfLocalDay(addLocalDays(s, 6));
}

/**
 * @returns {Promise<{ dueNow: number, dueToday: number, dueTomorrow: number, dueThisWeek: number, totalCards: number, youngCards: number, matureCards: number }>}
 */
export async function getReviewStats(studentId) {
  const now = Date.now();
  const rows = await fsrsCards.where('studentId').equals(studentId).toArray();

  const sToday = startOfLocalDay(now);
  const eToday = endOfLocalDay(now);
  const sTom = startOfLocalDay(addLocalDays(now, 1));
  const eTom = endOfLocalDay(addLocalDays(now, 1));
  const sWeek = startOfLocalWeek(now);
  const eWeek = endOfLocalWeek(now);

  let dueNow = 0;
  let dueToday = 0;
  let dueTomorrow = 0;
  let dueThisWeek = 0;
  let youngCards = 0;
  let matureCards = 0;

  for (const c of rows) {
    const due = Number(c.due);
    if (due <= now) dueNow += 1;
    if (due >= sToday && due <= eToday) dueToday += 1;
    if (due >= sTom && due <= eTom) dueTomorrow += 1;
    if (due >= sWeek && due <= eWeek) dueThisWeek += 1;

    const sd = c.scheduledDays;
    if (sd == null || sd < 21) youngCards += 1;
    else matureCards += 1;
  }

  return {
    dueNow,
    dueToday,
    dueTomorrow,
    dueThisWeek,
    totalCards: rows.length,
    youngCards,
    matureCards,
  };
}
