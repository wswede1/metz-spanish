/**
 * Teacher dashboard: read activity_completions when signed in as an allowlisted teacher (teacher_accounts).
 * Uses the publishable key only — never service_role.
 * Standalone Supabase client (does not import supabaseSync / Dexie).
 */

import {
  getResolvedSupabaseUrl,
  getResolvedSupabaseKey,
  getConfiguredSchoolDomain,
  isAllowedSchoolEmail,
} from './metzSupabasePublicConfig.js';

const MAX_ROWS = 800;
const SUPABASE_ESM = 'https://esm.sh/@supabase/supabase-js@2';

let clientPromise = null;
let authListenerAttached = false;

async function getTeacherClient() {
  const url = getResolvedSupabaseUrl();
  const key = getResolvedSupabaseKey();
  if (!url || !key) return null;
  if (!clientPromise) {
    const mod = await import(SUPABASE_ESM);
    clientPromise = mod.createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return clientPromise;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function syncSettingsHref() {
  try {
    return new URL('../supabase-sync-settings.html', import.meta.url).href;
  } catch {
    return 'supabase-sync-settings.html';
  }
}

async function ensureDomainOrSignOut(client) {
  const {
    data: { session },
  } = await client.auth.getSession();
  if (!session?.user?.email) return true;
  if (!isAllowedSchoolEmail(session.user.email)) {
    await client.auth.signOut();
    return false;
  }
  return true;
}

async function isTeacher(client, uid) {
  const { data, error } = await client
    .from('teacher_accounts')
    .select('auth_user_id')
    .eq('auth_user_id', uid)
    .maybeSingle();
  if (error) {
    console.warn('[TEACHER DASH]', error.message);
    return false;
  }
  return !!data?.auth_user_id;
}

function rowsToCsv(rows) {
  const cols = ['occurred_at', 'course_key', 'activity_id', 'user_id', 'payload'];
  const lines = [cols.join(',')];
  for (const r of rows) {
    const vals = cols.map((c) => {
      let v = r[c];
      if (v == null) return '';
      if (typeof v === 'object') v = JSON.stringify(v);
      const s = String(v);
      if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    });
    lines.push(vals.join(','));
  }
  return lines.join('\n');
}

async function loadAllCompletions(client) {
  const { data, error } = await client
    .from('activity_completions')
    .select('*')
    .order('occurred_at', { ascending: false })
    .limit(MAX_ROWS);
  if (error) throw new Error(error.message);
  return data || [];
}

function summarizeByCourse(rows) {
  const m = new Map();
  for (const r of rows) {
    const k = r.course_key || '';
    m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

export async function mountTeacherDashboard(root) {
  if (!root) return;

  const settingsUrl = syncSettingsHref();
  const schoolDomain = getConfiguredSchoolDomain();
  let courseFilter = '';
  let allRows = [];

  const render = async (skipFetch = false) => {
    const client = await getTeacherClient();
    if (!client) {
      root.innerHTML = `<div class="panel warn">
        <p>No Supabase URL/key in this browser. Open <a href="${settingsUrl}">Supabase sync settings</a>, save URL + publishable key, then return here.</p>
      </div>`;
      return;
    }

    if (!authListenerAttached) {
      authListenerAttached = true;
      client.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') render();
      });
    }

    const {
      data: { session },
    } = await client.auth.getSession();

    if (!session?.user) {
      root.innerHTML = `<div class="panel">
        <p><strong>Teacher dashboard</strong> — view student activity completions (allowlisted teachers only).</p>
        <p class="muted">${schoolDomain ? `Use your school Google account (@${escapeHtml(schoolDomain)}).` : 'Use your school Google account.'}</p>
        <button type="button" id="tdSignIn" class="btn primary">Sign in with Google</button>
        <p class="meta"><a href="${settingsUrl}">Sync settings</a> · <a href="../../span_1/unidad_colombia/student_site/index.html">Student hub</a></p>
      </div>`;
      root.querySelector('#tdSignIn')?.addEventListener('click', async () => {
        const redirectTo = window.location.href.split('#')[0];
        const queryParams = { prompt: 'select_account' };
        if (schoolDomain) queryParams.hd = schoolDomain;
        const { error } = await client.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo, queryParams },
        });
        if (error) console.warn('[TEACHER DASH]', error.message);
      });
      return;
    }

    if (!(await ensureDomainOrSignOut(client))) {
      root.innerHTML = `<div class="panel warn"><p>Sign in with your school Google account${schoolDomain ? ` (@${escapeHtml(schoolDomain)})` : ''}.</p>
        <button type="button" id="tdRetry" class="btn">Try again</button></div>`;
      root.querySelector('#tdRetry')?.addEventListener('click', () => render());
      return;
    }

    const uid = session.user.id;
    const teacherOk = await isTeacher(client, uid);
    if (!teacherOk) {
      root.innerHTML = `<div class="panel warn">
        <p><strong>Not allowlisted as a teacher.</strong> Account: ${escapeHtml(session.user.email || '')}</p>
        <p class="meta">After this account appears in <code>auth.users</code>, run in Supabase SQL Editor (as postgres):</p>
        <pre class="sqlbox">INSERT INTO public.teacher_accounts (auth_user_id, email, note)
SELECT id, email, 'Teacher'
FROM auth.users
WHERE email = 'paste-your-school-email@district.org';</pre>
        <p class="meta">Reload this page. <a href="${settingsUrl}">Sync settings</a></p>
        <button type="button" id="tdSignOut" class="btn secondary">Sign out</button>
      </div>`;
      root.querySelector('#tdSignOut')?.addEventListener('click', async () => {
        await client.auth.signOut();
        render();
      });
      return;
    }

    if (!skipFetch) {
      root.innerHTML = `<div class="panel"><p class="muted">Loading…</p></div>`;
      try {
        allRows = await loadAllCompletions(client);
      } catch (e) {
        root.innerHTML = `<div class="panel warn"><p>${escapeHtml(e.message || String(e))}</p></div>`;
        return;
      }
    }

    const rows = courseFilter ? allRows.filter((r) => r.course_key === courseFilter) : allRows;
    const courses = [...new Set(allRows.map((r) => r.course_key).filter(Boolean))].sort();
    const summary = summarizeByCourse(rows);
    const summaryHtml = summary
      .map(([k, n]) => `<span class="pill">${escapeHtml(k || '(empty)')}: <strong>${n}</strong></span>`)
      .join(' ');

    const tableRows = rows
      .map(
        (r) =>
          `<tr>
            <td class="nowrap">${escapeHtml(String(r.occurred_at || '').slice(0, 19))}</td>
            <td>${escapeHtml(String(r.course_key || ''))}</td>
            <td>${escapeHtml(String(r.activity_id || ''))}</td>
            <td class="mono">${escapeHtml(String(r.user_id || ''))}</td>
            <td class="payload"><code>${escapeHtml(r.payload ? JSON.stringify(r.payload) : '')}</code></td>
          </tr>`
      )
      .join('');

    root.innerHTML = `<div class="panel">
        <div class="toolbar">
          <span>Signed in as <strong>${escapeHtml(session.user.email || '')}</strong></span>
          <button type="button" id="tdSignOut2" class="btn secondary">Sign out</button>
        </div>
        <p class="muted">Up to ${MAX_ROWS} most recent rows loaded; course filter is client-side.</p>
        <div class="filters">
          <label>Course <select id="tdCourse">
            <option value="">(all)</option>
            ${courses.map((c) => `<option value="${escapeHtml(c)}" ${c === courseFilter ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
          </select></label>
          <button type="button" id="tdRefresh" class="btn">Reload data</button>
          <button type="button" id="tdCsv" class="btn">Download CSV (visible rows)</button>
        </div>
        <div class="summary">${summaryHtml}</div>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>When (UTC)</th><th>Course</th><th>Activity</th><th>User</th><th>Payload</th></tr></thead>
          <tbody>${tableRows || '<tr><td colspan="5">No rows yet.</td></tr>'}</tbody>
        </table></div>
      </div>`;

    root.querySelector('#tdSignOut2')?.addEventListener('click', async () => {
      await client.auth.signOut();
      render();
    });
    root.querySelector('#tdRefresh')?.addEventListener('click', async () => {
      courseFilter = root.querySelector('#tdCourse')?.value || '';
      root.innerHTML = `<div class="panel"><p class="muted">Loading…</p></div>`;
      try {
        allRows = await loadAllCompletions(client);
      } catch (e) {
        root.innerHTML = `<div class="panel warn"><p>${escapeHtml(e.message || String(e))}</p></div>`;
        return;
      }
      render(true);
    });
    root.querySelector('#tdCsv')?.addEventListener('click', () => {
      const visible = courseFilter ? allRows.filter((r) => r.course_key === courseFilter) : allRows;
      const blob = new Blob([rowsToCsv(visible)], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `activity_completions_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
    root.querySelector('#tdCourse')?.addEventListener('change', (e) => {
      courseFilter = e.target.value;
      render(true);
    });
  };

  await render();
}

const el = document.getElementById('tdRoot');
if (el) mountTeacherDashboard(el);
