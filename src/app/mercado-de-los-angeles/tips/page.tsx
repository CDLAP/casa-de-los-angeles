import type { Metadata } from 'next'
import TipsContent from '@/components/mercado/TipsContent'

export const metadata: Metadata = {
  title: '10 Tips para Vender Mejor | Mercado de los Ángeles',
  description:
    '10 principios prácticos para vender mejor en mercados y eventos. Guía para expositores del Mercado de los Ángeles en Puebla.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function TipsPage() {
  return <TipsContent />
}
