// 100 UNIQUE CAMPUS AURA RUSH CHALLENGES ACROSS 6 CATEGORIES
export const CHALLENGE_POOL_100 = [
  // ----------------------------------------------------
  // CATEGORY 1: REACTION & TIMING (16 CHALLENGES)
  // ----------------------------------------------------
  {
    id: 'c1',
    category: 'reaction_timing',
    kind: 'cap',
    mechanic: 'stamps',
    eyebrow: 'CAP DETECTOR',
    title: 'YOUR FRIEND SAYS “BRO I STUDIED.”',
    copy: 'Cap or no cap? Call it before the timer expires.',
    layout: 'stamps',
    options: [
      ['NO CAP', 'BELIEVE', 40, 'WHOLESOME.'],
      ['CAP', 'CALL IT', 140, 'LIE DETECTED.']
    ]
  },
  {
    id: 'c2',
    category: 'reaction_timing',
    kind: 'winloss',
    mechanic: 'binary',
    eyebrow: 'W OR L?',
    title: 'SUBMITTED AT 11:59 (DEADLINE: 12:00)',
    copy: 'Make the clutch call before the buzzer.',
    layout: 'binary',
    options: [
      ['W', 'CLUTCH', 140, 'THE ROOM SAYS W.'],
      ['L', 'FUMBLE', -60, 'THE ROOM DISAGREES.']
    ]
  },
  {
    id: 'c3',
    category: 'reaction_timing',
    kind: 'blink',
    mechanic: 'reflex',
    eyebrow: 'REFLEX TEST',
    title: 'DON’T BLINK.',
    copy: 'Tap the exact millisecond the eye closes. No flinching.',
    layout: 'blink'
  },
  {
    id: 'c4',
    category: 'reaction_timing',
    kind: 'timing',
    mechanic: 'timing_bar',
    eyebrow: 'DEADLINE CLUTCH',
    title: 'STOP THE NEEDLE AT MAX AURA.',
    copy: 'Land inside the green zone for cinematic timing.',
    layout: 'timing'
  },
  {
    id: 'c5',
    category: 'reaction_timing',
    kind: 'alarm',
    mechanic: 'alarm_picker',
    eyebrow: 'ALARM SPEEDRUN',
    title: 'DISMISS THE 7:45 AM ALARM.',
    copy: 'Four alarms ringing. Dismiss ONLY the 7:45 AM class alarm!',
    layout: 'alarms',
    alarms: [
      { time: '2:00 AM', label: 'LATE SNACK', correct: false },
      { time: '7:45 AM', label: '8 AM LECTURE', correct: true },
      { time: '6:30 AM', label: 'GYM DELUSION', correct: false },
      { time: '8:15 AM', label: 'TOO LATE', correct: false }
    ]
  },
  {
    id: 'c6',
    category: 'reaction_timing',
    kind: 'dontPress',
    mechanic: 'silent',
    eyebrow: 'SILENT AURA',
    title: 'DO NOTHING FOR 5 SECONDS.',
    copy: 'Tap anywhere and your aura drops. Hold your nerve.',
    layout: 'silent'
  },
  {
    id: 'c7',
    category: 'reaction_timing',
    kind: 'cap',
    mechanic: 'stamps_hackathon',
    eyebrow: 'HACKATHON CLAIM',
    title: '“OUR BACKEND IS FULLY READY” (1 HR LEFT)',
    copy: 'Judge this claim instantly.',
    layout: 'stamps',
    options: [
      ['REAL', 'TRUST', -50, 'IT WAS A HARDCODED JSON 💀'],
      ['FAKE', 'EXPOSE', 140, 'CALLED OUT IN 4K.']
    ]
  },
  {
    id: 'c8',
    category: 'reaction_timing',
    kind: 'winloss',
    mechanic: 'binary_viva',
    eyebrow: 'VIVA VERDICT',
    title: 'PROFESSOR ASKS: “ARE YOU SURE?”',
    copy: 'Do you double down or fold instantly?',
    layout: 'binary',
    options: [
      ['DOUBLE DOWN', '100% CERTAIN', 150, 'PROFESSOR BLINKED FIRST.'],
      ['FOLD INSTANTLY', 'SORRY SIR', -60, 'CONFIDENCE SHATTERED.']
    ]
  },
  {
    id: 'c9',
    category: 'reaction_timing',
    kind: 'blink',
    mechanic: 'reflex_bell',
    eyebrow: 'BELL RINGER',
    title: 'TAP THE EXACT MOMENT CLASS ENDS.',
    copy: 'Prof said “one last slide” 14 minutes ago. Tap when bell strikes!',
    layout: 'blink'
  },
  {
    id: 'c10',
    category: 'reaction_timing',
    kind: 'timing',
    mechanic: 'timing_proxy',
    eyebrow: 'PROXY CLUTCH',
    title: 'TIME YOUR “PRESENT SIR!”',
    copy: 'Too early = suspicious. Too late = marked absent. Hit the sweet spot!',
    layout: 'timing'
  },
  {
    id: 'c11',
    category: 'reaction_timing',
    kind: 'alarm',
    mechanic: 'alarm_assignment',
    eyebrow: 'PORTAL SPEEDRUN',
    title: 'SELECT THE ACTUAL SUBMISSION PORTAL.',
    copy: 'Three fake links, one real submission portal. Choose fast!',
    layout: 'alarms',
    alarms: [
      { time: 'LINK A', label: 'MOODLE (CRASHED)', correct: false },
      { time: 'LINK B', label: 'OFFICIAL PORTAL', correct: true },
      { time: 'LINK C', label: 'GOOGLE FORM (CLOSED)', correct: false },
      { time: 'LINK D', label: 'PROFESSOR EMAIL', correct: false }
    ]
  },
  {
    id: 'c12',
    category: 'reaction_timing',
    kind: 'dontPress',
    mechanic: 'silent_library',
    eyebrow: 'LIBRARY DISCIPLINE',
    title: 'SOMEONE DROPPED A STEEL BOTTLE.',
    copy: 'DO NOT LAUGH. DO NOT TAP. Maintain complete silence.',
    layout: 'silent'
  },
  {
    id: 'c13',
    category: 'reaction_timing',
    kind: 'winloss',
    mechanic: 'binary_canteen',
    eyebrow: 'CANTEEN GAMBLE',
    title: 'LAST SAMOSA ON THE COUNTER.',
    copy: 'Grab it or let someone else take it?',
    layout: 'binary',
    options: [
      ['SNATCH IT', 'ALPHA MOVE', 140, 'HOT SAMOSA SECURED.'],
      ['HESITATE', 'NPC MANEUVER', -40, 'TAKEN BY A 1ST YEAR.']
    ]
  },
  {
    id: 'c14',
    category: 'reaction_timing',
    kind: 'cap',
    mechanic: 'stamps_placement',
    eyebrow: 'PLACEMENT LORE',
    title: '“1 CRORE PACKAGE OFFERED TO SENIOR”',
    copy: 'Call the campus rumor mill.',
    layout: 'stamps',
    options: [
      ['CAP', 'MASSIVE CAP', 130, 'IT WAS ₹6 LPA + ₹94L STOCKS IN 2050.'],
      ['NO CAP', 'REAL', -40, 'BELIEVED WHATSAPP FORWARD.']
    ]
  },
  {
    id: 'c15',
    category: 'reaction_timing',
    kind: 'timing',
    mechanic: 'timing_wifi',
    eyebrow: 'CAMPUS WI-FI CLUTCH',
    title: 'CATCH THE WI-FI PACKET BEFORE DISCONNECT.',
    copy: 'Stop needle in the green zone to stay online.',
    layout: 'timing'
  },
  {
    id: 'c16',
    category: 'reaction_timing',
    kind: 'alarm',
    mechanic: 'alarm_mess',
    eyebrow: 'MESS TIMINGS',
    title: 'WHEN DOES SUNDAY SPECIAL LUNCH END?',
    copy: 'Pick the exact closing time before the biryani vanishes!',
    layout: 'alarms',
    alarms: [
      { time: '1:30 PM', label: 'LINE FORMS', correct: false },
      { time: '2:15 PM', label: 'GATES CLOSE', correct: true },
      { time: '3:00 PM', label: 'EMPTY TRAYS', correct: false },
      { time: '12:00 PM', label: 'NOT COOKED YET', correct: false }
    ]
  },

  // ----------------------------------------------------
  // CATEGORY 2: MEMORY & OBSERVATION (16 CHALLENGES)
  // ----------------------------------------------------
  {
    id: 'c17',
    category: 'memory_observation',
    kind: 'memoryLock',
    mechanic: 'memory',
    eyebrow: 'MEMORY LOCKER',
    title: 'WHAT ITEM WAS JUST STOLEN?',
    copy: 'Lock in. Memorise the items before one disappears.',
    layout: 'memory_lock',
    items: ['🍕', '🎧', '🛹'],
    missingItem: '🎧',
    answers: [['🍕', 'PIZZA', false], ['🎧', 'HEADPHONES', true], ['🛹', 'SKATEBOARD', false]]
  },
  {
    id: 'c18',
    category: 'memory_observation',
    kind: 'sequence',
    mechanic: 'sequence',
    eyebrow: 'SEQUENCE BREAKER',
    title: 'REPEAT THE HANDSHAKE.',
    copy: 'Memorise and tap the 3-icon sequence in order: 🤝 → ✌️ → 🗿',
    layout: 'sequence',
    targetSequence: ['🤝', '✌️', '🗿'],
    choices: ['🤝', '✌️', '🗿', '🔥']
  },
  {
    id: 'c19',
    category: 'memory_observation',
    kind: 'whoSent',
    mechanic: 'archetype',
    eyebrow: 'WHO SENT THIS?',
    title: '“BRO MARK PROXY, FIGHTING FOR MY LIFE.”',
    copy: 'Identify the campus archetype behind this message.',
    layout: 'chips',
    options: [
      ['👻', 'THE GHOST', 130, 'ACCURATE.'],
      ['🤓', 'THE FRONTBENCHER', -40, 'NEVER MISSES CLASS.'],
      ['📚', 'THE TOPPER', -50, 'DELUSIONAL GUESS.'],
      ['🏃', 'THE COMMUTER', 70, 'POSSIBLE.']
    ]
  },
  {
    id: 'c20',
    category: 'memory_observation',
    kind: 'libraryBoss',
    mechanic: 'priority',
    eyebrow: 'LIBRARY BOSS FIGHT',
    title: 'CHOOSE THE #1 WORST NOISE.',
    copy: 'Which distraction deserves immediate campus exile?',
    layout: 'danger',
    options: [
      ['🥔', 'LOUD CHIPS CRUNCHING', 140, 'EXILED IMMEDIATELY.'],
      ['📱', 'PHONE ON FULL SPEAKER', 120, 'NPC BEHAVIOUR.'],
      ['🗣️', 'GROUP WHISPERING', 80, 'UNDERSTANDABLE PAIN.'],
      ['🎧', 'AUDIO LEAKING FROM AIRPODS', 60, 'MILD NUISANCE.']
    ]
  },
  {
    id: 'c21',
    category: 'memory_observation',
    kind: 'slang',
    mechanic: 'definition',
    eyebrow: 'SLANG SCAN',
    title: '“IT’S GIVING…” MEANS?',
    copy: 'Choose the closest internet vibe, not the dictionary definition.',
    layout: 'definition',
    options: [
      ['A CERTAIN VIBE', 'CORRECT', 120, 'SPEAKS INTERNET.'],
      ['SOMETHING BROKE', 'NOPE', -45, 'TECH SUPPORT ARC.'],
      ['IT’S FINISHED', 'NOPE', -45, 'NOT QUITE.'],
      ['IT’S EXPENSIVE', 'NOPE', -45, 'MONEY MENTIONED.']
    ]
  },
  {
    id: 'c22',
    category: 'memory_observation',
    kind: 'translate',
    mechanic: 'chat',
    eyebrow: 'CHAT TRANSLATOR',
    title: '“NAH TS IS COOKED NGL 💀”',
    copy: 'What is the true translation?',
    layout: 'chat',
    options: [
      ['EVERYTHING IS FINE', 'DELUSION', -50, 'READ IT AGAIN.'],
      ['THIS IS TERRIBLE', 'TRANSLATION', 130, 'FLUENT.'],
      ['SOMEONE IS HUNGRY', 'RANDOM', -20, 'WHERE DID FOOD COME FROM?'],
      ['WE ARE LEAVING', 'POSSIBLE', 30, 'MAYBE.']
    ]
  },
  {
    id: 'c23',
    category: 'memory_observation',
    kind: 'memoryLock',
    mechanic: 'memory_canteen',
    eyebrow: 'CANTEEN TRAY RECALL',
    title: 'WHICH SNACK DISAPPEARED?',
    copy: 'Someone snuck food off your table. Identify what is missing!',
    layout: 'memory_lock',
    items: ['🍔', '🍟', '🥤'],
    missingItem: '🍟',
    answers: [['🍔', 'BURGER', false], ['🍟', 'FRIES', true], ['🥤', 'COLD DRINK', false]]
  },
  {
    id: 'c24',
    category: 'memory_observation',
    kind: 'sequence',
    mechanic: 'sequence_code',
    eyebrow: 'HACKER SEQUENCE',
    title: 'REPRODUCE THE CODE PATTERN.',
    copy: 'Tap in exact order: 💻 → ⚡ → 🚀',
    layout: 'sequence',
    targetSequence: ['💻', '⚡', '🚀'],
    choices: ['💻', '⚡', '🚀', '🛑']
  },
  {
    id: 'c25',
    category: 'memory_observation',
    kind: 'whoSent',
    mechanic: 'archetype_doubt',
    eyebrow: 'WHO SENT THIS?',
    title: '“MA’AM WILL THIS TOPIC COME IN THE ENDSEM?”',
    copy: 'Identify the campus villain who asked this with 1 min left.',
    layout: 'chips',
    options: [
      ['🤓', 'OVERACHIEVER 3000', 150, 'ENTIRE CLASS IS GLARING.'],
      ['😴', 'BACKBENCHER', -60, 'WAS ASLEEP SINCE 8:05 AM.'],
      ['🤷', 'CONFUSED TOURIST', -20, 'DOESN’T EVEN KNOW THE SUBJECT.'],
      ['☕', 'CANTEEN REGULAR', 30, 'UNLIKELY.']
    ]
  },
  {
    id: 'c26',
    category: 'memory_observation',
    kind: 'slang',
    mechanic: 'definition_rizz',
    eyebrow: 'INTERNET LORE',
    title: '“UNSPOKEN RIZZ” MEANS?',
    copy: 'Select the true meaning of this forbidden concept.',
    layout: 'definition',
    options: [
      ['NATURAL CHARISMA WITHOUT TRYING', 'FACTS', 140, 'UNTOUCHABLE VIBES.'],
      ['YAPPING FOR 45 MINUTES', 'L', -60, 'THAT IS HARASSMENT 💀'],
      ['SENDING 80 REELS DAILY', 'SPAM', -40, 'DESPERATION.'],
      ['HAVING A 4.0 GPA', 'NERD', 20, 'ACADEMIC RIZZ AT BEST.']
    ]
  },
  {
    id: 'c27',
    category: 'memory_observation',
    kind: 'translate',
    mechanic: 'chat_prof',
    eyebrow: 'PROFESSOR TRANSLATION',
    title: '“I WILL BE EVALUATING STRICTLY.”',
    copy: 'What did the professor actually mean?',
    layout: 'chat',
    options: [
      ['EVERYONE GETS A C-', 'REAL MEANING', 140, 'BRACE FOR IMPACT.'],
      ['HE WILL GIVE BONUS MARKS', 'DELUSION', -70, 'COPE HARDER.'],
      ['HE IS JOKING', 'FATAL MISTAKE', -50, 'HE NEVER JOKES.'],
      ['EXAM WILL BE EASY', 'HOPELESS', -80, 'PACK YOUR BAGS.']
    ]
  },
  {
    id: 'c28',
    category: 'memory_observation',
    kind: 'whoSent',
    mechanic: 'archetype_late',
    eyebrow: 'WHO SENT THIS?',
    title: '“LEAVING HOSTEL NOW (HE IS STILL IN BED).”',
    copy: 'Identify this legendary campus creature.',
    layout: 'chips',
    options: [
      ['⏰', 'THE CHRONIC LATECOMER', 140, 'HE’S BRUSHING HIS TEETH.'],
      ['🏃', 'THE MARATHON RUNNER', -30, 'NOT THIS GUY.'],
      ['🎯', 'THE TIMEKEEPER', -60, 'OPPOSITE ENERGY.'],
      ['📚', 'CR (CLASS REP)', 20, 'CR WOULD NEVER.']
    ]
  },
  {
    id: 'c29',
    category: 'memory_observation',
    kind: 'memoryLock',
    mechanic: 'memory_stationery',
    eyebrow: 'EXAM HALL RECALL',
    title: 'WHICH PEN WAS BORROWED & NEVER RETURNED?',
    copy: 'Spot the stolen exam essential!',
    layout: 'memory_lock',
    items: ['🖊️', '📐', '✏️'],
    missingItem: '🖊️',
    answers: [['🖊️', 'BLUE GEL PEN', true], ['📐', 'RULER', false], ['✏️', 'PENCIL', false]]
  },
  {
    id: 'c30',
    category: 'memory_observation',
    kind: 'sequence',
    mechanic: 'sequence_meme',
    eyebrow: 'BRAINROT COMBO',
    title: 'REPEAT THE REEL SEQUENCE.',
    copy: 'Tap in exact order: 🗿 → 💀 → 👑',
    layout: 'sequence',
    targetSequence: ['🗿', '💀', '👑'],
    choices: ['🗿', '💀', '👑', '🤡']
  },
  {
    id: 'c31',
    category: 'memory_observation',
    kind: 'libraryBoss',
    mechanic: 'priority_groupwork',
    eyebrow: 'GROUP PROJECT HAZARD',
    title: 'CHOOSE THE WORST GROUP PROJECT OFFENDER.',
    copy: 'Who gets removed from the final PPT credit slide?',
    layout: 'danger',
    options: [
      ['👻', 'DISAPPEARS UNTIL SUBMISSION NIGHT', 150, 'CREDIT REVOKED.'],
      ['🎨', 'ONLY DOES THE FONTS & COLORS', 80, 'AT LEAST PPT LOOKS CLEAN.'],
      ['✍️', 'DOES EVERYTHING ALONE AT 3 AM', 40, 'SUFFERING HERO.'],
      ['📊', 'SENDS CHATGPT OUTPUT WITH [Insert Name]', 130, 'CRIMINAL LAZINESS.']
    ]
  },
  {
    id: 'c32',
    category: 'memory_observation',
    kind: 'slang',
    mechanic: 'definition_lockin',
    eyebrow: 'SLANG SCAN',
    title: '“LOCK IN” MEANS?',
    copy: 'Define the state of absolute academic desperation.',
    layout: 'definition',
    options: [
      ['ENTER MAXIMUM FOCUS MODE INSTANTLY', 'FACTS', 140, 'RED BULL POPPED.'],
      ['LOCK YOUR DORM DOOR', 'LITERAL', -50, 'WRONG CONTEXT.'],
      ['CANCEL ALL PLANS AND CRY', 'COPE', 20, 'PARTIALLY TRUE.'],
      ['CHECK SOCIAL MEDIA ONCE MORE', 'TRAP', -60, 'THAT’S LOCKING OUT.']
    ]
  },

  // ----------------------------------------------------
  // CATEGORY 3: RISK & REWARD (18 CHALLENGES)
  // ----------------------------------------------------
  {
    id: 'c33',
    category: 'risk_reward',
    kind: 'auraAuction',
    mechanic: 'wager',
    eyebrow: 'AURA AUCTION',
    title: 'BID FOR THE ONLY WORKING CHARGER PLUG.',
    copy: 'Higher bids yield bigger aura multiplier, but risk is real.',
    layout: 'danger',
    options: [
      ['⚡ 50 AURA', 'SAFE BID', 60, 'CONSERVATIVE PLAY.'],
      ['⚡ 120 AURA', 'AGGRESSIVE', 140, 'CHARGER SECURED.'],
      ['⚡ ALL-IN AURA', 'CHAOS BID', 240, 'ABSOLUTE CINEMA.'],
      ['🚶 WALK AWAY', 'ZERO RISK', -20, 'BATTERY DIED AT 2%.']
    ]
  },
  {
    id: 'c34',
    category: 'risk_reward',
    kind: 'auraInvest',
    mechanic: 'invest',
    eyebrow: 'AURA INVESTMENT',
    title: 'INVEST 100 AURA INTO A CAMPUS STARTUP.',
    copy: 'High risk, absurd return.',
    layout: 'danger',
    options: [
      ['🥟 SAMOSA FUTURES', '+200 AURA', 200, 'CANTEEN ECONOMY BOOM.'],
      ['🤖 AI PROXY BOT', '+120 AURA', 120, 'PROFESSOR OUTSMARTED.'],
      ['🐱 DATING APP FOR CATS', '+160 AURA', 160, 'SILICON VALLEY WANTS IN.'],
      ['💤 8 AM SLEEP TOKEN', '-100 AURA', -100, 'RUG PULLED BY ATTENDANCE.']
    ]
  },
  {
    id: 'c35',
    category: 'risk_reward',
    kind: 'oneChance',
    mechanic: 'all_or_nothing',
    eyebrow: 'ONE CHANCE',
    title: 'THE SURPRISE VIVA QUESTION IS DROPPED.',
    copy: 'One clutch attempt. Maximum risk.',
    layout: 'danger',
    options: [
      ['“ACCORDING TO MY RESEARCH...”', 'CONFIDENT YAP', 220, 'PROFESSOR CONVINCED.'],
      ['“CAN YOU REPEAT THE QUESTION?”', 'STALL FOR TIME', 60, 'SURVIVED.'],
      ['“I WAS NOT PRESENT BRO”', 'HONEST FATAL', -140, 'VIVA FUMBLED.']
    ]
  },
  {
    id: 'c36',
    category: 'risk_reward',
    kind: 'finalWarning',
    mechanic: 'gamble',
    eyebrow: 'FINAL WARNING',
    title: 'GROUP CHAT ROAST BATTLE.',
    copy: 'Choose your level of flame.',
    layout: 'versus',
    options: [
      ['MILD JOKE', 'SAFE (+80)', 80, 'CROWD CHUCKLES.'],
      ['TACTICAL MEME NUKE', 'HIGH RISK (+220)', 220, 'GROUP CHAT SHUT DOWN.']
    ]
  },
  {
    id: 'c37',
    category: 'risk_reward',
    kind: 'ratio',
    mechanic: 'prediction',
    eyebrow: 'RATIO CHECK',
    title: '“ATTENDANCE CRITERIA SHOULD BE 0%.”',
    copy: 'Predict the campus room consensus.',
    layout: 'binary',
    options: [
      ['99% AGREE', 'OBVIOUS', 130, 'UNANIMOUS AURA.'],
      ['50% DISAGREE', 'WRONG', -50, 'NOT THIS CAMPUS.']
    ]
  },
  {
    id: 'c38',
    category: 'risk_reward',
    kind: 'hotTake',
    mechanic: 'binary_opinion',
    eyebrow: 'CAMPUS HOT TAKE',
    title: '“8 AM CLASSES BUILD CHARACTER.”',
    copy: 'Is this take a W or an L?',
    layout: 'binary',
    options: [
      ['L', 'MASSIVE L', 130, 'FACTS.'],
      ['W', 'DELUSIONAL', -80, 'WHO HURT YOU?']
    ]
  },
  {
    id: 'c39',
    category: 'risk_reward',
    kind: 'auraAuction',
    mechanic: 'wager_hackathon',
    eyebrow: 'HACKATHON ALL-NIGHTER',
    title: 'HOW MANY ENERGY DRINKS AT 3:00 AM?',
    copy: 'Balance heart rate against code output.',
    layout: 'danger',
    options: [
      ['💧 1 WATER BOTTLE', 'HYDRATED (+70)', 70, 'HEALTHY BUT SLOW.'],
      ['⚡ 2 RED BULLS', 'OPTIMAL (+160)', 160, 'SHIPPING 400 COMMITS.'],
      ['🧪 5 MONSTER CANS', 'HEART PALPITATIONS (+240)', 220, 'TRANSCENDED REALITY.'],
      ['😴 15 MIN POWER NAP', 'FATAL SLEEP (-100)', -100, 'WOKE UP AT 11 AM.']
    ]
  },
  {
    id: 'c40',
    category: 'risk_reward',
    kind: 'auraInvest',
    mechanic: 'invest_learnit',
    eyebrow: 'LEARNIT LAB VENTURE',
    title: 'WHICH PROJECT DO YOU BACK WITH 200 AURA?',
    copy: 'Back the project with the highest viral ceiling.',
    layout: 'build-cards',
    options: [
      ['🍔 CANTEEN SMART TRACKER', '+180 AURA', 180, 'ACQUIRED BY SWIGGY.'],
      ['🕶️ AI GLASSES FOR EYE CONTACT', '+220 AURA', 220, 'TOP 1 DEMO DAY.'],
      ['💤 AUTOMATIC SNOOZE ROBOT', '+120 AURA', 120, 'SOLD OUT IN DORM.'],
      ['📄 FONT SIZE 11 TO 12 EXPANDER', '-90 AURA', -90, 'DETECTED BY TURNITIN.']
    ]
  },
  {
    id: 'c41',
    category: 'risk_reward',
    kind: 'oneChance',
    mechanic: 'all_or_nothing_prof',
    eyebrow: 'ONE CHANCE',
    title: 'COLD EMAILING A TECH CEO FOR AN INTERNSHIP.',
    copy: 'Pick the subject line with maximum conversion aura.',
    layout: 'dialogue',
    options: [
      ['“I FIXED YOUR LANDING PAGE BUG IN 10 MINS”', 'ALPHA EMAIL', 240, 'OFFER LETTER IN 2 HOURS.'],
      ['“RESPECTED SIR, PLEASE FIND ATTACHED RESUME”', 'DEFAULT NPC', 40, 'SENT TO SPAM FOLDER.'],
      ['“HI BRO GIVE JOB”', 'UNHINGED', -80, 'BLOCKED ON LINKEDIN.'],
      ['“WILL WORK FOR FREE PIZZA”', 'DESPERATE', -40, 'EXPLOITATION COMMENCED.']
    ]
  },
  {
    id: 'c42',
    category: 'risk_reward',
    kind: 'finalWarning',
    mechanic: 'gamble_poker',
    eyebrow: 'EXAM HALL BLUFF',
    title: 'YOU KNOW 0 OUT OF 5 QUESTIONS.',
    copy: 'How many extra answer sheets do you ask for to intimidate everyone?',
    layout: 'versus',
    options: [
      ['ASK FOR 3 SUPPLEMENTARY SHEETS', 'PSYCHOLOGICAL WARFARE', 200, 'WHOLE ROOM IN SHAMBLES.'],
      ['JUST SIT AND DRAW FLOWCHARTS', 'HONEST ATTEMPT', 80, 'MIGHT GET PASSING MARKS.']
    ]
  },
  {
    id: 'c43',
    category: 'risk_reward',
    kind: 'ratio',
    mechanic: 'prediction_canteen',
    eyebrow: 'RATIO CHECK',
    title: '“MAGGI WITH EXTRA MASALA > 5-STAR MEALS”',
    copy: 'Predict hostel student agreement percentage.',
    layout: 'binary',
    options: [
      ['98% AGREE', 'HOSTEL TRUTH', 140, 'UNCONTESTED FACT.'],
      ['30% DISAGREE', 'FALSE', -50, 'NEVER LIVED IN A DORM.']
    ]
  },
  {
    id: 'c44',
    category: 'risk_reward',
    kind: 'hotTake',
    mechanic: 'binary_ai',
    eyebrow: 'CAMPUS HOT TAKE',
    title: '“CODING WITHOUT AI IN 2026 IS LIKE COOKING WITH STICKS.”',
    copy: 'Is this take a W or an L?',
    layout: 'binary',
    options: [
      ['W', 'REAL TALK', 140, 'COPILOT IS MY COFOUNDER.'],
      ['L', 'PURIST COPE', -60, 'WRITING C++ IN NOTEPAD.']
    ]
  },
  {
    id: 'c45',
    category: 'risk_reward',
    kind: 'auraAuction',
    mechanic: 'wager_crush',
    eyebrow: 'CRUSH LOTTERY',
    title: 'HOW MUCH AURA DO YOU BET ON TEXTING FIRST?',
    copy: 'The typing bubble appears for 2 seconds...',
    layout: 'danger',
    options: [
      ['⚡ 40 AURA', 'SAFE MEME DROP', 80, 'LAUGH EMOJI RECEIVED.'],
      ['⚡ 150 AURA', 'DIRECT COFFEE INVITE', 200, 'DATE CONFIRMED.'],
      ['⚡ ALL-IN', '“WE ARE GETTING MARRIED”', -120, 'LEFT ON READ FOR 3 WEEKS.'],
      ['🚶 NEVER TEXT', 'GHOST', -50, 'FRIENDZONED FOREVER.']
    ]
  },
  {
    id: 'c46',
    category: 'risk_reward',
    kind: 'auraInvest',
    mechanic: 'invest_crypto',
    eyebrow: 'DORM CRYPTO BRO',
    title: 'ROOMMATE SAYS “INVEST IN SAMOSA-COIN BRO.”',
    copy: 'Risk your monthly pocket money.',
    layout: 'danger',
    options: [
      ['PUT IN ₹500', 'CHAOS SPECULATOR', 160, '10X RETURN IN 24 HRS.'],
      ['BUY ACTUAL SAMOSAS INSTEAD', 'TANGIBLE ASSET', 120, 'STOMACH FULL.'],
      ['CALL HIS PARENTS', 'SNITCH', -70, 'NEGATIVE AURA.'],
      ['PUT YOUR TUITION FEE', 'FATAL GAMBLE', -180, 'EXPELLED FROM COLLEGE.']
    ]
  },
  {
    id: 'c47',
    category: 'risk_reward',
    kind: 'oneChance',
    mechanic: 'all_or_nothing_presentation',
    eyebrow: 'PROJECT DEMO DAY',
    title: 'YOUR DEMO CODE CRASHES ON PROJECTOR.',
    copy: 'What is your immediate 1-second clutch move?',
    layout: 'danger',
    options: [
      ['“THIS IS OUR SECURITY FIREWALL FEATURE”', 'GOD-TIER YAP', 250, 'JUDGES APPLAUDED.'],
      ['RESTART LAPTOP IN SILENCE', 'AWKWARD PAUSE', 50, 'MOMENTUM LOST.'],
      ['BLAME THE HDMI CABLE', 'CLASSIC DEFLECTION', 90, 'ROOM NODS IN SYMPATHY.'],
      ['CRY ON STAGE', 'NPC TEARS', -150, 'DEMO DISASTER.']
    ]
  },
  {
    id: 'c48',
    category: 'risk_reward',
    kind: 'ratio',
    mechanic: 'prediction_wifi',
    eyebrow: 'RATIO CHECK',
    title: '“CAMPUS WI-FI WORKS BEST AT 3:30 AM.”',
    copy: 'Predict late night student consensus.',
    layout: 'binary',
    options: [
      ['100% FACT', 'UNDENIABLE', 130, 'BANDWIDTH OPEN.'],
      ['50% CAP', 'WRONG', -50, 'NOT AWAKE AT 3 AM.']
    ]
  },
  {
    id: 'c49',
    category: 'risk_reward',
    kind: 'hotTake',
    mechanic: 'binary_topper',
    eyebrow: 'CAMPUS HOT TAKE',
    title: '“THE GUY WHO SLEEPS 9 HOURS BEATS THE GUY WHO GRINDS 20.”',
    copy: 'W or L take?',
    layout: 'binary',
    options: [
      ['W', 'CIRCADIAN RHYTHM W', 140, 'BRAIN ONLINE & SHARP.'],
      ['L', 'GRINDSET ILLUSION', -60, 'BURNOUT INCOMING.']
    ]
  },
  {
    id: 'c50',
    category: 'risk_reward',
    kind: 'finalWarning',
    mechanic: 'gamble_attendance',
    eyebrow: '74.9% ATTENDANCE GAMBLE',
    title: 'NEED EXACTLY 1 ATTENDANCE TO SIT FOR EXAMS.',
    copy: 'High stakes decision.',
    layout: 'versus',
    options: [
      ['WAKE UP AT 7:30 AM FOR 8 AM CLASS', 'SECURED (+140)', 140, 'HALL TICKET ISSUED.'],
      ['PRAY PROFESSOR ROUNDS UP 74.9% TO 75%', 'DANGEROUS COPE (-80)', -80, 'DEBARRED.']
    ]
  },

  // ----------------------------------------------------
  // CATEGORY 4: DECISION & SCENARIOS (20 CHALLENGES)
  // ----------------------------------------------------
  {
    id: 'c51',
    category: 'decision_scenario',
    kind: 'lastSeat',
    mechanic: 'multi_choice',
    eyebrow: 'LAST SEAT',
    title: 'ONE SEAT LEFT IN ROW 3.',
    copy: 'Where do you deploy your presence?',
    layout: 'dialogue',
    options: [
      ['SIT BESIDE THE PROFESSOR', 'PSYCHOPATH AURA', 160, 'FEARLESS.'],
      ['SQUEEZE BETWEEN A COUPLE', 'AWKWARD', -40, 'ROOM TENSION RISES.'],
      ['STAND AT THE BACK LIKE A MONK', 'PHILOSOPHER', 120, 'TACTICAL DISTANCE.'],
      ['LEAVE AND GET CHAI', 'HONEST', 50, 'CANTEEN ESCAPE.']
    ]
  },
  {
    id: 'c52',
    category: 'decision_scenario',
    kind: 'hostelCrisis',
    mechanic: 'multi_choice',
    eyebrow: 'HOSTEL CRISIS',
    title: '2:30 AM AND MAGGI IS FINISHED.',
    copy: 'Emergency protocol activated.',
    layout: 'route',
    options: [
      ['RAID 2ND FLOOR KITCHEN', 'PIRATE AURA', 130, 'LOOT SECURED.'],
      ['ORDER FROM 6KM AWAY', 'EXPENSIVE', 60, 'DELIVERY ARRIVES AT 4 AM.'],
      ['SLEEP AND DREAM OF CARBS', 'RESIGNED', 20, 'HUNGER DEFEATED YOU.'],
      ['BORROW SNOOZE INDUCERS', 'SUS', -30, 'NOT THE VIBE.']
    ]
  },
  {
    id: 'c53',
    category: 'decision_scenario',
    kind: 'wrongClass',
    mechanic: 'multi_choice',
    eyebrow: 'WRONG CLASS',
    title: 'ENTERED ADVANCED FLUID DYNAMICS BY MISTAKE.',
    copy: 'The professor is already staring.',
    layout: 'dialogue',
    options: [
      ['CONFIDENTLY NOD AND TAKE NOTES', 'STEALTH', 140, 'PROFESSOR RESPECTS YOU.'],
      ['ACT LIKE A GUEST LECTURER', 'UNHINGED', 180, 'ABSOLUTE CINEMA.'],
      ['MOONWALK OUT BACKWARDS', 'COMEDY', 90, 'LEGENDARY ESCAPE.'],
      ['APOLOGISE AND CRY', 'NPC', -60, 'AURA IN CRITICAL STATE.']
    ]
  },
  {
    id: 'c54',
    category: 'decision_scenario',
    kind: 'canteenBudget',
    mechanic: 'budget',
    eyebrow: 'CANTEEN NEGOTIATOR',
    title: 'YOU HAVE ₹80. BUILD LUNCH.',
    copy: 'Maximise happiness, value and quantity.',
    layout: 'budget',
    options: [
      ['🥟 + 🥤', 'SAMOSA + COLD DRINK / ₹50', 120, 'BALANCED MEAL.'],
      ['🌯', 'BIG ROLL / ₹60', 90, 'SINGLE-ITEM SPECIALIST.'],
      ['🍟 + 🥟', 'FRIES + SAMOSA / ₹70', 150, 'CANTEEN IQ.'],
      ['💧', 'JUST WATER / ₹0', -70, 'GRINDSET GONE WRONG.']
    ]
  },
  {
    id: 'c55',
    category: 'decision_scenario',
    kind: 'campusMap',
    mechanic: 'route',
    eyebrow: 'CAMPUS MAP CHAOS',
    title: 'FASTEST SHORTCUT TO LAB 3.',
    copy: 'Class starts in 3 minutes.',
    layout: 'route',
    options: [
      ['SPRINT THROUGH CANTEEN CROWD', 'OBSTACLE COURSE', 110, 'AGILITY CHECK PASSED.'],
      ['JUMP OVER THE CENTRAL LAWN', 'PARKOUR', 140, 'GUARD WAS LOOKING AWAY.'],
      ['WAIT FOR ELEVATOR', 'TRAP', -80, 'ELEVATOR BUFFERING.'],
      ['WALK NORMALLY', 'TOO SLOW', -40, 'LATE BY 10 MINS.']
    ]
  },
  {
    id: 'c56',
    category: 'decision_scenario',
    kind: 'attendance',
    mechanic: 'meter_choice',
    eyebrow: 'ATTENDANCE SIMULATOR',
    title: 'ATTENDANCE: 74.2%',
    copy: 'One lecture left tomorrow. What is the play?',
    layout: 'meter-choice',
    options: [
      ['GO TO CLASS', 'SAFE', 130, 'LOCKED IN.'],
      ['EMAIL PROFESSOR', 'BOLD', 45, 'DIPLOMACY.'],
      ['PRAY', 'SPIRITUAL', 20, 'HIGHER POWERS.'],
      ['ASK FOR PROXY', 'CHAOS', 70, 'RISK TAKEN.']
    ]
  },
  {
    id: 'c57',
    category: 'decision_scenario',
    kind: 'morning',
    mechanic: 'route_morning',
    eyebrow: '8 AM LECTURE',
    title: '7:42 AM. CLASS AT 8.',
    copy: 'Twelve minutes away. Pick one move.',
    layout: 'route',
    options: [
      ['🏃 RUN WITHOUT BREAKFAST', 'LOCKED IN', 130, 'PULL UP ON TIME.'],
      ['🚿 SHOWER FIRST', 'TIME BLIND', -50, 'REACH AT 8:30 AM.'],
      ['😴 GO BACK TO SLEEP', 'SNOOZE AURA', -120, 'ATTENDANCE COOKED.'],
      ['📱 ASK IF ATTENDANCE HAI', 'INFO FIRST', 50, 'PROACTIVE SCOUT.']
    ]
  },
  {
    id: 'c58',
    category: 'decision_scenario',
    kind: 'exam',
    mechanic: 'exam',
    eyebrow: 'EXAM HALL DISASTER',
    title: 'STUDIED CHAPTER 1. EXAM IS CHAPTER 4.',
    copy: 'Activate the survival instinct.',
    layout: 'exam',
    options: [
      ['🧮 CALCULATE PASS MARKS', 'REALISTIC', 90, '28/100 SURVIVAL PLAN.'],
      ['🔮 ACTIVATE DELUSION', 'ACADEMIC MAGIC', 130, 'WRITING INVENTED THEOREMS.'],
      ['😶 ACCEPT FATE', 'ZEN MODE', 20, 'PEACE IN TRAGEDY.'],
      ['📖 READ FROM THE BACK', 'TACTICAL', 50, 'LAST MINUTE FORMULAS.']
    ]
  },
  {
    id: 'c59',
    category: 'decision_scenario',
    kind: 'lastSeat',
    mechanic: 'seat_front',
    eyebrow: 'LECTURE THEATRE SEATING',
    title: 'WHERE DO YOU SIT IN A 300-PERSON AUDITORIUM?',
    copy: 'Select your zone of strategic operation.',
    layout: 'dialogue',
    options: [
      ['DEAD CENTER ROW 1', 'ACADEMIC MONSTER', 150, 'PROFESSOR KNOWS YOUR NAME.'],
      ['LAST ROW CORNER NEAR CHARGER', 'TACTICAL EMPEROR', 160, 'GOD TIER SEAT.'],
      ['MIDDLE SEAT BLOCKED BY 8 PEOPLE', 'PRISONER', -40, 'CAN NEVER LEAVE.'],
      ['NEXT TO THE EXIT DOOR', 'ESCAPE ARTIST', 100, 'GONE BEFORE CLASS ENDS.']
    ]
  },
  {
    id: 'c60',
    category: 'decision_scenario',
    kind: 'canteenBudget',
    mechanic: 'budget_hackathon',
    eyebrow: 'HACKATHON HARDWARE BUDGET',
    title: 'YOU HAVE ₹500 TO BUILD A HARDWARE PROTOTYPE.',
    copy: 'Deploy resources smartly.',
    layout: 'budget',
    options: [
      ['ARDUINO + CARDBOARD + TAPE', 'MACGYVER BUILD', 160, 'WORKS ON STAGE.'],
      ['ESP32 + SENSORS + 0 SLEEP', 'IOT WIZARD', 150, 'SMART SYSTEM ONLINE.'],
      ['BUY PIZZA FOR THE TEAM INSTEAD', 'MORALE FIRST', 100, 'TEAM HAPPY BUT NO CODE.'],
      ['EXPENSIVE 3D PRINT (FAILED)', 'BUDGET DRAIN', -70, 'PLASTIC MELTED.']
    ]
  },
  {
    id: 'c61',
    category: 'decision_scenario',
    kind: 'wrongClass',
    mechanic: 'dialogue_excuse',
    eyebrow: 'CAUGHT WITHOUT LAB COAT',
    title: 'CHEM LAB TA STOPS YOU AT THE DOOR.',
    copy: 'Deliver the most persuasive excuse.',
    layout: 'dialogue',
    options: [
      ['“MY EXPERIMENT IS THEORETICAL TODAY”', 'QUANTUM AURA', 160, 'TA IS TOO CONFUSED TO ARGUE.'],
      ['“SOMEONE TOOK MINE FROM THE HOOK”', 'VICTIM PLAY', 80, 'TA GIVES SPARE.'],
      ['“I WAS WEARING IT ON THE INSIDE”', 'TERRIBLE LIE', -80, 'KICKED OUT OF LAB.'],
      ['SPRINT PAST WHILE SCREAMING', 'CHAOS ESCAPE', 60, 'POLICE CALLED.']
    ]
  },
  {
    id: 'c62',
    category: 'decision_scenario',
    kind: 'attendance',
    mechanic: 'meter_rain',
    eyebrow: 'MONSOON DILEMMA',
    title: 'HEAVY RAIN OUTSIDE. CLASS IN 20 MINS.',
    copy: 'Make the monsoon call.',
    layout: 'meter-choice',
    options: [
      ['PUT ON CROCS & EMBRACE THE STORM', 'COMMITTED', 140, 'MAIN CHARACTER WALK.'],
      ['MAKE MAGGI & SLEEP', 'PEACEFUL', 60, 'SOUL HEALED.'],
      ['ORDER AN UBER (SURGE 4X)', 'BANKRUPTCY', -50, '₹450 FOR 800 METERS.'],
      ['EMAIL CR: “IS ATTENDANCE MANDATORY?”', 'RECONNAISSANCE', 80, 'WAITING FOR INTEL.']
    ]
  },
  {
    id: 'c63',
    category: 'decision_scenario',
    kind: 'hostelCrisis',
    mechanic: 'crisis_laundry',
    eyebrow: 'WARDROBE CRISIS',
    title: 'EVERY SINGLE SHIRT IS IN THE LAUNDRY.',
    copy: 'Class presentation starts in 15 minutes.',
    layout: 'route',
    options: [
      ['WEAR LEARNIT MERCH HOODIE', 'TECH COFOUNDER VIBE', 160, 'INVESTORS ARE INTERESTED.'],
      ['BORROW ROOMMATE’S XL SUIT', 'OVERSIZED MOBSTER', 70, 'MEMORABLE PRESENTATION.'],
      ['TURN SHIRT INSIDE OUT', 'DESPERATE MOVE', -40, 'LABEL VISIBLE IN 4K.'],
      ['PRESENT OVER GOOGLE MEET WITH CAMERA OFF', 'GHOST DEMO', 90, 'GLITCH EXCUSE USED.']
    ]
  },
  {
    id: 'c64',
    category: 'decision_scenario',
    kind: 'exam',
    mechanic: 'exam_mcq',
    eyebrow: 'MULTIPLE CHOICE DILEMMA',
    title: 'THE LAST 4 QUESTIONS WERE ALL (C).',
    copy: 'What is question 5?',
    layout: 'exam',
    options: [
      ['PICK (C) AGAIN TO PROVE A POINT', 'CHAOS CONFIDENCE', 150, 'STATISTICAL ANOMALY W.'],
      ['PICK (B) BECAUSE (C) CAN’T HAPPEN 5 TIMES', 'GAMBLER’S FALLACY', 40, 'OVERTHINKING.'],
      ['PICK (A) & (D) TOGETHER', 'INVALID', -80, 'MACHINE CANNOT READ.'],
      ['ROLL A DIE', 'HONEST CHANCE', 70, 'LUCK DECIDES.']
    ]
  },
  {
    id: 'c65',
    category: 'decision_scenario',
    kind: 'campusMap',
    mechanic: 'shortcut_night',
    eyebrow: 'NIGHT CANTEEN RUN',
    title: '11:45 PM. GATE CLOSES AT 12:00 AM.',
    copy: 'Navigate past the hostel warden.',
    layout: 'route',
    options: [
      ['CRAWL UNDER BOUNDARY WALL GAP', 'SPECIAL OPS', 150, 'CHAI SECURED.'],
      ['BRIBE GUARD WITH ONE SAMOSA', 'DIPLOMATIC ALLY', 140, 'GUARD OPENS GATE.'],
      ['ASK FOR FORMAL OUT-PASS', 'BUREAUCRACY', -60, 'APPROVED AT 9 AM TOMORROW.'],
      ['GIVE UP AND DRINK TAP WATER', 'RESIGNED', -20, 'THIRST DEFEATED YOU.']
    ]
  },
  {
    id: 'c66',
    category: 'decision_scenario',
    kind: 'wrongClass',
    mechanic: 'quiz_pop',
    eyebrow: 'POP QUIZ INCOMING',
    title: 'PROFESSOR HANDS OUT BLANK PAPERS.',
    copy: 'Choose your immediate posture.',
    layout: 'dialogue',
    options: [
      ['CRACK KNUCKLES AND SMILE', 'INTIMIDATION', 160, 'WHOLE BENCH IS SCARED OF YOU.'],
      ['BORROW EXTRA PEN IMMEDIATELY', 'PREPARED', 70, 'READY FOR ACTION.'],
      ['STARE OUT THE WINDOW', 'POETIC ESCAPE', 40, 'PHILOSOPHICAL FAIL.'],
      ['ASK “SIR IS THIS GRADED?”', 'FATAL QUESTION', -70, 'PROF: “NOW IT COUNTS FOR 40%”.']
    ]
  },
  {
    id: 'c67',
    category: 'decision_scenario',
    kind: 'canteenBudget',
    mechanic: 'budget_midnight',
    eyebrow: 'MIDNIGHT SNACK NEGOTIATION',
    title: 'CANTEEN BHAIYA IS CLOSING THE SHUTTER.',
    copy: 'One item left before total lockdown.',
    layout: 'budget',
    options: [
      ['“BHAIYA 1 CHAI & 1 BUN MASKA PLEASE”', 'CANTEEN CHARM', 150, 'BHAIYA SMILES & COOKS.'],
      ['“TAKE EXTRA ₹50”', 'PAY TO WIN', 90, 'CAPITALISM W.'],
      ['BANG ON SHUTTER', 'HOSTILE', -90, 'BHAIYA BANS YOU FOR A WEEK.'],
      ['ACCEPT EMPTY STOMACH', 'SAD NOCTURNAL', 10, 'DORM DEPRESSION.']
    ]
  },
  {
    id: 'c68',
    category: 'decision_scenario',
    kind: 'lastSeat',
    mechanic: 'seat_projector',
    eyebrow: 'SCREEN VISIBILITY',
    title: 'PRESENTATION SLIDES ARE IN 8PT FONT.',
    copy: 'Where do you reposition?',
    layout: 'dialogue',
    options: [
      ['PULL OUT PHONE AND USE CAMERA ZOOM', 'CYBERNETIC VISION', 160, 'READING EVERYTHING.'],
      ['SQUINT LIKE A CLINT EASTWOOD CHARACTER', 'CINEMATIC EFFORT', 60, 'EYESTRAIN +20.'],
      ['ASK CR FOR PPT PDF ON WHATSAPP', 'TACTICAL RETRIEVAL', 120, 'PPT ON SCREEN.'],
      ['GIVE UP AND LOOK AT CEILING FANS', 'HYPNOTISED', 20, 'FANS SPINNING PEACEFULLY.']
    ]
  },
  {
    id: 'c69',
    category: 'decision_scenario',
    kind: 'attendance',
    mechanic: 'medical_cert',
    eyebrow: 'MEDICAL CERTIFICATE PLAY',
    title: 'MISSED 12 CLASSES DUE TO “PERSONAL WORK”.',
    copy: 'How do you submit the medical certificate?',
    layout: 'meter-choice',
    options: [
      ['SUBMIT IT WITH A SLIGHT COUGH & WALKING STICK', 'METHOD ACTOR', 160, 'ATTENDANCE WAIVED.'],
      ['HONEST EMAIL TO DEAN', 'HIGH INTEGRITY', 90, 'DEAN RESPECTS HONESTY.'],
      ['PHOTOSHOP DOCTOR STAMP IN MS PAINT', 'FORGERY DISASTER', -150, 'EXPELLED IMMEDIATELY.'],
      ['ASK YOUR DOG TO EAT ATTENDANCE SHEET', 'CARTOON COPE', -60, 'DOES NOT WORK IN 2026.']
    ]
  },
  {
    id: 'c70',
    category: 'decision_scenario',
    kind: 'morning',
    mechanic: 'commute_train',
    eyebrow: 'METRO SPRINT',
    title: 'METRO DOORS ARE CLOSING IN 4 SECONDS.',
    copy: 'Make the platform leap.',
    layout: 'route',
    options: [
      ['SLIDE BETWEEN DOORS LIKE INDIANA JONES', 'ACTION HERO', 160, 'CROWD CHEERS.'],
      ['WAIT FOR NEXT TRAIN (10 MINS LATE)', 'PRUDENT', 40, 'LATE BUT SAFE.'],
      ['BAG GETS STUCK IN DOOR', 'AWKWARD TRAIN RIDE', -80, 'RIDING 6 STATIONS TRAPPED.'],
      ['TAKE AN AUTO AND GET STUCK IN TRAFFIC', 'WORST PATH', -70, '₹200 GONE.']
    ]
  },

  // ----------------------------------------------------
  // CATEGORY 5: SOCIAL & STEALTH (16 CHALLENGES)
  // ----------------------------------------------------
  {
    id: 'c71',
    category: 'social_stealth',
    kind: 'wingman',
    mechanic: 'dialogue',
    eyebrow: 'ULTIMATE WINGMAN',
    title: 'YOUR FRIEND IS FUMBLING HARD.',
    copy: 'Deploy tactical wingman support.',
    layout: 'dialogue',
    options: [
      ['DROP A SMOOTH ICEBREAKER', 'HERO MOVE', 140, 'SITUATION RESCUED.'],
      ['PRETEND YOU ARE HIS CEO', 'CHAOTIC HYPE', 160, 'LEGENDARY WINGMAN.'],
      ['PANIC AND TRIP ON PURPOSE', 'DISTRACTION', 70, 'DISTRACTION SUCCEEDED.'],
      ['RECORD A TIKTOK', 'BETRAYAL', -90, 'FRIENDSHIP TERMINATED.']
    ]
  },
  {
    id: 'c72',
    category: 'social_stealth',
    kind: 'groupPanic',
    mechanic: 'chat_meme',
    eyebrow: 'GROUP CHAT PANIC',
    title: 'PROFESSOR ACCIDENTALLY SENT A MEME.',
    copy: 'Choose the only socially survivable response.',
    layout: 'chat',
    options: [
      ['REACT WITH “🗿”', 'UNBOTHERED', 140, 'CROWD FOLLOWS.'],
      ['SEND SYLLABUS QUERY', 'DEFLECTION', 80, 'PROFESSOR SAVED.'],
      ['TYPE “BRO COOKED 💀”', 'FATAL MISTAKE', -120, 'REMOVED FROM GROUP.'],
      ['LEAVE THE GROUP', 'ESCAPE', -40, 'RADICAL MOVE.']
    ]
  },
  {
    id: 'c73',
    category: 'social_stealth',
    kind: 'npcDetector',
    mechanic: 'chips_npc',
    eyebrow: 'NPC DETECTOR',
    title: 'IDENTIFY THE PURE NPC BEHAVIOR.',
    copy: 'One of these radiates 0 aura.',
    layout: 'chips',
    options: [
      ['WALKING WITH BOTH STRAPS TIGHT', 'NPC TIER 1', 130, 'CORRECT NPC IDENTIFIED.'],
      ['WEARING HOODIE IN 38°C HEAT', 'EDGE LORD', 40, 'MISUNDERSTOOD AURA.'],
      ['SITTING FRONT ROW VOLUNTARILY', 'DANGEROUS', 60, 'PROTAGONIST MOVE.'],
      ['CHARGING LAPTOP AT 98%', 'PARANOID', 20, 'MILD.']
    ]
  },
  {
    id: 'c74',
    category: 'social_stealth',
    kind: 'socialStealth',
    mechanic: 'dialogue_stealth',
    eyebrow: 'SOCIAL STEALTH',
    title: 'CRUSH AND EX ENTER CANTEEN AT ONCE.',
    copy: 'Maximum spatial awareness needed.',
    layout: 'dialogue',
    options: [
      ['PUT SUNGLASSES ON INDOORS', 'CINEMATIC', 150, 'UNTOUCHABLE.'],
      ['WALK STRAIGHT BETWEEN THEM', 'MAIN CHARACTER', 160, 'ROOM GOES SILENT.'],
      ['DUCK BEHIND SODA COOLER', 'STEALTH FAILED', -70, 'SPOTTED IMMEDIATELY.'],
      ['STARE AT CANTEEN MENU', 'DEFAULT NPC', 30, 'SURVIVED BARELY.']
    ]
  },
  {
    id: 'c75',
    category: 'social_stealth',
    kind: 'bankruptcy',
    mechanic: 'danger_crush',
    eyebrow: 'AURA BANKRUPTCY',
    title: 'YOUR CRUSH WALKS PAST.',
    copy: 'This choice will echo through campus lore.',
    layout: 'danger',
    options: [
      ['👀 MAKE EYE CONTACT & NOD', 'CONFIDENCE', 140, 'SMOOTH PRESENCE.'],
      ['📱 CHECK YOUR LOCKSCREEN', 'SAFE PLAY', 40, 'DEFAULT MOVE.'],
      ['🫠 TRIP OVER YOUR OWN SHOELACE', 'CATASTROPHE', -150, 'AURA ANNIHILATED.'],
      ['🧱 WALK INTO A GLASS DOOR', 'CARTOON DISASTER', -200, 'COOKED BEYOND REPAIR.']
    ]
  },
  {
    id: 'c76',
    category: 'social_stealth',
    kind: 'charger',
    mechanic: 'negotiation',
    eyebrow: 'CHARGER DIPLOMACY',
    title: '“BRO, CAN I USE YOUR CHARGER?”',
    copy: 'Your laptop battery is at 41 percent.',
    layout: 'negotiation',
    options: [
      ['YES, TAKE IT', 'GENEROUS', 120, 'SOCIAL AURA.'],
      ['2 MINUTES ONLY', 'FAIR', 70, 'BOUNDARIES.'],
      ['“I’M ON 12%”', 'TACTICAL LIE', -30, 'SUS RESPONSE.'],
      ['PRETEND NOT TO HEAR', 'GHOST', -60, 'BAD ROOMMATE ARC.']
    ]
  },
  {
    id: 'c77',
    category: 'social_stealth',
    kind: 'wingman',
    mechanic: 'pitch_deck',
    eyebrow: 'HACKATHON TEAM FORMATION',
    title: 'SOLO DEVELOPER LOOKING FOR A TEAM.',
    copy: 'Pitch your utility in 5 words.',
    layout: 'dialogue',
    options: [
      ['“I WRITE CSS AND SLEEP 0 HRS”', 'INSTANT HIRE', 160, 'DRAFTED BY TOP TEAM.'],
      ['“I AM THE IDEA GUY”', 'NPC PITCH', -80, 'REJECTED UNANIMOUSLY.'],
      ['“I BROUGHT EXTRA POWER STRIPS”', 'HARDWARE MVP', 150, 'GOD TIER VALUE.'],
      ['“I WILL SUBMIT MY OWN PR”', 'LONE WOLF', 60, 'RESPECTABLE.']
    ]
  },
  {
    id: 'c78',
    category: 'social_stealth',
    kind: 'groupPanic',
    mechanic: 'wrong_chat',
    eyebrow: 'WRONG GROUP INCIDENT',
    title: 'SENT A SPONGEBOB MEME TO THE PLACEMENT CELL GROUP.',
    copy: 'How do you salvage your corporate future?',
    layout: 'chat',
    options: [
      ['DELETE FOR EVERYONE IN 0.4 SECONDS', 'NINJA SPEED', 150, 'NO EVIDENCE.'],
      ['“THIS REPRESENTS MY PRODUCTIVITY PHILOSOPHY”', 'CORPORATE SPIN', 160, 'OFFER INCREASED.'],
      ['LEAVE THE COLLEGE', 'RADICAL', -100, 'UNEMPLOYED.'],
      ['BLAME YOUR YOUNGER SIBLING', 'LAME COPE', -40, 'UNCONVINCING.']
    ]
  },
  {
    id: 'c79',
    category: 'social_stealth',
    kind: 'npcDetector',
    mechanic: 'chips_canteen',
    eyebrow: 'CANTEEN ETIQUETTE CHECK',
    title: 'WHICH BEHAVIOR RADIATES MAXIMUM MAIN CHARACTER ENERGY?',
    copy: 'Identify peak campus aura.',
    layout: 'chips',
    options: [
      ['PAYING FOR FRIEND’S CHAI WITHOUT MENTIONING IT', 'PEAK AURA', 160, 'RESPECT EARNED.'],
      ['CALCULATING ₹3.50 SPLITWISE DEBT', 'FINANCIAL TERRORIST', -80, 'ZERO AURA.'],
      ['STANDING IN 2 LINES AT ONCE', 'OPTIMIZER', 90, 'EFFICIENCY.'],
      ['STEALING NAPKINS BY THE HANDFUL', 'HOARDER', 30, 'RESOURCEFUL BUT SHADY.']
    ]
  },
  {
    id: 'c80',
    category: 'social_stealth',
    kind: 'socialStealth',
    mechanic: 'headphones_fake',
    eyebrow: 'STEALTH MODE ACTIVATED',
    title: 'SEES ANNOYING ACQUAINTANCE WALKING TOWARDS YOU.',
    copy: 'Execute social evasive maneuvers.',
    layout: 'dialogue',
    options: [
      ['PUT HEADPHONES IN (NOTHING PLAYING)', 'TACTICAL SHIELD', 140, 'PASSED UNHINDERED.'],
      ['FAKE PHONE CALL: “YES MR. STARK”', 'DRAMATIC', 150, 'HE DOESN’T DARE INTERRUPT.'],
      ['RUN INTO THE RESTROOM', 'DESPERATE ESCAPE', 40, 'LOCKED IN STALL FOR 20 MINS.'],
      ['WAVE HAPPILY', 'FATAL MISTAKE', -70, 'STUCK IN 40 MINUTE TRAP.']
    ]
  },
  {
    id: 'c81',
    category: 'social_stealth',
    kind: 'bankruptcy',
    mechanic: 'hotspot_password',
    eyebrow: 'MOBILE HOTSPOT INCIDENT',
    title: 'WHOLE LAB ASKS FOR YOUR HOTSPOT PASSWORD.',
    copy: 'Manage your 1.5GB daily data limit.',
    layout: 'danger',
    options: [
      ['CHANGE NAME TO “VIRUS_DETECTED_5G”', 'CYBER DEFENSE', 160, 'NO ONE CONNECTS.'],
      ['GIVE PASSWORD TO CRUSH ONLY', 'TARGETED RIZZ', 140, 'CRUSH CONNECTED.'],
      ['GIVE OPEN ACCESS', 'DATA BANKRUPTCY', -120, '1.5GB FINISHED IN 42 SECONDS.'],
      ['SET LIMIT TO 10KB/S', 'EVIL GENIUS', 120, 'EVERYONE THINKS WI-FI IS SLOW.']
    ]
  },
  {
    id: 'c82',
    category: 'social_stealth',
    kind: 'charger',
    mechanic: 'pen_borrow',
    eyebrow: 'STATIONERY DIPLOMACY',
    title: '“CAN I BORROW YOUR EXPENSIVE 0.5MM PEN?”',
    copy: 'Will you ever see it again?',
    layout: 'negotiation',
    options: [
      ['GIVE PEN BUT KEEP THE CAP AS HOSTAGE', 'TACTICAL GENIUS', 160, 'PEN GUARANTEED TO RETURN.'],
      ['GIVE USELESS ₹2 USE-AND-THROW PEN', 'SAFE BET', 110, 'NO EMOTIONAL RISK.'],
      ['HAND OVER PILOT G2 PEN WITH NO RULES', 'LOST FOREVER', -60, 'CAP AND PEN DISAPPEARED.'],
      ['“I HAVE NO PEN” (HOLDING IT IN HAND)', 'OBVIOUS LIE', -40, 'SHAMEFUL.']
    ]
  },
  {
    id: 'c83',
    category: 'social_stealth',
    kind: 'wingman',
    mechanic: 'stage_fright',
    eyebrow: 'PUBLIC SPEAKING CRISIS',
    title: 'TEAMMATE FREEZES AT THE HACKATHON MIC.',
    copy: 'Rescue the pitch presentation.',
    layout: 'dialogue',
    options: [
      ['GRAB MIC: “AND THAT LEADS TO OUR CORE DEMO”', 'SMOOTH TAKEOVER', 160, 'JUDGES DIDN’T EVEN NOTICE.'],
      ['COUGH LOUDLY BEHIND HIM', 'MILD SUPPORT', 40, 'STILL FROZEN.'],
      ['PULL THE FIRE ALARM', 'TOO FAR', -140, 'ARRESTED BY CAMPUS SECURITY.'],
      ['START APPLAUDING RANDOMLY', 'CONFUSION TACTIC', 80, 'AUDIENCE CLAPS ALONG.']
    ]
  },
  {
    id: 'c84',
    category: 'social_stealth',
    kind: 'groupPanic',
    mechanic: 'poll_betrayal',
    eyebrow: 'CAMPUS TRIP POLL',
    title: '“GOA TRIP OR STUDY SESSION?”',
    copy: 'Cast the only acceptable vote.',
    layout: 'chat',
    options: [
      ['GOA TRIP (KNOWING IT WILL BE CANCELLED)', 'TRADITION', 140, 'CAMPUS RITUAL RESPECTED.'],
      ['STUDY SESSION', 'TRAITOR VOTE', -90, 'EXPELLED FROM GROUP.'],
      ['“I WILL ONLY COME IF CANTEEN BHAIYA COMES”', 'CHAOS OPTION', 120, 'BHAIYA JOINS THE TRIP.']
    ]
  },
  {
    id: 'c85',
    category: 'social_stealth',
    kind: 'npcDetector',
    mechanic: 'chips_roommate',
    eyebrow: 'ROOMMATE RADAR',
    title: 'WHAT MAKES A 10/10 ROOMMATE?',
    copy: 'Identify the rarest human specimen.',
    layout: 'chips',
    options: [
      ['USES HEADPHONES AFTER 11:00 PM', 'GOD-TIER SPECIES', 160, 'PROTECT AT ALL COSTS.'],
      ['EATS YOUR LEFTOVERS WITHOUT ASKING', 'PARASITE', -100, 'WAR DECLARED.'],
      ['ALARMS RING FOR 45 MINS UNATTENDED', 'TERRORIST', -120, 'SLEEP DEPRIVATION.'],
      ['LEAVES ROOM WHEN YOU HAVE A CALL', 'HERO', 140, 'UNMATCHED CONSIDERATION.']
    ]
  },
  {
    id: 'c86',
    category: 'social_stealth',
    kind: 'socialStealth',
    mechanic: 'elevator_crowd',
    eyebrow: 'ELEVATOR MAXIMUM CAPACITY',
    title: 'ELEVATOR BUZZER BEEPS AS YOU STEP IN.',
    copy: 'Who steps out to save the elevator?',
    layout: 'dialogue',
    options: [
      ['STEP OUT BACKWARDS WITH A GENTLE BOW', 'CHIVALROUS AURA', 150, 'RESPECT FROM ALL 14 PEOPLE.'],
      ['STAND STILL AND BLAME THE OTHER GUY', 'HOSTILE', -50, '14 PEOPLE GLARING.'],
      ['TAKE OFF YOUR BACKPACK TO REDUCE 200G', 'SCIENTIFIC COPE', 90, 'BUZZER STOPS BEEPING!'],
      ['TAKE THE STAIRS AND BEAT THE ELEVATOR', 'ATHLETE PROTAGONIST', 160, 'MEET THEM AT FLOOR 4.']
    ]
  },

  // ----------------------------------------------------
  // CATEGORY 6: CHAOS & WILDCARD (14 CHALLENGES)
  // ----------------------------------------------------
  {
    id: 'c87',
    category: 'chaos_wildcard',
    kind: 'phone1',
    mechanic: 'route',
    eyebrow: 'PHONE AT 1%',
    title: 'YOUR BATTERY IS AT EXACTLY 1%.',
    copy: 'One final tap before phone dies forever.',
    layout: 'route',
    options: [
      ['SCREENSHOT UPI QR CODE', 'SURVIVAL', 140, 'CANTEEN BILL PAID.'],
      ['SEND PROXY TO GROUP CHAT', 'LOYAL', 120, 'SAVED A FRIEND.'],
      ['DOOMSCROLL INSTAGRAM REELS', 'ADDICTION', -80, 'BLACK SCREEN OF REGRET.'],
      ['CALL MOM', 'WHOLESOME', 100, 'GOOD KARMA.']
    ]
  },
  {
    id: 'c88',
    category: 'chaos_wildcard',
    kind: 'roast',
    mechanic: 'split',
    eyebrow: 'ROAST OR RESPECT',
    title: 'RIYA HAS 7 TABS OPEN DURING CLASS.',
    copy: 'Choose her fate. Keep it harmless.',
    layout: 'split',
    options: [
      ['🔥', 'RESPECT', 120, 'MAIN CHARACTER BEHAVIOUR.'],
      ['💀', 'ROAST', 80, 'AURA UNDER INVESTIGATION.']
    ]
  },
  {
    id: 'c89',
    category: 'chaos_wildcard',
    kind: 'rather',
    mechanic: 'versus',
    eyebrow: 'WOULD YOU RATHER',
    title: '8 AM CLASS OR SURPRISE VIVA?',
    copy: 'The room is waiting for your answer.',
    layout: 'versus',
    options: [
      ['8 AM CLASS', 'EARLY PAIN', 90, 'THE ROOM HAS DECIDED.'],
      ['SURPRISE VIVA', 'SUDDEN PAIN', 130, 'BRAVE CHOICE.']
    ]
  },
  {
    id: 'c90',
    category: 'chaos_wildcard',
    kind: 'build',
    mechanic: 'build_cards',
    eyebrow: 'LEARNIT LAB',
    title: 'BUILD SOMETHING QUESTIONABLE.',
    copy: 'You have sixty seconds and one random idea.',
    layout: 'build-cards',
    options: [
      ['🐱', 'DATING APP FOR CATS', 160, 'WELCOME TO LEARNIT.'],
      ['🍕', 'CANTEEN QUEUE PREDICTOR', 130, 'ACTUALLY USEFUL.'],
      ['🛵', 'HOSTEL FOOD DELIVERY', 100, 'LOGISTICS ERA.'],
      ['🎮', 'FLAPPY PROFESSOR', 160, 'WE LOVE THE ENERGY.']
    ]
  },
  {
    id: 'c91',
    category: 'chaos_wildcard',
    kind: 'entrance',
    mechanic: 'swipe',
    eyebrow: 'AURA MAXXING',
    title: 'MAKE YOUR ENTRANCE.',
    copy: 'You are 20 minutes late. How do you enter class?',
    layout: 'swipe',
    options: [
      ['😎', 'WALK IN LIKE NOTHING HAPPENED', 250, 'MAIN CHARACTER ENERGY.'],
      ['🤫', 'SLIP INTO THE BACK', 80, 'STEALTH AURA.'],
      ['🙇', 'APOLOGISE TO EVERYONE', -35, 'TOO POLITE.'],
      ['🚦', 'BLAME THE TRAFFIC', 20, 'CLASSIC EXCUSE.']
    ]
  },
  {
    id: 'c92',
    category: 'chaos_wildcard',
    kind: 'whoWould',
    mechanic: 'vote',
    eyebrow: 'THE ROOM DECIDES',
    title: 'WHO WOULD SURVIVE A ZOMBIE APOCALYPSE?',
    copy: 'Cast the decisive campus vote.',
    layout: 'vote',
    options: [
      ['RIYA', 'STRATEGIST', 90, 'RIYA GETS PLOT ARMOR.'],
      ['DEV', 'RESOURCEFUL', 90, 'DEV KNOWS A GUY.'],
      ['ANANYA', 'CHAOS GENIUS', 90, 'ANANYA WINS SOMEHOW.'],
      ['YOU', 'SELF BELIEF', 140, 'PROTAGONIST VOTED.']
    ]
  },
  {
    id: 'c93',
    category: 'chaos_wildcard',
    kind: 'phone1',
    mechanic: 'hostel_wifi',
    eyebrow: 'WIFI BLACKOUT AT 1:00 AM',
    title: 'CAMPUS WI-FI GOES DOWN MID-GAME.',
    copy: 'What is the immediate crisis protocol?',
    layout: 'route',
    options: [
      ['HOTSPOT FROM FRIEND WHO SLEEPS EARLY', 'SURREPTITIOUS', 140, 'PING RESTORED.'],
      ['GO OUTSIDE AND LOOK AT THE MOON', 'NATURE TOUCH', 80, 'UNEXPECTED SERENITY.'],
      ['BANG ON THE ROUTER BOX', 'PERCUSSIVE MAINTENANCE', -40, 'ROUTER PERMANENTLY DEAD.'],
      ['ACTUALLY STUDY', 'UNTHINKABLE', 120, 'ACADEMIC BREAKTHROUGH.']
    ]
  },
  {
    id: 'c94',
    category: 'chaos_wildcard',
    kind: 'roast',
    mechanic: 'split_coffee',
    eyebrow: 'ROAST OR RESPECT',
    title: 'DRANK 4 COFFEES IN 3 HOURS FOR A DEADLINE.',
    copy: 'Judge this level of caffeine reliance.',
    layout: 'split',
    options: [
      ['🔥', 'RESPECT', 130, 'HEART BEATING AT 180BPM.'],
      ['💀', 'ROAST', 70, 'DOCTOR APPOINTMENT NEEDED.']
    ]
  },
  {
    id: 'c95',
    category: 'chaos_wildcard',
    kind: 'rather',
    mechanic: 'versus_dorm',
    eyebrow: 'WOULD YOU RATHER',
    title: 'NEVER HAVE TO ATTEND 8 AM CLASSES OR NEVER WRITE LAB JOURNALS?',
    copy: 'Choose your supreme campus blessing.',
    layout: 'versus',
    options: [
      ['NO 8 AM CLASSES FOREVER', 'SLEEP BLESSING', 140, 'CIRCADIAN NIRVANA.'],
      ['NO LAB JOURNALS FOREVER', 'WRITING EXEMPTION', 140, 'HAND CRAMPS CURED.']
    ]
  },
  {
    id: 'c96',
    category: 'chaos_wildcard',
    kind: 'build',
    mechanic: 'build_learnit_v2',
    eyebrow: 'LEARNIT LAB DEMO',
    title: 'WHICH WEIRD PROJECT ARE YOU SHIPPING TONIGHT?',
    copy: 'LearnIT turns ideas into reality.',
    layout: 'build-cards',
    options: [
      ['🎧 NOISE CANCELLING FOR EX LECTURES', 'INNOVATION', 160, '1M DOWNLOADS.'],
      ['⚡ PROXY DETECTION RADAR', 'COUNTER-INTELLIGENCE', 150, 'CAMPUS HIT.'],
      ['🍕 DRONE SAMOSA DROP TO 4TH FLOOR', 'AERIAL LOGISTICS', 180, 'FUNDED ON SPOT.'],
      ['📊 SNOOZE TIME CALCULATOR', 'TIME SAVER', 120, 'SIMPLE YET EFFECTIVE.']
    ]
  },
  {
    id: 'c97',
    category: 'chaos_wildcard',
    kind: 'entrance',
    mechanic: 'swipe_graduation',
    eyebrow: 'DEGREE CEREMONY',
    title: 'HOW DO YOU COLLECT YOUR DEGREE ON STAGE?',
    copy: 'Your final 5 seconds of undergraduate aura.',
    layout: 'swipe',
    options: [
      ['HIT THE HITMAN CELEBRATION POSE', 'LEGENDARY', 250, 'STANDING OVATION.'],
      ['HANDSHAKE + RESPECTFUL NOD', 'CLASSIC', 100, 'PARENTS ARE PROUD.'],
      ['TRIP ON YOUR GOWN', 'MEME IMMORTALITY', -80, 'VIRAL ON CAMPUS INSTAGRAM.'],
      ['TAKE A SELFIE WITH THE DEAN', 'BOLD', 160, 'DEAN SMILES.']
    ]
  },
  {
    id: 'c98',
    category: 'chaos_wildcard',
    kind: 'whoWould',
    mechanic: 'vote_startup',
    eyebrow: 'THE ROOM DECIDES',
    title: 'WHO IS BECOMING A BILLIONAIRE FIRST?',
    copy: 'Cast your vote for the campus prodigy.',
    layout: 'vote',
    options: [
      ['THE SILENT BACKBENCHER WHO BUILDS COMPILERS', 'TECH GOD', 140, 'SOLOPRENEUR.'],
      ['THE GUY WHO SELLS ASSIGNMENT ANSWERS', 'BUSINESS PRODIGY', 110, 'CASH FLOW KING.'],
      ['YOU (JOINED LEARNIT)', 'CORRECT ANSWER', 180, 'PROTAGONIST ARC ACTIVATED.'],
      ['THE COLLEGE CANTEEN OWNER', 'REALITY', 120, 'ALREADY A MULTIMILLIONAIRE.']
    ]
  },
  {
    id: 'c99',
    category: 'chaos_wildcard',
    kind: 'rather',
    mechanic: 'versus_final',
    eyebrow: 'FINAL VERDICT',
    title: 'SOLO HACKATHON WINNER OR 4.0 GPA FRONTBENCHER?',
    copy: 'Define true campus supremacy.',
    layout: 'versus',
    options: [
      ['SOLO HACKATHON TROPHY', 'BUILDER AURA', 160, 'SHIPPED WORKING SOFTWARE.'],
      ['4.0 PERFECT GPA', 'ACADEMIC GOD', 120, 'MEMORIZED THE TEXTBOOK.']
    ]
  },
  {
    id: 'c100',
    category: 'chaos_wildcard',
    kind: 'build',
    mechanic: 'build_final',
    eyebrow: 'ULTIMATE LEARNIT CHALLENGE',
    title: 'WHAT WILL YOU BUILD AT LEARNIT NEXT?',
    copy: 'The final aura decision.',
    layout: 'build-cards',
    options: [
      ['🚀 AN APP THAT ACTUALLY SOLVES CAMPUS LIFE', 'MAX AURA', 250, 'WELCOME TO LEARNIT.'],
      ['🤖 A ROBOT TO ATTEND 8 AM LECTURES', 'INVENTOR', 220, 'THE DREAM DEVICE.'],
      ['🔥 THE NEXT VIRAL MULTIPLAYER GAME', 'CREATOR', 240, 'EVERYONE IS PLAYING.'],
      ['☕ SMART CHAI MAKER FOR DORM ROOMS', 'ESSENTIAL', 200, 'HOSTEL SUPREMACY.']
    ]
  }
];

