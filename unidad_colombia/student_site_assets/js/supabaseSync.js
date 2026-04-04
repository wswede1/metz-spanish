/**
 * Optional Supabase cloud mirror for MetzSpanishDB (Dexie).
 * Loads @supabase/supabase-js via dynamic import (ESM CDN) on first use, unless
 * globalThis.supabase.createClient is already set (optional script tag).
 * Credentials: localStorage only (never commit keys). Use the publishable key in the browser — never the service secret.
 */

import { students, sessions, itemResponses, fsrsCards, bktSkills } from './db.js';

export const LS_URL = 'metz-supabase-url';
export const LS_KEY = 'metz-supabase-publishable-key';
export const LS_LAST_SYNC = 'metz-supabase-last-sync-ms';

const SUPABASE_ESM = 'https://esm.sh/@supabase/supabase-js@2';

const BATCH = 80;
const DEBOUNCE_MS = 2500;
const pendingTimers = new Map();

let clientPromise = null;

export function resetSupabaseClient() {
  clientPromise = null;
}

async function resolveCreateClient() {
  const sup = globalThis.supabase;
  if (sup && typeof sup.createClient === 'function') {
    return sup.createClient.bind(sup);
  }
  const mod = await import(SUPABASE_ESM);
  return mod.createClient;
}

export function getSavedSupabaseUrl() {
  try {
    return localStorage.getItem(LS_URL)?.trim() || '';
  } catch {
    return '';
  }
}

export function getSavedSupabaseKey() {
  try {
    return localStorage.getItem(LS_KEY)?.trim() || '';
  } catch {
    return '';
  }
}

export function saveSupabaseSettings(url, publishableKey) {
  localStorage.setItem(LS_URL, String(url || '').trim());
  localStorage.setItem(LS_KEY, String(publishableKey || '').trim());
  resetSupabaseClient();
}

/** @returns {Promise<object | null>} Supabase client or null */
export async function getSupabaseClient() {
  const url = getSavedSupabaseUrl();
  const key = getSavedSupabaseKey();
  if (!url || !key) return null;
  try {
    if (!clientPromise) {
      clientPromise = (async () => {
        const createClient = await resolveCreateClient();
        return createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
      })();
    }
    return await clientPromise;
  } catch (e) {
    clientPromise = null;
    console.warn('[SUPABASE SYNC]', e?.message || e);
    return null;
  }
}

/** Alias for getSupabaseClient (Phase plan name). */
export async function initSupabase() {
  return getSupabaseClient();
}

export function getLastSyncTime() {
  try {
    const s = localStorage.getItem(LS_LAST_SYNC);
    return s ? Number(s) : null;
  } catch {
    return null;
  }
}

export function setLastSyncTime(ts = Date.now()) {
  try {
    localStorage.setItem(LS_LAST_SYNC, String(ts));
  } catch {
    /* ignore */
  }
}

function studentToPg(row) {
  return {
    student_id: row.studentId,
    display_name: row.displayName,
    learner_track: row.learnerTrack,
    created_at: row.createdAt,
    last_active: row.lastActive ?? 0,
    total_sessions: row.totalSessions ?? 0,
    streak_days: row.streakDays ?? 0,
    last_session_date: row.lastSessionDate ?? null,
  };
}

function studentFromPg(row) {
  return {
    studentId: row.student_id,
    displayName: row.display_name,
    learnerTrack: row.learner_track,
    createdAt: row.created_at,
    lastActive: row.last_active,
    totalSessions: row.total_sessions,
    streakDays: row.streak_days,
    lastSessionDate: row.last_session_date,
  };
}

async function upsertBatches(client, table, rows, onConflict) {
  if (!rows.length) return;
  for (let i = 0; i < rows.length; i += BATCH) {
    const chunk = rows.slice(i, i + BATCH);
    const { error } = await client.from(table).upsert(chunk, { onConflict });
    if (error) throw error;
  }
}

/**
 * Push all local rows for one student to Supabase (upsert).
 */
