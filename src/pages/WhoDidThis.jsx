import { Link } from 'react-router-dom';
import './Pages.css';

function WhoDidThis() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Who Did This?!</h1>
        <p>
          Good question. Someone had to be behind this whole "let's make AI
          role-play a thing" idea. Here's the story.
        </p>
      </section>

      <div className="page-content">
        <div className="page-section">
          <h2>The Short Version</h2>
          <p>
            Flo Studios was built by a small, obsessive team of people who got
            tired of watching brilliant professionals fumble through conversations
            they could've practiced. We figured if pilots use simulators and
            athletes use film, maybe the rest of us deserve a rehearsal space too.
          </p>
          <p>
            We're not a massive corporation. We're not backed by a department of
            "innovation." We're a crew of designers, engineers, and behavioral
            scientists who genuinely believe that communication is a skill—and
            like any skill, it gets better with practice.
          </p>
        </div>

        <div className="page-section">
          <h2>The People Behind the Curtain</h2>
          <div className="page-card">
            <h3>The Founder</h3>
            <p>
              Started Flo Studios after one too many meetings where someone said
              "I wish I'd handled that differently." Obsessed with the
              intersection of AI, psychology, and making awkward things less
              awkward. Drinks way too much coffee. No regrets.
            </p>
          </div>
          <div className="page-card">
            <h3>The Engineering Team</h3>
            <p>
              A tight group of builders who think conversations are the most
              interesting data problem in the world. They've made the AI feel
              less like a chatbot and more like that one colleague who always
              keeps it real. They argue about prompt architecture the way normal
              people argue about pizza toppings.
            </p>
          </div>
          <div className="page-card">
            <h3>The Design & Research Team</h3>
            <p>
              Equal parts empathy and pixel-perfection. They make sure every
              scenario feels authentic, every interface feels intuitive, and
              every piece of feedback actually lands. They've interviewed
              hundreds of professionals to understand what real practice looks
              like.
            </p>
          </div>
        </div>

        <div className="page-section">
          <h2>Why We Care</h2>
          <p>
            Honestly? Because we've all been there. The performance review you
            weren't ready for. The negotiation where you left money on the table.
            The difficult conversation you avoided until it became a crisis. We
            built Flo Studios for ourselves first—and then realized everyone else
            needed it too.
          </p>
          <p>
            We're not trying to replace human connection. We're trying to make
            people better at it. There's a difference, and it matters to us.
          </p>
          <p>
            If you've made it this far, you're probably our kind of person. Come
            say hi—we're always looking for curious minds who want to make
            professional growth feel less like homework and more like progress.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/careers" className="page-cta-button">Join the Team</Link>
        </div>
      </div>
    </div>
  );
}

export default WhoDidThis;
