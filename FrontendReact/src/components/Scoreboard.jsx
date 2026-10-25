import React from 'react';


export default function Scoreboard({ matchState }) {
  const {
    team1, team2, score1, score2, overs1, overs2, target, rrr, crr, winProb,
    striker, nonStriker, bowler
  } = matchState;

  return (
    <div className="scoreboard-stage">
      <div className="match-grid">

        <div className="team-card">
          <div className="team-name" style={{ color: '#00e87a' }}>
            <span>????</span> {team1}
          </div>
          <div className="team-score">{score1}</div>
          <div className="team-overs">{overs1} overs ? Target: {target}</div>
          <div className="stat-pills-row">
            <div className="stat-pill">
              <span>CRR</span>
              <strong>{crr}</strong>
            </div>
            <div className="stat-pill">
              <span>RRR</span>
              <strong style={{ color: '#ff4f6a' }}>{rrr}</strong>
            </div>
          </div>
        </div>


        <div className="match-center">
          <span className="match-venue">T20 World Cup ? Wankhede</span>
          <div className="win-bar-track">
            <div className="win-bar-fill" style={{ width: `${winProb}%` }} />
          </div>
          <div className="win-bar-meta">
            <span className="p1">{team1}: {winProb}%</span>
            <span className="p2">{team2}: {100 - winProb}%</span>
          </div>
        </div>


        <div className="team-card right">
          <div className="team-name" style={{ color: '#3b9eff' }}>
            {team2} <span>????</span>
          </div>
          <div className="team-score">{score2}</div>
          <div className="team-overs">{overs2} overs ? Innings complete</div>
          <div className="stat-pills-row">
            <div className="stat-pill">
              <span>Defending</span>
              <strong>{target}</strong>
            </div>
          </div>
        </div>
      </div>


      <div className="crease-live-bar">
        <div className="crease-group">
          <span className="crease-label">?? BATTING:</span>


          <div className="batter-pill on-strike" title="Striker (Facing delivery)">
            <span>??</span>
            <strong>{striker || 'Hardik'}</strong>
            <span className="strike-star">*</span>
            <span className="crease-sub-badge">STRIKER</span>
          </div>


          <div className="batter-pill non-strike" title="Non-striker end">
            <span>??</span>
            <strong>{nonStriker || 'Jadeja'}</strong>
            <span className="crease-sub-badge">NON-STRIKER</span>
          </div>
        </div>

        <div className="crease-divider"></div>


        <div className="crease-group">
          <span className="crease-label">?? BOWLING:</span>
          <div className="bowler-pill" title="Current Bowler">
            <span>??</span>
            <strong>{bowler || 'Southee'}</strong>
            <span className="crease-sub-badge" style={{ background: 'rgba(59,158,255,0.2)', color: '#3b9eff' }}>BOWLER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
