'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import EventModal from '../modals/EventModal'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  
  const slides = [
    { id: 'main', type: 'main' },
    { id: 'event', type: 'event' }
  ]

  // Auto-rotate cada 15 segundos
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 15000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section 
      id="inicio" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <motion.div
            key="slide-main"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* SLIDE 1: Hero Original - COMPLETO */}
            
            {/* Elegant Background - Multi-layer - VERDE CAFETERÍA */}
            <div className="absolute inset-0">
              {/* Base gradient - Verde bosque */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-forest via-emerald-dark to-emerald-800" />
              
              {/* Radial gold glow - mantener lujo */}
              <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />
              
              {/* Elegant pattern overlay */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L50 100M0 50L100 50' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
                  backgroundSize: '100px 100px'
                }}
              />
              
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-transparent to-emerald-forest/50" />
            </div>

            {/* Decorative geometric elements - Verde + Dorado */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <motion.div 
                className="absolute top-20 left-10 w-64 h-64 border border-gold rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-20 right-20 w-96 h-96 border border-emerald-light rounded-full"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-5 max-w-5xl mx-auto h-screen flex flex-col items-center justify-center">
              
              {/* Logo Principal - Elemento Central */}
              <motion.div
                className="mb-6 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="relative">
                  {/* Glow effect behind logo */}
                  <div className="absolute inset-0 blur-3xl bg-gold/20 scale-150" />
                  
                  {/* Logo COMPLETO */}
                  <div className="relative w-56 h-56 md:w-[294px] md:h-[294px] lg:w-[368px] lg:h-[368px]">
                    <Image
                      src="/images/logo-CDLA.png"
                      alt="Casa de los Ángeles Logo"
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                className="text-gold-light uppercase tracking-[0.4em] text-sm md:text-base mb-8 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Cafetería & Centro de Cultura
              </motion.p>

              {/* Elegant divider */}
              <motion.div
                className="flex items-center justify-center gap-4 mb-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-sage" />
                <div className="w-2 h-2 bg-emerald-sage rotate-45" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-emerald-sage" />
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Un espacio único en el corazón histórico de Puebla donde el café artesanal, 
                la cultura y el arte se encuentran en una experiencia sublime
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.a
                  href="#reservar"
                  className="px-10 py-4 bg-gold text-emerald-900 font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/50"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Visitar Cafetería
                </motion.a>
                <motion.a
                  href="#menu"
                  className="px-10 py-4 bg-emerald text-white font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-emerald-light hover:shadow-2xl hover:shadow-emerald/50"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Menú
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentSlide === 1 && (
          <motion.div
            key="slide-event"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* SLIDE 2: Evento Fin de Año - MINIMALISTA LUXURY */}
            
            {/* Foto fullscreen */}
            <div className="absolute inset-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/images/fin-de-año-2025.png')`,
                }}
              />
              {/* Overlay oscuro para legibilidad */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content - MINIMALISTA EXTREMO */}
            <div className="relative z-10 text-center text-white h-screen flex flex-col items-center justify-center px-5">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {/* Fecha GIGANTE en serif dorado */}
                <h1 className="font-serif text-[80px] md:text-[120px] lg:text-[160px] text-gold leading-none mb-6 tracking-tight">
                  31
                </h1>
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold mb-4 tracking-widest">
                  DICIEMBRE
                </p>
                <p className="font-serif text-2xl md:text-3xl text-gold/70 mb-12 tracking-[0.3em]">
                  2025
                </p>
                
                {/* Línea dorada sutil */}
                <div className="w-24 h-px bg-gradient-gold mx-auto mb-8" />
                
                {/* Título del evento */}
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-wide">
                  Fiesta de Fin de Año
                </h2>
                
                {/* Descripción mínima */}
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  Celebra el nuevo año con nosotros en una noche inolvidable
                </p>
                
                {/* Botón único dorado */}
                <motion.button
                  onClick={() => setIsEventModalOpen(true)}
                  className="inline-block px-12 py-5 bg-gold text-charcoal font-sans text-sm uppercase tracking-[0.3em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/50 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reservar Mesa
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Controls - DOTS ULTRA REFINADOS */}
      
      {/* Dots minimalistas - Parte inferior central */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center items-center gap-6 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group p-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`transition-all duration-500 rounded-full ${
                currentSlide === index
                  ? 'w-1.5 h-1.5 bg-gold shadow-sm shadow-gold/50'
                  : 'w-1.5 h-1.5 border border-gold/30 group-hover:border-gold/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Arrows - Laterales (solo visible en hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-gold/50 hover:text-gold transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-gold/50 hover:text-gold transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center text-gold/50 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={32} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Event Modal */}
      <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
    </section>
  )
}
