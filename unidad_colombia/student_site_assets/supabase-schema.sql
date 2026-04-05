-- Metz Spanish adaptive learning — Supabase mirror of Dexie (MetzSpanishDB).
-- Run in Supabase SQL Editor after creating the project.
-- Security: use the publishable (anon) key in the browser only. Never expose the service_role secret.
--
-- Requires Supabase Auth (e.g. Google). Row-level security ties each row to auth.uid().
-- Students must sign in; anonymous (anon) role has no access to adaptive tables.

-- Students (natural key = Dexie studentId; auth_user_id links to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.students (
  student_id text PRIMARY KEY,
  auth_user_id uuid UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name text NOT NULL,
  learner_track text NOT NULL,
  created_at bigint NOT NULL,
  last_active bigint NOT NULL DEFAULT 0,
  total_sessions integer NOT NULL DEFAULT 0,
  streak_days integer NOT NULL DEFAULT 0,
  last_session_date text
);

CREATE INDEX IF NOT EXISTS students_auth_user_idx ON public.students (auth_user_id);

-- Sessions (Dexie ++id preserved as bigint PK for upsert)
CREATE TABLE IF NOT EXISTS public.sessions (
  id bigint PRIMARY KEY,
  student_id text NOT NULL REFERENCES public.students (student_id) ON DELETE CASCADE,
  start_time bigint NOT NULL,
  end_time bigint,
  item_count integer NOT NULL DEFAULT 0,
  correct_count integer NOT NULL DEFAULT 0,
  game_mode text,
  unit_id text
);

-- Item responses (natural key for upsert across devices)
CREATE TABLE IF NOT EXISTS public.item_responses (
  id bigserial PRIMARY KEY,
  student_id text NOT NULL REFERENCES public.students (student_id) ON DELETE CASCADE,
  item_id text NOT NULL,
  skill_cluster text NOT NULL,
  timestamp bigint NOT NULL,
  correct smallint NOT NULL,
  response_time_ms bigint NOT NULL,
  game_mode text NOT NULL,
  difficulty text NOT NULL,
  session_id text NOT NULL,
  CONSTRAINT item_responses_natural UNIQUE (student_id, item_id, timestamp, session_id)
);

CREATE INDEX IF NOT EXISTS item_responses_student_idx ON public.item_responses (student_id);
CREATE INDEX IF NOT EXISTS item_responses_item_idx ON public.item_responses (student_id, item_id);

-- FSRS cards (composite PK matches Dexie)
CREATE TABLE IF NOT EXISTS public.fsrs_cards (
  item_id text NOT NULL,
  student_id text NOT NULL REFERENCES public.students (student_id) ON DELETE CASCADE,
  stability double precision,
  difficulty double precision,
  due bigint NOT NULL,
  lapses integer NOT NULL DEFAULT 0,
  reps integer NOT NULL DEFAULT 0,
  state text NOT NULL,
  last_review bigint,
  elapsed_days double precision DEFAULT 0,
  scheduled_days double precision DEFAULT 0,
  PRIMARY KEY (item_id, student_id)
);

CREATE INDEX IF NOT EXISTS fsrs_cards_student_due_idx ON public.fsrs_cards (student_id, due);

-- BKT skill rows (composite PK matches Dexie)
CREATE TABLE IF NOT EXISTS public.bkt_skills (
  skill_cluster text NOT NULL,
  student_id text NOT NULL REFERENCES public.students (student_id) ON DELETE CASCADE,
  p_mastery double precision,
  p_l0 double precision,
  p_t double precision,
  p_g double precision,
  p_s double precision,
  total_attempts integer DEFAULT 0,
  last_updated bigint,
  learner_track text,
  PRIMARY KEY (skill_cluster, student_id)
);

-- Hub / lesson independent-work completions (optional grading signal)
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

-- RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fsrs_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bkt_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_completions ENABLE ROW LEVEL SECURITY;

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
DROP POLICY IF EXISTS metz_activity_completions_own ON public.activity_completions;

-- Authenticated users only; scoped to their auth.users id via students.auth_user_id
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

CREATE POLICY metz_activity_completions_own ON public.activity_completions
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

REVOKE ALL ON TABLE public.students FROM anon;
REVOKE ALL ON TABLE public.sessions FROM anon;
REVOKE ALL ON TABLE public.item_responses FROM anon;
REVOKE ALL ON TABLE public.fsrs_cards FROM anon;
REVOKE ALL ON TABLE public.bkt_skills FROM anon;
REVOKE ALL ON TABLE public.activity_completions FROM anon;

-- Teacher reads / exports: use Supabase Dashboard (SQL Editor / Table Editor) as project owner,
-- or a server-side script with the service_role key (never in the browser).
--
-- Example: recent activity completions
--   SELECT course_key, activity_id, user_id, occurred_at
--   FROM public.activity_completions
--   ORDER BY occurred_at DESC;
--
-- Example: aggregate counts for grading views
--   SELECT course_key, activity_id, count(*)::int AS completions, max(occurred_at) AS last_at
--   FROM public.activity_completions
--   GROUP BY course_key, activity_id
--   ORDER BY last_at DESC;
