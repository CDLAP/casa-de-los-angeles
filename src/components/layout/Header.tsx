'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useHeroTheme } from '@/context/HeroThemeContext'

const navLinks = [
  { href: '/#menu', label: 'Café' },
  { href: '/#nosotros', label: 'Museo' },
  { href: '/#boutique', label: 'Boutique' },
  { href: '/#atelier', label: 'Atelier' },
  { href: '/#sombrereria', label: 'Sombrería' },
  { href: '/#rueda-de-prensa', label: 'Prensa' },
  { href: '/#contacto', label: 'Contacto' },
]

export default function Header() {
  const pathname = usePathname()
  const isBistro = pathname === '/bistro'
  const isCultura = pathname === '/cultura'
  const heroTheme = useHeroTheme()
  const isWine = heroTheme === 'wine'
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (isBistro) { setActiveSection('/bistro'); return }
    if (isCultura) { setActiveSection('/cultura'); return }
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
  }, [isBistro, isCultura, pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-cream/95 backdrop-blur-md shadow-lg py-2' 
          : isWine ? 'bg-[#3F1F26] py-2' : 'bg-[#1A3A2E] py-2'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 xl:gap-8 px-3 flex-wrap">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[10px] sm:text-xs xl:text-sm uppercase tracking-[0.08em] sm:tracking-[0.12em] xl:tracking-[0.15em] font-sans transition-all duration-300 whitespace-nowrap ${
              activeSection === link.href
                ? 'text-gold'
                : isScrolled ? 'text-charcoal hover:text-gold' : 'text-cream/90 hover:text-gold'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={isBistro ? '/bistro#reservar' : isCultura ? '/cultura#contacto-cultura' : '/#reservar'}
          className={`px-3 sm:px-4 xl:px-5 py-1 sm:py-1.5 xl:py-2 text-[10px] sm:text-xs xl:text-sm uppercase tracking-[0.1em] xl:tracking-[0.15em] border transition-all duration-300 whitespace-nowrap ${
            isScrolled
              ? isWine
                ? 'border-bistro bg-bistro text-white hover:bg-bistro-light'
                : 'border-emerald bg-emerald text-white hover:bg-emerald-light'
              : 'border-gold/50 bg-gold/20 text-gold hover:bg-gold/30'
          }`}
        >
          Reservar
        </Link>
      </nav>
    </motion.header>
  )
}
