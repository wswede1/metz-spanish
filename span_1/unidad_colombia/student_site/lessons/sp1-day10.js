window.LESSON_DATA = {
  dayLabel: "Day 10",
  unit: "Unidad Colombia",
  title: "Presentaciones del Proyecto",
  subtitle: "Present your project and learn from your classmates' research",
  objectives: [
    "I can present information about Colombia in Spanish",
    "I can listen for key facts in classmates' presentations",
    "I can ask respectful questions and give compliments in Spanish"
  ],
  vocabCategory: "all",
  sections: [
    {
      id: "instructions",
      title: "Audience Expectations",
      shortTitle: "Instructions",
      subtitle: "What to do while other groups present",
      icon: "📋",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "For each group, write down: <strong>one new fact</strong>, <strong>one good visual</strong>, and <strong>one question or compliment</strong>. Be a respectful, engaged audience!"
        },
        {
          type: "callout",
          style: "tip",
          text: "<strong>Question stems in Spanish:</strong> ¿Por qué...? · ¿Cómo es...? · ¿Dónde está...? · ¿Qué más sabes de...? · Me gusta tu presentación porque..."
        }
      ]
    },
    {
      id: "group1",
      title: "Group 1",
      shortTitle: "Group 1",
      subtitle: "Track what you learn",
      icon: "1️⃣",
      accent: "green",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "Group topic:", placeholder: "Their topic is..." },
            { prompt: "One new fact I learned:", placeholder: "I learned that..." },
            { prompt: "One effective visual they used:", placeholder: "They showed..." },
            { prompt: "My question or compliment:", placeholder: "¿Por qué...? / Me gusta..." }
          ]
        }
      ]
    },
    {
      id: "group2",
      title: "Group 2",
      shortTitle: "Group 2",
      subtitle: "Track what you learn",
      icon: "2️⃣",
      accent: "purple",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "Group topic:", placeholder: "Their topic is..." },
            { prompt: "One new fact I learned:", placeholder: "I learned that..." },
            { prompt: "One effective visual they used:", placeholder: "They showed..." },
            { prompt: "My question or compliment:", placeholder: "¿Por qué...? / Me gusta..." }
          ]
        }
      ]
    },
    {
      id: "group3",
      title: "Group 3",
      shortTitle: "Group 3",
      subtitle: "Track what you learn",
      icon: "3️⃣",
      accent: "orange",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "Group topic:", placeholder: "Their topic is..." },
            { prompt: "One new fact I learned:", placeholder: "I learned that..." },
            { prompt: "One effective visual they used:", placeholder: "They showed..." },
            { prompt: "My question or compliment:", placeholder: "¿Por qué...? / Me gusta..." }
          ]
        }
      ]
    },
    {
      id: "group4",
      title: "Group 4",
      shortTitle: "Group 4",
      subtitle: "Track what you learn",
      icon: "4️⃣",
      accent: "teal",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "Group topic:", placeholder: "Their topic is..." },
            { prompt: "One new fact I learned:", placeholder: "I learned that..." },
            { prompt: "One effective visual they used:", placeholder: "They showed..." },
            { prompt: "My question or compliment:", placeholder: "¿Por qué...? / Me gusta..." }
          ]
        }
      ]
    },
    {
      id: "reflection",
      title: "Reflection",
      shortTitle: "Reflect",
      subtitle: "What did you take away from today's presentations?",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "Presentation Reflection",
          fields: [
            { label: "Which project helped you understand Colombia better? Why?", type: "textarea", placeholder: "The project about... because...", rows: 2 },
            { label: "What is one new topic you would like to study more?", placeholder: "I want to learn more about..." }
          ]
        }
      ]
    }
  ]
};
