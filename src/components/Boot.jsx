import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const FOCUS = ['Python', 'Django', 'FastAPI', 'AWS', 'Azure', 'LangChain', 'OpenAI SDK'];

const META = [
  { k: 'Status', v: 'Available for hire', accent: true },
  { k: 'Experience', v: '5+ years' },
  { k: 'Based', v: 'Remote · Worldwide' },
  { k: 'Focus', v: 'Backend · AI · Cloud' },
];

export default function Boot({ onEnter }) {
  const [hidden, setHidden] = useState(false);
  const [voice, setVoice] = useState(true);
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', clearProps: 'transform,opacity,scale' },
    });
    tl.from(el.querySelector('.intro-greet'), { y: 10, opacity: 0, duration: 0.4 })
      .from(
        el.querySelector('.intro-name'),
        { y: 50, opacity: 0, scale: 0.97, duration: 0.7 },
        '-=0.2',
      )
      .from(el.querySelector('.intro-role'), { y: 12, opacity: 0, duration: 0.45 }, '-=0.4')
      .from(el.querySelector('.intro-bio'), { y: 12, opacity: 0, duration: 0.45 }, '-=0.3')
      .from(
        el.querySelectorAll('.focus-chip'),
        { y: 10, opacity: 0, duration: 0.35, stagger: 0.04 },
        '-=0.3',
      )
      .from(el.querySelector('.deck'), { x: 30, opacity: 0, duration: 0.55 }, '-=0.6')
      .from(
        el.querySelectorAll('.deck-row'),
        { x: 14, opacity: 0, duration: 0.3, stagger: 0.06 },
        '-=0.4',
      )
      .from(el.querySelector('.deck-cta'), { y: 14, opacity: 0, duration: 0.4 }, '-=0.2')
      .from(el.querySelector('.deck-foot'), { y: 8, opacity: 0, duration: 0.35 }, '-=0.2');
    return () => {
      tl.progress(1).kill();
    };
  }, []);

  const handleEnter = () => {
    setHidden(true);
    setTimeout(() => onEnter(voice), 460);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voice]);

  return (
    <div ref={rootRef} className={`intro ${hidden ? 'hidden' : ''}`}>
      <div className="intro-grid" />
      <div className="intro-glow" />

      <div className="intro-corner tl" />
      <div className="intro-corner tr" />
      <div className="intro-corner bl" />
      <div className="intro-corner br" />

      <div className="intro-shell">
        {/* LEFT — IDENTITY */}
        <div className="intro-id">
          <div className="intro-greet">Hello, I'm</div>

          <h1 className="intro-name" data-text="MOEED">
            MOEED
          </h1>
          <div className="intro-role">Backend &amp; AI Engineer</div>

          <p className="intro-bio">
            Five years shipping production systems — Django and FastAPI services on AWS and Azure,
            with LangChain and the OpenAI SDK powering the AI layer. I build end-to-end, from the
            data model to the deployment.
          </p>

          <div className="focus-row">
            {FOCUS.map((f) => (
              <span key={f} className="focus-chip">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — PROFILE PANEL */}
        <aside className="deck">
          <div className="deck-header">
            <span className="deck-dot" />
            <span>Profile</span>
          </div>

          <ul className="deck-list">
            {META.map((m) => (
              <li className="deck-row" key={m.k}>
                <span className="dr-k">{m.k}</span>
                <span className={`dr-v ${m.accent ? 'accent' : ''}`}>{m.v}</span>
              </li>
            ))}
          </ul>

          <button className="deck-cta" onClick={handleEnter} aria-label="Enter portfolio">
            <span className="cta-label">Enter Portfolio</span>
            <span className="cta-arrow">→</span>
          </button>

          <label className="voice-toggle deck-foot">
            <input type="checkbox" checked={voice} onChange={(e) => setVoice(e.target.checked)} />
            <span className="vt-box" />
            <span>Enable robotic voice narration</span>
          </label>
        </aside>
      </div>

      <div className="intro-foot">
        <span>© 2026 Muhammad Moeed</span>
        <span className="intro-foot-mid">Press Enter to continue</span>
      </div>
    </div>
  );
}
