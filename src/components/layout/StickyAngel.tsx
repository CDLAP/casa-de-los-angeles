'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const NAV_HEIGHT = 84
const ANGEL_HEIGHT = 224
const STUCK_TOP = NAV_HEIGHT - Math.round(ANGEL_HEIGHT / 4)

export default function StickyAngel() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isStuck, setIsStuck] = useState(false)
  const [menuForced, setMenuForced] = useState(false)
  const plecaRef = useRef<HTMLElement | null>(null)

  // Listen for mobile menu toggle
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setMenuForced(detail.open)
    }
    window.addEventListener('mobileMenuToggle', handler)
    return () => window.removeEventListener('mobileMenuToggle', handler)
  }, [])

  useEffect(() => {
    if (!isHome) {
      setIsStuck(true)
      return
    }

    setIsStuck(false)
    plecaRef.current = null

    const onScroll = () => {
      if (!plecaRef.current) {
        const sections = document.querySelectorAll('main section')
        if (sections.length >= 2) plecaRef.current = sections[1] as HTMLElement
      }

      if (plecaRef.current) {
        const rect = plecaRef.current.getBoundingClientRect()
        const staticTop = rect.top - ANGEL_HEIGHT / 2
        setIsStuck(staticTop <= STUCK_TOP)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      plecaRef.current = null
    }
  }, [isHome, pathname])

  // Show if stuck by scroll OR forced by menu
  const visible = isStuck || menuForced

  if (!visible) return null

  return (
    <div
      className="fixed left-0 right-0 flex justify-center pointer-events-none"
      style={{ top: STUCK_TOP, zIndex: 58 }}
    >
      <Image
        src="/images/logo-short-1000x1000.png"
        alt="Casa de los Ángeles"
        width={160}
        height={160}
        className="object-contain drop-shadow-2xl w-44 h-44 md:w-56 md:h-56"
        priority
      />
    </div>
  )
}
