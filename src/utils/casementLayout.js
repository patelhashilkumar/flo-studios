/* ------------------------------------------------------------------ */
/* Casement Bento Cut Mathematics & Layout Calculation Engine         */
/* ------------------------------------------------------------------ */

export const SIZE_WEIGHT = {
  hero: 4.6,
  large: 2.4,
  regular: 1.3,
  small: 0.8,
}

export const AUTO_RHYTHM = [2.1, 1.1, 1.0, 1.55, 0.9, 1.25, 1.0, 1.4]

export const REST_FRAME = { w: 1200, h: 780 }

export function str(v) {
  return typeof v === 'string' ? v.trim() : ''
}

export function limit(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v))
}

export function two(n) {
  return String(n).padStart(2, '0')
}

export function frameAt(url) {
  if (!url || url.includes('#')) return url
  return `${url}#t=0.1`
}

export function readImage(v) {
  if (typeof v === 'string') return { src: v.trim(), srcSet: '', alt: '' }
  if (v && typeof v === 'object') return { src: str(v.src), srcSet: str(v.srcSet), alt: str(v.alt) }
  return { src: '', srcSet: '', alt: '' }
}

export function readCards(list) {
  const source = Array.isArray(list) ? list : []
  const out = []

  source.forEach((raw, i) => {
    if (!raw) return
    const isVideo = raw.mediaType === 'video' || Boolean(raw.video || raw.videoUrl || raw.videoMp4 || raw.videoWebm)
    const video = str(raw.videoUrl) || str(raw.videoMp4) || str(raw.video) || str(raw.videoWebm)
    const videoWebm = str(raw.videoWebm)
    const videoMp4 = str(raw.videoMp4) || (isVideo && video && !video.endsWith('.webm') ? video : '')

    const upload = readImage(raw.image)
    const typed = isVideo ? '' : str(raw.imageUrl)
    const still = typed || upload.src || raw.poster || ''
    const title = str(raw.title)
    const category = str(raw.category || raw.metric)

    out.push({
      id: raw.id || raw.slug || `c${i}`,
      kind: isVideo ? 'video' : 'image',
      still,
      stillSet: typed ? '' : upload.srcSet,
      video: isVideo ? frameAt(video) : '',
      videoWebm,
      videoMp4,
      alt: title || category || upload.alt || `Card ${i + 1}`,
      title,
      category,
      metric: str(raw.metric),
      description: str(raw.description),
      link: str(raw.link || raw.href),
      size: str(raw.size) || 'auto',
      weight: 1,
    })
  })

  out.forEach((card, n) => {
    card.weight = SIZE_WEIGHT[card.size] || (n === 0 ? SIZE_WEIGHT.hero : AUTO_RHYTHM[(n - 1) % AUTO_RHYTHM.length])
  })

  return out
}

export function weightOf(ids, weights) {
  let total = 0
  for (const id of ids) total += weights[id] || 0
  return total
}

export function carve(ids, weights) {
  if (ids.length === 1) return { ids, leaf: ids[0], across: true, first: null, second: null }
  const half = weightOf(ids, weights) / 2
  let running = 0
  let at = 1
  let best = Infinity
  for (let i = 0; i < ids.length - 1; i++) {
    running += weights[ids[i]] || 0
    const miss = Math.abs(running - half)
    if (miss < best) {
      best = miss
      at = i + 1
    }
  }
  return {
    ids,
    leaf: -1,
    across: true,
    first: carve(ids.slice(0, at), weights),
    second: carve(ids.slice(at), weights),
  }
}

export function divide(box, share, across) {
  if (across) {
    const w = box.w * share
    return [
      { x: box.x, y: box.y, w, h: box.h },
      { x: box.x + w, y: box.y, w: box.w - w, h: box.h },
    ]
  }
  const h = box.h * share
  return [
    { x: box.x, y: box.y, w: box.w, h },
    { x: box.x, y: box.y + h, w: box.w, h: box.h - h },
  ]
}

export function orient(cut, box, weights, pxW, pxH) {
  if (!cut.first || !cut.second) return
  cut.across = box.w * pxW >= box.h * pxH
  const totalW = weightOf(cut.ids, weights) || 1
  const share = (weightOf(cut.first.ids, weights) || 1) / totalW
  const [a, b] = divide(box, share, cut.across)
  orient(cut.first, a, weights, pxW, pxH)
  orient(cut.second, b, weights, pxW, pxH)
}

export function place(cut, box, weights, out) {
  if (!cut.first || !cut.second) {
    out[cut.leaf] = box
    return
  }
  const totalW = weightOf(cut.ids, weights) || 1
  const share = (weightOf(cut.first.ids, weights) || 1) / totalW
  const [a, b] = divide(box, share, cut.across)
  place(cut.first, a, weights, out)
  place(cut.second, b, weights, out)
}

export function planBento(count, weights, pxW, pxH) {
  if (count === 0) return null
  const ids = Array.from({ length: count }, (_, i) => i)
  const tree = carve(ids, weights)
  orient(tree, { x: 0, y: 0, w: 1, h: 1 }, weights, Math.max(1, pxW), Math.max(1, pxH))
  return tree
}

export function boxesFor(tree, count, weights, mirror) {
  const out = new Array(count)
  if (!tree) return out
  place(tree, { x: 0, y: 0, w: 1, h: 1 }, weights, out)
  if (mirror) {
    for (const b of out) {
      if (b) b.x = 1 - b.x - b.w
    }
  }
  return out
}

export function tint(color, alpha) {
  const a = limit(alpha, 0, 1)
  const value = String(color || '').trim()
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    let h = hex[1]
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
    return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${a})`
  }
  return value || `rgba(0, 0, 0, ${a})`
}

export function shadeFor(color, strength) {
  return `linear-gradient(to top, ${tint(color, strength)} 0%, ${tint(color, strength * 0.45)} 35%, ${tint(color, 0)} 68%)`
}

export function textFit(pxW, pxH, titleMax = 32) {
  const floor = Math.min(14, titleMax)
  const side = Math.min(pxW, pxH)
  return {
    title: pxW >= 100 && pxH >= 65,
    category: pxW >= 120 && pxH >= 95,
    size: limit(side * (titleMax / 300), floor, titleMax),
    pad: limit(side * 0.08, 16, 32),
  }
}

export function edge(value, gap) {
  return `calc(${(value * 100).toFixed(4)}% + ${gap / 2}px)`
}

export function span(value, gap) {
  return `calc(${(value * 100).toFixed(4)}% - ${gap}px)`
}
