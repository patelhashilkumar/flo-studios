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

  // 3D Slot Architecture assertions
  assert.ok(slotJsx.includes('useAnimationControls'), 'SlotText3D must use Framer Motion animation controls')
  assert.ok(slotJsx.includes('rotateX: 90'), 'SlotText3D outgoing face must tumble 90 degrees around X axis')
  assert.ok(slotJsx.includes('rotateX: -90'), 'SlotText3D incoming face must start at -90 degrees around X axis')
  assert.ok(slotJsx.includes('staggerDelay'), 'SlotText3D must support staggered character delay')
  assert.ok(slotJsx.includes('sr-only'), 'SlotText3D must provide screen reader text accessibility')

  // CSS 3D specifications
  assert.ok(slotCss.includes('perspective: 1000px'), 'SlotText3D.css must define 3D perspective')
  assert.ok(slotCss.includes('transform-style: preserve-3d'), 'SlotText3D.css must preserve 3D nested transforms')
  assert.ok(slotCss.includes('transform-origin: 50% 50% -0.4em'), 'SlotText3D.css must set cylindrical transform origin')
  assert.ok(slotCss.includes('backface-visibility: hidden'), 'SlotText3D.css must hide backfaces')

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



