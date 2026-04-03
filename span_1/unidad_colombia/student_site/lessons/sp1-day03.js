window.LESSON_DATA = {
  dayLabel: "Day 3",
  unit: "Unidad Colombia",
  title: "Vocab Quiz + Grammar Discovery",
  subtitle: "Show what you know on the vocabulary quiz, then discover -ER/-IR verb patterns and gustar + infinitive",
  objectives: [
    "I can demonstrate Day 2 vocabulary knowledge on a quiz",
    "I can identify -ER and -IR verb endings by analyzing sentences",
    "I can use gustar + infinitive to express likes"
  ],
  sections: [
    // ──────────────────────────────────────────────────
    // 1. Vocabulary Quiz — Section A: Matching
    // ──────────────────────────────────────────────────
    {
      id: "quiz-match",
      title: "Examen de Vocabulario — Section A: Matching",
      shortTitle: "Quiz A",
      subtitle: "Write the letter of the correct English meaning (10 pts)",
      icon: "📋",
      accent: "red",
      open: true,
      components: [
        {
          type: "callout",
          style: "warn",
          text: "<strong>Quiz time!</strong> No talking. Write the letter of the correct English meaning next to each number. Each letter is used once."
        },
        {
          type: "matching",
          wordBank: true,
          instructions: "Click a Spanish word, then click its English meaning to match them.",
          pairs: [
            { id: "1", es: "1. la plaza", en: "A. the plaza / square" },
            { id: "2", es: "2. el colegio", en: "B. the school" },
            { id: "3", es: "3. el mercado", en: "C. the market" },
            { id: "4", es: "4. la clase", en: "D. the class" },
            { id: "5", es: "5. el libro", en: "E. the book" },
            { id: "6", es: "6. la mochila", en: "F. the backpack" },
            { id: "7", es: "7. la ventana", en: "G. the window" },
            { id: "8", es: "8. la puerta", en: "H. the door" },
            { id: "9", es: "9. la mesa", en: "I. the table" },
            { id: "10", es: "10. el lápiz", en: "J. the pencil" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 2. Vocabulary Quiz — Section B: Fill in the Blank
    // ──────────────────────────────────────────────────
    {
      id: "quiz-fill",
      title: "Examen — Section B: Fill in the Blank",
      shortTitle: "Quiz B",
      subtitle: "Complete each sentence with a word from the bank (10 pts)",
      icon: "📝",
      accent: "red",
      components: [
        {
          type: "fill-blanks",
          wordBank: ["plaza", "colegio", "mercado", "clase", "libro", "mochila", "ventana", "puerta", "mesa", "lápiz"],
          sentences: [
            { text: "En Bogotá la ___ de Bolívar es famosa.", answer: "plaza" },
            { text: "Los estudiantes en Colombia van al ___.", answer: "colegio" },
            { text: "Tengo el ___ en la mochila.", answer: "libro" },
            { text: "La ___ está abierta.", answer: "puerta" },
            { text: "El ___ está en la mesa.", answer: "lápiz" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 3. Vocabulary Quiz — Section C: Short Answer
    // ──────────────────────────────────────────────────
    {
      id: "quiz-short",
      title: "Examen — Section C: Short Answer",
      shortTitle: "Quiz C",
      subtitle: "Answer in Spanish (10 pts)",
      icon: "💬",
      accent: "red",
      components: [
        {
          type: "questions",
          selfRubric: {
            id: "quiz-short-rubric",
            title: "Self-check (honor system):",
            items: [
              "I answered each prompt in Spanish where asked.",
              "My place name matches something we studied (map or Day 1).",
              "My sentence about the libro includes a location phrase (en la mochila, en la mesa, etc.)."
            ],
            completeSectionWhenAllChecked: true
          },
          exemplarHtml: "<p><strong>Sample:</strong> Medellín / la mesa / El libro está en la mochila.</p>",
          exemplarButtonLabel: "Show sample answers",
          questions: [
            { prompt: "Name one place in Colombia (city or region) from Day 1.", placeholder: "A city or region..." },
            { prompt: "Name one classroom object in Spanish.", placeholder: "Un objeto de la clase..." },
            { prompt: "¿Dónde está el libro? (Answer: in the backpack, on the table, etc. — in Spanish)", placeholder: "El libro está..." }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 4. Grammar Discovery — -ER/-IR Verbs
    // ──────────────────────────────────────────────────
    {
      id: "grammar-er-ir",
      title: "Grammar Discovery — Verbos -ER y -IR",
      shortTitle: "-ER/-IR",
      subtitle: "Analyze sentences to discover the verb endings",
      icon: "🔍",
      accent: "blue",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Look at the sentences below. What verb do you see? <strong>How does it change</strong> with the subject?"
        },
        {
          type: "discovery",
          title: "Observe the Pattern",
          instructions: "Look at the highlighted verbs. What endings do you notice for each subject?",
          sentences: [
            "Yo <span class=\"highlight\">como</span> arepas en Bogotá.",
            "Tú <span class=\"highlight\">escribes</span> en el cuaderno.",
            "Pablo <span class=\"highlight\">vive</span> en Medellín.",
            "Nosotros <span class=\"highlight\">comemos</span> en el mercado.",
            "Los estudiantes <span class=\"highlight\">escriben</span> muchas notas."
          ],
          question: "What are the verb endings for -ER (comer) and -IR (vivir)?",
          placeholder: "For -ER verbs: yo = -o, tú = ..., él = ..., nosotros = ..., ellos = ..."
        },
        {
          type: "conj-table",
          verbs: [
            {
              infinitive: "comer (to eat)",
              rows: [
                { pronoun: "yo", answer: "como" },
                { pronoun: "tú", answer: "comes" },
                { pronoun: "él / ella / usted", answer: "come" },
                { pronoun: "nosotros/as", answer: "comemos" },
                { pronoun: "ellos / ellas / ustedes", answer: "comen" }
              ]
            },
            {
              infinitive: "vivir (to live)",
              rows: [
                { pronoun: "yo", answer: "vivo" },
                { pronoun: "tú", answer: "vives" },
                { pronoun: "ella", answer: "vive" }
              ]
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 5. Grammar Discovery — gustar + infinitivo
    // ──────────────────────────────────────────────────
    {
      id: "grammar-gustar",
      title: "Grammar Discovery — gustar + infinitivo",
      shortTitle: "Gustar",
      subtitle: "What comes after me gusta or te gusta?",
      icon: "💡",
      accent: "yellow",
      components: [
        {
          type: "discovery",
          title: "Discover the Pattern",
          instructions: "Look at the highlighted phrases. What kind of word always follows gusta?",
          sentences: [
            "A mí <span class=\"highlight\">me gusta</span> <span class=\"gustar-highlight\">estudiar</span> español.",
            "A Pablo <span class=\"highlight\">le gusta</span> <span class=\"gustar-highlight\">comer</span> arepas.",
            "A nosotros <span class=\"highlight\">nos gusta</span> <span class=\"gustar-highlight\">bailar</span> cumbia.",
            "<span class=\"highlight\">Me gusta</span> <span class=\"gustar-highlight\">escribir</span> en el cuaderno."
          ],
          question: "What word always follows me gusta / le gusta? Is it a conjugated verb or an infinitive?",
          placeholder: "The word that follows gusta is always a..."
        },
        {
          type: "fill-blanks",
          wordBank: ["estudiar", "comer", "bailar", "escribir", "correr"],
          sentences: [
            { text: "A mí me gusta ___ español.", answer: "estudiar" },
            { text: "A Pablo le gusta ___ arepas.", answer: "comer" },
            { text: "Nos gusta ___ cumbia.", answer: "bailar" },
            { text: "Me gusta ___ en el cuaderno.", answer: "escribir" },
            { text: "¿Te gusta ___ en el parque?", answer: "correr" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 6. Reading — Un estudiante en Colombia
    // ──────────────────────────────────────────────────
    {
      id: "reading",
      title: "Lectura — Un estudiante en Colombia",
      shortTitle: "Reading",
      subtitle: "Read about Sofía, then answer the questions",
      icon: "📖",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Read the passage. <strong>Click highlighted verbs</strong> to hear pronunciation. Circle -ER/-IR verbs and gustar phrases in your mind!"
        },
        {
          type: "reading",
          text: "Sofía <span class=\"verb-highlight\">vive</span> en Cartagena, Colombia. Tiene la clase de español a las ocho. Sofía <span class=\"verb-highlight\">come</span> el desayuno en la cafetería. <span class=\"gustar-highlight\">Le gusta estudiar</span> ciencias. <span class=\"verb-highlight\">Escribe</span> en el cuaderno en la clase de historia. A Sofía <span class=\"gustar-highlight\">le gusta bailar</span>. Los fines de semana <span class=\"verb-highlight\">come</span> arepas con su familia.",
          instructions: "Click any highlighted verb to hear it spoken!"
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Dónde vive Sofía?", placeholder: "Sofía vive en...", answer: "Cartagena" },
            { prompt: "List 2 things Sofía likes (gustar):", type: "textarea", placeholder: "Le gusta... y le gusta...", rows: 2 },
            { prompt: "What does Sofía do? (Name 2 actions with comer or escribir)", type: "textarea", placeholder: "Sofía come... y escribe...", rows: 2 }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 7. Partner Talk + Exit Ticket
    // ──────────────────────────────────────────────────
    {
      id: "exit",
      title: "Partner Talk + Exit Ticket",
      shortTitle: "Exit",
      subtitle: "Practice with a partner, then write your exit sentences",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "partner-talk",
          title: "¿Qué te gusta hacer?",
          prompt: "Ask your partner: <strong>¿Qué te gusta hacer?</strong><br>Answer with: <strong>Me gusta + infinitive</strong>.<br>One exchange each — try to use a -ER or -IR verb!",
          duration: "3 minutes"
        },
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 3",
          prompt: "Write one sentence with an -ER or -IR verb. Write one with Me gusta + infinitive.",
          fields: [
            { label: "One sentence with an -ER or -IR verb (e.g., Yo como...)", placeholder: "Yo..." },
            { label: "One sentence with Me gusta + infinitive", placeholder: "Me gusta..." }
          ]
        }
      ]
    }
  ]
};
