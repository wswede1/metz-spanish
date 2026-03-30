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
  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'es-MX';
    utt.rate = 0.88;
    window.speechSynthesis.speak(utt);
  }

  // ── Section State Tracking ───────────────────────────
  var sectionStates = {};
  function markSectionComplete(id) {
    sectionStates[id] = true;
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
      } else if (done === i) {
        step.classList.add('active');
      }
    });
    var label = $('.progress-label');
    if (label) label.textContent = done + '/' + total + ' complete';
    if (done === total && total > 0) {
      showToast('Lesson complete!', 'success');
    }
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
      area.appendChild(iframe);
    } else {
      var ph = el('div', 'video-placeholder');
      ph.appendChild(el('div', 'play-icon', '▶'));
      ph.appendChild(el('div', null, data.placeholder || 'Video will be shown in class'));
      area.appendChild(ph);
    }
    wrap.appendChild(area);
    if (data.instructions) {
      wrap.appendChild(renderCallout({ style: 'info', text: data.instructions }));
    }
    return wrap;
  }

  // ── Questions List ───────────────────────────────────
  function renderQuestions(data, sectionId) {
    var wrap = el('div');
    var list = el('div', 'question-list');
    data.questions.forEach(function(q, i) {
      var item = el('div', 'question-item');
      item.appendChild(html('div', 'question-prompt', q.prompt));
      if (q.type === 'textarea') {
        var ta = document.createElement('textarea');
        ta.className = 'question-input';
        ta.placeholder = q.placeholder || 'Escribe tu respuesta...';
        ta.rows = q.rows || 2;
        item.appendChild(ta);
      } else {
        var inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'question-input';
        inp.placeholder = q.placeholder || 'Escribe tu respuesta...';
        if (q.answer) {
          inp.setAttribute('data-answer', q.answer);
        }
        item.appendChild(inp);
      }
      list.appendChild(item);
    });
    wrap.appendChild(list);

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
          if (normalize(inp.value) === normalize(answer)) {
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
      wrap.appendChild(el('div', null));
      wrap.lastChild.style.marginTop = '14px';
      wrap.lastChild.appendChild(btn);
    }
    return wrap;
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

  // ── Fill-in-the-Blank ────────────────────────────────
  function renderFillBlanks(data, sectionId) {
    var wrap = el('div');

    // Word bank
    if (data.wordBank) {
      var bank = el('div', 'word-bank');
      bank.appendChild(el('div', 'word-bank-label', 'Word Bank'));
      data.wordBank.forEach(function(w) {
        bank.appendChild(el('span', 'word-chip', w));
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
          if (s.answer) inp.setAttribute('data-answer', Array.isArray(s.answer) ? s.answer[i] || s.answer[0] : s.answer);
          sent.appendChild(inp);
        }
      });
      sentWrap.appendChild(sent);
    });
    wrap.appendChild(sentWrap);

    // Check button
    var btn = el('button', 'check-btn btn-green', '✓ Check');
    btn.style.marginTop = '14px';
    btn.addEventListener('click', function() {
      var blanks = $$('.fill-blank', sentWrap);
      var correct = 0;
      blanks.forEach(function(b) {
        var answer = b.getAttribute('data-answer');
        if (!answer) return;
        var answers = answer.split('|').map(function(a) { return normalize(a); });
        if (answers.indexOf(normalize(b.value)) !== -1) {
          b.classList.add('correct');
          b.classList.remove('wrong');
          correct++;
        } else {
          b.classList.add('wrong');
          b.classList.remove('correct');
        }
      });
      var total = blanks.filter(function(b) { return b.getAttribute('data-answer'); }).length;
      if (total > 0) {
        var pct = correct / total;
        showToast(correct + '/' + total, pct >= 0.8 ? 'success' : pct >= 0.5 ? 'partial' : 'retry');
        if (pct >= 0.8) markSectionComplete(sectionId);
      }
      // Mark word chips as used
      $$('.word-chip', wrap).forEach(function(chip) {
        var usedInBlanks = blanks.some(function(b) { return normalize(b.value) === normalize(chip.textContent); });
        chip.classList.toggle('used', usedInBlanks);
      });
    });
    wrap.appendChild(btn);
    return wrap;
  }

  // ── Flip Card Gallery ────────────────────────────────
  function renderFlipGallery(data) {
    var gallery = el('div', 'flip-gallery');
    data.cards.forEach(function(c) {
      var card = el('div', 'flip-card');
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
        if (c.es) speak(c.es);
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
    var sentences = el('div', 'discovery-sentences');
    data.sentences.forEach(function(s) {
      sentences.appendChild(html('div', 'discovery-sentence', s));
    });
    box.appendChild(sentences);
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
  function renderReading(data) {
    var card = el('div', 'reading-card');
    var text = html('div', 'reading-text', data.text);
    // Add click-to-speak on highlighted words
    card.appendChild(text);
    setTimeout(function() {
      $$('.verb-highlight, .gustar-highlight', card).forEach(function(span) {
        span.addEventListener('click', function() { speak(span.textContent); });
      });
    }, 0);
    if (data.instructions) {
      var inst = el('p', null, data.instructions);
      inst.style.cssText = 'font-size:0.82rem;color:var(--text-muted);margin-top:10px;font-style:italic';
      card.appendChild(inst);
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
    // Map visual placeholder
    var mapArea = el('div', 'map-area');
    var ph = el('div', 'map-placeholder');
    ph.appendChild(el('div', 'map-icon', '🗺️'));
    ph.appendChild(el('div', null, data.mapHint || 'Use the printed map from class'));
    mapArea.appendChild(ph);
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
    'fill-blanks': renderFillBlanks,
    'flip-gallery': function(d) { return renderFlipGallery(d); },
    discovery: function(d) { return renderDiscovery(d); },
    'conj-table': renderConjTable,
    reading: function(d) { return renderReading(d); },
    'partner-talk': function(d) { return renderPartnerTalk(d); },
    'exit-ticket': renderExitTicket,
    'map-labels': function(d) { return renderMapLabels(d); },
    stations: function(d) { return renderStations(d); },
    'data-table': function(d) { return renderDataTable(d); },
    'vocab-list': function(d) { return renderVocabList(d); },
    'mc-quiz': renderMCQuiz
  };

  // ═══════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════
  function renderLesson(lesson) {
    var root = document.getElementById('lessonRoot');
    if (!root) return;
    root.innerHTML = '';

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
    nav.appendChild(html('a', null, '← Back to Hub'));
    nav.lastChild.href = '../index.html';
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
