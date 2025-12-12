'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const menuCategories = [
  {
    id: 'bebidas',
    name: 'Bebidas',
    initial: 'B',
    items: [
      {
        name: 'Café Américain Gourmet',
        description: 'Nuestro Café de altura: suave y aromático, con notas frutales y un toque ligero de chocolate. (355 ml)',
        price: '68',
      },
      {
        name: 'Café à la Vanille Française',
        description: 'Espresso con leche infusionada con vainilla francesa auténtica. Terminado con Chantilly. (355 ml)',
        price: '95',
      },
      {
        name: 'Café au Lait',
        description: 'El clásico francés: espresso aromático con leche caliente. Suave y reconfortante. (355 ml)',
        price: '70',
      },
      {
        name: 'Café au Chocolat',
        description: 'Espresso intenso con chocolate real y leche caliente; fuerte y dulce, con sabor a cacao. (355 ml)',
        price: '89',
      },
      {
        name: 'Chocolat Chantilly',
        description: 'Chocolate parisino espeso, 100% cacao, cubierto con crema Chantilly que se derrite. (355 ml)',
        price: '129',
      },
      {
        name: 'Thé Gourmet',
        description: 'Selección rotativa de tés europeos. Aromas limpios, delicados y de temporada. (355 ml)',
        price: '78',
      },
    ],
  },
  {
    id: 'sodas',
    name: 'Sodas',
    initial: 'S',
    items: [
      {
        name: 'Agua Mineral de la Casa',
        description: 'Burbuja fina, sabor limpio y refrescante; perfecta para acompañar cualquier platillo. (420 ml)',
        price: '65',
      },
      {
        name: 'Soda Framboise',
        description: 'Frambuesa madura con limón; fresca, vibrante y frutal, con aroma intenso. (420 ml)',
        price: '$89',
      },
      {
        name: 'Soda Lavande',
        description: 'Lavanda suave con limón fresco; aromática, ligera y con perfil floral elegante. (420 ml)',
        price: '92',
      },
      {
        name: 'Soda Mandarine',
        description: 'Mandarina brillante con matices de naranja; cítrica, jugosa y refrescante. (420 ml)',
        price: '95',
      },
      {
        name: 'Soda Fleur de Sureau',
        description: 'Flor de saúco europea con limón; delicada, floral y con carácter refinado. (420 ml)',
        price: '98',
      },
    ],
  },
  {
    id: 'croissants',
    name: 'Croissants',
    initial: 'C',
    items: [
      {
        name: 'De Paris',
        description: 'Croissant parisino clásico, hecho con mantequilla pura. Crujiente por fuera y suave por dentro. (180 g)',
        price: '58',
      },
      {
        name: 'Fraïse',
        description: 'Relleno de mermelada artesanal mexicana de 100% fresa. Dulzor natural y textura suave. (180 g)',
        price: '$92',
      },
      {
        name: 'Crème de Noisette',
        description: 'Crema francesa de avellana, de sabor tostado y textura cremosa. (180 g)',
        price: '90',
      },
      {
        name: 'À la Dijonnaise',
        description: 'Jamón a las hierbas finas y gruyère suizo derretido, con un toque de Dijon francesa. (180 g)',
        price: '126',
      },
      {
        name: 'Du Matin',
        description: 'Relleno de huevo cremoso al estilo francés. Disponible solo por la mañana. (180 g)',
        price: '112',
      },
    ],
  },
  {
    id: 'baguettes',
    name: 'Baguettes',
    initial: 'B',
    items: [
      {
        name: 'Parisien',
        description: 'Jamón a las hierbas finas con gruyère suizo. Sabor clásico francés y reconfortante. (180 g)',
        price: '139',
      },
      {
        name: 'Provençal',
        description: 'Brie francés cremoso con miel de abeja y nuez pecana tostada. Dulce y crujiente. (180 g)',
        price: '149',
      },
      {
        name: 'Toscana',
        description: 'Jamón serrano con pesto italiano gourmet y parmesano fresco. Intenso y sabroso. (180 g)',
        price: '158',
      },
      {
        name: 'Niçoise',
        description: 'Atún mediterráneo con paté de aceituna y ensalada casera. Fresco y aromático. (180 g)',
        price: '148',
      },
    ],
  },
]

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('bebidas')

  const activeCategoryData = menuCategories.find(cat => cat.id === activeCategory)
  const activeItems = activeCategoryData?.items || []

  return (
    <section id="menu" ref={sectionRef} className="section bg-emerald-forest text-cream relative overflow-hidden">
      {/* Background decoration - Pattern original dorado */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header Editorial */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Ornamento superior */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-gold" />
            <span className="text-gold text-2xl">⚜</span>
            <div className="w-12 h-px bg-gradient-gold" />
          </div>
          
          <h2 className="font-serif text-6xl md:text-7xl text-gold mb-4 tracking-tight">Nuestro Menú</h2>
        </motion.div>

        {/* Tabs elegantes */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 md:px-8 py-3 font-serif text-base md:text-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'text-gold'
                  : 'text-cream/70 hover:text-gold'
              }`}
            >
              {category.name}
              {activeCategory === category.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-gold"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Menu Items - Layout Editorial Francés */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Items en 2 columnas - DIRECTO sin inicial decorativa */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {activeItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {/* Número del item */}
                  <div className="flex items-start gap-4">
                    <span className="font-serif text-gold/50 text-sm mt-1 min-w-[24px]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    <div className="flex-1">
                      {/* Nombre y precio con línea punteada */}
                      <div className="flex items-baseline gap-2 mb-2">
                        <h3 className="font-serif text-xl text-gold group-hover:text-gold-light transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex-1 border-b border-dotted border-gold/40 min-w-[20px] mb-1" />
                        {item.price && (
                          <span className="font-serif text-lg text-gold whitespace-nowrap">
                            {item.price}
                          </span>
                        )}
                      </div>
                      
                      {/* Descripción */}
                      <p className="text-cream/70 text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Separador sutil entre items */}
                  {index < activeItems.length - 1 && (
                    <div className="w-16 h-px bg-gold/30 mt-6" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Ornamento inferior */}
            <div className="flex items-center justify-center gap-4 mt-16">
              <div className="w-12 h-px bg-gradient-gold" />
              <span className="text-gold text-xl">❖</span>
              <div className="w-12 h-px bg-gradient-gold" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Note footer */}
        <motion.p
          className="text-center text-cream/40 text-xs italic mt-12 font-light"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Todos nuestros precios incluyen IVA • Menú sujeto a disponibilidad
        </motion.p>
      </div>
    </section>
  )
}
