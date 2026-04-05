window.LESSON_DATA = {
  dayLabel: "Day 2",
  unit: "Unidad Colombia",
  title: "Vocabulario en Contexto",
  subtitle: "Learn school and place words through matching, fill-in-the-blank, and flashcards — all set in Colombia",
  objectives: [
    "I can recognize school and place words in context",
    "I can match vocabulary to real-world Colombia sentences",
    "I can write 5 new words from today's lesson"
  ],
  vocabCategory: 1,
  sections: [
    // ──────────────────────────────────────────────────
    // 1. Warm-Up
    // ──────────────────────────────────────────────────
    {
      id: "warmup",
      title: "Warm-Up — Partner Recall",
      shortTitle: "Warm-Up",
      subtitle: "Share one thing you remember from Day 1",
      icon: "☀️",
      accent: "yellow",
      open: true,
      components: [
        {
          type: "partner-talk",
          title: "Recuerda el Día 1",
          prompt: "Con tu compañero, comparte <strong>una cosa</strong> que recordaste del Day 1 — from the stations, video, or map activity.",
          duration: "2 minutes"
        },
        {
          type: "questions",
          markCompleteLabel: "Save warm-up (mark this section done)",
          questions: [
            { prompt: "Write what you shared with your partner:", type: "textarea", placeholder: "I remembered that...", rows: 2 }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 2. Vocabulary Flashcards
    // ──────────────────────────────────────────────────
    {
      id: "vocab-cards",
      title: "Vocabulario Nuevo — Flip to Learn",
      shortTitle: "Flashcards",
      subtitle: "Click each card to see the English meaning. Click words to hear pronunciation.",
      icon: "📇",
      accent: "blue",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Click any card to flip it. Click the Spanish word to hear it spoken aloud!"
        },
        {
          type: "flip-gallery",
          cards: [
            { es: "la plaza", en: "the plaza / square", hint: "Plaza de Bolívar" },
            { es: "el colegio", en: "the school", hint: "School in Colombia" },
            { es: "el mercado", en: "the market", hint: "Cartagena's markets" },
            { es: "la clase", en: "the class", hint: "La clase de español" },
            { es: "el libro", en: "the book", hint: "En la mochila" },
            { es: "la mochila", en: "the backpack", hint: "Carry your books" },
            { es: "la ventana", en: "the window", hint: "Look outside" },
            { es: "la puerta", en: "the door", hint: "Open / close" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 3. Matching Exercise
    // ──────────────────────────────────────────────────
    {
      id: "matching",
      title: "Matching — Vocabulario en Contexto",
      shortTitle: "Matching",
      subtitle: "Click one Spanish word, then click its English meaning to match",
      icon: "🔗",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Click a Spanish word on the left, then click the English meaning on the right. Matched pairs turn green!"
        },
        {
          type: "matching",
          wordBank: true,
          instructions: "Match each Spanish word to its English meaning.",
          pairs: [
            { id: "1", es: "la plaza", en: "the plaza / square" },
            { id: "2", es: "el colegio", en: "the school" },
            { id: "3", es: "el mercado", en: "the market" },
            { id: "4", es: "la clase", en: "the class" },
            { id: "5", es: "el libro", en: "the book" },
            { id: "6", es: "la mochila", en: "the backpack" },
            { id: "7", es: "la ventana", en: "the window" },
            { id: "8", es: "la puerta", en: "the door" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 4. Fill in the Blank
    // ──────────────────────────────────────────────────
    {
      id: "fill",
      title: "Fill in the Blank — Colombia Sentences",
      shortTitle: "Fill-Blank",
      subtitle: "Use the word bank to complete each sentence",
      icon: "📝",
      accent: "purple",
      components: [
        {
          type: "fill-blanks",
          wordBank: ["la plaza", "el colegio", "el mercado", "el libro", "la mochila"],
          sentences: [
            { text: "En Bogotá hay una ___ grande en el centro.", answer: "la plaza|plaza" },
            { text: "Los estudiantes en Medellín van al ___ cada día.", answer: "el colegio|colegio" },
            { text: "En Cartagena, la gente compra frutas en el ___.", answer: "el mercado|mercado" },
            { text: "Tengo el ___ en la mochila.", answer: "el libro|libro" },
            { text: "La ___ está al lado de la ventana.", answer: "la mochila|mochila" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 5. New Words Journal
    // ──────────────────────────────────────────────────
    {
      id: "journal",
      title: "Cinco Palabras Nuevas",
      shortTitle: "Journal",
      subtitle: "Write 5 new words from today. Draw or translate one.",
      icon: "✏️",
      accent: "orange",
      components: [
        {
          type: "vocab-list",
          instructions: "Escribe 5 palabras nuevas de hoy. Dibuja o traduce una.",
          count: 5,
          drawPrompt: "Draw or translate one of your new words:"
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 6. Exit Ticket
    // ──────────────────────────────────────────────────
    {
      id: "exit",
      title: "Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Quick check before you go!",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 2",
          prompt: "Answer these quick questions before leaving:",
          fields: [
            { label: "What is 'el mercado' in English?", placeholder: "..." },
            { label: "Name one place in Colombia from Day 1", placeholder: "..." },
            { label: "Which new word was hardest to remember?", placeholder: "The word... because..." }
          ]
        }
      ]
    }
  ]
};
