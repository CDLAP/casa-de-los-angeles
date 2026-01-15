'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Clock, DollarSign, ShoppingBag, Palette, Lightbulb, Sparkles, Phone, CheckCircle, XCircle } from 'lucide-react'

interface LineamientosModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LineamientosModal({ isOpen, onClose }: LineamientosModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-cream z-[101] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="bg-emerald text-white px-6 md:px-10 py-6 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl">Mercado de los Ángeles</h2>
                <p className="text-white/80 text-sm mt-1">Lineamientos para Expositores</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
              <div className="max-w-3xl mx-auto space-y-10">
                
                {/* Intro */}
                <div className="text-center border-b border-gold/20 pb-8">
                  <p className="text-charcoal-50 text-lg leading-relaxed">
                    Gracias por tu interés en formar parte del Mercado de los Ángeles. 
                    Un mercado boutique donde las marcas brillan, las ventas fluyen y 
                    la experiencia para el visitante es siempre agradable.
                  </p>
                </div>

                {/* Ubicación */}
                <Section icon={MapPin} title="Ubicación y Entorno">
                  <p className="mb-4">
                    El Mercado de los Ángeles se realiza en los patios de Casa de los Ángeles, 
                    en una ubicación privilegiada del Centro Histórico de Puebla:
                  </p>
                  <address className="not-italic bg-gold/10 p-4 rounded-lg mb-4">
                    <strong className="text-charcoal">Av. Don Juan de Palafox y Mendoza 222</strong><br />
                    Centro Histórico, Puebla, C.P. 72000<br />
                    <span className="text-gold-dark">A media cuadra del Zócalo</span>
                  </address>
                  <p className="text-sm text-charcoal-50">
                    Es un espacio al aire libre con encanto arquitectónico y gran flujo peatonal. 
                    Durante el evento ofrecemos música ambiental, activaciones en la entrada y 
                    difusión en redes sociales.
                  </p>
                </Section>

                {/* Horarios */}
                <Section icon={Clock} title="Horarios Operativos">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-emerald/5 p-4 rounded-lg">
                      <h4 className="font-serif text-emerald mb-2">Montaje</h4>
                      <p className="text-sm text-charcoal-50">
                        Ingreso desde las <strong>9:00 am</strong><br />
                        Listo a más tardar <strong>11:00 am</strong>
                      </p>
                    </div>
                    <div className="bg-emerald/5 p-4 rounded-lg">
                      <h4 className="font-serif text-emerald mb-2">Venta</h4>
                      <p className="text-sm text-charcoal-50">
                        <strong>11:00 am - 9:00 pm</strong><br />
                        Los tres días del evento
                      </p>
                    </div>
                    <div className="bg-emerald/5 p-4 rounded-lg">
                      <h4 className="font-serif text-emerald mb-2">Desmontaje</h4>
                      <p className="text-sm text-charcoal-50">
                        Último día a partir de las <strong>8:00 pm</strong>
                      </p>
                    </div>
                  </div>
                </Section>

                {/* Espacios y Costos */}
                <Section icon={DollarSign} title="Espacios y Costos">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-gold/30 p-5 rounded-lg text-center">
                      <span className="text-3xl font-serif text-gold-dark">$300</span>
                      <span className="text-charcoal-50 text-sm"> MXN/día</span>
                      <p className="font-medium mt-2">Mesa Chica</p>
                    </div>
                    <div className="border-2 border-gold bg-gold/5 p-5 rounded-lg text-center">
                      <span className="text-3xl font-serif text-gold-dark">$600</span>
                      <span className="text-charcoal-50 text-sm"> MXN/día</span>
                      <p className="font-medium mt-2">Mesa Grande <span className="text-xs text-gold-dark">(Zona Premium)</span></p>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal-50">
                    Cada espacio incluye mesa, mantel y una silla. El cupo es limitado y realizamos 
                    una selección cuidadosa de marcas para mantener coherencia estética y calidad comercial.
                  </p>
                </Section>

                {/* Servicios */}
                <Section icon={Sparkles} title="Servicios para Expositores">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <ServiceItem emoji="🍽️" name="Comida del día" price="$50" />
                    <ServiceItem emoji="☕" name="Café" price="Costo preferencial" />
                    <ServiceItem emoji="🥪" name="Sandwiches" price="Por la mañana" />
                    <ServiceItem emoji="💧" name="Agua natural" price="Gratis" />
                  </div>
                </Section>

                {/* Productos Permitidos */}
                <Section icon={ShoppingBag} title="Productos Permitidos">
                  <p className="mb-4">
                    Buscamos marcas de diseño, moda, regalos, arte, decoración y productos gourmet empacados.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Productos terminados</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Alimentos empacados</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-red-500">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm">Preparación de alimentos</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-500">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm">Comida caliente o improvisada</span>
                      </div>
                    </div>
                  </div>
                </Section>

                {/* Imagen y Estética */}
                <Section icon={Palette} title="Imagen, Estética y Presentación">
                  <p className="mb-4">La estética es parte fundamental de la experiencia del Mercado.</p>
                  <div className="bg-gold/10 p-5 rounded-lg space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-gold-dark mt-0.5" />
                      <span className="text-sm">Colores tenues, neutros y elegantes en manteles y exhibición</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-gold-dark mt-0.5" />
                      <span className="text-sm">Mesas ordenadas, sin saturación visual</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-gold-dark mt-0.5" />
                      <span className="text-sm">Empaques limpios y presentación cuidada</span>
                    </div>
                    <div className="flex items-start gap-3 pt-2 border-t border-gold/20">
                      <span className="text-sm"><strong>Vestimenta sugerida:</strong> Negro, tonos oscuros o estilo elegante</span>
                    </div>
                  </div>
                </Section>

                {/* Iluminación */}
                <Section icon={Lightbulb} title="Iluminación">
                  <p className="text-sm text-charcoal-50">
                    Por tratarse de un patio abierto, la iluminación puede ser limitada por la noche. 
                    Recomendamos traer luces recargables propias para resaltar los productos.
                  </p>
                </Section>

                {/* Políticas */}
                <Section icon={DollarSign} title="Política de Pagos y Reservas">
                  <div className="bg-charcoal/5 p-5 rounded-lg space-y-2 text-sm">
                    <p>✓ La reserva se confirma únicamente con el pago del anticipo</p>
                    <p>✓ Es indispensable enviar comprobante de pago</p>
                    <p>✓ No se realizan cambios de fecha ni devoluciones</p>
                    <p>✓ No se permiten traspasos sin autorización previa</p>
                  </div>
                </Section>

                {/* Contacto */}
                <div className="bg-emerald text-white p-6 md:p-8 rounded-xl text-center">
                  <h3 className="font-serif text-xl mb-3">¿Listo para participar?</h3>
                  <p className="text-white/80 text-sm mb-5">
                    Envíanos tu INE, nombre de marca, giro y productos para reservar tu espacio.
                  </p>
                  <a
                    href="https://wa.me/522206224222?text=Hola,%20me%20interesa%20participar%20como%20expositor%20en%20el%20Mercado%20de%20los%20%C3%81ngeles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-emerald px-6 py-3 rounded-lg font-medium hover:bg-gold hover:text-charcoal transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp: 220-622-4222
                  </a>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Componente auxiliar para secciones
function Section({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-gold-dark" />
        </div>
        <h3 className="font-serif text-xl text-charcoal">{title}</h3>
      </div>
      <div className="text-charcoal-50 pl-0 md:pl-13">
        {children}
      </div>
    </div>
  )
}

// Componente auxiliar para servicios
function ServiceItem({ emoji, name, price }: { emoji: string, name: string, price: string }) {
  return (
    <div className="bg-cream border border-gold/20 p-3 rounded-lg text-center">
      <span className="text-2xl">{emoji}</span>
      <p className="text-xs font-medium mt-1">{name}</p>
      <p className="text-xs text-gold-dark">{price}</p>
    </div>
  )
}
