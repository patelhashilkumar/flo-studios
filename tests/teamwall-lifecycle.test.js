import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getDivisionById } from '../src/data/divisionsData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

test('1. divisionsData exports Development Division with 11 verbatim stages and focus outcomes', () => {
  const devDivision = getDivisionById('development')
  assert.ok(devDivision, 'Development division must exist')
  assert.equal(devDivision.stages.length, 11, 'Development division must have exactly 11 stages')

  const expectedTitles = [
    'Requirements & Product Planning',
    'Market & Technical Research',
    'Estimation, Proposal & Project Setup',
    'UI/UX Design',
    'Technical Architecture & Development Planning',
    'Development',
    'QA & Testing',
    'Pre-Launch / Release Preparation',
    'Deployment & Launch',
    'Post-Launch Support & Maintenance',
    'Optimization & Continuous Development'
  ]

  devDivision.stages.forEach((stage, idx) => {
    const expectedNum = String(idx + 1).padStart(2, '0')
    assert.equal(stage.number, expectedNum, `Stage ${idx + 1} number must be ${expectedNum}`)
    assert.equal(stage.title, expectedTitles[idx], `Stage ${idx + 1} title mismatch`)
    assert.ok(stage.description && stage.description.length > 20, `Stage ${idx + 1} description must be present`)
    assert.ok(stage.focus && stage.focus.length > 10, `Stage ${idx + 1} focus deliverable must be present`)
  })
})

test('2. divisionsData exports Creator Division with 8 stages and focus outcomes', () => {
  const creatorDivision = getDivisionById('creator')
  assert.ok(creatorDivision, 'Creator division must exist')
  assert.equal(creatorDivision.stages.length, 8, 'Creator division must have exactly 8 stages')

  creatorDivision.stages.forEach((stage, idx) => {
    assert.ok(stage.number, `Creator stage ${idx + 1} must have a number`)
    assert.ok(stage.title, `Creator stage ${idx + 1} must have a title`)
    assert.ok(stage.description, `Creator stage ${idx + 1} must have a description`)
    assert.ok(stage.focus, `Creator stage ${idx + 1} must have a focus`)
  })
})

test('3. ServicesSection component incorporates Teamwall interactive roster and showcase card', () => {
  const jsxPath = path.join(rootDir, 'src', 'components', 'ServicesSection.jsx')
  const content = fs.readFileSync(jsxPath, 'utf8')

  assert.ok(content.includes('teamwall-container'), 'ServicesSection must include teamwall-container')
  assert.ok(content.includes('teamwall-roster'), 'ServicesSection must include teamwall-roster')
  assert.ok(content.includes('teamwall-showcase'), 'ServicesSection must include teamwall-showcase')
  assert.ok(content.includes('teamwall-card'), 'ServicesSection must include teamwall-card')
  assert.ok(content.includes('teamwall-row__arrow'), 'ServicesSection must render active arrow indicator')
  assert.ok(content.includes('handlePrevStage'), 'ServicesSection must include handlePrevStage navigation')
  assert.ok(content.includes('handleNextStage'), 'ServicesSection must include handleNextStage navigation')
  assert.ok(content.includes('safeStageIndex'), 'ServicesSection must safely bound active stage index')
})

test('4. ServicesSection styles enforce Manrope typography and Teamwall layout without emojis', () => {
  const cssPath = path.join(rootDir, 'src', 'components', 'ServicesSection.css')
  const content = fs.readFileSync(cssPath, 'utf8')

  assert.ok(content.includes('.teamwall-container'), 'CSS must define .teamwall-container')
  assert.ok(content.includes('.teamwall-row'), 'CSS must define .teamwall-row')
  assert.ok(content.includes('.teamwall-showcase'), 'CSS must define .teamwall-showcase')
  assert.ok(content.includes('.teamwall-card'), 'CSS must define .teamwall-card')
  assert.ok(!content.includes('Panchang'), 'CSS must NOT contain Panchang font')

  // Emoji regex check on user-facing source files
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
  assert.ok(!emojiRegex.test(content), 'ServicesSection.css must not contain emojis')

  const jsxPath = path.join(rootDir, 'src', 'components', 'ServicesSection.jsx')
  const jsxContent = fs.readFileSync(jsxPath, 'utf8')
  assert.ok(!emojiRegex.test(jsxContent), 'ServicesSection.jsx must not contain emojis')
})

