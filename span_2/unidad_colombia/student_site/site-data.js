// ─── RELEASE DATES ───────────────────────────────────────────────────────────
// To lock a card until a specific date, set releaseDate: "YYYY-MM-DD"
// To unlock a card immediately, set releaseDate: "" or remove the field.
// Cards with a future date display as locked with the unlock date shown.
// Example: releaseDate: "2026-04-07"  →  locks until April 7, 2026
// ─────────────────────────────────────────────────────────────────────────────

window.unitSite = {
  title: "Spanish 2 — ¡Conoce a Colombia!",
  subtitle: "Use these student-safe pages for travel vocabulary, preterite practice, culture readings, projects, film reflection, and review.",
  eyebrow: "Spanish 2 Student Site",
  overviewTitle: "Spanish 2 Colombia Student Hub",
  overviewText: "Each card matches the Colombia unit pacing. Focus on the preterite — report what happened, what you learned, what you saw.",
  overviewMeta: ["Parallel 14-day unit", "Preterite focus", "Project + film + review support"],
  footerText: "Spanish 2 Colombia Unit | Student-safe website pages and review tools",

  sections: [
    {
      title: "Start Here",
      icon: "🧭",
      description: "Launch the unit, review travel vocabulary, and keep the flashcards close by.",
      cards: [
        {
          title: "Day 1 Launch Recap",
          description: "Reset the Colombia launch day, map anchors, and preterite reporting goals before station work.",
          route: "activity.html?activity=sp2-day-01-launch",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Launch",
          minutes: 15,
          dayLabel: "Day 1",
          icon: "🗺️"
        },
        {
          title: "Day 2 Travel Vocab Check",
          description: "Practice the unit travel vocabulary in short past-tense contexts before the classroom packet.",
          route: "activity.html?activity=sp2-day-02-vocab",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Practice",
          minutes: 12,
          dayLabel: "Day 2",
          icon: "✈️"
        },
        {
          title: "Vocabulary Game Suite",
          description: "25+ game modes: flashcards, quiz, word scramble, hangman, falling words, memory, crossword, word search, and more!",
          route: "../Colombia_Vocab_Review_Spanish2.html",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Game Suite",
          minutes: 15,
          dayLabel: "Bonus",
          icon: "📇"
        }
      ]
    },
    {
      title: "Daily Warm-Ups",
      icon: "☀️",
      description: "Start each class with a 3–5 minute review of the previous day's key grammar or vocabulary.",
      cards: [
        { title: "Day 2 Warm-Up", description: "Quick review of Day 1 Colombia geography and preterite reporting frames.", route: "activity.html?activity=sp2-warmup-day02", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 2", icon: "🌅" },
        { title: "Day 3 Warm-Up", description: "Review Day 2 travel vocabulary in short preterite sentence contexts.", route: "activity.html?activity=sp2-warmup-day03", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 3", icon: "🌅" },
        { title: "Day 4 Warm-Up", description: "Quick check of -CAR/-GAR/-ZAR spelling changes from Day 3.", route: "activity.html?activity=sp2-warmup-day04", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 4", icon: "🌅" },
        { title: "Day 5 Warm-Up", description: "Review Day 4 -Y verb preterites and Cartagena reading comprehension.", route: "activity.html?activity=sp2-warmup-day05", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 5", icon: "🌅" },
        { title: "Day 6 Warm-Up", description: "Review Day 5 stem-changing -IR preterites: pidió, durmió, prefirió.", route: "activity.html?activity=sp2-warmup-day06", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 6", icon: "🌅" },
        { title: "Day 7 Warm-Up", description: "Review Day 6 irregular preterites: decir, traer, venir.", route: "activity.html?activity=sp2-warmup-day07", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 7", icon: "🌅" },
        { title: "Day 8 Warm-Up", description: "Review Day 7 Colombian music culture — vallenato, cumbia, UNESCO.", route: "activity.html?activity=sp2-warmup-day08", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 8", icon: "🌅" },
        { title: "Day 9 Warm-Up", description: "Review Day 8 project launch — grammar requirements and language frames.", route: "activity.html?activity=sp2-warmup-day09", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 9", icon: "🌅" },
        { title: "Day 10 Warm-Up", description: "Pre-presentation grammar check: verify preterite accuracy before class.", route: "activity.html?activity=sp2-warmup-day10", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 10", icon: "🌅" },
        { title: "Day 11 Warm-Up", description: "Reflect on Day 10 presentations — use past-tense reporting to share takeaways.", route: "activity.html?activity=sp2-warmup-day11", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 11", icon: "🌅" },
        { title: "Day 12 Warm-Up", description: "Review Day 11 Encanto Part 1 key vocabulary and plot events.", route: "activity.html?activity=sp2-warmup-day12", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 12", icon: "🌅" },
        { title: "Day 13 Warm-Up", description: "Review Day 12 Encanto ending and Colombia connections from the film.", route: "activity.html?activity=sp2-warmup-day13", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 13", icon: "🌅" },
        { title: "Day 14 Warm-Up", description: "Full preterite flash review — all four patterns before the exam.", route: "activity.html?activity=sp2-warmup-day14", releaseDate: "", status: "Ready", kindLabel: "Warm-Up", minutes: 5, dayLabel: "Day 14", icon: "🌅" }
      ]
    },
    {
      title: "Preterite Lab",
      icon: "⚙️",
      description: "Practice the new Colombia unit preterite targets in a sequence that mirrors class.",
      cards: [
        {
          title: "Day 3 — -CAR/-GAR/-ZAR Check",
          description: "Check your spelling-change preterite forms in airport, hotel, and market contexts.",
          route: "activity.html?activity=sp2-day-03-cargarzar",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Practice",
          minutes: 14,
          dayLabel: "Day 3",
          icon: "🔤"
        },
        {
          title: "Day 3 — Spelling Change Drill",
          description: "Drill the yo-form spelling changes: saqué, pagué, empecé. 3 lives. Instant feedback.",
          route: "activity.html?activity=sp2-day-03-drill",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Drill",
          minutes: 10,
          dayLabel: "Day 3",
          icon: "⚡"
        },
        {
          title: "Day 4 — Reading: Language Learner",
          description: "Read a preterite travel narrative about Cartagena with glossary support and scaffolded questions.",
          route: "activity.html?activity=sp2-day-04-reading-l2",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Reading",
          minutes: 15,
          dayLabel: "Day 4",
          icon: "📖"
        },
        {
          title: "Day 4 — Reading: Heritage Track",
          description: "An analytical reading on Cartagena's history and cultural identity — deeper vocabulary, critical questions.",
          route: "activity.html?activity=sp2-day-04-reading-heritage",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Reading",
          minutes: 20,
          dayLabel: "Day 4",
          icon: "⭐"
        },
        {
          title: "Day 5 — Stem-Change -IR Practice",
          description: "Practice pedir, dormir, and preferir in third-person-heavy Colombia travel sentences.",
          route: "activity.html?activity=sp2-day-05-stem-change",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Practice",
          minutes: 14,
          dayLabel: "Day 5",
          icon: "🔀"
        },
        {
          title: "Day 5 — Stem-Change Drill",
          description: "Type the preterite stem-change form for each prompt. 3 lives, instant feedback.",
          route: "activity.html?activity=sp2-day-05-drill",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Drill",
          minutes: 10,
          dayLabel: "Day 5",
          icon: "⚡"
        },
        {
          title: "Day 6 — Irregular Preterite Practice",
          description: "Use the high-frequency irregulars decir, traer, venir in past-tense dialogue.",
          route: "activity.html?activity=sp2-day-06-irregulars",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Practice",
          minutes: 15,
          dayLabel: "Day 6",
          icon: "💬"
        },
        {
          title: "Day 6 — Irregular Preterite Drill",
          description: "Drill the stems dij-, traj-, vin- across all subjects. Watch out — no accent marks on these stems!",
          route: "activity.html?activity=sp2-day-06-drill",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Drill",
          minutes: 10,
          dayLabel: "Day 6",
          icon: "⚡"
        }
      ]
    },
    {
      title: "Culture, Projects, and Film",
      icon: "🌎",
      description: "Culture readings, project work, presentations, and the Encanto film sequence.",
      cards: [
        {
          title: "Day 7 — Culture Reading: Language Learner",
          description: "Read a past-tense culture passage about Colombian music and community with glossary support.",
          route: "activity.html?activity=sp2-day-07-culture-l2",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Reading",
          minutes: 16,
          dayLabel: "Day 7",
          icon: "🎵"
        },
        {
          title: "Day 7 — Culture Reading: Heritage Track",
          description: "An analytical reading on vallenato as cultural patrimony — tradition, globalization, and identity.",
          route: "activity.html?activity=sp2-day-07-culture-heritage",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Reading",
          minutes: 22,
          dayLabel: "Day 7",
          icon: "⭐"
        },
        {
          title: "Day 8 — Project Launch",
          description: "Choose a clear Colombia topic and map out how your group will use the preterite accurately.",
          route: "activity.html?activity=sp2-day-08-project-launch",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Project",
          minutes: 12,
          dayLabel: "Day 8",
          icon: "📝"
        },
        {
          title: "Day 9 — Project Checkpoint",
          description: "Peer-check the past-tense script, visuals, and grammar requirements before presenting.",
          route: "activity.html?activity=sp2-day-09-project-checkpoint",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Project",
          minutes: 10,
          dayLabel: "Day 9",
          icon: "✅"
        },
        {
          title: "Day 10 — Audience Reflection",
          description: "Stay active during presentations by listening for content, grammar, and one strong takeaway.",
          route: "activity.html?activity=sp2-day-10-presentations",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Presentation",
          minutes: 10,
          dayLabel: "Day 10",
          icon: "🎤"
        },
        {
          title: "Day 11 — Encanto Part 1",
          description: "Track verbs, character actions, and setting details during Part 1 of Encanto.",
          route: "activity.html?activity=sp2-day-11-encanto-1",
          releaseDate: "",
          status: "New",
          kindLabel: "Film",
          minutes: 12,
          dayLabel: "Day 11",
          icon: "🎬"
        },
        {
          title: "Day 12 — Encanto Part 2",
          description: "Retell key events and compare the film to your unit learning — in the preterite.",
          route: "activity.html?activity=sp2-day-12-encanto-2",
          releaseDate: "",
          status: "New",
          kindLabel: "Film",
          minutes: 12,
          dayLabel: "Day 12",
          icon: "🏠"
        }
      ]
    },
    {
      title: "Las 3 P's",
      icon: "🌍",
      description: "Explore Colombian culture through the ACTFL lens: Productos, Prácticas, and Perspectivas.",
      cards: [
        {
          title: "Productos Culturales",
          description: "Research and analyze tangible and intangible cultural products from Colombia — music, food, art, and more.",
          route: "activity.html?activity=sp2-3p-productos",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Culture",
          minutes: 20,
          dayLabel: "Bonus",
          icon: "🎨"
        },
        {
          title: "Prácticas Culturales",
          description: "Examine everyday customs, rituals, and social practices that define Colombian daily life.",
          route: "activity.html?activity=sp2-3p-practicas",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Culture",
          minutes: 20,
          dayLabel: "Bonus",
          icon: "🤝"
        },
        {
          title: "Perspectivas Culturales",
          description: "Uncover the values, beliefs, and attitudes that explain why Colombians do what they do.",
          route: "activity.html?activity=sp2-3p-perspectivas",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Culture",
          minutes: 20,
          dayLabel: "Bonus",
          icon: "💡"
        }
      ]
    },
    {
      title: "Review & Assessment Support",
      icon: "🧠",
      description: "Use these pages to check the full preterite sequence before the review stations and exam.",
      cards: [
        {
          title: "Day 13 — Preterite Review",
          description: "Mixed review of regular, spelling-change, stem-change, and irregular preterite forms.",
          route: "activity.html?activity=sp2-day-13-review",
          releaseDate: "",
          status: "New",
          kindLabel: "Review",
          minutes: 15,
          dayLabel: "Day 13",
          icon: "🔁"
        },
        {
          title: "Day 14 — Study Guide Check",
          description: "Final preterite study support before the unit exam. Review, not a test.",
          route: "activity.html?activity=sp2-day-14-study",
          releaseDate: "",
          status: "Study",
          kindLabel: "Study Guide",
          minutes: 15,
          dayLabel: "Day 14",
          icon: "📋"
        }
      ]
    },
    {
      title: "Listening",
      icon: "🎧",
      description: "Watch and listen to authentic Colombian music and cultural content, then check your comprehension using preterite and cultural vocabulary.",
      cards: [
        {
          title: "El Vallenato — Music Listening",
          description: "Watch a vallenato performance and answer comprehension questions about Colombian musical heritage.",
          route: "activity.html?activity=sp2-listening-vallenato",
          releaseDate: "",
          status: "New",
          kindLabel: "Listening",
          minutes: 10,
          dayLabel: "Bonus",
          icon: "🎵"
        },
        {
          title: "Day 4 — Word Order",
          description: "Listen to preterite sentences about Cartagena and arrange the words in the correct order.",
          route: "activity.html?activity=sp2-word-order-day04",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Word Order",
          minutes: 10,
          dayLabel: "Day 4",
          icon: "🔀"
        }
      ]
    },
    {
      title: "Podcasts",
      icon: "🎙️",
      description: "Listen to real Spanish podcasts made for learners. Build your listening skills with stories told in Spanish.",
      cards: [
        {
          title: "Mi héroe, mi amigo",
          description: "Duolingo Spanish Podcast — A boy in Colombia discovers an unexpected hero in his own family.",
          route: "activity.html?activity=sp2-podcast-duo-01",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 25,
          dayLabel: "Bonus",
          icon: "🟢"
        },
        {
          title: "Sin miedo",
          description: "Duolingo Spanish Podcast — A woman overcomes fear to start a new chapter in her life.",
          route: "activity.html?activity=sp2-podcast-duo-02",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 25,
          dayLabel: "Bonus",
          icon: "🟢"
        },
        {
          title: "Memorias y milanesas",
          description: "Duolingo Spanish Podcast — A story about family traditions and the food that connects generations.",
          route: "activity.html?activity=sp2-podcast-duo-03",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 25,
          dayLabel: "Bonus",
          icon: "🟢"
        },
        {
          title: "Una chilena en China",
          description: "Duolingo Spanish Podcast — A Chilean woman navigates culture shock halfway across the world.",
          route: "activity.html?activity=sp2-podcast-duo-04",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 25,
          dayLabel: "Bonus",
          icon: "🟢"
        },
        {
          title: "Helen Brown",
          description: "Duolingo Spanish Podcast — An unexpected name leads to a story about identity and belonging.",
          route: "activity.html?activity=sp2-podcast-duo-05",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 25,
          dayLabel: "Bonus",
          icon: "🟢"
        },
        {
          title: "¿Qué dicen los animales?",
          description: "Garbanzo Podcast — What sounds do animals make in Spanish? A fun episode for building listening skills.",
          route: "activity.html?activity=sp2-podcast-garb-01",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 15,
          dayLabel: "Bonus",
          icon: "🫘"
        },
        {
          title: "Los pollitos dicen",
          description: "Garbanzo Podcast — Learn the classic children's song and the vocabulary behind it.",
          route: "activity.html?activity=sp2-podcast-garb-02",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 15,
          dayLabel: "Bonus",
          icon: "🫘"
        },
        {
          title: "La canguro Catrina",
          description: "Garbanzo Podcast — A babysitter kangaroo teaches everyday Spanish through storytelling.",
          route: "activity.html?activity=sp2-podcast-garb-03",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 15,
          dayLabel: "Bonus",
          icon: "🫘"
        },
        {
          title: "Penelope y el gigante",
          description: "Garbanzo Podcast — A brave girl faces a giant in this fairy-tale listening activity.",
          route: "activity.html?activity=sp2-podcast-garb-04",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 15,
          dayLabel: "Bonus",
          icon: "🫘"
        },
        {
          title: "No puedes pasar",
          description: "Garbanzo Podcast — A story about boundaries, negotiation, and creative problem solving.",
          route: "activity.html?activity=sp2-podcast-garb-05",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Podcast",
          minutes: 15,
          dayLabel: "Bonus",
          icon: "🫘"
        }
      ]
    }
  ],

  activities: {

    // ── Day 1 ──────────────────────────────────────────────────────────────────
    "sp2-day-01-launch": {
      title: "Day 1 Launch Recap",
      dayLabel: "Day 1",
      kindLabel: "Launch",
      type: "resource",
      minutes: 15,
      description: "Revisit the Colombia launch day and connect culture anchors with past-tense reporting.",
      callout: "Spanish 2 students should already be thinking in past-tense frames: What did you learn? What surprised you? What happened in the video?",
      objectives: [
        "I can identify the core Colombia culture anchors from Day 1.",
        "I can plan one station response that uses the preterite where appropriate.",
        "I can prepare one research or Slides angle before class work begins."
      ],
      checklist: [
        "Review the map anchors: Bogotá, Cartagena, coffee region, Caribbean coast, Andes, Amazon.",
        "Pick one station focus and stay with it.",
        "Write one preterite sentence about what you learned.",
        "List one source you still need."
      ],
      sections: [
        {
          title: "Day 1 Anchors",
          bullets: [
            "Regions and geography",
            "Major cities and landmarks",
            "Coffee and rural culture",
            "Biodiversity, music, and daily life"
          ]
        },
        {
          title: "Reporting Frames",
          bullets: [
            "Aprendí que ...",
            "Vi que ...",
            "Escuché que ...",
            "Leí que ..."
          ]
        }
      ],
      reflectionPrompts: [
        "What fact from Day 1 did you remember most clearly?",
        "What question do you still want to answer about Colombia?",
        "What preterite verb could help you report your learning?"
      ]
    },

    // ── Day 2 ──────────────────────────────────────────────────────────────────
    "sp2-day-02-vocab": {
      title: "Day 2 Travel Vocab Check",
      dayLabel: "Day 2",
      kindLabel: "Practice",
      type: "practice",
      minutes: 12,
      description: "Practice the travel vocabulary through short past-tense situations tied to Colombia.",
      instructions: "Choose the best answer or type the missing vocabulary word.",
      objectives: [
        "I can recognize travel vocabulary in context.",
        "I can use a travel word in a simple past-tense sentence."
      ],
      questions: [
        {
          type: "mc",
          prompt: "What does el equipaje mean?",
          options: [
            { value: "a", label: "the luggage" },
            { value: "b", label: "the beach" },
            { value: "c", label: "the airport worker" },
            { value: "d", label: "the passport check" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Complete the sentence: Confirmamos el ____ antes de subir al avión.",
          placeholder: "travel word",
          answer: ["vuelo", "el vuelo"]
        },
        {
          type: "mc",
          prompt: "Which word best fits: Mi familia llevó una gran ___ al hotel.",
          options: [
            { value: "a", label: "maleta" },
            { value: "b", label: "playa" },
            { value: "c", label: "ciudad" },
            { value: "d", label: "selva" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the Spanish word for airport.",
          placeholder: "Spanish word",
          answer: ["aeropuerto", "el aeropuerto"]
        },
        {
          type: "mc",
          prompt: "Which sentence uses pasaporte correctly?",
          options: [
            { value: "a", label: "Mostré mi pasaporte en el aeropuerto." },
            { value: "b", label: "Mi pasaporte comió arepas." },
            { value: "c", label: "Fuimos al pasaporte en avión." },
            { value: "d", label: "El pasaporte fue en la playa." }
          ],
          answer: "a"
        }
      ]
    },

    // ── Day 3 — Practice ───────────────────────────────────────────────────────
    "sp2-day-03-cargarzar": {
      title: "Day 3 — -CAR/-GAR/-ZAR Preterite Check",
      dayLabel: "Day 3",
      kindLabel: "Practice",
      type: "practice",
      minutes: 14,
      description: "Check your yo-form spelling changes in travel and Colombia culture contexts.",
      instructions: "Watch the sound changes: saqué, pagué, empecé.",
      objectives: [
        "I can use the yo-form spelling changes in the preterite.",
        "I can connect the form to a travel sentence."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Choose the correct yo form of sacar:",
          options: [
            { value: "a", label: "sacé" },
            { value: "b", label: "saqué" },
            { value: "c", label: "sacó" },
            { value: "d", label: "sacaron" }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Complete the sentence: Yo ____ el hotel ayer. (pagar)",
          placeholder: "preterite form",
          answer: ["pague", "pagué"]
        },
        {
          type: "mc",
          prompt: "Choose the best sentence:",
          options: [
            { value: "a", label: "Yo empecé el tour en Bogotá." },
            { value: "b", label: "Yo empezé el tour en Bogotá." },
            { value: "c", label: "Yo empezar el tour en Bogotá." },
            { value: "d", label: "Yo empiezé el tour en Bogotá." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the yo form of buscar in the preterite.",
          placeholder: "preterite form",
          answer: ["busque", "busqué"]
        },
        {
          type: "mc",
          prompt: "Why do these spelling changes happen?",
          options: [
            { value: "a", label: "To keep the same sound in the yo form." },
            { value: "b", label: "Because all preterite verbs add an i." },
            { value: "c", label: "Because the subject changes to plural." },
            { value: "d", label: "Because Colombia uses different verbs." }
          ],
          answer: "a"
        }
      ]
    },

    // ── Day 3 — Drill ─────────────────────────────────────────────────────────
    "sp2-day-03-drill": {
      title: "Day 3 — Spelling Change Preterite Drill",
      dayLabel: "Day 3",
      kindLabel: "Drill",
      type: "drill",
      minutes: 10,
      lives: 3,
      description: "Type the correct yo-form preterite with spelling changes. Remember: the spelling changes ONLY in yo.",
      instructions: "Type the yo-form preterite. Remember: -car → -qué, -gar → -gué, -zar → -cé.",
      objectives: [
        "I can produce the correct yo-form spelling-change preterite without notes.",
        "I can apply the rule consistently across verbs."
      ],
      items: [
        { prompt: "yo — sacar (preterite)", answer: "saque", hint: "-CAR → -QUÉ: saqué" },
        { prompt: "yo — pagar (preterite)", answer: "pague", hint: "-GAR → -GUÉ: pagué" },
        { prompt: "yo — empezar (preterite)", answer: "empece", hint: "-ZAR → -CÉ: empecé" },
        { prompt: "yo — buscar (preterite)", answer: "busque", hint: "-CAR → -QUÉ: busqué" },
        { prompt: "yo — llegar (preterite)", answer: "llegue", hint: "-GAR → -GUÉ: llegué" },
        { prompt: "yo — almorzar (preterite)", answer: "almorce", hint: "-ZAR → -CÉ: almorcé" },
        { prompt: "yo — tocar (preterite)", answer: "toque", hint: "-CAR → -QUÉ: toqué" },
        { prompt: "yo — jugar (preterite)", answer: "jugue", hint: "-GAR → -GUÉ: jugué" },
        { prompt: "él — llegar (preterite)", answer: "llego", hint: "No spelling change for él — llegó (regular)" },
        { prompt: "ellos — empezar (preterite)", answer: "empezaron", hint: "No spelling change for ellos — empezaron (regular)" }
      ]
    },

    // ── Day 4 — L2 Reading ────────────────────────────────────────────────────
    "sp2-day-04-reading-l2": {
      title: "Un Viaje a Cartagena",
      dayLabel: "Day 4",
      kindLabel: "Reading",
      type: "reading",
      tier: "l2",
      audioUrl: "audio/sp2-day-04-reading-l2.mp3",
      minutes: 15,
      description: "Read a preterite-tense travel narrative about a family trip to Cartagena with glossary support.",
      instructions: "Read each paragraph and look for preterite verbs. Answer the questions using information from the text.",
      glossary: [
        "el muro = wall",
        "la muralla = the walled city walls",
        "el casco antiguo = the old city / historic district",
        "tomar fotos = to take photos",
        "probaron = they tried / tasted",
        "quedarse = to stay"
      ],
      passage: [
        "La familia Restrepo viajó a Cartagena durante el mes de julio. Llegaron al aeropuerto a las diez de la mañana y tomaron un taxi al hotel. El hotel estaba cerca del casco antiguo, la parte histórica de la ciudad.",
        "El primer día, caminaron por las murallas de la ciudad. Desde arriba, vieron el mar Caribe y sacaron muchas fotos. La mamá leyó información sobre la historia de las murallas en su teléfono y le explicó todo a los niños. Ellos escucharon con atención.",
        "En el mercado de Bazurto, probaron frutas tropicales que no conocían antes: maracuyá, lulo, y níspero. El papá pagó con efectivo y creyó que los precios eran muy buenos. La familia comió en un restaurante cerca del mercado y pidió arepas de huevo, que son un plato típico de la costa caribeña.",
        "Antes de regresar al hotel, los niños corrieron en la Plaza de los Coches y oyeron a músicos tocar vallenato. Fue un día largo pero todos dijeron que fue uno de los mejores días de sus vidas."
      ],
      questions: [
        {
          type: "mc",
          prompt: "When did the Restrepo family arrive in Cartagena?",
          options: [
            { value: "a", label: "At night" },
            { value: "b", label: "At ten in the morning" },
            { value: "c", label: "In the afternoon" },
            { value: "d", label: "Early in the morning" }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Write one -Y verb from the reading in its preterite form.",
          placeholder: "preterite form",
          answer: ["leyo", "leyó", "oyo", "oyó", "creyo", "creyó"]
        },
        {
          type: "mc",
          prompt: "What did the family try at the Bazurto market?",
          options: [
            { value: "a", label: "Arepas and coffee" },
            { value: "b", label: "Tropical fruits they had not tried before" },
            { value: "c", label: "Chocolate and empanadas" },
            { value: "d", label: "Fish and rice" }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "What did the children hear at the Plaza de los Coches?",
          placeholder: "English or Spanish",
          answer: ["vallenato", "musicians", "musicos", "músicos", "music", "musica", "música"]
        },
        {
          type: "mc",
          prompt: "Which preterite form from the reading shows a -CAR/-GAR/-ZAR spelling change?",
          options: [
            { value: "a", label: "pagó" },
            { value: "b", label: "pagué" },
            { value: "c", label: "pagaron" },
            { value: "d", label: "pago" }
          ],
          answer: "b",
          explanation: "The text says 'El papá pagó' — but the yo-form would be pagué (spelling change)."
        }
      ]
    },

    // ── Day 4 — Heritage Reading ───────────────────────────────────────────────
    "sp2-day-04-reading-heritage": {
      title: "Cartagena: entre la historia y el presente",
      dayLabel: "Day 4",
      kindLabel: "Reading",
      type: "reading",
      tier: "heritage",
      audioUrl: "audio/sp2-day-04-reading-heritage.mp3",
      minutes: 20,
      description: "Un análisis de Cartagena como ciudad histórica y su identidad cultural contemporánea.",
      instructions: "Lee el texto con atención crítica. Las preguntas requieren análisis, inferencia, y comparación cultural — no solo comprensión literal.",
      glossary: [
        "la esclavitud = el sistema histórico que privó de libertad a millones de africanos",
        "el patrimonio = lo que una comunidad hereda de generaciones anteriores",
        "el legado = la influencia duradera que deja un período histórico"
      ],
      passage: [
        "Cartagena de Indias fue fundada en 1533 por los españoles y se convirtió en uno de los puertos más importantes del comercio colonial en América. Durante siglos, fue el centro de un sistema brutal: el tráfico de personas esclavizadas procedentes de África Occidental. Esta historia —incómoda pero fundamental— dejó un legado cultural profundo que todavía se manifiesta en la música, la gastronomía, las tradiciones religiosas y los rasgos físicos de la mayoría de los cartageneros actuales.",
        "En el siglo XX, Cartagena se transformó en un destino turístico internacional. La UNESCO declaró su centro histórico amurallado Patrimonio de la Humanidad en 1984, reconociendo no solo la arquitectura colonial sino también el valor cultural acumulado de siglos de historia. Sin embargo, esta distinción trajo consigo una tensión real: la restauración del casco antiguo para el turismo desplazó gradualmente a las comunidades de bajos recursos que habían vivido allí durante generaciones.",
        "Hoy, Cartagena es simultáneamente una ciudad de contrastes profundos. Sus barrios turísticos como Getsemaní experimentaron lo que los urbanistas llaman 'gentrificación' — un proceso en el que la inversión y el turismo transformaron el carácter de vecindarios históricos, aumentando los precios y empujando a los residentes originales hacia la periferia. Al mismo tiempo, Getsemaní se convirtió en un símbolo de resistencia cultural: artistas, músicos, y activistas afrodescendientes reclamaron su historia y su espacio público mediante el arte y la organización comunitaria.",
        "La historia de Cartagena invita a reflexionar sobre una pregunta universal: ¿quién tiene el derecho de contar la historia de un lugar y quién se beneficia de su preservación? Esta pregunta no tiene respuesta fácil, pero es exactamente la que una ciudad como Cartagena — con sus murallas, sus memoriales, y sus barrios en transformación — nos obliga a hacernos."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Según el texto, ¿cuál fue el papel de Cartagena durante la época colonial?",
          options: [
            { value: "a", label: "Fue un centro agrícola de exportación de café." },
            { value: "b", label: "Fue uno de los puertos más importantes del comercio colonial, incluyendo el tráfico de personas esclavizadas." },
            { value: "c", label: "Fue fundada por indígenas de la región caribeña." },
            { value: "d", label: "Fue una ciudad de artistas y músicos durante el siglo XVI." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "¿Qué es la 'gentrificación' según el contexto del texto? Explica con tus propias palabras.",
          placeholder: "Responde en inglés o español...",
          answer: ["desplazamiento", "displacement", "rich", "prices", "precios", "original residents", "residentes originales", "investment", "inversion"]
        },
        {
          type: "mc",
          prompt: "What tension does the text identify between UNESCO's recognition and the city's residents?",
          options: [
            { value: "a", label: "UNESCO did not want to recognize Cartagena's colonial history." },
            { value: "b", label: "Restoration for tourism gradually displaced low-income communities who had lived there for generations." },
            { value: "c", label: "The recognition caused more people to move into the historic district." },
            { value: "d", label: "The recognition eliminated all cultural traditions of the city." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "El último párrafo termina con una pregunta. ¿Cuál es esa pregunta y qué opinas tú? Responde con dos oraciones.",
          placeholder: "Responde en inglés o español...",
          answer: ["quien", "quién", "who", "right", "derecho", "historia", "history", "preservacion", "preservación", "preservation"]
        },
        {
          type: "mc",
          prompt: "How does the text characterize Getsemaní?",
          options: [
            { value: "a", label: "As a purely tourist neighborhood with no residents." },
            { value: "b", label: "As both a symbol of displacement and a symbol of cultural resistance." },
            { value: "c", label: "As an area that was always wealthy and well-preserved." },
            { value: "d", label: "As a neighborhood that rejected all outside investment." }
          ],
          answer: "b"
        }
      ]
    },

    // ── Day 5 — Stem-Change Practice ──────────────────────────────────────────
    "sp2-day-05-stem-change": {
      title: "Day 5 — Stem-Changing -IR Preterite",
      dayLabel: "Day 5",
      kindLabel: "Practice",
      type: "practice",
      minutes: 14,
      description: "Practice the third-person-heavy stem-changing -ir verbs in travel and hospitality contexts.",
      instructions: "Remember: these changes happen only in the third person (él/ella, ellos/ellas) in the preterite.",
      objectives: [
        "I can use pidió, durmió, and prefirió correctly in context.",
        "I can recognize where the stem change does and does not happen."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Choose the correct form: Ella ____ una arepa en el restaurante. (pedir)",
          options: [
            { value: "a", label: "pidió" },
            { value: "b", label: "pedió" },
            { value: "c", label: "pidiste" },
            { value: "d", label: "pedimos" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Complete the sentence: El turista ____ en el hotel. (dormir)",
          placeholder: "preterite form",
          answer: ["durmio", "durmió"]
        },
        {
          type: "mc",
          prompt: "Which sentence is correct?",
          options: [
            { value: "a", label: "Nosotros preferimos el café ayer." },
            { value: "b", label: "Nosotros prefirimos el café ayer." },
            { value: "c", label: "Nosotros prefirió el café ayer." },
            { value: "d", label: "Nosotros prefirieron el café ayer." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the third-person plural form of pedir in the preterite.",
          placeholder: "preterite form",
          answer: ["pidieron"]
        },
        {
          type: "mc",
          prompt: "Why is nosotros different from él/ella in this preterite stem-change set?",
          options: [
            { value: "a", label: "Because the stem change does not happen in nosotros." },
            { value: "b", label: "Because nosotros always becomes -yeron." },
            { value: "c", label: "Because the ending changes to -aba." },
            { value: "d", label: "Because Colombia uses a different tense." }
          ],
          answer: "a"
        }
      ]
    },

    // ── Day 5 — Drill ─────────────────────────────────────────────────────────
    "sp2-day-05-drill": {
      title: "Day 5 — Stem-Change -IR Preterite Drill",
      dayLabel: "Day 5",
      kindLabel: "Drill",
      type: "drill",
      minutes: 10,
      lives: 3,
      description: "Type the stem-change preterite form for each prompt. Changes only in él/ella and ellos/ellas.",
      instructions: "Type the preterite form for the given subject. Remember: e→i and o→u changes ONLY in 3rd person.",
      objectives: [
        "I can produce the stem-change preterite form accurately.",
        "I can recognize which subjects trigger the change."
      ],
      items: [
        { prompt: "ella — pedir (preterite)", answer: "pidio", hint: "e→i in ella: pidió" },
        { prompt: "ellos — dormir (preterite)", answer: "durmieron", hint: "o→u in ellos: durmieron" },
        { prompt: "él — preferir (preterite)", answer: "prefiro", hint: "e→i in él: prefirió" },
        { prompt: "yo — pedir (preterite)", answer: "pedi", hint: "No stem change in yo: pedí" },
        { prompt: "nosotros — dormir (preterite)", answer: "dormimos", hint: "No stem change in nosotros: dormimos" },
        { prompt: "ellas — servir (preterite)", answer: "sirvieron", hint: "e→i in ellas: sirvieron" },
        { prompt: "él — sentir (preterite)", answer: "sintio", hint: "e→i in él: sintió" },
        { prompt: "tú — preferir (preterite)", answer: "preferiste", hint: "No stem change in tú: preferiste" },
        { prompt: "ella — morir (preterite)", answer: "murio", hint: "o→u in ella: murió" },
        { prompt: "ellos — pedir (preterite)", answer: "pidieron", hint: "e→i in ellos: pidieron" }
      ]
    },

    // ── Day 6 — Irregular Practice ─────────────────────────────────────────────
    "sp2-day-06-irregulars": {
      title: "Day 6 — decir / traer / venir",
      dayLabel: "Day 6",
      kindLabel: "Practice",
      type: "practice",
      minutes: 15,
      description: "Practice the high-frequency irregular preterite verbs in dialogue and travel storytelling.",
      instructions: "Look for the stems dij-, traj-, and vin- as you answer.",
      objectives: [
        "I can use dije, traje, and vine in context.",
        "I can recognize the plural endings of these irregulars."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Choose the correct sentence:",
          options: [
            { value: "a", label: "Yo dije la verdad sobre el viaje." },
            { value: "b", label: "Yo dicé la verdad sobre el viaje." },
            { value: "c", label: "Yo dijo la verdad sobre el viaje." },
            { value: "d", label: "Yo decir la verdad sobre el viaje." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Complete the sentence: Nosotros ____ regalos para la familia. (traer)",
          placeholder: "preterite form",
          answer: ["trajimos"]
        },
        {
          type: "mc",
          prompt: "Choose the best form: Ella ____ a Colombia el verano pasado. (venir)",
          options: [
            { value: "a", label: "vino" },
            { value: "b", label: "venió" },
            { value: "c", label: "vine" },
            { value: "d", label: "venimos" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the ellos form of decir in the preterite.",
          placeholder: "preterite form",
          answer: ["dijeron"]
        },
        {
          type: "mc",
          prompt: "Which sentence could appear in an airport dialogue?",
          options: [
            { value: "a", label: "Le traje mi pasaporte al agente." },
            { value: "b", label: "Trajé mi pasaporte al agente." },
            { value: "c", label: "Traía mi pasaporte al agente ayer." },
            { value: "d", label: "Trajo mi pasaporte al agente yo." }
          ],
          answer: "a"
        }
      ]
    },

    // ── Day 6 — Irregular Drill ────────────────────────────────────────────────
    "sp2-day-06-drill": {
      title: "Day 6 — Irregular Preterite Drill",
      dayLabel: "Day 6",
      kindLabel: "Drill",
      type: "drill",
      minutes: 10,
      lives: 3,
      description: "Type the correct irregular preterite form. No accent marks on most of these stems — but stay alert!",
      instructions: "Type the preterite form for the given subject and verb. Accents optional.",
      objectives: [
        "I can produce the stems dij-, traj-, and vin- correctly.",
        "I can apply all six subjects without notes."
      ],
      items: [
        { prompt: "yo — decir (preterite)", answer: "dije", hint: "decir stem: dij- → dije" },
        { prompt: "él — decir (preterite)", answer: "dijo", hint: "decir stem: dij- → dijo" },
        { prompt: "ellos — decir (preterite)", answer: "dijeron", hint: "decir stem: dij- → dijeron" },
        { prompt: "yo — traer (preterite)", answer: "traje", hint: "traer stem: traj- → traje" },
        { prompt: "ella — traer (preterite)", answer: "trajo", hint: "traer stem: traj- → trajo" },
        { prompt: "nosotros — traer (preterite)", answer: "trajimos", hint: "traer stem: traj- → trajimos" },
        { prompt: "yo — venir (preterite)", answer: "vine", hint: "venir stem: vin- → vine" },
        { prompt: "él — venir (preterite)", answer: "vino", hint: "venir stem: vin- → vino" },
        { prompt: "nosotros — venir (preterite)", answer: "vinimos", hint: "venir stem: vin- → vinimos" },
        { prompt: "ellas — venir (preterite)", answer: "vinieron", hint: "venir stem: vin- → vinieron" },
        { prompt: "nosotros — decir (preterite)", answer: "dijimos", hint: "decir stem: dij- → dijimos" },
        { prompt: "ellos — traer (preterite)", answer: "trajeron", hint: "traer stem: traj- → trajeron" }
      ]
    },

    // ── Day 7 — L2 Culture Reading ─────────────────────────────────────────────
    "sp2-day-07-culture-l2": {
      title: "La música colombiana y su historia",
      dayLabel: "Day 7",
      kindLabel: "Reading",
      type: "reading",
      tier: "l2",
      audioUrl: "audio/sp2-day-07-culture-l2.mp3",
      minutes: 16,
      description: "Read a past-tense culture passage about Colombian music and community — and check for preterite verbs.",
      instructions: "Look for preterite verbs as you read. Answer the questions using information from the text.",
      glossary: [
        "el ritmo = the rhythm / beat",
        "nació = was born / originated",
        "se mezcló = mixed together",
        "el acordeón = the accordion",
        "la herencia = the heritage / legacy",
        "declaró = declared"
      ],
      passage: [
        "Colombia tiene una historia musical muy rica. La cumbia nació en la región caribeña y se mezcló con tradiciones africanas, indígenas, y europeas. Por siglos, la gente bailó cumbia en celebraciones y festividades de las comunidades costeras.",
        "El vallenato también tiene una historia larga. Se originó en el norte de Colombia y mezcló el acordeón — que llegó de Europa — con ritmos e instrumentos africanos e indígenas. Grandes cantantes como Carlos Vives grabaron versiones modernas del vallenato en los años noventa y llevaron esta música a todo el mundo.",
        "En 2015, la UNESCO declaró el vallenato Patrimonio Cultural Inmaterial de la Humanidad. Esta declaración reconoció la importancia histórica y cultural de la música para las comunidades del norte de Colombia. Para muchas familias de esa región, el vallenato no es solo entretenimiento — es una forma de recordar de dónde vienen y qué vivieron sus abuelos."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Where did cumbia originate?",
          options: [
            { value: "a", label: "In the Andean mountains" },
            { value: "b", label: "In the Caribbean coastal region" },
            { value: "c", label: "In Bogotá" },
            { value: "d", label: "In the Amazon rainforest" }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Name one preterite verb from the reading (any form).",
          placeholder: "preterite form",
          answer: ["nacio", "nació", "mezclo", "mezcló", "origino", "originó", "grabo", "grabó", "llevo", "llevó", "declaro", "declaró", "bailo", "bailó", "llego", "llegó"]
        },
        {
          type: "mc",
          prompt: "What did UNESCO declare in 2015?",
          options: [
            { value: "a", label: "That cumbia was the national anthem of Colombia." },
            { value: "b", label: "That vallenato is an Intangible Cultural Heritage of Humanity." },
            { value: "c", label: "That Carlos Vives was the best artist of the year." },
            { value: "d", label: "That Colombian music was only African in origin." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "What is the accordion's origin according to the reading?",
          placeholder: "English or Spanish",
          answer: ["europe", "europa", "european", "europeo", "came from europe", "llego de europa", "llegó de europa"]
        },
        {
          type: "mc",
          prompt: "What does the text say vallenato means to many families in northern Colombia?",
          options: [
            { value: "a", label: "Just entertainment" },
            { value: "b", label: "A way to remember where they come from and what their grandparents lived" },
            { value: "c", label: "A form of modern pop music" },
            { value: "d", label: "A competition with other countries" }
          ],
          answer: "b"
        }
      ]
    },

    // ── Day 7 — Heritage Culture Reading ──────────────────────────────────────
    "sp2-day-07-culture-heritage": {
      title: "El vallenato como patrimonio: tradición y globalización",
      dayLabel: "Day 7",
      kindLabel: "Reading",
      type: "reading",
      tier: "heritage",
      audioUrl: "audio/sp2-day-07-culture-heritage.mp3",
      minutes: 22,
      description: "Un análisis crítico del vallenato como expresión cultural — su historia, su reconocimiento internacional, y las tensiones que genera su popularización global.",
      instructions: "Lee críticamente. Las preguntas requieren que analices argumentos, detectes tensiones, y conectes el texto con perspectivas propias o de tu comunidad.",
      glossary: [
        "el patrimonio inmaterial = las tradiciones, músicas y saberes que una comunidad hereda, en contraste con los edificios o monumentos físicos",
        "la mercantilización = el proceso de convertir algo cultural o humano en producto comercial",
        "la autenticidad = la cualidad de ser genuino, no alterado para satisfacer expectativas externas"
      ],
      passage: [
        "Cuando la UNESCO declaró el vallenato Patrimonio Cultural Inmaterial de la Humanidad en 2015, Colombia celebró el reconocimiento como una validación internacional de su identidad cultural. Sin embargo, este tipo de declaraciones raramente son simples: al nombrar una práctica cultural como 'patrimonio', se crea automáticamente una tensión entre la preservación auténtica y la presentación para el consumo externo.",
        "El vallenato nació de una fusión de tradiciones africanas, indígenas, y europeas en la región del Caribe colombiano. Durante generaciones, fue una música profundamente local — cantada en parrandas familiares, en mercados, y en celebraciones de comunidades rurales del departamento del Magdalena y La Guajira. Su llegada a las ciudades en el siglo XX fue el comienzo de una transformación que se aceleró con la popularización internacional del género por artistas como Carlos Vives en la década de los noventa.",
        "La versión del vallenato que conoce el mundo hoy es, en muchos sentidos, una versión editada. Las letras más complejas sobre violencia, amor prohibido, o crítica social que caracterizaban al vallenato clásico con frecuencia desaparecen de las versiones comerciales. El Festival de la Leyenda Vallenata en Valledupar, que empezó como un evento local en 1968, se convirtió en un espectáculo nacional e internacional — con todo lo que eso implica para la dinámica entre los músicos tradicionales y la industria cultural.",
        "¿Significa esto que el vallenato está en peligro? No necesariamente. La vitalidad de una expresión cultural no depende solo de su pureza original, sino de su capacidad para ser reinterpretada por nuevas generaciones sin perder su núcleo esencial. La pregunta más productiva no es '¿es auténtico?', sino '¿quién lo interpreta, para quién, y bajo qué condiciones económicas y culturales?'"
      ],
      questions: [
        {
          type: "mc",
          prompt: "¿Qué tensión identifica el texto con respecto a la declaración de la UNESCO?",
          options: [
            { value: "a", label: "Que Colombia no quería recibir el reconocimiento internacional." },
            { value: "b", label: "Que nombrar algo como 'patrimonio' crea tensión entre preservación auténtica y consumo externo." },
            { value: "c", label: "Que el vallenato no tiene influencias africanas ni indígenas." },
            { value: "d", label: "Que el Festival de Valledupar terminó después de la declaración." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "¿Qué elementos desaparecen del vallenato en sus versiones comerciales, según el texto? ¿Por qué crees que pasa esto?",
          placeholder: "Responde en inglés o español...",
          answer: ["letras", "violencia", "amor prohibido", "critica social", "complex lyrics", "violence", "prohibited love", "social criticism", "commercial", "comercial"]
        },
        {
          type: "mc",
          prompt: "How does the text define the 'most productive question' about vallenato's authenticity?",
          options: [
            { value: "a", label: "¿Es auténtico o no?" },
            { value: "b", label: "¿Quién lo interpreta, para quién, y bajo qué condiciones?" },
            { value: "c", label: "¿Cuántos artistas lo graban?" },
            { value: "d", label: "¿Cuántas canciones antiguas existen?" }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Conecta este texto con algo que hayas observado en tu propia comunidad o cultura. ¿Hay una expresión cultural que haya sido 'editada' o comercializada? Describe brevemente.",
          placeholder: "Responde en inglés o español — 2-3 oraciones...",
          answer: ["music", "musica", "música", "tradition", "tradicion", "comercial", "commercial", "culture", "cultura", "changed", "cambiado", "edited", "editado"]
        },
        {
          type: "mc",
          prompt: "What does the text ultimately suggest about whether vallenato is 'in danger'?",
          options: [
            { value: "a", label: "Yes — it is completely destroyed by commercialization." },
            { value: "b", label: "Not necessarily — what matters is its capacity to be reinterpreted without losing its core." },
            { value: "c", label: "Yes — but only because of foreign tourists." },
            { value: "d", label: "No — because it has never changed at all." }
          ],
          answer: "b"
        }
      ]
    },

    // ── Day 8 ──────────────────────────────────────────────────────────────────
    "sp2-day-08-project-launch": {
      title: "Day 8 Project Launch",
      dayLabel: "Day 8",
      kindLabel: "Project",
      type: "resource",
      minutes: 12,
      description: "Choose a clear Colombia topic and map out how your group will use the preterite accurately.",
      callout: "Your project should sound like a short news report, travel story, or culture feature — not a random list of facts.",
      objectives: [
        "I can choose a focused topic tied to Day 1.",
        "I can plan 8–12 sentences that use the preterite accurately.",
        "I can identify two sources and one visual direction."
      ],
      checklist: [
        "Choose a format: newscast, travel blog, podcast script, or infographic.",
        "Write which preterite patterns must appear.",
        "Collect at least two sources.",
        "Draft the first paragraph before class ends."
      ],
      sections: [
        {
          title: "Grammar Requirements",
          bullets: [
            "Use at least one regular preterite form.",
            "Use at least one -car/-gar/-zar form.",
            "Use at least one stem-changing -ir or irregular form.",
            "Make sure your verbs match the subject."
          ]
        },
        {
          title: "Topic Frames",
          bullets: [
            "Nuestra investigación mostró que ...",
            "Visitamos / aprendimos / escuchamos ...",
            "La comunidad apoyó ...",
            "El evento empezó / terminó ..."
          ]
        }
      ],
      reflectionPrompts: [
        "What story does your project want to tell?",
        "Which preterite pattern are you most confident about?",
        "Which section of the draft should your group write first?"
      ]
    },

    // ── Day 9 ──────────────────────────────────────────────────────────────────
    "sp2-day-09-project-checkpoint": {
      title: "Day 9 Project Checkpoint",
      dayLabel: "Day 9",
      kindLabel: "Project",
      type: "resource",
      minutes: 10,
      description: "Check the script, visuals, and grammar accuracy before rehearsal and presentations.",
      objectives: [
        "I can check my group's draft for preterite accuracy.",
        "I can identify one place where our message needs more detail."
      ],
      checklist: [
        "Every verb has a subject.",
        "Spelling-change verbs are correct.",
        "At least one irregular form appears accurately.",
        "Visuals and citations match the facts."
      ],
      sections: [
        {
          title: "Peer Edit Focus",
          bullets: [
            "Check fui / fue / fueron carefully.",
            "Check y-verbs and irregular plural forms carefully.",
            "Mark any sentence that sounds translated instead of natural.",
            "Practice the opening and closing out loud."
          ]
        }
      ],
      reflectionPrompts: [
        "Which sentence still needs revision?",
        "Which verb form should your group double-check before presenting?",
        "What is your strongest visual or statistic right now?"
      ]
    },

    // ── Day 10 ─────────────────────────────────────────────────────────────────
    "sp2-day-10-presentations": {
      title: "Day 10 Audience Reflection",
      dayLabel: "Day 10",
      kindLabel: "Presentation",
      type: "resource",
      minutes: 10,
      description: "Stay active during presentations by listening for content, grammar, and one strong takeaway.",
      objectives: [
        "I can listen for a specific preterite verb pattern.",
        "I can ask a past-tense follow-up question."
      ],
      checklist: [
        "Write the group topic.",
        "Notice one accurate preterite form.",
        "Notice one fact about Colombia.",
        "Prepare one question in the past tense."
      ],
      sections: [
        {
          title: "Question Stems",
          bullets: [
            "¿Qué pasó primero?",
            "¿Qué aprendieron ustedes sobre ...?",
            "¿Qué trajeron o mostraron en la investigación?",
            "¿Por qué fue importante ...?"
          ]
        }
      ],
      reflectionPrompts: [
        "Which project had the clearest story?",
        "Which project used preterite forms most effectively?",
        "What one new Colombia fact will you remember?"
      ]
    },

    // ── Day 11 ─────────────────────────────────────────────────────────────────
    "sp2-day-11-encanto-1": {
      title: "Day 11 Encanto Part 1 Tracker",
      dayLabel: "Day 11",
      kindLabel: "Film",
      type: "resource",
      minutes: 12,
      description: "Track verbs, character actions, and setting details during Part 1 of Encanto.",
      callout: "Focus on what happened in the plot and how the setting connects loosely to Colombia, while remembering that the film is fictional.",
      objectives: [
        "I can retell early plot events in the preterite.",
        "I can notice vocabulary connected to family and place."
      ],
      checklist: [
        "Write at least five verbs you hear or can use after the scene.",
        "Track one setting detail that feels connected to Colombia.",
        "Track one family conflict or pressure point."
      ],
      sections: [
        {
          title: "Useful Verbs",
          bullets: [
            "vio / vio que ...",
            "dijo / dijeron ...",
            "llegó / llegaron ...",
            "empezó / terminó ..."
          ]
        }
      ],
      reflectionPrompts: [
        "What happened first in Part 1?",
        "Which character created the most tension so far?",
        "What real Colombia idea does the setting remind you of?"
      ]
    },

    // ── Day 12 ─────────────────────────────────────────────────────────────────
    "sp2-day-12-encanto-2": {
      title: "Day 12 Encanto Discussion Prep",
      dayLabel: "Day 12",
      kindLabel: "Film",
      type: "resource",
      minutes: 12,
      description: "Use these prompts after the ending to retell key events and compare the film to class learning.",
      objectives: [
        "I can summarize the ending with preterite verbs.",
        "I can make a respectful comparison between the film and our unit."
      ],
      checklist: [
        "Retell two key events in order.",
        "Use at least one irregular preterite verb.",
        "Connect one idea back to Day 1 or Day 7 culture work."
      ],
      sections: [
        {
          title: "Discussion Stems",
          bullets: [
            "Al final, la familia ...",
            "El personaje principal decidió ...",
            "Una conexión con Colombia fue ...",
            "La película mostró ..., pero no explicó ..."
          ]
        }
      ],
      reflectionPrompts: [
        "What event mattered most in the ending?",
        "Which preterite verb could you use to retell that event?",
        "What does the film invite you to learn more about?"
      ]
    },

    // ── Day 13 ─────────────────────────────────────────────────────────────────
    "sp2-day-13-review": {
      title: "Day 13 — Colombia Preterite Review",
      dayLabel: "Day 13",
      kindLabel: "Review",
      type: "practice",
      minutes: 15,
      description: "Mixed review — check the full preterite sequence before the review stations and exam.",
      instructions: "Answer without notes first. Use the results to decide which station to focus on in class.",
      objectives: [
        "I can identify which preterite pattern still needs review.",
        "I can apply the right verb form in context."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Choose the correct sentence:",
          options: [
            { value: "a", label: "Yo saqué fotos en Cartagena." },
            { value: "b", label: "Yo sacé fotos en Cartagena." },
            { value: "c", label: "Yo sacar fotos en Cartagena." },
            { value: "d", label: "Yo saquó fotos en Cartagena." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the third-person singular of dormir in the preterite.",
          placeholder: "preterite form",
          answer: ["durmio", "durmió"]
        },
        {
          type: "mc",
          prompt: "Which form is correct for ellos + decir?",
          options: [
            { value: "a", label: "dijeron" },
            { value: "b", label: "decieron" },
            { value: "c", label: "dijieron" },
            { value: "d", label: "dicearon" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write one -y verb preterite form from the unit.",
          placeholder: "preterite form",
          answer: ["leyo", "leyó", "oyo", "oyó", "creyo", "creyó", "leyeron", "oyeron", "creyeron"]
        },
        {
          type: "mc",
          prompt: "Choose the best sentence for nosotros + venir:",
          options: [
            { value: "a", label: "Nosotros vinimos a Colombia." },
            { value: "b", label: "Nosotros venimos a Colombia ayer." },
            { value: "c", label: "Nosotros vino a Colombia." },
            { value: "d", label: "Nosotros venímos a Colombia." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the ella form of pedir in the preterite.",
          placeholder: "preterite form",
          answer: ["pidio", "pidió"]
        },
        {
          type: "mc",
          prompt: "Choose the correct yo preterite for llegar:",
          options: [
            { value: "a", label: "llegué" },
            { value: "b", label: "llegé" },
            { value: "c", label: "llegó" },
            { value: "d", label: "llegaron" }
          ],
          answer: "a"
        }
      ]
    },

    // ── Day 14 ─────────────────────────────────────────────────────────────────
    "sp2-day-14-study": {
      title: "Day 14 Study Guide Check",
      dayLabel: "Day 14",
      kindLabel: "Study Guide",
      type: "practice",
      minutes: 15,
      description: "Final check-in before the Colombia unit exam. Review, not a test.",
      callout: "If one section feels shaky, return to the related day card or your classroom packet before the exam.",
      objectives: [
        "I can decide which preterite patterns need final review."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Choose the correct yo form of pagar:",
          options: [
            { value: "a", label: "pagué" },
            { value: "b", label: "pagé" },
            { value: "c", label: "pagó" },
            { value: "d", label: "paguéron" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the correct form: Ella ____ un artículo sobre Colombia. (leer)",
          placeholder: "preterite form",
          answer: ["leyo", "leyó"]
        },
        {
          type: "mc",
          prompt: "Choose the best form: Ellos ____ recuerdos al hotel. (traer)",
          options: [
            { value: "a", label: "trajeron" },
            { value: "b", label: "traeron" },
            { value: "c", label: "trajeronon" },
            { value: "d", label: "trajimos" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the third-person plural form of pedir in the preterite.",
          placeholder: "preterite form",
          answer: ["pidieron"]
        },
        {
          type: "mc",
          prompt: "Which sentence is accurate?",
          options: [
            { value: "a", label: "Nosotros creímos que el viaje fue increíble." },
            { value: "b", label: "Nosotros creyimos que el viaje fue increíble." },
            { value: "c", label: "Nosotros creyeron que el viaje fue increíble." },
            { value: "d", label: "Nosotros creeron que el viaje fue increíble." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the yo form of empezar in the preterite.",
          placeholder: "preterite form",
          answer: ["empece", "empecé"]
        }
      ]
    },

    // ─── DAILY WARM-UP ACTIVITIES ─────────────────────────────────────────────
    "sp2-warmup-day02": {
      title: "Day 2 Warm-Up: Colombia Geography Review",
      dayLabel: "Day 2",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Quick review of Day 1 Colombia geography and preterite reporting frames.",
      instructions: "Answer without notes. Use the preterite to report what you learned on Day 1.",
      objectives: [
        "I can name key Colombia regions and cities.",
        "I can use a preterite reporting frame to share one fact."
      ],
      questions: [
        { type: "mc", prompt: "Which city is the capital of Colombia?", options: [{ value: "a", label: "Cartagena" }, { value: "b", label: "Medellín" }, { value: "c", label: "Bogotá" }, { value: "d", label: "Cali" }], answer: "c" },
        { type: "mc", prompt: "Which region is known for coffee production?", options: [{ value: "a", label: "Caribbean coast" }, { value: "b", label: "Eje cafetero (Coffee Region)" }, { value: "c", label: "Amazon basin" }, { value: "d", label: "Pacific coast" }], answer: "b" },
        { type: "short", prompt: "Complete the sentence: Aprendí que Colombia tiene ___.", placeholder: "any fact in Spanish or English", answer: ["cafe", "café", "coffee", "biodiversidad", "biodiversity", "selva", "jungle", "musica", "música", "music", "costa", "coast", "montanas", "montañas", "mountains"] },
        { type: "mc", prompt: "Which preterite frame means 'I learned that...'?", options: [{ value: "a", label: "Aprendí que ..." }, { value: "b", label: "Aprendo que ..." }, { value: "c", label: "Aprenderé que ..." }, { value: "d", label: "Aprendemos que ..." }], answer: "a" }
      ]
    },

    "sp2-warmup-day03": {
      title: "Day 3 Warm-Up: Travel Vocab in the Preterite",
      dayLabel: "Day 3",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Review Day 2 travel vocabulary by matching words to preterite sentence contexts.",
      instructions: "Choose the correct word or form to complete each sentence.",
      objectives: [
        "I can use travel vocabulary in a past-tense sentence.",
        "I can recognize regular preterite endings for -AR, -ER, and -IR verbs."
      ],
      questions: [
        { type: "mc", prompt: "Which word means 'luggage'?", options: [{ value: "a", label: "el vuelo" }, { value: "b", label: "el equipaje" }, { value: "c", label: "el pasaporte" }, { value: "d", label: "la aduana" }], answer: "b" },
        { type: "short", prompt: "Complete the sentence: Llegamos al ___ a las ocho de la mañana.", placeholder: "travel word", answer: ["aeropuerto", "el aeropuerto"] },
        { type: "mc", prompt: "Which sentence uses the preterite correctly?", options: [{ value: "a", label: "Nosotros compramos los boletos ayer." }, { value: "b", label: "Nosotros compramos los boletos mañana." }, { value: "c", label: "Nosotros compramos los boletos siempre." }, { value: "d", label: "Nosotros compramos los boletos cada día." }], answer: "a" },
        { type: "short", prompt: "Write the Spanish word for 'flight'.", placeholder: "Spanish word", answer: ["vuelo", "el vuelo"] }
      ]
    },

    "sp2-warmup-day04": {
      title: "Day 4 Warm-Up: -CAR/-GAR/-ZAR Quick Check",
      dayLabel: "Day 4",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Check your yo-form spelling changes from Day 3 before moving to -Y verb preterites.",
      instructions: "Apply the spelling change rules in the yo form only.",
      objectives: [
        "I can produce saqué, pagué, and empecé correctly.",
        "I can explain why the spelling changes happen."
      ],
      questions: [
        { type: "mc", prompt: "What is the yo preterite of sacar?", options: [{ value: "a", label: "sacé" }, { value: "b", label: "saqué" }, { value: "c", label: "sacó" }, { value: "d", label: "sacé" }], answer: "b" },
        { type: "short", prompt: "Write the yo preterite of llegar.", placeholder: "preterite form", answer: ["llegue", "llegué"] },
        { type: "mc", prompt: "Why does buscar → busqué in yo?", options: [{ value: "a", label: "To keep the hard /k/ sound before -é." }, { value: "b", label: "Because all yo forms add a qu." }, { value: "c", label: "Because buscar is irregular." }, { value: "d", label: "To match the plural ending." }], answer: "a" },
        { type: "short", prompt: "Write the yo preterite of empezar.", placeholder: "preterite form", answer: ["empece", "empecé"] }
      ]
    },

    "sp2-warmup-day05": {
      title: "Day 5 Warm-Up: -Y Verb Preterites + Cartagena Review",
      dayLabel: "Day 5",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Review the Day 4 Cartagena reading and -Y verb preterite forms (leer, oír, creer).",
      instructions: "These verbs add -y in the third person: leyó, oyó, creyó.",
      objectives: [
        "I can produce -Y verb preterite forms.",
        "I can recall one detail from the Cartagena reading."
      ],
      questions: [
        { type: "mc", prompt: "What is the ella preterite of leer?", options: [{ value: "a", label: "leió" }, { value: "b", label: "leyó" }, { value: "c", label: "leó" }, { value: "d", label: "leeó" }], answer: "b" },
        { type: "short", prompt: "Write the ellos preterite of oír.", placeholder: "preterite form", answer: ["oyeron"] },
        { type: "mc", prompt: "From the Day 4 reading: Where did the Restrepo family go?", options: [{ value: "a", label: "Bogotá" }, { value: "b", label: "Cartagena" }, { value: "c", label: "Medellín" }, { value: "d", label: "Cali" }], answer: "b" },
        { type: "mc", prompt: "Which sentence is correct?", options: [{ value: "a", label: "Ella creyó la historia." }, { value: "b", label: "Ella creió la historia." }, { value: "c", label: "Ella creyeron la historia." }, { value: "d", label: "Ella creeron la historia." }], answer: "a" }
      ]
    },

    "sp2-warmup-day06": {
      title: "Day 6 Warm-Up: Stem-Changing -IR Preterites",
      dayLabel: "Day 6",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Review Day 5 stem-changing -IR preterites: pedir, dormir, preferir.",
      instructions: "Remember: these changes (e→i, o→u) happen only in él/ella and ellos/ellas.",
      objectives: [
        "I can produce pidió, durmió, and prefirió correctly.",
        "I can identify which subjects do NOT trigger the stem change."
      ],
      questions: [
        { type: "mc", prompt: "What is the ella preterite of pedir?", options: [{ value: "a", label: "pedió" }, { value: "b", label: "pidió" }, { value: "c", label: "piden" }, { value: "d", label: "pediste" }], answer: "b" },
        { type: "short", prompt: "Write the él preterite of dormir.", placeholder: "preterite form", answer: ["durmio", "durmió"] },
        { type: "mc", prompt: "Which subject does NOT trigger the stem change?", options: [{ value: "a", label: "él" }, { value: "b", label: "ella" }, { value: "c", label: "nosotros" }, { value: "d", label: "ellos" }], answer: "c" },
        { type: "short", prompt: "Write the ellos preterite of pedir.", placeholder: "preterite form", answer: ["pidieron"] }
      ]
    },

    "sp2-warmup-day07": {
      title: "Day 7 Warm-Up: Irregular Preterites Review",
      dayLabel: "Day 7",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Review Day 6 irregular preterites: decir (dij-), traer (traj-), venir (vin-).",
      instructions: "These verbs share the same ending pattern. No written accent marks on the yo and él forms.",
      objectives: [
        "I can produce dije, traje, and vine.",
        "I can use the plural forms dijeron, trajeron, vinieron."
      ],
      questions: [
        { type: "mc", prompt: "What is the yo preterite of decir?", options: [{ value: "a", label: "decí" }, { value: "b", label: "dicé" }, { value: "c", label: "dije" }, { value: "d", label: "deció" }], answer: "c" },
        { type: "short", prompt: "Write the nosotros preterite of traer.", placeholder: "preterite form", answer: ["trajimos"] },
        { type: "mc", prompt: "Choose the correct sentence:", options: [{ value: "a", label: "Ellos dijeron que Colombia es hermosa." }, { value: "b", label: "Ellos decieron que Colombia es hermosa." }, { value: "c", label: "Ellos dijieron que Colombia es hermosa." }, { value: "d", label: "Ellos dicearon que Colombia es hermosa." }], answer: "a" },
        { type: "short", prompt: "Write the ella preterite of venir.", placeholder: "preterite form", answer: ["vino"] }
      ]
    },

    "sp2-warmup-day08": {
      title: "Day 8 Warm-Up: Colombian Music Culture Review",
      dayLabel: "Day 8",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Review Day 7 Colombian music culture — vallenato, cumbia, and UNESCO recognition.",
      instructions: "Use the reading and your class notes to recall cultural details.",
      objectives: [
        "I can recall key facts about vallenato and cumbia.",
        "I can use a preterite verb to report what happened in music history."
      ],
      questions: [
        { type: "mc", prompt: "Which organization recognized vallenato as Intangible Cultural Heritage?", options: [{ value: "a", label: "UNESCO" }, { value: "b", label: "ONU" }, { value: "c", label: "FIFA" }, { value: "d", label: "La OEA" }], answer: "a" },
        { type: "short", prompt: "Name one instrument associated with vallenato.", placeholder: "instrument name", answer: ["acordeon", "acordeón", "accordion", "caja", "guacharaca"] },
        { type: "mc", prompt: "Which preterite sentence describes the UNESCO event?", options: [{ value: "a", label: "UNESCO declaró el vallenato Patrimonio Cultural Inmaterial en 2015." }, { value: "b", label: "UNESCO declara el vallenato Patrimonio Cultural Inmaterial en 2015." }, { value: "c", label: "UNESCO va a declarar el vallenato en 2015." }, { value: "d", label: "UNESCO declarará el vallenato en 2015." }], answer: "a" },
        { type: "mc", prompt: "Cumbia originated from a mix of which three traditions?", options: [{ value: "a", label: "African, Indigenous, and European" }, { value: "b", label: "Spanish, Indigenous, and Asian" }, { value: "c", label: "African, European, and North American" }, { value: "d", label: "Andean, Caribbean, and Pacific" }], answer: "a" }
      ]
    },

    "sp2-warmup-day09": {
      title: "Day 9 Warm-Up: Project Grammar Requirements",
      dayLabel: "Day 9",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Review Day 8 project launch — grammar requirements before the checkpoint session.",
      instructions: "Check that your draft meets the preterite requirements from the Day 8 checklist.",
      objectives: [
        "I can identify which preterite patterns my draft includes.",
        "I can use a preterite language frame for project presentation."
      ],
      questions: [
        { type: "mc", prompt: "Which grammar requirement was NOT listed for the project?", options: [{ value: "a", label: "At least one -CAR/-GAR/-ZAR spelling change" }, { value: "b", label: "At least one stem-changing -IR or irregular form" }, { value: "c", label: "At least one conditional tense verb" }, { value: "d", label: "At least one regular preterite form" }], answer: "c" },
        { type: "short", prompt: "Complete the project frame: Nuestra investigación ___ que ...", placeholder: "preterite verb", answer: ["mostro", "mostró", "revelo", "reveló", "encontro", "encontró"] },
        { type: "mc", prompt: "Which sentence correctly uses a project language frame?", options: [{ value: "a", label: "Visitamos Cartagena y aprendimos sobre las murallas." }, { value: "b", label: "Visitar Cartagena y aprender sobre las murallas." }, { value: "c", label: "Visitaremos Cartagena y aprenderemos sobre las murallas." }, { value: "d", label: "Visito Cartagena y aprende sobre las murallas." }], answer: "a" },
        { type: "short", prompt: "Write one sentence about your project using the preterite.", placeholder: "your sentence in Spanish", answer: ["aprendimos", "investigamos", "encontramos", "descubrimos", "mostramos", "dijimos", "escribimos"] }
      ]
    },

    "sp2-warmup-day10": {
      title: "Day 10 Warm-Up: Pre-Presentation Grammar Check",
      dayLabel: "Day 10",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Final grammar review before Day 10 presentations — check irregular and stem-change accuracy.",
      instructions: "Answer without notes to identify any last-minute gaps.",
      objectives: [
        "I can verify my preterite forms before presenting.",
        "I can use past-tense question stems for audience participation."
      ],
      questions: [
        { type: "mc", prompt: "Choose the correct ella form of traer:", options: [{ value: "a", label: "trajo" }, { value: "b", label: "trajó" }, { value: "c", label: "traió" }, { value: "d", label: "trae" }], answer: "a" },
        { type: "short", prompt: "Write the yo preterite of buscar.", placeholder: "preterite form", answer: ["busque", "busqué"] },
        { type: "mc", prompt: "Which past-tense question is correct?", options: [{ value: "a", label: "¿Qué aprendieron ustedes sobre Colombia?" }, { value: "b", label: "¿Qué aprendieran ustedes sobre Colombia?" }, { value: "c", label: "¿Qué aprenden ustedes sobre Colombia?" }, { value: "d", label: "¿Qué aprenderán ustedes sobre Colombia?" }], answer: "a" },
        { type: "short", prompt: "Write the ellos preterite of dormir.", placeholder: "preterite form", answer: ["durmieron"] }
      ]
    },

    "sp2-warmup-day11": {
      title: "Day 11 Warm-Up: Presentation Takeaways",
      dayLabel: "Day 11",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Reflect on Day 10 presentations using preterite past-tense reporting.",
      instructions: "Use the preterite to report what you heard and learned from other groups.",
      objectives: [
        "I can report a takeaway from another group's presentation.",
        "I can use dijo/dijeron, aprendió/aprendieron in context."
      ],
      questions: [
        { type: "mc", prompt: "Which sentence correctly reports what another group said?", options: [{ value: "a", label: "Un grupo dijo que Cartagena fue fundada en 1533." }, { value: "b", label: "Un grupo dice que Cartagena fue fundada en 1533." }, { value: "c", label: "Un grupo dirá que Cartagena fue fundada en 1533." }, { value: "d", label: "Un grupo decir que Cartagena fue fundada en 1533." }], answer: "a" },
        { type: "short", prompt: "Complete: Yo aprendí que Colombia ___.", placeholder: "any fact in Spanish", answer: ["tiene", "es", "fue", "produjo", "exporta", "exportó", "tiene biodiversidad", "tiene cafe", "tiene música"] },
        { type: "mc", prompt: "Which question would work best to follow up after a presentation?", options: [{ value: "a", label: "¿Por qué fue importante ese evento?" }, { value: "b", label: "¿Por qué es importante ese evento?" }, { value: "c", label: "¿Por qué será importante ese evento?" }, { value: "d", label: "¿Por qué fuera importante ese evento?" }], answer: "a" },
        { type: "mc", prompt: "Which verb set is all preterite?", options: [{ value: "a", label: "dijo, trajo, vino, aprendió" }, { value: "b", label: "dice, trae, viene, aprende" }, { value: "c", label: "dijo, trae, vendrá, aprende" }, { value: "d", label: "decía, traía, venía, aprendía" }], answer: "a" }
      ]
    },

    "sp2-warmup-day12": {
      title: "Day 12 Warm-Up: Encanto Part 1 Vocabulary",
      dayLabel: "Day 12",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Review Day 11 Encanto Part 1 key vocabulary and plot events in the preterite.",
      instructions: "Use preterite verbs from your Day 11 notes to retell Part 1 events.",
      objectives: [
        "I can retell two early plot events using the preterite.",
        "I can connect a setting detail from Encanto to a Colombia fact."
      ],
      questions: [
        { type: "mc", prompt: "Which verb correctly retells an Encanto Part 1 event?", options: [{ value: "a", label: "La familia Madrigal recibió poderes mágicos." }, { value: "b", label: "La familia Madrigal recibirá poderes mágicos." }, { value: "c", label: "La familia Madrigal recibe poderes mágicos." }, { value: "d", label: "La familia Madrigal recibía poderes mágicos." }], answer: "a" },
        { type: "short", prompt: "Name one setting detail from Encanto that connects to Colombia.", placeholder: "English or Spanish", answer: ["mountains", "montanas", "montañas", "flowers", "flores", "coffee", "cafe", "café", "colombia", "jungle", "selva", "village", "pueblo"] },
        { type: "mc", prompt: "Which preterite verb could you use to retell a conflict in Part 1?", options: [{ value: "a", label: "empezó" }, { value: "b", label: "empieza" }, { value: "c", label: "empezará" }, { value: "d", label: "empezaba" }], answer: "a" },
        { type: "short", prompt: "Write one preterite sentence about what Mirabel did in Part 1.", placeholder: "sentence in Spanish", answer: ["vio", "dijo", "fue", "llego", "llegó", "descubrio", "descubrió", "encontro", "encontró", "busco", "buscó", "hablo", "habló"] }
      ]
    },

    "sp2-warmup-day13": {
      title: "Day 13 Warm-Up: Encanto Themes + Colombia",
      dayLabel: "Day 13",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Review Day 12 Encanto ending and the connection between film themes and real Colombia.",
      instructions: "Use discussion stems to connect the film to the unit content.",
      objectives: [
        "I can summarize the Encanto ending in two preterite sentences.",
        "I can make one respectful comparison between the film and Colombia."
      ],
      questions: [
        { type: "mc", prompt: "Which sentence correctly summarizes the ending?", options: [{ value: "a", label: "Al final, la familia Madrigal reconstruyó la casa y se reconcilió." }, { value: "b", label: "Al final, la familia Madrigal reconstruye la casa y se reconcilia." }, { value: "c", label: "Al final, la familia Madrigal va a reconstruir la casa." }, { value: "d", label: "Al final, la familia Madrigal reconstruía la casa." }], answer: "a" },
        { type: "short", prompt: "Name one real Colombia connection from Encanto (English or Spanish).", placeholder: "your connection", answer: ["mountains", "montanas", "montañas", "flowers", "flores", "coffee", "cafe", "cafe", "biodiversity", "biodiversidad", "music", "musica", "música", "family", "familia"] },
        { type: "mc", prompt: "Which is a respectful comparison statement?", options: [{ value: "a", label: "La película mostró montañas, pero no explicó la historia real de Colombia." }, { value: "b", label: "La película es exactamente como Colombia en la realidad." }, { value: "c", label: "La película no tiene nada que ver con Colombia." }, { value: "d", label: "La película mostró que Colombia es un lugar de magia solamente." }], answer: "a" },
        { type: "short", prompt: "Write: Una conexión con Colombia fue ___.", placeholder: "any connection in Spanish", answer: ["las montanas", "las montañas", "la musica", "la música", "la familia", "el cafe", "el café", "las flores", "la selva"] }
      ]
    },

    "sp2-warmup-day14": {
      title: "Day 14 Warm-Up: Full Preterite Flash Review",
      dayLabel: "Day 14",
      kindLabel: "Warm-Up",
      type: "practice",
      minutes: 5,
      description: "Quick review of all four preterite patterns before the unit exam.",
      instructions: "Work through each pattern in order: regular, -CAR/-GAR/-ZAR, stem-change, irregular.",
      objectives: [
        "I can identify which preterite pattern each question targets.",
        "I can produce any preterite form in context."
      ],
      questions: [
        { type: "mc", prompt: "[Regular] Choose the correct form: Nosotros ___ mucho en el viaje. (aprender)", options: [{ value: "a", label: "aprendimos" }, { value: "b", label: "aprendemos" }, { value: "c", label: "aprendimos" }, { value: "d", label: "aprendieron" }], answer: "a" },
        { type: "short", prompt: "[-CAR/-GAR/-ZAR] Write the yo preterite of pagar.", placeholder: "preterite form", answer: ["pague", "pagué"] },
        { type: "mc", prompt: "[Stem-change] Which is correct: She served the coffee. (servir)", options: [{ value: "a", label: "Ella sirvió el café." }, { value: "b", label: "Ella servió el café." }, { value: "c", label: "Ella sirvó el café." }, { value: "d", label: "Ella servéó el café." }], answer: "a" },
        { type: "short", prompt: "[Irregular] Write the ellos preterite of traer.", placeholder: "preterite form", answer: ["trajeron"] },
        { type: "mc", prompt: "[-Y verb] Which is the correct ella preterite of oír?", options: [{ value: "a", label: "oyó" }, { value: "b", label: "oió" }, { value: "c", label: "oiyó" }, { value: "d", label: "oó" }], answer: "a" }
      ]
    },

    // ─── LAS 3 P's ACTIVITIES ─────────────────────────────────────────────────
    "sp2-3p-productos": {
      title: "Productos Culturales de Colombia",
      dayLabel: "Bonus",
      kindLabel: "Culture",
      type: "resource",
      minutes: 20,
      description: "Analyze tangible and intangible cultural products from Colombia using the ACTFL 3 P's framework.",
      callout: "ACTFL: Relating Cultural Products to Perspectives — What does this product reveal about Colombian values and identity?",
      objectives: [
        "I can identify at least three tangible and three intangible Colombian cultural products.",
        "I can explain what each product communicates about Colombian culture.",
        "I can use the preterite to describe the origin or history of a cultural product."
      ],
      checklist: [
        "List two tangible products (physical objects) from Colombia.",
        "List two intangible products (music, traditions, literature) from Colombia.",
        "Write one sentence about a product's origin using the preterite.",
        "Connect your product to a Colombian value or belief."
      ],
      sections: [
        {
          title: "Productos Tangibles",
          bullets: [
            "El café colombiano — exported worldwide, symbol of regional pride",
            "La mochila Wayuu — woven bag handmade by Wayuu indigenous artisans",
            "Las flores de Colombia — #2 flower exporter in the world",
            "El sombrero vueltiao — traditional hat from the Caribbean coast, national symbol"
          ]
        },
        {
          title: "Productos Intangibles",
          bullets: [
            "El vallenato — UNESCO Intangible Cultural Heritage of Humanity (2015)",
            "La cumbia — blending of African, Indigenous, and European traditions",
            "Cien años de soledad — Nobel Prize-winning novel by Gabriel García Márquez",
            "El Carnaval de Barranquilla — UNESCO-recognized cultural celebration"
          ]
        },
        {
          title: "Preterite Analysis Frame",
          bullets: [
            "Este producto se originó en ...",
            "La comunidad lo creó para ...",
            "Con el tiempo, se convirtió en símbolo de ...",
            "La UNESCO lo reconoció / declaró en ..."
          ]
        }
      ],
      reflectionPrompts: [
        "Choose one product and write two preterite sentences about its origin.",
        "What does this product tell us about Colombian priorities or values?",
        "How does this product connect to anything you learned in Days 1–7?"
      ]
    },

    "sp2-3p-practicas": {
      title: "Prácticas Culturales de Colombia",
      dayLabel: "Bonus",
      kindLabel: "Culture",
      type: "resource",
      minutes: 20,
      description: "Examine everyday customs, social rituals, and practices that define Colombian daily life — and compare them to your own culture.",
      callout: "ACTFL: Relating Cultural Practices to Perspectives — Why do Colombians do this? What belief or value does this practice express?",
      objectives: [
        "I can describe at least three Colombian cultural practices.",
        "I can make a respectful, specific comparison between a Colombian and US practice.",
        "I can use the preterite to report how a practice developed historically."
      ],
      checklist: [
        "Describe one daily life practice (food, schedule, greetings).",
        "Describe one celebration or annual tradition.",
        "Write one comparison using 'En Colombia, ... pero en los EE.UU., ...'",
        "Write one preterite sentence about how a practice developed or changed."
      ],
      sections: [
        {
          title: "Prácticas Cotidianas",
          bullets: [
            "El tinto — Colombians drink small, strong black coffee multiple times per day",
            "El almuerzo familiar — the main meal of the day, shared as a family",
            "Los saludos — greeting with a kiss on the cheek is standard among friends",
            "La hora colombiana — informal time flexibility at social gatherings"
          ]
        },
        {
          title: "Prácticas Sociales y Celebraciones",
          bullets: [
            "La Cosecha Cafetera — seasonal coffee harvest involves entire communities",
            "El Carnaval de Barranquilla — 4-day pre-Lenten celebration with music, dance, costumes",
            "El Día de las Velitas — December 7 candle-lighting tradition before Christmas",
            "Los mercados campesinos — regular farmers' market culture in towns"
          ]
        },
        {
          title: "Comparison Frames",
          bullets: [
            "En Colombia, la gente ... pero en los EE.UU., la gente ...",
            "Una diferencia que noté fue que ...",
            "Me sorprendió que en Colombia ...",
            "Esta práctica me recuerda a ..."
          ]
        }
      ],
      reflectionPrompts: [
        "Choose one practice and write a preterite sentence about how it developed.",
        "Which practice surprised you most? Why?",
        "What does the practice of el almuerzo familiar tell us about Colombian values?"
      ]
    },

    "sp2-3p-perspectivas": {
      title: "Perspectivas Culturales de Colombia",
      dayLabel: "Bonus",
      kindLabel: "Culture",
      type: "resource",
      minutes: 20,
      description: "Explore the values, beliefs, and attitudes that explain why Colombians create what they create and do what they do.",
      callout: "ACTFL: The Product → Practice → Perspective chain: A product or practice exists because of a deeper perspective. Your job is to find the why.",
      objectives: [
        "I can explain the perspective behind at least two cultural products or practices.",
        "I can follow the Product → Practice → Perspective reasoning chain.",
        "I can use analytical language to connect preterite narration to cultural analysis."
      ],
      checklist: [
        "Choose one product from the Productos page and trace it to a perspective.",
        "Choose one practice from the Prácticas page and trace it to a perspective.",
        "Write one sentence using the analysis frame below.",
        "Discuss: how does knowing the perspective change how you understand the product or practice?"
      ],
      sections: [
        {
          title: "The 3 P's Chain",
          bullets: [
            "Product: el café → Practice: el tinto múltiples veces al día → Perspective: work and social life are interconnected; hospitality is shown through sharing",
            "Product: el vallenato → Practice: playing at celebrations and family events → Perspective: cultural memory and regional identity are preserved through music",
            "Product: la mochila Wayuu → Practice: artisans weave for months following ancestral patterns → Perspective: indigenous knowledge and women's labor deserve recognition",
            "Product: Carnaval de Barranquilla → Practice: 4 days of communal celebration → Perspective: community resilience and Afro-Colombian heritage are worth celebrating publicly"
          ]
        },
        {
          title: "Analysis Frames",
          bullets: [
            "Este producto / esta práctica existe porque los colombianos valoran ...",
            "La perspectiva detrás de esto es que ...",
            "Esto refleja una creencia cultural de que ...",
            "Comparado con mi cultura, esta perspectiva es similar / diferente porque ..."
          ]
        },
        {
          title: "Discussion Prompts",
          bullets: [
            "¿Cuál es la perspectiva más difícil de entender desde afuera? ¿Por qué?",
            "¿Qué perspectiva colombiana te parece más universal?",
            "¿Cuál de las 3 P's te pareció más fácil o difícil de investigar?"
          ]
        }
      ],
      reflectionPrompts: [
        "Write the full 3 P's chain for one example: Product → Practice → Perspective.",
        "Which Colombian perspective challenged you to think differently about your own culture?",
        "How could you use this framework to analyze a culture product from the U.S.?"
      ]
    },

    // ─── WORD-ORDER ACTIVITY ─────────────────────────────────────────────────
    "sp2-word-order-day04": {
      type: "word-order",
      title: "¿Qué pasó en Cartagena? — Word Order",
      dayLabel: "Day 4",
      kindLabel: "Word Order",
      minutes: 10,
      instructions: "Listen to each phrase, then tap the words to arrange them in the correct order.",
      items: [
        {
          prompt: "Listen and arrange:",
          audioUrl: "audio/wo-sp2-01.mp3",
          words: ["La", "familia", "viajó", "a", "Cartagena", "en", "julio."],
          answer: ["La", "familia", "viajó", "a", "Cartagena", "en", "julio."],
          translation: "The family traveled to Cartagena in July."
        },
        {
          prompt: "Listen and arrange:",
          audioUrl: "audio/wo-sp2-02.mp3",
          words: ["Caminaron", "por", "las", "murallas", "de", "la", "ciudad."],
          answer: ["Caminaron", "por", "las", "murallas", "de", "la", "ciudad."],
          translation: "They walked along the city walls."
        },
        {
          prompt: "Listen and arrange:",
          audioUrl: "audio/wo-sp2-03.mp3",
          words: ["Probaron", "frutas", "tropicales", "en", "el", "mercado."],
          answer: ["Probaron", "frutas", "tropicales", "en", "el", "mercado."],
          translation: "They tried tropical fruits at the market."
        },
        {
          prompt: "Listen and arrange:",
          audioUrl: "audio/wo-sp2-04.mp3",
          words: ["Los", "niños", "oyeron", "músicos", "tocar", "vallenato."],
          answer: ["Los", "niños", "oyeron", "músicos", "tocar", "vallenato."],
          translation: "The children heard musicians play vallenato."
        },
        {
          prompt: "Listen and arrange:",
          audioUrl: "audio/wo-sp2-05.mp3",
          words: ["Fue", "uno", "de", "los", "mejores", "días."],
          answer: ["Fue", "uno", "de", "los", "mejores", "días."],
          translation: "It was one of the best days."
        }
      ]
    },

    // ─── LISTENING ACTIVITIES ──────────────────────────────────────────────────
    // Replace YOUTUBE_ID below with the actual YouTube video ID (the part after ?v= in the URL)
    "sp2-listening-vallenato": {
      type: "listening",
      title: "El Vallenato — Patrimonio Cultural",
      dayLabel: "Bonus",
      kindLabel: "Listening",
      minutes: 10,
      description: "El vallenato es el ritmo nacional de Colombia y patrimonio cultural de la humanidad. Escucha y responde.",
      instructions: "Watch the video at least once. Use what you already know about Colombian culture to answer the questions.",
      objectives: [
        "Identify the vallenato as a UNESCO-recognized Colombian cultural tradition",
        "Connect preterite narration vocabulary to cultural context"
      ],
      youtubeId: "REPLACE_WITH_YOUTUBE_ID",
      questions: [
        {
          type: "mc",
          prompt: "¿Qué organización reconoció el vallenato como Patrimonio Cultural Inmaterial?",
          options: [
            { value: "a", label: "La UNESCO" },
            { value: "b", label: "La ONU" },
            { value: "c", label: "El gobierno colombiano" },
            { value: "d", label: "La OEA" }
          ],
          answer: "a"
        },
        {
          type: "mc",
          prompt: "El instrumento principal del vallenato es…",
          options: [
            { value: "a", label: "el acordeón" },
            { value: "b", label: "la guitarra" },
            { value: "c", label: "el piano" },
            { value: "d", label: "la flauta" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "¿De qué región de Colombia viene el vallenato? Escribe la región.",
          placeholder: "e.g. la Costa Caribe",
          answer: ["la costa caribe", "costa caribe", "caribe", "la costa", "valledupar", "la region caribe", "region caribe"]
        }
      ],
      resultTitle: "Comprensión",
      resultIntro: "Submit your answers after watching the video.",
      submitLabel: "Check Answers"
    },

    // ─── PODCAST ACTIVITIES — Duolingo Spanish Podcast ───────────────────────────
    "sp2-podcast-duo-01": {
      type: "podcast",
      title: "Mi héroe, mi amigo",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 25,
      description: "Listen to a true story told in Spanish with English narration. Use what you know about the preterite to follow along.",
      instructions: "Press play and listen. Pay attention to past-tense verbs in the Spanish sections — how many can you catch?",
      objectives: [
        "Listen to authentic Spanish storytelling with preterite narration",
        "Identify familiar past-tense verbs in a longer narrative",
        "Build listening stamina with a real-world podcast"
      ],
      spotifyId: "0HQ27yBUHuPhgsea1MWbfC",
      podcastName: "Duolingo Spanish Podcast",
      episodeNumber: "1",
      level: "Intermediate",
      tip: "Listen for preterite forms you know: fue, dijo, hizo, viajó. How many can you count?"
    },
    "sp2-podcast-duo-02": {
      type: "podcast",
      title: "Sin miedo",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 25,
      description: "A woman overcomes fear to start a new chapter. The narrator uses past tense throughout.",
      instructions: "Search for Episode 2: 'Sin miedo' in the Duolingo Spanish Podcast player below. Listen for preterite verbs.",
      objectives: [
        "Practice listening to natural past-tense narration",
        "Identify cognates and preterite forms in context"
      ],
      spotifyShowId: "2uDEXRSkpRdCmZUw8qt5fh",
      podcastName: "Duolingo Spanish Podcast",
      episodeNumber: "2",
      level: "Intermediate",
      tip: "Try listening once all the way through, then go back and pause at the Spanish sections to catch more past-tense verbs."
    },
    "sp2-podcast-duo-03": {
      type: "podcast",
      title: "Memorias y milanesas",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 25,
      description: "A story about family traditions and the food that connects generations across borders.",
      instructions: "Listen and write down 5 preterite verbs you hear in the Spanish sections.",
      objectives: [
        "Connect food and family vocabulary to a real narrative",
        "Identify preterite forms in sustained storytelling"
      ],
      spotifyId: "4hLZhgx0UfuY8f6Z4jwuEJ",
      podcastName: "Duolingo Spanish Podcast",
      episodeNumber: "3",
      level: "Intermediate",
      tip: "This episode mentions cooking and family — listen for verbs like preparó, cocinó, recordó."
    },
    "sp2-podcast-duo-04": {
      type: "podcast",
      title: "Una chilena en China",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 25,
      description: "A Chilean woman navigates culture shock halfway around the world. Told bilingually.",
      instructions: "Search for Episode 4: 'Una chilena en China' in the Duolingo Spanish Podcast player below.",
      objectives: [
        "Follow a bilingual narrative about cultural experiences",
        "Identify travel and culture vocabulary in the preterite"
      ],
      spotifyShowId: "2uDEXRSkpRdCmZUw8qt5fh",
      podcastName: "Duolingo Spanish Podcast",
      episodeNumber: "4",
      level: "Intermediate",
      tip: "This episode connects to our unit — traveling, experiencing culture, and telling about it in the past tense."
    },
    "sp2-podcast-duo-05": {
      type: "podcast",
      title: "Helen Brown",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 25,
      description: "An unexpected name leads to a story about identity and belonging.",
      instructions: "Listen and think: what preterite verbs does the speaker use to tell their story?",
      objectives: [
        "Practice listening for the main idea of a past-tense narrative",
        "Build confidence with longer audio in Spanish"
      ],
      spotifyId: "30ohnXaaCnme94C7kbT0L7",
      podcastName: "Duolingo Spanish Podcast",
      episodeNumber: "5",
      level: "Intermediate",
      tip: "If the Spanish feels fast, focus on the preterite verbs — they anchor the timeline of the story."
    },

    // ─── PODCAST ACTIVITIES — Garbanzo Spanish Podcast ───────────────────────────
    "sp2-podcast-garb-01": {
      type: "podcast",
      title: "¿Qué dicen los animales?",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 15,
      description: "What sounds do animals make in Spanish? A fun, accessible podcast episode.",
      instructions: "Listen and try to repeat the animal sounds in Spanish!",
      objectives: [
        "Review animal vocabulary and onomatopoeia in Spanish",
        "Practice listening to slow, clear Spanish"
      ],
      spotifyId: "3N9fFa0IQdK66V4lFUwc3K",
      podcastName: "Garbanzo Spanish Podcast",
      episodeNumber: "1",
      level: "Beginner–Intermediate",
      tip: "Garbanzo episodes are shorter and slower — a great warm-up for listening practice."
    },
    "sp2-podcast-garb-02": {
      type: "podcast",
      title: "Los pollitos dicen",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 15,
      description: "Learn the classic Spanish children's song and the vocabulary behind it.",
      instructions: "Listen to the episode. Can you identify all the vocabulary from the song?",
      objectives: [
        "Learn a classic Spanish children's song",
        "Identify animal and nature vocabulary"
      ],
      spotifyId: "5wwCFsQqVAOd5qUFiNwG81",
      podcastName: "Garbanzo Spanish Podcast",
      episodeNumber: "2",
      level: "Beginner–Intermediate",
      tip: "Try to learn the chorus — it uses simple, repetitive vocabulary that's great for memorization."
    },
    "sp2-podcast-garb-03": {
      type: "podcast",
      title: "La canguro Catrina",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 15,
      description: "A babysitter kangaroo teaches everyday Spanish through storytelling.",
      instructions: "Listen to the story. Write down any new words you hear.",
      objectives: [
        "Follow a simple narrative in Spanish",
        "Identify everyday vocabulary in a story context"
      ],
      spotifyId: "3apq4WBL781P6QYlrkmJpC",
      podcastName: "Garbanzo Spanish Podcast",
      episodeNumber: "3",
      level: "Beginner–Intermediate",
      tip: "Stories help your brain learn language naturally — just enjoy the story and let the Spanish wash over you."
    },
    "sp2-podcast-garb-04": {
      type: "podcast",
      title: "Penelope y el gigante",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 15,
      description: "A brave girl faces a giant in this fairy-tale listening activity.",
      instructions: "Listen and think about the story. What does Penelope do that is brave?",
      objectives: [
        "Follow a fairy-tale narrative in Spanish",
        "Practice listening for character actions and descriptions"
      ],
      spotifyId: "6wTqBxJRAB6kmZ7PXoqAX6",
      podcastName: "Garbanzo Spanish Podcast",
      episodeNumber: "4",
      level: "Beginner–Intermediate",
      tip: "Fairy tales use patterns and repetition — notice which phrases come back again and again."
    },
    "sp2-podcast-garb-05": {
      type: "podcast",
      title: "No puedes pasar",
      dayLabel: "Bonus",
      kindLabel: "Podcast",
      minutes: 15,
      description: "A story about boundaries, negotiation, and creative problem solving.",
      instructions: "Listen to the episode. How does the character solve the problem?",
      objectives: [
        "Practice listening for problem and solution in a story",
        "Build vocabulary around negotiation and daily interactions"
      ],
      spotifyId: "5VOzwR3cxlLGLZ19B4CsDF",
      podcastName: "Garbanzo Spanish Podcast",
      episodeNumber: "5",
      level: "Beginner–Intermediate",
      tip: "Listen for the words 'no' and 'sí' — they help you follow the negotiation in the story."
    }
  }
};
