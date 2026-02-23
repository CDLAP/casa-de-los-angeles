'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const leftLinks = [
  { href: '/#menu', label: 'Café' },
  { href: '/#nosotros', label: 'Museo' },
  { href: '/#boutique', label: 'Boutique' },
  { href: '/#atelier', label: 'Atelier' },
]

const rightLinks = [
  { href: '/#rueda-de-prensa', label: 'Prensa' },
  { href: '/#contacto', label: 'Contacto' },
]

const allLinks = [...leftLinks, ...rightLinks]

export default function Header() {
  const pathname = usePathname()
  const isBistro = pathname === '/bistro'
  const isCultura = pathname === '/cultura'
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAngel, setShowAngel] = useState(false)
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      // Show angel after scrolling past hero (~screen height)
      setShowAngel(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = (href: string) =>
    `text-[10px] sm:text-xs xl:text-sm uppercase tracking-[0.08em] sm:tracking-[0.12em] xl:tracking-[0.15em] font-sans transition-all duration-300 whitespace-nowrap ${
      activeSection === href
        ? 'text-gold'
        : isScrolled ? 'text-charcoal hover:text-gold' : 'text-cream/90 hover:text-gold'
    }`

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-cream/95 backdrop-blur-md shadow-lg py-4' 
          : 'bg-[#3F1F26] py-8'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Desktop: menú dividido con ángel al centro cuando scroll */}
      <nav className="hidden xl:flex items-center justify-center gap-6">
        {leftLinks.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass(link.href)}>
            {link.label}
          </Link>
        ))}

        {/* Ángel aparece al hacer scroll */}
        <div className="relative w-28 mx-6">
          <AnimatePresence>
            {showAngel && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <Link href="/#inicio">
                  <Image
                    src="/images/logo-short-1000x1000.png"
                    alt="Casa de los Ángeles"
                    width={112}
                    height={112}
                    className="object-contain drop-shadow-lg"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {rightLinks.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass(link.href)}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile/Tablet: links en fila, ángel aparece al scroll */}
      <div className="xl:hidden">
        <nav className="flex items-center justify-center gap-2 sm:gap-3 px-3 flex-wrap">
          {allLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Ángel debajo del menú en mobile al scroll */}
        <AnimatePresence>
          {showAngel && (
            <motion.div
              className="flex justify-center mt-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4 }}
            >
              <Link href="/#inicio">
                <Image
                  src="/images/logo-short-1000x1000.png"
                  alt="Casa de los Ángeles"
                  width={72}
                  height={72}
                  className="object-contain drop-shadow-lg"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
