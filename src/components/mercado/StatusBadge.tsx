'use client'

import { motion } from 'framer-motion'

interface StatusBadgeProps {
  variant: 'sold-out' | 'last-spots' | 'special-edition'
}

const VARIANTS = {
  'sold-out': {
    label: 'Sold Out',
    bg: 'bg-charcoal/90',
    text: 'text-cream',
    border: 'border-cream/30',
  },
  'last-spots': {
    label: 'Últimos espacios',
    bg: 'bg-gold',
    text: 'text-charcoal',
    border: 'border-gold-dark/50',
  },
  'special-edition': {
    label: 'Edición especial',
    bg: 'bg-bistro-dark',
    text: 'text-gold',
    border: 'border-gold/50',
  },
} as const

export default function StatusBadge({ variant }: StatusBadgeProps) {
  const { label, bg, text, border } = VARIANTS[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={`${bg} ${text} ${border} border backdrop-blur-sm px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-sans font-medium`}
    >
      {label}
    </motion.div>
  )
}