test('5. ServicesSection implements RollingNumber odometer, layoutId active line, photo frame, and smooth scroll', () => {
  const jsxPath = path.join(rootDir, 'src', 'components', 'ServicesSection.jsx')
  const jsxContent = fs.readFileSync(jsxPath, 'utf8')

  assert.ok(jsxContent.includes('RollingNumber'), 'ServicesSection must include RollingNumber component')
  assert.ok(jsxContent.includes('teamwall-active-line'), 'ServicesSection must include teamwall-active-line layoutId')
  assert.ok(jsxContent.includes('teamwall-frame'), 'ServicesSection must include teamwall-frame')
  assert.ok(jsxContent.includes('teamwall-footer'), 'ServicesSection must include teamwall-footer')
  assert.ok(jsxContent.includes('scrollIntoView'), 'ServicesSection must support smooth scrolling into view')
  assert.ok(jsxContent.includes("behavior: 'smooth'"), 'ServicesSection must use smooth scroll behavior')

  const cssPath = path.join(rootDir, 'src', 'components', 'ServicesSection.css')
  const cssContent = fs.readFileSync(cssPath, 'utf8')
  assert.ok(cssContent.includes('.rolling-number'), 'CSS must include .rolling-number styles')
  assert.ok(cssContent.includes('.teamwall-list__active-line') || cssContent.includes('.teamwall-bar'), 'CSS must include active line styles')
  assert.ok(cssContent.includes('.teamwall-frame'), 'CSS must include frame styles')
  assert.ok(cssContent.includes('.teamwall-footer'), 'CSS must include footer styles')
  assert.ok(cssContent.includes('scroll-behavior: smooth'), 'CSS must include smooth scroll behavior on roster')
})

test('6. SlotText3D implements 3D slot tumbling text animation and integrates into stage rows', () => {
  const slotJsxPath = path.join(rootDir, 'src', 'components', 'SlotText3D.jsx')
  const slotCssPath = path.join(rootDir, 'src', 'components', 'SlotText3D.css')
  const servicesJsxPath = path.join(rootDir, 'src', 'components', 'ServicesSection.jsx')

  assert.ok(fs.existsSync(slotJsxPath), 'SlotText3D.jsx must exist')
  assert.ok(fs.existsSync(slotCssPath), 'SlotText3D.css must exist')

  const slotJsx = fs.readFileSync(slotJsxPath, 'utf8')
  const slotCss = fs.readFileSync(slotCssPath, 'utf8')
  const servicesJsx = fs.readFileSync(servicesJsxPath, 'utf8')

  // Zero emojis check
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
  assert.ok(!emojiRegex.test(slotJsx), 'SlotText3D.jsx must not contain emojis')
  assert.ok(!emojiRegex.test(slotCss), 'SlotText3D.css must not contain emojis')

  // Teamwall 2D Stacked Roll Architecture assertions
  assert.ok(slotJsx.includes('staggerDelay'), 'SlotText3D must support staggered character delay')
  assert.ok(slotJsx.includes('sr-only'), 'SlotText3D must provide screen reader text accessibility')

  // CSS 2D Stacked Roll specifications (Authentic Teamwall Architecture)
  assert.ok(slotCss.includes('.slot-3d-text__ch'), 'SlotText3D.css must define .slot-3d-text__ch clipping container')
  assert.ok(slotCss.includes('overflow: hidden'), 'SlotText3D.css must clip character overflow')
  assert.ok(slotCss.includes('.slot-3d-text__ch-in'), 'SlotText3D.css must define .slot-3d-text__ch-in vertical flex strip')
  assert.ok(slotCss.includes('transform: translateY(-50%)'), 'SlotText3D.css must roll letters translateY(-50%) on hover')

  // ServicesSection integration
  assert.ok(servicesJsx.includes("import SlotText3D from './SlotText3D'"), 'ServicesSection must import SlotText3D')
  assert.ok(servicesJsx.includes('<SlotText3D'), 'ServicesSection must mount SlotText3D component')
  assert.ok(servicesJsx.includes('isHovered={hoveredRowIdx === sIdx}'), 'ServicesSection must wire hoveredRowIdx to SlotText3D')
  assert.ok(servicesJsx.includes('isActive={isActive}'), 'ServicesSection must wire isActive to SlotText3D')
})

