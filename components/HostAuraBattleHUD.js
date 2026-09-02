// components/HostAuraBattleHUD.js
'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const MEMBERSHIP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScdpwK6YjFtwWux8XXBr7tJRYrIlJSdsTNbfT3mahZShdCxHQ/viewform';

export function HostAuraBattleHUD({ room, onRestart }) {
  const sortedPlayers = Object.values(room.players || {}).sort((a, b) => b.score - a.score);
  const topPlayer = sortedPlayers[0];
  const maxScore = Math.max(1000, ...(sortedPlayers.map((p) => p.score) || []));

  const isPodium = room.phase === 'PODIUM';
  const isCountdown = room.phase === 'COUNTDOWN';
  const isActive = room.phase === 'CHALLENGE_ACTIVE' || room.phase === 'ROUND_FEEDBACK';

  const hasFiredConfetti = useRef(false);

  useEffect(() => {
    if (isPodium && !hasFiredConfetti.current) {
      hasFiredConfetti.current = true;
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d2ff00', '#815aff', '#ff55d7', '#00f0ff'],
        });
      } catch {}
    }
  }, [isPodium]);

  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. TOP HEADER: STALL RECORD & LIVE EVENT TICKER */}
      <div className="arcade-panel" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderRadius: '20px',
        border: '1px solid rgba(210, 255, 0, 0.4)',
        background: 'linear-gradient(135deg, rgba(26, 18, 44, 0.85) 0%, rgba(12, 9, 22, 0.95) 100%)',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🏆</span>
          <div>
            <span style={{ font: "700 10px 'DM Mono', monospace", color: '#d2ff00', letterSpacing: '0.12em', display: 'block' }}>
              STALL RECORD TO BEAT
            </span>
            <span style={{ font: "800 20px 'Space Grotesk', sans-serif", color: '#fff' }}>
              {room.allTimeChampion}: <strong style={{ color: '#d2ff00' }}>{room.allTimeHighScore.toLocaleString()}</strong> AURA
            </span>
          </div>
        </div>

        {room.overtakeEvents && room.overtakeEvents.length > 0 && (
          <div style={{
            font: "700 11px 'DM Mono', monospace",
            color: '#ff55d7',
            background: 'rgba(255, 85, 215, 0.1)',
            border: '1px solid rgba(255, 85, 215, 0.3)',
            padding: '6px 14px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚡</span>
            <span>{room.overtakeEvents[0].text}</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            font: "700 11px 'DM Mono', monospace",
            color: '#09090e',
            background: '#d2ff00',
            padding: '4px 10px',
            borderRadius: '8px',
            fontWeight: 800
          }}>
            ROOM: {room.code}
          </span>
        </div>
      </div>

      {/* 2. COUNTDOWN SCREEN */}
      {isCountdown && (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <p style={{ font: "700 12px 'DM Mono', monospace", color: '#d2ff00', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            PREPARE YOUR PHONES
          </p>
          <h1 style={{
            font: "900 84px 'Space Grotesk', sans-serif",
            color: '#d2ff00',
            margin: '10px 0',
            textShadow: '0 0 40px rgba(210, 255, 0, 0.6)'
          }}>
            ROUND 1
          </h1>
          <p style={{ font: "500 14px 'DM Mono', monospace", color: '#aaa5b5' }}>
            Fastest taps & answers take the Aura lead!
          </p>
        </div>
      )}

      {/* 3. ACTIVE BATTLE SCREEN */}
      {isActive && (
        <div className="host-battle-grid">
          {/* Left: Challenge Spotlight */}
          <div>
            {room.activeChallenge && (
              <div className="question-glass-card" style={{ textAlign: 'left', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ font: "700 11px 'DM Mono', monospace", color: '#ff55d7', letterSpacing: '0.12em' }}>
                      {room.activeChallenge.eyebrow}
                    </span>
                    {room.activeChallenge.isStealRound && (
                      <span style={{
                        font: "700 10px 'DM Mono', monospace",
                        color: '#ff3366',
                        background: 'rgba(255,51,102,0.15)',
                        border: '1px solid rgba(255,51,102,0.4)',
                        padding: '2px 8px',
                        borderRadius: '99px'
                      }}>
                        ⚡ 400 AURA STEAL
                      </span>
                    )}
                  </div>
                  <span style={{ font: "700 11px 'DM Mono', monospace", color: '#d2ff00' }}>
                    ROUND {room.currentRoundIndex} / {room.totalRounds}
                  </span>
                </div>

                <h3 style={{ font: "800 28px 'Space Grotesk', sans-serif", color: '#fff', lineHeight: 1.2, margin: '0 0 12px 0' }}>
                  {room.activeChallenge.prompt}
                </h3>

                {room.activeChallenge.subtitle && (
                  <p style={{ font: "500 13px 'DM Mono', monospace", color: '#c0b7cc', marginBottom: '20px', lineHeight: 1.5 }}>
                    {room.activeChallenge.subtitle}
                  </p>
                )}

                {/* Reflex Flash Target */}
                {room.activeChallenge.type === 'reflex' && (
                  <div style={{
                    padding: '30px',
                    borderRadius: '16px',
                    border: '2px solid #d2ff00',
                    background: 'radial-gradient(circle, rgba(210, 255, 0, 0.2) 0%, rgba(129, 90, 255, 0.1) 100%)',
                    textAlign: 'center',
                    boxShadow: '0 0 30px rgba(210, 255, 0, 0.3)'
                  }}>
                    <span style={{ fontSize: '38px', display: 'block', marginBottom: '8px' }}>⚡</span>
                    <strong style={{ font: "800 20px 'Space Grotesk', sans-serif", color: '#fff', textTransform: 'uppercase' }}>
                      TAP THE CENTER ON YOUR PHONES!
                    </strong>
                  </div>
                )}

                {/* Options Preview */}
                {room.activeChallenge.options && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {room.activeChallenge.options.map((opt, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '12px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '12px',
                          font: "600 12px 'Space Grotesk', sans-serif",
                          color: '#fcfbf6',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <span style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '6px',
                          background: 'rgba(210, 255, 0, 0.2)',
                          color: '#d2ff00',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 800
                        }}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Live Realtime Leaderboard */}
          <div className="arcade-panel" style={{
            padding: '20px',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            background: 'linear-gradient(145deg, rgba(24, 18, 38, 0.85) 0%, rgba(11, 8, 20, 0.95) 100%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '14px' }}>
              <span style={{ font: "800 12px 'Space Grotesk', sans-serif", color: '#d2ff00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                LIVE AURA RANKINGS
              </span>
              <span style={{ font: "700 11px 'DM Mono', monospace", color: '#aaa5b5' }}>
                {sortedPlayers.length} PLAYERS
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sortedPlayers.map((player, idx) => {
                const percent = Math.min(100, Math.max(15, Math.round((player.score / maxScore) * 100)));
                const isLeader = idx === 0;

                return (
                  <div
                    key={player.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '16px',
                      border: isLeader ? '1.5px solid #d2ff00' : '1px solid rgba(255,255,255,0.08)',
                      background: isLeader ? 'rgba(210, 255, 0, 0.08)' : 'rgba(0,0,0,0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ font: "800 13px 'DM Mono', monospace", color: '#d2ff00', width: '22px' }}>
                          #{idx + 1}
                        </span>
                        <span style={{ fontSize: '18px' }}>{player.avatar}</span>
                        <span style={{ font: "700 13px 'Space Grotesk', sans-serif", color: '#fff' }}>
                          {player.name}
                        </span>
                        {player.streak >= 2 && (
                          <span style={{
                            font: "700 9px 'DM Mono', monospace",
                            color: '#ff55d7',
                            background: 'rgba(255,85,215,0.15)',
                            padding: '1px 6px',
                            borderRadius: '99px'
                          }}>
                            🔥 {player.streak}
                          </span>
                        )}
                        {player.shieldActive && <span title="Shield Active">🛡️</span>}
                      </div>
                      <span style={{ font: "800 15px 'DM Mono', monospace", color: '#d2ff00' }}>
                        {player.score.toLocaleString()}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${percent}%`,
                          height: '100%',
                          background: isLeader
                            ? 'linear-gradient(90deg, #d2ff00, #815aff)'
                            : 'linear-gradient(90deg, #815aff, #ff55d7)',
                          borderRadius: '99px',
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. FINAL PODIUM CEREMONY */}
      {isPodium && (
        <div style={{ textAlign: 'center', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '64px', display: 'block' }}>👑</span>
          <div>
            <p style={{ font: "700 11px 'DM Mono', monospace", color: '#d2ff00', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
              TAKE THE LEAD CHAMPION
            </p>
            <h1 style={{ font: "900 48px 'Space Grotesk', sans-serif", color: '#fff', margin: 0, textTransform: 'uppercase' }}>
              {topPlayer ? topPlayer.name : 'NO CHAMPION'}
            </h1>
            <span style={{ font: "800 36px 'DM Mono', monospace", color: '#d2ff00', display: 'block', marginTop: '4px' }}>
              {topPlayer ? topPlayer.score.toLocaleString() : 0} AURA
            </span>
          </div>

          {/* Final Standings List */}
          <div className="arcade-panel" style={{
            maxWidth: '520px',
            width: '100%',
            padding: '20px',
            borderRadius: '20px',
            border: '1px solid rgba(210, 255, 0, 0.4)',
            textAlign: 'left'
          }}>
            <p style={{ font: "700 11px 'DM Mono', monospace", color: '#aaa5b5', letterSpacing: '0.1em', marginBottom: '12px' }}>
              FINAL SQUAD STANDINGS
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sortedPlayers.map((player, idx) => (
                <div
                  key={player.id}
                  style={{
                    padding: '10px 14px',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    font: "700 13px 'DM Mono', monospace"
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#d2ff00' }}>#{idx + 1}</span>
                    <span>{player.avatar}</span>
                    <span style={{ color: '#fff' }}>{player.name}</span>
                  </div>
                  <span style={{ color: '#d2ff00' }}>{player.score.toLocaleString()} AURA</span>
                </div>
              ))}
            </div>
          </div>

          {/* LearnIT Conversion Banner */}
          <div style={{
            maxWidth: '520px',
            width: '100%',
            padding: '24px',
            borderRadius: '20px',
            border: '2px solid #00f0ff',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(129, 90, 255, 0.2) 100%)',
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)'
          }}>
            <p style={{ font: "700 11px 'DM Mono', monospace", color: '#00f0ff', letterSpacing: '0.14em', marginBottom: '6px' }}>
              ✦ JOIN LEARNIT CLUB
            </p>
            <h3 style={{ font: "800 20px 'Space Grotesk', sans-serif", color: '#fff', margin: '0 0 14px 0' }}>
              "Think you have the Aura? Learn. Build. Compete."
            </h3>
            <a
              href={MEMBERSHIP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button magnetic"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#00f0ff',
                color: '#09090e',
                borderRadius: '14px',
                textDecoration: 'none',
                font: "800 12px 'Space Grotesk', sans-serif"
              }}
            >
              <span>🚀 REGISTER FOR LEARNIT MEMBERSHIP</span>
              <span>→</span>
            </a>
          </div>

          <button
            onClick={onRestart}
            className="primary-button magnetic"
            style={{
              padding: '14px 28px',
              fontSize: '13px',
              boxShadow: '0 0 20px rgba(210, 255, 0, 0.4)'
            }}
          >
            ⚡ PLAY AGAIN / NEXT BATTLE
          </button>
        </div>
      )}
    </div>
  );
}
