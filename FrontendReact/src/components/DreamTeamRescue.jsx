import React, { useState, useEffect } from 'react';
import { fetchPlayers } from '../services/api';


export default function DreamTeamRescue() {
  const [squad,      setSquad]      = useState([]);
  const [captainId,  setCaptainId]  = useState(0);
  const [vcId,       setVcId]       = useState(1);
  const [analyzing,  setAnalyzing]  = useState(false);
  const [diagnosis,  setDiagnosis]  = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    try {
      const players = await fetchPlayers();
      setSquad(players);

      const cap = players.findIndex(p => p.isCaptain || p.recommendation === 'MAKE_CAPTAIN');
      const vc  = players.findIndex(p => p.isViceCaptain);
      if (cap !== -1) setCaptainId(cap);
      else if (players.length > 0) setCaptainId(0);

      if (vc !== -1 && vc !== cap) setVcId(vc);
      else if (players.length > 1) setVcId(1);

      setLoading(false);
    } catch (err) {
      console.warn('Players fetch failed, using fallback squad:', err.message);
      setError('Backend offline — showing demo squad');
      setSquad([
        { name: 'Rohit Sharma',      team: 'IND', role: 'BAT',  credits: 9.5, currentPoints: 112, projectedPoints: 140, recommendation: 'MAKE_CAPTAIN' },
        { name: 'Virat Kohli',       team: 'IND', role: 'BAT',  credits: 10.0, currentPoints: 94,  projectedPoints: 125, recommendation: 'SAFE_PICK' },
        { name: 'Suryakumar Yadav',  team: 'IND', role: 'BAT',  credits: 9.0, currentPoints: 85,  projectedPoints: 110, recommendation: 'SAFE_PICK' },
        { name: 'Hardik Pandya',     team: 'IND', role: 'AR',   credits: 9.0, currentPoints: 68,  projectedPoints: 90,  recommendation: 'SAFE_PICK' },
        { name: 'Rishabh Pant',      team: 'IND', role: 'WK',   credits: 8.5, currentPoints: 42,  projectedPoints: 55,  recommendation: 'RISKY' },
        { name: 'Jasprit Bumrah',    team: 'IND', role: 'BOWL', credits: 9.5, currentPoints: 88,  projectedPoints: 115, recommendation: 'SAFE_PICK' },
        { name: 'Trent Boult',       team: 'NZ',  role: 'BOWL', credits: 9.0, currentPoints: 64,  projectedPoints: 80,  recommendation: 'SAFE_PICK' },
        { name: 'Mitchell Santner',  team: 'NZ',  role: 'AR',   credits: 8.0, currentPoints: 52,  projectedPoints: 60,  recommendation: 'SAFE_PICK' },
        { name: 'Tim Southee',       team: 'NZ',  role: 'BOWL', credits: 8.5, currentPoints: 24,  projectedPoints: 30,  recommendation: 'RISKY' },
        { name: 'Devon Conway',      team: 'NZ',  role: 'BAT',  credits: 8.0, currentPoints: 35,  projectedPoints: 45,  recommendation: 'RISKY' },
        { name: 'Kane Williamson',   team: 'NZ',  role: 'BAT',  credits: 9.0, currentPoints: 58,  projectedPoints: 72,  recommendation: 'SAFE_PICK' }
      ]);
      setCaptainId(0);
      setVcId(1);
      setLoading(false);
    }
  }

  function calcProjectedTotal() {
    return squad.reduce((total, p, idx) => {
      const base = p.projectedPoints || p.currentPoints || 0;
      const mult = idx === captainId ? 2.0 : idx === vcId ? 1.5 : 1.0;
      return total + Math.floor(base * mult);
    }, 0);
  }

  function handleAnalyze() {
    if (!squad.length) return;
    setAnalyzing(true);
    setTimeout(() => {
      const sorted  = [...squad].map((p, idx) => ({ ...p, idx })).sort((a, b) => (b.projectedPoints || 0) - (a.projectedPoints || 0));
      const mvp     = sorted[0];
      const weakest = sorted[sorted.length - 1];
      const capPlayer = squad[captainId];

      setDiagnosis({
        mvp,
        weakest,
        capIsOptimal: capPlayer?.name === mvp.name,
        suggestedCap: mvp,
        swaps: [
          { drop: weakest.name, pick: 'Rinku Singh (Death Overs)', gain: '+26 projected pts' },
          { drop: sorted[sorted.length - 2].name, pick: 'Lockie Ferguson (Pace)', gain: '+18 projected pts' }
        ]
      });
      setAnalyzing(false);
    }, 700);
  }

  if (loading) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '14px', color: '#8b9db5' }}>
          ⏳ Loading player squad from backend (GET /api/match/players)...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="feature-header">
        <div className="feature-title">
          <h2>🛡️ Dream Team Rescue</h2>
          <p>Players loaded from Java backend • Toggle C (2x) & VC (1.5x) multipliers live</p>
        </div>
        {error && <span className="chip chip-yellow">⚠️ {error}</span>}
      </div>

      <div className="grid-two-col">
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <div className="card-heading">Your Fantasy XI</div>
              <div className="card-subheading" style={{ marginBottom: 0 }}>
                Click C (2x) or VC (1.5x) to optimize multipliers
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#8b9db5' }}>Projected Total</span>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#00e87a', fontFamily: 'var(--font-mono)' }}>
                {calcProjectedTotal()} pts
              </div>
            </div>
          </div>

          <div className="player-list-scroll">
            {squad.map((p, idx) => (
              <div key={idx} className="player-item-row">
                <div className="player-avatar-circle"
                  style={{ color: p.team === 'IND' ? '#00e87a' : '#3b9eff' }}>
                  {p.team === 'IND' ? '🇮🇳' : '🇳🇿'}
                </div>

                <div className="player-info-meta">
                  <div className="player-name-text">
                    {p.name}
                    {idx === captainId && <span className="badge-c">👑 C</span>}
                    {idx === vcId      && <span className="badge-vc">⭐ VC</span>}
                  </div>
                  <span className="player-role-badge">
                    {p.role} • {p.team} • {p.credits} cr
                    {p.recommendation === 'MAKE_CAPTAIN' && ' • 🎯 AI Captain Pick'}
                    {p.recommendation === 'RISKY'        && ' • ⚠️ High Risk'}
                  </span>
                </div>

                <div style={{ textAlign: 'right', marginRight: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', fontSize: '14px', color: '#00e87a' }}>
                    {p.currentPoints}
                  </div>
                  <div style={{ fontSize: '11px', color: '#8b9db5' }}>
                    {p.projectedPoints} proj
                  </div>
                </div>

                <div className="c-vc-toggle-btns">
                  <button
                    className={`toggle-btn ${idx === captainId ? 'active-c' : ''}`}
                    onClick={() => { setCaptainId(idx); if (vcId === idx) setVcId(captainId); }}
                  >C</button>
                  <button
                    className={`toggle-btn ${idx === vcId ? 'active-vc' : ''}`}
                    onClick={() => { setVcId(idx); if (captainId === idx) setCaptainId(vcId); }}
                  >VC</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="glass-card" style={{ marginBottom: '20px' }}>
            <div className="card-heading">🧠 AI Lineup Diagnosis</div>
            <div className="card-subheading">Uses backend projected points to diagnose risks & optimize multipliers</div>

            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={analyzing}
              style={{ width: '100%', marginBottom: '16px' }}
            >
              {analyzing ? '⏳ Analyzing Squad...' : '⚡ Analyze My Lineup'}
            </button>

            {diagnosis && (
              <div className="ai-output-box">
                <div className="ai-output-tag">📊 Lineup Health Report</div>
                <p style={{ fontSize: '13.5px', lineHeight: '1.65', marginTop: '6px' }}>
                  🏆 <strong>MVP:</strong> {diagnosis.mvp.name} with <strong>{diagnosis.mvp.projectedPoints} projected pts</strong> is carrying your team.<br /><br />
                  ⚠️ <strong>Liability:</strong> {diagnosis.weakest.name} with only <strong>{diagnosis.weakest.projectedPoints} projected pts</strong>.<br /><br />
                  {diagnosis.capIsOptimal
                    ? '✅ Your Captain pick is currently optimal for maximum points!'
                    : `🔄 Switch Captain to ${diagnosis.suggestedCap.name} for maximum 2x multiplier gain.`
                  }
                </p>
              </div>
            )}
          </div>

          {diagnosis && (
            <div className="glass-card">
              <div className="card-heading">💡 Differential Swaps</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                {diagnosis.swaps.map((s, i) => (
                  <div key={i} className="spike-card">
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700' }}>
                        Drop {s.drop} ➔ Pick {s.pick}
                      </div>
                      <span style={{ fontSize: '11px', color: '#00e87a', fontWeight: '700' }}>
                        {s.gain}
                      </span>
                    </div>
                    <span className="chip chip-green">Recommended</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
