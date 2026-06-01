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
    setTimeout(() => {
      setSubmitted(false);
      e.target.reset();
    }, 3000);
  };

  return (
    <section className="section contact" id="contact" ref={sectionRef}>
      <div className="contact-shell">
        <div className="contact-copy reveal slide-left">
          <span className="eyebrow">Contact</span>
          <h2 className="contact-heading">
            Let&apos;s build
            <span className="contact-accent"> something bold</span>
          </h2>
          <p className="contact-subtitle">
            Share the vision and I&apos;ll shape the product, motion, and experience around it.
          </p>

          <div className="contact-cards">
            <div className="contact-card">
              <span className="card-label">Location</span>
              <span className="card-value">Sri Lanka</span>
            </div>
            <div className="contact-card">
              <span className="card-label">Availability</span>
              <span className="card-value">Open for work</span>
            </div>
            <div className="contact-card">
              <span className="card-label">Response</span>
              <span className="card-value">Within 24h</span>
            </div>
          </div>

          <div className="contact-socials">
            <a href="https://github.com/Nikil-Abbishak" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nikil-abbishake-302415325" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="nikilabbishake@gmail.com" aria-label="Email">Email</a>
          </div>
        </div>

        <form className="contact-form reveal slide-right" onSubmit={handleSubmit}>
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
            <textarea id="contactMessage" placeholder="Tell me about the project..." rows="5" required />
          </div>
          <button
            ref={submitBtnRef}
            type="submit"
            className="btn btn-primary contact-submit"
            disabled={submitted}
          >
            {submitted ? 'Sent' : <>Send Message <span className="btn-arrow">→</span></>}
          </button>
        </form>
      </div>
    </section>
  );
}
