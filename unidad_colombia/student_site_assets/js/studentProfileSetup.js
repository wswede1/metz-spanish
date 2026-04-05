/**
 * One-time student profile creation for adaptive progress (IndexedDB).
 */

import { getOrCreateStudent } from './studentManager.js';

const form = document.getElementById('metzProfileForm');
const nameInput = document.getElementById('metzDisplayName');
const statusEl = document.getElementById('metzProfileStatus');
const resultEl = document.getElementById('metzProfileResult');

function setStatus(msg, ok) {
  statusEl.textContent = msg;
  statusEl.style.color = ok ? '#166534' : '#b91c1c';
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultEl.hidden = true;
  const name = nameInput?.value?.trim();
  if (!name) {
    setStatus('Please type your name.', false);
    return;
  }

  const trackRadio = form.querySelector('input[name="learnerTrack"]:checked');
  const track = trackRadio?.value || 'auto';

  setStatus('Saving…', true);
  try {
    const row = await getOrCreateStudent(name, track);
    localStorage.setItem('metz-active-student-id', row.studentId);
    setStatus('You are all set!', true);
    resultEl.hidden = false;
    resultEl.innerHTML = `
      <p><strong>Profile saved on this device.</strong></p>
      <p class="metz-setup-meta">Your practice and vocabulary progress will be tied to this browser. If you share a Chromebook, use the same name each time you use the same device.</p>
      <p class="metz-setup-meta"><strong>For your teacher only:</strong> internal ID <code>${row.studentId}</code> (you do not need to memorize this).</p>
      <p><a href="../../span_1/unidad_colombia/student_site/index.html">Open Spanish 1 hub</a>
      · <a href="../../span_2/unidad_colombia/student_site/index.html">Open Spanish 2 hub</a></p>
    `;
  } catch (err) {
    console.warn('[ADAPTIVE UI]', err?.message || err);
    setStatus(err?.message || 'Something went wrong. Try again or ask your teacher.', false);
  }
});
