// app/play/[code]/page.js
'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AuraResultCard } from '@/components/AuraResultCard';

export default function PlayPage({ params }) {
  const { code } = use(params);
  const upperCode = code.toUpperCase();

  const [playerId, setPlayerId] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [name, setName] = useState('');
  const [view, setView] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);

  // Initialize session on mount
  useEffect(() => {
    let pid = typeof window !== 'undefined' ? sessionStorage.getItem('aura_player_id') || localStorage.getItem('aura_player_id') : null;
    if (!pid) {
      pid = `p_${Math.random().toString(36).substring(2, 9)}`;
      if (typeof window !== 'undefined') localStorage.setItem('aura_player_id', pid);
    }
    setPlayerId(pid);

    const storedToken = typeof window !== 'undefined' ? sessionStorage.getItem(`aura_token_${upperCode}`) : null;
    if (storedToken) setSessionToken(storedToken);

    const storedName = typeof window !== 'undefined' ? localStorage.getItem('aura_player_name') || '' : '';
    if (storedName) {
      setName(storedName);
      joinGame(pid, storedName);
    }
  }, [upperCode]);

  // Connect to SSE stream & polling
  useEffect(() => {
    if (!isJoined || !playerId || !sessionToken) return;

    let eventSource = null;
    try {
      eventSource = new EventSource(`/api/room/${upperCode}/stream?playerId=${playerId}&sessionToken=${sessionToken}`);
      eventSource.onmessage = (event) => {
        try {
          const updatedView = JSON.parse(event.data);
          setView(updatedView);
        } catch {}
      };
    } catch {}

    const pollInterval = setInterval(() => {
      fetch(`/api/room/${upperCode}/state?playerId=${playerId}&sessionToken=${sessionToken}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.view) setView(data.view);
        })
        .catch(() => {});
    }, 1000);

    return () => {
      eventSource?.close();
      clearInterval(pollInterval);
    };
  }, [isJoined, upperCode, playerId, sessionToken]);

  // Reset local selection on round change
  useEffect(() => {
    setSelectedOption(null);
  }, [view?.currentRoundIndex]);

  const joinGame = async (pid, playerName) => {
    setIsJoining(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'JOIN',
          code: upperCode,
          playerId: pid,
          name: playerName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.player?.sessionToken) {
          setSessionToken(data.player.sessionToken);
          sessionStorage.setItem(`aura_token_${upperCode}`, data.player.sessionToken);
        }
        if (data.view) setView(data.view);
        setIsJoined(true);
        localStorage.setItem('aura_player_name', playerName);
      } else {
        setErrorMessage(data.error || 'ROOM FULL (6 players maximum)');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Connection error');
    } finally {
      setIsJoining(false);
    }
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !playerId) return;
    joinGame(playerId, name.trim());
  };

  const handleAnswerSubmit = async (optionIndex) => {
    if (!playerId || !sessionToken || view?.answeredCurrentRound || selectedOption !== null) return;
    if (optionIndex !== undefined) setSelectedOption(optionIndex);

    try {
      const actionId = `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const res = await fetch(`/api/room/${upperCode}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'SUBMIT_ANSWER',
          actionId,
          playerId,
          sessionToken,
          optionIndex,
        }),
      });
      const data = await res.json();
      if (data.message) {
        setActionFeedback(data.message);
        setTimeout(() => setActionFeedback(null), 1500);
      }
    } catch (err) {
      console.error('Answer submission error:', err);
    }
  };

  const handleUsePowerCard = async (type) => {
    if (!playerId || !sessionToken) return;
    try {
      const actionId = `pwr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const res = await fetch(`/api/room/${upperCode}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'USE_POWER_CARD',
          actionId,
          playerId,
          sessionToken,
          powerCardType: type,
        }),
      });
      const data = await res.json();
      if (data.message) {
        setActionFeedback(data.message);
        setTimeout(() => setActionFeedback(null), 2000);
      }
    } catch (err) {
      console.error('Power card error:', err);
    }
  };

  // 1. JOIN SCREEN
  if (!isJoined) {
    return (
      <main className="app intro-mode" style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div className="grain" />
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="scan-lines" />

        <div className="arcade-panel" style={{
          maxWidth: '400px',
          width: '100%',
          padding: '28px 20px',
          borderRadius: '24px',
          border: '2px solid rgba(210, 255, 0, 0.4)',
          boxShadow: '0 0 30px rgba(210, 255, 0, 0.15)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 10
        }}>
          <span style={{ fontSize: '42px' }}>⚡</span>
          <div>
            <p style={{ font: "700 11px 'DM Mono', monospace", color: '#ff55d7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
              ARENA • ROOM {upperCode}
            </p>
            <h1 style={{ font: "800 28px 'Space Grotesk', sans-serif", color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
              TAKE THE LEAD
            </h1>
            <p style={{ font: "500 13px 'DM Mono', monospace", color: '#c0b7cc', marginTop: '6px' }}>
              Enter your nickname to battle for #1 Aura!
            </p>
          </div>

          {errorMessage && (
            <div style={{
              background: 'rgba(255, 51, 102, 0.15)',
              border: '1px solid #ff3366',
              borderRadius: '12px',
              padding: '10px',
              color: '#ff3366',
              font: "700 12px 'DM Mono', monospace"
            }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleJoinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <input
              type="text"
              placeholder="YOUR NICKNAME (e.g. SOHAM)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              maxLength={15}
              required
              disabled={isJoining}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(210, 255, 0, 0.4)',
                borderRadius: '14px',
                padding: '14px',
                color: '#d2ff00',
                font: "800 15px 'Space Grotesk', sans-serif",
                textAlign: 'center',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={isJoining || !name.trim()}
              className="primary-button magnetic"
              style={{ width: '100%', padding: '15px', fontSize: '13.5px', margin: 0 }}
            >
              {isJoining ? 'ENTERING ARENA...' : '⚡ ENTER BATTLE ARENA →'}
            </button>
          </form>

          <Link
            href="/"
            className="minimal-glass-btn"
            style={{ width: '100%', marginTop: '6px' }}
          >
            ← Play Solo Mode instead
          </Link>
        </div>
      </main>
    );
  }

  // 2. LOBBY / WAITING SCREEN
  if (!view || view.phase === 'LOBBY' || view.phase === 'COUNTDOWN') {
    const myPlayer = view?.myPlayer;
    return (
      <main className="app intro-mode" style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div className="grain" />
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="scan-lines" />

        <div className="arcade-panel" style={{
          maxWidth: '400px',
          width: '100%',
          padding: '28px 20px',
          borderRadius: '24px',
          border: '2px solid rgba(210, 255, 0, 0.4)',
          boxShadow: '0 0 30px rgba(210, 255, 0, 0.15)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 10
        }}>
          <span style={{ fontSize: '48px', display: 'block' }}>{myPlayer?.avatar || '⚡'}</span>
          <div>
            <p style={{ font: "700 10px 'DM Mono', monospace", color: '#ff55d7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
              SQUAD ARENA READY
            </p>
            <h2 style={{ font: "800 26px 'Space Grotesk', sans-serif", color: '#fff', margin: 0 }}>
              {myPlayer?.name || name}
            </h2>
            <span style={{ font: "700 11px 'DM Mono', monospace", color: '#d2ff00', display: 'block', marginTop: '4px' }}>
              ROOM: {upperCode}
            </span>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '14px',
            textAlign: 'left',
            font: "500 12px 'Space Grotesk', sans-serif",
            color: '#c0b7cc',
            lineHeight: 1.5
          }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '6px', fontSize: '12px' }}>HOW TO WIN AURA:</strong>
            • Tap reflex strikes instantly for speed multipliers.<br />
            • Solve rapid logic & bug challenges in 5 seconds.<br />
            • Clutch the Aura Steal rounds to siphon points from #1!
          </div>

          <p style={{ font: "700 12px 'DM Mono', monospace", color: '#d2ff00', letterSpacing: '0.08em', margin: 0 }}>
            ⚡ HOST WILL LAUNCH ROUND 1 SHORTLY...
          </p>
        </div>
      </main>
    );
  }

  // 3. FINAL PODIUM SCREEN
  if (view.phase === 'PODIUM') {
    return (
      <main className="app" style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div className="grain" />
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="scan-lines" />

        <div style={{ width: '100%', maxWidth: '440px', zIndex: 10 }}>
          <AuraResultCard
            score={view.myPlayer.score}
            rank={view.myPlayer.rank}
            totalPlayers={view.leaderboard.length}
            name={view.myPlayer.name}
            avatar={view.myPlayer.avatar}
          />
        </div>
      </main>
    );
  }

  // 4. ACTIVE BATTLE CONTROLLER (MOBILE OPTIMIZED)
  const myPlayer = view.myPlayer;
  const challenge = view.challenge;
  const hasAnswered = view.answeredCurrentRound || selectedOption !== null;

  return (
    <main className="app" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <div className="grain" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="scan-lines" />

      <div className="mobile-controller-container">
        {/* TOP STATUS HUD */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          paddingBottom: '12px',
          marginBottom: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '65%' }}>
            <span style={{ fontSize: '22px' }}>{myPlayer.avatar}</span>
            <span style={{
              font: "800 14px 'Space Grotesk', sans-serif",
              color: '#fff',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {myPlayer.name}
            </span>
            {myPlayer.streak >= 2 && (
              <span style={{
                font: "700 9.5px 'DM Mono', monospace",
                color: '#ff55d7',
                background: 'rgba(255,85,215,0.15)',
                padding: '2px 6px',
                borderRadius: '99px',
                whiteSpace: 'nowrap'
              }}>
                🔥 {myPlayer.streak}
              </span>
            )}
            {myPlayer.shieldActive && <span title="Shield Active" style={{ fontSize: '13px' }}>🛡️</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              font: "700 11px 'DM Mono', monospace",
              color: '#aaa5b5',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.14)',
              padding: '3px 7px',
              borderRadius: '8px'
            }}>
              #{myPlayer.rank}
            </span>
            <span style={{
              font: "800 14px 'DM Mono', monospace",
              color: '#d2ff00',
              background: 'rgba(210,255,0,0.12)',
              border: '1px solid rgba(210, 255, 0, 0.4)',
              padding: '3px 9px',
              borderRadius: '8px',
              whiteSpace: 'nowrap'
            }}>
              {myPlayer.score.toLocaleString()} <small style={{ fontSize: '9px' }}>AURA</small>
            </span>
          </div>
        </div>

        {/* ACTION FEEDBACK TOAST */}
        {actionFeedback && (
          <div style={{
            position: 'fixed',
            top: '55px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60,
            background: '#09090e',
            border: '2px solid #d2ff00',
            color: '#d2ff00',
            padding: '8px 16px',
            borderRadius: '16px',
            font: "800 12px 'DM Mono', monospace",
            boxShadow: '0 0 25px rgba(210, 255, 0, 0.45)',
            whiteSpace: 'nowrap'
          }}>
            {actionFeedback}
          </div>
        )}

        {/* ACTIVE CHALLENGE CARD */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '10px 0' }}>
          {challenge ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="question-glass-card" style={{ textAlign: 'left', padding: '18px 16px', margin: 0, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '10px' }}>
                  <span style={{ font: "700 10px 'DM Mono', monospace", color: '#ff55d7', letterSpacing: '0.12em' }}>
                    {challenge.eyebrow}
                  </span>
                  <span style={{ font: "700 10px 'DM Mono', monospace", color: '#d2ff00' }}>
                    ROUND {view.currentRoundIndex}/{view.totalRounds}
                  </span>
                </div>

                <h2 style={{
                  font: "800 clamp(18px, 5.2vw, 24px) 'Space Grotesk', sans-serif",
                  color: '#fff',
                  lineHeight: 1.25,
                  margin: '0 0 8px 0'
                }}>
                  {challenge.prompt}
                </h2>

                {challenge.subtitle && (
                  <p style={{ font: "500 12px 'DM Mono', monospace", color: '#c0b7cc', margin: 0, lineHeight: 1.4 }}>
                    {challenge.subtitle}
                  </p>
                )}
              </div>

              {/* MECHANIC 1: REFLEX STRIKE FLASH BUTTON */}
              {challenge.type === 'reflex' && (
                <button
                  disabled={hasAnswered}
                  onClick={() => handleAnswerSubmit()}
                  className="magnetic"
                  style={{
                    width: '100%',
                    minHeight: '140px',
                    padding: '24px 16px',
                    borderRadius: '22px',
                    border: hasAnswered ? '2px solid #00f0ff' : '3px solid #d2ff00',
                    background: hasAnswered
                      ? 'rgba(0, 240, 255, 0.15)'
                      : 'radial-gradient(circle, #d2ff00 0%, #815aff 80%)',
                    color: hasAnswered ? '#00f0ff' : '#09090e',
                    font: "900 clamp(20px, 6vw, 26px) 'Space Grotesk', sans-serif",
                    boxShadow: hasAnswered ? 'none' : '0 0 45px rgba(210, 255, 0, 0.65)',
                    cursor: hasAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    touchAction: 'manipulation'
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{hasAnswered ? '✓' : '⚡'}</span>
                  <span>{hasAnswered ? 'LOCKED IN!' : 'TAP NOW!'}</span>
                </button>
              )}

              {/* MECHANIC 2: CHOICE GRID (STACKED FULL WIDTH ON MOBILE) */}
              {challenge.options && (
                <div className="mobile-choice-grid">
                  {challenge.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <button
                        key={idx}
                        disabled={hasAnswered}
                        onClick={() => handleAnswerSubmit(idx)}
                        className={`mobile-choice-btn ${isSelected ? 'selected' : ''}`}
                        style={{
                          opacity: hasAnswered && !isSelected ? 0.35 : 1,
                          cursor: hasAnswered ? 'default' : 'pointer',
                        }}
                      >
                        <span style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          background: isSelected ? '#d2ff00' : 'rgba(255,255,255,0.1)',
                          color: isSelected ? '#09090e' : '#d2ff00',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          font: "800 11px 'DM Mono', monospace",
                          flexShrink: 0
                        }}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span style={{ flex: 1, lineHeight: 1.25 }}>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div style={{ font: "700 12px 'DM Mono', monospace", color: '#d2ff00', textAlign: 'center' }}>
              PREPARING NEXT CHALLENGE...
            </div>
          )}
        </div>

        {/* BOTTOM POWER CARDS TRAY */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '10px' }}>
          <div className="power-cards-tray">
            {myPlayer.powerCards.map((card) => (
              <button
                key={card.id}
                disabled={card.used}
                onClick={() => handleUsePowerCard(card.type)}
                title={card.description}
                className={`power-card-btn ${card.used ? 'used' : ''}`}
              >
                <span style={{ fontSize: '15px' }}>{card.icon}</span>
                <span style={{ fontSize: '9px', whiteSpace: 'nowrap' }}>{card.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
