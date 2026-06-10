'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function StickyAngel() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isStudio = pathname === '/artesania-visual'
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

  // Decide when the angel is "stuck" (visible)
  useEffect(() => {
    // Home: single source of truth is the Hero's scroll calculation
    if (isHome) {
      setIsStuck(false)
      const handler = (e: Event) => setIsStuck((e as CustomEvent).detail.stuck)
      window.addEventListener('angelStuck', handler)
      return () => window.removeEventListener('angelStuck', handler)
    }

    // Resto de páginas (incluido el Studio): siempre visible
    setIsStuck(true)
  }, [isHome, pathname])

  // Hide when menu is open (menu has its own cherub)
  const visible = isStuck && !menuOpen

  // El querubín CDLA (con lentes) sólo en el Studio; el ángel normal en el resto del sitio.
  const angelSrc = isStudio ? '/images/cdla-angel.png' : '/images/logo-short-1000x1000.png'
  const angelAlt = isStudio ? 'CDLA Studio' : 'Casa de los Ángeles'
  // En el Studio el querubín CDLA es más voluminoso: más compacto y un poco más abajo para que no se trepe al menú.
  const topClass = isStudio ? 'top-[10px] md:top-[52px]' : 'top-[-4px] md:top-[28px]'
  const sizeClass = isStudio ? 'w-24 h-24 md:w-36 md:h-36' : 'w-40 h-40 md:w-56 md:h-56'

  return (
    <div
      className={`fixed left-0 right-0 flex justify-center pointer-events-none transition-opacity duration-0 ${topClass}`}
      style={{ zIndex: 58, opacity: visible ? 1 : 0 }}
    >
      <Image
        src={angelSrc}
        alt={angelAlt}
        width={448}
        height={448}
        className={`object-contain drop-shadow-2xl ${sizeClass}`}
        priority
      />
    </div>
  )
}
