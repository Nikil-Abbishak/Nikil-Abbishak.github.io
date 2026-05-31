import { useRef, useState, useCallback, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/Projects.css';

const projects = [
  {
    num: '01',
    title: 'SDGP-Project-V2',
    desc: '2nd Year Software Dev Group Project Version 2.',
    stack: ['Dart'],
    github: 'https://github.com/BinuraBimsara/SDGP-Project-V2',
    live: '#',
    year: '2024',
    role: 'Full Stack',
    accent: 'var(--accent)',
    accent2: 'var(--accent-warm)',
  },
  {
    num: '02',
    title: 'Life-on-land Web Dev',
    desc: 'Non-server webpage using HTML, CSS and JavaScript.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Nikil-Abbishak/Life-on-land---Web-Development-project',
    live: '#',
    year: '2023',
    role: 'Frontend',
    accent: 'var(--accent-warm)',
    accent2: 'var(--accent)',
  },
  {
    num: '03',
    title: 'Task Scheduler',
    desc: 'Everyday task scheduler built with Python and Tkinter.',
    stack: ['Python', 'Tkinter'],
    github: 'https://github.com/Nikil-Abbishak/Task-Scheduler-using-Tkinter',
    live: '#',
    year: '2023',
    role: 'Backend',
    accent: 'var(--accent)',
    accent2: 'var(--accent-warm)',
  },
  {
    num: '04',
    title: 'SmartCampus REST',
    desc: 'JAX-RS backend for a Smart Campus initiative at Westminster.',
    stack: ['Java', 'JAX-RS', 'REST'],
    github: 'https://github.com/Nikil-Abbishak/5COSC022W-SmartCampus-REST-service',
    live: '#',
    year: '2023',
    role: 'Backend',
    accent: 'var(--accent-warm)',
    accent2: 'var(--accent)',
  },
  {
    num: '05',
    title: 'Portfolio Sample',
    desc: 'Creative personal portfolio site.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Nikil-Abbishak/Portfolioo-SAMPLE',
    live: 'https://nikil-abbishak.github.io/Portfolioo-SAMPLE/',
    year: '2024',
    role: 'Frontend',
    accent: 'var(--accent)',
    accent2: 'var(--accent-warm)',
  },
  {
    num: '06',
    title: 'DecodeLabs AI',
    desc: 'Deterministic "White Box" chatbot using an IPO model.',
    stack: ['Python'],
    github: 'https://github.com/Nikil-Abbishak/DecodeLabs-AI-Project1',
    live: '#',
    year: '2024',
    role: 'AI / Backend',
    accent: 'var(--accent-warm)',
    accent2: 'var(--accent)',
  }
];

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

/* ── Desktop row component (unchanged) ── */
const ProjectRow = ({ project, index }) => {
  const rowRef = useRef(null);
  const handleMove = (e) => {
    const row = rowRef.current;
    if (!row) return;
    const rect = row.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    row.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
    row.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
    row.style.setProperty('--tilt-x', `${((0.5 - py) * 6).toFixed(2)}deg`);
    row.style.setProperty('--tilt-y', `${((px - 0.5) * 6).toFixed(2)}deg`);
  };
  const handleLeave = () => {
    const row = rowRef.current;
    if (!row) return;
    row.style.setProperty('--tilt-x', '0deg');
    row.style.setProperty('--tilt-y', '0deg');
  };
  return (
    <div
      ref={rowRef}
      className={`project-row reveal ${index % 2 ? 'reverse slide-right' : 'slide-left'}`}
      style={{ 
        '--accent': project.accent, 
        '--accent-2': project.accent2,
        transitionDelay: `${index * 0.1}s`
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="project-media">
        <div className="project-media-inner">
          <span className="project-num">{project.num}</span>
          <span className="project-media-title">{project.title}</span>
        </div>
      </div>
      <div className="project-info">
        <div className="project-meta">
          <span className="project-meta-item">{project.year}</span>
          <span className="project-meta-item">{project.role}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-stack">
          {project.stack.map((tech) => (
            <span className="project-tag" key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.live} className="project-link" target="_blank" rel="noopener noreferrer">
            <span>Case Study</span><ArrowIcon />
          </a>
          <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
            <span>Source</span><ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Mobile file-stack ── */
function MobileFileStack() {
  const [isExpanded, setIsExpanded]   = useState(false);  // click-to-expand list view
  const [activeCard, setActiveCard]   = useState(null);   // detail overlay
  const [isVisible, setIsVisible]     = useState(false);  // overlay open state
  const deckRef                       = useRef(null);

  /* ── Click/tap on the deck to expand ── */
  const onDeckClick = useCallback(() => {
    if (!isExpanded) setIsExpanded(true);
  }, [isExpanded]);

  /* ── Open detail overlay ── */
  const openCard = useCallback((project, e) => {
    e.stopPropagation();
    setActiveCard(project);
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  /* ── Close detail overlay ── */
  const closeCard = useCallback((e) => {
    e?.stopPropagation();
    setIsVisible(false);
    setTimeout(() => setActiveCard(null), 420);
  }, []);

  /* ── Collapse list back to stack ── */
  const collapseList = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <div className="mobile-file-stack">

      {/* ── Stacked deck (default view) ── */}
      {!isExpanded && (
        <div
          ref={deckRef}
          className="file-deck"
          onClick={onDeckClick}
          role="button"
          aria-label="Click to view all projects"
        >
          {/* Render in reverse so first card is on top */}
          {[...projects].reverse().map((p, revIdx) => {
            const realIdx = projects.length - 1 - revIdx;
            const stackPos = realIdx; // 0 = top card
            return (
              <div
                key={p.num}
                className="file-stack-card"
                style={{
                  '--stack-i': stackPos,
                  zIndex: projects.length - stackPos,
                }}
              >
                {/* Only top card shows full content */}
                {stackPos === 0 && (
                  <>
                    <div className="fsc-top-row">
                      <span className="fsc-num">{p.num}</span>
                      <span className="fsc-role">{p.role}</span>
                      <span className="fsc-year">{p.year}</span>
                    </div>
                    <h3 className="fsc-title">{p.title}</h3>
                    <p className="fsc-desc">{p.desc}</p>
                    <div className="fsc-tags">
                      {p.stack.map(t => <span className="fsc-tag" key={t}>{t}</span>)}
                    </div>
                    <button
                      className="fsc-open-btn"
                      onClick={(e) => openCard(p, e)}
                    >
                      View Project <ArrowIcon />
                    </button>
                  </>
                )}
                {/* Cards underneath show peek strip */}
                {stackPos > 0 && (
                  <div className="fsc-peek">
                    <span className="fsc-peek-num">{p.num}</span>
                    <span className="fsc-peek-title">{p.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Hint when stacked ── */}
      {!isExpanded && (
        <p className="file-hint">Tap to view all projects</p>
      )}

      {/* ── Expanded list view ── */}
      {isExpanded && (
        <div className="file-list">
          <div className="file-list-header">
            <span className="file-list-title">All Projects</span>
            <button className="file-list-close" onClick={collapseList} aria-label="Collapse">✕</button>
          </div>

          {projects.map((p, i) => (
            <button
              key={p.num}
              className="file-list-item"
              style={{
                '--accent': p.accent,
                '--accent-2': p.accent2,
                '--delay': `${i * 0.07}s`,
              }}
              onClick={(e) => openCard(p, e)}
            >
              <div className="fli-left">
                <span className="fli-num">{p.num}</span>
                <div className="fli-info">
                  <span className="fli-title">{p.title}</span>
                  <span className="fli-sub">{p.role} · {p.year}</span>
                </div>
              </div>
              <div className="fli-right">
                <div className="fli-tags">
                  {p.stack.slice(0, 2).map(t => <span className="fli-tag" key={t}>{t}</span>)}
                </div>
                <span className="fli-arrow"><ArrowIcon /></span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Detail overlay ── */}
      {activeCard && (
        <div
          className={`file-overlay ${isVisible ? 'file-overlay--open' : ''}`}
          onClick={closeCard}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="file-overlay-card"
            style={{ '--accent': activeCard.accent, '--accent-2': activeCard.accent2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="file-overlay-close" onClick={closeCard}>✕</button>

            <div className="fo-header">
              <span className="fo-num">{activeCard.num}</span>
              <span className="fo-role">{activeCard.role} · {activeCard.year}</span>
            </div>

            <h3 className="fo-title">{activeCard.title}</h3>
            <p className="fo-desc">{activeCard.desc}</p>

            <div className="fo-tags">
              {activeCard.stack.map(t => <span className="fsc-tag" key={t}>{t}</span>)}
            </div>

            <div className="fo-links">
              <a href={activeCard.live} className="fo-link" target="_blank" rel="noopener noreferrer">
                Case Study <ArrowIcon />
              </a>
              <a href={activeCard.github} className="fo-link" target="_blank" rel="noopener noreferrer">
                Source <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section projects" id="projects" ref={sectionRef}>
      <div className="section-header reveal slide-left">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Selected work that blends polish, depth, and business impact.</p>
      </div>

      {/* Desktop layout */}
      <div className="projects-list projects-list--desktop">
        {projects.map((project, i) => (
          <ProjectRow key={project.num} project={project} index={i} />
        ))}
      </div>

      {/* Mobile layout */}
      <div className="projects-list--mobile">
        <MobileFileStack />
      </div>
    </section>
  );
}
