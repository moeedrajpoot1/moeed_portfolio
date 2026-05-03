import React, { useEffect, useState } from 'react';
import Boot from './components/Boot.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import SafeScene from './components/SafeScene.jsx';
import { useRoboVoice } from './hooks/useRoboVoice.js';

export default function App() {
  const [booted, setBooted] = useState(false);
  const { speak, toggle, setEnabled, enabled, speaking } = useRoboVoice();

  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => {
      if (enabled)
        speak(
          'System online. Welcome to the portfolio of Muhammad Moeed. Backend and A I engineer. Specialized in Django, Fast A P I, A W S, Azure, and Lang Chain.',
        );
    }, 500);
    return () => clearTimeout(t);
  }, [booted, speak, enabled]);

  const handleEnter = (voiceOn) => {
    if (typeof setEnabled === 'function') setEnabled(voiceOn);
    setBooted(true);
  };

  return (
    <>
      {!booted && <Boot onEnter={handleEnter} />}

      {booted && <SafeScene />}
      <div className="scanlines" />
      <div className="vignette" />

      {booted && (
        <>
          <Nav voiceEnabled={enabled} onToggleVoice={toggle} />
          <main>
            <Hero />
            <About speak={speak} speaking={speaking} />
            <Skills speak={speak} speaking={speaking} />
            <Projects speak={speak} speaking={speaking} />
            <Contact speak={speak} speaking={speaking} />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
