import React, { memo, useCallback } from 'react';
import SectionReveal from './SectionReveal.jsx';
import { SKILL_GROUPS } from '../data/projects.js';

const BRIEF =
  'My core technical expertise spans backend development, artificial intelligence, and cloud infrastructure. The tools I use every day to ship production systems.';

function SkillsImpl({ speak, speaking }) {
  const onListen = useCallback(() => speak(BRIEF), [speak]);
  return (
    <section id="skills" className="section skills">
      <SectionReveal>
        <div className="section-head fade-up">
          <span className="section-num">02</span>
          <h2 className="section-title">Expertise</h2>
          <button className={`speak-btn ${speaking ? 'active' : ''}`} onClick={onListen}>
            ▶ Listen
          </button>
        </div>

        <div className="skill-groups">
          {SKILL_GROUPS.map((g) => (
            <div key={g.name} className="skill-group fade-up">
              <h3>{g.name}</h3>
              <div className="chips">
                {g.items.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

export default memo(SkillsImpl);
