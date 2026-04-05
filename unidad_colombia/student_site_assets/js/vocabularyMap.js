/**
 * Colombia Spanish 1 unit vocabulary → skill clusters + stable item IDs.
 * Slugs match Colombia_Vocab_Review_Spanish1.html `vocabSlug()` for audio paths.
 */

const PREFIX = 'sp1-co';

function runtimeItemPrefix() {
  if (typeof globalThis !== 'undefined' && globalThis.__METZ_VOCAB_ITEM_PREFIX) {
    const p = String(globalThis.__METZ_VOCAB_ITEM_PREFIX).replace(/[^a-zA-Z0-9-]/g, '');
    return p || PREFIX;
  }
  return PREFIX;
}

export function vocabSlug(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?!¡…/]/g, '')
    .replace(/\s*\+\s*/g, '-')
    .replace(/\s*\(([^)]+)\)/g, '-$1')
    .replace(/\/[a-z]/g, '')
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Stable Sp1 pack ids (IndexedDB / maps); do not use runtime prefix. */
function sp1PackItemId(es) {
  return `${PREFIX}-${vocabSlug(es)}`;
}

/** Current page prefix (sp1-co default; Sp2 vocab page sets sp2-co on window). */
export function itemIdForSpanish(es) {
  return `${runtimeItemPrefix()}-${vocabSlug(es)}`;
}

/** @type {{ es: string, en: string, cluster: string }[]} */
const ENTRIES = [
  // Colombia & Culture
  { es: 'Colombia', en: 'Colombia (South American country)', cluster: 'colombia_geography' },
  { es: 'Bogotá', en: 'Bogotá (capital city)', cluster: 'colombia_geography' },
  { es: 'el café', en: 'coffee', cluster: 'colombia_food' },
  { es: 'la cumbia', en: 'cumbia (Colombian music/dance)', cluster: 'colombia_culture' },
  { es: 'la arepa', en: 'arepa (corn flatbread)', cluster: 'colombia_food' },
  { es: 'el vallenato', en: 'vallenato (Colombian folk music)', cluster: 'colombia_culture' },
  { es: 'la selva', en: 'jungle / rainforest', cluster: 'colombia_geography' },
  { es: 'la costa', en: 'coast', cluster: 'colombia_geography' },
  { es: 'la montaña', en: 'mountain', cluster: 'colombia_geography' },
  { es: 'la ciudad', en: 'city', cluster: 'colombia_geography' },
  { es: 'el pueblo', en: 'town / village', cluster: 'colombia_geography' },
  { es: 'la bandera', en: 'flag', cluster: 'colombia_culture' },
  { es: 'el país', en: 'country', cluster: 'colombia_geography' },
  { es: 'bonito/a', en: 'beautiful / pretty', cluster: 'colombia_culture' },
  { es: 'famoso/a', en: 'famous', cluster: 'colombia_culture' },
  { es: 'colombiano/a', en: 'Colombian', cluster: 'colombia_culture' },
  // -ER / -IR Verbs
  { es: 'comer', en: 'to eat', cluster: 'verb_conjugation' },
  { es: 'beber', en: 'to drink', cluster: 'verb_conjugation' },
  { es: 'leer', en: 'to read', cluster: 'verb_conjugation' },
  { es: 'correr', en: 'to run', cluster: 'verb_conjugation' },
  { es: 'aprender', en: 'to learn', cluster: 'verb_conjugation' },
  { es: 'comprender', en: 'to understand', cluster: 'verb_conjugation' },
  { es: 'creer', en: 'to believe', cluster: 'verb_conjugation' },
  { es: 'vender', en: 'to sell', cluster: 'verb_conjugation' },
  { es: 'escribir', en: 'to write', cluster: 'verb_conjugation' },
  { es: 'vivir', en: 'to live', cluster: 'verb_conjugation' },
  { es: 'abrir', en: 'to open', cluster: 'verb_conjugation' },
  { es: 'recibir', en: 'to receive', cluster: 'verb_conjugation' },
  { es: 'compartir', en: 'to share', cluster: 'verb_conjugation' },
  { es: 'decidir', en: 'to decide', cluster: 'verb_conjugation' },
  { es: 'describir', en: 'to describe', cluster: 'verb_conjugation' },
  { es: 'asistir a', en: 'to attend', cluster: 'verb_conjugation' },
  // Gustar & Opinions
  { es: 'me gusta', en: 'I like (singular)', cluster: 'grammar_ser_estar' },
  { es: 'me gustan', en: 'I like (plural)', cluster: 'grammar_ser_estar' },
  { es: 'te gusta', en: 'you like (singular)', cluster: 'grammar_ser_estar' },
  { es: 'le gusta', en: 'he/she likes (singular)', cluster: 'grammar_ser_estar' },
  { es: 'nos gusta', en: 'we like (singular)', cluster: 'grammar_ser_estar' },
  { es: 'me encanta', en: 'I love (singular)', cluster: 'emotions' },
  { es: 'no me gusta', en: "I don't like", cluster: 'grammar_ser_estar' },
  { es: 'me gusta mucho', en: 'I like a lot', cluster: 'grammar_ser_estar' },
  { es: '¿Te gusta…?', en: 'Do you like…?', cluster: 'greetings_and_phrases' },
  { es: 'también', en: 'also / too', cluster: 'greetings_and_phrases' },
  { es: 'tampoco', en: 'neither / either', cluster: 'greetings_and_phrases' },
  { es: 'más', en: 'more', cluster: 'greetings_and_phrases' },
  { es: 'menos', en: 'less', cluster: 'greetings_and_phrases' },
  { es: 'mejor', en: 'better / best', cluster: 'greetings_and_phrases' },
  { es: 'peor', en: 'worse / worst', cluster: 'greetings_and_phrases' },
  { es: 'favorito/a', en: 'favorite', cluster: 'emotions' },
  // Estar & Location
  { es: 'estar', en: 'to be (location/feeling)', cluster: 'grammar_ser_estar' },
  { es: 'estoy', en: 'I am (location/feeling)', cluster: 'grammar_ser_estar' },
  { es: 'estás', en: 'you are (location/feeling)', cluster: 'grammar_ser_estar' },
  { es: 'está', en: 'he/she/it is (location/feeling)', cluster: 'grammar_ser_estar' },
  { es: 'estamos', en: 'we are (location/feeling)', cluster: 'grammar_ser_estar' },
  { es: 'están', en: 'they are (location/feeling)', cluster: 'grammar_ser_estar' },
  { es: 'aquí', en: 'here', cluster: 'house_and_home' },
  { es: 'allí / allá', en: 'there / over there', cluster: 'house_and_home' },
  { es: 'cerca (de)', en: 'near / close (to)', cluster: 'house_and_home' },
  { es: 'lejos (de)', en: 'far (from)', cluster: 'house_and_home' },
  { es: 'delante (de)', en: 'in front (of)', cluster: 'house_and_home' },
  { es: 'detrás (de)', en: 'behind', cluster: 'house_and_home' },
  { es: 'al lado (de)', en: 'next to / beside', cluster: 'house_and_home' },
  { es: 'encima (de)', en: 'on top (of)', cluster: 'house_and_home' },
  { es: 'debajo (de)', en: 'under / below', cluster: 'house_and_home' },
  { es: 'entre', en: 'between', cluster: 'house_and_home' },
  // Ir, Emotions & Places
  { es: 'ir', en: 'to go', cluster: 'verb_conjugation' },
  { es: 'voy', en: 'I go', cluster: 'verb_conjugation' },
  { es: 'vas', en: 'you go', cluster: 'verb_conjugation' },
  { es: 'va', en: 'he/she goes', cluster: 'verb_conjugation' },
  { es: 'vamos', en: 'we go', cluster: 'verb_conjugation' },
  { es: 'van', en: 'they go', cluster: 'verb_conjugation' },
  { es: 'ir a + infinitivo', en: 'going to (do something)', cluster: 'verb_conjugation' },
  { es: 'contento/a', en: 'happy / content', cluster: 'emotions' },
  { es: 'triste', en: 'sad', cluster: 'emotions' },
  { es: 'enojado/a', en: 'angry', cluster: 'emotions' },
  { es: 'cansado/a', en: 'tired', cluster: 'emotions' },
  { es: 'nervioso/a', en: 'nervous', cluster: 'emotions' },
  { es: 'enfermo/a', en: 'sick', cluster: 'emotions' },
  { es: 'ocupado/a', en: 'busy', cluster: 'emotions' },
  { es: 'el parque', en: 'the park', cluster: 'school_vocabulary' },
  { es: 'el centro comercial', en: 'the mall / shopping center', cluster: 'school_vocabulary' },
];

