-- Migration: from open anon RLS to Auth-scoped policies (existing Supabase projects).
-- Run once in SQL Editor after enabling Google (or other) provider in Authentication.
-- Back up data first. Rows in public.students without auth_user_id are not visible to students
-- until they sign in and the client upserts their profile with auth_user_id = auth.uid().

-- 1) Link students to Supabase Auth
ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS auth_user_id uuid UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS students_auth_user_idx ON public.students (auth_user_id);

-- 2) Activity completions (Phase 2 grading signal)
CREATE TABLE IF NOT EXISTS public.activity_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  course_key text NOT NULL,
  activity_id text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  payload jsonb
);

CREATE INDEX IF NOT EXISTS activity_completions_user_course_idx ON public.activity_completions (user_id, course_key);
CREATE INDEX IF NOT EXISTS activity_completions_course_activity_idx ON public.activity_completions (course_key, activity_id);

ALTER TABLE public.activity_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS metz_activity_completions_own ON public.activity_completions;
CREATE POLICY metz_activity_completions_own ON public.activity_completions
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

GRANT ALL ON public.activity_completions TO authenticated;
REVOKE ALL ON TABLE public.activity_completions FROM anon;

-- 3) Drop legacy permissive policies
DROP POLICY IF EXISTS metz_anon_students_all ON public.students;
DROP POLICY IF EXISTS metz_anon_sessions_all ON public.sessions;
DROP POLICY IF EXISTS metz_anon_item_responses_all ON public.item_responses;
DROP POLICY IF EXISTS metz_anon_fsrs_cards_all ON public.fsrs_cards;
DROP POLICY IF EXISTS metz_anon_bkt_skills_all ON public.bkt_skills;
DROP POLICY IF EXISTS metz_auth_students_all ON public.students;
DROP POLICY IF EXISTS metz_auth_sessions_all ON public.sessions;
DROP POLICY IF EXISTS metz_auth_item_responses_all ON public.item_responses;
DROP POLICY IF EXISTS metz_auth_fsrs_cards_all ON public.fsrs_cards;
DROP POLICY IF EXISTS metz_auth_bkt_skills_all ON public.bkt_skills;
DROP POLICY IF EXISTS metz_students_rw_own ON public.students;
DROP POLICY IF EXISTS metz_sessions_rw_own ON public.sessions;
DROP POLICY IF EXISTS metz_item_responses_rw_own ON public.item_responses;
DROP POLICY IF EXISTS metz_fsrs_cards_rw_own ON public.fsrs_cards;
DROP POLICY IF EXISTS metz_bkt_skills_rw_own ON public.bkt_skills;

-- 4) Tight RLS for adaptive tables
CREATE POLICY metz_students_rw_own ON public.students
  FOR ALL TO authenticated
  USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY metz_sessions_rw_own ON public.sessions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.student_id = sessions.student_id AND s.auth_user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.student_id = sessions.student_id AND s.auth_user_id = auth.uid()
    )
  );

CREATE POLICY metz_item_responses_rw_own ON public.item_responses
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.student_id = item_responses.student_id AND s.auth_user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.student_id = item_responses.student_id AND s.auth_user_id = auth.uid()
    )
  );

CREATE POLICY metz_fsrs_cards_rw_own ON public.fsrs_cards
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.student_id = fsrs_cards.student_id AND s.auth_user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.student_id = fsrs_cards.student_id AND s.auth_user_id = auth.uid()
    )
  );

CREATE POLICY metz_bkt_skills_rw_own ON public.bkt_skills
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.student_id = bkt_skills.student_id AND s.auth_user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.student_id = bkt_skills.student_id AND s.auth_user_id = auth.uid()
    )
  );

-- 5) Remove anon access to adaptive data (publishable key alone is not enough)
REVOKE ALL ON TABLE public.students FROM anon;
REVOKE ALL ON TABLE public.sessions FROM anon;
REVOKE ALL ON TABLE public.item_responses FROM anon;
REVOKE ALL ON TABLE public.fsrs_cards FROM anon;
REVOKE ALL ON TABLE public.bkt_skills FROM anon;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
