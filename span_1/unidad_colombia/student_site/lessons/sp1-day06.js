window.LESSON_DATA = {
  dayLabel: "Day 6",
  unit: "Unidad Colombia",
  title: "Estar + Emociones, Ir + Lugares",
  subtitle: "Express how you feel and where you're going using estar and ir",
  objectives: [
    "I can describe emotions using estar + adjective",
    "I can say where I'm going using ir + a + place",
    "I can express future plans with ir + a + infinitive"
  ],
  vocabCategory: 5,
  sections: [
    {
      id: "review",
      title: "Quick Review — 3 Preguntas",
      shortTitle: "Review",
      subtitle: "Answer quickly to activate what you know",
      icon: "⚡",
      accent: "yellow",
      open: true,
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "¿Cómo estás hoy?", placeholder: "Estoy..." },
            { prompt: "¿Adónde vas después de la clase?", placeholder: "Voy a..." },
            { prompt: "¿Qué vas a hacer esta noche?", placeholder: "Voy a..." }
          ]
        }
      ]
    },
    {
      id: "emotions",
      title: "Estar + Emociones",
      shortTitle: "Emotions",
      subtitle: "Learn to express feelings in Spanish",
      icon: "😊",
      accent: "blue",
      components: [
        {
          type: "callout",
          style: "info",
          text: "We use <strong>estar</strong> (not ser) for emotions and temporary states. The adjective must match the subject!"
        },
        {
          type: "flip-gallery",
          cards: [
            { es: "contento/a", en: "happy / content", hint: "Estoy contento" },
            { es: "triste", en: "sad", hint: "Está triste" },
            { es: "nervioso/a", en: "nervous", hint: "Estamos nerviosos" },
            { es: "cansado/a", en: "tired", hint: "Estoy cansada" },
            { es: "enojado/a", en: "angry", hint: "Está enojado" },
            { es: "emocionado/a", en: "excited", hint: "Estamos emocionadas" },
            { es: "enfermo/a", en: "sick", hint: "Estoy enfermo" },
            { es: "ocupado/a", en: "busy", hint: "Están ocupados" }
          ]
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "Yo ___ contenta hoy. (estar)", answer: "estoy" },
            { text: "Pablo ___ nervioso antes del examen. (estar)", answer: "está" },
            { text: "Nosotros ___ cansados después de la clase. (estar)", answer: "estamos" },
            { text: "Las estudiantes ___ emocionadas. (estar)", answer: "están" }
          ]
        }
      ]
    },
    {
      id: "ir",
      title: "Ir + a + Lugar / Infinitivo",
      shortTitle: "Ir",
      subtitle: "Say where you're going and what you're going to do",
      icon: "🚀",
      accent: "green",
      components: [
        {
          type: "discovery",
          title: "Two Uses of Ir",
          instructions: "ir + a + PLACE = where you're going · ir + a + INFINITIVE = what you're going to do",
          sentences: [
            "Yo <span class=\"highlight\">voy a</span> la biblioteca. (place)",
            "Tú <span class=\"highlight\">vas al</span> mercado. (place — a + el = al)",
            "Ella <span class=\"highlight\">va a</span> la cafetería. (place)",
            "Nosotros <span class=\"highlight\">vamos a estudiar</span>. (infinitive — future plan)",
            "Ellos <span class=\"highlight\">van a comer</span> arepas. (infinitive — future plan)"
          ],
          question: "What are all the forms of ir?",
          placeholder: "yo = voy, tú = vas, él/ella = ..., nosotros = ..., ellos = ..."
        },
        {
          type: "conj-table",
          verbs: [
            {
              infinitive: "ir (to go)",
              rows: [
                { pronoun: "yo", answer: "voy" },
                { pronoun: "tú", answer: "vas" },
                { pronoun: "él / ella / usted", answer: "va" },
                { pronoun: "nosotros/as", answer: "vamos" },
                { pronoun: "ellos / ellas / ustedes", answer: "van" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "reading",
      title: "Lectura — El viernes de Camila",
      shortTitle: "Reading",
      subtitle: "Read about Camila's Friday and identify estar + ir patterns",
      icon: "📖",
      accent: "purple",
      components: [
        {
          type: "reading",
          text: "Es viernes. Camila <span class=\"verb-highlight\">está</span> cansada después de la escuela. Primero, <span class=\"verb-highlight\">va</span> a la biblioteca porque <span class=\"gustar-highlight\">le gusta leer</span>. Después, <span class=\"verb-highlight\">va</span> al mercado con su mamá. En el mercado, Camila <span class=\"verb-highlight\">está</span> contenta porque hay frutas y música. Su mamá <span class=\"verb-highlight\">está</span> ocupada comprando comida. El sábado, Camila <span class=\"verb-highlight\">va a</span> bailar con sus amigas. <span class=\"verb-highlight\">Están</span> emocionadas.",
          instructions: "Click the highlighted words to hear them!"
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Cómo está Camila después de la escuela?", placeholder: "Camila está...", answer: "cansada" },
            { prompt: "¿Adónde va primero? ¿Y después?", type: "textarea", placeholder: "Primero va a... Después va a...", rows: 2 },
            { prompt: "¿Qué va a hacer el sábado?", placeholder: "Va a...", answer: "bailar" }
          ]
        },
        {
          type: "matching",
          wordBank: true,
          instructions: "Match <em>ir</em>, feelings, and places to their English meanings.",
          pairs: [
            { es: "ir", en: "to go" },
            { es: "voy", en: "I go" },
            { es: "contento/a", en: "happy" },
            { es: "triste", en: "sad" },
            { es: "el parque", en: "the park" }
          ]
        },
        {
          type: "sentence-order",
          prompt: "<strong>Put the words in order</strong> (Spanish): <em>Camila goes to the park.</em>",
          tokens: ["Camila", "va", "al", "parque."],
          correctOrder: [0, 1, 2, 3]
        }
      ]
    },
    {
      id: "partner",
      title: "Partner Talk — Feelings and Plans",
      shortTitle: "Partner",
      subtitle: "Practice estar and ir with a classmate",
      icon: "🗣️",
      accent: "orange",
      components: [
        {
          type: "partner-talk",
          title: "Conversación con tu compañero/a",
          prompt: "Take turns asking these questions:<br><strong>1.</strong> ¿Cómo estás hoy y por qué?<br><strong>2.</strong> ¿Adónde vas después de la escuela?<br><strong>3.</strong> ¿Qué vas a hacer este fin de semana?",
          duration: "4 minutes"
        },
        {
          type: "questions",
          questions: [
            { prompt: "Write your partner's answers:", type: "textarea", placeholder: "[Name] está... Va a... Va a hacer...", rows: 3 }
          ]
        }
      ]
    },
    {
      id: "exit",
      title: "Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Two sentences: one estar + emotion, one ir + place or infinitive",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 6",
          prompt: "Write two original sentences:",
          fields: [
            { label: "One sentence with estar + an emotion", placeholder: "Yo estoy... porque..." },
            { label: "One sentence with ir + a place OR ir + a + infinitive", placeholder: "Yo voy a..." }
          ]
        }
      ]
    }
  ]
};
