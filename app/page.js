'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MEMBERSHIP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScdpk6YjFtwWux8XXBr7tJRYrIlJSdsTNbfT3mahZShdCxHQ/viewform';

const ROUND_DURATION = 10;
const CHALLENGES_MIN = 8;
const CHALLENGES_MAX = 10;
const ROUND_TRANSITION_MS = 1800;

const CAMPUS_CLASSES = ['CSE', 'Design', 'Management', 'Other'];

const DEPARTMENT_EDITIONS = {
  CSE: 'CSE EDITION',
  Design: 'DESIGN EDITION',
  Management: 'MANAGEMENT EDITION',
  Other: 'CAMPUS EDITION',
};

function shuffleRounds(rounds) {
  const pool = [...rounds];
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }
  return pool;
}

const legacyRounds = [
  { type: 'blink', eyebrow: 'REFLEX TEST', title: <>DON&apos;T<br />BLINK.</>, copy: 'Tap the moment the eye closes. No flinching.' },
  { type: 'reaction', eyebrow: 'NPC CHECK', title: <>YOUR PROFESSOR SAYS<br />“SURPRISE TEST.”</>, copy: 'Pick the only socially acceptable reaction.', options: [['🗿', 'UNBOTHERED', -35, 'NPC BEHAVIOUR.'], ['💀', 'COOKED', 75, 'VALID REACTION.'], ['😭', 'CRYING', -35, 'TOO EMOTIONAL.']] },
  { type: 'timing', eyebrow: 'AURA TIMING', title: <>STOP THE BAR<br />AT MAX AURA.</>, copy: 'Do not fumble the cinematic moment.' },
  { type: 'memory', eyebrow: 'BRAINROT SPEEDRUN', title: <>FIND THE<br />FROG.</>, copy: 'Lock in. The items vanish in a second.', items: ['🍕', '🐸', '🛵'], answers: [['🍕', 'PIZZA', false], ['🐸', 'FROG', true], ['🛵', 'SCOOTER', false]] },
  { type: 'reaction', eyebrow: 'CAMPUS CRISIS', title: <>THE GROUP CHAT SAYS<br />“WHO&apos;S DOING THE PPT?”</>, copy: 'It is 11:54 PM. The deadline is midnight.', options: [['🧑‍🍳', 'I GOT THIS', 75, 'CLUTCH PLAYER.'], ['💀', 'SEEN-ZONED', -35, 'AURA ABANDONED.'], ['🫥', 'OFFLINE', -35, 'GHOST MODE.']] },
  { type: 'choice', eyebrow: 'POV CHECK', title: <>ATTENDANCE IS 74%.<br />CLASS STARTS NOW.</>, copy: 'Choose your next move wisely.', options: [['A', 'RUN TO CLASS', 90, 'LOCKED IN.'], ['B', 'ASK FOR PROXY', 40, 'RISKY BUSINESS.'], ['C', 'ACCEPT FATE', -60, 'PLOT ARMOR EXPIRED.']] },
  { type: 'timing', eyebrow: 'DEADLINE DODGE', title: <>CLUTCH THE<br />SUBMISSION.</>, copy: 'Stop inside the green zone before time runs out.' },
  { type: 'memory', eyebrow: 'BRAINROT SPEEDRUN', title: <>RECALL THE<br />MIDDLE.</>, copy: 'Don&apos;t blink. Memorise the order.', items: ['🧋', '🥐', '🛹'], answers: [['🧋', 'BOBA', false], ['🥐', 'CROISSANT', true], ['🛹', 'SKATEBOARD', false]] },
  { type: 'reaction', eyebrow: 'WIFI INCIDENT', title: <>THE WIFI DIES<br />DURING SUBMISSION.</>, copy: 'Your laptop is still spinning.', options: [['😌', 'PEACEFUL', -35, 'TOO CALM.'], ['🫠', 'MELTING', 75, 'THE ONLY CORRECT ANSWER.'], ['🧘', 'MEDITATING', -35, 'NOT THE TIME.']] },
  { type: 'choice', eyebrow: 'TRUST ISSUES', title: <>YOUR FRIEND SAYS<br />“I&apos;M 5 MINUTES AWAY.”</>, copy: 'You know what this means.', options: [['A', 'BELIEVE THEM', -60, 'NAIVE ARC.'], ['B', 'LEAVE NOW', 90, 'EXPERIENCE SPEAKS.'], ['C', 'START A NEW LIFE', 40, 'DRAMATIC, BUT FAIR.']] },
  { type: 'blink', eyebrow: 'REFLEX REMATCH', title: <>DON&apos;T TAP<br />TOO EARLY.</>, copy: 'Your reflexes have been talking. Prove them.' },
  { type: 'memory', eyebrow: 'MEMORY MAYHEM', title: <>WHO WAS IN<br />THE MIDDLE?</>, copy: 'This one is for the locked-in legends.', items: ['🪩', '🦆', '🎧'], answers: [['🪩', 'DISCO BALL', false], ['🦆', 'DUCK', true], ['🎧', 'HEADPHONES', false]] },
  { type: 'reaction', eyebrow: 'LECTURE LORE', title: <>THE PROFESSOR ASKS:<br />“ANY QUESTIONS?”</>, copy: 'The room goes suspiciously quiet.', options: [['🙋', 'ASK AWAY', 40, 'BRAVE MOVE.'], ['🫥', 'BECOME INVISIBLE', 75, 'SOCIAL SURVIVAL.'], ['📢', 'START YAPPING', -35, 'TOO MUCH AURA.']] },
  { type: 'choice', eyebrow: 'FREE PERIOD', title: <>YOU GET A<br />SURPRISE FREE HOUR.</>, copy: 'What does your aura choose?', options: [['A', 'LOCK IN', 40, 'GRINDSET DETECTED.'], ['B', 'CANTEEN RUN', 90, 'ELITE DECISION.'], ['C', 'GO HOME', -35, 'THE DAY JUST STARTED.']] },
  { type: 'timing', eyebrow: 'FINAL CLUTCH', title: <>ONE LAST<br />AURA CHECK.</>, copy: 'This is the moment they record on their phones.' },
  { type: 'memory', eyebrow: 'FINAL BRAINROT', title: <>FINAL MEMORY<br />LOCK.</>, copy: 'Last question. Do not throw the run.', items: ['🌮', '🦖', '🛼'], answers: [['🌮', 'TACO', false], ['🦖', 'DINOSAUR', true], ['🛼', 'ROLLER SKATE', false]] },
  { type: 'reaction', eyebrow: 'SNOOZE SYNDROME', title: <>YOUR ALARM RINGS<br />FOR THE THIRD TIME.</>, copy: 'Your first lecture is in seven minutes.', options: [['🛌', 'ONE MORE MINUTE', -35, 'SNOOZE AURA.'], ['⚡', 'UP AND RUNNING', 75, 'EARLY BIRD ENERGY.'], ['📱', 'SCROLL FIRST', -35, 'DOOMSCROLL DETECTED.']] },
  { type: 'choice', eyebrow: 'CANTEEN MATH', title: <>THE CANTEEN QUEUE<br />IS 20 PEOPLE DEEP.</>, copy: 'Hunger versus common sense.', options: [['A', 'JOIN THE QUEUE', 40, 'PATIENCE BUILDS AURA.'], ['B', 'FIND A SECRET SPOT', 90, 'CAMPUS VETERAN.'], ['C', 'SKIP LUNCH', -60, 'NOT THE MOVE.']] },
  { type: 'timing', eyebrow: 'PRESENTATION MODE', title: <>HIT THE<br />PERFECT SLIDE.</>, copy: 'Land the cursor in the green zone for smooth delivery.' },
  { type: 'memory', eyebrow: 'DESK CHECK', title: <>WHO HELD THE<br />NOTEBOOK?</>, copy: 'A quick desk scan. What stayed in the middle?', items: ['🧃', '📓', '🖊️'], answers: [['🧃', 'JUICE', false], ['📓', 'NOTEBOOK', true], ['🖊️', 'PEN', false]] },
  { type: 'reaction', eyebrow: 'SENIOR SIGNAL', title: <>A SENIOR TEXTS:<br />“GOT A MINUTE?”</>, copy: 'This could be mentorship. This could be a committee task.', options: [['🤝', 'YES, WHAT’S UP?', 75, 'NETWORKING AURA.'], ['🫣', 'HIDE IMMEDIATELY', -35, 'MISSED OPPORTUNITY.'], ['🧾', 'SEND A MEME', 40, 'CHAOTIC, BUT BOLD.']] },
  { type: 'choice', eyebrow: 'GROUP PROJECT', title: <>YOU GET ASSIGNED<br />WITH STRANGERS.</>, copy: 'The project is worth 40 percent.', options: [['A', 'MAKE A PLAN', 90, 'LEADER ARC.'], ['B', 'WAIT FOR UPDATES', -35, 'NPC MODE.'], ['C', 'MAKE THE SLIDES PRETTY', 40, 'DESIGN CARRY.']] },
  { type: 'timing', eyebrow: 'PITCH PERFECT', title: <>DROP THE<br />MICROPHONE.</>, copy: 'Find the sweet spot and own the room.' },
  { type: 'memory', eyebrow: 'LAB RECALL', title: <>WHICH TOOL WAS<br />BETWEEN THEM?</>, copy: 'The lab table flashed for a second.', items: ['🔧', '🧪', '🔬'], answers: [['🔧', 'WRENCH', false], ['🧪', 'BEAKER', true], ['🔬', 'MICROSCOPE', false]] },
  { type: 'blink', eyebrow: 'FOCUS CHECK', title: <>WAIT FOR<br />THE SIGNAL.</>, copy: 'Hold your nerve. Precision beats panic.' },
  { type: 'reaction', eyebrow: 'OPEN MIC PANIC', title: <>THE HOST CALLS<br />YOUR NAME ON STAGE.</>, copy: 'The spotlight is already moving.', options: [['🎤', 'WALK UP SMOOTHLY', 90, 'MAIN CHARACTER.'], ['🏃', 'FIND THE EXIT', -60, 'AURA EVACUATED.'], ['🧍', 'FREEZE IN PLACE', -35, 'BUFFERING.']] },
  { type: 'choice', eyebrow: 'HACKATHON HOUR', title: <>A HACKATHON STARTS<br />TONIGHT AT 10.</>, copy: 'Your team needs one more person.', options: [['A', 'JOIN THE BUILD', 90, 'BUILDER ENERGY.'], ['B', 'ASK FOR DETAILS', 40, 'CAUTIOUS BUT CURIOUS.'], ['C', 'SAY “NEXT TIME”', -35, 'FOMO LOADING.']] },
  { type: 'timing', eyebrow: 'BUS STOP SPRINT', title: <>CATCH THE<br />CAMPUS BUS.</>, copy: 'One clean tap before it pulls away.' },
  { type: 'memory', eyebrow: 'LIBRARY LOOP', title: <>SPOT THE<br />MIDDLE ITEM.</>, copy: 'The silent zone has a surprise test.', items: ['📚', '🪴', '💡'], answers: [['📚', 'BOOKS', false], ['🪴', 'PLANT', true], ['💡', 'LAMP', false]] },
  { type: 'reaction', eyebrow: 'NOTES DROP', title: <>YOUR FRIEND SENDS<br />A TWO-PAGE PDF.</>, copy: 'The exam is tomorrow morning.', options: [['🫡', 'START READING', 75, 'LOCKED IN.'], ['🪄', 'PRAY FOR MAGIC', -35, 'SPELL NOT FOUND.'], ['🍿', 'WATCH RECAPS', 40, 'CONTENT CONSUMER.']] },
  { type: 'choice', eyebrow: 'CAMPUS QUEST', title: <>YOU SPOT A POSTER<br />FOR A NEW EVENT.</>, copy: 'It says “open to everyone.”', options: [['A', 'SIGN UP NOW', 90, 'EXPLORER AURA.'], ['B', 'SAVE IT FOR LATER', 40, 'MAYBE ARC.'], ['C', 'WALK PAST', -35, 'SIDE QUEST MISSED.']] },
  { type: 'timing', eyebrow: 'FINAL MINUTE', title: <>SEND THE<br />IMPORTANT TEXT.</>, copy: 'Do not send it too early. Do not send it too late.' },
  { type: 'memory', eyebrow: 'BAG CHECK', title: <>WHAT WAS<br />IN THE CENTRE?</>, copy: 'Your bag has seen things. Remember this one.', items: ['🧢', '💻', '🧦'], answers: [['🧢', 'CAP', false], ['💻', 'LAPTOP', true], ['🧦', 'SOCKS', false]] },
  { type: 'reaction', eyebrow: 'CLASS CANCELLED', title: <>THE LECTURE IS<br />CANCELLED AT 8 AM.</>, copy: 'You are already on campus.', options: [['☕', 'GET COFFEE', 90, 'MAKE THE MOST OF IT.'], ['😤', 'RAGE QUIETLY', 40, 'UNDERSTANDABLE.'], ['🛏️', 'GO BACK TO BED', -35, 'COMMUTE FUMBLED.']] },
  { type: 'choice', eyebrow: 'FUTURE CHECK', title: <>SOMEONE ASKS<br />“WHAT’S THE PLAN AFTER COLLEGE?”</>, copy: 'The conversation just got real.', options: [['A', 'PITCH YOUR BIG IDEA', 90, 'VISIONARY.'], ['B', 'SAY “WE’LL SEE”', 40, 'HONEST ENERGY.'], ['C', 'CHANGE THE TOPIC', -35, 'ESCAPE ARTIST.']] },
  { type: 'blink', eyebrow: 'LAST REFLEX', title: <>DON&apos;T LOSE<br />FOCUS NOW.</>, copy: 'One final eye test before the big verdict.' },
  { type: 'reaction', eyebrow: 'LEARNIT INVITE', title: <>A FRIEND SAYS:<br />“COME TO THE LEARNIT EVENT.”</>, copy: 'There will be games, people and mildly questionable ideas.', options: [['✨', 'SAY YES', 90, 'CORRECT ANSWER.'], ['🤔', 'ASK FOR THE VIBE', 40, 'FAIR QUESTION.'], ['🚪', 'VANISH', -35, 'WE’LL MISS YOU.']] },
];

