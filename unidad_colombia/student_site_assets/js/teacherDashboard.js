/**
 * Teacher dashboard — Phase 6. Renders into #dashboard-content.
 */

import { students, bktSkills, sessions, itemResponses } from './db.js';
import { getAtRiskStudents } from './bkt.js';
import { SKILL_CLUSTERS, getCluster, getItemMeta } from './vocabularyMap.js';

const DAY_MS = 86_400_000;

const CLUSTER_LABELS = {
  body_parts: 'Body parts',
  family: 'Family',
  numbers: 'Numbers',
  food_and_drink: 'Food & drink',
  school_vocabulary: 'School',
  grammar_ser_estar: 'Ser / estar',
  verb_conjugation: 'Verbs',
  colombia_geography: 'CO geography',
  colombia_culture: 'CO culture',
  colombia_food: 'CO food',
  greetings_and_phrases: 'Greetings',
  emotions: 'Emotions',
  general: 'General',
  colombia_sp2_vocab: 'Sp2 Colombia vocab',
};

function clusterTitle(id) {
  return CLUSTER_LABELS[id] || id.replace(/_/g, ' ');
}

function heatmapColor(p, hasData) {
  if (!hasData) return '#e0e0e0';
  if (p < 0.4) return '#ef4444';
  if (p < 0.7) return '#f59e0b';
  if (p < 0.95) return '#14b8a6';
  return '#22c55e';
}

async function studentDisplayMap() {
  const rows = await students.toArray();
  const m = new Map();
  for (const r of rows) m.set(r.studentId, r.displayName || r.studentId);
  return m;
}

async function learnerTrackMap() {
  const rows = await students.toArray();
  const m = new Map();
  for (const r of rows) m.set(r.studentId, r.learnerTrack || '—');
  return m;
}

/**
 * @param {HTMLElement} container
 */
