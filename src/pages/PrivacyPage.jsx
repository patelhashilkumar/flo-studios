import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import './LegalPage.css'

const pageV = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.main
      className="legal-page"
      variants={pageV}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <SEO
        title="Privacy Policy | Flo Studios"
        description="Flo Studios Privacy Policy. Explaining what personal data we collect, how we use and protect it in compliance with UK GDPR, EU GDPR, and applicable laws."
        canonicalUrl="https://www.flostudio.co/privacy"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Privacy Policy', item: 'https://www.flostudio.co/privacy', url: 'https://www.flostudio.co/privacy' },
        ]}
      />

      <div className="legal-page__container">
        <header className="legal-page__header">
          <span className="legal-page__tag">LEGAL &amp; COMPLIANCE</span>
          <h1 className="legal-page__title">Privacy Policy</h1>
          <div className="legal-page__meta-bar">
            <span className="legal-page__updated">Last updated: October 2026</span>
            <div className="legal-page__switch-links">
              <span>Looking for terms?</span>
              <Link to="/terms" className="legal-page__switch-link">Terms of Use →</Link>
            </div>
          </div>
        </header>

        <div className="legal-page__body">
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">1. Introduction</h2>
            <p>
              Flo Studios is committed to protecting the privacy of everyone who visits our website or interacts with us online. This Privacy Policy explains what personal data we collect, why we collect it, how we use it, how long we keep it, and what rights you have over it. This policy applies to all personal data collected through flostudio.co, including data submitted through our Careers and Contact forms, data collected through website analytics, and any future communications you may receive from us. It applies to visitors and users located in the United Kingdom, the European Union, and North America.
            </p>
            <p>
              Flo Studios is based in London, United Kingdom, and as such this policy is written in compliance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and where applicable, the EU General Data Protection Regulation (EU GDPR). If you are located in North America, additional rights may apply depending on your state or province, and we have addressed these where relevant.
            </p>
            <p>
              By using this website, you acknowledge that you have read and understood this Privacy Policy. This website is operated by Flo Studios, a media and development studio registered and headquartered in London, United Kingdom. We provide services across two divisions - our Development Division, which partners with venture-backed founders and businesses across the full product lifecycle, and our Creator Division, which builds end-to-end growth systems for high-impact creators.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">2. Who We Are</h2>
            <p>The data controller responsible for your personal data is:</p>
            <div className="legal-page__card">
              <strong>Flo Studios</strong>
              London, United Kingdom<br />
              <a href="mailto:theflostudios0@gmail.com" className="legal-page__link">theflostudios0@gmail.com</a><br />
              flostudio.co
            </div>
            <p>
              As data controller, we determine the purposes and means by which your personal data is processed. We do not currently have a designated Data Protection Officer, however all data-related queries and requests can be directed to us at the contact details above and will be handled with due care and attention.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">3. What Data We Collect and Why</h2>
            <p>
              We collect personal data through three distinct channels on this website, each with a specific and lawful purpose.
            </p>

            <h3 className="legal-page__subsection-title">3.1 Careers Form</h3>
            <p>
              When you apply for a role at Flo Studios through our Careers page, we collect the following information:
            </p>
            <ul className="legal-page__list">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>LinkedIn or profile URL</li>
              <li>Location and region</li>
              <li>Level of relevant experience</li>
              <li>Resume or CV (uploaded as PDF, DOC, or DOCX)</li>
              <li>Background summary and experience</li>
            </ul>
            <p>
              We collect this information for the sole purpose of evaluating your suitability for the role you have applied for. The lawful basis for processing this data is your consent, given at the point of submission when you confirm that all information provided is accurate and truthful. We will not use your application data for any purpose other than recruitment without seeking your separate consent.
            </p>

            <h3 className="legal-page__subsection-title">3.2 Contact Form</h3>
            <p>
              When you submit an enquiry through our Contact page, we collect the following information:
            </p>
            <ul className="legal-page__list">
              <li>Email address</li>
              <li>The nature or description of your enquiry, which may include details about a potential project or collaboration</li>
            </ul>
            <p>
              We collect this information to respond to your enquiry and to understand the nature of your interest in working with Flo Studios. The lawful basis for processing this data is our legitimate interest in responding to business enquiries and assessing potential engagements, balanced against your reasonable expectation that submitting a contact form will result in a response from us.
            </p>

            <h3 className="legal-page__subsection-title">3.3 Website Analytics</h3>
            <p>
              We use Google Analytics to collect anonymised data about how visitors use our website. This includes information such as pages visited, time spent on the site, general geographic location at a country or region level, device type, and referral source. This data is aggregated and does not identify you as an individual.
            </p>
            <p>
              The lawful basis for this processing is our legitimate interest in understanding how our website is being used so that we can improve it. Google Analytics may use cookies to collect this data. You can opt out of Google Analytics tracking at any time by using the Google Analytics Optout Browser Add-on, available at{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="legal-page__link">
                tools.google.com/dlpage/gaoptout
              </a>.
            </p>

            <h3 className="legal-page__subsection-title">3.4 Future Mailing List</h3>
            <p>
              We intend to introduce a mailing list in the future through which visitors can subscribe to receive updates, articles, and communications from Flo Studios. When this is implemented, we will collect your email address for this purpose, and we will only send communications to individuals who have explicitly opted in. You will always have the right to unsubscribe. We will update this Privacy Policy at that point to reflect the specific details of how that data is collected and managed.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">4. How We Store Your Data</h2>
            <p>
              All personal data submitted through our website forms is stored securely in our internal database, hosted on Supabase. Supabase is a cloud-based database platform that employs industry-standard security measures including encryption at rest and in transit. Access to this database is restricted to authorised members of the Flo Studios team only.
            </p>
            <p>
              We do not transfer your personal data to any third parties for storage, processing, or any other purpose, with the exception of Google Analytics as described in Section 3.3, which processes anonymised, aggregated data only.
            </p>
            <p>
              As a UK-based company using a cloud infrastructure provider, some data may be stored on servers located outside the UK or EU. Where this is the case, we ensure that appropriate safeguards are in place in accordance with UK GDPR requirements, including reliance on standard contractual clauses or adequacy decisions where applicable.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">5. How Long We Keep Your Data</h2>
            <p>
              We retain personal data only for as long as is necessary for the purpose for which it was collected.
            </p>
            <p>
              Data submitted through the Careers Form will be retained for the duration of the recruitment process for the role you applied for, and for a period of up to twelve months thereafter in case a suitable opportunity arises that matches your profile. After this period, your data will be securely deleted unless you have given us explicit consent to retain it for longer.
            </p>
            <p>
              Data submitted through the Contact Form will be retained for as long as is necessary to respond to your enquiry and to maintain a record of that communication, typically no longer than twenty-four months from the date of submission unless an ongoing business relationship is established, in which case your data will be retained for the duration of that relationship and for a reasonable period thereafter.
            </p>
            <p>
              Analytics data collected through Google Analytics is retained in accordance with Google’s own data retention policies, which you can review in Google’s Privacy Policy.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">6. Cookies</h2>
            <p>
              This website uses cookies in limited circumstances. A cookie is a small text file placed on your device when you visit a website. We use cookies in connection with Google Analytics to help us understand how visitors interact with our website. These are analytics cookies and do not identify you personally. No marketing, advertising, or tracking cookies are currently used on this website.
            </p>
            <p>
              You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of some parts of this website. For more information about cookies and how to manage them, you can visit{' '}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="legal-page__link">
                www.allaboutcookies.org
              </a>.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">7. Your Rights</h2>
            <p>
              Depending on your location, you have a number of rights in relation to your personal data. We are committed to honouring these rights and will respond to any request within one month of receipt.
            </p>
            <p>If you are located in the UK or EU, under UK GDPR and EU GDPR you have the right to:</p>
            <ul className="legal-page__list">
              <li>Access the personal data we hold about you and receive a copy of it</li>
              <li>Rectify any personal data that is inaccurate or incomplete</li>
              <li>Erase your personal data where there is no longer a lawful basis for us to hold it</li>
              <li>Restrict the processing of your personal data in certain circumstances</li>
              <li>Object to our processing of your personal data where we rely on legitimate interests as our lawful basis</li>
              <li>Data portability, meaning you can request that we provide your data in a structured, commonly used, and machine-readable format</li>
              <li>Withdraw consent at any time where processing is based on consent, without affecting the lawfulness of processing carried out prior to withdrawal</li>
            </ul>
            <p>
              You also have the right to lodge a complaint with the Information Commissioner’s Office (ICO), which is the UK’s supervisory authority for data protection matters. You can contact the ICO at{' '}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="legal-page__link">
                ico.org.uk
              </a>{' '}
              or by calling 0303 123 1113.
            </p>
            <p>
              If you are located in North America, your rights may vary depending on your jurisdiction. Where applicable, including under laws such as the California Consumer Privacy Act (CCPA), you have the right to know what personal data we collect about you, to request deletion of your personal data, and to opt out of the sale of your personal data. We do not sell personal data under any circumstances.
            </p>
            <p>
              To exercise any of these rights, please contact us using the details in Section 2.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">8. Data Security</h2>
            <p>
              We take the security of your personal data seriously and have implemented appropriate technical and organisational measures to protect it against unauthorised access, loss, destruction, or alteration. These measures include encrypted data storage through Supabase, restricted access controls, and regular review of our data handling practices.
            </p>
            <p>
              However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your personal data, we cannot guarantee its absolute security and any transmission is at your own risk.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">9. Third-Party Services</h2>
            <p>
              This website links to cal.com for the purpose of scheduling discovery calls with our team. Cal.com is an independent third-party platform and any personal data you provide when booking a call through cal.com is subject to cal.com’s own privacy policy and terms of service. We encourage you to review their privacy policy before submitting any information through their platform. Flo Studios does not control, and is not responsible for, the data practices of cal.com.
            </p>
            <p>
              Beyond this, we do not currently share your personal data with any other third-party services, platforms, or organisations.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">10. Children’s Privacy</h2>
            <p>
              This website is not directed at children under the age of 16 and we do not knowingly collect personal data from anyone under this age. If you believe that a child under 16 has submitted personal data to us through this website, please contact us immediately and we will take steps to delete that information.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our data practices, legal obligations, or the services we offer. Any updates will be published on this page with a revised date at the top. Where changes are significant, we will take reasonable steps to bring them to your attention. We encourage you to review this policy periodically to stay informed about how we are protecting your data.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, wish to exercise any of your rights, or have a concern about how we handle your personal data, please contact us at:
            </p>
            <div className="legal-page__card">
              <strong>Flo Studios</strong>
              London, United Kingdom<br />
              <a href="mailto:theflostudios0@gmail.com" className="legal-page__link">theflostudios0@gmail.com</a><br />
              flostudio.co
            </div>
            <p>
              We will respond to all legitimate requests within one month of receipt.
            </p>
          </section>
        </div>
      </div>
    </motion.main>
  )
}
