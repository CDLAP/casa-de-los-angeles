'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const menuCategories = [
  {
    id: 'especialidades',
    name: 'Especialidades',
    initial: 'E',
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
    initial: 'S',
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
    initial: 'C',
    items: [
      {
        name: 'Croissant Doré',
        description: 'Croissant parisino clásico, hecho con mantequilla pura; crujiente por fuera y suave por dentro. (180 g)',
        price: '68',
      },
      {
        name: 'Croissant au Marmelade',
        description: 'Relleno de mermelada artesanal mexicana de 100% fresa; dulzor natural y textura suave. (180 g)',
        price: '95',
      },
      {
        name: 'Croissant au Chocolat',
        description: 'Crema francesa de avellana; de sabor tostado y textura cremosa. (180 g)',
        price: '98',
      },
      {
        name: 'Croissant Salade',
        description: 'Jamón a las hierbas finas y gruyère suizo derretido; con un toque de Dijon francesa. (180 g)',
        price: '135',
      },
      {
        name: 'Paquete du Maison',
        description: 'Elige una Soda al gusto para acompañar con tu croissant.',
        price: '+72',
      },
    ],
  },
  {
    id: 'baguettes',
    name: 'Baguettes Maison',
    initial: 'B',
    items: [
      {
        name: 'Baguette Végétal',
        description: 'Pesto prensado con jitomate fresco y queso madurado; saludable, orgánico y ligero. (180 g)',
        price: '145',
      },
      {
        name: 'Baguette Gruyère',
        description: 'Queso gruyère derretido con jamón a las hierbas finas; con un toque de mostaza dijon dulce. (180 g)',
        price: '155',
      },
      {
        name: 'Baguette Brie',
        description: 'Brie francés cremoso ligeramente fundido con miel y láminas de pera; suave, delicado y elegante. (180 g)',
        price: '158',
      },
      {
        name: 'Baguette Chèvre',
        description: 'Queso de cabra caliente con hierbas finas y tomate de colores; aromático, intenso y equilibrado. (180 g)',
        price: '165',
      },
      {
        name: 'Baguette Parmesano',
        description: 'Jamón serrano con pesto gourmet y parmesano; profundo, aromático y sabroso. (180 g)',
        price: '168',
      },
    ],
  },
]

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('especialidades')

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

        {/* Tabs horizontales con scroll en móvil */}
        <motion.div
          className="mb-16 -mx-5 md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                
                {/* Indicador sutil debajo del activo */}
                {activeCategory === category.id && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
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
                        <h3 className="font-serif italic text-xl text-gold group-hover:text-gold-light transition-colors">
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
