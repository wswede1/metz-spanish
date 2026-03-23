# ¡Conoce a Colombia! — Spanish Student Learning Site

A browser-based Spanish language learning site for middle and high school students. No logins, no apps, no downloads. Works on Chromebooks, tablets, and phones.

**Live site:** `https://wswede1.github.io/metz-spanish/`

| Class | Student URL |
|-------|-------------|
| Spanish 1 | `https://wswede1.github.io/metz-spanish/span_1/unidad_colombia/` |
| Spanish 2 | `https://wswede1.github.io/metz-spanish/span_2/unidad_colombia/` |

---

## What this repo contains

This repo holds only the **student-facing Colombia unit** for Spanish 1 and Spanish 2. It does not include teacher guides, licensed curriculum materials, or administrative documents.

```
metz-spanish/
│
├── unidad_colombia/
│   └── student_site_assets/
│       ├── colombia-student.css   ← all styles (shared by both classes)
│       └── colombia-student.js    ← rendering engine (shared)
│
├── span_1/
│   └── unidad_colombia/
│       ├── index.html                              ← redirects to student_site/
│       ├── Colombia_Vocab_Review_Spanish1.html     ← flashcard / quiz / match tool
│       ├── student_site/
│       │   ├── index.html         ← hub/home page students see ← share this URL
│       │   ├── activity.html      ← activity page shell
│       │   └── site-data.js       ← ALL content for Span 1 ← you edit this
│       └── day_01/ through day_09/   ← printable classroom worksheets
│
├── span_2/
│   └── unidad_colombia/           ← same structure as span_1
│       └── student_site/
│           └── site-data.js       ← ALL content for Span 2 ← you edit this
│
├── LAUNCH_GUIDE.md                ← GitHub Pages setup & update workflow
├── .gitignore                     ← keeps licensed materials out of this repo
└── README.md                      ← this file
```

---

## The two files you edit most

| File | What it controls |
|------|-----------------|
| `span_1/unidad_colombia/student_site/site-data.js` | Every card, activity, reading, and drill for Spanish 1 |
| `span_2/unidad_colombia/student_site/site-data.js` | Every card, activity, reading, and drill for Spanish 2 |

Everything else (styles, rendering logic) is shared and rarely needs touching.

---

## Releasing content to students

Each hub card has a `releaseDate` field. Change it to control when students can open it:

```js
{
  title: "Day 6 — Emotions + ir Practice",
  route: "activity.html?activity=sp1-day-06-emotions-ir",
  releaseDate: "2026-04-07",   // 🔒 locked until April 7
  ...
}
```

| `releaseDate` value | What students see |
|---------------------|-------------------|
| `""` (empty) | Card is open immediately |
| `"2026-04-07"` | Card shows 🔒 and "Available Apr 7" until that date |

To unlock and push in 3 lines:

```bash
cd ~/Desktop/metz
git add span_1/unidad_colombia/student_site/site-data.js
git commit -m "Release Day 6 — Span 1"
git push
```

Site updates in ~1 minute. Students just refresh the page.

---

## Activity types

| Type | What it looks like | Key data fields |
|------|--------------------|-----------------|
| `practice` | Form with MC + fill-in, score panel on right | `questions[]` |
| `drill` | One item at a time, 3 lives, progress bar, celebration screen | `items[]`, `lives` |
| `reading` | Passage + optional tier badge + comprehension check | `passage[]`, `glossary[]`, `tier` |
| `resource` | Info page with sidebar checklist + reflection prompts | `sections[]`, `checklist[]` |

### Differentiated readings

Each reading topic has two versions — both show as separate cards:

| `tier` | Badge | For |
|--------|-------|-----|
| `"l2"` | 📘 Language Learner Track | English glossary, scaffolded questions, shorter passage |
| `"heritage"` | ⭐ Heritage Speaker Track | Spanish-only glossary, analytical questions, longer passage |

---

## How to add a new activity (quick reference)

**Step 1 — Add the activity object to `activities` in `site-data.js`:**

```js
"sp1-day-X-myactivity": {
  title: "Day X Activity Name",
  dayLabel: "Day X",
  kindLabel: "Practice",
  type: "practice",        // practice | drill | reading | resource
  minutes: 12,
  description: "Short description shown on the hub card.",
  instructions: "Directions shown at top of the activity page.",
  objectives: ["I can ...", "I can ..."],
  questions: [
    {
      type: "mc",
      prompt: "Question?",
      options: [
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
        { value: "d", label: "Option D" }
      ],
      answer: "a"
    },
    {
      type: "short",
      prompt: "Fill in: ____.",
      placeholder: "type here",
      answer: ["answer", "alternate answer"],  // array = multiple accepted forms
      explanation: "Optional hint shown on wrong answer."
    }
  ]
}
```

**Step 2 — Add a card to the correct section in `sections[]`:**

