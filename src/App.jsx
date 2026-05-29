import { useState, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import SplashCursor from './components/SplashCursor';
import MouseGlow from './components/MouseGlow';
import PhotoTheme from './components/PhotoTheme';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import NoiseOverlay from './components/NoiseOverlay';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import './styles/Footer.css';

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">nikil<span className="footer-dot">.</span></div>
          <p className="footer-tagline">Crafting cinematic web experiences and resilient products.</p>
          <div className="footer-meta">© 2026 Nikil Abbishak</div>
        </div>
        <div className="footer-actions">
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:email@example.com">Email</a>
          </div>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const bg1 = document.querySelector('.bg-shape-1');
    const bg2 = document.querySelector('.bg-shape-2');

    lenis.on('scroll', ({ scroll }) => {
      if (bg1) bg1.style.transform = `translateY(${scroll * 0.2}px)`;
      if (bg2) bg2.style.transform = `translateY(${scroll * -0.15}px)`;
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Konami Code Easter Egg
  useEffect(() => {
    const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let pos = 0;
    const handler = (e) => {
      if (e.keyCode === code[pos]) {
        pos++;
        if (pos === code.length) {
          document.body.style.transition = 'filter 1s ease';
          document.body.style.filter = 'hue-rotate(180deg)';
          setTimeout(() => (document.body.style.filter = ''), 3000);
          pos = 0;
        }
      } else pos = 0;
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaded} />}

      <PhotoTheme />
      <MouseGlow />
      <SplashCursor />
      <ScrollProgress />
      <NoiseOverlay />
      <Navbar />

      {/* Atmospheric background */}
      <div className="ambient-grid" aria-hidden="true" />
      <div className="bg-shape bg-shape-1" aria-hidden="true" />
      <div className="bg-shape bg-shape-2" aria-hidden="true" />

      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
