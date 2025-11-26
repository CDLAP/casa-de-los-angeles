'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, MapPin, Users, Sparkles, Wine, Music, DollarSign } from 'lucide-react'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EventModal({ isOpen, onClose }: EventModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop oscuro */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-cream max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl pointer-events-auto relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header con imagen de fondo */}
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/fin-de-año-2025.png')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                
                {/* Botón cerrar */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  aria-label="Cerrar"
                >
                  <X size={24} />
                </button>

                {/* Título y fecha */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-gold text-sm uppercase tracking-[0.3em] mb-2">Evento Exclusivo</p>
                    <h2 className="font-serif text-4xl md:text-5xl mb-2">Gala de Año Nuevo</h2>
                    <p className="text-xl text-gold-light">31 de Diciembre, 2025</p>
                  </motion.div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8 md:p-12">
                
                {/* Descripción principal */}
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-charcoal-50 text-lg leading-relaxed mb-6">
                    Un evento único y nunca antes visto en el centro de Puebla. Una noche de lujo, 
                    elegancia y gala que marcará el inicio del nuevo año con estilo inigualable.
                  </p>
                  
                  {/* Ornamento */}
                  <div className="flex items-center gap-3 my-8">
                    <div className="flex-1 h-px bg-gold/20" />
                    <Sparkles className="text-gold" size={20} />
                    <div className="flex-1 h-px bg-gold/20" />
                  </div>
                </motion.div>

                {/* Programa del evento en grid */}
                <motion.div
                  className="grid md:grid-cols-2 gap-6 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Horario */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-gold-dark" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-gold-dark mb-1">Horario</h3>
                      <p className="text-charcoal-50 text-sm">7:00 PM - 12:00 AM</p>
                      <p className="text-charcoal-50/70 text-xs mt-1">Brindis a medianoche</p>
                    </div>
                  </div>

                  {/* Música */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Music className="text-gold-dark" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-gold-dark mb-1">Música en Vivo</h3>
                      <p className="text-charcoal-50 text-sm">Vals Vienés</p>
                      <p className="text-charcoal-50/70 text-xs mt-1">Orquesta profesional</p>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-gold-dark" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-gold-dark mb-1">Ubicación</h3>
                      <p className="text-charcoal-50 text-sm">Casa de los Ángeles</p>
                      <p className="text-charcoal-50/70 text-xs mt-1">Centro Histórico, Puebla</p>
                    </div>
                  </div>

                  {/* Capacidad */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="text-gold-dark" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-gold-dark mb-1">Capacidad Limitada</h3>
                      <p className="text-charcoal-50 text-sm">70 personas máximo</p>
                      <p className="text-charcoal-50/70 text-xs mt-1">Evento exclusivo e íntimo</p>
                    </div>
                  </div>
                </motion.div>

                {/* Programa detallado */}
                <motion.div
                  className="bg-gold/5 p-8 rounded-lg mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-serif text-2xl text-gold-dark mb-6 text-center">Programa de la Noche</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-charcoal font-medium">Champagne de Bienvenida</p>
                        <p className="text-charcoal-50 text-sm">Recepción con brindis al llegar</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-charcoal font-medium">Curso de Vals</p>
                        <p className="text-charcoal-50 text-sm">Clase introductoria para todos los invitados</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-charcoal font-medium">Cena Tradicional de Año Nuevo</p>
                        <p className="text-charcoal-50 text-sm">Menú exquisito especialmente diseñado para la ocasión</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-charcoal font-medium">Barra de Cocteles</p>
                        <p className="text-charcoal-50 text-sm">Selección premium de bebidas (consumo individual)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-charcoal font-medium">Fuegos Artificiales desde la Terraza</p>
                        <p className="text-charcoal-50 text-sm">Vista exclusiva de la celebración del centro de Puebla</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Código de vestimenta */}
                <motion.div
                  className="border-l-4 border-gold pl-6 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-serif text-xl text-gold-dark mb-3">Código de Vestimenta</h3>
                  <p className="text-charcoal-50 mb-2">
                    <span className="font-medium text-charcoal">Etiqueta de Gala:</span> Traje formal para caballeros y vestido largo para damas.
                  </p>
                  <p className="text-charcoal-50 text-sm">
                    <span className="italic">Sugerencia especial:</span> Se invita a las damas a vestir de blanco 
                    (incluso vestido de novia). Elegancia y distinción.
                  </p>
                </motion.div>

                {/* Información de estacionamiento */}
                <motion.div
                  className="bg-emerald-forest/5 p-6 rounded-lg mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="font-serif text-lg text-emerald-dark mb-3">Información Importante</h3>
                  <ul className="space-y-2 text-charcoal-50 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-dark mt-0.5">•</span>
                      <span>Se recomienda llegar con anticipación debido al estacionamiento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-dark mt-0.5">•</span>
                      <span>Las calles del centro pueden bloquearse durante Año Nuevo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-dark mt-0.5">•</span>
                      <span>Contamos con sugerencias de estacionamientos cercanos</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Precios y reservación */}
                <motion.div
                  className="bg-gradient-to-br from-gold/10 to-gold/5 p-8 rounded-lg mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-center mb-6">
                    <DollarSign className="w-12 h-12 text-gold-dark mx-auto mb-4" />
                    <h3 className="font-serif text-3xl text-gold-dark mb-2">$2,500 MXN</h3>
                    <p className="text-charcoal-50">Por persona (sin alcohol)</p>
                  </div>

                  <div className="border-t border-gold/20 pt-6">
                    <h4 className="font-serif text-lg text-charcoal mb-3">Apartado de Lugar</h4>
                    <p className="text-charcoal-50 text-sm mb-4">
                      Separa tu lugar con un depósito de <span className="font-medium text-gold-dark">$500 MXN</span> a nombre completo.
                    </p>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-charcoal-50 text-sm mb-2">
                        <span className="font-medium text-charcoal">Para más información y reservaciones:</span>
                      </p>
                      <a 
                        href="https://wa.me/522206224222?text=Hola,%20quiero%20información%20sobre%20la%20Gala%20de%20Año%20Nuevo" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-emerald-dark hover:text-emerald font-medium transition-colors"
                      >
                        <Wine size={18} />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <a
                    href="https://wa.me/522206224222?text=Hola,%20quiero%20información%20sobre%20la%20Gala%20de%20Año%20Nuevo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-12 py-4 bg-gold text-charcoal font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30"
                  >
                    Reservar Ahora
                  </a>
                  <p className="text-charcoal-50/70 text-xs mt-4">Cupo limitado - No te quedes sin tu lugar</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
