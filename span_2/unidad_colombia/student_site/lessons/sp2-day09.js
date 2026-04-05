window.LESSON_DATA = {
  dayLabel: "Day 9",
  unit: "Unidad Colombia",
  title: "Revisión del Proyecto",
  subtitle: "Check your progress, get peer feedback, and rehearse your opening",
  objectives: [
    "I can evaluate my group's progress using a project checklist",
    "I can give and receive constructive peer feedback",
    "I can deliver a clear 30-second opening in Spanish using the preterite"
  ],
  vocabCategory: "all",
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
          text: "Be honest with yourself! This checklist helps you identify what still needs work before presentations on Day 10."
        },
        {
          type: "data-table",
          headers: ["Checkpoint Item", "Done ✓", "Still Needs Work"],
          rows: [
            ["Clear topic and title for your project", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }],
            ["3+ accurate facts about your Colombia topic", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }],
            ["Preterite sentences ready (at least 3)", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }],
            ["Visuals with source credit", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }],
            ["Everyone has a speaking role assigned", { editable: true, placeholder: "✓?" }, { editable: true, placeholder: "What's missing?" }]
          ]
        }
      ]
    },
    {
      id: "feedback",
      title: "Part 2 — Peer Feedback",
      shortTitle: "Feedback",
      subtitle: "Swap with another group and give helpful, specific feedback",
      icon: "💬",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Trade your project with a neighboring group. Focus on the <strong>preterite sentences</strong> — are the verb forms correct? Is the information clear?"
        },
        {
          type: "questions",
          questions: [
            { prompt: "One strength of this group's project:", type: "textarea", placeholder: "Their project is strong because...", rows: 2 },
            { prompt: "One area that is still confusing or incomplete:", type: "textarea", placeholder: "They still need to work on...", rows: 2 },
            { prompt: "Copy one preterite sentence from their project that needs fixing. Write the corrected version below:", type: "textarea", placeholder: "Original: '...'\nCorrected: '...'", rows: 3 }
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
          text: "Your opening must be <strong>in Spanish</strong> and include at least one preterite sentence. In 30 seconds, the audience should know: <strong>the topic</strong>, <strong>one fact</strong>, and <strong>why it matters</strong>."
        },
        {
          type: "partner-talk",
          title: "Rehearse with your group",
          prompt: "Stand up. Each person practices their part. Time yourselves — can you deliver the opening in 30 seconds? Use at least one preterite verb (e.g., 'Colombia fue...', 'Los colombianos crearon...').",
          duration: "5 minutes"
        },
        {
          type: "questions",
          questions: [
            { prompt: "Write your opening line in Spanish (include a preterite verb):", placeholder: "Nuestro proyecto es sobre... Colombia fue..." },
            { prompt: "Which preterite verbs did you use in your opening?", placeholder: "fue, hicieron, viajaron..." }
          ]
        }
      ]
    },
    {
      id: "conference",
      title: "Part 4 — Teacher Conference + Exit",
      shortTitle: "Conference",
      subtitle: "Meet with your teacher and confirm you're ready",
      icon: "✅",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "warn",
          text: "Your teacher will visit each group for a quick check-in. Be ready to share your opening and one preterite sentence."
        },
        {
          type: "exit-ticket",
          title: "Readiness Check",
          fields: [
            { label: "On a scale of 1–5, how ready is your group to present tomorrow?", placeholder: "1 = not ready, 5 = totally ready" },
            { label: "What is the ONE thing your group still needs to finish tonight?", placeholder: "We still need to...", type: "textarea", rows: 2 },
            { label: "Write one preterite sentence from your project you are most proud of:", placeholder: "Los colombianos inventaron..." }
          ]
        }
      ]
    }
  ]
};
