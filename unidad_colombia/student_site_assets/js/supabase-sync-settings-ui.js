import {
  getSavedSupabaseUrl,
  getSavedSupabaseKey,
  saveSupabaseSettings,
  getLastSyncTime,
  testSupabaseConnection,
  syncAllLocalStudentsToSupabase,
  resetSupabaseClient,
} from './supabaseSync.js';

const urlInput = document.getElementById('sbUrl');
const keyInput = document.getElementById('sbKey');
const statusEl = document.getElementById('sbStatus');
const lastSyncEl = document.getElementById('sbLastSync');

function fmt(ts) {
  if (ts == null || Number.isNaN(ts)) return '—';
  return new Date(ts).toLocaleString();
}

function renderLastSync() {
  lastSyncEl.textContent = fmt(getLastSyncTime());
}

urlInput.value = getSavedSupabaseUrl();
keyInput.value = getSavedSupabaseKey();
renderLastSync();

document.getElementById('sbSave').addEventListener('click', () => {
  saveSupabaseSettings(urlInput.value, keyInput.value);
  statusEl.textContent = 'Saved locally (browser storage).';
  statusEl.style.color = '#333';
  renderLastSync();
});

document.getElementById('sbTest').addEventListener('click', async () => {
  saveSupabaseSettings(urlInput.value, keyInput.value);
  resetSupabaseClient();
  statusEl.textContent = 'Testing…';
  const r = await testSupabaseConnection();
  statusEl.textContent = r.ok ? 'Connected.' : `Failed: ${r.message}`;
  statusEl.style.color = r.ok ? '#166534' : '#b91c1c';
});

document.getElementById('sbSyncAll').addEventListener('click', async () => {
  saveSupabaseSettings(urlInput.value, keyInput.value);
  resetSupabaseClient();
  statusEl.textContent = 'Syncing (active profile; sign in with Google if asked)…';
  try {
    await syncAllLocalStudentsToSupabase();
    statusEl.textContent = 'Sync finished.';
    statusEl.style.color = '#166534';
    renderLastSync();
  } catch (e) {
    statusEl.textContent = `Sync error: ${e?.message || e}`;
    statusEl.style.color = '#b91c1c';
  }
});
