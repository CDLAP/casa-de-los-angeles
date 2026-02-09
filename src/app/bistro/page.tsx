'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const menuCategories = [
  {
    id: 'especialidades',
    name: 'Especialidades',
    items: [
      {
        name: 'Americano Gourmet',
        description: 'Nuestro Café de altura: suave y aromático; con notas frutales y un toque ligero de chocolate. (355 ml)',
        price: '78',
      },
      {
        name: 'Café Parisíno',
        description: 'El clásico francés: espresso aromático con leche caliente; suave y reconfortante. (355 ml)',
        price: '85',
      },
      {
        name: 'Café au Chocolat',
        description: 'Espresso intenso con chocolate real y leche caliente; fuerte y dulce, con sabor a cacao. (355 ml)',
        price: '105',
      },
      {
        name: 'Vainilla Francesa',
        description: 'Espresso con leche infusionada con vainilla francesa; terminado con Chantilly. (355 ml)',
        price: '110',
      },
      {
        name: 'Chocolat Chantilly',
        description: 'Chocolate parisino espeso, 100% cacao; cubierto con crema Chantilly que se derrite. (355 ml)',
        price: '129',
      },
      {
        name: 'Thé Gourmet',
        description: 'Selección rotativa de tés europeos; aromas limpios, delicados y de temporada. (355 ml)',
        price: '85',
      },
    ],
  },
  {
    id: 'sodas',
    name: 'Sodas Artesanales',
    items: [
      {
        name: 'Agua Mineral de la Casa',
        description: 'Burbuja fina, sabor limpio y refrescante; perfecta para acompañar cualquier platillo. (420 ml)',
        price: '65',
      },
      {
        name: 'Dulce Frambuesa',
        description: 'Frambuesa madura con limón; fresca, vibrante y frutal, con aroma intenso. (420 ml)',
        price: '89',
      },
      {
        name: 'Limón & Lavanda',
        description: 'Lavanda suave con limón fresco; aromática, ligera y con perfil floral elegante. (420 ml)',
        price: '92',
      },
      {
        name: 'Mandarina Refrescante',
        description: 'Mandarina brillante con matices de naranja; cítrica, jugosa y refrescante. (420 ml)',
        price: '95',
      },
      {
        name: 'Flor de Verano',
        description: 'Flor de saúco europea con limón; delicada, floral y con carácter refinado. (420 ml)',
        price: '98',
      },
    ],
  },
  {
    id: 'croissants',
    name: 'Croissants Français',
    subtitle: 'Nuestros Croissants son artesanales y elaborados con Mantequilla pura.',
    items: [
      {
        name: 'Croissant Parisien',
        description: 'Mantequilla auténtica, dorado por fuera y suave por dentro; servido caliente con aroma y textura hojaldrada.',
        price: '68',
      },
      {
        name: 'Croissant Fraise',
        description: 'Tibio, relleno de mermelada de fresa artesanal; contraste delicioso entre lo crujiente y lo frutal.',
        price: '80',
      },
      {
        name: 'Croissant Chocolat',
        description: 'Caliente, con crema de chocolate y avellana; sabor profundo y textura suave.',
        price: '95',
      },
      {
        name: 'Croissant Provençal',
        description: 'Jamón a las hierbas finas y queso gruyère; aromas delicados y combinación equilibrada.',
        price: '149',
      },
      {
        name: 'Croissant Serrano',
        description: 'Jamón serrano y queso parmesano; sabores intensos y elegantes con mantequilla.',
        price: '179',
      },
    ],
  },
  {
    id: 'desayunos',
    name: 'Desayunos',
    items: [
      {
        name: 'Petit Desayuno',
        description: 'Croissant Parisien caliente, café del día; jugo de naranja natural. Ligero y fresco.',
        price: '129',
      },
      {
        name: 'Desayuno París',
        description: 'Croissant Parisien con una bebida gourmet a elegir. Un clásico parisino para empezar el día.',
        price: '159',
      },
      {
        name: 'Desayuno Gourmet',
        description: 'Croissant Parisien, prensa francesa en mesa; jugo de naranja y mermelada artesanal.',
        price: '229',
      },
      {
        name: 'Tabla Francesa para Dos',
        description: 'Dos croissants Parisien calientes, mermelada artesanal; queso francés, jugo de naranja y dos bebidas a elegir. Ideal para compartir.',
        price: '390',
      },
    ],
  },
]

