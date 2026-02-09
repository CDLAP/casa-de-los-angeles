'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const team = [
  {
    name: 'Elisabeth',
    image: '/images/team/elisabeth.png',
  },
  {
    name: 'Daniel',
    image: '/images/team/daniel.png',
  },
  {
    name: 'Osvaldo',
    image: '/images/team/osvaldo.png',
  },
]

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="section bg-cream">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif italic text-display-md text-gold-dark mb-4">
            Les Anges de la Maison
          </h2>
          <p className="text-charcoal-50 text-lg max-w-2xl mx-auto">
            Quienes hacen de esta casa, tu casa
          </p>
          <div className="divider" />
        </motion.div>

        {/* Team Grid - Formato 4:5 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className={`flex flex-col items-center ${
                index === 4 ? 'col-span-2 md:col-span-1 w-[calc(50%-12px)] md:w-full mx-auto' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              {/* Photo Container - Aspect 4:5 */}
              <motion.div
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Subtle gold border */}
                <div className="absolute inset-0 rounded-2xl border border-gold/20 z-10" />
                
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                  quality={90}
                />
              </motion.div>

              {/* Name */}
              <h3 className="font-serif italic text-xl md:text-2xl text-gold-dark">
                {member.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
