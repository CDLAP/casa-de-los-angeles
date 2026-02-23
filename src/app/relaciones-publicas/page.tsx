'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Handshake, Building2, Heart, Mail, MessageCircle } from 'lucide-react'

const partnerships = [
  {
    icon: Building2,
    title: 'Alianzas Corporativas',
    description: 'Eventos empresariales, presentaciones de marca y activaciones en un espacio con historia y distinción.',
  },
  {
    icon: Users,
    title: 'Colaboraciones Creativas',
    description: 'Artistas, diseñadores y creadores encuentran en Casa de los Ángeles el escenario perfecto para sus proyectos.',
  },
  {
    icon: Handshake,
    title: 'Patrocinios & Marcas',
    description: 'Vincula tu marca con una experiencia cultural única en el corazón del Centro Histórico de Puebla.',
  },
  {
    icon: Heart,
    title: 'Comunidad & Cultura',
    description: 'Promovemos iniciativas culturales, sociales y educativas que enriquecen a nuestra comunidad.',
  },
]

export default function RelacionesPublicasPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: '-100px' })

  return (
    <div className="min-h-screen bg-bistro">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bistro-dark via-bistro to-bistro-600" />
          <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-24">
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Relaciones Públicas
          </motion.h1>
          <motion.p
            className="text-gold-light/70 uppercase tracking-[0.3em] text-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Conectamos marcas, artistas y comunidad
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-2 h-2 bg-gold/60 rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTENIDO ═══ */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5">
          {/* Intro */}
          <motion.p
            className="text-cream/60 text-lg text-center max-w-3xl mx-auto mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Casa de los Ángeles es un espacio con más de 100 años de historia en el corazón del Centro Histórico de Puebla. 
            Abrimos nuestras puertas a alianzas y colaboraciones que enriquezcan la experiencia cultural de nuestra comunidad.
          </motion.p>

          {/* Grid de servicios */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {partnerships.map((item, index) => (
              <motion.div
                key={item.title}
                className="group p-8 rounded-2xl border border-gold/10 bg-cream/5 hover:bg-cream/10 hover:border-gold/25 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-5">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-cream mb-2 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-cream/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-gold/5 border border-gold/15 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="font-serif text-2xl sm:text-3xl text-gold mb-4">
                ¿Quieres colaborar con nosotros?
              </h3>
              <p className="text-cream/50 text-lg mb-8 max-w-xl mx-auto">
                Estamos abiertos a nuevas alianzas y colaboraciones que enriquezcan la experiencia cultural de Puebla.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:contacto@casadelosangelespuebla.com?subject=Relaciones%20P%C3%BAblicas%20-%20Propuesta%20de%20Colaboraci%C3%B3n"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold text-gold text-sm uppercase tracking-[0.15em] font-sans font-medium transition-all duration-500 hover:bg-gold hover:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4" />
                  Escribirnos
                </motion.a>
                <motion.a
                  href="https://wa.me/522206224222?text=Hola,%20me%20interesa%20una%20colaboraci%C3%B3n%20con%20Casa%20de%20los%20%C3%81ngeles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-charcoal text-sm uppercase tracking-[0.15em] font-sans font-medium transition-all duration-300 hover:bg-gold-light"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
