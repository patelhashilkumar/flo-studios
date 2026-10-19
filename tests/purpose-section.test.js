import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const purposeJsxPath = path.resolve('src/components/PurposeSection.jsx')
const purposeCssPath = path.resolve('src/components/PurposeSection.css')

test('1. PurposeSection JSX renders verbatim copy from prompt and image', () => {
  const jsx = fs.readFileSync(purposeJsxPath, 'utf8')

  // Check section overline heading
  assert.match(jsx, /<h2 className="t-overline-1">Our Purpose<\/h2>/, 'Should render "Our Purpose" heading')

  // Check tagline lines
  assert.match(jsx, /const LINE_1 = 'Idea'/, 'Should define Line 1 as Idea')
  assert.match(jsx, /const LINE_2 = 'To'/, 'Should define Line 2 as To')
  assert.match(jsx, /const LINE_3 = 'Outcome\.'/, 'Should define Line 3 as Outcome.')

  // Check First Paragraph verbatim copy
  const firstPara = 'Most Good Ideas Die In The Space Between Vision And Execution. We Built Flo To Close That Gap. Whether We’re Growing A Channel Or Building A Product, The Same Team Stays With The Work From The First Idea To The Moment It Lives In The World — And Keeps Refining Once It’s Out There.'
  assert.ok(jsx.includes(firstPara), 'Should contain exact First Paragraph verbatim copy')

  // Check Second Paragraph verbatim copy
  const secondPara = 'That Means Owning Every Stage With The Same Team: The Instinct For What Holds Attention, The Clarity For Where You Actually Stand, The Craft To Execute Across Disciplines, And The Ownership To Stay Until It Performs. We Measure Success By What Ships And What Grows, Not By What Gets Delivered And Left Behind.'
  assert.ok(jsx.includes(secondPara), 'Should contain exact Second Paragraph verbatim copy')

  // Check CTA button
  assert.match(jsx, /to="\/about"/, 'CTA should link to /about')
  assert.match(jsx, /Learn more about our studio/, 'CTA should display "Learn more about our studio"')

  // Check character splitting for GSAP ScrollTrigger reveal
  assert.match(jsx, /splitChars/, 'Should implement character splitting function for reveal animation')

  // Check redundant h3 is not rendered
  assert.ok(!jsx.includes('visually-hidden'), 'Should not render redundant unstyled h3')
})

test('2. PurposeSection CSS enforces Instrument.com styling, grey overline, grey titles, and typography trio', () => {
  const css = fs.readFileSync(purposeCssPath, 'utf8')

  // Check grey overline styling
  assert.match(css, /\.purpose__header/, 'Should define .purpose__header')
  assert.match(css, /color:\s*#76767a/, 'Should use #76767a grey for overline text')
  assert.match(css, /text-transform:\s*uppercase/, 'Overline text should be uppercase')

  // Check hairline top border
  assert.match(css, /border-top:\s*1px solid/, 'Should include hairline border-top')

  // Check title color is grey matching image 2
  assert.match(css, /color:\s*#b0b0b4/, 'Giant title text color should be grey (#b0b0b4)')

  // Check font family trio: Instrument Serif (normal), Manrope (sans), Instrument Serif (italic)
  assert.match(css, /\.purpose__title1[\s\S]*?Instrument Serif/, 'Title 1 should use Instrument Serif')
  assert.match(css, /\.purpose__title2[\s\S]*?var\(--font-manrope\)/, 'Title 2 should use Manrope sans-serif')
  assert.match(css, /\.purpose__title3[\s\S]*?Instrument Serif/, 'Title 3 should use Instrument Serif')
  assert.match(css, /\.purpose__title3[\s\S]*?font-style:\s*italic/, 'Title 3 should be italic')

  // Check CSS must never contain Panchang font
  assert.ok(!css.toLowerCase().includes('panchang'), 'CSS must never contain Panchang font')

  // Check 12-column grid layout for desktop matching Image 2
  assert.match(css, /grid-template-columns:\s*repeat\(12,\s*1fr\)/, 'Should implement 12-column grid')
  assert.match(css, /\.purpose__text1/, 'Should style .purpose__text1')
  assert.match(css, /\.purpose__text2/, 'Should style .purpose__text2')
  assert.match(css, /\.purpose__title1/, 'Should style .purpose__title1')
  assert.match(css, /\.purpose__title2/, 'Should style .purpose__title2')
  assert.match(css, /\.purpose__title3/, 'Should style .purpose__title3')
})
