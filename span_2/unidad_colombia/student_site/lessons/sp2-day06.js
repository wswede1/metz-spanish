window.LESSON_DATA = {
  dayLabel: "Day 6",
  unit: "Unidad Colombia",
  title: "Pretérito irregular — decir, traer, venir",
  subtitle: "High-frequency irregulars: dij-, traj-, vin- (watch accents and singular/plural)",
  objectives: [
    "I can conjugate decir, traer, and venir in the preterite",
    "I can recognize these forms in short Colombia travel dialogues",
    "I can avoid mixing these stems with regular -ER/-IR patterns"
  ],
  vocabCategory: 5,
  sections: [
    {
      id: "warmup",
      title: "Warm-Up — Día 5",
      shortTitle: "Warm-Up",
      subtitle: "Stem-change -IR quick check",
      icon: "🧠",
      accent: "yellow",
      open: true,
      components: [
        {
          type: "fill-blanks",
          sentences: [
            { text: "El guía ___ mapas para el grupo. (pedir — él)", answer: "pidió" },
            { text: "Mis amigos no ___ en el hotel ruidoso. (dormir — ellos)", answer: "durmieron" },
            { text: "Nosotros ___ vuelo por la mañana. (preferir — nosotros)", answer: "preferimos" }
          ]
        }
      ]
    },
    {
      id: "charts",
      title: "Tres verbos irregulares",
      shortTitle: "Charts",
      subtitle: "No accent on the irregular stems di-, traj-, vin-",
      icon: "📊",
      accent: "blue",
      components: [
        {
          type: "callout",
          style: "warn",
          text: "<strong>decir</strong> → dije, dijiste, <strong>dijo</strong>, dijimos, <strong>dijeron</strong><br><strong>traer</strong> → traje, trajiste, <strong>trajo</strong>, trajimos, <strong>trajeron</strong><br><strong>venir</strong> → vine, viniste, <strong>vino</strong>, vinimos, <strong>vinieron</strong><br><br>Note: <strong>no written accent</strong> on dij-, traj-, vin- stems."
        },
        {
          type: "conj-table",
          verbs: [
            {
              infinitive: "decir (to say / tell)",
              rows: [
                { pronoun: "yo", answer: "dije" },
                { pronoun: "tú", answer: "dijiste" },
                { pronoun: "él/ella/Ud.", answer: "dijo" },
                { pronoun: "nosotros", answer: "dijimos" },
                { pronoun: "ellos/ellas/Uds.", answer: "dijeron" }
              ]
            },
            {
              infinitive: "traer (to bring)",
              rows: [
                { pronoun: "yo", answer: "traje" },
                { pronoun: "él/ella/Ud.", answer: "trajo" },
                { pronoun: "ellos/ellas/Uds.", answer: "trajeron" }
              ]
            },
            {
              infinitive: "venir (to come)",
              rows: [
                { pronoun: "tú", answer: "viniste" },
                { pronoun: "él/ella/Ud.", answer: "vino" },
                { pronoun: "nosotros", answer: "vinimos" },
                { pronoun: "ellos/ellas/Uds.", answer: "vinieron" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "practice",
      title: "Práctica — Diálogo en el mercado",
      shortTitle: "Practice",
      subtitle: "Fill in decir, traer, or venir",
      icon: "✏️",
      accent: "green",
      components: [
        {
          type: "fill-blanks",
          sentences: [
            { text: "El vendedor ___ que el café era fresco. (decir — él)", answer: "dijo" },
            { text: "Nosotros ___ regalos para la familia. (traer — nosotros)", answer: "trajimos" },
            { text: "Mis primos ___ de Cali ayer. (venir — ellos)", answer: "vinieron" },
            { text: "¿Qué tú ___ al profesor? (decir — tú)", answer: "dijiste" },
            { text: "La turista ___ su pasaporte al mostrador. (traer — ella)", answer: "trajo" }
          ]
        },
        {
          type: "mc-quiz",
          questions: [
            {
              prompt: "Ellos _____ que el museo cerró temprano. (decir)",
              options: [
                { value: "a", label: "dijeron" },
                { value: "b", label: "decieron" },
                { value: "c", label: "dijo" },
                { value: "d", label: "dijimos" }
              ],
              answer: "a"
            },
            {
              prompt: "Yo _____ mis fotos de Bogotá. (traer)",
              options: [
                { value: "a", label: "traje" },
                { value: "b", label: "trajó" },
                { value: "c", label: "traí" },
                { value: "d", label: "trajiste" }
              ],
              answer: "a"
            },
            {
              prompt: "¿Ustedes _____ en taxi al aeropuerto? (venir)",
              options: [
                { value: "a", label: "vinieron" },
                { value: "b", label: "vinimos" },
                { value: "c", label: "vino" },
                { value: "d", label: "venieron" }
              ],
              answer: "a"
            }
          ]
        }
      ]
    },
    {
      id: "reading",
      title: "Lectura corta — Llegada a Medellín",
      shortTitle: "Reading",
      subtitle: "Find irregular preterites in context",
      icon: "📖",
      accent: "orange",
      components: [
        {
          type: "reading",
          text: "Ayer mi familia y yo <span class=\"verb-highlight\">llegamos</span> a Medellín. Mi hermana <span class=\"verb-highlight\">dijo</span> que el vuelo <span class=\"verb-highlight\">fue</span> tranquilo. Nosotros <span class=\"verb-highlight\">trajimos</span> chaquetas porque por la tarde <span class=\"verb-highlight\">llovió</span> un poco. El guía del hotel <span class=\"verb-highlight\">dijo</span> que muchos turistas <span class=\"verb-highlight\">vinieron</span> el mes pasado.",
          instructions: "Underline every preterite of decir, traer, and venir you find."
        },
        {
          type: "questions",
          questions: [
            { prompt: "List three preterite forms of decir, traer, or venir from the passage:", type: "textarea", placeholder: "dijo, trajimos, vinieron...", rows: 2 },
            { prompt: "Write one new sentence using dijeron:", placeholder: "Los guías dijeron que..." }
          ]
        },
        {
          type: "matching",
          wordBank: true,
          instructions: "Match irregular preterites of <strong>decir, traer, venir</strong> to English.",
          pairs: [
            { es: "dijeron", en: "they said" },
            { es: "vinieron", en: "they came" },
            { es: "pidió", en: "he/she asked for" },
            { es: "durmió", en: "he/she slept" },
            { es: "el vuelo", en: "flight" }
          ]
        },
        {
          type: "sentence-order",
          prompt: "<strong>Put the words in order</strong> (Spanish): <em>They said they came by plane.</em>",
          tokens: ["Dijeron", "que", "vinieron", "en", "avión."],
          correctOrder: [0, 1, 2, 3, 4]
        }
      ]
    },
    {
      id: "exit",
      title: "Boleto de Salida — Day 6",
      shortTitle: "Exit",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Salida",
          fields: [
            { label: "Ellos form of DECIR (preterite):", placeholder: "dijeron" },
            { label: "Él form of TRAER (preterite):", placeholder: "trajo" },
            { label: "Nosotros form of VENIR (preterite):", placeholder: "vinimos" },
            { label: "Why is there no accent on dij-, traj-, vin-?", type: "textarea", rows: 2, placeholder: "Because..." }
          ]
        }
      ]
    }
  ]
};
