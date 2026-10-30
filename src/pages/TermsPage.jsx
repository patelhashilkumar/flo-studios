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

export default function TermsPage() {
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
        title="Terms of Use | Flo Studios"
        description="Flo Studios Terms of Use. Governing your access to and use of flostudio.co, intellectual property rights, and terms of service engagements."
        canonicalUrl="https://www.flostudio.co/terms"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Terms of Use', item: 'https://www.flostudio.co/terms', url: 'https://www.flostudio.co/terms' },
        ]}
      />

      <div className="legal-page__container">
        <header className="legal-page__header">
          <span className="legal-page__tag">LEGAL &amp; COMPLIANCE</span>
          <h1 className="legal-page__title">Terms of Use</h1>
          <div className="legal-page__meta-bar">
            <span className="legal-page__updated">Last updated: October 2026</span>
            <div className="legal-page__switch-links">
              <span>Looking for privacy?</span>
              <Link to="/privacy" className="legal-page__switch-link">Privacy Policy →</Link>
            </div>
          </div>
        </header>

        <div className="legal-page__body">
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">1. Who We Are</h2>
            <p>
              This website is operated by Flo Studios, a media and development studio registered and headquartered in London, United Kingdom. We provide services across two divisions - our Development Division, which partners with venture-backed founders and businesses across the full product lifecycle, and our Creator Division, which builds end-to-end growth systems for high-impact creators.
            </p>
            <p>
              These Terms of Use govern your access to and use of this website, located at flostudio.co, and apply to all visitors regardless of location. By accessing this site, you agree to be bound by these terms. If you do not agree with any part of these terms, you should not use this website.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">2. Who These Terms Apply To</h2>
            <p>
              This website is intended for use by individuals and organizations located in the United Kingdom, the European Union, and North America. While we do not technically restrict access from other regions, our services are offered exclusively within these markets and these terms are written with those jurisdictions in mind. Nothing on this website constitutes an offer to provide services in any jurisdiction where we do not operate.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">3. Use of This Website</h2>
            <p>
              You may use this website for lawful purposes only. By accessing flostudio.co, you agree that you will not use the site in any way that violates applicable local, national, or international law or regulation, that is fraudulent or misleading, that transmits unsolicited or unauthorised advertising or promotional material, or that attempts to gain unauthorised access to any part of the site or its underlying systems.
            </p>
            <p>
              You also agree not to copy, reproduce, scrape, or systematically extract any content from this website - including but not limited to our articles, case studies, written copy, visual assets, or any other materials - without our prior written permission.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">4. Intellectual Property</h2>
            <p>
              All content published on this website - including written articles, case studies, visual assets, branding, design, and all other materials - is the original work of Flo Studios and is protected under applicable intellectual property laws in the United Kingdom and internationally.
            </p>
            <p>
              You may share links to our articles and content provided that you clearly attribute the work to Flo Studios and include a direct link back to the original page on flostudio.co. You may not reproduce, republish, or distribute our written content - in whole or in meaningful part - on any other platform, website, or publication without obtaining our prior written permission. If you wish to reference or quote our work, please contact us at the details provided at the end of this page. Any unauthorised use of our content may result in legal action under applicable copyright and intellectual property law.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">5. Case Studies and Client Work</h2>
            <p>
              This website features case studies and examples of client work published with the express written permission of the relevant clients. These materials are displayed for informational and portfolio purposes only and do not constitute any representation or warranty regarding the results achievable by any future client. All client names, brand assets, and project details featured in case studies remain the intellectual property of their respective owners and are used here under agreement.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">6. Forms and Submissions</h2>
            <p>
              This website contains two interactive forms through which visitors may submit information to us.
            </p>
            <p>
              The Careers Form, accessible via our Careers page, allows individuals to submit their details in connection with open roles at Flo Studios. By submitting this form you consent to Flo Studios retaining and processing your submitted information for the purpose of evaluating your application. We will not use this information for any other purpose without your consent.
            </p>
            <p>
              The Contact Form, accessible via our Contact page, allows individuals and organisations to submit enquiries regarding potential collaboration or service engagements. By submitting this form you confirm that the information you provide is accurate and that you are authorised to make contact on behalf of any organisation you represent. Submitting a contact form does not constitute a formal engagement with Flo Studios and does not create any contractual relationship between the submitting party and Flo Studios.
            </p>
            <p>
              We also provide a call booking link through cal.com for scheduling discovery conversations. Please note that cal.com is a third-party platform and your use of that service is subject to cal.com’s own terms and privacy policy, over which Flo Studios has no control.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">7. No Warranties</h2>
            <p>
              This website and its contents are provided on an “as is” basis. While we make reasonable efforts to ensure that the information on this website is accurate and up to date, Flo Studios makes no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or availability of the website or any information contained within it. We reserve the right to update, modify, or remove any content at any time without notice.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Flo Studios shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of this website or any content, services, or information obtained through it. This includes, without limitation, any errors or omissions in content, any loss of data, or any interruption or unavailability of the website. Nothing in these terms excludes or limits our liability for fraud, death or personal injury caused by negligence, or any other liability that cannot be excluded under English law.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">9. Governing Law</h2>
            <p>
              These Terms of Use are governed by and construed in accordance with the laws of England and Wales. Any disputes arising in connection with these terms or your use of this website shall be subject to the exclusive jurisdiction of the courts of England and Wales, except where applicable consumer protection laws in the EU or North America grant you additional rights that cannot be contractually waived.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">10. Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms of Use at any time. Any changes will be published on this page with an updated date at the top. Your continued use of the website following any changes constitutes your acceptance of the revised terms. We recommend checking this page periodically.
            </p>
          </section>

          <section className="legal-page__section">
            <h2 className="legal-page__section-title">11. Contact</h2>
            <p>
              If you have any questions about these Terms of Use, wish to request permission to use our content, or need to raise any concern related to this website, please contact us:
            </p>
            <div className="legal-page__card">
              <strong>The Flo Team</strong>
              London, United Kingdom<br />
              <a href="mailto:theflostudios0@gmail.com" className="legal-page__link">theflostudios0@gmail.com</a><br />
              <Link to="/contact" className="legal-page__link">Visit Contact Page →</Link>
            </div>
          </section>
        </div>
      </div>
    </motion.main>
  )
}
