(function () {
  function byId(id) {
    return document.getElementById(id);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text !== undefined && text !== null) {
      node.textContent = text;
    }
    return node;
  }

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function first(value, fallback) {
    return value === undefined || value === null || value === '' ? fallback : value;
  }

  // ── Glossary helpers ────────────────────────────────────────────────────────

  function buildGlossMap(glossary) {
    var map = {};
    (glossary || []).forEach(function (entry) {
      var eq = entry.indexOf('=');
      if (eq < 0) return;
      var raw = entry.slice(0, eq).trim().toLowerCase();
      var val = entry.slice(eq + 1).trim();
      map[normalize(raw)] = val;
      var stripped = raw.replace(/^(el|la|los|las|un|una|lo)\s+/, '');
      if (stripped !== raw) { map[normalize(stripped)] = val; }
    });
    return map;
  }

  var _spanishVoice = null;
  var _voicesReady = false;

  function pickSpanishVoice(voices) {
    // Prefer Latin American Spanish; fall back to any Spanish voice
    var priority = ['es-MX', 'es-US', 'es-419', 'es-CO', 'es-AR', 'es-ES'];
    for (var i = 0; i < priority.length; i++) {
      for (var j = 0; j < voices.length; j++) {
        if (voices[j].lang === priority[i]) { return voices[j]; }
      }
    }
    for (var k = 0; k < voices.length; k++) {
      if (voices[k].lang.slice(0, 2) === 'es') { return voices[k]; }
    }
    return null;
  }

  function getSpanishVoice(callback) {
    if (_voicesReady) { callback(_spanishVoice); return; }
    var voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      _spanishVoice = pickSpanishVoice(voices);
      _voicesReady = true;
      callback(_spanishVoice);
    } else {
      window.speechSynthesis.onvoiceschanged = function () {
        voices = window.speechSynthesis.getVoices();
        _spanishVoice = pickSpanishVoice(voices);
        _voicesReady = true;
        callback(_spanishVoice);
      };
    }
  }

  function speakSpanish(text, onEnd) {
    if (!window.speechSynthesis) { return; }
    window.speechSynthesis.cancel();
    getSpanishVoice(function (voice) {
      var utt = new SpeechSynthesisUtterance(text);
      utt.lang = voice ? voice.lang : 'es-MX';
      if (voice) { utt.voice = voice; }
      utt.rate = 0.88;
      utt.pitch = 1.0;
      if (onEnd) { utt.onend = onEnd; utt.onerror = onEnd; }
      window.speechSynthesis.speak(utt);
    });
  }

  function tokenizeParagraph(text, glossMap) {
    var p = document.createElement('p');
    var tokens = text.split(/(\s+)/);
    tokens.forEach(function (token) {
      if (/^\s+$/.test(token)) {
        p.appendChild(document.createTextNode(token));
        return;
      }
      var m = token.match(/^([^A-Za-z\u00C0-\u024F'-]*)([A-Za-z\u00C0-\u024F'-]+)([^A-Za-z\u00C0-\u024F'-]*)$/);
      if (!m) {
        p.appendChild(document.createTextNode(token));
        return;
      }
      if (m[1]) { p.appendChild(document.createTextNode(m[1])); }
      var word = m[2];
      var span = document.createElement('span');
      span.className = 'word-token';
      span.textContent = word;
      var gloss = glossMap[normalize(word)];
      if (gloss) {
        span.className = 'word-token word-gloss';
        span.setAttribute('data-gloss', gloss);
        span.setAttribute('tabindex', '0');
      }
      span.addEventListener('click', function () { speakSpanish(word); });
      p.appendChild(span);
      if (m[3]) { p.appendChild(document.createTextNode(m[3])); }
    });
    return p;
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function isLocked(card) {
    return card.releaseDate && card.releaseDate > todayISO();
  }

  function formatReleaseDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[parseInt(parts[1], 10) - 1] + ' ' + parseInt(parts[2], 10);
  }

  function setHero(site, activity) {
    if (byId('eyebrow')) {
      byId('eyebrow').textContent = activity ? first(activity.kindLabel, 'Student Activity') : first(site.eyebrow, 'Student Site');
    }
    if (byId('heroTitle')) {
      byId('heroTitle').textContent = activity ? activity.title : site.title;
    }
    if (byId('heroSubtitle')) {
      byId('heroSubtitle').textContent = activity ? first(activity.description, site.subtitle) : site.subtitle;
    }
  }

  function renderMiniMeta(target, items) {
    target.innerHTML = '';
    items.forEach(function (item) {
      if (!item) {
        return;
      }
      target.appendChild(el('span', 'meta-pill', item));
    });
  }

  function renderHub(site) {
    setHero(site, null);
    if (byId('overviewHeading')) {
      byId('overviewHeading').textContent = site.overviewTitle;
    }
    if (byId('overviewText')) {
      byId('overviewText').textContent = site.overviewText;
    }
    if (byId('overviewMeta')) {
      renderMiniMeta(byId('overviewMeta'), site.overviewMeta || []);
    }

    var mount = byId('hubSections');
    if (!mount) {
      return;
    }
    mount.innerHTML = '';

    site.sections.forEach(function (section) {
      var wrap = el('section', 'section-wrap');
      var header = el('div', 'section-title');
      var icon = el('div', null, section.icon || '📘');
      icon.setAttribute('aria-hidden', 'true');
      var textWrap = el('div');
      var h3 = el('h3', null, section.title);
      var desc = el('p', null, section.description);
      textWrap.appendChild(h3);
      textWrap.appendChild(desc);
      header.appendChild(icon);
      header.appendChild(textWrap);
      wrap.appendChild(header);

      var grid = el('div', 'section-grid');
      section.cards.forEach(function (card) {
        var locked = isLocked(card);

        if (locked) {
          // Render as a non-clickable locked card
          var div = el('div', 'activity-card locked-card');
          var lockIcon = el('div', 'lock-icon', '🔒');
          var iconNode = el('div', 'card-icon', card.icon || '📘');
          var title = el('h4', 'card-title', card.title);
          var lockDateEl = el('span', 'lock-date', 'Available ' + formatReleaseDate(card.releaseDate));
          var meta = el('div', 'card-meta');
          [card.kindLabel, card.dayLabel].forEach(function (value) {
            if (value) {
              meta.appendChild(el('span', 'meta-pill', value));
            }
          });
          div.appendChild(lockIcon);
          div.appendChild(iconNode);
          div.appendChild(title);
          div.appendChild(lockDateEl);
          div.appendChild(meta);
          grid.appendChild(div);
        } else {
          var link = el('a', 'activity-card');
          link.href = card.route;
          var badgeClass = card.status === 'New' ? 'badge-new' : card.status === 'Study' ? 'badge-study' : 'badge-ready';
          var badge = el('span', 'card-badge ' + badgeClass, card.status || 'Ready');
          var cardIcon = el('div', 'card-icon', card.icon || '📘');
          var cardTitle = el('h4', 'card-title', card.title);
          var cardDesc = el('p', 'card-desc', card.description);
          var cardMeta = el('div', 'card-meta');
          [card.kindLabel, card.minutes ? card.minutes + ' min' : null, card.dayLabel].forEach(function (value) {
            if (value) {
              cardMeta.appendChild(el('span', 'meta-pill', value));
            }
          });
          link.appendChild(badge);
          link.appendChild(cardIcon);
          link.appendChild(cardTitle);
          link.appendChild(cardDesc);
          link.appendChild(cardMeta);
          grid.appendChild(link);
        }
      });

      wrap.appendChild(grid);
      mount.appendChild(wrap);
    });
  }

  function renderSections(target, sections) {
    sections.forEach(function (section) {
      var card = el('section', 'content-card');
      if (section.title) {
        card.appendChild(el('h3', null, section.title));
      }
      if (section.callout) {
        card.appendChild(el('div', 'callout', section.callout));
      }
      if (section.paragraphs) {
        section.paragraphs.forEach(function (paragraph) {
          card.appendChild(el('p', null, paragraph));
        });
      }
      if (section.bullets) {
        var ul = el('ul');
        section.bullets.forEach(function (bullet) {
          ul.appendChild(el('li', null, bullet));
        });
        card.appendChild(ul);
      }
      target.appendChild(card);
    });
  }

  function answerMatches(value, answer) {
    var normalizedValue = normalize(value);
    if (Array.isArray(answer)) {
      return answer.some(function (item) {
        return normalizedValue === normalize(item);
      });
    }
    return normalizedValue === normalize(answer);
  }

  function evaluateQuestions(questions, form) {
    var results = [];
    questions.forEach(function (question, index) {
      var correct = false;
      var userValue = '';
      if (question.type === 'mc') {
        var checked = form.querySelector('input[name="q' + index + '"]:checked');
        userValue = checked ? checked.value : '';
        correct = userValue === question.answer;
      } else {
        var input = form.querySelector('[name="q' + index + '"]');
        userValue = input ? input.value : '';
        correct = answerMatches(userValue, question.answer);
      }
      results.push({
        prompt: question.prompt,
        correct: correct,
        expected: Array.isArray(question.answer) ? question.answer[0] : question.answer,
        explanation: question.explanation || '',
        userValue: userValue
      });
    });
    return results;
  }

  function renderPractice(target, activity, options) {
    options = options || {};
    var layout = el('div', 'activity-layout');
    var left = el('div');
    var right = el('aside', 'result-card');
    right.appendChild(el('h3', null, activity.resultTitle || 'Check Your Work'));
    var scoreNode = el('div', 'score', '--');
    scoreNode.id = 'scoreValue';
    right.appendChild(scoreNode);
    var resultText = el('p', null, activity.resultIntro || 'Submit your answers to see what you already know and what to review.');
    right.appendChild(resultText);
    var feedbackList = el('div', 'feedback-list');
    feedbackList.id = 'feedbackList';
    right.appendChild(feedbackList);

    var card = el('section', 'content-card');
    if (!options.embeddedHeader) {
      var header = el('div', 'activity-header');
      var headerText = el('div');
      headerText.appendChild(el('h2', null, activity.title));
      headerText.appendChild(el('p', null, first(activity.instructions, activity.description)));
      header.appendChild(headerText);
      var meta = el('div', 'mini-meta');
      [activity.dayLabel, activity.kindLabel, activity.minutes ? activity.minutes + ' min' : null].forEach(function (item) {
        if (item) {
          meta.appendChild(el('span', 'meta-pill', item));
        }
      });
      header.appendChild(meta);
      card.appendChild(header);

      if (activity.objectives && activity.objectives.length) {
        var objectivesWrap = el('div', 'objectives-list');
        activity.objectives.forEach(function (item) {
          objectivesWrap.appendChild(el('div', 'objective-item', item));
        });
        card.appendChild(objectivesWrap);
      }

      if (activity.callout) {
        card.appendChild(el('div', 'callout', activity.callout));
      }
    } else {
      card.appendChild(el('h3', null, options.practiceHeading || 'Check Your Understanding'));
    }

    var form = el('form', 'practice-form');
    activity.questions.forEach(function (question, index) {
      var block = el('fieldset', 'question-block');
      var legend = el('legend', 'question-title', (index + 1) + '. ' + question.prompt);
      block.appendChild(legend);
      if (question.type === 'mc') {
        var optionList = el('div', 'option-list');
        question.options.forEach(function (option) {
          var label = el('label', 'option-item');
          var input = document.createElement('input');
          input.type = 'radio';
          input.name = 'q' + index;
          input.value = option.value;
          label.appendChild(input);
          var textWrap = el('span');
          textWrap.textContent = option.label;
          label.appendChild(textWrap);
          optionList.appendChild(label);
        });
        block.appendChild(optionList);
      } else {
        if (question.helpText) {
          block.appendChild(el('p', null, question.helpText));
        }
        var input = document.createElement('input');
        input.type = 'text';
        input.name = 'q' + index;
        input.className = 'short-input';
        input.placeholder = question.placeholder || 'Escribe tu respuesta';
        block.appendChild(input);
      }
      form.appendChild(block);
    });
    var buttonRow = el('div', 'action-group');
    var submit = el('button', 'primary-btn', activity.submitLabel || 'Check Answers');
    submit.type = 'submit';
    var reset = el('button', 'secondary-btn', 'Try Again');
    reset.type = 'button';
    reset.addEventListener('click', function () {
      form.reset();
      scoreNode.textContent = '--';
      feedbackList.innerHTML = '';
    });
    buttonRow.appendChild(submit);
    buttonRow.appendChild(reset);
    form.appendChild(buttonRow);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var results = evaluateQuestions(activity.questions, form);
      var correctCount = results.filter(function (item) { return item.correct; }).length;
      scoreNode.textContent = correctCount + '/' + results.length;
      feedbackList.innerHTML = '';
      results.forEach(function (result) {
        var item = el('div', 'feedback-item ' + (result.correct ? 'feedback-correct' : 'feedback-wrong'));
        item.textContent = result.correct
          ? '✓ ' + result.prompt
          : '✗ ' + result.prompt + ' — answer: ' + result.expected + (result.explanation ? ' (' + result.explanation + ')' : '');
        feedbackList.appendChild(item);
      });
    });

    card.appendChild(form);
    left.appendChild(card);
    layout.appendChild(left);
    layout.appendChild(right);
    target.appendChild(layout);
  }

  function renderReading(target, activity) {
    var wrapper = el('div');
    var card = el('section', 'content-card');
    var header = el('div', 'activity-header');
    var textWrap = el('div');
    textWrap.appendChild(el('h2', null, activity.title));
    textWrap.appendChild(el('p', null, first(activity.instructions, activity.description)));
    header.appendChild(textWrap);
    var meta = el('div', 'mini-meta');
    [activity.dayLabel, activity.kindLabel, activity.minutes ? activity.minutes + ' min' : null].forEach(function (item) {
      if (item) {
        meta.appendChild(el('span', 'meta-pill', item));
      }
    });
    header.appendChild(meta);
    card.appendChild(header);

    // Tier badge for differentiated reading
    if (activity.tier === 'l2') {
      var l2Badge = el('span', 'tier-badge tier-l2', '📘 Language Learner Track');
      card.appendChild(l2Badge);
    } else if (activity.tier === 'heritage') {
      var hBadge = el('span', 'tier-badge tier-heritage', '⭐ Heritage Speaker Track');
      card.appendChild(hBadge);
    }

    if (activity.glossary && activity.glossary.length) {
      var glossaryCard = el('div', 'callout');
      glossaryCard.appendChild(el('strong', null, activity.tier === 'heritage' ? 'Vocabulario: ' : 'Glossary: '));
      glossaryCard.appendChild(document.createTextNode(activity.glossary.join(' · ')));
      card.appendChild(glossaryCard);
    }

    // Listen button — uses pre-generated audio file if available, otherwise Web Speech
    if ((activity.passage || []).length) {
      var controls = el('div', 'reading-controls');
      var listenBtn = el('button', 'tts-btn', '🔊 Listen');
      listenBtn.type = 'button';
      var ttsActive = false;

      if (activity.audioUrl) {
        // High-quality pre-generated audio
        var audioEl = new Audio(activity.audioUrl);
        audioEl.addEventListener('ended', function () {
          listenBtn.classList.remove('playing');
          listenBtn.textContent = '🔊 Listen';
          ttsActive = false;
        });
        audioEl.addEventListener('error', function () {
          listenBtn.classList.remove('playing');
          listenBtn.textContent = '🔊 Listen';
          ttsActive = false;
        });
        listenBtn.addEventListener('click', function () {
          if (ttsActive) {
            audioEl.pause();
            audioEl.currentTime = 0;
            listenBtn.classList.remove('playing');
            listenBtn.textContent = '🔊 Listen';
            ttsActive = false;
            return;
          }
          ttsActive = true;
          listenBtn.classList.add('playing');
          listenBtn.textContent = '⏹ Stop';
          audioEl.play();
        });
      } else if (window.speechSynthesis) {
        // Fallback: browser Web Speech API
        var fullText = activity.passage.join(' ');
        listenBtn.addEventListener('click', function () {
          if (ttsActive) {
            window.speechSynthesis.cancel();
            listenBtn.classList.remove('playing');
            listenBtn.textContent = '🔊 Listen';
            ttsActive = false;
            return;
          }
          ttsActive = true;
          listenBtn.classList.add('playing');
          listenBtn.textContent = '⏹ Stop';
          speakSpanish(fullText, function () {
            listenBtn.classList.remove('playing');
            listenBtn.textContent = '🔊 Listen';
            ttsActive = false;
          });
        });
      } else {
        listenBtn.disabled = true;
      }

      controls.appendChild(listenBtn);
      var hintText = activity.glossary && activity.glossary.length
        ? 'Hover a word for translation · Click any word to hear it'
        : 'Click any word to hear it';
      controls.appendChild(el('span', 'reading-hint', hintText));
      card.appendChild(controls);
    }

    var glossMap = buildGlossMap(activity.glossary);

    (activity.passage || []).forEach(function (paragraph) {
      var reading = el('div', 'reading-block');
      reading.appendChild(tokenizeParagraph(paragraph, glossMap));
      card.appendChild(reading);
    });
    wrapper.appendChild(card);
    target.appendChild(wrapper);
    renderPractice(target, activity, { embeddedHeader: true, practiceHeading: 'Comprehension Check' });
  }

  function renderResource(target, activity) {
    var layout = el('div', 'activity-layout');
    var left = el('div');
    var right = el('aside', 'result-card');
    right.appendChild(el('h3', null, activity.sidebarTitle || 'Quick Plan'));
    (activity.checklist || []).forEach(function (item) {
      var row = el('div', 'checklist-item');
      row.textContent = item;
      right.appendChild(row);
    });
    if (activity.sidebarNote) {
      right.appendChild(el('p', null, activity.sidebarNote));
    }

    var intro = el('section', 'content-card');
    var header = el('div', 'activity-header');
    var textWrap = el('div');
    textWrap.appendChild(el('h2', null, activity.title));
    textWrap.appendChild(el('p', null, first(activity.instructions, activity.description)));
    header.appendChild(textWrap);
    var meta = el('div', 'mini-meta');
    [activity.dayLabel, activity.kindLabel, activity.minutes ? activity.minutes + ' min' : null].forEach(function (item) {
      if (item) {
        meta.appendChild(el('span', 'meta-pill', item));
      }
    });
    header.appendChild(meta);
    intro.appendChild(header);
    if (activity.objectives && activity.objectives.length) {
      var objectivesWrap = el('div', 'objectives-list');
      activity.objectives.forEach(function (item) {
        objectivesWrap.appendChild(el('div', 'objective-item', item));
      });
      intro.appendChild(objectivesWrap);
    }
    if (activity.callout) {
      intro.appendChild(el('div', 'callout', activity.callout));
    }
    left.appendChild(intro);

    if (activity.sections) {
      renderSections(left, activity.sections);
    }

    if (activity.reflectionPrompts && activity.reflectionPrompts.length) {
      var reflect = el('section', 'content-card');
      reflect.appendChild(el('h3', null, activity.reflectionTitle || 'Reflect and Prepare'));
      var list = el('div', 'reflection-list');
      activity.reflectionPrompts.forEach(function (item) {
        list.appendChild(el('div', 'reflection-item', item));
      });
      reflect.appendChild(list);
      left.appendChild(reflect);
    }

    layout.appendChild(left);
    layout.appendChild(right);
    target.appendChild(layout);
  }

  function renderDrill(target, activity) {
    var items = activity.items || [];
    var totalLives = activity.lives || 3;
    var state = {
      index: 0,
      lives: totalLives,
      correct: 0,
      answered: false
    };

    function livesHTML(n) {
      var s = '';
      for (var i = 0; i < totalLives; i++) {
        s += i < n ? '❤️' : '🖤';
      }
      return s;
    }

    function showEndScreen(won) {
      target.innerHTML = '';
      var endCard = el('div', 'drill-end-card');
      var emoji = won ? '🎉' : '😅';
      endCard.appendChild(el('h2', null, emoji + ' ' + (won ? '¡Excelente!' : 'Keep Practicing!')));
      var scoreEl = el('div', 'drill-end-score', state.correct + '/' + items.length);
      endCard.appendChild(scoreEl);
      var msg = won
        ? 'You finished the drill with ' + state.correct + ' correct!'
        : 'You ran out of lives. You got ' + state.correct + ' correct.';
      endCard.appendChild(el('p', null, msg));
      var restart = el('button', 'drill-restart', '↺ Try Again');
      restart.addEventListener('click', function () {
        target.innerHTML = '';
        state.index = 0;
        state.lives = totalLives;
        state.correct = 0;
        state.answered = false;
        renderDrillUI();
      });
      endCard.appendChild(restart);
      target.appendChild(endCard);
    }

    function renderDrillUI() {
      target.innerHTML = '';

      // Header card
      var headerCard = el('section', 'content-card');
      var hdr = el('div', 'activity-header');
      var hdrText = el('div');
      hdrText.appendChild(el('h2', null, activity.title));
      hdrText.appendChild(el('p', null, first(activity.instructions, activity.description)));
      hdr.appendChild(hdrText);
      var meta = el('div', 'mini-meta');
      [activity.dayLabel, activity.kindLabel, activity.minutes ? activity.minutes + ' min' : null].forEach(function (item) {
        if (item) meta.appendChild(el('span', 'meta-pill', item));
      });
      hdr.appendChild(meta);
      headerCard.appendChild(hdr);

      if (activity.objectives && activity.objectives.length) {
        var objWrap = el('div', 'objectives-list');
        activity.objectives.forEach(function (item) {
          objWrap.appendChild(el('div', 'objective-item', item));
        });
        headerCard.appendChild(objWrap);
      }
      target.appendChild(headerCard);

      // Drill wrap
      var wrap = el('div', 'drill-wrap');

      // Progress bar
      var progressWrap = el('div');
      var progressBar = el('div', 'drill-progress-bar');
      var fill = el('div', 'drill-progress-fill');
      var pct = items.length > 0 ? (state.index / items.length) * 100 : 0;
      fill.style.width = pct + '%';
      progressBar.appendChild(fill);
      progressWrap.appendChild(progressBar);

      var statusRow = el('div', 'action-group');
      statusRow.style.justifyContent = 'space-between';
      var livesEl = el('div', 'drill-lives');
      livesEl.innerHTML = livesHTML(state.lives);
      var counterEl = el('div', 'drill-counter', (state.index + 1) + ' of ' + items.length);
      statusRow.appendChild(livesEl);
      statusRow.appendChild(counterEl);
      progressWrap.appendChild(statusRow);
      wrap.appendChild(progressWrap);

      var item = items[state.index];
      var drillCard = el('div', 'drill-card');

      var prompt = el('p', 'drill-prompt', item.prompt);
      drillCard.appendChild(prompt);

      var input = el('input', 'drill-input');
      input.type = 'text';
      input.placeholder = 'Type your answer…';
      input.autocomplete = 'off';
      input.autocorrect = 'off';
      input.autocapitalize = 'off';
      input.spellcheck = false;
      drillCard.appendChild(input);

      var feedbackEl = el('div', 'drill-feedback', '');
      drillCard.appendChild(feedbackEl);

      if (item.hint) {
        var hintEl = el('div', 'drill-hint', '💡 ' + item.hint);
        hintEl.style.display = 'none';
        drillCard.appendChild(hintEl);
      }

      var submitBtn = el('button', 'drill-submit', 'Check →');

      function handleSubmit() {
        if (state.answered) {
          // Advance
          state.answered = false;
          state.index++;
          if (state.index >= items.length || state.lives <= 0) {
            showEndScreen(state.lives > 0);
          } else {
            renderDrillUI();
          }
          return;
        }

        var userVal = input.value.trim();
        if (!userVal) return;

        var correct = answerMatches(userVal, item.answer);
        state.answered = true;
        input.disabled = true;

        if (correct) {
          state.correct++;
          input.classList.add('correct');
          drillCard.classList.add('correct');
          feedbackEl.className = 'drill-feedback correct';
          feedbackEl.textContent = '✓ ¡Correcto!';
          submitBtn.textContent = 'Next →';
        } else {
          state.lives--;
          input.classList.add('wrong');
          drillCard.classList.add('wrong');
          feedbackEl.className = 'drill-feedback wrong';
          var expected = Array.isArray(item.answer) ? item.answer[0] : item.answer;
          feedbackEl.textContent = '✗ Answer: ' + expected;
          if (item.hint) {
            hintEl.style.display = '';
          }
          submitBtn.textContent = state.lives <= 0 ? 'See Results →' : 'Next →';
        }

        livesEl.innerHTML = livesHTML(state.lives);

        if (state.lives <= 0 && !correct) {
          setTimeout(function () {
            showEndScreen(false);
          }, 1400);
          submitBtn.disabled = true;
          return;
        }
      }

      submitBtn.addEventListener('click', handleSubmit);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') handleSubmit();
      });

      drillCard.appendChild(submitBtn);
      wrap.appendChild(drillCard);
      target.appendChild(wrap);

      // Focus input
      setTimeout(function () { input.focus(); }, 50);
    }

    renderDrillUI();
  }

  function renderListening(target, activity) {
    var wrapper = el('div');
    wrapper.style.marginBottom = '18px';
    var card = el('section', 'content-card');
    var header = el('div', 'activity-header');
    var textWrap = el('div');
    textWrap.appendChild(el('h2', null, activity.title));
    textWrap.appendChild(el('p', null, first(activity.instructions, activity.description)));
    header.appendChild(textWrap);
    var meta = el('div', 'mini-meta');
    [activity.dayLabel, activity.kindLabel, activity.minutes ? activity.minutes + ' min' : null].forEach(function (item) {
      if (item) meta.appendChild(el('span', 'meta-pill', item));
    });
    header.appendChild(meta);
    card.appendChild(header);

    if (activity.objectives && activity.objectives.length) {
      var objWrap = el('div', 'objectives-list');
      activity.objectives.forEach(function (item) {
        objWrap.appendChild(el('div', 'objective-item', item));
      });
      card.appendChild(objWrap);
    }

    var videoWrap = el('div', 'video-wrap');
    var iframe = document.createElement('iframe');
    var src = 'https://www.youtube-nocookie.com/embed/' + activity.youtubeId;
    if (activity.startTime) {
      src += '?start=' + activity.startTime;
    }
    iframe.src = src;
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.allowFullscreen = true;
    videoWrap.appendChild(iframe);
    card.appendChild(videoWrap);

    wrapper.appendChild(card);
    target.appendChild(wrapper);

    if (activity.questions && activity.questions.length) {
      renderPractice(target, activity, { embeddedHeader: true, practiceHeading: 'Comprehension Check' });
    }
  }

  function renderActivity(site) {
    var params = new URLSearchParams(window.location.search);
    var activityId = params.get('activity');
    var activity = site.activities[activityId];
    var mount = byId('activityMount');
    if (!mount) {
      return;
    }
    if (!activity) {
      setHero(site, null);
      var card = el('section', 'content-card');
      card.appendChild(el('h2', null, 'Activity not found'));
      card.appendChild(el('p', null, 'The link for this activity is missing or outdated. Please return to the student hub and choose another card.'));
      var home = el('a', 'primary-btn', 'Back to Student Hub');
      home.href = 'index.html';
      card.appendChild(home);
      mount.appendChild(card);
      return;
    }
    setHero(site, activity);
    if (activity.type === 'reading') {
      renderReading(mount, activity);
    } else if (activity.type === 'resource') {
      renderResource(mount, activity);
    } else if (activity.type === 'drill') {
      renderDrill(mount, activity);
    } else if (activity.type === 'listening') {
      renderListening(mount, activity);
    } else {
      renderPractice(mount, activity);
    }
  }

  function initTooltip() {
    if (document.getElementById('wordTip')) { return; }
    var tip = el('div', 'word-tip');
    tip.id = 'wordTip';
    document.body.appendChild(tip);
    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      if (t.classList && t.classList.contains('word-gloss')) {
        tip.textContent = t.getAttribute('data-gloss');
        tip.classList.add('visible');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.classList && e.target.classList.contains('word-gloss')) {
        tip.classList.remove('visible');
      }
    });
    document.addEventListener('mousemove', function (e) {
      if (tip.classList.contains('visible')) {
        tip.style.left = (e.clientX + 14) + 'px';
        tip.style.top = (e.clientY - 40) + 'px';
      }
    });
  }

  function init() {
    if (!window.unitSite) {
      return;
    }
    initTooltip();
    if (byId('hubSections')) {
      renderHub(window.unitSite);
    }
    if (byId('activityMount')) {
      renderActivity(window.unitSite);
    }
    if (byId('footerText')) {
      byId('footerText').textContent = window.unitSite.footerText || '';
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
