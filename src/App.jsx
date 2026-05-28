import { useState, useCallback, useEffect } from 'react';
import SplashCursor from './components/SplashCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import NoiseOverlay from './components/NoiseOverlay';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import './styles/Footer.css';

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-copy">
          © 2026 <span className="accent">Nikil Abbishak</span>
        </div>
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          Back to top
        </button>
      </div>
    </footer>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => setLoaded(true), []);

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

      <SplashCursor />
      <ScrollProgress />
      <NoiseOverlay />
      <Navbar />

      {/* Atmospheric background */}
      <div className="bg-shape bg-shape-1" aria-hidden="true" />
      <div className="bg-shape bg-shape-2" aria-hidden="true" />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
