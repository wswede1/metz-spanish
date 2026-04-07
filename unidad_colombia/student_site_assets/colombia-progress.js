/* Client-side progress for Colombia student sites (localStorage). */
(function (global) {
  'use strict';

  var PREFIX = 'metz-colombia-';

  function safeGet(key) {
    try {
      return global.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSet(key, val) {
    try {
      global.localStorage.setItem(key, val);
    } catch (e) {}
  }

  function safeJSONParse(s, fallback) {
    if (s == null || s === '') return fallback;
    try {
      return JSON.parse(s);
    } catch (e) {
      return fallback;
    }
  }

  function lessonPrefix(course, day) {
    return PREFIX + course + '-lesson-' + day + '-';
  }

  var ColombiaProgress = {
    PREFIX: PREFIX,

    lessonDraftKey: function (course, day, key) {
      return lessonPrefix(course, day) + key;
    },

    getLessonDraft: function (course, day, key) {
      return safeGet(this.lessonDraftKey(course, day, key)) || '';
    },

    setLessonDraft: function (course, day, key, value) {
      safeSet(this.lessonDraftKey(course, day, key), String(value));
    },

    getLessonSections: function (course, day) {
      var raw = safeGet(this.lessonDraftKey(course, day, 'sections'));
      var obj = safeJSONParse(raw, {});
      return obj && typeof obj === 'object' ? obj : {};
    },

    setLessonSections: function (course, day, map) {
      safeSet(this.lessonDraftKey(course, day, 'sections'), JSON.stringify(map || {}));
    },

    /** Merge { sectionId: true } into stored section completion. */
    mergeLessonSection: function (course, day, sectionId, done) {
      var m = this.getLessonSections(course, day);
      m[sectionId] = !!done;
      this.setLessonSections(course, day, m);
    },

    getLessonRubric: function (course, day, rubricId) {
      var raw = safeGet(this.lessonDraftKey(course, day, 'rubric-' + rubricId));
      return safeJSONParse(raw, null);
    },

    setLessonRubric: function (course, day, rubricId, arr) {
      safeSet(this.lessonDraftKey(course, day, 'rubric-' + rubricId), JSON.stringify(arr));
    },

    recordActivityVisit: function (course, activityId, meta) {
      meta = meta || {};
      var payload = JSON.stringify({
        id: activityId,
        title: meta.title || '',
        href: meta.href || '',
        at: Date.now()
      });
      safeSet(PREFIX + course + '-last-activity', payload);
      var setKey = PREFIX + course + '-activities-explored';
      var raw = safeGet(setKey);
      var setObj = safeJSONParse(raw, {});
      if (!setObj || typeof setObj !== 'object') setObj = {};
      setObj[activityId] = true;
      safeSet(setKey, JSON.stringify(setObj));
    },

    getLastActivity: function (course) {
      var raw = safeGet(PREFIX + course + '-last-activity');
      return safeJSONParse(raw, null);
    },

    recordLessonVisit: function (course, day, meta) {
      meta = meta || {};
      var payload = JSON.stringify({
        day: day,
        title: meta.title || '',
        href: meta.href || '',
        at: Date.now()
      });
      safeSet(PREFIX + course + '-last-lesson', payload);
    },

    getLastLesson: function (course) {
      var raw = safeGet(PREFIX + course + '-last-lesson');
      return safeJSONParse(raw, null);
    },

    /** Prefer the more recent of last activity vs last lesson. */
    getResume: function (course) {
      var a = this.getLastActivity(course);
      var l = this.getLastLesson(course);
      if (!a && !l) return null;
      if (!a) return { type: 'lesson', label: l.title || ('Day ' + l.day), href: l.href, at: l.at };
      if (!l) return { type: 'activity', label: a.title || 'Last activity', href: a.href, at: a.at };
      if ((a.at || 0) >= (l.at || 0)) {
        return { type: 'activity', label: a.title || 'Last activity', href: a.href, at: a.at };
      }
      return { type: 'lesson', label: l.title || ('Day ' + l.day), href: l.href, at: l.at };
    },

    addCompletedLessonDay: function (course, day) {
      var raw = safeGet(PREFIX + course + '-lesson-days-done');
      var arr = safeJSONParse(raw, []);
      if (!Array.isArray(arr)) arr = [];
      if (arr.indexOf(day) === -1) {
        arr.push(day);
        arr.sort();
        safeSet(PREFIX + course + '-lesson-days-done', JSON.stringify(arr));
      }
    },

    getCompletedLessonDays: function (course) {
      var raw = safeGet(PREFIX + course + '-lesson-days-done');
      var arr = safeJSONParse(raw, []);
      return Array.isArray(arr) ? arr : [];
    },

    getExploredActivityCount: function (course) {
      var raw = safeGet(PREFIX + course + '-activities-explored');
      var setObj = safeJSONParse(raw, {});
      if (!setObj || typeof setObj !== 'object') return 0;
      return Object.keys(setObj).length;
    },

    countHubCards: function (site) {
      var n = 0;
      (site.sections || []).forEach(function (sec) {
        if (sec.hidden) return;
        (sec.cards || []).forEach(function (card) {
          if (!card.hidden) n += 1;
        });
      });
      return n;
    },

    /** @returns {{ checked: Record<string, boolean> }} */
    getTresPChecklist: function (course) {
      var raw = safeGet(PREFIX + course + '-tres-p-check');
      var o = safeJSONParse(raw, { checked: {} });
      return o && typeof o === 'object' ? o : { checked: {} };
    },

    setTresPChecklistItem: function (course, key, done) {
      var o = this.getTresPChecklist(course);
      o.checked = o.checked || {};
      o.checked[key] = !!done;
      safeSet(PREFIX + course + '-tres-p-check', JSON.stringify(o));
    },

    hasExploredActivity: function (course, activityId) {
      var raw = safeGet(PREFIX + course + '-activities-explored');
      var setObj = safeJSONParse(raw, {});
      return !!(setObj && setObj[activityId]);
    },

    getTresPReflections: function (course) {
      var raw = safeGet(PREFIX + course + '-tres-p-reflect');
      var o = safeJSONParse(raw, {});
      return {
        productos: typeof o.productos === 'string' ? o.productos : '',
        practicas: typeof o.practicas === 'string' ? o.practicas : '',
        perspectivas: typeof o.perspectivas === 'string' ? o.perspectivas : ''
      };
    },

    setTresPReflection: function (course, key, text) {
      var o = this.getTresPReflections(course);
      if (key === 'productos' || key === 'practicas' || key === 'perspectivas') {
        o[key] = String(text || '');
        safeSet(PREFIX + course + '-tres-p-reflect', JSON.stringify(o));
      }
    },

    activityFormDraftKey: function (course, activityId) {
      return PREFIX + course + '-act-form-' + String(activityId || '');
    },

    getActivityFormDraft: function (course, activityId) {
      var raw = safeGet(this.activityFormDraftKey(course, activityId));
      var o = safeJSONParse(raw, null);
      return o && typeof o === 'object' ? o : {};
    },

    setActivityFormDraft: function (course, activityId, map) {
      safeSet(this.activityFormDraftKey(course, activityId), JSON.stringify(map || {}));
    },

    getActivityPracticeDoneMap: function (course) {
      var raw = safeGet(PREFIX + course + '-act-practice-done');
      var o = safeJSONParse(raw, {});
      return o && typeof o === 'object' ? o : {};
    },

    setActivityPracticeDoneMap: function (course, map) {
      safeSet(PREFIX + course + '-act-practice-done', JSON.stringify(map || {}));
    },

    markActivityPracticeDone: function (course, activityId, meta) {
      var m = this.getActivityPracticeDoneMap(course);
      m[String(activityId)] = meta && typeof meta === 'object' ? { at: Date.now(), score: meta.score, total: meta.total } : { at: Date.now() };
      this.setActivityPracticeDoneMap(course, m);
    },

    isActivityPracticeDone: function (course, activityId) {
      var m = this.getActivityPracticeDoneMap(course);
      return !!m[String(activityId)];
    }
  };

  global.ColombiaProgress = ColombiaProgress;
})(window);
