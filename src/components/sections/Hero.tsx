'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import EventModal from '../modals/EventModal'

// =====================================================
// CONTROL: Cambiar a true para mostrar slide del evento
const SHOW_EVENT_SLIDE = false
// =====================================================

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  
  const slides = SHOW_EVENT_SLIDE 
    ? [{ id: 'main', type: 'main' }, { id: 'event', type: 'event' }]
    : [{ id: 'main', type: 'main' }]

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 1) return
    
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
            {/* Foto de la fachada — llena toda la pantalla */}
            <div className="absolute inset-0">
              <Image
                src="/images/casa.jpeg"
                alt="Casa de los Ángeles - Fachada"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
              {/* Gradiente solo abajo para integrar la pleca */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Pleca elegante en la parte inferior */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <motion.div
                className="bg-emerald-forest/85 backdrop-blur-md border-t border-gold/30 py-6 md:py-8 px-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="max-w-4xl mx-auto text-center">
                  <p className="text-gold-light uppercase tracking-[0.4em] text-sm md:text-base font-light mb-3">
                    Café &bull; Arte &bull; Boutique
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-10 h-px bg-gold/40" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
                    <div className="w-10 h-px bg-gold/40" />
                  </div>
                  <p className="text-cream/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
                    Un espacio único en el corazón histórico de Puebla donde el café artesanal, 
                    la cultura y el arte se encuentran
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {SHOW_EVENT_SLIDE && currentSlide === 1 && (
          <motion.div
            key="slide-event"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/images/fin-de-año-2025.png')`,
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center text-white h-screen flex flex-col items-center justify-center px-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 className="font-serif text-[80px] md:text-[120px] lg:text-[160px] text-gold leading-none mb-6 tracking-tight">
                  31
                </h1>
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold mb-4 tracking-widest">
                  DICIEMBRE
                </p>
                <p className="font-serif text-2xl md:text-3xl text-gold/70 mb-12 tracking-[0.3em]">
                  2025
                </p>
                
                <div className="w-24 h-px bg-gradient-gold mx-auto mb-8" />
                
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-wide">
                  Fiesta de Fin de Año
                </h2>
                
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  Celebra el nuevo año con nosotros en una noche inolvidable
                </p>
                
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

      {SHOW_EVENT_SLIDE && slides.length > 1 && (
        <>
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
        </>
      )}

      <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
    </section>
  )
}
