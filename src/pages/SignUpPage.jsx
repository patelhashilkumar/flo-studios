import { Link } from 'react-router-dom';
import './Pages.css';

function SignUpPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Create Your Account</h1>
        <p>
          Join thousands of professionals who practice their most important
          conversations before they happen.
        </p>
      </section>

      <div className="page-content">
        <div className="page-section">
          <form className="page-form" onSubmit={(e) => e.preventDefault()}>
            <div className="page-form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" placeholder="Jane" />
            </div>
            <div className="page-form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" placeholder="Smith" />
            </div>
            <div className="page-form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="jane@company.com" />
            </div>
            <div className="page-form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="At least 8 characters" />
            </div>
            <div className="page-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Re-enter your password" />
            </div>
            <button type="submit" className="page-cta-button" style={{ width: '100%', textAlign: 'center' }}>
              Create Account
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
                Already have an account?{' '}
                <Link to="/login">Sign in</Link>
              </p>
              <p style={{ fontSize: '12px', color: '#999', marginTop: '12px' }}>
                By creating an account, you agree to our{' '}
                <Link to="/terms" style={{ color: '#999' }}>Terms of Use</Link> and{' '}
                <Link to="/privacy" style={{ color: '#999' }}>Privacy Policy</Link>.
              </p>
            </div>
          </form>
        </div>

        <div className="page-section" style={{ textAlign: 'center' }}>
          <h2>What You Get</h2>
          <div className="page-grid">
            <div className="page-card">
              <h3>Unlimited Practice</h3>
              <p>
                Access our full library of scenarios and practice as many times
                as you need. No session limits on the free plan.
              </p>
            </div>
            <div className="page-card">
              <h3>Progress Tracking</h3>
              <p>
                See how your communication skills improve over time with detailed
                analytics and session history.
              </p>
            </div>
            <div className="page-card">
              <h3>Personalized Feedback</h3>
              <p>
                Receive AI-powered feedback tailored to your communication style,
                strengths, and areas for growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
