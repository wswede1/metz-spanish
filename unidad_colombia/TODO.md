# Colombia Unit Student Site — Project TODO

## Immediate / In Progress
- [ ] Replace `REPLACE_WITH_YOUTUBE_ID` placeholders with real YouTube IDs in:
  - `span_1/unidad_colombia/student_site/site-data.js` → `sp1-listening-cumbia`
  - `span_2/unidad_colombia/student_site/site-data.js` → `sp2-listening-vallenato`

## Near-Term Enhancements
- [ ] Add glossary entries to Heritage-track readings so hover tooltips work on key vocabulary
- [ ] Add more listening activities — one per major cultural topic (cumbia, Bogotá, Cartagena, Encanto soundtrack)
- [ ] Add `type: "video"` — same as listening but without comprehension questions; for viewing sessions with guided notes
- [ ] Print activity sheets — link each card to its corresponding classroom handout HTML so students can print review materials
- [ ] Progress persistence — store drill scores and practice results in `localStorage` so students can resume without losing streaks

## Engagement & App Features
- [ ] Audio transcript accordion for listening activities (accessibility + comprehension support)
- [ ] "Streak" or completion badge system — track which cards students have finished
- [ ] Hint economy — let students spend "coins" to unlock hints in drill mode
- [ ] Spaced repetition mode — re-queue drill items students missed most recently
- [ ] Student self-rating — after each activity, a simple 3-button "Got it / Almost / Still struggling" to guide review

## Content Expansion
- [ ] More reading tiers — add an intermediate track between L2 and Heritage
- [ ] Expand 3 P's activities with student submission links (Google Form or Padlet)
- [ ] Add Spain unit (`unidad_espana`) following the same shared rendering engine pattern
- [ ] Extend warm-ups to include audio warmups (short spoken prompt using TTS)

## Teacher Tools
- [ ] Teacher dashboard — simple class code system where students submit scores to a Google Form or Airtable so the teacher can see completion
- [ ] Release date scheduling — set release dates per card to pace student access through the unit
- [ ] Printable answer key PDF for each activity

## Infrastructure
- [ ] Document the site-data.js format for future units (field reference guide)
- [ ] Add a `CONTRIBUTING.md` explaining how to add new activity types
- [ ] Consider bundling shared assets into a CDN-friendly URL for multi-class reuse
