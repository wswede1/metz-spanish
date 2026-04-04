import { students, bktSkills, fsrsCards } from './db.js';

const TRACKS = new Set(['heritage', 'L2', 'auto']);
const DIAGNOSTIC_JSON = new URL('../adaptive-diagnostic-prompts.json', import.meta.url);

/** djb2 → stable hex id */
export function hashStudentId(displayName) {
  const s = String(displayName || '').trim().toLowerCase();
  let hash = 5381;
  for (let i = 0; i < s.length; i += 1) {
    hash = ((hash << 5) + hash + s.charCodeAt(i)) | 0;
  }
  return `u${(hash >>> 0).toString(16)}`;
}

function todayYmd() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function ymdDiffDays(fromYmd, toYmd) {
  const a = new Date(`${fromYmd}T12:00:00`);
  const b = new Date(`${toYmd}T12:00:00`);
  return Math.round((b - a) / 86400000);
}

function normalizeAnswer(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function answerMatches(input, acceptableAnswers) {
  const n = normalizeAnswer(input);
  if (!n) return false;
  return acceptableAnswers.some((a) => {
    const t = normalizeAnswer(a);
    return t && (n === t || n.includes(t) || t.includes(n));
  });
}

function assignTrackFromDiagnostic(correctCount, responseTimesMs) {
  const n = responseTimesMs.length;
  const avgMs = n ? responseTimesMs.reduce((a, b) => a + b, 0) / n : 0;
  if (correctCount <= 2 || avgMs > 3000) return 'L2';
  if (correctCount >= 4 && avgMs < 2000) return 'heritage';
  return 'L2';
}

function ensureModalStyles() {
  if (document.getElementById('metz-adaptive-diag-styles')) return;
  const style = document.createElement('style');
  style.id = 'metz-adaptive-diag-styles';
  style.textContent = `
    .metz-diag-overlay{position:fixed;inset:0;background:rgba(0,20,60,.45);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui,sans-serif}
    .metz-diag-panel{max-width:420px;width:100%;background:#fff;border-radius:16px;padding:20px 22px;box-shadow:0 12px 40px rgba(0,0,0,.2)}
    .metz-diag-panel h2{margin:0 0 8px;font-size:1.15rem;color:#003893}
    .metz-diag-panel p{margin:0 0 12px;line-height:1.45;color:#333;font-size:.95rem}
    .metz-diag-word{font-size:1.4rem;font-weight:700;color:#CE1126;margin:8px 0 14px}
    .metz-diag-panel input{width:100%;box-sizing:border-box;padding:10px 12px;border:2px solid #ccd;font-size:1rem;margin-bottom:12px;border-radius:10px}
    .metz-diag-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:8px}
    .metz-diag-actions button{padding:10px 18px;border-radius:999px;border:none;font-weight:700;cursor:pointer;font-size:.9rem}
    .metz-diag-skip{background:#e8e8e8;color:#333}
    .metz-diag-next{background:#003893;color:#fff}
    .metz-diag-progress{font-size:.8rem;color:#666;margin-bottom:10px}
  `;
  document.head.appendChild(style);
}

/**
 * 5-question learner track diagnostic (heritage vs L2).
 * @returns {Promise<'heritage'|'L2'>}
 */
export async function runLearnerTrackDiagnostic() {
  ensureModalStyles();
  const res = await fetch(DIAGNOSTIC_JSON);
  if (!res.ok) {
    throw new Error(`Failed to load diagnostic prompts: ${res.status}`);
  }
  const items = await res.json();
  if (!Array.isArray(items) || items.length < 5) {
    throw new Error('Diagnostic prompts JSON must contain at least 5 items');
  }
  const quiz = items.slice(0, 5);

  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'metz-diag-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    let index = 0;
    let correctCount = 0;
    const responseTimesMs = [];

    const finish = (track) => {
      overlay.remove();
      resolve(track);
    };

    const showStep = () => {
      if (index >= quiz.length) {
        finish(assignTrackFromDiagnostic(correctCount, responseTimesMs));
        return;
      }
      const item = quiz[index];
      const start = performance.now();
      overlay.innerHTML = `
        <div class="metz-diag-panel">
          <div class="metz-diag-progress">Question ${index + 1} of ${quiz.length}</div>
          <h2>Quick check</h2>
          <p>${escapeHtml(item.question)}</p>
          <div class="metz-diag-word">${escapeHtml(item.promptEs)}</div>
          <input type="text" autocomplete="off" id="metz-diag-input" placeholder="Type your answer in English" />
          <div class="metz-diag-actions">
            <button type="button" class="metz-diag-skip" id="metz-diag-skip">Skip</button>
            <button type="button" class="metz-diag-next" id="metz-diag-next">Next</button>
          </div>
        </div>
      `;
      const input = overlay.querySelector('#metz-diag-input');
      const nextBtn = overlay.querySelector('#metz-diag-next');
      const skipBtn = overlay.querySelector('#metz-diag-skip');

      input.focus();

      const submit = (skipped) => {
        const elapsed = performance.now() - start;
        responseTimesMs.push(elapsed);
        if (!skipped && answerMatches(input.value, item.acceptableAnswers)) {
          correctCount += 1;
        }
        index += 1;
        showStep();
      };

      nextBtn.addEventListener('click', () => submit(false));
      skipBtn.addEventListener('click', () => submit(true));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submit(false);
        }
      });
    };

    document.body.appendChild(overlay);
    showStep();
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * @param {string} displayName
 * @param {'heritage'|'L2'|'auto'} [learnerTrack='auto']
 */
