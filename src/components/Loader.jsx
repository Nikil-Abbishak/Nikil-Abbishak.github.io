import { useState, useEffect } from 'react';
import '../styles/Loader.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 12 + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setExiting(true), 300);
          setTimeout(() => onComplete?.(), 1000);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loader ${exiting ? 'exit' : ''}`} role="status" aria-label="Loading">
      <div className="loader-inner">
        <img src="/signature.png?v=2" alt="Signature" className="loader-signature" />
        <div className="loader-subtitle">Initializing experience</div>
        <div className="loader-line-track">
          <div className="loader-line" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="loader-percent">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
