'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Moon, Sun, Clock, MapPin, FileText } from 'lucide-react'
import Link from 'next/link'

// CLIENTE: re-activar cuando Mercado de la Luna esté listo
const SHOW_LUNA = false

const markets = [
  {
    id: 'luna',
    icon: Moon,
    name: 'Mercado de la Luna',
    day: 'Viernes',
    hours: '4:00 PM — 9:00 PM',
    concept: 'Nocturno · velas · mezcal · música',
  },
  {
    id: 'angeles',
    icon: Sun,
    name: 'Mercado de los Ángeles',
    day: 'Sáb · Dom',
    hours: 'Sáb–Dom 11am–8pm',
    concept: 'Diurno · turismo · café · compras',
  },
]

const visibleMarkets = SHOW_LUNA ? markets : markets.filter(m => m.id !== 'luna')

export default function MercadoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="mercado" ref={sectionRef} className="section bg-cream relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs mb-4">
              Casa de los Ángeles
            </p>
            <h2 className="font-serif text-display-md text-gold-dark mb-6">
              Mercados de Casa de los Ángeles
            </h2>
            <p className="text-charcoal-50 text-lg leading-relaxed mb-4">
              Una casa histórica del siglo XVIII donde las marcas forman parte de una
              experiencia, no de un bazar tradicional.{visibleMarkets.length > 1 ? ' Dos mercados con perfil distinto, mismo espíritu curado.' : ''}
            </p>
            <p className="text-charcoal-50 text-lg leading-relaxed mb-8">
              A media cuadra del Zócalo, en el corazón del Centro Histórico de Puebla.
            </p>

            {/* Markets quick view */}
            <div className={`grid ${visibleMarkets.length > 1 ? 'sm:grid-cols-2' : 'max-w-md mx-auto lg:mx-0'} gap-5 mb-10`}>
              {visibleMarkets.map((market, index) => (
                <motion.div
                  key={market.name}
                  className="bg-white border border-gold/20 rounded-xl p-5 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <market.icon className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-lg text-charcoal leading-tight">
                      {market.name}
                    </h3>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-gold-dark font-medium mb-1">
                    {market.day}
                  </p>
                  <p className="text-charcoal font-medium text-sm mb-2">
                    {market.hours}
                  </p>
                  <p className="text-charcoal-50 text-sm leading-snug">
                    {market.concept}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Location card */}
            <motion.div
              className="bg-emerald/5 border border-emerald/20 rounded-xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 sm:justify-center lg:justify-start">
                <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 lg:gap-3">
                  <MapPin className="w-5 h-5 text-emerald" />
                  <div>
                    <p className="text-xs text-charcoal-50 uppercase tracking-wider">Lugar</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Casa+de+los+Angeles+Palafox+222+Puebla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal font-medium hover:text-gold transition-colors underline decoration-gold/30 hover:decoration-gold"
                    >
                      Casa de los Ángeles
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-charcoal-50 mb-6">
                ¿Te gustaría participar como expositor? Conoce {visibleMarkets.length > 1 ? 'los dos mercados, sus zonas y tarifas' : 'el mercado, sus zonas y tarifas'}.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/mercados"
                    className="btn-filled w-full sm:w-auto text-center"
                  >
                    {visibleMarkets.length > 1 ? 'Ver los Mercados' : 'Ver el Mercado'}
                  </Link>
                </motion.div>
                <motion.a
                  href="https://wa.me/522206224222?text=Hola,%20quiero%20información%20para%20participar%20en%20los%20mercados%20de%20Casa%20de%20los%20%C3%81ngeles.%20Mi%20marca%20se%20llama:%20__%20y%20vendo:%20__."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-elegant text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Quiero ser Expositor
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative pb-4 pr-4 md:pb-8 md:pr-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/images/bazar.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/30 rounded-2xl -z-10 hidden md:block" />
              <motion.div
                className="absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6 bg-gold text-charcoal p-4 md:p-6 rounded-xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-center">
                  <span className="block text-2xl font-serif mb-1">Entrada</span>
                  <span className="text-sm uppercase tracking-wider">Libre</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
