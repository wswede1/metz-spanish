# Adaptive learning — decision log

Running record of implementation choices for Phases 3–6 (and related wiring). Updated as work proceeds.

## Pathing and module layout

- **Canonical JS location:** `unidad_colombia/student_site_assets/js/` (not a repo-root `/js/` folder). The plan document referred to `/js/…`; this repo keeps shared assets next to other Colombia student assets so both `span_1` and `span_2` hubs can import with stable relative URLs.
- **Colombia Sp1 vocab page** (`span_1/unidad_colombia/Colombia_Vocab_Review_Spanish1.html`) loads the adaptive bridge as  
  `../../unidad_colombia/student_site_assets/js/adaptiveColombiaVocabBridge.js`.
- **Teacher dashboard** lives at **repo root** `teacher.html` (as in the plan) and references CSS/JS under `unidad_colombia/student_site_assets/`.

## Phase 3 (BKT + map)

- **Vocabulary map** is **Spanish 1 Colombia** only (`vocabularyMap.js`), aligned to slug rules in the Sp1 HTML review page. Item IDs use prefix `sp1-co-`.
- **BKT** persists per `(skillCluster, studentId)` in Dexie; heritage vs L2 uses `getDefaultParams` / cluster overrides from `bkt.js`.

## Phase 4 (session + integration)

- **`AdaptiveSession`** (`sessionEngine.js`) builds a queue from FSRS due cards, weak-cluster injection, and “new” fill. **`RATING`** is imported from `fsrs.js` (required for `deriveRating`).
- **Bridge** (`adaptiveColombiaVocabBridge.js`):
  - Resolves student via `students` + `localStorage` key `metz-active-student-id` (fallback: first student row).
  - Patches flash deck when switching to flashcard mode if the adaptive queue has **≥ 3** words (avoids replacing the deck with a tiny queue).
  - **`let` deck / quiz state** is not on `window`; the HTML exposes `window.__METZ_PEEK_FLASH_WORD` and `window.__METZ_PEEK_QUIZ` so the ES module can read the current card safely.
  - **`beforeunload`:** calls `endSession()` only if `_itemsCompleted > 0` so empty visits do not write zero-item sessions.
- **Dexie** is loaded in the vocab page `<head>` so `db.js` can run inside the bridge module.

## Phase 5 (progress UI)

- **`progressUI.js`** implements mastery bars, memory strength (FSRS `forgettingCurve`), due count (`getReviewStats`), streak badge, session summary, and **`renderStudentDashboard`**.
- **Hub integration** via **`adaptiveHubProgress.js`**, mounted from both `span_1/.../student_site/index.html` and `span_2/.../student_site/index.html`.
- **Spanish 2 hub** sets `data-review-href="../Colombia_Vocab_Review_Spanish2.html"` on the dashboard root so “Start review” targets Sp2; Sp1 hub omits it and defaults to the Sp1 review file.
- **Styles** for progress UI and teacher dashboard were appended to existing **`colombia-student.css`** (no new global stylesheet).
- **`attachItemTooltip`** exists in **`tooltips.js`** but is **not yet wired** to DOM nodes on the vocab page (flashcard/quiz markup would need stable selectors). Hub/tooltip wiring is listed under “What to do next.”

## Phase 6 (teacher dashboard)

- **`teacher.html`** at repo root: Dexie + shared CSS + tabs; body content rendered by **`teacherDashboard.js`** into `#dashboard-content`.
- **Data scope:** All aggregates read **local IndexedDB** on the current browser. Copy on the page states that **cross-device class view** depends on **Supabase sync** (see sync settings).
- **Sessions query:** Last 7 days uses `sessions.where('startTime').aboveOrEqual(...)`.
- **By skill tab:** Sortable table uses **event delegation** with **`AbortController`**; listeners are aborted when switching tabs to avoid leaks.
- **Item diagnostics:** Flags for very hard / very easy / high guess-rate rows; **Export to CSV** uses `exportToCSV` with date-stamped filename.

## Error logging

- Bridge / adaptive logic: **`[ADAPTIVE]`** (per plan).
- UI bootstrap / teacher views: **`[ADAPTIVE UI]`** (per plan).

---

## What to do next (deferred by you + follow-ups)

1. **Your testing pass (when ready)**  
   - Open Sp1 student hub → vocab review → flashcard/quiz; confirm IndexedDB tables (`itemResponses`, `fsrsCards`, `bktSkills`, `sessions`) update.  
   - Open `teacher.html` after data exists; exercise tabs and CSV export.  
   - If using Supabase: run SQL migrations, configure sync in `supabase-sync-settings.html`, and confirm teacher view on a profile that has synced data.

2. **Wire `attachItemTooltip`** to concrete elements on `Colombia_Vocab_Review_Spanish1.html` (e.g. card face or quiz prompt) once selectors are stable; wrap in `try/catch` with `[ADAPTIVE UI]`.

3. **Post-session summary in the UI** — `renderSessionSummary` is implemented; the bridge could dispatch a custom event after `endSession()` or show a lightweight modal (not wired yet).

4. **Spanish 2 vocab adaptive bridge** — Sp2 HTML does not yet mirror the Sp1 hooks (`__METZ_PATCH_FLASH_DECK`, peek helpers, bridge script). Add when Sp2 deck structure matches.

5. **Optional:** Student picker UI for `metz-active-student-id` on the hub if multiple `students` rows become common.

6. **Prompt appendix:** Long-term **pyBKT calibration** with exported `itemResponses` (documented in `ADAPTIVE_LEARNING_CLAUDE_CODE_PROMPT.md` Appendix A).

---

## 2026-04-04 — Session note

- Implemented remaining Phase 4 bridge pieces (peek helpers, module script, Dexie on vocab page), Phase 5 modules + hub bootstrap (Sp1 + Sp2), Phase 6 `teacher.html` + `teacherDashboard.js`, and this log file.
- Fixed missing **`RATING`** import in `sessionEngine.js` (would throw at runtime on first `recordResponse`).
