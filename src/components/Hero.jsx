import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Counter({ target, suffix = '', duration = 1.6 }) {
  const ref = useRef(null);
  useEffect(() => {
    const o = { v: 0 };
    const tween = gsap.to(o, {
      v: target,
      duration,
      delay: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.floor(o.v) + suffix;
      },
    });
    return () => tween.kill();
  }, [target, duration, suffix]);
  return <b ref={ref}>0{suffix}</b>;
}

export default function Hero() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', clearProps: 'transform,opacity' },
    });
    tl.from(tagRef.current, { y: 12, opacity: 0, duration: 0.5 })
      .from(titleRef.current, { y: 40, opacity: 0, duration: 0.8 }, '-=0.2')
      .from(subRef.current, { y: 18, opacity: 0, duration: 0.55 }, '-=0.4')
      .from(descRef.current, { y: 14, opacity: 0, duration: 0.55 }, '-=0.4')
      .from(
        ctaRef.current?.children || [],
        { y: 12, opacity: 0, duration: 0.4, stagger: 0.08 },
        '-=0.3',
      );

    return () => tl.kill();
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hud-corner tl"></div>
      <div className="hud-corner tr"></div>
      <div className="hud-corner bl"></div>
      <div className="hud-corner br"></div>

      <div className="hero-content">
        <div ref={tagRef} className="tag status-tag">
          <span className="status-dot" />
          AVAILABLE FOR NEW PROJECTS
        </div>
        <h1 ref={titleRef} className="title glitch" data-text="MOEED">
          MOEED
        </h1>
        <h2 ref={subRef} className="subtitle">
          BACKEND × AI ENGINEER
        </h2>
        <p ref={descRef} className="hero-desc">
          Django · FastAPI · AWS · Azure · LangChain · OpenAI SDK — production AI, end to end.
        </p>
        <div ref={ctaRef} className="hero-cta">
          <a href="#projects" className="btn primary">
            VIEW PROJECTS
          </a>
          <a href="#contact" className="btn">
            INITIATE CONTACT
          </a>
        </div>
        <div className="hero-stats">
          <div>
            <Counter target={40} suffix="+" />
            <span>PROJECTS</span>
          </div>
          <div>
            <Counter target={25} suffix="+" />
            <span>AI MODELS</span>
          </div>
          <div>
            <Counter target={5} suffix="+" />
            <span>YEARS</span>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">SCROLL ▼</div>
    </section>
  );
}