export async function getOrCreateStudent(displayName, learnerTrack = 'auto') {
  const name = String(displayName || '').trim();
  if (!name) {
    throw new Error('getOrCreateStudent: displayName is required');
  }
  if (!TRACKS.has(learnerTrack)) {
    throw new Error('getOrCreateStudent: learnerTrack must be "heritage", "L2", or "auto"');
  }

  const studentId = hashStudentId(name);
  const existing = await students.where('studentId').equals(studentId).first();
  let out;
  if (existing) {
    out = existing;
  } else {
    let track = learnerTrack;
    if (track === 'auto') {
      track = await runLearnerTrackDiagnostic();
    }

    const now = Date.now();
    const row = {
      studentId,
      displayName: name,
      learnerTrack: track,
      createdAt: now,
      lastActive: now,
      totalSessions: 0,
      streakDays: 0,
      lastSessionDate: null,
    };
    const id = await students.add(row);
    out = { ...row, id };
  }

  try {
    const m = await import('./supabaseSync.js');
    await m.syncFromSupabase(studentId);
    m.scheduleSyncToSupabase(studentId);
  } catch (e) {
    console.warn('[SUPABASE SYNC]', e?.message || e);
  }
  return out;
}

/**
 * @param {string} studentId
 * @returns {Promise<number>} updated streakDays
 */
export async function updateStreak(studentId) {
  const row = await students.where('studentId').equals(studentId).first();
  if (!row) {
    throw new Error(`updateStreak: no student found for id ${studentId}`);
  }

  const today = todayYmd();
  const last = row.lastSessionDate;
  let streak = row.streakDays || 0;

  if (last === today) {
    await students.update(row.id, { lastActive: Date.now() });
    return streak;
  }

  if (!last) {
    streak = 1;
  } else {
    const diff = ymdDiffDays(last, today);
    if (diff === 1) {
      streak = (streak || 0) + 1;
    } else if (diff > 1) {
      streak = 1;
    } else {
      streak = streak || 1;
    }
  }

  await students.update(row.id, {
    lastSessionDate: today,
    lastActive: Date.now(),
    streakDays: streak,
  });
  return streak;
}

/**
 * @param {string} studentId
 */
export async function getStudentStats(studentId) {
  const row = await students.where('studentId').equals(studentId).first();
  if (!row) {
    throw new Error(`getStudentStats: no student found for id ${studentId}`);
  }

  const now = Date.now();
  const masteredSkills = await bktSkills
    .where('studentId')
    .equals(studentId)
    .filter((s) => (s.pMastery ?? 0) >= 0.95)
    .count();

  const dueToday = await fsrsCards
    .where('studentId')
    .equals(studentId)
    .filter((c) => c.due != null && Number(c.due) <= now)
    .count();

  return {
    displayName: row.displayName,
    learnerTrack: row.learnerTrack,
    streakDays: row.streakDays ?? 0,
    totalSessions: row.totalSessions ?? 0,
    masteredSkills,
    dueToday,
  };
}
