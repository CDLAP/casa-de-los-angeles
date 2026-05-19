'use client'

import { useEffect, useState } from 'react'

/**
 * Thin gold progress bar pinned to the top of the viewport.
 * Fills as the user scrolls through the page.
 * Designed for long-form pages (Lineamientos, Tips).
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0

    const compute = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0
      setProgress(pct)
    }

    const handleScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        compute()
        raf = 0
      })
    }

    compute()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', compute)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[55] h-[2px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold-light shadow-[0_0_8px_rgba(201,169,97,0.5)]"
        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
      />
    </div>
  )
}
