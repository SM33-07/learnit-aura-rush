'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const MEMBERSHIP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScdpwK6YjFtwWux8XXBr7tJRYrIlJSdsTNbfT3mahZShdCxHQ/viewform';

const ROUND_DURATION = 16;
const ROUND_TRANSITION_MS = 1400;

const CAMPUS_CLASSES = [
  'CSE',
  'ECE',
  'Electrical',
  'Mechatronics',
  'Mechanical',
  'Civil',
  'Biotech',
  'Management',
  'Commerce',
  'Law',
  'Psychology',
  'Other',
];

const DEPARTMENT_EDITIONS = {
  CSE: 'CSE EDITION',
  ECE: 'ECE EDITION',
  Electrical: 'ELECTRICAL EDITION',
  Mechatronics: 'MECHATRONICS EDITION',
  Mechanical: 'MECHANICAL EDITION',
  Civil: 'CIVIL EDITION',
  Biotech: 'BIOTECH EDITION',
  Management: 'MANAGEMENT EDITION',
  Commerce: 'COMMERCE EDITION',
  Law: 'LAW EDITION',
  Psychology: 'PSYCHOLOGY EDITION',
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

import { CHALLENGE_POOL_100, STREAM_SPECIALIZED_CHALLENGES } from './challenges';

// 35 DISTINCT INTERACTION PATTERN FAMILIES TO GUARANTEE 25 STRICTLY UNIQUE PATTERNS PER RUN
const PATTERN_MAP = {
  stamps: 'rubber_stamp', stamps_hackathon: 'rubber_stamp', stamps_placement: 'rubber_stamp',
  binary: 'binary_w_l', binary_viva: 'binary_w_l', binary_canteen: 'binary_w_l',
  reflex: 'reflex_blink', reflex_bell: 'reflex_blink',
  timing_bar: 'timing_needle', timing_proxy: 'timing_needle', timing_wifi: 'timing_needle',
  alarm_picker: 'alarm_speedrun', alarm_assignment: 'alarm_speedrun', alarm_mess: 'alarm_speedrun',
  silent: 'silent_discipline', silent_library: 'silent_discipline',
  memory: 'memory_locker', memory_canteen: 'memory_locker', memory_stationery: 'memory_locker',
  sequence: 'sequence_combo', sequence_code: 'sequence_combo', sequence_meme: 'sequence_combo',
  archetype: 'archetype_spotter', archetype_doubt: 'archetype_spotter', archetype_late: 'archetype_spotter',
  priority: 'priority_ranking', priority_groupwork: 'priority_ranking',
  definition: 'slang_definition', definition_rizz: 'slang_definition', definition_lockin: 'slang_definition',
  chat: 'chat_translation', chat_prof: 'chat_translation',
  wager: 'auction_wager', wager_hackathon: 'auction_wager', wager_crush: 'auction_wager',
  invest: 'startup_invest', invest_learnit: 'startup_invest', invest_crypto: 'startup_invest',
  all_or_nothing: 'viva_gamble', all_or_nothing_prof: 'viva_gamble', all_or_nothing_presentation: 'viva_gamble',
  gamble: 'roast_battle', gamble_poker: 'roast_battle', gamble_attendance: 'roast_battle',
  prediction: 'ratio_consensus', prediction_canteen: 'ratio_consensus', prediction_wifi: 'ratio_consensus',
  binary_opinion: 'hot_take', binary_ai: 'hot_take', binary_topper: 'hot_take',
  multi_choice: 'seating_dilemma', seat_front: 'seating_dilemma', seat_projector: 'seating_dilemma',
  budget: 'canteen_budget', budget_hackathon: 'canteen_budget', budget_midnight: 'canteen_budget',
  route: 'campus_shortcut', route_morning: 'campus_shortcut', shortcut_night: 'campus_shortcut', commute_train: 'campus_shortcut',
  meter_choice: 'attendance_clutch', meter_rain: 'attendance_clutch', medical_cert: 'attendance_clutch',
  exam: 'exam_survival', exam_mcq: 'exam_survival', quiz_pop: 'exam_survival',
  dialogue: 'smooth_excuse', dialogue_excuse: 'smooth_excuse', dialogue_stealth: 'smooth_excuse', pitch_deck: 'smooth_excuse', stage_fright: 'smooth_excuse',
  crisis_laundry: 'hostel_emergency', hostel_wifi: 'hostel_emergency',
  chat_meme: 'whatsapp_panic', wrong_chat: 'whatsapp_panic', poll_betrayal: 'whatsapp_panic',
  chips_npc: 'npc_detector', chips_canteen: 'npc_detector', chips_roommate: 'npc_detector',
  danger_crush: 'crush_danger', hotspot_password: 'crush_danger',
  negotiation: 'diplomacy_negotiation', pen_borrow: 'diplomacy_negotiation',
  headphones_fake: 'social_stealth', elevator_crowd: 'social_stealth',
  split: 'roast_respect_split', split_coffee: 'roast_respect_split',
  versus: 'would_you_rather', versus_dorm: 'would_you_rather', versus_final: 'would_you_rather',
  build_cards: 'learnit_prototype', build_learnit_v2: 'learnit_prototype', build_final: 'learnit_prototype',
  swipe: 'entrance_swagger', swipe_graduation: 'entrance_swagger',
  vote: 'apocalypse_vote', vote_startup: 'apocalypse_vote'
};

const TOTAL_RUN_CHALLENGES = 25;

function pickBalancedSession(selectedDepartment) {
  const usedPatterns = new Set();
  const session = [];

  // 1. If user picked a specialized campus stream, inject stream-tailored challenges first
  if (selectedDepartment && STREAM_SPECIALIZED_CHALLENGES[selectedDepartment]) {
    const streamPool = shuffle(STREAM_SPECIALIZED_CHALLENGES[selectedDepartment]);
    for (const sc of streamPool) {
      const pattern = PATTERN_MAP[sc.mechanic] || sc.mechanic;
      if (!usedPatterns.has(pattern)) {
        session.push(sc);
        usedPatterns.add(pattern);
      }
    }
  }

  // 2. Fill the rest of the 25 rounds with strictly unique interaction patterns from the 100 pool
  const shuffledAll = shuffle(CHALLENGE_POOL_100);
  for (const c of shuffledAll) {
    if (session.length >= TOTAL_RUN_CHALLENGES) break;
    const pattern = PATTERN_MAP[c.mechanic] || c.mechanic;
    if (!usedPatterns.has(pattern) && !session.some(x => x.id === c.id)) {
      session.push(c);
      usedPatterns.add(pattern);
    }
  }

  return shuffle(session);
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
  const router = useRouter();
  const [gameMode, setGameMode] = useState(null); // null = Mode Select, 'solo', 'multiplayer'
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleCreateMultiplayerRoom = async () => {
    setIsCreatingRoom(true);
    try {
      const res = await fetch('/api/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'CREATE' }),
      });
      const data = await res.json();
      if (data.code) {
        if (data.hostToken) {
          localStorage.setItem(`aura_host_token_${data.code}`, data.hostToken);
        }
        router.push(`/host/${data.code}`);
      }
    } catch (err) {
      console.error('Failed to create room:', err);
      setIsCreatingRoom(false);
    }
  };

  const handleJoinMultiplayerRoom = (e) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;
    router.push(`/play/${joinCodeInput.trim().toUpperCase()}`);
  };
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
    const currentRoundObj = sessionRounds[round];
    const currentKind = currentRoundObj?.kind;
    const initialSeconds = currentKind === 'dontPress' ? 5 : ROUND_DURATION;

    setSeconds(initialSeconds);
    setIsBlinking(false);
    setMemState('showing');
    setUserSequence([]);

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

  const goToRules = () => {
    setScreen('rules');
  };

  const startCalibration = () => {
    clearRoundTimers();
    setScore(500);
    setRound(0);
    setSessionRounds(pickBalancedSession(department));
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
    setSessionRounds(pickBalancedSession(department));
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
  const totalRounds = String(sessionRounds.length || TOTAL_RUN_CHALLENGES).padStart(2, '0');
  const playerDisplay = playerName.trim().toUpperCase() || 'PLAYER';
  const departmentDisplay = department ? DEPARTMENT_EDITIONS[department] : 'CAMPUS EDITION';

  function getAuraVerdict(auraScore) {
    if (auraScore >= 3800) {
      return { title: 'CERTIFIED MENACE', percentile: 'Top 3%', level: 'AURA LEVEL: ILLEGAL', emoji: '👑', review: 'You clearly have questionable amounts of confidence and god-tier campus reflexes.' };
    }
    if (auraScore >= 3000) {
      return { title: 'MAIN CHARACTER', percentile: 'Top 10%', level: 'AURA LEVEL: S-TIER', emoji: '✨', review: 'The spotlight finds you even when you try to hide.' };
    }
    if (auraScore >= 2300) {
      return { title: 'PLOT ARMOR ACTIVATED', percentile: 'Top 25%', level: 'AURA LEVEL: HIGH FREQUENCY', emoji: '⚡', review: 'Unexplainably surviving every campus dilemma.' };
    }
    if (auraScore >= 1600) {
      return { title: 'AURA FARMER', percentile: 'Top 45%', level: 'AURA LEVEL: RESPECTABLE', emoji: '🗿', review: 'Solid presence. The canteen staff knows your order.' };
    }
    if (auraScore >= 1000) {
      return { title: 'LOCKED IN', percentile: 'Top 68%', level: 'AURA LEVEL: CALIBRATING', emoji: '🔒', review: 'Honest effort. The redemption arc is loading.' };
    }
    if (auraScore >= 500) {
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

          {/* 1A. MODE SELECTION SCREEN */}
          {gameMode === null && (
            <div style={{ maxWidth: '440px', width: '100%', margin: '24px 0 12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p className="intro-stats" style={{ margin: '0 0 4px 0', fontSize: '13px' }}>
                <strong>SELECT YOUR GAME MODE</strong>
              </p>

              <button
                className="primary-button magnetic"
                onClick={() => setGameMode('solo')}
                style={{ padding: '16px 20px', width: '100%', fontSize: '14px', margin: 0 }}
              >
                🔥 PLAY SOLO (25 ROUNDS) <span>→</span>
              </button>

              <button
                className="magnetic"
                onClick={() => setGameMode('multiplayer')}
                style={{
                  padding: '16px 20px',
                  width: '100%',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(129,90,255,0.25) 0%, rgba(210,255,0,0.15) 100%)',
                  border: '2px solid #d2ff00',
                  color: '#fff',
                  font: "800 14px 'Space Grotesk', sans-serif",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 0 20px rgba(210,255,0,0.2)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <span style={{ display: 'block', color: '#d2ff00', fontSize: '15px' }}>⚡ TAKE THE LEAD</span>
                  <small style={{ font: "500 11px 'DM Mono', monospace", color: '#aaa5b5' }}>
                    1–6 Players • Battle for #1 Aura
                  </small>
                </div>
                <span style={{ color: '#d2ff00', fontSize: '18px' }}>→</span>
              </button>
            </div>
          )}

          {/* 1B. MULTIPLAYER HOST / JOIN SELECTION */}
          {gameMode === 'multiplayer' && (
            <div style={{ maxWidth: '440px', width: '100%', margin: '18px 0 12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                background: 'rgba(210, 255, 0, 0.08)',
                border: '1px solid rgba(210, 255, 0, 0.4)',
                borderRadius: '16px',
                padding: '12px 16px',
                textAlign: 'left'
              }}>
                <span style={{ font: "800 12px 'DM Mono', monospace", color: '#d2ff00', letterSpacing: '0.12em' }}>
                  TAKE THE LEAD • 1–6 PLAYERS
                </span>
                <p style={{ font: "500 12.5px 'Space Grotesk', sans-serif", color: '#c0b7cc', margin: '4px 0 0' }}>
                  Live spectator leaderboard, speed bonuses &amp; Aura Steals.
                </p>
              </div>

              <button
                className="primary-button magnetic"
                onClick={handleCreateMultiplayerRoom}
                disabled={isCreatingRoom}
                style={{ padding: '16px 20px', width: '100%', fontSize: '13.5px', margin: 0 }}
              >
                {isCreatingRoom ? 'OPENING ARENA...' : '⚡ CREATE & HOST ARENA MATCH →'}
              </button>

              <form onSubmit={handleJoinMultiplayerRoom} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="ROOM CODE (e.g. AURA1234)"
                  value={joinCodeInput}
                  onChange={(e) => setJoinCodeInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '12px',
                    padding: '13px',
                    color: '#d2ff00',
                    font: "700 14px 'DM Mono', monospace",
                    textAlign: 'center',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={!joinCodeInput.trim()}
                  className="magnetic"
                  style={{
                    background: 'rgba(210, 255, 0, 0.2)',
                    border: '1px solid #d2ff00',
                    borderRadius: '12px',
                    color: '#d2ff00',
                    font: "800 12.5px 'Space Grotesk', sans-serif",
                    padding: '0 18px',
                    cursor: 'pointer'
                  }}
                >
                  JOIN →
                </button>
              </form>

              <button
                onClick={() => setGameMode(null)}
                className="minimal-glass-btn"
                style={{ alignSelf: 'flex-start', marginTop: '4px' }}
              >
                ← Back to Mode Selection
              </button>
            </div>
          )}

          {/* 1C. EXISTING SOLO PROFILE & RULES ENTRY (100% PRESERVED) */}
          {gameMode === 'solo' && (
            <>
              <p className="intro-stats"><strong>25 challenges.</strong> <strong>3 minutes.</strong> <strong>1 aura score.</strong></p>
              <div className="profile-form">
                <label>
                  <span>YOUR NAME</span>
                  <input value={playerName} onChange={(event) => setPlayerName(event.target.value)} maxLength="16" placeholder="e.g. SOHAM" autoComplete="name" />
                </label>
                <label>
                  <span>YOUR STREAM / MAJOR</span>
                  <select value={department} onChange={(event) => setDepartment(event.target.value)}>
                    <option value="">PICK YOUR STREAM (OPTIONAL)</option>
                    {CAMPUS_CLASSES.map((campusClass) => <option key={campusClass} value={campusClass}>{campusClass}</option>)}
                  </select>
                </label>
              </div>
              <div className="player-card">
                <span className="player-avatar">{playerName.trim().charAt(0).toUpperCase() || '✦'}</span>
                <span>{playerName.trim() ? playerDisplay : 'YOUR PLAYER CARD'}</span>
                <span className="live-dot" />
                <small>{department ? `${departmentDisplay}` : 'READY TO RUSH'}</small>
              </div>
              <button className="primary-button magnetic" onClick={goToRules}>START THE CHAOS <span>→</span></button>
              <button
                onClick={() => setGameMode(null)}
                className="minimal-glass-btn"
                style={{ alignSelf: 'flex-start', marginTop: '14px' }}
              >
                ← Change Mode
              </button>
            </>
          )}

          <p className="microcopy">100 UNIQUE CHALLENGES · POWERED BY LEARNIT</p>
        </div>
        <footer className="intro-footer">
          <span>◉ LIVE FROM CAMPUS</span>
          <span>V.02 / AURA ENGINE</span>
        </footer>
      </section>}

      {/* 2. RULES & PROTOCOL SCREEN */}
      {screen === 'rules' && <section className="rules-screen screen-enter">
        <header className="topbar">
          <span className="lab-label">✦ CAMPUS AURA LAB / 2026</span>
          <span className="powered">POWERED BY <b>LearnIT</b></span>
        </header>
        <div className="rules-content">
          <p className="eyebrow">PROTOCOL BRIEFING</p>
          <h2>THE RULES OF AURA</h2>

          <div className="rules-grid">
            <div className="rule-card">
              <span className="rule-icon">⚡</span>
              <div>
                <strong>25 RAPID ROUNDS</strong>
                <p>16 seconds per challenge. Read the chaos and make your play.</p>
              </div>
            </div>

            <div className="rule-card">
              <span className="rule-icon">✦</span>
              <div>
                <strong>AURA ECONOMY</strong>
                <p>Clutch moves score +150 to +250. Fumbling loses -60 to -120 💀</p>
              </div>
            </div>

            <div className="rule-card">
              <span className="rule-icon">🎯</span>
              <div>
                <strong>CHAOTIC MECHANICS</strong>
                <p>Needles, speed alarms, blinks, budget splits &amp; {department ? `${departmentDisplay} questions` : 'branch lore'}.</p>
              </div>
            </div>

            <div className="rule-card">
              <span className="rule-icon">🧘</span>
              <div>
                <strong>DISCIPLINE CHECKS</strong>
                <p>If a challenge says DO NOTHING, don&apos;t touch the screen!</p>
              </div>
            </div>

            <div className="rule-card rules-card-full">
              <span className="rule-icon">👑</span>
              <div>
                <strong>HOLOGRAPHIC AURA CARD</strong>
                <p>Survive all 25 rounds to generate your screenshot-ready Aura Rank and prove you&apos;re not an NPC.</p>
              </div>
            </div>
          </div>

          <button className="primary-button proceed-button magnetic" onClick={startCalibration}>
            🔥 I&apos;M LOCKED IN, LET&apos;S COOK <span>→</span>
          </button>
          <p className="rules-subtext">NO SECOND CHANCES · ZERO NPC ENERGY · POWERED BY LEARNIT</p>
        </div>
        <footer className="intro-footer">
          <span>◉ {playerDisplay}</span>
          <span>{departmentDisplay}</span>
        </footer>
      </section>}

      {/* 3. RAPID CALIBRATION SCREEN */}
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
            {/* RADIANT GLASSMORPHIC QUESTION SPOTLIGHT BOX */}
            <div className="question-glass-card">
              <div className="question-tag-row">
                <span className="question-tag-label">
                  <span className="question-tag-dot">✦</span>
                  {currentRound.eyebrow || 'CAMPUS SITUATION'}
                </span>
                <span className="question-num-pill">CHALLENGE {roundNumber}/{totalRounds}</span>
              </div>
              <h2 className="question-title-text">{currentRound.title}</h2>
              {currentRound.copy && <p className="round-copy">{currentRound.copy}</p>}
            </div>

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

