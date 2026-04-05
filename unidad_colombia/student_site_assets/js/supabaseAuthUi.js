/**
 * Compact Google sign-in bar for student hubs. Uses shipped Supabase defaults + localStorage override.
 * Optional district email domain: Google hd hint + post-login validation.
 */

import {
  getSupabaseClient,
  resetSupabaseClient,
  linkActiveStudentToSupabaseAuth,
} from './supabaseSync.js';
import { ensureDexieProfileFromGoogleUser } from './metzOAuthProfileBootstrap.js';
import {
  getConfiguredSchoolDomain,
  isAllowedSchoolEmail,
} from './metzSupabasePublicConfig.js';

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
    return '../../../unidad_colombia/student_site_assets/supabase-sync-settings.html';
  }
}

let authBootstrapDone = false;
/** Shown on the sign-in bar after a wrong-domain Google account is rejected */
let authDomainRejectionMessage = '';

/** @param {object | null | undefined} client */
async function rejectSessionWrongDomain(client) {
  const domain = getConfiguredSchoolDomain();
  authDomainRejectionMessage = domain
    ? `You must use your school Google account (email ending in @${domain}).`
    : '';
  authBootstrapDone = false;
  if (client) {
    try {
      await client.auth.signOut();
    } catch {
      /* ignore */
    }
  }
  resetSupabaseClient();
}

/** @param {object | null | undefined} client */
async function runAuthBootstrap(client) {
  if (!client) return;
  const {
    data: { session },
  } = await client.auth.getSession();
  if (!session?.user) return;
  if (!isAllowedSchoolEmail(session.user.email)) {
    await rejectSessionWrongDomain(client);
    return;
  }
  if (authBootstrapDone) return;
  authBootstrapDone = true;
  try {
    const reload = await ensureDexieProfileFromGoogleUser(session.user);
    if (reload) {
      authBootstrapDone = false;
      window.location.reload();
      return;
    }
    const r = await linkActiveStudentToSupabaseAuth();
    if (!r.ok && r.message) {
      console.warn('[SUPABASE AUTH] link profile:', r.message);
    }
  } catch (e) {
    authBootstrapDone = false;
    console.warn('[SUPABASE AUTH]', e?.message || e);
  }
}

/**
 * @param {HTMLElement | null} mountEl
 */
export async function mountSupabaseAuthBar(mountEl) {
  if (!mountEl) return;

  const settingsUrl = syncSettingsHref();
  const schoolDomain = getConfiguredSchoolDomain();
  const domainHint = schoolDomain
    ? `Use your school Google account (@${escapeHtml(schoolDomain)}).`
    : 'First time: use your school Google account.';

  const render = (html) => {
    mountEl.innerHTML = html;
    const signIn = mountEl.querySelector('[data-metz-google-signin]');
    const signOut = mountEl.querySelector('[data-metz-signout]');
    signIn?.addEventListener('click', async () => {
      authDomainRejectionMessage = '';
      const client = await getSupabaseClient();
      if (!client) {
        window.location.href = settingsUrl;
        return;
      }
      const redirectTo =
        typeof window !== 'undefined' && window.location?.href
          ? window.location.href.split('#')[0]
          : undefined;
      const queryParams = { prompt: 'select_account' };
      if (schoolDomain) {
        queryParams.hd = schoolDomain;
      }
      const { error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo, queryParams },
      });
      if (error) console.warn('[SUPABASE AUTH]', error.message);
    });
    signOut?.addEventListener('click', async () => {
      authBootstrapDone = false;
      authDomainRejectionMessage = '';
      const client = await getSupabaseClient();
      if (client) await client.auth.signOut();
      resetSupabaseClient();
      mount();
    });
  };

  const mount = async () => {
    const client = await getSupabaseClient();
    if (!client) {
      render(
        `<div class="metz-auth-bar metz-auth-muted">
          Cloud backup is not configured yet — your teacher can add the project URL and publishable key in
          <a href="${settingsUrl}">Sync settings</a>, or ship them in <code>metzSupabasePublicConfig.js</code>.
        </div>`
      );
      return;
    }

    await runAuthBootstrap(client);

    const {
      data: { session },
    } = await client.auth.getSession();
    const email = session?.user?.email || session?.user?.user_metadata?.full_name || '';

    if (session?.user) {
      render(
        `<div class="metz-auth-bar metz-auth-signedin">
          <span class="metz-auth-label">Signed in</span>
          <span class="metz-auth-email" title="${escapeHtml(email)}">${escapeHtml(email || 'Google account')}</span>
          <button type="button" class="metz-auth-btn metz-auth-btn-secondary" data-metz-signout>Sign out</button>
        </div>`
      );
      return;
    }

    const warn =
      authDomainRejectionMessage &&
      `<p class="metz-auth-warning" role="alert">${escapeHtml(authDomainRejectionMessage)}</p>`;
    render(
      `<div class="metz-auth-bar">
        ${warn || ''}
        <span class="metz-auth-label">Save progress to the cloud</span>
        <button type="button" class="metz-auth-btn metz-auth-btn-primary" data-metz-google-signin>Sign in with Google</button>
        <span class="metz-auth-hint metz-auth-muted">${domainHint}</span>
      </div>`
    );
  };

  await mount();

  const client = await getSupabaseClient();
  if (!client) return;

  const {
    data: { subscription },
  } = client.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_OUT') {
      authBootstrapDone = false;
    }
    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
      await runAuthBootstrap(client);
    }
    if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'INITIAL_SESSION') {
      await mount();
    }
  });

  if (subscription && typeof window !== 'undefined') {
    window.addEventListener(
      'pagehide',
      () => {
        try {
          subscription.unsubscribe();
        } catch {
          /* ignore */
        }
      },
      { once: true }
    );
  }
}

const rootId = 'metz-supabase-auth-root';

function boot() {
  const root = document.getElementById(rootId);
  if (root) mountSupabaseAuthBar(root);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => boot());
} else {
  boot();
}
