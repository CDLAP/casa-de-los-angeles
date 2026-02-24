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
      duration: 0.5,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
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
