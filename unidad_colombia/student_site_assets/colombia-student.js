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

  /** Optional cloud row in activity_completions when signed in (ESM; no-op if import fails). */
  function tryRecordActivityCloudCompletion(courseKey, activityId, meta) {
    var script = document.querySelector('script[src*="colombia-student.js"]');
    var src = script && script.getAttribute('src');
    if (!src) return;
    var modUrl = src.replace(/\/colombia-student\.js(\?[^#]*)?$/i, '/js/activityCompletionsSync.js$1');
    if (modUrl === src) return;
    import(modUrl).then(function (m) {
      if (typeof m.recordActivityCompletionIfSignedIn === 'function') {
        m.recordActivityCompletionIfSignedIn(courseKey, activityId, meta || {});
      }
    }).catch(function () {});
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
        span.setAttribute('role', 'button');
        span.setAttribute('aria-label', word + ': show translation and play audio');
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

  function sectionIsTresP(section) {
    return !!(section.title && String(section.title).indexOf('Las 3 P') !== -1);
  }

  function isHubActivityRoute(route) {
    var r = String(route || '');
    return r.indexOf('activity.html') !== -1;
  }

  function hubPracticeLinkLabel(card) {
    if (card.summaryPracticeLabel) {
      return card.summaryPracticeLabel;
    }
    if (card.practiceLinkLabel) {
      return card.practiceLinkLabel;
    }
    var r = String(card.route || '');
    if (r.indexOf('Colombia_Vocab_Review') !== -1) {
      return 'Open game suite';
    }
    if (r.indexOf('podcast') !== -1) {
      return 'Open episode';
    }
    if (r.indexOf('listening') !== -1) {
      return 'Open listening';
    }
    if (isHubActivityRoute(r)) {
      return 'Summary and practice';
    }
    return 'Open practice';
  }

  function renderTresPHubTracker(site, sectionWrap) {
    if (!window.ColombiaProgress) {
      return;
    }
    var ck = site.courseKey || 'sp1';
    var items = [
      { key: 'productos', activityId: ck + '-3p-productos', label: 'I explored Productos', stamp: '🎨' },
      { key: 'practicas', activityId: ck + '-3p-practicas', label: 'I explored Prácticas', stamp: '🤝' },
      { key: 'perspectivas', activityId: ck + '-3p-perspectivas', label: 'I explored Perspectivas', stamp: '💡' }
    ];
    var progress = ColombiaProgress.getTresPChecklist(ck);
    var checked = progress.checked || {};
    var nCheck = items.filter(function (it) {
      return checked[it.key];
    }).length;

    var box = el('div', 'tres-p-hub-tracker');
    var progLine = el('p', 'tres-p-hub-prog', nCheck + '/3 explored');
    box.appendChild(progLine);

    var checklist = el('div', 'tres-p-checklist');
    items.forEach(function (it) {
      var row = el('label', 'tres-p-check-row');
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'tres-p-cb';
      cb.checked = !!checked[it.key];
      cb.addEventListener('change', function () {
        ColombiaProgress.setTresPChecklistItem(ck, it.key, cb.checked);
        var o = ColombiaProgress.getTresPChecklist(ck);
        var n = items.filter(function (x) {
          return o.checked[x.key];
        }).length;
        progLine.textContent = n + '/3 explored';
      });
      row.appendChild(cb);
      row.appendChild(document.createTextNode(' '));
      row.appendChild(el('span', null, it.label));
      checklist.appendChild(row);
    });
    box.appendChild(checklist);

    var stampRow = el('div', 'tres-p-stamps');
    stampRow.appendChild(el('span', 'tres-p-stamps-label', 'Visit stamps: '));
    items.forEach(function (it) {
      var on = ColombiaProgress.hasExploredActivity(ck, it.activityId);
      var s = el(
        'span',
        'tres-p-stamp' + (on ? ' tres-p-stamp-on' : ' tres-p-stamp-off'),
        on ? it.stamp : '○'
      );
      s.setAttribute('title', it.label.replace(/^I explored /, ''));
      stampRow.appendChild(s);
    });
    box.appendChild(stampRow);

    var refl = el('details', 'tres-p-reflect-details');
    var summ = el('summary', 'tres-p-reflect-summary', 'Quick reflections (saved on this device)');
    refl.appendChild(summ);
    var reflWrap = el('div', 'tres-p-reflect-wrap');
    var reflectData = ColombiaProgress.getTresPReflections(ck);
    var reflectFields = [
      { key: 'productos', label: 'Productos — one takeaway' },
      { key: 'practicas', label: 'Prácticas — one example' },
      { key: 'perspectivas', label: 'Perspectivas — one value or belief' }
    ];
    reflectFields.forEach(function (rf) {
      reflWrap.appendChild(el('label', 'tres-p-reflect-label', rf.label));
      var ta = document.createElement('textarea');
      ta.className = 'tres-p-reflect-ta';
      ta.rows = 2;
      ta.value = reflectData[rf.key] || '';
      ta.addEventListener('change', function () {
        ColombiaProgress.setTresPReflection(ck, rf.key, ta.value);
      });
      reflWrap.appendChild(ta);
    });
    var saveBtn = el('button', 'secondary-btn tres-p-reflect-save', 'Save reflections');
    saveBtn.type = 'button';
    saveBtn.addEventListener('click', function () {
      reflectFields.forEach(function (rf, i) {
        var nodes = reflWrap.querySelectorAll('textarea.tres-p-reflect-ta');
        var node = nodes[i];
        if (node) {
          ColombiaProgress.setTresPReflection(ck, rf.key, node.value);
        }
      });
      saveBtn.textContent = 'Saved ✓';
      setTimeout(function () {
        saveBtn.textContent = 'Save reflections';
      }, 1600);
    });
    reflWrap.appendChild(saveBtn);
    refl.appendChild(reflWrap);
    box.appendChild(refl);

    sectionWrap.appendChild(box);
  }

  function setHero(site, activity) {
    if (byId('eyebrow')) {
      byId('eyebrow').textContent = activity ? first(activity.kindLabel, 'Student Activity') : first(site.eyebrow, 'Student Site');
    }
    if (byId('heroTitle')) {
      byId('heroTitle').textContent = activity ? activity.title : site.title;
    }
    if (byId('heroSubtitle')) {
      var hs = byId('heroSubtitle');
      if (activity) {
        hs.textContent = first(activity.description, site.subtitle);
      } else if (site.subtitleLines && site.subtitleLines.length) {
        hs.innerHTML = '';
        var ul = el('ul', 'hero-unit-objectives');
        site.subtitleLines.forEach(function (line) {
          if (line && String(line).trim()) {
            ul.appendChild(el('li', null, '🎯 ' + String(line).trim()));
          }
        });
        hs.appendChild(ul);
      } else {
        hs.textContent = site.subtitle;
      }
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

  /** @returns {string|null} activity id from e.g. activity.html?activity=foo */
  function activityIdFromHubRoute(route) {
    if (!route || typeof route !== 'string') {
      return null;
    }
    var q = route.indexOf('?');
    if (q < 0) {
      return null;
    }
    try {
      return new URLSearchParams(route.slice(q + 1)).get('activity');
    } catch (err) {
      return null;
    }
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
      var pills = (site.overviewMeta || []).slice();
      if (window.ColombiaProgress) {
        var ck = site.courseKey || 'sp1';
        pills.push(
          ColombiaProgress.getCompletedLessonDays(ck).length + '/' + (site.totalUnitLessonDays || 14) + ' lesson days'
        );
        pills.push(
          ColombiaProgress.getExploredActivityCount(ck) + '/' + ColombiaProgress.countHubCards(site) + ' activities opened'
        );
      }
      renderMiniMeta(byId('overviewMeta'), pills);
    }

    var mount = byId('hubSections');
    if (!mount) {
      return;
    }
    mount.innerHTML = '';

    if (site.roadmap && site.roadmap.enabled) {
      var road = site.roadmap;
      var rDay = parseInt(String(road.day), 10);
      var rCourse = road.courseKey || site.courseKey || 'sp1';
      var hasCtaHref = !!(road.ctaHref && String(road.ctaHref).trim());
      var ctaLessonNum = parseInt(String(road.ctaLessonDay != null ? road.ctaLessonDay : ''), 10);
      var hasCtaLessonDay = !isNaN(ctaLessonNum) && ctaLessonNum > 0;
      var hasDay = !isNaN(rDay) && rDay > 0;
      if (hasCtaHref || hasDay || hasCtaLessonDay) {
        var rb = el('section', 'roadmap-hub-banner');
        var rInner = el('div', 'roadmap-hub-banner-inner');
        rInner.appendChild(el('h2', 'roadmap-hub-title', "Today's path"));
        var rObjs = road.objectives;
        if (rObjs && rObjs.length) {
          var rUl = el('ul', 'roadmap-hub-objectives');
          rObjs.forEach(function (t) {
            rUl.appendChild(el('li', null, t));
          });
          rInner.appendChild(rUl);
        }
        var ctaLabel = road.ctaLabel && String(road.ctaLabel).trim()
          ? String(road.ctaLabel).trim()
          : 'Vamos!/Get started';
        var ctaHref;
        if (hasCtaLessonDay) {
          ctaHref = 'lessons/lesson.html?day=' + encodeURIComponent(String(ctaLessonNum));
        } else if (hasCtaHref) {
          ctaHref = String(road.ctaHref).trim();
        } else {
          ctaHref = 'daily-roadmap.html?day=' + encodeURIComponent(String(rDay)) + '&course=' + encodeURIComponent(rCourse);
        }
        var rA = el('a', 'primary-btn roadmap-hub-cta', ctaLabel);
        rA.href = ctaHref;
        rInner.appendChild(rA);
        rb.appendChild(rInner);
        mount.appendChild(rb);
      }
    }

    site.sections.forEach(function (section) {
      if (section.hidden) {
        return;
      }
      var wrap = el('section', 'section-wrap');
      if (section.hubAnchorId) {
        wrap.id = section.hubAnchorId;
      }
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

      if (sectionIsTresP(section)) {
        renderTresPHubTracker(site, wrap);
      }

      var grid = el('div', 'section-grid');
      section.cards.forEach(function (card) {
        if (card.hidden) {
          return;
        }
        var locked = isLocked(card);
        var showHubPills = card.showHubPills === true;

        if (locked) {
          // Render as a non-clickable locked card
          var div = el('div', 'activity-card locked-card');
          var lockIcon = el('div', 'lock-icon', '🔒');
          var iconNode = el('div', 'card-icon', card.icon || '📘');
          var title = el('h4', 'card-title', card.title);
          var lockDateEl = el('span', 'lock-date', 'Available ' + formatReleaseDate(card.releaseDate));
          var meta = el('div', 'card-meta');
          if (showHubPills) {
            [card.kindLabel, card.dayLabel].forEach(function (value) {
              if (value) {
                meta.appendChild(el('span', 'meta-pill', value));
              }
            });
          }
          div.appendChild(lockIcon);
          div.appendChild(iconNode);
          div.appendChild(title);
          div.appendChild(lockDateEl);
          div.appendChild(meta);
          grid.appendChild(div);
        } else {
          var lessonHref = card.lessonHref;
          if (!lessonHref && card.lessonDay !== undefined && card.lessonDay !== null && String(card.lessonDay).trim() !== '') {
            lessonHref = 'lessons/lesson.html?day=' + parseInt(String(card.lessonDay), 10);
          }

          var wrap = el('div', 'activity-card-wrap');
          var link = el('a', 'activity-card');
          var primaryHref = lessonHref || card.route;
          link.href = primaryHref;
          var badgeClass = card.status === 'New' ? 'badge-new' : card.status === 'Study' ? 'badge-study' : 'badge-ready';
          var badge = el('span', 'card-badge ' + badgeClass, card.status || 'Ready');
          var cardIcon = el('div', 'card-icon', card.icon || '📘');
          var cardTitle = el('h4', 'card-title', card.title);
          var cardDesc = el('p', 'card-desc', card.description);
          var cardMeta = el('div', 'card-meta');
          if (showHubPills) {
            [card.kindLabel, card.minutes ? card.minutes + ' min' : null, card.dayLabel].forEach(function (value) {
              if (value) {
                cardMeta.appendChild(el('span', 'meta-pill', value));
              }
            });
            link.appendChild(badge);
          }
          var ckHub = site.courseKey || 'sp1';
          var hubActId = activityIdFromHubRoute(card.route);
          if (window.ColombiaProgress && hubActId && ColombiaProgress.isActivityPracticeDone(ckHub, hubActId)) {
            cardMeta.appendChild(el('span', 'meta-pill meta-pill-done', 'Done'));
          }
          link.appendChild(cardIcon);
          if (card.tier === 'l2') {
            link.appendChild(el('span', 'card-tier-badge card-tier-l2', 'Language learner'));
          } else if (card.tier === 'heritage') {
            link.appendChild(el('span', 'card-tier-badge card-tier-heritage', 'Heritage track'));
          }
          link.appendChild(cardTitle);
          link.appendChild(cardDesc);
          link.appendChild(cardMeta);
          wrap.appendChild(link);
          var actionsRow = el('div', 'card-actions-row');
          var practiceA = el('a', 'card-action-link card-practice-link', hubPracticeLinkLabel(card));
          practiceA.href = card.route;
          actionsRow.appendChild(practiceA);
          if (card.youtubeWatchUrl && String(card.youtubeWatchUrl).trim()) {
            actionsRow.appendChild(el('span', 'card-action-sep', '·'));
            var ytA = el('a', 'card-action-link card-youtube-link', 'YouTube');
            ytA.href = String(card.youtubeWatchUrl).trim();
            ytA.target = '_blank';
            ytA.rel = 'noopener noreferrer';
            actionsRow.appendChild(ytA);
          }
          wrap.appendChild(actionsRow);
          grid.appendChild(wrap);
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

  function appendTopicSummarySection(activity, parent) {
    if (!parent || !activity) {
      return;
    }
    var paras = activity.summaryParagraphs;
    var hasParas = Array.isArray(paras) && paras.some(function (p) { return p && String(p).trim(); });
    var hasTopic = activity.topicSummary && String(activity.topicSummary).trim();
    var hasMnemo = activity.summaryMnemonics && String(activity.summaryMnemonics).trim();
    if (!hasParas && !hasTopic && !hasMnemo) {
      return;
    }
    var box = el('div', 'topic-summary-box');
    box.appendChild(el('h3', 'topic-summary-heading', 'Summary'));
    if (hasParas) {
      paras.forEach(function (p) {
        if (p && String(p).trim()) {
          box.appendChild(el('p', 'topic-summary-p', String(p).trim()));
        }
      });
    } else if (hasTopic) {
      box.appendChild(el('p', 'topic-summary-p', String(activity.topicSummary).trim()));
    }
    if (hasMnemo) {
      var m = el('div', 'topic-summary-mnemonics');
      m.appendChild(el('strong', null, 'Mnemonics / steps: '));
      m.appendChild(document.createTextNode(String(activity.summaryMnemonics).trim()));
      box.appendChild(m);
    }
    parent.appendChild(box);
  }

  var FLEX_ANSWER_MIN_LEN = 4;

  /** @param {{ strict?: boolean }} opts strict=true or question.strictMatch → exact only */
  function answerMatches(value, answer, opts) {
    opts = opts || {};
    var strict = opts.strict === true;
    var normalizedValue = normalize(value);
    var candidates = Array.isArray(answer) ? answer : [answer];
    for (var i = 0; i < candidates.length; i++) {
      var na = normalize(candidates[i]);
      if (!na) continue;
      if (normalizedValue === na) return true;
      if (!strict && na.length >= FLEX_ANSWER_MIN_LEN && normalizedValue.indexOf(na) !== -1) {
        return true;
      }
    }
    return false;
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
        correct = answerMatches(userValue, question.answer, { strict: question.strictMatch === true });
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

    appendTopicSummarySection(activity, card);

    var courseKey = options.courseKey || (window.unitSite && window.unitSite.courseKey) || 'sp1';
    var activityId = options.activityId || '';
    var persistEnabled = !!(window.ColombiaProgress && activityId && activity.questions && activity.questions.length);

    var form = el('form', 'practice-form');
    activity.questions.forEach(function (question, index) {
      var block = el('div', 'question-block');
      var title = el('div', 'question-title', (index + 1) + '. ' + question.prompt);
      block.appendChild(title);
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

    var debounceDraft = null;
    function readFormDraftMap() {
      var m = {};
      activity.questions.forEach(function (q, index) {
        if (q.type === 'mc') {
          var c = form.querySelector('input[name="q' + index + '"]:checked');
          if (c) m['q' + index] = c.value;
        } else {
          var inp = form.querySelector('[name="q' + index + '"]');
          if (inp) m['q' + index] = inp.value;
        }
      });
      return m;
    }
    function saveActivityDraftNow() {
      if (!persistEnabled) return;
      try {
        ColombiaProgress.setActivityFormDraft(courseKey, activityId, readFormDraftMap());
      } catch (e) { /* ignore */ }
    }
    function scheduleActivityDraft() {
      if (!persistEnabled) return;
      clearTimeout(debounceDraft);
      debounceDraft = setTimeout(saveActivityDraftNow, 300);
    }
    if (persistEnabled) {
      var loaded = ColombiaProgress.getActivityFormDraft(courseKey, activityId);
      activity.questions.forEach(function (q, index) {
        var key = 'q' + index;
        if (loaded[key] == null || loaded[key] === '') return;
        if (q.type === 'mc') {
          var radios = form.querySelectorAll('input[name="q' + index + '"]');
          for (var ri = 0; ri < radios.length; ri++) {
            radios[ri].checked = radios[ri].value === String(loaded[key]);
          }
        } else {
          var ti = form.querySelector('[name="q' + index + '"]');
          if (ti) ti.value = String(loaded[key]);
        }
      });
      form.addEventListener('input', scheduleActivityDraft);
      form.addEventListener('change', scheduleActivityDraft);
      window.addEventListener('pagehide', saveActivityDraftNow);
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') saveActivityDraftNow();
      });
    }

    var buttonRow = el('div', 'action-group');
    var submit = el('button', 'primary-btn', activity.submitLabel || 'Check Answers');
    submit.type = 'submit';
    var reset = el('button', 'secondary-btn', 'Try Again');
    reset.type = 'button';
    reset.addEventListener('click', function () {
      form.reset();
      scoreNode.textContent = '--';
      feedbackList.innerHTML = '';
      saveActivityDraftNow();
    });
    buttonRow.appendChild(submit);
    buttonRow.appendChild(reset);
    form.appendChild(buttonRow);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      saveActivityDraftNow();
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
      var threshold = typeof activity.doneThreshold === 'number' ? activity.doneThreshold : 1;
      if (persistEnabled && results.length && correctCount / results.length >= threshold) {
        ColombiaProgress.markActivityPracticeDone(courseKey, activityId, { score: correctCount, total: results.length });
      }
    });

    card.appendChild(form);
    left.appendChild(card);
    layout.appendChild(left);
    layout.appendChild(right);
    target.appendChild(layout);
  }

  function renderReading(target, activity, persistOpts) {
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

    // Audio controls — full player if pre-generated MP3 exists, Web Speech fallback otherwise
    if ((activity.passage || []).length) {
      var controls = el('div', 'reading-controls');

      if (activity.audioUrl) {
        // ── Full player: −10s | Play/Pause | +10s ─────────────────────────
        var audioEl = new Audio(activity.audioUrl);
        var player  = el('div', 'audio-player');

        var btnBack  = el('button', 'ap-btn ap-skip', '');
        btnBack.type = 'button';
        btnBack.title = 'Back 10 seconds';
        btnBack.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/><text x="7.5" y="17" font-size="6" font-weight="700" stroke="none" fill="currentColor">10</text></svg>';

        var btnPlay  = el('button', 'ap-btn ap-play', '');
        btnPlay.type = 'button';
        btnPlay.title = 'Play';
        btnPlay.innerHTML = '<svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg><svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="3" width="4" height="18"/><rect x="14" y="3" width="4" height="18"/></svg>';

        var btnFwd   = el('button', 'ap-btn ap-skip', '');
        btnFwd.type  = 'button';
        btnFwd.title = 'Forward 10 seconds';
        btnFwd.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.49-3.51"/><text x="7.5" y="17" font-size="6" font-weight="700" stroke="none" fill="currentColor">10</text></svg>';

        var progWrap = el('div', 'ap-progress-wrap');
        var progBar  = el('div', 'ap-progress-bar');
        var progFill = el('div', 'ap-progress-fill');
        progBar.appendChild(progFill);
        progWrap.appendChild(progBar);

        var timeEl   = el('span', 'ap-time', '0:00');

        function setPlaying(playing) {
          btnPlay.querySelector('.icon-play').style.display  = playing ? 'none'  : '';
          btnPlay.querySelector('.icon-pause').style.display = playing ? ''      : 'none';
          btnPlay.title = playing ? 'Pause' : 'Play';
          btnPlay.classList.toggle('active', playing);
        }

        function fmtTime(s) {
          var m = Math.floor(s / 60);
          var sec = Math.floor(s % 60);
          return m + ':' + (sec < 10 ? '0' : '') + sec;
        }

        audioEl.addEventListener('timeupdate', function () {
          if (!audioEl.duration) { return; }
          var pct = audioEl.currentTime / audioEl.duration * 100;
          progFill.style.width = pct + '%';
          timeEl.textContent = fmtTime(audioEl.currentTime) + ' / ' + fmtTime(audioEl.duration);
        });
        audioEl.addEventListener('ended', function () { setPlaying(false); });
        audioEl.addEventListener('error', function () { setPlaying(false); });

        btnPlay.addEventListener('click', function () {
          if (audioEl.paused) { audioEl.play(); setPlaying(true); }
          else                { audioEl.pause(); setPlaying(false); }
        });
        btnBack.addEventListener('click', function () {
          audioEl.currentTime = Math.max(0, audioEl.currentTime - 10);
        });
        btnFwd.addEventListener('click', function () {
          audioEl.currentTime = Math.min(audioEl.duration || 0, audioEl.currentTime + 10);
        });

        // Click on progress bar to seek
        progBar.addEventListener('click', function (e) {
          if (!audioEl.duration) { return; }
          var rect = progBar.getBoundingClientRect();
          audioEl.currentTime = ((e.clientX - rect.left) / rect.width) * audioEl.duration;
        });

        player.appendChild(btnBack);
        player.appendChild(btnPlay);
        player.appendChild(btnFwd);
        player.appendChild(progWrap);
        player.appendChild(timeEl);
        controls.appendChild(player);

      } else if (window.speechSynthesis) {
        // ── Fallback: Web Speech (no seek controls) ────────────────────────
        var fullText  = activity.passage.join(' ');
        var ttsActive = false;
        var listenBtn = el('button', 'tts-btn', '🔊 Listen');
        listenBtn.type = 'button';
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
        controls.appendChild(listenBtn);
      }

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
    renderPractice(target, activity, Object.assign({}, persistOpts || {}, { embeddedHeader: true, practiceHeading: 'Comprehension Check' }));
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
      appendTopicSummarySection(activity, headerCard);
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

        var correct = answerMatches(userVal, item.answer, { strict: item.strictMatch === true });
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

  function renderListening(target, activity, persistOpts) {
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
      renderPractice(target, activity, Object.assign({}, persistOpts || {}, { embeddedHeader: true, practiceHeading: 'Comprehension Check' }));
    }
  }

  function renderWordOrder(target, activity) {
    var layout = el('div', 'activity-layout');
    var left   = el('div');
    var right  = el('aside', 'result-card');

    // right panel score
    right.appendChild(el('h3', null, 'Check Your Work'));
    var scoreNode = el('div', 'score', '--');
    scoreNode.id = 'woScore';
    right.appendChild(scoreNode);
    right.appendChild(el('p', null, 'Complete all items and submit to see your score.'));

    var card = el('section', 'content-card');

    // header
    var header = el('div', 'activity-header');
    var hw = el('div');
    hw.appendChild(el('h2', null, activity.title));
    hw.appendChild(el('p', null, activity.instructions || 'Listen, then tap the words in the correct order.'));
    header.appendChild(hw);
    var meta = el('div', 'mini-meta');
    [activity.dayLabel, activity.kindLabel, activity.minutes ? activity.minutes + ' min' : null].forEach(function(item) {
      if (item) meta.appendChild(el('span', 'meta-pill', item));
    });
    header.appendChild(meta);
    card.appendChild(header);

    // items
    var itemResults = [];
    var form = el('div', 'practice-form');

    (activity.items || []).forEach(function(item, idx) {
      var wrap = el('div', 'wo-item');
      wrap.appendChild(el('div', 'wo-item-num', (idx + 1) + '. ' + (item.prompt || 'Arrange the words:')));

      // audio button
      if (item.audioUrl) {
        var audioEl = new Audio(item.audioUrl);
        var btn = el('button', 'wo-audio-btn', '🔊 Play');
        btn.type = 'button';
        audioEl.addEventListener('ended', function() {
          btn.classList.remove('playing');
          btn.textContent = '🔊 Play';
        });
        btn.addEventListener('click', function() {
          if (!audioEl.paused) {
            audioEl.pause(); audioEl.currentTime = 0;
            btn.classList.remove('playing');
            btn.textContent = '🔊 Play';
          } else {
            audioEl.play();
            btn.classList.add('playing');
            btn.textContent = '⏹ Stop';
          }
        });
        wrap.appendChild(btn);
      }

      // answer zone
      var answerZone = el('div', 'wo-answer-zone');
      wrap.appendChild(answerZone);

      // word bank — shuffle the words
      var shuffled = item.words.slice().sort(function() { return Math.random() - 0.5; });
      var bank = el('div', 'wo-bank');
      var placed = [];   // tiles currently in answer zone

      shuffled.forEach(function(word) {
        var tile = el('div', 'wo-tile', word);
        tile._word = word;
        tile._inZone = false;

        tile.addEventListener('click', function() {
          if (!tile._inZone) {
            // move from bank to zone
            tile._inZone = true;
            tile.classList.add('placed');
            bank.removeChild(tile);
            answerZone.appendChild(tile);
            placed.push(tile);
          } else {
            // move back to bank
            tile._inZone = false;
            tile.classList.remove('placed');
            answerZone.removeChild(tile);
            bank.appendChild(tile);
            placed.splice(placed.indexOf(tile), 1);
          }
        });
        bank.appendChild(tile);
      });

      wrap.appendChild(bank);

      // translation reveal (hidden until checked)
      var transDiv = el('div', 'wo-translation', '');
      wrap.appendChild(transDiv);

      // feedback
      var feedDiv = el('div', 'wo-feedback', '');
      wrap.appendChild(feedDiv);

      itemResults.push({ answerZone: answerZone, placed: placed, correct: item.answer, transDiv: transDiv, translation: item.translation || '', feedDiv: feedDiv });
      form.appendChild(wrap);
    });

    card.appendChild(form);

    // submit row
    var actionRow = el('div', 'action-group');
    var submitBtn = el('button', 'btn-primary', 'Check Answers');
    submitBtn.type = 'button';
    submitBtn.addEventListener('click', function() {
      var total = itemResults.length;
      var correct = 0;
      itemResults.forEach(function(r) {
        // get current words in answer zone in order
        var given = Array.from(r.answerZone.querySelectorAll('.wo-tile')).map(function(t) { return t._word; });
        var isCorrect = given.length === r.correct.length && given.every(function(w, i) { return w === r.correct[i]; });
        if (isCorrect) {
          correct++;
          r.answerZone.classList.add('correct-zone');
          r.answerZone.classList.remove('wrong-zone');
          r.feedDiv.textContent = '✓ Correct!';
          r.feedDiv.className = 'wo-feedback correct';
          Array.from(r.answerZone.querySelectorAll('.wo-tile')).forEach(function(t) { t.classList.add('correct-tile'); });
        } else {
          r.answerZone.classList.add('wrong-zone');
          r.answerZone.classList.remove('correct-zone');
          r.feedDiv.textContent = '✗ Try again — answer: ' + r.correct.join(' ');
          r.feedDiv.className = 'wo-feedback wrong';
          Array.from(r.answerZone.querySelectorAll('.wo-tile')).forEach(function(t) { t.classList.add('wrong-tile'); });
        }
        if (r.translation) r.transDiv.textContent = r.translation;
      });
      scoreNode.textContent = correct + ' / ' + total;
    });
    actionRow.appendChild(submitBtn);

    var resetBtn = el('button', 'btn-secondary', 'Reset');
    resetBtn.type = 'button';
    resetBtn.addEventListener('click', function() {
      window.location.reload();
    });
    actionRow.appendChild(resetBtn);
    card.appendChild(actionRow);

    left.appendChild(card);
    layout.appendChild(left);
    layout.appendChild(right);
    target.appendChild(layout);
  }

  function renderPodcast(target, activity, persistOpts) {
    var wrapper = el('div');
    wrapper.style.marginBottom = '18px';
    var card = el('section', 'content-card');

    // header
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

    var embedWrap = el('div', 'podcast-embed');
    if (activity.youtubeId && String(activity.youtubeId).trim()) {
      var videoWrap = el('div', 'video-wrap');
      var ytFrame = document.createElement('iframe');
      var ytSrc = 'https://www.youtube-nocookie.com/embed/' + String(activity.youtubeId).trim();
      if (activity.youtubeStartTime) {
        ytSrc += '?start=' + encodeURIComponent(String(activity.youtubeStartTime));
      }
      ytFrame.src = ytSrc;
      ytFrame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      ytFrame.allowFullscreen = true;
      ytFrame.setAttribute('loading', 'lazy');
      ytFrame.style.borderRadius = '12px';
      videoWrap.appendChild(ytFrame);
      embedWrap.appendChild(videoWrap);
    } else {
      var iframe = document.createElement('iframe');
      var embedBase = activity.spotifyId
        ? 'https://open.spotify.com/embed/episode/' + activity.spotifyId
        : 'https://open.spotify.com/embed/show/' + (activity.spotifyShowId || '2uDEXRSkpRdCmZUw8qt5fh');
      iframe.src = embedBase + '?utm_source=generator&theme=0';
      iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
      iframe.setAttribute('loading', 'lazy');
      iframe.style.borderRadius = '12px';
      embedWrap.appendChild(iframe);
    }
    card.appendChild(embedWrap);

    var ytOutHref = activity.youtubeWatchUrl && String(activity.youtubeWatchUrl).trim()
      ? String(activity.youtubeWatchUrl).trim()
      : (activity.youtubeId && String(activity.youtubeId).trim()
        ? 'https://www.youtube.com/watch?v=' + encodeURIComponent(String(activity.youtubeId).trim())
        : '');
    if (ytOutHref) {
      var ytOut = el('p', 'podcast-youtube-outlink');
      var ytA = el('a', 'primary-btn podcast-youtube-btn', 'Open on YouTube');
      ytA.href = ytOutHref;
      ytA.target = '_blank';
      ytA.rel = 'noopener noreferrer';
      ytOut.appendChild(ytA);
      card.appendChild(ytOut);
    }

    // podcast metadata
    if (activity.podcastName || activity.episodeNumber) {
      var pmeta = el('div', 'podcast-meta');
      if (activity.podcastName) pmeta.appendChild(el('span', null, '🎙️ ' + activity.podcastName));
      if (activity.episodeNumber) pmeta.appendChild(el('span', null, '📋 Episode ' + activity.episodeNumber));
      if (activity.level) pmeta.appendChild(el('span', null, '📊 ' + activity.level));
      card.appendChild(pmeta);
    }

    // listening tip
    if (activity.tip) {
      var tipDiv = el('div', 'podcast-tip');
      tipDiv.innerHTML = '<strong>Tip:</strong> ' + activity.tip;
      card.appendChild(tipDiv);
    }

    wrapper.appendChild(card);
    target.appendChild(wrapper);

    // optional comprehension questions
    if (activity.questions && activity.questions.length) {
      renderPractice(target, activity, Object.assign({}, persistOpts || {}, { embeddedHeader: true, practiceHeading: activity.resultTitle || 'Comprehension Check' }));
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
    if (window.ColombiaProgress && site.courseKey && activityId) {
      var actMeta = {
        title: activity.title,
        href: 'activity.html?activity=' + encodeURIComponent(activityId)
      };
      ColombiaProgress.recordActivityVisit(site.courseKey, activityId, actMeta);
      tryRecordActivityCloudCompletion(site.courseKey, activityId, actMeta);
    }
    var practicePersist = { activityId: activityId, courseKey: site.courseKey || 'sp1' };
    if (activity.type === 'reading') {
      renderReading(mount, activity, practicePersist);
    } else if (activity.type === 'resource') {
      renderResource(mount, activity);
    } else if (activity.type === 'drill') {
      renderDrill(mount, activity);
    } else if (activity.type === 'listening') {
      renderListening(mount, activity, practicePersist);
    } else if (activity.type === 'word-order') { renderWordOrder(mount, activity);
    } else if (activity.type === 'podcast') { renderPodcast(mount, activity, practicePersist);
    } else {
      renderPractice(mount, activity, practicePersist);
    }
  }

  function positionWordTipNear(el, tip) {
    var r = el.getBoundingClientRect();
    tip.style.left = window.scrollX + r.left + 14 + 'px';
    tip.style.top = window.scrollY + r.top - 8 + 'px';
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
      if (tip.classList.contains('visible') && e.target.classList && e.target.classList.contains('word-gloss')) {
        tip.style.left = (e.clientX + 14) + 'px';
        tip.style.top = (e.clientY - 40) + 'px';
      }
    });
    document.addEventListener('focusin', function (e) {
      var t = e.target;
      if (t.classList && t.classList.contains('word-gloss')) {
        tip.textContent = t.getAttribute('data-gloss');
        tip.classList.add('visible');
        positionWordTipNear(t, tip);
      }
    });
    document.addEventListener('focusout', function (e) {
      if (e.target.classList && e.target.classList.contains('word-gloss')) {
        tip.classList.remove('visible');
      }
    });
    document.addEventListener('keydown', function (e) {
      var t = e.target;
      if (!t.classList || !t.classList.contains('word-gloss')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        speakSpanish(t.textContent);
        tip.textContent = t.getAttribute('data-gloss');
        tip.classList.add('visible');
        positionWordTipNear(t, tip);
      }
    });
  }

  function renderResumeBar(site) {
    var bar = byId('resumeBar');
    if (!bar || !window.ColombiaProgress) return;
    var course = site.courseKey || 'sp1';
    var resume = ColombiaProgress.getResume(course);
    bar.innerHTML = '';
    if (!resume || !resume.href) {
      bar.hidden = true;
      return;
    }
    bar.hidden = false;
    var inner = el('div', 'resume-bar-inner');
    var a = el('a', 'resume-link primary-btn', 'Resume: ' + (resume.label || 'Continue'));
    a.href = resume.href;
    inner.appendChild(a);
    var done = ColombiaProgress.getCompletedLessonDays(course).length;
    var totalL = site.totalUnitLessonDays || 14;
    var explored = ColombiaProgress.getExploredActivityCount(course);
    var cardTotal = ColombiaProgress.countHubCards(site);
    inner.appendChild(
      el('span', 'resume-progress-hint', done + '/' + totalL + ' lesson days · ' + explored + '/' + cardTotal + ' activities opened')
    );
    bar.appendChild(inner);
  }

  function init() {
    if (!window.unitSite) {
      return;
    }
    initTooltip();
    if (byId('hubSections')) {
      renderHub(window.unitSite);
      renderResumeBar(window.unitSite);
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
