// lib/multiplayer-challenges.js
// Entertaining, High-Energy Gen-Z, Meme & Viral Campus Dilemmas for TAKE THE LEAD
// Designed for all students (Law, BBA, Commerce, Engineering, Arts) with 1:20 fun pop-tech!

export const MULTIPLAYER_CHALLENGE_BANK = [
  // =========================================================================
  // ROUND 1: REFLEX STRIKES (CAMPUS PANIC REFLEXES)
  // =========================================================================
  {
    id: 'mp_ref_01',
    category: 'REFLEX',
    eyebrow: '⚡ ATTENDANCE PROXY',
    prompt: 'PROFESSOR CALLED YOUR ROLL NUMBER! SHOUT PRESENT!',
    subtitle: 'Tap before the register closes to save your 75% attendance!',
    type: 'reflex',
    timeLimitMs: 5000,
    baseAura: 250,
  },
  {
    id: 'mp_ref_02',
    category: 'REFLEX',
    eyebrow: '⚡ CANTEEN EMERGENCY',
    prompt: 'HOT CANTEEN SAMOSAS JUST DROPPED! GRAB ONE NOW!',
    subtitle: 'Only 3 samosas remain. Fastest fingers feast!',
    type: 'reflex',
    timeLimitMs: 5000,
    baseAura: 260,
  },
  {
    id: 'mp_ref_03',
    category: 'REFLEX',
    eyebrow: '⚡ PRIVACY CRISIS',
    prompt: 'ACCIDENTALLY OPENED SCREENSHARE IN CLASS! HIT STOP SHARE!',
    subtitle: 'Tap the flash button before the entire batch sees your tabs!',
    type: 'reflex',
    timeLimitMs: 4500,
    baseAura: 280,
  },
  {
    id: 'mp_ref_04',
    category: 'REFLEX',
    eyebrow: '⚡ DEADLINE CLUTCH',
    prompt: 'TIME: 11:59:58 PM! HIT THE SUBMIT BUTTON BEFORE 12:00!',
    subtitle: 'Portal closes in milliseconds! Clutch the submission!',
    type: 'reflex',
    timeLimitMs: 4800,
    baseAura: 270,
  },
  {
    id: 'mp_ref_05',
    category: 'REFLEX',
    eyebrow: '⚡ CHAT DISASTER',
    prompt: 'YOU ALMOST SENT THE SCREENSHOT TO THE SAME PERSON! ABORT!',
    subtitle: 'Cancel send before maximum social fatality occurs!',
    type: 'reflex',
    timeLimitMs: 4600,
    baseAura: 290,
  },

  // =========================================================================
  // ROUND 2: AURA MATHEMATICS & GEN-Z SLANG
  // =========================================================================
  {
    id: 'mp_slang_01',
    category: 'SLANG',
    eyebrow: '💀 AURA CALCULATION',
    prompt: 'Which of these causes the most catastrophic -10,000 AURA penalty?',
    subtitle: 'Choose the most socially fatal campus moment:',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 220,
    options: [
      { text: 'Waving back at someone who was waving at the person behind you', correct: true, feedback: 'Instant transfer to another university required (-10,000 Aura).' },
      { text: 'Tripping on canteen stairs and pretending to tie your shoelaces', correct: false, feedback: 'Respectable recovery attempt (+0 Aura).' },
      { text: 'Saying "You too" when the canteen waiter says "Enjoy your Maggi"', correct: false, feedback: 'Only -2,000 Aura damage.' },
      { text: 'Walking with headphones on and realizing you had no music playing', correct: false, feedback: 'Just pure acoustic silence.' },
    ],
  },
  {
    id: 'mp_slang_02',
    category: 'SLANG',
    eyebrow: '✨ RIZZOLOGY DEPT',
    prompt: 'Someone hits you with: "Are you the campus Wi-Fi? Because I feel zero connection." What is the diagnosis?',
    subtitle: 'Calculate their social standing:',
    type: 'choice',
    timeLimitMs: 7500,
    baseAura: 230,
    options: [
      { text: 'Unspoken High-Frequency Rizz', correct: false },
      { text: 'Catastrophic Negative Rizz / Restraining order pending', correct: true, feedback: 'Certified disaster. Bro needs to log off permanently.' },
      { text: 'Hosteler Emotional Damage', correct: false },
      { text: 'Sigma Male Grindset', correct: false },
    ],
  },
  {
    id: 'mp_slang_03',
    category: 'SLANG',
    eyebrow: '🫠 DELULU LEVEL',
    prompt: 'Studying for 8 minutes before an end-sem exam and expecting an 8.5+ CGPA is called:',
    subtitle: 'Identify the psychological phenomenon:',
    type: 'choice',
    timeLimitMs: 7000,
    baseAura: 210,
    options: [
      { text: 'Delulu is the only Solulu', correct: true, feedback: '100% pure uncut campus delusion.' },
      { text: 'Strategic Academic Optimization', correct: false },
      { text: 'BBA Corporate Efficiency', correct: false },
      { text: 'Quantum Physics Manifestation', correct: false },
    ],
  },
  {
    id: 'mp_slang_04',
    category: 'SLANG',
    eyebrow: '🚩 RED FLAG DETECTOR',
    prompt: 'The group project partner who sends "👍" at 11:45 PM on submission night is:',
    subtitle: 'Classify their criminal record:',
    type: 'choice',
    timeLimitMs: 7500,
    baseAura: 240,
    options: [
      { text: 'Freeloader Final Boss / Biological Hazard', correct: true, feedback: 'Immediate removal from the project title slide.' },
      { text: 'The Silent Project Manager', correct: false },
      { text: 'Moral Support Coordinator', correct: false },
      { text: 'Aura Investor', correct: false },
    ],
  },

  // =========================================================================
  // ROUND 3: EVERYDAY POP-TECH & DIGITAL LORE (Accessible to ANY stream!)
  // =========================================================================
  {
    id: 'mp_tech_01',
    category: 'TECH',
    eyebrow: '🕵️ DIGITAL TRUTH',
    prompt: 'What does Google Chrome "Incognito Mode" ACTUALLY hide your searches from?',
    subtitle: 'Debunk the myth for +250 Aura:',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 250,
    options: [
      { text: 'The FBI, CIA, and Interpol', correct: false },
      { text: 'Your ISP and College WiFi Administrator', correct: false },
      { text: 'Only your roommate who borrows your laptop for 2 minutes', correct: true, feedback: 'Truth hurts: College WiFi admin sees EVERYTHING!' },
      { text: 'Mark Zuckerberg', correct: false },
    ],
  },
  {
    id: 'mp_tech_02',
    category: 'TECH',
    eyebrow: '🔧 UNIVERSAL FIX',
    prompt: 'The highest level of Indian IT Engineering support for ANY broken gadget is:',
    subtitle: 'Proven by 1.4 Billion people:',
    type: 'choice',
    timeLimitMs: 7000,
    baseAura: 220,
    options: [
      { text: 'Turning it off and turning it back on again', correct: true, feedback: 'Cures 99.8% of all technological ailments on Earth.' },
      { text: 'Putting the phone in raw basmati rice overnight', correct: false, feedback: 'Basmati rice is for eating, not IT support.' },
      { text: 'Smacking the side of the monitor with a firm slap', correct: false },
      { text: 'Consulting an astrologer for laptop compatibility', correct: false },
    ],
  },
  {
    id: 'mp_tech_03',
    category: 'TECH',
    eyebrow: '🤖 AI CONFIDENCE',
    prompt: 'You ask ChatGPT for 5 research citations for your Law/BBA essay. What does it give you?',
    subtitle: 'Standard AI behavior:',
    type: 'choice',
    timeLimitMs: 7500,
    baseAura: 230,
    options: [
      { text: '5 completely fake papers written by non-existent Nobel laureates', correct: true, feedback: 'ChatGPT will invent an entire fake court ruling with 100% confidence.' },
      { text: 'Authentic Harvard Law library archives', correct: false },
      { text: 'Direct link to Wikipedia', correct: false },
      { text: 'Your professor’s secret WhatsApp messages', correct: false },
    ],
  },
  {
    id: 'mp_tech_04',
    category: 'TECH',
    eyebrow: '📱 2FA NIGHTMARE',
    prompt: 'You urgently need to log in to the college exam portal. Where is the OTP sent?',
    subtitle: 'Campus system design:',
    type: 'choice',
    timeLimitMs: 7000,
    baseAura: 220,
    options: [
      { text: 'To a dead SIM card from 2018 registered under your father’s cousin', correct: true, feedback: 'Every single Indian college portal ever made.' },
      { text: 'Instantly to your current WhatsApp number', correct: false },
      { text: 'Directly to your email inbox with zero delay', correct: false },
      { text: 'Via carrier pigeon to your hostel window', correct: false },
    ],
  },

  // =========================================================================
  // ROUND 4: CAMPUS SURVIVAL & HOSTEL LORE
  // =========================================================================
  {
    id: 'mp_surv_01',
    category: 'SURVIVAL',
    eyebrow: '🎮 HOSTEL CHRONICLES',
    prompt: 'It is 2:30 AM before an 8:00 AM exam. The hostel room starts a game of UNO. What happens?',
    subtitle: 'Predict the outcome with 100% accuracy:',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 240,
    options: [
      { text: 'Friendships end, chairs fly, voice lost, 0 studying completed', correct: true, feedback: 'Canon hostel event. You walk into the exam running on 3 hours of pure panic.' },
      { text: 'Everyone plays 1 round and goes to sleep responsibly', correct: false },
      { text: 'All 5 modules of the syllabus get mastered', correct: false },
      { text: 'The professor cancels the exam out of respect', correct: false },
    ],
  },
  {
    id: 'mp_surv_02',
    category: 'SURVIVAL',
    eyebrow: '🧠 SURVIVAL TRIO',
    prompt: 'The Holy Trinity of surviving any college semester is:',
    subtitle: 'Essential survival kit:',
    type: 'choice',
    timeLimitMs: 7500,
    baseAura: 230,
    options: [
      { text: 'Cutting Chai, 20,000mAh Powerbank, and Proxy Attendance', correct: true, feedback: 'The sacred campus trinity. Everything else is secondary.' },
      { text: 'Hardbound textbooks, ruler, and 4 colored highlighters', correct: false },
      { text: 'Going to sleep at 10 PM and waking up at 5 AM', correct: false },
      { text: 'Posting daily aesthetic study vlogs on Instagram', correct: false },
    ],
  },
  {
    id: 'mp_surv_03',
    category: 'SURVIVAL',
    eyebrow: '💀 TRANSLATION GUIDE',
    prompt: 'When your friend walks out of the exam hall and says "Bro the paper was so easy", it means:',
    subtitle: 'Decode the secret message:',
    type: 'choice',
    timeLimitMs: 7000,
    baseAura: 220,
    options: [
      { text: 'They got every answer completely wrong with maximum confidence', correct: true, feedback: 'They invented their own formulas. Supplementary exam loading.' },
      { text: 'They actually scored 100/100', correct: false },
      { text: 'They wrote the professor’s autobiography', correct: false },
      { text: 'They were in the wrong exam classroom', correct: false },
    ],
  },

  // =========================================================================
  // ROUND 5: TACTICAL STEAL ROUND (Aura Steal Active! ⚡)
  // =========================================================================
  {
    id: 'mp_steal_01',
    category: 'STEAL',
    eyebrow: '⚡ AURA STEAL ACTIVE',
    prompt: 'The canteen waiter drops a ₹1,800 bill on the table. The person with the highest Aura immediately:',
    subtitle: 'Winner steals 400 Aura from the #1 Leader!',
    type: 'choice',
    timeLimitMs: 8500,
    baseAura: 300,
    isStealRound: true,
    options: [
      { text: 'Suddenly claims their GPay is "under server maintenance"', correct: true, feedback: 'Aura Steal Successful! "Bro network nahi aa raha, tu daal de."' },
      { text: 'Happily pays the entire bill with a bright smile', correct: false },
      { text: 'Calculates everyone’s exact share down to 45 paise', correct: false },
      { text: 'Starts washing dishes in the canteen kitchen', correct: false },
    ],
  },
  {
    id: 'mp_steal_02',
    category: 'STEAL',
    eyebrow: '⚡ AURA STEAL ACTIVE',
    prompt: 'During a 4-person group presentation, who is under the most psychological pressure?',
    subtitle: 'Winner steals 400 Aura from the #1 Leader!',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 310,
    isStealRound: true,
    options: [
      { text: 'The guy whose only job is clicking "Next Slide" and nodding seriously', correct: true, feedback: 'Sweating bullets hoping the professor does not ask him a single question!' },
      { text: 'The MVP who actually researched and made all 42 slides', correct: false },
      { text: 'The professor who is secretly shopping on Amazon', correct: false },
      { text: 'The projector fan making jet engine noises', correct: false },
    ],
  },
  {
    id: 'mp_steal_03',
    category: 'STEAL',
    eyebrow: '⚡ AURA STEAL ACTIVE',
    prompt: 'You have exactly 74.8% attendance. The HOD says:',
    subtitle: 'Winner steals 400 Aura from the #1 Leader!',
    type: 'choice',
    timeLimitMs: 7500,
    baseAura: 320,
    isStealRound: true,
    options: [
      { text: '"Rules are rules. Bring your parents or see you in summer classes."', correct: true, feedback: 'Brutal. Zero mercy shown to the 74.8% victim.' },
      { text: '"Don’t worry beta, rounded up to 75% for you!"', correct: false },
      { text: '"Do 20 pushups and take your hall ticket"', correct: false },
      { text: '"Let us discuss this over a cup of cappuccino"', correct: false },
    ],
  },

  // =========================================================================
  // ROUND 6: GRAND FINALE SURGE (2× MULTIPLIERS & FINAL OVERTAKES! 👑)
  // =========================================================================
  {
    id: 'mp_surge_01',
    category: 'SURGE',
    eyebrow: '👑 THE SUPREME FLEX',
    prompt: 'Which of these actions radiates UNCHALLENGED GOD-TIER CAMPUS AURA?',
    subtitle: 'FINAL ROUND: 2× Aura multipliers & clutch overtakes active!',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 350,
    isStealRound: true,
    options: [
      { text: 'Entering 8:00 AM class at 8:44 AM holding iced coffee and still getting marked present', correct: true, feedback: '👑 CERTIFIED CAMPUS LEGEND. Statues should be built in your honor.' },
      { text: 'Carrying a 13-inch iPad Pro with the Apple Pencil magnetically clicked', correct: false },
      { text: 'Writing "Humbled and honored to announce" on LinkedIn 3 times a week', correct: false },
      { text: 'Knowing every single canteen stray dog by government name', correct: false },
    ],
  },
  {
    id: 'mp_surge_02',
    category: 'SURGE',
    eyebrow: '👑 CLUB SUPREMACY',
    prompt: 'Why should every ambitious student from Law, BBA, Tech, or Arts join LearnIT Club today?',
    subtitle: 'FINAL ROUND: Double points on the line!',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 360,
    isStealRound: true,
    options: [
      { text: 'Build real-world projects, win crazy hackathons, and maximize campus Aura!', correct: true, feedback: '👑 CORRECT! LearnIT is where high-aura builders are born.' },
      { text: 'To eat free pizza at the back of the auditorium', correct: false },
      { text: 'To put "Vice President of Vibes" on your resume', correct: false },
      { text: 'Because you have nothing better to do during break', correct: false },
    ],
  },
  {
    id: 'mp_surge_03',
    category: 'SURGE',
    eyebrow: '👑 THE FILE NAME',
    prompt: 'Your assignment is due at 11:59 PM. It is submitted at 11:58:59 PM. What is the file name?',
    subtitle: 'FINAL ROUND: Crown the match champion!',
    type: 'choice',
    timeLimitMs: 8000,
    baseAura: 350,
    isStealRound: true,
    options: [
      { text: 'assignment_final_FINAL_v3_reallyfinal_pleasenoF.pdf', correct: true, feedback: '👑 The universal sacred artifact of higher education.' },
      { text: 'Academic_Research_Paper_Formal.docx', correct: false },
      { text: 'Untitled.txt', correct: false },
      { text: 'syllabus.png', correct: false },
    ],
  },
];

// Generates a 6-round party match dynamically sampled across the rounds
export function generateMultiplayerMatchDeck() {
  const getDeckCard = (category) => {
    const candidates = MULTIPLAYER_CHALLENGE_BANK.filter((c) => c.category === category);
    if (!candidates.length) return MULTIPLAYER_CHALLENGE_BANK[0];
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  return [
    getDeckCard('REFLEX'),   // Round 1: Reflex strike (Attendance, samosa, screenshare panic)
    getDeckCard('SLANG'),    // Round 2: Gen-Z slang & Aura math (waving back, rizz, delulu)
    getDeckCard('TECH'),     // Round 3: Pop-Tech & digital lore (Incognito truth, turning off/on, ChatGPT fake cites)
    getDeckCard('SURVIVAL'), // Round 4: Campus survival (2 AM hostel UNO, chai proxy trinity)
    getDeckCard('STEAL'),    // Round 5: Tactical Steal (Canteen bill escape, next slide presentation guy)
    getDeckCard('SURGE'),    // Round 6: Grand Finale Surge (8:44 AM iced coffee flex, LearnIT glory)
  ];
}

export const pickMultiplayerMatchDeck = generateMultiplayerMatchDeck;
