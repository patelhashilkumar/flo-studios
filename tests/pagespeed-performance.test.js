import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.join(__dirname, '..')

test('1. Video preload optimization prevents massive multi-megabyte payload on initial load', () => {
  const casementCode = fs.readFileSync(path.join(repoRoot, 'src/components/CasementGrid.jsx'), 'utf8')
  const heroCode = fs.readFileSync(path.join(repoRoot, 'src/components/Hero.jsx'), 'utf8')

  // TileVideo in CasementGrid must use preload="none" to prevent downloading 10+ MB of below-the-fold videos
  assert.match(
    casementCode,
    /<video[\s\S]*?preload="none"/,
    'CasementGrid TileVideo must use preload="none" to prevent streaming videos on initial load'
  )

  // Hero video must not use preload="auto" as default
  assert.match(
    heroCode,
    /return\s+['"]metadata['"]/,
    'Hero video default preload strategy should be "metadata" to avoid full video buffering on load'
  )
})

test('2. WorkflowSection 3D WebGL canvas is deferred via viewport proximity in HomePage', () => {
  const homeCode = fs.readFileSync(path.join(repoRoot, 'src/pages/HomePage.jsx'), 'utf8')

  // HomePage must use an IntersectionObserver or deferred sentinel before rendering WorkflowSection
  assert.match(
    homeCode,
    /IntersectionObserver/,
    'HomePage must use IntersectionObserver to defer mounting WorkflowSection until user scrolls'
  )
})

test('3. Font loading does not block initial render', () => {
  const html = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8')

  // Must not have render-blocking api.fontshare.com stylesheet link
  assert.ok(
    !html.includes('href="https://api.fontshare.com/v2/css?'),
    'index.html should not include render-blocking fontshare CSS links'
  )

  // Google fonts must be loaded non-blockingly or with print/swap trick
  assert.match(
    html,
    /media=['"]print['"]\s+onload=['"]this\.media=['"]all['"]['"]|rel=['"]preload['"]\s+as=['"]style['"]/,
    'Google fonts stylesheet link must be non-blocking'
  )
})

test('4. Accessibility fixes: no prohibited ARIA attributes, compliant contrast, captions track', () => {
  const purposeCode = fs.readFileSync(path.join(repoRoot, 'src/components/PurposeSection.jsx'), 'utf8')
  const spotlightCss = fs.readFileSync(path.join(repoRoot, 'src/components/HomeServicesSpotlight.css'), 'utf8')
  const heroCode = fs.readFileSync(path.join(repoRoot, 'src/components/Hero.jsx'), 'utf8')

  // PurposeSection must not place aria-label on generic div without ARIA role
  assert.ok(
    !/<div[^>]*className="purpose__title[^>]*aria-label=/.test(purposeCode),
    'PurposeSection must not use prohibited aria-label on generic div'
  )

  // Spotlight label contrast: color must be #52525b or darker
  assert.match(
    spotlightCss,
    /\.home-spotlight__stat-lbl[\s\S]*?color:\s*#52525b/,
    'home-spotlight__stat-lbl must use accessible #52525b color for contrast compliance'
  )

  // Hero video should include track element for captions
  assert.match(
    heroCode,
    /<track\s+kind=['"]captions['"]/,
    'Hero video should include captions track for accessibility compliance'
  )
})

test('5. Agent Discoverability: valid llms.txt and ai-catalog.json manifests exist', () => {
  const llmsPath = path.join(repoRoot, 'public/llms.txt')
  const catalogPath = path.join(repoRoot, 'public/ai-catalog.json')
  const ardPath = path.join(repoRoot, 'public/.well-known/ard.json')
  const robotsPath = path.join(repoRoot, 'public/robots.txt')

  // 1. llms.txt must exist and have H1 header and markdown links
  assert.ok(fs.existsSync(llmsPath), 'public/llms.txt must exist')
  const llmsContent = fs.readFileSync(llmsPath, 'utf8')
  assert.match(llmsContent, /^#\s+[^\n]+/m, 'llms.txt must start with H1 header (# Title)')
  assert.match(llmsContent, /\[[^\]]+\]\(https?:\/\/[^\)]+\)/, 'llms.txt must contain markdown links')

  // 2. ai-catalog.json must be valid JSON with specVersion and entries array
  assert.ok(fs.existsSync(catalogPath), 'public/ai-catalog.json must exist')
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
  assert.equal(catalog.specVersion, '1.0', 'ai-catalog.json must specify specVersion 1.0')
  assert.ok(Array.isArray(catalog.entries), 'ai-catalog.json must contain entries array')
  assert.ok(catalog.entries.length > 0, 'ai-catalog.json must have at least one entry')

  // 3. .well-known/ard.json must exist
  assert.ok(fs.existsSync(ardPath), 'public/.well-known/ard.json must exist')

  // 4. robots.txt must advertise Agentmap
  const robots = fs.readFileSync(robotsPath, 'utf8')
  assert.match(robots, /Agentmap:\s*https?:\/\//, 'robots.txt must advertise Agentmap')
})
