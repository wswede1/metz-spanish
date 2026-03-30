window.LESSON_DATA = {
  dayLabel: "Day 1",
  unit: "Unidad Colombia",
  title: "Conoce a Colombia",
  subtitle: "Activate your knowledge, watch & learn, map Colombia's geography, and choose a research station",
  objectives: [
    "I can share what I already know about Colombia",
    "I can identify key geographic features on a map",
    "I can gather new information from a video about Colombia"
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
          text: "Fill in <strong>K</strong> (what you know) and <strong>W</strong> (what you want to know) <em>before</em> the video. Come back to <strong>L</strong> at the end of class."
        },
        {
          type: "kwl",
          hint: "Think about: geography, culture, food, music, cities, famous people...",
          placeholders: [
            "Geography, culture, food... what do I already know?",
            "3 questions I want answered...",
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
      title: "Video — Introducción a Colombia",
      shortTitle: "Video",
      subtitle: "Watch and take notes in Spanish or English",
      icon: "🎬",
      accent: "red",
      components: [
        {
          type: "video",
          placeholder: "Your teacher will share the video link — Introducción a Colombia (~15 min)",
          instructions: "Mientras ves: Escucha con atención. Take notes in Spanish or English as you watch."
        },
        {
          type: "callout",
          style: "info",
          text: "After the video, answer the 5 comprehension questions below. Responde en frases completas — answers are in the video!"
        },
        {
          type: "questions",
          questions: [
            {
              prompt: "Name three different kinds of places/natural features mentioned (coasts, mountains, forests, etc.)",
              type: "textarea",
              placeholder: "List 3 natural features from the video...",
              rows: 2
            },
            {
              prompt: "Why was Colombia not on the tourist map years ago? What has the government done since?",
              type: "textarea",
              placeholder: "Explain the change...",
              rows: 2
            },
            {
              prompt: "About Villa de Leyva — What does the video say about Plaza Mayor? Name one festival or celebration mentioned.",
              type: "textarea",
              placeholder: "Plaza Mayor is... The festival is...",
              rows: 2
            },
            {
              prompt: "About El Peñón de Guatapé — How many steps climb to the top? What can you see from there?",
              type: "textarea",
              placeholder: "The number of steps is... From the top you can see...",
              rows: 2
            },
            {
              prompt: "Choose one place: <strong>Zona cafetera</strong> OR <strong>Salt Cathedral in Zipaquirá</strong>. Write two facts the video gives about that place.",
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
      title: "Mapa de Colombia",
      shortTitle: "Map",
      subtitle: "Label and explore Colombia's geography",
      icon: "🗺️",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Use the printed map of Colombia from class. Find and number each location on your map."
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
            { prompt: "Which city is closest to the Caribbean coast?", placeholder: "City name..." },
            { prompt: "Name one region where coffee is grown. Where is it on the map?", placeholder: "The coffee region is..." },
            { prompt: "Which body of water borders Colombia to the west?", placeholder: "To the west..." },
            { prompt: "Is Bogotá closer to the coast or to the center of the country?", placeholder: "Bogotá is closer to..." },
            { prompt: "Pick a place you want to visit. Write one sentence about why.", type: "textarea", placeholder: "I want to visit... because...", rows: 2 }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 4. Station Selection
    // ──────────────────────────────────────────────────
    {
      id: "stations",
      title: "Estaciones de Exploración",
      shortTitle: "Stations",
      subtitle: "Choose ONE station — complete the deliverable below",
      icon: "🔬",
      accent: "purple",
      components: [
        {
          type: "stations",
          instructions: "<strong>Pick ONE station only</strong> — go to that table in class and complete only that deliverable. No rotation!",
          options: [
            {
              letter: "A",
              name: "Regiones Naturales",
              description: "Explore Colombia's diverse natural regions — Caribbean coast, Andes mountains, Amazon rainforest, and more.",
              deliverable: "Complete the table: 3 different regions, what's there, and whether it interests you.",
              fields: [
                { label: "Region 1 — Name & what's there", type: "textarea", placeholder: "e.g. Caribe — playas, coral, ciudades costeras...", rows: 2 },
                { label: "Region 2 — Name & what's there", type: "textarea", placeholder: "Name and description...", rows: 2 },
                { label: "Region 3 — Name & what's there", type: "textarea", placeholder: "Name and description...", rows: 2 }
              ]
            },
            {
              letter: "B",
              name: "Ciudades Principales",
              description: "Discover the major cities of Colombia — their landmarks, culture, and unique character.",
              deliverable: "Choose two cities: name, one monument or activity, and one reason you'd visit.",
              fields: [
                { label: "City 1 — Name, monument/activity, why visit?", type: "textarea", placeholder: "Bogotá — ...", rows: 2 },
                { label: "City 2 — Name, monument/activity, why visit?", type: "textarea", placeholder: "Cartagena — ...", rows: 2 }
              ]
            },
            {
              letter: "C",
              name: "Café y Eje Cafetero",
              description: "Learn about Colombia's famous coffee region — production, culture, and global impact.",
              deliverable: "Write 3 coffee facts. Draw a symbol and label it in Spanish.",
              fields: [
                { label: "3 facts about Colombian coffee", type: "textarea", placeholder: "1) ... 2) ... 3) ...", rows: 3 },
                { label: "Draw a symbol (cup, mountain, bean) — describe it in Spanish", type: "textarea", placeholder: "Mi símbolo es... Se llama...", rows: 2 }
              ]
            },
            {
              letter: "D",
              name: "Biodiversidad",
              description: "Colombia is one of the most biodiverse countries on Earth. Discover its amazing plants and animals.",
              deliverable: "Name 2 animals + 2 plants. Write why biodiversity matters.",
              fields: [
                { label: "2 animals and 2 plants from Colombia", type: "textarea", placeholder: "Animals: ... Plants: ...", rows: 2 },
                { label: "Why is biodiversity important? (English or Spanish)", type: "textarea", placeholder: "Es importante porque...", rows: 2 }
              ]
            },
            {
              letter: "E",
              name: "Música y Cultura",
              description: "Explore cumbia, vallenato, reggaetón — Colombia's rich musical traditions and cultural roots.",
              deliverable: "Name a genre + 2 Spanish words from the poster/song. Share an emotion or question.",
              fields: [
                { label: "Musical genre + 2 Spanish words", type: "textarea", placeholder: "Genre: cumbia. Words: ...", rows: 2 },
                { label: "An emotion or question this gives you", placeholder: "I feel... / I wonder..." }
              ]
            },
            {
              letter: "F",
              name: "Vida en la Escuela",
              description: "Compare school life in Colombia with your own experience — subjects, schedules, uniforms, and more.",
              deliverable: "Compare 3 ideas: En Colombia vs En mi escuela. Write 1 similarity + 1 difference.",
              fields: [
                { label: "En Colombia (3 ideas about school life)", type: "textarea", placeholder: "1) ... 2) ... 3) ...", rows: 2 },
                { label: "En mi escuela (3 ideas)", type: "textarea", placeholder: "1) ... 2) ... 3) ...", rows: 2 },
                { label: "One similarity and one difference", type: "textarea", placeholder: "Similar: ... Different: ...", rows: 2 }
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
      subtitle: "Choose a topic and begin your mini-presentation",
      icon: "📊",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "info",
          text: "Choose a topic (same as your station or different). Create a brief Google Slides presentation: <strong>Title + name</strong>, <strong>3–5 new facts</strong>, <strong>1+ image with credit</strong>, <strong>sources at end</strong>."
        },
        {
          type: "questions",
          questions: [
            { prompt: "My topic:", placeholder: "I'm researching..." },
            { prompt: "3 key facts I want to include:", type: "textarea", placeholder: "1) ... 2) ... 3) ...", rows: 3 }
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
      subtitle: "What did you learn? Three things + one question.",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Go back to your KWL chart and fill in the <strong>L column</strong> — what did you learn today?"
        },
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Exit Ticket",
          prompt: "Three things you learned today + one question you still have:",
          fields: [
            { label: "Thing 1", placeholder: "I learned that..." },
            { label: "Thing 2", placeholder: "I also learned..." },
            { label: "Thing 3", placeholder: "Another thing was..." },
            { label: "One question I still have", placeholder: "I wonder...", type: "textarea", rows: 2 }
          ]
        }
      ]
    }
  ]
};
