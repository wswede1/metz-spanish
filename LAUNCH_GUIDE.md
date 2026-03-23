# Launch Guide — Colombia Student Site on GitHub Pages

This guide walks you through publishing your student site so students can access it on their Chromebooks via a URL. No apps, no logins, no installations required.

---

## What students will access

| Class | URL (after setup) |
|-------|-------------------|
| Spanish 1 | `https://YOUR_USERNAME.github.io/YOUR_REPO/span_1/unidad_colombia/` |
| Spanish 2 | `https://YOUR_USERNAME.github.io/YOUR_REPO/span_2/unidad_colombia/` |

Students bookmark the URL and open it in Chrome. Cards that aren't released yet will show as locked.

---

## Step 1 — Create a GitHub account (if you don't have one)

1. Go to **github.com**
2. Click **Sign up**
3. Use a personal or school email — a free account is all you need
4. Verify your email and log in

---

## Step 2 — Create a new repository

1. Once logged in, click the **+** icon (top right) → **New repository**
2. Name it something like `metz-spanish` or `spanish-colombia`
3. Set it to **Public** (required for free GitHub Pages)
4. Leave everything else as defaults — do NOT check "Add a README"
5. Click **Create repository**
6. Copy the URL shown (it will look like `https://github.com/YOUR_USERNAME/YOUR_REPO.git`)

---

## Step 3 — Upload your files (Terminal on Mac)

Open Terminal (search "Terminal" in Spotlight). Then run these commands one at a time.

**Navigate to your project folder:**
```bash
cd ~/Desktop/metz
```

**Initialize git:**
```bash
git init
```

**Stage ONLY the student-facing folders** (this keeps licensed SOMOS materials out of the public repo):
```bash
git add span_1/unidad_colombia
git add span_2/unidad_colombia
git add unidad_colombia/student_site_assets
```

**Double-check what's being committed — look for anything sensitive:**
```bash
git status
```

**Create the first commit:**
```bash
git commit -m "Launch Colombia student site"
```

**Connect to your GitHub repository:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

When prompted, enter your GitHub username and password (or personal access token — see GitHub's docs if you need one).

---

## Step 4 — Enable GitHub Pages

1. Go to your repository on github.com
2. Click **Settings** (the gear icon in the top tabs)
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait about 2 minutes — then visit:
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`

Your site is live. Share the class-specific URLs with students.

---

## Updating the site (releasing new days)

When you're ready to unlock new activity cards:

1. Open the relevant `site-data.js` file in a text editor:
   - Spanish 1: `span_1/unidad_colombia/student_site/site-data.js`
   - Spanish 2: `span_2/unidad_colombia/student_site/site-data.js`

2. Find the card you want to unlock and change the `releaseDate` to today or a past date (or clear it):
   ```js
   releaseDate: ""     // ← unlocked immediately
   releaseDate: "2026-04-01"  // ← unlocks on April 1
   ```

3. Save the file, then run in Terminal:
   ```bash
   cd ~/Desktop/metz
   git add span_1/unidad_colombia/student_site/site-data.js
   git commit -m "Release Day 6 activities"
   git push
   ```

4. The site updates in about **1 minute**. Students just refresh the page.

---

## Chromebook compatibility

All activities are pure HTML/CSS/JavaScript — no plugins, no Flash, no downloads. Students:

1. Open **Chrome** on their Chromebook
2. Go to the URL you share
3. Bookmark it or add it to their Chromebook shelf
4. Works offline for pages already loaded; needs internet to first load

For best results, share the URL in Google Classroom as a link or pinned announcement.

---

## What's safe to push to GitHub

| Folder | Safe to push? |
|--------|---------------|
| `span_1/unidad_colombia/` | ✅ Yes |
| `span_2/unidad_colombia/` | ✅ Yes |
| `unidad_colombia/student_site_assets/` | ✅ Yes |
| `somos/` | ❌ No — licensed content |
| `spain/` | ❌ No — licensed content |
| `coco-bundle/` | ❌ No — licensed content |
| `Ask a Story Resource Pack 2/` | ❌ No — licensed content |

Never run `git add .` or `git add -A` — always add specific folders by name.

---

## Quick reference: Terminal commands you'll use repeatedly

```bash
# Navigate to the project
cd ~/Desktop/metz

# Stage a changed file
git add span_1/unidad_colombia/student_site/site-data.js

# Commit and push
git commit -m "Short description of what changed"
git push
```

That's it. After the initial setup, releasing new content is a 3-line routine.
