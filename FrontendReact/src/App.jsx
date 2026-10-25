import React, { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard';
import PressureMeter from './components/PressureMeter';
import MomentumTracker from './components/MomentumTracker';
import AICommentary from './components/AICommentary';
import CatchUp60s from './components/CatchUp60s';
import DreamTeamRescue from './components/DreamTeamRescue';
import LieDetector from './components/LieDetector';

import { fetchMatchState, fetchLiveBall } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('pressure');

  const [matchState, setMatchState] = useState({
    team1: 'INDIA',
    team2: 'NEW ZEALAND',
    score1: '0/0',
    score2: '184/8',
    overs1: '0.0',
    overs2: '20.0',
    target: 185,
    crr: 0,
    rrr: 9.25,
    winProb: 50,
    striker: 'Hardik',
    nonStriker: 'Jadeja',
    bowler: 'Southee'
  });

  const [currentTension, setCurrentTension] = useState(50);
  const [backendStatus, setBackendStatus] = useState('connecting');

  useEffect(() => {
    loadMatchState();
  }, []);

  useEffect(() => {
    const interval = setInterval(loadLiveBall, 5000);
    return () => clearInterval(interval);
  }, []);

  async function loadMatchState() {
    try {
      const state = await fetchMatchState();
      setMatchState(prev => ({
        ...prev,
        team1: state.team1 || 'INDIA',
        team2: state.team2 || 'NEW ZEALAND',
        score1: (state.currentScore ?? 0) + '/' + (state.wickets ?? 0),
        score2: '184/8',
        overs1: state.currentOver ? state.currentOver.toFixed(1) : '0.0',
        overs2: '20.0',
        target: state.target || 185,
        crr: state.crr ? state.crr.toFixed(2) : '0.00',
        rrr: state.rrr ? state.rrr.toFixed(2) : '9.25',
        winProb: Math.max(5, Math.min(95, 100 - (state.currentPressure || 50))),
        striker: state.striker || prev.striker,
        nonStriker: state.nonStriker || prev.nonStriker,
        bowler: state.currentBowler || prev.bowler
      }));
      setCurrentTension(state.currentPressure || 50);
      setBackendStatus('connected');
    } catch (err) {
      console.warn('Backend not reachable:', err.message);
      setBackendStatus('error');
    }
  }

  async function loadLiveBall() {
    try {
      const data = await fetchLiveBall();
      if (data && data.ball) {
        setCurrentTension(data.tension || 50);
        setMatchState(prev => {
          const newStriker = data.ball.batsman || prev.striker;
          let newNonStriker = prev.nonStriker;
          if (!data.ball.isWicket && newStriker !== prev.striker) {
            newNonStriker = prev.striker;
          }
          return {
            ...prev,
            score1: data.ball.totalScore + '/' + data.ball.wickets,
            overs1: data.ball.over ? data.ball.over.toFixed(1) : prev.overs1,
            crr: data.ball.crr ? data.ball.crr.toFixed(2) : prev.crr,
            rrr: data.ball.rrr ? data.ball.rrr.toFixed(2) : prev.rrr,
            winProb: Math.max(5, Math.min(95, 100 - (data.tension || 50))),
            striker: newStriker,
            nonStriker: newNonStriker,
            bowler: data.ball.bowler || prev.bowler
          };
        });
      }
      setBackendStatus('connected');
    } catch (err) {
      setBackendStatus('error');
    }
  }

  const TABS = [
    { id: 'pressure',   label: 'Pressure-O-Meter', icon: '?' },
    { id: 'momentum',   label: 'Momentum Tracker',  icon: '??' },
    { id: 'commentary', label: 'AI Commentary',     icon: '???' },
    { id: 'catchup',    label: 'Catch-Up in 60s',   icon: '??' },
    { id: 'rescue',     label: 'Dream Team Rescue',  icon: '???' },
    { id: 'factcheck',  label: 'Lie Detector',       icon: '??' }
  ];

  return (
    <div className="app-wrapper">
      <header className="navbar">
        <div className="container">
          <div className="navbar-inner">
            <div className="brand">
              <div className="brand-badge">??</div>
              <div className="brand-text">
                <h1>DREAM11 FAN COMMAND CENTER</h1>
                <span>AI-Powered Live Match Intelligence</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '20px',
                background: backendStatus === 'connected' ? 'rgba(0,232,122,0.15)' : backendStatus === 'error' ? 'rgba(255,79,106,0.15)' : 'rgba(245,166,35,0.15)',
                color: backendStatus === 'connected' ? '#00e87a' : backendStatus === 'error' ? '#ff4f6a' : '#f5a623',
                border: '1px solid currentColor'
              }}>
                {backendStatus === 'connected' ? '?? Backend Live' : backendStatus === 'error' ? '?? Backend Offline' : '?? Connecting...'}
              </span>

              <div className="live-pill">
                <span className="live-dot"></span>
                LIVE MATCH
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <Scoreboard matchState={matchState} />

        <nav className="nav-tabs-wrapper">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <main className="content-section">
          {activeTab === 'pressure'   && <PressureMeter tension={currentTension} />}
          {activeTab === 'momentum'   && <MomentumTracker />}
          {activeTab === 'commentary' && (
            <AICommentary
              striker={matchState.striker}
              nonStriker={matchState.nonStriker}
              bowler={matchState.bowler}
              currentOver={matchState.overs1}
            />
          )}
          {activeTab === 'catchup'    && <CatchUp60s />}
          {activeTab === 'rescue'     && <DreamTeamRescue />}
          {activeTab === 'factcheck'  && <LieDetector />}
        </main>
      </div>
    </div>
  );
}