export async function renderClassOverview(container) {
  container.innerHTML = '<p class="metz-dash-hint">Loading class overview…</p>';

  const [allStudents, allBkt, names, tracks] = await Promise.all([
    students.toArray(),
    bktSkills.toArray(),
    studentDisplayMap(),
    learnerTrackMap(),
  ]);

  allStudents.sort((a, b) => String(a.displayName || '').localeCompare(String(b.displayName || '')));

  const bktByStudentSkill = new Map();
  for (const r of allBkt) {
    bktByStudentSkill.set(`${r.studentId}::${r.skillCluster}`, r);
  }

  let heatHtml =
    '<h2 class="teacher-subhead">Student × skill mastery</h2><div class="teacher-heatmap-wrap"><table class="teacher-heatmap"><thead><tr><th class="sticky-name">Student</th>';
  for (const cl of SKILL_CLUSTERS) {
    heatHtml += `<th title="${clusterTitle(cl)}">${clusterTitle(cl).slice(0, 8)}</th>`;
  }
  heatHtml += '</tr></thead><tbody>';

  const clusterTotals = Object.fromEntries(SKILL_CLUSTERS.map((c) => [c, { sum: 0, n: 0 }]));

  if (!allStudents.length) {
    heatHtml += `<tr><td class="sticky-name" colspan="${1 + SKILL_CLUSTERS.length}">No student profiles in this browser. Students should use <em>Set up my Spanish profile</em> first, or sync from Supabase on this machine.</td></tr>`;
  }

  for (const st of allStudents) {
    heatHtml += `<tr><td class="sticky-name">${names.get(st.studentId) || st.studentId}</td>`;
    for (const cl of SKILL_CLUSTERS) {
      const row = bktByStudentSkill.get(`${st.studentId}::${cl}`);
      const p = row?.pMastery;
      const has = row != null && (row.totalAttempts ?? 0) > 0;
      const color = heatmapColor(Number(p) || 0, has);
      const tip = `Student: ${names.get(st.studentId)} | Skill: ${clusterTitle(cl)} | Mastery: ${p != null ? Math.round(p * 100) : '—'}% | Attempts: ${row?.totalAttempts ?? 0}`;
      heatHtml += `<td style="background:${color}" title="${tip.replace(/"/g, '&quot;')}">${has && p != null ? Math.round(p * 100) : '—'}</td>`;
      if (has && p != null) {
        clusterTotals[cl].sum += p;
        clusterTotals[cl].n += 1;
      }
    }
    heatHtml += '</tr>';
  }
  heatHtml += '</tbody></table></div>';

  const avgBars = [];
  avgBars.push('<h2 class="teacher-subhead">Class average by skill</h2><svg width="100%" height="' + (SKILL_CLUSTERS.length * 22 + 8) + '" aria-label="Class averages">');
  SKILL_CLUSTERS.forEach((cl, i) => {
    const { sum, n } = clusterTotals[cl];
    const avg = n ? sum / n : 0;
    const w = Math.round(avg * 100);
    avgBars.push(
      `<g transform="translate(0,${i * 22})"><text x="0" y="14" font-size="11" fill="#243443">${clusterTitle(cl)}</text><rect x="140" y="4" width="${w * 2}" height="14" fill="#14b8a6" rx="4"/><text x="${148 + w * 2}" y="14" font-size="11" fill="#627385">${n ? w + '%' : 'n/a'}</text></g>`
    );
  });
  avgBars.push('</svg>');

  const atRisk = await getAtRiskStudents(0.4, 5);
  const riskByStudent = new Map();
  for (const r of atRisk) {
    riskByStudent.set(r.studentId, (riskByStudent.get(r.studentId) || 0) + 1);
  }

  let riskHtml =
    '<h2 class="teacher-subhead">At-risk (mastery &lt; 40%, 5+ attempts)</h2><table class="teacher-dash-table"><thead><tr><th></th><th>Student</th><th>Skill</th><th>Mastery</th><th>Attempts</th><th>Track</th></tr></thead><tbody>';
  for (const r of atRisk) {
    const flag = (riskByStudent.get(r.studentId) || 0) >= 3 ? '🔴 ' : '';
    riskHtml += `<tr><td>${flag}</td><td>${names.get(r.studentId) || r.studentId}</td><td>${clusterTitle(r.skillCluster)}</td><td>${Math.round((r.pMastery ?? 0) * 100)}%</td><td>${r.totalAttempts ?? 0}</td><td>${tracks.get(r.studentId) || '—'}</td></tr>`;
  }
  if (!atRisk.length) riskHtml += '<tr><td colspan="6">No rows match the threshold.</td></tr>';
  riskHtml += '</tbody></table>';

  const now = Date.now();
  const weekAgo = now - 7 * DAY_MS;
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);
  const sessRows = await sessions.where('startTime').aboveOrEqual(weekAgo).toArray();
  const todayIds = new Set(
    sessRows.filter((s) => s.startTime >= startToday.getTime()).map((s) => s.studentId)
  );
  let totalItems = 0;
  let totalCorrect = 0;
  for (const s of sessRows) {
    totalItems += s.itemCount || 0;
    totalCorrect += s.correctCount || 0;
  }
  const weekAcc = totalItems ? Math.round((totalCorrect / totalItems) * 100) : 0;

  const recentHtml = `<h2 class="teacher-subhead">Recent activity (7 days)</h2>
    <ul class="metz-dash-hint" style="list-style:none;padding:0">
      <li><strong>${todayIds.size}</strong> student(s) active today</li>
      <li>Average accuracy this week: <strong>${weekAcc}%</strong> (from session totals)</li>
      <li>Total reviews logged this week: <strong>${totalItems}</strong></li>
    </ul>`;

  container.innerHTML = heatHtml + avgBars.join('') + riskHtml + recentHtml;
}

/**
 * @param {HTMLElement} container
 * @param {string} skillCluster
 */
