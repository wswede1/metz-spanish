/**
 * First-time Google sign-in: ensure Dexie profile + metz-active-student-id without the profile-setup page.
 * Uses learner track L2 to avoid the diagnostic modal (students can still use profile setup to refine later).
 */

import { getOrCreateStudent } from './studentManager.js';
import { students } from './db.js';

function displayNameFromUser(user) {
  if (!user) return '';
  const meta = user.user_metadata || {};
  const n = meta.full_name || meta.name || meta.display_name;
  if (n && String(n).trim()) return String(n).trim();
  const email = user.email;
  if (email && typeof email === 'string') {
    const local = email.split('@')[0];
    const spaced = local.replace(/[.+_]/g, ' ').trim();
    return spaced || email;
  }
  return '';
}

/**
 * @param {import('@supabase/supabase-js').User} user
 * @returns {Promise<boolean>} true if the page should reload (new or repaired active profile)
 */
export async function ensureDexieProfileFromGoogleUser(user) {
  const name = displayNameFromUser(user);
  if (!name) return false;

  let activeSid = null;
  try {
    activeSid = localStorage.getItem('metz-active-student-id');
  } catch {
    /* ignore */
  }

  let hadValidActive = false;
  if (activeSid) {
    const row = await students.where('studentId').equals(activeSid).first();
    if (row) hadValidActive = true;
  }
  if (hadValidActive) return false;

  const row = await getOrCreateStudent(name, 'L2');
  try {
    localStorage.setItem('metz-active-student-id', row.studentId);
  } catch {
    /* ignore */
  }
  return true;
}
