import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/Hero.css';

export default function Hero() {
  const sectionRef = useScrollReveal();
  const photoRef = useRef(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  // Check if profile photo exists (supports multiple formats)
  useEffect(() => {
    const extensions = ['jpg', 'png', 'webp', 'jpeg'];
    let resolved = false;

    extensions.forEach(ext => {
      const src = `./profile.${ext}`;
      const img = new Image();
      img.onload = () => {
        if (!resolved) {
          resolved = true;
          setPhotoUrl(src);
        }
      };
      img.src = src;
    });
  }, []);

  // Parallax float on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (photoRef.current) {
        const y = window.scrollY * 0.08;
        photoRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-grid">
        <div className="hero-text">
          <p className="hero-greeting reveal">Hi, I'm</p>
          <h1 className="hero-name">
            <span className="hero-name-line reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="gradient-text">Nikil</span>
            </span>
            <span className="hero-name-line reveal" style={{ transitionDelay: '0.2s' }}>
              Abbishak<span className="hero-name-dot">.</span>
            </span>
          </h1>
          <p className="hero-role reveal" style={{ transitionDelay: '0.35s' }}>
            Fullstack Developer — building performant apps with React, Flutter, Java & Python.
          </p>
          <div className="hero-actions reveal" style={{ transitionDelay: '0.5s' }}>
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              View Projects <span className="btn-arrow">→</span>
            </a>
            <a
              href="#contact"
              className="btn btn-outline"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="hero-photo-wrapper reveal" style={{ transitionDelay: '0.3s' }}>
          <div className="hero-photo-frame" ref={photoRef}>
            <div className="hero-photo-border" />
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Nikil Abbishak"
                className="hero-photo"
                loading="eager"
              />
            ) : (
              <div className="hero-photo-placeholder">
                <span>NA</span>
              </div>
            )}
          </div>
          <div className="hero-photo-glow" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-scroll-hint reveal" style={{ transitionDelay: '0.7s' }} aria-hidden="true">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
