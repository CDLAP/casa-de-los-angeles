'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function StickyAngel() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isStuck, setIsStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Listen for mobile menu toggle
  useEffect(() => {
    const handler = (e: Event) => {
      setMenuOpen((e as CustomEvent).detail.open)
    }
    window.addEventListener('mobileMenuToggle', handler)
    return () => window.removeEventListener('mobileMenuToggle', handler)
  }, [])

  // Listen for Hero's scroll calculation — single source of truth
  useEffect(() => {
    if (!isHome) {
      setIsStuck(true)
      return
    }

    setIsStuck(false)

    const handler = (e: Event) => {
      setIsStuck((e as CustomEvent).detail.stuck)
    }
    window.addEventListener('angelStuck', handler)
    return () => window.removeEventListener('angelStuck', handler)
  }, [isHome, pathname])

  // Hide when menu is open (menu has its own cherub)
  const visible = isStuck && !menuOpen

  return (
    <div
      className="fixed left-0 right-0 flex justify-center pointer-events-none transition-opacity duration-0 top-[-4px] md:top-[28px]"
      style={{ zIndex: 58, opacity: visible ? 1 : 0 }}
    >
      <Image
        src="/images/logo-short-1000x1000.png"
        alt="Casa de los Ángeles"
        width={160}
        height={160}
        className="object-contain drop-shadow-2xl w-40 h-40 md:w-56 md:h-56"
        priority
      />
    </div>
  )
}
