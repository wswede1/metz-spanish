/**
 * Spanish 2 — Colombia unit core vocabulary (~24 terms + "All unit" deck).
 * Loaded by Colombia_Vocab_Review_Spanish2.html and vocab-worksheet-sp2.html
 */
(function (w) {
  var themes = [
    {
      name: 'Colombia & Travel',
      color: 'cat-0',
      words: [
        { es: 'el aeropuerto', en: 'airport' },
        { es: 'el hotel', en: 'hotel' },
        { es: 'la maleta', en: 'suitcase' },
        { es: 'el vuelo', en: 'flight' },
        { es: 'el viaje', en: 'trip / travel' }
      ]
    },
    {
      name: 'Preterite (-AR)',
      color: 'cat-1',
      words: [
        { es: 'hablé', en: 'I spoke' },
        { es: 'compraste', en: 'you bought' },
        { es: 'llegó', en: 'he/she arrived' },
        { es: 'visitamos', en: 'we visited' },
        { es: 'viajaron', en: 'they traveled' }
      ]
    },
    {
      name: '-CAR / -GAR / -ZAR',
      color: 'cat-2',
      words: [
        { es: 'busqué', en: 'I looked for' },
        { es: 'llegué', en: 'I arrived' },
        { es: 'pagué', en: 'I paid' },
        { es: 'empecé', en: 'I began' },
        { es: 'saqué', en: 'I took out' }
      ]
    },
    {
      name: 'Y-Verbs (preterite)',
      color: 'cat-3',
      words: [
        { es: 'leyó', en: 'he/she read' },
        { es: 'leyeron', en: 'they read' },
        { es: 'oyó', en: 'he/she heard' },
        { es: 'oyeron', en: 'they heard' },
        { es: 'creyeron', en: 'they believed' }
      ]
    },
    {
      name: 'Stem -IR & irregulars',
      color: 'cat-4',
      words: [
        { es: 'pidió', en: 'he/she asked for' },
        { es: 'durmió', en: 'he/she slept' },
        { es: 'prefirió', en: 'he/she preferred' },
        { es: 'dijeron', en: 'they said' },
        { es: 'vinieron', en: 'they came' }
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

  w.__METZ_COLOMBIA_VOCAB_DATA_SP2 = {
    courseKey: 'sp2',
    themes: themes,
    categories: [{ name: 'All unit', color: 'cat-all', words: allWords }].concat(themes)
  };
})(window);
