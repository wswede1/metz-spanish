window.LESSON_DATA = {
  dayLabel: "Day 13",
  unit: "Unidad Colombia",
  title: "Review Stations",
  subtitle: "Rotate through 5 stations to review all grammar and vocabulary before the exam",
  objectives: [
    "I can demonstrate vocabulary knowledge from the unit",
    "I can conjugate -ER/-IR verbs and use gustar correctly",
    "I can write sentences with estar + location/emotion and ir + place/infinitive"
  ],
  vocabCategory: "all",
  sections: [
    {
      id: "station1",
      title: "Station 1 — Vocabulary Review",
      shortTitle: "Vocab",
      subtitle: "Match vocabulary words to their meanings",
      icon: "📚",
      accent: "blue",
      open: true,
      components: [
        {
          type: "matching",
          wordBank: true,
          instructions: "Click a Spanish word, then click its English meaning.",
          pairs: [
            { id: "1", es: "el mercado", en: "the market" },
            { id: "2", es: "la ventana", en: "the window" },
            { id: "3", es: "la mochila", en: "the backpack" },
            { id: "4", es: "la ciudad", en: "the city" },
            { id: "5", es: "la costa", en: "the coast" },
            { id: "6", es: "la bandera", en: "the flag" }
          ]
        }
      ]
    },
    {
      id: "station2",
      title: "Station 2 — -ER/-IR + Gustar",
      shortTitle: "Verbs",
      subtitle: "Conjugate verbs and complete gustar sentences",
      icon: "🔀",
      accent: "green",
      components: [
        {
          type: "fill-blanks",
          sentences: [
            { text: "Yo ___ arepas en la cafetería. (comer)", answer: "como" },
            { text: "A mí me gusta ___ música colombiana. (escuchar)", answer: "escuchar" },
            { text: "Nosotros ___ en Bogotá. (vivir)", answer: "vivimos" },
            { text: "Tú ___ en el cuaderno. (escribir)", answer: "escribes" },
            { text: "A Pablo le ___ las montañas. (gustar — plural)", answer: "gustan" }
          ]
        }
      ]
    },
    {
      id: "station3",
      title: "Station 3 — Estar + Location",
      shortTitle: "Estar",
      subtitle: "Write sentences describing where things are",
      icon: "📍",
      accent: "purple",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Write complete sentences using <strong>estar + preposition</strong>."
        },
        {
          type: "questions",
          questions: [
            { prompt: "The book is on the table:", placeholder: "El libro está...", answer: "encima de la mesa" },
            { prompt: "The backpack is next to the chair:", placeholder: "La mochila está...", answer: "al lado de la silla" },
            { prompt: "The students are in the class:", placeholder: "Los estudiantes están...", answer: "en la clase" }
          ]
        }
      ]
    },
    {
      id: "station4",
      title: "Station 4 — Emotions + Ir",
      shortTitle: "Emotions",
      subtitle: "Complete sentences with estar + emotion and ir + place",
      icon: "😊",
      accent: "orange",
      components: [
        {
          type: "fill-blanks",
          sentences: [
            { text: "Nosotros ___ cansados hoy. (estar)", answer: "estamos" },
            { text: "Yo voy a ___ después de la escuela. (ir + place)", answer: "la biblioteca|la casa|el parque" },
            { text: "María ___ contenta porque es viernes. (estar)", answer: "está" },
            { text: "Ellos van a ___ este fin de semana. (ir + infinitive)", answer: "bailar|comer|estudiar|correr" }
          ]
        }
      ]
    },
    {
      id: "station5",
      title: "Station 5 — Reading Comprehension",
      shortTitle: "Reading",
      subtitle: "Read the passage and answer questions",
      icon: "📖",
      accent: "teal",
      components: [
        {
          type: "reading",
          text: "Ana <span class=\"verb-highlight\">vive</span> en Bogotá, Colombia. Todos los días <span class=\"verb-highlight\">va</span> al colegio. <span class=\"gustar-highlight\">Le gusta leer</span> libros de ciencias y <span class=\"gustar-highlight\">le gusta comer</span> frutas en el mercado. Después de la escuela, Ana <span class=\"verb-highlight\">va</span> a la biblioteca. Hoy Ana <span class=\"verb-highlight\">está</span> contenta porque mañana es sábado.",
          instructions: "Click highlighted words to hear pronunciation."
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Dónde vive Ana?", placeholder: "Ana vive en...", answer: "Bogotá" },
            { prompt: "Name two things Ana likes or does:", type: "textarea", placeholder: "Le gusta... y va a...", rows: 2 },
            { prompt: "¿Cómo está Ana hoy? ¿Por qué?", placeholder: "Ana está... porque...", answer: "contenta" }
          ]
        }
      ]
    },
    {
      id: "selfcheck",
      title: "Self-Check — Exam Readiness",
      shortTitle: "Self-Check",
      subtitle: "Identify your strengths and what to study tonight",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Self-Assessment",
          prompt: "Be honest — this helps you study effectively!",
          fields: [
            { label: "My strongest station was... because...", type: "textarea", placeholder: "Station... was easiest because...", rows: 2 },
            { label: "I still need to review... before the exam", type: "textarea", placeholder: "I need to study...", rows: 2 },
            { label: "My study plan for tonight:", placeholder: "I will review... by..." }
          ]
        }
      ]
    }
  ]
};
