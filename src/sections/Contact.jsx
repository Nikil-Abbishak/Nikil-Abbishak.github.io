import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import useMagnetic from '../hooks/useMagnetic';
import '../styles/Contact.css';

export default function Contact() {
  const sectionRef = useScrollReveal();
  const submitBtnRef = useMagnetic(0.15);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); e.target.reset(); }, 3000);
  };

  return (
    <section className="section contact" id="contact" ref={sectionRef}>
      <div className="contact-header reveal">
        <h2 className="contact-heading">
          Let's work<br />together<span className="contact-dot">.</span>
        </h2>
        <p className="contact-subtitle">
          Have a project in mind or just want to chat? Drop me a message.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info reveal" style={{ transitionDelay: '0.1s' }}>
          <a href="mailto:nikil@example.com" className="contact-email">
            nikil@example.com
          </a>

          <div className="contact-details">
            <div className="contact-detail">
              <span className="detail-label">Location</span>
              <span className="detail-value">India</span>
            </div>
            <div className="contact-detail">
              <span className="detail-label">Availability</span>
              <span className="detail-value">Open for work</span>
            </div>
          </div>

          <div className="contact-socials">
            <a href="https://github.com/Nikil-Abbishak" className="contact-social" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://linkedin.com/in/nikil-abbishak" className="contact-social" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://twitter.com/nikil_abbishak" className="contact-social" aria-label="X / Twitter" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
          </div>
        </div>

        <form className="contact-form reveal" style={{ transitionDelay: '0.2s' }} onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactName">Name</label>
              <input type="text" id="contactName" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Email</label>
              <input type="email" id="contactEmail" placeholder="your@email.com" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="contactMessage">Message</label>
            <textarea id="contactMessage" placeholder="Tell me about your project..." rows="5" required />
          </div>
          <button
            ref={submitBtnRef}
            type="submit"
            className="btn btn-primary contact-submit"
            disabled={submitted}
          >
            {submitted ? 'Sent ✓' : <>Send Message <span className="btn-arrow">→</span></>}
          </button>
        </form>
      </div>
    </section>
  );
}
