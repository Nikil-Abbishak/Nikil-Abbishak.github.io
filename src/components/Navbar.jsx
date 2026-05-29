import { useState, useEffect } from 'react';
import useMagnetic from '../hooks/useMagnetic';
import '../styles/Navbar.css';

const links = [
  { id: 'hero', number: '01', label: 'Home' },
  { id: 'about', number: '02', label: 'Real Me' },
  { id: 'projects', number: '03', label: 'Portfolio' },
  { id: 'experience', number: '04', label: 'Resume' },
  { id: 'skills', number: '05', label: 'Skills' },
  { id: 'contact', number: '06', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const magneticRef = useMagnetic(0.3);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.body.dataset.menuOpen = menuOpen ? 'true' : 'false';

    return () => {
      document.body.style.overflow = '';
      delete document.body.dataset.menuOpen;
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-35% 0px -55% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      <div className="nav-top-bar">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          nikil<span className="logo-dot">.</span>
        </a>
      </div>

      <button
        ref={magneticRef}
        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className="menu-lines">
          <span />
          <span />
          <span />
        </span>
        <span className="menu-label">{menuOpen ? 'Close' : 'Menu'}</span>
      </button>

      <div className={`full-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="full-menu-bg" aria-hidden="true" />
        <div className="full-menu-inner">
          <ul className="full-menu-links">
            {links.map((link, i) => (
              <li key={link.id} className="full-menu-item" style={{ transitionDelay: `${0.1 + i * 0.08}s` }}>
                <a
                  href={`#${link.id}`}
                  className={`full-menu-link group ${activeId === link.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                >
                  <span className="full-menu-number">{link.number}</span>
                  <span className="full-menu-label">
                    {link.label}
                    <span className="full-menu-underline"></span>
                  </span>
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="full-menu-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </li>
            ))}
          </ul>

          <div className="full-menu-footer">
            <span className="full-menu-signature">Nikil Abbishak</span>
          </div>
        </div>
      </div>
    </>
  );
}
