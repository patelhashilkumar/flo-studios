import { Link } from 'react-router-dom';
import './Pages.css';

function LoginPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Welcome Back</h1>
        <p>
          Sign in to pick up where you left off. Your practice sessions and
          progress are waiting.
        </p>
      </section>

      <div className="page-content">
        <div className="page-section">
          <form className="page-form" onSubmit={(e) => e.preventDefault()}>
            <div className="page-form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="jane@company.com" />
            </div>
            <div className="page-form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Your password" />
            </div>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <Link to="/" style={{ fontSize: '14px', color: '#666', textDecoration: 'none' }}>
                Forgot your password?
              </Link>
            </div>
            <button type="submit" className="page-cta-button" style={{ width: '100%', textAlign: 'center' }}>
              Sign In
            </button>
            <div className="page-form-divider">or</div>
            <button
              type="button"
              className="page-cta-button"
              style={{
                width: '100%',
                textAlign: 'center',
                background: 'transparent',
                color: '#1a1a1a',
                border: '2px solid #ddd',
              }}
            >
              Continue with Google
            </button>
            <div className="page-form-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/signup">Create one free</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="page-section" style={{ textAlign: 'center' }}>
          <h2>Your Dashboard Awaits</h2>
          <p>
            Once signed in, you'll have access to your full session history,
            progress analytics, saved scenarios, and personalized recommendations
            based on your practice patterns.
          </p>
          <p>
            New scenarios are added weekly, and your AI practice partner continues
            to learn from your style to provide increasingly relevant challenges
            and feedback.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
