/**
 * Linear daily roadmap runner (Duolingo-style gated steps + comprehension ladder).
 */

import { logResponse } from '../../../../unidad_colombia/student_site_assets/js/responseLogger.js';

function $(sel, ctx) {
  return (ctx || document).querySelector(sel);
}

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null && text !== '') n.textContent = text;
  return n;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function progressKey(course, day) {
  return `metz-roadmap-${course}-${day}-v1`;
}

function loadProgress(course, day) {
  try {
    const raw = localStorage.getItem(progressKey(course, day));
    if (!raw) return { stage: 0, compStep: 0, deliverables: {}, hearts: null };
    const o = JSON.parse(raw);
    return {
      stage: Number(o.stage) || 0,
      compStep: Number(o.compStep) || 0,
      deliverables: o.deliverables && typeof o.deliverables === 'object' ? o.deliverables : {},
      hearts: o.hearts != null ? Number(o.hearts) : null,
    };
  } catch {
    return { stage: 0, compStep: 0, deliverables: {}, hearts: null };
  }
}

function saveProgress(course, day, state) {
  localStorage.setItem(progressKey(course, day), JSON.stringify(state));
}

function parseQuery() {
  const q = new URLSearchParams(window.location.search);
  const day = parseInt(q.get('day') || '3', 10);
  const course = (q.get('course') || 'sp1').replace(/[^a-z0-9]/gi, '') || 'sp1';
  return { day: isNaN(day) || day < 1 ? 3 : day, course };
}

async function loadManifest(course, day) {
  const url = `roadmaps/${course}-day-${String(day).padStart(2, '0')}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No roadmap file for ${course} day ${day} (${res.status})`);
  return res.json();
}

