import { useRef, useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/Skills.css';

/* Real SVG paths for each technology */
const skills = [
  {
    name: 'Java',
    color: '#E76F00',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M17.7 30.2s-1.8 1-1.3 1.7c2.1 2.8 12.6 1.9 16.8-1 0 0 .6.5-.5 1.2-5.5 3-18 2.4-14.8-.7.8-.8 1.8-1.2 1.8-1.2h-2zm1-3.6s-2 1.5.2 2c3.7.8 9.4 1 15.2-.5 0 0 .4.4-.4.8-6.4 3.2-19.3.3-15.6-1.4.7-.4 1.2-.6.6-.9z" fill="currentColor"/>
        <path d="M27.5 20.4c1.7 2-0.4 3.7-0.4 3.7s4.4-2.2 2.4-5c-1.9-2.6-3.3-3.9 4.5-8.3 0 0-12.3 3.1-6.5 9.6z" fill="currentColor"/>
        <path d="M35.7 33.2s1.3 1.1-1.5 1.9c-5.2 1.6-21.7 2.1-26.3.1-1.6-.7 1.5-1.7 2.5-1.9 1.1-.2 1.7-.2 1.7-.2-1.9-1.4-12.6 2.7-5.4 3.8 19.6 3 35.7-1.3 29-3.7zm-17.8-6.1s-8.9 2.1-3.2 2.9c2.4.3 7.2.3 11.7-.1 3.7-.4 7.4-1.1 7.4-1.1s-1.3.6-2.2 1.2c-9 2.4-26.3 1.3-21.3-1.2 4.2-2.1 7.6-1.7 7.6-1.7zm15.8 8.9c9.2-4.8 4.9-9.4 2-8.8-.7.2-1 .3-1 .3s.3-.4.8-.6c5.8-2 10.2 6.1-1.9 9.3 0 0 .1-.1.1-.2z" fill="currentColor"/>
        <path d="M29.4 4s5.1 5.1-4.8 12.9c-8 6.3-1.8 9.8 0 13.9-4.6-4.2-8-7.8-5.7-11.3C22.4 14.2 31.5 11.5 29.4 4z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Python',
    color: '#3776AB',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M23.7 4C13.9 4 14.8 8.8 14.8 8.8l.02 5h9.1v1.5H10.1S4 14.4 4 24.3s5.4 9.5 5.4 9.5h3.2v-4.6s-.2-5.4 5.3-5.4h9.2s5.1.1 5.1-5V10.5S33 4 23.7 4zm-5.1 3.8c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6.7-1.6 1.6-1.6z" fill="currentColor"/>
        <path d="M24.3 44c9.8 0 8.9-4.8 8.9-4.8l-.02-5h-9.1v-1.5h13.8S44 33.6 44 23.7s-5.4-9.5-5.4-9.5h-3.2v4.6s.2 5.4-5.3 5.4h-9.2s-5.1-.1-5.1 5v8.3S15 44 24.3 44zm5.1-3.8c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="2" fill="currentColor" opacity="0.15"/>
        <path d="M13 34.5l3.8-2.3c.7 1.3 1.4 2.4 3 2.4 1.5 0 2.5-.6 2.5-2.9v-15.7h4.7v15.8c0 4.8-2.8 7-6.9 7-3.7 0-5.8-1.9-6.9-4.2l-.2-.1zm16.2-.6l3.8-2.2c1 1.6 2.3 2.8 4.5 2.8 1.9 0 3.1-1 3.1-2.3 0-1.6-1.2-2.2-3.3-3.1l-1.1-.5c-3.3-1.4-5.4-3.1-5.4-6.8 0-3.4 2.6-6 6.6-6 2.9 0 5 1 6.5 3.5l-3.5 2.3c-.8-1.4-1.6-2-2.9-2-1.3 0-2.2.8-2.2 2 0 1.4.8 2 2.8 2.8l1.1.5c3.8 1.7 6 3.3 6 7.1 0 4.1-3.2 6.3-7.5 6.3-4.2 0-6.9-2-8.2-4.6l-.3.2z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="3.5" fill="currentColor"/>
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2" fill="none"/>
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(60 24 24)"/>
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(120 24 24)"/>
      </svg>
    ),
  },
  {
    name: 'Flutter',
    color: '#02569B',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M27.5 4L7 24.5l6.3 6.3L33.8 10.3h-6.3zm0 20L18.8 32.7l6.3 6.3L33.8 30.3 27.5 24L25.1 26.3l6.3 6.3-6.3 6.3" fill="currentColor"/>
        <path d="M25.1 39l2.4-2.4L33.8 30.3 27.5 24l-8.7 8.7 6.3 6.3z" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    color: '#539E43',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 4.4c-.6 0-1.2.2-1.7.5L8.7 12.5c-1.1.6-1.7 1.7-1.7 2.9v15c0 1.2.6 2.3 1.7 2.9l3.5 2c1.7.8 2.3.8 3.1.8 2.5 0 4-1.5 4-4.2V17.4c0-.3-.2-.5-.5-.5h-2c-.3 0-.5.2-.5.5v14.5c0 1.2-1.2 2.3-3.2 1.3l-3.7-2.1c-.2-.1-.3-.3-.3-.5v-15c0-.2.1-.4.3-.5l13.6-7.6c.2-.1.4-.1.6 0l13.6 7.6c.2.1.3.3.3.5v15c0 .2-.1.4-.3.5L23.7 38.7c-.2.1-.4.1-.6 0l-3.4-2c-.1-.1-.3-.1-.5 0-1 .5-1.2.6-2.1 1-.2.1-.6.3.2.7l4.5 2.6c.5.3 1.1.5 1.7.5s1.2-.2 1.7-.5l13.6-7.5c1.1-.6 1.7-1.7 1.7-2.9v-15c0-1.2-.6-2.3-1.7-2.9L25.7 4.9c-.5-.3-1.1-.5-1.7-.5z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="2" fill="currentColor" opacity="0.15"/>
        <path d="M13 25.5h5v12h3.5v-12h5v-3H13v3zm18.5-3v15h3.5v-9l4.5 9H43l-5-9.5 4.5-5.5h-3.8l-3.7 4.5V22.5h-3.5z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Git',
    color: '#F05032',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M44.2 22.2L25.8 3.8c-.8-.8-2-.8-2.8 0L18.7 8l3.6 3.6c.8-.3 1.8-.1 2.4.5.7.7.8 1.6.5 2.4l3.4 3.4c.8-.3 1.8-.2 2.4.5.9.9.9 2.3 0 3.2-.9.9-2.3.9-3.2 0-.7-.7-.8-1.7-.4-2.5L24 15.7v9.6c.2.1.4.3.6.5.9.9.9 2.3 0 3.2-.9.9-2.3.9-3.2 0-.9-.9-.9-2.3 0-3.2.3-.3.6-.4.9-.5v-9.7c-.3-.1-.6-.3-.9-.5-.7-.7-.8-1.6-.5-2.4l-3.5-3.5-9.3 9.3c-.8.8-.8 2 0 2.8l18.4 18.4c.8.8 2 .8 2.8 0l18.4-18.4c.7-.8.7-2.1-.1-2.8z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Firebase',
    color: '#FFCA28',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M12.6 38.2l1.8-14.8 5.7-10.6-3.5-6.5c-.4-.7-1.4-.5-1.4.3L12.6 38.2z" fill="currentColor" opacity="0.7"/>
        <path d="M14.4 23.4l-1.8 14.8L24 44l11.4-5.8-5-31c-.2-.7-1-.9-1.5-.3l-4.7 5.7L20.1 7z" fill="currentColor"/>
        <path d="M28.9 16l-4.8-9.7c-.3-.7-1.3-.7-1.7 0L14.4 23.4 24 44l11.4-5.8L28.9 16z" fill="currentColor" opacity="0.85"/>
      </svg>
    ),
  },
  {
    name: 'Docker',
    color: '#2496ED',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M26.5 16.5h-5v-5h5v5zm-6 0h-5v-5h5v5zm-6 0h-5v-5h5v5zm18 0h-5v-5h5v5zm-6-6h-5v-5h5v5zm-6 0h-5v-5h5v5zm-6 0h-5v-5h5v5zm12-6h-5v-5h5v5zm-6 0h-5v-5h5v5z" fill="currentColor" opacity="0.2"/>
        <path d="M46.1 20.1c-.8-.6-2.6-1.2-4.9-1 -.5-2.5-2.4-4.6-2.5-4.7l-.5-.6-.6.5c-1.2 1-2.2 2.5-2.5 4-.2 1-.2 2.1.1 3-1.3.7-3.5 1-4.1 1H2.3l-.1.8c-.3 2.6-.1 10.6 5.2 16.5C11.4 44.1 17.5 46 25 46c14.7 0 24-9.4 26.6-26.5-1.9.1-3.7-.5-5.5-1.4z" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function Skills() {
  const sectionRef = useScrollReveal();
  const cardRefs = useRef([]);

  const handleMouseMove = useCallback((e, i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rX = ((y - rect.height / 2) / rect.height) * 8;
    const rY = ((rect.width / 2 - x) / rect.width) * 8;
    card.style.transform = `perspective(600px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback((i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.style.transform = '';
  }, []);

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="section-header reveal">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies I work with.</p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            className="skill-item reveal"
            style={{ transitionDelay: `${0.05 + i * 0.04}s` }}
            ref={(el) => (cardRefs.current[i] = el)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <div className="skill-icon" style={{ color: skill.color }}>
              {skill.svg}
            </div>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
