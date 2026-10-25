import React, { useState } from 'react';
import { fetchLiveBall } from '../services/api';


export default function PressureMeter({ tension }) {
  const [pressure, setPressure] = useState(tension || 50);
  const [statusText, setStatusText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [moments, setMoments] = useState([
    { over: 'Over 17.2', desc: 'Hardik caught on boundary! Need 25 off 16', spike: '+18 📈', type: 'high' },
    { over: 'Over 15.4', desc: 'Boult bowls 4 dot balls in a row to Rahul', spike: '+12 ⚠️', type: 'mid' },
    { over: 'Over 12.1', desc: 'Southee removes Rohit for 78 — stadium stunned', spike: '+24 💥', type: 'high' },
    { over: 'Over 6.2',  desc: 'Santner drops Kohli on 14 — massive reprieve', spike: '-9 📉', type: 'low' }
  ]);

  const maxStroke = 251.2;
  const strokeOffset = maxStroke - (pressure / 100) * maxStroke;
  const needleRotation = -90 + (pressure / 100) * 180;

  const getStatus = (val) => {
    if (val < 35) return { label: '🟢 CALM & STEADY',    color: '#00e87a' };
    if (val < 65) return { label: '🟡 TENSION BUILDING', color: '#f5a623' };
    if (val < 85) return { label: '🟠 HIGH TENSION',      color: '#ff764f' };
    return           { label: '🔴 CRITICAL CHAOS',       color: '#ff4f6a' };
  };
  const status = getStatus(pressure);

  async function handleSimulateBall() {
    setIsLoading(true);
    try {
      const data = await fetchLiveBall();
      const newTension = data.tension || 50;
      setPressure(newTension);
      setStatusText(data.tensionStatus || '');

      const b = data.ball;
      const desc = b.isWicket
        ? `WICKET! ${b.batsman} dismissed by ${b.bowler}! (${b.runs} runs)`
        : b.runs === 6
        ? `SIX! ${b.batsman} smashes ${b.bowler} into the stands!`
        : b.runs === 4
        ? `FOUR! Pierces the gap off ${b.bowler}!`
        : b.runs === 0
        ? `Dot ball! ${b.bowler} bowls tight to ${b.batsman}`
        : `${b.runs} run(s) taken by ${b.batsman}`;

      const spikeLabel = b.isWicket ? '+18 💥' : b.runs >= 4 ? '-10 📉' : '+4 📈';
      const spikeType  = b.isWicket ? 'high'   : b.runs >= 4 ? 'low'   : 'mid';

      setMoments(prev => [
        { over: `Over ${b.over.toFixed(1)}`, desc, spike: spikeLabel, type: spikeType },
        ...prev.slice(0, 5)
      ]);
    } catch (err) {
      console.warn('Simulation failed, using local tension:', err.message);
      const randomTension = Math.floor(Math.random() * 40) + 50;
      setPressure(randomTension);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="feature-header">
        <div className="feature-title">
          <h2>⚡ Pressure-O-Meter</h2>
          <p>Real-time match tension computed by Java TensionService • Updates on every delivery</p>
        </div>
        <button className="btn btn-primary" onClick={handleSimulateBall} disabled={isLoading}>
          {isLoading ? '⏳ Simulating...' : '⚡ Simulate Next Ball'}
        </button>
      </div>

      <div className="grid-two-col">
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div className="card-heading">Live Match Tension Index</div>
          <div className="card-subheading">
            {statusText ? `Backend Status: ${statusText}` : 'Computed from RRR, wickets, dot balls & over'}
          </div>

          <div className="gauge-box">
            <svg viewBox="0 0 200 120" className="gauge-svg">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#00e87a" />
                  <stop offset="50%"  stopColor="#f5a623" />
                  <stop offset="80%"  stopColor="#ff764f" />
                  <stop offset="100%" stopColor="#ff4f6a" />
                </linearGradient>
              </defs>
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={strokeOffset}
                style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              <g
                style={{
                  transform: `rotate(${needleRotation}deg)`,
                  transformOrigin: '100px 100px',
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <line x1="100" y1="100" x2="100" y2="28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <circle cx="100" cy="100" r="7"  fill="#ffffff" />
                <circle cx="100" cy="100" r="3"  fill="#060a12" />
              </g>
            </svg>

            <div className="pressure-score">{pressure}</div>
            <div className="pressure-status" style={{ color: status.color }}>
              {status.label}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
            <span className="chip chip-green">🟢 Calm 0-35</span>
            <span className="chip chip-yellow">🟡 Tense 35-65</span>
            <span className="chip chip-red">🔴 Critical 65-100</span>
          </div>
        </div>

        <div className="glass-card">
          <div className="card-heading">📋 Live Delivery Feed</div>
          <div className="card-subheading">Ball events fetched from backend — each ball updates tension</div>
          <div className="spike-cards-list">
            {moments.map((m, idx) => (
              <div key={idx} className="spike-card">
                <div>
                  <div className="spike-over">{m.over}</div>
                  <div className="spike-text">{m.desc}</div>
                </div>
                <span className={`chip ${m.type === 'high' ? 'chip-red' : m.type === 'mid' ? 'chip-yellow' : 'chip-green'}`}>
                  {m.spike}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