test('7. ServicesSection quote card renders all-caps stage description with quotes in black text', () => {
  const jsxPath = path.join(rootDir, 'src', 'components', 'ServicesSection.jsx')
  const cssPath = path.join(rootDir, 'src', 'components', 'ServicesSection.css')

  const jsxContent = fs.readFileSync(jsxPath, 'utf8')
  const cssContent = fs.readFileSync(cssPath, 'utf8')

  assert.ok(jsxContent.includes('teamwall-quote-card'), 'JSX must render teamwall-quote-card')
  assert.ok(jsxContent.includes('toUpperCase()'), 'JSX must transform stage description to uppercase')
  assert.ok(jsxContent.includes('teamwall-quote-card__desc'), 'JSX must render teamwall-quote-card__desc')
  assert.ok(!jsxContent.includes('teamwall-frame__img'), 'JSX must no longer render photo frame image')

  assert.ok(cssContent.includes('.teamwall-quote-card'), 'CSS must define .teamwall-quote-card')
  assert.ok(cssContent.includes('.teamwall-quote-card__desc'), 'CSS must define .teamwall-quote-card__desc')
  assert.ok(cssContent.includes('color: #000000') || cssContent.includes('color: #000'), 'CSS must style description in black text')
  assert.ok(cssContent.includes('text-transform: uppercase'), 'CSS must enforce uppercase styling')
})

test('8. ServicesSection renders stage column before stage name with correct 3-column grid', () => {
  const jsxPath = path.join(rootDir, 'src', 'components', 'ServicesSection.jsx')
  const cssPath = path.join(rootDir, 'src', 'components', 'ServicesSection.css')

  const jsxContent = fs.readFileSync(jsxPath, 'utf8')
  const cssContent = fs.readFileSync(cssPath, 'utf8')

  const stageWrapIdx = jsxContent.indexOf('teamwall-row__stage-wrap')
  const titleWrapIdx = jsxContent.indexOf('teamwall-row__title-wrap')

  assert.ok(stageWrapIdx !== -1, 'JSX must contain teamwall-row__stage-wrap')
  assert.ok(titleWrapIdx !== -1, 'JSX must contain teamwall-row__title-wrap')
  assert.ok(stageWrapIdx < titleWrapIdx, 'Stage column must be positioned before stage name in DOM')

  assert.ok(cssContent.includes('.teamwall-row__stage-wrap'), 'CSS must define .teamwall-row__stage-wrap')
  assert.ok(cssContent.includes('grid-template-columns: auto minmax(0, 1fr) auto'), 'CSS must define 3-column grid with stage first')
})

test('9. ServicesSection renders dark hero with cards and manifesto before the division switcher', () => {
  const jsxPath = path.join(rootDir, 'src', 'components', 'ServicesSection.jsx')
  const cssPath = path.join(rootDir, 'src', 'components', 'ServicesSection.css')

  const jsxContent = fs.readFileSync(jsxPath, 'utf8')
  const cssContent = fs.readFileSync(cssPath, 'utf8')

  const heroIdx = jsxContent.indexOf('services-hero')
  const switcherIdx = jsxContent.indexOf('services-switcher-wrap')

  assert.ok(heroIdx !== -1, 'JSX must contain services-hero')
  assert.ok(switcherIdx !== -1, 'JSX must contain services-switcher-wrap')
  assert.ok(heroIdx < switcherIdx, 'services-hero must appear before services-switcher-wrap')

  assert.ok(jsxContent.includes('Bringing Ideas to Life'), 'JSX must render eyebrow text')
  assert.ok(jsxContent.includes('From idea to design to deployment to distribution'), 'JSX must render headline text')
  assert.ok(jsxContent.includes('Get in touch'), 'JSX must render CTA button')
  assert.ok(jsxContent.includes('services-hero__cards'), 'JSX must render showcase cards')
  assert.ok(jsxContent.includes('We operate across two dedicated divisions designed to'), 'JSX must render manifesto text')

  assert.ok(cssContent.includes('.services-hero'), 'CSS must define .services-hero')
  assert.ok(cssContent.includes('.services-hero__cards'), 'CSS must define .services-hero__cards')
  assert.ok(cssContent.includes('.services-hero__manifesto'), 'CSS must define .services-hero__manifesto')
})

