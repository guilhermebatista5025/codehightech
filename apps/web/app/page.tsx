"use client";

import { useRouter } from 'next/navigation';
import { Terminal, Code2, Database, Lock, Play, Zap } from 'lucide-react';

const stacks = [
  {
    id: 'node',
    title: 'Node.js & TypeScript',
    description: 'Construa APIs robustas, lide com banco de dados e domine o ecossistema JavaScript no backend.',
    icon: Terminal,
    unlocked: true,
    accent: '#0ea5e9',
    delay: '0ms',
  },
  {
    id: 'python',
    title: 'Python & Django',
    description: 'Aprenda a stack preferida para Data Science e desenvolvimento web ágil.',
    icon: Code2,
    unlocked: false,
    accent: '#6366f1',
    delay: '100ms',
  },
  {
    id: 'java',
    title: 'Java & Spring Boot',
    description: 'A arquitetura corporativa definitiva. Prepare-se para microsserviços e sistemas bancários.',
    icon: Database,
    unlocked: false,
    accent: '#f59e0b',
    delay: '200ms',
  }
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');

        .landing-root {
          min-height: 100vh;
          width: 100%;
          background: #060b14;
          font-family: 'Outfit', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          position: relative;
          overflow: hidden;
        }

        .orb-1 {
          position: fixed;
          top: -10%;
          left: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .orb-2 {
          position: fixed;
          bottom: -10%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .landing-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1100px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(14,165,233,0.12);
          border: 1px solid rgba(14,165,233,0.35);
          color: #38bdf8;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 36px;
          animation: fadeUp 0.6s ease both;
        }

        .hero-title {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 900;
          color: #f8fafc;
          text-align: center;
          line-height: 1.1;
          margin-bottom: 20px;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        .hero-gradient-text {
          background: linear-gradient(135deg, #38bdf8, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-desc {
          font-size: 17px;
          color: #64748b;
          text-align: center;
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 64px;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          width: 100%;
          animation: fadeUp 0.6s 0.3s ease both;
        }

        .lang-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 32px;
          border-radius: 20px;
          backdrop-filter: blur(20px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }

        .lang-card.unlocked {
          cursor: pointer;
          background: rgba(14, 30, 55, 0.7);
          border: 1px solid rgba(14,165,233,0.3);
          box-shadow: 0 4px 40px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .lang-card.unlocked:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 60px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .lang-card.locked {
          cursor: not-allowed;
          background: rgba(15,23,42,0.4);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .card-inner-glow {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(circle at 20% 20%, rgba(14,165,233,0.15), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .lang-card.unlocked:hover .card-inner-glow {
          opacity: 1;
        }

        .card-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: #fff;
          transition: transform 0.3s;
        }

        .lang-card.unlocked:hover .card-icon {
          transform: scale(1.12);
        }

        .lock-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 4px 10px;
          border-radius: 999px;
        }

        .card-title {
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .card-desc {
          font-size: 14px;
          line-height: 1.65;
          flex: 1;
          margin-bottom: 28px;
        }

        .btn-start {
          width: 100%;
          padding: 14px 0;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          color: #fff;
          transition: filter 0.2s, transform 0.2s;
        }

        .btn-start:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
        }

        .btn-locked {
          width: 100%;
          padding: 14px 0;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .footer-note {
          margin-top: 56px;
          font-size: 11px;
          color: #1e293b;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          animation: fadeUp 0.6s 0.4s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="landing-root">
        <div className="orb-1" />
        <div className="orb-2" />

        <div className="landing-inner">
          {/* Badge */}
          <div className="badge">
            <Zap size={13} /> CodeHighTech RPG v1.0 — Early Access
          </div>

          {/* Title */}
          <h1 className="hero-title">
            A Jornada do{' '}
            <span className="hero-gradient-text">Engenheiro Real</span>
          </h1>

          {/* Description */}
          <p className="hero-desc">
            Você foi contratado. Resolva bugs reais, enfrente o CTO, entregue PRs e suba de cargo
            dentro de um ambiente de dev completo no browser.
          </p>

          {/* Cards */}
          <div className="cards-grid">
            {stacks.map((stack) => {
              const Icon = stack.icon;
              return (
                <div
                  key={stack.id}
                  className={`lang-card ${stack.unlocked ? 'unlocked' : 'locked'}`}
                  onClick={() => stack.unlocked && router.push('/ide')}
                >
                  <div className="card-inner-glow" />

                  {!stack.unlocked && (
                    <div className="lock-badge">
                      <Lock size={10} /> Em Breve
                    </div>
                  )}

                  <div
                    className="card-icon"
                    style={{
                      background: `linear-gradient(135deg, ${stack.accent}, ${stack.accent}aa)`,
                      boxShadow: `0 4px 20px ${stack.accent}55`,
                    }}
                  >
                    <Icon size={26} />
                  </div>

                  <h3 className="card-title" style={{ color: stack.unlocked ? '#e2e8f0' : '#475569' }}>
                    {stack.title}
                  </h3>
                  <p className="card-desc" style={{ color: stack.unlocked ? '#64748b' : '#334155' }}>
                    {stack.description}
                  </p>

                  {stack.unlocked ? (
                    <button
                      className="btn-start"
                      style={{
                        background: `linear-gradient(135deg, ${stack.accent}, ${stack.accent}cc)`,
                        boxShadow: `0 4px 24px ${stack.accent}55`,
                      }}
                    >
                      <Play size={14} style={{ fill: 'currentColor' }} />
                      Iniciar Carreira
                    </button>
                  ) : (
                    <div className="btn-locked">Bloqueado</div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="footer-note">Mais linguagens chegando em breve · Vote no Discord</p>
        </div>
      </div>
    </>
  );
}