const gameRounds = [
  { kind: 'entrance', eyebrow: 'AURA MAXXING', title: <>MAKE YOUR<br />ENTRANCE.</>, copy: 'You are 20 minutes late. How do you enter class?', layout: 'swipe', options: [['😎', 'WALK IN LIKE NOTHING HAPPENED', 250, 'MAIN CHARACTER ENERGY.'], ['🤫', 'SLIP INTO THE BACK', 80, 'STEALTH AURA.'], ['🙇', 'APOLOGISE TO EVERYONE', -35, 'TOO POLITE.'], ['🚦', 'BLAME THE TRAFFIC', 20, 'CLASSIC EXCUSE.']] },
  { kind: 'auraPick', eyebrow: 'AURA OR NPC?', title: <>PICK THE MOST<br />AURA ACTION.</>, copy: 'The answer is intentionally ridiculous.', layout: 'icon-grid', options: [['🕶️', 'SUNGLASSES INDOORS', 150, 'UNEXPLAINABLY CINEMATIC.'], ['🔋', 'CHARGING AT 1%', 30, 'LIVING DANGEROUSLY.'], ['💻', 'LAPTOP EVERYWHERE', 60, 'BUILDER BEHAVIOUR.'], ['😵', '“GUYS, WE HAVE A TEST?”', -90, 'NPC DETECTED.']] },
  { kind: 'bankruptcy', eyebrow: 'AURA BANKRUPTCY', title: <>YOUR CRUSH<br />WALKS PAST.</>, copy: 'This choice will be remembered.', layout: 'danger', options: [['👀', 'MAKE EYE CONTACT', 120, 'CONFIDENCE.'], ['📱', 'CHECK YOUR PHONE', 40, 'SAFE PLAY.'], ['🫠', 'TRIP FOR NO REASON', -200, 'AURA DESTROYED.'], ['🧱', 'WALK INTO A WALL', -250, 'COOKED BEYOND REPAIR.']] },
  { kind: 'response', eyebrow: 'THE PERFECT RESPONSE', title: <>“BRO, YOU<br />STUDIED?”</>, copy: 'Reply with the most aura.', layout: 'bubbles', options: [['“YEAH.”', 'SHORT AND SCARY', 120, 'MYSTERIOUS.'], ['“A LITTLE.”', 'HONEST', 45, 'RESPECTABLE.'], ['“WHAT’S STUDYING?”', 'COMEDY', 75, 'CHAOS AURA.'], ['“WE LISTEN AND DON’T JUDGE.”', 'DEFLECTION', 150, 'ABSOLUTE CINEMA.']] },
  { kind: 'touchGrass', eyebrow: 'TOUCH GRASS', title: <>HOW ONLINE<br />WERE YOU TODAY?</>, copy: 'Honesty is a form of aura.', layout: 'range', options: [['1–2 HRS', 'OUTSIDE', 120, 'TOUCHING GRASS.'], ['3–5 HRS', 'BALANCED', 90, 'STABLE AURA.'], ['6–8 HRS', 'CHRONICALLY ONLINE', 30, 'YOU KNOW THE VIBES.'], ['DON’T ASK', 'SELF AWARE', 100, 'SELF-AWARENESS W.']] },
  { kind: 'silent', eyebrow: 'SILENT AURA', title: <>DO NOTHING<br />FOR 5 SECONDS.</>, copy: 'Tap anywhere and your aura drops. Discipline is the challenge.' },
  { kind: 'slang', eyebrow: 'SLANG SCAN', title: <>“IT’S GIVING…”<br />MEANS?</>, copy: 'Choose the closest vibe, not a dictionary definition.', layout: 'definition', options: [['A CERTAIN VIBE', 'CORRECT', 120, 'SPEAKS INTERNET.'], ['SOMETHING BROKE', 'NOPE', -45, 'TECH SUPPORT ARC.'], ['IT’S FINISHED', 'NOPE', -45, 'NOT QUITE.'], ['IT’S EXPENSIVE', 'NOPE', -45, 'MONEY MENTIONED.']] },
  { kind: 'fillBlank', eyebrow: 'COMPLETE THE LINE', title: <>“BRO IS<br />_____.”</>, copy: 'The chat has seen the situation.', layout: 'chips', options: [['COOKED', 'THE CLASSIC', 120, 'LINGUISTIC AURA.'], ['THE SYLLABUS', 'GRAMMATICALLY ILLEGAL', -40, 'SENTENCE FUMBLED.'], ['A LECTURE', 'UNHINGED', 35, 'STRANGE BUT BOLD.'], ['ON VACATION', 'OPTIMISTIC', 10, 'NOT THE VIBE.']] },
  { kind: 'translate', eyebrow: 'GROUP CHAT TRANSLATOR', title: <>“NAH TS IS<br />COOKED NGL 💀”</>, copy: 'What is the overall vibe?', layout: 'chat', options: [['EVERYTHING IS PERFECT', 'DELUSION', -50, 'READ IT AGAIN.'], ['THIS IS TERRIBLE', 'TRANSLATION', 120, 'FLUENT.'], ['SOMEONE IS HUNGRY', 'RANDOM', -20, 'WHERE DID FOOD COME FROM?'], ['WE ARE LEAVING', 'POSSIBLE', 30, 'MAYBE.']] },
  { kind: 'winloss', eyebrow: 'W OR L?', title: <>SUBMITTED AT 11:59.<br />DEADLINE: 12:00.</>, copy: 'Make the call.', layout: 'binary', options: [['W', 'CLUTCH', 130, 'THE ROOM SAYS W.'], ['L', 'FUMBLE', -50, 'THE ROOM DISAGREES.']] },
  { kind: 'cap', eyebrow: 'CAP DETECTOR', title: <>YOUR FRIEND SAYS<br />“BRO I STUDIED.”</>, copy: 'Cap or no cap?', layout: 'stamps', options: [['NO CAP', 'BELIEVE', 40, 'WHOLESOME.'], ['CAP', 'CALL IT', 120, 'LIE DETECTED.']] },
  { kind: 'npcDialogue', eyebrow: 'NPC DIALOGUE', title: <>PROFESSOR: “ANY<br />VOLUNTEERS?”</>, copy: 'Choose the classic response.', layout: 'dialogue', options: [['LOOK DOWN IMMEDIATELY', 'NPC RESPONSE', 120, 'NPC LEVEL MAXIMUM.'], ['RAISE YOUR HAND', 'BRAVE', 70, 'PROTAGONIST MOVE.'], ['LEAVE THE ROOM', 'ESCAPE', -50, 'SIDE QUEST ABANDONED.'], ['START A MONOLOGUE', 'RISKY', 20, 'TOO MUCH LORE.']] },
  { kind: 'attendance', eyebrow: 'ATTENDANCE SIMULATOR', title: <>ATTENDANCE:<br />74.2%</>, copy: 'One lecture tomorrow. What is the play?', layout: 'meter-choice', options: [['GO TO CLASS', 'SAFE', 130, 'LOCKED IN.'], ['EMAIL PROFESSOR', 'BOLD', 45, 'DIPLOMACY.'], ['PRAY', 'SPIRITUAL', 20, 'HIGHER POWERS.'], ['ASK FOR PROXY', 'CHAOS', 70, 'RISK TAKEN.']] },
  { kind: 'canteen', eyebrow: 'CANTEEN FINAL BOSS', title: <>YOU HAVE ₹80.<br />BUILD LUNCH.</>, copy: 'Maximise happiness, value and quantity.', layout: 'budget', options: [['🥟 + 🥤', 'SAMOSA + COLD DRINK / ₹50', 120, 'BALANCED MEAL.'], ['🌯', 'BIG ROLL / ₹60', 90, 'SINGLE-ITEM SPECIALIST.'], ['🍟 + 🥟', 'FRIES + SAMOSA / ₹70', 150, 'CANTEEN IQ.'], ['💧', 'JUST WATER / ₹0', -60, 'GRINDSET GONE WRONG.']] },
  { kind: 'project', eyebrow: 'GROUP PROJECT', title: <>WHO ARE YOU<br />IN THE TEAM?</>, copy: 'The presentation is tomorrow.', layout: 'identity', options: [['🧭', 'THE LEADER', 120, 'COMMANDER AURA.'], ['👻', 'THE GHOST', -80, 'UNREACHABLE.'], ['⏰', '“I’LL DO IT LATER”', -40, 'TIMER RUNNING.'], ['🖥️', 'DOING EVERYTHING', 150, 'THE REAL MVP.']] },
  { kind: 'morning', eyebrow: '8 AM LECTURE', title: <>7:42 AM.<br />CLASS AT 8.</>, copy: 'Twelve minutes away. Pick one move.', layout: 'route', options: [['🏃', 'RUN WITHOUT BREAKFAST', 130, 'LOCKED IN.'], ['🚿', 'SHOWER FIRST', -50, 'TIME BLIND.'], ['😴', 'GO BACK TO SLEEP', -100, 'SNOOZE AURA.'], ['📱', 'ASK IF ATTENDANCE HAI', 50, 'INFORMATION FIRST.']] },
  { kind: 'exam', eyebrow: 'EXAM HALL DISASTER', title: <>YOU STUDIED CHAPTER 1.<br />EXAM IS CHAPTER 4.</>, copy: 'Activate the survival instinct.', layout: 'exam', options: [['🧮', 'CALCULATE PASS MARKS', 90, 'REALISTIC.'], ['🔮', 'ACTIVATE DELUSION', 120, 'ACADEMIC MAGIC.'], ['😶', 'ACCEPT FATE', 20, 'ZEN MODE.'], ['📖', 'READ FROM THE BACK', 50, 'TACTICAL.']] },
  { kind: 'charger', eyebrow: 'CHARGER DIPLOMACY', title: <>“BRO, CAN I USE<br />YOUR CHARGER?”</>, copy: 'Your battery is 41 percent.', layout: 'negotiation', options: [['YES, TAKE IT', 'GENEROUS', 120, 'SOCIAL AURA.'], ['2 MINUTES ONLY', 'FAIR', 70, 'BOUNDARIES.'], ['“I’M ON 70%”', 'LIE', -30, 'SUS RESPONSE.'], ['PRETEND NOT TO HEAR', 'GHOST', -60, 'BAD ROOMMATE ARC.']] },
  { kind: 'library', eyebrow: 'LIBRARY NPC', title: <>THE PERSON BESIDE YOU<br />OPENS CHIPS.</>, copy: 'The silence just shattered.', layout: 'noise', options: [['IGNORE IT', 'PEACE', 80, 'MONK MODE.'], ['MOVE SEATS', 'TACTICAL', 100, 'FOCUS PROTECTED.'], ['STARE AGGRESSIVELY', 'DRAMA', 30, 'AURA CONFRONTATION.'], ['EAT LOUDER', 'ESCALATE', 120, 'CHAOS WINS.']] },
  { kind: 'lastBench', eyebrow: 'LAST BENCH LORE', title: <>“WHO WAS TALKING?”<br />SAYS THE PROFESSOR.</>, copy: 'Your row must choose a fate.', layout: 'spotlight', options: [['GO SILENT', 'INVISIBLE', 100, 'STEALTH MODE.'], ['SACRIFICE A FRIEND', 'BOLD', 40, 'TRUST BROKEN.'], ['LOOK AT EACH OTHER', 'CLASSIC', 120, 'LAST BENCH AURA.'], ['CONFESS', 'HONEST', 70, 'CHARACTER DEVELOPMENT.']] },
  { kind: 'whoWould', eyebrow: 'THE ROOM DECIDES', title: <>WHO WOULD SURVIVE<br />A ZOMBIE APOCALYPSE?</>, copy: 'Cast the decisive campus vote.', layout: 'vote', options: [['RIYA', 'STRATEGIST', 90, 'RIYA GETS PLOT ARMOR.'], ['DEV', 'RESOURCEFUL', 90, 'DEV KNOWS A GUY.'], ['ANANYA', 'CHAOS GENIUS', 90, 'ANANYA WINS SOMEHOW.'], ['YOU', 'SELF BELIEF', 130, 'PROTAGONIST VOTED.']] },
  { kind: 'roast', eyebrow: 'ROAST OR RESPECT', title: <>RIYA HAS 7 TABS<br />OPEN DURING CLASS.</>, copy: 'Choose her fate. Keep it harmless.', layout: 'split', options: [['🔥', 'RESPECT', 120, 'MAIN CHARACTER BEHAVIOUR.'], ['💀', 'ROAST', 80, 'AURA UNDER INVESTIGATION.']] },
  { kind: 'curse', eyebrow: 'PICK YOUR CURSE', title: <>CHOOSE ONE<br />CAMPUS CURSE.</>, copy: 'There is no winning option.', layout: 'curse-cards', options: [['📚', '10 AM CLASS EVERY DAY', 80, 'SCHEDULE SURVIVOR.'], ['🍜', 'CANTEEN FOOD FOREVER', 120, 'BRAVE STOMACH.'], ['📶', 'ONE-BAR WIFI ONLY', -70, 'BUFFERING FOREVER.']] },
  { kind: 'rather', eyebrow: 'WOULD YOU RATHER', title: <>8 AM CLASS<br />OR SURPRISE VIVA?</>, copy: 'The room is waiting for your answer.', layout: 'versus', options: [['8 AM CLASS', 'EARLY PAIN', 90, 'THE ROOM HAS DECIDED.'], ['SURPRISE VIVA', 'SUDDEN PAIN', 120, 'BRAVE CHOICE.']] },
  { kind: 'build', eyebrow: 'LEARNIT LAB', title: <>BUILD SOMETHING<br />QUESTIONABLE.</>, copy: 'You have sixty seconds and one random idea.', layout: 'build-cards', options: [['🐱', 'DATING APP FOR CATS', 150, 'WELCOME TO LEARNIT.'], ['🍕', 'CANTEEN QUEUE PREDICTOR', 130, 'ACTUALLY USEFUL.'], ['🛵', 'HOSTEL FOOD DELIVERY', 100, 'LOGISTICS ERA.'], ['🎮', 'FLAPPY PROFESSOR', 150, 'WE LOVE THE ENERGY.']] },
];