test('10. ServicesSection renders inverted differentiator quote callout with Get in touch pill button', () => {
  const jsxPath = path.join(rootDir, 'src', 'components', 'ServicesSection.jsx')
  const cssPath = path.join(rootDir, 'src', 'components', 'ServicesSection.css')
  const pagePath = path.join(rootDir, 'src', 'pages', 'ServicesPage.jsx')

  const jsxContent = fs.readFileSync(jsxPath, 'utf8')
  const cssContent = fs.readFileSync(cssPath, 'utf8')
  const pageContent = fs.readFileSync(pagePath, 'utf8')

  assert.ok(jsxContent.includes('division-quote-cta'), 'JSX must render division-quote-cta')
  assert.ok(jsxContent.includes('division-quote-cta__quote'), 'JSX must render division-quote-cta__quote')
  assert.ok(jsxContent.includes('activeDivision.coreDifferentiator.quote'), 'JSX must dynamically bind active division quote')
  assert.ok(jsxContent.includes('division-quote-cta__btn'), 'JSX must render division-quote-cta__btn')
  assert.ok(jsxContent.includes('Get in touch'), 'Button must display "Get in touch"')

  assert.ok(cssContent.includes('.division-quote-cta'), 'CSS must style .division-quote-cta')
  assert.ok(cssContent.includes('.division-quote-cta__quote'), 'CSS must style .division-quote-cta__quote')
  assert.ok(cssContent.includes('.division-quote-cta__btn'), 'CSS must style .division-quote-cta__btn')
  assert.ok(cssContent.includes('background: #000000') || cssContent.includes('background: #000'), 'CTA button must have black background')
  assert.ok(cssContent.includes('color: #ffffff') || cssContent.includes('color: #fff'), 'CTA button must have white text')

  assert.ok(!pageContent.includes('services-page__cta-section'), 'ServicesPage must not render redundant cta-section')
})

test('11. ServicesSection renders division intro statement and creator logo matching mockup', () => {
  const jsxPath = path.join(rootDir, 'src', 'components', 'ServicesSection.jsx')
  const cssPath = path.join(rootDir, 'src', 'components', 'ServicesSection.css')

  const jsxContent = fs.readFileSync(jsxPath, 'utf8')
  const cssContent = fs.readFileSync(cssPath, 'utf8')

  const devDivision = getDivisionById('development')
  assert.ok(devDivision.introStatement, 'Development division must define introStatement')
  assert.ok(
    devDivision.introStatement[0].includes('handpicked limited number of venture-backed startups'),
    'Development intro statement must contain handpicked startups text'
  )
  assert.ok(
    devDivision.introStatement[1].includes('initial customer acquisition'),
    'Development intro statement must contain customer acquisition text'
  )

  const creatorDivision = getDivisionById('creator')
  assert.ok(creatorDivision.introStatement, 'Creator division must define introStatement')

  assert.ok(jsxContent.includes('services-hero__intro'), 'JSX must render services-hero__intro')
  assert.ok(jsxContent.includes('services-switcher__creator-img'), 'JSX must render services-switcher__creator-img')
  assert.ok(jsxContent.includes('creator-division.png'), 'JSX must link to creator-division.png asset')

  assert.ok(cssContent.includes('.services-hero__intro'), 'CSS must define .services-hero__intro')
  assert.ok(cssContent.includes('.services-switcher__creator-img'), 'CSS must define .services-switcher__creator-img')
})

