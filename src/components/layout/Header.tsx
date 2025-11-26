'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#menu', label: 'Menú' },
  // { href: '#galeria', label: 'Galería' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 ${
          isScrolled 
            ? 'bg-cream/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container-custom flex items-center justify-between xl:justify-center xl:gap-16">
          {/* Logo - Centrado en móvil/tablet, izquierda en desktop */}
          <Link href="/" className="relative z-10 xl:static absolute left-1/2 -translate-x-1/2 xl:translate-x-0 xl:-ml-8">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
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

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`text-sm uppercase tracking-[0.15em] font-sans transition-all duration-300 hover:text-gold relative group ${
                    isScrolled ? 'text-charcoal' : 'text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 }}
            >
              <Link
                href="#reservar"
                className={`px-5 py-2.5 text-sm uppercase tracking-[0.15em] border-2 transition-all duration-300 ${
                  isScrolled 
                    ? 'border-emerald bg-emerald text-white hover:bg-emerald-light hover:border-emerald-light' 
                    : 'border-emerald bg-emerald/90 text-white hover:bg-emerald hover:border-emerald-light'
                }`}
              >
                Reservar
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className={`xl:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-charcoal' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(true)}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[60] xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 w-[80%] max-w-sm h-full bg-cream z-[70] xl:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Close button */}
                <motion.button
                  className="absolute top-5 right-5 p-2 text-charcoal z-10"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>

                {/* Logo - Más pequeño y arriba de todo */}
                <div className="pt-4 pb-8 flex justify-center">
                  <div className="relative h-16 w-auto">
                    <Image
                      src="/images/logo-short-1000x1000.png"
                      alt="Casa de los Ángeles"
                      width={160}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Nav Links */}
                <nav className="space-y-1 mt-6 flex-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block py-3 text-lg font-serif text-charcoal hover:text-gold transition-colors border-b border-gold/10"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Button */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="#reservar"
                    className="block w-full py-4 bg-gold text-white text-center uppercase tracking-[0.15em] text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reservar Mesa
                  </Link>
                </motion.div>

                {/* Contact Info */}
                <div className="mt-12 text-sm text-charcoal-50">
                  <p className="mb-2">📍 Av. Don Juan de Palafox y Mendoza 222</p>
                  <p className="mb-2">📞 +52 220 622 4222</p>
                  <p>✉️ contacto@casadelosangelespuebla.com</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
