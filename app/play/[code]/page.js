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
      <main className="app intro-mode">
        <div className="grain" />
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="scan-lines" />

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 10 }}>
          <div className="arcade-panel" style={{
            maxWidth: '420px',
            width: '100%',
            padding: '30px 24px',
            borderRadius: '24px',
            border: '2px solid rgba(210, 255, 0, 0.4)',
            boxShadow: '0 0 30px rgba(210, 255, 0, 0.15)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <span style={{ fontSize: '40px' }}>⚡</span>
            <div>
              <p style={{ font: "700 11px 'DM Mono', monospace", color: '#ff55d7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
                ARENA • ROOM {upperCode}
              </p>
              <h1 style={{ font: "800 28px 'Space Grotesk', sans-serif", color: '#fff', margin: 0 }}>
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

            <form onSubmit={handleJoinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(210, 255, 0, 0.4)',
                  borderRadius: '14px',
                  padding: '14px',
                  color: '#d2ff00',
                  font: "800 14px 'Space Grotesk', sans-serif",
                  textAlign: 'center',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={isJoining || !name.trim()}
                className="primary-button magnetic"
                style={{ width: '100%', padding: '14px', fontSize: '13px' }}
              >
                {isJoining ? 'ENTERING ARENA...' : '⚡ ENTER BATTLE ARENA →'}
              </button>
            </form>

            <Link
              href="/"
              style={{
                font: "700 11px 'DM Mono', monospace",
                color: '#aaa5b5',
                textDecoration: 'none',
                marginTop: '8px'
              }}
            >
              Play Solo Mode instead
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. LOBBY SCREEN
  if (!view || view.phase === 'LOBBY' || view.phase === 'COUNTDOWN') {
    const myPlayer = view?.myPlayer;
    return (
      <main className="app intro-mode">
        <div className="grain" />
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="scan-lines" />

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 10 }}>
          <div className="arcade-panel" style={{
            maxWidth: '420px',
            width: '100%',
            padding: '30px 24px',
            borderRadius: '24px',
            border: '2px solid rgba(210, 255, 0, 0.4)',
            boxShadow: '0 0 30px rgba(210, 255, 0, 0.15)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
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
              <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>HOW TO WIN AURA:</strong>
              • Tap reflex strikes instantly for speed multipliers.<br />
              • Solve rapid logic & bug challenges in 5 seconds.<br />
              • Clutch the Aura Steal rounds to siphon points from #1!
            </div>

            <p style={{ font: "700 12px 'DM Mono', monospace", color: '#d2ff00', letterSpacing: '0.08em', margin: 0 }}>
              ⚡ HOST WILL LAUNCH ROUND 1 SHORTLY...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // 3. FINAL PODIUM SCREEN
  if (view.phase === 'PODIUM') {
    return (
      <main className="app">
        <div className="grain" />
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="scan-lines" />

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 10 }}>
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

  // 4. ACTIVE BATTLE CONTROLLER SCREEN
  const myPlayer = view.myPlayer;
  const challenge = view.challenge;
  const hasAnswered = view.answeredCurrentRound || selectedOption !== null;

  return (
    <main className="app" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="grain" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="scan-lines" />

      {/* TOP STATUS HUD */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '12px', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>{myPlayer.avatar}</span>
          <span style={{ font: "800 13px 'Space Grotesk', sans-serif", color: '#fff' }}>{myPlayer.name}</span>
          {myPlayer.streak >= 2 && (
            <span style={{
              font: "700 10px 'DM Mono', monospace",
              color: '#ff55d7',
              background: 'rgba(255,85,215,0.15)',
              padding: '2px 6px',
              borderRadius: '99px'
            }}>
              🔥 {myPlayer.streak}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            font: "700 11px 'DM Mono', monospace",
            color: '#aaa5b5',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '4px 8px',
            borderRadius: '8px'
          }}>
            #{myPlayer.rank}
          </span>
          <span style={{
            font: "800 15px 'DM Mono', monospace",
            color: '#d2ff00',
            background: 'rgba(210,255,0,0.15)',
            border: '1px solid #d2ff00',
            padding: '4px 10px',
            borderRadius: '8px'
          }}>
            {myPlayer.score.toLocaleString()} <small style={{ fontSize: '10px' }}>AURA</small>
          </span>
        </div>
      </div>

      {/* ACTION FEEDBACK TOAST */}
      {actionFeedback && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          background: '#09090e',
          border: '2px solid #d2ff00',
          color: '#d2ff00',
          padding: '8px 18px',
          borderRadius: '16px',
          font: "800 12px 'DM Mono', monospace",
          boxShadow: '0 0 20px rgba(210, 255, 0, 0.4)'
        }}>
          {actionFeedback}
        </div>
      )}

      {/* ACTIVE CHALLENGE CARD */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '520px', width: '100%', margin: '12px auto', zIndex: 10 }}>
        {challenge ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="question-glass-card" style={{ textAlign: 'left', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '12px' }}>
                <span style={{ font: "700 10px 'DM Mono', monospace", color: '#ff55d7', letterSpacing: '0.12em' }}>
                  {challenge.eyebrow}
                </span>
                <span style={{ font: "700 10px 'DM Mono', monospace", color: '#d2ff00' }}>
                  ROUND {view.currentRoundIndex}/{view.totalRounds}
                </span>
              </div>

              <h2 style={{ font: "800 22px 'Space Grotesk', sans-serif", color: '#fff', lineHeight: 1.2, margin: '0 0 8px 0' }}>
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
                  padding: '40px 20px',
                  borderRadius: '20px',
                  border: hasAnswered ? '2px solid #00f0ff' : '3px solid #d2ff00',
                  background: hasAnswered
                    ? 'rgba(0, 240, 255, 0.15)'
                    : 'radial-gradient(circle, #d2ff00 0%, #815aff 80%)',
                  color: hasAnswered ? '#00f0ff' : '#09090e',
                  font: "900 22px 'Space Grotesk', sans-serif",
                  boxShadow: hasAnswered ? 'none' : '0 0 40px rgba(210, 255, 0, 0.6)',
                  cursor: hasAnswered ? 'default' : 'pointer'
                }}
              >
                {hasAnswered ? '✓ LOCKED IN!' : '⚡ TAP NOW!'}
              </button>
            )}

            {/* MECHANIC 2: MULTIPLE CHOICE GRID */}
            {challenge.options && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {challenge.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleAnswerSubmit(idx)}
                      className="magnetic"
                      style={{
                        padding: '16px 14px',
                        borderRadius: '16px',
                        border: isSelected
                          ? '2px solid #d2ff00'
                          : '1px solid rgba(255, 255, 255, 0.14)',
                        background: isSelected
                          ? 'rgba(210, 255, 0, 0.2)'
                          : 'rgba(255, 255, 255, 0.05)',
                        color: isSelected ? '#d2ff00' : '#fcfbf6',
                        font: "700 13px 'Space Grotesk', sans-serif",
                        textAlign: 'left',
                        cursor: hasAnswered ? 'default' : 'pointer',
                        opacity: hasAnswered && !isSelected ? 0.4 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <span style={{
                        width: '22px',
                        height: '22px',
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
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div style={{ font: "700 12px 'DM Mono', monospace", color: '#d2ff00' }}>
            PREPARING NEXT CHALLENGE...
          </div>
        )}
      </div>

      {/* POWER CARDS TRAY */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '10px', zIndex: 10, maxWidth: '520px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {myPlayer.powerCards.map((card) => (
            <button
              key={card.id}
              disabled={card.used}
              onClick={() => handleUsePowerCard(card.type)}
              title={card.description}
              style={{
                flex: 1,
                padding: '8px 4px',
                borderRadius: '12px',
                border: card.used ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(129, 90, 255, 0.5)',
                background: card.used ? 'rgba(0,0,0,0.3)' : 'linear-gradient(135deg, rgba(129,90,255,0.2) 0%, rgba(26,18,44,0.6) 100%)',
                color: card.used ? '#555' : '#fff',
                font: "700 10px 'DM Mono', monospace",
                cursor: card.used ? 'default' : 'pointer',
                opacity: card.used ? 0.4 : 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <span style={{ fontSize: '14px' }}>{card.icon}</span>
              <span style={{ fontSize: '9px', whiteSpace: 'nowrap' }}>{card.name}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
