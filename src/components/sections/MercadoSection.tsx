'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShoppingBag, Gem, Palette, Gift, Clock, MapPin, Calendar, Sparkles, FileText } from 'lucide-react'
import LineamientosModal from '@/components/modals/LineamientosModal'

const mercadoCategories = [
  {
    icon: Palette,
    title: 'Diseño & Moda',
    description: 'Piezas únicas de diseñadores independientes con estilo y personalidad.',
  },
  {
    icon: Gem,
    title: 'Arte & Decoración',
    description: 'Obras y objetos decorativos que transformarán tus espacios.',
  },
  {
    icon: Gift,
    title: 'Regalos Especiales',
    description: 'Encuentra el detalle perfecto entre nuestra selección curada.',
  },
  {
    icon: Sparkles,
    title: 'Productos Gourmet',
    description: 'Delicias artesanales y productos selectos para paladares exigentes.',
  },
]

export default function MercadoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
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
              <h2 className="font-serif text-display-md text-gold-dark mb-6">
                Mercado
              </h2>
              <p className="text-charcoal-50 text-lg leading-relaxed mb-4">
                Un mercado boutique donde las marcas brillan y la experiencia para el visitante 
                es siempre agradable. Creado con cariño, intención y visión en el corazón del 
                Centro Histórico de Puebla.
              </p>
              <p className="text-charcoal-50 text-lg leading-relaxed mb-8">
                Disfruta de un espacio al aire libre con encanto arquitectónico, a media cuadra 
                del Zócalo, donde encontrarás una selección cuidada de marcas locales e independientes.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {mercadoCategories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    className="flex flex-col items-center lg:flex-row lg:items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <category.icon className="w-5 h-5 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-charcoal mb-1">{category.title}</h3>
                      <p className="text-sm text-charcoal-50">{category.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Info del evento */}
              <motion.div
                className="bg-emerald/5 border border-emerald/20 rounded-xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 sm:justify-center lg:justify-start">
                  <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 lg:gap-3">
                    <Calendar className="w-5 h-5 text-emerald" />
                    <div>
                      <p className="text-xs text-charcoal-50 uppercase tracking-wider">Fecha</p>
                      <p className="text-charcoal font-medium">Viernes, Sábados y Domingos</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 lg:gap-3">
                    <Clock className="w-5 h-5 text-emerald" />
                    <div>
                      <p className="text-xs text-charcoal-50 uppercase tracking-wider">Horario</p>
                      <p className="text-charcoal font-medium">11:00 AM - 8:00 PM</p>
                    </div>
                  </div>
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
                  ¿Te gustaría participar como expositor? Contáctanos para conocer los espacios disponibles.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.a
                    href="https://wa.me/522206224222?text=Hola,%20me%20interesa%20participar%20como%20expositor%20en%20el%20Mercado%20de%20Casa%20de%20los%20%C3%81ngeles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-elegant text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Quiero ser Expositor
                  </motion.a>
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gold text-gold-dark rounded-lg font-medium hover:bg-gold/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FileText className="w-4 h-4" />
                    Ver Lineamientos
                  </motion.button>
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
      <LineamientosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
