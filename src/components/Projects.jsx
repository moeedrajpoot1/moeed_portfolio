import React, { memo, useCallback, useState } from 'react';
import SectionReveal from './SectionReveal.jsx';
import { PROJECTS } from '../data/projects.js';

const BRIEF =
  'Selected projects from production deployments. Click any project to hear a short audio brief about it.';

function ProjectsImpl({ speak, speaking }) {
  const [activeId, setActiveId] = useState(null);

  const playProject = useCallback(
    (p) => {
      setActiveId(p.id);
      speak(p.brief);
    },
    [speak],
  );

  const onSectionListen = useCallback(() => {
    setActiveId(null);
    speak(BRIEF);
  }, [speak]);

  return (
    <section id="projects" className="section projects">
      <SectionReveal>
        <div className="section-head fade-up">
          <span className="section-num">03</span>
          <h2 className="section-title">Selected Work</h2>
          <button
            className={`speak-btn ${speaking && !activeId ? 'active' : ''}`}
            onClick={onSectionListen}
          >
            ▶ Listen
          </button>
        </div>

        <div className="project-grid">
          {PROJECTS.map((p) => (
            <article key={p.id} className="project-card fade-up">
              <div className="pc-header">
                <span className="pc-id">{p.category}</span>
                <span className="pc-status">{p.year}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="pc-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <button
                className={`pc-play ${speaking && activeId === p.id ? 'active' : ''}`}
                onClick={() => playProject(p)}
              >
                ▶ Listen
              </button>
            </article>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

export default memo(ProjectsImpl);
