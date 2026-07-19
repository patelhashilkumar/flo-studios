import { Link } from 'react-router-dom';
import './Pages.css';

function ContactPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Contact Us</h1>
        <p>
          Have a question, partnership idea, or just want to say hello? We'd
          love to hear from you.
        </p>
      </section>

      <div className="page-content">
        <div className="page-section">
          <div className="page-grid">
            <div className="page-card">
              <h3>General Inquiries</h3>
              <p>hello@flostudios.com</p>
            </div>
            <div className="page-card">
              <h3>Sales & Partnerships</h3>
              <p>partnerships@flostudios.com</p>
            </div>
            <div className="page-card">
              <h3>Support</h3>
              <p>support@flostudios.com</p>
            </div>
          </div>
        </div>

        <div className="page-section">
          <h2>Send Us a Message</h2>
          <form className="page-form" onSubmit={(e) => e.preventDefault()}>
            <div className="page-form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Jane Smith" />
            </div>
            <div className="page-form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="jane@company.com" />
            </div>
            <div className="page-form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject">
                <option value="">Select a topic...</option>
                <option value="general">General Inquiry</option>
                <option value="sales">Sales & Pricing</option>
                <option value="support">Technical Support</option>
                <option value="partnership">Partnership</option>
                <option value="careers">Careers</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="page-form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Tell us what's on your mind..." />
            </div>
            <button type="submit" className="page-cta-button" style={{ width: '100%', textAlign: 'center' }}>
              Send Message
            </button>
          </form>
        </div>

        <div className="page-section" style={{ textAlign: 'center' }}>
          <h2>Response Time</h2>
          <p>
            We typically respond within 24 hours on business days. For urgent
            support issues, please include "URGENT" in your subject line and
            we'll prioritize your request.
          </p>
          <p>
            If you're reaching out about a partnership or enterprise plan,
            our sales team will schedule a call within 48 hours to discuss
            your needs in detail.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