function toast(msg, ok) {
  const t = el('div', 'roadmap-toast ' + (ok ? 'roadmap-toast-ok' : 'roadmap-toast-bad'), msg);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

async function tryLogResponse(partial) {
  const sid = localStorage.getItem('metz-active-student-id');
  if (!sid) return;
  try {
    await logResponse({ ...partial, studentId: sid });
  } catch (e) {
    console.warn('[ADAPTIVE UI]', e?.message || e);
  }
}

function renderStageBar(manifest, state) {
  const labels = ['Start', 'Warm-up', 'Reading', 'Practice', 'Culture', 'Done'];
  const wrap = el('div', 'roadmap-stagebar');
  const track = el('div', 'roadmap-stagebar-track');
  labels.forEach((lab, i) => {
    const dot = el('div', 'roadmap-stage-dot' + (i <= state.stage ? ' roadmap-stage-dot-on' : ''));
    dot.title = lab;
    track.appendChild(dot);
  });
  wrap.appendChild(track);
  wrap.appendChild(el('div', 'roadmap-stagebar-label', labels[Math.min(state.stage, labels.length - 1)]));
  return wrap;
}

function renderHearts(n) {
  const h = el('div', 'roadmap-hearts');
  h.textContent = '❤️'.repeat(Math.max(0, n)) + (n <= 0 ? ' (out of hearts — review vocab, then refresh)' : '');
  return h;
}

function renderObjectives(manifest, state, onAdvance) {
  const box = el('div', 'roadmap-card');
  box.appendChild(el('h2', 'roadmap-h2', manifest.title || 'Daily roadmap'));
  if (manifest.subtitle) box.appendChild(el('p', 'roadmap-muted', manifest.subtitle));

  const oh = el('h3', 'roadmap-h3', 'Objectives');
  box.appendChild(oh);
  const ou = el('ul', 'roadmap-list');
  (manifest.objectives || []).forEach((t) => {
    const li = el('li', null, t);
    ou.appendChild(li);
  });
  box.appendChild(ou);

  const ch = el('h3', 'roadmap-h3', 'I can…');
  box.appendChild(ch);
  const cu = el('ul', 'roadmap-list');
  (manifest.canDo || []).forEach((t) => {
    const li = el('li', null, t);
    cu.appendChild(li);
  });
  box.appendChild(cu);

  const dh = el('h3', 'roadmap-h3', 'Deliverables');
  box.appendChild(dh);
  (manifest.deliverables || []).forEach((d) => {
    const row = el('label', 'roadmap-deliverable');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!state.deliverables[d.id];
    cb.addEventListener('change', () => {
      state.deliverables[d.id] = cb.checked;
      saveProgress(manifest.courseKey, manifest.day, state);
    });
    row.appendChild(cb);
    const span = el('span', 'roadmap-deliverable-text');
    span.appendChild(el('strong', null, d.title));
    if (d.instructionsHtml) {
      const p = document.createElement('p');
      p.className = 'roadmap-muted';
      p.innerHTML = d.instructionsHtml;
      span.appendChild(p);
    }
    if (d.turnInUrl) {
      const a = el('a', 'roadmap-link', 'Open turn-in');
      a.href = d.turnInUrl;
      a.target = '_blank';
      a.rel = 'noopener';
      span.appendChild(a);
    }
    row.appendChild(span);
    box.appendChild(row);
  });

  const btn = el('button', 'primary-btn roadmap-continue', 'Continue');
  btn.type = 'button';
  btn.addEventListener('click', () => {
    const all = (manifest.deliverables || []).every((d) => state.deliverables[d.id]);
    if (!all) {
      toast('Check each deliverable when you are ready.', false);
      return;
    }
    state.stage = 1;
    saveProgress(manifest.courseKey, manifest.day, state);
    onAdvance();
  });
  box.appendChild(btn);
  return box;
}

function renderWarmup(manifest, state, onAdvance) {
  const w = manifest.warmup || {};
  const box = el('div', 'roadmap-card');
  box.appendChild(el('h2', 'roadmap-h2', w.title || 'Warm-up'));
  if (w.description) box.appendChild(el('p', 'roadmap-muted', w.description));
  if (w.href) {
    const a = el('a', 'secondary-btn roadmap-open', 'Open warm-up');
    a.href = w.href;
    a.target = '_self';
    box.appendChild(a);
  }
  const btn = el('button', 'primary-btn roadmap-continue', 'I finished the warm-up');
  btn.type = 'button';
  btn.addEventListener('click', () => {
    state.stage = 2;
    saveProgress(manifest.courseKey, manifest.day, state);
    onAdvance();
  });
  box.appendChild(btn);
  return box;
}

function renderReading(manifest, state, onAdvance) {
  const g = manifest.grammarReading || {};
  const box = el('div', 'roadmap-card');
  box.appendChild(el('h2', 'roadmap-h2', g.title || 'Grammar through reading'));
  if (g.description) box.appendChild(el('p', 'roadmap-muted', g.description));
  if (g.href) {
    const a = el('a', 'secondary-btn roadmap-open', 'Open activity');
    a.href = g.href;
    box.appendChild(a);
  }
  if (g.secondaryHref && g.secondaryLabel) {
    const a2 = el('a', 'roadmap-link roadmap-second', g.secondaryLabel);
    a2.href = g.secondaryHref;
    box.appendChild(a2);
  }
  const btn = el('button', 'primary-btn roadmap-continue', 'Continue to comprehension');
  btn.type = 'button';
  btn.addEventListener('click', () => {
    state.stage = 3;
    state.compStep = 0;
    if (state.hearts == null) state.hearts = Math.max(1, Number(manifest.hearts) || 5);
    saveProgress(manifest.courseKey, manifest.day, state);
    onAdvance();
  });
  box.appendChild(btn);
  return box;
}

function renderComprehension(manifest, state, sessionId, onAdvance) {
  const comp = manifest.comprehension || { steps: [] };
  const steps = comp.steps || [];
  const box = el('div', 'roadmap-card roadmap-comp');
  const maxH = state.hearts != null ? state.hearts : Math.max(1, Number(manifest.hearts) || 5);
  if (state.hearts == null) state.hearts = maxH;

  const top = el('div', 'roadmap-comp-top');
  top.appendChild(el('h2', 'roadmap-h2', 'Comprehension'));
  top.appendChild(renderHearts(state.hearts));
  const prog = el('div', 'roadmap-comp-prog', `Question ${Math.min(state.compStep + 1, steps.length)} / ${steps.length}`);
  top.appendChild(prog);
  box.appendChild(top);

  if (state.hearts <= 0) {
    box.appendChild(el('p', 'roadmap-muted', 'Take a break, review flashcards, then refill hearts to continue.'));
    const a = el('a', 'secondary-btn roadmap-open', 'Open vocabulary review');
    a.href =
      manifest.vocabRefillHref ||
      (manifest.courseKey === 'sp2'
        ? '../Colombia_Vocab_Review_Spanish2.html'
        : '../Colombia_Vocab_Review_Spanish1.html');
    box.appendChild(a);
    const refill = el('button', 'primary-btn roadmap-continue', 'Refill hearts & try again');
    refill.type = 'button';
    refill.addEventListener('click', () => {
      state.hearts = Math.max(1, Number(manifest.hearts) || 5);
      state.compStep = 0;
      saveProgress(manifest.courseKey, manifest.day, state);
      onAdvance();
    });
    box.appendChild(refill);
    return box;
  }

  if (state.compStep >= steps.length) {
    state.stage = 4;
    saveProgress(manifest.courseKey, manifest.day, state);
    onAdvance();
    return box;
  }

  const step = steps[state.compStep];
  const t0 = performance.now();

  if (step.type === 'mcq') {
    const prompt = el('div', 'roadmap-prompt');
    prompt.innerHTML = step.prompt || '';
    box.appendChild(prompt);
    const opts = el('div', 'roadmap-mcq-opts');
    (step.choices || []).forEach((c, idx) => {
      const b = el('button', 'roadmap-opt', c);
      b.type = 'button';
      b.addEventListener('click', async () => {
        const ok = idx === step.correctIndex;
        const rt = Math.round(performance.now() - t0);
        toast(ok ? 'Nice!' : 'Not quite…', ok);
        await tryLogResponse({
          itemId: `roadmap-${manifest.courseKey}-d${String(manifest.day).padStart(2, '0')}-cmp-${state.compStep}`,
          skillCluster: comp.skillCluster || 'general',
          correct: ok,
          responseTimeMs: rt,
          gameMode: 'roadmap_comprehension',
          difficulty: 'roadmap',
          sessionId,
        });
        if (!ok) {
          state.hearts = Math.max(0, (state.hearts || 1) - 1);
        }
        state.compStep += 1;
        saveProgress(manifest.courseKey, manifest.day, state);
        onAdvance();
      });
      opts.appendChild(b);
    });
    box.appendChild(opts);
  } else if (step.type === 'arrange') {
    if (step.prompt) {
      const prompt = el('div', 'roadmap-prompt');
      prompt.innerHTML = step.prompt;
      box.appendChild(prompt);
    }
    const order = step.correctOrder || [];
    const tokens = step.tokens || [];
    const displayIdx = shuffle(order.map((_, i) => i));
    const picked = [];

    const pool = el('div', 'roadmap-token-pool');
    const built = el('div', 'roadmap-token-built');
    const poolMap = new Map();

    function paintBuilt() {
      built.innerHTML = '';
      picked.forEach((ti, si) => {
        const b = el('button', 'roadmap-token roadmap-token-picked', tokens[ti]);
        b.type = 'button';
        b.addEventListener('click', () => {
          picked.splice(si, 1);
          poolMap.get(ti).style.display = '';
          paintBuilt();
        });
        built.appendChild(b);
      });
    }

    displayIdx.forEach((ti) => {
      const b = el('button', 'roadmap-token', tokens[ti]);
      b.type = 'button';
      poolMap.set(ti, b);
      b.addEventListener('click', () => {
        if (b.style.display === 'none') return;
        picked.push(ti);
        b.style.display = 'none';
        paintBuilt();
      });
      pool.appendChild(b);
    });
    box.appendChild(pool);
    box.appendChild(el('div', 'roadmap-muted', 'Your sentence:'));
    box.appendChild(built);

    const check = el('button', 'primary-btn', 'Check');
    check.type = 'button';
    check.addEventListener('click', async () => {
      const target = order.map((i) => tokens[i]).join(' ');
      const got = picked.map((i) => tokens[i]).join(' ');
      const ok = got === target;
      const rt = Math.round(performance.now() - t0);
      toast(ok ? 'Perfect order!' : 'Try again or tap a word to remove it.', ok);
      await tryLogResponse({
        itemId: `roadmap-${manifest.courseKey}-d${String(manifest.day).padStart(2, '0')}-cmp-${state.compStep}`,
        skillCluster: comp.skillCluster || 'general',
        correct: ok,
        responseTimeMs: rt,
        gameMode: 'roadmap_arrange',
        difficulty: 'roadmap',
        sessionId,
      });
      if (!ok) {
        state.hearts = Math.max(0, (state.hearts || 1) - 1);
        saveProgress(manifest.courseKey, manifest.day, state);
        onAdvance();
        return;
      }
      state.compStep += 1;
      saveProgress(manifest.courseKey, manifest.day, state);
      onAdvance();
    });
    box.appendChild(check);
  } else {
    box.appendChild(el('p', null, 'Unknown step type; skipping.'));
    state.compStep += 1;
    saveProgress(manifest.courseKey, manifest.day, state);
    onAdvance();
  }

  return box;
}

function renderCulture(manifest, state, onAdvance) {
  const c = manifest.culture || {};
  const box = el('div', 'roadmap-card');
  box.appendChild(el('h2', 'roadmap-h2', c.title || 'Culture'));
  if (c.description) box.appendChild(el('p', 'roadmap-muted', c.description));
  if (c.href) {
    const a = el('a', 'secondary-btn roadmap-open', 'Open');
    a.href = c.href;
    box.appendChild(a);
  }
  const btn = el('button', 'primary-btn roadmap-continue', 'Finish day');
  btn.type = 'button';
  btn.addEventListener('click', () => {
    state.stage = 5;
    saveProgress(manifest.courseKey, manifest.day, state);
    if (window.ColombiaProgress && manifest.courseKey) {
      try {
        window.ColombiaProgress.recordActivityVisit(manifest.courseKey, `roadmap-day-${manifest.day}`, {
          title: manifest.title || 'Daily roadmap',
          href: window.location.href,
        });
      } catch (e) {
        console.warn('[ADAPTIVE UI]', e);
      }
    }
    onAdvance();
  });
  box.appendChild(btn);
  return box;
}

function renderDone(manifest) {
  const box = el('div', 'roadmap-card roadmap-done');
  box.appendChild(el('div', 'roadmap-done-emoji', '🎉'));
  box.appendChild(el('h2', 'roadmap-h2', 'You finished the path!'));
  box.appendChild(el('p', 'roadmap-muted', 'Come back tomorrow for the next roadmap, or explore the hub.'));
  const a = el('a', 'primary-btn', 'Back to hub');
  a.href = 'index.html';
  box.appendChild(a);
  return box;
}

async function main() {
  const mount = $('#roadmapMount');
  if (!mount) return;

  const { day, course } = parseQuery();
  let manifest;
  try {
    manifest = await loadManifest(course, day);
  } catch (e) {
    mount.innerHTML = `<div class="roadmap-card"><p class="roadmap-muted">${e.message || e}</p><a class="nav-chip" href="index.html">← Hub</a></div>`;
    return;
  }

  manifest.day = manifest.day || day;
  manifest.courseKey = manifest.courseKey || course;

  const titleEl = $('#roadmapHeroTitle');
  const subEl = $('#roadmapHeroSubtitle');
  if (titleEl) titleEl.textContent = manifest.title || `Day ${manifest.day}`;
  if (subEl) subEl.textContent = manifest.subtitle || '';

  let state = loadProgress(manifest.courseKey, manifest.day);
  const sessionId = `roadmap-${manifest.courseKey}-d${String(manifest.day).padStart(2, '0')}-${Date.now()}`;

  function paint() {
    mount.innerHTML = '';
    mount.appendChild(renderStageBar(manifest, state));

    const wrap = el('div', 'roadmap-body');
    if (state.stage === 0) wrap.appendChild(renderObjectives(manifest, state, paint));
    else if (state.stage === 1) wrap.appendChild(renderWarmup(manifest, state, paint));
    else if (state.stage === 2) wrap.appendChild(renderReading(manifest, state, paint));
    else if (state.stage === 3) wrap.appendChild(renderComprehension(manifest, state, sessionId, paint));
    else if (state.stage === 4) wrap.appendChild(renderCulture(manifest, state, paint));
    else wrap.appendChild(renderDone(manifest));

    mount.appendChild(wrap);
  }

  paint();
}

main().catch((e) => {
  console.warn('[ADAPTIVE UI]', e);
  const m = $('#roadmapMount');
  if (m) m.innerHTML = `<p class="roadmap-muted">Could not load roadmap.</p>`;
});
