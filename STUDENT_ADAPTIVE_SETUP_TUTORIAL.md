# How to sign up so the site can save *your* Spanish progress

**For students (about 7th grade)** · *Colombia unit — Metz Spanish site*

---

## The big idea (30 seconds)

This website can remember **your** vocabulary practice and show **your** progress (streak, words due for review, skills you are building).  
Your teacher will ask you to **Sign in with Google** on the hub (usually your **school Google account**). That connects your work to a **safe cloud copy** your teacher can use for class. The site also keeps a **profile** on **this browser** for practice features.

**Important:** Use **only your school Google account**—the email your district gave you (for example **@mcpsva.org**). Personal Gmail or another family account will not work. If you use **profile setup** (optional), type the **same first and last name** your teacher expects.

---

## What you need before you start

1. The **link** your teacher gives you (usually in Google Classroom).  
2. A **Chromebook, laptop, or tablet** with Chrome or another modern browser.  
3. **Two minutes** of quiet time to read and tap the buttons.

---

## Step 1 — Open the student hub

1. Click the link from Classroom (or your teacher’s slide).  
2. You should land on the **student hub** page for Spanish 1 or Spanish 2. It says something like **“¡Conoce a Colombia!”** at the top.

If the page looks broken or blank, tell your teacher—do not try to “fix” it by downloading random apps.

---

## Step 2 — Sign in with Google (cloud progress)

1. On the hub, find **“Save progress to the cloud”** (near the top).  
2. Click **Sign in with Google** and choose the account whose email ends in your **school domain** (your teacher will say it—for example **@mcpsva.org**).  
3. The first time, the page may **refresh once**—that is normal. After that, you should see **Signed in** with your school email.

If you picked the wrong account, you may see a red message asking for your **school Google account**—sign out in Google or use **Sign in with Google** again and pick the right one.

If your teacher has not finished the cloud setup yet, you might see a message about **Sync settings** or **metzSupabasePublicConfig**—tell your teacher.

---

## Step 3 — Optional: set up your Spanish profile (finer control)

**You can skip this if you already signed in with Google**—the hub can create a practice profile from your Google name.

Use this when you want to **pick how you learn Spanish** (heritage vs. class learner) or **type a different display name** than Google shows.

1. On the hub, scroll until you see **“Your progress.”**  
2. If you see **“Set up my Spanish profile,”** click that link.  
   - *Direct link (for teachers to post):*  
     `…/unidad_colombia/student_site_assets/student-profile-setup.html`  
     (On GitHub Pages, the full URL starts with your class site and ends with that path.)

3. On the **“Set up my Spanish profile”** page:  
   - Type your **first and last name** exactly how your teacher expects (for example, `Jordan Smith`).  
   - Choose **one** option for Spanish at home:  
     - **Let the site ask me 5 quick questions** — the site will show a short quiz to suggest the best practice mode for you.  
     - **I am mainly learning Spanish at school** — if Spanish is mostly from class.  
     - **I hear or speak Spanish at home sometimes** — if your family uses Spanish with you.

4. Click **“Save my profile.”**  
5. If you picked **5 quick questions**, answer them honestly. There are no trick questions.  
6. When you see **“Profile saved on this device,”** you are done with setup.

7. Click **“Open Spanish 1 hub”** or **“Open Spanish 2 hub”** to go back.

---

## Step 4 — Check that it worked

1. Go back to the **hub** and scroll to **“Your progress.”**  
2. You should now see things like words **due for review** or a message about practice (once you have practiced).  
3. The first time, some bars might be empty. That is normal until you do some vocabulary practice.

---

## Step 5 — Practice so the site can track you

1. On the hub, open **Flashcards** (or the vocabulary review your teacher assigns).  
2. Use **Know** / **Study** in flashcard mode or answer quiz questions.  
3. The site saves your answers **on this device** and updates your **progress** section when you return to the hub.

---

## “Student ID” — what is it, and do I need to memorize it?

- Inside the browser, the site makes an **internal ID** from your name (a short code).  
- **You do not need to memorize it** for daily use.  
- After setup, the page may show **“For your teacher only: internal ID …”** — your teacher can use that if they are helping you or looking at class data.

The site also remembers **which profile is active** on this device using a small browser setting (`metz-active-student-id`). You never have to edit that yourself.

---

## Shared Chromebooks and multiple students

- If **different students** use the **same** Chromebook **profile** (same login), each person should **set up with their own name** when it is their turn—but **only one person’s progress** can be “active” at a time.  
- **Best:** each student uses **their own** Chromebook login when possible, so profiles do not get mixed up.  
- **Rule of thumb:** same person + same device + **same name you typed at setup** = your progress stays yours.

---

## If something goes wrong

| Problem | What to try |
|--------|-------------|
| “Your progress” still says to set up | Click **Set up my Spanish profile** again and save. Use the **same name** as before if you already set up. |
| Progress looks like someone else’s | Tell your teacher. You may be on a shared login or the wrong name was used at setup. |
| You get a new Chromebook | Do **Step 2** again on the new device (same name). |
| Site says it cannot load or errors in red | Tell your teacher; you may be offline or the link may be wrong. |

---

## For teachers (short version to read aloud)

1. Post the **hub** link in Classroom (students **Sign in with Google** there first).  
2. Optionally post the **profile setup** link for students who need the diagnostic or a different name than Google provides.  
3. Remind them: **school Google account**, and if they use profile setup: **real first and last name**, same spelling every time.  
4. **Teacher dashboard** (`teacher.html`) uses local data on **your** machine; class cloud data is in **Supabase** (SQL Editor / export)—see repo `README.md` launch checklist.

---

## File reference (for you as the teacher)

- **Student-facing setup page:** `unidad_colombia/student_site_assets/student-profile-setup.html`  
- **Logic:** `unidad_colombia/student_site_assets/js/studentProfileSetup.js` (calls `getOrCreateStudent` in `studentManager.js`)  
- **Hub “Your progress” block:** links to setup when no `students` rows exist in IndexedDB  

This tutorial matches that flow end to end.
