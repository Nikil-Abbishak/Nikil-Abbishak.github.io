import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/Experience.css';

const timeline = [
  {
    date: '2024 — Present',
    title: 'Fullstack Developer',
    org: 'Freelance & Personal Projects',
    desc: 'Shipping end-to-end products, from high-touch UI to scalable backends and integrations.',
  },
  {
    date: '2023 — 2024',
    title: 'React Developer',
    org: 'Web Development Focus',
    desc: 'Built dynamic, performant React applications with modern state management and API design.',
  },
  {
    date: '2022 — 2023',
    title: 'Mobile App Developer',
    org: 'Flutter & Cross-Platform',
    desc: 'Delivered cross-platform apps with polished animations and Firebase-powered backends.',
  },
  {
    date: '2021 — Present',
    title: 'Computer Science Student',
    org: 'University',
    desc: 'Focused on algorithms, systems, and emerging technologies while shipping real products.',
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
