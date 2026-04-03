window.LESSON_DATA = {
  dayLabel: "Day 12",
  unit: "Unidad Colombia",
  title: "Encanto — Discussion + Writing (Pretérito)",
  subtitle: "Finish the film, discuss themes, and write a reflection using preterite verbs",
  objectives: [
    "I can identify important themes in Encanto (family, identity, pressure)",
    "I can connect the film to what we learned about Colombia in this unit",
    "I can write a reflection paragraph using at least 2 preterite verbs"
  ],
  sections: [
    {
      id: "discussion-notes",
      title: "Part 1 — Discussion Notes",
      shortTitle: "Discussion",
      subtitle: "Think deeply about the themes in Encanto",
      icon: "🧠",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "Now that you've seen the full film, let's dig into the big ideas. Answer thoughtfully — there are no wrong answers here, but support your ideas with details from the movie."
        },
        {
          type: "questions",
          questions: [
            { prompt: "What is the film's main message about family pressure? How does Mirabel deal with it?", type: "textarea", placeholder: "The film shows that family pressure...", rows: 3 },
            { prompt: "How does the theme of belonging appear in the story? Who struggles with belonging?", type: "textarea", placeholder: "Mirabel / Bruno / Luisa struggles with belonging because...", rows: 3 },
            { prompt: "How does Encanto connect to what we studied about Colombia in this unit? (Think about geography, culture, music, or values.)", type: "textarea", placeholder: "The film connects to our unit because...", rows: 3 },
            { prompt: "What does the movie NOT show about Colombia? What is missing or oversimplified?", type: "textarea", placeholder: "The movie doesn't show...", rows: 2 }
          ]
        }
      ]
    },
    {
      id: "film-vocab",
      title: "Part 2 — Film Vocabulary",
      shortTitle: "Vocabulary",
      subtitle: "Key words for discussing Encanto in Spanish",
      icon: "📚",
      accent: "green",
      components: [
        {
          type: "flip-gallery",
          cards: [
            { es: "la familia", en: "the family", hint: "The Madrigals are a close-knit family" },
            { es: "la casa", en: "the house", hint: "La Casita is magical and alive" },
            { es: "el pueblo", en: "the town / village", hint: "The Encanto is a hidden village in the mountains" },
            { es: "la presión", en: "the pressure", hint: "Each family member feels pressure to be perfect" },
            { es: "el don / el regalo", en: "the gift", hint: "Each person receives a magical gift — except Mirabel" },
            { es: "pertenecer", en: "to belong", hint: "Mirabel wants to belong and feel valued" },
            { es: "la identidad", en: "the identity", hint: "Who are you without your gift?" },
            { es: "la comunidad", en: "the community", hint: "The family serves and protects the community" }
          ]
        }
      ]
    },
    {
      id: "partner-discussion",
      title: "Part 3 — Partner Discussion",
      shortTitle: "Partner Talk",
      subtitle: "Discuss the film using preterite sentence starters",
      icon: "🗣️",
      accent: "purple",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "<strong>Use these preterite stems to guide your conversation:</strong><br>• La película mostró que... (The film showed that...)<br>• Mirabel hizo... (Mirabel did...)<br>• La abuela dijo... (The grandmother said...)<br>• Bruno tuvo... (Bruno had...)<br>• Al final, la familia aprendió... (In the end, the family learned...)"
        },
        {
          type: "partner-talk",
          title: "Discuss with a partner",
          prompt: "Take turns sharing your thoughts about Encanto. Each person must use at least 2 preterite sentences. Use the stems above to help you. What was the most important moment in the film? What did the characters learn?",
          duration: "5 minutes"
        },
        {
          type: "questions",
          questions: [
            { prompt: "Write one preterite sentence your partner said during the discussion:", placeholder: "Mi compañero/a dijo que..." },
            { prompt: "What was the most important moment in the film, according to your partner?", placeholder: "According to my partner..." }
          ]
        }
      ]
    },
    {
      id: "writing",
      title: "Part 4 — Writing Reflection",
      shortTitle: "Writing",
      subtitle: "Write a short reflection about Encanto in Spanish",
      icon: "✍️",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>Writing task:</strong> Write 3–5 sentences in Spanish about Encanto. You MUST use at least <strong>2 preterite verbs</strong> (underline them or mark them with *asterisks*).<br><br><strong>Ideas to include:</strong><br>• What happened in the story?<br>• What did a character do that was important?<br>• What did you learn about Colombia from the film?"
        },
        {
          type: "questions",
          questions: [
            { prompt: "Write your Encanto reflection here (3–5 sentences, at least 2 preterite verbs):", type: "textarea", placeholder: "La película Encanto mostró una familia colombiana que... Mirabel no tuvo un don, pero ella hizo algo importante: ...", rows: 6 }
          ]
        }
      ]
    },
    {
      id: "exit",
      title: "Part 5 — Exit Ticket",
      shortTitle: "Exit",
      subtitle: "Final thoughts on the film",
      icon: "🎟️",
      accent: "teal",
      components: [
        {
          type: "exit-ticket",
          title: "Day 12 Exit Ticket",
          fields: [
            { label: "Name one thing Encanto got right about Colombian culture:", placeholder: "The film got ___ right because..." },
            { label: "Name one thing you wish the film had included about Colombia:", placeholder: "I wish the film had shown..." },
            { label: "Write one preterite sentence about what YOU did or learned today:", placeholder: "Hoy yo aprendí que... / Hoy yo escribí sobre..." }
          ]
        }
      ]
    }
  ]
};
