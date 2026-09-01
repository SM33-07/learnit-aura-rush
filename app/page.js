'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MEMBERSHIP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScdpwK6YjFtwWux8XXBr7tJRYrIlJSdsTNbfT3mahZShdCxHQ/viewform';

const ROUND_DURATION = 4.5;

const gameRounds = [
  { type: 'blink', eyebrow: 'REFLEX TEST', title: <>DON&apos;T<br />BLINK.</>, copy: 'Tap the moment the eye closes. No flinching.' },
  { type: 'reaction', eyebrow: 'NPC CHECK', title: <>YOUR PROFESSOR SAYS<br />“SURPRISE TEST.”</>, copy: 'Pick the only socially acceptable reaction.', options: [['🗿', 'UNBOTHERED', -35, 'NPC BEHAVIOUR.'], ['💀', 'COOKED', 75, 'VALID REACTION.'], ['😭', 'CRYING', -35, 'TOO EMOTIONAL.']] },
  { type: 'timing', eyebrow: 'AURA TIMING', title: <>STOP THE BAR<br />AT MAX AURA.</>, copy: 'Do not fumble the cinematic moment.' },
  { type: 'memory', eyebrow: 'BRAINROT SPEEDRUN', title: <>WHAT WAS<br />SECOND?</>, copy: 'Lock in. The items vanish in a second.', items: ['🍕', '🐸', '🛵'], answers: [['🍕', 'PIZZA', false], ['🐸', 'FROG', true], ['🛵', 'SCOOTER', false]] },
  { type: 'reaction', eyebrow: 'CAMPUS CRISIS', title: <>THE GROUP CHAT SAYS<br />“WHO&apos;S DOING THE PPT?”</>, copy: 'It is 11:54 PM. The deadline is midnight.', options: [['🧑‍🍳', 'I GOT THIS', 75, 'CLUTCH PLAYER.'], ['💀', 'SEEN-ZONED', -35, 'AURA ABANDONED.'], ['🫥', 'OFFLINE', -35, 'GHOST MODE.']] },
  { type: 'choice', eyebrow: 'POV CHECK', title: <>ATTENDANCE IS 74%.<br />CLASS STARTS NOW.</>, copy: 'Choose your next move wisely.', options: [['A', 'RUN TO CLASS', 90, 'LOCKED IN.'], ['B', 'ASK FOR PROXY', 40, 'RISKY BUSINESS.'], ['C', 'ACCEPT FATE', -60, 'PLOT ARMOR EXPIRED.']] },
  { type: 'timing', eyebrow: 'DEADLINE DODGE', title: <>CLUTCH THE<br />SUBMISSION.</>, copy: 'Stop inside the green zone before time runs out.' },
  { type: 'memory', eyebrow: 'BRAINROT SPEEDRUN', title: <>WHAT WAS<br />SECOND?</>, copy: 'Don&apos;t blink. Memorise the order.', items: ['🧋', '🥐', '🛹'], answers: [['🧋', 'BOBA', false], ['🥐', 'CROISSANT', true], ['🛹', 'SKATEBOARD', false]] },
  { type: 'reaction', eyebrow: 'WIFI INCIDENT', title: <>THE WIFI DIES<br />DURING SUBMISSION.</>, copy: 'Your laptop is still spinning.', options: [['😌', 'PEACEFUL', -35, 'TOO CALM.'], ['🫠', 'MELTING', 75, 'THE ONLY CORRECT ANSWER.'], ['🧘', 'MEDITATING', -35, 'NOT THE TIME.']] },
  { type: 'choice', eyebrow: 'TRUST ISSUES', title: <>YOUR FRIEND SAYS<br />“I&apos;M 5 MINUTES AWAY.”</>, copy: 'You know what this means.', options: [['A', 'BELIEVE THEM', -60, 'NAIVE ARC.'], ['B', 'LEAVE NOW', 90, 'EXPERIENCE SPEAKS.'], ['C', 'START A NEW LIFE', 40, 'DRAMATIC, BUT FAIR.']] },
  { type: 'blink', eyebrow: 'REFLEX REMATCH', title: <>DON&apos;T TAP<br />TOO EARLY.</>, copy: 'Your reflexes have been talking. Prove them.' },
  { type: 'memory', eyebrow: 'MEMORY MAYHEM', title: <>WHAT WAS<br />SECOND?</>, copy: 'This one is for the locked-in legends.', items: ['🪩', '🦆', '🎧'], answers: [['🪩', 'DISCO BALL', false], ['🦆', 'DUCK', true], ['🎧', 'HEADPHONES', false]] },
  { type: 'reaction', eyebrow: 'LECTURE LORE', title: <>THE PROFESSOR ASKS:<br />“ANY QUESTIONS?”</>, copy: 'The room goes suspiciously quiet.', options: [['🙋', 'ASK AWAY', 40, 'BRAVE MOVE.'], ['🫥', 'BECOME INVISIBLE', 75, 'SOCIAL SURVIVAL.'], ['📢', 'START YAPPING', -35, 'TOO MUCH AURA.']] },
  { type: 'choice', eyebrow: 'FREE PERIOD', title: <>YOU GET A<br />SURPRISE FREE HOUR.</>, copy: 'What does your aura choose?', options: [['A', 'LOCK IN', 40, 'GRINDSET DETECTED.'], ['B', 'CANTEEN RUN', 90, 'ELITE DECISION.'], ['C', 'GO HOME', -35, 'THE DAY JUST STARTED.']] },
  { type: 'timing', eyebrow: 'FINAL CLUTCH', title: <>ONE LAST<br />AURA CHECK.</>, copy: 'This is the moment they record on their phones.' },
  { type: 'memory', eyebrow: 'FINAL BRAINROT', title: <>WHAT WAS<br />SECOND?</>, copy: 'Last question. Do not throw the run.', items: ['🌮', '🦖', '🛼'], answers: [['🌮', 'TACO', false], ['🦖', 'DINOSAUR', true], ['🛼', 'ROLLER SKATE', false]] },
];

