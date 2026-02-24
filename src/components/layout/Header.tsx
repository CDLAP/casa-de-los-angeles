'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const mainLinks = [
  { href: '/#menu', label: 'Café' },
  { href: '/#nosotros', label: 'Museo' },
  { href: '/#boutique', label: 'Boutique' },
  { href: '/#atelier', label: 'Atelier' },
  { href: '/#mercado', label: 'Mercado' },
  { href: '/eventos', label: 'Eventos' },
]

const moreLinks = [
  { href: '/#rueda-de-prensa', label: 'Prensa' },
  { href: '/relaciones-publicas', label: 'Relaciones Públicas' },
  { href: '/promocion', label: 'Promoción del Día' },
]

const allLinks = [
  ...mainLinks,
  ...moreLinks,
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
  const [moreOpen, setMoreOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  useEffect(() => {
    if (menuOpen) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setMoreOpen(false)
  }, [pathname])

  const handleMoreEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setMoreOpen(true)
  }
  const handleMoreLeave = () => {
    timeoutRef.current = setTimeout(() => setMoreOpen(false), 200)
  }

  const isMoreActive = moreLinks.some(l => activeSection === l.href)

  const navTextClass = (active: boolean) =>
    `text-sm xl:text-base uppercase tracking-[0.12em] xl:tracking-[0.2em] font-sans transition-colors duration-300 whitespace-nowrap py-2 ${
      active
        ? 'text-gold'
        : isScrolled ? 'text-charcoal hover:text-gold' : 'text-cream/90 hover:text-gold'
    }`

  return (
    <>
      {/* Desktop header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden md:block ${
          isScrolled
            ? 'bg-cream shadow-lg pt-6 pb-32'
            : 'bg-[#3F1F26] pt-6 pb-32 shadow-[0_4px_0_0_#3F1F26]'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="flex items-center justify-center gap-4 lg:gap-6 xl:gap-10 px-3">
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navTextClass(activeSection === link.href)}>
              {link.label}
            </Link>
          ))}

          {/* Más */}
          <div
            className="relative"
            onMouseEnter={handleMoreEnter}
            onMouseLeave={handleMoreLeave}
          >
            <button className={`flex items-center gap-1.5 ${navTextClass(isMoreActive || moreOpen)}`}>
              Más
              <motion.div
                animate={{ rotate: moreOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-6 py-3 min-w-[220px] ${
                    isScrolled
                      ? 'bg-cream/98 backdrop-blur-md shadow-xl'
                      : 'bg-[#3F1F26] shadow-2xl'
                  }`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Flechita arriba */}
                  <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
                    isScrolled ? 'bg-cream/98' : 'bg-[#3F1F26]'
                  }`} />

                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className={`block px-6 py-3 text-sm uppercase tracking-[0.12em] font-sans transition-colors duration-300 ${
                        activeSection === link.href
                          ? 'text-gold'
                          : isScrolled
                            ? 'text-charcoal hover:text-gold'
                            : 'text-cream/80 hover:text-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contacto */}
          <Link href="/#contacto" className={navTextClass(activeSection === '/#contacto')}>
            Contacto
          </Link>
        </nav>
      </motion.header>



      {/* Mobile hamburger */}
      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`fixed top-5 right-5 z-[60] md:hidden w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[5px] transition-all duration-300 ${
          menuOpen
            ? 'bg-transparent'
            : isScrolled
              ? 'bg-cream/90 backdrop-blur-md shadow-lg'
              : 'bg-[#3F1F26]/80 backdrop-blur-md'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        aria-label="Menú"
      >
        <motion.span
          className={`block w-5 h-[2px] rounded-full transition-colors ${menuOpen ? 'bg-cream' : isScrolled ? 'bg-charcoal' : 'bg-cream'}`}
          animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={`block w-5 h-[2px] rounded-full transition-colors ${menuOpen ? 'bg-cream' : isScrolled ? 'bg-charcoal' : 'bg-cream'}`}
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className={`block w-5 h-[2px] rounded-full transition-colors ${menuOpen ? 'bg-cream' : isScrolled ? 'bg-charcoal' : 'bg-cream'}`}
          animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#3F1F26] z-50 md:hidden flex flex-col pt-24 px-8 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 h-px bg-gold/20" />
                <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
                <div className="flex-1 h-px bg-gold/20" />
              </div>
              {allLinks.map((link, index) => (
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
                      activeSection === link.href ? 'text-gold' : 'text-cream/70 hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-auto pb-8 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-gold/20" />
                  <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
                  <div className="flex-1 h-px bg-gold/20" />
                </div>
                <p className="text-cream/30 text-xs text-center uppercase tracking-widest">Casa de los Ángeles</p>
                <p className="text-cream/20 text-xs text-center mt-1">Palafox 222, Centro Histórico</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
