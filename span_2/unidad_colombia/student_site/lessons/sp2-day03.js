window.LESSON_DATA = {
  dayLabel: "Day 3",
  unit: "Unidad Colombia",
  title: "Repaso de vocabulario + Gramática -CAR/-GAR/-ZAR",
  subtitle: "Repaso rápido del vocabulario de viaje, luego descubre y practica los cambios ortográficos en el pretérito (yo).",
  objectives: [
    "I can review travel vocabulary in matching and fill-in activities.",
    "I can explain why -CAR, -GAR, and -ZAR verbs change spelling in the yo preterite.",
    "I can write the correct yo forms and use them in context."
  ],
  vocabCategory: "all",
  sections: [
    // ──────────────────────────────────────────────────
    // 1. Vocab repaso — Section A: Matching
    // ──────────────────────────────────────────────────
    {
      id: "quiz-a",
      title: "Repaso de vocabulario — Sección A: Matching",
      shortTitle: "Repaso A",
      subtitle: "Match the travel words to their English meanings",
      icon: "📋",
      accent: "blue",
      open: true,
      components: [
        {
          type: "matching",
          wordBank: true,
          instructions: "Match each Spanish travel word to its English meaning.",
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
    // 2. Vocab repaso — Section B: Fill in the Blank
    // ──────────────────────────────────────────────────
    {
      id: "quiz-b",
      title: "Repaso de vocabulario — Sección B: Fill in the Blank",
      shortTitle: "Repaso B",
      subtitle: "Complete each preterite sentence with the correct travel word",
      icon: "📝",
      accent: "green",
      components: [
        {
          type: "fill-blanks",
          wordBank: ["la maleta", "maleta", "el vuelo", "vuelo", "el boleto", "boleto", "la aduana", "aduana", "el pasaporte", "pasaporte"],
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
          style: "info",
          text: "<strong>Primero, lee.</strong> Las oraciones usan el pretérito de <strong>yo</strong> con verbos <strong>-CAR, -GAR y -ZAR</strong>. Son <strong>oraciones de práctica</strong>."
        },
        {
          type: "reading",
          text: "<p>Imagina un viaje a Colombia.</p><p>Ayer yo <span class=\"verb-highlight\">busqué</span> mi pasaporte en la mochila antes del vuelo. Cuando yo <span class=\"verb-highlight\">llegué</span> al hotel en Cartagena, yo <span class=\"verb-highlight\">pagué</span> la cuenta del taxi. Por la tarde yo <span class=\"verb-highlight\">empecé</span> un recorrido por la ciudad y yo <span class=\"verb-highlight\">toqué</span> la puerta de una cafetería pequeña.</p>"
        },
        {
          type: "callout",
          style: "fire",
          text: "In the preterite, <strong>-CAR, -GAR, and -ZAR</strong> verbs have a <strong>spelling change in the YO form only</strong>. This keeps the pronunciation correct! Study the examples below, then name the pattern."
        },
        {
          type: "discovery",
          title: "Find the Spelling Change Pattern",
          instructions: "Each row groups verbs by ending. The English gloss is below the Spanish line.",
          groups: [
            {
              label: "Verbos en -CAR",
              items: [
                {
                  esHtml: "buscar → yo <span class=\"highlight\">busqué</span> <span style=\"font-weight:600;color:var(--col-red);\">(NOT buscé)</span>",
                  en: "to look for → I looked for; the spelling keeps the hard /k/ sound"
                },
                {
                  esHtml: "tocar → yo <span class=\"highlight\">toqué</span> <span style=\"font-weight:600;color:var(--col-red);\">(NOT tocé)</span>",
                  en: "to touch / to play (an instrument) → I touched / I played"
                },
                {
                  esHtml: "practicar → yo <span class=\"highlight\">practiqué</span> <span style=\"font-weight:600;color:var(--col-red);\">(NOT practicé)</span>",
                  en: "to practice → I practiced"
                }
              ]
            },
            {
              label: "Verbos en -GAR y -ZAR",
              items: [
                {
                  esHtml: "llegar → yo <span class=\"highlight\">llegué</span> <span style=\"font-weight:600;color:var(--col-red);\">(NOT llegé)</span>",
                  en: "to arrive → I arrived"
                },
                {
                  esHtml: "pagar → yo <span class=\"highlight\">pagué</span> <span style=\"font-weight:600;color:var(--col-red);\">(NOT pagé)</span>",
                  en: "to pay → I paid"
                },
                {
                  esHtml: "jugar → yo <span class=\"highlight\">jugué</span> <span style=\"font-weight:600;color:var(--col-red);\">(NOT jugé)</span>",
                  en: "to play (a sport/game) → I played"
                },
                {
                  esHtml: "empezar → yo <span class=\"highlight\">empecé</span> <span style=\"font-weight:600;color:var(--col-red);\">(NOT empezé)</span>",
                  en: "to begin → I began"
                },
                {
                  esHtml: "almorzar → yo <span class=\"highlight\">almorcé</span> <span style=\"font-weight:600;color:var(--col-red);\">(NOT almorzé)</span>",
                  en: "to eat lunch → I ate lunch"
                },
                {
                  esHtml: "comenzar → yo <span class=\"highlight\">comencé</span> <span style=\"font-weight:600;color:var(--col-red);\">(NOT comenzé)</span>",
                  en: "to begin → I began"
                }
              ]
            }
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
        },
        {
          type: "matching",
          wordBank: true,
          instructions: "Match travel words and key <strong>yo</strong> preterite forms (-CAR / -GAR / -ZAR).",
          pairs: [
            { es: "el aeropuerto", en: "airport" },
            { es: "el hotel", en: "hotel" },
            { es: "la maleta", en: "suitcase" },
            { es: "llegué", en: "I arrived" },
            { es: "busqué", en: "I looked for" }
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
                { value: "d", label: "buscamos" }
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
        },
        {
          type: "sentence-order",
          prompt: "<strong>Put the words in order</strong> (Spanish): <em>I looked for my suitcase at the airport.</em>",
          tokens: ["Yo", "busqué", "mi maleta", "en", "el", "aeropuerto."],
          correctOrder: [0, 1, 2, 3, 4, 5]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 6. Explora Colombia + Exit Ticket
    // ──────────────────────────────────────────────────
    {
      id: "exit",
      title: "Explora Colombia y Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Discover Colombia online, then show what you know",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "partner-talk",
          title: "Explora Colombia en línea",
          prompt: "<p><strong>Your mission:</strong> Find <strong>one</strong> short, school-appropriate YouTube video about <strong>Colombia</strong>. If you are not sure whether a video is okay, ask your teacher.</p><p><strong>Search ideas</strong> (try these in YouTube):</p><ul style=\"margin:8px 0 12px 20px;line-height:1.55;\"><li>Colombia Amazon rainforest animals</li><li>Colombia biodiversity</li><li>páramo Colombia nature</li><li>Café de Colombia (coffee farms)</li><li>Cartagena Colombia culture (preview first)</li><li>Medellín Colombia metro / comuna (choose age-friendly videos)</li></ul><p><strong>On our class site</strong> you can also explore:</p><ul style=\"margin:8px 0 12px 20px;line-height:1.55;\"><li><a href=\"../index.html#hub-listening\">Listening activities</a></li><li><a href=\"../index.html#hub-podcasts\">Podcasts</a></li></ul><p><strong>Optional:</strong> Share with a partner one new fact you learned — in Spanish if you can.</p>",
          duration: "10 min"
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
