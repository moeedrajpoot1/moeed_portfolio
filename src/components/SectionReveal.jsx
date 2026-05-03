import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SectionReveal({ children, className = '', selector = '.fade-up' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observed = new WeakSet();
    const revealed = new WeakSet();

    const reveal = (target, delay = 0) => {
      if (!target || revealed.has(target)) return;
      revealed.add(target);
      gsap.to(target, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay,
        ease: 'power3.out',
        clearProps: 'transform',
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    );

    const consider = (target) => {
      if (observed.has(target) || revealed.has(target)) return;
      observed.add(target);
      const r = target.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        reveal(target);
      } else {
        io.observe(target);
      }
    };

    // Initial pass
    el.querySelectorAll(selector).forEach(consider);

    // Watch for newly-added .fade-up nodes (HMR, dynamic data, late-loading sections)
    const mo = new MutationObserver(() => {
      el.querySelectorAll(selector).forEach(consider);
    });
    mo.observe(el, { childList: true, subtree: true });

    // Hard safety: anything still hidden after 4s gets force-revealed.
    const safety = setTimeout(() => {
      el.querySelectorAll(selector).forEach((t) => reveal(t));
    }, 4000);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(safety);
    };
  }, [selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
