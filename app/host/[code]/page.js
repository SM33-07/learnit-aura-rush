// app/host/[code]/page.js
'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QRCodeCard } from '@/components/QRCodeCard';
import { HostAuraBattleHUD } from '@/components/HostAuraBattleHUD';

export default function HostScreen({ params }) {
  const { code } = use(params);
  const upperCode = code.toUpperCase();
  const router = useRouter();

  const [room, setRoom] = useState({
    code: upperCode,
    hostId: 'host',
    hostToken: (typeof window !== 'undefined' ? localStorage.getItem(`aura_host_token_${upperCode}`) : '') || '',
    phase: 'LOBBY',
    startTime: null,
    endTime: null,
    currentRoundIndex: 0,
    totalRounds: 6,
    activeChallenge: null,
    roundStartTime: null,
    roundDurationMs: 8000,
    players: {},
    roundSubmissions: {},
    processedActionIds: new Set(),
    overtakeEvents: [],
    spectatorHeadline: 'WAITING FOR SQUAD TO SCAN QR...',
    allTimeHighScore: 8420,
    allTimeChampion: 'SOHAM',
  });

  const [hostToken, setHostToken] = useState(
    typeof window !== 'undefined' ? localStorage.getItem(`aura_host_token_${upperCode}`) : null
  );
  const [isStarting, setIsStarting] = useState(false);

  // Initialize or Claim Room State on Mount
  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem(`aura_host_token_${upperCode}`) : null;

    fetch('/api/room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'CREATE', code: upperCode, hostToken: storedToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.hostToken) {
          setHostToken(data.hostToken);
          localStorage.setItem(`aura_host_token_${upperCode}`, data.hostToken);
        }
        if (data.room) {
          setRoom(data.room);
        }
      })
      .catch((err) => console.warn('Room initialization warning:', err));
  }, [upperCode]);

  // Connect to real-time Server-Sent Events stream + Polling fallback
  useEffect(() => {
    let eventSource = null;
    const token = hostToken || (typeof window !== 'undefined' ? localStorage.getItem(`aura_host_token_${upperCode}`) : null);

    if (token) {
      try {
        eventSource = new EventSource(`/api/room/${upperCode}/stream?playerId=host&hostToken=${token}`);
        eventSource.onmessage = (event) => {
          try {
            const updatedRoom = JSON.parse(event.data);
            setRoom(updatedRoom);
            if (updatedRoom.hostToken) {
              setHostToken(updatedRoom.hostToken);
              localStorage.setItem(`aura_host_token_${upperCode}`, updatedRoom.hostToken);
            }
          } catch (err) {
            console.error('Error parsing SSE room state:', err);
          }
        };
      } catch (err) {
        console.error('SSE connection error:', err);
      }
    }

    // Polling fallback
    const pollInterval = setInterval(() => {
      const currentToken = hostToken || (typeof window !== 'undefined' ? localStorage.getItem(`aura_host_token_${upperCode}`) : null);
      if (!currentToken) return;

      fetch(`/api/room/${upperCode}/state?playerId=host&hostToken=${currentToken}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.room) setRoom(data.room);
        })
        .catch(() => {});
    }, 1000);

    return () => {
      eventSource?.close();
      clearInterval(pollInterval);
    };
  }, [upperCode, hostToken]);

  const handleStartGame = async () => {
    setIsStarting(true);
    try {
      const token = hostToken || (typeof window !== 'undefined' ? localStorage.getItem(`aura_host_token_${upperCode}`) : null);
      await fetch('/api/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'START', code: upperCode, hostToken: token }),
      });
    } catch (err) {
      console.error('Error starting match:', err);
    } finally {
      setIsStarting(false);
    }
  };

  const handleRestart = async () => {
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
      console.error('Error creating next battle:', err);
    }
  };

  const playersList = Object.values(room.players || {});
  const totalJoined = playersList.length;
  const isLobby = room.phase === 'LOBBY';

  return (
    <main className="app">
      <div className="grain" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="scan-lines" />

      {/* TOPBAR */}
      <header className="topbar">
        <span className="lab-label">✦ AURA RUSH • TAKE THE LEAD</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/"
            style={{
              font: "700 11px 'DM Mono', monospace",
              color: '#aaa5b5',
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            ← Mode Selection
          </Link>
          <span className="powered">POWERED BY <b>LearnIT</b></span>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 10 }}>
        {isLobby ? (
          <div style={{ maxWidth: '960px', width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
            {/* Left: Dynamic QR Code Scanner */}
            <div style={{ flex: '1 1 340px', maxWidth: '380px' }}>
              <QRCodeCard roomCode={upperCode} />
            </div>

            {/* Right: Squad Slots & Launch Action */}
            <div style={{ flex: '1 1 380px', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="arcade-panel" style={{
                padding: '16px 20px',
                borderRadius: '18px',
                border: '1px solid rgba(210, 255, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ font: "800 12px 'Space Grotesk', sans-serif", color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ARENA SLOTS ({totalJoined}/6)
                </span>
                {totalJoined >= 1 ? (
                  <span style={{
                    font: "700 10px 'DM Mono', monospace",
                    color: '#d2ff00',
                    background: 'rgba(210,255,0,0.15)',
                    border: '1px solid #d2ff00',
                    padding: '2px 8px',
                    borderRadius: '99px'
                  }}>
                    READY TO BATTLE
                  </span>
                ) : (
                  <span style={{ font: "500 11px 'DM Mono', monospace", color: '#aaa5b5' }}>
                    SCAN QR TO ENTER...
                  </span>
                )}
              </div>

              {/* 6 Squad Slots Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {[0, 1, 2, 3, 4, 5].map((slotIdx) => {
                  const player = playersList[slotIdx];
                  return (
                    <div
                      key={slotIdx}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '16px',
                        border: player ? '1.5px solid #d2ff00' : '1px dashed rgba(255,255,255,0.14)',
                        background: player ? 'rgba(210, 255, 0, 0.08)' : 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{player ? player.avatar : '👤'}</span>
                      <div style={{ overflow: 'hidden', textAlign: 'left' }}>
                        <span style={{ font: "700 12px 'Space Grotesk', sans-serif", color: '#fff', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {player ? player.name : `SLOT ${slotIdx + 1}`}
                        </span>
                        <span style={{ font: "700 9px 'DM Mono', monospace", color: player ? '#d2ff00' : '#777', textTransform: 'uppercase' }}>
                          {player ? 'READY' : 'EMPTY'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Launch Match Button */}
              {totalJoined >= 1 ? (
                <button
                  onClick={handleStartGame}
                  disabled={isStarting}
                  className="primary-button magnetic"
                  style={{
                    padding: '16px 24px',
                    fontSize: '14px',
                    width: '100%',
                    boxShadow: '0 0 25px rgba(210, 255, 0, 0.5)'
                  }}
                >
                  ⚡ LAUNCH AURA BATTLE ({totalJoined} PLAYERS) <span>→</span>
                </button>
              ) : (
                <div style={{
                  padding: '14px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  textAlign: 'center',
                  font: "500 11px 'DM Mono', monospace",
                  color: '#aaa5b5'
                }}>
                  Point your phone camera at the QR code on the left!
                </div>
              )}
            </div>
          </div>
        ) : (
          <HostAuraBattleHUD room={room} onRestart={handleRestart} />
        )}
      </div>

      <footer className="intro-footer">
        <span>◉ LEARNIT CLUB • 2026 MEMBERSHIP DRIVE</span>
        <span>ROOM {upperCode}</span>
      </footer>
    </main>
  );
}
