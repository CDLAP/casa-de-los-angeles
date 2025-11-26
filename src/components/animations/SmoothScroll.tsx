'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with optimized settings for better performance
    lenisRef.current = new Lenis({
      duration: 0.8, // Reducido de 1.2 para respuesta más rápida
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reducido para scroll más suave
      touchMultiplier: 1.5, // Reducido de 2 para mejor control
      infinite: false,
    })

    // Animation frame loop
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Add lenis class to html
    document.documentElement.classList.add('lenis')

    // Cleanup
    return () => {
      lenisRef.current?.destroy()
      document.documentElement.classList.remove('lenis')
    }
  }, [])

  return <>{children}</>
}
