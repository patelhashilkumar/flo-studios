import { Link } from 'react-router-dom';
import './Pages.css';

function TryNowPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Try Flo Studios</h1>
        <p>
          No account needed. No credit card. Just step into a conversation and
          see what practice feels like.
        </p>
      </section>

      <div className="page-content">
        <div className="page-section" style={{ textAlign: 'center' }}>
          <div className="page-card" style={{ background: '#f0f0f0', padding: '48px 32px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Ready to Practice?</h3>
            <p style={{ marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
              Choose a scenario below and start a live AI role-play session.
              You'll get real-time responses and feedback—completely free,
              completely private.
            </p>
            <Link to="/signup" className="page-cta-button">Start a Free Session</Link>
          </div>
        </div>

        <div className="page-section">
          <h2>What You'll Experience</h2>
          <div className="page-grid">
            <div className="page-card">
              <h3>Realistic Conversations</h3>
              <p>
                Our AI responds naturally to what you say—not from a script.
                It adjusts its tone, pushes back when appropriate, and reacts
                the way a real person would in a professional setting.
              </p>
            </div>
            <div className="page-card">
              <h3>Instant Feedback</h3>
              <p>
                After each session, you'll receive a breakdown of your
                communication approach—what worked, what could be stronger, and
                specific suggestions for your next attempt.
              </p>
            </div>
            <div className="page-card">
              <h3>Zero Pressure</h3>
              <p>
                This isn't a test. There's no score, no timer, and no one
                watching. Practice as many times as you want, experiment with
                different approaches, and learn at your own pace.
              </p>
            </div>
            <div className="page-card">
              <h3>Multiple Scenarios</h3>
              <p>
                Try scenarios ranging from giving tough feedback to negotiating
                a raise, handling a client complaint, or navigating a
                disagreement with a colleague. New scenarios added regularly.
              </p>
            </div>
          </div>
        </div>

        <div className="page-section">
          <h2>Sample Scenarios</h2>
          <div className="page-card">
            <h3>The Performance Review</h3>
            <p>
              You're a manager delivering a mixed performance review to a
              long-tenured employee who expects a promotion. Navigate the
              conversation with honesty and empathy while setting clear
              expectations for the path forward.
            </p>
          </div>
          <div className="page-card">
            <h3>The Client Escalation</h3>
            <p>
              A key client is frustrated about a missed deadline. They're
              threatening to take their business elsewhere. Your goal: de-escalate
              the situation, take accountability, and propose a path forward that
              rebuilds trust without over-promising.
            </p>
          </div>
          <div className="page-card">
            <h3>The Salary Negotiation</h3>
            <p>
              You've received an offer you're excited about, but the compensation
              is below your expectations. Practice making your case confidently,
              handling objections, and finding a number that works for both sides.
            </p>
          </div>
        </div>

        <div className="page-section" style={{ textAlign: 'center' }}>
          <h2>Want the Full Experience?</h2>
          <p>
            Create a free account to unlock your progress dashboard, save
            session history, and access our complete scenario library.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" className="page-cta-button">Create Free Account</Link>
            <Link to="/login" className="page-cta-button" style={{ background: 'transparent', color: '#1a1a1a', border: '2px solid #1a1a1a' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TryNowPage;
