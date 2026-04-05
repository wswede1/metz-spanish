/**
 * MetzSpanishDB — IndexedDB schema (Dexie v3) for adaptive learning.
 * Requires Dexie from CDN in document before importing this module.
 */

const Dexie = globalThis.Dexie;

if (typeof Dexie !== 'function') {
  throw new Error(
    'Dexie is not loaded. Add <script src="https://unpkg.com/dexie@3/dist/dexie.min.js"></script> in <head> before ES modules.'
  );
}

class MetzSpanishDB extends Dexie {
  constructor() {
    super('MetzSpanishDB');
    this.version(1).stores({
      itemResponses:
        '++id, studentId, itemId, skillCluster, timestamp, correct, responseTimeMs, gameMode, difficulty, sessionId, [studentId+itemId]',
      fsrsCards:
        '[itemId+studentId], itemId, studentId, stability, difficulty, due, lapses, reps, state, lastReview, elapsedDays, scheduledDays, [studentId+due]',
      bktSkills:
        '[skillCluster+studentId], skillCluster, studentId, pMastery, pL0, pT, pG, pS, totalAttempts, lastUpdated, learnerTrack, [studentId+pMastery]',
      students:
        '++id, &studentId, displayName, learnerTrack, createdAt, lastActive, totalSessions, streakDays, lastSessionDate',
      sessions:
        '++id, studentId, startTime, endTime, itemCount, correctCount, gameMode, unitId',
    });
  }
}

const db = new MetzSpanishDB();

export const itemResponses = db.itemResponses;
export const fsrsCards = db.fsrsCards;
export const bktSkills = db.bktSkills;
export const students = db.students;
export const sessions = db.sessions;

export default db;
