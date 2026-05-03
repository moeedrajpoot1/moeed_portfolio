import { useCallback, useEffect, useRef, useState } from 'react';

const isClient = typeof window !== 'undefined' && 'speechSynthesis' in window;

let cachedVoices = null;
function loadVoices() {
  return new Promise((resolve) => {
    if (!isClient) return resolve([]);
    if (cachedVoices) return resolve(cachedVoices);
    const v = window.speechSynthesis.getVoices();
    if (v && v.length) {
      cachedVoices = v;
      return resolve(v);
    }
    window.speechSynthesis.addEventListener(
      'voiceschanged',
      () => {
        cachedVoices = window.speechSynthesis.getVoices();
        resolve(cachedVoices);
      },
      { once: true },
    );
  });
}

function pickRoboticVoice(voices) {
  if (!voices || !voices.length) return null;
  const preferred = [
    /Daniel/i,
    /Google UK English Male/i,
    /Microsoft Mark/i,
    /Microsoft David/i,
    /Alex/i,
    /Fred/i,
    /Ralph/i,
    /Bruce/i,
    /Jorge/i,
    /Trinoids/i,
    /Zarvox/i,
    /Cellos/i,
  ];
  for (const re of preferred) {
    const v = voices.find((x) => re.test(x.name));
    if (v) return v;
  }
  return voices.find((v) => /en[-_]/i.test(v.lang)) || voices[0];
}

export function useRoboVoice() {
  const [enabled, setEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef(null);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    if (!isClient) return;
    loadVoices().then((vs) => {
      voiceRef.current = pickRoboticVoice(vs);
    });
    return () => {
      if (isClient) window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text) => {
    if (!isClient || !enabledRef.current || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = 0.92;
    u.pitch = 0.35;
    u.volume = 1;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }, []);

  const stop = useCallback(() => {
    if (!isClient) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((e) => {
      const next = !e;
      if (!next && isClient) window.speechSynthesis.cancel();
      return next;
    });
  }, []);

  return { speak, stop, toggle, setEnabled, enabled, speaking };
}
