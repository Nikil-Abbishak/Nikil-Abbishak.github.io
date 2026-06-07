import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/Experience.css';

const timeline = [
  {
    date: 'Jan 2025 — Present',
    title: 'Computer Science Undergraduate',
    org: 'University',
    desc: 'Pursuing a degree in Computer Science, focusing on core programming concepts and software development.',
  },
  {
    date: 'Jul 2024 — Mar 2025',
    title: 'Process Associate',
    org: 'Hcltech',
    desc: 'Handled various operational processes, ensuring efficiency and quality.',
  },
];

export default function Experience() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section experience" id="experience" ref={sectionRef}>
      <div className="section-header reveal slide-left">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">Milestones that shaped my craft and mindset.</p>
      </div>

      <div className="experience-track">
        {timeline.map((item, i) => (
          <article
            className="experience-card reveal"
            key={item.title}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="experience-date">{item.date}</div>
            <h3 className="experience-title">{item.title}</h3>
            <div className="experience-org">{item.org}</div>
            <p className="experience-desc">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
