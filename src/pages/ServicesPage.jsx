import { Link } from 'react-router-dom';
import './Pages.css';

function ServicesPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Our Services</h1>
        <p>
          Everything we offer is built around one idea: give people a better way
          to practice the conversations that matter most.
        </p>
      </section>

      <div className="page-content">
        <div className="page-section">
          <div className="page-grid">
            <div className="page-card">
              <h3>AI Role-Play Training</h3>
              <p>
                Practice difficult conversations with an AI that adapts to your
                responses in real time. From performance reviews to client
                negotiations, our scenarios cover the full spectrum of
                professional communication.
              </p>
              <p>
                Each session provides instant feedback on tone, clarity, and
                strategy—helping you refine your approach before the real
                conversation happens. No scheduling, no awkwardness, unlimited
                attempts.
              </p>
            </div>

            <div className="page-card">
              <h3>Scenario Design</h3>
              <p>
                Need training tailored to your industry or company culture? Our
                scenario design service creates custom role-play situations that
                mirror the exact challenges your team faces.
              </p>
              <p>
                We work with your leadership, HR, and L&D teams to identify the
                conversations that matter most, then build scenarios with
                realistic characters, stakes, and branching outcomes.
              </p>
            </div>

            <div className="page-card">
              <h3>Analytics & Insights</h3>
              <p>
                Track individual and team progress with detailed analytics
                dashboards. See patterns in communication style, identify areas
                for growth, and measure improvement over time with data-driven
                insights.
              </p>
              <p>
                Our reporting tools give managers and L&D professionals the
                visibility they need to understand how training translates into
                real-world performance—without compromising individual privacy.
              </p>
            </div>

            <div className="page-card">
              <h3>Team Workshops</h3>
              <p>
                Bring your team together for facilitated workshop sessions that
                combine AI role-play with group discussion and peer feedback.
                Perfect for leadership offsites, onboarding cohorts, or
                quarterly skill-building days.
              </p>
              <p>
                Workshops are led by experienced facilitators who guide
                participants through increasingly challenging scenarios, building
                confidence and team cohesion simultaneously.
              </p>
            </div>
          </div>
        </div>

        <div className="page-section">
          <h2>How It Works</h2>
          <p>
            Getting started is straightforward. Choose a scenario—or build your
            own—and step into a realistic conversation with our AI. The AI
            responds dynamically based on your words, tone, and strategy, giving
            you an authentic practice environment.
          </p>
          <p>
            After each session, you receive a detailed breakdown of what worked,
            what didn't, and specific suggestions for improvement. Over time,
            you'll see your communication patterns evolve and your confidence
            grow.
          </p>
          <p>
            Whether you're an individual professional looking to sharpen your
            skills or an organization building a culture of continuous
            development, our services scale to meet your needs.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/try-now" className="page-cta-button">Try It Free</Link>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
