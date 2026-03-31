window.LESSON_DATA = {
  dayLabel: "Day 4",
  unit: "Unidad Colombia",
  title: "Práctica — -ER/-IR y Gustar",
  subtitle: "Strengthen your verb skills with reading, practice exercises, and partner conversation",
  objectives: [
    "I can conjugate -ER/-IR verbs from memory",
    "I can use gustar + infinitive and gustar + noun",
    "I can read a passage and identify verbs and preferences"
  ],
  sections: [
    {
      id: "warmup",
      title: "Warm-Up — Conjugation Recall",
      shortTitle: "Warm-Up",
      subtitle: "How much do you remember from Day 3?",
      icon: "🧠",
      accent: "yellow",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "Write the correct conjugated form. No notes — test your memory!"
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "Yo ___ arepas en la cafetería. (comer)", answer: "como" },
            { text: "Tú ___ en el cuaderno. (escribir)", answer: "escribes" },
            { text: "Ella ___ en Cartagena. (vivir)", answer: "vive" },
            { text: "¿Te gusta ___? Sí, me gusta mucho. (estudiar)", answer: "estudiar" }
          ]
        }
      ]
    },
    {
      id: "reading",
      title: "Lectura — Un adolescente en Medellín",
      shortTitle: "Reading",
      subtitle: "Read about Andrés and answer the comprehension questions",
      icon: "📖",
      accent: "blue",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "<strong>Glossary:</strong> escucha = listens · fines de semana = weekends · va = goes"
        },
        {
          type: "reading",
          text: "Andrés <span class=\"verb-highlight\">vive</span> en Medellín, Colombia. Todos los días, <span class=\"verb-highlight\">come</span> el desayuno con su familia. En el colegio, <span class=\"verb-highlight\">escribe</span> en el cuaderno y <span class=\"verb-highlight\">lee</span> libros de ciencias. <span class=\"gustar-highlight\">A Andrés le gusta</span> escuchar música colombiana — especialmente el vallenato. Los fines de semana, va al mercado con su mamá y <span class=\"verb-highlight\">come</span> arepas con queso. <span class=\"gustar-highlight\">Le gusta correr</span> en el parque cerca de su casa.",
          instructions: "Click highlighted verbs to hear them. Then answer the questions below."
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Dónde vive Andrés?", placeholder: "Andrés vive en...", answer: "Medellín" },
            { prompt: "List 2 things Andrés likes (gustar):", type: "textarea", placeholder: "Le gusta... y le gusta...", rows: 2 },
            { prompt: "What does Andrés do at school? (Name 2 actions)", type: "textarea", placeholder: "Andrés escribe... y lee...", rows: 2 },
            { prompt: "Where does he go on weekends?", placeholder: "Va al...", answer: "mercado" }
          ]
        }
      ]
    },
    {
      id: "practice",
      title: "Choose the Correct Form",
      shortTitle: "Practice",
      subtitle: "Pick the right conjugation or gustar structure",
      icon: "✏️",
      accent: "green",
      components: [
        {
          type: "mc-quiz",
          questions: [
            {
              prompt: "Nosotros _____ en la cafetería. (comer)",
              options: [
                { value: "a", label: "come" },
                { value: "b", label: "comemos" },
                { value: "c", label: "comen" },
                { value: "d", label: "comer" }
              ],
              answer: "b"
            },
            {
              prompt: "A María le _____ bailar cumbia.",
              options: [
                { value: "a", label: "gustan" },
                { value: "b", label: "gusto" },
                { value: "c", label: "gusta" },
                { value: "d", label: "gustas" }
              ],
              answer: "c"
            },
            {
              prompt: "Los estudiantes _____ muchas notas. (escribir)",
              options: [
                { value: "a", label: "escribo" },
                { value: "b", label: "escribe" },
                { value: "c", label: "escribimos" },
                { value: "d", label: "escriben" }
              ],
              answer: "d"
            },
            {
              prompt: "A mí me _____ las arepas.",
              options: [
                { value: "a", label: "gusta" },
                { value: "b", label: "gustan" },
                { value: "c", label: "gusto" },
                { value: "d", label: "gustamos" }
              ],
              answer: "b"
            }
          ]
        }
      ]
    },
    {
      id: "gustar-practice",
      title: "Gustar — Deep Practice",
      shortTitle: "Gustar",
      subtitle: "Master gusta vs. gustan and gustar + infinitive",
      icon: "💡",
      accent: "purple",
      components: [
        {
          type: "discovery",
          title: "Remember the Rule",
          instructions: "gusta + singular noun OR infinitive · gustan + plural noun",
          sentences: [
            "Me <span class=\"highlight\">gusta</span> el café. (singular noun)",
            "Me <span class=\"highlight\">gustan</span> las arepas. (plural noun)",
            "Me <span class=\"highlight\">gusta</span> bailar. (infinitive)",
            "A Pablo <span class=\"highlight\">le gusta</span> la cumbia. (singular)",
            "Nos <span class=\"highlight\">gustan</span> los libros. (plural)"
          ]
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "A mí me ___ la música colombiana. (singular)", answer: "gusta" },
            { text: "Me ___ las montañas de Colombia. (plural)", answer: "gustan" },
            { text: "A Pablo le ___ correr en el parque. (infinitive)", answer: "gusta" },
            { text: "Nos ___ los mercados de Cartagena. (plural)", answer: "gustan" },
            { text: "¿Te ___ escribir en español? (infinitive)", answer: "gusta" }
          ]
        }
      ]
    },
    {
      id: "partner",
      title: "Interpersonal — Partner Interview",
      shortTitle: "Partner",
      subtitle: "Practice speaking with a classmate",
      icon: "🗣️",
      accent: "orange",
      components: [
        {
          type: "partner-talk",
          title: "Entrevista con tu compañero/a",
          prompt: "Take turns asking and answering these questions:<br><strong>1.</strong> ¿Qué te gusta hacer los fines de semana?<br><strong>2.</strong> ¿Qué comes en el desayuno?<br><strong>3.</strong> ¿Dónde vives?<br>Write your partner's answers below!",
          duration: "5 minutes"
        },
        {
          type: "questions",
          questions: [
            { prompt: "Partner's name:", placeholder: "Mi compañero/a se llama..." },
            { prompt: "What does your partner like to do?", placeholder: "A [name] le gusta...", type: "textarea", rows: 2 },
            { prompt: "What does your partner eat for breakfast?", placeholder: "[Name] come..." }
          ]
        }
      ]
    },
    {
      id: "exit",
      title: "Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Write two original sentences",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 4",
          prompt: "Write one sentence with an -ER or -IR verb and one with gustar:",
          fields: [
            { label: "One sentence with an -ER or -IR verb", placeholder: "Yo como... / Nosotros vivimos..." },
            { label: "One sentence with Me gusta + infinitive or noun", placeholder: "Me gusta... / Me gustan..." }
          ]
        }
      ]
    }
  ]
};
