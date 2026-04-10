# Authoring auto-graded questions (`questions` and fill-in-the-blank)

The lesson engine (`lesson-engine.js`) can score short answers and textareas when you supply **`answer`** and/or **`answerKeywords`**. Matching uses the same normalization as elsewhere: lowercase, strip accents, keep letters and digits as words.

## `answer` (phrase match)

- **Single string** or **array of alternates**. Alternates are joined with `|` in the DOM (e.g. `"había una ciudad de oro"` or `["ciudad de oro", "había oro"]`).
- **Non-strict (default):** passes if the normalized student text equals the expected phrase, **or** (if the expected phrase is at least 4 characters) it appears as a **contiguous substring** in the student’s normalized answer.
- **`strictMatch: true`:** only an exact normalized match counts (alternates with `|` still allowed).

## `answerKeywords` (keyword match)

- **Array of strings** or one **pipe-separated** string in JSON (arrays are preferred).
- Each keyword is normalized the same way. Tokens shorter than **3** characters after normalization are **ignored** (so common short words are not used as keywords).
- **`keywordMode`** (optional):
  - **`"all"`** (default): every remaining keyword (length ≥ 3) must appear somewhere in the student’s normalized answer.
  - **`"any"`**: at least one such keyword must appear.

**Pipes in keywords:** keywords are stored as a pipe-separated list. Avoid putting a literal `|` inside a keyword; if you must, use a different delimiter in content or split into separate keywords.

## Combining `answer` and `answerKeywords`

If **both** are set, the item is **correct** if **either** the phrase match **or** the keyword match succeeds (OR).

## Textareas

- **`type: "textarea"`** is only included in **✓ Check Answers** when a question has **`answer`** and/or **`answerKeywords`**.
- Pure open-ended prompts (no `answer` and no `answerKeywords`) are not auto-scored; the **mark complete** button for all-open sections still appears only when there are no graded keys on those items.

## Fill-in-the-blank sentences

On each sentence object, you can set **`answer`**, **`answerKeywords`**, **`keywordMode`**, and **`strictMatch`** the same way as for questions.

- **`answer`**: array index lines up with each `___` blank, or a single string for one blank.
- **`answerKeywords`**: either a single list for the blank(s), or an **array of arrays** (one inner array per blank) when blanks differ.

The **✓ Check** button uses the same combined scoring as questions.
