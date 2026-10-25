import React, { useState, useEffect } from 'react';
import { fetchCommentary } from '../services/api';


export default function AICommentary({ striker, nonStriker, bowler, currentOver }) {
  const PERSONAS = [
    { id: 'harsha',   name: 'The Poet',      icon: '???', desc: 'Harsha Bhogle lyrical & philosophical style' },
    { id: 'sidhu',    name: 'Sidhu Shayari', icon: '??', desc: 'High-octane rhyming punchlines & metaphors' },
    { id: 'genz',     name: 'Gen-Z Meme',    icon: '?', desc: 'Peak cinema, no cap, unhinged streamer energy' },
    { id: 'tactical', name: 'Coach Analyst', icon: '??', desc: 'Seam movement, field placements & data analysis' }
  ];

  const currentStriker = striker || 'Hardik';
  const currentNonStriker = nonStriker || 'Jadeja';
  const currentBowler = bowler || 'Southee';

  const [selectedPersona, setSelectedPersona] = useState('harsha');
  const [commentary, setCommentary] = useState(
    `Over ${currentOver || '18.1'}: ${currentStriker} faces ${currentBowler} with ${currentNonStriker} at the non-striker end. Click "Generate Commentary" for live AI analysis.`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceUri, setSelectedVoiceUri] = useState('');

  useEffect(() => {
    function loadVoices() {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      }
    }
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);
    try {
      const text = await fetchCommentary(selectedPersona);
      setCommentary(text);
    } catch (err) {
      console.warn('Commentary fetch failed, using fallback:', err.message);
      setError('Backend offline ? using demo fallback');
      const fallbacks = {
        harsha:   `The ball sails into the twilight sky off ${currentStriker}'s willow against ${currentBowler} ? a moment of pure, unadulterated poetry!`,
        sidhu:    `Chhakka! ${currentStriker} ne ${currentBowler} ki aisi waat lagayi ki ball ko passport banana pad gaya boundary cross karne ke liye, guru!`,
        genz:     `Bro ${currentStriker} literally pressed ALT+F4 on ${currentBowler}'s bowling. Zero mercy. Peak cricket fr fr ????`,
        tactical: `The high seam delivery by ${currentBowler} failed to grip. ${currentStriker} anticipated the shorter length early while ${currentNonStriker} called for the run.`
      };
      setCommentary(fallbacks[selectedPersona] || fallbacks.harsha);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSpeak() {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support speech synthesis.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(commentary);

    const personaAudioProfiles = {
      harsha:   { pitch: 0.95, rate: 0.90 },
      sidhu:    { pitch: 1.25, rate: 1.15 },
      genz:     { pitch: 1.10, rate: 1.25 },
      tactical: { pitch: 0.85, rate: 0.95 }
    };

    const profile = personaAudioProfiles[selectedPersona] || personaAudioProfiles.harsha;
    utterance.pitch = profile.pitch;
    utterance.rate  = profile.rate;

    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
    if (selectedVoiceUri) {
      const chosen = voices.find(v => v.voiceURI === selectedVoiceUri);
      if (chosen) utterance.voice = chosen;
    } else {
      const indianVoice = voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN' || v.name.includes('India'));
      const naturalVoice = voices.find(v => v.name.includes('Natural') || v.name.includes('Online'));
      const englishVoice = voices.find(v => v.lang.startsWith('en'));
      utterance.voice = indianVoice || naturalVoice || englishVoice || voices[0];
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function handleCopy() {
    navigator.clipboard.writeText(commentary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <div className="feature-header">
        <div className="feature-title">
          <h2>??? Multi-Persona AI Commentary</h2>
          <p>Live delivery commentary powered by Spring Boot backend ? 4 voice personas with audio speech synthesis</p>
        </div>
      </div>

      <div className="glass-card">

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '13px'
        }}>
          <div>
            <span style={{ color: '#8b9db5' }}>?? Batting: </span>
            <strong style={{ color: '#00e87a' }}>{currentStriker}*</strong>
            <span style={{ color: '#00e87a', fontSize: '11px', marginLeft: '3px' }}>(Striker)</span>
            <span style={{ color: '#8b9db5' }}> ? </span>
            <strong style={{ color: '#e2e8f0' }}>{currentNonStriker}</strong>
            <span style={{ color: '#8b9db5', fontSize: '11px', marginLeft: '3px' }}>(Non-Striker)</span>
          </div>
          <div>
            <span style={{ color: '#8b9db5' }}>?? Bowler: </span>
            <strong style={{ color: '#3b9eff' }}>{currentBowler}</strong>
          </div>
        </div>

        <div className="card-heading">1. Select Commentator Persona</div>
        <div className="card-subheading">Sent as <code>?persona={selectedPersona}</code> to Spring Boot CommentaryService</div>

        <div className="personas-grid">
          {PERSONAS.map(p => (
            <div
              key={p.id}
              className={`persona-pill ${selectedPersona === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPersona(p.id)}
            >
              <div className="persona-icon">{p.icon}</div>
              <div className="persona-title">{p.name}</div>
              <div className="persona-subtitle">{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          <button className="btn btn-primary" onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? '? Fetching from Backend...' : '? Generate Commentary'}
          </button>

          <button
            className={`btn ${isSpeaking ? 'btn-primary' : 'btn-secondary'}`}
            onClick={handleSpeak}
          >
            {isSpeaking ? '?? Stop Audio' : '?? Listen Live (Voice)'}
          </button>

          {availableVoices.length > 0 && (
            <select
              value={selectedVoiceUri}
              onChange={e => setSelectedVoiceUri(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#e2e8f0',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            >
              <option value="">Default Voice (Auto)</option>
              {availableVoices
                .filter(v => v.lang.startsWith('en') || v.lang.startsWith('hi'))
                .slice(0, 10)
                .map(v => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
            </select>
          )}
        </div>

        {error && (
          <div style={{ fontSize: '12px', color: '#f5a623', marginBottom: '12px' }}>
            ?? {error}
          </div>
        )}

        <div className="ai-output-box">
          <div className="ai-output-tag">
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isSpeaking ? '#00e87a' : '#38bdf8',
              display: 'inline-block',
              marginRight: '6px'
            }}></span>
            AI Commentary ? {PERSONAS.find(p => p.id === selectedPersona)?.name}
          </div>
          <p className="ai-output-text">"{commentary}"</p>

          <div style={{ marginTop: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
              {copied ? '? Copied!' : '?? Copy Text'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleGenerate}>
              ?? Regenerate
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleSpeak}>
              {isSpeaking ? '?? Stop' : '?? Play Voice'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
