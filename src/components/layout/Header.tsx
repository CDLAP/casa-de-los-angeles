'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { href: '/#menu', label: 'Café' },
  { href: '/#nosotros', label: 'Museo' },
  { href: '/#boutique', label: 'Boutique' },
  { href: '/#atelier', label: 'Atelier' },
  { href: '/#rueda-de-prensa', label: 'Prensa' },
  { href: '/relaciones-publicas', label: 'Relaciones Públicas' },
  { href: '/#mercado', label: 'Mercado' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/promocion', label: 'Promoción' },
  { href: '/#contacto', label: 'Contacto' },
]

export default function Header() {
  const pathname = usePathname()
  const isBistro = pathname === '/bistro'
  const isCultura = pathname === '/cultura'
  const isEventos = pathname === '/eventos'
  const isPromocion = pathname === '/promocion'
  const isRP = pathname === '/relaciones-publicas'
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (isBistro) { setActiveSection('/bistro'); return }
    if (isCultura) { setActiveSection('/cultura'); return }
    if (isEventos) { setActiveSection('/eventos'); return }
    if (isPromocion) { setActiveSection('/promocion'); return }
    if (isRP) { setActiveSection('/relaciones-publicas'); return }
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
  }, [isBistro, isCultura, isEventos, isPromocion, isRP, pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-lg py-4 md:py-8'
            : 'bg-[#3F1F26] py-4 md:py-8 shadow-[0_4px_0_0_#3F1F26]'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex items-center justify-between md:justify-center px-5 md:px-3">
          {/* Logo / Home link - mobile only */}
          <Link
            href="/"
            className={`md:hidden font-serif text-lg tracking-wider transition-colors ${
              isScrolled ? 'text-gold-dark' : 'text-gold'
            }`}
          >
            CDLA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm xl:text-base uppercase tracking-[0.12em] xl:tracking-[0.2em] font-sans transition-all duration-300 whitespace-nowrap py-2 ${
                  activeSection === link.href
                    ? 'text-gold'
                    : isScrolled ? 'text-charcoal hover:text-gold' : 'text-cream/90 hover:text-gold'
                }`}
              >
                {link.label === 'Relaciones Públicas' ? 'RP' : link.label === 'Promoción' ? 'Promo' : link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger button - mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-[60]"
            aria-label="Menú"
          >
            <motion.span
              className={`block w-6 h-[2px] rounded-full transition-colors ${isScrolled ? 'bg-charcoal' : 'bg-cream'}`}
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`block w-6 h-[2px] rounded-full transition-colors ${isScrolled ? 'bg-charcoal' : 'bg-cream'}`}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={`block w-6 h-[2px] rounded-full transition-colors ${isScrolled ? 'bg-charcoal' : 'bg-cream'}`}
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.nav
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#3F1F26] z-50 md:hidden flex flex-col pt-24 px-8 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Ornamento */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 h-px bg-gold/20" />
                <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
                <div className="flex-1 h-px bg-gold/20" />
              </div>

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 font-sans text-base uppercase tracking-[0.15em] transition-colors border-b border-gold/10 ${
                      activeSection === link.href
                        ? 'text-gold'
                        : 'text-cream/70 hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Info adicional */}
              <div className="mt-auto pb-8 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-gold/20" />
                  <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
                  <div className="flex-1 h-px bg-gold/20" />
                </div>
                <p className="text-cream/30 text-xs text-center uppercase tracking-widest">
                  Casa de los Ángeles
                </p>
                <p className="text-cream/20 text-xs text-center mt-1">
                  Palafox 222, Centro Histórico
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
