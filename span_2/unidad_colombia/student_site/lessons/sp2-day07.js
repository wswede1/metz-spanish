window.LESSON_DATA = {
  dayLabel: "Day 7",
  unit: "Unidad Colombia",
  title: "Exploración Cultural (pretérito)",
  subtitle: "Culture reading stations in Spanish — report what you learned using accurate preterite forms",
  objectives: [
    "I can read about Colombian cultural topics and pull out key facts",
    "I can write at least two preterite sentences about what I learned at each station",
    "I can connect a culture topic to my upcoming group project"
  ],
  vocabCategory: 1,
  sections: [
    {
      id: "station1",
      title: "Station 1 — El Café Colombiano",
      shortTitle: "Coffee",
      subtitle: "Colombia's most famous export and the communities behind it",
      icon: "☕",
      accent: "orange",
      open: true,
      components: [
        {
          type: "callout",
          style: "tip",
          text: "<strong>Spanish 2 focus:</strong> After each station, write <strong>one English summary</strong> and <strong>one original Spanish sentence in the preterite</strong> (what happened, what people did, what you learned)."
        },
        {
          type: "reading",
          plain: "Colombia es uno de los mayores productores de café del mundo. El café crece en la Zona Cafetera — una región montañosa con clima perfecto. Las familias trabajan en fincas pequeñas. Muchas familias cosechan el café a mano. El café colombiano es famoso por su sabor suave. La economía de muchos pueblos depende del café. En 2011, la UNESCO declaró el Paisaje Cultural Cafetero como Patrimonio de la Humanidad.",
          glossary: [
            "café=coffee",
            "fincas=small farms",
            "cosechan=they harvest",
            "economía=economy",
            "pueblos=towns",
            "Patrimonio=heritage (Patrimonio de la Humanidad = World Heritage)",
            "declaró=declared",
            "montañosa=mountainous"
          ],
          instructions: "This reading describes the importance of coffee to Colombian communities."
        },
        {
          type: "questions",
          questions: [
            { prompt: "What three things does the text connect to coffee?", type: "textarea", placeholder: "1) ... 2) ... 3) ...", rows: 2 },
            { prompt: "Why is coffee important to Colombian families?", type: "textarea", placeholder: "Because...", rows: 2 }
          ]
        }
      ]
    },
    {
      id: "station2",
      title: "Station 2 — Cartagena",
      shortTitle: "Cartagena",
      subtitle: "A Caribbean city where history meets color",
      icon: "🏰",
      accent: "blue",
      components: [
        {
          type: "reading",
          text: "Cartagena <span class=\"verb-highlight\">está</span> en la costa del Caribe. Es una ciudad con mucha historia — los españoles la construyeron como puerto principal. Hoy, Cartagena <span class=\"verb-highlight\">es</span> famosa por sus calles coloridas, la muralla antigua y la comida del mar. Los turistas <span class=\"verb-highlight\">van</span> a Cartagena para ver la Ciudad Amurallada, comer ceviche, y bailar salsa. La ciudad también tiene una cultura afro-colombiana muy rica.",
          instructions: "Think about why Cartagena is a good example of Colombian diversity."
        },
        {
          type: "questions",
          questions: [
            { prompt: "Why is Cartagena a good 'Day 1 city anchor'? What makes it special?", type: "textarea", placeholder: "Cartagena is special because...", rows: 2 },
            { prompt: "Name two things tourists do in Cartagena:", placeholder: "They visit... and eat..." }
          ]
        }
      ]
    },
    {
      id: "station3",
      title: "Station 3 — El Biblioburro",
      shortTitle: "Biblioburro",
      subtitle: "A teacher, two donkeys, and a mission to bring books to everyone",
      icon: "📚",
      accent: "green",
      components: [
        {
          type: "reading",
          text: "Luis Soriano <span class=\"verb-highlight\">es</span> un maestro de La Gloria, Colombia. Él <span class=\"verb-highlight\">tiene</span> dos burros: Alfa y Beto. Juntos, <span class=\"verb-highlight\">llevan</span> libros a los niños en zonas rurales. Muchos niños <span class=\"verb-highlight\">viven</span> lejos de las escuelas y bibliotecas. El Biblioburro <span class=\"verb-highlight\">viaja</span> por las montañas para que los niños puedan leer. Hoy, el Biblioburro <span class=\"verb-highlight\">es</span> famoso en todo el mundo como ejemplo de educación y comunidad.",
          instructions: "This is a true story that shows how one person can make a big difference."
        },
        {
          type: "questions",
          questions: [
            { prompt: "How does the Biblioburro connect education and community?", type: "textarea", placeholder: "It connects them because...", rows: 2 }
          ]
        }
      ]
    },
    {
      id: "station4",
      title: "Station 4 — La Música Colombiana",
      shortTitle: "Music",
      subtitle: "Cumbia, vallenato, and the rhythm of Colombia",
      icon: "🎵",
      accent: "purple",
      components: [
        {
          type: "reading",
          text: "La música <span class=\"verb-highlight\">es</span> una parte esencial de la cultura colombiana. La <span class=\"verb-highlight\">cumbia</span> tiene raíces africanas e indígenas — <span class=\"verb-highlight\">combina</span> tambores, flautas y baile. El <span class=\"verb-highlight\">vallenato</span> viene de la costa del Caribe y <span class=\"verb-highlight\">usa</span> el acordeón, la caja y la guacharaca. Hoy, artistas como Shakira y Carlos Vives <span class=\"verb-highlight\">mezclan</span> estilos tradicionales con música moderna. La música colombiana <span class=\"verb-highlight\">está</span> en todas partes: en las fiestas, en los mercados, y en las calles.",
          instructions: "Think about how music could become a project topic."
        },
        {
          type: "questions",
          questions: [
            { prompt: "How could music become a project topic? What angle would you explore?", type: "textarea", placeholder: "I could explore...", rows: 2 }
          ]
        }
      ]
    },
    {
      id: "project-topic",
      title: "Choose Your Project Topic",
      shortTitle: "Project",
      subtitle: "Pick a topic for your Colombia group project",
      icon: "🎯",
      accent: "red",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>Project topics:</strong> city/region · food/drink · music/dance · animal/biodiversity · school life/community project. You'll develop this over Days 8-10!"
        },
        {
          type: "questions",
          questions: [
            { prompt: "My top project topic is:", placeholder: "I want to research..." },
            { prompt: "Why does this topic interest me?", type: "textarea", placeholder: "Because...", rows: 2 },
            { prompt: "One fact I already know about this topic:", placeholder: "I know that..." },
            { prompt: "One fact I still need to research:", placeholder: "I need to find out..." }
          ]
        }
      ]
    },
    {
      id: "exit",
      title: "Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Reflect on what you explored today",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 7",
          fields: [
            { label: "Which station was most interesting? Why? (English)", type: "textarea", placeholder: "Station... was most interesting because...", rows: 2 },
            { label: "Write two preterite sentences in Spanish about today's readings:", type: "textarea", placeholder: "Aprendí que... / Los colombianos produjeron...", rows: 2 },
            { label: "How does your project topic connect to what we studied?", placeholder: "My topic connects because..." }
          ]
        }
      ]
    }
  ]
};
