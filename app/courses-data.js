// Single source of truth for the course catalog.
// - archives.html renders its grid from this list
// - index.html active-coursework picker reads units/desc/href from this list
// - index.html homepage search auto-generates Course/Topics/Files/Links entries
//   for every course where isLive: true
// Add a new course here once and it appears in all three places automatically.
window.ECEUH_COURSE_LIST = [
  // ── 1000-level ──────────────────────────────────────────────────
  {
    slug: 'engi1100', code: 'ENGI 1100', title: 'Introduction to Engineering',
    desc: 'ENGI 1100 · Year 1 fundamentals.',
    level: 1000, units: 4,
    art: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },
  {
    slug: 'engi1331', code: 'ENGI 1331', title: 'Computing for Engineers',
    desc: 'ENGI 1331 · MATLAB and problem solving.',
    level: 1000, units: 6,
    art: './images/matlab.webp',
    isLive: false
  },

  // ── 2000-level ──────────────────────────────────────────────────
  {
    slug: 'engi2304', code: 'ENGI 2304', title: 'Technical Communications',
    desc: 'ENGI 2304 · Engineering writing and reports.',
    level: 2000, units: 4,
    art: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },
  {
    slug: 'ece2201', code: 'ECE 2201', title: 'Circuit Analysis I',
    archiveTitle: 'Circuits Analysis I',
    desc: 'ECE 2201 · DC circuits, KVL, KCL, Thevenin.',
    level: 2000, units: 8,
    art: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },
  {
    slug: 'circuits2', code: 'ECE 2202', title: 'Circuit Analysis II',
    desc: 'ECE 2202 · AC analysis, phasors, and RLC.',
    level: 2000, units: 8,
    art: './images/circuits 2.webp',
    isLive: true,
    hub: {
      href: 'circuits2.html',
      searchTitle: 'Circuits 2',
      searchDesc: 'Course hub for phasors, RLC work, files, and references.',
      keywords: ['circuits', 'phasors', 'rlc', 'bode', 'laplace']
    },
    sections: {
      topics: { href: 'circuits2-topics.html', title: 'Circuits 2 Topics', desc: 'Sinusoidal steady-state, impedance, AC power, filters, and Laplace.', keywords: ['circuits topics', 'steady-state', 'ac power', 'filters'] },
      files:  { href: 'circuits2-files.html',  title: 'Circuits 2 File Library', desc: 'Syllabus, homework solutions, review packets, and quiz files.', keywords: ['syllabus', 'homework', 'quiz solutions', 'exam review', 'formula sheet'] },
      links:  { href: 'circuits2-links.html',  title: 'Circuits 2 External Resources', desc: 'Circuit simulators and study references for AC analysis.', keywords: ['falstad', 'ltspice', 'all about circuits', 'khan academy', 'circuitlab'] }
    }
  },
  {
    slug: 'ece2100', code: 'ECE 2100', title: 'Circuit Analysis Lab',
    desc: 'ECE 2100 · Practical circuit building and testing.',
    level: 2000, units: 2,
    art: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },
  {
    slug: 'inde2333', code: 'INDE 2333', title: 'Engineering Statistics',
    desc: 'INDE 2333 · Probability and data analysis.',
    level: 2000, units: 6,
    art: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },

  // ── 3000-level ──────────────────────────────────────────────────
  {
    slug: 'cprog', code: 'ECE 3331', title: 'Programming Applications in ECE',
    desc: 'ECE 3331 · Pointers, memory, structs, algorithms.',
    level: 3000, units: 8,
    art: './images/C_Programming_Language.svg-3.webp',
    isLive: true,
    hub: {
      href: 'cprog.html',
      searchTitle: 'Programming with C',
      searchDesc: 'Course hub for pointers, memory, file library, and references.',
      keywords: ['c', 'programming', 'pointers', 'memory', 'algorithms']
    },
    sections: {
      topics: { href: 'cprog-topics.html', title: 'C Programming Topics', desc: 'Fundamentals, pointers, arrays, memory, structs, file I/O, and algorithms.', keywords: ['c topics', 'pointers', 'arrays', 'file io', 'algorithms', 'malloc'] },
      files:  { href: 'cprog-files.html',  title: 'C Programming File Library', desc: 'Dedicated course file library for quizzes, exams, and reference sheets.', keywords: ['c files', 'quiz', 'exam', 'reference'] },
      links:  { href: 'cprog-links.html',  title: 'C Programming External Resources', desc: 'cppreference, Valgrind, GCC docs, and debugging tools.', keywords: ['cppreference', 'valgrind', 'gcc', 'compiler explorer', 'godbolt', 'cs50'] }
    }
  },
  {
    slug: 'dld', code: 'ECE 3441', title: 'Digital Logic Design',
    desc: 'ECE 3441 · K-maps, FSMs, and sequential logic.',
    level: 3000, units: 6,
    art: './images/dld.webp',
    isLive: true,
    hub: {
      href: 'dld.html',
      searchTitle: 'Digital Logic Design',
      searchDesc: 'Course hub for topics, file library, and external resources.',
      keywords: ['dld', 'digital logic', 'logic design', 'boolean algebra', 'fsm']
    },
    sections: {
      topics: { href: 'dld-topics.html',    title: 'DLD Topics', desc: 'Boolean algebra, logic gates, K-maps, sequential logic, and FSMs.', keywords: ['dld topics', 'kmap', 'logic gates', 'sequential', 'fsm', 'flip-flops'] },
      files:  { href: 'dld-resources.html', title: 'DLD File Library', desc: 'Bucket-backed classwork, review packets, and reference docs.', keywords: ['dld files', 'classwork', 'quiz solutions', 'textbook', 'hw problems'] },
      links:  { href: 'dld-links.html',     title: 'DLD External Resources', desc: 'NandGame, Logic.ly, MIT OCW, and other DLD references.', keywords: ['nandgame', 'logic.ly', 'mit ocw', 'neso academy', 'geeksforgeeks'] }
    }
  },
  {
    slug: 'ece3155', code: 'ECE 3155', title: 'Electronics Lab',
    desc: 'ECE 3155 · Diode and BJT circuit labs.',
    level: 3000, units: 2,
    art: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },
  {
    slug: 'ece3355', code: 'ECE 3355', title: 'Electronics',
    desc: 'ECE 3355 · Diodes, BJTs, MOSFETs, and amps.',
    level: 3000, units: 6,
    art: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },
  {
    slug: 'ece3337', code: 'ECE 3337', title: 'Signals & Systems Analysis',
    desc: 'ECE 3337 · Fourier, Laplace, and Z-transforms.',
    level: 3000, units: 6,
    art: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },
  {
    slug: 'ece3317', code: 'ECE 3317', title: 'Applied EM Waves',
    desc: 'ECE 3317 · Maxwells equations and transmission lines.',
    level: 3000, units: 6,
    art: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },
  {
    slug: 'ece3436', code: 'ECE 3436', title: 'Microprocessor Systems',
    desc: 'ECE 3436 · Assembly, memory, and microcontrollers.',
    level: 3000, units: 8,
    art: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=900&q=80&auto=format&fit=crop',
    isLive: false
  },
  {
    slug: 'ece3340', code: 'ECE 3340', title: 'Numerical Methods',
    desc: 'ECE 3340 · Algorithms for solving engineering problems.',
    level: 3000, units: 6,
    art: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=900&q=80&auto=format&fit=crop',
    isLive: false
  }
];
