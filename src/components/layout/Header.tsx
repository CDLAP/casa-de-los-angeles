'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useHeroTheme } from '@/context/HeroThemeContext'

const leftLinks = [
  { href: '/#menu', label: 'Café' },
  { href: '/#nosotros', label: 'Museo' },
  { href: '/#boutique', label: 'Boutique' },
  { href: '/#atelier', label: 'Atelier' },
]

const rightLinks = [
  { href: '/#sombrereria', label: 'Sombrería' },
  { href: '/#rueda-de-prensa', label: 'Prensa' },
  { href: '/#contacto', label: 'Contacto' },
]

const allLinks = [...leftLinks, ...rightLinks]

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

  const linkClass = (href: string) =>
    `text-[10px] sm:text-xs xl:text-sm uppercase tracking-[0.1em] xl:tracking-[0.15em] font-sans transition-all duration-300 relative group whitespace-nowrap ${
      activeSection === href
        ? 'text-gold'
        : isScrolled ? 'text-charcoal hover:text-gold' : 'text-white hover:text-gold'
    }`

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-2 xl:py-3 ${
        isScrolled 
          ? 'bg-cream/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Desktop: menú dividido con ángel al centro */}
      <div className="hidden xl:flex container-custom items-center justify-center gap-6">
        {/* Links izquierda */}
        <nav className="flex items-center gap-6">
          {leftLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
              {activeSection !== link.href && (
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Ángel al centro */}
        <Link href="/" className="mx-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <div className="relative h-14 w-auto">
              <Image
                src="/images/logo-short-1000x1000.png"
                alt="Casa de los Ángeles"
                width={160}
                height={56}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </Link>

        {/* Links derecha + Reservar */}
        <nav className="flex items-center gap-6">
          {rightLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
              {activeSection !== link.href && (
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              )}
            </Link>
          ))}
          <Link
            href={isBistro ? '/bistro#reservar' : isCultura ? '/cultura#contacto-cultura' : '/#reservar'}
            className={`px-5 py-2.5 text-sm uppercase tracking-[0.15em] border-2 transition-all duration-300 ${
              isBistro || isCultura
                ? (isScrolled
                    ? 'border-gold bg-gold text-white hover:bg-gold-light hover:border-gold-light'
                    : 'border-gold bg-gold/90 text-white hover:bg-gold hover:border-gold-light')
                : isWine
                ? (isScrolled 
                    ? 'border-bistro bg-bistro text-white hover:bg-bistro-light hover:border-bistro-light' 
                    : 'border-bistro bg-bistro/90 text-white hover:bg-bistro hover:border-bistro-light')
                : (isScrolled 
                    ? 'border-emerald bg-emerald text-white hover:bg-emerald-light hover:border-emerald-light' 
                    : 'border-emerald bg-emerald/90 text-white hover:bg-emerald hover:border-emerald-light')
            }`}
          >
            Reservar
          </Link>
        </nav>
      </div>

      {/* Mobile/Tablet: logo centrado arriba + links en fila compacta */}
      <div className="xl:hidden">
        {/* Logo centrado */}
        <div className="flex justify-center mb-1">
          <Link href="/">
            <div className="relative h-10 w-auto">
              <Image
                src="/images/logo-short-1000x1000.png"
                alt="Casa de los Ángeles"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Links en fila horizontal */}
        <nav className="flex items-center justify-center gap-3 sm:gap-4 px-2 flex-wrap">
          {allLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <Link
            href={isBistro ? '/bistro#reservar' : isCultura ? '/cultura#contacto-cultura' : '/#reservar'}
            className={`px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.1em] border transition-all duration-300 ${
              isWine
                ? 'border-bistro bg-bistro text-white'
                : 'border-emerald bg-emerald text-white'
            }`}
          >
            Reservar
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
