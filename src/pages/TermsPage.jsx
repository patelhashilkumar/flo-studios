import { Link } from 'react-router-dom';
import './Pages.css';

function TermsPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>Terms of Use</h1>
        <p>
          Please read these terms carefully before using Flo Studios. By
          accessing our platform, you agree to be bound by these terms.
        </p>
      </section>

      <div className="page-content page-legal">
        <div className="page-section">
          <p style={{ color: '#999', fontSize: '14px' }}>Last updated: July 1, 2026</p>
        </div>

        <div className="page-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Flo Studios platform ("Service"), you agree
            to be bound by these Terms of Use ("Terms"). If you do not agree to
            all of these Terms, you may not access or use the Service. These
            Terms apply to all visitors, users, and others who access the Service.
          </p>
          <p>
            We reserve the right to update or modify these Terms at any time
            without prior notice. Your continued use of the Service after any
            changes constitutes your acceptance of the new Terms. We encourage
            you to review these Terms periodically for updates.
          </p>
        </div>

        <div className="page-section">
          <h2>2. Account Registration</h2>
          <p>
            To access certain features of the Service, you may be required to
            create an account. You agree to provide accurate, current, and
            complete information during registration and to update such
            information as necessary to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding the password associated with
            your account and for all activities that occur under your account.
            You agree to notify us immediately of any unauthorized use of your
            account or any other breach of security.
          </p>
        </div>

        <div className="page-section">
          <h2>3. Permitted Use</h2>
          <p>
            The Service is intended for professional development and
            communication training purposes. You agree to use the Service only
            for its intended purposes and in compliance with all applicable laws
            and regulations. You may not:
          </p>
          <ul>
            <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
            <li>Attempt to reverse-engineer, decompile, or disassemble any aspect of the Service</li>
            <li>Use the Service to generate harmful, abusive, or inappropriate content</li>
            <li>Share your account credentials with third parties</li>
            <li>Use automated systems to access the Service without our express permission</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality
            are owned by Flo Studios and are protected by international
            copyright, trademark, patent, trade secret, and other intellectual
            property laws. Our trademarks may not be used in connection with any
            product or service without our prior written consent.
          </p>
          <p>
            Content you create during role-play sessions (your responses,
            conversation choices, and practice approaches) remains yours. However,
            we may use anonymized, aggregated data from sessions to improve our
            AI models and Service quality.
          </p>
        </div>

        <div className="page-section">
          <h2>5. Limitation of Liability</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis
            without warranties of any kind, either express or implied. Flo
            Studios does not warrant that the Service will be uninterrupted,
            timely, secure, or error-free.
          </p>
          <p>
            In no event shall Flo Studios, its directors, employees, partners,
            agents, suppliers, or affiliates be liable for any indirect,
            incidental, special, consequential, or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your use of the Service.
          </p>
        </div>

        <div className="page-section">
          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service
            immediately, without prior notice or liability, for any reason,
            including if you breach these Terms. Upon termination, your right to
            use the Service will immediately cease.
          </p>
          <p>
            You may terminate your account at any time by contacting us at
            support@flostudios.com. Upon termination, we will delete your
            personal data in accordance with our Privacy Policy, unless retention
            is required by law.
          </p>
        </div>

        <div className="page-section">
          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            applicable laws, without regard to conflict of law principles. Any
            disputes arising from these Terms or your use of the Service shall
            be resolved through binding arbitration, except where prohibited by
            law.
          </p>
        </div>

        <div className="page-section">
          <h2>8. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <strong>legal@flostudios.com</strong> or visit our{' '}
            <Link to="/contact" style={{ color: '#555' }}>Contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
