/**
 * Spanish 1 — Colombia unit vocabulary + Unidad 2 Lección 2 workbook deck (Vocabulario).
 * Loaded by Colombia_Vocab_Review_Spanish1.html and vocab-worksheet-sp1.html
 */
(function (w) {
  var themes = [
    {
      name: 'Colombia & Culture',
      color: 'cat-0',
      words: [
        { es: 'Colombia', en: 'Colombia (country)' },
        { es: 'Bogotá', en: 'capital city' },
        { es: 'el café', en: 'coffee' },
        { es: 'la cumbia', en: 'cumbia (music/dance)' },
        { es: 'la arepa', en: 'arepa (corn flatbread)' }
      ]
    },
    {
      name: '-ER / -IR Verbs',
      color: 'cat-1',
      words: [
        { es: 'comer', en: 'to eat' },
        { es: 'leer', en: 'to read' },
        { es: 'vivir', en: 'to live' },
        { es: 'escribir', en: 'to write' },
        { es: 'aprender', en: 'to learn' }
      ]
    },
    {
      name: 'Gustar & Opinions',
      color: 'cat-2',
      words: [
        { es: 'me gusta', en: 'I like (singular)' },
        { es: 'me gustan', en: 'I like (plural)' },
        { es: 'te gusta', en: 'you like (singular)' },
        { es: '¿Te gusta…?', en: 'Do you like…?' },
        { es: 'favorito/a', en: 'favorite' }
      ]
    },
    {
      name: 'Estar & Location',
      color: 'cat-3',
      words: [
        { es: 'estar', en: 'to be (location/feeling)' },
        { es: 'estoy', en: 'I am' },
        { es: 'estás', en: 'you are (tú)' },
        { es: 'está', en: 'he/she is; you are (usted)' },
        { es: 'estamos', en: 'we are' },
        { es: 'están', en: 'they / you all are' },
        { es: 'aquí', en: 'here' },
        { es: 'en', en: 'in / on / at' },
        { es: 'al lado (de)', en: 'next to' },
        { es: 'encima (de)', en: 'on top (of)' },
        { es: 'debajo (de)', en: 'under / below' },
        { es: 'detrás (de)', en: 'behind' },
        { es: 'delante (de)', en: 'in front of' },
        { es: 'entre', en: 'between' },
        { es: 'cerca (de)', en: 'near' },
        { es: 'lejos (de)', en: 'far from' },
        { es: 'dentro (de)', en: 'inside' }
      ]
    },
    {
      name: 'Ir, Emotions & Places',
      color: 'cat-4',
      words: [
        { es: 'ir', en: 'to go' },
        { es: 'voy', en: 'I go' },
        { es: 'contento/a', en: 'happy' },
        { es: 'triste', en: 'sad' },
        { es: 'el parque', en: 'the park' },
        { es: 'la biblioteca', en: 'the library' },
        { es: 'la cafetería', en: 'the cafeteria' },
        { es: 'el pasillo', en: 'the hall(way)' },
        { es: 'el gimnasio', en: 'the gym' },
        { es: 'la clase', en: 'the class' },
        { es: 'el salón', en: 'the classroom' }
      ]
    },
    {
      name: 'Vocabulario',
      color: 'cat-5',
      words: [
        { es: 'el escritorio', en: 'the desk' },
        { es: 'la mochila', en: 'the backpack' },
        { es: 'el cuaderno', en: 'the notebook' },
        { es: 'el lápiz', en: 'the pencil' },
        { es: 'la pluma', en: 'the pen' },
        { es: 'el papel', en: 'the paper' },
        { es: 'la silla', en: 'the chair' },
        { es: 'el pizarrón', en: 'the (chalk)board' },
        { es: 'la puerta', en: 'the door' },
        { es: 'la ventana', en: 'the window' },
        { es: 'la calculadora', en: 'the calculator' },
        { es: 'el mapa', en: 'the map' },
        { es: 'la mesa', en: 'the table' },
        { es: 'el libro', en: 'the book' },
        { es: 'la tiza', en: 'the chalk' },
        { es: 'el borrador', en: 'the eraser' },
        { es: 'la biblioteca', en: 'the library' },
        { es: 'la cafetería', en: 'the cafeteria' },
        { es: 'el pasillo', en: 'the hall(way)' },
        { es: 'el gimnasio', en: 'the gym' },
        { es: 'los baños', en: 'the restrooms' },
        { es: 'la oficina del director', en: "the principal's office" },
        { es: 'el salón de clases', en: 'the classroom' },
        { es: 'el examen', en: 'the test / exam' },
        { es: 'la tarea', en: 'homework' },
        { es: 'el maestro', en: 'the (male) teacher' },
        { es: 'la maestra', en: 'the (female) teacher' },
        { es: 'el director', en: 'the principal' },
        { es: 'los estudiantes', en: 'the students' },
        { es: 'cansado/a', en: 'tired' },
        { es: 'nervioso/a', en: 'nervous' },
        { es: 'divertido/a', en: 'fun' },
        { es: 'aburrido/a', en: 'bored / boring' },
        { es: 'interesante', en: 'interesting' },
        { es: 'difícil', en: 'difficult' },
        { es: 'ocupado/a', en: 'busy' },
        { es: 'tranquilo/a', en: 'calm' }
      ]
    }
  ];

  function uniqueByEs(list) {
    var seen = {};
    var out = [];
    list.forEach(function (wrd) {
      var k = String(wrd.es)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (!seen[k]) {
        seen[k] = true;
        out.push(wrd);
      }
    });
    return out;
  }

  var flat = [];
  themes.forEach(function (t) {
    flat = flat.concat(t.words);
  });
  var allWords = uniqueByEs(flat);

  w.__METZ_COLOMBIA_VOCAB_DATA_SP1 = {
    courseKey: 'sp1',
    themes: themes,
    categories: [{ name: 'All unit', color: 'cat-all', words: allWords }].concat(themes)
  };
})(window);
