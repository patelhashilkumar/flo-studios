import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

test('1. App.jsx wires /privacy and /terms with lazy loading and alias redirects', () => {
  const appJsx = fs.readFileSync(path.resolve('src/App.jsx'), 'utf8')

  assert.match(appJsx, /import\('\.\/pages\/PrivacyPage'\)/, 'App.jsx must lazy-load PrivacyPage')
  assert.match(appJsx, /import\('\.\/pages\/TermsPage'\)/, 'App.jsx must lazy-load TermsPage')

  assert.match(appJsx, /<Route path="\/privacy" element={<PrivacyPage \/>} \/>/, 'Must wire /privacy route')
  assert.match(appJsx, /<Route path="\/privacy-policy" element={<Navigate to="\/privacy" replace \/>} \/>/, 'Must redirect /privacy-policy to /privacy')

  assert.match(appJsx, /<Route path="\/terms" element={<TermsPage \/>} \/>/, 'Must wire /terms route')
  assert.match(appJsx, /<Route path="\/terms-of-use" element={<Navigate to="\/terms" replace \/>} \/>/, 'Must redirect /terms-of-use to /terms')
})

test('2. Footer.jsx links to /privacy and /terms', () => {
  const footerJsx = fs.readFileSync(path.resolve('src/components/Footer.jsx'), 'utf8')

  assert.match(footerJsx, /<Link to="\/privacy" className="lg-footer__legal-link">Privacy Policy<\/Link>/, 'Footer must link to /privacy')
  assert.match(footerJsx, /<Link to="\/terms" className="lg-footer__legal-link">Terms of Use<\/Link>/, 'Footer must link to /terms')
})

test('3. PrivacyPage renders all 12 compliance sections and official company contact', () => {
  const privacyJsx = fs.readFileSync(path.resolve('src/pages/PrivacyPage.jsx'), 'utf8')

  assert.match(privacyJsx, /1\. Introduction/, 'Must include Section 1')
  assert.match(privacyJsx, /2\. Who We Are/, 'Must include Section 2')
  assert.match(privacyJsx, /3\. What Data We Collect and Why/, 'Must include Section 3')
  assert.match(privacyJsx, /3\.1 Careers Form/, 'Must include Section 3.1')
  assert.match(privacyJsx, /3\.2 Contact Form/, 'Must include Section 3.2')
  assert.match(privacyJsx, /3\.3 Website Analytics/, 'Must include Section 3.3')
  assert.match(privacyJsx, /3\.4 Future Mailing List/, 'Must include Section 3.4')
  assert.match(privacyJsx, /4\. How We Store Your Data/, 'Must include Section 4')
  assert.match(privacyJsx, /5\. How Long We Keep Your Data/, 'Must include Section 5')
  assert.match(privacyJsx, /6\. Cookies/, 'Must include Section 6')
  assert.match(privacyJsx, /7\. Your Rights/, 'Must include Section 7')
  assert.match(privacyJsx, /8\. Data Security/, 'Must include Section 8')
  assert.match(privacyJsx, /9\. Third-Party Services/, 'Must include Section 9')
  assert.match(privacyJsx, /10\. Children’s Privacy/, 'Must include Section 10')
  assert.match(privacyJsx, /11\. Changes to This Privacy Policy/, 'Must include Section 11')
  assert.match(privacyJsx, /12\. Contact Us/, 'Must include Section 12')
  assert.match(privacyJsx, /theflostudios0@gmail\.com/, 'Must use official theflostudios0@gmail.com email')
})

test('4. TermsPage renders all essential sections and official contact details', () => {
  const termsJsx = fs.readFileSync(path.resolve('src/pages/TermsPage.jsx'), 'utf8')

  assert.match(termsJsx, /1\. Who We Are/, 'Must include Section 1')
  assert.match(termsJsx, /2\. Who These Terms Apply To/, 'Must include Section 2')
  assert.match(termsJsx, /3\. Use of This Website/, 'Must include Section 3')
  assert.match(termsJsx, /4\. Intellectual Property/, 'Must include Section 4')
  assert.match(termsJsx, /5\. Case Studies and Client Work/, 'Must include Section 5')
  assert.match(termsJsx, /6\. Forms and Submissions/, 'Must include Section 6')
  assert.match(termsJsx, /7\. No Warranties/, 'Must include Section 7')
  assert.match(termsJsx, /8\. Limitation of Liability/, 'Must include Section 8')
  assert.match(termsJsx, /9\. Governing Law/, 'Must include Section 9')
  assert.match(termsJsx, /10\. Changes to These Terms/, 'Must include Section 10')
  assert.match(termsJsx, /11\. Contact/, 'Must include Section 11')
  assert.match(termsJsx, /theflostudios0@gmail\.com/, 'Must use official theflostudios0@gmail.com email')
})

test('5. Sitemap includes /privacy and /terms', () => {
  const sitemapXml = fs.readFileSync(path.resolve('public/sitemap.xml'), 'utf8')

  assert.match(sitemapXml, /<loc>https:\/\/www\.flostudio\.co\/privacy<\/loc>/, 'Sitemap must contain /privacy')
  assert.match(sitemapXml, /<loc>https:\/\/www\.flostudio\.co\/terms<\/loc>/, 'Sitemap must contain /terms')
})
