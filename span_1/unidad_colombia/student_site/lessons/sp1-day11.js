window.LESSON_DATA = {
  dayLabel: "Day 11",
  unit: "Unidad Colombia",
  title: "Encanto — Part 1 Viewing Guide",
  subtitle: "Watch the first part of Encanto and track characters, settings, and emotions",
  objectives: [
    "I can identify main characters and their traits",
    "I can notice setting details that connect to Colombia",
    "I can use emotion vocabulary to describe what I observe"
  ],
  sections: [
    {
      id: "context",
      title: "Important Context",
      shortTitle: "Context",
      subtitle: "What to know before watching",
      icon: "⚠️",
      accent: "yellow",
      open: true,
      components: [
        {
          type: "callout",
          style: "warn",
          text: "<strong>Encanto is inspired by Colombia</strong> — it is NOT a documentary. The film uses magical realism. Enjoy the story, but remember that real Colombia is much more complex and diverse than any movie can show."
        },
        {
          type: "callout",
          style: "tip",
          text: "<strong>Quick vocabulary for the film:</strong> la familia = family · la casa = house · la emoción = emotion · el pueblo = town · el regalo / don = gift · la magia = magic"
        }
      ]
    },
    {
      id: "characters",
      title: "Part 1 — Characters and Setting",
      shortTitle: "Characters",
      subtitle: "Track the main characters as you watch",
      icon: "👥",
      accent: "blue",
      components: [
        {
          type: "callout",
          style: "info",
          text: "As you watch, fill in what you notice about each character. What detail stands out? What emotion do they show?"
        },
        {
          type: "data-table",
          headers: ["Character", "One detail about them", "Emotion you notice"],
          rows: [
            ["Mirabel", { editable: true, placeholder: "She is / does..." }, { editable: true, placeholder: "She seems..." }],
            ["Abuela", { editable: true, placeholder: "She is / does..." }, { editable: true, placeholder: "She seems..." }],
            ["Another family member:", { editable: true, placeholder: "Name + detail..." }, { editable: true, placeholder: "They seem..." }]
          ]
        }
      ]
    },
    {
      id: "observations",
      title: "Part 2 — What Do You Notice?",
      shortTitle: "Observe",
      subtitle: "Setting details, emotions, and questions",
      icon: "👀",
      accent: "green",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "One setting detail that reminds you of Colombia (landscape, architecture, food, music):", type: "textarea", placeholder: "I noticed...", rows: 2 },
            { prompt: "One emotion word you heard or saw in the film:", placeholder: "I heard/saw..." },
            { prompt: "One question you have after Part 1:", placeholder: "I wonder why/how..." }
          ]
        }
      ]
    },
    {
      id: "exit",
      title: "Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Quick reflection before we continue tomorrow",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 11",
          fields: [
            { label: "In one sentence: What is this movie about so far?", placeholder: "The movie is about..." },
            { label: "Which character interests you the most? Why?", placeholder: "I'm most interested in... because..." }
          ]
        }
      ]
    }
  ]
};
