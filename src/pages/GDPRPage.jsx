import { Link } from 'react-router-dom';
import './Pages.css';

function GDPRPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="page-back-link">← Back to Home</Link>
      </nav>

      <section className="page-hero">
        <h1>GDPR Notice</h1>
        <p>
          This notice provides additional information for users in the European
          Economic Area about how we handle personal data under the General Data
          Protection Regulation.
        </p>
      </section>

      <div className="page-content page-legal">
        <div className="page-section">
          <p style={{ color: '#999', fontSize: '14px' }}>Last updated: July 1, 2026</p>
        </div>

        <div className="page-section">
          <h2>1. Data Controller</h2>
          <p>
            Flo Studios acts as the data controller for personal data processed
            through our platform. This means we determine the purposes and means
            of processing your personal data. If you access Flo Studios through
            an enterprise plan provided by your employer, your employer may act
            as a joint data controller for certain processing activities.
          </p>
          <p>
            Our Data Protection Officer can be reached at{' '}
            <strong>dpo@flostudios.com</strong>. You may contact them with any
            questions or concerns about how we process your personal data.
          </p>
        </div>

        <div className="page-section">
          <h2>2. Legal Bases for Processing</h2>
          <p>
            Under the GDPR, we must have a legal basis for processing your
            personal data. We rely on the following bases depending on the
            processing activity:
          </p>
          <ul>
            <li>
              <strong>Contract performance:</strong> Processing necessary to
              provide you with the Service, including account management, session
              delivery, and feedback generation
            </li>
            <li>
              <strong>Legitimate interests:</strong> Processing necessary for
              our legitimate business interests, such as improving our AI models
              with anonymized data, preventing fraud, and ensuring platform
              security
            </li>
            <li>
              <strong>Consent:</strong> Processing based on your explicit
              consent, such as receiving marketing communications or
              participating in research programs
            </li>
            <li>
              <strong>Legal obligation:</strong> Processing necessary to comply
              with applicable laws and regulations
            </li>
          </ul>
        </div>

        <div className="page-section">
          <h2>3. Your Rights Under GDPR</h2>
          <p>
            As a data subject in the EEA, you have the following rights under
            the GDPR. We are committed to honoring these rights promptly and
            transparently:
          </p>
          <div className="page-card">
            <h3>Right of Access</h3>
            <p>
              You have the right to obtain confirmation of whether we process
              your personal data and to request a copy of that data. We will
              provide this information in a commonly used electronic format
              within 30 days of your request.
            </p>
          </div>
          <div className="page-card">
            <h3>Right to Rectification</h3>
            <p>
              You have the right to request correction of inaccurate personal
              data and to have incomplete data completed. You can update most
              account information directly through your profile settings.
            </p>
          </div>
          <div className="page-card">
            <h3>Right to Erasure</h3>
            <p>
              You have the right to request deletion of your personal data in
              certain circumstances, including when the data is no longer
              necessary for the purposes for which it was collected or when you
              withdraw consent.
            </p>
          </div>
          <div className="page-card">
            <h3>Right to Data Portability</h3>
            <p>
              You have the right to receive your personal data in a structured,
              commonly used, machine-readable format and to transmit that data
              to another controller without hindrance.
            </p>
          </div>
          <div className="page-card">
            <h3>Right to Object</h3>
            <p>
              You have the right to object to processing based on legitimate
              interests at any time. We will cease processing unless we
              demonstrate compelling legitimate grounds that override your
              interests, rights, and freedoms.
            </p>
          </div>
          <div className="page-card">
            <h3>Right to Restrict Processing</h3>
            <p>
              You have the right to request restriction of processing in certain
              circumstances, such as when you contest the accuracy of your data
              or when processing is unlawful but you oppose erasure.
            </p>
          </div>
        </div>

        <div className="page-section">
          <h2>4. International Data Transfers</h2>
          <p>
            Your personal data may be transferred to and processed in countries
            outside the EEA. When we transfer data internationally, we ensure
            appropriate safeguards are in place, including Standard Contractual
            Clauses approved by the European Commission and adequacy decisions
            where applicable.
          </p>
          <p>
            We regularly review our data transfer mechanisms to ensure they
            provide adequate protection in accordance with GDPR requirements and
            relevant court decisions.
          </p>
        </div>

        <div className="page-section">
          <h2>5. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to
            fulfill the purposes described in our Privacy Policy. Specific
            retention periods include:
          </p>
          <ul>
            <li>Account data: retained for the duration of your account plus 30 days after deletion</li>
            <li>Session data: retained for 12 months, then anonymized</li>
            <li>Analytics data: retained in anonymized form indefinitely</li>
            <li>Communication records: retained for 24 months</li>
            <li>Legal compliance data: retained as required by applicable law</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>6. Automated Decision-Making</h2>
          <p>
            Our AI provides automated feedback on your communication during
            role-play sessions. This feedback is generated algorithmically based
            on your responses. These automated assessments do not produce legal
            effects or similarly significant effects on you, and are intended
            solely as training aids.
          </p>
          <p>
            If your employer uses aggregate analytics from enterprise plans for
            performance-related decisions, that processing is the responsibility
            of your employer as a data controller.
          </p>
        </div>

        <div className="page-section">
          <h2>7. Complaints</h2>
          <p>
            If you believe we have not adequately addressed your data protection
            concerns, you have the right to lodge a complaint with your local
            supervisory authority. We encourage you to contact us first at{' '}
            <strong>dpo@flostudios.com</strong> so we can attempt to resolve
            your concern directly.
          </p>
          <p>
            For more information about your privacy rights, please see our{' '}
            <Link to="/privacy" style={{ color: '#555' }}>Privacy Policy</Link>{' '}
            or <Link to="/contact" style={{ color: '#555' }}>contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GDPRPage;