export async function syncToSupabase(studentId) {
  const client = await getSupabaseClient();
  if (!client || !studentId) return;

  const srow = await students.where('studentId').equals(studentId).first();
  if (!srow) return;

  const { error: e0 } = await client
    .from('students')
    .upsert([studentToPg(srow)], { onConflict: 'student_id' });
  if (e0) throw e0;

  const [sess, items, cards, skills] = await Promise.all([
    sessions.where('studentId').equals(studentId).toArray(),
    itemResponses.where('studentId').equals(studentId).toArray(),
    fsrsCards.where('studentId').equals(studentId).toArray(),
    bktSkills.where('studentId').equals(studentId).toArray(),
  ]);

  if (sess.length) {
    await upsertBatches(
      client,
      'sessions',
      sess.map((r) => ({
        id: r.id,
        student_id: r.studentId,
        start_time: r.startTime,
        end_time: r.endTime ?? null,
        item_count: r.itemCount,
        correct_count: r.correctCount,
        game_mode: r.gameMode ?? null,
        unit_id: r.unitId ?? null,
      })),
      'id'
    );
  }

  if (items.length) {
    await upsertBatches(
      client,
      'item_responses',
      items.map((r) => ({
        student_id: r.studentId,
        item_id: r.itemId,
        skill_cluster: r.skillCluster,
        timestamp: r.timestamp,
        correct: r.correct,
        response_time_ms: r.responseTimeMs,
        game_mode: r.gameMode,
        difficulty: r.difficulty,
        session_id: r.sessionId,
      })),
      'student_id,item_id,timestamp,session_id'
    );
  }

  if (cards.length) {
    await upsertBatches(
      client,
      'fsrs_cards',
      cards.map((r) => ({
        item_id: r.itemId,
        student_id: r.studentId,
        stability: r.stability,
        difficulty: r.difficulty,
        due: r.due,
        lapses: r.lapses ?? 0,
        reps: r.reps ?? 0,
        state: r.state,
        last_review: r.lastReview ?? null,
        elapsed_days: r.elapsedDays ?? 0,
        scheduled_days: r.scheduledDays ?? 0,
      })),
      'item_id,student_id'
    );
  }

  if (skills.length) {
    await upsertBatches(
      client,
      'bkt_skills',
      skills.map((r) => ({
        skill_cluster: r.skillCluster,
        student_id: r.studentId,
        p_mastery: r.pMastery,
        p_l0: r.pL0,
        p_t: r.pT,
        p_g: r.pG,
        p_s: r.pS,
        total_attempts: r.totalAttempts ?? 0,
        last_updated: r.lastUpdated ?? null,
        learner_track: r.learnerTrack ?? null,
      })),
      'skill_cluster,student_id'
    );
  }

  setLastSyncTime(Date.now());
}

/**
 * Pull remote rows for one student and merge into Dexie (last_review / last_updated / last_active win where applicable).
 */