export async function renderSkillDetail(container, skillCluster) {
  const [allStudents, allBkt] = await Promise.all([students.toArray(), bktSkills.toArray()]);
  const names = await studentDisplayMap();

  const rows = allBkt.filter((r) => r.skillCluster === skillCluster);
  let js = 0;
  let bu = 0;
  let nt = 0;
  let ma = 0;
  for (const r of rows) {
    const p = r.pMastery ?? 0;
    if (p < 0.4) js += 1;
    else if (p < 0.7) bu += 1;
    else if (p < 0.95) nt += 1;
    else ma += 1;
  }
  const totalBand = js + bu + nt + ma || 1;

  const barW = 400;
  const wJs = (js / totalBand) * barW;
  const wBu = (bu / totalBand) * barW;
  const wNt = (nt / totalBand) * barW;
  const wMa = (ma / totalBand) * barW;

  const tableRows = allStudents
    .map((st) => {
      const r = rows.find((x) => x.studentId === st.studentId);
      return {
        studentId: st.studentId,
        displayName: names.get(st.studentId) || st.studentId,
        pMastery: r?.pMastery ?? null,
        totalAttempts: r?.totalAttempts ?? 0,
        learnerTrack: st.learnerTrack || '—',
        lastUpdated: r?.lastUpdated ?? null,
      };
    })
    .filter((x) => x.pMastery != null || x.totalAttempts > 0);

  let sortKey = 'pMastery';
  let sortDir = 1;

  function renderTable() {
    const sorted = [...tableRows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * sortDir;
      return String(av).localeCompare(String(bv)) * sortDir;
    });

    let t =
      '<table class="teacher-dash-table" id="skillStudentTable"><thead><tr>' +
      ['studentId', 'pMastery', 'totalAttempts', 'learnerTrack', 'lastUpdated']
        .map(
          (k) =>
            `<th data-sort="${k}">${k === 'pMastery' ? 'Mastery %' : k === 'lastUpdated' ? 'Updated' : k}</th>`
        )
        .join('') +
      '</tr></thead><tbody>';
    for (const r of sorted) {
      t += `<tr><td>${r.displayName}</td><td>${r.pMastery != null ? Math.round(r.pMastery * 100) : '—'}</td><td>${r.totalAttempts}</td><td>${r.learnerTrack}</td><td>${r.lastUpdated ? new Date(r.lastUpdated).toLocaleDateString() : '—'}</td></tr>`;
    }
    t += '</tbody></table>';
    return t;
  }

  container.innerHTML = `
    <div class="teacher-toolbar">
      <label>Skill: <select id="skillClusterSelect"></select></label>
    </div>
    <h2 class="teacher-subhead">Distribution — ${clusterTitle(skillCluster)}</h2>
    <svg width="${barW + 40}" height="36" aria-label="Mastery bands">
      <rect x="0" y="8" width="${wJs}" height="18" fill="#ef4444"/>
      <rect x="${wJs}" y="8" width="${wBu}" height="18" fill="#f59e0b"/>
      <rect x="${wJs + wBu}" y="8" width="${wNt}" height="18" fill="#14b8a6"/>
      <rect x="${wJs + wBu + wNt}" y="8" width="${wMa}" height="18" fill="#22c55e"/>
    </svg>
    <p class="metz-dash-hint">Just Starting: ${js} · Building: ${bu} · Nearly There: ${nt} · Mastered: ${ma}</p>
    <div id="skillTableMount"></div>
  `;

  const mount = container.querySelector('#skillTableMount');
  function paintTable() {
    if (mount) mount.innerHTML = renderTable();
  }
  paintTable();

  const sel = container.querySelector('#skillClusterSelect');
  for (const cl of SKILL_CLUSTERS) {
    const o = document.createElement('option');
    o.value = cl;
    o.textContent = clusterTitle(cl);
    if (cl === skillCluster) o.selected = true;
    sel.appendChild(o);
  }
  sel.addEventListener('change', () => {
    renderSkillDetail(container, sel.value).catch((e) => console.warn('[ADAPTIVE UI]', e));
  });

  if (container._metzSkillSortAbort) container._metzSkillSortAbort.abort();
  const ac = new AbortController();
  container._metzSkillSortAbort = ac;
  container.addEventListener(
    'click',
    (e) => {
      const th = e.target.closest?.('#skillStudentTable th[data-sort]');
      if (!th || !container.contains(th)) return;
      const k = th.getAttribute('data-sort');
      if (sortKey === k) sortDir *= -1;
      else {
        sortKey = k;
        sortDir = 1;
      }
      paintTable();
    },
    { signal: ac.signal }
  );
}

/**
 * @param {object[]} data
 * @param {string} filename
 */
