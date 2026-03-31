window.LESSON_DATA = {
  dayLabel: "Day 9",
  unit: "Unidad Colombia",
  title: "Project Checkpoint",
  subtitle: "Check your progress, get peer feedback, and rehearse your opening",
  objectives: [
    "I can evaluate my group's progress with a checklist",
    "I can give and receive constructive peer feedback",
    "I can deliver a clear 30-second opening in Spanish"
  ],
  sections: [
    {
      id: "progress",
      title: "Part 1 — Progress Check",
      shortTitle: "Progress",
      subtitle: "How far along is your project?",
      icon: "📋",
      accent: "blue",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "Be honest! This helps you identify what still needs work before presentations tomorrow."
        },
        {
          type: "data-table",
          headers: ["Checkpoint Item", "Done ✓", "Still Needs Work"],
          rows: [
            ["Clear topic and title", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }],
            ["3+ accurate facts with sources", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }],
            ["Spanish sentences are ready", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }],
            ["Visuals with source credit", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }],
            ["Everyone has a speaking role", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }]
          ]
        }
      ]
    },
    {
      id: "feedback",
      title: "Part 2 — Peer Feedback",
      shortTitle: "Feedback",
      subtitle: "Swap with another group and give helpful feedback",
      icon: "💬",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Trade your project with a neighboring group. Give specific, helpful feedback — not just 'good job!'"
        },
        {
          type: "questions",
          questions: [
            { prompt: "One strength of our project right now:", type: "textarea", placeholder: "Our project is strong because...", rows: 2 },
            { prompt: "One part that is still confusing or incomplete:", type: "textarea", placeholder: "We still need to work on...", rows: 2 },
            { prompt: "One Spanish sentence we need to practice again:", placeholder: "The sentence '...' needs work because..." }
          ]
        }
      ]
    },
    {
      id: "rehearsal",
      title: "Part 3 — 30-Second Rehearsal",
      shortTitle: "Rehearsal",
      subtitle: "Practice your opening — your audience should understand the topic immediately",
      icon: "🎤",
      accent: "purple",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "Practice your opening aloud! In 30 seconds, your audience should know: <strong>the topic</strong>, <strong>one fact</strong>, and <strong>why it matters</strong>."
        },
        {
          type: "partner-talk",
          title: "Rehearse with your group",
          prompt: "Stand up. Each person practices their part. Time yourselves — can you deliver the opening in 30 seconds?",
          duration: "5 minutes"
        },
        {
          type: "questions",
          questions: [
            { prompt: "Write your opening line (in Spanish):", type: "textarea", placeholder: "Hoy vamos a hablar sobre...", rows: 2 },
            { prompt: "Who speaks first? What do they say?", placeholder: "[Name] says: ..." }
          ]
        }
      ]
    },
    {
      id: "exit",
      title: "Teacher Conference + Exit",
      shortTitle: "Exit",
      subtitle: "Meet with your teacher before leaving",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "callout",
          style: "warn",
          text: "Your teacher will conference with each group and hear your rehearsal before you leave. Be ready!"
        },
        {
          type: "exit-ticket",
          title: "Readiness Check",
          prompt: "Answer honestly — are you ready for presentations?",
          fields: [
            { label: "On a scale of 1-5, how ready is our group?", placeholder: "1 = not ready, 5 = fully ready" },
            { label: "What is the ONE thing we must fix before tomorrow?", placeholder: "We must..." }
          ]
        }
      ]
    }
  ]
};
