import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const WORK_PAGE_JSX = path.resolve('src/pages/WorkPage.jsx')
const WORK_PAGE_CSS = path.resolve('src/pages/WorkPage.css')

test('1. WorkPage JSX implements Instrument.com abacus filter nav and display mode switcher', () => {
  const code = fs.readFileSync(WORK_PAGE_JSX, 'utf8')

  // Check filter items
  assert.ok(code.includes("id: 'all', label: 'all'"), 'Includes all filter')
  assert.ok(code.includes("id: 'brand', label: 'brand'"), 'Includes brand filter')
  assert.ok(code.includes("id: 'marketing', label: 'marketing'"), 'Includes marketing filter')
  assert.ok(code.includes("id: 'product', label: 'product'"), 'Includes product filter')

  // Check display modes
  assert.ok(code.includes("id: 'stack', label: 'stack'"), 'Includes stack mode')
  assert.ok(code.includes("id: 'grid', label: 'grid'"), 'Includes grid mode')

  // Check abacus bead layoutIds
  assert.ok(code.includes('layoutId="workFilterBead"'), 'Filter abacus uses workFilterBead')
  assert.ok(code.includes('layoutId="workDisplayBead"'), 'Display abacus uses workDisplayBead')
})

test('2. WorkPage JSX renders verbatim Instrument.com page intro headline and outro manifesto', () => {
  const code = fs.readFileSync(WORK_PAGE_JSX, 'utf8')

  // Intro headline
  assert.ok(
    code.includes('We create beautiful, functional, technology-forward work that elevates and unifies experiences across all brand surfaces.'),
    'Renders verbatim Instrument intro headline'
  )

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

test('3. WorkPage CSS implements pure white background, sticky toolbar, and Instrument design specs', () => {
  const css = fs.readFileSync(WORK_PAGE_CSS, 'utf8')

  // Pure white background
  assert.ok(css.includes('--work-bg: #ffffff;'), 'WorkPage CSS sets pure white background')
  assert.ok(css.includes('--work-ink: #070708;'), 'WorkPage CSS sets dark ink #070708')

  // Sticky filter nav
  assert.ok(css.includes('position: sticky;'), 'Filter nav is sticky')
  assert.ok(css.includes('.filter-nav-wrapper'), 'Filter nav wrapper exists')

  // Stack offset
  assert.ok(css.includes('margin-left: calc(var(--offset, 0%) * 0.38);'), 'Stack features support dynamic offset')

  // Media rounded corners
  assert.ok(css.includes('border-radius: 20px;'), 'Media container uses 20px rounded corners')

  // 4-column responsive grid
  assert.ok(css.includes('grid-template-columns: repeat(4, 1fr);'), 'Grid view is 4-column desktop grid')
  assert.ok(css.includes('aspect-ratio: 1 / 1;'), 'Grid cards use 1:1 square ratio')
})
