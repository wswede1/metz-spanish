-- Metz Spanish adaptive learning — Supabase mirror of Dexie (MetzSpanishDB).
-- Run in Supabase SQL Editor after creating the project.
-- Security: use the publishable (anon) key in the browser only. Never expose the service_role secret.

-- Students (natural key = Dexie studentId)
CREATE TABLE IF NOT EXISTS public.students (
  student_id text PRIMARY KEY,
  display_name text NOT NULL,
  learner_track text NOT NULL,
  created_at bigint NOT NULL,
  last_active bigint NOT NULL DEFAULT 0,
  total_sessions integer NOT NULL DEFAULT 0,
  streak_days integer NOT NULL DEFAULT 0,
  last_session_date text
);

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

-- RLS: classroom MVP — anon (publishable key) can read/write all rows.
-- Tighten before production (per-class keys, auth, or service-only writes).
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fsrs_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bkt_skills ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY metz_anon_students_all ON public.students FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY metz_anon_sessions_all ON public.sessions FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY metz_anon_item_responses_all ON public.item_responses FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY metz_anon_fsrs_cards_all ON public.fsrs_cards FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY metz_anon_bkt_skills_all ON public.bkt_skills FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE POLICY metz_auth_students_all ON public.students FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY metz_auth_sessions_all ON public.sessions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY metz_auth_item_responses_all ON public.item_responses FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY metz_auth_fsrs_cards_all ON public.fsrs_cards FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY metz_auth_bkt_skills_all ON public.bkt_skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
