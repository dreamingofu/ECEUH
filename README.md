# EE Knowledge Base

A personal academic knowledge base for Electrical Engineering coursework at the **University of Houston**. Built to help future EE students by documenting homework walkthroughs, practice problems, professor ratings, and downloadable study resources — updated in real time each semester.

> Built for the UH EE Discord community. For students, by a student.

---

## Live Site

🔗 [(https://eceuh.com/)](https://eceuh.com/)

---

## What's Inside

### Pages

| Page | File | Description |
|------|------|-------------|
| Home Hub | `index.html` | Course directory and navigation landing page |
| Digital Logic Design | `dld.html` | ECE_3441 — Boolean algebra, gates, K-maps, FSMs |
| Circuits 2 | `circuits2.html` | ECE_2202 — AC analysis, phasors, Bode plots, filters |
| Programming with C | `cprog.html` | ECE_3331 — Pointers, memory, structs, algorithms |
| Professor Ratings | `professors.html` | RateMyProfessors data for all tracked courses |

### Features

- **Topic breakdowns** — each course has unit-by-unit topic cards with progress tracking
- **File library** — downloadable quizzes, past exams, and formula sheets per course
- **Version dropdowns** — multiple versions of the same quiz selectable from one card
- **PDF preview** — inline PDF preview panel with fallback new tab button
- **Professor ratings** — tabbed cards per course showing RMP overall rating, difficulty, and would-take-again %
- **Progress tracker** — semester assignment table with status and scores
- **Quick reference** — cheatsheet sections for key formulas and syntax per course
- **Light / dark mode** — toggle persists across all pages via `localStorage`
- **Vercel Analytics** — visitor and page view tracking

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| HTML / CSS / Vanilla JS | All pages — no framework |
| Vercel | Hosting and auto-deploy |
| GitHub | Version control and source of truth |
| Vercel Analytics | Visitor tracking (`/_vercel/insights/script.js`) |

No npm, no build step, no framework. Just files.

---

## File Structure

```
ee-knowledge-base/
│
├── index.html              # Home hub — course directory
├── dld.html                # Digital Logic Design
├── circuits2.html          # Circuits 2
├── cprog.html              # Programming Apps with C
├── professors.html         # Professor Ratings
│
└── files/
    ├── dld/
    │   ├── quizzes/        # e.g. quiz-01-v1.pdf
    │   ├── exams/          # e.g. midterm-fall2025.pdf
    │   └── formula-sheets/ # e.g. dld-master-formula-sheet.pdf
    ├── circuits2/
    │   ├── quizzes/
    │   ├── exams/
    │   └── formula-sheets/
    └── cprog/
        ├── quizzes/
        ├── exams/
        └── formula-sheets/
```

---

## Current Semester — Spring 2026

### Courses Tracked

| Course | Code | Professor(s) |
|--------|------|-------------|
| Digital Logic Design | ECE_3441 | Dr. Bhavin R. Sheth · Dr. Deepa Ramachandran |
| Circuits 2 | ECE_2202 | Dr. Xiaonan Shan · TBD |
| Programming Apps with C | ECE_3331 | Dr. Biresh Kumar Joardar · TBD |

### Professor Ratings (Spring 2026)

| Professor | Course | Overall | Difficulty | Would Take Again |
|-----------|--------|---------|------------|-----------------|
| Dr. Bhavin R. Sheth | DLD | 3.0 / 5 | 4.0 / 5 | 70% |
| Dr. Deepa Ramachandran | DLD | 4.5 / 5 | 2.8 / 5 | 100% |
| Dr. Xiaonan Shan | Circuits 2 | 4.5 / 5 | 3.5 / 5 | 100% |
| Dr. Biresh Kumar Joardar | Prog. with C | 5.0 / 5 | 2.0 / 5 | 100% |

> Ratings sourced manually from [RateMyProfessors.com](https://www.ratemyprofessors.com) and averaged from class-specific reviews.


---


## Disclaimer

Professor ratings are sourced manually from [RateMyProfessors.com](https://www.ratemyprofessors.com) and reflect community averages filtered by specific course sections. They may not represent every student's experience.

Academic content (homework walkthroughs, practice problems) is presented as educational reference material after assignments have been graded. Always follow your institution's academic integrity policy.

---

## License

This project is open for other EE students to reference and adapt. If you fork it for your own university, give it a star! ⭐