/** @type {Record<string, string>} */
export const VOCABULARY_MAP = {};
/** @type {Record<string, { es: string, en: string, skillCluster: string }>} */
export const ITEM_META = {};

for (const e of ENTRIES) {
  const id = sp1PackItemId(e.es);
  VOCABULARY_MAP[id] = e.cluster;
  ITEM_META[id] = { es: e.es, en: e.en, skillCluster: e.cluster };
}

export const SKILL_CLUSTERS = [...new Set([...Object.values(VOCABULARY_MAP), 'colombia_sp2_vocab'])].sort();

export function getCluster(itemId) {
  if (!itemId || typeof itemId !== 'string') return 'general';
  if (itemId.startsWith('sp2-co-')) return 'colombia_sp2_vocab';
  return VOCABULARY_MAP[itemId] || 'general';
}

export function getItemMeta(itemId) {
  if (!itemId) return null;
  if (ITEM_META[itemId]) return ITEM_META[itemId];
  if (itemId.startsWith('sp2-co-')) {
    const slug = itemId.slice('sp2-co-'.length);
    return { es: slug.replace(/-/g, ' '), en: '', skillCluster: 'colombia_sp2_vocab' };
  }
  return null;
}

/** All item ids for Colombia Sp1 pack */
export function getAllItemIds() {
  return Object.keys(VOCABULARY_MAP);
}

/** Item ids for a skill cluster */
export function getItemIdsForCluster(cluster) {
  return getAllItemIds().filter((id) => VOCABULARY_MAP[id] === cluster);
}
