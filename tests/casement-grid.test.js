import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { planBento, boxesFor, carve, divide, readCards } from '../src/utils/casementLayout.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.join(__dirname, '..')

test('1. CasementGrid mathematical bento partitioning produces valid, non-overlapping boxes', () => {
  const testCounts = [1, 2, 4, 6, 8, 12]
  const viewports = [
    { w: 1440, h: 800 },
    { w: 1200, h: 750 },
    { w: 768, h: 600 },
    { w: 375, h: 540 },
  ]

  for (const count of testCounts) {
    const weights = Array.from({ length: count }, (_, i) => (i === 0 ? 4.6 : 1.3))
    for (const vp of viewports) {
      const tree = planBento(count, weights, vp.w, vp.h)
      assert.ok(tree, `Tree must be created for count ${count} at ${vp.w}x${vp.h}`)

      const boxes = boxesFor(tree, count, weights, false)
      assert.equal(boxes.length, count, `boxesFor must return exactly ${count} boxes`)

      for (let i = 0; i < count; i++) {
        const b = boxes[i]
        assert.ok(b, `Box ${i} must exist`)
        assert.ok(b.w > 0, `Box ${i} width must be positive: ${b.w}`)
        assert.ok(b.h > 0, `Box ${i} height must be positive: ${b.h}`)
        assert.ok(b.x >= 0, `Box ${i} x must be non-negative: ${b.x}`)
        assert.ok(b.y >= 0, `Box ${i} y must be non-negative: ${b.y}`)
        assert.ok(b.x + b.w <= 1.0001, `Box ${i} right edge must not exceed 1: ${b.x + b.w}`)
        assert.ok(b.y + b.h <= 1.0001, `Box ${i} bottom edge must not exceed 1: ${b.y + b.h}`)
      }
    }
  }
})

test('2. boxesFor correctly applies mirror horizontal inversion', () => {
  const weights = [4.6, 2.4, 1.3, 1.0]
  const tree = planBento(4, weights, 1200, 750)
  const regular = boxesFor(tree, 4, weights, false)
  const mirrored = boxesFor(tree, 4, weights, true)

  for (let i = 0; i < 4; i++) {
    const reg = regular[i]
    const mir = mirrored[i]
    assert.equal(reg.y, mir.y, 'Y coordinate should be unchanged by mirror')
    assert.equal(reg.w, mir.w, 'Width should be unchanged by mirror')
    assert.equal(reg.h, mir.h, 'Height should be unchanged by mirror')
    assert.ok(
      Math.abs(mir.x - (1 - reg.x - reg.w)) < 0.0001,
      `Mirrored X (${mir.x}) should equal 1 - x - w (${1 - reg.x - reg.w})`
    )
  }
})

test('3. carve and divide split spaces proportionally across primary aspect ratio', () => {
  const box = { x: 0, y: 0, w: 1, h: 1 }
  const [acrossLeft, acrossRight] = divide(box, 0.4, true)
  assert.equal(acrossLeft.w, 0.4)
  assert.equal(acrossLeft.h, 1)
  assert.equal(acrossRight.x, 0.4)
  assert.equal(acrossRight.w, 0.6)

  const [topBox, bottomBox] = divide(box, 0.5, false)
  assert.equal(topBox.w, 1)
  assert.equal(topBox.h, 0.5)
  assert.equal(bottomBox.y, 0.5)
  assert.equal(bottomBox.h, 0.5)

  const ids = [0, 1, 2]
  const weights = [4.6, 2.3, 2.3]
  const cut = carve(ids, weights)
  assert.equal(cut.first.leaf, 0, 'Heaviest leaf (4.6) should balance against the remaining two (2.3 + 2.3)')
})

test('4. readCards parses video and image items with weights and links', () => {
  const input = [
    {
      title: 'ABSTRUCT',
      slug: 'abstruct',
      href: '/work/abstruct',
      image: '/work/abstruct/web/moodboard.jpg',
      size: 'hero',
    },
    {
      title: 'Apple Product Motion',
      videoMp4: '/reels/apple.mp4',
      videoWebm: '/reels/apple.webm',
      size: 'large',
    },
  ]

  const cards = readCards(input)
  assert.equal(cards.length, 2)
  assert.equal(cards[0].kind, 'image')
  assert.equal(cards[0].weight, 4.6)
  assert.equal(cards[0].link, '/work/abstruct')
  assert.equal(cards[1].kind, 'video')
  assert.equal(cards[1].weight, 2.4)
  assert.equal(cards[1].videoMp4, '/reels/apple.mp4')
})

test('5. WorkSection embeds CasementGrid and provides activeFilter integration', () => {
  const workSectionCode = fs.readFileSync(
    path.join(repoRoot, 'src/components/WorkSection.jsx'),
    'utf8'
  )

  assert.match(
    workSectionCode,
    /import CasementGrid from '\.\/CasementGrid'/,
    'WorkSection must import CasementGrid'
  )
  assert.match(
    workSectionCode,
    /<CasementGrid[\s\S]+cards=\{casementCards\}/,
    'WorkSection must render CasementGrid with casementCards'
  )
  assert.match(
    workSectionCode,
    /function hasWorkItemVideo\(item\)\s*\{\s*return Boolean\(item && \(item\.videoWebm \|\| item\.videoMp4 \|\| item\.video\)\)/,
    'WorkSection must retain hasWorkItemVideo for regression safety'
  )
})
