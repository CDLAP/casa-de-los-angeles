'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const cafeImages = [
  '/images/cafe/2.jpeg',
  '/images/cafe/3.jpeg',
  '/images/cafe/4.jpeg',
]

export default function CafeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [current, setCurrent] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cafeImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="menu" ref={sectionRef} className="section bg-cream">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Café & Bistró de los Ángeles</h2>
          <p className="section-subtitle">
            De la montaña de Zacatlán a tu taza
          </p>
          <div className="divider" />
        </motion.div>

        {/* Content: Text + Carousel */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 text-charcoal-50 leading-relaxed text-lg">
              <p>
                En <span className="text-gold-dark font-medium">Casa de los Ángeles</span>, cada taza cuenta una historia de montaña y tradición. Servimos café de especialidad proveniente de Zacatlán, preparado con precisión y acompañado de una exquisita selección de dulces poblanos y bebidas artesanales a base de café que transforman lo cotidiano en una experiencia memorable.
              </p>
              <p>
                Nuestro espacio, íntimo y artístico en el corazón del Centro Histórico, está diseñado para disfrutar sin prisa: conversaciones, celebraciones, reuniones especiales o simplemente un momento de belleza y calma.
              </p>
              <p className="text-gold-dark font-medium italic text-xl">
                Reserva tu mesa y vive un rincón donde el café, el arte y la tradición se encuentran.
              </p>
            </div>

            <motion.a
              href="#reservar"
              className="inline-block mt-8 btn-elegant"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reservar Mesa
            </motion.a>
          </motion.div>

          {/* Photo Carousel - Crossfade */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              {cafeImages.map((src, index) => (
                <div
                  key={src}
                  className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: current === index ? 1 : 0 }}
                >
                  <Image
                    src={src}
                    alt={`Café Casa de los Ángeles ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {cafeImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    current === index ? 'bg-gold w-6' : 'bg-gold/30'
                  }`}
                  aria-label={`Ver foto ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