export default function BistroPage() {
  const menuRef = useRef<HTMLDivElement>(null)
  const isMenuInView = useInView(menuRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('especialidades')

  const activeCategoryData = menuCategories.find(cat => cat.id === activeCategory)
  const activeItems = activeCategoryData?.items || []

  return (
    <div className="min-h-screen bg-bistro">
      {/* ═══ HERO BISTRÓ ═══ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Fondo con textura */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bistro-dark via-bistro to-bistro-600" />
          <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L50 100M0 50L100 50' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bistro-900/60 via-transparent to-bistro-dark/40" />
        </div>

        {/* Círculos decorativos */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 border border-gold rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 border border-bistro-200 rounded-full"
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Contenido Hero */}
        <div className="relative z-10 text-center text-white px-5 max-w-5xl mx-auto pt-24">
          {/* Logo */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-gold/15 scale-150" />
              <div className="relative w-40 h-40 md:w-56 md:h-56">
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

          {/* Título principal */}
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Nuestro Bistró
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            className="text-gold-light/80 uppercase tracking-[0.4em] text-sm md:text-base mb-8 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Café • Cultura & Bistró
          </motion.p>

          {/* Ornamento */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-2 h-2 bg-gold/60 rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>

          {/* Descripción */}
          <motion.p
            className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Sabores artesanales, café de especialidad y una experiencia gastronómica 
            francesa en el corazón histórico de Puebla
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.a
              href="#menu-bistro"
              className="px-10 py-4 bg-gold text-bistro-dark font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver Menú
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══ MENÚ ═══ */}
      <section id="menu-bistro" ref={menuRef} className="py-20 md:py-28 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          {/* Header del menú */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isMenuInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-2xl">⚜</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mb-4 tracking-tight">
              Nuestro Menú
            </h2>
          </motion.div>

          {/* Tabs de categorías */}
          <motion.div
            className="mb-16 -mx-5 md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMenuInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <nav className="flex md:justify-center gap-2 md:gap-8 overflow-x-auto no-scrollbar px-5 md:px-0 pb-2">
              {menuCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative font-serif italic text-lg md:text-xl whitespace-nowrap transition-all duration-500 py-2 px-4 md:px-6 flex-shrink-0 ${
                    activeCategory === category.id
                      ? 'text-gold'
                      : 'text-cream/40 hover:text-cream/70'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.name}
                  
                  {activeCategory === category.id && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full"
                      layoutId="bistroActiveIndicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Subtitle de categoría si existe */}
          {activeCategoryData && 'subtitle' in activeCategoryData && activeCategoryData.subtitle && (
            <motion.p
              className="text-center text-cream/50 text-sm italic mb-10 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {activeCategoryData.subtitle}
            </motion.p>
          )}

          {/* Items del menú */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {activeItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-serif text-gold/50 text-sm mt-1 min-w-[24px]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <h3 className="font-serif italic text-xl text-gold group-hover:text-gold-light transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex-1 border-b border-dotted border-gold/40 min-w-[20px] mb-1" />
                          {item.price && (
                            <span className="font-serif text-lg text-gold whitespace-nowrap">
                              ${item.price}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-cream/65 text-sm leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    {index < activeItems.length - 1 && (
                      <div className="w-16 h-px bg-gold/20 mt-6" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Ornamento inferior */}
              <div className="flex items-center justify-center gap-4 mt-16">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
                <span className="text-gold text-xl">❖</span>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nota del menú */}
          <motion.p
            className="text-center text-cream/35 text-xs italic mt-12 font-light"
            initial={{ opacity: 0 }}
            animate={isMenuInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Todos nuestros precios incluyen IVA • Menú sujeto a disponibilidad
          </motion.p>
        </div>
      </section>

      {/* ═══ CTA RESERVAR ═══ */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-3xl md:text-4xl text-gold mb-6">
              Visítanos
            </h3>
            <p className="text-cream/60 text-lg mb-4 font-light">
              Av. Don Juan de Palafox y Mendoza 222, Centro Histórico, Puebla
            </p>
            <p className="text-cream/50 text-base mb-10 font-light">
              Lunes a Domingo • 8:00 AM – 8:00 PM
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://wa.me/522206224222"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-gold text-bistro-dark font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Reservar Mesa
              </motion.a>
              <motion.a
                href="/"
                className="px-10 py-4 border border-gold/40 text-gold font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:border-gold hover:bg-gold/10"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Volver al Inicio
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
