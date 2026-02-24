'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const NAV_HEIGHT = 84
const ANGEL_HEIGHT = 224
const STUCK_TOP = NAV_HEIGHT - Math.round(ANGEL_HEIGHT / 4)

const heroImages = [
  '/images/casa.jpeg',
  '/images/casa.png',
  '/images/casad.png',
]

export default function Hero() {
  const plecaRef = useRef<HTMLElement>(null)
  const [hideStatic, setHideStatic] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const pleca = plecaRef.current
      if (!pleca || window.innerWidth < 768) return
      const rect = pleca.getBoundingClientRect()
      const staticTop = rect.top - ANGEL_HEIGHT / 2
      setHideStatic(staticTop <= STUCK_TOP)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-advance hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Foto de la casa — crossfade carousel */}
      <section id="inicio" className="w-full pt-[84px] bg-cream">
        <div className="relative w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative w-full" style={{ aspectRatio: '2400/1600' }}>
              {heroImages.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Casa de los Ángeles - Fachada ${index + 1}`}
                  fill
                  className="object-cover transition-opacity duration-[2000ms] ease-in-out"
                  style={{ opacity: currentImage === index ? 1 : 0 }}
                  priority={index === 0}
                  sizes="100vw"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pleca guinda */}
      <section ref={plecaRef} className="relative w-full">
        {/* Querubín estático — desaparece cuando el sticky lo reemplaza */}
        <div
          className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none transition-opacity duration-0"
          style={{ transform: 'translateY(-50%)', zIndex: 55, opacity: hideStatic ? 0 : 1 }}
        >
          <Image
            src="/images/logo-short-1000x1000.png"
            alt="Casa de los Ángeles"
            width={160}
            height={160}
            className="object-contain drop-shadow-2xl w-44 h-44 md:w-56 md:h-56"
            priority
          />
        </div>

        <div className="relative bg-[#3F1F26] pb-16 md:pb-20 pt-20 md:pt-32 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/60" />
        {/* Motivo decorativo */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L50 100M0 50L100 50' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
        <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-5">
          <motion.h1
            className="font-serif text-4xl md:text-6xl text-gold tracking-wide mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Casa de los Ángeles
          </motion.h1>

          <motion.p
            className="text-gold-light uppercase tracking-[0.4em] text-sm md:text-base font-light mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Café &bull; Arte &bull; Boutique
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="w-12 h-px bg-gold/40" />
          </motion.div>

          <motion.p
            className="text-cream/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Un espacio único en el corazón histórico de Puebla donde el café artesanal,<br className="md:hidden" />{' '}
            la cultura y el arte se encuentran
          </motion.p>

          <motion.a
            href="/#contacto"
            className="inline-block px-8 py-3 text-sm uppercase tracking-[0.2em] font-light border border-gold/50 text-gold transition-all duration-300 hover:bg-gold hover:text-[#3F1F26]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Reservar
          </motion.a>
        </div>
        </div>
      </section>
    </>
  )
}
