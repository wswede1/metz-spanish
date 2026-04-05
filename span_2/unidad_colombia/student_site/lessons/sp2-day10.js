window.LESSON_DATA = {
  dayLabel: "Day 10",
  unit: "Unidad Colombia",
  title: "Presentaciones del Proyecto",
  subtitle: "Present your project and learn from your classmates' research",
  objectives: [
    "I can present information about Colombia using the Spanish preterite",
    "I can listen for key facts during classmates' presentations",
    "I can ask questions and give compliments in Spanish"
  ],
  vocabCategory: "all",
  sections: [
    {
      id: "expectations",
      title: "Audience Expectations",
      shortTitle: "Expectations",
      subtitle: "Be an active, respectful audience member",
      icon: "🎯",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "<strong>Audience job:</strong> Listen actively, take notes, and prepare at least one question or compliment for each group."
        },
        {
          type: "callout",
          style: "tip",
          text: "<strong>Question stems in preterite:</strong><br>• ¿Qué hicieron los colombianos para...?<br>• ¿Adónde fueron ustedes para investigar...?<br>• ¿Qué aprendieron sobre...?<br>• ¿Por qué escogieron ese tema?"
        },
        {
          type: "callout",
          style: "tip",
          text: "<strong>Compliment stems:</strong><br>• Me gustó mucho cuando dijeron...<br>• La parte sobre ___ fue muy interesante.<br>• Aprendí algo nuevo: ..."
        }
      ]
    },
    {
      id: "group1",
      title: "Group 1 Presentation",
      shortTitle: "Group 1",
      subtitle: "Listen, take notes, and prepare feedback",
      icon: "1️⃣",
      accent: "green",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "What was Group 1's topic?", placeholder: "Their topic was..." },
            { prompt: "Write one new fact you learned (in English or Spanish):", placeholder: "I learned that..." },
            { prompt: "What was one effective visual or detail they used?", placeholder: "Their visual showed..." },
            { prompt: "Write a question or compliment for Group 1 (try Spanish!):", placeholder: "¿Qué hicieron...? / Me gustó cuando..." }
          ]
        }
      ]
    },
    {
      id: "group2",
      title: "Group 2 Presentation",
      shortTitle: "Group 2",
      subtitle: "Listen, take notes, and prepare feedback",
      icon: "2️⃣",
      accent: "purple",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "What was Group 2's topic?", placeholder: "Their topic was..." },
            { prompt: "Write one new fact you learned (in English or Spanish):", placeholder: "I learned that..." },
            { prompt: "What was one effective visual or detail they used?", placeholder: "Their visual showed..." },
            { prompt: "Write a question or compliment for Group 2 (try Spanish!):", placeholder: "¿Qué aprendieron...? / La parte sobre... fue interesante." }
          ]
        }
      ]
    },
    {
      id: "group3",
      title: "Group 3 Presentation",
      shortTitle: "Group 3",
      subtitle: "Listen, take notes, and prepare feedback",
      icon: "3️⃣",
      accent: "orange",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "What was Group 3's topic?", placeholder: "Their topic was..." },
            { prompt: "Write one new fact you learned (in English or Spanish):", placeholder: "I learned that..." },
            { prompt: "What was one effective visual or detail they used?", placeholder: "Their visual showed..." },
            { prompt: "Write a question or compliment for Group 3 (try Spanish!):", placeholder: "¿Por qué escogieron...? / Aprendí algo nuevo..." }
          ]
        }
      ]
    },
    {
      id: "group4",
      title: "Group 4 Presentation",
      shortTitle: "Group 4",
      subtitle: "Listen, take notes, and prepare feedback",
      icon: "4️⃣",
      accent: "red",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "What was Group 4's topic?", placeholder: "Their topic was..." },
            { prompt: "Write one new fact you learned (in English or Spanish):", placeholder: "I learned that..." },
            { prompt: "What was one effective visual or detail they used?", placeholder: "Their visual showed..." },
            { prompt: "Write a question or compliment for Group 4 (try Spanish!):", placeholder: "¿Adónde fueron...? / Me gustó mucho cuando dijeron..." }
          ]
        }
      ]
    },
    {
      id: "reflection",
      title: "Reflection",
      shortTitle: "Reflection",
      subtitle: "Think about what you learned from all the presentations",
      icon: "💭",
      accent: "teal",
      components: [
        {
          type: "exit-ticket",
          title: "Presentation Day Reflection",
          fields: [
            { label: "Which group's project interested you the most? Why?", type: "textarea", placeholder: "I was most interested in... because...", rows: 2 },
            { label: "What new topic about Colombia would you want to study more?", type: "textarea", placeholder: "I would want to learn more about... because...", rows: 2 },
            { label: "Write one sentence in preterite about something you learned today:", placeholder: "Hoy aprendí que..." }
          ]
        }
      ]
    }
  ]
};
