window.LESSON_DATA = {
  dayLabel: "Day 13",
  unit: "Unidad Colombia",
  title: "Estaciones de Repaso",
  subtitle: "Rotate through 5 review stations covering ALL preterite patterns before the exam",
  objectives: [
    "I can demonstrate vocabulary knowledge for the Colombia unit",
    "I can conjugate all preterite patterns: regular, -CAR/-GAR/-ZAR, Y-verbs, stem-changers, and irregulars",
    "I can write and interpret sentences using preterite verbs"
  ],
  sections: [
    {
      id: "station1",
      title: "Station 1 — Vocabulary Review",
      shortTitle: "Vocab",
      subtitle: "Match the travel and culture vocabulary",
      icon: "1️⃣",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "Match each Spanish word to its English meaning. These are key vocabulary from the Colombia unit."
        },
        {
          type: "matching",
          wordBank: true,
          instructions: "Match each Spanish term with its English translation.",
          pairs: [
            { id: "m1", es: "el vuelo", en: "the flight" },
            { id: "m2", es: "el equipaje", en: "the luggage" },
            { id: "m3", es: "la aduana", en: "customs" },
            { id: "m4", es: "el boleto", en: "the ticket" },
            { id: "m5", es: "la moneda", en: "the currency / coin" },
            { id: "m6", es: "el mercado", en: "the market" }
          ]
        }
      ]
    },
    {
      id: "station2",
      title: "Station 2 — Regular Preterite + -CAR / -GAR / -ZAR",
      shortTitle: "-CAR/-GAR/-ZAR",
      subtitle: "Watch out for yo-form spelling changes!",
      icon: "2️⃣",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "<strong>Remember:</strong> In the <em>yo</em> form of the preterite, verbs ending in -CAR → <strong>-qué</strong>, -GAR → <strong>-gué</strong>, -ZAR → <strong>-cé</strong>. Regular verbs follow the normal pattern."
        },
        {
          type: "fill-blanks",
          wordBank: ["compré", "llegué", "empecé", "caminó", "comimos"],
          sentences: [
            { text: "Yo ___ el boleto en línea. (comprar)", answer: "compré" },
            { text: "Yo ___ al hotel a las tres. (llegar)", answer: "llegué" },
            { text: "Yo ___ la excursión muy temprano. (empezar)", answer: "empecé" },
            { text: "Ella ___ por la ciudad toda la tarde. (caminar)", answer: "caminó" },
            { text: "Nosotros ___ en el restaurante colombiano. (comer)", answer: "comimos" }
          ]
        }
      ]
    },
    {
      id: "station3",
      title: "Station 3 — Y-Verbs + Stem-Changers",
      shortTitle: "Y-Verbs",
      subtitle: "When i → y between vowels, and e → i / o → u in the preterite",
      icon: "3️⃣",
      accent: "purple",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "<strong>Y-verbs:</strong> For verbs like <em>leer, oír, creer</em>, the él/ella form changes -ió → <strong>-yó</strong> (the i becomes y between two vowels).<br><br><strong>Stem-changers:</strong> -IR verbs with e → i or o → u in the <em>él/ella</em> and <em>ellos</em> preterite forms. Example: <em>pedir → pidió</em>, <em>dormir → durmió</em>."
        },
        {
          type: "fill-blanks",
          wordBank: ["leyó", "oyó", "pidió", "durmió"],
          sentences: [
            { text: "Mi hermana ___ un libro sobre Colombia. (leer)", answer: "leyó" },
            { text: "El turista ___ la música de cumbia en la calle. (oír)", answer: "oyó" },
            { text: "El estudiante ___ ayuda con la tarea. (pedir)", answer: "pidió" },
            { text: "Mi abuela ___ toda la tarde después del almuerzo. (dormir)", answer: "durmió" }
          ]
        }
      ]
    },
    {
      id: "station4",
      title: "Station 4 — Irregular Preterites",
      shortTitle: "Irregulars",
      subtitle: "The big ones: hacer, ir, tener, decir, traer",
      icon: "4️⃣",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "warn",
          text: "<strong>These verbs have completely irregular stems in the preterite.</strong> No accent marks on yo or él/ella forms!<br>• hacer → hic- (yo hice, él hizo)<br>• ir/ser → fu- (yo fui, él fue)<br>• tener → tuv- (yo tuve, él tuvo)<br>• decir → dij- (yo dije, él dijo)<br>• traer → traj- (yo traje, ellos trajeron — no i!)"
        },
        {
          type: "fill-blanks",
          wordBank: ["hice", "fue", "tuve", "dijo", "trajeron"],
          sentences: [
            { text: "Yo ___ mi tarea de español anoche. (hacer)", answer: "hice" },
            { text: "Mi amigo ___ a Cartagena el verano pasado. (ir)", answer: "fue" },
            { text: "Yo ___ mucha suerte en el viaje. (tener)", answer: "tuve" },
            { text: "La profesora ___ que el examen es mañana. (decir)", answer: "dijo" },
            { text: "Los estudiantes ___ comida colombiana a la clase. (traer)", answer: "trajeron" }
          ]
        }
      ]
    },
    {
      id: "station5",
      title: "Station 5 — Reading Comprehension",
      shortTitle: "Reading",
      subtitle: "Read about a trip to Colombia and answer the questions",
      icon: "5️⃣",
      accent: "red",
      components: [
        {
          type: "reading",
          text: "El verano pasado, mi familia y yo <span class=\"verb-highlight\">viajamos</span> a Colombia. Primero, <span class=\"verb-highlight\">llegamos</span> a Bogotá y <span class=\"verb-highlight\">visitamos</span> el Museo del Oro. Mi mamá <span class=\"verb-highlight\">compró</span> recuerdos en el mercado y mi papá <span class=\"verb-highlight\">sacó</span> muchas fotos. Después, nosotros <span class=\"verb-highlight\">fuimos</span> a Cartagena en avión. En Cartagena, yo <span class=\"verb-highlight\">caminé</span> por la ciudad amurallada y <span class=\"verb-highlight\">comí</span> arepas de huevo. Mi hermano <span class=\"verb-highlight\">oyó</span> música de cumbia en la plaza y <span class=\"verb-highlight\">pidió</span> una limonada de coco. El último día, la abuela nos <span class=\"verb-highlight\">dijo</span>: \"<span class=\"verb-highlight\">Fue</span> el mejor viaje de mi vida.\" Yo <span class=\"verb-highlight\">tuve</span> una experiencia increíble y <span class=\"verb-highlight\">aprendí</span> mucho sobre la cultura colombiana.",
          instructions: "Read the passage carefully. The highlighted verbs are all in the preterite. Then answer the questions below."
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Adónde viajó la familia primero?", placeholder: "La familia viajó a..." },
            { prompt: "¿Qué hizo la mamá en el mercado?", placeholder: "La mamá..." },
            { prompt: "¿Qué comió el narrador en Cartagena?", placeholder: "El narrador comió..." },
            { prompt: "¿Qué oyó el hermano en la plaza?", placeholder: "El hermano oyó..." },
            { prompt: "¿Qué dijo la abuela al final del viaje?", placeholder: "La abuela dijo que..." }
          ]
        }
      ]
    },
    {
      id: "self-check",
      title: "Station 6 — Self-Check",
      shortTitle: "Self-Check",
      subtitle: "Reflect on your review and make a study plan",
      icon: "✅",
      accent: "teal",
      components: [
        {
          type: "callout",
          style: "info",
          text: "The exam is tomorrow! Be honest about what you know and what you still need to review tonight."
        },
        {
          type: "exit-ticket",
          title: "Review Self-Assessment",
          fields: [
            { label: "Which station was your strongest? Why?", type: "textarea", placeholder: "I felt most confident at Station ___ because...", rows: 2 },
            { label: "Which station was the hardest? What do you need to review?", type: "textarea", placeholder: "I struggled most with Station ___ because...", rows: 2 },
            { label: "Write your study plan for tonight (be specific!):", type: "textarea", placeholder: "Tonight I will review ___ by ___. I will practice ___ for ___ minutes.", rows: 3 }
          ]
        }
      ]
    }
  ]
};