// STREAM-SPECIALIZED CHALLENGES CURATED PER CAMPUS CLASS
export const STREAM_SPECIALIZED_CHALLENGES = {
  CSE: [
    {
      id: 'cse_1',
      category: 'reaction_timing',
      kind: 'winloss',
      mechanic: 'binary',
      eyebrow: 'CSE CODE CHAOS',
      title: 'PUSHING STRAIGHT TO MAIN AT 4:00 AM',
      copy: 'No PR, no code review, pure caffeine energy. Is this a W or an L?',
      layout: 'binary',
      options: [
        ['W', 'CHAOS GIGA-CHAD', 160, 'PIPELINE PASSED BY A MIRACLE.'],
        ['L', 'PRODUCTION BROKE', -80, 'SERVERS ON FIRE 💀']
      ]
    },
    {
      id: 'cse_2',
      category: 'risk_reward',
      kind: 'oneChance',
      mechanic: 'all_or_nothing',
      eyebrow: 'CSE DEBUG EMERGENCY',
      title: 'SEGMENTATION FAULT (CORE DUMPED)',
      copy: '5 minutes before project submission. How do you fix it?',
      layout: 'danger',
      options: [
        ['COMMENT OUT THE LINE & RECOMPILE', 'COWBOY FIX', 180, 'IT COMPILED AND DEMO WORKED.'],
        ['ASK CHATGPT 4.0 WITH 10 SECONDS LEFT', 'AI CLUTCH', 150, 'MEMORY LEAK RESOLVED.'],
        ['READ 800 LINES OF GDB STACK TRACE', 'PURIST TORTURE', 40, 'RAN OUT OF TIME.'],
        ['DELETE THE REPO', 'ACCEPT EXTINCTION', -150, 'CAREER IN SHAMBLES.']
      ]
    },
    {
      id: 'cse_3',
      category: 'memory_observation',
      kind: 'whoSent',
      mechanic: 'archetype',
      eyebrow: 'CSE ARCHETYPE SPOTTER',
      title: '“CAN WE BUILD THIS IN RUST FOR 0.002% PERFORMANCE GAIN?”',
      copy: 'Identify this typical CSE creature.',
      layout: 'chips',
      options: [
        ['🦀', 'THE RUST EVANGELIST', 160, 'REWRITING EVERYTHING IN RUST.'],
        ['🐍', 'THE PYTHON SLOW-POKE', -40, 'IMPORT EVERYTHING.'],
        ['☕', 'JAVA ENTERPRISE VETERAN', -60, 'FACTORY BUILDER VISITOR PATTERN.'],
        ['🌐', 'HTML IS A LANGUAGE GUY', -80, 'WRONG CONTINENT.']
      ]
    }
  ],

  ECE: [
    {
      id: 'ece_1',
      category: 'reaction_timing',
      kind: 'blink',
      mechanic: 'reflex',
      eyebrow: 'ECE LAB REFLEX',
      title: 'DON’T SHORT CIRCUIT THE POWER SUPPLY!',
      copy: 'Tap the exact millisecond the red LED flashes to cut power.',
      layout: 'blink'
    },
    {
      id: 'ece_2',
      category: 'decision_scenario',
      kind: 'wrongClass',
      mechanic: 'dialogue',
      eyebrow: 'ECE BREADBOARD DISASTER',
      title: 'MAGIC SMOKE EMERGES FROM THE IC CHIP.',
      copy: 'What is your immediate laboratory reaction?',
      layout: 'dialogue',
      options: [
        ['“THAT WAS A THERMAL STRESS TEST, SIR”', 'BIG BRAIN EXCUSE', 180, 'TA GIVES FULL MARKS FOR CREATIVITY.'],
        ['BLOW ON IT LIKE A BIRTHDAY CANDLE', 'PANIC MOVE', 60, 'SMOKE COVERS THE TABLE.'],
        ['SWAP IT WITH BENCHMATE’S IC CHIP', 'SNEAKY PIRATE', 120, 'HE GETS BLAMED INSTEAD.'],
        ['LICK THE 9V BATTERY TO TEST VOLTAGE', 'UNHINGED', -80, 'TONGUE TINGLING FOR 3 DAYS.']
      ]
    },
    {
      id: 'ece_3',
      category: 'risk_reward',
      kind: 'ratio',
      mechanic: 'prediction',
      eyebrow: 'ECE HARDWARE REALITY',
      title: '“BREADBOARDS HAVE A 90% CHANCE OF LOOSE CONNECTIONS.”',
      copy: 'Predict hardware lab consensus.',
      layout: 'binary',
      options: [
        ['100% FACT', 'UNIVERSAL TRUTH', 150, 'WIGGLED THE WIRE AND IT WORKED.'],
        ['FALSE', 'DELUSION', -60, 'NEVER TOUCHED A JUMPER WIRE.']
      ]
    }
  ],

  Electrical: [
    {
      id: 'ee_1',
      category: 'reaction_timing',
      kind: 'timing',
      mechanic: 'timing_bar',
      eyebrow: 'ELECTRICAL GRID CLUTCH',
      title: 'SYNCHRONIZE THE 3-PHASE ALTERNATOR!',
      copy: 'Stop the needle dead in the center to avoid blowing up the campus transformer.',
      layout: 'timing'
    },
    {
      id: 'ee_2',
      category: 'decision_scenario',
      kind: 'canteenBudget',
      mechanic: 'budget',
      eyebrow: 'HIGH VOLTAGE SURVIVAL',
      title: 'SUBSTATION TRIP AT 8:00 AM.',
      copy: 'Choose your weapon for power restoration.',
      layout: 'budget',
      options: [
        ['INSULATED RUBBER GLOVES + MULTIMETER', 'CERTIFIED ELECTRICIAN', 160, 'POWER RESTORED TO CAMPUS.'],
        ['WOODEN STICK OF TRUTH', 'DESI ENGINEERING', 140, 'POKED BREAKER AND IT CLICKED.'],
        ['BARE HANDS', 'ELECTRIC CHAIR SPEEDRUN', -200, 'AURA AND LIFE IN DANGER.'],
        ['SUBMIT COMPLAINT TICKET ON PORTAL', 'BUREAUCRACY', -40, 'POWER RESTORED IN 2028.']
      ]
    },
    {
      id: 'ee_3',
      category: 'chaos_wildcard',
      kind: 'rather',
      mechanic: 'versus',
      eyebrow: 'ELECTRICAL DILEMMA',
      title: 'WOULD YOU RATHER TOUCH AC VOLTAGE OR DC VOLTAGE?',
      copy: 'Pick your electrical frequency.',
      layout: 'versus',
      options: [
        ['50Hz AC VOLTAGE', 'OSCILLATING PAIN', 130, 'HEARTSYNC PASS.'],
        ['HIGH CURRENT DC', 'PERMANENT WELD', 100, 'MAGNETIC SURPRISE.']
      ]
    }
  ],

  Mechatronics: [
    {
      id: 'mechtron_1',
      category: 'memory_observation',
      kind: 'sequence',
      mechanic: 'sequence',
      eyebrow: 'MECHATRONICS ROBOT CALIBRATION',
      title: 'PROGRAM THE 3-AXIS ROBOTIC ARM!',
      copy: 'Tap in exact sequence: 🤖 → ⚙️ → ⚡',
      layout: 'sequence',
      targetSequence: ['🤖', '⚙️', '⚡'],
      choices: ['🤖', '⚙️', '⚡', '💥']
    },
    {
      id: 'mechtron_2',
      category: 'decision_scenario',
      kind: 'wrongClass',
      mechanic: 'dialogue',
      eyebrow: 'MECHATRONICS LAB DISASTER',
      title: 'ROBOT ARM FLUNG A WRENCH ACROSS THE LAB.',
      copy: 'Explain this ballistic trajectory to the professor.',
      layout: 'dialogue',
      options: [
        ['“THE AI ACHIEVED SENTIENCE AND CHOSE VIOLENCE”', 'CYBERNETIC COPE', 180, 'PROFESSOR IS INTRIGUED.'],
        ['“INVERSE KINEMATICS CALCULATION ERROR”', 'ACADEMIC EXCUSE', 130, 'MATH PASS.'],
        ['BLAME THE MECHANICAL STUDENTS', 'INTER-BRANCH WAR', 90, 'CLASSIC SCAPEGOAT.'],
        ['RUN AWAY WITH THE ROBOT', 'FUGITIVE', 60, 'CYBORG REBELLION.']
      ]
    },
    {
      id: 'mechtron_3',
      category: 'risk_reward',
      kind: 'hotTake',
      mechanic: 'binary_opinion',
      eyebrow: 'MECHATRONICS SUPREMACY',
      title: '“MECHATRONICS IS JUST CSE WITH SCREWDRIVERS.”',
      copy: 'Is this take a W or an L?',
      layout: 'binary',
      options: [
        ['W', 'FACTS', 140, 'WE CODE AND WE SOLDER.'],
        ['L', 'OFFENDED', -60, 'WE HAVE MOTORS AND PNEUMATICS!']
      ]
    }
  ],

  Mechanical: [
    {
      id: 'mech_1',
      category: 'reaction_timing',
      kind: 'alarm',
      mechanic: 'alarm_picker',
      eyebrow: 'MECHANICAL WORKSHOP SPEEDRUN',
      title: 'SHUT DOWN THE LATHE BEFORE CHIPS FLY!',
      copy: 'Dismiss the EMERGENCY STOP switch in 0.5s!',
      layout: 'alarms',
      alarms: [
        { time: 'COOLANT VALVE', label: 'WATER FLOW', correct: false },
        { time: 'E-STOP BUTTON', label: 'RED MUSHROOM', correct: true },
        { time: 'SPEED DIAL', label: 'RPM INCREASE', correct: false },
        { time: 'CHUCK KEY', label: 'STILL INSERTED', correct: false }
      ]
    },
    {
      id: 'mech_2',
      category: 'decision_scenario',
      kind: 'hostelCrisis',
      mechanic: 'route',
      eyebrow: 'CAD EXAM TRAUMA',
      title: 'SOLIDWORKS CRASHED AT 99% RENDERING.',
      copy: 'Auto-save was last configured in 2014. What now?',
      layout: 'route',
      options: [
        ['REDRAW ENTIRE CRANKSHAFT IN 7 MINS FLAT', 'CAD SPEEDRUNNER', 200, 'ABSOLUTE CINEMA.'],
        ['SUBMIT A CORRUPTED .SLDPRT FILE', 'TACTICAL GLITCH', 140, 'BOUGHT 2 DAYS OF EXTRA TIME.'],
        ['PUNCH THE MONITOR', 'PERCUSSIVE GRIEF', -100, 'FINE: ₹15,000.'],
        ['SWITCH TO MECHANICAL DRAWING SHEET & T-SQUARE', 'BOOMER TECH', 80, 'RESPECT FOR TRADITION.']
      ]
    },
    {
      id: 'mech_3',
      category: 'social_stealth',
      kind: 'npcDetector',
      mechanic: 'chips',
      eyebrow: 'MECHANICAL WORKSHOP AURA',
      title: 'IDENTIFY PEAK MECHANICAL STUDENT AURA.',
      copy: 'One of these radiates pure thermodynamics energy.',
      layout: 'chips',
      options: [
        ['GREASE ON FOREHEAD + BOILER SUIT SWAGGER', 'CHAD ENGINEER', 160, 'MAXIMUM WORKSHOP AURA.'],
        ['CARRIES A DIGITAL VERNIER CALIPER EVERYWHERE', 'PRECISION NERD', 90, 'MEASURING CANTEEN SAMOSAS.'],
        ['COMPLAINS ABOUT LACK OF GIRLS IN CLASS', 'REPETITIVE NPC', -60, 'HEARD THIS JOKE 800 TIMES.'],
        ['CALCULATES GEAR RATIO OF CEILING FAN', 'AUTISTIC GENIUS', 130, 'RPM IS 320.']
      ]
    }
  ],

  Civil: [
    {
      id: 'civil_1',
      category: 'reaction_timing',
      kind: 'timing',
      mechanic: 'timing_bar',
      eyebrow: 'CIVIL THEODOLITE LEVELING',
      title: 'CENTER THE SPIRIT LEVEL BUBBLE!',
      copy: 'Level the surveying tripod before the sun sets on the campus field.',
      layout: 'timing'
    },
    {
      id: 'civil_2',
      category: 'risk_reward',
      kind: 'oneChance',
      mechanic: 'all_or_nothing',
      eyebrow: 'CONCRETE STRENGTH VIVA',
      title: 'M25 GRADE CONCRETE CRUSHED AT ONLY 12 MPa.',
      copy: 'Explain this structural catastrophe to the professor.',
      layout: 'danger',
      options: [
        ['“IT IS SPECIAL SELF-HEALING BIO-CONCRETE, SIR”', 'VISIONARY COPE', 180, 'PROFESSOR WRITES A GRANT PROPOSAL.'],
        ['“CURING WATER WAS CONSUMED BY HOSTEL RESIDENTS”', 'HOSTEL REALITY', 120, 'PITY PASS.'],
        ['“THE TESTING MACHINE IS UNCALIBRATED”', 'BLAME LAB HARDWARE', 140, 'TA APOLOGISES TO YOU.'],
        ['ACCEPT THAT BUILDING WILL COLLAPSE', 'CIVIL DISASTER', -140, 'LICENSE REVOKED.']
      ]
    },
    {
      id: 'civil_3',
      category: 'chaos_wildcard',
      kind: 'rather',
      mechanic: 'versus',
      eyebrow: 'CIVIL FIELD WORK',
      title: 'WOULD YOU RATHER SURVEY IN 42°C HEAT OR DRAFT IN 2D AUTOCAD ALL NIGHT?',
      copy: 'Choose your construction suffering.',
      layout: 'versus',
      options: [
        ['42°C SURVEYING IN THE SUN', 'YELLOW HELMET TAN', 130, 'VITAMIN D OVERDOSE.'],
        ['ALL NIGHT AUTOCAD DRAFTING', 'MOUSE CLICK CRAMP', 130, 'ORTHO MODE LOCKED.']
      ]
    }
  ],

  Biotech: [
    {
      id: 'biotech_1',
      category: 'reaction_timing',
      kind: 'cap',
      mechanic: 'stamps',
      eyebrow: 'BIOTECH STERILE CHECK',
      title: '“I DEFINITELY AUTOCLAVED THIS PETRI DISH”',
      copy: 'There is a fuzzy blue colony growing on the edge. Call it!',
      layout: 'stamps',
      options: [
        ['CAP', 'EXPOSE CONTAMINATION', 150, 'DISPOSAL PROTOCOL ACTIVATED.'],
        ['NO CAP', 'TRUST THE MOLD', -80, 'NEW VIRUS CREATED IN DORM.']
      ]
    },
    {
      id: 'biotech_2',
      category: 'decision_scenario',
      kind: 'wrongClass',
      mechanic: 'dialogue',
      eyebrow: 'BIOTECH PIPETTE EMERGENCY',
      title: 'SET MICROPIPETTE TO 1000μL INSTEAD OF 10μL.',
      copy: 'The entire ₹40,000 enzyme vial was aspirated in one second.',
      layout: 'dialogue',
      options: [
        ['“I DOUBLED THE CONCENTRATION FOR FASTER DISCOVERY”', 'NOBEL PRIZE COPE', 180, 'PROFESSOR IS SPEECHLESS.'],
        ['FILL VIAL BACK WITH DISTILLED WATER', 'HOMOEOPATHIC FIX', 130, 'NOBODY WILL EVER KNOW.'],
        ['ACCUSE THE LAB RAT', 'RODENT BETRAYAL', 80, 'RAT DETAINED.'],
        ['CRY INTO THE LAMINAR AIR FLOW', 'UNSTERILE TEARS', -100, 'LAB SHUT DOWN.']
      ]
    },
    {
      id: 'biotech_3',
      category: 'social_stealth',
      kind: 'chips',
      mechanic: 'chips',
      eyebrow: 'BIOTECH AURA',
      title: 'WHAT GIVES A BIOTECH STUDENT MAXIMUM STREET CRED?',
      copy: 'Choose the ultimate biotech flex.',
      layout: 'chips',
      options: [
        ['WEARS LAB COAT TO CANTEEN LIKE A MAD SCIENTIST', 'MAIN CHARACTER', 160, 'EVERYONE THINKS YOU ARE MAKING ANTIDOTES.'],
        ['UNDERSTANDS CRISPR CAS9 MEMES', 'GENETICIST', 120, 'DNA EDITED.'],
        ['EATS YOGURT BECAUSE OF PROBIOTICS', 'NUTRITION NPC', 40, 'HEALTHY BUT BORING.'],
        ['DROPS PCR TUBE ON FLOOR AND PICKS IT UP IN 5S', '5 SECOND RULE', -60, 'CONTAMINATED.']
      ]
    }
  ],

  Management: [
    {
      id: 'mgmt_1',
      category: 'memory_observation',
      kind: 'slang',
      mechanic: 'definition',
      eyebrow: 'MANAGEMENT BUZZWORD SCAN',
      title: '“LET’S CIRCLE BACK AND SYNERGIZE OFFLINE”',
      copy: 'Translate this corporate MBA phrase into plain English.',
      layout: 'definition',
      options: [
        ['“I WILL IGNORE THIS UNTIL IT BECOMES YOUR PROBLEM”', 'TRUE TRANSLATION', 160, 'YOU SPEAK EXECUTIVE.'],
        ['“LET’S HUG IN A CIRCLE”', 'LITERAL CULT', -60, 'HR REPORT FILED.'],
        ['“WE ARE WORKING HARD”', 'DELUSION', -40, 'NO WORK IS HAPPENING.'],
        ['“MEETING CANCELLED”', 'CLOSE ENOUGH', 80, 'PARTIAL CREDIT.']
      ]
    },
    {
      id: 'mgmt_2',
      category: 'chaos_wildcard',
      kind: 'roast',
      mechanic: 'split',
      eyebrow: 'MANAGEMENT PITCH CRITIQUE',
      title: 'PRESENTATION DECK HAS 58 SLIDES WITH 6 PIE CHARTS & 0 WORKING PRODUCTS.',
      copy: 'Judge this MBA masterpiece.',
      layout: 'split',
      options: [
        ['🔥 RESPECT', 'VC WILL INVEST $10M', 140, 'REVENUE IS A FUTURE PROBLEM.'],
        ['💀 ROAST', 'YAPPING WITHOUT CODING', 140, 'LEARNIT BUILDERS DISAGREE.']
      ]
    },
    {
      id: 'mgmt_3',
      category: 'risk_reward',
      kind: 'invest',
      mechanic: 'invest',
      eyebrow: 'B-PLAN PITCH COMPETITION',
      title: 'WHERE DO YOU DEPLOY 200 AURA IN YOUR B-PLAN?',
      copy: 'Maximise ROI on campus.',
      layout: 'build-cards',
      options: [
        ['📈 “UBER FOR DOG GROOMING”', 'VC MAGNET', 180, 'SERIES A FUNDED.'],
        ['📊 EXPENSE AUTOMATION USING EXCEL', 'PRACTICAL', 120, 'SOLID CASH FLOW.'],
        ['☕ CHAI SUBSCRIPTION PASS FOR CANTEEN', 'CAMPUS MONOPOLY', 220, 'CASH COW BUSINESS.'],
        ['📉 CRYPTO METAVERSE RESORT', 'RUG PULL', -120, 'INVESTORS SUING.']
      ]
    }
  ],

  Commerce: [
    {
      id: 'comm_1',
      category: 'decision_scenario',
      kind: 'exam',
      mechanic: 'exam',
      eyebrow: 'COMMERCE AUDIT BOSS FIGHT',
      title: 'BALANCE SHEET MISMATCH BY EXACTLY ₹1.',
      copy: 'It is 2:45 AM on accounting assignment night. How do you balance it?',
      layout: 'exam',
      options: [
        ['CREATE “SUSPENSE ACCOUNT: ₹1”', 'LEGENDARY ACCOUNTANT', 180, 'BALANCE SHEET BALANCED!'],
        ['ADD ₹1 TO CASH IN HAND FROM YOUR POCKET', 'DESPERATE AUDITOR', 140, 'AUDIT CLEARED.'],
        ['RECALCULATE ALL 400 ENTRIES FROM SCRATCH', 'MASOCHIST', 50, 'STILL OFF BY ₹1 AT 6 AM.'],
        ['BLAME INFLATION', 'MACROECONOMIC COPE', -80, 'ZERO MARKS.']
      ]
    },
    {
      id: 'comm_2',
      category: 'risk_reward',
      kind: 'hotTake',
      mechanic: 'binary_opinion',
      eyebrow: 'COMMERCE HOT TAKE',
      title: '“EXCEL > EVERY CODING LANGUAGE EVER INVENTED.”',
      copy: 'Is this take a W or an L?',
      layout: 'binary',
      options: [
        ['W', 'VLOOKUP SUPREMACY', 150, 'WALL STREET RUNS ON .XLSX.'],
        ['L', 'PROGRAMMER COPE', -50, 'PYTHON HAS PANDAS BRO.']
      ]
    },
    {
      id: 'comm_3',
      category: 'social_stealth',
      kind: 'chips',
      mechanic: 'chips',
      eyebrow: 'COMMERCE STREET CRED',
      title: 'HOW DO YOU PROVE YOU ARE A FINANCE PRODIGY?',
      copy: 'Select the ultimate financial flex.',
      layout: 'chips',
      options: [
        ['SPLIT THE CANTEEN BILL TO 4 DECIMAL PLACES', 'FINANCIAL TERRORIST', 140, 'EXACT MATH.'],
        ['CHECK STOCK PRICES ON LOCKSCREEN DURING CLASS', 'WOLF OF CAMPUS', 130, 'GREEN CANDLES.'],
        ['GIVE UNSOLICITED TAX ADVICE TO PROFESSOR', 'AUDACIOUS', 160, 'PROFESSOR SAVED ₹14,000.'],
        ['LOSE ₹200 ON TRADING APP AND CRY', 'RETAIL TRADER', -60, 'PORTFOLIO RECKED.']
      ]
    }
  ],

  Law: [
    {
      id: 'law_1',
      category: 'reaction_timing',
      kind: 'winloss',
      mechanic: 'binary',
      eyebrow: 'MOOT COURT REFLEX',
      title: 'OPPOSING COUNSEL DROPS HEARSAY EVIDENCE.',
      copy: 'Make the immediate objection before the judge rules!',
      layout: 'binary',
      options: [
        ['OBJECTION, HEARSAY!', 'SUSTAINED (+160)', 160, 'JUDGE NODS IN APPROVAL.'],
        ['STARE IN SILENCE', 'OVERRULED (-70)', -70, 'EVIDENCE ADMITTED.']
      ]
    },
    {
      id: 'law_2',
      category: 'decision_scenario',
      kind: 'wrongClass',
      mechanic: 'dialogue',
      eyebrow: 'HOSTEL WARDEN TRIBUNAL',
      title: 'WARDEN CAUGHT YOU COOKING MAGGI IN THE DORM ROOM.',
      copy: 'Defend your constitutional right to midnight noodles.',
      layout: 'dialogue',
      options: [
        ['“ARTICLE 21 GUARANTEES RIGHT TO LIFE & NOODLES”', 'SUPREME COURT AURA', 200, 'WARDEN WITHDRAWS FINE.'],
        ['“THE KETTLE BELONGS TO MY PREVIOUS ROOMMATE”', 'BURDEN OF PROOF', 120, 'EVIDENCE INSUFFICIENT.'],
        ['OFFER WARDEN A BOWL OF MAGGI', 'SETTLEMENT OFFER', 150, 'OUT OF COURT SETTLEMENT.'],
        ['PLEAD GUILTY AND CONFESS TO 12 OTHER CRIMES', 'WORST LAWYER', -120, 'EXPELLED FROM HOSTEL.']
      ]
    },
    {
      id: 'law_3',
      category: 'memory_observation',
      kind: 'libraryBoss',
      mechanic: 'priority',
      eyebrow: 'LAW LIBRARY BOSS FIGHT',
      title: 'YOU HAVE 800 PAGES OF BARE ACTS TO READ TONIGHT.',
      copy: 'What is your tactical legal preparation method?',
      layout: 'danger',
      options: [
        ['READ ONLY THE LANDMARK 3-PARAGRAPH RATIO DECIDENDI', 'EFFICIENT ADVOCATE', 160, 'PASSED VIVA WITH DISTINCTION.'],
        ['CITE FAKE CASE LAWS WITH HIGH CONFIDENCE', 'HARVEY SPECTER MOVE', 180, 'PROFESSOR DIDN’T CHECK THE CITATION.'],
        ['READ EVERY FOOTNOTE IN LATIN', 'SCHOLAR TORTURE', 40, 'ASLEEP BY PAGE 14.'],
        ['SUE THE UNIVERSITY FOR SLEEP DEPRIVATION', 'UNHINGED LITIGATION', 100, 'CASE ADMITTED.']
      ]
    }
  ],

  Psychology: [
    {
      id: 'psych_1',
      category: 'memory_observation',
      kind: 'whoSent',
      mechanic: 'archetype',
      eyebrow: 'PSYCHOLOGICAL DIAGNOSIS',
      title: '“HE DIDN’T REPLY IN 4 MINUTES, HE MUST BE NARCISSISTIC”',
      copy: 'Diagnose this over-analyzing campus personality.',
      layout: 'chips',
      options: [
        ['🧠', 'THE FREUDIAN OVERTHINKER', 160, 'PROJECTION & DEFENSE MECHANISM.'],
        ['📱', 'THE DELUSIONAL DATER', 120, 'ANXIOUS ATTACHMENT STYLE.'],
        ['🗿', 'THE STOIC NPC', -40, 'UNBOTHERED.'],
        ['👻', 'THE GHOST', 30, 'HE WAS JUST PLAYING VALORANT.']
      ]
    },
    {
      id: 'psych_2',
      category: 'decision_scenario',
      kind: 'wrongClass',
      mechanic: 'dialogue',
      eyebrow: 'PAVLOVIAN CANTEEN HACK',
      title: 'CONDITIONING CANTEEN BHAIYA TO GIVE EXTRA CHEESE.',
      copy: 'Deploy psychological behavioral conditioning.',
      layout: 'dialogue',
      options: [
        ['SMILE & SAY “THANK YOU BHAIYA” EVERY SINGLE TIME', 'POSITIVE REINFORCEMENT', 180, 'EXTRA CHEESE GRANTED FOREVER.'],
        ['PLAY A BELL RING BEFORE ASKING FOR SAMOSA', 'CLASSICAL CONDITIONING', 140, 'BHAIYA SALIVATES.'],
        ['STARE INTO HIS SOUL WITHOUT BLINKING', 'INTIMIDATION', -60, 'BHAIYA CHARGES EXTRA ₹10.'],
        ['ANALYZE HIS CHILDHOOD TRAUMA', 'OVERSTEPPED', -80, 'KICKED OUT OF CANTEEN.']
      ]
    },
    {
      id: 'psych_3',
      category: 'risk_reward',
      kind: 'hotTake',
      mechanic: 'binary_opinion',
      eyebrow: 'PSYCHOLOGY TRUTH BOMB',
      title: '“‘I CAN FIX HIM/HER’ HAS A 0.00% SUCCESS RATE.”',
      copy: 'Is this take a W or an L?',
      layout: 'binary',
      options: [
        ['W', 'PSYCHOLOGICAL FACT', 160, 'CANNOT FIX TOXICITY.'],
        ['L', 'HOPEFUL DELUSION', -60, 'CHARACTER DEVELOPMENT ARC FAILED.']
      ]
    }
  ]
};
