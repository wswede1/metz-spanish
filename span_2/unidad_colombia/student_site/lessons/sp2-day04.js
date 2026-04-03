window.LESSON_DATA = {
  dayLabel: "Day 4",
  unit: "Unidad Colombia",
  title: "Verbos con Y — leer, creer, oír",
  subtitle: "Discover why some -ER/-IR verbs get a Y in the preterite and practice using them",
  objectives: [
    "I can identify the Y-verb pattern in preterite conjugations",
    "I can conjugate leer, creer, and oír in the preterite",
    "I can read a passage with Y-verbs and understand it"
  ],
  sections: [
    // ──────────────────────────────────────────────────
    // 1. Warm-Up — Preterite Recall
    // ──────────────────────────────────────────────────
    {
      id: "warmup",
      title: "Warm-Up — Repaso del Pretérito",
      shortTitle: "Warm-Up",
      subtitle: "Quick recall from Day 3 — -CAR/-GAR/-ZAR spelling changes",
      icon: "🧠",
      accent: "yellow",
      open: true,
      components: [
        {
          type: "callout",
          style: "info",
          text: "No notes! Write the correct preterite form. Remember the spelling changes from Day 3."
        },
        {
          type: "fill-blanks",
          sentences: [
            { text: "Yo ___ al aeropuerto a las diez. (llegar)", answer: "llegué" },
            { text: "Yo ___ la maleta en el hotel. (buscar)", answer: "busqué" },
            { text: "Ella ___ la maleta antes del viaje. (preparar)", answer: "preparó" },
            { text: "Yo ___ a estudiar a las ocho. (empezar)", answer: "empecé" },
            { text: "Nosotros ___ al restaurante a las siete. (llegar)", answer: "llegamos" }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 2. Grammar Discovery — Y-Verbs
    // ──────────────────────────────────────────────────
    {
      id: "discovery",
      title: "Descubrimiento — Verbos con Y",
      shortTitle: "Discovery",
      subtitle: "Why do some verbs get a Y? Find the pattern!",
      icon: "🔍",
      accent: "blue",
      components: [
        {
          type: "callout",
          style: "fire",
          text: "Some -ER and -IR verbs have a <strong>special change</strong> in the preterite: the <strong>i changes to y</strong> in the él/ella and ellos/ellas forms. Look at the examples below and figure out when it happens!"
        },
        {
          type: "discovery",
          title: "Find the Y-Verb Pattern",
          instructions: "Look at these preterite forms carefully. In which forms does the i change to y? In which forms does it stay as i?",
          sentences: [
            "Yo <span class=\"highlight\">leí</span> una novela. (leer — yo)",
            "Tú <span class=\"highlight\">leíste</span> el periódico. (leer — tú)",
            "Ella <span class=\"highlight\">leyó</span> un libro sobre Colombia. (leer — ella)",
            "Nosotros <span class=\"highlight\">leímos</span> la historia. (leer — nosotros)",
            "Ellos <span class=\"highlight\">leyeron</span> el artículo. (leer — ellos)",
            "Él <span class=\"highlight\">creyó</span> la leyenda. (creer — él)",
            "Ellas <span class=\"highlight\">creyeron</span> la historia. (creer — ellas)",
            "Yo <span class=\"highlight\">oí</span> un ruido. (oír — yo)",
            "Ella <span class=\"highlight\">oyó</span> la música. (oír — ella)",
            "Nosotros <span class=\"highlight\">oímos</span> las noticias. (oír — nosotros)",
            "Ellos <span class=\"highlight\">oyeron</span> el trueno. (oír — ellos)"
          ],
          question: "What happens to the i→y in the él/ella and ellos/ellas forms? Why do you think this change happens?",
          placeholder: "I notice that in the él/ella form the i changes to... and in the ellos form..."
        },
        {
          type: "callout",
          style: "info",
          text: "<strong>The Rule:</strong> When an <strong>unstressed i</strong> falls between two vowels, it changes to <strong>y</strong>.<br><br>This affects the <strong>él/ella/Ud.</strong> and <strong>ellos/ellas/Uds.</strong> forms:<br>le<strong>y</strong>ó (not leió) · le<strong>y</strong>eron (not leieron)<br>cre<strong>y</strong>ó (not creió) · cre<strong>y</strong>eron (not creieron)<br>o<strong>y</strong>ó (not oió) · o<strong>y</strong>eron (not oieron)<br><br>Also note: yo, tú, and nosotros forms have an <strong>accent on the í</strong>: leí, leíste, leímos."
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 3. Conjugation Tables — leer, oír
    // ──────────────────────────────────────────────────
    {
      id: "conj",
      title: "Conjugación — leer y oír",
      shortTitle: "Conjugation",
      subtitle: "Fill in the preterite forms for each verb",
      icon: "📊",
      accent: "green",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "Fill in the preterite forms. Remember: <strong>y</strong> in él/ella and ellos/ellas forms. <strong>Accent on í</strong> in yo, tú, and nosotros forms."
        },
        {
          type: "conj-table",
          verbs: [
            {
              infinitive: "leer (to read)",
              rows: [
                { pronoun: "yo", answer: "leí" },
                { pronoun: "tú", answer: "leíste" },
                { pronoun: "él/ella/Ud.", answer: "leyó" },
                { pronoun: "nosotros", answer: "leímos" },
                { pronoun: "ellos/ellas/Uds.", answer: "leyeron" }
              ]
            },
            {
              infinitive: "oír (to hear)",
              rows: [
                { pronoun: "yo", answer: "oí" },
                { pronoun: "tú", answer: "oíste" },
                { pronoun: "él/ella/Ud.", answer: "oyó" },
                { pronoun: "nosotros", answer: "oímos" },
                { pronoun: "ellos/ellas/Uds.", answer: "oyeron" }
              ]
            },
            {
              infinitive: "creer (to believe)",
              rows: [
                { pronoun: "yo", answer: "creí" },
                { pronoun: "tú", answer: "creíste" },
                { pronoun: "él/ella/Ud.", answer: "creyó" },
                { pronoun: "nosotros", answer: "creímos" },
                { pronoun: "ellos/ellas/Uds.", answer: "creyeron" }
              ]
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 4. Fill-Blanks Practice — Y-Verbs
    // ──────────────────────────────────────────────────
    {
      id: "practice",
      title: "Práctica — Verbos con Y en Contexto",
      shortTitle: "Practice",
      subtitle: "Fill in the correct preterite Y-verb form",
      icon: "✏️",
      accent: "purple",
      components: [
        {
          type: "fill-blanks",
          sentences: [
            { text: "Camila ___ un libro sobre la historia de Cartagena. (leer — ella)", answer: "leyó" },
            { text: "Yo ___ un artículo sobre el café colombiano. (leer — yo)", answer: "leí" },
            { text: "Los estudiantes ___ la leyenda del Dorado. (leer — ellos)", answer: "leyeron" },
            { text: "Mi abuela ___ un ruido en la cocina. (oír — ella)", answer: "oyó" },
            { text: "Nosotros ___ la música de cumbia desde la plaza. (oír — nosotros)", answer: "oímos" },
            { text: "Yo no ___ la historia del guía. (creer — yo)", answer: "creí" },
            { text: "Ellos ___ que el oro estaba en el lago. (creer — ellos)", answer: "creyeron" },
            { text: "¿Tú ___ las noticias esta mañana? (oír — tú)", answer: "oíste" }
          ]
        },
        {
          type: "mc-quiz",
          questions: [
            {
              prompt: "Ella _____ el periódico ayer. (leer)",
              options: [
                { value: "a", label: "leió" },
                { value: "b", label: "leyó" },
                { value: "c", label: "leí" },
                { value: "d", label: "leyeron" }
              ],
              answer: "b"
            },
            {
              prompt: "Ellos _____ la explosión. (oír)",
              options: [
                { value: "a", label: "oíron" },
                { value: "b", label: "oieron" },
                { value: "c", label: "oyeron" },
                { value: "d", label: "oyó" }
              ],
              answer: "c"
            },
            {
              prompt: "Yo _____ una historia increíble. (oír)",
              options: [
                { value: "a", label: "oyé" },
                { value: "b", label: "oí" },
                { value: "c", label: "oyó" },
                { value: "d", label: "oímos" }
              ],
              answer: "b"
            },
            {
              prompt: "Which form is CORRECT?",
              options: [
                { value: "a", label: "ella creió" },
                { value: "b", label: "ellos leieron" },
                { value: "c", label: "él leyó" },
                { value: "d", label: "nosotros leymos" }
              ],
              answer: "c"
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 5. Reading — La leyenda del Dorado
    // ──────────────────────────────────────────────────
    {
      id: "reading",
      title: "Lectura — La leyenda del Dorado",
      shortTitle: "Reading",
      subtitle: "Read the legend — watch for Y-verbs in the preterite!",
      icon: "📖",
      accent: "orange",
      components: [
        {
          type: "callout",
          style: "tip",
          text: "<strong>Glossary:</strong> los muiscas = the Muisca people · el lago = the lake · el oro = the gold · el polvo de oro = gold dust · una ceremonia = a ceremony · los conquistadores = the conquistadors · las riquezas = the riches"
        },
        {
          type: "reading",
          text: "Hace muchos años, los muiscas <span class=\"verb-highlight\">vivieron</span> cerca de un lago en los Andes de Colombia. Según la leyenda, el cacique <span class=\"verb-highlight\">cubrió</span> su cuerpo con polvo de oro y <span class=\"verb-highlight\">entró</span> al lago como parte de una ceremonia sagrada. La gente <span class=\"verb-highlight\">tiró</span> oro y esmeraldas al agua.<br><br>Los conquistadores españoles <span class=\"verb-highlight\">oyeron</span> esta historia y <span class=\"verb-highlight\">creyeron</span> que había una ciudad entera de oro. Ellos <span class=\"verb-highlight\">buscaron</span> \"El Dorado\" por muchos años, pero nunca la <span class=\"verb-highlight\">encontraron</span>. Muchos exploradores <span class=\"verb-highlight\">leyeron</span> mapas falsos y <span class=\"verb-highlight\">viajaron</span> por la selva sin éxito.<br><br>Un explorador llamado Gonzalo Jiménez de Quesada <span class=\"verb-highlight\">llegó</span> a la región en 1537. Él <span class=\"verb-highlight\">oyó</span> las historias de los indígenas y <span class=\"verb-highlight\">creyó</span> que el oro estaba cerca. <span class=\"verb-highlight\">Buscó</span> por meses, pero no <span class=\"verb-highlight\">encontró</span> la ciudad de oro. Hoy, los colombianos <span class=\"verb-highlight\">leyeron</span> esta leyenda en sus libros de historia. El Museo del Oro en Bogotá <span class=\"verb-highlight\">preservó</span> muchos artefactos de los muiscas.",
          instructions: "Click highlighted verbs to hear them. Find the Y-verbs (leyeron, creyeron, oyeron, oyó, creyó) and the -CAR/-GAR/-ZAR verbs (buscaron, llegó, buscó). Then answer the questions below."
        },
        {
          type: "questions",
          questions: [
            { prompt: "¿Qué hizo el cacique muisca en la ceremonia?", type: "textarea", placeholder: "El cacique cubrió su cuerpo con...", rows: 2 },
            { prompt: "¿Qué creyeron los conquistadores?", placeholder: "Los conquistadores creyeron que...", answer: "había una ciudad de oro" },
            { prompt: "¿Qué leyeron los exploradores? ¿Los ayudó?", type: "textarea", placeholder: "Los exploradores leyeron... pero no...", rows: 2 },
            { prompt: "Find and write ALL the Y-verbs (i→y) from the reading:", type: "textarea", placeholder: "1) oyeron 2) creyeron 3) ...", rows: 2 },
            { prompt: "¿Encontraron los españoles El Dorado? ¿Qué existe hoy en Bogotá?", type: "textarea", placeholder: "No, los españoles no... Hoy en Bogotá existe...", rows: 2 }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // 6. Partner Talk + Exit Ticket
    // ──────────────────────────────────────────────────
    {
      id: "exit",
      title: "Conversación y Boleto de Salida",
      shortTitle: "Exit",
      subtitle: "Practice Y-verbs with a partner, then show what you know",
      icon: "🎫",
      accent: "red",
      components: [
        {
          type: "partner-talk",
          title: "Conversación — ¿Qué leíste? ¿Qué oíste?",
          prompt: "Take turns asking and answering these questions:<br><strong>1.</strong> ¿Qué leíste ayer? (What did you read yesterday?)<br><strong>2.</strong> ¿Oíste algo interesante hoy? (Did you hear something interesting today?)<br><strong>3.</strong> ¿Creíste la leyenda del Dorado? ¿Por qué sí o no?<br>Write your partner's answers below!",
          duration: "4 minutes"
        },
        {
          type: "questions",
          questions: [
            { prompt: "Partner's name:", placeholder: "Mi compañero/a se llama..." },
            { prompt: "What did your partner read? (Use preterite)", placeholder: "Mi compañero/a leyó..." },
            { prompt: "Did your partner believe the legend?", placeholder: "Sí/No, él/ella creyó/no creyó porque..." }
          ]
        },
        {
          type: "exit-ticket",
          title: "Boleto de Salida — Day 4",
          prompt: "Show the Y-verb pattern:",
          fields: [
            { label: "Write the él/ella preterite of LEER:", placeholder: "él/ella..." },
            { label: "Write the ellos preterite of OÍR:", placeholder: "ellos..." },
            { label: "Why does the i change to y in these forms? (Explain in English)", placeholder: "The i changes to y because...", type: "textarea", rows: 2 },
            { label: "Write one original sentence using a Y-verb in the preterite:", placeholder: "Ella leyó... / Ellos oyeron...", type: "textarea", rows: 2 }
          ]
        }
      ]
    }
  ]
};
