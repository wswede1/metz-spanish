window.LESSON_DATA = {
  dayLabel: "Day 14",
  unit: "Unidad Colombia",
  title: "Examen de la Unidad Colombia",
  subtitle: "Show everything you've learned — listening, reading, grammar, and writing",
  objectives: [
    "I can demonstrate listening comprehension of Spanish",
    "I can read a passage and answer comprehension questions",
    "I can conjugate verbs and use gustar, estar, and ir correctly",
    "I can write original sentences using all unit grammar"
  ],
  sections: [
    {
      id: "listening",
      title: "Section 1 — Listening",
      shortTitle: "Listening",
      subtitle: "Your teacher will read statements and dialogues. Answer in English unless told otherwise.",
      icon: "👂",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "warn",
          text: "<strong>Exam conditions:</strong> No talking. Listen carefully. Your teacher will read each item twice."
        },
        {
          type: "questions",
          questions: [
            { prompt: "Item 1: What city does the speaker mention?", placeholder: "The city is..." },
            { prompt: "Item 2: True or False — The speaker prefers the library.", placeholder: "True / False" },
            { prompt: "Item 3: Where is the backpack?", placeholder: "The backpack is..." },
            { prompt: "Item 4: How does the speaker feel?", placeholder: "The speaker feels..." },
            { prompt: "Item 5: What will the speaker do after school?", placeholder: "The speaker will..." }
          ]
        }
      ]
    },
    {
      id: "reading",
      title: "Section 2 — Reading Comprehension",
      shortTitle: "Reading",
      subtitle: "Read the passage carefully, then answer the questions",
      icon: "📖",
      accent: "green",
      components: [
        {
          type: "reading",
          text: "Laura <span class=\"verb-highlight\">vive</span> en Cartagena, Colombia. Es una ciudad bonita en la costa del Caribe. Laura <span class=\"verb-highlight\">va</span> al colegio todos los días. <span class=\"gustar-highlight\">Le gusta bailar</span> salsa y <span class=\"gustar-highlight\">le gusta comer</span> arepas con su familia. Después de la escuela, Laura <span class=\"verb-highlight\">va</span> a la biblioteca para estudiar. Laura <span class=\"verb-highlight\">está</span> contenta porque <span class=\"gustar-highlight\">le gustan</span> sus clases."
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Dónde vive Laura?", placeholder: "Laura vive en..." },
            { prompt: "Name two things Laura likes or does:", type: "textarea", placeholder: "Le gusta... y le gusta...", rows: 2 },
            { prompt: "¿Por qué va Laura a la biblioteca?", placeholder: "Va a la biblioteca para..." }
          ]
        }
      ]
    },
    {
      id: "grammar",
      title: "Section 3 — Grammar",
      shortTitle: "Grammar",
      subtitle: "Complete each sentence with the correct verb form",
      icon: "✏️",
      accent: "purple",
      components: [
        {
          type: "fill-blanks",
          sentences: [
            { text: "Yo ___ café en la mañana. (beber)", answer: "bebo" },
            { text: "Nosotros ___ en Medellín. (vivir)", answer: "vivimos" },
            { text: "A mí me gusta ___ español. (estudiar)", answer: "estudiar" },
            { text: "La mochila ___ al lado de la silla. (estar)", answer: "está" },
            { text: "Yo voy a ___ después de la escuela. (an activity)", answer: "estudiar|comer|correr|bailar|leer" }
          ]
        }
      ]
    },
    {
      id: "writing",
      title: "Section 4 — Writing",
      shortTitle: "Writing",
      subtitle: "Write 5-6 sentences about yourself using all the grammar from this unit",
      icon: "📝",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>Requirements:</strong> Your paragraph must include: <strong>1)</strong> a location sentence with estar, <strong>2)</strong> a sentence with gustar, <strong>3)</strong> a sentence with ir, and <strong>4)</strong> at least one -ER or -IR verb."
        },
        {
          type: "questions",
          questions: [
            {
              prompt: "Write your paragraph (5-6 sentences in Spanish):",
              type: "textarea",
              placeholder: "Yo vivo en... Estoy... Me gusta... Voy a... Como/Escribo/Leo...",
              rows: 8
            }
          ]
        }
      ]
    },
    {
      id: "done",
      title: "Exam Complete",
      shortTitle: "Done",
      subtitle: "You finished the Colombia unit!",
      icon: "🎉",
      accent: "red",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "When you're finished, review your answers. Make sure every sentence has a verb and makes sense. Then submit to your teacher. <strong>¡Buen trabajo en la Unidad Colombia!</strong>"
        }
      ]
    }
  ]
};
