'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'cdla_cookie_consent'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Sólo mostramos el aviso si el usuario aún no ha decidido
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied')
    } catch {
      /* almacenamiento no disponible — continuamos igual */
    }
    // Actualizamos el consentimiento de Google (Consent Mode)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
      })
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-[9998] p-4 sm:p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mx-auto max-w-3xl bg-cream border border-gold/30 rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-charcoal/70 text-sm leading-relaxed flex-1">
              Usamos cookies propias y de Google Analytics para entender cómo se usa el sitio y
              mejorar tu experiencia. Puedes aceptarlas o rechazarlas. Más detalles en nuestro{' '}
              <Link
                href="/privacidad"
                className="text-gold-dark underline underline-offset-2 hover:text-gold transition-colors"
              >
                Aviso de Privacidad
              </Link>
              .
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => decide(false)}
                className="px-5 py-2.5 text-sm uppercase tracking-[0.12em] border border-gold-dark/40 text-gold-dark rounded-xl hover:bg-gold-dark/5 transition-colors"
              >
                Rechazar
              </button>
              <button onClick={() => decide(true)} className="btn-filled">
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
