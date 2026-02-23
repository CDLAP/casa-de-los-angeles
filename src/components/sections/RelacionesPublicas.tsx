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

export default function RelacionesPublicas() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="relaciones-publicas" ref={sectionRef} className="section bg-emerald-forest relative overflow-hidden">
      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M40 0L40 80M0 40L80 40' stroke='%23C9A961' stroke-width='0.3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-display-md text-gold text-center mb-4">
            Relaciones Públicas
          </h2>
          <p className="font-sans text-lg text-cream/60 text-center italic max-w-2xl mx-auto">
            Conectamos marcas, artistas y comunidad en un espacio con más de 100 años de historia.
          </p>
          <div className="w-24 h-px bg-gradient-gold mx-auto my-6 md:my-8" />
        </motion.div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 md:mb-20">
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

        {/* CTA de contacto */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gold/5 border border-gold/15 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="font-serif text-display-sm text-gold mb-4">
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
  )
}
