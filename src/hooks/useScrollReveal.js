import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
      }
    );

    // Observe all children with the reveal class
    const revealEls = el.querySelectorAll('.reveal');
    revealEls.forEach((child) => observer.observe(child));

    // Also observe the element itself if it has a reveal class
    if (el.classList.contains('reveal')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}