function pickSessionRounds() {
  const count = 8;
  return shuffleRounds(gameRounds).slice(0, count);
}

function Sparkles({ count = 14 }) {
  return <div className="sparkles" aria-hidden="true">{Array.from({ length: count }, (_, index) => <i key={index} style={{ '--i': index }} />)}</div>;
}

export default function Home() {
  const [screen, setScreen] = useState('intro');
  const [round, setRound] = useState(0);
  const [sessionRounds, setSessionRounds] = useState([]);
  const [calibrationTick, setCalibrationTick] = useState(3);
  const [score, setScore] = useState(500);
  const [playerName, setPlayerName] = useState('');
  const [department, setDepartment] = useState('');
  const [profileError, setProfileError] = useState('');
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [seconds, setSeconds] = useState(ROUND_DURATION);
  const [toast, setToast] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [memoryVisible, setMemoryVisible] = useState(true);
  const [needle, setNeedle] = useState(0);
  const [isResolving, setIsResolving] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const blinkTimeout = useRef();
  const memoryTimeout = useRef();
  const timerRef = useRef();
  const needleFrame = useRef();

  const clearRoundTimers = useCallback(() => {
    clearTimeout(blinkTimeout.current);
    clearTimeout(memoryTimeout.current);
    clearInterval(timerRef.current);
    cancelAnimationFrame(needleFrame.current);
  }, []);

  const displayToast = useCallback((heading, points) => {
    setToast({ heading, points, id: Date.now() });
    if (points > 0) setBurstKey((key) => key + 1);
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
      if (round === sessionRounds.length - 1) showResults();
      else { setRound((oldRound) => oldRound + 1); setIsResolving(false); }
    }, ROUND_TRANSITION_MS);
  }, [clearRoundTimers, displayToast, isResolving, round, sessionRounds.length, showResults]);

  useEffect(() => () => clearRoundTimers(), [clearRoundTimers]);

  useEffect(() => {
    if (screen !== 'game' || !sessionRounds.length) return undefined;
    setSeconds(ROUND_DURATION);
    setIsBlinking(false);
    setMemoryVisible(true);
    const currentKind = sessionRounds[round].kind;

    timerRef.current = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 0.1) {
          clearInterval(timerRef.current);
          window.setTimeout(() => resolveRound(currentKind === 'silent' ? 200 : -50, currentKind === 'silent' ? 'DISCIPLINE +200 AURA.' : 'TIME FUMBLED.'), 0);
          return 0;
        }
        return Math.max(0, value - 0.1);
      });
    }, 100);

    if (currentKind === 'blink') {
      const wait = 3400 + Math.random() * 2500;
      blinkTimeout.current = window.setTimeout(() => {
        setIsBlinking(true);
        blinkTimeout.current = window.setTimeout(() => resolveRound(-50, 'TOO SLOW.'), 650);
      }, wait);
    }
    if (currentKind === 'memory') {
      memoryTimeout.current = window.setTimeout(() => setMemoryVisible(false), 1450);
    }
    if (currentKind === 'timing') {
      const started = performance.now();
      const travel = (time) => {
        setNeedle(((Math.sin((time - started) / 460) + 1) / 2) * 100);
        needleFrame.current = requestAnimationFrame(travel);
      };
      needleFrame.current = requestAnimationFrame(travel);
    }
    return clearRoundTimers;
  }, [clearRoundTimers, resolveRound, round, screen, sessionRounds]);

  useEffect(() => {
    if (screen !== 'calibrating') return undefined;
    setCalibrationTick(3);
    const tickInterval = window.setInterval(() => {
      setCalibrationTick((value) => {
        if (value <= 1) {
          clearInterval(tickInterval);
          window.setTimeout(() => setScreen('game'), 250);
          return 0;
        }
        return value - 1;
      });
    }, 550);
    return () => clearInterval(tickInterval);
  }, [screen]);

  const startGame = () => {
    clearRoundTimers();
    setScore(500);
    setRound(0);
    setSessionRounds(pickSessionRounds());
    setIsResolving(false);
    setToast(null);
    setProfileError('');
    setScreen('calibrating');
  };
  const playAgain = () => { clearRoundTimers(); setSessionRounds([]); setScreen('intro'); };
  const currentRound = sessionRounds[round];
  const roundNumber = String(round + 1).padStart(2, '0');
  const totalRounds = String(sessionRounds.length || 8).padStart(2, '0');
  const playerDisplay = playerName.trim().toUpperCase() || 'PLAYER';
  const departmentDisplay = department ? DEPARTMENT_EDITIONS[department] : 'CAMPUS EDITION';
  const leaderboard = [
    { name: playerDisplay, score, you: true },
    { name: 'RIYA', score: 540 + round * 118 },
    { name: 'DEV', score: 515 + round * 103 },
    { name: 'ANANYA', score: 480 + round * 87 },
    { name: 'KARAN', score: 460 + round * 96 },
  ].sort((left, right) => right.score - left.score);
  const result = score >= 1000
    ? { emoji: '👑', title: <>MAIN<br />CHARACTER</>, message: 'You clearly have questionable amounts of confidence.', rank: 'MAIN CHARACTER', meter: 92 }
    : score >= 700
      ? { emoji: '🗿', title: <>AURA<br />FARMER</>, message: 'Not legendary, but the room knows your name.', rank: 'AURA FARMER', meter: 68 }
      : { emoji: '💀', title: <>AURA IN<br />DEBT</>, message: 'The chaos won this round. Run it back.', rank: 'NPC REHAB ARC', meter: 34 };

  return (
    <main className={`app ${screen}-mode`}>
      <div className="grain" />
      <div className="aurora aurora-one" /><div className="aurora aurora-two" /><div className="scan-lines" />
      <Sparkles key={burstKey} />

      {screen === 'intro' && <section className="intro screen-enter">
        <header className="topbar"><span className="lab-label">✦ AURA LAB</span><span className="powered">POWERED BY <b>LearnIT</b></span></header>
        <div className="intro-content">
          <h1>AURA <span>RUSH</span></h1>
          <p className="intro-tagline">Think you have aura? Prove it.</p>
          <p className="intro-stats"><strong>8 challenges.</strong> <strong>3 minutes.</strong> <strong>1 aura score.</strong></p>
          <div className="profile-form">
            <label><span>YOUR NAME</span><input value={playerName} onChange={(event) => { setPlayerName(event.target.value); setProfileError(''); }} maxLength="16" placeholder="e.g. SOHAM" autoComplete="name" /></label>
            <label><span>YOUR CAMPUS CLASS</span><select value={department} onChange={(event) => setDepartment(event.target.value)}><option value="">PICK ONE (OPTIONAL)</option>{CAMPUS_CLASSES.map((campusClass) => <option key={campusClass} value={campusClass}>{campusClass}</option>)}</select></label>
          </div>
          {profileError && <p className="profile-error">⚠ {profileError}</p>}
          <div className="player-card"><span className="player-avatar">{playerName.trim().charAt(0).toUpperCase() || '✦'}</span><span>{playerName.trim() ? playerDisplay : 'YOUR PLAYER CARD'}</span><span className="live-dot" /><small>{department ? `CAMPUS AURA: ${departmentDisplay}` : 'READY TO RUSH'}</small></div>
          <button className="primary-button magnetic" onClick={startGame}>🔥 START THE CHAOS <span>→</span></button>
          <p className="microcopy">25 UNIQUE CHALLENGES · SOLO · MOBILE</p>
        </div>
        <footer className="intro-footer"><span>◉ LIVE FROM CAMPUS</span><span>V.02 / AURA ENGINE</span></footer>
      </section>}

      {screen === 'calibrating' && <section className="calibrating-screen screen-enter" aria-live="polite">
        <p className="calibrating-label">AURA CALIBRATING...</p>
        {calibrationTick > 0 && <p className="calibrating-count" key={calibrationTick}>{calibrationTick}</p>}
      </section>}

      {screen === 'game' && currentRound && <section className="game-screen screen-enter">
        <header className="game-header"><span className="game-brand">✦ <b>AURA RUSH</b></span><span className="round-count"><b>{roundNumber}</b><i />{totalRounds}</span><div className="game-actions"><button className="leaderboard-toggle" onClick={() => setLeaderboardOpen((open) => !open)}>⌁ <span>RANKS</span></button><span className="score-pill"><b>✦</b>{score.toLocaleString()} <small>AURA</small></span></div></header>
        <div className="progress-rail"><i style={{ width: `${(round / sessionRounds.length) * 100}%` }} /></div>
        <div className="game-area">
          <div className="round-content" key={round}>
            <p className="eyebrow">ROUND {roundNumber} / {currentRound.eyebrow}</p>
            <h2>{currentRound.title}</h2>
            <p className="round-copy">{currentRound.copy}</p>
            {currentRound.kind === 'silent' && <button className="silent-zone" onClick={() => resolveRound(-120, 'YOU BROKE THE SILENCE.')}><span>🧘</span><b>DON&apos;T TAP.</b><small>Hold still until the timer reaches zero.</small></button>}
            {currentRound.options && <div className={`aura-challenge-options ${currentRound.layout || ''}`}>{currentRound.options.map(([icon, label, points, feedback]) => <button key={label} onClick={() => resolveRound(points, feedback)}><span>{icon}</span><strong>{label}</strong><i>→</i></button>)}</div>}
            {currentRound.type === 'blink' && <button className={`eye-stage ${isBlinking ? 'blinked' : ''}`} aria-label="Tap when the eye blinks" onClick={() => resolveRound(isBlinking ? 100 : -50, isBlinking ? 'CLEAN TIMING.' : 'EARLY TAP.')}><span className="eye-lid" /><span className="eye-ball"><i /></span><em>{isBlinking ? 'TAP NOW!' : 'WAIT FOR IT...'}</em></button>}
            {currentRound.type === 'reaction' && <div className="reaction-cards">{currentRound.options.map(([emoji, label, points, feedback]) => <button key={label} onClick={() => resolveRound(points, feedback)}><span>{emoji}</span><small>{label}</small></button>)}</div>}
            {currentRound.type === 'choice' && <div className="choice-cards">{currentRound.options.map(([letter, label, points, feedback]) => <button key={letter} onClick={() => resolveRound(points, feedback)}><b>{letter}</b><span>{label}</span><i>→</i></button>)}</div>}
            {currentRound.type === 'timing' && <div className="timing-panel"><div className="timing-track"><i className="target-zone" /><i className="needle" style={{ left: `${needle}%` }} /></div><div className="timing-scale"><span>FUMBLE</span><span>MAX AURA</span><span>FUMBLE</span></div><button className="stop-button" onClick={() => { const distance = Math.abs(needle - 50); resolveRound(distance < 8 ? 250 : distance < 19 ? 90 : -80, distance < 8 ? 'ABSOLUTE CINEMA.' : distance < 19 ? 'NOT BAD.' : 'AURA FUMBLED.'); }}>STOP THE BAR</button></div>}
            {currentRound.type === 'memory' && <div className="memory-panel"><div className={`memory-items ${memoryVisible ? '' : 'hidden-items'}`}>{currentRound.items.map((item) => <span key={item}>{memoryVisible ? item : '?'}</span>)}</div><p className="memory-prompt">{memoryVisible ? 'MEMORISE THE ORDER...' : 'OKAY. WHAT WAS SECOND?'}</p>{!memoryVisible && <div className="memory-cards">{currentRound.answers.map(([emoji, label, isCorrect]) => <button key={label} onClick={() => resolveRound(isCorrect ? 180 : -60, isCorrect ? 'BRAIN: ONLINE.' : 'BRAIN: AIRPLANE MODE.')}><span>{emoji}</span>{label}</button>)}</div>}</div>}
          </div>
        </div>
        <footer className="game-footer"><span>ROUND {roundNumber} / {totalRounds}</span><b>{seconds.toFixed(1)}</b></footer>
        <aside className={`leaderboard ${leaderboardOpen ? 'leaderboard-open' : ''}`} aria-label="Live Aura leaderboard"><div className="leaderboard-heading"><span>✦ LIVE RANKS</span><button onClick={() => setLeaderboardOpen(false)} aria-label="Close leaderboard">×</button></div><p>WHO HAS THE MOST AURA?</p><ol>{leaderboard.map((entry, index) => <li key={entry.name} className={entry.you ? 'current-player' : ''}><b>{String(index + 1).padStart(2, '0')}</b><span className="rank-avatar">{entry.name.charAt(0)}</span><strong>{entry.name}{entry.you && <small>YOU</small>}</strong><em>{entry.score.toLocaleString()} ✦</em></li>)}</ol><div className="leaderboard-foot">UPDATES AFTER EVERY ROUND</div></aside>
      </section>}

      {screen === 'results' && <section className="results-screen screen-enter">
        <div className="result-rings" />
        <div className="results-content">
          <p className="eyebrow">{department ? `CAMPUS AURA: ${departmentDisplay}` : 'RUN COMPLETE'}</p>
          <p className="result-survived">YOU SURVIVED. {result.emoji}</p>
          <p className="final-score">Your Aura: <strong>{score.toLocaleString()}</strong></p>
          <p className="result-rank">Rank: <strong>{result.rank}</strong></p>
          <div className="result-message"><p><em>{result.message}</em></p><div><i style={{ width: `${result.meter}%` }} /></div></div>
          <div className="results-divider" />
          <p className="results-warmup">But this was just the warm-up.</p>
          <p className="results-learnit-copy"><b>LearnIT</b> is where people who like building things, trying ridiculous ideas, creating projects, competing, and meeting cool people come together.<br /><br />Think you&apos;d fit in?</p>
          <a className="primary-button join-button" href={MEMBERSHIP_URL} target="_blank" rel="noreferrer">JOIN LEARNIT <span>→</span></a>
          <p className="results-subcta">More fun experiences. More events. More cool peeps.</p>
          <a className="secondary-button" href={MEMBERSHIP_URL} target="_blank" rel="noreferrer">BECOME A MEMBER</a>
          <button className="play-again" onClick={playAgain}>↻ &nbsp; PLAY AGAIN</button>
        </div>
      </section>}

      {toast && <div className={`toast ${toast.points > 0 ? 'good' : 'bad'}`} key={toast.id}><strong>{toast.heading}</strong><span>{toast.points > 0 ? '+' : ''}{toast.points} AURA</span></div>}
    </main>
  );
}
