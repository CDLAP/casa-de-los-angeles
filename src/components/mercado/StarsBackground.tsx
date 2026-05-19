'use client'

import { useMemo } from 'react'
import type { CSSProperties } from 'react'

interface Star {
  cx: number
  cy: number
  size: number
  opacity: number
  duration: number
  delay: number
}

// Stable star field — deterministic seed so SSR matches client (no hydration warnings)
function generateStars(count: number, seed: number): Star[] {
  let s = seed
  const random = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }

  return Array.from({ length: count }, () => ({
    cx: random() * 100,
    cy: random() * 100,
    // Pinpoints: 0.7px – 2.0px. Fine dust, no chunkiness.
    size: 0.7 + random() * 1.3,
    // Varied opacity for depth (some barely visible, a few brighter)
    opacity: 0.2 + Math.pow(random(), 1.8) * 0.6,
    // Slow, calm twinkle
    duration: 4 + random() * 6,
    delay: random() * 8,
  }))
}

export default function StarsBackground() {
  const stars = useMemo(() => generateStars(180, 42), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes twinkle-fine {
          0%, 100% { opacity: var(--star-opacity); }
          50% { opacity: calc(var(--star-opacity) * 0.3); }
        }
      `}</style>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cream"
          style={{
            left: `${star.cx}%`,
            top: `${star.cy}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            ['--star-opacity' as string]: star.opacity,
            animation: `twinkle-fine ${star.duration}s ease-in-out ${star.delay}s infinite`,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}
