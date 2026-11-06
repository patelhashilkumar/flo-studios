import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CASE_STUDIES } from '../src/data/caseStudiesData.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const EXPECTED_SLUGS = [
  'drone-sim',
  'c4future',
  'ember-salt',
  'relay',
  'peak-club',
  'apple-motion',
  'blitzit-motion',
  'sv-showreel',
]

test('1. CASE_STUDIES dictionary exports all 8 client project case studies', () => {
  for (const slug of EXPECTED_SLUGS) {
    assert.ok(CASE_STUDIES[slug], `Missing case study data for slug: ${slug}`)
    const study = CASE_STUDIES[slug]
    assert.strictEqual(study.slug, slug)
    assert.ok(study.title && study.title.length > 0, `Missing title for ${slug}`)
    assert.ok(study.client && study.client.length > 0, `Missing client for ${slug}`)
    assert.ok(study.discipline && study.discipline.length > 0, `Missing discipline for ${slug}`)
    assert.ok(study.quote && study.quote.length > 0, `Missing quote for ${slug}`)
  }
})

test('2. Each case study defines complete palette, system architecture, and categorized deliverables', () => {
  for (const slug of EXPECTED_SLUGS) {
    const study = CASE_STUDIES[slug]

    // Palette validation
    assert.ok(Array.isArray(study.palette) && study.palette.length >= 4, `Palette must have >= 4 swatches for ${slug}`)
    study.palette.forEach((swatch) => {
      assert.ok(swatch.name, `Swatch missing name in ${slug}`)
      assert.ok(/^#[0-9A-Fa-f]{6}$/.test(swatch.hex), `Invalid hex format ${swatch.hex} in ${slug}`)
      assert.ok(swatch.role, `Swatch missing role in ${slug}`)
    })

    // System features validation
    assert.ok(study.system && Array.isArray(study.system.features), `Missing system features in ${slug}`)
    assert.ok(study.system.features.length >= 3, `Expected at least 3 features in ${slug}`)

    // Deliverables validation
    assert.ok(Array.isArray(study.deliverables) && study.deliverables.length >= 3, `Expected at least 3 deliverable groups in ${slug}`)
    study.deliverables.forEach((deliv) => {
      assert.ok(deliv.group, `Deliverable missing group name in ${slug}`)
      assert.ok(Array.isArray(deliv.items) && deliv.items.length > 0, `Deliverable group empty in ${slug}`)
    })
  }
})

test('3. All referenced media files exist on disk in public/', () => {
  for (const slug of EXPECTED_SLUGS) {
    const study = CASE_STUDIES[slug]

    if (study.heroMedia.type === 'image') {
      const imgPath = path.join(rootDir, 'public', study.heroMedia.src.replace(/^\//, ''))
      assert.ok(fs.existsSync(imgPath), `Hero image file not found on disk: ${imgPath} for ${slug}`)
    } else if (study.heroMedia.type === 'video') {
      const mp4Path = path.join(rootDir, 'public', study.heroMedia.mp4.replace(/^\//, ''))
      assert.ok(fs.existsSync(mp4Path), `Hero video file not found on disk: ${mp4Path} for ${slug}`)
    }

    if (study.showcase?.items) {
      study.showcase.items.forEach((item) => {
        const itemPath = path.join(rootDir, 'public', item.src.replace(/^\//, ''))
        assert.ok(fs.existsSync(itemPath), `Showcase item file not found on disk: ${itemPath} for ${slug}`)
      })
    }
  }
})

test('4. App.jsx registers /work/:slug and WorkPage links point to internal case study routes', () => {
  const appSrc = fs.readFileSync(path.join(rootDir, 'src/App.jsx'), 'utf-8')
  assert.ok(appSrc.includes('path="/work/:slug"'), 'App.jsx must route /work/:slug')
  assert.ok(appSrc.includes('ProjectCaseStudy'), 'App.jsx must import and use ProjectCaseStudy')

  const workPageSrc = fs.readFileSync(path.join(rootDir, 'src/pages/WorkPage.jsx'), 'utf-8')
  assert.ok(workPageSrc.includes("href: '/work/drone-sim'"), 'WorkPage must link to /work/drone-sim')
  assert.ok(workPageSrc.includes("href: '/work/c4future'"), 'WorkPage must link to /work/c4future')
  assert.ok(workPageSrc.includes("href: '/work/ember-salt'"), 'WorkPage must link to /work/ember-salt')
  assert.ok(workPageSrc.includes("href: '/work/relay'"), 'WorkPage must link to /work/relay')
  assert.ok(workPageSrc.includes("href: '/work/peak-club'"), 'WorkPage must link to /work/peak-club')
  assert.ok(workPageSrc.includes("href: '/work/apple-motion'"), 'WorkPage must link to /work/apple-motion')
  assert.ok(workPageSrc.includes("href: '/work/blitzit-motion'"), 'WorkPage must link to /work/blitzit-motion')
  assert.ok(workPageSrc.includes("href: '/work/sv-showreel'"), 'WorkPage must link to /work/sv-showreel')
})

test('5. Projects do not repeat across duo showcase rows or catalog lists', () => {
  const workPageSrc = fs.readFileSync(path.join(rootDir, 'src/pages/WorkPage.jsx'), 'utf-8')

  // Extract FEATURED_DUO_PAIRS block
  const duoBlockMatch = workPageSrc.match(/const FEATURED_DUO_PAIRS = \[([\s\S]*?)\]\n\n\/\/ Catalog/m)
  assert.ok(duoBlockMatch, 'FEATURED_DUO_PAIRS block must exist')
  const duoHrefs = [...duoBlockMatch[1].matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1])
  const uniqueDuoHrefs = new Set(duoHrefs)
  assert.strictEqual(
    uniqueDuoHrefs.size,
    duoHrefs.length,
    `Featured duo showcase has duplicate projects: ${duoHrefs.filter((e, i, a) => a.indexOf(e) !== i)}`
  )
  assert.strictEqual(duoHrefs.length, 9, 'All 9 unique projects must be in the featured duo rows')

  // Extract CATALOG_ITEMS block
  const catalogBlockMatch = workPageSrc.match(/const CATALOG_ITEMS = \[([\s\S]*?)\]/m)
  assert.ok(catalogBlockMatch, 'CATALOG_ITEMS block must exist')
  const catalogHrefs = [...catalogBlockMatch[1].matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1])
  const uniqueCatalogHrefs = new Set(catalogHrefs)
  assert.strictEqual(
    uniqueCatalogHrefs.size,
    catalogHrefs.length,
    `Catalog archive has duplicate projects: ${catalogHrefs.filter((e, i, a) => a.indexOf(e) !== i)}`
  )
  assert.strictEqual(catalogHrefs.length, 9, 'All 9 unique projects must be in the catalog items')

  // Verify WorkSection has no duplicate slugs
  const workSectionSrc = fs.readFileSync(path.join(rootDir, 'src/components/WorkSection.jsx'), 'utf-8')
  const workSectionSlugs = [...workSectionSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
  const uniqueSlugs = new Set(workSectionSlugs)
  assert.strictEqual(
    uniqueSlugs.size,
    workSectionSlugs.length,
    `WorkSection has duplicate project slugs: ${workSectionSlugs.filter((e, i, a) => a.indexOf(e) !== i)}`
  )

  // Verify no foreign placeholder projects remain
  assert.ok(!workSectionSrc.includes('feeld-app'), 'WorkSection must not contain feeld')
  assert.ok(!workSectionSrc.includes('oura-app'), 'WorkSection must not contain oura')
  assert.ok(!workSectionSrc.includes('perfected'), 'WorkSection must not contain perfected')
  assert.ok(!workSectionSrc.includes('iru-launch'), 'WorkSection must not contain iru')
})

test('6. Video performance optimizations pause offscreen videos in WorkPage and ProjectCaseStudy', () => {
  const workPageSrc = fs.readFileSync(path.join(rootDir, 'src/pages/WorkPage.jsx'), 'utf-8')
  assert.ok(workPageSrc.includes('IntersectionObserver'), 'WorkPage must use IntersectionObserver for offscreen media')
  assert.ok(workPageSrc.includes('video.pause()'), 'WorkPage must pause offscreen video to conserve CPU/GPU')

  const caseStudySrc = fs.readFileSync(path.join(rootDir, 'src/pages/ProjectCaseStudy.jsx'), 'utf-8')
  assert.ok(caseStudySrc.includes('video.pause()'), 'ProjectCaseStudy must pause offscreen video')
  assert.ok(caseStudySrc.includes('document.hidden'), 'ProjectCaseStudy must pause video on background tab')
})
