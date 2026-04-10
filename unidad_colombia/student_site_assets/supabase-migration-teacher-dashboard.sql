-- Metz Spanish — migration: teacher_accounts + activity_completions policies
-- Run once in Supabase SQL Editor on a project that already ran supabase-schema.sql (older variant).
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS where applicable.

-- 1) Table: allowlisted teachers (insert rows via Dashboard SQL as postgres, or API with service_role only)
CREATE TABLE IF NOT EXISTS public.teacher_accounts (
  auth_user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS teacher_accounts_email_lower_idx ON public.teacher_accounts (lower(email));

ALTER TABLE public.teacher_accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS teacher_accounts_self_read ON public.teacher_accounts;
CREATE POLICY teacher_accounts_self_read ON public.teacher_accounts
  FOR SELECT TO authenticated
  USING (auth_user_id = auth.uid());

-- 2) Replace single activity_completions policy with insert + select (own + teacher)
DROP POLICY IF EXISTS metz_activity_completions_own ON public.activity_completions;
DROP POLICY IF EXISTS metz_activity_completions_insert ON public.activity_completions;
DROP POLICY IF EXISTS metz_activity_completions_select_own ON public.activity_completions;
DROP POLICY IF EXISTS metz_activity_completions_select_teacher ON public.activity_completions;

CREATE POLICY metz_activity_completions_insert ON public.activity_completions
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY metz_activity_completions_select_own ON public.activity_completions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY metz_activity_completions_select_teacher ON public.activity_completions
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.teacher_accounts t WHERE t.auth_user_id = auth.uid()
  ));

GRANT SELECT ON TABLE public.teacher_accounts TO authenticated;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.teacher_accounts FROM authenticated;
REVOKE ALL ON TABLE public.teacher_accounts FROM anon;

-- Example: grant a teacher (run after they have signed in once so auth.users has their row)
-- INSERT INTO public.teacher_accounts (auth_user_id, email, note)
-- SELECT id, email, 'Science teacher'
-- FROM auth.users WHERE email = 'you@yourdistrict.org';

COMMENT ON TABLE public.teacher_accounts IS 'Allowlisted teachers may SELECT all activity_completions via RLS; manage rows via SQL/service_role only.';
