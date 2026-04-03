window.LESSON_DATA = {
  dayLabel: "Day 11",
  unit: "Unidad Colombia",
  title: "Encanto — Part 1 Viewing Guide (Pretérito)",
  subtitle: "Watch Part 1 of Encanto and track characters, settings, and preterite verbs you hear",
  objectives: [
    "I can identify main characters and describe their traits",
    "I can notice Colombia-inspired settings and cultural details in the film",
    "I can track preterite verbs used in the film dialogue"
  ],
  sections: [
    {
      id: "context",
      title: "Part 1 — Important Context",
      shortTitle: "Context",
      subtitle: "Before we watch — key vocab and what to listen for",
      icon: "🎬",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "<strong>Encanto</strong> (2021) is a Disney animated film inspired by Colombian culture, geography, and family traditions. The story takes place in a magical Colombian village and explores themes of <em>la familia</em>, identity, and belonging."
        },
        {
          type: "flip-gallery",
          cards: [
            { es: "la familia", en: "the family", hint: "The Madrigal family is the center of the story" },
            { es: "la casa", en: "the house", hint: "La Casita is alive and magical" },
            { es: "el don / el regalo", en: "the gift", hint: "Each family member receives a magical gift" },
            { es: "la magia", en: "the magic", hint: "The candle holds the family's magic" },
            { es: "la vela", en: "the candle", hint: "The miracle candle that started it all" },
            { es: "el milagro", en: "the miracle", hint: "The miracle that gave the family their powers" }
          ]
        },
        {
          type: "callout",
          style: "fire",
          text: "<strong>Your mission while watching:</strong> Listen for preterite verbs in the dialogue. When a character talks about something that <em>already happened</em>, write down the verb. Examples: <em>dijo</em> (said), <em>fue</em> (went/was), <em>hizo</em> (did/made), <em>perdió</em> (lost)."
        }
      ]
    },
    {
      id: "characters",
      title: "Part 2 — Characters and Setting",
      shortTitle: "Characters",
      subtitle: "Who are the main characters? What do they do?",
      icon: "👥",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Fill in this table as you watch. Use the preterite when describing what each character <strong>did</strong>."
        },
        {
          type: "data-table",
          headers: ["Character", "One Detail About Them", "¿Qué hizo? (What did they do?)"],
          rows: [
            ["Mirabel", { editable: true, placeholder: "e.g., No tiene don" }, { editable: true, placeholder: "Mirabel buscó..." }],
            ["Abuela Alma", { editable: true, placeholder: "e.g., Es la líder" }, { editable: true, placeholder: "La abuela dijo..." }],
            ["Luisa", { editable: true, placeholder: "e.g., Es fuerte" }, { editable: true, placeholder: "Luisa cargó..." }],
            ["Isabela", { editable: true, placeholder: "e.g., Crea flores" }, { editable: true, placeholder: "Isabela hizo..." }],
            ["Bruno", { editable: true, placeholder: "e.g., Tiene visiones" }, { editable: true, placeholder: "Bruno vio..." }]
          ]
        }
      ]
    },
    {
      id: "verb-tracker",
      title: "Part 3 — Preterite Verb Tracker",
      shortTitle: "Verb Tracker",
      subtitle: "Listen carefully — catch preterite verbs as they happen!",
      icon: "👂",
      accent: "purple",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Every time you hear a past-tense verb, write it down. Don't worry about getting every single one — aim for at least 5."
        },
        {
          type: "data-table",
          headers: ["Verb I Heard", "Who Said/Did It", "What It Means"],
          rows: [
            [{ editable: true, placeholder: "e.g., dijo" }, { editable: true, placeholder: "Abuela" }, { editable: true, placeholder: "said" }],
            [{ editable: true, placeholder: "e.g., fue" }, { editable: true, placeholder: "Mirabel" }, { editable: true, placeholder: "went / was" }],
            [{ editable: true, placeholder: "verb..." }, { editable: true, placeholder: "who..." }, { editable: true, placeholder: "meaning..." }],
            [{ editable: true, placeholder: "verb..." }, { editable: true, placeholder: "who..." }, { editable: true, placeholder: "meaning..." }],
            [{ editable: true, placeholder: "verb..." }, { editable: true, placeholder: "who..." }, { editable: true, placeholder: "meaning..." }]
          ]
        }
      ]
    },
    {
      id: "observations",
      title: "Part 4 — Observations",
      shortTitle: "Observations",
      subtitle: "What did you notice about the setting and language?",
      icon: "🔍",
      accent: "orange",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "Describe one setting detail that connects to real Colombia (think about the landscapes, food, music, or architecture you studied in this unit):", type: "textarea", placeholder: "I noticed that...", rows: 3 },
            { prompt: "Which preterite verbs did you hear the most? List at least 2:", placeholder: "fue, dijo, hizo..." },
            { prompt: "Was there a moment when a character talked about the past? Describe it briefly:", type: "textarea", placeholder: "When Abuela talked about...", rows: 2 },
            { prompt: "What do you think will happen in Part 2? Write your prediction in Spanish (use ir + a + infinitive or the preterite):", placeholder: "Yo creo que Mirabel va a..." }
          ]
        }
      ]
    },
    {
      id: "exit",
      title: "Part 5 — Exit Ticket",
      shortTitle: "Exit",
      subtitle: "Quick check before you go",
      icon: "🎟️",
      accent: "teal",
      components: [
        {
          type: "exit-ticket",
          title: "Day 11 Exit Ticket",
          fields: [
            { label: "Name one character and one thing they did (use preterite):", placeholder: "Mirabel buscó la verdad sobre Bruno." },
            { label: "Name one cultural detail from the film that connects to what we learned about Colombia:", placeholder: "The music / the mountains / the food..." },
            { label: "How many preterite verbs did you catch? What was the hardest one to understand?", placeholder: "I caught __ verbs. The hardest was..." }
          ]
        }
      ]
    }
  ]
};
