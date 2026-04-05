/**
 * Shipped Supabase publishable credentials so students do not visit Sync settings first.
 * Replace placeholders before deploy. Never put service_role here.
 * localStorage (metz-supabase-url / metz-supabase-publishable-key) overrides these when set.
 *
 * Intro week (no cloud / no login): keep DEFAULT_SUPABASE_ANON_KEY empty and DEFAULT_SUPABASE_URL as
 * placeholder (YOUR_PROJECT_REF) so getSupabaseClient() is null unless localStorage is set.
 * SCHOOL_EMAIL_DOMAIN empty = no district hint on OAuth (when you enable cloud, set e.g. mcpsva.org).
 */

export const DEFAULT_SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = '';

/** @type {string} District email domain without @ (e.g. mcpsva.org). Empty string = off / intro deploy. */
export const SCHOOL_EMAIL_DOMAIN = '';

const LS_URL = 'metz-supabase-url';
const LS_KEY = 'metz-supabase-publishable-key';

function sanitizedDefaultUrl() {
  const u = String(DEFAULT_SUPABASE_URL || '').trim();
  if (!u || /YOUR_PROJECT_REF|placeholder/i.test(u)) return '';
  return u;
}

function sanitizedDefaultKey() {
  return String(DEFAULT_SUPABASE_ANON_KEY || '').trim();
}

/** @returns {string} Lowercase domain or '' if not configured / placeholder */
export function getConfiguredSchoolDomain() {
  const d = String(SCHOOL_EMAIL_DOMAIN || '')
    .trim()
    .toLowerCase()
    .replace(/^@+/, '');
  if (!d || /your_district|example\.com|placeholder/i.test(d)) return '';
  return d;
}

/**
 * @param {string | null | undefined} email
 * @returns {boolean} true if enforcement is off, or email ends with @domain
 */
export function isAllowedSchoolEmail(email) {
  const domain = getConfiguredSchoolDomain();
  if (!domain) return true;
  const e = String(email || '').trim().toLowerCase();
  if (!e.includes('@')) return false;
  return e.endsWith(`@${domain}`);
}

/** @returns {string} */
export function getResolvedSupabaseUrl() {
  try {
    const ls = localStorage.getItem(LS_URL)?.trim();
    if (ls) return ls;
  } catch {
    /* ignore */
  }
  return sanitizedDefaultUrl();
}

/** @returns {string} */
export function getResolvedSupabaseKey() {
  try {
    const ls = localStorage.getItem(LS_KEY)?.trim();
    if (ls) return ls;
  } catch {
    /* ignore */
  }
  return sanitizedDefaultKey();
}