function Sparkles({ count = 14 }) {
  return <div className="sparkles" aria-hidden="true">{Array.from({ length: count }, (_, index) => <i key={index} style={{ '--i': index }} />)}</div>;
}

export default function Home() {
  const [screen, setScreen] = useState('intro');
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(500);
  const [playerName, setPlayerName] = useState('');
  const [department, setDepartment] = useState('');
  const [profileError, setProfileError] = useState('');
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
      if (round === gameRounds.length - 1) showResults();
      else { setRound((oldRound) => oldRound + 1); setIsResolving(false); }
    }, 1150);
  }, [clearRoundTimers, displayToast, isResolving, round, showResults]);

  useEffect(() => () => clearRoundTimers(), [clearRoundTimers]);

  useEffect(() => {
    if (screen !== 'game') return undefined;
    setSeconds(ROUND_DURATION);
    setIsBlinking(false);
    setMemoryVisible(true);
    const currentType = gameRounds[round].type;

    timerRef.current = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 0.1) {
          clearInterval(timerRef.current);
          window.setTimeout(() => resolveRound(currentType === 'timing' ? -80 : -50, 'TIME FUMBLED.'), 0);
          return 0;
        }
        return Math.max(0, value - 0.1);
      });
    }, 100);

    if (currentType === 'blink') {
      const wait = 1500 + Math.random() * 1700;
      blinkTimeout.current = window.setTimeout(() => {
        setIsBlinking(true);
        blinkTimeout.current = window.setTimeout(() => resolveRound(-50, 'TOO SLOW.'), 650);
      }, wait);
    }
    if (currentType === 'memory') {
      memoryTimeout.current = window.setTimeout(() => setMemoryVisible(false), 1450);
    }
    if (currentType === 'timing') {
      const started = performance.now();
      const travel = (time) => {
        setNeedle(((Math.sin((time - started) / 460) + 1) / 2) * 100);
        needleFrame.current = requestAnimationFrame(travel);
      };
      needleFrame.current = requestAnimationFrame(travel);
    }
    return clearRoundTimers;
  }, [clearRoundTimers, resolveRound, round, screen]);

  const startGame = () => {
    if (!playerName.trim()) { setProfileError('ADD YOUR NAME TO ENTER THE AURA LAB.'); return; }
    clearRoundTimers(); setScore(500); setRound(0); setIsResolving(false); setToast(null); setProfileError(''); setScreen('game');
  };
  const playAgain = () => { clearRoundTimers(); setScreen('intro'); };
  const currentRound = gameRounds[round];
  const roundNumber = String(round + 1).padStart(2, '0');
  const totalRounds = String(gameRounds.length).padStart(2, '0');
  const playerDisplay = playerName.trim().toUpperCase() || 'PLAYER';
  const departmentDisplay = department || 'CAMPUS';
  const personalizedPrompt = {
    4: `${playerDisplay}, THE ${departmentDisplay} GROUP CHAT IS COOKED.`,
    5: `HEY ${playerDisplay} — YOUR ${departmentDisplay} ATTENDANCE IS 74%.`,
    6: `${departmentDisplay} SUBMISSION PORTAL CLOSES IN 8 MINUTES.`,
    9: `${playerDisplay}, YOUR FRIEND IS STILL “5 MINUTES AWAY.”`,
    12: `YOUR ${departmentDisplay} PROFESSOR SAYS: “ANY QUESTIONS?”`,
    13: `HEY ${playerDisplay}, A SURPRISE FREE PERIOD APPEARS.`,
  }[round];
  const result = score >= 1000
    ? { emoji: '👑', title: <>MAIN<br />CHARACTER</>, message: 'You did not simply survive the aura test. You directed it.', status: 'PROTAGONIST ENERGY', meter: 92 }
    : score >= 700
      ? { emoji: '🗿', title: <>AURA<br />FARMER</>, message: 'A few fumbles, but the aura is undeniably present.', status: 'CERTIFIED LOCKED IN', meter: 68 }
      : { emoji: '💀', title: <>AURA IN<br />DEBT</>, message: 'The test was brutal. The comeback arc starts now.', status: 'NPC REHAB ARC', meter: 34 };

  return (
    <main className={`app ${screen}-mode`}>
      <div className="grain" />
      <div className="aurora aurora-one" /><div className="aurora aurora-two" /><div className="scan-lines" />
      <Sparkles key={burstKey} />

      {screen === 'intro' && <section className="intro screen-enter">
        <header className="topbar"><span className="lab-label">✦ AURA LAB</span><span className="powered">POWERED BY <b>LearnIT</b></span></header>
        <div className="intro-content">
          <p className="eyebrow">CAMPUS AURA ASSESSMENT / 2026</p>
          <h1>AURA <span>RUSH</span></h1>
          <p className="intro-copy">You have <strong>90 seconds</strong> to prove you&apos;re not NPC.</p>
          <div className="profile-form">
            <label><span>YOUR NAME</span><input value={playerName} onChange={(event) => { setPlayerName(event.target.value); setProfileError(''); }} maxLength="16" placeholder="e.g. SOHAM" autoComplete="name" /></label>
            <label><span>BRANCH / DEPARTMENT</span><select value={department} onChange={(event) => setDepartment(event.target.value)}><option value="">CHOOSE YOUR ZONE</option><option>CSE / IT</option><option>ECE / EEE</option><option>MECHANICAL</option><option>CIVIL</option><option>COMMERCE / MANAGEMENT</option><option>ARTS / DESIGN</option><option>OTHER</option></select></label>
          </div>
          {profileError && <p className="profile-error">⚠ {profileError}</p>}
          <div className="player-card"><span className="player-avatar">{playerName.trim().charAt(0).toUpperCase() || '✦'}</span><span>{playerName.trim() ? playerDisplay : 'YOUR PLAYER CARD'}</span><span className="live-dot" /><small>{departmentDisplay}</small></div>
          <button className="primary-button magnetic" onClick={startGame}>START THE TEST <span>→</span></button>
          <p className="microcopy">2–6 PLAYERS · FAST HANDS · ZERO EXCUSES</p>
        </div>
        <footer className="intro-footer"><span>◉ LIVE FROM CAMPUS</span><span>V.02 / AURA ENGINE</span></footer>
      </section>}

      {screen === 'game' && <section className="game-screen screen-enter">
        <header className="game-header"><span className="game-brand">✦ <b>AURA RUSH</b></span><span className="round-count"><b>{roundNumber}</b><i />{totalRounds}</span><span className="score-pill"><b>✦</b>{score.toLocaleString()} <small>AURA</small></span></header>
        <div className="progress-rail"><i style={{ width: `${(round / gameRounds.length) * 100}%` }} /></div>
        <div className="game-area">
          <div className="round-content" key={round}>
            <p className="eyebrow">ROUND {roundNumber} / {currentRound.eyebrow}</p>
            {personalizedPrompt && <p className="personalized-prompt">{personalizedPrompt}</p>}
            <h2>{currentRound.title}</h2>
            <p className="round-copy">{currentRound.copy}</p>
            {currentRound.type === 'blink' && <button className={`eye-stage ${isBlinking ? 'blinked' : ''}`} aria-label="Tap when the eye blinks" onClick={() => resolveRound(isBlinking ? 100 : -50, isBlinking ? 'CLEAN TIMING.' : 'EARLY TAP.')}><span className="eye-lid" /><span className="eye-ball"><i /></span><em>{isBlinking ? 'TAP NOW!' : 'WAIT FOR IT...'}</em></button>}
            {currentRound.type === 'reaction' && <div className="reaction-cards">{currentRound.options.map(([emoji, label, points, feedback]) => <button key={label} onClick={() => resolveRound(points, feedback)}><span>{emoji}</span><small>{label}</small></button>)}</div>}
            {currentRound.type === 'choice' && <div className="choice-cards">{currentRound.options.map(([letter, label, points, feedback]) => <button key={letter} onClick={() => resolveRound(points, feedback)}><b>{letter}</b><span>{label}</span><i>→</i></button>)}</div>}
            {currentRound.type === 'timing' && <div className="timing-panel"><div className="timing-track"><i className="target-zone" /><i className="needle" style={{ left: `${needle}%` }} /></div><div className="timing-scale"><span>FUMBLE</span><span>MAX AURA</span><span>FUMBLE</span></div><button className="stop-button" onClick={() => { const distance = Math.abs(needle - 50); resolveRound(distance < 8 ? 250 : distance < 19 ? 90 : -80, distance < 8 ? 'ABSOLUTE CINEMA.' : distance < 19 ? 'NOT BAD.' : 'AURA FUMBLED.'); }}>STOP THE BAR</button></div>}
            {currentRound.type === 'memory' && <div className="memory-panel"><div className={`memory-items ${memoryVisible ? '' : 'hidden-items'}`}>{currentRound.items.map((item) => <span key={item}>{memoryVisible ? item : '?'}</span>)}</div><p className="memory-prompt">{memoryVisible ? 'MEMORISE THE ORDER...' : 'OKAY. WHAT WAS SECOND?'}</p>{!memoryVisible && <div className="memory-cards">{currentRound.answers.map(([emoji, label, isCorrect]) => <button key={label} onClick={() => resolveRound(isCorrect ? 180 : -60, isCorrect ? 'BRAIN: ONLINE.' : 'BRAIN: AIRPLANE MODE.')}><span>{emoji}</span>{label}</button>)}</div>}</div>}
          </div>
        </div>
        <footer className="game-footer"><span>ROUND {roundNumber} / {totalRounds}</span><b>{seconds.toFixed(1)}</b></footer>
      </section>}

      {screen === 'results' && <section className="results-screen screen-enter"><div className="result-rings" /><div className="results-content"><p className="eyebrow">AURA ANALYSIS COMPLETE</p><p className="result-status">{result.status}</p><div className="result-emoji">{result.emoji}</div><h2>{result.title}</h2><p className="result-name">{playerDisplay}</p><p className="final-score">{score.toLocaleString()} <span>✦ AURA</span></p><div className="result-message"><p>{result.message}</p><div><i style={{ width: `${result.meter}%` }} /></div></div><button className="primary-button" onClick={() => setScreen('cta')}>UNLOCK THE VERDICT <span>→</span></button></div></section>}

      {screen === 'cta' && <section className="cta-screen screen-enter"><div className="cta-sticker">AURA<br />LAB<br /><span>✦</span></div><div className="cta-content"><p className="eyebrow">THE GAME MAY BE OVER. THE CHAOS IS NOT.</p><p className="cta-personal">HEY {playerDisplay} / {departmentDisplay}</p><h2>{score >= 1000 ? <>YOU HAVE<br />THE AURA.</> : <>YOUR AURA<br />HAS SPOKEN.</>}</h2><p className="cta-copy">Whether you cooked or completely destroyed your Aura score, you&apos;d fit right in at <b>LearnIT.</b><br /><br />More games. More events. More people to build, learn, compete and make random ideas real.</p><p className="cta-signoff">COME MEET THE COOL PEEPS<br />BEHIND THE CHAOS.</p><a className="primary-button join-button" href={MEMBERSHIP_URL} target="_blank" rel="noreferrer">JOIN LEARNIT <span>→</span></a><button className="play-again" onClick={playAgain}>↻ &nbsp; PLAY AGAIN</button></div><div className="learnit-mark">L<span>IT</span></div></section>}

      {toast && <div className={`toast ${toast.points > 0 ? 'good' : 'bad'}`} key={toast.id}><strong>{toast.heading}</strong><span>{toast.points > 0 ? '+' : ''}{toast.points} AURA</span></div>}
    </main>
  );
}
