/**
 * Optional adaptive layer for Colombia vocab review (both courses):
 *   span_1/unidad_colombia/Colombia_Vocab_Review_Spanish1.html
 *   span_2/unidad_colombia/Colombia_Vocab_Review_Spanish2.html
 *
 * Each page sets window.__METZ_VOCAB_CATEGORY_INDEX when the category selection changes:
 *   0 only when the active selection is exclusively "All unit"; otherwise the first
 *   selected theme index (so themed / multi-theme selections skip adaptive flash).
 * Flashcard deck override (adaptive queue) runs only when:
 *   - category index === 0 (All unit only), AND
 *   - URL has ?adaptive=1 (opt-in), AND
 *   - a Dexie student row exists with a queue of 3+ words.
 * Otherwise the full All unit deck from colombia-vocab-sp*.js stays visible.
 * Themed categories (index > 0) never use the adaptive queue.
 */

import { students } from './db.js';
import { AdaptiveSession } from './sessionEngine.js';
import { itemIdForSpanish, getItemMeta } from './vocabularyMap.js';

let activeSession = null;

function colombiaVocabContext() {
  return window.__METZ_COLOMBIA_SP1 || window.__METZ_COLOMBIA_SP2 || null;
}

function adaptiveUnitId() {
  return window.__METZ_ADAPTIVE_UNIT_ID || 'colombia_sp1';
}

async function resolveStudentRow() {
  const all = await students.toArray();
  if (!all.length) return null;
  const pref = localStorage.getItem('metz-active-student-id');
  const row = pref ? all.find((s) => s.studentId === pref) : all[0];
  if (row) localStorage.setItem('metz-active-student-id', row.studentId);
  return row || null;
}

async function maybeApplyAdaptiveFlashDeck() {
  if (!window.__METZ_PATCH_FLASH_DECK || !colombiaVocabContext()) return;
  try {
    var ap = new URLSearchParams(window.location.search).get('adaptive');
    if (ap !== '1' && ap !== 'true') return;
  } catch {
    return;
  }
  // Themed category buttons (index > 0) must keep that category's deck. Only "All unit"
  // (index 0) uses the adaptive queue for flashcards.
  if (window.__METZ_VOCAB_CATEGORY_INDEX !== 0) return;
  const st = await resolveStudentRow();
  if (!st) return;

  try {
    activeSession = new AdaptiveSession(st.studentId, st.learnerTrack, adaptiveUnitId());
    await activeSession.init();
    const words = activeSession.queue.map((q) => q.word).filter(Boolean);
    if (words.length >= 3) {
      window.__METZ_PATCH_FLASH_DECK(words, 0);
    }
  } catch (e) {
    console.warn('[ADAPTIVE]', e?.message || e);
    activeSession = null;
  }
}

function recordIfMapped(itemId, correct, responseTimeMs, gameMode) {
  if (!activeSession || !getItemMeta(itemId)) return;
  activeSession
    .recordResponse(itemId, correct, responseTimeMs, gameMode)
    .catch((e) => console.warn('[ADAPTIVE]', e?.message || e));
}

function wrapGlobals() {
  if (typeof window.setMode === 'function' && !window.__metzOrigSetMode) {
    window.__metzOrigSetMode = window.setMode;
    window.setMode = function patchedSetMode(m) {
      window.__metzOrigSetMode.apply(this, arguments);
      if (m === 'flashcard') {
        Promise.resolve(maybeApplyAdaptiveFlashDeck()).catch((e) => console.warn('[ADAPTIVE]', e));
      }
      if (m === 'quiz') {
        window.__metzQuizT0 = Date.now();
      }
    };
  }

  if (typeof window.markKnow === 'function' && !window.__metzOrigMarkKnow) {
    window.__metzOrigMarkKnow = window.markKnow;
    window.markKnow = function patchedMarkKnow() {
      try {
        const w = typeof window.__METZ_PEEK_FLASH_WORD === 'function' ? window.__METZ_PEEK_FLASH_WORD() : null;
        if (w?.es) {
          const id = itemIdForSpanish(w.es);
          recordIfMapped(id, true, 1000, 'flashcard');
        }
      } catch (e) {
        console.warn('[ADAPTIVE]', e?.message || e);
      }
      return window.__metzOrigMarkKnow.apply(this, arguments);
    };
  }

  if (typeof window.markStudy === 'function' && !window.__metzOrigMarkStudy) {
    window.__metzOrigMarkStudy = window.markStudy;
    window.markStudy = function patchedMarkStudy() {
      try {
        const w = typeof window.__METZ_PEEK_FLASH_WORD === 'function' ? window.__METZ_PEEK_FLASH_WORD() : null;
        if (w?.es) {
          const id = itemIdForSpanish(w.es);
          recordIfMapped(id, false, 2500, 'flashcard');
        }
      } catch (e) {
        console.warn('[ADAPTIVE]', e?.message || e);
      }
      return window.__metzOrigMarkStudy.apply(this, arguments);
    };
  }

  if (typeof window.answerQuiz === 'function' && !window.__metzOrigAnswerQuiz) {
    window.__metzOrigAnswerQuiz = window.answerQuiz;
    window.answerQuiz = function patchedAnswerQuiz(btn, isCorrect) {
      try {
        const qc = typeof window.__METZ_PEEK_QUIZ === 'function' ? window.__METZ_PEEK_QUIZ() : null;
        if (qc?.correct?.es) {
          const id = itemIdForSpanish(qc.correct.es);
          const t0 = window.__metzQuizT0 || Date.now();
          const rt = Math.min(120_000, Math.max(0, Date.now() - t0));
          recordIfMapped(id, !!isCorrect, rt, 'quiz');
        }
      } catch (e) {
        console.warn('[ADAPTIVE]', e?.message || e);
      }
      return window.__metzOrigAnswerQuiz.apply(this, arguments);
    };
  }

  if (!window.__metzBeforeUnloadSession) {
    window.__metzBeforeUnloadSession = true;
    window.addEventListener('beforeunload', () => {
      if (activeSession && activeSession._itemsCompleted > 0) {
        try {
          const p = activeSession.getSessionProgress();
          if (p.itemsCompleted > 0) {
            activeSession.endSession().catch(() => {});
          }
        } catch {
          /* ignore */
        }
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => wrapGlobals());
} else {
  wrapGlobals();
}
