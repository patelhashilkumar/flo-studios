import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { getAllBlogs, getBlogBySlug } from '../src/data/blogsData.js'

test('1. blogsData exports structured editorial articles', () => {
  const blogs = getAllBlogs()
  assert.ok(Array.isArray(blogs), 'getAllBlogs should return an array')
  assert.ok(blogs.length >= 1, 'Should contain at least 1 blog')

  const blog1 = getBlogBySlug('every-handoff-is-a-leak')
  assert.ok(blog1, 'Should find blog-1 by slug')
  assert.equal(blog1.type, 'article')
  assert.equal(blog1.author, 'Flo Studios Editorial')
  assert.match(blog1.summaryQuote, /A project doesn’t fail at the handoff/)

  // Verify the 8 stages exist in blog-1
  const stageSection = blog1.content.find((b) => b.stages)
  assert.ok(stageSection, 'Should contain stage-by-stage section')
  assert.equal(stageSection.stages.length, 8, 'Should define exactly 8 stages')
  assert.equal(stageSection.stages[0].name, 'Product Planning')
  assert.equal(stageSection.stages[7].name, 'Post-launch Support & Maintenance')
})

test('2. ArticlePage and route wiring exist in App.jsx and LatestPage.jsx', () => {
  const appJsx = fs.readFileSync(path.resolve('src/App.jsx'), 'utf8')
  assert.match(appJsx, /path="\/latest\/:slug"/, 'App.jsx must declare /latest/:slug route')
  assert.match(appJsx, /ArticlePage/, 'App.jsx must import ArticlePage')

  const latestJsx = fs.readFileSync(path.resolve('src/pages/LatestPage.jsx'), 'utf8')
  assert.match(latestJsx, /getAllBlogs/, 'LatestPage must import and display editorial blogs')
  assert.match(latestJsx, /to=\{`\/latest\/\$\{item\.slug\}`\}/, 'LatestPage cards must link to /latest/:slug')
})
