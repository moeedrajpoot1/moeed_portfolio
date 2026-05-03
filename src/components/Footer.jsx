import React from 'react';
import { config, gmailComposeUrl } from '../config.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="foot-cta">
        <div>
          <h4>Have a project in mind?</h4>
          <p>Backends, AI integrations, or both — let's build it.</p>
        </div>
        <a className="btn primary" href="#contact">
          Start a conversation →
        </a>
      </div>

      <div className="foot-bar">
        <div className="foot-left">
          <span className="foot-name">MOEED</span>
          <span className="foot-sep">·</span>
          <span>Backend &amp; AI Engineer</span>
        </div>

        <div className="foot-right">
          <a
            href={gmailComposeUrl(config.contactEmail)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            Email
          </a>
          <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            GitHub
          </a>
          <a
            href={config.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="foot-meta">© {year} Muhammad Moeed</div>
    </footer>
  );
}
