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

export default function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <div className="section-header reveal">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Selected work that I'm proud of.</p>
      </div>

      <div className="projects-list">
        {projects.map((project, i) => (
          <div
            className="project-row reveal"
            key={project.num}
            style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
          >
            <div className="project-num">{project.num}</div>
            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span className="project-tag" key={tech}>{tech}</span>
                ))}
              </div>
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
        ))}
      </div>
    </section>
  );
}
