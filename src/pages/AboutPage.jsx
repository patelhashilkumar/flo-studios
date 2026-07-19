import { Link } from 'react-router-dom';
import './Pages.css';

function AboutPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>About Flo Studios</h1>
        <p>
          We're building the practice space that professional communication has
          always needed but never had.
        </p>
      </section>

      <div className="page-content">
        <div className="page-section">
          <h2>Our Story</h2>
          <p>
            Flo Studios started with a frustration that most professionals know
            too well: the gap between knowing what to say and actually saying it
            well when it counts. We watched talented people stumble through
            conversations they could have handled brilliantly—if only they'd had
            a chance to practice.
          </p>
          <p>
            Traditional training methods—role-playing with colleagues, watching
            videos, reading books—only go so far. They're either too awkward, too
            passive, or too disconnected from reality. We wanted something
            better: a practice environment that feels real, adapts in real time,
            and gives honest feedback without judgment.
          </p>
          <p>
            So we built it. Flo Studios combines advanced AI with behavioral
            science to create role-play scenarios that are as close to the real
            thing as you can get—without the real consequences. Since our launch,
            thousands of professionals have used our platform to prepare for the
            moments that shape their careers.
          </p>
        </div>

        <div className="page-section">
          <h2>Our Values</h2>
          <div className="page-card">
            <h3>Honesty Over Comfort</h3>
            <p>
              Real growth requires honest feedback. Our AI doesn't sugarcoat
              responses, and neither do we. We believe that constructive
              directness—delivered with care—is the fastest path to improvement.
            </p>
          </div>
          <div className="page-card">
            <h3>Practice Makes Progress</h3>
            <p>
              We don't believe in perfection. We believe in getting better—one
              conversation at a time. Our platform is designed for iteration, not
              intimidation. Every attempt teaches you something.
            </p>
          </div>
          <div className="page-card">
            <h3>Respect for Privacy</h3>
            <p>
              Practice is personal. What you say in a session stays in your
              session. We don't share individual performance data with employers
              unless you explicitly choose to. Your growth journey is yours.
            </p>
          </div>
          <div className="page-card">
            <h3>Accessible by Design</h3>
            <p>
              Great communication training shouldn't be reserved for executives
              with big budgets. We're committed to making Flo Studios accessible
              to professionals at every level, in every industry.
            </p>
          </div>
        </div>

        <div className="page-section">
          <h2>Our Approach</h2>
          <p>
            We take a science-first approach to communication training. Every
            scenario in our library is grounded in research from organizational
            psychology, conflict resolution, and leadership studies. We don't
            guess what works—we test, measure, and refine.
          </p>
          <p>
            Our AI is trained on thousands of real-world conversation patterns,
            giving it the ability to respond naturally and challenge you in ways
            that feel authentic. It's not a chatbot reciting scripts—it's a
            dynamic practice partner that adapts to your style and pushes you to
            grow.
          </p>
          <p>
            We also believe that technology is only as good as the humans behind
            it. Our team includes psychologists, coaches, designers, and
            engineers who collaborate closely to ensure that every feature serves
            a clear purpose: helping you communicate with more confidence,
            clarity, and impact.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
