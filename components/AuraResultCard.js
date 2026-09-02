// components/AuraResultCard.js
'use client';

const MEMBERSHIP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScdpwK6YjFtwWux8XXBr7tJRYrIlJSdsTNbfT3mahZShdCxHQ/viewform';

export function AuraResultCard({ score, rank, totalPlayers, name, avatar }) {
  const getPersona = (auraScore) => {
    if (auraScore >= 2000) return { title: 'TIER 9: CERTIFIED MENACE', emoji: '👑', desc: 'God-tier campus reflexes & sheer confidence.' };
    if (auraScore >= 1400) return { title: 'TIER 7: TECH PRODIGY', emoji: '⚡', desc: 'Unshakable speed and tactical clutch under pressure.' };
    if (auraScore >= 800) return { title: 'TIER 5: CAMPUS SURVIVOR', emoji: '🔥', desc: 'Solid problem solving and decent stamina.' };
    return { title: 'TIER 2: NPC RECOVERY', emoji: '🌱', desc: 'Warmup completed. Time to lock in with LearnIT!' };
  };

  const persona = getPersona(score);

  return (
    <div className="arcade-panel" style={{
      maxWidth: '440px',
      width: '100%',
      margin: '0 auto',
      padding: '26px 20px',
      borderRadius: '24px',
      border: '2px solid rgba(210, 255, 0, 0.4)',
      boxShadow: '0 0 30px rgba(210, 255, 0, 0.15)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <span style={{ fontSize: '48px', display: 'block' }}>{avatar}</span>

      <div>
        <p style={{ font: "700 11px 'DM Mono', monospace", color: '#ff55d7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
          {persona.title}
        </p>
        <h2 style={{ font: "800 28px 'Space Grotesk', sans-serif", color: '#fff', margin: 0, textTransform: 'uppercase' }}>
          {name}
        </h2>
        <span style={{ font: "800 32px 'DM Mono', monospace", color: '#d2ff00', display: 'block', marginTop: '4px' }}>
          {score.toLocaleString()} <small style={{ fontSize: '13px', color: '#aaa5b5' }}>AURA</small>
        </span>
      </div>

      <div style={{
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        font: "700 12px 'DM Mono', monospace"
      }}>
        <span style={{ color: '#aaa5b5' }}>SQUAD RANK</span>
        <span style={{ color: '#d2ff00' }}>#{rank} OF {totalPlayers}</span>
      </div>

      <p style={{ font: "500 12px 'Space Grotesk', sans-serif", color: '#c0b7cc', margin: 0, fontStyle: 'italic' }}>
        "{persona.desc}"
      </p>

      {/* LearnIT Club Membership CTA */}
      <div style={{
        padding: '18px',
        borderRadius: '16px',
        border: '2px solid #00f0ff',
        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.12) 0%, rgba(129, 90, 255, 0.18) 100%)',
        textAlign: 'left'
      }}>
        <p style={{ font: "700 10px 'DM Mono', monospace", color: '#00f0ff', letterSpacing: '0.12em', marginBottom: '4px' }}>
          ✦ JOIN LEARNIT CLUB
        </p>
        <p style={{ font: "700 13px 'Space Grotesk', sans-serif", color: '#fff', margin: '0 0 12px 0' }}>
          "Join our club for more fun experiences, hackathons and tech events!"
        </p>
        <a
          href={MEMBERSHIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            minHeight: '48px',
            padding: '12px 16px',
            background: '#00f0ff',
            color: '#09090e',
            borderRadius: '12px',
            textDecoration: 'none',
            font: "800 12.5px 'Space Grotesk', sans-serif",
            lineHeight: 1.3,
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.35), 3px 3px 0 #815aff',
            transition: 'all 0.18s ease'
          }}
        >
          <span>🚀 REGISTER (GOOGLE FORM)</span>
          <span style={{ fontSize: '15px', fontWeight: 800 }}>→</span>
        </a>
      </div>
    </div>
  );
}
