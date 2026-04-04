/**
 * Adaptive session queue — Phase 4.
 */

import { sessions, itemResponses } from './db.js';
import { getDueCards, getCard, scheduleCard, saveCard, RATING } from './fsrs.js';
import { logResponse } from './responseLogger.js';
import { recordResponse, getStudentMasteryProfile, getSkillState, masteryLabel } from './bkt.js';
import {
  getAllItemIds,
  getItemIdsForCluster,
  getCluster,
  getItemMeta,
} from './vocabularyMap.js';
import { updateStreak } from './studentManager.js';

const DAY_MS = 86_400_000;

function deriveRating(correct, responseTimeMs) {
  if (!correct) return RATING.AGAIN;
  if (responseTimeMs < 1500) return RATING.EASY;
  if (responseTimeMs < 3000) return RATING.GOOD;
  return RATING.HARD;
}

function suggestGameMode(card, pMastery) {
  const pm = pMastery ?? 0.3;
  const st = card.state;
  if (st === 'new' || pm < 0.3) return 'flashcard';
  if (st === 'learning' || (pm >= 0.3 && pm < 0.5)) return Math.random() > 0.5 ? 'quiz' : 'match';
  if (st === 'review') {
    const sd = Number(card.scheduledDays) || 0;
    if (sd < 14) return Math.random() > 0.5 ? 'quiz' : 'fillblank';
    return 'flashcard';
  }
  if (st === 'relearning') return 'flashcard';
  return 'flashcard';
}

function heritageSkipCluster(learnerTrack, cluster, profileRow) {
  if (learnerTrack !== 'heritage') return false;
  if (!profileRow) return false;
  return (profileRow.pMastery ?? 0) >= 0.85 && (profileRow.totalAttempts ?? 0) <= 5;
}

export class AdaptiveSession {
  /**
   * @param {string} studentId
   * @param {'heritage'|'L2'} learnerTrack
   * @param {string | null} unitId
   */
  constructor(studentId, learnerTrack, unitId = null) {
    this.studentId = studentId;
    this.learnerTrack = learnerTrack;
    this.unitId = unitId;
    this.queue = [];
    this.sessionId = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    this.startTime = Date.now();
    this._itemsCompleted = 0;
    this._correctCount = 0;
    /** @type {Map<string, { before: number, after?: number }>} */
    this._masteryTrack = new Map();
    this._initialized = false;
  }

  async init() {
    const due = await getDueCards(this.studentId, 15);
    const profile = await getStudentMasteryProfile(this.studentId);
    const profileByCluster = Object.fromEntries(profile.map((p) => [p.skillCluster, p]));

    const queue = [];
    const seenIds = new Set();

    for (const c of due) {
      const itemId = c.itemId;
      if (!itemId || seenIds.has(itemId)) continue;
      seenIds.add(itemId);
      const skillCluster = getCluster(itemId);
      const meta = getItemMeta(itemId);
      const st = await getSkillState(this.studentId, skillCluster, this.learnerTrack);
      const pMastery = st.pMastery ?? st.pL0;
      const card = await getCard(itemId, this.studentId);
      queue.push({
        itemId,
        skillCluster,
        suggestedGameMode: suggestGameMode(card, pMastery),
        isNew: card.state === 'new',
        fsrsCard: card,
        pMastery,
        word: meta ? { es: meta.es, en: meta.en } : null,
      });
    }

    const weakClusters = profile.filter(
      (p) => (p.pMastery ?? 0) < 0.7 && (p.totalAttempts ?? 0) >= 3
    );
    let injected = 0;
    const recentCut = Date.now() - DAY_MS;
    const recent = await itemResponses.where('studentId').equals(this.studentId).toArray();
    const recentItems = new Set(
      recent.filter((r) => r.timestamp >= recentCut).map((r) => r.itemId)
    );

    for (const w of weakClusters) {
      if (injected >= 10) break;
      if (heritageSkipCluster(this.learnerTrack, w.skillCluster, w)) {
        const grammarPool = [
          ...getItemIdsForCluster('grammar_ser_estar'),
          ...getItemIdsForCluster('verb_conjugation'),
        ].filter((id) => !seenIds.has(id) && !recentItems.has(id));
        for (let i = 0; i < 2 && injected < 10 && grammarPool.length; i += 1) {
          const pick = grammarPool[Math.floor(Math.random() * grammarPool.length)];
          const idx = grammarPool.indexOf(pick);
          grammarPool.splice(idx, 1);
          if (seenIds.has(pick)) continue;
          seenIds.add(pick);
          const card = await getCard(pick, this.studentId);
          const meta = getItemMeta(pick);
          const st = await getSkillState(this.studentId, getCluster(pick), this.learnerTrack);
          queue.push({
            itemId: pick,
            skillCluster: getCluster(pick),
            suggestedGameMode: suggestGameMode(card, st.pMastery),
            isNew: card.state === 'new',
            fsrsCard: card,
            pMastery: st.pMastery,
            word: meta ? { es: meta.es, en: meta.en } : null,
          });
          injected += 1;
        }
        continue;
      }
      const candidates = getItemIdsForCluster(w.skillCluster).filter(
        (id) => !seenIds.has(id) && !recentItems.has(id)
      );
      for (let i = 0; i < 2 && injected < 10 && candidates.length; i += 1) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        if (seenIds.has(pick)) continue;
        seenIds.add(pick);
        const card = await getCard(pick, this.studentId);
        const meta = getItemMeta(pick);
        const st = await getSkillState(this.studentId, w.skillCluster, this.learnerTrack);
        queue.push({
          itemId: pick,
          skillCluster: w.skillCluster,
          suggestedGameMode: suggestGameMode(card, st.pMastery),
          isNew: card.state === 'new',
          fsrsCard: card,
          pMastery: st.pMastery,
          word: meta ? { es: meta.es, en: meta.en } : null,
        });
        injected += 1;
      }
    }

