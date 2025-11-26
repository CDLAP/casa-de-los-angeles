'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  {
    src: 'https://www.instagram.com/p/DCe-p3xyDCl/media/?size=l',
    alt: 'Casa de los Ángeles',
    category: 'espacio',
  },
  {
    src: 'https://www.instagram.com/p/DCWVrjOSY1x/media/?size=l',
    alt: 'Interior del restaurante',
    category: 'espacio',
  },
  {
    src: 'https://www.instagram.com/p/DCNWa-0SaDh/media/?size=l',
    alt: 'Comida',
    category: 'gastronomía',
  },
  {
    src: 'https://www.instagram.com/p/DCLhRTFSG8n/media/?size=l',
    alt: 'Ambiente',
    category: 'espacio',
  },
  {
    src: 'https://www.instagram.com/p/DCGNAVASrVb/media/?size=l',
    alt: 'Platillo',
    category: 'gastronomía',
  },
  {
    src: 'https://www.instagram.com/p/DB6zzxPSNWj/media/?size=l',
    alt: 'Evento especial',
    category: 'eventos',
  },
  {
    src: 'https://www.instagram.com/p/DB1s2iaSXz3/media/?size=l',
    alt: 'Detalles',
    category: 'espacio',
  },
  {
    src: 'https://www.instagram.com/p/DBsvjQGy-I4/media/?size=l',
    alt: 'Casa de los Ángeles',
    category: 'espacio',
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length)
    }
  }
  
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  return (
    <section id="galeria" ref={sectionRef} className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Galería</h2>
          <p className="section-subtitle">
            Momentos que capturan la esencia de Casa de los Ángeles
          </p>
          <div className="divider" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden cursor-pointer group ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-square'} overflow-hidden rounded-lg`}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${image.src}')` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="https://instagram.com/casa_de_los_angeles"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold-dark hover:text-gold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span className="uppercase tracking-wider text-sm font-medium">Síguenos en Instagram</span>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button 
              className="absolute left-6 text-white/70 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft size={40} />
            </button>
            
            <button 
              className="absolute right-6 text-white/70 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <motion.img
              key={selectedImage}
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
