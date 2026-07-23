'use client'

import { useEffect, useRef } from 'react'

// Ajustes para convivir con el header fijo del sitio (solo desktop; en móvil el
// sitio usa la hamburguesa flotante y el contenido arranca desde arriba).
const overrides = `
  @media (min-width:768px){
    .eden-page{padding-top:116px}
    .eden-page nav.index{top:116px}
    .eden-page section{scroll-margin-top:180px}
  }
`

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500&display=block'

export default function EdenMenu({ css, html }: { css: string; html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  // Los <script> inyectados con dangerouslySetInnerHTML no se ejecutan solos;
  // los reemplazamos por nodos vivos (scrollspy del índice + botón compartir).
  useEffect(() => {
    const root = ref.current
    if (!root) return
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
      <style dangerouslySetInnerHTML={{ __html: css + overrides }} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
