import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { getAllBlogs, getBlogBySlug } from '../src/data/blogsData.js'

test('1. blogsData exports structured editorial articles', () => {
  const blogs = getAllBlogs()
  assert.ok(Array.isArray(blogs), 'getAllBlogs should return an array')
  assert.equal(blogs.length, 8, 'Should contain exactly 8 blogs')

  // Blog 1 checks: Nobody Owns the Outcome
  const blog1 = getBlogBySlug('nobody-owns-the-outcome')
  assert.ok(blog1, 'Should find blog-1 by slug')
  assert.equal(blog1.title, 'Nobody Owns the Outcome: What gets lost every time a project changes hands')
  assert.equal(blog1.type, 'article')
  assert.match(blog1.summaryQuote, /A project doesn’t fail at the handoff/)

  // Verify the 8 stages exist in blog-1
  const stageSection = blog1.content.find((b) => b.stages)
  assert.ok(stageSection, 'Should contain stage-by-stage section')
  assert.equal(stageSection.stages.length, 8, 'Should define exactly 8 stages')
  assert.equal(stageSection.stages[0].name, 'Product Planning')
  assert.equal(stageSection.stages[7].name, 'Post-launch Support & Maintenance')

  // Blog 2 checks: Taste is the New Skill
  const blog2 = getBlogBySlug('taste-is-the-new-skill')
  assert.ok(blog2, 'Should find blog-2 by slug')
  assert.equal(blog2.title, 'Taste is the New Skill')
  assert.equal(blog2.number, '02')
  assert.match(blog2.summaryQuote, /Taste has always mattered/)

  // Verify Nuwadan quote exists in blog-2
  const pullQuoteSection = blog2.content.find((b) => b.pullQuote && b.pullQuote.includes('Nuwadan'))
  assert.ok(pullQuoteSection, 'Should contain designer quote from Nuwadan')

  // Blog 3 checks: The Smarter the Tool, the More Expensive Your Vagueness Gets
  const blog3 = getBlogBySlug('the-clarity-tax')
  assert.ok(blog3, 'Should find blog-3 by slug')
  assert.equal(blog3.number, '03')
  assert.match(blog3.title, /The Smarter the Tool/)
  assert.match(blog3.summaryQuote, /The cost of vagueness has always been real/)

  // Blog 4 checks: Why Most Products Die in the Gap Between Launch and Traction
  const blog4 = getBlogBySlug('why-most-products-die-between-launch-and-traction')
  assert.ok(blog4, 'Should find blog-4 by slug')
  assert.equal(blog4.number, '04')
  assert.equal(blog4.title, 'Why Most Products Die in the Gap Between Launch and Traction')
  assert.match(blog4.excerpt, /most dangerous phase of any digital product/)
  assert.match(blog4.summaryQuote, /Launch is an event\. Traction is an ongoing calibration/)

  // Blog 5 checks: The Brief Is the Product
  const blog5 = getBlogBySlug('the-brief-is-the-product')
  assert.ok(blog5, 'Should find blog-5 by slug')
  assert.equal(blog5.number, '05')
  assert.equal(blog5.title, 'The Brief Is the Product')
  assert.match(blog5.excerpt, /brief either captures real intent or approximates it/)
  assert.match(blog5.summaryQuote, /Execution does not create clarity; it exposes the lack of it/)

  // Blog 6 checks: Why Most Tech Products Look the Same Now
  const blog6 = getBlogBySlug('why-most-tech-products-look-the-same-now')
  assert.ok(blog6, 'Should find blog-6 by slug')
  assert.equal(blog6.number, '06')
  assert.equal(blog6.title, 'Why Most Tech Products Look the Same Now')
  assert.match(blog6.excerpt, /homogenisation of digital product design/)
  assert.match(blog6.summaryQuote, /an industry of interchangeable mirrors/)

  // Blog 7 checks: Why Consistency Is the Most Misunderstood Word in the Creator Space
  const blog7 = getBlogBySlug('why-consistency-is-misunderstood-in-creator-space')
  assert.ok(blog7, 'Should find blog-7 by slug')
  assert.equal(blog7.number, '07')
  assert.equal(blog7.title, 'Why Consistency Is the Most Misunderstood Word in the Creator Space')
  assert.match(blog7.excerpt, /mistaking frequency for perspective leads to burnout/)
  assert.match(blog7.summaryQuote, /Audiences don’t subscribe to a publishing schedule/)

  // Blog 8 checks: The Dual Engine: Why Modern Software Must Tell a Story and Media Must Be Engineered
  const blog8 = getBlogBySlug('the-dual-engine-thesis')
  assert.ok(blog8, 'Should find blog-8 by slug')
  assert.equal(blog8.number, '08')
  assert.match(blog8.title, /The Dual Engine/)
  assert.match(blog8.excerpt, /software engineered as an architectural artifact, powered by media/)
  assert.match(blog8.summaryQuote, /A great product without a point of view is an invisible utility/)

  // Verify zero external Storyblok images in blogsData.js
  const blogsDataRaw = fs.readFileSync(path.resolve('src/data/blogsData.js'), 'utf8')
  assert.ok(!blogsDataRaw.includes('storyblok.com'), 'blogsData must not contain storyblok.com URLs')
})