    if (queue.length < 20) {
      const lowFirst = [...profile].sort((a, b) => (a.pMastery ?? 0) - (b.pMastery ?? 0));
      const clusterOrder = [
        ...lowFirst.map((p) => p.skillCluster),
        ...getAllItemIds().map((id) => getCluster(id)),
      ];
      const uniqClusters = [...new Set(clusterOrder)];
      let newCount = 0;
      for (const cl of uniqClusters) {
        if (queue.length >= 20 || newCount >= 5) break;
        const ids = getItemIdsForCluster(cl).filter((id) => !seenIds.has(id));
        for (const id of ids) {
          if (queue.length >= 20 || newCount >= 5) break;
          const card = await getCard(id, this.studentId);
          if (card.state !== 'new' && card.reps > 0) continue;
          seenIds.add(id);
          const meta = getItemMeta(id);
          const st = await getSkillState(this.studentId, cl, this.learnerTrack);
          queue.push({
            itemId: id,
            skillCluster: cl,
            suggestedGameMode: suggestGameMode(card, st.pMastery),
            isNew: true,
            fsrsCard: card,
            pMastery: st.pMastery,
            word: meta ? { es: meta.es, en: meta.en } : null,
          });
          newCount += 1;
        }
      }
    }

    this.queue = queue;
    this._initialized = true;
    return this;
  }

  async getNextItem() {
    if (!this._initialized) await this.init();
    return this.queue.shift() || null;
  }

  /**
   * @param {string} itemId
   * @param {boolean} correct
   * @param {number} responseTimeMs
   * @param {string} gameMode
   */
  async recordResponse(itemId, correct, responseTimeMs, gameMode) {
    const skillCluster = getCluster(itemId);
    const beforeState = await getSkillState(this.studentId, skillCluster, this.learnerTrack);
    const before = beforeState.pMastery ?? beforeState.pL0;
    const beforeLabel = masteryLabel(before);

    await logResponse({
      studentId: this.studentId,
      itemId,
      skillCluster,
      correct,
      responseTimeMs,
      gameMode: gameMode || 'adaptive',
      difficulty: 'adaptive',
      sessionId: this.sessionId,
    });

    let card = await getCard(itemId, this.studentId);
    const rating = deriveRating(correct, responseTimeMs);
    card = scheduleCard(card, rating, Date.now());
    await saveCard(card);

    const skill = await recordResponse(this.studentId, skillCluster, correct, this.learnerTrack);
    const after = skill.pMastery;
    const afterLabel = masteryLabel(after);

    if (beforeLabel !== afterLabel) {
      this._masteryTrack.set(skillCluster, { before, after });
    }

    this._itemsCompleted += 1;
    if (correct) this._correctCount += 1;

    if (!correct) {
      const meta = getItemMeta(itemId);
      const st = skill;
      this.queue.unshift({
        itemId,
        skillCluster,
        suggestedGameMode: 'flashcard',
        isNew: false,
        fsrsCard: card,
        pMastery: st.pMastery,
        word: meta ? { es: meta.es, en: meta.en } : null,
      });
    }

    return {
      updatedCard: card,
      updatedSkill: skill,
      sessionProgress: this.getSessionProgress(),
    };
  }

  getSessionProgress() {
    const masteryGains = [];
    for (const [skillCluster, o] of this._masteryTrack.entries()) {
      masteryGains.push({ skillCluster, before: o.before, after: o.after });
    }
    return {
      itemsCompleted: this._itemsCompleted,
      itemsRemaining: this.queue.length,
      correctCount: this._correctCount,
      accuracy: this._itemsCompleted ? this._correctCount / this._itemsCompleted : 0,
      masteryGains,
    };
  }

  async endSession() {
    const end = Date.now();
    const p = this.getSessionProgress();
    await sessions.add({
      studentId: this.studentId,
      startTime: this.startTime,
      endTime: end,
      itemCount: p.itemsCompleted,
      correctCount: p.correctCount,
      gameMode: 'adaptive_mix',
      unitId: this.unitId || 'colombia_sp1',
    });
    let streakDays = 0;
    try {
      streakDays = await updateStreak(this.studentId);
    } catch {
      /* streak optional */
    }
    return { ...p, streakDays, sessionId: this.sessionId };
  }
}
