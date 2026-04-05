/**
 * Shared browser TTS for Spanish — Latin American voice preference.
 * Used by lesson-engine and can be loaded by other static pages.
 */
(function (w) {
  'use strict';

  var _spanishVoice = null;
  var _voicesReady = false;

  function pickSpanishVoice(voices) {
    var priority = ['es-MX', 'es-US', 'es-419', 'es-CO', 'es-AR', 'es-ES'];
    var i;
    var j;
    for (i = 0; i < priority.length; i++) {
      for (j = 0; j < voices.length; j++) {
        if (voices[j].lang === priority[i]) {
          return voices[j];
        }
      }
    }
    for (j = 0; j < voices.length; j++) {
      if (voices[j].lang.slice(0, 2) === 'es') {
        return voices[j];
      }
    }
    return null;
  }

  function getSpanishVoice(callback) {
    if (_voicesReady) {
      callback(_spanishVoice);
      return;
    }
    var voices = w.speechSynthesis.getVoices();
    if (voices.length) {
      _spanishVoice = pickSpanishVoice(voices);
      _voicesReady = true;
      callback(_spanishVoice);
    } else {
      w.speechSynthesis.onvoiceschanged = function () {
        voices = w.speechSynthesis.getVoices();
        _spanishVoice = pickSpanishVoice(voices);
        _voicesReady = true;
        callback(_spanishVoice);
      };
    }
  }

  function speak(text, onEnd) {
    if (!w.speechSynthesis || text == null || String(text).trim() === '') {
      return;
    }
    w.speechSynthesis.cancel();
    getSpanishVoice(function (voice) {
      var utt = new SpeechSynthesisUtterance(String(text));
      utt.lang = voice ? voice.lang : 'es-MX';
      if (voice) {
        utt.voice = voice;
      }
      utt.rate = 0.88;
      utt.pitch = 1.0;
      if (onEnd) {
        utt.onend = onEnd;
        utt.onerror = onEnd;
      }
      w.speechSynthesis.speak(utt);
    });
  }

  w.MetzSpanishTTS = {
    speak: speak,
    pickSpanishVoice: pickSpanishVoice
  };
})(window);
