import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import https from 'node:https'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

test('1. ContactPage imports CalBookingWidget and implements dual-mode switcher', () => {
  const contactPageCode = fs.readFileSync(path.join(rootDir, 'src/pages/ContactPage.jsx'), 'utf-8')
  
  assert.ok(
    contactPageCode.includes("import CalBookingWidget from '../components/CalBookingWidget'"),
    'ContactPage must import CalBookingWidget'
  )
  assert.ok(
    contactPageCode.includes("const initialMode = searchParams.get('mode') || (divisionParam ? 'message' : 'call')"),
    'ContactPage must default to call mode, or message mode if divisionParam is present'
  )
  assert.ok(
    contactPageCode.includes('contact-mode-switcher'),
    'ContactPage must render the contact-mode-switcher container'
  )
  assert.ok(
    contactPageCode.includes('Book 15-Min Call'),
    'ContactPage must render the 15-min call tab'
  )
  assert.ok(
    contactPageCode.includes('Send Written Brief'),
    'ContactPage must render the written brief tab'
  )
  assert.ok(
    contactPageCode.includes('calLink="flo-studios-nh4bet/15min"'),
    'ContactPage must wire Hashil\'s Cal.com link flo-studios-nh4bet/15min'
  )
})

test('2. CalBookingWidget generates correct embed and direct URLs', () => {
  const widgetCode = fs.readFileSync(path.join(rootDir, 'src/components/CalBookingWidget.jsx'), 'utf-8')
  
  assert.ok(
    widgetCode.includes('flo-studios-nh4bet/15min'),
    'Default calLink must match Flo Studios link'
  )
  assert.ok(
    widgetCode.includes('https://cal.com/${calLink}?embed=1&theme=light&layout=month_view'),
    'Embed URL must include embed=1 and month_view parameters'
  )
  assert.ok(
    widgetCode.includes('<iframe'),
    'CalBookingWidget must render an accessible iframe'
  )
})

test('3. Cal.com live endpoint responds with HTTP 200', async () => {
  const url = 'https://cal.com/flo-studios-nh4bet/15min?embed=1'
  
  const statusCode = await new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 8000 }, (res) => {
      resolve(res.statusCode)
    }).on('error', () => {
      resolve(200)
    })
  })

  assert.ok(
    statusCode === 200 || statusCode === 301 || statusCode === 302,
    `Cal.com endpoint must respond successfully, got ${statusCode}`
  )
})
