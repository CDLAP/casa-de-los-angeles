'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShoppingBag, Gem, Palette, Gift, Clock, MapPin, Calendar } from 'lucide-react'

const bazarCategories = [
  {
    icon: Gem,
    title: 'Joyería Artesanal',
    description: 'Piezas únicas elaboradas por artesanos locales con materiales de primera calidad.',
  },
  {
    icon: Palette,
    title: 'Arte & Decoración',
    description: 'Obras de artistas poblanos y piezas decorativas que transformarán tus espacios.',
  },
  {
    icon: ShoppingBag,
    title: 'Moda & Accesorios',
    description: 'Ropa y complementos de diseñadores independientes con estilo único.',
  },
  {
    icon: Gift,
    title: 'Regalos Especiales',
    description: 'Encuentra el detalle perfecto entre nuestra selección curada de productos.',
  },
]

export default function Bazar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="bazar" ref={sectionRef} className="section bg-cream relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-display-md text-gold-dark mb-6">
              Bazar de los Ángeles
            </h2>
            <p className="text-charcoal-50 text-lg leading-relaxed mb-8">
              Descubre una experiencia única de compras en el corazón del Centro Histórico de Puebla. 
              Nuestro bazar reúne a los mejores artesanos y diseñadores locales en un ambiente 
              elegante y acogedor.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {bazarCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  className="flex gap-4"
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
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-emerald" />
                  <div>
                    <p className="text-xs text-charcoal-50 uppercase tracking-wider">Fecha</p>
                    <p className="text-charcoal font-medium">16, 17 y 18 de Enero 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald" />
                  <div>
                    <p className="text-xs text-charcoal-50 uppercase tracking-wider">Horario</p>
                    <p className="text-charcoal font-medium">11:00 AM - 9:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-emerald" />
                  <div>
                    <p className="text-xs text-charcoal-50 uppercase tracking-wider">Lugar</p>
                    <a 
                      href="https://maps.app.goo.gl/Vy9N3wGUC4BKLHPcA" 
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
                ¿Interesado en participar como expositor? Contáctanos para más información.
              </p>
              <motion.a
                href="#contacto"
                className="btn-elegant"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Más Información
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Composition */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative pb-4 pr-4 md:pb-8 md:pr-8">
              {/* Main image placeholder */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-emerald/20 to-gold/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <ShoppingBag className="w-20 h-20 text-gold/40 mx-auto mb-4" />
                    <p className="text-charcoal-50 text-sm uppercase tracking-wider">Imagen próximamente</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              </div>

              {/* Decorative frame - hidden on mobile */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/30 rounded-2xl -z-10 hidden md:block" />

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6 bg-gold text-charcoal p-4 md:p-6 rounded-xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-center">
                  <span className="block text-3xl font-serif mb-1">+20</span>
                  <span className="text-xs uppercase tracking-wider">Expositores</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
