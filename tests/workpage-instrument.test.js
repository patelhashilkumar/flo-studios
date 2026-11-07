import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const WORK_PAGE_JSX = path.resolve('src/pages/WorkPage.jsx')
const WORK_PAGE_CSS = path.resolve('src/pages/WorkPage.css')

test('1. WorkPage JSX implements Instrument.com abacus filter nav and display mode switcher', () => {
  const code = fs.readFileSync(WORK_PAGE_JSX, 'utf8')

  // Check filter items (uppercase labels matching Instrument.com screenshot)
  assert.ok(code.includes("id: 'all', label: 'ALL'"), 'Includes ALL filter')
  assert.ok(code.includes("id: 'brand', label: 'BRAND'"), 'Includes BRAND filter')
  assert.ok(code.includes("id: 'marketing', label: 'MARKETING'"), 'Includes MARKETING filter')
  assert.ok(code.includes("id: 'product', label: 'PRODUCT'"), 'Includes PRODUCT filter')

  // Check display modes
  assert.ok(code.includes("id: 'stack', label: 'STACK'"), 'Includes STACK mode')
  assert.ok(code.includes("id: 'grid', label: 'GRID'"), 'Includes GRID mode')

  // Check abacus bead layoutIds
  assert.ok(code.includes('layoutId="workFilterBead"'), 'Filter abacus uses workFilterBead')
  assert.ok(code.includes('layoutId="workDisplayBead"'), 'Display abacus uses workDisplayBead')
})

test('2. WorkPage JSX renders edge-to-edge wordmark, Instrument Serif intro, and outro manifesto', () => {
  const code = fs.readFileSync(WORK_PAGE_JSX, 'utf8')

  // Wordmark
  assert.ok(code.includes('FLO STUDIOS'), 'Renders edge-to-edge wordmark')

  // Intro headline
  assert.ok(
    code.includes('We create beautiful, functional, technology-forward work that elevates and unifies experiences across all brand surfaces.'),
    'Renders verbatim Instrument intro headline'
  )

  // Asymmetric duo rows (65/35 & 35/65)
  assert.ok(code.includes("layout: 'wide-narrow'"), 'Renders wide-narrow asymmetric duo rows')
  assert.ok(code.includes("layout: 'narrow-wide'"), 'Renders narrow-wide asymmetric duo rows')

  // Outro manifesto
  assert.ok(
    code.includes('To create brand experiences of the highest caliber, we take a multi-disciplinary approach to our work by seamlessly integrating strategy, creative, and technology, and staying in close partnership with our clients.'),
    'Renders verbatim Instrument outro manifesto'
  )

  // Outro link
  assert.ok(
    code.includes('to="/services"'),
    'Outro links to /services'
  )
  assert.ok(
    code.includes('View our services'),
    'Outro button has label View our services'
  )
})

test('3. WorkPage CSS implements pure white background, Instrument Serif font, and authentic layout architecture', () => {
  const css = fs.readFileSync(WORK_PAGE_CSS, 'utf8')

  // Pure white background
  assert.ok(css.includes('--work-bg: #ffffff;'), 'WorkPage CSS sets pure white background')
  assert.ok(css.includes('--work-ink: #070708;'), 'WorkPage CSS sets dark ink #070708')

  // Wordmark scaling
  assert.ok(css.includes('.work-page__wordmark'), 'Workpage wordmark styling exists')

  // Sticky filter nav
  assert.ok(css.includes('position: sticky;'), 'Filter nav is sticky')
  assert.ok(css.includes('.filter-nav-wrapper'), 'Filter nav wrapper exists')

  // Serif typography (Linden / Instrument Serif fallback)
  assert.ok(css.includes('var(--font-serif') || css.includes("'Linden'"), 'Uses authentic serif typography')

  // Asymmetric duo row flex percentages (65% / 35%)
  assert.ok(css.includes('flex: 0 0 calc(65%'), 'Asymmetric wide card has 65% width')
  assert.ok(css.includes('flex: 0 0 calc(35%'), 'Asymmetric narrow card has 35% width')

  // Media rounded corners
  assert.ok(css.includes('border-radius: 20px;'), 'Media container uses 20px rounded corners')

  // 6-column catalog grid
  assert.ok(css.includes('grid-template-columns: repeat(6, 1fr);'), 'Lower archive catalog uses 6-column desktop grid')
})