export function exportToCSV(data, filename) {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const esc = (v) => {
    const s = v == null ? '' : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [keys.join(','), ...data.map((row) => keys.map((k) => esc(row[k])).join(','))];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * @param {HTMLElement} container
 */
export async function renderItemDiagnostics(container) {
  const responses = await itemResponses.toArray();
  const bktAll = await bktSkills.toArray();
  const bktLookup = new Map();
  for (const r of bktAll) {
    bktLookup.set(`${r.studentId}::${r.skillCluster}`, r);
  }

  const byItem = new Map();
  for (const r of responses) {
    const skill = r.skillCluster || getCluster(r.itemId);
    if (!byItem.has(r.itemId)) {
      byItem.set(r.itemId, { itemId: r.itemId, skillCluster: skill, times: [], corrects: [], rts: [] });
    }
    const agg = byItem.get(r.itemId);
    agg.times.push(1);
    agg.corrects.push(r.correct ? 1 : 0);
    if (r.responseTimeMs != null) agg.rts.push(Number(r.responseTimeMs));
  }

  const rows = [];
  for (const [, agg] of byItem) {
    const n = agg.corrects.length;
    const correctCount = agg.corrects.reduce((a, b) => a + b, 0);
    const accuracy = n ? correctCount / n : 0;
    const avgRt = agg.rts.length ? agg.rts.reduce((a, b) => a + b, 0) / agg.rts.length : 0;

    let guessNum = 0;
    let guessDen = 0;
    for (const r of responses) {
      if (r.itemId !== agg.itemId) continue;
      const sk = r.skillCluster || getCluster(r.itemId);
      const st = bktLookup.get(`${r.studentId}::${sk}`);
      const pm = st?.pMastery ?? 0.5;
      if (pm < 0.3) {
        guessDen += 1;
        if (r.correct) guessNum += 1;
      }
    }
    const estimatedGuessRate = guessDen ? guessNum / guessDen : 0;

    let flags = '';
    if (accuracy < 0.3 && n >= 3) flags += '🔴 ';
    if (accuracy > 0.95 && avgRt > 0 && avgRt < 800 && n >= 5) flags += '🟡 ';
    if (estimatedGuessRate > 0.4 && guessDen >= 3) flags += '🟠 ';

    const meta = getItemMeta(agg.itemId);
    rows.push({
      flags,
      itemId: agg.itemId,
      spanish: meta?.es || '',
      skillCluster: agg.skillCluster,
      totalAttempts: n,
      correctCount,
      accuracyPct: Math.round(accuracy * 100),
      avgResponseTimeMs: Math.round(avgRt),
      guessRatePct: Math.round(estimatedGuessRate * 100),
    });
  }

  rows.sort((a, b) => a.accuracyPct - b.accuracyPct);

  const today = new Date().toISOString().slice(0, 10);
  let html =
    '<h2 class="teacher-subhead">Item diagnostics</h2><p class="metz-dash-hint">Aggregated from local IndexedDB on this device.</p>';
  html +=
    '<table class="teacher-dash-table" id="itemDiagTable"><thead><tr><th></th><th>Item</th><th>Spanish</th><th>Skill</th><th>N</th><th>Acc %</th><th>Avg ms</th><th>Guess %</th></tr></thead><tbody>';
  for (const r of rows) {
    const idShort = r.itemId.length > 22 ? `${r.itemId.slice(0, 20)}…` : r.itemId;
    html += `<tr><td>${r.flags}</td><td title="${r.itemId}">${idShort}</td><td>${r.spanish}</td><td>${clusterTitle(r.skillCluster)}</td><td>${r.totalAttempts}</td><td>${r.accuracyPct}</td><td>${r.avgResponseTimeMs}</td><td>${r.guessRatePct}</td></tr>`;
  }
  html += '</tbody></table>';
  html += `<p><button type="button" class="teacher-csv-btn" id="exportItemCsv">Export to CSV</button></p>`;
  container.innerHTML = html;

  container.querySelector('#exportItemCsv')?.addEventListener('click', () => {
    exportToCSV(rows, `metz-item-diagnostics-${today}.csv`);
  });
}

function setActiveTab(name) {
  document.querySelectorAll('.teacher-tab').forEach((b) => {
    b.classList.toggle('active', b.dataset.tab === name);
  });
}

async function showTab(name) {
  const content = document.getElementById('dashboard-content');
  if (!content) return;
  if (content._metzSkillSortAbort) {
    content._metzSkillSortAbort.abort();
    delete content._metzSkillSortAbort;
  }
  setActiveTab(name);
  try {
    if (name === 'overview') await renderClassOverview(content);
    else if (name === 'skill') await renderSkillDetail(content, SKILL_CLUSTERS[0] || 'family');
    else if (name === 'items') await renderItemDiagnostics(content);
  } catch (e) {
    console.warn('[ADAPTIVE UI]', e?.message || e);
    content.innerHTML = `<p class="metz-dash-hint">Could not load tab: ${e?.message || e}</p>`;
  }
}

function wireTabs() {
  document.querySelectorAll('.teacher-tab').forEach((btn) => {
    btn.addEventListener('click', () => showTab(btn.dataset.tab));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    wireTabs();
    showTab('overview');
  });
} else {
  wireTabs();
  showTab('overview');
}
