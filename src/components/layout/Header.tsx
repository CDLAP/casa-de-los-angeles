'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const mainLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#menu', label: 'Café' },
  { href: '/museo', label: 'Museo' },
  { href: '/#boutique', label: 'Boutique' },
  { href: '/mercados', label: 'Mercados' },
  { href: '/#rueda-de-prensa', label: 'Prensa' },
  { href: '/artesania-visual', label: 'Studio' },
]

const moreLinks = [
  { href: '/eventos', label: 'Eventos' },
  { href: '/promocion', label: 'Promoción del Día' },
  { href: '/relaciones-publicas', label: 'Relaciones Públicas' },
  { href: '/#contacto', label: 'Contacto' },
]

const allLinks = [
  { href: '/', label: 'Inicio' },
  ...mainLinks.filter(l => l.href !== '/'),
  ...moreLinks,
]

export default function Header() {
  const pathname = usePathname()
  const isBistro = pathname === '/bistro'
  const isCultura = pathname === '/cultura'
  const isEventos = pathname === '/eventos'
  const isPromocion = pathname === '/promocion'
  const isRP = pathname === '/relaciones-publicas'
  const isArtesania = pathname === '/artesania-visual'
  const isMuseo = pathname === '/museo'
  const isMercado = pathname === '/mercados' || pathname.startsWith('/mercados/') || pathname.startsWith('/mercado-de-los-angeles')
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
    if (isArtesania) { setActiveSection('/artesania-visual'); return }
    if (isMuseo) { setActiveSection('/museo'); return }
    if (isMercado) { setActiveSection('/mercados'); return }
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
  }, [isBistro, isCultura, isEventos, isPromocion, isRP, isArtesania, isMuseo, isMercado, pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    window.dispatchEvent(new CustomEvent('mobileMenuToggle', { detail: { open: menuOpen } }))
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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' && (activeSection === '' || activeSection === '/#inicio')
    return activeSection === href
  }

  const navTextClass = (active: boolean) =>
    `text-sm xl:text-base uppercase tracking-[0.12em] xl:tracking-[0.2em] font-sans transition-colors duration-300 whitespace-nowrap px-3 lg:px-4 xl:px-5 py-4 ${
      active
        ? 'text-gold'
        : 'text-charcoal hover:text-gold'
    }`

  return (
    <>
      {/* Desktop header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden md:block ${
          isScrolled
            ? 'bg-cream shadow-lg pt-6 pb-10'
            : 'bg-cream pt-6 pb-10'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="flex items-center justify-center px-3">
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navTextClass(isActive(link.href))}>
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-6 py-3 min-w-[220px] bg-cream shadow-xl"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Flechita arriba */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cream" />

                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className={`block px-6 py-3 text-sm uppercase tracking-[0.12em] font-sans transition-colors duration-300 ${
                        isActive(link.href)
                          ? 'text-gold'
                          : 'text-charcoal hover:text-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>


        </nav>
      </motion.header>



      {/* Mobile hamburger */}
      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`fixed top-5 right-5 z-[60] md:hidden w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[5px] transition-all duration-300 ${
          menuOpen
            ? 'bg-transparent'
            : 'bg-cream/90 backdrop-blur-md shadow-lg'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        aria-label="Menú"
      >
        <motion.span
          className={`block w-5 h-[2px] rounded-full transition-colors ${menuOpen ? 'bg-cream' : 'bg-charcoal'}`}
          animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={`block w-5 h-[2px] rounded-full transition-colors ${menuOpen ? 'bg-cream' : 'bg-charcoal'}`}
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className={`block w-5 h-[2px] rounded-full transition-colors ${menuOpen ? 'bg-cream' : 'bg-charcoal'}`}
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
              className="fixed top-0 right-0 bottom-0 w-full bg-[#3F1F26] z-50 md:hidden flex flex-col overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Querubín integrado en el menú */}
              <div className="flex justify-center pt-6 pb-4">
                <Image
                  src="/images/logo-short-1000x1000.png"
                  alt="Casa de los Ángeles"
                  width={120}
                  height={120}
                  className="object-contain drop-shadow-2xl w-36 h-36"
                />
              </div>

              <div className="px-10">
                <div className="flex items-center gap-3 mb-4">
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
                      className={`block py-3 font-sans text-base uppercase tracking-[0.15em] transition-colors border-b border-gold/10 text-center ${
                      isActive(link.href) ? 'text-gold' : 'text-cream/70 hover:text-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto pb-8 pt-8 px-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-gold/20" />
                  <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
                  <div className="flex-1 h-px bg-gold/20" />
                </div>
                <p className="text-cream/30 text-xs text-center uppercase tracking-widest">Casa de los Ángeles</p>
                <p className="text-cream/20 text-xs text-center mt-1">Don Juan de Palafox y Mendoza 222, Centro</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
