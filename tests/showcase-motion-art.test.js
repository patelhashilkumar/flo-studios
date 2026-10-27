import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const showcaseJsxPath = path.resolve('src/components/ShowcaseMotionArt.jsx')
const showcaseCssPath = path.resolve('src/components/ShowcaseMotionArt.css')
const homeSpotlightJsxPath = path.resolve('src/components/HomeServicesSpotlight.jsx')

test('1. ShowcaseMotionArt exports vector motion graphic component with development and creator scenes', () => {
  const jsx = fs.readFileSync(showcaseJsxPath, 'utf8')

  // Component definition and export
  assert.match(jsx, /export default function ShowcaseMotionArt/, 'Should export ShowcaseMotionArt component')
  assert.match(jsx, /function DevScene\(\)/, 'Should define DevScene for development division')
  assert.match(jsx, /function CreatorScene\(\)/, 'Should define CreatorScene for creator division')

  // Motion mechanics matching /latest cover cards
  assert.match(jsx, /<animateMotion/, 'Should feature traveling photon data packets via animateMotion')
  assert.match(jsx, /<animateTransform/, 'Should feature rotating mechanical elements via animateTransform')
  assert.match(jsx, /gearPath/, 'Should compute precision gear vectors for engineering core')
  assert.match(jsx, /viewBox="0 0 200 120"/, 'Should use standard 200x120 vector canvas')

  // Performance safeguards
  assert.match(jsx, /useInView/, 'Should use useInView for viewport-based lifecycle')
  assert.match(jsx, /pauseAnimations/, 'Should pause SMIL animations when off-screen')
  assert.match(jsx, /unpauseAnimations/, 'Should resume SMIL animations when in viewport')
})

test('2. HomeServicesSpotlight replaces static preview boxes with ShowcaseMotionArt', () => {
  const jsx = fs.readFileSync(homeSpotlightJsxPath, 'utf8')

  // Import check
  assert.match(jsx, /import ShowcaseMotionArt from '\.\/ShowcaseMotionArt'/, 'Should import ShowcaseMotionArt')

  // Both divisions integrated
  assert.match(jsx, /<ShowcaseMotionArt division="development" \/>/, 'Should render development motion art')
  assert.match(jsx, /<ShowcaseMotionArt division="creator" \/>/, 'Should render creator motion art')

  // Legacy mock boxes eliminated
  assert.ok(!jsx.includes('showcase-canvas__preview-box--studio'), 'Should remove legacy studio preview box')
  assert.ok(!jsx.includes('showcase-canvas__preview-grid'), 'Should remove legacy static preview grid')
})

test('3. ShowcaseMotionArt CSS enforces refined dark console canvas', () => {
  const css = fs.readFileSync(showcaseCssPath, 'utf8')

  // Canvas card styling matching obsidian instrument display
  assert.match(css, /background-color:\s*#121214/, 'Should use dark carbon background')
  assert.match(css, /radial-gradient/, 'Should feature dot matrix background pattern')
  assert.match(css, /border:\s*1px solid rgba\(255, 255, 255, 0\.12\)/, 'Should feature 1px white border')
  assert.match(css, /aspect-ratio:\s*16 \/ 10\.8/, 'Should enforce clean widescreen aspect ratio')

  // Telemetry and badge styles
  assert.match(css, /\.showcase-motion-card__badge--dev/, 'Should style development badge')
  assert.match(css, /\.showcase-motion-card__badge--creator/, 'Should style creator badge')
  assert.match(css, /\.showcase-motion-card__cmd/, 'Should style terminal telemetry command')
})

test('4. HomeServicesSpotlight CSS eliminates clutter and fake controls', () => {
  const homeCssPath = path.resolve('src/components/HomeServicesSpotlight.css')
  const css = fs.readFileSync(homeCssPath, 'utf8')

  // Clean wrapper styling matching site theme
  assert.match(css, /\.home-spotlight__showcase-wrap/, 'Should define .home-spotlight__showcase-wrap')
  assert.ok(!css.includes('.showcase-bottom-bar'), 'Should eliminate fake pause button and dashes')
  assert.ok(!css.includes('.showcase-token'), 'Should eliminate toy sticker tokens')
  assert.ok(!css.includes('.showcase-mobile-device'), 'Should eliminate cluttered mobile device mock')
})
