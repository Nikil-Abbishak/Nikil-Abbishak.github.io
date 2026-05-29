import { useEffect } from 'react';

export default function MouseGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const handleMove = (e) => {
      root.style.setProperty('--mx', `${e.clientX}px`);
      root.style.setProperty('--my', `${e.clientY}px`);
    };
    const handleLeave = () => {
      root.style.setProperty('--mx', '50%');
      root.style.setProperty('--my', '10%');
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return <div className="mouse-glow" aria-hidden="true" />;
}
