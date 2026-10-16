import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    const resetScroll = () => {
      if (hash) {
        const id = hash.replace(/^#/, '')
        const el = document.getElementById(id) || document.querySelector(hash)
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { immediate: true })
          } else {
            el.scrollIntoView()
          }
          return
        }
      }

      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      }
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
      if (document.documentElement) document.documentElement.scrollTop = 0
      if (document.body) document.body.scrollTop = 0
    }

    // Immediate
    resetScroll()

    // Next animation frame and after AnimatePresence mode="wait" transition
    const r1 = requestAnimationFrame(resetScroll)
    const t1 = setTimeout(resetScroll, 50)
    const t2 = setTimeout(resetScroll, 320)

    return () => {
      cancelAnimationFrame(r1)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname, search, hash])

  return null
}
