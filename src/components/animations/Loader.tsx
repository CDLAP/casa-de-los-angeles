'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Hide loader after animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
        >
          {/* Logo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Círculo decorativo */}
            <motion.div
              className="absolute inset-0 rounded-full border border-gold/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Logo Real - Logo Short */}
            <div className="w-48 h-48 flex items-center justify-center relative">
              <motion.div
                className="relative w-40 h-40"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src="/images/logo-short-1000x1000.png"
                  alt="Casa de los Ángeles"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Nombre - OPCIONAL: Puedes quitarlo si el logo ya tiene el texto */}
          <motion.h1
            className="mt-8 font-serif text-2xl text-gold-dark tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Casa de los Ángeles
          </motion.h1>

          {/* Subtítulo - Actualizado a CAFETERÍA */}
          <motion.p
            className="mt-2 text-sm text-charcoal-50 uppercase tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Cafetería & Centro de Cultura
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="mt-12 w-48 h-px bg-gold/20 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-gold"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="mt-4 text-xs text-charcoal-50 uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.7 }}
          >
            Bienvenidos
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
