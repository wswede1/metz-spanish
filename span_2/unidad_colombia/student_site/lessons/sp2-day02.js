window.LESSON_DATA = {
  dayLabel: "Day 2",
  unit: "Unidad Colombia",
  title: "Vocabulario de Viaje",
  subtitle: "Learn travel vocabulary and tell stories about what happened — all in the preterite",
  objectives: [
    "I can recognize travel vocabulary in context",
    "I can use regular -AR preterite forms in sentences",
    "I can read a travel story written entirely in the past tense"
  ],
  sections: [
    // ──────────────────────────────────────────────────
    // 1. Warm-Up
    // ──────────────────────────────────────────────────
    {
      id: "warmup",
      title: "Warm-Up — Partner Recall",
      shortTitle: "Warm-Up",
      subtitle: "Share one thing you remember from Day 1",
      icon: "☀️",
      accent: "yellow",
      open: true,
      components: [
        {
          type: "partner-talk",
          title: "Recuerda el Día 1",
          prompt: "Con tu compañero, comparte <strong>una cosa</strong> que aprendiste sobre la historia de Colombia en Day 1. Try to use the past tense: <em>I learned that... / The video showed that...</em>",
          duration: "2 minutes"
        },
        {
          type: "questions",
          markCompleteLabel: "Save warm-up (mark this section done)",
          questions: [
            { prompt: "Write what you shared with your partner:", type: "textarea", placeholder: "I remembered that...", rows: 2 }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 2. Vocabulary Flashcards — Travel Words
    // ──────────────────────────────────────────────────
    {
      id: "vocab-cards",
      title: "Vocabulario Nuevo — Palabras de Viaje",
      shortTitle: "Flashcards",
      subtitle: "Click each card to see the English meaning. Click words to hear pronunciation.",
      icon: "📇",
      accent: "blue",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Click any card to flip it. Click the Spanish word to hear it spoken aloud! These are words you'll need to tell travel stories in the preterite."
        },
        {
          type: "flip-gallery",
          cards: [
            { es: "el aeropuerto", en: "the airport", hint: "El Dorado — Bogotá's famous airport" },
            { es: "el equipaje", en: "the luggage", hint: "Las maletas y bolsas" },
            { es: "el boleto", en: "the ticket", hint: "Para el avión o el bus" },
            { es: "el pasaporte", en: "the passport", hint: "Necesario para viajar" },
            { es: "la maleta", en: "the suitcase", hint: "Para la ropa" },
            { es: "el vuelo", en: "the flight", hint: "De Nueva York a Bogotá" },
            { es: "la aduana", en: "customs", hint: "Al llegar al país" },
            { es: "el hotel", en: "the hotel", hint: "Donde dormimos" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 3. Matching Exercise
    // ──────────────────────────────────────────────────
    {
      id: "matching",
      title: "Matching — Vocabulario de Viaje",
      shortTitle: "Matching",
      subtitle: "Click one Spanish word, then click its English meaning to match",
      icon: "🔗",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Click a Spanish word on the left, then click the English meaning on the right. Matched pairs turn green!"
        },
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
    // 4. Fill in the Blank — Preterite Travel Sentences
    // ──────────────────────────────────────────────────
    {
      id: "fill",
      title: "Fill in the Blank — Oraciones de Viaje en Pretérito",
      shortTitle: "Fill-Blank",
      subtitle: "Use the word bank to complete each preterite sentence",
      icon: "📝",
      accent: "purple",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Each sentence is in the <strong>preterite</strong> (past tense). Use the word bank to fill in the correct travel vocabulary word. The verb is already conjugated for you!"
        },
        {
          type: "fill-blanks",
          wordBank: ["el boleto", "la maleta", "el aeropuerto", "el pasaporte", "el vuelo", "la aduana", "el equipaje", "el hotel"],
          sentences: [
            { text: "Yo compré ___ en la agencia de viajes.", answer: "el boleto|boleto" },
            { text: "Ella preparó ___ la noche antes del viaje.", answer: "la maleta|maleta" },
            { text: "Nosotros llegamos a ___ a las seis de la mañana.", answer: "el aeropuerto|aeropuerto" },
            { text: "Mi papá mostró ___ en la aduana.", answer: "el pasaporte|pasaporte" },
            { text: "___ de Bogotá a Cartagena duró dos horas.", answer: "el vuelo|vuelo" },
            { text: "Los agentes en ___ revisaron nuestras maletas.", answer: "la aduana|aduana" },
            { text: "El taxista llevó ___ al carro.", answer: "el equipaje|equipaje" },
            { text: "Nosotros descansamos en ___ después del vuelo.", answer: "el hotel|hotel" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 5. Reading — Un viaje a Cartagena
    // ──────────────────────────────────────────────────
    {
      id: "reading",
      title: "Lectura — Un viaje a Cartagena",
      shortTitle: "Reading",
      subtitle: "Read about Camila's trip — all verbs are in the preterite!",
      icon: "📖",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "<strong>Glossary:</strong> temprano = early · murallas = walls · atardecer = sunset · inolvidable = unforgettable"
        },
        {
          type: "reading",
          text: "El verano pasado, Camila <span class=\"verb-highlight\">viajó</span> a Cartagena con su familia. Ellos <span class=\"verb-highlight\">llegaron</span> al aeropuerto El Dorado en Bogotá muy temprano. Camila <span class=\"verb-highlight\">compró</span> una revista en la tienda del aeropuerto. El vuelo <span class=\"verb-highlight\">duró</span> dos horas. Cuando <span class=\"verb-highlight\">llegaron</span> a Cartagena, un taxista <span class=\"verb-highlight\">llevó</span> el equipaje al hotel.<br><br>El primer día, Camila <span class=\"verb-highlight\">caminó</span> por las calles del centro histórico. Ella <span class=\"verb-highlight\">visitó</span> las murallas coloniales y <span class=\"verb-highlight\">sacó</span> muchas fotos. En el mercado, Camila <span class=\"verb-highlight\">compró</span> frutas tropicales y <span class=\"verb-highlight\">comió</span> arepas de huevo. Por la noche, la familia <span class=\"verb-highlight\">cenó</span> en un restaurante cerca de la playa y <span class=\"verb-highlight\">miró</span> el atardecer. Fue un viaje inolvidable.",
          instructions: "Click highlighted verbs to hear them. Notice — every verb is in the <strong>preterite</strong>. Then answer the questions below."
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Adónde viajó Camila?", placeholder: "Camila viajó a...", answer: "Cartagena" },
            { prompt: "¿Qué compró Camila en el aeropuerto?", placeholder: "Camila compró...", answer: "una revista" },
            { prompt: "List 3 things Camila did in Cartagena (in English or Spanish):", type: "textarea", placeholder: "1) She walked... 2) She visited... 3) She bought...", rows: 2 },
            { prompt: "¿Qué comió Camila en el mercado?", placeholder: "Camila comió...", answer: "arepas de huevo" },
            { prompt: "Find and write 5 preterite verbs from the reading:", type: "textarea", placeholder: "1) viajó 2) llegaron 3) ...", rows: 2 }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 6. Exit Ticket
    // ──────────────────────────────────────────────────
    {
      id: "exit",
      title: "Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Quick check before you go!",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 2",
          prompt: "Show what you learned about travel vocab and the preterite:",
          fields: [
            { label: "What is 'el equipaje' in English?", placeholder: "..." },
            { label: "Write a sentence about a trip using ONE preterite verb", placeholder: "Yo viajé a... / Ella compró...", type: "textarea", rows: 2 },
            { label: "Which travel word was hardest to remember? Why?", placeholder: "The word... because..." }
          ]
        }
      ]
    }
  ]
};
