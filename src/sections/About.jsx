import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/About.css';

const povs = {
  everyone: "Hi, I'm Nikil, a Full-Stack Developer and Machine Learning enthusiast studying at the University of Westminster. I build modern, responsive web applications across frontend and backend.",
  recruiters: "I'm a proactive Full-Stack Developer and ML enthusiast focused on performance, usability, and clean architecture. My goal is to build products that are scalable, useful, and impactful.",
  developers: "I enjoy combining software engineering and intelligent systems. I explore ML concepts to create smarter features, and I focus on clean architecture and practical solutions."
};

const traits = [
  {
    title: 'Craft',
    desc: 'Cinematic UI, purposeful motion, and detail-driven visuals.'
  },
  {
    title: 'Systems',
    desc: 'Scalable architecture, clean code, and maintainable patterns.'
  },
  {
    title: 'Momentum',
    desc: 'Fast feedback loops, iterative delivery, and collaborative flow.'
  }
];

export default function About() {
  const sectionRef = useScrollReveal();
  const [activePov, setActivePov] = useState('everyone');

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-left reveal slide-left">
          <span className="eyebrow">About</span>
          <h2 className="about-title">Real Me</h2>
          <p className="about-intro">
            I design and build digital experiences that feel premium, intentional, and human.
          </p>

          <div className="about-tabs">
            <button
              className={`about-tab ${activePov === 'everyone' ? 'active' : ''}`}
              onClick={() => setActivePov('everyone')}
            >
              Everyone
            </button>
            <button
              className={`about-tab ${activePov === 'recruiters' ? 'active' : ''}`}
              onClick={() => setActivePov('recruiters')}
            >
              Recruiters
            </button>
            <button
              className={`about-tab ${activePov === 'developers' ? 'active' : ''}`}
              onClick={() => setActivePov('developers')}
            >
              Developers
            </button>
          </div>

          <div className="about-traits">
            {traits.map((trait) => (
              <div className="about-trait" key={trait.title}>
                <h4>{trait.title}</h4>
                <p>{trait.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-right reveal slide-right">
          <div className="about-quote-card">
            <span className="about-quote-mark">"</span>
            <p className="about-quote" key={activePov}>
              {povs[activePov]}
            </p>
            <span className="about-quote-mark end">"</span>
          </div>
        </div>
      </div>
    </section>
  );
}
