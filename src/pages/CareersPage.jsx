import { Link } from 'react-router-dom';
import './Pages.css';

function CareersPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Join Our Team</h1>
        <p>
          We're looking for people who believe communication skills can be
          practiced, measured, and improved—and want to build the tools that
          make it happen.
        </p>
      </section>

      <div className="page-content">
        <div className="page-section">
          <h2>Why Work at Flo Studios</h2>
          <p>
            We're a small team tackling a big problem. That means you'll have
            real ownership over your work, direct impact on the product, and the
            freedom to experiment. We don't do unnecessary meetings, performative
            hustle, or stack rankings. We do meaningful work, honest feedback,
            and the kind of collaboration that makes Mondays not terrible.
          </p>
          <p>
            We're remote-first with flexible hours, generous PTO, and a genuine
            commitment to work-life balance. We believe that people do their best
            work when they're well-rested, supported, and trusted to manage
            their own time.
          </p>
          <p>
            Every person on our team is here because they chose to be—not because
            of a brand name or a stock ticker, but because the work matters and
            the people are exceptional.
          </p>
        </div>

        <div className="page-section">
          <h2>Open Positions</h2>
          <div className="page-card">
            <h3>Senior Full-Stack Engineer</h3>
            <p>
              Build and scale the platform that powers AI-driven role-play
              training. You'll work across the stack—React on the front end,
              Node and Python on the back end—with a focus on real-time
              interaction and performance. 3+ years experience required.
            </p>
          </div>
          <div className="page-card">
            <h3>AI / ML Engineer</h3>
            <p>
              Design and refine the conversational AI models at the heart of
              our product. You'll work on natural language understanding, response
              generation, and adaptive difficulty systems. Experience with LLMs
              and fine-tuning is a strong plus.
            </p>
          </div>
          <div className="page-card">
            <h3>Product Designer</h3>
            <p>
              Shape the experience of practicing difficult conversations. You'll
              design interfaces for role-play sessions, feedback dashboards, and
              scenario builders—balancing simplicity with the depth that
              professional users expect. Portfolio required.
            </p>
          </div>
          <div className="page-card">
            <h3>Behavioral Science Researcher</h3>
            <p>
              Bring research rigor to our scenario design and feedback systems.
              You'll collaborate with engineers and designers to ensure our
              training methodology is grounded in evidence. Background in
              organizational psychology, I/O, or communication studies preferred.
            </p>
          </div>
          <div className="page-card">
            <h3>Content & Scenario Writer</h3>
            <p>
              Craft realistic, nuanced scenarios that professionals want to
              practice. You'll write dialogue trees, character backstories, and
              situational contexts that make our AI interactions feel authentic
              and challenging.
            </p>
          </div>
        </div>

        <div className="page-section">
          <h2>Don't See Your Role?</h2>
          <p>
            We're always interested in meeting talented people, even if we don't
            have a specific opening that matches your skills right now. If you're
            passionate about what we're building, reach out anyway. Some of our
            best hires came from conversations we didn't plan.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/contact" className="page-cta-button">Get in Touch</Link>
        </div>
      </div>
    </div>
  );
}

export default CareersPage;
