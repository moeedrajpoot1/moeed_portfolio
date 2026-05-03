import React, { memo, useCallback } from 'react';
import SectionReveal from './SectionReveal.jsx';

const BRIEF =
  'Greetings. I am Muhammad Moeed, a backend and artificial intelligence engineer. I build production grade systems with Django and Fast A P I, deployed on A W S and Azure, and powered by Lang Chain and the Open A I SDK.';

function AboutImpl({ speak, speaking }) {
  const onListen = useCallback(() => speak(BRIEF), [speak]);
  return (
    <section id="about" className="section about">
      <SectionReveal>
        <div className="section-head fade-up">
          <span className="section-num">01</span>
          <h2 className="section-title">About</h2>
          <button className={`speak-btn ${speaking ? 'active' : ''}`} onClick={onListen}>
            ▶ Listen
          </button>
        </div>

        <div className="about-grid">
          <div className="terminal fade-up">
            <div className="terminal-bar">
              <span></span>
              <span></span>
              <span></span> moeed@core ~ %
            </div>
            <div className="terminal-body">
              <p>
                <span className="prompt">$</span> whoami
              </p>
              <p className="out">moeed — software engineer × AI engineer</p>
              <p>
                <span className="prompt">$</span> cat mission.txt
              </p>
              <p className="out">
                Designing scalable backends that ship real AI to production.
                <br />
                Specializing in Django, FastAPI, and LLM-powered services.
              </p>
              <p>
                <span className="prompt">$</span> stack --top
              </p>
              <p className="out">
                Python · Django · FastAPI · LangChain · OpenAI SDK · AWS · Azure
              </p>
              <p>
                <span className="prompt">$</span> status
              </p>
              <p className="out blink">Available for new projects_</p>
            </div>
          </div>

          <div className="about-cards">
            <div className="info-card fade-up">
              <div className="ic-icon">⚙</div>
              <h3>BACKEND</h3>
              <p>
                Django and FastAPI services built for scale: clean APIs, async pipelines, and
                rock-solid data layers.
              </p>
            </div>
            <div className="info-card fade-up">
              <div className="ic-icon">🧠</div>
              <h3>AI / LLM</h3>
              <p>
                LangChain agents, RAG pipelines, and OpenAI / Anthropic SDKs wired into production
                workflows.
              </p>
            </div>
            <div className="info-card fade-up">
              <div className="ic-icon">☁</div>
              <h3>CLOUD</h3>
              <p>
                Deployed and operated on AWS and Azure — containerized, monitored, and CI/CD-driven
                from day one.
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

export default memo(AboutImpl);
