// lib/multiplayer-challenges.js
// 6-Round Competitive Match Challenge Generator for TAKE THE LEAD

export const MULTIPLAYER_CHALLENGE_BANK = [
  // =========================================================================
  // ROUND 1: REFLEX STRIKES (SPEED PLACEMENT)
  // =========================================================================
  {
    id: 'mp_ref_01',
    category: 'REFLEX',
    eyebrow: '⚡ REFLEX STRIKE',
    prompt: 'TAP AS SOON AS IT TURNS ACID GREEN!',
    subtitle: 'Fastest reaction tap claims +300 Aura.',
    type: 'reflex',
    timeLimitMs: 6000,
    baseAura: 250,
  },
  {
    id: 'mp_ref_02',
    category: 'REFLEX',
    eyebrow: '⚡ SERVER CRASH ALARM',
    prompt: 'PRODUCTION SERVER IS MELTING! HIT RESTART!',
    subtitle: 'Instant clutch tap wins the placement bonus.',
    type: 'reflex',
    timeLimitMs: 5000,
    baseAura: 260,
  },
  {
    id: 'mp_ref_03',
    category: 'REFLEX',
    eyebrow: '⚡ ATTENDANCE CALL',
    prompt: 'PROFESSOR CALLED YOUR ROLL NUMBER! SHOUT PRESENT!',
    subtitle: 'Tap before the attendance register closes!',
    type: 'reflex',
    timeLimitMs: 5000,
    baseAura: 250,
  },

  // =========================================================================
  // ROUND 2: LOGIC & PATTERNS
  // =========================================================================
  {
    id: 'mp_log_01',
    category: 'LOGIC',
    eyebrow: '🧠 PATTERN DEDUCTION',
    prompt: '2 → 6 → 12 → 20 → ?',
    subtitle: 'What comes next in the mathematical series?',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 220,
    options: [
      { text: '24', correct: false },
      { text: '28', correct: false },
      { text: '30', correct: true, feedback: '2*1, 3*2, 4*3, 5*4, 6*5 = 30' },
      { text: '32', correct: false },
    ],
  },
  {
    id: 'mp_log_02',
    category: 'LOGIC',
    eyebrow: '🧠 FIBONACCI SPRINT',
    prompt: '0, 1, 1, 2, 3, 5, 8, ?',
    subtitle: 'Quick, what is the next Fibonacci number?',
    type: 'choice',
    timeLimitMs: 7000,
    baseAura: 200,
    options: [
      { text: '11', correct: false },
      { text: '12', correct: false },
      { text: '13', correct: true, feedback: '5 + 8 = 13' },
      { text: '15', correct: false },
    ],
  },
  {
    id: 'mp_log_03',
    category: 'LOGIC',
    eyebrow: '🧠 BINARY REFLEX',
    prompt: 'WHAT IS 7 IN 3-BIT BINARY?',
    subtitle: 'Instant binary conversion:',
    type: 'choice',
    timeLimitMs: 7000,
    baseAura: 220,
    options: [
      { text: '101', correct: false },
      { text: '110', correct: false },
      { text: '111', correct: true, feedback: '4 + 2 + 1 = 7' },
      { text: '011', correct: false },
    ],
  },

  // =========================================================================
  // ROUND 3: DEBUG BLITZ
  // =========================================================================
  {
    id: 'mp_dbg_01',
    category: 'DEBUG',
    eyebrow: '🐛 DEBUG BLITZ',
    prompt: 'for (let i = 0; i <= arr.length; i++)',
    subtitle: 'What catastrophic bug is lurking in this loop?',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 240,
    options: [
      { text: 'Infinite Loop', correct: false },
      { text: 'Off-By-One Index Overflow (arr[length] is undefined)', correct: true, feedback: 'Array indices are 0 to length-1' },
      { text: 'Missing Semicolon', correct: false },
      { text: 'Memory Leak', correct: false },
    ],
  },
  {
    id: 'mp_dbg_02',
    category: 'DEBUG',
    eyebrow: '🐛 JS LORE',
    prompt: 'typeof NaN === ?',
    subtitle: 'What does JavaScript evaluate this to?',
    type: 'choice',
    timeLimitMs: 7000,
    baseAura: 230,
    options: [
      { text: '"undefined"', correct: false },
      { text: '"nan"', correct: false },
      { text: '"number"', correct: true, feedback: 'JavaScript: Not-a-Number is type number!' },
      { text: '"null"', correct: false },
    ],
  },
  {
    id: 'mp_dbg_03',
    category: 'DEBUG',
    eyebrow: '🐛 SYNTAX SPOTTER',
    prompt: 'if (user = "admin") { grantAccess(); }',
    subtitle: 'Why did the security audit immediately fail?',
    type: 'choice',
    timeLimitMs: 7000,
    baseAura: 230,
    options: [
      { text: 'Single "=" assigns instead of compares (always true!)', correct: true, feedback: 'Assigning a truthy string grants admin to everyone!' },
      { text: 'Missing double quotes', correct: false },
      { text: 'GrantAccess is asynchronous', correct: false },
      { text: 'User variable is constant', correct: false },
    ],
  },

  // =========================================================================
  // ROUND 4: MEMORY FLASH (1.5s FLASH)
  // =========================================================================
  {
    id: 'mp_mem_01',
    category: 'MEMORY',
    eyebrow: '👁️ MEMORY FLASH',
    prompt: 'MEMORIZE THIS SEQUENCE BEFORE IT VANISHES...',
    subtitle: 'Flash items: ⚡ 💎 🚀 🔥 👑',
    type: 'memory',
    memoryFlashItems: ['⚡', '💎', '🚀', '🔥', '👑'],
    memoryQuestion: 'Which symbol was at position 3?',
    timeLimitMs: 8000,
    baseAura: 260,
    options: [
      { text: '⚡ Bolt', correct: false },
      { text: '🚀 Rocket', correct: true, feedback: '1:⚡ 2:💎 3:🚀 4:🔥 5:👑' },
      { text: '💎 Diamond', correct: false },
      { text: '🔥 Fire', correct: false },
    ],
  },
  {
    id: 'mp_mem_02',
    category: 'MEMORY',
    eyebrow: '👁️ CANTEEN MEMORY',
    prompt: 'MEMORIZE THE CANTEEN TRAY ORDER...',
    subtitle: 'Flash items: ☕ 🥪 🍕 🥤',
    type: 'memory',
    memoryFlashItems: ['☕', '🥪', '🍕', '🥤'],
    memoryQuestion: 'What was the 2nd item on the tray?',
    timeLimitMs: 8000,
    baseAura: 240,
    options: [
      { text: '☕ Chai', correct: false },
      { text: '🥪 Sandwich', correct: true, feedback: 'Chai → Sandwich → Pizza → Drink' },
      { text: '🍕 Pizza', correct: false },
      { text: '🥤 Drink', correct: false },
    ],
  },

  // =========================================================================
  // ROUND 5: CONTROLS & CIPHER (AURA STEAL ACTIVE)
  // =========================================================================
  {
    id: 'mp_stl_01',
    category: 'SURGE',
    isStealRound: true,
    eyebrow: '🔥 AURA STEAL ROUND',
    prompt: 'WINNER STEALS 400 AURA FROM THE #1 LEADER!',
    subtitle: 'A startup pitch has 30 seconds. What is rule #1 of a high-aura pitch?',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 350,
    options: [
      { text: 'Hook the exact problem in 5 seconds with zero fluff', correct: true, feedback: '⚡ 400 AURA STOLEN FROM LEADER!' },
      { text: 'Read 40 bullet points from 12 slides', correct: false },
      { text: 'Apologize for your microphone first', correct: false },
      { text: 'Use ChatGPT buzzwords every sentence', correct: false },
    ],
  },
  {
    id: 'mp_stl_02',
    category: 'SURGE',
    isStealRound: true,
    eyebrow: '🔥 AURA STEAL ROUND',
    prompt: 'CLUTCH OVERTAKE: WHAT DOES LEARNIT STAND FOR?',
    subtitle: 'Correct answer siphons Aura from the podium leader!',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 400,
    options: [
      { text: 'Learn, Build, Compete — Real Tech & True Projects', correct: true, feedback: '⚡ MASSIVE AURA SURGE!' },
      { text: 'Just another boring lecture club', correct: false },
      { text: 'Sitting quietly and memorizing slides', correct: false },
      { text: 'Copy-pasting tutorial code forever', correct: false },
    ],
  },

  // =========================================================================
  // ROUND 6: FINAL AURA SURGE (DOUBLE POINTS & AURA STEALS)
  // =========================================================================
  {
    id: 'mp_sur_01',
    category: 'SURGE',
    isStealRound: true,
    eyebrow: '🔥 FINAL BUZZER AURA SURGE',
    prompt: 'FASTEST TAP TAKES THE AURA CROWN!',
    subtitle: '2× Multipliers active! Clutch the center target when the buzzer strikes!',
    type: 'reflex',
    timeLimitMs: 5000,
    baseAura: 450,
  },
];

export function pickMultiplayerMatchDeck(count = 6) {
  const reflex = MULTIPLAYER_CHALLENGE_BANK.filter((c) => c.category === 'REFLEX');
  const logic = MULTIPLAYER_CHALLENGE_BANK.filter((c) => c.category === 'LOGIC');
  const debug = MULTIPLAYER_CHALLENGE_BANK.filter((c) => c.category === 'DEBUG');
  const memory = MULTIPLAYER_CHALLENGE_BANK.filter((c) => c.category === 'MEMORY');
  const steals = MULTIPLAYER_CHALLENGE_BANK.filter((c) => c.isStealRound);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const round1 = shuffle(reflex)[0];
  const round2 = shuffle(logic)[0];
  const round3 = shuffle(debug)[0];
  const round4 = shuffle(memory)[0];
  const round5 = shuffle(steals)[0];
  const round6 = shuffle(steals)[1] || shuffle(reflex)[0];

  return [round1, round2, round3, round4, round5, round6].filter(Boolean).slice(0, count);
}
