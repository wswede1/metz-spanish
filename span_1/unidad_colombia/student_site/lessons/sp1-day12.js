window.LESSON_DATA = {
  dayLabel: "Day 12",
  unit: "Unidad Colombia",
  title: "Encanto — Discussion + Writing",
  subtitle: "Finish the film, discuss themes, and write a reflection connecting Encanto to our unit",
  objectives: [
    "I can identify important themes in Encanto",
    "I can connect the film to what I've learned about Colombia",
    "I can write a short reflection about family, place, and identity"
  ],
  sections: [
    {
      id: "discussion",
      title: "Discussion Notes",
      shortTitle: "Discussion",
      subtitle: "Think critically about what the film shows — and what it doesn't",
      icon: "💬",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "Discuss these questions with your class or table group, then write your own answers below."
        },
        {
          type: "questions",
          questions: [
            { prompt: "One important theme in the film (family pressure, belonging, identity, etc.):", type: "textarea", placeholder: "An important theme is...", rows: 2 },
            { prompt: "One connection to our Colombia unit — how does the film relate to something we studied?", type: "textarea", placeholder: "This connects to... because...", rows: 2 },
            { prompt: "One thing the movie does NOT explain about real Colombia:", type: "textarea", placeholder: "The movie doesn't show...", rows: 2 }
          ]
        }
      ]
    },
    {
      id: "vocab",
      title: "Film Vocabulary — Emotions & Family",
      shortTitle: "Vocab",
      subtitle: "Words you heard in the film that connect to our unit",
      icon: "📖",
      accent: "green",
      components: [
        {
          type: "flip-gallery",
          cards: [
            { es: "la familia", en: "the family", hint: "La familia Madrigal" },
            { es: "la casa", en: "the house", hint: "La casita mágica" },
            { es: "el pueblo", en: "the town / village", hint: "The village in the mountains" },
            { es: "la presión", en: "pressure", hint: "Family expectations" },
            { es: "el don / regalo", en: "the gift", hint: "Each person's magical gift" },
            { es: "pertenecer", en: "to belong", hint: "Mirabel's journey" },
            { es: "la identidad", en: "identity", hint: "Who am I without my gift?" },
            { es: "la comunidad", en: "community", hint: "The village and the family" }
          ]
        }
      ]
    },
    {
      id: "discussion-stems",
      title: "Partner Discussion",
      shortTitle: "Partner",
      subtitle: "Use these stems to discuss with a classmate",
      icon: "🗣️",
      accent: "purple",
      components: [
        {
          type: "partner-talk",
          title: "Discusión con tu compañero/a",
          prompt: "Use these stems to share your ideas:<br><strong>La película muestra que...</strong> (The film shows that...)<br><strong>Me gusta / No me gusta... porque...</strong><br><strong>En la película, la familia está...</strong> (emotion)<br><strong>Esto me recuerda...</strong> (This reminds me of...)",
          duration: "5 minutes"
        }
      ]
    },
    {
      id: "writing",
      title: "Writing — Reflection",
      shortTitle: "Writing",
      subtitle: "Write a short response about what the film shows about family, place, and identity",
      icon: "✏️",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>Writing task:</strong> Write a short response (3-5 sentences) about what Encanto shows about <em>family, place, and identity</em>. You MUST connect at least one part to something we learned earlier in the unit."
        },
        {
          type: "questions",
          questions: [
            {
              prompt: "Your reflection (3-5 sentences — mix of English and Spanish is OK):",
              type: "textarea",
              placeholder: "In the movie Encanto, la familia Madrigal... This connects to our unit because... I think the film shows that...",
              rows: 6
            }
          ]
        }
      ]
    },
    {
      id: "exit",
      title: "Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Final takeaway from Encanto",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 12",
          fields: [
            { label: "What is ONE thing Encanto got right about Colombian culture?", placeholder: "The film accurately shows..." },
            { label: "What is ONE thing you wish the film had included?", placeholder: "I wish the film showed..." }
          ]
        }
      ]
    }
  ]
};
