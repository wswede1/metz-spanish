// ─── RELEASE DATES ───────────────────────────────────────────────────────────
// To lock a card until a specific date, set releaseDate: "YYYY-MM-DD"
// To unlock a card immediately, set releaseDate: "" or remove the field.
// Cards with a future date display as locked with the unlock date shown.
// Example: releaseDate: "2026-04-07"  →  locks until April 7, 2026
// ─────────────────────────────────────────────────────────────────────────────

window.unitSite = {
  title: "Spanish 1 — ¡Conoce a Colombia!",
  subtitle: "Use these student-safe pages for launch work, grammar practice, readings, projects, film reflection, and review.",
  eyebrow: "Spanish 1 Student Site",
  overviewTitle: "Spanish 1 Colombia Student Hub",
  overviewText: "Choose the card that matches today's class or your independent practice goal.",
  overviewMeta: ["14-day unit", "Student-safe pages only", "Colombia contexts all unit"],
  footerText: "Spanish 1 Colombia Unit | Student-safe website pages and practice tools",

  sections: [
    {
      title: "Start Here",
      icon: "🧭",
      description: "Launch the unit, learn the core vocabulary, and keep the flashcards nearby for review.",
      cards: [
        {
          title: "Day 1 Launch Recap",
          description: "Review the Colombia map anchors, station choices, and first-slide expectations.",
          route: "activity.html?activity=sp1-day-01-launch",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Launch",
          minutes: 15,
          dayLabel: "Day 1",
          icon: "🗺️"
        },
        {
          title: "Day 2 Vocab Check",
          description: "Practice school and place vocabulary in Colombia-specific sentences.",
          route: "activity.html?activity=sp1-day-02-vocab",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Practice",
          minutes: 12,
          dayLabel: "Day 2",
          icon: "📚"
        },
        {
          title: "Vocabulary Flashcards",
          description: "Flashcard, quiz mode, and matching game for all Spanish 1 Colombia vocabulary.",
          route: "../Colombia_Vocab_Review_Spanish1.html",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Flashcards",
          minutes: 10,
          dayLabel: "Bonus",
          icon: "📇"
        }
      ]
    },
    {
      title: "Grammar Lab",
      icon: "✏️",
      description: "Practice the unit grammar in short, self-checking pages that match the classroom pacing.",
      cards: [
        {
          title: "Day 3 — -ER/-IR + gustar Check",
          description: "Quick check for present-tense -ER/-IR forms and gustar + infinitive in a Colombia context.",
          route: "activity.html?activity=sp1-day-03-grammar",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Practice",
          minutes: 15,
          dayLabel: "Day 3",
          icon: "💬"
        },
        {
          title: "Day 3 — Conjugation Drill",
          description: "Earn a perfect score by conjugating -ER and -IR verbs across all subjects. 3 lives.",
          route: "activity.html?activity=sp1-day-03-drill",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Drill",
          minutes: 10,
          dayLabel: "Day 3",
          icon: "⚡"
        },
        {
          title: "Day 4 — Reading: Language Learner",
          description: "Read about Sofía's life in Medellín — with a glossary and scaffolded questions.",
          route: "activity.html?activity=sp1-day-04-reading-l2",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Reading",
          minutes: 15,
          dayLabel: "Day 4",
          icon: "📖"
        },
        {
          title: "Day 4 — Reading: Heritage Track",
          description: "A richer look at student life in Medellín — deeper vocabulary and analysis questions.",
          route: "activity.html?activity=sp1-day-04-reading-heritage",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Reading",
          minutes: 18,
          dayLabel: "Day 4",
          icon: "⭐"
        },
        {
          title: "Day 4 — Gustar Practice",
          description: "Fill in the blank with gustar phrases using Colombian contexts. Instant feedback.",
          route: "activity.html?activity=sp1-day-04-gustar",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Practice",
          minutes: 10,
          dayLabel: "Day 4",
          icon: "❤️"
        },
        {
          title: "Day 5 — Estar + Location Practice",
          description: "Describe where classroom objects are in a Colombian classroom using prepositions and estar.",
          route: "activity.html?activity=sp1-day-05-location",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Practice",
          minutes: 12,
          dayLabel: "Day 5",
          icon: "📍"
        },
        {
          title: "Day 5 — Estar Drill",
          description: "Drill all estar forms and prepositions of place. Uses lives and instant feedback.",
          route: "activity.html?activity=sp1-day-05-drill",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Drill",
          minutes: 8,
          dayLabel: "Day 5",
          icon: "⚡"
        },
        {
          title: "Day 6 — Emotions + ir Practice",
          description: "Practice estar + emotions and ir + a + place in a Colombia context.",
          route: "activity.html?activity=sp1-day-06-emotions-ir",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Practice",
          minutes: 14,
          dayLabel: "Day 6",
          icon: "😊"
        }
      ]
    },
    {
      title: "Culture & Projects",
      icon: "🌎",
      description: "Culture readings, project work, presentations, and the Encanto film sequence.",
      cards: [
        {
          title: "Day 7 — Culture Reading: Language Learner",
          description: "Read about Colombian coffee and community with glossary support and comprehension questions.",
          route: "activity.html?activity=sp1-day-07-culture-l2",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Reading",
          minutes: 16,
          dayLabel: "Day 7",
          icon: "☕"
        },
        {
          title: "Day 7 — Culture Reading: Heritage Track",
          description: "An analytical look at coffee's role in Colombian economy and cultural identity.",
          route: "activity.html?activity=sp1-day-07-culture-heritage",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Reading",
          minutes: 20,
          dayLabel: "Day 7",
          icon: "⭐"
        },
        {
          title: "Day 8 — Project Launch",
          description: "Choose your topic, set language goals, and gather evidence for your group project.",
          route: "activity.html?activity=sp1-day-08-project-launch",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Project",
          minutes: 12,
          dayLabel: "Day 8",
          icon: "📝"
        },
        {
          title: "Day 9 — Project Checkpoint",
          description: "Make sure your draft is complete before rehearsal day.",
          route: "activity.html?activity=sp1-day-09-project-checkpoint",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Project",
          minutes: 10,
          dayLabel: "Day 9",
          icon: "✅"
        },
        {
          title: "Day 10 — Audience Reflection",
          description: "Stay active as an audience member during group presentations.",
          route: "activity.html?activity=sp1-day-10-presentations",
          releaseDate: "",
          status: "Ready",
          kindLabel: "Presentation",
          minutes: 10,
          dayLabel: "Day 10",
          icon: "🎤"
        },
        {
          title: "Day 11 — Encanto Part 1",
          description: "Track setting, characters, and emotional language from Part 1 of Encanto.",
          route: "activity.html?activity=sp1-day-11-encanto-1",
          releaseDate: "",
          status: "New",
          kindLabel: "Film",
          minutes: 12,
          dayLabel: "Day 11",
          icon: "🎬"
        },
        {
          title: "Day 12 — Encanto Discussion",
          description: "Discussion stems and writing prompts after finishing Encanto.",
          route: "activity.html?activity=sp1-day-12-encanto-2",
          releaseDate: "",
          status: "New",
          kindLabel: "Film",
          minutes: 12,
          dayLabel: "Day 12",
          icon: "🎬"
        }
      ]
    },
    {
      title: "Review & Assessment Support",
      icon: "🎯",
      description: "Mixed review and exam prep — use your mistakes to choose what to study.",
      cards: [
        {
          title: "Day 13 — Review Challenge",
          description: "Mixed review covering vocabulary, -ER/-IR verbs, gustar, estar, and ir.",
          route: "activity.html?activity=sp1-day-13-review",
          releaseDate: "",
          status: "New",
          kindLabel: "Review",
          minutes: 15,
          dayLabel: "Day 13",
          icon: "🔁"
        },
        {
          title: "Day 14 — Study Guide Check",
          description: "Final check-in before the exam. If you miss one, review that day's card.",
          route: "activity.html?activity=sp1-day-14-study",
          releaseDate: "",
          status: "Study",
          kindLabel: "Study Guide",
          minutes: 15,
          dayLabel: "Day 14",
          icon: "📋"
        }
      ]
    },
    {
      title: "Listening",
      icon: "🎧",
      description: "Watch and listen to authentic Colombian music and cultural content, then check your comprehension.",
      cards: [
        {
          title: "La Cumbia — Music Listening",
          description: "Watch a cumbia performance and answer comprehension questions about Colombian musical culture.",
          route: "activity.html?activity=sp1-listening-cumbia",
          releaseDate: "",
          status: "New",
          kindLabel: "Listening",
          minutes: 10,
          dayLabel: "Bonus",
          icon: "🎵"
        }
      ]
    }
  ],

  activities: {

    // ── Day 1 ──────────────────────────────────────────────────────────────────
    "sp1-day-01-launch": {
      title: "Day 1 Launch Recap",
      dayLabel: "Day 1",
      kindLabel: "Launch",
      type: "resource",
      minutes: 15,
      description: "Review the Colombia map anchors, station choices, and first-slide expectations before or after class.",
      objectives: [
        "I can name three geographic regions of Colombia.",
        "I can connect one station topic to one question I want to answer.",
        "I can prepare one strong first slide for my Google Slides work."
      ],
      checklist: [
        "Review Bogotá, Cartagena, the Andes, the Caribbean coast, and the coffee region.",
        "Choose one station topic and stick to it.",
        "Write one fact and one question before you open Slides.",
        "Add one image idea with source credit."
      ],
      sidebarNote: "Use this page as a reset if you missed part of the launch day or need a quick recap before station work.",
      sections: [
        {
          title: "Map Anchors",
          paragraphs: [
            "Colombia is in South America. The Caribbean coast, the Andes mountains, the Amazon region, and major cities like Bogotá and Cartagena all became anchors on Day 1.",
            "When you talk about culture later in the unit, always connect your idea back to one of these anchors instead of giving random facts."
          ],
          bullets: [
            "Bogotá = capital city and school / urban life connection",
            "Cartagena = coast, tourism, and history connection",
            "Eje cafetero = coffee region connection",
            "Andes / Amazon / coast = geography and biodiversity connection"
          ]
        },
        {
          title: "Station Choices",
          bullets: [
            "Regions: describe three regions and which one interests you most.",
            "Cities: compare two cities and one reason you would visit.",
            "Coffee: list three facts about Colombian coffee and why it matters.",
            "Biodiversity: identify plants, animals, or ecosystems that stand out.",
            "Music and culture: focus on cumbia, vallenato, or another cultural thread.",
            "School life: compare one idea about school in Colombia with your own experience."
          ]
        }
      ],
      reflectionPrompts: [
        "Write one sentence: En Colombia hay ...",
        "Write one question you still have about Colombia.",
        "Name the station topic you will use for your first slide or research task."
      ]
    },

    // ── Day 2 ──────────────────────────────────────────────────────────────────
    "sp1-day-02-vocab": {
      title: "Day 2 Vocab Check",
      dayLabel: "Day 2",
      kindLabel: "Practice",
      type: "practice",
      minutes: 12,
      description: "Practice the Day 2 vocabulary in Colombia-specific contexts.",
      instructions: "Choose the best answer or type the missing Spanish word.",
      objectives: [
        "I can recognize school and place words in context.",
        "I can match a Colombia sentence to the correct vocabulary word."
      ],
      questions: [
        {
          type: "mc",
          prompt: "What does la mochila mean?",
          options: [
            { value: "a", label: "the backpack" },
            { value: "b", label: "the window" },
            { value: "c", label: "the market" },
            { value: "d", label: "the class" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Complete the sentence: Los estudiantes van al ____ cada día.",
          placeholder: "Spanish word",
          answer: ["colegio", "el colegio"],
          explanation: "Students go to school (colegio) each day."
        },
        {
          type: "mc",
          prompt: "In Cartagena, people buy fruit at el ...",
          options: [
            { value: "a", label: "mercado" },
            { value: "b", label: "libro" },
            { value: "c", label: "colegio" },
            { value: "d", label: "puerta" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the Spanish word for window.",
          placeholder: "Spanish word",
          answer: ["la ventana", "ventana"]
        },
        {
          type: "mc",
          prompt: "Which sentence uses la puerta correctly?",
          options: [
            { value: "a", label: "La puerta está al lado de la ventana." },
            { value: "b", label: "La puerta es un libro." },
            { value: "c", label: "La puerta compra frutas." },
            { value: "d", label: "La puerta estudia español." }
          ],
          answer: "a"
        }
      ]
    },

    // ── Day 3 — Grammar Practice ───────────────────────────────────────────────
    "sp1-day-03-grammar": {
      title: "Day 3 — -ER/-IR + gustar Quick Check",
      dayLabel: "Day 3",
      kindLabel: "Practice",
      type: "practice",
      minutes: 15,
      description: "Check your understanding of present-tense -ER/-IR verbs and gustar + infinitive.",
      instructions: "Use the subject and context clues to choose or type the best answer.",
      objectives: [
        "I can identify the correct -ER or -IR ending in context.",
        "I can use gusta with an infinitive."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Choose the best sentence for yo + comer:",
          options: [
            { value: "a", label: "Yo come arepas." },
            { value: "b", label: "Yo como arepas." },
            { value: "c", label: "Yo comen arepas." },
            { value: "d", label: "Yo vivir arepas." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Complete the sentence: A mí me gusta ____ español.",
          placeholder: "infinitive",
          answer: ["estudiar", "aprender"],
          explanation: "gusta is followed by an infinitive."
        },
        {
          type: "mc",
          prompt: "Choose the best form: Nosotros ____ en Medellín.",
          options: [
            { value: "a", label: "vivimos" },
            { value: "b", label: "vive" },
            { value: "c", label: "viven" },
            { value: "d", label: "vivir" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the correct form: Ellos ____ en el cuaderno. (escribir)",
          placeholder: "verb form",
          answer: ["escriben"]
        },
        {
          type: "mc",
          prompt: "Which sentence is correct?",
          options: [
            { value: "a", label: "Le gusta baila cumbia." },
            { value: "b", label: "Le gusta bailar cumbia." },
            { value: "c", label: "Le gusta bailan cumbia." },
            { value: "d", label: "Le gusto bailar cumbia." }
          ],
          answer: "b"
        }
      ]
    },

    // ── Day 3 — Conjugation Drill ─────────────────────────────────────────────
    "sp1-day-03-drill": {
      title: "Day 3 — -ER/-IR Conjugation Drill",
      dayLabel: "Day 3",
      kindLabel: "Drill",
      type: "drill",
      minutes: 10,
      lives: 3,
      description: "Type the correct conjugated form for each subject and verb. You have 3 lives — use them wisely!",
      instructions: "Type the correct conjugated verb form and press Enter or Check. Accents optional.",
      objectives: [
        "I can conjugate -ER and -IR verbs in the present tense for all subjects.",
        "I can apply the correct ending without notes."
      ],
      items: [
        { prompt: "yo — comer", answer: "como", hint: "-ER verb: yo → -o" },
        { prompt: "tú — beber", answer: "bebes", hint: "-ER verb: tú → -es" },
        { prompt: "él/ella — vivir", answer: "vive", hint: "-IR verb: él/ella → -e" },
        { prompt: "nosotros — escribir", answer: "escribimos", hint: "-IR verb: nosotros → -imos" },
        { prompt: "ellos — leer", answer: "leen", hint: "-ER verb: ellos → -en" },
        { prompt: "yo — correr", answer: "corro", hint: "-ER verb: yo → -o" },
        { prompt: "tú — abrir", answer: "abres", hint: "-IR verb: tú → -es" },
        { prompt: "usted — aprender", answer: "aprende", hint: "-ER verb: usted → -e" },
        { prompt: "nosotros — comer", answer: "comemos", hint: "-ER verb: nosotros → -emos" },
        { prompt: "ellas — vivir", answer: "viven", hint: "-IR verb: ellas → -en" }
      ]
    },

    // ── Day 4 — L2 Reading ────────────────────────────────────────────────────
    "sp1-day-04-reading-l2": {
      title: "Un Día con Sofía",
      dayLabel: "Day 4",
      kindLabel: "Reading",
      type: "reading",
      tier: "l2",
      minutes: 15,
      description: "Read about a student's day in Medellín and answer scaffolded comprehension questions.",
      instructions: "Read each paragraph carefully, then answer the questions using information from the text. Accents optional.",
      glossary: [
        "el barrio = neighborhood",
        "antes de = before",
        "después de = after",
        "los fines de semana = on weekends",
        "el desayuno = breakfast",
        "compartir = to share"
      ],
      passage: [
        "Sofía vive en Medellín con su familia. Cada mañana, come fruta y bebe café con leche antes de salir para la escuela. Su desayuno favorito es una arepa con queso. Sofía sale de su casa a las siete de la mañana.",
        "En el colegio, Sofía aprende mucho. En la clase de historia, ella escribe en el cuaderno y lee sobre los diferentes departamentos de Colombia. Le gusta aprender sobre las regiones porque quiere viajar un día. Su profesora es muy interesante.",
        "Después de la escuela, a Sofía le gusta bailar y escuchar música con sus amigas. También le gusta leer sobre los animales de Colombia. Ella y su amiga Valentina corren en el parque de su barrio tres veces por semana.",
        "Los fines de semana, la familia de Sofía va al mercado para comprar frutas y verduras. Su papá bebe café mientras camina entre los puestos. Sofía comparte la lista de compras con su mamá. Después del mercado, toda la familia come junta en casa."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Where does Sofía live?",
          options: [
            { value: "a", label: "In Cartagena" },
            { value: "b", label: "In Medellín" },
            { value: "c", label: "In Bogotá" },
            { value: "d", label: "In the Amazon" }
          ],
          answer: "b"
        },
        {
          type: "mc",
          prompt: "What does Sofía do in history class?",
          options: [
            { value: "a", label: "She dances and sings." },
            { value: "b", label: "She writes in her notebook and reads about Colombia." },
            { value: "c", label: "She buys fruit at the market." },
            { value: "d", label: "She runs in the neighborhood." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Write one infinitive for something Sofía likes to do after school.",
          placeholder: "infinitive (e.g. bailar)",
          answer: ["bailar", "escuchar", "leer", "correr", "escuchar musica", "escuchar música"]
        },
        {
          type: "mc",
          prompt: "What does the family do on weekends?",
          options: [
            { value: "a", label: "They go to Cartagena." },
            { value: "b", label: "They buy fruits and vegetables at the market." },
            { value: "c", label: "They go to school." },
            { value: "d", label: "They read about animals." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "¿Y tú? Write one thing you like to do after school using me gusta + infinitive.",
          placeholder: "Me gusta ...",
          answer: ["me gusta", "gusta"]
        }
      ]
    },

    // ── Day 4 — Heritage Reading ───────────────────────────────────────────────
    "sp1-day-04-reading-heritage": {
      title: "La vida estudiantil en Medellín",
      dayLabel: "Day 4",
      kindLabel: "Reading",
      type: "reading",
      tier: "heritage",
      minutes: 18,
      description: "A deeper look at student life in Colombia — culture, community, and daily routine.",
      instructions: "Lee el texto con atención. Las preguntas requieren que analices el texto, no solo que lo resumas.",
      glossary: [
        "el colegio = escuela secundaria en Colombia",
        "el barrio = zona residencial de una ciudad",
        "el madrugón = hora muy temprana de la mañana"
      ],
      passage: [
        "En Colombia, el colegio es una institución central en la vida de los jóvenes. Los estudiantes generalmente llegan temprano — muchos salen de su casa antes de las siete de la mañana, incluso en días fríos en ciudades como Bogotá o Medellín, donde las temperaturas pueden bajar bastante en las mañanas.",
        "Valentina vive en el barrio Laureles, en Medellín. Ella estudia en un colegio público donde hay más de ochocientos estudiantes. Por la mañana, come una arepa con huevo antes del madrugón al bus. En el colegio, aprende matemáticas, español, inglés, y ciencias sociales. A ella le gusta especialmente la clase de ciencias porque los temas siempre conectan con el medio ambiente colombiano.",
        "El recreo, que dura veinte minutos, es un momento muy esperado. Los estudiantes corren, hablan, comen snacks como chitos o papas, y a veces escuchan música en grupo con audífonos compartidos. Este tiempo social es una parte esencial del día escolar que muchos adultos colombianos recuerdan con mucha alegría.",
        "Después del colegio, Valentina va directamente a casa porque su mamá trabaja y ella cuida a su hermano menor. Los fines de semana, la familia camina al mercado del barrio y compra ingredientes para la semana. Esta rutina semanal es una tradición que conecta a la familia con su comunidad local y con la historia del barrio donde viven desde hace tres generaciones."
      ],
      questions: [
        {
          type: "mc",
          prompt: "¿Por qué es importante el recreo según el texto?",
          options: [
            { value: "a", label: "Porque los estudiantes aprenden matemáticas." },
            { value: "b", label: "Porque es un momento social esencial del día escolar." },
            { value: "c", label: "Porque los profesores descansan." },
            { value: "d", label: "Porque los estudiantes comen arepas." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "¿Qué hace Valentina después del colegio y por qué? Explica con tus propias palabras.",
          placeholder: "Responde en inglés o español...",
          answer: ["cuida a su hermano", "cuida", "takes care", "goes home", "her mom works"]
        },
        {
          type: "mc",
          prompt: "What does the text suggest about the connection between the family's market trips and community?",
          options: [
            { value: "a", label: "It is only about buying food." },
            { value: "b", label: "It is a tradition that connects the family to community history over three generations." },
            { value: "c", label: "It is something the family started recently." },
            { value: "d", label: "It is required by the school." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Compare one aspect of Valentina's school day with your own experience. What is similar or different?",
          placeholder: "Respond in English or Spanish...",
          answer: ["similar", "different", "same", "recess", "recreo", "early", "bus", "schedule"]
        },
        {
          type: "mc",
          prompt: "What does the author emphasize about Colombian schools by mentioning 800+ students?",
          options: [
            { value: "a", label: "That they are small and personal." },
            { value: "b", label: "That they can be large public institutions with many students." },
            { value: "c", label: "That they only teach Spanish." },
            { value: "d", label: "That they start at noon." }
          ],
          answer: "b"
        }
      ]
    },

    // ── Day 4 — Gustar Practice ────────────────────────────────────────────────
    "sp1-day-04-gustar": {
      title: "Day 4 — Gustar Practice",
      dayLabel: "Day 4",
      kindLabel: "Practice",
      type: "practice",
      minutes: 10,
      description: "Practice the gustar structure in Colombia-themed sentences. Choose or write the best form.",
      instructions: "Use the subject clues and nouns or infinitives to select or type the correct gustar form.",
      objectives: [
        "I can use gusta with a singular noun or infinitive.",
        "I can use gustan with a plural noun.",
        "I can use me, te, le, nos, and les with the correct form."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Complete: A mí ____ las arepas.",
          options: [
            { value: "a", label: "me gustan" },
            { value: "b", label: "me gusta" },
            { value: "c", label: "me gustas" },
            { value: "d", label: "me gustamos" }
          ],
          answer: "a",
          explanation: "Plural noun (arepas) → gustan"
        },
        {
          type: "mc",
          prompt: "Complete: A ella ____ bailar cumbia.",
          options: [
            { value: "a", label: "le gustan" },
            { value: "b", label: "le gusta" },
            { value: "c", label: "les gusta" },
            { value: "d", label: "se gusta" }
          ],
          answer: "b",
          explanation: "Infinitive (bailar) → gusta; ella → le"
        },
        {
          type: "short",
          prompt: "Complete: A nosotros ____ el café colombiano.",
          placeholder: "nos gusta / nos gustan",
          answer: ["nos gusta"],
          explanation: "Singular noun → gusta; nosotros → nos"
        },
        {
          type: "mc",
          prompt: "¿Cuál es la pregunta correcta para tu amigo? (What is the correct question for your friend?)",
          options: [
            { value: "a", label: "¿Te gusta la música?" },
            { value: "b", label: "¿Le gusto la música?" },
            { value: "c", label: "¿Me gusta la música?" },
            { value: "d", label: "¿Nos gustas la música?" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write a complete sentence: say that you (yo) like to read about Colombia.",
          placeholder: "A mí me gusta ...",
          answer: ["me gusta leer", "a mi me gusta leer", "a mí me gusta leer sobre colombia", "me gusta leer sobre colombia"]
        }
      ]
    },

    // ── Day 5 — Location Practice ──────────────────────────────────────────────
    "sp1-day-05-location": {
      title: "Day 5 — Estar + Location Practice",
      dayLabel: "Day 5",
      kindLabel: "Practice",
      type: "practice",
      minutes: 12,
      description: "Practice using estar and prepositions to describe where things are in a Colombian classroom.",
      instructions: "Use the object and preposition clues to choose or type the best answer.",
      objectives: [
        "I can say where classroom objects are with estar.",
        "I can use prepositions like al lado de, debajo de, and encima de."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Choose the best sentence: The book is on top of the desk.",
          options: [
            { value: "a", label: "El libro está encima del escritorio." },
            { value: "b", label: "El libro es encima del escritorio." },
            { value: "c", label: "El libro está debajo del escritorio." },
            { value: "d", label: "El libro gusta el escritorio." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Complete the sentence: La mochila está al lado de la ____.",
          placeholder: "object",
          answer: ["silla", "mesa", "puerta"]
        },
        {
          type: "mc",
          prompt: "Which phrase means under the table?",
          options: [
            { value: "a", label: "encima de la mesa" },
            { value: "b", label: "debajo de la mesa" },
            { value: "c", label: "al lado de la mesa" },
            { value: "d", label: "dentro de la puerta" }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Write the correct form: Los libros ____ en la mesa. (estar)",
          placeholder: "verb form",
          answer: ["estan", "están"]
        },
        {
          type: "mc",
          prompt: "Choose the best question for location practice.",
          options: [
            { value: "a", label: "¿Dónde está la ventana?" },
            { value: "b", label: "¿Qué te gusta?" },
            { value: "c", label: "¿Cómo se llama?" },
            { value: "d", label: "¿Cuántos años tienes?" }
          ],
          answer: "a"
        }
      ]
    },

    // ── Day 5 — Estar Drill ────────────────────────────────────────────────────
    "sp1-day-05-drill": {
      title: "Day 5 — Estar Drill",
      dayLabel: "Day 5",
      kindLabel: "Drill",
      type: "drill",
      minutes: 8,
      lives: 3,
      description: "Type the correct form of estar for each subject. Then practice two prepositions of place.",
      instructions: "Type the correct form and press Enter or Check. Use all subjects from yo to ellos.",
      objectives: [
        "I can conjugate estar correctly for all six subjects.",
        "I can identify prepositions of place in context."
      ],
      items: [
        { prompt: "yo — estar", answer: "estoy", hint: "estar is irregular — memorize estoy" },
        { prompt: "tú — estar", answer: "estas", hint: "estar: tú → estás" },
        { prompt: "él/ella — estar", answer: "esta", hint: "estar: él/ella → está" },
        { prompt: "nosotros — estar", answer: "estamos", hint: "estar: nosotros → estamos" },
        { prompt: "ellos/ellas — estar", answer: "estan", hint: "estar: ellos → están" },
        { prompt: "usted — estar", answer: "esta", hint: "estar: usted → está (same as él/ella)" },
        { prompt: "Choose: book ON TOP OF the desk → ___ de la mesa", answer: "encima", hint: "on top of = encima de" },
        { prompt: "Choose: pencil UNDER the chair → ___ de la silla", answer: "debajo", hint: "under = debajo de" }
      ]
    },

    // ── Day 6 ──────────────────────────────────────────────────────────────────
    "sp1-day-06-emotions-ir": {
      title: "Day 6 — Emotions + ir Practice",
      dayLabel: "Day 6",
      kindLabel: "Practice",
      type: "practice",
      minutes: 14,
      description: "Practice how someone feels and where they are going in simple present-tense sentences.",
      instructions: "Choose the emotion or place phrase that makes the most sense.",
      objectives: [
        "I can describe how someone feels with estar + adjective.",
        "I can use ir + a + place and ir a + infinitive."
      ],
      questions: [
        {
          type: "mc",
          prompt: "If a student has a big test, the best sentence is ...",
          options: [
            { value: "a", label: "Está nervioso." },
            { value: "b", label: "Está contenta de la mesa." },
            { value: "c", label: "Va una mochila." },
            { value: "d", label: "Gusta a la escuela." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Complete the sentence: Yo voy a la ____ después de clase.",
          placeholder: "place",
          answer: ["biblioteca", "cafeteria", "cafetería", "escuela", "casa"]
        },
        {
          type: "mc",
          prompt: "Choose the sentence that means I am going to study.",
          options: [
            { value: "a", label: "Voy a estudiar." },
            { value: "b", label: "Estoy estudiar." },
            { value: "c", label: "Voy estudia." },
            { value: "d", label: "Me gusta estudio." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Complete the sentence: Nosotros ____ cansados hoy. (estar)",
          placeholder: "verb form",
          answer: ["estamos"]
        },
        {
          type: "mc",
          prompt: "Which question matches this lesson?",
          options: [
            { value: "a", label: "¿Cómo estás y adónde vas?" },
            { value: "b", label: "¿Qué comes debajo de la mesa?" },
            { value: "c", label: "¿Dónde escribes café?" },
            { value: "d", label: "¿Cuándo eres nervioso?" }
          ],
          answer: "a"
        }
      ]
    },

    // ── Day 7 — L2 Culture Reading ─────────────────────────────────────────────
    "sp1-day-07-culture-l2": {
      title: "El café colombiano y la comunidad",
      dayLabel: "Day 7",
      kindLabel: "Reading",
      type: "reading",
      tier: "l2",
      minutes: 16,
      description: "Read about coffee's role in Colombian communities and answer comprehension questions.",
      instructions: "Read each paragraph. Use the glossary to help with new words. Answer in English or simple Spanish.",
      glossary: [
        "la cosecha = the harvest",
        "el grano = the bean / grain",
        "crecer = to grow",
        "la finca = the farm",
        "la economía = the economy",
        "llevar = to carry / to bring"
      ],
      passage: [
        "Colombia es uno de los países más famosos del mundo por su café. El café crece en las montañas de una región que se llama el eje cafetero. En esta región, hay muchas fincas donde familias trabajan juntas durante la cosecha para recoger los granos.",
        "El café es muy importante para la economía de Colombia. Muchas familias viven de la venta del café. Los granos colombianos son especiales porque crecen a una altura que les da un sabor suave y rico. Por eso, el café de Colombia se exporta a muchos países del mundo.",
        "El Biblioburro es un proyecto famoso en Colombia. Un hombre llamado Luis Soriano lleva libros a niños en zonas rurales usando burros. Este proyecto muestra que los colombianos cuidan a su comunidad de maneras creativas. El café y el Biblioburro son dos ejemplos de cómo Colombia conecta trabajo, cultura y comunidad."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Where does coffee grow in Colombia?",
          options: [
            { value: "a", label: "On the Caribbean coast" },
            { value: "b", label: "In the Andes mountains in the eje cafetero region" },
            { value: "c", label: "In the Amazon rainforest" },
            { value: "d", label: "In Bogotá's city center" }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Why is Colombian coffee special? Give one reason from the text.",
          placeholder: "Short answer",
          answer: ["altitude", "altura", "soft flavor", "sabor suave", "grows at height", "montanas", "mountains", "special flavor"]
        },
        {
          type: "mc",
          prompt: "What does the Biblioburro project do?",
          options: [
            { value: "a", label: "It sells coffee in Bogotá." },
            { value: "b", label: "It carries books to children in rural zones using donkeys." },
            { value: "c", label: "It teaches farmers to harvest coffee beans." },
            { value: "d", label: "It exports Colombian products to other countries." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "Name one Day 1 station topic that connects to this reading.",
          placeholder: "One word or phrase",
          answer: ["coffee", "cafe", "café", "regions", "regiones", "community", "comunidad", "biblioburro", "school life", "economia", "economy"]
        },
        {
          type: "mc",
          prompt: "What is the main idea of the reading?",
          options: [
            { value: "a", label: "Coffee is the only important thing in Colombia." },
            { value: "b", label: "Colombia connects work, culture, and community through coffee and projects like Biblioburro." },
            { value: "c", label: "The Biblioburro is only about animals." },
            { value: "d", label: "Colombian students drink a lot of coffee." }
          ],
          answer: "b"
        }
      ]
    },

    // ── Day 7 — Heritage Culture Reading ──────────────────────────────────────
    "sp1-day-07-culture-heritage": {
      title: "El legado del café: economía e identidad",
      dayLabel: "Day 7",
      kindLabel: "Reading",
      type: "reading",
      tier: "heritage",
      minutes: 20,
      description: "Un análisis de la importancia cultural y económica del café en Colombia.",
      instructions: "Lee el texto con atención crítica. Las preguntas piden que analices, compares, y conectes ideas más allá del texto.",
      glossary: [
        "el patrimonio = aquello que se hereda de generaciones anteriores",
        "la identidad = conjunto de rasgos que definen a un grupo o persona",
        "el sustento = lo que permite sobrevivir económicamente"
      ],
      passage: [
        "El café colombiano no es simplemente un producto de exportación; es una expresión de identidad nacional. Desde el siglo XIX, el cultivo del café transformó la economía colombiana y creó una clase media rural que antes no existía. Las familias cafeteras de la región del eje cafetero construyeron un modo de vida basado en el trabajo colectivo, la tierra, y la estabilidad generacional.",
        "Para muchas comunidades en Antioquia, Caldas, y Risaralda, el café representa más que el sustento económico. Es un sistema de valores — de paciencia, de trabajo compartido, y de respeto por el ciclo de la naturaleza. Durante la cosecha, familias enteras, incluyendo abuelos y niños pequeños, participan en la recolección de los granos. Este proceso refuerza los lazos comunitarios y transmite conocimiento de una generación a la siguiente.",
        "Sin embargo, el mundo del café colombiano enfrenta desafíos modernos. El cambio climático amenaza las condiciones ideales de cultivo. Las nuevas generaciones de jóvenes rurales a veces prefieren migrar a las ciudades en busca de oportunidades diferentes. Esto plantea una pregunta fundamental: ¿cómo puede Colombia preservar este patrimonio cultural mientras se adapta a un mundo en cambio constante?",
        "El Paisaje Cultural Cafetero, declarado Patrimonio de la Humanidad por la UNESCO en 2011, representa un intento de respuesta a esta pregunta. Al reconocer no solo el producto sino también la arquitectura, las tradiciones, y las prácticas culturales de la región cafetera, Colombia afirma que el valor del café va más allá de su precio en el mercado internacional. Es, en suma, una historia de quién es Colombia y cómo llegó a serlo."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Según el texto, ¿qué transformó el cultivo del café en Colombia en el siglo XIX?",
          options: [
            { value: "a", label: "Creó una clase media rural que antes no existía." },
            { value: "b", label: "Eliminó la agricultura tradicional." },
            { value: "c", label: "Causó la migración de familias a las ciudades." },
            { value: "d", label: "Solo benefició a las empresas internacionales." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "¿Qué desafíos modernos enfrenta el sector cafetero colombiano según el texto? Menciona dos.",
          placeholder: "Responde en inglés o español...",
          answer: ["cambio climatico", "climate change", "migracion", "migration", "jóvenes", "jovenes", "youth leaving", "young people moving", "cities"]
        },
        {
          type: "mc",
          prompt: "What does the UNESCO designation of the Paisaje Cultural Cafetero suggest about how Colombia views its coffee culture?",
          options: [
            { value: "a", label: "That it is only economically valuable." },
            { value: "b", label: "That its value goes beyond market price and includes traditions, architecture, and identity." },
            { value: "c", label: "That it is a dying tradition with no future." },
            { value: "d", label: "That only international organizations care about it." }
          ],
          answer: "b"
        },
        {
          type: "short",
          prompt: "El texto plantea una pregunta fundamental al final del tercer párrafo. ¿Cuál es esa pregunta y qué opinas tú? Responde con dos oraciones.",
          placeholder: "Responde en inglés o español...",
          answer: ["preserve", "preservar", "patrimonio", "heritage", "adapt", "adaptar", "cambio", "change"]
        },
        {
          type: "mc",
          prompt: "Which of the following best describes the central argument of the text?",
          options: [
            { value: "a", label: "Coffee is Colombia's most profitable export." },
            { value: "b", label: "The coffee tradition is disappearing and cannot be saved." },
            { value: "c", label: "Colombian coffee represents a cultural identity that must be understood beyond economics." },
            { value: "d", label: "Young Colombians no longer value traditional farming." }
          ],
          answer: "c"
        }
      ]
    },

    // ── Day 8 ──────────────────────────────────────────────────────────────────
    "sp1-day-08-project-launch": {
      title: "Day 8 Project Launch",
      dayLabel: "Day 8",
      kindLabel: "Project",
      type: "resource",
      minutes: 12,
      description: "Choose a focused topic, set language goals, and gather the right evidence for your group project.",
      callout: "Your project topic must connect clearly to one Day 1 station category so your content feels intentional, not random.",
      objectives: [
        "I can choose a clear Colombia topic for my group.",
        "I can plan simple Spanish sentences with gustar, estar, ir, or -ER/-IR verbs.",
        "I can identify two safe sources and one visual."
      ],
      checklist: [
        "Pick one topic: city, music, food, animal, school life, festival, or region.",
        "Write three facts and where you found them.",
        "Draft at least five simple Spanish sentences.",
        "Choose one map, photo, or diagram for your visual."
      ],
      sections: [
        {
          title: "Topic Ideas",
          bullets: [
            "A city like Bogotá or Cartagena",
            "A cultural element like cumbia or coffee",
            "A biodiversity topic like the rainforest or a famous animal",
            "A daily life comparison such as school or transportation"
          ]
        },
        {
          title: "Language Frames",
          bullets: [
            "En Colombia hay ...",
            "A muchas personas les gusta ...",
            "Los estudiantes van a ...",
            "La ciudad / la región está ..."
          ]
        }
      ],
      reflectionPrompts: [
        "What is your project topic and why did your group choose it?",
        "What three facts will you teach the class?",
        "Which Spanish sentence frame will help your group the most?"
      ]
    },

    // ── Day 9 ──────────────────────────────────────────────────────────────────
    "sp1-day-09-project-checkpoint": {
      title: "Day 9 Project Checkpoint",
      dayLabel: "Day 9",
      kindLabel: "Project",
      type: "resource",
      minutes: 10,
      description: "Make sure your draft is complete before rehearsal day.",
      objectives: [
        "I can check for facts, visuals, and citations.",
        "I can make sure my group has enough Spanish for the presentation.",
        "I can give one useful next step to my group."
      ],
      checklist: [
        "We have a title slide or poster title.",
        "We have at least three accurate facts.",
        "We have Spanish sentences that we can pronounce.",
        "We have at least one source listed."
      ],
      sections: [
        {
          title: "Before You Rehearse",
          bullets: [
            "Highlight every Spanish sentence you plan to say aloud.",
            "Circle any word you still cannot pronounce confidently.",
            "Check that each image matches your topic and has source credit.",
            "Make sure one student can explain the Day 1 station connection."
          ]
        }
      ],
      reflectionPrompts: [
        "What part of your project is strongest right now?",
        "What still needs work before the presentation?",
        "Who in your group will open, explain visuals, and close?"
      ]
    },

    // ── Day 10 ─────────────────────────────────────────────────────────────────
    "sp1-day-10-presentations": {
      title: "Day 10 Audience Reflection Page",
      dayLabel: "Day 10",
      kindLabel: "Presentation",
      type: "resource",
      minutes: 10,
      description: "Stay active as an audience member by tracking one fact, one visual, and one question for each group.",
      objectives: [
        "I can listen for one new fact from another group.",
        "I can ask or write one respectful question.",
        "I can compare two project topics after the presentations."
      ],
      checklist: [
        "Write the group topic.",
        "Record one new fact.",
        "Notice one strong visual.",
        "Prepare one question or compliment."
      ],
      sections: [
        {
          title: "Question Stems",
          bullets: [
            "¿Qué te gusta de ...?",
            "¿Dónde está ...?",
            "¿Por qué es importante ...?",
            "¿Qué aprendiste sobre Colombia?"
          ]
        }
      ],
      reflectionPrompts: [
        "Which presentation taught you the most new information?",
        "Which topic would you want to learn more about next?",
        "What is one thing your class now understands better about Colombia?"
      ]
    },

    // ── Day 11 ─────────────────────────────────────────────────────────────────
    "sp1-day-11-encanto-1": {
      title: "Day 11 Encanto Part 1 Recap",
      dayLabel: "Day 11",
      kindLabel: "Film",
      type: "resource",
      minutes: 12,
      description: "Use this page before or after viewing to track setting, characters, and emotional language from Encanto.",
      callout: "Remember: Encanto is inspired by Colombia. It is not a documentary, so compare it respectfully with the facts from Day 1.",
      objectives: [
        "I can identify key characters and settings.",
        "I can notice words for family, place, and emotion."
      ],
      checklist: [
        "Track one setting detail.",
        "Track one family relationship.",
        "Write one emotion word you hear or see.",
        "Connect one scene to a Day 1 culture anchor."
      ],
      sections: [
        {
          title: "What to Notice",
          bullets: [
            "Mountains, plants, houses, and colors in the setting",
            "Family roles and expectations",
            "How characters feel when they speak or sing"
          ]
        },
        {
          title: "Quick Vocabulary",
          bullets: [
            "la familia = the family",
            "la casa = the house",
            "la emoción = the emotion",
            "el pueblo = the village / town"
          ]
        }
      ],
      reflectionPrompts: [
        "Which character stood out most in Part 1?",
        "What setting detail felt connected to real Colombia?",
        "What question do you have for Part 2?"
      ]
    },

    // ── Day 12 ─────────────────────────────────────────────────────────────────
    "sp1-day-12-encanto-2": {
      title: "Day 12 Encanto Discussion Prep",
      dayLabel: "Day 12",
      kindLabel: "Film",
      type: "resource",
      minutes: 12,
      description: "Discussion stems and writing prompts after finishing Encanto.",
      objectives: [
        "I can discuss one theme from the film.",
        "I can connect the film back to our Colombia unit."
      ],
      checklist: [
        "Think about family pressure.",
        "Think about place and belonging.",
        "Connect one idea from the film to a real Colombia culture anchor."
      ],
      sections: [
        {
          title: "Discussion Stems",
          bullets: [
            "Una conexión con Colombia es ...",
            "Un personaje importante es ... porque ...",
            "En la película, la familia ..."
          ]
        },
        {
          title: "Writing Prompt",
          paragraphs: [
            "Write a short paragraph or notes about what the film shows about family, place, and identity. You can answer in English or simple Spanish, depending on class expectations."
          ]
        }
      ],
      reflectionPrompts: [
        "What part of the ending felt most important?",
        "What idea from the film matches something we learned in class?",
        "What is one thing the movie does not explain about real Colombia?"
      ]
    },

    // ── Day 13 ─────────────────────────────────────────────────────────────────
    "sp1-day-13-review": {
      title: "Day 13 Colombia Review Challenge",
      dayLabel: "Day 13",
      kindLabel: "Review",
      type: "practice",
      minutes: 15,
      description: "Mixed review — check your readiness before the review stations and exam.",
      instructions: "Answer each item without notes first. Then use your mistakes to choose what to review in class.",
      objectives: [
        "I can identify which skill I need to review most.",
        "I can apply unit vocabulary and grammar in context."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Choose the best sentence with gustar:",
          options: [
            { value: "a", label: "Me gusta bailar cumbia." },
            { value: "b", label: "Me gusto bailar cumbia." },
            { value: "c", label: "Me gusta bailo cumbia." },
            { value: "d", label: "Me gustas bailar cumbia." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the correct form: Nosotros ____ en Bogotá. (vivir)",
          placeholder: "verb form",
          answer: ["vivimos"]
        },
        {
          type: "mc",
          prompt: "Choose the best location sentence:",
          options: [
            { value: "a", label: "La mochila está debajo de la mesa." },
            { value: "b", label: "La mochila es debajo de la mesa." },
            { value: "c", label: "La mochila va debajo de la mesa." },
            { value: "d", label: "La mochila gusta debajo de la mesa." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the Spanish word for market.",
          placeholder: "Spanish word",
          answer: ["mercado", "el mercado"]
        },
        {
          type: "mc",
          prompt: "Which sentence means I am going to study?",
          options: [
            { value: "a", label: "Voy a estudiar." },
            { value: "b", label: "Estoy estudiar." },
            { value: "c", label: "Voy estudiar la." },
            { value: "d", label: "Me gusta estudio." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the yo form of: comer",
          placeholder: "verb form",
          answer: ["como"]
        },
        {
          type: "mc",
          prompt: "A muchas personas ___ los deportes en Colombia.",
          options: [
            { value: "a", label: "les gustan" },
            { value: "b", label: "les gusta" },
            { value: "c", label: "me gustan" },
            { value: "d", label: "nos gusta" }
          ],
          answer: "a",
          explanation: "Plural noun (deportes) → gustan; many people → les"
        }
      ]
    },

    // ── Day 14 ─────────────────────────────────────────────────────────────────
    "sp1-day-14-study": {
      title: "Day 14 Study Guide Check",
      dayLabel: "Day 14",
      kindLabel: "Study Guide",
      type: "practice",
      minutes: 15,
      description: "Final check-in before the exam. If you miss one, go back to that day's card and review.",
      callout: "This is not the test — it's your last chance to identify gaps. Use your score to guide what you study tonight.",
      objectives: [
        "I can identify my final review needs before the exam."
      ],
      questions: [
        {
          type: "mc",
          prompt: "Choose the best translation for la ventana.",
          options: [
            { value: "a", label: "window" },
            { value: "b", label: "door" },
            { value: "c", label: "backpack" },
            { value: "d", label: "market" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Complete the sentence: Ella ____ arepas. (comer)",
          placeholder: "verb form",
          answer: ["come"]
        },
        {
          type: "mc",
          prompt: "Choose the best sentence about emotion:",
          options: [
            { value: "a", label: "Estoy feliz." },
            { value: "b", label: "Soy en la clase." },
            { value: "c", label: "Voy feliz de la escuela." },
            { value: "d", label: "Me gusta feliz." }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write one infinitive that can follow me gusta.",
          placeholder: "infinitive",
          answer: ["estudiar", "bailar", "leer", "comer", "correr", "escribir", "vivir", "beber"]
        },
        {
          type: "mc",
          prompt: "Which phrase means next to the chair?",
          options: [
            { value: "a", label: "al lado de la silla" },
            { value: "b", label: "debajo de la silla" },
            { value: "c", label: "encima de la silla" },
            { value: "d", label: "dentro de la silla" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "Write the nosotros form of: escribir",
          placeholder: "verb form",
          answer: ["escribimos"]
        }
      ]
    },

    // ─── LISTENING ACTIVITIES ──────────────────────────────────────────────────
    // Replace YOUTUBE_ID below with the actual YouTube video ID (the part after ?v= in the URL)
    "sp1-listening-cumbia": {
      type: "listening",
      title: "La Cumbia — Colombian Music",
      dayLabel: "Bonus",
      kindLabel: "Listening",
      minutes: 10,
      description: "Listen to cumbia, Colombia's national rhythm, and answer questions about the music and culture.",
      instructions: "Watch the video at least once. Then answer the comprehension questions below.",
      objectives: [
        "Identify key features of cumbia as a Colombian cultural tradition",
        "Connect vocabulary from the unit to what you hear and see"
      ],
      youtubeId: "REPLACE_WITH_YOUTUBE_ID",
      questions: [
        {
          type: "mc",
          prompt: "¿De dónde es la cumbia?",
          options: [
            { value: "a", label: "Colombia" },
            { value: "b", label: "México" },
            { value: "c", label: "Argentina" },
            { value: "d", label: "España" }
          ],
          answer: "a"
        },
        {
          type: "mc",
          prompt: "La cumbia es un tipo de…",
          options: [
            { value: "a", label: "música y baile" },
            { value: "b", label: "comida típica" },
            { value: "c", label: "deporte nacional" },
            { value: "d", label: "idioma regional" }
          ],
          answer: "a"
        },
        {
          type: "short",
          prompt: "¿Qué instrumentos escuchas en la cumbia? Escribe uno en español.",
          placeholder: "e.g. la flauta, el tambor",
          answer: ["la flauta", "el tambor", "tambor", "flauta", "las maracas", "maracas", "gaita", "la gaita"]
        }
      ],
      resultTitle: "Comprensión",
      resultIntro: "Submit your answers after watching the video.",
      submitLabel: "Check Answers"
    }
  }
};
