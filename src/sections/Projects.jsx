import { useRef } from 'react';
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
    desc: 'Created a non-server sided webpage using HTML, CSS and JavaScript.',
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
    title: 'Task Scheduler Tkinter',
    desc: 'A small everyday task scheduler using python.',
    stack: ['Python', 'Tkinter'],
    github: 'https://github.com/Nikil-Abbishak/Task-Scheduler-using-Tkinter',
    live: '#',
    year: '2023',
    role: 'Backend',
    accent: 'rgba(var(--accent-rgb), 0.85)',
    accent2: 'rgba(var(--accent-warm-rgb), 0.85)',
  },
  {
    num: '04',
    title: 'SmartCampus REST service',
    desc: 'A pure JAX-RS backend architecture for a Smart Campus initiative at the University of Westminster.',
    stack: ['Java', 'JAX-RS', 'REST'],
    github: 'https://github.com/Nikil-Abbishak/5COSC022W-SmartCampus-REST-service',
    live: '#',
    year: '2023',
    role: 'Backend',
    accent: 'var(--accent)',
    accent2: 'var(--accent-warm)',
  },
  {
    num: '05',
    title: 'Portfolioo-SAMPLE',
    desc: 'Creative Portfolio site.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Nikil-Abbishak/Portfolioo-SAMPLE',
    live: 'https://nikil-abbishak.github.io/Portfolioo-SAMPLE/',
    year: '2024',
    role: 'Frontend',
    accent: 'var(--accent-warm)',
    accent2: 'var(--accent)',
  },
  {
    num: '06',
    title: 'DecodeLabs-AI-Project1',
    desc: 'Deterministic "White Box" chatbot built for the DecodeLabs Industrial Training Kit. Implements an IPO model.',
    stack: ['Python'],
    github: 'https://github.com/Nikil-Abbishak/DecodeLabs-AI-Project1',
    live: '#',
    year: '2024',
    role: 'AI / Backend',
    accent: 'rgba(var(--accent-rgb), 0.85)',
    accent2: 'rgba(var(--accent-warm-rgb), 0.85)',
  }
];

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const ProjectRow = ({ project, index }) => {
  const rowRef = useRef(null);

  const handleMove = (e) => {
    const row = rowRef.current;
    if (!row) return;
    const rect = row.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
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
      className={`project-row reveal ${index % 2 ? 'reverse' : ''}`}
      style={{ '--accent': project.accent, '--accent-2': project.accent2 }}
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
          <span>Case Study</span>
          <ArrowIcon />
        </a>
        <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
          <span>Source</span>
          <ArrowIcon />
        </a>
      </div>
    </div>
    </div>
  );
};

export default function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section projects" id="projects" ref={sectionRef}>
      <div className="section-header reveal slide-left">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Selected work that blends polish, depth, and business impact.</p>
      </div>

      <div className="projects-list">
        {projects.map((project, i) => (
          <ProjectRow key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
