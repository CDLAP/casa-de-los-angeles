'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const menuCategories = [
  {
    id: 'desayunos',
    name: 'Desayunos',
    initial: 'D',
    items: [
      {
        name: 'Croissant au Camembert',
        description: 'Camembert francés suavemente derretido, miel tibia y nueces tostadas sobre un croissant crujiente y mantequilloso.',
        price: '',
      },
      {
        name: 'Croissant à la Dijonnaise',
        description: 'Jamón a las finas hierbas y gruyère fundido, realzados con una delicada Dijon francesa.',
        price: '',
      },
      {
        name: 'Croissant du Matin',
        description: 'Huevos revueltos al estilo francés, sedosos y suaves, servidos dentro de croissant recién calentado.',
        price: '',
      },
      {
        name: 'Croissant Fraïse',
        description: 'Croissant tibio con mermelada francesa de fresa, dulce y aromática.',
        price: '',
      },
      {
        name: 'Croissant au Chocolat',
        description: 'Relleno de chocolate francés fundido con una textura cremosa e indulgente.',
        price: '',
      },
      {
        name: 'Croissant de Paris',
        description: 'Clásico, simple y perfectamente crujiente; puro sabor mantequilla.',
        price: '',
      },
      {
        name: 'Baguette Provençal',
        description: 'Queso Brie cremoso con miel tibia sobre baguette dorada; una combinación elegante y reconfortante.',
        price: '',
      },
      {
        name: 'Baguette Toscana',
        description: 'Jamón serrano premium con pesto casero y parmesano recién rallado, intensa y gourmet.',
        price: '',
      },
      {
        name: 'Baguette Parisien',
        description: 'Jamón a las finas hierbas acompañado de gruyère derretido; un clásico de la tradición parisina.',
        price: '',
      },
      {
        name: 'Baguette Niçoise',
        description: 'Preparación fresca de atún con ensalada y aderezo mediterráneo; ligera, equilibrada y aromática.',
        price: '',
      },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    initial: 'B',
    items: [
      {
        name: 'Americano Gourmet',
        description: 'Café de tueste medio con aroma limpio y perfil equilibrado.',
        price: '',
      },
      {
        name: 'Latte',
        description: 'Café espresso con leche vaporizada, sedoso y cremoso.',
        price: '',
      },
      {
        name: 'Capuccino',
        description: 'Espresso intenso con espuma abundante y textura aireada.',
        price: '',
      },
      {
        name: 'Mocha',
        description: 'Espresso mezclado con chocolate y leche; dulce, reconfortante y aromático.',
        price: '',
      },
      {
        name: 'Caramel Latte',
        description: 'Latte suave con caramelo artesanal, dulce y elegante.',
        price: '',
      },
      {
        name: 'Salted Caramel Latte',
        description: 'Caramelo salado con espresso y leche; mezcla perfecta entre dulce y salado.',
        price: '',
      },
      {
        name: 'Chocolate Caliente Français',
        description: 'Receta tradicional francesa con yema; textura espesa y sabor profundo.',
        price: '',
      },
      {
        name: 'Chocolat Maison Chantilly',
        description: 'Chocolate francés espeso coronado con crema batida fresca.',
        price: '',
      },
      {
        name: 'Matcha',
        description: 'Té verde japonés batido al momento; sabor suave, vegetal y armonioso.',
        price: '',
      },
      {
        name: 'Thé Glacé Durazno',
        description: 'Té frío de durazno, refrescante y ligero.',
        price: '',
      },
      {
        name: 'Thé Glacé Fruits Rouges',
        description: 'Té frío infusionado con frutos rojos intensos; fresco y vibrante.',
        price: '',
      },
      {
        name: 'Soda Lavande',
        description: 'Lavanda natural con miel y limón; floral, ligera y refrescante.',
        price: '',
      },
      {
        name: 'Soda Romarin',
        description: 'Romero fresco infusionado con cítricos; herbal y energizante.',
        price: '',
      },
      {
        name: 'Soda Framboise',
        description: 'Frambuesa con hierbabuena y limón; dulce, fresca y vibrante.',
        price: '',
      },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    initial: 'P',
    items: [
      {
        name: 'Variedad Rotativa',
        description: 'Los dulces son seleccionados y cambian regularmente para ofrecer una gran variedad de postres franceses, dulces poblanos y especialidades internacionales. ¡Déjate sorprender!',
        price: '',
      },
    ],
  },
]

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('desayunos')

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
          className="flex justify-center gap-2 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-8 py-3 font-serif text-lg transition-all duration-300 ${
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
          Les prix sont disponibles sur demande • Menú sujeto a disponibilidad
        </motion.p>
      </div>
    </section>
  )
}
