import React from 'react';

export default function Nav({ voiceEnabled, onToggleVoice }) {
  return (
    <header className="nav">
      <div className="nav-brand">
        <span className="dot"></span>
        <span>MUHAMMAD MOEED</span>
      </div>
      <nav className="nav-links">
        <a href="#hero">HOME</a>
        <a href="#about">ABOUT</a>
        <a href="#skills">SKILLS</a>
        <a href="#projects">PROJECTS</a>
        <a href="#contact">CONTACT</a>
      </nav>
      <button className="mute-btn" onClick={onToggleVoice} aria-label="Toggle voice">
        {voiceEnabled ? '🔊 VOICE ON' : '🔇 VOICE OFF'}
      </button>
    </header>
  );
}
