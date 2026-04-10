# ¡Conoce a Colombia! — Student Site

A browser-based Spanish learning site for middle and high school students. Works on Chromebooks, tablets, and phones—no app install. With **cloud enabled**, students **sign in with Google** on the hub (Supabase); local practice data still lives in the browser.

## Student URLs

| Class | Link |
|-------|------|
| Spanish 1 | `https://wswede1.github.io/metz-spanish/span_1/unidad_colombia/student_site/` |
| Spanish 2 | `https://wswede1.github.io/metz-spanish/span_2/unidad_colombia/student_site/` |

Optional **profile setup** (IndexedDB adaptive profile):  
`https://wswede1.github.io/metz-spanish/unidad_colombia/student_site_assets/student-profile-setup.html`

**Intro week (no cloud / no login):** ship [unidad_colombia/student_site_assets/js/metzSupabasePublicConfig.js](unidad_colombia/student_site_assets/js/metzSupabasePublicConfig.js) with **`DEFAULT_SUPABASE_ANON_KEY`** empty and **`DEFAULT_SUPABASE_URL`** still a placeholder (`YOUR_PROJECT_REF`), and **`SCHOOL_EMAIL_DOMAIN`** empty. Students see a short “cloud not configured” note on the hub; activities and local progress still work. Test in **Incognito** so old Sync-settings `localStorage` does not re-enable a client. When you are ready for Supabase, set real URL + anon key and your district domain in that file and redeploy.

**Typical first visit (cloud on):** open the hub → **Sign in with Google** with a **district email** (`SCHOOL_EMAIL_DOMAIN` in config, e.g. `mcpsva.org`) → optional auto profile from Google → use activities as assigned. Optional: [student profile setup](unidad_colombia/student_site_assets/student-profile-setup.html) for learner track or display name.

## Teacher launch checklist (Supabase)

Do this **before** students use the hub with cloud backup:

1. **Authentication → Providers:** enable **Google** (OAuth client ID/secret from Google Cloud Console).
2. **Authentication → URL configuration:** add **Redirect URLs** for every place the hub is opened, e.g.  
   `https://wswede1.github.io/metz-spanish/span_1/unidad_colombia/student_site/index.html`  
   and the Spanish 2 hub URL, plus `http://localhost:…` for local testing. Set **Site URL** to your Pages root or primary hub origin.
3. **SQL:** run [unidad_colombia/student_site_assets/supabase-schema.sql](unidad_colombia/student_site_assets/supabase-schema.sql) (or the migration script if upgrading an old project).
4. **Ship publishable credentials:** edit [unidad_colombia/student_site_assets/js/metzSupabasePublicConfig.js](unidad_colombia/student_site_assets/js/metzSupabasePublicConfig.js) — set your real project URL and **anon/publishable** key (never the `service_role` key). Set **`SCHOOL_EMAIL_DOMAIN`** to your district email domain without `@` (e.g. `mcpsva.org`). Committing the anon key is normal for static sites; row-level security protects data.
5. **District emails only (strongly recommended):** the hub adds Google’s `hd` hint and **signs out** anyone whose email is not `@` your `SCHOOL_EMAIL_DOMAIN`. For enforcement that students cannot bypass, add a **Supabase Auth Hook** (see [Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks)) to reject sign-in when the email domain does not match.
6. **Verify:** a personal Gmail is rejected on the hub after OAuth; a `@mcpsva.org` (or your domain) account works. Two district test accounts cannot read each other’s rows; one signed-in visit to an activity inserts into `activity_completions` if you use that for grades.

**Maintainer notes:** [Repo cleanup backlog and Supabase follow-ups](docs/REPO_CLEANUP_AND_SUPABASE_TODO.md) (deferred housekeeping, teacher visibility of completions, cloud-backed hub progress).

## Features

- Practice activities, readings, drills, and listening activities
- Hover any underlined word in a reading for an English translation
- Click any word to hear it pronounced in Spanish
- 🔊 Listen button reads the full passage aloud
- Daily warm-ups and cultural exploration (Las 3 P's)
