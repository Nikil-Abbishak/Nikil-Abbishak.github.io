import { useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import useMagnetic from '../hooks/useMagnetic';
import '../styles/Hero.css';

const profileImageSrc = '/profile.png';

const splitText = (text, className) => (
  <span className={className} aria-label={text}>
    {text.split('').map((char, index) => (
      <span key={`${char}-${index}`} className="char" style={{ '--i': index }} aria-hidden="true">
        {char}
      </span>
    ))}
  </span>
);

export default function Hero() {
  const sectionRef = useScrollReveal();
  const [photoUrl, setPhotoUrl] = useState(null);
  const primaryCtaRef = useMagnetic(0.22);
  const secondaryCtaRef = useMagnetic(0.18);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = 'high';

    img.onload = () => {
      if (!cancelled) {
        setPhotoUrl(profileImageSrc);
      }
    };

    img.onerror = () => {
      if (!cancelled) {
        setPhotoUrl(profileImageSrc);
      }
    };

    img.src = profileImageSrc;

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-shell">
        <div className="hero-left">
          <div className="hero-kicker reveal slide-left">
            <span className="eyebrow">Creative Developer</span>
            <span className="hero-kicker-dot" />
            <span className="hero-kicker-meta">CS Undergrad</span>
          </div>

          <h1 className="hero-title">
            {splitText('Nikil', 'hero-title-line')}
            {splitText('Abbishak', 'hero-title-line accent')}
          </h1>

          <p className="hero-subtitle reveal soft">
            Full-stack developer crafting cinematic web experiences, scalable products, and human-centered interfaces.
          </p>

          <div className="hero-ctas reveal soft">
            <a ref={primaryCtaRef} className="btn btn-primary" href="#projects">
              View Work
            </a>
            <a ref={secondaryCtaRef} className="btn btn-outline" href="#contact">
              Start a Project
            </a>
          </div>

          <div className="hero-meta reveal">
            <div className="hero-meta-item">
              <span className="meta-label">Focus</span>
              <span className="meta-value">Fullstack + ML</span>
            </div>
            <div className="hero-meta-item">
              <span className="meta-label">Experience</span>
              <span className="meta-value">1 Year</span>
            </div>
            <div className="hero-meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-value">Sri Lanka</span>
            </div>
          </div>

          <div className="hero-socials reveal soft" aria-label="Social links">
            <a href="https://github.com/Nikil-Abbishak" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:email@example.com" aria-label="Email">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-portrait">
            {photoUrl ? (
              <img src={photoUrl} alt="Nikil Abbishak" loading="eager" decoding="async" fetchPriority="high" />
            ) : (
              <div className="hero-portrait-placeholder">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hero-rail" aria-hidden="true">
        <span className="hero-rail-text">Scroll</span>
        <span className="hero-rail-line" />
      </div>

      <div className="hero-marquee-container">
        <div className="hero-marquee">
          <div className="hero-marquee-content">
            {[
              'React',
              'Next.js',
              'Node.js',
              'TypeScript',
              'TailwindCSS',
              'Python',
              'Java',
              'Flutter',
              'React',
              'Next.js',
              'Node.js',
              'TypeScript',
              'TailwindCSS',
              'Python',
              'Java',
              'Flutter',
            ].map((tech, idx) => (
              <div key={idx} className="marquee-item">
                <span className="marquee-dot"></span>
                <span className="marquee-text">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
