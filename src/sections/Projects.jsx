import { useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/Projects.css';

const projects = [
  {
    num: '01',
    title: 'E-Commerce Platform',
    desc: 'A full-featured online store with cart management, payment integration, and real-time inventory tracking. Built for scale with a clean component architecture.',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: '#',
    live: '#',
  },
  {
    num: '02',
    title: 'Real-Time Chat App',
    desc: 'Cross-platform messenger with end-to-end encryption, media sharing, and real-time presence indicators. Built with Flutter for native-quality performance on both platforms.',
    stack: ['Flutter', 'Firebase', 'Dart', 'WebSocket'],
    github: '#',
    live: '#',
  },
  {
    num: '03',
    title: 'Analytics Dashboard',
    desc: 'Interactive analytics platform with real-time data visualization, custom reports, and automated insights. Processes large datasets with responsive charting.',
    stack: ['Python', 'React', 'PostgreSQL', 'D3.js'],
    github: '#',
    live: '#',
  },
];

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, background: '' });
  const [transformStyle, setTransformStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation is 12 degrees
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransformStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none',
    });

    setGlareStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)`,
      transition: 'none',
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
    });
    setGlareStyle({
      opacity: 0,
      background: '',
      transition: 'opacity 0.6s ease',
    });
  };

  return (
    <div 
      className="project-card-wrapper reveal" 
      style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
    >
      <div
        className="project-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={transformStyle}
      >
        <div className="card-glare" style={glareStyle}></div>
        <div className="card-content">
          <div className="project-num">{project.num}</div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.desc}</p>
          <div className="project-stack">
            {project.stack.map((tech) => (
              <span className="project-tag" key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-links">
            <a href={project.github} className="project-link" aria-label="View source code" target="_blank" rel="noopener noreferrer">
              <span>Code</span>
              <ArrowIcon />
            </a>
            <a href={project.live} className="project-link" aria-label="View live demo" target="_blank" rel="noopener noreferrer">
              <span>Live</span>
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <div className="section-header reveal">
        <h2 className="section-title">
          <span className="reveal-mask"><span className="text-inner">Projects</span></span>
        </h2>
        <p className="section-subtitle">Selected work that I'm proud of.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
