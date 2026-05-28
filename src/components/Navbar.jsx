import { useState, useEffect } from 'react';
import useMagnetic from '../hooks/useMagnetic';
import '../styles/Navbar.css';

const links = [
  { id: 'hero', number: '01', label: 'Home' },
  { id: 'about', number: '02', label: 'Real Me' },
  { id: 'projects', number: '03', label: 'Portfolio' },
  { id: 'experience', number: '04', label: 'Resume' },
  { id: 'contact', number: '05', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const magneticRef = useMagnetic(0.3);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <div className="nav-top-bar">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          nikil<span className="logo-dot">.</span>
        </a>
      </div>

      <button
        ref={magneticRef}
        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <div className={`full-menu ${menuOpen ? 'open' : ''}`} role="dialog">
        <div className="full-menu-inner">
          <ul className="full-menu-links">
            {links.map((link, i) => (
              <li key={link.id} className="full-menu-item" style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
                <a
                  href={`#${link.id}`}
                  className="full-menu-link group"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
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
            <span>Nikil Abbishak</span>
            <div className="full-menu-socials">
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:email@example.com">Email</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
