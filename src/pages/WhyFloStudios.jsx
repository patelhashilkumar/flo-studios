import { Link } from 'react-router-dom';
import './Pages.css';

function WhyFloStudios() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Why Flo Studios?</h1>
        <p>
          We exist because the way people learn to communicate, negotiate, and
          lead hasn't kept up with the way the world actually works.
        </p>
      </section>

      <div className="page-content">
        <div className="page-section">
          <h2>Our Mission</h2>
          <p>
            Flo Studios was founded on a simple observation: the most critical
            skills in any career—difficult conversations, stakeholder management,
            conflict resolution—are the ones least practiced before they matter
            most. We set out to change that.
          </p>
          <p>
            Our mission is to give every professional a safe, intelligent space
            to rehearse the moments that define careers. Through AI-driven
            role-play, we create realistic scenarios that adapt in real time,
            providing the kind of deliberate practice that builds genuine
            confidence.
          </p>
          <p>
            We believe that practice shouldn't require scheduling a workshop,
            hiring an actor, or waiting for a quarterly review. It should be
            available whenever you need it, as many times as you need it,
            with feedback that actually helps you improve.
          </p>
        </div>

        <div className="page-section">
          <h2>What Makes Us Different</h2>
          <div className="page-card">
            <h3>Adaptive Intelligence</h3>
            <p>
              Our AI doesn't follow scripts. It reads tone, adjusts difficulty,
              and responds the way a real person would—sometimes cooperative,
              sometimes resistant, always teaching you something new.
            </p>
          </div>
          <div className="page-card">
            <h3>Built for Real Scenarios</h3>
            <p>
              Every scenario in our library is designed with input from
              psychologists, HR leaders, and management coaches. These aren't
              hypothetical exercises—they're drawn from real workplace situations
              that professionals face every day.
            </p>
          </div>
          <div className="page-card">
            <h3>Measurable Growth</h3>
            <p>
              We track your progress across sessions, highlighting patterns in
              your communication style and surfacing blind spots you might not
              see on your own. Growth isn't a feeling—it's data.
            </p>
          </div>
        </div>

        <div className="page-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where no one walks into a critical conversation
            unprepared. Where managers practice tough feedback before delivering
            it. Where salespeople refine their pitch a hundred times before the
            big meeting. Where new hires build confidence before their first day.
          </p>
          <p>
            Flo Studios is building toward a future where AI-powered practice is
            as routine as any other form of professional development—integrated
            into onboarding, leadership programs, and individual growth plans
            across every industry.
          </p>
          <p>
            The stakes in human communication are too high to leave preparation
            to chance. That's why Flo Studios exists.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/try-now" className="page-cta-button">Experience It Yourself</Link>
        </div>
      </div>
    </div>
  );
}

export default WhyFloStudios;
