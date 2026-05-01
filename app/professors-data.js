// Single source of truth for all course/professor data.
// Add new courses or professors here — they automatically appear in the
// professors page AND the homepage search with no other changes needed.
window.ECEUH_COURSES = [
  {
    id: 'engi1100', code: 'ENGI 1100', title: 'Introduction to Engineering',
    profs: [
      { name: "Dr. Alexandra Landon", shortName: "Landon", initials: "AL", dept: "Engineering Dept.", overall: 4.67, difficulty: 2.0, wouldTake: 100, rmpUrl: "https://www.ratemyprofessors.com/professor/2880955" },
      { name: "Dr. Matthew Zelisko", shortName: "Zelisko", initials: "MZ", dept: "Engineering Dept.", overall: 4.33, difficulty: 2.56, wouldTake: 86, rmpUrl: "https://www.ratemyprofessors.com/professor/2155783" }
    ]
  },
  {
    id: 'engi1331', code: 'ENGI 1331', title: 'Computing for Engineers',
    profs: [
      { name: "Dr. Alexandra Landon", shortName: "Landon", initials: "AL", dept: "Engineering Dept.", overall: 4.78, difficulty: 2.22, wouldTake: 100, rmpUrl: "https://www.ratemyprofessors.com/professor/2880955" },
      { name: "Dr. Matthew Zelisko", shortName: "Zelisko", initials: "MZ", dept: "Engineering Dept.", overall: 4.13, difficulty: 3.2, wouldTake: 86, rmpUrl: "https://www.ratemyprofessors.com/professor/2155783" }
    ]
  },
  {
    id: 'engi2304', code: 'ENGI 2304', title: 'Technical Communications',
    profs: [
      { name: "Dr. Chad Wilson", shortName: "Wilson", initials: "CW", dept: "Engineering Dept.", overall: 4.6, difficulty: 2.8, wouldTake: 92, rmpUrl: "https://www.ratemyprofessors.com/professor/729504" },
      { name: "Dr. Carl Estrada", shortName: "Estrada", initials: "CE", dept: "Engineering Dept.", overall: 1.5, difficulty: 4.5, wouldTake: 0, rmpUrl: "https://www.ratemyprofessors.com/professor/2827301" },
      { name: "Dr. Jennifer Ettelson", shortName: "Ettelson", initials: "JE", dept: "Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: "https://www.ratemyprofessors.com/professor/3141994" },
      { name: "Dr. Deborah Salvon", shortName: "Salvon", initials: "DS", dept: "Engineering Dept.", overall: 4.44, difficulty: 1.56, wouldTake: 84, rmpUrl: "https://www.ratemyprofessors.com/professor/1445737" }
    ]
  },
  {
    id: 'ece2201', code: 'ECE 2201', title: 'Circuits Analysis I',
    profs: [
      { name: "Dr. Chu Meh Chu", shortName: "Chu", initials: "CC", dept: "Electrical Engineering Dept.", overall: 1.8, difficulty: 4.2, wouldTake: 40, rmpUrl: "https://www.ratemyprofessors.com/professor/3074605" },
      { name: "Dr. Paul Ruchhoeft", shortName: "Ruchhoeft", initials: "PR", dept: "Electrical Engineering Dept.", overall: 5.0, difficulty: 3.5, wouldTake: 72, rmpUrl: "https://www.ratemyprofessors.com/professor/1286292" },
      { name: "Dr. Deepa Ramachandran", shortName: "Ramachandran", initials: "DR", dept: "Electrical Engineering Dept.", overall: 4.5, difficulty: 3.0, wouldTake: 100, rmpUrl: "https://www.ratemyprofessors.com/professor/2729114" },
      { name: "Dr. Dave Shattuck", shortName: "Shattuck", initials: "DS", dept: "Electrical Engineering Dept.", overall: 4.5, difficulty: 4.25, wouldTake: 71, rmpUrl: "https://www.ratemyprofessors.com/professor/238536" }
    ]
  },
  {
    id: 'circuits2', code: 'ECE 2202', title: 'Circuit Analysis II',
    profs: [
      { name: "Dr. Xiaonan Shan", shortName: "Shan", initials: "XS", dept: "Electrical Engineering Dept.", overall: 4.5, difficulty: 3.5, wouldTake: 100, rmpUrl: "https://www.ratemyprofessors.com/professor/2991318" },
      { name: "Dr. Deepa Ramachandran", shortName: "Ramachandran", initials: "DR", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: null },
      { name: "Dr. Dave Shattuck", shortName: "Shattuck", initials: "DS", dept: "Electrical Engineering Dept.", overall: 4.13, difficulty: 4.31, wouldTake: 71, rmpUrl: "https://www.ratemyprofessors.com/professor/238536" }
    ]
  },
  {
    id: 'ece2100', code: 'ECE 2100', title: 'Circuit Analysis Lab',
    profs: [
      { name: "Prof. Name", shortName: "TBD", initials: "??", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: null }
    ]
  },
  {
    id: 'inde2333', code: 'INDE 2333', title: 'Engineering Statistics',
    profs: [
      { name: "Dr. Yaping Wang", shortName: "Wang", initials: "YW", dept: "Industrial Engineering Dept.", overall: 3.71, difficulty: 2.57, wouldTake: 87, rmpUrl: "https://www.ratemyprofessors.com/professor/2175000" },
      { name: "Dr. Nirathi Keerthi Govindu", shortName: "Govindu", initials: "NG", dept: "Industrial Engineering Dept.", overall: 2.5, difficulty: 2.5, wouldTake: 34, rmpUrl: "https://www.ratemyprofessors.com/professor/2926063" },
      { name: "Dr. May Feng", shortName: "Feng", initials: "MF", dept: "Industrial Engineering Dept.", overall: 4.63, difficulty: 2.25, wouldTake: 77, rmpUrl: "https://www.ratemyprofessors.com/professor/2143005" },
      { name: "Dr. Nate Wiggins", shortName: "Wiggins", initials: "NW", dept: "Industrial Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: "https://www.ratemyprofessors.com/professor/2831279" }
    ]
  },
  {
    id: 'cprog', code: 'ECE 3331', title: 'Programming Applications in ECE',
    profs: [
      { name: "Dr. Biresh Kumar Joardar", shortName: "Joardar", initials: "BJ", dept: "Electrical Engineering Dept.", overall: 5.0, difficulty: 2.0, wouldTake: 100, rmpUrl: "https://www.ratemyprofessors.com/professor/2894356" },
      { name: "Dr. Bhavin R. Sheth", shortName: "Sheth", initials: "BS", dept: "Electrical Engineering Dept.", overall: 1.5, difficulty: 4.0, wouldTake: 12, rmpUrl: "https://www.ratemyprofessors.com/professor/1585968" },
      { name: "Dr. Harry Le", shortName: "Le", initials: "HL", dept: "Electrical Engineering Dept.", overall: 3.67, difficulty: 1.67, wouldTake: 38, rmpUrl: "https://www.ratemyprofessors.com/professor/2480417" },
      { name: "Dr. Chu Meh Chu", shortName: "Chu", initials: "CC", dept: "Electrical Engineering Dept.", overall: 1.8, difficulty: null, wouldTake: null, rmpUrl: "https://www.ratemyprofessors.com/professor/3074605" }
    ]
  },
  {
    id: 'dld', code: 'ECE 3441', title: 'Digital Logic Design',
    profs: [
      { name: "Dr. Bhavin R. Sheth", shortName: "Sheth", initials: "BS", dept: "Electrical Engineering Dept.", overall: 3.0, difficulty: 4.0, wouldTake: 70, rmpUrl: "https://www.ratemyprofessors.com/professor/1585968" },
      { name: "Dr. Deepa Ramachandran", shortName: "Ramachandran", initials: "DR", dept: "Electrical Engineering Dept.", overall: 4.5, difficulty: 2.8, wouldTake: 100, rmpUrl: "https://www.ratemyprofessors.com/professor/2729114" },
      { name: "Dr. Padmavati Viswanath", shortName: "Viswanath", initials: "PV", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: "https://www.ratemyprofessors.com/professor/3000524" },
      { name: "Dr. Yufang Sun", shortName: "Sun", initials: "YS", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: "https://www.ratemyprofessors.com/professor/3163565" }
    ]
  },
  {
    id: 'ece3155', code: 'ECE 3155', title: 'Electronics Lab',
    profs: [
      { name: "Prof. Name", shortName: "TBD", initials: "??", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: null }
    ]
  },
  {
    id: 'ece3355', code: 'ECE 3355', title: 'Electronics',
    profs: [
      { name: "Dr. Dmitri Litvinov", shortName: "Litvinov", initials: "DL", dept: "Electrical Engineering Dept.", overall: 3.5, difficulty: 3.25, wouldTake: 50, rmpUrl: "https://www.ratemyprofessors.com/professor/1290156" },
      { name: "Dr. David P Shattuck", shortName: "Shattuck", initials: "DS", dept: "Electrical Engineering Dept.", overall: 4.83, difficulty: 4.33, wouldTake: 71, rmpUrl: "https://www.ratemyprofessors.com/professor/238536" }
    ]
  },
  {
    id: 'ece3337', code: 'ECE 3337', title: 'Signals & Systems Analysis',
    profs: [
      { name: "Stuart Long", shortName: "Long", initials: "SL", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: null },
      { name: "Dr. Sebastian Csutak", shortName: "Csutak", initials: "SC", dept: "Electrical Engineering Dept.", overall: 1.0, difficulty: 6.0, wouldTake: 0, rmpUrl: "https://www.ratemyprofessors.com/professor/3127242" },
      { name: "Dr. Dmitri Litvinov", shortName: "Litvinov", initials: "DL", dept: "Electrical Engineering Dept.", overall: 1.83, difficulty: 3.67, wouldTake: 50, rmpUrl: "https://www.ratemyprofessors.com/professor/1290156" },
      { name: "Dr. Badrinath Roysam", shortName: "Roysam", initials: "BR", dept: "Electrical Engineering Dept.", overall: 4.2, difficulty: 3.9, wouldTake: 77, rmpUrl: "https://www.ratemyprofessors.com/professor/2296491" }
    ]
  },
  {
    id: 'ece3317', code: 'ECE 3317', title: 'Applied EM Waves',
    profs: [
      { name: "Dr. Stuart Long", shortName: "Long", initials: "SL", dept: "Electrical Engineering Dept.", overall: 4.5, difficulty: 4.22, wouldTake: 100, rmpUrl: "https://www.ratemyprofessors.com/professor/868441" },
      { name: "Dr. David Jackson", shortName: "Jackson", initials: "DJ", dept: "Electrical Engineering Dept.", overall: 3.0, difficulty: 4.0, wouldTake: 60, rmpUrl: "https://www.ratemyprofessors.com/professor/413232" },
      { name: "Dr. Yufang Sun", shortName: "Sun", initials: "YS", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: "https://www.ratemyprofessors.com/professor/3163565" },
      { name: "Dr. Jiefu Chen", shortName: "Chen", initials: "JC", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: "https://www.ratemyprofessors.com/professor/3080859" }
    ]
  },
  {
    id: 'ece3436', code: 'ECE 3436', title: 'Microprocessor Systems',
    profs: [
      { name: "Dr. Diana De La Rosa-Pohl", shortName: "TBD", initials: "??", dept: "Electrical Engineering Dept.", overall: 4.88, difficulty: 2.0, wouldTake: 92, rmpUrl: "https://www.ratemyprofessors.com/professor/729505" },
      { name: "Dr. Harry Le", shortName: "Le", initials: "HL", dept: "Electrical Engineering Dept.", overall: 3.0, difficulty: 5.0, wouldTake: 38, rmpUrl: "https://www.ratemyprofessors.com/professor/2480417" },
      { name: "Dr. Jianfeng Zheng", shortName: "Zheng", initials: "JZ", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: "https://www.ratemyprofessors.com/professor/3080859" }
    ]
  },
  {
    id: 'ece3340', code: 'ECE 3340', title: 'Numerical Methods',
    profs: [
      { name: "Dr. David Mayerich", shortName: "Mayerich", initials: "DM", dept: "Electrical Engineering Dept.", overall: 4.2, difficulty: 2.6, wouldTake: 100, rmpUrl: "https://www.ratemyprofessors.com/professor/2092494" },
      { name: "Dr. Jianfeng Zheng", shortName: "Zheng", initials: "JZ", dept: "Electrical Engineering Dept.", overall: null, difficulty: null, wouldTake: null, rmpUrl: "https://www.ratemyprofessors.com/professor/3080859" }
    ]
  }
];
