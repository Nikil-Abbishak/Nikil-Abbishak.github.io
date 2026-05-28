import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        background: 'var(--gradient-1)', zIndex: 10000,
        width: `${width}%`, borderRadius: '0 2px 2px 0',
        transition: 'width 0.1s linear',
      }}
      role="progressbar"
      aria-label="Page scroll progress"
    />
  );
}
