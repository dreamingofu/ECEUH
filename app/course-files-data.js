// Single source of truth for the bucket-backed file libraries.
// - Each *-files.html / *-resources.html page sets window.FILE_DATA from this map
// - Homepage search auto-generates a "File" entry for every file listed here
// Drop a new file into the right slug's array and it appears on the course
// File Library page AND in the homepage search with no other changes needed.
(function () {
  const DLD = 'https://pub-8a57ce7900574340969d1b3eb5bcdc1e.r2.dev/dld';
  const C2  = 'https://pub-8a57ce7900574340969d1b3eb5bcdc1e.r2.dev/circuits%20II';
  const CP  = 'https://pub-8a57ce7900574340969d1b3eb5bcdc1e.r2.dev/cprog';

  window.ECEUH_COURSE_FILES = {
    dld: [
      // ── Reference ───────────────────────────────────────────────
      { type: 'reference', label: 'Textbook', title: 'DLD Textbook',
        desc: 'Full course textbook (~26 MB) — keep it open in another tab.', date: 'S26',
        versions: [{ label: 'PDF', url: DLD + '/DLD_Textbook.pdf' }] },

      // ── Classwork ───────────────────────────────────────────────
      { type: 'classwork', label: 'Classwork', title: 'Classwork 1', desc: 'In-class problem set 1.', date: 'S26',
        versions: [{ label: 'PDF', url: DLD + '/ECE_3441_ClassWork1.pdf' }] },
      { type: 'classwork', label: 'Classwork', title: 'Classwork 2', desc: 'In-class problem set 2.', date: 'S26',
        versions: [{ label: 'PDF', url: DLD + '/ECE_3441_ClassWork2.pdf' }] },
      { type: 'classwork', label: 'Classwork', title: 'Classwork 3', desc: 'In-class problem set 3.', date: 'S26',
        versions: [{ label: 'PDF', url: DLD + '/ECE_3441_ClassWork3.pdf' }] },
      { type: 'classwork', label: 'Classwork', title: 'Classwork 4', desc: 'In-class problem set 4.', date: 'S26',
        versions: [{ label: 'PDF', url: DLD + '/ECE_3441_ClassWork4.pdf' }] },
      { type: 'classwork', label: 'Classwork', title: 'Classwork 5', desc: 'In-class problem set 5.', date: 'S26',
        versions: [{ label: 'PDF', url: DLD + '/ECE_3441_ClassWork5.pdf' }] },

      // ── Quizzes ─────────────────────────────────────────────────
      { type: 'quiz', label: 'Quiz', title: 'Quiz 1', desc: 'Worked solutions for quiz 1.', date: 'S26',
        versions: [{ label: 'Solutions', url: DLD + '/ECE_3441_Quiz1_Solutions.pdf' }] },
      { type: 'quiz', label: 'Quiz', title: 'Quiz 2', desc: 'Quiz 2 problem set with solutions for both variants.', date: 'S26',
        versions: [
          { label: 'Quiz A',           url: DLD + '/ECE_3441_Quiz2.pdf' },
          { label: 'Quiz B Solutions', url: DLD + '/ECE_3441_Quiz2B_Solutions.pdf' },
          { label: 'Quiz C Solutions', url: DLD + '/ECE_3441_Quiz2C_Solutions.pdf' }
        ] },
      { type: 'quiz', label: 'Quiz', title: 'Quiz 3', desc: 'Quiz 3 with solutions, variant A solutions, and the crib sheet.', date: 'S26',
        versions: [
          { label: 'Quiz A',           url: DLD + '/ECE_3441_Quiz3.pdf' },
          { label: 'Quiz A Solutions', url: DLD + '/ECE_3441_Quiz3_Solutions.pdf' },
          { label: 'Quiz B Solutions', url: DLD + '/ECE_3441_Quiz3A_Solutions.pdf' },
          { label: 'Crib Sheet',       url: DLD + '/ECE_3441_Quiz3-CribSheet.pdf' }
        ] },
      { type: 'quiz', label: 'Quiz', title: 'Quiz 4', desc: 'Quiz 4 with solutions and the variant B set.', date: 'S26',
        versions: [
          { label: 'Quiz A',           url: DLD + '/ECE_3441_Quiz4.pdf' },
          { label: 'Quiz A Solutions', url: DLD + '/ECE_3441_Quiz4_Solutions.pdf' },
          { label: 'Quiz B',           url: DLD + '/ECE_3441_Quiz4B.pdf' },
          { label: 'Quiz B Solutions', url: DLD + '/ECE_3441_Quiz4B_Solutions.pdf' }
        ] },

      // ── Exams ───────────────────────────────────────────────────
      { type: 'exam', label: 'Exam', title: 'Exam 1 — Solutions', desc: 'Worked solutions for exam 1.', date: 'S26',
        versions: [{ label: 'PDF', url: DLD + '/ECE_3441_Exam1_Solutions.pdf' }] },

      // ── Homework practice problems ──────────────────────────────
      { type: 'homework', label: 'Homework', title: 'HW Problem Set', desc: 'Compiled practice problem set for additional reps.', date: 'S26',
        versions: [{ label: 'PDF', url: DLD + '/HW_Problems_Set.pdf' }] },
      { type: 'homework', label: 'Homework', title: 'DLD HW Problems', desc: 'Extra DLD homework practice problems.', date: 'S26',
        versions: [{ label: 'PDF', url: DLD + '/DLD_HW_Problems.pdf' }] }
    ],

    circuits2: [
      // ── Reference ───────────────────────────────────────────────
      { type: 'reference', label: 'Reference', title: 'Formula Sheet',
        desc: 'Quick-reference formula sheet for Circuits 2.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/Formula%20Sheet.pdf' }] },

      // ── Homework ────────────────────────────────────────────────
      { type: 'homework', label: 'Homework', title: 'HW1', desc: 'Spring 2026 homework 1.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_HW1.pdf' }] },
      { type: 'homework', label: 'Homework', title: 'HW2', desc: 'Spring 2026 homework 2.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_HW2.pdf' }] },
      { type: 'homework', label: 'Homework', title: 'HW3', desc: 'Spring 2026 homework 3.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_HW3.pdf' }] },
      { type: 'homework', label: 'Homework', title: 'HW4', desc: 'Spring 2026 homework 4.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_HW4.pdf' }] },
      { type: 'homework', label: 'Homework', title: 'HW5', desc: 'Spring 2026 homework 5.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_HW5.pdf' }] },
      { type: 'homework', label: 'Homework', title: 'HW6', desc: 'Spring 2026 homework 6.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_HW6.pdf' }] },
      { type: 'homework', label: 'Homework', title: 'HW7', desc: 'Spring 2026 homework 7.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_HW7.pdf' }] },
      { type: 'homework', label: 'Homework', title: 'HW8', desc: 'Spring 2026 homework 8.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_HW8.pdf' }] },

      // ── Quizzes ─────────────────────────────────────────────────
      { type: 'quiz', label: 'Quiz', title: 'Quiz 1 — Solutions', desc: 'Worked solutions for quiz 1.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_Quiz1_Solutions.pdf' }] },
      { type: 'quiz', label: 'Quiz', title: 'Quiz 2 — Solutions', desc: 'Worked solutions for quiz 2.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_Quiz2_Solutions.pdf' }] },
      { type: 'quiz', label: 'Quiz', title: 'Quiz 3 — Solutions', desc: 'Worked solutions for quiz 3.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_Quiz3_Solutions.pdf' }] },
      { type: 'quiz', label: 'Quiz', title: 'Quiz 4 — Solutions', desc: 'Worked solutions for quiz 4.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_Quiz4_Solutions.pdf' }] },
      { type: 'quiz', label: 'Quiz', title: 'Quiz 5 — Solutions', desc: 'Worked solutions for quiz 5.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_Quiz5_Solutions.pdf' }] },

      // ── Exams ───────────────────────────────────────────────────
      { type: 'exam', label: 'Exam', title: 'Exam 1', desc: 'First exam packet.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/Exam_1.pdf' }] },
      { type: 'exam', label: 'Review', title: 'Exam 1 — Review', desc: 'Review packet for exam 1.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_Exam1_Review.pdf' }] },
      { type: 'exam', label: 'Review', title: 'Exam 2 — Review', desc: 'Review packet for exam 2.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_Exam2_Review.pdf' }] },
      { type: 'exam', label: 'Review', title: 'Exam 3 — Review', desc: 'Review packet for exam 3.', date: 'S26',
        versions: [{ label: 'PDF', url: C2 + '/ECE2202_Exam3_Review.pdf' }] }
    ],

    cprog: [
      // Placeholder — drop entries here once files land in the bucket:
      // { type: 'quiz', label: 'Quiz', title: 'Quiz 1', desc: 'C fundamentals & pointers.', date: 'S26',
      //   versions: [{ label: 'PDF', url: CP + '/quiz1.pdf' }] }
    ]
  };
})();
