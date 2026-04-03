window.LESSON_DATA = {
  dayLabel: "Day 14",
  unit: "Unidad Colombia",
  title: "Examen de la Unidad Colombia",
  subtitle: "Show everything you've learned — listening, reading, grammar, and writing in the preterite",
  objectives: [
    "I can demonstrate listening comprehension of Spanish in the preterite",
    "I can read a passage in the preterite and answer comprehension questions",
    "I can conjugate all preterite patterns: regular, -CAR/-GAR/-ZAR, Y-verbs, stem-changers, and irregulars",
    "I can write original sentences using a variety of preterite verb forms"
  ],
  sections: [
    {
      id: "listening",
      title: "Section 1 — Listening",
      shortTitle: "Listening",
      subtitle: "Your teacher will read statements and dialogues. Listen carefully and answer.",
      icon: "👂",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "warn",
          text: "<strong>Exam conditions:</strong> No talking. No notes. Listen carefully — your teacher will read each item twice. All items use the <strong>preterite tense</strong>."
        },
        {
          type: "questions",
          questions: [
            { prompt: "Item 1: What city did the speaker mention?", placeholder: "The city is..." },
            { prompt: "Item 2: True or False — The speaker visited the market.", placeholder: "True / False" },
            { prompt: "Item 3: Where did the backpack end up?", placeholder: "The backpack ended up..." },
            { prompt: "Item 4: How did the speaker feel after the trip?", placeholder: "The speaker felt..." },
            { prompt: "Item 5: What did the speaker do after arriving at the hotel?", placeholder: "The speaker..." }
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
          text: "Laura <span class=\"verb-highlight\">visitó</span> Cartagena el verano pasado con su familia. Ellos <span class=\"verb-highlight\">llegaron</span> al aeropuerto por la mañana y <span class=\"verb-highlight\">tomaron</span> un taxi a la ciudad amurallada. Laura <span class=\"verb-highlight\">caminó</span> por las calles coloniales y <span class=\"verb-highlight\">sacó</span> muchas fotos de los edificios coloridos. En el mercado, su mamá <span class=\"verb-highlight\">compró</span> frutas tropicales y Laura <span class=\"verb-highlight\">probó</span> una arepa de huevo por primera vez. Por la tarde, ellos <span class=\"verb-highlight\">fueron</span> a la playa. Laura <span class=\"verb-highlight\">nadó</span> en el mar Caribe y su hermano <span class=\"verb-highlight\">leyó</span> un libro debajo de una palmera. Esa noche, la familia <span class=\"verb-highlight\">comió</span> en un restaurante y <span class=\"verb-highlight\">oyó</span> música de cumbia. Laura <span class=\"verb-highlight\">dijo</span>: \"¡<span class=\"verb-highlight\">Fue</span> el mejor día de mi vida!\"",
          instructions: "All highlighted verbs are in the preterite. Read the passage, then answer the questions below."
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Cuándo visitó Laura Cartagena y con quién fue?", placeholder: "Laura visitó Cartagena..." },
            { prompt: "¿Qué hizo Laura en el mercado? ¿Qué compró su mamá?", type: "textarea", placeholder: "En el mercado, Laura... Su mamá...", rows: 2 },
            { prompt: "¿Qué hicieron Laura y su hermano en la playa?", type: "textarea", placeholder: "Laura nadó... Su hermano...", rows: 2 }
          ]
        }
      ]
    },
    {
      id: "grammar",
      title: "Section 3 — Grammar",
      shortTitle: "Grammar",
      subtitle: "Complete each sentence with the correct preterite form",
      icon: "✏️",
      accent: "purple",
      components: [
        {
          type: "callout",
          style: "info",
          text: "This section covers ALL preterite patterns: regular, -CAR/-GAR/-ZAR spelling changes, Y-verbs, stem-changers, and irregulars."
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "Yo ___ café en la mañana. (beber)", answer: "bebí" },
            { text: "Nosotros ___ a Medellín el mes pasado. (ir)", answer: "fuimos" },
            { text: "Ella ___ un libro en la biblioteca. (leer)", answer: "leyó" },
            { text: "El mesero ___ la comida rápidamente. (servir)", answer: "sirvió" },
            { text: "Yo ___ temprano al aeropuerto. (llegar)", answer: "llegué" }
          ]
        }
      ]
    },
    {
      id: "writing",
      title: "Section 4 — Writing",
      shortTitle: "Writing",
      subtitle: "Write an original paragraph using a variety of preterite forms",
      icon: "✍️",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>Writing task:</strong> Write <strong>5–6 sentences</strong> in Spanish about a real or imaginary trip to Colombia. Your paragraph MUST include at least one example of each:<br><br>• <strong>Regular preterite</strong> (e.g., caminé, comió, vivieron)<br>• <strong>-CAR / -GAR / -ZAR</strong> yo-form (e.g., busqué, llegué, empecé)<br>• <strong>Irregular preterite</strong> (e.g., fui, hice, tuve, dijo)<br>• <strong>Stem-change or Y-verb</strong> (e.g., pidió, durmió, leyó, oyó)<br><br>Underline or mark your preterite verbs with *asterisks* so they are easy to identify."
        },
        {
          type: "questions",
          questions: [
            { prompt: "Write your paragraph here (5–6 sentences, all four preterite patterns):", type: "textarea", placeholder: "El verano pasado, yo *viajé* a Colombia con mi familia. Nosotros *llegamos* a Bogotá y yo *busqué* un buen restaurante. ...", rows: 8 }
          ]
        }
      ]
    },
    {
      id: "complete",
      title: "Section 5 — Exam Complete",
      shortTitle: "Done",
      subtitle: "You finished the Colombia unit exam!",
      icon: "🎉",
      accent: "teal",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>¡Felicidades!</strong> You have completed the Unidad Colombia exam. Review your answers one more time before submitting. Make sure:<br><br>✓ All listening answers are filled in<br>✓ Reading questions are answered in complete thoughts<br>✓ Grammar blanks have the correct preterite forms<br>✓ Your writing paragraph has 5–6 sentences with all four preterite patterns<br><br>When you're confident, raise your hand to submit. <strong>¡Buen trabajo!</strong>"
        }
      ]
    }
  ]
};
