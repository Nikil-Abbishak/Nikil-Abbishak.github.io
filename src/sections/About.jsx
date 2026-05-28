import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/About.css';

const povs = {
  everyone: "I’m a Computer Science undergrad who has been hooked on tech since childhood. I love building clean, well-planned solutions for real-world problems. I always prioritize clear code, proper formatting, and purposeful, modern execution.",
  recruiters: "I am a proactive and adaptable software engineer with a strong foundation in modern web and mobile frameworks. I thrive in collaborative environments and am committed to delivering high-quality, scalable solutions that meet business objectives.",
  developers: "I'm obsessed with DX, clean architecture, and type safety. I enjoy diving into complex state management, optimizing rendering performance, and building reusable component libraries. Tabs over spaces, mostly."
};

export default function About() {
  const sectionRef = useScrollReveal();
  const [activePov, setActivePov] = useState('everyone');

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-left reveal">
          <div className="about-header">
            <h2 className="about-title">Real Me</h2>
            <div className="about-pov-label">
              <span className="about-pov-line"></span>
              <span className="about-pov-text">Choose your POV</span>
            </div>
          </div>
          
          <div className="about-tabs">
            <button 
              className={`about-tab ${activePov === 'everyone' ? 'active' : ''}`}
              onClick={() => setActivePov('everyone')}
            >
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Everyone
            </button>
            <button 
              className={`about-tab ${activePov === 'recruiters' ? 'active' : ''}`}
              onClick={() => setActivePov('recruiters')}
            >
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              Recruiters
            </button>
            <button 
              className={`about-tab ${activePov === 'developers' ? 'active' : ''}`}
              onClick={() => setActivePov('developers')}
            >
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              Developers
            </button>
          </div>
        </div>

        <div className="about-right reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="about-quote-wrapper">
            <span className="about-quote-mark left">"</span>
            <div className="about-quote-content" key={activePov}>
              <span className="about-quote-mark inline">"</span>
              {povs[activePov]}
              <span className="about-quote-mark inline">"</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
