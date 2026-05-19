'use client'

import { useEffect, useState } from 'react'

interface ProximaEdicionProps {
  firstDateIso: string // e.g. "2026-05-22"
}

/**
 * Subtle "next edition" badge displayed in the hero.
 * Calculates days until the first date of the season.
 * Renders client-side only to avoid SSR/client time mismatch.
 */
export default function ProximaEdicion({ firstDateIso }: ProximaEdicionProps) {
  const [mounted, setMounted] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    const target = new Date(`${firstDateIso}T00:00:00`)
    const now = new Date()
    // Truncate to midnight for day-accurate diff
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate())
    const diffMs = targetMidnight.getTime() - today.getTime()
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays > 0) {
      setLabel(`Próxima edición · faltan ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`)
    } else if (diffDays === 0) {
      setLabel('Próxima edición · es hoy')
    } else {
      // Past the first date — could be in-season or past-season
      setLabel('Temporada en curso')
    }
  }, [firstDateIso])

  if (!mounted || !label) return null

  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/40 bg-gold/5 backdrop-blur-sm">
      <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" aria-hidden="true" />
      <span className="font-sans uppercase tracking-[0.25em] text-gold text-[10px] md:text-[11px]">
        {label}
      </span>
    </div>
  )
}
