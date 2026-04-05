window.LESSON_DATA = {
  dayLabel: "Day 5",
  unit: "Unidad Colombia",
  title: "Pretérito — Verbos -IR con cambio de raíz",
  subtitle: "Stem-changing -IR verbs in the preterite: pedir, dormir, preferir — third person only",
  objectives: [
    "I can explain why some -IR verbs change the stem in él/ella and ellos preterite forms",
    "I can conjugate pedir, dormir, and preferir in the preterite",
    "I can use these verbs in Colombia travel contexts"
  ],
  vocabCategory: 5,
  sections: [
    {
      id: "warmup",
      title: "Warm-Up — Repaso Día 4",
      shortTitle: "Warm-Up",
      subtitle: "Quick Y-verb and Cartagena recall",
      icon: "🧠",
      accent: "yellow",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "No notes! Preterite forms only."
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "Ella ___ un artículo sobre el castillo. (leer — ella)", answer: "leyó" },
            { text: "Nosotros ___ la música en la plaza. (oír — nosotros)", answer: "oímos" },
            { text: "Ellos ___ la leyenda del Dorado. (creer — ellos)", answer: "creyeron" }
          ]
        }
      ]
    },
    {
      id: "discovery",
      title: "Descubrimiento — e→i / o→u",
      shortTitle: "Discovery",
      subtitle: "What changes in él/ella and ellos for pedir, dormir, preferir?",
      icon: "🔍",
      accent: "blue",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "Many stem-changing -IR verbs have a <strong>vowel change in the stem</strong> in the <strong>él/ella</strong> and <strong>ellos/ellas</strong> forms of the preterite — but <strong>not</strong> in yo, tú, or nosotros."
        },
        {
          type: "discovery",
          title: "Compare the forms",
          instructions: "Circle the forms that look different from the present-tense stem pattern.",
          sentences: [
            "Yo <span class=\"highlight\">pedí</span> agua en el restaurante.",
            "Tú <span class=\"highlight\">pediste</span> la cuenta.",
            "Ella <span class=\"highlight\">pidió</span> arepas con queso.",
            "Nosotros <span class=\"highlight\">pedimos</span> direcciones.",
            "Ellos <span class=\"highlight\">pidieron</span> un mapa de Cartagena.",
            "Yo <span class=\"highlight\">dormí</span> en el hotel.",
            "Él <span class=\"highlight\">durmió</span> ocho horas.",
            "Ellas <span class=\"highlight\">durmieron</span> en Medellín.",
            "Tú <span class=\"highlight\">preferiste</span> el vuelo directo.",
            "Usted <span class=\"highlight\">prefirió</span> el asiento de la ventana."
          ],
          question: "What happens to the stem vowel in él/ella and ellos for pedir, dormir, preferir?",
          placeholder: "In él/ella and ellos, the stem vowel changes to..."
        },
        {
          type: "callout",
          style: "info",
          text: "<strong>Rule of thumb:</strong> <strong>pedir → pid-</strong> (e→i) · <strong>dormir → durm-</strong> (o→u) · <strong>preferir → prefir-</strong> (e→i) in <strong>él/ella/Ud.</strong> and <strong>ellos/ellas/Uds.</strong> Preterite. Yo/tú/nosotros use the normal stem (ped-, dorm-, prefer-)."
        }
      ]
    },
    {
      id: "conj",
      title: "Tablas — pedir, dormir, preferir",
      shortTitle: "Conjugation",
      subtitle: "Fill in the preterite",
      icon: "📊",
      accent: "green",
      components: [
        {
          type: "conj-table",
          verbs: [
            {
              infinitive: "pedir (to ask for / order)",
              rows: [
                { pronoun: "yo", answer: "pedí" },
                { pronoun: "tú", answer: "pediste" },
                { pronoun: "él/ella/Ud.", answer: "pidió" },
                { pronoun: "nosotros", answer: "pedimos" },
                { pronoun: "ellos/ellas/Uds.", answer: "pidieron" }
              ]
            },
            {
              infinitive: "dormir (to sleep)",
              rows: [
                { pronoun: "yo", answer: "dormí" },
                { pronoun: "él/ella/Ud.", answer: "durmió" },
                { pronoun: "ellos/ellas/Uds.", answer: "durmieron" }
              ]
            },
            {
              infinitive: "preferir (to prefer)",
              rows: [
                { pronoun: "tú", answer: "preferiste" },
                { pronoun: "él/ella/Ud.", answer: "prefirió" },
                { pronoun: "nosotros", answer: "preferimos" },
                { pronoun: "ellos/ellas/Uds.", answer: "prefirieron" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "practice",
      title: "Práctica — En el aeropuerto y el hotel",
      shortTitle: "Practice",
      subtitle: "Choose the correct preterite form",
      icon: "✏️",
      accent: "purple",
      components: [
        {
          type: "fill-blanks",
          sentences: [
            { text: "El turista ___ una habitación con vista al mar. (pedir — él)", answer: "pidió" },
            { text: "Nosotros no ___ bien por el ruido del avión. (dormir — nosotros)", answer: "dormimos" },
            { text: "Los pasajeros ___ asiento en el pasillo. (preferir — ellos)", answer: "prefirieron" },
            { text: "Yo ___ café después del desayuno. (pedir — yo)", answer: "pedí" },
            { text: "¿Tú ___ el tour a la ciudad amurallada? (preferir — tú)", answer: "preferiste" }
          ]
        },
        {
          type: "mc-quiz",
          questions: [
            {
              prompt: "Ellos _____ más tiempo en Bogotá. (preferir)",
              options: [
                { value: "a", label: "prefirió" },
                { value: "b", label: "prefirieron" },
                { value: "c", label: "preferieron" },
                { value: "d", label: "pidieron" }
              ],
              answer: "b"
            },
            {
              prompt: "La familia _____ en un hostal cerca del centro. (dormir)",
              options: [
                { value: "a", label: "durmieron" },
                { value: "b", label: "dormieron" },
                { value: "c", label: "durmió" },
                { value: "d", label: "durmimos" }
              ],
              answer: "a"
            }
          ]
        },
        {
          type: "matching",
          wordBank: true,
          instructions: "Match stem-changing <strong>-IR</strong> preterites to their English meanings.",
          pairs: [
            { es: "pidió", en: "he/she asked for" },
            { es: "durmió", en: "he/she slept" },
            { es: "prefirió", en: "he/she preferred" },
            { es: "dijeron", en: "they said" },
            { es: "vinieron", en: "they came" }
          ]
        },
        {
          type: "sentence-order",
          prompt: "<strong>Put the words in order</strong> (Spanish): <em>She preferred to sleep at the hotel.</em>",
          tokens: ["Ella", "prefirió", "dormir", "en", "el", "hotel."],
          correctOrder: [0, 1, 2, 3, 4, 5]
        }
      ]
    },
    {
      id: "exit",
      title: "Boleto de Salida — Day 5",
      shortTitle: "Exit",
      subtitle: "Show the stem-change pattern",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Salida",
          prompt: "Stem-changing -IR preterite:",
          fields: [
            { label: "Él/ella preterite of PEDIR:", placeholder: "pidió" },
            { label: "Ellos preterite of DORMIR:", placeholder: "durmieron" },
            { label: "One original sentence about travel using pedir, dormir, or preferir in preterite:", type: "textarea", rows: 2, placeholder: "Ayer yo pedí..." }
          ]
        }
      ]
    }
  ]
};
