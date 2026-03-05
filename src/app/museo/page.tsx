'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
    id: 'entrada',
    name: 'Entrada Principal',
    description: 'Bienvenido a Casa de los Ángeles. Cruza el umbral de una casona del siglo XVII en el corazón del Centro Histórico de Puebla.',
    image: '/images/museo/entrada-360.jpg',
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: 'patio',
    name: 'Patio Central',
    description: 'El patio central, alma de la casa, donde la arquitectura colonial se encuentra con la luz natural que baña la cantera.',
    image: '/images/museo/patio-360.jpg',
    initialYaw: 0,
    initialPitch: -5,
  },
  {
    id: 'salon-cafe',
    name: 'Salón del Café',
    description: 'Un espacio íntimo donde el aroma del café recién preparado se mezcla con la historia de cada muro.',
    image: '/images/museo/cafe-360.jpg',
    initialYaw: 90,
    initialPitch: 0,
  },
  {
    id: 'museo-sala',
    name: 'Sala del Museo',
    description: 'Galería permanente que exhibe la historia de la casona y obras de artistas locales.',
    image: '/images/museo/museo-sala-360.jpg',
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: 'boutique',
    name: 'Boutique',
    description: 'Espacio curado con piezas de diseñadores y artesanos independientes.',
    image: '/images/museo/boutique-360.jpg',
    initialYaw: -45,
    initialPitch: 0,
  },
  {
    id: 'atelier',
    name: 'Atelier',
    description: 'El taller creativo donde se gestan las ideas y se celebran los talleres artísticos.',
    image: '/images/museo/atelier-360.jpg',
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: 'salon-eventos',
    name: 'Salón de Eventos',
    description: 'Espacio versátil para conferencias de prensa, presentaciones y eventos exclusivos.',
    image: '/images/museo/eventos-360.jpg',
    initialYaw: 45,
    initialPitch: 0,
  },
  {
    id: 'terraza',
    name: 'Terraza',
    description: 'Vista privilegiada del Centro Histórico con los volcanes como telón de fondo.',
    image: '/images/museo/terraza-360.jpg',
    initialYaw: 0,
    initialPitch: 10,
  },
]

// ============================================
// PLACEHOLDER — se muestra mientras no hay fotos 360°
// ============================================
const SHOW_PLACEHOLDER = true // Cambia a false cuando ya tengas las fotos 360°

export default function MuseoPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pannellumLoaded, setPannellumLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const viewerRef = useRef<HTMLDivElement>(null)
  const pannellumViewer = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentSpace = TOUR_SPACES[currentIndex]

  // Cargar Pannellum desde CDN
  useEffect(() => {
    if (SHOW_PLACEHOLDER) return

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
  const initViewer = useCallback(() => {
    if (SHOW_PLACEHOLDER || !pannellumLoaded || !viewerRef.current) return
    if (!(window as any).pannellum) return

    // Destruir visor anterior
    if (pannellumViewer.current) {
      try { pannellumViewer.current.destroy() } catch {}
      pannellumViewer.current = null
    }

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
        hotSpots: currentSpace.hotspots?.map(h => ({
          pitch: h.pitch,
          yaw: h.yaw,
          type: 'scene',
          text: h.label,
          cssClass: 'custom-hotspot',
          clickHandlerFunc: () => {
            const idx = TOUR_SPACES.findIndex(s => s.id === h.targetId)
            if (idx !== -1) setCurrentIndex(idx)
          },
        })) || [],
      })

      setImageError(false)

      pannellumViewer.current.on('error', () => {
        setImageError(true)
      })
    } catch {
      setImageError(true)
    }
  }, [pannellumLoaded, currentSpace])

  useEffect(() => {
    initViewer()
    return () => {
      if (pannellumViewer.current) {
        try { pannellumViewer.current.destroy() } catch {}
        pannellumViewer.current = null
      }
    }
  }, [initViewer])

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
      <section className="relative pt-40 md:pt-56 pb-16 md:pb-24 bg-[#1A3A2E] overflow-hidden">
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
            <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-sans">
              Recorre cada rincón de Casa de los Ángeles en una experiencia inmersiva de 360°.
              Descubre la historia que vive en cada sala de esta casona del siglo XVII.
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
              
              {SHOW_PLACEHOLDER || imageError ? (
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
                        : 'Próximamente podrás explorar cada rincón de Casa de los Ángeles en una experiencia inmersiva de 360°.'
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
              ) : (
                /* Pannellum viewer container */
                <div ref={viewerRef} className="absolute inset-0" />
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
              {!SHOW_PLACEHOLDER && !imageError && (
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
            <p className="text-charcoal/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans mb-8">
              La experiencia virtual es solo el comienzo. Te invitamos a descubrir la magia de Casa de los Ángeles 
              recorriendo sus salas, disfrutando de nuestro café y conectando con la historia viva del Centro Histórico de Puebla.
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
