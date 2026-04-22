window.LESSON_DATA = {
  dayLabel: "Day 14",
  unit: "Unidad Colombia",
  title: "Colombia Unit Exam Review — Stations",
  subtitle: "Six review stations · Preterite patterns + Colombia contexts (same targets as the printed station guide)",
  objectives: [
    "I can apply the 3-step regular preterite pattern in travel frames",
    "I can use yo spelling fixes for -CAR / -GAR / -ZAR and explain why they exist",
    "I can form él/ellos Y-verb and stem-changing -IR preterites",
    "I can use decir, traer, and venir in the preterite",
    "I can find and explain preterite verbs in a short culture passage"
  ],
  vocabCategory: "all",
  sections: [
    {
      id: "st1",
      title: "Station 1 — Regular preterite (travel frames)",
      shortTitle: "Station 1",
      subtitle: "Individual practice · ~8 min",
      icon: "1️⃣",
      accent: "red",
      open: true,
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>3-STEP REGULAR PRETERITE</strong><br><strong>Step 1:</strong> Find the infinitive (-AR, -ER, or -IR).<br><strong>Step 2:</strong> Drop the infinitive ending to get the stem.<br><strong>Step 3:</strong> Add the preterite ending that matches the subject.<br><br><em>Example:</em> <strong>viajar</strong> → <strong>viaj-</strong> + <strong>-amos</strong> = <strong>viajamos</strong> (we traveled)"
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "Nosotros ___ (llegar) al aeropuerto de Bogotá a las ocho.", answer: ["llegamos"] },
            { text: "Ellos ___ (comprar) un mapa en el mercado.", answer: ["compraron"] },
            { text: "Yo ___ (cenar) en el hotel cerca de la plaza.", answer: ["cene", "cené"] },
            { text: "¿Tú ___ (mirar) el equipaje en la cinta?", answer: ["miraste"] },
            { text: "La guía ___ (explicar) la historia del barrio. (él/ella)", answer: ["explico", "explicó"] }
          ]
        }
      ]
    },
    {
      id: "st2",
      title: "Station 2 — -CAR / -GAR / -ZAR (yo spelling)",
      shortTitle: "Station 2",
      subtitle: "Individual practice · ~8 min",
      icon: "2️⃣",
      accent: "blue",
      open: false,
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>3-STEP YO SPELLING (-CAR / -GAR / -ZAR)</strong><br><strong>Step 1:</strong> Identify the verb as -CAR, -GAR, or -ZAR.<br><strong>Step 2:</strong> Build the regular yo stem + <strong>-é</strong> sound in your head (…c<strong>é</strong>, …g<strong>é</strong>, …z<strong>é</strong>).<br><strong>Step 3:</strong> Fix spelling so pronunciation stays clear: <strong>c→qu</strong>, <strong>g→gu</strong>, <strong>z→c</strong> before <strong>-é</strong>.<br><br><em>Examples:</em> <strong>buscar</strong> → yo <strong>busqué</strong> · <strong>pagar</strong> → yo <strong>pagué</strong> · <strong>empezar</strong> → yo <strong>empecé</strong>"
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "Yo ___ (practicar) español antes del viaje.", answer: ["practique", "practiqué"] },
            { text: "Yo ___ (pagar) la cuenta del taxi.", answer: ["pague", "pagué"] },
            { text: "Yo ___ (empezar) el recorrido temprano.", answer: ["empece", "empecé"] },
            { text: "Yo ___ (sacar) fotos de la plaza.", answer: ["saque", "saqué"] }
          ]
        },
        {
          type: "questions",
          questions: [
            {
              type: "textarea",
              rows: 3,
              prompt: "5. Explain in English: Why is yo <em>tocar</em> spelled <strong>toqué</strong> and not *tocé*?",
              placeholder: "Because…",
              answerKeywords: ["c", "qu", "k", "sound", "pronunciation", "before", "spelling"],
              keywordMode: "any"
            }
          ]
        }
      ]
    },
    {
      id: "st3",
      title: "Station 3 — “Y” verbs: leer, creer, oír (él / ellos)",
      shortTitle: "Station 3",
      subtitle: "Individual practice · ~8 min",
      icon: "3️⃣",
      accent: "green",
      open: false,
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>3-STEP i → y (preterite, él / ellos)</strong><br><strong>Step 1:</strong> Check the subject — pattern appears for <strong>él/ella/Ud.</strong> and <strong>ellos/ellas/Uds.</strong><br><strong>Step 2:</strong> If two vowels would touch (<strong>…ió, …ieron</strong>), change the <strong>i</strong> to <strong>y</strong>.<br><strong>Step 3:</strong> Add the correct preterite ending for that subject.<br><br><em>Example:</em> <strong>leer</strong> → él <strong>leyó</strong> · ellos <strong>leyeron</strong>"
        },
        {
          type: "reading",
          text: "<strong>Mini lectura — Cartagena</strong> (read for context; then fill the blanks in the exercise below)<br>Ayer mis amigos y yo visitamos el centro histórico. Un guía _____ (leer) un cartel en la muralla y nosotros _____ (creer) cada palabra. Mi amigo _____ (oír) música lejos del café y corrió a buscar el grupo. Yo no _____ (oír) nada al principio, pero después _____ (leer) el programa del festival en mi teléfono.",
          instructions: "Palabras: la muralla (the wall), el cartel (sign), el programa (schedule)."
        },
        {
          type: "fill-blanks",
          sentences: [
            {
              text: "Ayer mis amigos y yo visitamos el centro histórico. Un guía ___ (leer) un cartel en la muralla y nosotros ___ (creer) cada palabra. Mi amigo ___ (oír) música lejos del café y corrió a buscar el grupo. Yo no ___ (oír) nada al principio, pero después ___ (leer) el programa del festival en mi teléfono.",
              answer: [
                ["leyo", "leyó"],
                ["creimos", "creímos"],
                ["oyo", "oyó"],
                ["oi", "oí"],
                ["lei", "leí"]
              ]
            }
          ]
        },
        {
          type: "questions",
          questions: [
            {
              prompt: "6. Write the él form: creer →",
              placeholder: "preterite",
              answer: ["creyo", "creyó"]
            },
            {
              prompt: "7. Write the ellos form: oír →",
              placeholder: "preterite",
              answer: ["oyeron"]
            }
          ]
        }
      ]
    },
    {
      id: "st4",
      title: "Station 4 — Stem-changing -IR (pedir, dormir, preferir)",
      shortTitle: "Station 4",
      subtitle: "Individual practice · ~8 min",
      icon: "4️⃣",
      accent: "orange",
      open: false,
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>3-STEP STEM (-IR) IN THE PRETERITE</strong><br><strong>Step 1:</strong> Name the verb and the subject.<br><strong>Step 2:</strong> Stem change appears only for <strong>él/ella/Ud.</strong> and <strong>ellos/ellas/Uds.</strong> (the “shoe” sides — here, the <strong>3rd person</strong> boxes).<br><strong>Step 3:</strong> Use the correct <strong>-IR</strong> preterite ending (-ió / -ieron, etc.).<br><br><em>Examples:</em> <strong>pedir</strong> → él <strong>pidió</strong> · <strong>dormir</strong> → ellos <strong>durmieron</strong> · <strong>preferir</strong> → ella <strong>prefirió</strong>"
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "El turista ___ (pedir) agua en el restaurante.", answer: ["pidio", "pidió"] },
            { text: "Las turistas ___ (dormir) poco porque el hotel estaba ruidoso.", answer: ["durmieron"] },
            { text: "Mi familia ___ (preferir) el vuelo directo a Medellín.", answer: ["prefirio", "prefirió"] },
            { text: "Nosotros ___ (preferir) caminar, no tomar taxi.", answer: ["preferimos"] },
            { text: "Ellos ___ (dormir) ocho horas después del tour.", answer: ["durmieron"] }
          ]
        },
        {
          type: "questions",
          questions: [
            {
              type: "textarea",
              rows: 2,
              prompt: "After #4: In one or two English sentences, why is there <strong>no</strong> stem change in <em>nosotros preferimos</em>?",
              placeholder: "Because…",
              answerKeywords: ["nosotros", "stem", "no", "not", "preferimos", "preterite", "third"],
              keywordMode: "any"
            }
          ]
        }
      ]
    },
    {
      id: "st5",
      title: "Station 5 — decir, traer, venir (high-frequency irregulars)",
      shortTitle: "Station 5",
      subtitle: "Individual practice · ~8 min",
      icon: "5️⃣",
      accent: "purple",
      open: false,
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>3-STEP dij- / traj- / vin-</strong><br><strong>Step 1:</strong> Identify the subject (who did it?).<br><strong>Step 2:</strong> Use the irregular stem: <strong>dij-</strong> (decir), <strong>traj-</strong> (traer), <strong>vin-</strong> (venir). No written accent on the stem.<br><strong>Step 3:</strong> Add the regular <strong>-ER / -IR</strong> preterite ending for that subject.<br><br><em>Examples:</em> decir → yo <strong>dije</strong>, ellos <strong>dijeron</strong> · traer → ella <strong>trajo</strong> · venir → Ud. <strong>vino</strong>"
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "Nosotros ___ (venir) a Colombia el mes pasado.", answer: ["vinimos"] },
            { text: "La profesora ___ (decir) que el proyecto fue excelente.", answer: ["dijo"] },
            { text: "¿Tú ___ (traer) tu pasaporte al aeropuerto?", answer: ["trajiste"] },
            { text: "Ellos ___ (decir) la verdad sobre el retraso del vuelo.", answer: ["dijeron"] },
            { text: "Yo ___ (venir) en tren desde otra ciudad.", answer: ["vine"] }
          ]
        }
      ]
    },
    {
      id: "st6",
      title: "Station 6 — Preterite in context (culture reading)",
      shortTitle: "Station 6",
      subtitle: "Individual practice · ~8 min",
      icon: "6️⃣",
      accent: "teal",
      open: false,
      components: [
        {
          type: "callout",
          style: "fire",
          text: "<strong>3-STEP “FIND THE PRETERITE”</strong><br><strong>Step 1:</strong> Look for actions that <strong>finished</strong> in the past (one time or completed chunk).<br><strong>Step 2:</strong> Find the verb; check subject + ending.<br><strong>Step 3:</strong> Ask: Does it match a pattern we studied (-AR/-ER/-IR, spelling change, Y verb, stem -IR, dij/traj/vin)?<br><br><em>Example:</em> <strong>celebró</strong> = completed action, él/ella form."
        },
        {
          type: "reading",
          text: "<strong>Música y comunidad</strong><br>El año pasado mi clase estudió la música colombiana. Primero nosotros <span class=\"verb-highlight\">miramos</span> un video corto sobre el vallenato. Luego la profesora <span class=\"verb-highlight\">explicó</span> que muchas familias <span class=\"verb-highlight\">escucharon</span> vallenato en casa por generaciones. Un compañero <span class=\"verb-highlight\">leyó</span> un artículo en español y <span class=\"verb-highlight\">creyó</span> que la UNESCO <span class=\"verb-highlight\">declaró</span> el vallenato patrimonio cultural del mundo. Después nosotros <span class=\"verb-highlight\">preferimos</span> investigar la cumbia. Yo <span class=\"verb-highlight\">empecé</span> mi parte del proyecto con entusiasmo.",
          instructions: "Glossary: patrimonio (heritage), entusiasmo (enthusiasm). Click highlighted verbs to hear them."
        },
        {
          type: "questions",
          questions: [
            {
              type: "textarea",
              rows: 2,
              prompt: "1. In English: What did the class study first, according to the passage?",
              placeholder: "They…",
              answerKeywords: ["music", "vallenato", "video", "colombian", "watched", "miramos", "first"],
              keywordMode: "any"
            },
            {
              prompt: "2. Which verb shows a Y spelling pattern? Copy the whole Spanish word.",
              placeholder: "Spanish verb",
              answer: ["leyo", "leyó", "creyo", "creyó"]
            },
            {
              prompt: "3. Find one verb that matches -CAR / -GAR / -ZAR yo spelling change. Write the <strong>form</strong> you see (not the infinitive).",
              placeholder: "preterite form",
              answer: ["empece", "empecé"]
            }
          ]
        }
      ]
    }
  ]
};
