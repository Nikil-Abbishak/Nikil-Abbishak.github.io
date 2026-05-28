import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const scrollY = window.scrollY + 200;
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(link.id);
          return;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          nikil<span className="logo-dot">.</span>
        </a>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>
          Let's Talk
        </a>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-label="Mobile navigation">
        {links.map((link, i) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="mobile-link"
            style={{ transitionDelay: `${0.05 + i * 0.06}s` }}
            onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
