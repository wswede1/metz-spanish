window.LESSON_DATA = {
  dayLabel: "Day 1",
  unit: "Unidad Colombia",
  title: "Regresa a Colombia",
  subtitle: "Revisit Colombia through the preterite — what happened, what people did, and what changed",
  objectives: [
    "I can share what I already know about Colombia from Spanish 1",
    "I can identify preterite verbs in context",
    "I can gather new information from a video about Colombia's history"
  ],
  sections: [
    // ──────────────────────────────────────────────────
    // 1. KWL Chart
    // ──────────────────────────────────────────────────
    {
      id: "kwl",
      title: "KWL Chart",
      shortTitle: "KWL",
      subtitle: "Antes del video: K y W. Completa L al final.",
      icon: "🧠",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "tip",
          text: "You studied Colombia in Spanish 1. Now we're going deeper — through the <strong>preterite tense</strong> (past tense). Fill in <strong>K</strong> and <strong>W</strong> before the video. Come back for <strong>L</strong> at the end of class."
        },
        {
          type: "kwl",
          hint: "Think about: What happened in Colombia's history? What did you learn in Spanish 1 about cities, regions, culture?",
          placeholders: [
            "What do I already know about Colombia from Spanish 1?",
            "What do I want to learn about its HISTORY?",
            "Fill this in at the end of class!"
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 2. Video + Comprehension
    // ──────────────────────────────────────────────────
    {
      id: "video",
      title: "Video — Introducción a Colombia: Perspectiva Histórica",
      shortTitle: "Video",
      subtitle: "Watch and take notes — focus on what HAPPENED",
      icon: "🎬",
      accent: "red",
      components: [
        {
          type: "video",
          videoTitle: "Introducción a Colombia: Perspectiva Histórica",
          placeholder: "Your teacher will share the video link (~15 min). Add youtubeId and externalVideoUrl in this lesson file when you have the class YouTube URL.",
          instructions: "Mientras ves: Focus on past events. What happened? What did people do? Take notes in Spanish or English."
        },
        {
          type: "callout",
          style: "info",
          text: "Answer the 5 comprehension questions below. Notice the questions use <strong>past tense</strong> — your answers should too!"
        },
        {
          type: "questions",
          selfRubric: {
            id: "video-comp",
            title: "Before you leave this section, honestly check:",
            items: [
              "I answered in past tense where the question asks what happened.",
              "My answers use details from the video (not only guesses).",
              "I wrote in full sentences or clear bullet ideas."
            ],
            completeSectionWhenAllChecked: true
          },
          exemplarHtml: "<p><strong>Sample ideas (yours can differ):</strong> The speaker described mountains, coasts, and cities. In the colonial period, Cartagena was a key port. Bolívar helped lead independence movements. In recent years the government worked to improve safety and promote tourism.</p>",
          exemplarButtonLabel: "Show sample ideas (after your own answers)",
          questions: [
            {
              prompt: "What did the speaker say about Colombia's geography? Name three features that were mentioned.",
              type: "textarea",
              placeholder: "The speaker mentioned... He/She talked about...",
              rows: 2
            },
            {
              prompt: "What happened in Cartagena during the colonial period? What role did the city play?",
              type: "textarea",
              placeholder: "During the colonial period, Cartagena...",
              rows: 2
            },
            {
              prompt: "What did Simón Bolívar do for Colombia? Why was he important?",
              type: "textarea",
              placeholder: "Simón Bolívar fought for... He led...",
              rows: 2
            },
            {
              prompt: "What changed in Colombia over the last 20 years? What did the government do to improve tourism?",
              type: "textarea",
              placeholder: "The government changed... They built...",
              rows: 2
            },
            {
              prompt: "Choose ONE city from the video. What happened there historically? Write two facts the video gave.",
              type: "textarea",
              placeholder: "I chose... Two facts: 1) ... 2) ...",
              rows: 2
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 3. Map Activity
    // ──────────────────────────────────────────────────
    {
      id: "map",
      title: "Mapa Histórico de Colombia",
      shortTitle: "Map",
      subtitle: "Label the map — then answer questions in the preterite",
      icon: "🗺️",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Use the printed map from class. Find and number each location — then answer the <strong>preterite-based</strong> questions below."
        },
        {
          type: "map-labels",
          mapHint: "Use your printed map — find and number each location below",
          labels: [
            { name: "Bogotá", type: "capital" },
            { name: "Medellín", type: "city" },
            { name: "Cartagena", type: "city" },
            { name: "Cali", type: "city" },
            { name: "Villa de Leyva", type: "town" },
            { name: "Mar Caribe", type: "water" },
            { name: "Océano Pacífico", type: "water" },
            { name: "Río Amazonas", type: "water" },
            { name: "Andes", type: "mountains" },
            { name: "Amazonía", type: "region" },
            { name: "Zona cafetera", type: "region" }
          ]
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Qué pasó en Cartagena durante la época colonial?", type: "textarea", placeholder: "En Cartagena pasó que...", rows: 2 },
            { prompt: "¿Qué ciudad visitó el explorador primero, según el video?", placeholder: "El explorador visitó..." },
            { prompt: "¿Qué descubrieron los españoles en la zona cafetera?", placeholder: "Los españoles descubrieron..." },
            { prompt: "¿Por qué fue importante Bogotá en la independencia de Colombia?", type: "textarea", placeholder: "Bogotá fue importante porque...", rows: 2 },
            { prompt: "Escoge un lugar del mapa. Escribe una oración en pretérito sobre algo que pasó allí.", type: "textarea", placeholder: "En [lugar], los exploradores/la gente...", rows: 2 }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 4. Exploration Stations
    // ──────────────────────────────────────────────────
    {
      id: "stations",
      title: "Estaciones de Exploración — Nivel 2",
      shortTitle: "Stations",
      subtitle: "Choose ONE station — all prompts use the preterite!",
      icon: "🔬",
      accent: "purple",
      components: [
        {
          type: "stations",
          instructions: "<strong>Pick ONE station only</strong> — go to that table in class and complete only that deliverable. Focus on <strong>what happened</strong> (past tense)!",
          options: [
            {
              letter: "A",
              name: "Regiones Naturales",
              description: "Explore Colombia's diverse natural regions — but this time, focus on what happened there historically.",
              deliverable: "Complete the table: 3 regions, what happened there historically, and one event that changed the region.",
              fields: [
                { label: "Region 1 — Name & what happened there", type: "textarea", placeholder: "e.g. Amazonía — Los científicos descubrieron muchas especies nuevas...", rows: 2 },
                { label: "Region 2 — Name & what happened there", type: "textarea", placeholder: "Name and historical event...", rows: 2 },
                { label: "Region 3 — Name & what happened there", type: "textarea", placeholder: "Name and historical event...", rows: 2 }
              ]
            },
            {
              letter: "B",
              name: "Ciudades Históricas",
              description: "Discover the major cities of Colombia — what events shaped them? What did people build, fight for, or create?",
              deliverable: "Choose two cities: what happened there historically + one thing that changed over time.",
              fields: [
                { label: "City 1 — What happened there?", type: "textarea", placeholder: "Cartagena — Los españoles construyeron murallas para...", rows: 2 },
                { label: "City 2 — What happened there?", type: "textarea", placeholder: "Bogotá — Simón Bolívar luchó por...", rows: 2 }
              ]
            },
            {
              letter: "C",
              name: "El Café",
              description: "How did Colombia become the coffee capital of the world? What happened in the coffee trade?",
              deliverable: "Write 3 facts about what happened in Colombia's coffee history. Include at least one preterite verb.",
              fields: [
                { label: "3 historical facts about Colombian coffee", type: "textarea", placeholder: "1) Los agricultores empezaron a... 2) ... 3) ...", rows: 3 },
                { label: "One preterite sentence about coffee in your own words", type: "textarea", placeholder: "Colombia exportó café a...", rows: 2 }
              ]
            },
            {
              letter: "D",
              name: "Biodiversidad",
              description: "What did scientists discover in Colombia? What species did explorers find?",
              deliverable: "Name 2 animals + 2 plants that scientists discovered. Write what happened to one species.",
              fields: [
                { label: "2 animals and 2 plants that were discovered", type: "textarea", placeholder: "Scientists discovered... Explorers found...", rows: 2 },
                { label: "What happened to one species? (Use preterite)", type: "textarea", placeholder: "El cóndor casi desapareció porque...", rows: 2 }
              ]
            },
            {
              letter: "E",
              name: "Música y Cultura",
              description: "How did cumbia, vallenato, and other genres develop? What influenced Colombian music?",
              deliverable: "Name a genre + what happened in its history. Write 2 sentences using preterite verbs.",
              fields: [
                { label: "Musical genre + its history", type: "textarea", placeholder: "La cumbia se originó en... Los músicos crearon...", rows: 2 },
                { label: "2 preterite sentences about music/culture", type: "textarea", placeholder: "Shakira cantó... Carlos Vives popularizó...", rows: 2 }
              ]
            },
            {
              letter: "F",
              name: "La Escuela Colombiana",
              description: "How did education change in Colombia? What did the government do to improve schools?",
              deliverable: "Compare 3 ideas: What happened in Colombian schools vs. what happened in your school. Use past tense.",
              fields: [
                { label: "En Colombia — 3 things that happened in education", type: "textarea", placeholder: "1) El gobierno construyó... 2) Los estudiantes estudiaron... 3) ...", rows: 2 },
                { label: "En mi escuela — 3 things that happened (past tense)", type: "textarea", placeholder: "1) We studied... 2) The school built... 3) ...", rows: 2 },
                { label: "One similarity and one difference (past tense)", type: "textarea", placeholder: "Both schools... but in Colombia they...", rows: 2 }
              ]
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 5. Google Slides Research
    // ──────────────────────────────────────────────────
    {
      id: "slides",
      title: "Investigación — Google Slides",
      shortTitle: "Research",
      subtitle: "Choose a topic and begin your historical mini-presentation",
      icon: "📊",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Choose a topic (same as your station or different). Create a brief Google Slides presentation: <strong>Title + name</strong>, <strong>3–5 facts about what HAPPENED</strong>, <strong>1+ image with credit</strong>, <strong>sources at end</strong>. Try to use at least 2 preterite verbs in your facts!"
        },
        {
          type: "questions",
          questions: [
            { prompt: "My topic:", placeholder: "I'm researching..." },
            { prompt: "3 key facts about what happened (use past tense!):", type: "textarea", placeholder: "1) Colombia became... 2) The people built... 3) ...", rows: 3 },
            { prompt: "One preterite verb I will use in my slides:", placeholder: "e.g. construyeron, descubrieron, viajaron..." }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 6. KWL — L Column + Exit Ticket
    // ──────────────────────────────────────────────────
    {
      id: "exit",
      title: "Reflección y Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "What did you learn? Go back to your KWL!",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Go back to your KWL chart and fill in the <strong>L column</strong> — what did you learn today about Colombia's history?"
        },
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 1",
          prompt: "Three things you learned today + one preterite verb you remember:",
          fields: [
            { label: "Thing 1 — What happened in Colombia?", placeholder: "I learned that..." },
            { label: "Thing 2 — A historical fact", placeholder: "I also learned..." },
            { label: "Thing 3 — Something that surprised me", placeholder: "I was surprised that..." },
            { label: "One preterite verb from today (Spanish)", placeholder: "e.g. viajó, construyeron, descubrieron..." }
          ]
        }
      ]
    }
  ]
};
