import type { Metadata } from 'next'
import LineamientosContent from '@/components/mercado/LineamientosContent'

export const metadata: Metadata = {
  title: 'Lineamientos Generales para Expositores | Mercado de los Ángeles',
  description:
    'Reglamento oficial para expositores del Mercado de los Ángeles, en el Centro Histórico de Puebla. Horarios, presentación, pagos, ambiente y lineamientos generales del evento.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function LineamientosPage() {
  return <LineamientosContent />
}
