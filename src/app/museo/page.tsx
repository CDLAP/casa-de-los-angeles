'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, RotateCcw, Eye } from 'lucide-react'
import Image from 'next/image'

// ============================================
// CONFIGURACIÓN DE ESPACIOS — TOUR VIRTUAL
// ============================================
// Reemplaza las rutas de imagen con tus fotos 360° equirectangulares
// Las fotos deben estar en /public/images/museo/
// Formato: JPEG equirectangular (ratio 2:1), idealmente 4096x2048 o mayor

interface TourSpace {
  id: string
  name: string
  description: string
  image: string // ruta a la foto 360° en /public/images/museo/
  hotspots?: { pitch: number; yaw: number; targetId: string; label: string }[]
  initialYaw?: number
  initialPitch?: number
}

const TOUR_SPACES: TourSpace[] = [
  {
    id: 'la-casa-despierta',
    name: 'La Casa Despierta',
    description: 'Hace más de dos siglos, una familia construyó esta casa en el corazón de la ciudad que los ángeles trazaron. En sus ventanas y cristales dejaron guardianes de luz para proteger a quienes la habitaran.',
    image: '/images/museo/entrada-360.jpg',
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: 'patio-de-los-angeles',
    name: 'Patio de los Ángeles',
    description: 'El alma de la casa. La luz del sol entra como lo hacía hace dos siglos y al atravesar los cristales revela a los guardianes: ángeles que aparecen y desaparecen con el paso de las horas.',
    image: '/images/museo/patio-360.jpg',
    initialYaw: 0,
    initialPitch: -5,
  },
  {
    id: 'angeles-ocultos',
    name: 'Los Ángeles Ocultos',
    description: 'Los artesanos los escondieron en ventanas, vitrales y cristales decorados. La luz los hace visibles: cuando un rayo de sol atraviesa el vidrio, los guardianes despiertan. Algunos llevan siglos esperando ser descubiertos.',
    image: '/images/museo/angeles-ocultos-360.jpg',
    initialYaw: 90,
    initialPitch: 0,
  },
  {
    id: 'sala-de-musica',
    name: 'La Sala de Música',
    description: 'Un espacio que evoca las veladas del siglo XIX. Los ángeles en las ventanas observaron reuniones, música y conversaciones. Hoy la sala conserva esa energía: quien entra, siente que la casa lo recibe.',
    image: '/images/museo/sala360.jpg',
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: 'gabinete-de-los-angeles',
    name: 'El Gabinete de los Ángeles',
    description: 'Una sala dedicada a la idea del ángel como símbolo universal: protección, esperanza, belleza e inspiración. Representaciones artísticas de distintas épocas que dialogan con los guardianes originales de la casa.',
    image: '/images/museo/gabinete-360.jpg',
    initialYaw: -45,
    initialPitch: 0,
  },
  {
    id: 'camara-de-luz',
    name: 'La Cámara de Luz',
    description: 'Aquí los ángeles no se buscan: se sienten. La luz que atraviesa los cristales crea una atmósfera envolvente donde protección e inspiración dejan de ser ideas y se convierten en una experiencia.',
    image: '/images/museo/camara-luz-360.jpg',
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: 'el-cafe',
    name: 'El Café',
    description: 'Donde la historia se vive en presente. Un lugar para detenerse bajo la mirada silenciosa de los guardianes y dejar que la casa te ofrezca lo que siempre ha ofrecido: refugio, calma e inspiración.',
    image: '/images/museo/cafe-360.jpg',
    initialYaw: 45,
    initialPitch: 0,
  },
  {
    id: 'la-terraza',
    name: 'La Terraza',
    description: 'Los ángeles trazaron Puebla y desde aquí puedes contemplar su obra. El Centro Histórico se extiende con los volcanes de fondo, y la luz de esta terraza te recuerda por qué los guardianes eligieron quedarse.',
    image: '/images/museo/terraza-360.jpg',
    initialYaw: 0,
    initialPitch: 10,
  },
]

// ============================================
// PLACEHOLDER — se muestra mientras no hay fotos 360°
// ============================================
// Salas que ya tienen imagen 360° disponible
const AVAILABLE_IMAGES = new Set(['sala360.jpg'])
const hasImage = (space: TourSpace) => {
  const filename = space.image.split('/').pop() || ''
  return AVAILABLE_IMAGES.has(filename)
}

// Arrancar en la primera sala con imagen disponible
const INITIAL_INDEX = TOUR_SPACES.findIndex(s => hasImage(s))

