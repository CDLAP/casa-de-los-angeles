'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Coffee, UtensilsCrossed, Sun, Heart } from 'lucide-react'

const cafeHighlights = [
  {
    icon: Coffee,
    title: 'Café de Especialidad',
    description: 'Granos de altura seleccionados, tostados artesanalmente. Desde un americano aromático hasta nuestro icónico Chocolat Chantilly parisino.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Croissants Artesanales',
    description: 'Elaborados con mantequilla pura francesa. Dorados, hojaldrados y servidos calientes: desde el clásico Parisien hasta el Serrano con parmesano.',
  },
  {
    icon: Sun,
    title: 'Desayunos Franceses',
    description: 'Comienza tu día con un Petit Desayuno o comparte una Tabla Francesa para Dos. Prensa francesa en mesa y mermeladas artesanales.',
  },
  {
    icon: Heart,
    title: 'Sodas de Autor',
    description: 'Refrescos artesanales con ingredientes naturales: Limón & Lavanda, Flor de Saúco Europea, Mandarina y más.',
  },
]

const menuPreview = [
  { name: 'Americano Gourmet', price: '$78' },
  { name: 'Café Parisíno', price: '$85' },
  { name: 'Chocolat Chantilly', price: '$129' },
  { name: 'Croissant Parisien', price: '$68' },
  { name: 'Croissant Provençal', price: '$149' },
  { name: 'Desayuno Gourmet', price: '$229' },
]

export default function Cafe() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="cafe" ref={sectionRef} className="section bg-emerald-forest text-cream relative overflow-hidden">
      {/* Pattern de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-gold" />
            <span className="text-gold text-2xl">☕</span>
            <div className="w-12 h-px bg-gradient-gold" />
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mb-4 tracking-tight">
            Nuestro Café
          </h2>
          <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto font-light italic">
            Café artesanal, repostería francesa y una experiencia que despierta los sentidos
          </p>
        </motion.div>

        {/* 4 Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {cafeHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
            >
              <div className="w-16 h-16 mx-auto mb-6 border border-gold/30 rounded-full flex items-center justify-center text-gold group-hover:bg-gold/10 transition-all duration-500">
                <item.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-gold mb-3 italic">
                {item.title}
              </h3>
              <p className="text-cream/55 text-sm leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Preview del menú + CTA */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="border border-gold/20 p-8 md:p-12">
            <h3 className="font-serif text-2xl text-gold text-center mb-8 italic">
              Selección del Menú
            </h3>
            
            <div className="space-y-4">
              {menuPreview.map((item, index) => (
                <div key={index} className="flex items-baseline gap-2">
                  <span className="font-serif italic text-cream/80">{item.name}</span>
                  <div className="flex-1 border-b border-dotted border-gold/30 min-w-[20px] mb-1" />
                  <span className="font-serif text-gold">{item.price}</span>
                </div>
              ))}
            </div>

            {/* Ornamento */}
            <div className="flex items-center justify-center gap-4 mt-8 mb-8">
              <div className="w-8 h-px bg-gold/30" />
              <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
              <div className="w-8 h-px bg-gold/30" />
            </div>

            {/* CTA */}
            <div className="text-center">
              <motion.a
                href="#menu"
                className="inline-block px-10 py-4 bg-gold text-emerald-900 font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Menú Completo
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Horario */}
        <motion.p
          className="text-center text-cream/35 text-sm mt-12 font-light"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Abierto todos los días • 8:00 AM – 8:00 PM
        </motion.p>
      </div>
    </section>
  )
}
