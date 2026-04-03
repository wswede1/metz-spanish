window.LESSON_DATA = {
  dayLabel: "Day 3",
  unit: "Unidad Colombia",
  title: "Examen de Vocabulario + Gramática -CAR/-GAR/-ZAR",
  subtitle: "Show vocab knowledge on a quiz, then discover the spelling changes in -CAR, -GAR, -ZAR preterite verbs",
  objectives: [
    "I can demonstrate knowledge of travel vocabulary",
    "I can identify the -CAR/-GAR/-ZAR yo spelling changes in the preterite",
    "I can apply the spelling change pattern in sentences"
  ],
  sections: [
    // ──────────────────────────────────────────────────
    // 1. Vocab Quiz — Section A: Matching
    // ──────────────────────────────────────────────────
    {
      id: "quiz-a",
      title: "Examen de Vocabulario — Sección A: Matching",
      shortTitle: "Quiz A",
      subtitle: "Match the travel words to their English meanings",
      icon: "📋",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "warn",
          text: "This is your <strong>vocabulary quiz</strong>. Do your best — no notes! Complete Sections A, B, and C."
        },
        {
          type: "matching",
          wordBank: true,
          instructions: "Match each Spanish travel word to its English meaning. No word bank hints this time!",
          pairs: [
            { id: "1", es: "el aeropuerto", en: "the airport" },
            { id: "2", es: "el equipaje", en: "the luggage" },
            { id: "3", es: "el boleto", en: "the ticket" },
            { id: "4", es: "el pasaporte", en: "the passport" },
            { id: "5", es: "la maleta", en: "the suitcase" },
            { id: "6", es: "el vuelo", en: "the flight" },
            { id: "7", es: "la aduana", en: "customs" },
            { id: "8", es: "el hotel", en: "the hotel" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 2. Vocab Quiz — Section B: Fill in the Blank
    // ──────────────────────────────────────────────────
    {
      id: "quiz-b",
      title: "Examen de Vocabulario — Sección B: Fill in the Blank",
      shortTitle: "Quiz B",
      subtitle: "Complete each preterite sentence with the correct travel word",
      icon: "📝",
      accent: "green",
      components: [
        {
          type: "fill-blanks",
          sentences: [
            { text: "Antes del viaje, yo preparé ___.", answer: "la maleta|maleta" },
            { text: "El ___ de Miami a Bogotá duró cinco horas.", answer: "vuelo" },
            { text: "Mi mamá compró ___ por internet.", answer: "el boleto|boleto" },
            { text: "Cuando llegamos al país, pasamos por ___.", answer: "la aduana|aduana" },
            { text: "Necesité mi ___ para entrar a Colombia.", answer: "pasaporte" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 3. Vocab Quiz — Section C: Short Answer
    // ──────────────────────────────────────────────────
    {
      id: "quiz-c",
      title: "Examen de Vocabulario — Sección C: Short Answer",
      shortTitle: "Quiz C",
      subtitle: "Answer each question using travel vocabulary and the preterite",
      icon: "✍️",
      accent: "purple",
      components: [
        {
          type: "questions",
          selfRubric: {
            id: "quiz-c-rubric",
            title: "Self-check (honor system):",
            items: [
              "I used preterite forms in the sentences that describe past actions.",
              "I included travel vocabulary from the unit (aeropuerto, hotel, pasaporte, etc.).",
              "Each answer is a full idea, not only one word."
            ],
            completeSectionWhenAllChecked: true
          },
          exemplarHtml: "<p><strong>Sample:</strong> Yo compré una revista en el aeropuerto. / Cuando llegué al hotel, yo saqué el pasaporte. El empleado me dio la llave. / 1) el pasaporte 2) el boleto 3) la maleta</p>",
          exemplarButtonLabel: "Show sample answers",
          questions: [
            {
              prompt: "Escribe una oración completa: ¿Qué compraste en el aeropuerto? (Use a travel vocab word + preterite)",
              type: "textarea",
              placeholder: "Yo compré...",
              rows: 2
            },
            {
              prompt: "Describe what happened when you arrived at the hotel. Write 2 sentences in the preterite using travel vocabulary.",
              type: "textarea",
              placeholder: "Cuando llegué al hotel, yo... El empleado...",
              rows: 3
            },
            {
              prompt: "Name 3 things you need before an international trip. Write them in Spanish.",
              type: "textarea",
              placeholder: "1) ... 2) ... 3) ...",
              rows: 2
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 4. Grammar Discovery — -CAR/-GAR/-ZAR
    // ──────────────────────────────────────────────────
    {
      id: "grammar",
      title: "Descubrimiento — Verbos -CAR, -GAR, -ZAR",
      shortTitle: "Discovery",
      subtitle: "Why does the YO form look different? Find the pattern!",
      icon: "🔍",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "In the preterite, <strong>-CAR, -GAR, and -ZAR</strong> verbs have a <strong>spelling change in the YO form only</strong>. This keeps the pronunciation correct! Look at the examples below and find the pattern."
        },
        {
          type: "discovery",
          title: "Find the Spelling Change Pattern",
          instructions: "Look at these YO preterite forms. What changes? Why do you think the spelling changes?",
          sentences: [
            "buscar → yo <span class=\"highlight\">busqué</span> (NOT buscé)",
            "tocar → yo <span class=\"highlight\">toqué</span> (NOT tocé)",
            "practicar → yo <span class=\"highlight\">practiqué</span> (NOT practicé)",
            "llegar → yo <span class=\"highlight\">llegué</span> (NOT llegé)",
            "pagar → yo <span class=\"highlight\">pagué</span> (NOT pagé)",
            "jugar → yo <span class=\"highlight\">jugué</span> (NOT jugé)",
            "empezar → yo <span class=\"highlight\">empecé</span> (NOT empezé)",
            "almorzar → yo <span class=\"highlight\">almorcé</span> (NOT almorzé)",
            "comenzar → yo <span class=\"highlight\">comencé</span> (NOT comenzé)"
          ],
          question: "What pattern do you see? What happens to C, G, and Z before the -é ending?",
          placeholder: "I notice that -CAR changes to... -GAR changes to... -ZAR changes to..."
        },
        {
          type: "callout",
          style: "info",
          text: "<strong>The Rules:</strong><br>-CAR → <strong>c → qu</strong> before é (busqué)<br>-GAR → <strong>g → gu</strong> before é (llegué)<br>-ZAR → <strong>z → c</strong> before é (empecé)<br><br>This ONLY happens in the <strong>yo</strong> form. All other forms are regular!"
        },
        {
          type: "conj-table",
          verbs: [
            {
              infinitive: "buscar (to look for)",
              rows: [
                { pronoun: "yo", answer: "busqué" },
                { pronoun: "tú", answer: "buscaste" },
                { pronoun: "él/ella/Ud.", answer: "buscó" },
                { pronoun: "nosotros", answer: "buscamos" },
                { pronoun: "ellos/ellas/Uds.", answer: "buscaron" }
              ]
            },
            {
              infinitive: "llegar (to arrive)",
              rows: [
                { pronoun: "yo", answer: "llegué" },
                { pronoun: "tú", answer: "llegaste" },
                { pronoun: "él/ella/Ud.", answer: "llegó" },
                { pronoun: "nosotros", answer: "llegamos" },
                { pronoun: "ellos/ellas/Uds.", answer: "llegaron" }
              ]
            },
            {
              infinitive: "empezar (to begin)",
              rows: [
                { pronoun: "yo", answer: "empecé" },
                { pronoun: "tú", answer: "empezaste" },
                { pronoun: "él/ella/Ud.", answer: "empezó" },
                { pronoun: "nosotros", answer: "empezamos" },
                { pronoun: "ellos/ellas/Uds.", answer: "empezaron" }
              ]
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 5. Practice — -CAR/-GAR/-ZAR Fill in the Blank
    // ──────────────────────────────────────────────────
    {
      id: "practice",
      title: "Práctica — -CAR/-GAR/-ZAR en Contexto",
      shortTitle: "Practice",
      subtitle: "Apply the spelling change rules in preterite sentences",
      icon: "✏️",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Remember: the spelling change only happens in the <strong>yo</strong> form! All other forms are regular."
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "Yo ___ al aeropuerto a las ocho. (llegar)", answer: "llegué" },
            { text: "Yo ___ el boleto en línea. (buscar)", answer: "busqué" },
            { text: "Yo ___ a hacer la maleta anoche. (empezar)", answer: "empecé" },
            { text: "Yo ___ el almuerzo en el hotel. (almorzar)", answer: "almorcé" },
            { text: "Yo ___ fútbol en la playa de Cartagena. (jugar)", answer: "jugué" },
            { text: "Yo ___ la cuenta en el restaurante. (pagar)", answer: "pagué" },
            { text: "Yo ___ la guitarra en la fiesta. (tocar)", answer: "toqué" },
            { text: "Yo ___ el viaje con entusiasmo. (comenzar)", answer: "comencé" }
          ]
        },
        {
          type: "mc-quiz",
          questions: [
            {
              prompt: "Yo _____ mi maleta en el hotel. (buscar)",
              options: [
                { value: "a", label: "buscé" },
                { value: "b", label: "busqué" },
                { value: "c", label: "buscó" },
                { value: "d", label: "busqué" }
              ],
              answer: "b"
            },
            {
              prompt: "Yo _____ a Colombia a las tres. (llegar)",
              options: [
                { value: "a", label: "llegé" },
                { value: "b", label: "llegó" },
                { value: "c", label: "llegué" },
                { value: "d", label: "llegamos" }
              ],
              answer: "c"
            },
            {
              prompt: "Yo _____ a estudiar español en agosto. (empezar)",
              options: [
                { value: "a", label: "empezé" },
                { value: "b", label: "empezó" },
                { value: "c", label: "empecé" },
                { value: "d", label: "empezamos" }
              ],
              answer: "c"
            },
            {
              prompt: "Which form is INCORRECT?",
              options: [
                { value: "a", label: "yo pagué" },
                { value: "b", label: "yo toqué" },
                { value: "c", label: "yo llegé" },
                { value: "d", label: "yo almorcé" }
              ],
              answer: "c"
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 6. Partner Talk + Exit Ticket
    // ──────────────────────────────────────────────────
    {
      id: "exit",
      title: "Conversación y Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Practice with a partner, then show what you know",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "partner-talk",
          title: "Conversación — ¿Qué hiciste?",
          prompt: "Take turns asking and answering these questions using -CAR/-GAR/-ZAR verbs in the yo preterite:<br><strong>1.</strong> ¿A qué hora llegaste a la escuela hoy? (llegar)<br><strong>2.</strong> ¿Qué buscaste en tu mochila esta mañana? (buscar)<br><strong>3.</strong> ¿A qué hora empezaste la tarea anoche? (empezar)",
          duration: "4 minutes"
        },
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 3",
          prompt: "Show the spelling change rules:",
          fields: [
            { label: "Write the yo preterite of TOCAR:", placeholder: "yo..." },
            { label: "Write the yo preterite of PAGAR:", placeholder: "yo..." },
            { label: "Write the yo preterite of COMENZAR:", placeholder: "yo..." },
            { label: "Write one original sentence using a -CAR, -GAR, or -ZAR verb in the yo preterite:", placeholder: "Yo jugué... / Yo llegué... / Yo empecé...", type: "textarea", rows: 2 }
          ]
        }
      ]
    }
  ]
};
