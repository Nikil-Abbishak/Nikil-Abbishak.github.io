import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/Experience.css';

const timeline = [
  {
    date: '2024 — Present',
    title: 'Fullstack Developer',
    org: 'Freelance & Personal Projects',
    desc: 'Building end-to-end applications — from responsive frontends to scalable backends. Working across diverse clients and technology stacks.',
  },
  {
    date: '2023 — 2024',
    title: 'React Developer',
    org: 'Web Development Focus',
    desc: 'Specialized in building dynamic, performant React applications with modern state management, routing, and API integration.',
  },
  {
    date: '2022 — 2023',
    title: 'Mobile App Developer',
    org: 'Flutter & Cross-Platform',
    desc: 'Developed cross-platform mobile applications using Flutter, integrating Firebase services and implementing complex UI animations.',
  },
  {
    date: '2021 — Present',
    title: 'Computer Science Student',
    org: 'University',
    desc: 'Pursuing deep knowledge in algorithms, data structures, software engineering principles, and emerging technologies.',
  },
];

export default function Experience() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section" id="experience" ref={sectionRef}>
      <div className="section-header reveal">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">The milestones that shaped my journey.</p>
      </div>

      <div className="timeline">
        {timeline.map((item, i) => (
          <div className="timeline-item reveal" key={item.title} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="timeline-marker">
              <div className="timeline-dot" />
              {i < timeline.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-card">
              <span className="timeline-date">{item.date}</span>
              <h4 className="timeline-title">{item.title}</h4>
              <div className="timeline-org">{item.org}</div>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
