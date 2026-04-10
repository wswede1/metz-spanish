# Supabase Edge Functions (optional)

This repo does **not** require Edge Functions for the teacher activity dashboard. That flow uses:

- Table `teacher_accounts` (allowlist)
- Row Level Security on `activity_completions` so teachers can `SELECT` all rows
- Static page [`unidad_colombia/student_site_assets/teacher-dashboard.html`](../unidad_colombia/student_site_assets/teacher-dashboard.html)

Use [Supabase Edge Functions](https://supabase.com/docs/guides/functions) only if you need server-side logic (e.g. aggregations with `service_role`, webhooks, or hiding complex queries). Deploy with the Supabase CLI; never commit `service_role` keys.
