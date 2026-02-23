'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { href: '/#menu', label: 'Café' },
  { href: '/#nosotros', label: 'Museo' },
  { href: '/#boutique', label: 'Boutique' },
  { href: '/#atelier', label: 'Atelier' },
  { href: '/#rueda-de-prensa', label: 'Prensa' },
  { href: '/#relaciones-publicas', label: 'RP' },
  { href: '/#mercado', label: 'Mercado' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/promocion', label: 'Promo' },
  { href: '/#contacto', label: 'Contacto' },
]

export default function Header() {
  const pathname = usePathname()
  const isBistro = pathname === '/bistro'
  const isCultura = pathname === '/cultura'
  const isEventos = pathname === '/eventos'
  const isPromocion = pathname === '/promocion'
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (isBistro) { setActiveSection('/bistro'); return }
    if (isCultura) { setActiveSection('/cultura'); return }
    if (isEventos) { setActiveSection('/eventos'); return }
    if (isPromocion) { setActiveSection('/promocion'); return }
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`/#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [isBistro, isCultura, isEventos, isPromocion, pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-cream/95 backdrop-blur-md shadow-lg py-8' 
          : 'bg-[#3F1F26] py-8 shadow-[0_4px_0_0_#3F1F26]'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 xl:gap-14 px-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[11px] sm:text-sm xl:text-base uppercase tracking-[0.08em] sm:tracking-[0.15em] xl:tracking-[0.2em] font-sans transition-all duration-300 whitespace-nowrap py-2 ${
              (link.href === '/#contacto' || link.href === '/#relaciones-publicas') ? 'hidden sm:inline' : ''
            } ${
              activeSection === link.href
                ? 'text-gold'
                : isScrolled ? 'text-charcoal hover:text-gold' : 'text-cream/90 hover:text-gold'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  )
}