```js
{
  title: "Day X Activity Name",
  description: "Card description (2 sentences max).",
  route: "activity.html?activity=sp1-day-X-myactivity",
  releaseDate: "",          // set a date to lock it
  status: "New",            // Ready | New | Study
  kindLabel: "Practice",
  minutes: 12,
  dayLabel: "Day X",
  icon: "✏️"
}
```

**Step 3 — Push:**

```bash
git add span_1/unidad_colombia/student_site/site-data.js
git commit -m "Add Day X practice — Span 1"
git push
```

---

## Drill activity format

```js
"sp1-day-X-drill": {
  title: "Drill Title",
  dayLabel: "Day X",
  kindLabel: "Drill",
  type: "drill",
  minutes: 10,
  lives: 3,
  description: "Hub card description.",
  instructions: "Type the correct form and press Enter or Check.",
  objectives: ["I can ..."],
  items: [
    { prompt: "yo — comer", answer: "como", hint: "-ER verb: yo → -o" },
    { prompt: "tú — vivir", answer: "vives", hint: "-IR verb: tú → -es" }
  ]
}
```

Accents are optional in answers — `"esta"` matches both `"esta"` and `"está"`.

---

## Reading activity format

```js
"sp1-day-X-reading-l2": {
  title: "Reading Title",
  dayLabel: "Day X",
  kindLabel: "Reading",
  type: "reading",
  tier: "l2",              // "l2" or "heritage"
  minutes: 15,
  description: "Hub card description.",
  instructions: "Read carefully, then answer without a translator.",
  glossary: ["word = translation", "word = translation"],
  passage: [
    "Paragraph one.",
    "Paragraph two.",
    "Paragraph three."
  ],
  questions: [ /* same format as practice */ ]
}
```

---

## Unit overview — Spanish 1

**Grammar arc:** present -ER/-IR verbs → gustar + infinitive → estar + location/emotions → ir + a

| Day | Topic | Activity types on hub |
|-----|-------|-----------------------|
| 1 | Colombia intro / KWL stations | Resource |
| 2 | Vocab: school + place words | Practice |
| 3 | -ER/-IR + gustar | Practice + Drill |
| 4 | Medellín student reading | L2 Reading · Heritage Reading · Gustar Practice |
| 5 | Estar + location prepositions | Practice + Drill |
| 6 | Estar + emotions · ir + place | Practice |
| 7 | Colombia culture (coffee, Biblioburro) | L2 Reading · Heritage Reading |
| 8 | Group project launch | Resource |
| 9 | Project draft checkpoint | Resource |
| 10 | Presentation audience guide | Resource |
| 11 | Encanto Part 1 tracker | Resource |
| 12 | Encanto Part 2 discussion | Resource |
| 13 | Mixed review | Practice |
| 14 | Study guide check | Practice |

---

## Unit overview — Spanish 2

**Grammar arc:** preterite regular -AR → -CAR/-GAR/-ZAR spelling changes → -Y verb preterite → stem-change -IR preterite → high-frequency irregulars

| Day | Topic | Activity types on hub |
|-----|-------|-----------------------|
| 1 | Colombia intro / KWL stations | Resource |
| 2 | Travel vocabulary | Practice |
| 3 | -CAR/-GAR/-ZAR preterite | Practice + Drill |
| 4 | Cartagena travel narrative | L2 Reading · Heritage Reading |
| 5 | Stem-change -IR preterite | Practice + Drill |
| 6 | decir / traer / venir | Practice + Drill (12 items) |
| 7 | Colombian music + vallenato | L2 Reading · Heritage Reading |
| 8 | Group project launch | Resource |
| 9 | Project draft checkpoint | Resource |
| 10 | Presentation audience guide | Resource |
| 11 | Encanto Part 1 tracker | Resource |
| 12 | Encanto Part 2 discussion | Resource |
| 13 | Preterite mixed review | Practice |
| 14 | Study guide check | Practice |

---

## Rendering engine (technical reference)

`unidad_colombia/student_site_assets/colombia-student.js` reads `window.unitSite` from `site-data.js` and builds every page in JavaScript. Main functions:

| Function | What it renders |
|----------|----------------|
| `renderHub()` | Card grid on `index.html`; checks `releaseDate` per card |
| `renderPractice()` | MC + short-answer form with score panel |
| `renderReading()` | Passage + tier badge + embedded comprehension check |
| `renderDrill()` | Sequential drill with lives, progress bar, celebration screen |
| `renderResource()` | Info sections + sidebar checklist |

`colombia-student.css` controls all visual styles. The Colombian flag color palette:
- Yellow: `#fcd116`
- Blue: `#003893`
- Red: `#ce1126`

---

## Deploying updates

```bash
cd ~/Desktop/metz

# Release a day's content
git add span_1/unidad_colombia/student_site/site-data.js
git commit -m "Release Day X — Span 1"
git push

# Push engine or style changes
git add unidad_colombia/student_site_assets/
git commit -m "Update rendering engine"
git push
```

See `LAUNCH_GUIDE.md` for the full first-time setup walkthrough.
