import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { getAllBlogs, getBlogBySlug } from '../src/data/blogsData.js'

test('1. blogsData exports structured editorial articles', () => {
  const blogs = getAllBlogs()
  assert.ok(Array.isArray(blogs), 'getAllBlogs should return an array')
  assert.ok(blogs.length >= 2, 'Should contain at least 2 blogs')

  // Blog 1 checks
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

  // Blog 2 checks: "Taste is the New Skill"
  const blog2 = getBlogBySlug('taste-is-the-new-skill')
  assert.ok(blog2, 'Should find blog-2 by slug')
  assert.equal(blog2.title, 'Taste is the New Skill')
  assert.equal(blog2.number, '02')
  assert.match(blog2.summaryQuote, /Taste has always mattered/)

  // Verify Nuwadan quote exists in blog-2
  const pullQuoteSection = blog2.content.find((b) => b.pullQuote && b.pullQuote.includes('Nuwadan'))
  assert.ok(pullQuoteSection, 'Should contain designer quote from Nuwadan')

  // Verify zero external Storyblok images in blogsData.js
  const blogsDataRaw = fs.readFileSync(path.resolve('src/data/blogsData.js'), 'utf8')
  assert.ok(!blogsDataRaw.includes('storyblok.com'), 'blogsData must not contain storyblok.com URLs')
})

test('2. ArticlePage and route wiring exist in App.jsx and LatestPage.jsx', () => {
  const appJsx = fs.readFileSync(path.resolve('src/App.jsx'), 'utf8')
  assert.match(appJsx, /path="\/latest\/:slug"/, 'App.jsx must declare /latest/:slug route')
  assert.match(appJsx, /ArticlePage/, 'App.jsx must import ArticlePage')

  const latestJsx = fs.readFileSync(path.resolve('src/pages/LatestPage.jsx'), 'utf8')
  assert.match(latestJsx, /getAllBlogs/, 'LatestPage must import and display editorial blogs')
  assert.match(latestJsx, /to=\{`\/latest\/\$\{item\.slug\}`\}/, 'LatestPage cards must link to /latest/:slug')

  // Verify LatestPage contains zero Storyblok URLs
  assert.ok(!latestJsx.includes('storyblok.com'), 'LatestPage must not contain storyblok.com URLs')
})
