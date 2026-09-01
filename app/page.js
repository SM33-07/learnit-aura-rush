'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MEMBERSHIP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScdpk6YjFtwWux8XXBr7tJRYrIlJSdsTNbfT3mahZShdCxHQ/viewform';

const ROUND_DURATION = 10;
const ROUND_TRANSITION_MS = 1400;

const CAMPUS_CLASSES = ['CSE', 'Design', 'Management', 'Other'];

const DEPARTMENT_EDITIONS = {
  CSE: 'CSE EDITION',
  Design: 'DESIGN EDITION',
  Management: 'MANAGEMENT EDITION',
  Other: 'CAMPUS EDITION',
};

function shuffle(array) {
  const pool = [...array];
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }
  return pool;
}

// 38 UNIQUE CHALLENGES CATEGORIZED FOR BALANCED 8-CHALLENGE RUNS
const challengePool = {
  reaction_timing: [
    { id: 'c1', kind: 'cap', mechanic: 'stamps', eyebrow: 'CAP DETECTOR', title: <>YOUR FRIEND SAYS<br />“BRO I STUDIED.”</>, copy: 'Cap or no cap? Call it before the timer expires.', layout: 'stamps', options: [['NO CAP', 'BELIEVE', 40, 'WHOLESOME.'], ['CAP', 'CALL IT', 130, 'LIE DETECTED.']] },
    { id: 'c2', kind: 'winloss', mechanic: 'binary', eyebrow: 'W OR L?', title: <>SUBMITTED AT 11:59.<br />DEADLINE: 12:00.</>, copy: 'Make the clutch call.', layout: 'binary', options: [['W', 'CLUTCH', 130, 'THE ROOM SAYS W.'], ['L', 'FUMBLE', -60, 'THE ROOM DISAGREES.']] },
    { id: 'c3', kind: 'blink', mechanic: 'reflex', eyebrow: 'REFLEX TEST', title: <>DON&apos;T<br />BLINK.</>, copy: 'Tap the exact millisecond the eye closes. No flinching.', layout: 'blink' },
    { id: 'c4', kind: 'timing', mechanic: 'timing_bar', eyebrow: 'DEADLINE CLUTCH', title: <>STOP THE NEEDLE<br />AT MAX AURA.</>, copy: 'Land inside the green zone for cinematic timing.', layout: 'timing' },
    { id: 'c5', kind: 'alarm', mechanic: 'alarm_picker', eyebrow: 'ALARM SPEEDRUN', title: <>DISMISS THE<br />7:45 AM ALARM.</>, copy: 'Four alarms ringing. Dismiss ONLY the 7:45 AM class alarm!', layout: 'alarms', alarms: [{ time: '2:00 AM', label: 'LATE SNACK', correct: false }, { time: '7:45 AM', label: '8 AM LECTURE', correct: true }, { time: '6:30 AM', label: 'GYM DELUSION', correct: false }, { time: '8:15 AM', label: 'TOO LATE', correct: false }] },
    { id: 'c6', kind: 'dontPress', mechanic: 'silent', eyebrow: 'SILENT AURA', title: <>DO NOTHING<br />FOR 5 SECONDS.</>, copy: 'Tap anywhere and your aura drops. Hold your nerve.', layout: 'silent' },
  ],
  memory_observation: [
    { id: 'c7', kind: 'memoryLock', mechanic: 'memory', eyebrow: 'MEMORY LOCKER', title: <>WHAT ITEM WAS<br />JUST STOLEN?</>, copy: 'Lock in. Memorise the items before one disappears.', layout: 'memory_lock', items: ['🍕', '🎧', '🛹'], missingItem: '🎧', answers: [['🍕', 'PIZZA', false], ['🎧', 'HEADPHONES', true], ['🛹', 'SKATEBOARD', false]] },
    { id: 'c8', kind: 'sequence', mechanic: 'sequence', eyebrow: 'SEQUENCE BREAKER', title: <>REPEAT THE<br />HANDSHAKE.</>, copy: 'Memorise and tap the 3-icon sequence in exact order: 🤝 → ✌️ → 🗿', layout: 'sequence', targetSequence: ['🤝', '✌️', '🗿'], choices: ['🤝', '✌️', '🗿', '🔥'] },
    { id: 'c9', kind: 'whoSent', mechanic: 'archetype', eyebrow: 'WHO SENT THIS?', title: <>“BRO MARK PROXY,<br />FIGHTING FOR MY LIFE.”</>, copy: 'Identify the campus archetype behind this message.', layout: 'chips', options: [['👻', 'THE GHOST', 130, 'ACCURATE.'], ['🤓', 'THE FRONTBENCHER', -40, 'NEVER MISSES CLASS.'], ['📚', 'THE TOPPER', -50, 'DELUSIONAL GUESS.'], ['🏃', 'THE COMMUTER', 70, 'POSSIBLE.']] },
    { id: 'c10', kind: 'libraryBoss', mechanic: 'priority', eyebrow: 'LIBRARY BOSS FIGHT', title: <>CHOOSE THE #1<br />WORST NOISE.</>, copy: 'Which distraction deserves immediate campus exile?', layout: 'danger', options: [['🥔', 'LOUD CHIPS CRUNCHING', 140, 'EXILED IMMEDIATELY.'], ['📱', 'PHONE ON FULL SPEAKER', 120, 'NPC BEHAVIOUR.'], ['🗣️', 'GROUP WHISPERING', 80, 'UNDERSTANDABLE PAIN.'], ['🎧', 'AUDIO LEAKING FROM AIRPODS', 60, 'MILD NUISANCE.']] },
    { id: 'c11', kind: 'slang', mechanic: 'definition', eyebrow: 'SLANG SCAN', title: <>“IT’S GIVING…”<br />MEANS?</>, copy: 'Choose the closest internet vibe, not the dictionary definition.', layout: 'definition', options: [['A CERTAIN VIBE', 'CORRECT', 120, 'SPEAKS INTERNET.'], ['SOMETHING BROKE', 'NOPE', -45, 'TECH SUPPORT ARC.'], ['IT’S FINISHED', 'NOPE', -45, 'NOT QUITE.'], ['IT’S EXPENSIVE', 'NOPE', -45, 'MONEY MENTIONED.']] },
    { id: 'c12', kind: 'translate', mechanic: 'chat', eyebrow: 'CHAT TRANSLATOR', title: <>“NAH TS IS<br />COOKED NGL 💀”</>, copy: 'What is the true translation?', layout: 'chat', options: [['EVERYTHING IS FINE', 'DELUSION', -50, 'READ IT AGAIN.'], ['THIS IS TERRIBLE', 'TRANSLATION', 130, 'FLUENT.'], ['SOMEONE IS HUNGRY', 'RANDOM', -20, 'WHERE DID FOOD COME FROM?'], ['WE ARE LEAVING', 'POSSIBLE', 30, 'MAYBE.']] },
  ],
  risk_reward: [
    { id: 'c13', kind: 'auraAuction', mechanic: 'wager', eyebrow: 'AURA AUCTION', title: <>BID FOR THE ONLY<br />WORKING CHARGER PLUG.</>, copy: 'Higher bids yield bigger aura multiplier, but risk is real.', layout: 'danger', options: [['⚡ 50 AURA', 'SAFE BID', 60, 'CONSERVATIVE PLAY.'], ['⚡ 120 AURA', 'AGGRESSIVE', 140, 'CHARGER SECURED.'], ['⚡ ALL-IN AURA', 'CHAOS BID', 240, 'ABSOLUTE CINEMA.'], ['🚶 WALK AWAY', 'ZERO RISK', -20, 'BATTERY DIED AT 2%.']] },
    { id: 'c14', kind: 'auraInvest', mechanic: 'invest', eyebrow: 'AURA INVESTMENT', title: <>INVEST 100 AURA<br />INTO A CAMPUS STARTUP.</>, copy: 'High risk, absurd return.', layout: 'danger', options: [['🥟 SAMOSA FUTURES', '+200 AURA', 200, 'CANTEEN ECONOMY BOOM.'], ['🤖 AI PROXY BOT', '+120 AURA', 120, 'PROFESSOR OUTSMARTED.'], ['🐱 DATING APP FOR CATS', '+160 AURA', 160, 'SILICON VALLEY WANTS IN.'], ['💤 8 AM SLEEP TOKEN', '-100 AURA', -100, 'RUG PULLED BY ATTENDANCE.']] },
    { id: 'c15', kind: 'oneChance', mechanic: 'all_or_nothing', eyebrow: 'ONE CHANCE', title: <>THE SURPRISE VIVA<br />QUESTION IS DROPPED.</>, copy: 'One clutch attempt. Maximum risk.', layout: 'danger', options: [['“ACCORDING TO MY RESEARCH...”', 'CONFIDENT YAP', 220, 'PROFESSOR CONVINCED.'], ['“CAN YOU REPEAT THE QUESTION?”', 'STALL FOR TIME', 60, 'SURVIVED.'], ['“I WAS NOT PRESENT BRO”', 'HONEST FATAL', -140, 'VIVA FUMBLED.']] },
    { id: 'c16', kind: 'finalWarning', mechanic: 'gamble', eyebrow: 'FINAL WARNING', title: <>GROUP CHAT<br />ROAST BATTLE.</>, copy: 'Choose your level of flame.', layout: 'versus', options: [['MILD JOKE', 'SAFE (+80)', 80, 'CROWD CHUCKLES.'], ['TACTICAL MEME NUKE', 'HIGH RISK (+220)', 220, 'GROUP CHAT SHUT DOWN.']] },
    { id: 'c17', kind: 'ratio', mechanic: 'prediction', eyebrow: 'RATIO CHECK', title: <>“ATTENDANCE CRITERIA<br />SHOULD BE 0%.”</>, copy: 'Predict the campus room consensus.', layout: 'binary', options: [['99% AGREE', 'OBVIOUS', 130, 'UNANIMOUS AURA.'], ['50% DISAGREE', 'WRONG', -50, 'NOT THIS CAMPUS.']] },
    { id: 'c18', kind: 'hotTake', mechanic: 'binary_opinion', eyebrow: 'CAMPUS HOT TAKE', title: <>“8 AM CLASSES<br />BUILD CHARACTER.”</>, copy: 'Is this take a W or an L?', layout: 'binary', options: [['L', 'MASSIVE L', 130, 'FACTS.'], ['W', 'DELUSIONAL', -80, 'WHO HURT YOU?']] },
  ],
  decision_scenario: [
    { id: 'c19', kind: 'lastSeat', mechanic: 'multi_choice', eyebrow: 'LAST SEAT', title: <>ONE SEAT LEFT<br />IN ROW 3.</>, copy: 'Where do you deploy your presence?', layout: 'dialogue', options: [['SIT BESIDE THE PROFESSOR', 'PSYCHOPATH AURA', 160, 'FEARLESS.'], ['SQUEEZE BETWEEN A COUPLE', 'AWKWARD', -40, 'ROOM TENSION RISES.'], ['STAND AT THE BACK LIKE A MONK', 'PHILOSOPHER', 120, 'TACTICAL DISTANCE.'], ['LEAVE AND GET CHAI', 'HONEST', 50, 'CANTEEN ESCAPE.']] },
    { id: 'c20', kind: 'hostelCrisis', mechanic: 'multi_choice', eyebrow: 'HOSTEL CRISIS', title: <>2:30 AM AND<br />MAGGI IS FINISHED.</>, copy: 'Emergency protocol activated.', layout: 'route', options: [['RAID 2ND FLOOR KITCHEN', 'PIRATE AURA', 130, 'LOOT SECURED.'], ['ORDER FROM 6KM AWAY', 'EXPENSIVE', 60, 'DELIVERY ARRIVES AT 4 AM.'], ['SLEEP AND DREAM OF CARBS', 'RESIGNED', 20, 'HUNGER DEFEATED YOU.'], ['BORROW SNOOZE INDUCERS', 'SUS', -30, 'NOT THE VIBE.']] },
    { id: 'c21', kind: 'wrongClass', mechanic: 'multi_choice', eyebrow: 'WRONG CLASS', title: <>ENTERED ADVANCED<br />FLUID DYNAMICS BY MISTAKE.</>, copy: 'The professor is already staring.', layout: 'dialogue', options: [['CONFIDENTLY NOD AND TAKE NOTES', 'STEALTH', 140, 'PROFESSOR RESPECTS YOU.'], ['ACT LIKE A GUEST LECTURER', 'UNHINGED', 180, 'ABSOLUTE CINEMA.'], ['MOONWALK OUT BACKWARDS', 'COMEDY', 90, 'LEGENDARY ESCAPE.'], ['APOLOGISE AND CRY', 'NPC', -60, 'AURA IN CRITICAL STATE.']] },
    { id: 'c22', kind: 'canteenBudget', mechanic: 'budget', eyebrow: 'CANTEEN NEGOTIATOR', title: <>YOU HAVE ₹80.<br />BUILD LUNCH.</>, copy: 'Maximise happiness, value and quantity.', layout: 'budget', options: [['🥟 + 🥤', 'SAMOSA + COLD DRINK / ₹50', 120, 'BALANCED MEAL.'], ['🌯', 'BIG ROLL / ₹60', 90, 'SINGLE-ITEM SPECIALIST.'], ['🍟 + 🥟', 'FRIES + SAMOSA / ₹70', 150, 'CANTEEN IQ.'], ['💧', 'JUST WATER / ₹0', -70, 'GRINDSET GONE WRONG.']] },
    { id: 'c23', kind: 'campusMap', mechanic: 'route', eyebrow: 'CAMPUS MAP CHAOS', title: <>FASTEST SHORTCUT<br />TO LAB 3.</>, copy: 'Class starts in 3 minutes.', layout: 'route', options: [['SPRINT THROUGH CANTEEN CROWD', 'OBSTACLE COURSE', 110, 'AGILITY CHECK PASSED.'], ['JUMP OVER THE CENTRAL LAWN', 'PARKOUR', 140, 'GUARD WAS LOOKING AWAY.'], ['WAIT FOR ELEVATOR', 'TRAP', -80, 'ELEVATOR BUFFERING.'], ['WALK NORMALLY', 'TOO SLOW', -40, 'LATE BY 10 MINS.']] },
    { id: 'c24', kind: 'attendance', mechanic: 'meter_choice', eyebrow: 'ATTENDANCE SIMULATOR', title: <>ATTENDANCE:<br />74.2%</>, copy: 'One lecture left tomorrow. What is the play?', layout: 'meter-choice', options: [['GO TO CLASS', 'SAFE', 130, 'LOCKED IN.'], ['EMAIL PROFESSOR', 'BOLD', 45, 'DIPLOMACY.'], ['PRAY', 'SPIRITUAL', 20, 'HIGHER POWERS.'], ['ASK FOR PROXY', 'CHAOS', 70, 'RISK TAKEN.']] },
    { id: 'c25', kind: 'morning', mechanic: 'route', eyebrow: '8 AM LECTURE', title: <>7:42 AM.<br />CLASS AT 8.</>, copy: 'Twelve minutes away. Pick one move.', layout: 'route', options: [['🏃', 'RUN WITHOUT BREAKFAST', 130, 'LOCKED IN.'], ['🚿', 'SHOWER FIRST', -50, 'TIME BLIND.'], ['😴', 'GO BACK TO SLEEP', -120, 'SNOOZE AURA.'], ['📱', 'ASK IF ATTENDANCE HAI', 50, 'INFORMATION FIRST.']] },
    { id: 'c26', kind: 'exam', mechanic: 'exam', eyebrow: 'EXAM HALL DISASTER', title: <>STUDIED CHAPTER 1.<br />EXAM IS CHAPTER 4.</>, copy: 'Activate the survival instinct.', layout: 'exam', options: [['🧮', 'CALCULATE PASS MARKS', 90, 'REALISTIC.'], ['🔮', 'ACTIVATE DELUSION', 130, 'ACADEMIC MAGIC.'], ['😶', 'ACCEPT FATE', 20, 'ZEN MODE.'], ['📖', 'READ FROM THE BACK', 50, 'TACTICAL.']] },
  ],
  social_stealth: [
    { id: 'c27', kind: 'wingman', mechanic: 'dialogue', eyebrow: 'ULTIMATE WINGMAN', title: <>YOUR FRIEND IS<br />FUMBLING HARD.</>, copy: 'Deploy tactical wingman support.', layout: 'dialogue', options: [['DROP A SMOOTH ICEBREAKER', 'HERO MOVE', 140, 'SITUATION RESCUED.'], ['PRETEND YOU ARE HIS CEO', 'CHAOTIC HYPE', 160, 'LEGENDARY WINGMAN.'], ['PANIC AND TRIP ON PURPOSE', 'DISTRACTION', 70, 'DISTRACTION SUCCEEDED.'], ['RECORD A TIKTOK', 'BETRAYAL', -90, 'FRIENDSHIP TERMINATED.']] },
    { id: 'c28', kind: 'groupPanic', mechanic: 'chat', eyebrow: 'GROUP CHAT PANIC', title: <>PROFESSOR ACCIDENTALLY<br />SENT A MEME.</>, copy: 'Choose the only socially survivable response.', layout: 'chat', options: [['REACT WITH “🗿”', 'UNBOTHERED', 140, 'CROWD FOLLOWS.'], ['SEND SYLLABUS QUERY', 'DEFLECTION', 80, 'PROFESSOR SAVED.'], ['TYPE “BRO COOKED 💀”', 'FATAL MISTAKE', -120, 'REMOVED FROM GROUP.'], ['LEAVE THE GROUP', 'ESCAPE', -40, 'RADICAL MOVE.']] },
    { id: 'c29', kind: 'npcDetector', mechanic: 'chips', eyebrow: 'NPC DETECTOR', title: <>IDENTIFY THE PURE<br />NPC BEHAVIOR.</>, copy: 'One of these radiates 0 aura.', layout: 'chips', options: [['WALKING WITH BOTH STRAPS TIGHT', 'NPC TIER 1', 130, 'CORRECT NPC IDENTIFIED.'], ['WEARING HOODIE IN 38°C HEAT', 'EDGE LORD', 40, 'MISUNDERSTOOD AURA.'], ['SITTING FRONT ROW VOLUNTARILY', 'DANGEROUS', 60, 'PROTAGONIST MOVE.'], ['CHARGING LAPTOP AT 98%', 'PARANOID', 20, 'MILD.']] },
    { id: 'c30', kind: 'socialStealth', mechanic: 'dialogue', eyebrow: 'SOCIAL STEALTH', title: <>CRUSH AND EX ENTER<br />CANTEEN AT ONCE.</>, copy: 'Maximum spatial awareness needed.', layout: 'dialogue', options: [['PUT SUNGLASSES ON INDOORS', 'CINEMATIC', 150, 'UNTOUCHABLE.'], ['WALK STRAIGHT BETWEEN THEM', 'MAIN CHARACTER', 160, 'ROOM GOES SILENT.'], ['DUCK BEHIND SODA COOLER', 'STEALTH FAILED', -70, 'SPOTTED IMMEDIATELY.'], ['STARE AT CANTEEN MENU', 'DEFAULT NPC', 30, 'SURVIVED BARELY.']] },
    { id: 'c31', kind: 'bankruptcy', mechanic: 'danger', eyebrow: 'AURA BANKRUPTCY', title: <>YOUR CRUSH<br />WALKS PAST.</>, copy: 'This choice will echo through campus lore.', layout: 'danger', options: [['👀', 'MAKE EYE CONTACT', 140, 'CONFIDENCE.'], ['📱', 'CHECK YOUR PHONE', 40, 'SAFE PLAY.'], ['🫠', 'TRIP FOR NO REASON', -150, 'AURA DESTROYED.'], ['🧱', 'WALK INTO A WALL', -200, 'COOKED BEYOND REPAIR.']] },
    { id: 'c32', kind: 'charger', mechanic: 'negotiation', eyebrow: 'CHARGER DIPLOMACY', title: <>“BRO, CAN I USE<br />YOUR CHARGER?”</>, copy: 'Your laptop battery is at 41 percent.', layout: 'negotiation', options: [['YES, TAKE IT', 'GENEROUS', 120, 'SOCIAL AURA.'], ['2 MINUTES ONLY', 'FAIR', 70, 'BOUNDARIES.'], ['“I’M ON 12%”', 'TACTICAL LIE', -30, 'SUS RESPONSE.'], ['PRETEND NOT TO HEAR', 'GHOST', -60, 'BAD ROOMMATE ARC.']] },
  ],
  chaos_wildcard: [
    { id: 'c33', kind: 'phone1', mechanic: 'route', eyebrow: 'PHONE AT 1%', title: <>YOUR BATTERY IS<br />AT EXACTLY 1%.</>, copy: 'One final tap before phone dies forever.', layout: 'route', options: [['SCREENSHOT UPI QR CODE', 'SURVIVAL', 140, 'CANTEEN BILL PAID.'], ['SEND PROXY TO GROUP CHAT', 'LOYAL', 120, 'SAVED A FRIEND.'], ['DOOMSCROLL INSTAGRAM REELS', 'ADDICTION', -80, 'BLACK SCREEN OF REGRET.'], ['CALL MOM', 'WHOLESOME', 100, 'GOOD KARMA.']] },
    { id: 'c34', kind: 'roast', mechanic: 'split', eyebrow: 'ROAST OR RESPECT', title: <>RIYA HAS 7 TABS<br />OPEN DURING CLASS.</>, copy: 'Choose her fate. Keep it harmless.', layout: 'split', options: [['🔥', 'RESPECT', 120, 'MAIN CHARACTER BEHAVIOUR.'], ['💀', 'ROAST', 80, 'AURA UNDER INVESTIGATION.']] },
    { id: 'c35', kind: 'rather', mechanic: 'versus', eyebrow: 'WOULD YOU RATHER', title: <>8 AM CLASS<br />OR SURPRISE VIVA?</>, copy: 'The room is waiting for your answer.', layout: 'versus', options: [['8 AM CLASS', 'EARLY PAIN', 90, 'THE ROOM HAS DECIDED.'], ['SURPRISE VIVA', 'SUDDEN PAIN', 130, 'BRAVE CHOICE.']] },
    { id: 'c36', kind: 'build', mechanic: 'build_cards', eyebrow: 'LEARNIT LAB', title: <>BUILD SOMETHING<br />QUESTIONABLE.</>, copy: 'You have sixty seconds and one random idea.', layout: 'build-cards', options: [['🐱', 'DATING APP FOR CATS', 160, 'WELCOME TO LEARNIT.'], ['🍕', 'CANTEEN QUEUE PREDICTOR', 130, 'ACTUALLY USEFUL.'], ['🛵', 'HOSTEL FOOD DELIVERY', 100, 'LOGISTICS ERA.'], ['🎮', 'FLAPPY PROFESSOR', 160, 'WE LOVE THE ENERGY.']] },
    { id: 'c37', kind: 'entrance', mechanic: 'swipe', eyebrow: 'AURA MAXXING', title: <>MAKE YOUR<br />ENTRANCE.</>, copy: 'You are 20 minutes late. How do you enter class?', layout: 'swipe', options: [['😎', 'WALK IN LIKE NOTHING HAPPENED', 250, 'MAIN CHARACTER ENERGY.'], ['🤫', 'SLIP INTO THE BACK', 80, 'STEALTH AURA.'], ['🙇', 'APOLOGISE TO EVERYONE', -35, 'TOO POLITE.'], ['🚦', 'BLAME THE TRAFFIC', 20, 'CLASSIC EXCUSE.']] },
    { id: 'c38', kind: 'whoWould', mechanic: 'vote', eyebrow: 'THE ROOM DECIDES', title: <>WHO WOULD SURVIVE<br />A ZOMBIE APOCALYPSE?</>, copy: 'Cast the decisive campus vote.', layout: 'vote', options: [['RIYA', 'STRATEGIST', 90, 'RIYA GETS PLOT ARMOR.'], ['DEV', 'RESOURCEFUL', 90, 'DEV KNOWS A GUY.'], ['ANANYA', 'CHAOS GENIUS', 90, 'ANANYA WINS SOMEHOW.'], ['YOU', 'SELF BELIEF', 140, 'PROTAGONIST VOTED.']] },
  ],
};

// BALANCED 8-CHALLENGE SESSION PICKER: GUARANTEES 8 COMPLETELY DIFFERENT MECHANIC TYPES IN EVERY RUN
function pickBalancedSession() {
  // 8 distinct mechanic archetypes
  const m1 = shuffle(challengePool.reaction_timing)[0]; // timing / blink / alarm
  const m2 = shuffle(challengePool.memory_observation)[0]; // memory / sequence / chat translator
  const m3 = shuffle(challengePool.risk_reward)[0]; // auction / invest / one chance gamble
  const m4 = shuffle(challengePool.decision_scenario.filter(c => c.mechanic === 'budget' || c.mechanic === 'route' || c.mechanic === 'meter_choice'))[0];
  const m5 = shuffle(challengePool.social_stealth.filter(c => c.mechanic === 'dialogue' || c.mechanic === 'chips' || c.mechanic === 'danger'))[0];
  const m6 = shuffle(challengePool.reaction_timing.concat(challengePool.risk_reward).filter(c => c.mechanic === 'stamps' || c.mechanic === 'binary' || c.mechanic === 'binary_opinion'))[0] || challengePool.risk_reward[0];
  const m7 = shuffle(challengePool.chaos_wildcard.filter(c => c.mechanic === 'split' || c.mechanic === 'versus' || c.mechanic === 'vote'))[0];
  const m8 = shuffle(challengePool.reaction_timing.concat(challengePool.chaos_wildcard).filter(c => c.mechanic === 'silent' || c.mechanic === 'build_cards'))[0] || challengePool.chaos_wildcard[0];

  const poolCandidates = [m1, m2, m3, m4, m5, m6, m7, m8];
  
  // Deduplicate by ID and mechanic to guarantee 100% unique types
  const usedMechanics = new Set();
  const session = [];
  
  for (const c of poolCandidates) {
    if (c && !session.some(x => x.id === c.id) && !usedMechanics.has(c.mechanic)) {
      session.push(c);
      usedMechanics.add(c.mechanic);
    }
  }

  // If any slot needed filler, draw from remaining unused mechanics
  if (session.length < 8) {
    const all = [
      ...challengePool.reaction_timing,
      ...challengePool.memory_observation,
      ...challengePool.risk_reward,
      ...challengePool.decision_scenario,
      ...challengePool.social_stealth,
      ...challengePool.chaos_wildcard,
    ];
    for (const c of shuffle(all)) {
      if (session.length >= 8) break;
      if (!session.some(x => x.id === c.id) && !usedMechanics.has(c.mechanic)) {
        session.push(c);
        usedMechanics.add(c.mechanic);
      }
    }
  }

  return shuffle(session.slice(0, 8));
}

function Sparkles({ count = 16 }) {
  return <div className="sparkles" aria-hidden="true">{Array.from({ length: count }, (_, index) => <i key={index} style={{ '--i': index }} />)}</div>;
}

export default function Home() {
  const [screen, setScreen] = useState('intro');
  const [round, setRound] = useState(0);
  const [sessionRounds, setSessionRounds] = useState([]);
  const [countdownText, setCountdownText] = useState('3');
  const [score, setScore] = useState(500);
  const [playerName, setPlayerName] = useState('');
  const [department, setDepartment] = useState('');
  const [seconds, setSeconds] = useState(ROUND_DURATION);
  const [toast, setToast] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [screenShake, setScreenShake] = useState(false);
  const [friendModal, setFriendModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic Mini-Game State Hooks
  const [needle, setNeedle] = useState(50);
  const [memState, setMemState] = useState('showing'); // 'showing' | 'hidden'
  const [userSequence, setUserSequence] = useState([]);

  const blinkTimeout = useRef();
  const timerRef = useRef();
  const needleFrame = useRef();
  const memTimeout = useRef();

  const clearRoundTimers = useCallback(() => {
    clearTimeout(blinkTimeout.current);
    clearTimeout(memTimeout.current);
    clearInterval(timerRef.current);
    cancelAnimationFrame(needleFrame.current);
  }, []);

  const displayToast = useCallback((heading, points) => {
    setToast({ heading, points, id: Date.now() });
    if (points > 0) {
      setBurstKey((key) => key + 1);
    } else {
      setScreenShake(true);
      window.setTimeout(() => setScreenShake(false), 450);
    }
  }, []);

  const showResults = useCallback(() => {
    clearRoundTimers();
    setScreen('results');
    setBurstKey((key) => key + 1);
  }, [clearRoundTimers]);

  const resolveRound = useCallback((points, heading) => {
    if (isResolving) return;
    setIsResolving(true);
    clearRoundTimers();
    setScore((oldScore) => Math.max(0, oldScore + points));
    displayToast(heading, points);
    window.setTimeout(() => {
      if (round === sessionRounds.length - 1) {
        showResults();
      } else {
        setRound((oldRound) => oldRound + 1);
        setIsResolving(false);
      }
    }, ROUND_TRANSITION_MS);
  }, [clearRoundTimers, displayToast, isResolving, round, sessionRounds.length, showResults]);

  useEffect(() => () => clearRoundTimers(), [clearRoundTimers]);

  // Round Timer & Interactive Round Drivers
  useEffect(() => {
    if (screen !== 'game' || !sessionRounds.length) return undefined;
    setSeconds(ROUND_DURATION);
    setIsBlinking(false);
    setMemState('showing');
    setUserSequence([]);
    const currentRoundObj = sessionRounds[round];
    const currentKind = currentRoundObj?.kind;

    timerRef.current = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 0.1) {
          clearInterval(timerRef.current);
          window.setTimeout(() => {
            if (currentKind === 'dontPress') {
              resolveRound(200, 'DISCIPLINE +200 AURA.');
            } else {
              resolveRound(-60, 'TIME FUMBLED. -60 AURA 💀');
            }
          }, 0);
          return 0;
        }
        return Math.max(0, value - 0.1);
      });
    }, 100);

    // Reflex Blink Driver
    if (currentKind === 'blink') {
      const wait = 2400 + Math.random() * 1800;
      blinkTimeout.current = window.setTimeout(() => {
        setIsBlinking(true);
        blinkTimeout.current = window.setTimeout(() => {
          resolveRound(-50, 'TOO SLOW. -50 AURA 💀');
        }, 700);
      }, wait);
    }

    // Memory Locker Driver
    if (currentKind === 'memoryLock') {
      memTimeout.current = window.setTimeout(() => {
        setMemState('hidden');
      }, 1600);
    }

    // Timing Gauge Driver
    if (currentKind === 'timing') {
      const started = performance.now();
      const travel = (time) => {
        setNeedle(((Math.sin((time - started) / 400) + 1) / 2) * 100);
        needleFrame.current = requestAnimationFrame(travel);
      };
      needleFrame.current = requestAnimationFrame(travel);
    }

    return clearRoundTimers;
  }, [clearRoundTimers, resolveRound, round, screen, sessionRounds]);

  // Fast 3... 2... 1... AURA RUSH Calibration
  useEffect(() => {
    if (screen !== 'calibrating') return undefined;
    setCountdownText('3');
    const timer1 = window.setTimeout(() => setCountdownText('2'), 380);
    const timer2 = window.setTimeout(() => setCountdownText('1'), 760);
    const timer3 = window.setTimeout(() => setCountdownText('AURA RUSH!'), 1140);
    const timer4 = window.setTimeout(() => setScreen('game'), 1520);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [screen]);

  const startGame = () => {
    clearRoundTimers();
    setScore(500);
    setRound(0);
    setSessionRounds(pickBalancedSession());
    setIsResolving(false);
    setToast(null);
    setFriendModal(false);
    setScreen('calibrating');
  };

  const playAgain = () => {
    clearRoundTimers();
    setSessionRounds([]);
    setScreen('intro');
  };

  const passPhoneToFriend = () => {
    clearRoundTimers();
    setPlayerName('');
    setScore(500);
    setRound(0);
    setSessionRounds(pickBalancedSession());
    setIsResolving(false);
    setToast(null);
    setFriendModal(false);
    setScreen('calibrating');
  };

  const copyShareCard = () => {
    const cardRank = getAuraVerdict(score).title;
    const text = `I just scored ${score.toLocaleString()} AURA on AURA RUSH! Rank: ${cardRank}. Think you have more aura? Prove it: https://learnit-aura-rush.vercel.app/`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  // Sequence click handler
  const handleSequenceTap = (emoji, currentRoundObj) => {
    const nextSeq = [...userSequence, emoji];
    setUserSequence(nextSeq);
    const target = currentRoundObj.targetSequence;
    const isMatchSoFar = nextSeq.every((val, idx) => val === target[idx]);

    if (!isMatchSoFar) {
      resolveRound(-60, 'FUMBLED THE SEQUENCE. -60 AURA 💀');
      return;
    }
    if (nextSeq.length === target.length) {
      resolveRound(160, 'ELITE HANDSHAKE. +160 AURA');
    }
  };

  const currentRound = sessionRounds[round];
  const roundNumber = String(round + 1).padStart(2, '0');
  const totalRounds = String(sessionRounds.length || 8).padStart(2, '0');
  const playerDisplay = playerName.trim().toUpperCase() || 'PLAYER';
  const departmentDisplay = department ? DEPARTMENT_EDITIONS[department] : 'CAMPUS EDITION';

  function getAuraVerdict(auraScore) {
    if (auraScore >= 1250) {
      return { title: 'CERTIFIED MENACE', percentile: 'Top 4%', level: 'AURA LEVEL: ILLEGAL', emoji: '👑', review: 'You clearly have questionable amounts of confidence.' };
    }
    if (auraScore >= 1000) {
      return { title: 'MAIN CHARACTER', percentile: 'Top 12%', level: 'AURA LEVEL: S-TIER', emoji: '✨', review: 'The spotlight finds you even when you try to hide.' };
    }
    if (auraScore >= 800) {
      return { title: 'PLOT ARMOR ACTIVATED', percentile: 'Top 25%', level: 'AURA LEVEL: HIGH FREQUENCY', emoji: '⚡', review: 'Unexplainably surviving every campus dilemma.' };
    }
    if (auraScore >= 600) {
      return { title: 'AURA FARMER', percentile: 'Top 45%', level: 'AURA LEVEL: RESPECTABLE', emoji: '🗿', review: 'Solid presence. The canteen staff knows your order.' };
    }
    if (auraScore >= 400) {
      return { title: 'LOCKED IN', percentile: 'Top 68%', level: 'AURA LEVEL: CALIBRATING', emoji: '🔒', review: 'Honest effort. The redemption arc is loading.' };
    }
    if (auraScore >= 200) {
      return { title: 'BARELY HOLDING IT TOGETHER', percentile: 'Top 85%', level: 'AURA LEVEL: CRITICAL DEFICIT', emoji: '🫠', review: '74.1% attendance energy in human form.' };
    }
    return { title: 'NPC DETECTED 💀', percentile: 'Bottom 10%', level: 'AURA LEVEL: BANKRUPT', emoji: '💀', review: 'The syllabus was not covered. Run it back immediately.' };
  }

  const result = getAuraVerdict(score);

  return (
    <main className={`app ${screen}-mode ${screenShake ? 'shake' : ''}`}>
      <div className="grain" />
      <div className="aurora aurora-one" /><div className="aurora aurora-two" /><div className="scan-lines" />
      <Sparkles key={burstKey} />

      {/* 1. INTRO SCREEN */}
      {screen === 'intro' && <section className="intro screen-enter">
        <header className="topbar">
          <span className="lab-label">✦ CAMPUS AURA LAB / 2026</span>
          <span className="powered">POWERED BY <b>LearnIT</b></span>
        </header>
        <div className="intro-content">
          <h1>AURA <span>RUSH</span></h1>
          <p className="intro-tagline">Think you&apos;ve got aura? Prove it.</p>
          <p className="intro-stats"><strong>8 challenges.</strong> <strong>3 minutes.</strong> <strong>1 aura score.</strong></p>
          <div className="profile-form">
            <label>
              <span>YOUR NAME</span>
              <input value={playerName} onChange={(event) => setPlayerName(event.target.value)} maxLength="16" placeholder="e.g. SOHAM" autoComplete="name" />
            </label>
            <label>
              <span>YOUR CAMPUS CLASS</span>
              <select value={department} onChange={(event) => setDepartment(event.target.value)}>
                <option value="">PICK ONE (OPTIONAL)</option>
                {CAMPUS_CLASSES.map((campusClass) => <option key={campusClass} value={campusClass}>{campusClass}</option>)}
              </select>
            </label>
          </div>
          <div className="player-card">
            <span className="player-avatar">{playerName.trim().charAt(0).toUpperCase() || '✦'}</span>
            <span>{playerName.trim() ? playerDisplay : 'YOUR PLAYER CARD'}</span>
            <span className="live-dot" />
            <small>{department ? `CAMPUS AURA: ${departmentDisplay}` : 'READY TO RUSH'}</small>
          </div>
          <button className="primary-button magnetic" onClick={startGame}>START THE CHAOS <span>→</span></button>
          <p className="microcopy">38 UNIQUE CHALLENGES · ~3 MINUTES · SOLO AURA CHALLENGE</p>
        </div>
        <footer className="intro-footer">
          <span>◉ LIVE FROM CAMPUS</span>
          <span>V.02 / AURA ENGINE</span>
        </footer>
      </section>}

      {/* 2. RAPID CALIBRATION SCREEN */}
      {screen === 'calibrating' && <section className="calibrating-screen screen-enter" aria-live="polite">
        <p className="calibrating-label">AURA CALIBRATING...</p>
        <p className="calibrating-count" key={countdownText}>{countdownText}</p>
      </section>}

      {/* 3. GAMEPLAY SCREEN */}
      {screen === 'game' && currentRound && <section className="game-screen screen-enter">
        <header className="game-header">
          <div className="header-left">
            <span className="game-brand">✦ <b>AURA RUSH</b></span>
            <span className="challenge-step">CHALLENGE {roundNumber} / {totalRounds}</span>
          </div>
          {/* Prominent, constant Aura Score Banner */}
          <div className="header-score-banner">
            <span className="score-title">AURA</span>
            <span className="score-val"><b>✦</b>{score.toLocaleString()}</span>
          </div>
        </header>

        {/* Challenge Progress Row Indicators */}
        <div className="challenge-dots-rail" aria-label={`Challenge ${round + 1} of ${sessionRounds.length}`}>
          {sessionRounds.map((_, index) => (
            <span
              key={index}
              className={`dot ${index < round ? 'done' : index === round ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="game-area">
          <div className="round-content" key={round}>
            <p className="eyebrow">{currentRound.eyebrow}</p>
            <h2>{currentRound.title}</h2>
            <p className="round-copy">{currentRound.copy}</p>

            {/* MECHANIC 1: Silent Zone */}
            {currentRound.kind === 'dontPress' && (
              <button className="silent-zone" onClick={() => resolveRound(-120, 'YOU BROKE THE SILENCE. -120 AURA 💀')}>
                <span>🧘</span>
                <b>DON&apos;T TAP.</b>
                <small>Hold still until the timer reaches zero.</small>
              </button>
            )}

            {/* MECHANIC 2: Reflex Eye Blink */}
            {currentRound.kind === 'blink' && (
              <button
                className={`eye-stage ${isBlinking ? 'blinked' : ''}`}
                aria-label="Tap when the eye blinks"
                onClick={() => resolveRound(isBlinking ? 140 : -60, isBlinking ? 'CLEAN REFLEX. +140 AURA' : 'EARLY TAP. -60 AURA 💀')}
              >
                <span className="eye-lid" />
                <span className="eye-ball"><i /></span>
                <em>{isBlinking ? 'TAP NOW!' : 'WAIT FOR IT...'}</em>
              </button>
            )}

            {/* MECHANIC 3: Timing Bar Gauge */}
            {currentRound.kind === 'timing' && (
              <div className="timing-panel">
                <div className="timing-track">
                  <i className="target-zone" />
                  <i className="needle" style={{ left: `${needle}%` }} />
                </div>
                <div className="timing-scale">
                  <span>FUMBLE</span>
                  <span>MAX AURA</span>
                  <span>FUMBLE</span>
                </div>
                <button
                  className="primary-button stop-button"
                  onClick={() => {
                    const distance = Math.abs(needle - 50);
                    resolveRound(
                      distance < 9 ? 220 : distance < 20 ? 90 : -70,
                      distance < 9 ? 'ABSOLUTE CINEMA. +220 AURA' : distance < 20 ? 'RESPECTABLE. +90 AURA' : 'AURA FUMBLED. -70 AURA 💀'
                    );
                  }}
                >
                  CLUTCH THE NEEDLE <span>⚡</span>
                </button>
              </div>
            )}

            {/* MECHANIC 4: Alarm Speedrun Picker */}
            {currentRound.kind === 'alarm' && (
              <div className="alarm-grid">
                {currentRound.alarms.map((alarm) => (
                  <button
                    key={alarm.time}
                    className="alarm-card"
                    onClick={() => {
                      if (alarm.correct) {
                        resolveRound(150, '8 AM CLASS SECURED. +150 AURA');
                      } else {
                        resolveRound(-60, `WRONG ALARM (${alarm.label}). -60 AURA 💀`);
                      }
                    }}
                  >
                    <span className="alarm-bell">⏰</span>
                    <strong>{alarm.time}</strong>
                    <small>{alarm.label}</small>
                  </button>
                ))}
              </div>
            )}

            {/* MECHANIC 5: Memory Locker (Missing Item) */}
            {currentRound.kind === 'memoryLock' && (
              <div className="memory-lock-panel">
                {memState === 'showing' ? (
                  <div className="memory-items-show">
                    <p className="mem-instruction">MEMORISE THESE ITEMS...</p>
                    <div className="mem-icons">
                      {currentRound.items.map((it) => (
                        <span key={it} className="mem-icon">{it}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="memory-items-guess">
                    <p className="mem-instruction">WHICH ITEM WAS STOLEN?</p>
                    <div className="memory-cards-grid">
                      {currentRound.answers.map(([emoji, label, isCorrect]) => (
                        <button
                          key={label}
                          className="mem-guess-btn"
                          onClick={() => resolveRound(isCorrect ? 160 : -60, isCorrect ? 'BRAIN ONLINE. +160 AURA' : 'AIRPLANE MODE. -60 AURA 💀')}
                        >
                          <span>{emoji}</span>
                          <strong>{label}</strong>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MECHANIC 6: Sequence Breaker */}
            {currentRound.kind === 'sequence' && (
              <div className="sequence-panel">
                <div className="sequence-target-bar">
                  <span>TARGET:</span>
                  <strong>{currentRound.targetSequence.join(' ')}</strong>
                </div>
                <div className="sequence-user-progress">
                  <span>YOURS:</span>
                  <b>{userSequence.length ? userSequence.join(' ') : 'TAP ICONS BELOW...'}</b>
                </div>
                <div className="sequence-choices">
                  {currentRound.choices.map((emoji) => (
                    <button
                      key={emoji}
                      className="sequence-btn"
                      onClick={() => handleSequenceTap(emoji, currentRound)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Standard Choice Grid Options */}
            {currentRound.options && (
              <div className={`aura-challenge-options ${currentRound.layout || ''}`}>
                {currentRound.options.map(([icon, label, points, feedback]) => (
                  <button key={label} onClick={() => resolveRound(points, `${feedback} ${points >= 0 ? '+' : ''}${points} AURA`)}>
                    <span>{icon}</span>
                    <strong>{label}</strong>
                    <i>→</i>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className="game-footer">
          <span className="round-badge">CHALLENGE {roundNumber} / {totalRounds}</span>
          <div className="timer-badge">
            <span className="timer-icon">⏳</span>
            <b>{seconds.toFixed(1)}s</b>
          </div>
        </footer>
      </section>}

      {/* 4. RESULT SCREEN (SCREENSHOT-READY AURA CARD) */}
      {screen === 'results' && <section className="results-screen screen-enter">
        <div className="result-rings" />
        <div className="results-content">
          <p className="eyebrow">{department ? `CAMPUS AURA: ${departmentDisplay}` : 'RUN COMPLETE'}</p>

          {/* SCREENSHOT-READY AURA CARD */}
          <div className="aura-card-box" id="aura-card">
            <div className="aura-card-holo" />
            <div className="aura-card-inner">
              <span className="card-pretitle">YOU ARE</span>
              <h2 className="card-title">{result.title}</h2>
              <div className="card-score-row">
                <span className="card-score-big"><b>✦</b>{score.toLocaleString()} <small>AURA</small></span>
                <span className="card-percentile-pill">{result.percentile}</span>
              </div>
              <div className="card-level-badge">{result.level}</div>
              <p className="card-review"><em>&ldquo;{result.review}&rdquo;</em></p>
              <div className="card-foot">
                <span>CAMPUS AURA LAB · 2026</span>
                <span>{playerDisplay}</span>
              </div>
            </div>
          </div>

          {/* LearnIT Organic Humor Transition */}
          <div className="learnit-pitch-block">
            <p className="pitch-hook">YOUR AURA IS QUESTIONABLE.<br /><span>Fortunately, your ideas don&apos;t have to be.</span></p>
            <p className="pitch-copy">
              <b>LearnIT</b> is where students turn weird ideas into actual things — building apps, crazy projects, competing in hackathons, and meeting cool people.
            </p>
            <a className="primary-button join-button" href={MEMBERSHIP_URL} target="_blank" rel="noreferrer">
              JOIN LEARNIT <span>→</span>
            </a>
            <p className="results-subcta">More fun experiences. More events. More cool peeps.</p>
            <a className="secondary-button" href={MEMBERSHIP_URL} target="_blank" rel="noreferrer">
              BECOME A MEMBER
            </a>
          </div>

          {/* Stall Replay & Friend Challenge Loop */}
          <div className="stall-loop-buttons">
            <button className="play-again-btn" onClick={playAgain}>
              ↻ &nbsp; PLAY AGAIN
            </button>
            <button className="challenge-friend-btn" onClick={() => setFriendModal(true)}>
              ⚡ &nbsp; CHALLENGE A FRIEND →
            </button>
            <button className="share-card-btn" onClick={copyShareCard}>
              {copied ? '✓ COPIED SCORE TO CLIPBOARD!' : '📸 SHARE AURA SCORE'}
            </button>
          </div>
        </div>
      </section>}

      {/* FRIEND HAND-OFF MODAL FOR STALL */}
      {friendModal && (
        <div className="modal-backdrop" onClick={() => setFriendModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <span className="modal-emoji">🤝</span>
            <h3>HAND PHONE TO YOUR FRIEND</h3>
            <p>Your score: <strong>{score.toLocaleString()} AURA</strong> ({result.title})</p>
            <p className="modal-sub">Let&apos;s see if they have more aura than you or if they get cooked immediately.</p>
            <button className="primary-button" onClick={passPhoneToFriend}>
              🔥 PASS PHONE &amp; START <span>→</span>
            </button>
            <button className="close-modal-btn" onClick={() => setFriendModal(false)}>CANCEL</button>
          </div>
        </div>
      )}

      {/* DYNAMIC TOAST NOTIFICATION */}
      {toast && (
        <div className={`toast ${toast.points >= 0 ? 'good' : 'bad'}`} key={toast.id}>
          <strong>{toast.heading}</strong>
          <span>{toast.points >= 0 ? '+' : ''}{toast.points} AURA</span>
        </div>
      )}
    </main>
  );
}

