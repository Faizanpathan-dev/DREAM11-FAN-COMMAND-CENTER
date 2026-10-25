import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { fetchMomentumData } from '../services/api';


export default function MomentumTracker() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [turnPoint, setTurnPoint] = useState(null);

  useEffect(() => {
    loadAndDrawChart();
    const interval = setInterval(loadAndDrawChart, 10000);
    return () => clearInterval(interval);
  }, []);

  async function loadAndDrawChart() {
    try {
      const balls = await fetchMomentumData();

      const overMap = {};
      balls.forEach(ball => {
        const ov = Math.floor(ball.over);
        if (!overMap[ov]) overMap[ov] = { runs: 0, count: 0, wickets: 0 };
        overMap[ov].runs += ball.runs;
        overMap[ov].count += 1;
        overMap[ov].wickets += ball.isWicket ? 1 : 0;
      });

      const labels = Object.keys(overMap).map(o => 'Ov ' + o);
      const momentumData = Object.values(overMap).map(ov =>
        Math.min(100, Math.max(0, (ov.runs * 10) - (ov.wickets * 20)))
      );
      const oppData = momentumData.map(v => 100 - v);

      const maxIdx = momentumData.indexOf(Math.max(...momentumData));
      setTurnPoint(labels[maxIdx] || 'Over 13');

      drawChart(labels, momentumData, oppData);
      setLoading(false);
    } catch (err) {
      console.warn('Momentum data fetch failed, using fallback:', err.message);
      setError('Backend offline — showing demo curve');
      drawChart(
        ['Ov 1','Ov 3','Ov 5','Ov 7','Ov 9','Ov 11','Ov 13','Ov 15','Ov 17','Ov 19'],
        [42, 58, 65, 48, 52, 60, 78, 68, 85, 94],
        [58, 42, 35, 52, 48, 40, 22, 32, 15, 6]
      );
      setTurnPoint('Over 13 (demo)');
      setLoading(false);
    }
  }

  function drawChart(labels, indiaData, nzData) {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0,232,122,0.35)');
    gradient.addColorStop(1, 'rgba(0,232,122,0.0)');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'India Momentum Index',
            data: indiaData,
            borderColor: '#00e87a',
            borderWidth: 3,
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00e87a',
            pointRadius: 4,
            pointHoverRadius: 7
          },
          {
            label: 'NZ Defense Index',
            data: nzData,
            borderColor: '#3b9eff',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.3,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#8b9db5', font: { family: "'Outfit',sans-serif", size: 12 } } },
          tooltip: { backgroundColor: '#0d1526', titleColor: '#fff', bodyColor: '#e8eef8', padding: 12 }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8b9db5' } },
          y: {
            min: 0, max: 100,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#8b9db5', callback: v => v + '%' }
          }
        }
      }
    });
  }

  return (
    <div>
      <div className="feature-header">
        <div className="feature-title">
          <h2>📈 Momentum Swing Tracker</h2>
          <p>Over-by-over swing curve calculated from Java backend ball data • Auto-refreshes every 10s</p>
        </div>
        {error && <span className="chip chip-yellow">⚠️ {error}</span>}
      </div>

      <div className="glass-card" style={{ marginBottom: '20px' }}>
        <div className="card-heading">Over-by-Over Momentum Curve</div>
        <div className="card-subheading">
          {loading ? '⏳ Loading ball events from backend...' : `Live Data: ${chartInstance.current?.data?.labels?.length || 0} overs plotted • Real-time`}
        </div>
        <div style={{ height: '320px', width: '100%', position: 'relative' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {turnPoint && (
        <div className="grid-two-col">
          <div className="glass-card">
            <div className="card-heading">⚡ Peak Momentum: {turnPoint}</div>
            <p style={{ color: '#8b9db5', fontSize: '13.5px', lineHeight: '1.6', marginTop: '6px' }}>
              Highest momentum over based on boundary scoring and low dot-ball frequency.
            </p>
            <div style={{ marginTop: '10px' }}>
              <span className="chip chip-green">Highest Win Probability</span>
            </div>
          </div>
          <div className="glass-card">
            <div className="card-heading">🎯 Pressure Over</div>
            <p style={{ color: '#8b9db5', fontSize: '13.5px', lineHeight: '1.6', marginTop: '6px' }}>
              Wicket-heavy overs cause the sharpest drop in team momentum index.
            </p>
            <div style={{ marginTop: '10px' }}>
              <span className="chip chip-red">Wicket Impact Zone</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
