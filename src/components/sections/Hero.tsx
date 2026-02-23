'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const angelRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isStuck, setIsStuck] = useState(false)
  const [angelInitialTop, setAngelInitialTop] = useState(0)

  useEffect(() => {
    const angel = angelRef.current
    if (!angel) return

    // Guardamos la posición original del ángel
    const updateInitialTop = () => {
      const rect = angel.getBoundingClientRect()
      const scrollY = window.scrollY
      setAngelInitialTop(rect.top + scrollY)
    }

    updateInitialTop()
    // Recalcular si cambia el tamaño
    window.addEventListener('resize', updateInitialTop)

    const handleScroll = () => {
      if (!angel) return
      // El nav mide ~64px en desktop, ~56px en mobile
      const navHeight = window.innerWidth >= 768 ? 72 : 0
      const rect = angel.getBoundingClientRect()

      // Cuando el ángel llega al borde inferior del nav, se fija
      if (rect.top <= navHeight && !isStuck) {
        setIsStuck(true)
      } else if (window.scrollY < angelInitialTop - navHeight && isStuck) {
        setIsStuck(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateInitialTop)
    }
  }, [isStuck, angelInitialTop])

  return (
    <>
      {/* BLOQUE 1: Foto de la casa */}
      <section id="inicio" className="relative w-full pt-[88px] md:pt-[104px] bg-[#3F1F26]">
        <Image
          src="/images/casa.jpeg"
          alt="Casa de los Ángeles - Fachada"
          width={2400}
          height={1600}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        />
      </section>

      {/* BLOQUE 2: Pleca guinda */}
      <section ref={sectionRef} className="relative w-full bg-[#3F1F26] pb-16 md:pb-20 pt-16 md:pt-32">
        {/* Línea dorada */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/60" />

        {/* Ángel — posición original (se oculta cuando se fija) */}
        <div
          ref={angelRef}
          className="absolute top-0 left-0 right-0 -translate-y-1/2 flex justify-center"
          style={{ zIndex: 20, visibility: isStuck ? 'hidden' : 'visible' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image
              src="/images/logo-short-1000x1000.png"
              alt="Casa de los Ángeles"
              width={160}
              height={160}
              className="object-contain drop-shadow-2xl w-44 h-44 md:w-56 md:h-56"
              priority
            />
          </motion.div>
        </div>

        {/* Ángel FIJO — swap instantáneo, sin animación */}
        <div
          className="fixed md:top-[28px] left-0 right-0 hidden md:flex justify-center pointer-events-none"
          style={{ zIndex: 55, visibility: isStuck ? 'visible' : 'hidden' }}
        >
          <Image
            src="/images/logo-short-1000x1000.png"
            alt="Casa de los Ángeles"
            width={160}
            height={160}
            className="object-contain drop-shadow-2xl w-44 h-44 md:w-56 md:h-56"
          />
        </div>

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
      </section>
    </>
  )
}
