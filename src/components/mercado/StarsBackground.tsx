'use client'

import { useMemo } from 'react'

interface Star {
  cx: number
  cy: number
  r: number
  opacity: number
  duration: number
  delay: number
}

// Stable star field — generated once with deterministic seed so SSR matches client
function generateStars(count: number, seed: number): Star[] {
  // Simple LCG for deterministic randomness
  let s = seed
  const random = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }

  return Array.from({ length: count }, () => ({
    cx: random() * 100,
    cy: random() * 100,
    r: 0.4 + random() * 1.4,
    opacity: 0.25 + random() * 0.7,
    duration: 2.5 + random() * 4,
    delay: random() * 5,
  }))
}

export default function StarsBackground() {
  const stars = useMemo(() => generateStars(80, 42), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="star-glow">
            <stop offset="0%" stopColor="#E4D4A8" stopOpacity="1" />
            <stop offset="60%" stopColor="#C9A961" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
          </radialGradient>
        </defs>

        {stars.map((star, i) => (
          <g key={i}>
            {/* Star core */}
            <circle
              cx={star.cx}
              cy={star.cy}
              r={star.r * 0.35}
              fill="#FAF8F3"
              opacity={star.opacity}
            >
              <animate
                attributeName="opacity"
                values={`${star.opacity * 0.3};${star.opacity};${star.opacity * 0.3}`}
                dur={`${star.duration}s`}
                begin={`${star.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Gold glow halo */}
            <circle
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="url(#star-glow)"
              opacity={star.opacity * 0.6}
            >
              <animate
                attributeName="opacity"
                values={`${star.opacity * 0.2};${star.opacity * 0.6};${star.opacity * 0.2}`}
                dur={`${star.duration}s`}
                begin={`${star.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}
