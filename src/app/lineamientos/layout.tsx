import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lineamientos para Expositores | Mercado de Casa de los Ángeles',
  description: 'Conoce los lineamientos, horarios, costos y requisitos para participar como expositor en el Mercado de Casa de los Ángeles en Puebla.',
}

export default function LineamientosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
