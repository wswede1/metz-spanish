# Screenshots and workbook images in lessons

Use this guide to add workbook pages, diagrams, or any image to daily lessons without fragile one-off paths.

## Where to put image files

Store files under the shared assets tree (same area as `colombia-vocab-sp1.js`):

`unidad_colombia/student_site_assets/images/workbook/`

Use subfolders by unit or topic if helpful, for example:

- `workbook/u2l2/page-76.png`
- `workbook/colombia/map-note.png`

The repo includes `workbook/demo.png` (1×1 placeholder) so paths can be tested.

## URL base (Spanish 1 Colombia lessons)

[`lesson.html`](lesson.html) sets:

`window.METZ_LESSON_IMAGE_BASE = '../../../../unidad_colombia/student_site_assets/images/';`

That is resolved **from** `span_1/unidad_colombia/student_site/lessons/lesson.html` when the site is served from the **repository root** (e.g. `python3 -m http.server` from the `metz` folder). If your host mounts the site differently, adjust the base or use absolute `src` URLs.

## Option A — `lesson-figure` component (recommended)

In `sp1-dayXX.js`, add a component inside a section’s `components` array:

```javascript
{
  type: "lesson-figure",
  src: "workbook/u2l2/page-76.png",
  alt: "Workbook activity: Gramática B, item 1",
  caption: "Complete the sentences in your notebook, then check below.",
  answersHtml: "<p><strong>Key:</strong> …</p>",
  exemplarButtonLabel: "Show sample answers"
}
```

| Field | Required | Notes |
|--------|-----------|--------|
| `src` | yes | Path **relative to** `METZ_LESSON_IMAGE_BASE`, or a full `https://` URL, or a root-absolute path starting with `/`. |
| `alt` | strongly recommended | Accessibility; describe what the image shows. |
| `caption` | no | HTML allowed (e.g. `<strong>`, `<code>`). |
| `answersHtml` | no | HTML shown behind a **Show sample answers** toggle (same pattern as question exemplars). |
| `exemplarButtonLabel` | no | Defaults to “Show sample answers”. |
| `loading` | no | Set `"lazy"` to lazy-load large images. |

Styling uses `.lesson-screenshot` and `.lesson-figure-caption` in [`lesson-engine.css`](lesson-engine.css).

## Option B — HTML inside a `callout`

[`renderCallout`](lesson-engine.js) uses `innerHTML` for `text`, so you can embed an image:

```javascript
{
  type: "callout",
  style: "info",
  text:
    '<p>Do the activity below.</p>' +
    '<img class="lesson-screenshot" src="../../../../unidad_colombia/student_site_assets/images/workbook/page-76.png" alt="Workbook p. 76" />' +
    '<p>Check answers with your partner.</p>'
}
```

Use the **full relative path** from `lessons/lesson.html` if you are not using `METZ_LESSON_IMAGE_BASE`. Prefer **Option A** for fewer path mistakes.

## Optional “answers” without `lesson-figure`

- Add a second component: `questions` with `exemplarHtml`, or  
- A second `callout` with `style: "tip"` for a model or key.

## Copyright

Publisher workbook screenshots on a **public** website may require permission or may qualify as fair use depending on amount, purpose, and context. That is a content decision, not enforced in code.

## See also

- Demo section **“Layout demo — workbook screenshots”** on Day 1 ([`sp1-day01.js`](sp1-day01.js)), collapsed by default.
- [`README-lesson-questions.md`](README-lesson-questions.md) for graded `questions` / fill-in behavior.
