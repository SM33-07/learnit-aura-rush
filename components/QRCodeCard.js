// components/QRCodeCard.js
'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export function QRCodeCard({ roomCode }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [joinUrl, setJoinUrl] = useState('');

  useEffect(() => {
    if (!roomCode) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://learnit-aura-rush.vercel.app';
    const targetUrl = `${origin}/play/${roomCode.toUpperCase()}`;
    setJoinUrl(targetUrl);

    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#09090e',
        light: '#d2ff00',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, [roomCode]);

  const copyToClipboard = async () => {
    if (!joinUrl) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(joinUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = joinUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="arcade-panel" style={{
      padding: '24px',
      borderRadius: '24px',
      maxWidth: '380px',
      margin: '0 auto',
      textAlign: 'center',
      border: '2px solid rgba(210, 255, 0, 0.4)',
      boxShadow: '0 0 30px rgba(210, 255, 0, 0.15)',
    }}>
      <p style={{
        font: "700 11px 'DM Mono', monospace",
        color: '#d2ff00',
        letterSpacing: '0.14em',
        marginBottom: '6px',
        textTransform: 'uppercase'
      }}>
        SCAN TO TAKE THE LEAD
      </p>

      <h2 style={{
        font: "800 28px 'Space Grotesk', sans-serif",
        color: '#fff',
        margin: '0 0 14px 0',
        letterSpacing: '0.04em'
      }}>
        ROOM {roomCode}
      </h2>

      <div style={{
        background: '#d2ff00',
        padding: '12px',
        borderRadius: '16px',
        display: 'inline-block',
        boxShadow: '0 12px 28px rgba(0,0,0,0.5)',
        marginBottom: '16px'
      }}>
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt={`QR Code to join room ${roomCode}`}
            style={{ width: '220px', height: '220px', display: 'block', borderRadius: '8px' }}
          />
        ) : (
          <div style={{ width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ font: "700 12px 'DM Mono', monospace", color: '#09090e' }}>GENERATING QR...</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={copyToClipboard}
          className="magnetic"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '12px',
            color: '#fcfbf6',
            font: "700 12px 'DM Mono', monospace",
            padding: '10px 14px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {copied ? '✓ COPIED JOIN LINK' : '🔗 COPY JOIN LINK'}
        </button>
        <small style={{ font: "500 11px 'DM Mono', monospace", color: '#aaa5b5' }}>
          Point phone camera • Instant 1-tap join
        </small>
      </div>
    </div>
  );
}
