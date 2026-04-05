/**
 * Spanish 1 — Colombia unit core vocabulary (~24 terms + "All unit" deck).
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
        { es: 'está', en: 'he/she is (location)' },
        { es: 'aquí', en: 'here' },
        { es: 'al lado (de)', en: 'next to' },
        { es: 'encima (de)', en: 'on top (of)' }
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
        { es: 'el parque', en: 'the park' }
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
