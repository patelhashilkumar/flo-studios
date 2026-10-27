import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.join(__dirname, '..')

test('1. Hero component optimizes performance by pausing video when offscreen or tab is hidden', () => {
  const heroCode = fs.readFileSync(
    path.join(repoRoot, 'src/components/Hero.jsx'),
    'utf8'
  )

  // 1. Checks IntersectionObserver usage on video card
  assert.match(
    heroCode,
    /new\s+IntersectionObserver\(\s*\(\[entry\]\)\s*=>\s*\{[\s\S]+?isIntersecting[\s\S]+?observer\.observe\(target\)/,
    'Hero must observe video card viewport intersection with IntersectionObserver'
  )

  // 2. Checks visibilitychange event listener for tab switching
  assert.match(
    heroCode,
    /document\.addEventListener\(['"]visibilitychange['"]/,
    'Hero must listen for document visibilitychange to pause video when tab is hidden'
  )

  // 3. Pauses video when not in view
  assert.match(
    heroCode,
    /video\.pause\(\)/,
    'Hero must invoke video.pause() when offscreen'
  )

  // 4. Resumes video when in view
  assert.match(
    heroCode,
    /video\.play\(\)/,
    'Hero must invoke video.play() when scrolled into view'
  )

  // 5. Video tag reflects playback state and event listeners
  assert.match(
    heroCode,
    /autoPlay=\{isInView\}/,
    'Video element autoPlay must be conditioned on isInView'
  )
  assert.match(
    heroCode,
    /onPause=\{[\s\S]*?setIsVideoPlaying\(false\)[\s\S]*?\}/,
    'Video element must handle onPause event to keep playing state synced'
  )
})
