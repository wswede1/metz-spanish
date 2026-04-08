/* ═══════════════════════════════════════════════════════
   LESSON ENGINE — Component Renderer
   Renders interactive lesson sections from data config
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Helpers ───────────────────────────────────────────
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function html(tag, cls, markup) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (markup) n.innerHTML = markup;
    return n;
  }
  function normalize(t) {
    return String(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  }
  var FLEX_ANSWER_MIN_LEN = 4;
  /** strict=true → exact normalized match only (pipe-separated alternates still allowed). */
  function flexibleAnswerMatch(userVal, expectedRaw, strict) {
    var nu = normalize(userVal);
    if (expectedRaw == null || expectedRaw === '') return false;
    var raw = Array.isArray(expectedRaw) ? expectedRaw.join('|') : String(expectedRaw);
    var parts = raw.split('|');
    for (var p = 0; p < parts.length; p++) {
      var segment = parts[p].trim();
      if (!segment) continue;
      var na = normalize(segment);
      if (!na) continue;
      if (nu === na) return true;
      if (!strict && na.length >= FLEX_ANSWER_MIN_LEN && nu.indexOf(na) !== -1) return true;
    }
    return false;
  }
  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // ── Toast ────────────────────────────────────────────
  function showToast(message, type) {
    var t = el('div', 'score-toast ' + (type || 'success'), message);
    document.body.appendChild(t);
    setTimeout(function() { if (t.parentNode) t.remove(); }, 3000);
  }

  // ── TTS ──────────────────────────────────────────────
  function speak(text, onEnd) {
    if (window.MetzSpanishTTS && typeof window.MetzSpanishTTS.speak === 'function') {
      window.MetzSpanishTTS.speak(text, onEnd);
      return;
    }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'es-MX';
    utt.rate = 0.88;
    if (onEnd) {
      utt.onend = onEnd;
      utt.onerror = onEnd;
    }
    window.speechSynthesis.speak(utt);
  }

  // ── Section State Tracking ───────────────────────────
  var sectionStates = {};
  var firstProgressUpdate = true;
  var progressPrevDone = 0;

  function getLessonCourse() {
    return window.METZ_LESSON_COURSE || 'sp1';
  }
  function getLessonDay() {
    return window.METZ_LESSON_DAY || '01';
  }

  /** Hero nav: always full unit deck (matches “Unit flashcards & games”). */
  function unitVocabGamesHref() {
    var course = getLessonCourse();
    var base = course === 'sp2' ? '../Colombia_Vocab_Review_Spanish2.html' : '../Colombia_Vocab_Review_Spanish1.html';
    return base + '?cat=all';
  }

  function markSectionComplete(id) {
    sectionStates[id] = true;
    if (window.ColombiaProgress) {
      window.ColombiaProgress.mergeLessonSection(getLessonCourse(), getLessonDay(), id, true);
    }
    updateProgress();
  }

  function updateProgress() {
    var steps = $$('.progress-step');
    var total = steps.length;
    var done = 0;
    steps.forEach(function(step, i) {
      var sid = step.getAttribute('data-section');
      if (sectionStates[sid]) {
        step.classList.add('completed');
        step.classList.remove('active');
        done++;
      } else {
        step.classList.remove('completed');
        if (done === i) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      }
    });
    var label = $('.progress-label');
    if (label) label.textContent = done + '/' + total + ' complete';

    if (!firstProgressUpdate) {
      if (done === total && total > 0 && progressPrevDone < total) {
        showToast('Lesson complete!', 'success');
        if (window.ColombiaProgress) {
          window.ColombiaProgress.addCompletedLessonDay(getLessonCourse(), getLessonDay());
        }
      }
    } else {
      firstProgressUpdate = false;
    }
    progressPrevDone = done;
  }

  // ═══════════════════════════════════════════════════════
  // COMPONENT RENDERERS
  // ═══════════════════════════════════════════════════════

  // ── Callout ──────────────────────────────────────────
  function renderCallout(data) {
    var icons = { info: 'info', tip: 'tip', warn: 'warn', fire: 'fire' };
    var emojis = { info: 'info', tip: 'tip', warn: 'warn', fire: 'fire' };
    var emojiMap = { info: 'ℹ️', tip: '💡', warn: '⚠️', fire: '🔥' };
    var type = data.style || 'info';
    var d = el('div', 'callout callout-' + type);
    d.appendChild(el('span', 'callout-icon', emojiMap[type] || 'ℹ️'));
    d.appendChild(html('span', null, data.text));
    return d;
  }

  // ── KWL Chart ────────────────────────────────────────
  function renderKWL(data, sectionId) {
    var wrap = el('div');
    var grid = el('div', 'kwl-grid');
    var course = getLessonCourse();
    var day = getLessonDay();
    var cols = [
      { title: 'K', sub: 'Lo que ya sé', placeholder: 'What I already know...' },
      { title: 'W', sub: 'Lo que quiero saber', placeholder: 'What I want to know...' },
      { title: 'L', sub: 'Lo que aprendí', placeholder: 'What I learned...' }
    ];
    cols.forEach(function(c, i) {
      var col = el('div', 'kwl-col');
      var header = el('div', 'kwl-header');
      header.textContent = c.title;
      var sub = el('span', 'kwl-sub', c.sub);
      header.appendChild(sub);
      col.appendChild(header);
      var body = el('div', 'kwl-body');
      var ta = document.createElement('textarea');
      ta.placeholder = data.placeholders ? data.placeholders[i] : c.placeholder;
      ta.className = 'kwl-textarea';
      if (window.ColombiaProgress) {
        ta.value = ColombiaProgress.getLessonDraft(course, day, 'kwl-' + sectionId + '-' + i);
        ta.addEventListener('input', function() {
          ColombiaProgress.setLessonDraft(course, day, 'kwl-' + sectionId + '-' + i, ta.value);
        });
      }
      body.appendChild(ta);
      col.appendChild(body);
      grid.appendChild(col);
    });
    wrap.appendChild(grid);
    if (data.hint) wrap.appendChild(renderCallout({ style: 'tip', text: data.hint }));
    return wrap;
  }

  // ── Video Embed ──────────────────────────────────────
  function renderVideo(data) {
    var wrap = el('div');
    var area = el('div', 'video-area');
    if (data.youtubeId) {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + data.youtubeId + '?rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.title = data.videoTitle || 'Video';
      area.appendChild(iframe);
    } else {
      var ph = el('div', 'video-placeholder');
      ph.appendChild(el('div', 'play-icon', '▶'));
      ph.appendChild(el('div', null, data.placeholder || 'Video will be shown in class'));
      area.appendChild(ph);
    }
    wrap.appendChild(area);
    if (data.externalVideoUrl) {
      var openRow = el('div', 'video-external-row');
      var openA = document.createElement('a');
      openA.className = 'video-external-link';
      openA.href = data.externalVideoUrl;
      openA.target = '_blank';
      openA.rel = 'noopener noreferrer';
      openA.textContent = data.externalVideoLabel || 'Open video in new tab';
      openRow.appendChild(openA);
      wrap.appendChild(openRow);
    }
    if (data.instructions) {
      wrap.appendChild(renderCallout({ style: 'info', text: data.instructions }));
    }
    return wrap;
  }

  // ── Questions List ───────────────────────────────────
  function renderQuestions(data, sectionId) {
    var wrap = el('div');
    var list = el('div', 'question-list');
    var course = getLessonCourse();
    var day = getLessonDay();
    data.questions.forEach(function(q, i) {
      var item = el('div', 'question-item');
      item.appendChild(html('div', 'question-prompt', q.prompt));
      if (q.type === 'textarea') {
        var ta = document.createElement('textarea');
        ta.className = 'question-input';
        ta.placeholder = q.placeholder || 'Escribe tu respuesta...';
        ta.rows = q.rows || 2;
        var draftKey = 'q-' + sectionId + '-' + i;
        if (window.ColombiaProgress) {
          ta.value = ColombiaProgress.getLessonDraft(course, day, draftKey);
          ta.addEventListener('input', function() {
            ColombiaProgress.setLessonDraft(course, day, draftKey, ta.value);
          });
        }
        item.appendChild(ta);
        if (q.exemplarHtml) {
          var exBtn = el('button', 'exemplar-toggle check-btn btn-blue', q.exemplarButtonLabel || 'Show sample answer');
          var exPanel = el('div', 'exemplar-panel');
          exPanel.setAttribute('hidden', '');
          exPanel.innerHTML = q.exemplarHtml;
          exBtn.type = 'button';
          exBtn.addEventListener('click', function() {
            var open = exPanel.hasAttribute('hidden');
            if (open) exPanel.removeAttribute('hidden');
            else exPanel.setAttribute('hidden', '');
            exBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
          });
          exBtn.setAttribute('aria-expanded', 'false');
          item.appendChild(exBtn);
          item.appendChild(exPanel);
        }
      } else {
        var inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'question-input';
        inp.placeholder = q.placeholder || 'Escribe tu respuesta...';
        if (q.answer) {
          inp.setAttribute('data-answer', Array.isArray(q.answer) ? q.answer.join('|') : q.answer);
        }
        if (q.strictMatch) {
          inp.setAttribute('data-strict', '1');
        }
        var draftKeyInp = 'q-' + sectionId + '-' + i;
        if (window.ColombiaProgress) {
          inp.value = ColombiaProgress.getLessonDraft(course, day, draftKeyInp);
          inp.addEventListener('input', function() {
            ColombiaProgress.setLessonDraft(course, day, draftKeyInp, inp.value);
          });
        }
        item.appendChild(inp);
      }
      list.appendChild(item);
    });
    wrap.appendChild(list);

    if (data.selfRubric && data.selfRubric.items && data.selfRubric.items.length) {
      wrap.appendChild(renderSelfRubricBlock(data.selfRubric, sectionId, 'embed-' + sectionId));
    }

    if (data.exemplarHtml) {
      var blockBtn = el('button', 'exemplar-toggle check-btn btn-blue', data.exemplarButtonLabel || 'Show sample responses');
      var blockPanel = el('div', 'exemplar-panel exemplar-panel-wide');
      blockPanel.setAttribute('hidden', '');
      blockPanel.innerHTML = data.exemplarHtml;
      blockBtn.type = 'button';
      blockBtn.addEventListener('click', function() {
        var open = blockPanel.hasAttribute('hidden');
        if (open) blockPanel.removeAttribute('hidden');
        else blockPanel.setAttribute('hidden', '');
        blockBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      blockBtn.setAttribute('aria-expanded', 'false');
      wrap.appendChild(blockBtn);
      wrap.appendChild(blockPanel);
    }

    // Check button if answers exist
    var hasAnswers = data.questions.some(function(q) { return q.answer; });
    if (hasAnswers) {
      var btn = el('button', 'check-btn btn-blue', '✓ Check Answers');
      btn.addEventListener('click', function() {
        var correct = 0;
        var total = 0;
        $$('.question-input', list).forEach(function(inp) {
          var answer = inp.getAttribute('data-answer');
          if (!answer) return;
          total++;
          var strict = inp.getAttribute('data-strict') === '1';
          if (flexibleAnswerMatch(inp.value, answer, strict)) {
            correct++;
            inp.style.borderColor = 'var(--col-green)';
            inp.style.background = '#e8faf0';
          } else {
            inp.style.borderColor = 'var(--col-red)';
            inp.style.background = '#ffeef0';
          }
        });
        if (total > 0) {
          var pct = correct / total;
          if (pct >= 0.8) {
            showToast(correct + '/' + total + ' correct!', 'success');
            markSectionComplete(sectionId);
          } else if (pct >= 0.5) {
            showToast(correct + '/' + total + ' — keep going!', 'partial');
          } else {
            showToast(correct + '/' + total + ' — try again!', 'retry');
          }
        }
      });
      var row = el('div', 'question-actions-row');
      row.appendChild(btn);
      wrap.appendChild(row);
    }

    var allOpen = data.questions.length && data.questions.every(function(q) { return q.type === 'textarea' && !q.answer; });
    if (allOpen && data.markCompleteLabel) {
      var doneBtn = el('button', 'check-btn btn-green', data.markCompleteLabel);
      doneBtn.type = 'button';
      doneBtn.addEventListener('click', function() {
        markSectionComplete(sectionId);
        showToast('Section saved — nice work!', 'success');
      });
      var row2 = el('div', 'question-actions-row');
      row2.appendChild(doneBtn);
      wrap.appendChild(row2);
    }

    return wrap;
  }

  function renderSelfRubricBlock(rubric, sectionId, rubricDomId) {
    var box = el('div', 'self-rubric');
    if (rubric.title) box.appendChild(el('div', 'self-rubric-title', rubric.title));
    var course = getLessonCourse();
    var day = getLessonDay();
    var rid = rubric.id || rubricDomId;
    var saved = window.ColombiaProgress ? ColombiaProgress.getLessonRubric(course, day, rid) : null;
    var list = el('div', 'self-rubric-list');
    rubric.items.forEach(function(label, idx) {
      var row = el('label', 'self-rubric-item');
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      if (saved && Array.isArray(saved) && saved[idx]) cb.checked = true;
      row.appendChild(cb);
      row.appendChild(document.createTextNode(' ' + label));
      list.appendChild(row);
      cb.addEventListener('change', function() {
        var boxes = list.querySelectorAll('input[type="checkbox"]');
        var state = Array.prototype.map.call(boxes, function(b) { return b.checked; });
        if (window.ColombiaProgress) {
          ColombiaProgress.setLessonRubric(course, day, rid, state);
        }
        if (rubric.completeSectionWhenAllChecked) {
          var allOn = state.every(Boolean);
          if (allOn) markSectionComplete(sectionId);
        }
      });
    });
    box.appendChild(list);
    return box;
  }

  function renderRubricSelf(data, sectionId) {
    return renderSelfRubricBlock(data, sectionId, data.id || sectionId);
  }

  // ── Matching Exercise ────────────────────────────────
  function renderMatching(data, sectionId) {
    var wrap = el('div');
    var pairs = data.pairs.slice();
    var leftItems = pairs.map(function(p) { return { text: p.es || p.left, id: p.id || p.es }; });
    var rightItems = shuffleArray(pairs.map(function(p) { return { text: p.en || p.right, id: p.id || p.es }; }));

    if (data.wordBank) {
      // Traditional matching with word bank
      wrap.appendChild(renderCallout({ style: 'info', text: data.instructions || 'Match each item to its meaning.' }));
      var grid = el('div', 'match-grid');
      var selected = null;
      var matchedCount = 0;

      leftItems.forEach(function(left) {
        var tile = el('div', 'match-item', left.text);
        tile.setAttribute('data-id', left.id);
        tile.setAttribute('data-side', 'left');
        tile.addEventListener('click', function() { handleMatchClick(tile); });
        grid.appendChild(tile);
      });
      rightItems.forEach(function(right) {
        var tile = el('div', 'match-item', right.text);
        tile.setAttribute('data-id', right.id);
        tile.setAttribute('data-side', 'right');
        tile.addEventListener('click', function() { handleMatchClick(tile); });
        grid.appendChild(tile);
      });

      function handleMatchClick(tile) {
        if (tile.classList.contains('matched')) return;
        if (selected && selected.getAttribute('data-side') === tile.getAttribute('data-side')) {
          selected.classList.remove('selected');
          selected = tile;
          tile.classList.add('selected');
          return;
        }
        if (!selected) {
          selected = tile;
          tile.classList.add('selected');
          return;
        }
        // Check match
        if (selected.getAttribute('data-id') === tile.getAttribute('data-id')) {
          selected.classList.remove('selected');
          selected.classList.add('matched');
          tile.classList.add('matched');
          matchedCount++;
          if (matchedCount === leftItems.length) {
            showToast('All matched!', 'success');
            markSectionComplete(sectionId);
          }
        } else {
          tile.classList.add('wrong');
          var prev = selected;
          prev.classList.add('wrong');
          prev.classList.remove('selected');
          setTimeout(function() {
            tile.classList.remove('wrong');
            prev.classList.remove('wrong');
          }, 500);
        }
        selected = null;
      }
      wrap.appendChild(grid);
    }
    return wrap;
  }

  // ── Sentence order (tap pool → build line; same schema as roadmap arrange) ──
  function renderSentenceOrder(data, sectionId) {
    var wrap = el('div', 'sentence-order-wrap');
    var tokens = (data.tokens || []).slice();
    var order = data.correctOrder && data.correctOrder.length
      ? data.correctOrder.slice()
      : tokens.map(function(_, i) { return i; });
    if (!tokens.length || order.length !== tokens.length) {
      wrap.appendChild(el('p', null, '[sentence-order: need tokens[] and correctOrder[] of same length]'));
      return wrap;
    }
    if (data.prompt) {
      var pr = el('div', 'sentence-order-prompt');
      pr.innerHTML = data.prompt;
      wrap.appendChild(pr);
    }
    wrap.appendChild(renderCallout({
      style: 'info',
      text: data.instructions || 'Tap each word in the correct order. Tap a word in your sentence to put it back. Use the Check button when finished.'
    }));

    var displayIdx = shuffleArray(tokens.map(function(_, i) { return i; }));
    var picked = [];
    var poolMap = {};

    var pool = el('div', 'sentence-order-pool');
    pool.setAttribute('role', 'group');
    pool.setAttribute('aria-label', 'Word bank');

    var built = el('div', 'sentence-order-built');
    built.setAttribute('role', 'status');
    built.setAttribute('aria-live', 'polite');
    built.setAttribute('aria-atomic', 'true');

    function paintBuilt() {
      built.innerHTML = '';
      picked.forEach(function(tokIdx, si) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'sentence-order-token sentence-order-token-picked';
        b.textContent = tokens[tokIdx];
        b.setAttribute('aria-label', 'Remove: ' + tokens[tokIdx]);
        b.addEventListener('click', function() {
          picked.splice(si, 1);
          if (poolMap[tokIdx]) poolMap[tokIdx].style.display = '';
          paintBuilt();
        });
        built.appendChild(b);
      });
    }

    displayIdx.forEach(function(tokIdx) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'sentence-order-token';
      b.textContent = tokens[tokIdx];
      poolMap[tokIdx] = b;
      b.addEventListener('click', function() {
        if (b.style.display === 'none') return;
        picked.push(tokIdx);
        b.style.display = 'none';
        paintBuilt();
      });
      pool.appendChild(b);
    });

    wrap.appendChild(pool);
    wrap.appendChild(el('div', 'sentence-order-label', 'Your sentence:'));
    wrap.appendChild(built);

    var check = el('button', 'check-btn btn-blue', '✓ Check order');
    check.type = 'button';
    check.style.marginTop = '14px';
    check.addEventListener('click', function() {
      var target = order.map(function(i) { return tokens[i]; }).join(' ');
      var got = picked.map(function(i) { return tokens[i]; }).join(' ');
      var ok = got === target;
      showToast(ok ? 'Perfect order!' : 'Not quite — tap words in your sentence to fix the order.', ok ? 'success' : 'retry');
      if (ok) markSectionComplete(sectionId);
    });
    wrap.appendChild(check);
    return wrap;
  }

  // ── Fill-in-the-Blank ────────────────────────────────
  function renderFillBlanks(data, sectionId) {
    var wrap = el('div');
    var bankWords = Array.isArray(data.wordBank) ? data.wordBank : [];
    var selectedChip = null;

    function clearChipSelection() {
      if (selectedChip) {
        selectedChip.classList.remove('word-chip-selected');
        selectedChip = null;
      }
    }

    function selectChip(chip) {
      if (chip.classList.contains('used')) {
        return;
      }
      if (selectedChip === chip) {
        clearChipSelection();
        return;
      }
      clearChipSelection();
      selectedChip = chip;
      chip.classList.add('word-chip-selected');
    }

    // Word bank
    if (bankWords.length) {
      var bank = el('div', 'word-bank word-bank-draggable');
      bank.appendChild(el('div', 'word-bank-label', 'Word Bank'));
      bank.appendChild(el('div', 'word-bank-hint', 'Drag a word into a blank — or tap a word, then tap the blank.'));
      bankWords.forEach(function(w) {
        var chip = el('span', 'word-chip', w);
        chip.setAttribute('draggable', 'true');
        chip.addEventListener('dragstart', function(e) {
          if (chip.classList.contains('used')) {
            e.preventDefault();
            return;
          }
          e.dataTransfer.setData('text/plain', String(w));
          e.dataTransfer.effectAllowed = 'copy';
        });
        chip.addEventListener('click', function(e) {
          e.preventDefault();
          selectChip(chip);
        });
        bank.appendChild(chip);
      });
      wrap.appendChild(bank);
    }

    // Sentences
    var sentWrap = el('div');
    data.sentences.forEach(function(s) {
      var sent = el('div', 'fill-sentence');
      // Split sentence on blanks marked with ___
      var parts = s.text.split('___');
      parts.forEach(function(part, i) {
        sent.appendChild(document.createTextNode(part));
        if (i < parts.length - 1) {
          var inp = document.createElement('input');
          inp.type = 'text';
          inp.className = 'fill-blank';
          inp.placeholder = '___';
          inp.setAttribute('autocomplete', 'off');
          if (s.answer) inp.setAttribute('data-answer', Array.isArray(s.answer) ? s.answer[i] || s.answer[0] : s.answer);
          sent.appendChild(inp);
        }
      });
      sentWrap.appendChild(sent);
    });
    wrap.appendChild(sentWrap);

    var blanks = $$('.fill-blank', sentWrap);
    if (bankWords.length && blanks.length) {
      blanks.forEach(function(inp) {
        inp.addEventListener('dragover', function(e) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
        });
        inp.addEventListener('dragenter', function() {
          inp.classList.add('fill-blank-drag-over');
        });
        inp.addEventListener('dragleave', function() {
          inp.classList.remove('fill-blank-drag-over');
        });
        inp.addEventListener('drop', function(e) {
          e.preventDefault();
          inp.classList.remove('fill-blank-drag-over');
          var t = e.dataTransfer.getData('text/plain');
          if (t) {
            inp.value = t.trim();
          }
        });
        inp.addEventListener('click', function() {
          if (selectedChip && !selectedChip.classList.contains('used')) {
            inp.value = selectedChip.textContent.trim();
            clearChipSelection();
          }
        });
      });
    }

    // Check button
    var btn = el('button', 'check-btn btn-green', '✓ Check');
    btn.style.marginTop = '14px';
    btn.addEventListener('click', function() {
      clearChipSelection();
      var blanksNow = $$('.fill-blank', sentWrap);
      var correct = 0;
      blanksNow.forEach(function(b) {
        var answer = b.getAttribute('data-answer');
        if (!answer) return;
        if (flexibleAnswerMatch(b.value, answer, false)) {
          b.classList.add('correct');
          b.classList.remove('wrong');
          correct++;
        } else {
          b.classList.add('wrong');
          b.classList.remove('correct');
        }
      });
      var total = blanksNow.filter(function(b) { return b.getAttribute('data-answer'); }).length;
      if (total > 0) {
        var pct = correct / total;
        showToast(correct + '/' + total, pct >= 0.8 ? 'success' : pct >= 0.5 ? 'partial' : 'retry');
        if (pct >= 0.8) markSectionComplete(sectionId);
      }
      // Mark word chips as used
      $$('.word-chip', wrap).forEach(function(chip) {
        var usedInBlanks = blanksNow.some(function(b) { return normalize(b.value) === normalize(chip.textContent); });
        chip.classList.toggle('used', usedInBlanks);
      });
    });
    wrap.appendChild(btn);
    return wrap;
  }

  // ── Flip Card Gallery ────────────────────────────────
  function renderFlipGallery(data, sectionId) {
    var gallery = el('div', 'flip-gallery');
    var course = getLessonCourse();
    var day = getLessonDay();
    var cards = data.cards || [];
    var n = cards.length;
    var storageKey = 'flip-' + sectionId;
    var flippedEver = [];
    if (window.ColombiaProgress && sectionId) {
      var rawFlip = ColombiaProgress.getLessonDraft(course, day, storageKey);
      var parsedFlip = null;
      try {
        parsedFlip = rawFlip ? JSON.parse(rawFlip) : null;
      } catch (e1) {
        parsedFlip = null;
      }
      if (parsedFlip && parsedFlip.flipped && Array.isArray(parsedFlip.flipped)) {
        flippedEver = parsedFlip.flipped.slice();
      }
    }
    while (flippedEver.length < n) flippedEver.push(false);
    if (flippedEver.length > n) flippedEver = flippedEver.slice(0, n);

    function persistFlipState() {
      if (!window.ColombiaProgress || !sectionId) return;
      ColombiaProgress.setLessonDraft(course, day, storageKey, JSON.stringify({ flipped: flippedEver }));
    }

    function allEverFlipped() {
      if (n === 0) return false;
      for (var i = 0; i < n; i++) {
        if (!flippedEver[i]) return false;
      }
      return true;
    }

    cards.forEach(function(c, idx) {
      var card = el('div', 'flip-card');
      if (flippedEver[idx]) card.classList.add('flipped');
      var inner = el('div', 'flip-card-inner');
      var front = el('div', 'flip-card-front');
      front.appendChild(el('div', 'flip-card-label', 'Español'));
      front.appendChild(el('div', 'flip-card-word', c.es || c.front));
      if (c.hint) front.appendChild(el('div', 'flip-card-hint', c.hint));
      var back = el('div', 'flip-card-back');
      back.appendChild(el('div', 'flip-card-label', 'English'));
      back.appendChild(el('div', 'flip-card-word', c.en || c.back));
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      card.addEventListener('click', function() {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
          if (!flippedEver[idx]) {
            flippedEver[idx] = true;
            persistFlipState();
          }
          if (c.es) speak(c.es);
        }
        if (allEverFlipped()) markSectionComplete(sectionId);
      });
      gallery.appendChild(card);
    });
    return gallery;
  }

  // ── Discovery Box (grammar) ──────────────────────────
  function renderDiscovery(data) {
    var box = el('div', 'discovery-box');
    box.appendChild(html('div', 'discovery-title', '🔍 ' + (data.title || 'Grammar Discovery')));
    if (data.instructions) {
      box.appendChild(el('p', null, data.instructions));
      box.lastChild.style.cssText = 'font-size:0.88rem;color:var(--text-muted);margin-bottom:12px';
    }
    if (data.groups && data.groups.length) {
      data.groups.forEach(function (g) {
        var row = el('div', 'discovery-row');
        if (g.label) {
          row.appendChild(el('div', 'discovery-row-label', g.label));
        }
        var itemsWrap = el('div', 'discovery-row-items');
        (g.items || []).forEach(function (it) {
          var item = el('div', 'discovery-item');
          item.appendChild(html('div', 'discovery-item-es', it.esHtml || it.es || ''));
          if (it.en) {
            item.appendChild(el('div', 'discovery-gloss', it.en));
          }
          itemsWrap.appendChild(item);
        });
        row.appendChild(itemsWrap);
        box.appendChild(row);
      });
    } else if (data.sentences && data.sentences.length) {
      var sentences = el('div', 'discovery-sentences');
      data.sentences.forEach(function (s) {
        sentences.appendChild(html('div', 'discovery-sentence', s));
      });
      box.appendChild(sentences);
    }
    if (data.question) {
      var q = el('div', 'input-field');
      q.style.marginTop = '14px';
      var label = el('label', null, data.question);
      var ta = document.createElement('textarea');
      ta.placeholder = data.placeholder || 'Write your hypothesis...';
      ta.style.minHeight = '60px';
      q.appendChild(label);
      q.appendChild(ta);
      box.appendChild(q);
    }
    return box;
  }

  // ── Conjugation Table ────────────────────────────────
  function renderConjTable(data, sectionId) {
    var wrap = el('div');
    data.verbs.forEach(function(verb) {
      var table = document.createElement('table');
      table.className = 'conj-table';
      var thead = document.createElement('thead');
      var tr = document.createElement('tr');
      tr.appendChild(el('th', null, 'Subject'));
      tr.appendChild(el('th', null, verb.infinitive));
      thead.appendChild(tr);
      table.appendChild(thead);
      var tbody = document.createElement('tbody');
      verb.rows.forEach(function(row) {
        var r = document.createElement('tr');
        r.appendChild(html('td', 'pronoun', row.pronoun));
        var td = document.createElement('td');
        if (row.answer) {
          var inp = document.createElement('input');
          inp.type = 'text';
          inp.className = 'conj-input';
          inp.placeholder = '...';
          inp.setAttribute('data-answer', row.answer);
          td.appendChild(inp);
        } else {
          td.textContent = row.given || '';
        }
        r.appendChild(td);
        tbody.appendChild(r);
      });
      table.appendChild(tbody);
      wrap.appendChild(table);
    });

    var btn = el('button', 'check-btn btn-purple', '✓ Check Conjugations');
    btn.addEventListener('click', function() {
      var inputs = $$('.conj-input', wrap);
      var correct = 0;
      inputs.forEach(function(inp) {
        var answer = inp.getAttribute('data-answer');
        if (normalize(inp.value) === normalize(answer)) {
          inp.classList.add('correct');
          inp.classList.remove('wrong');
          correct++;
        } else {
          inp.classList.add('wrong');
          inp.classList.remove('correct');
        }
      });
      var pct = inputs.length > 0 ? correct / inputs.length : 0;
      showToast(correct + '/' + inputs.length, pct >= 0.8 ? 'success' : pct >= 0.5 ? 'partial' : 'retry');
      if (pct >= 0.8) markSectionComplete(sectionId);
    });
    wrap.appendChild(el('div', null));
    wrap.lastChild.style.marginTop = '14px';
    wrap.lastChild.appendChild(btn);
    return wrap;
  }

  // ── Reading Block ────────────────────────────────────
  function buildReadingGlossMap(glossary) {
    var map = {};
    (glossary || []).forEach(function (entry) {
      if (typeof entry === 'string') {
        var idx = entry.indexOf('=');
        if (idx !== -1) {
          map[normalize(entry.slice(0, idx).trim())] = entry.slice(idx + 1).trim();
        }
      } else if (entry && entry.es) {
        map[normalize(String(entry.es))] = String(entry.en || '');
      }
    });
    return map;
  }

  function renderReadingPlain(card, data) {
    var glossMap = buildReadingGlossMap(data.glossary);
    var textDiv = el('div', 'reading-text reading-text-plain');
    var pop = el('div', 'reading-gloss-popover');
    pop.setAttribute('role', 'tooltip');
    pop.hidden = true;
    pop.id = 'rg-' + Math.random().toString(36).slice(2);
    var plain = String(data.plain || '');
    var parts = plain.split(/(\s+)/);
    var clickTimer = null;
    var openSpan = null;

    function hidePop() {
      pop.hidden = true;
      pop.textContent = '';
      if (openSpan) {
        openSpan.removeAttribute('aria-describedby');
        openSpan = null;
      }
    }

    function showPop(span, gloss) {
      if (openSpan === span && !pop.hidden) {
        hidePop();
        return;
      }
      if (openSpan && openSpan !== span) {
        hidePop();
      }
      openSpan = span;
      pop.textContent = gloss;
      pop.hidden = false;
      var r = span.getBoundingClientRect();
      var left = Math.max(8, Math.min(r.left, window.innerWidth - 228));
      pop.style.left = left + 'px';
      pop.style.top = (r.bottom + window.scrollY + 6) + 'px';
      span.setAttribute('aria-describedby', pop.id);
    }

    parts.forEach(function (token) {
      if (/^\s+$/.test(token)) {
        textDiv.appendChild(document.createTextNode(token));
        return;
      }
      var m = token.match(/^([^A-Za-z\u00C0-\u024F'-]*)([A-Za-z\u00C0-\u024F'-]+)([^A-Za-z\u00C0-\u024F'-]*)$/);
      if (!m) {
        textDiv.appendChild(document.createTextNode(token));
        return;
      }
      if (m[1]) {
        textDiv.appendChild(document.createTextNode(m[1]));
      }
      var word = m[2];
      var gloss = glossMap[normalize(word)];
      if (gloss) {
        var span = document.createElement('span');
        span.textContent = word;
        span.className = 'reading-gloss-word';
        span.setAttribute('tabindex', '0');
        span.setAttribute('role', 'button');
        span.setAttribute('aria-label', word + '. Single click: English. Double click: hear Spanish.');
        var last = 0;
        span.addEventListener('click', function () {
          var now = Date.now();
          if (now - last < 400) {
            return;
          }
          last = now;
          clearTimeout(clickTimer);
          clickTimer = setTimeout(function () {
            if (Date.now() - last >= 350) {
              showPop(span, gloss);
            }
          }, 320);
        });
        span.addEventListener('dblclick', function (e) {
          e.preventDefault();
          clearTimeout(clickTimer);
          last = 0;
          hidePop();
          speak(word);
        });
        span.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            showPop(span, gloss);
          }
          if (ev.key === ' ') {
            ev.preventDefault();
            speak(word);
          }
        });
        textDiv.appendChild(span);
      } else {
        textDiv.appendChild(document.createTextNode(word));
      }
      if (m[3]) {
        textDiv.appendChild(document.createTextNode(m[3]));
      }
    });

    card.appendChild(textDiv);
    card.appendChild(pop);

    return card;
  }

  function renderReading(data) {
    var card = el('div', 'reading-card');
    if (data.plain) {
      renderReadingPlain(card, data);
    } else {
      var text = html('div', 'reading-text', data.text || '');
      card.appendChild(text);
      setTimeout(function () {
        $$('.verb-highlight, .gustar-highlight', card).forEach(function (span) {
          var t = span.textContent;
          span.setAttribute('tabindex', '0');
          span.setAttribute('role', 'button');
          span.setAttribute('aria-label', t + '. Click or Enter to hear Spanish.');
          span.addEventListener('click', function () {
            speak(t);
          });
          span.addEventListener('keydown', function (ev) {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault();
              speak(t);
            }
          });
        });
      }, 0);
    }
    if (data.instructions) {
      var inst = el('p', null, data.instructions);
      inst.style.cssText = 'font-size:0.82rem;color:var(--text-muted);margin-top:10px;font-style:italic';
      card.appendChild(inst);
    }
    var hint = el('p', null, '');
    hint.style.cssText = 'font-size:0.78rem;color:var(--text-muted);margin-top:6px';
    if (data.plain && data.glossary && data.glossary.length) {
      hint.textContent = 'Glossary words: single click (or Enter) = English hint; double click (or Space) = hear Spanish.';
      card.appendChild(hint);
    } else if (!data.plain) {
      hint.textContent = 'Highlighted verbs / gustar: click or press Enter to hear Spanish.';
      card.appendChild(hint);
    }
    return card;
  }

  // ── Partner Talk ─────────────────────────────────────
  function renderPartnerTalk(data) {
    var card = el('div', 'partner-card');
    card.appendChild(el('div', 'partner-icon', '🗣️'));
    var content = el('div', 'partner-content');
    content.appendChild(el('div', 'partner-title', data.title || 'Partner Talk'));
    content.appendChild(html('div', 'partner-prompt', data.prompt));
    if (data.duration) {
      var dur = el('span', null, '⏱ ' + data.duration);
      dur.style.cssText = 'font-size:0.78rem;font-weight:800;color:var(--col-purple);display:inline-block;margin-top:6px';
      content.appendChild(dur);
    }
    card.appendChild(content);
    return card;
  }

  // ── Exit Ticket ──────────────────────────────────────
  function renderExitTicket(data, sectionId) {
    var ticket = el('div', 'exit-ticket');
    ticket.appendChild(html('div', 'exit-title', '🎫 ' + (data.title || 'Boleto de Salida — Exit Ticket')));
    if (data.prompt) ticket.appendChild(el('p', null, data.prompt));
    var list = el('div', 'question-list');
    (data.fields || []).forEach(function(f) {
      var item = el('div', 'question-item');
      item.appendChild(el('div', 'question-prompt', f.label));
      if (f.type === 'textarea') {
        var ta = document.createElement('textarea');
        ta.className = 'question-input';
        ta.placeholder = f.placeholder || '';
        ta.rows = f.rows || 2;
        item.appendChild(ta);
      } else {
        var inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'question-input';
        inp.placeholder = f.placeholder || '';
        item.appendChild(inp);
      }
      list.appendChild(item);
    });
    ticket.appendChild(list);
    var btn = el('button', 'check-btn btn-red', '✓ Submit');
    btn.style.marginTop = '12px';
    btn.addEventListener('click', function() {
      var filled = $$('.question-input', ticket).filter(function(i) { return i.value.trim().length > 0; });
      if (filled.length >= (data.fields || []).length) {
        showToast('Exit ticket submitted!', 'success');
        markSectionComplete(sectionId);
      } else {
        showToast('Please fill in all fields', 'partial');
      }
    });
    ticket.appendChild(btn);
    return ticket;
  }

  // ── Map Labels ───────────────────────────────────────
  function renderMapLabels(data) {
    var wrap = el('div');
    var mapArea = el('div', 'map-area');
    if (data.mapImage) {
      var img = document.createElement('img');
      img.className = 'map-embed-image';
      img.src = data.mapImage;
      img.alt = data.mapAlt || 'Map of Colombia';
      mapArea.appendChild(img);
      if (data.mapHint) {
        var cap = el('p', 'map-embed-caption', data.mapHint);
        mapArea.appendChild(cap);
      }
    } else if (data.mapPdf) {
      var pdfRow = el('div', 'map-pdf-row');
      var pdfA = html('a', 'map-pdf-link', data.mapPdfLabel || 'Open map (PDF)');
      pdfA.href = data.mapPdf;
      pdfA.target = '_blank';
      pdfA.rel = 'noopener noreferrer';
      pdfRow.appendChild(pdfA);
      mapArea.appendChild(pdfRow);
      var ph = el('div', 'map-placeholder map-placeholder-below');
      ph.appendChild(el('div', 'map-icon', '🗺️'));
      ph.appendChild(el('div', null, data.mapHint || 'Use the PDF above or the printed map from class'));
      mapArea.appendChild(ph);
    } else {
      var ph0 = el('div', 'map-placeholder');
      ph0.appendChild(el('div', 'map-icon', '🗺️'));
      ph0.appendChild(el('div', null, data.mapHint || 'Use the printed map from class'));
      mapArea.appendChild(ph0);
    }
    wrap.appendChild(mapArea);

    // Label grid
    var grid = el('div', 'map-items-grid');
    data.labels.forEach(function(label, i) {
      var item = el('div', 'map-item');
      item.appendChild(el('div', 'map-number', String(i + 1)));
      item.appendChild(el('div', 'map-name', label.name));
      if (label.type) item.appendChild(el('div', 'map-type', label.type));
      item.addEventListener('click', function() { if (label.name) speak(label.name); });
      grid.appendChild(item);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  // ── Station Picker ───────────────────────────────────
  function renderStations(data) {
    var wrap = el('div');
    if (data.instructions) {
      wrap.appendChild(renderCallout({ style: 'warn', text: data.instructions }));
    }
    var grid = el('div', 'station-grid');
    var selected = null;
    data.options.forEach(function(opt) {
      var card = el('div', 'station-card');
      card.appendChild(el('div', 'station-letter', opt.letter));
      card.appendChild(el('div', 'station-name', opt.name));
      card.appendChild(el('div', 'station-desc', opt.description));
      card.addEventListener('click', function() {
        if (selected) selected.classList.remove('selected');
        card.classList.add('selected');
        selected = card;
        // Show deliverable area
        var existing = wrap.querySelector('.station-deliverable');
        if (existing) existing.remove();
        if (opt.fields) {
          var deliver = el('div', 'station-deliverable');
          deliver.style.marginTop = '16px';
          deliver.appendChild(renderCallout({ style: 'tip', text: opt.deliverable || 'Complete your station work below:' }));
          opt.fields.forEach(function(f) {
            var field = el('div', 'input-field');
            field.appendChild(el('label', null, f.label));
            if (f.type === 'textarea') {
              var ta = document.createElement('textarea');
              ta.placeholder = f.placeholder || '';
              ta.rows = f.rows || 3;
              field.appendChild(ta);
            } else {
              var inp = document.createElement('input');
              inp.type = 'text';
              inp.placeholder = f.placeholder || '';
              field.appendChild(inp);
            }
            deliver.appendChild(field);
          });
          wrap.appendChild(deliver);
        }
      });
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  // ── Data Table ───────────────────────────────────────
  function renderDataTable(data) {
    var table = document.createElement('table');
    table.className = 'data-table';
    if (data.headers) {
      var thead = document.createElement('thead');
      var tr = document.createElement('tr');
      data.headers.forEach(function(h) { tr.appendChild(el('th', null, h)); });
      thead.appendChild(tr);
      table.appendChild(thead);
    }
    var tbody = document.createElement('tbody');
    (data.rows || []).forEach(function(row) {
      var tr = document.createElement('tr');
      row.forEach(function(cell) {
        var td = document.createElement('td');
        if (cell && cell.editable) {
          var inp = document.createElement('input');
          inp.type = 'text';
          inp.placeholder = cell.placeholder || '';
          td.appendChild(inp);
        } else {
          td.textContent = typeof cell === 'string' ? cell : (cell && cell.text) || '';
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  // ── Vocabulary Input List ────────────────────────────
  function renderVocabList(data) {
    var wrap = el('div');
    if (data.instructions) {
      wrap.appendChild(el('p', null, data.instructions));
      wrap.lastChild.style.cssText = 'font-size:0.88rem;color:var(--text-muted);margin-bottom:12px';
    }
    var list = el('div');
    for (var i = 0; i < (data.count || 5); i++) {
      var field = el('div', 'input-field');
      field.appendChild(el('label', null, (i + 1) + '. New word'));
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.placeholder = 'Palabra nueva...';
      field.appendChild(inp);
      list.appendChild(field);
    }
    if (data.drawPrompt) {
      var draw = el('div', 'input-field');
      draw.appendChild(el('label', null, data.drawPrompt));
      var ta = document.createElement('textarea');
      ta.placeholder = 'Draw or describe here...';
      ta.style.minHeight = '80px';
      draw.appendChild(ta);
      list.appendChild(draw);
    }
    wrap.appendChild(list);
    return wrap;
  }

  // ── MC Quiz ──────────────────────────────────────────
  function renderMCQuiz(data, sectionId) {
    var wrap = el('div');
    var list = el('div', 'question-list');
    data.questions.forEach(function(q, qi) {
      var item = el('div', 'question-item');
      item.appendChild(html('div', 'question-prompt', q.prompt));
      var optWrap = el('div');
      optWrap.style.cssText = 'display:flex;flex-direction:column;gap:6px;margin-top:8px';
      (q.options || []).forEach(function(opt) {
        var label = document.createElement('label');
        label.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 14px;background:#fafbfd;border:2px solid #e0e5ee;border-radius:8px;cursor:pointer;transition:all 0.2s;font-weight:600;font-size:0.9rem';
        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'mcq' + qi;
        radio.value = opt.value;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(opt.label));
        label.addEventListener('mouseenter', function() { label.style.borderColor = 'var(--col-blue)'; label.style.background = '#eef3ff'; });
        label.addEventListener('mouseleave', function() {
          if (!radio.checked) { label.style.borderColor = '#e0e5ee'; label.style.background = '#fafbfd'; }
        });
        radio.addEventListener('change', function() {
          $$('label', optWrap).forEach(function(l) { l.style.borderColor = '#e0e5ee'; l.style.background = '#fafbfd'; });
          label.style.borderColor = 'var(--col-blue)';
          label.style.background = '#d6eaf8';
        });
        optWrap.appendChild(label);
      });
      item.appendChild(optWrap);
      list.appendChild(item);
    });
    wrap.appendChild(list);

    var btn = el('button', 'check-btn btn-blue', '✓ Check Answers');
    btn.style.marginTop = '14px';
    btn.addEventListener('click', function() {
      var correct = 0;
      data.questions.forEach(function(q, qi) {
        var checked = wrap.querySelector('input[name="mcq' + qi + '"]:checked');
        var labels = $$('label', list.children[qi]);
        labels.forEach(function(l) {
          var r = l.querySelector('input');
          if (r.value === q.answer) {
            l.style.borderColor = 'var(--col-green)';
            l.style.background = '#d5f5e3';
          } else if (checked && r.value === checked.value) {
            l.style.borderColor = 'var(--col-red)';
            l.style.background = '#fadbd8';
          }
        });
        if (checked && checked.value === q.answer) correct++;
      });
      var total = data.questions.length;
      var pct = correct / total;
      showToast(correct + '/' + total, pct >= 0.8 ? 'success' : pct >= 0.5 ? 'partial' : 'retry');
      if (pct >= 0.8) markSectionComplete(sectionId);
    });
    wrap.appendChild(btn);
    return wrap;
  }

  // ═══════════════════════════════════════════════════════
  // COMPONENT DISPATCH
  // ═══════════════════════════════════════════════════════
  var renderers = {
    callout: function(d) { return renderCallout(d); },
    kwl: renderKWL,
    video: function(d) { return renderVideo(d); },
    questions: renderQuestions,
    matching: renderMatching,
    'sentence-order': renderSentenceOrder,
    'fill-blanks': renderFillBlanks,
    'flip-gallery': function(d, sid) { return renderFlipGallery(d, sid); },
    discovery: function(d) { return renderDiscovery(d); },
    'conj-table': renderConjTable,
    reading: function(d) { return renderReading(d); },
    'partner-talk': function(d) { return renderPartnerTalk(d); },
    'exit-ticket': renderExitTicket,
    'map-labels': function(d) { return renderMapLabels(d); },
    stations: function(d) { return renderStations(d); },
    'data-table': function(d) { return renderDataTable(d); },
    'vocab-list': function(d) { return renderVocabList(d); },
    'mc-quiz': renderMCQuiz,
    'rubric-self': renderRubricSelf
  };

  // ═══════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════
  function renderLesson(lesson) {
    var root = document.getElementById('lessonRoot');
    if (!root) return;
    root.innerHTML = '';

    sectionStates = {};
    firstProgressUpdate = true;
    progressPrevDone = 0;
    if (window.ColombiaProgress) {
      sectionStates = ColombiaProgress.getLessonSections(getLessonCourse(), getLessonDay());
      ColombiaProgress.recordLessonVisit(getLessonCourse(), getLessonDay(), {
        title: lesson.title || '',
        href: 'lessons/lesson.html?day=' + parseInt(getLessonDay(), 10)
      });
    }

    // Background
    var bg = el('div', 'lesson-bg');
    root.appendChild(bg);

    // Hero
    var hero = el('header', 'lesson-hero');
    var heroInner = el('div', 'hero-inner');
    var eyebrow = el('div', 'hero-eyebrow');
    eyebrow.appendChild(el('span', 'hero-day', lesson.dayLabel || 'Day'));
    eyebrow.appendChild(document.createTextNode(' ' + (lesson.unit || 'Unidad Colombia')));
    heroInner.appendChild(eyebrow);
    heroInner.appendChild(el('h1', null, lesson.title));
    if (lesson.subtitle) heroInner.appendChild(el('p', 'hero-subtitle', lesson.subtitle));

    if (lesson.objectives) {
      var objWrap = el('div', 'hero-objectives');
      lesson.objectives.forEach(function(o) {
        objWrap.appendChild(el('div', 'hero-obj', '🎯 ' + o));
      });
      heroInner.appendChild(objWrap);
    }

    var nav = el('div', 'hero-nav');
    var hubA = html('a', 'lesson-hub-link', '← Back to Hub');
    hubA.href = '../index.html';
    nav.appendChild(hubA);
    if (lesson.vocabCategory !== undefined && lesson.vocabCategory !== null) {
      var vocabA = html('a', 'lesson-vocab-link', '📇 Unit flashcards & games');
      vocabA.href = unitVocabGamesHref();
      vocabA.setAttribute('target', '_self');
      nav.appendChild(vocabA);
    }
    heroInner.appendChild(nav);
    hero.appendChild(heroInner);
    root.appendChild(hero);

    // Progress Tracker
    if (lesson.sections && lesson.sections.length > 1) {
      var tracker = el('div', 'progress-tracker');
      var card = el('div', 'progress-card');
      var steps = el('div', 'progress-steps');
      lesson.sections.forEach(function(s) {
        var step = el('div', 'progress-step');
        step.setAttribute('data-section', s.id);
        step.setAttribute('data-label', s.shortTitle || s.title);
        steps.appendChild(step);
      });
      card.appendChild(steps);
      card.appendChild(el('div', 'progress-label', '0/' + lesson.sections.length + ' complete'));
      tracker.appendChild(card);
      root.appendChild(tracker);
    }

    // Main content
    var shell = el('main', 'lesson-shell');
    var accentColors = ['blue', 'green', 'yellow', 'red', 'purple', 'orange', 'teal'];

    lesson.sections.forEach(function(section, si) {
      var accent = section.accent || accentColors[si % accentColors.length];
      var card = el('div', 'section-card accent-' + accent + (section.open !== false ? ' open' : ''));
      card.style.animationDelay = (si * 0.08) + 's';

      // Header
      var header = el('div', 'section-header');
      header.appendChild(el('div', 'section-icon', section.icon || '📘'));
      var titleGroup = el('div', 'section-title-group');
      titleGroup.appendChild(el('div', 'section-title', section.title));
      if (section.subtitle) titleGroup.appendChild(el('div', 'section-subtitle', section.subtitle));
      header.appendChild(titleGroup);
      header.appendChild(el('div', 'section-toggle', '▾'));
      card.appendChild(header);

      // Toggle
      header.addEventListener('click', function() {
        card.classList.toggle('open');
      });

      // Body
      var body = el('div', 'section-body');
      (section.components || []).forEach(function(comp) {
        var renderer = renderers[comp.type];
        if (renderer) {
          body.appendChild(renderer(comp, section.id));
        } else {
          body.appendChild(el('p', null, '[Unknown component: ' + comp.type + ']'));
        }
      });
      card.appendChild(body);
      shell.appendChild(card);
    });

    root.appendChild(shell);

    // Initialize progress
    updateProgress();
  }

  // ── Init ─────────────────────────────────────────────
  window.LessonEngine = { render: renderLesson };

  // Auto-render if data is available
  if (window.LESSON_DATA) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() { renderLesson(window.LESSON_DATA); });
    } else {
      renderLesson(window.LESSON_DATA);
    }
  }
})();
