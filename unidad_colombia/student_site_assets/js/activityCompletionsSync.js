/**
 * Inserts activity_completions when signed in. Standalone Supabase client (no Dexie import)
 * so activity pages can dynamic-import this module without loading IndexedDB.
 */

import { getResolvedSupabaseUrl, getResolvedSupabaseKey } from './metzSupabasePublicConfig.js';

const SUPABASE_ESM = 'https://esm.sh/@supabase/supabase-js@2';

let clientPromise = null;

export function resetLiteSupabaseClient() {
  clientPromise = null;
}

async function getLiteClient() {
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

/**
 * @param {string} courseKey
 * @param {string} activityId
 * @param {{ title?: string, href?: string }} [meta]
 */
export async function recordActivityCompletionIfSignedIn(courseKey, activityId, meta) {
  if (!courseKey || !activityId) return;
  const client = await getLiteClient();
  if (!client) return;
  const {
    data: { session },
  } = await client.auth.getSession();
  const uid = session?.user?.id;
  if (!uid) return;
  const payload =
    meta && typeof meta === 'object'
      ? { title: meta.title ?? null, href: meta.href ?? null }
      : null;
  const { error } = await client.from('activity_completions').insert({
    user_id: uid,
    course_key: String(courseKey),
    activity_id: String(activityId),
    payload,
  });
  if (error) console.warn('[ACTIVITY COMPLETIONS]', error.message);
}
