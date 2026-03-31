window.LESSON_DATA = {
  dayLabel: "Day 8",
  unit: "Unidad Colombia",
  title: "Project Planning",
  subtitle: "Define your focus, research facts, draft Spanish sentences, and assign group roles",
  objectives: [
    "I can define a clear project focus connected to Colombia",
    "I can find 3+ facts from reliable sources",
    "I can draft 4 Spanish sentences using unit grammar"
  ],
  sections: [
    {
      id: "focus",
      title: "Step 1 — Define the Focus",
      shortTitle: "Focus",
      subtitle: "What is your project about and why?",
      icon: "🎯",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "Your project should connect to a Day 1 anchor: <strong>Bogotá, Cartagena, Caribbean coast,</strong> or <strong>the Andes</strong>. Your final product can be a poster, slides, or mini-presentation."
        },
        {
          type: "questions",
          questions: [
            { prompt: "Our Day 1 connection is:", placeholder: "We connect to... (city/region/anchor)" },
            { prompt: "Our final product will be:", placeholder: "poster / slides / mini-presentation" },
            { prompt: "Why did we choose this topic?", type: "textarea", placeholder: "We chose this because...", rows: 3 }
          ]
        }
      ]
    },
    {
      id: "research",
      title: "Step 2 — Research and Sources",
      shortTitle: "Research",
      subtitle: "Find 3 facts and document your sources",
      icon: "🔎",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Use reliable sources. For each fact, write WHERE you found it and whether you can teach it clearly."
        },
        {
          type: "data-table",
          headers: ["Fact", "Source", "Can we teach this?"],
          rows: [
            [{ editable: true, placeholder: "Fact 1..." }, { editable: true, placeholder: "Website/book..." }, { editable: true, placeholder: "Yes/No — why?" }],
            [{ editable: true, placeholder: "Fact 2..." }, { editable: true, placeholder: "Website/book..." }, { editable: true, placeholder: "Yes/No — why?" }],
            [{ editable: true, placeholder: "Fact 3..." }, { editable: true, placeholder: "Website/book..." }, { editable: true, placeholder: "Yes/No — why?" }]
          ]
        }
      ]
    },
    {
      id: "sentences",
      title: "Step 3 — Draft Spanish Sentences",
      shortTitle: "Sentences",
      subtitle: "Write 4 sentences using unit grammar",
      icon: "📝",
      accent: "purple",
      components: [
        {
          type: "callout",
          style: "info",
          text: "<strong>Helpful frames:</strong> En Colombia hay... · A muchas personas les gusta... · La ciudad/región está... · Los estudiantes van a..."
        },
        {
          type: "questions",
          questions: [
            { prompt: "Sentence 1 (use a fact + verb):", placeholder: "En Colombia hay..." },
            { prompt: "Sentence 2 (use gustar):", placeholder: "A muchas personas les gusta..." },
            { prompt: "Sentence 3 (use estar + location):", placeholder: "La ciudad está..." },
            { prompt: "Sentence 4 (use ir or another verb):", placeholder: "Los turistas van a..." }
          ]
        }
      ]
    },
    {
      id: "roles",
      title: "Step 4 — Group Jobs",
      shortTitle: "Roles",
      subtitle: "Assign roles so everyone contributes",
      icon: "👥",
      accent: "orange",
      components: [
        {
          type: "data-table",
          headers: ["Group Member", "Role", "What they will finish TODAY"],
          rows: [
            [{ editable: true, placeholder: "Name..." }, { editable: true, placeholder: "Researcher / Writer / Designer / Presenter" }, { editable: true, placeholder: "Task..." }],
            [{ editable: true, placeholder: "Name..." }, { editable: true, placeholder: "Role..." }, { editable: true, placeholder: "Task..." }],
            [{ editable: true, placeholder: "Name..." }, { editable: true, placeholder: "Role..." }, { editable: true, placeholder: "Task..." }]
          ]
        }
      ]
    },
    {
      id: "visual",
      title: "Step 5 — Visual Plan",
      shortTitle: "Visuals",
      subtitle: "Plan your images, maps, and audience hook",
      icon: "🎨",
      accent: "yellow",
      components: [
        {
          type: "questions",
          questions: [
            { prompt: "What images or maps do we need?", type: "textarea", placeholder: "We need a map of... and photos of...", rows: 2 },
            { prompt: "What will the audience learn in the FIRST 30 seconds?", type: "textarea", placeholder: "Our opening will show/say...", rows: 2 }
          ]
        }
      ]
    },
    {
      id: "checklist",
      title: "Before You Leave — Checklist",
      shortTitle: "Checklist",
      subtitle: "Make sure you've completed everything",
      icon: "✅",
      accent: "red",
      components: [
        {
          type: "exit-ticket",
          title: "End-of-Class Check",
          prompt: "Check each item. All should be done before you leave!",
          fields: [
            { label: "Topic is clear and connected to a Day 1 anchor", placeholder: "Yes / Not yet" },
            { label: "Three facts are collected with sources", placeholder: "Yes / Not yet" },
            { label: "Four Spanish sentences are drafted", placeholder: "Yes / Not yet" },
            { label: "Group roles are assigned", placeholder: "Yes / Not yet" }
          ]
        }
      ]
    }
  ]
};
