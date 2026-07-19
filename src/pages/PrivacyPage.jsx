import { Link } from 'react-router-dom';
import './Pages.css';

function PrivacyPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Privacy Policy</h1>
        <p>
          Your privacy matters to us. This policy explains what data we collect,
          how we use it, and how we protect it.
        </p>
      </section>

      <div className="page-content page-legal">
        <div className="page-section">
          <p style={{ color: '#999', fontSize: '14px' }}>Last updated: July 1, 2026</p>
        </div>

        <div className="page-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you create an
            account, use our Service, or communicate with us. This includes:
          </p>
          <ul>
            <li>Account information: name, email address, and password</li>
            <li>Profile information: job title, company, and professional interests</li>
            <li>Session data: your responses and interactions during role-play sessions</li>
            <li>Usage data: how you interact with our platform, features used, and session frequency</li>
            <li>Communication data: messages you send to our support or sales teams</li>
          </ul>
          <p>
            We also automatically collect certain technical information when you
            use the Service, including your IP address, browser type, device
            information, and referring URLs. This data helps us maintain and
            improve the Service.
          </p>
        </div>

        <div className="page-section">
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve
            the Service. Specifically, we use your data to:
          </p>
          <ul>
            <li>Deliver and personalize your role-play training experience</li>
            <li>Generate feedback and analytics on your communication patterns</li>
            <li>Improve our AI models using anonymized, aggregated data</li>
            <li>Send you service-related communications and updates</li>
            <li>Respond to your requests, comments, and questions</li>
            <li>Detect, prevent, and address technical issues and security threats</li>
          </ul>
          <p>
            We do not sell your personal information to third parties. We do not
            use your individual session content for advertising purposes. Your
            practice conversations are yours.
          </p>
        </div>

        <div className="page-section">
          <h2>3. Data Sharing</h2>
          <p>
            We may share your information in the following limited circumstances:
          </p>
          <ul>
            <li>With service providers who assist us in operating the platform (hosting, analytics, email)</li>
            <li>When required by law, regulation, or legal process</li>
            <li>To protect the rights, property, or safety of Flo Studios, our users, or the public</li>
            <li>With your employer, only if you use Flo Studios through an enterprise plan and only aggregate performance data—never individual session transcripts</li>
            <li>In connection with a merger, acquisition, or sale of assets, with appropriate notice</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            data, including encryption in transit and at rest, secure
            authentication, and regular security audits. However, no method of
            electronic transmission or storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>
          <p>
            We retain your personal data only for as long as necessary to
            fulfill the purposes described in this policy, unless a longer
            retention period is required by law. You may request deletion of
            your data at any time.
          </p>
        </div>

        <div className="page-section">
          <h2>5. Your Rights</h2>
          <p>
            Depending on your location, you may have the following rights
            regarding your personal data:
          </p>
          <ul>
            <li>Access: Request a copy of the personal data we hold about you</li>
            <li>Correction: Request that we correct inaccurate or incomplete data</li>
            <li>Deletion: Request that we delete your personal data</li>
            <li>Portability: Request a machine-readable copy of your data</li>
            <li>Objection: Object to certain processing activities</li>
            <li>Restriction: Request that we limit how we use your data</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{' '}
            <strong>privacy@flostudios.com</strong>. We will respond to your
            request within 30 days.
          </p>
        </div>

        <div className="page-section">
          <h2>6. Cookies</h2>
          <p>
            We use essential cookies to maintain your session and preferences.
            We may also use analytics cookies to understand how users interact
            with our Service. You can control cookie preferences through your
            browser settings. Disabling essential cookies may affect your ability
            to use certain features of the Service.
          </p>
        </div>

        <div className="page-section">
          <h2>7. Children's Privacy</h2>
          <p>
            The Service is not directed to individuals under 16 years of age. We
            do not knowingly collect personal information from children. If you
            become aware that a child has provided us with personal data, please
            contact us and we will take steps to delete such information.
          </p>
        </div>

        <div className="page-section">
          <h2>8. Contact</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please
            contact our Data Protection team at{' '}
            <strong>privacy@flostudios.com</strong> or visit our{' '}
            <Link to="/contact" style={{ color: '#555' }}>Contact page</Link>.
          </p>
          <p>
            For GDPR-specific inquiries, please see our{' '}
            <Link to="/gdpr" style={{ color: '#555' }}>GDPR Notice</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
