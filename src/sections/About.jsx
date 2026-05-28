import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/About.css';

const bentoItems = [
  { icon: '📍', label: 'Based in', value: 'India' },
  { icon: '💻', label: 'Focus', value: 'Fullstack Development' },
  { icon: '⚡', label: 'Currently', value: 'Building with React & Flutter' },
  { icon: '🎯', label: 'Interests', value: 'Clean code & great UX' },
];

export default function About() {
  const sectionRef = useScrollReveal();

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="section-header reveal">
        <h2 className="section-title">About</h2>
      </div>

      <div className="about-grid">
        <div className="about-text reveal" style={{ transitionDelay: '0.1s' }}>
          <p className="about-lead">
            I'm a fullstack developer who cares deeply about the craft of building software.
          </p>
          <p>
            My work spans the full stack — from designing intuitive interfaces with React to architecting
            robust backends with Java and Python. I build cross-platform mobile apps with Flutter and
            I'm always exploring new tools and patterns that make software better.
          </p>
          <p>
            I believe the best products come from obsessing over the details: the smoothness of an
            animation, the clarity of an API, the precision of a layout. I write code that's meant to
            be read, and I build things that are meant to last.
          </p>
        </div>

        <div className="about-bento">
          {bentoItems.map((item, i) => (
            <div
              className="bento-card reveal"
              key={item.label}
              style={{ transitionDelay: `${0.15 + i * 0.08}s` }}
            >
              <span className="bento-icon">{item.icon}</span>
              <div>
                <div className="bento-label">{item.label}</div>
                <div className="bento-value">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
