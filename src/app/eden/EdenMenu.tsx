'use client'

import { useEffect, useRef } from 'react'

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500&display=block'

// Recibe el CSS ya encapsulado bajo .eden-page desde el servidor (page.tsx).
export default function EdenMenu({ css, html }: { css: string; html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  // Los <script> inyectados con dangerouslySetInnerHTML no se ejecutan solos;
  // los reemplazamos por nodos vivos (scrollspy del índice + botón compartir).
  useEffect(() => {
    const root = ref.current
    if (!root || root.dataset.revived) return
    root.dataset.revived = '1'
    root.querySelectorAll('script').forEach((old) => {
      const s = document.createElement('script')
      s.textContent = old.textContent
      old.replaceWith(s)
    })
  }, [])

  return (
    <div className="eden-page">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href={FONTS_HREF} />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
