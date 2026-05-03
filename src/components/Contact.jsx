import { useId, useState } from 'react';
import SectionReveal from './SectionReveal.jsx';
import { config, gmailComposeUrl } from '../config.js';

const BRIEF =
  'I would love to hear about what you are building. Send a message and I will be in touch.';

export default function Contact({ speak, speaking }) {
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;
  const noteId = `${formId}-note`;

  const [status, setStatus] = useState('idle');
  const [note, setNote] = useState('');
  const sending = status === 'sending';

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);

    if (fd.get('botcheck')) return;

    const name = fd.get('name');
    const payload = {
      access_key: config.web3formsKey,
      name,
      email: fd.get('email'),
      message: fd.get('message'),
      subject: `Portfolio contact from ${name}`,
      from_name: 'Moeed Portfolio',
    };

    setStatus('sending');
    setNote('Sending…');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setNote(`Thanks ${name} — your message has been received. I'll be in touch shortly.`);
        speak(`Thanks ${name}. Message received. I will be in touch shortly.`);
        form.reset();
      } else {
        setStatus('error');
        setNote(data.message || 'Something went wrong. Please try again or email me directly.');
      }
    } catch {
      setStatus('error');
      setNote('Network error. Please try again or email me directly.');
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <SectionReveal>
        <div className="section-head fade-up">
          <span className="section-num">04</span>
          <h2 id="contact-title" className="section-title">
            Get in Touch
          </h2>
          <button
            type="button"
            className={`speak-btn ${speaking ? 'active' : ''}`}
            onClick={() => speak(BRIEF)}
            aria-label="Listen to a spoken summary of this section"
          >
            ▶ Listen
          </button>
        </div>

        <div className="contact-grid">
          <div className="contact-msg fade-up">
            <h3>Let's build something</h3>
            <p>
              Have a backend, an AI integration, or a full product in mind? Send a message — I read
              every one and reply within 24 hours.
            </p>
            <ul className="contact-list">
              <li>
                <span>Email</span>
                <a
                  href={gmailComposeUrl(config.contactEmail)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {config.contactEmail}
                </a>
              </li>
              <li>
                <span>GitHub</span>
                <a href={config.githubUrl} target="_blank" rel="noopener noreferrer">
                  {config.githubUrl.replace(/^https?:\/\//, '')}
                </a>
              </li>
              <li>
                <span>LinkedIn</span>
                <a href={config.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  {config.linkedinUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              </li>
              <li>
                <span>Status</span>
                <b className="status-available">Available for new projects</b>
              </li>
            </ul>
          </div>

          <form
            className="contact-form fade-up"
            onSubmit={onSubmit}
            aria-busy={sending}
            aria-describedby={note ? noteId : undefined}
            noValidate
          >
            <input
              type="checkbox"
              name="botcheck"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
              style={{ display: 'none' }}
            />
            <label htmlFor={nameId}>
              Name
              <input
                id={nameId}
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                disabled={sending}
              />
            </label>
            <label htmlFor={emailId}>
              Email
              <input
                id={emailId}
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                disabled={sending}
              />
            </label>
            <label htmlFor={messageId}>
              Message
              <textarea
                id={messageId}
                name="message"
                rows="5"
                required
                placeholder="Tell me about your project..."
                disabled={sending}
              />
            </label>
            <button type="submit" className="btn primary" disabled={sending}>
              {sending ? 'Sending…' : 'Send Message →'}
            </button>
            <p
              id={noteId}
              className={`form-note form-note-${status}`}
              role={status === 'error' ? 'alert' : 'status'}
              aria-live={status === 'error' ? 'assertive' : 'polite'}
            >
              {note}
            </p>
          </form>
        </div>
      </SectionReveal>
    </section>
  );
}
