# ¡Conoce a Colombia! — Student Site

A browser-based Spanish learning site for middle and high school students. Works on Chromebooks, tablets, and phones—no app install. Progress for the Colombia unit is stored **in each student’s browser** (local storage / IndexedDB); this deployment does **not** use cloud sync or a class database.

## Student URLs

| Class | Link |
|-------|------|
| Spanish 1 | `https://wswede1.github.io/metz-spanish/span_1/unidad_colombia/student_site/` |
| Spanish 2 | `https://wswede1.github.io/metz-spanish/span_2/unidad_colombia/student_site/` |

Optional **profile setup** (IndexedDB adaptive profile):  
`https://wswede1.github.io/metz-spanish/unidad_colombia/student_site_assets/student-profile-setup.html`

**Teacher page** (links to both hubs):  
`https://wswede1.github.io/metz-spanish/teacher.html`

The old Supabase-based teacher dashboard URL (`teacher-dashboard.html`) now shows a short redirect notice. Optional adaptive profile setup still lives at [student-profile-setup.html](unidad_colombia/student_site_assets/student-profile-setup.html).

**Historical note:** SQL and Supabase setup docs remain under `unidad_colombia/student_site_assets/` for reference if you ever re-enable cloud features in a fork.

**Maintainer notes:** [Repo cleanup backlog](docs/REPO_CLEANUP_AND_SUPABASE_TODO.md) (may reference removed cloud UI).

## Features

- Practice activities, readings, drills, and listening activities
- Hover any underlined word in a reading for an English translation
- Click any word to hear it pronounced in Spanish
- 🔊 Listen button reads the full passage aloud
- Daily warm-ups and cultural exploration (Las 3 P's)