export default function MuseoPage() {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX >= 0 ? INITIAL_INDEX : 0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pannellumLoaded, setPannellumLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const viewerRef = useRef<HTMLDivElement>(null)
  const pannellumViewer = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentSpace = TOUR_SPACES[currentIndex]
  const currentHasImage = hasImage(currentSpace)

  // Cargar Pannellum desde CDN
  useEffect(() => {
    // CSS
    if (!document.querySelector('link[href*="pannellum"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
      document.head.appendChild(link)
    }

    // JS
    if (!(window as any).pannellum) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
      script.onload = () => setPannellumLoaded(true)
      document.head.appendChild(script)
    } else {
      setPannellumLoaded(true)
    }
  }, [])

  // Inicializar/actualizar el visor 360°
  useEffect(() => {
    if (!currentHasImage || !pannellumLoaded) return
    if (!(window as any).pannellum) return

    // Esperar a que el ref esté listo
    const timer = setTimeout(() => {
      if (!viewerRef.current) return

      // Destruir visor anterior
      if (pannellumViewer.current) {
        try { pannellumViewer.current.destroy() } catch {}
        pannellumViewer.current = null
      }

      // Limpiar el contenedor
      if (viewerRef.current) viewerRef.current.innerHTML = ''

      try {
        pannellumViewer.current = (window as any).pannellum.viewer(viewerRef.current, {
          type: 'equirectangular',
          panorama: currentSpace.image,
          autoLoad: true,
          autoRotate: -1.5,
          autoRotateInactivityDelay: 3000,
          compass: false,
          showControls: false,
          showFullscreenCtrl: false,
          showZoomCtrl: false,
          mouseZoom: true,
          draggable: true,
          yaw: currentSpace.initialYaw || 0,
          pitch: currentSpace.initialPitch || 0,
          hfov: 100,
          minHfov: 50,
          maxHfov: 120,
          friction: 0.15,
        })

        setImageError(false)

        pannellumViewer.current.on('error', () => {
          setImageError(true)
        })
      } catch {
        setImageError(true)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (pannellumViewer.current) {
        try { pannellumViewer.current.destroy() } catch {}
        pannellumViewer.current = null
      }
    }
  }, [pannellumLoaded, currentIndex, currentHasImage])

  const goToSpace = (index: number) => {
    if (index < 0 || index >= TOUR_SPACES.length) return
    setCurrentIndex(index)
    setImageError(false)
  }

  const goNext = () => goToSpace((currentIndex + 1) % TOUR_SPACES.length)
  const goPrev = () => goToSpace((currentIndex - 1 + TOUR_SPACES.length) % TOUR_SPACES.length)

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape' && isFullscreen) toggleFullscreen()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentIndex, isFullscreen])

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative pt-48 md:pt-64 pb-16 md:pb-24 bg-[#1A3A2E] overflow-hidden">
        {/* Textura sutil */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23C9A961\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold/70 text-sm uppercase tracking-[0.3em] mb-4 font-sans">Visita Virtual</p>
            <h1 className="font-serif text-5xl md:text-7xl text-cream mb-6">Museo</h1>
            <p className="text-cream/60 font-serif italic text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-4">
              &ldquo;En Puebla los ángeles construyeron la ciudad. En esta casa decidieron quedarse.&rdquo;
            </p>
            <p className="text-cream/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Un museo donde la historia, la luz y los ángeles habitan.
              Descubre a los guardianes que protegen esta casa desde sus ventanas y cristales.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-16 h-px bg-gold/40" />
              <div className="w-2 h-2 rotate-45 bg-gold/50" />
              <div className="w-16 h-px bg-gold/40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tour Virtual */}
      <section className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Visor 360° */}
          <motion.div
            ref={containerRef}
            className={`relative rounded-2xl overflow-hidden shadow-2xl bg-charcoal ${
              isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : ''
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Visor principal */}
            <div className={`relative ${isFullscreen ? 'h-screen' : 'aspect-[16/9] md:aspect-[21/9]'}`}>
              
              {/* Pannellum viewer container — siempre en el DOM */}
              <div ref={viewerRef} className={`absolute inset-0 ${currentHasImage && !imageError ? '' : 'invisible'}`} />

              {(!currentHasImage || imageError) && (
                /* Placeholder elegante */
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A2E] via-[#2A4A3E] to-[#1A3A2E] flex flex-col items-center justify-center text-center px-8">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-gold/30 flex items-center justify-center mb-6 mx-auto">
                      <Eye className="w-8 h-8 md:w-12 md:h-12 text-gold/60" />
                    </div>
                    <h3 className="text-cream font-serif text-2xl md:text-4xl mb-3">Tour Virtual 360°</h3>
                    <p className="text-cream/50 text-sm md:text-base max-w-md font-sans">
                      {imageError
                        ? 'La imagen 360° de este espacio aún no está disponible.'
                        : 'Próximamente podrás recorrer esta casa y descubrir a los guardianes de luz que habitan en sus ventanas y cristales desde hace más de dos siglos.'
                      }
                    </p>
                    <p className="text-gold/40 text-xs uppercase tracking-[0.2em] mt-6 font-sans">
                      {currentSpace.name}
                    </p>
                  </motion.div>

                  {/* Decorative 360 ring */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-[0.04]" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="#C9A961" strokeWidth="0.5" strokeDasharray="4 4" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#C9A961" strokeWidth="0.3" strokeDasharray="2 6" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Controles de navegación */}
              <div className="absolute bottom-0 left-0 right-0 z-20">
                {/* Gradiente inferior */}
                <div className="h-32 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Barra de info y controles */}
                <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-4 md:pb-6 flex items-end justify-between">
                  {/* Info del espacio */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSpace.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 mr-4"
                    >
                      <p className="text-gold text-xs uppercase tracking-[0.2em] mb-1 font-sans">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(TOUR_SPACES.length).padStart(2, '0')}
                      </p>
                      <h3 className="text-cream font-serif text-xl md:text-3xl mb-1">{currentSpace.name}</h3>
                      <p className="text-cream/60 text-xs md:text-sm max-w-lg font-sans hidden md:block">
                        {currentSpace.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Botones */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      onClick={goPrev}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 flex items-center justify-center text-cream hover:bg-cream/20 transition-all"
                      aria-label="Espacio anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goNext}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 flex items-center justify-center text-cream hover:bg-cream/20 transition-all"
                      aria-label="Siguiente espacio"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 flex items-center justify-center text-cream hover:bg-cream/20 transition-all hidden md:flex"
                      aria-label="Pantalla completa"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Instrucción de interacción */}
              {currentHasImage && !imageError && (
                <motion.div
                  className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 4 }}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cream/80" />
                  <span className="text-cream/80 text-xs font-sans">Arrastra para explorar · Scroll para zoom</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Navegación de espacios (thumbnails) */}
          <motion.div
            className="mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {TOUR_SPACES.map((space, index) => (
                <button
                  key={space.id}
                  onClick={() => goToSpace(index)}
                  className={`flex-shrink-0 group relative rounded-xl overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-2 ring-gold shadow-lg scale-[1.02]'
                      : 'ring-1 ring-charcoal/10 hover:ring-gold/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="w-28 h-20 md:w-40 md:h-28 bg-gradient-to-br from-[#1A3A2E] to-[#2A4A3E] flex flex-col items-center justify-center text-center px-2">
                    <span className={`text-[10px] md:text-xs uppercase tracking-[0.15em] font-sans transition-colors ${
                      index === currentIndex ? 'text-gold' : 'text-cream/50 group-hover:text-cream/80'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-xs md:text-sm font-serif mt-1 transition-colors leading-tight ${
                      index === currentIndex ? 'text-cream' : 'text-cream/60 group-hover:text-cream/90'
                    }`}>
                      {space.name}
                    </span>
                  </div>

                  {/* Barra activa */}
                  {index === currentIndex && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                      layoutId="activeSpace"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Descripción mobile */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpace.id}
              className="mt-4 md:hidden px-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-charcoal/70 text-sm font-sans leading-relaxed">
                {currentSpace.description}
              </p>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Sección informativa */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-6">Visítanos en Persona</h2>
            <p className="text-charcoal/50 font-serif italic text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-6">
              La casa cambió de dueños, de usos y de épocas, pero los guardianes en sus ventanas nunca se fueron.
            </p>
            <p className="text-charcoal/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans mb-8">
              La experiencia virtual es solo el comienzo. Te invitamos a recorrer la casa y sentir lo que sus guardianes 
              han ofrecido durante siglos: protección, inspiración y la luz que solo este lugar puede darte. 
              Hay cosas que no se transmiten a través de una pantalla.
            </p>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-16 h-px bg-gold/40" />
              <div className="w-2 h-2 rotate-45 bg-gold/50" />
              <div className="w-16 h-px bg-gold/40" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-charcoal/50 font-sans uppercase tracking-[0.15em]">
              <span>Don Juan de Palafox y Mendoza 222</span>
              <span className="hidden md:inline text-gold/40">◆</span>
              <span>Centro Histórico, Puebla</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Estilos para ocultar scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Pannellum custom styles */
        .pnlm-container { background: #1A3A2E !important; }
        .pnlm-about-msg, .pnlm-orientation-button, .pnlm-hot-spot-debug-indicator { display: none !important; }
        .pnlm-load-button { background: rgba(201, 169, 97, 0.3) !important; border: 1px solid rgba(201, 169, 97, 0.5) !important; }
        .pnlm-load-button p { color: #FAF8F3 !important; font-family: inherit !important; }
        .pnlm-lbar { background: #C9A961 !important; }
        .pnlm-lbar-fill { background: #FAF8F3 !important; }
        
        /* Custom hotspot */
        .custom-hotspot {
          width: 32px; height: 32px;
          background: rgba(201, 169, 97, 0.6);
          border: 2px solid rgba(250, 248, 243, 0.8);
          border-radius: 50%;
          cursor: pointer;
          animation: hotspot-pulse 2s infinite;
        }
        @keyframes hotspot-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(201, 169, 97, 0.4); }
          50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(201, 169, 97, 0); }
        }
      `}</style>
    </main>
  )
}
