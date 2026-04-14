import { itemResponses } from './db.js';

const REQUIRED = [
  'studentId',
  'itemId',
  'skillCluster',
  'correct',
  'responseTimeMs',
  'gameMode',
  'difficulty',
  'sessionId',
];

function assertRequired(payload) {
  const missing = REQUIRED.filter((k) => payload[k] === undefined || payload[k] === null);
  if (missing.length) {
    throw new Error(`logResponse: missing required field(s): ${missing.join(', ')}`);
  }
  if (typeof payload.studentId !== 'string' || !payload.studentId) {
    throw new Error('logResponse: studentId must be a non-empty string');
  }
  if (typeof payload.itemId !== 'string' || !payload.itemId) {
    throw new Error('logResponse: itemId must be a non-empty string');
  }
  if (typeof payload.skillCluster !== 'string' || !payload.skillCluster) {
    throw new Error('logResponse: skillCluster must be a non-empty string');
  }
  if (typeof payload.sessionId !== 'string' || !payload.sessionId) {
    throw new Error('logResponse: sessionId must be a non-empty string');
  }
  if (typeof payload.responseTimeMs !== 'number' || Number.isNaN(payload.responseTimeMs)) {
    throw new Error('logResponse: responseTimeMs must be a number');
  }
  if (typeof payload.gameMode !== 'string') {
    throw new Error('logResponse: gameMode must be a string');
  }
  if (typeof payload.difficulty !== 'string' && typeof payload.difficulty !== 'number') {
    throw new Error('logResponse: difficulty must be a string or number');
  }
  const ok =
    payload.correct === 0 ||
    payload.correct === 1 ||
    payload.correct === true ||
    payload.correct === false;
  if (!ok) {
    throw new Error('logResponse: correct must be 0, 1, true, or false');
  }
}

function toCorrect01(correct) {
  if (correct === true || correct === 1) return 1;
  return 0;
}

/**
 * @param {object} payload
 * @returns {Promise<number>} inserted row id
 */
export async function logResponse(payload) {
  assertRequired(payload);
  const row = {
    studentId: payload.studentId,
    itemId: payload.itemId,
    skillCluster: payload.skillCluster,
    timestamp: typeof payload.timestamp === 'number' ? payload.timestamp : Date.now(),
    correct: toCorrect01(payload.correct),
    responseTimeMs: payload.responseTimeMs,
    gameMode: payload.gameMode,
    difficulty: String(payload.difficulty),
    sessionId: payload.sessionId,
  };
  const newId = await itemResponses.add(row);
  return newId;
}

/**
 * @returns {Promise<object[]>}
 */
export async function getItemHistory(studentId, itemId, limit = 20) {
  const rows = await itemResponses.where('[studentId+itemId]').equals([studentId, itemId]).toArray();
  rows.sort((a, b) => b.timestamp - a.timestamp);
  return rows.slice(0, limit);
}

/**
 * @returns {Promise<object[]>}
 */
export async function getSkillHistory(studentId, skillCluster, limit = 50) {
  const rows = await itemResponses
    .where('studentId')
    .equals(studentId)
    .filter((r) => r.skillCluster === skillCluster)
    .toArray();
  rows.sort((a, b) => b.timestamp - a.timestamp);
  return rows.slice(0, limit);
}

/**
 * @returns {Promise<{ totalItems: number, correctCount: number, accuracy: number, avgResponseTimeMs: number, skillClusters: string[] }>}
 */
export async function getSessionSummary(sessionId) {
  const rows = await itemResponses.filter((r) => r.sessionId === sessionId).toArray();
  if (!rows.length) {
    return {
      totalItems: 0,
      correctCount: 0,
      accuracy: 0,
      avgResponseTimeMs: 0,
      skillClusters: [],
    };
  }
  const totalItems = rows.length;
  const correctCount = rows.reduce((n, r) => n + (r.correct === 1 ? 1 : 0), 0);
  const accuracy = totalItems ? correctCount / totalItems : 0;
  const sumRt = rows.reduce((n, r) => n + (Number(r.responseTimeMs) || 0), 0);
  const avgResponseTimeMs = totalItems ? sumRt / totalItems : 0;
  const skillClusters = [...new Set(rows.map((r) => r.skillCluster).filter(Boolean))];
  return { totalItems, correctCount, accuracy, avgResponseTimeMs, skillClusters };
}
