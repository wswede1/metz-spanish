window.LESSON_DATA = {
  dayLabel: "Day 5",
  unit: "Unidad Colombia",
  title: "Estar + Ubicación y Objetos",
  subtitle: "Learn to say where things are using estar, prepositions, and classroom vocabulary",
  objectives: [
    "I can conjugate estar for all subjects",
    "I can use prepositions of place (en, debajo de, encima de, al lado de, entre)",
    "I can describe where classroom objects are located"
  ],
  vocabCategory: 4,
  sections: [
    {
      id: "grammar-estar",
      title: "Grammar Discovery — Estar + Lugar",
      shortTitle: "Estar",
      subtitle: "How do we say where things are in Spanish?",
      icon: "🔍",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "We use <strong>estar</strong> (not ser) to talk about <em>location</em>. Look at these sentences — what forms of estar do you see?"
        },
        {
          type: "discovery",
          title: "Observe the Pattern",
          instructions: "How does estar change with different subjects?",
          sentences: [
            "El libro <span class=\"highlight\">está</span> en la mesa.",
            "Los estudiantes <span class=\"highlight\">están</span> en la clase.",
            "Yo <span class=\"highlight\">estoy</span> en el colegio.",
            "Nosotros <span class=\"highlight\">estamos</span> en Bogotá."
          ],
          question: "Write out all the forms of estar you can figure out:",
          placeholder: "yo = estoy, tú = ..., él/ella = ..., nosotros = ..., ellos = ..."
        },
        {
          type: "conj-table",
          verbs: [
            {
              infinitive: "estar (to be — location/feeling)",
              rows: [
                { pronoun: "yo", answer: "estoy" },
                { pronoun: "tú", answer: "estás" },
                { pronoun: "él / ella / usted", answer: "está" },
                { pronoun: "nosotros/as", answer: "estamos" },
                { pronoun: "ellos / ellas / ustedes", answer: "están" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "prepositions",
      title: "Preposiciones de Lugar",
      shortTitle: "Prepositions",
      subtitle: "Learn the words that describe WHERE things are",
      icon: "📍",
      accent: "green",
      components: [
        {
          type: "flip-gallery",
          cards: [
            { es: "en", en: "in / on / at", hint: "El libro está en la mesa" },
            { es: "debajo de", en: "under / below", hint: "debajo de la silla" },
            { es: "encima de", en: "on top of", hint: "encima de la mesa" },
            { es: "al lado de", en: "next to / beside", hint: "al lado de la ventana" },
            { es: "entre", en: "between", hint: "entre la puerta y la ventana" },
            { es: "cerca de", en: "near / close to", hint: "cerca del mercado" },
            { es: "lejos de", en: "far from", hint: "lejos de la costa" },
            { es: "delante de", en: "in front of", hint: "delante de la clase" },
            { es: "detrás de", en: "behind", hint: "detrás de la puerta" }
          ]
        }
      ]
    },
    {
      id: "classroom",
      title: "Objetos del Salón de Clases",
      shortTitle: "Objects",
      subtitle: "Vocabulary for things in the classroom",
      icon: "🏫",
      accent: "yellow",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Click the cards to learn the classroom objects, then use them in the exercises below!"
        },
        {
          type: "flip-gallery",
          cards: [
            { es: "el libro", en: "the book" },
            { es: "la mochila", en: "the backpack" },
            { es: "la ventana", en: "the window" },
            { es: "la puerta", en: "the door" },
            { es: "la mesa", en: "the table" },
            { es: "el escritorio", en: "the desk" },
            { es: "el lápiz", en: "the pencil" },
            { es: "el cuaderno", en: "the notebook" }
          ]
        }
      ]
    },
    {
      id: "practice",
      title: "Practice — Estar + Preposition",
      shortTitle: "Practice",
      subtitle: "Complete sentences with the correct form of estar and preposition",
      icon: "✏️",
      accent: "purple",
      components: [
        {
          type: "fill-blanks",
          wordBank: ["está", "están", "estoy", "estamos", "encima de", "debajo de", "al lado de", "entre"],
          sentences: [
            { text: "El libro ___ ___ la mesa.", answer: "está|encima de" },
            { text: "La mochila ___ ___ la silla.", answer: "está|debajo de" },
            { text: "Los estudiantes ___ en la clase.", answer: "están" },
            { text: "El lápiz ___ ___ el cuaderno y el libro.", answer: "está|entre" },
            { text: "Yo ___ ___ la ventana.", answer: "estoy|al lado de" }
          ]
        },
        {
          type: "matching",
          wordBank: true,
          instructions: "Match location words and forms of <em>estar</em> to their English meanings.",
          pairs: [
            { es: "estar", en: "to be (location/feeling)" },
            { es: "está", en: "he/she is (location)" },
            { es: "aquí", en: "here" },
            { es: "al lado (de)", en: "next to" },
            { es: "encima (de)", en: "on top (of)" }
          ]
        },
        {
          type: "sentence-order",
          prompt: "<strong>Put the words in order</strong> (Spanish): <em>The book is on top of the table.</em>",
          tokens: ["El libro", "está", "encima de", "la mesa."],
          correctOrder: [0, 1, 2, 3]
        }
      ]
    },
    {
      id: "culture",
      title: "Cultura — El Biblioburro",
      shortTitle: "Culture",
      subtitle: "A Colombian story about books, burros, and community",
      icon: "📚",
      accent: "orange",
      components: [
        {
          type: "reading",
          text: "En Colombia, hay un maestro que se llama Luis Soriano. Él <span class=\"verb-highlight\">vive</span> en una zona rural. Luis tiene dos burros: Alfa y Beto. Los burros <span class=\"verb-highlight\">llevan</span> libros a los niños en las montañas. Los niños <span class=\"verb-highlight\">están</span> lejos de las bibliotecas. El Biblioburro <span class=\"verb-highlight\">está</span> en muchos pueblos de Colombia. <span class=\"gustar-highlight\">A los niños les gusta leer</span> los libros del Biblioburro.",
          instructions: "This is a real story! Luis Soriano created a mobile library using two donkeys."
        },
        {
          type: "questions",
          questions: [
            { prompt: "What problem does the Biblioburro solve?", type: "textarea", placeholder: "The children are...", rows: 2 },
            { prompt: "How does this connect to estar + location?", placeholder: "The libraries están..." }
          ]
        }
      ]
    },
    {
      id: "exit",
      title: "Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Show you can use estar + preposition",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 5",
          prompt: "Answer using estar + a preposition of place:",
          fields: [
            { label: "¿Dónde está el libro?", placeholder: "El libro está..." },
            { label: "¿Dónde está la mochila?", placeholder: "La mochila está..." },
            { label: "¿Dónde estás tú ahora?", placeholder: "Yo estoy..." }
          ]
        }
      ]
    }
  ]
};