test('2. ArticlePage and route wiring exist in App.jsx and LatestPage.jsx', () => {
  const appJsx = fs.readFileSync(path.resolve('src/App.jsx'), 'utf8')
  assert.match(appJsx, /path="\/latest\/:slug"/, 'App.jsx must declare /latest/:slug route')
  assert.match(appJsx, /ArticlePage/, 'App.jsx must import ArticlePage')

  const latestJsx = fs.readFileSync(path.resolve('src/pages/LatestPage.jsx'), 'utf8')
  assert.match(latestJsx, /getAllBlogs/, 'LatestPage must import and display editorial blogs')
  assert.match(latestJsx, /to=\{`\/latest\/\$\{item\.slug\}`\}/, 'LatestPage cards must link to /latest/:slug')

  // Verify LatestPage contains zero Storyblok URLs
  assert.ok(!latestJsx.includes('storyblok.com'), 'LatestPage must not contain storyblok.com URLs')
})

test('3. LatestPage and NewsSection enforce 4-column desktop layout (4 cards per row for 8 total)', () => {
  const pagesCss = fs.readFileSync(path.resolve('src/pages/Pages.css'), 'utf8')
  assert.match(pagesCss, /\.latest-page__grid\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/s, 'Pages.css must declare 4-column grid for .latest-page__grid')

  const newsCss = fs.readFileSync(path.resolve('src/components/NewsSection.css'), 'utf8')
  assert.match(newsCss, /\.news-section__grid\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/s, 'NewsSection.css must declare 4-column grid for .news-section__grid')
})

test('4. All 8 blogs define concise cardTitle, cardCategory, and cardExcerpt for clean card rendering', () => {
  const blogs = getAllBlogs()
  assert.equal(blogs.length, 8)
  for (const b of blogs) {
    assert.ok(b.cardTitle, `Blog ${b.number} must have cardTitle`)
    assert.ok(b.cardCategory, `Blog ${b.number} must have cardCategory`)
    assert.ok(b.cardExcerpt, `Blog ${b.number} must have cardExcerpt`)
    assert.ok(b.cardTitle.length <= 40, `Blog ${b.number} cardTitle should be concise (<= 40 chars)`)
    assert.ok(b.cardExcerpt.length <= 80, `Blog ${b.number} cardExcerpt should be concise (<= 80 chars)`)
  }
})

test('5. LatestPage implements Instrument.com dark visual architecture (wordmark, breadcrumb, headline, dark navbar)', () => {
  const latestJsx = fs.readFileSync(path.resolve('src/pages/LatestPage.jsx'), 'utf8')
  assert.match(latestJsx, /FLO STUDIOS/, 'LatestPage must render edge-to-edge FLO STUDIOS wordmark')
  assert.match(latestJsx, /latest-page__breadcrumb/, 'LatestPage must render breadcrumb navigation')
  assert.match(latestJsx, /Breaking news, insights, and articles\./, 'LatestPage headline must be Breaking news, insights, and articles.')

  const pagesCss = fs.readFileSync(path.resolve('src/pages/Pages.css'), 'utf8')
  assert.match(pagesCss, /\.latest-page\s*\{[^}]*background-color:\s*#000000/s, 'Pages.css must enforce #000000 dark background on .latest-page')
  assert.match(pagesCss, /\.latest-page__wordmark\s*\{[^}]*font-family:\s*var\(--font-panchang\)/s, 'Pages.css must style wordmark with Panchang')

  const navJsx = fs.readFileSync(path.resolve('src/components/FocusLensNavbar.jsx'), 'utf8')
  assert.match(navJsx, /isDarkNav \? 'global-header--dark' : ''/, 'FocusLensNavbar must apply dark modifier on /latest')

  const navCss = fs.readFileSync(path.resolve('src/components/FocusLensNavbar.css'), 'utf8')
  assert.match(navCss, /\.global-header--dark\s*\{[^}]*background-color:\s*#000000/s, 'FocusLensNavbar.css must style .global-header--dark')
})