export async function syncFromSupabase(studentId) {
  const client = await getSupabaseClient();
  if (!client || !studentId) return;

  const { data: sRemote, error: eS } = await client
    .from('students')
    .select('*')
    .eq('student_id', studentId)
    .maybeSingle();
  if (eS) throw eS;
  if (!sRemote) return;

  const incoming = studentFromPg(sRemote);
  const localS = await students.where('studentId').equals(studentId).first();
  if (!localS) {
    await students.add({
      studentId: incoming.studentId,
      displayName: incoming.displayName,
      learnerTrack: incoming.learnerTrack,
      createdAt: incoming.createdAt,
      lastActive: incoming.lastActive,
      totalSessions: incoming.totalSessions,
      streakDays: incoming.streakDays,
      lastSessionDate: incoming.lastSessionDate,
    });
  } else if ((sRemote.last_active ?? 0) > (localS.lastActive ?? 0)) {
    await students.update(localS.id, {
      displayName: incoming.displayName,
      learnerTrack: incoming.learnerTrack,
      createdAt: incoming.createdAt,
      lastActive: incoming.lastActive,
      totalSessions: incoming.totalSessions,
      streakDays: incoming.streakDays,
      lastSessionDate: incoming.lastSessionDate,
    });
  }

  const { data: sessR, error: eSess } = await client.from('sessions').select('*').eq('student_id', studentId);
  if (eSess) throw eSess;
  for (const row of sessR || []) {
    const mapped = {
      id: row.id,
      studentId: row.student_id,
      startTime: row.start_time,
      endTime: row.end_time,
      itemCount: row.item_count,
      correctCount: row.correct_count,
      gameMode: row.game_mode,
      unitId: row.unit_id,
    };
    const loc = await sessions.get(row.id);
    if (!loc) await sessions.add(mapped);
    else await sessions.put(mapped);
  }

  const { data: cardsR, error: eC } = await client.from('fsrs_cards').select('*').eq('student_id', studentId);
  if (eC) throw eC;
  for (const row of cardsR || []) {
    const key = [row.item_id, row.student_id];
    const mapped = {
      itemId: row.item_id,
      studentId: row.student_id,
      stability: row.stability,
      difficulty: row.difficulty,
      due: row.due,
      lapses: row.lapses,
      reps: row.reps,
      state: row.state,
      lastReview: row.last_review,
      elapsedDays: row.elapsed_days,
      scheduledDays: row.scheduled_days,
    };
    const loc = await fsrsCards.get(key);
    const rlr = Number(row.last_review) || 0;
    const llr = Number(loc?.lastReview) || 0;
    if (!loc || rlr >= llr) await fsrsCards.put(mapped);
  }

  const { data: bktR, error: eB } = await client.from('bkt_skills').select('*').eq('student_id', studentId);
  if (eB) throw eB;
  for (const row of bktR || []) {
    const key = [row.skill_cluster, row.student_id];
    const mapped = {
      skillCluster: row.skill_cluster,
      studentId: row.student_id,
      pMastery: row.p_mastery,
      pL0: row.p_l0,
      pT: row.p_t,
      pG: row.p_g,
      pS: row.p_s,
      totalAttempts: row.total_attempts,
      lastUpdated: row.last_updated,
      learnerTrack: row.learner_track,
    };
    const loc = await bktSkills.get(key);
    if (!loc || (row.last_updated ?? 0) >= (loc.lastUpdated ?? 0)) await bktSkills.put(mapped);
  }

  const { data: irR, error: eI } = await client.from('item_responses').select('*').eq('student_id', studentId);
  if (eI) throw eI;
  const localItems = await itemResponses.where('studentId').equals(studentId).toArray();
  function existsNatural(row) {
    return localItems.some(
      (r) =>
        r.itemId === row.item_id && r.timestamp === row.timestamp && r.sessionId === row.session_id
    );
  }
  for (const row of irR || []) {
    if (existsNatural(row)) continue;
    await itemResponses.add({
      studentId: row.student_id,
      itemId: row.item_id,
      skillCluster: row.skill_cluster,
      timestamp: row.timestamp,
      correct: row.correct,
      responseTimeMs: row.response_time_ms,
      gameMode: row.game_mode,
      difficulty: row.difficulty,
      sessionId: row.session_id,
    });
    localItems.push({
      itemId: row.item_id,
      timestamp: row.timestamp,
      sessionId: row.session_id,
    });
  }
}

export function scheduleSyncToSupabase(studentId) {
  if (!studentId) return;
  const prev = pendingTimers.get(studentId);
  if (prev) clearTimeout(prev);
  pendingTimers.set(
    studentId,
    setTimeout(() => {
      pendingTimers.delete(studentId);
      syncToSupabase(studentId).catch((err) => console.warn('[SUPABASE SYNC]', err?.message || err));
    }, DEBOUNCE_MS)
  );
}

export async function syncAllLocalStudentsToSupabase() {
  const rows = await students.toArray();
  for (const r of rows) {
    await syncToSupabase(r.studentId);
  }
  setLastSyncTime(Date.now());
}

export async function testSupabaseConnection() {
  const client = await getSupabaseClient();
  if (!client) return { ok: false, message: 'Not configured (URL + publishable key)' };
  const { error } = await client.from('students').select('student_id').limit(1);
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: 'OK' };
}
