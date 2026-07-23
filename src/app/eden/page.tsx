import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import EdenMenu from './EdenMenu'

export const metadata: Metadata = {
  title: 'EDÉN · Barra de Café — Casa de los Ángeles',
  description:
    'EDÉN · Café de especialidad, brunch y barra poblana en Casa de los Ángeles, Centro Histórico de Puebla.',
  openGraph: {
    title: 'EDÉN · Barra de Café — Casa de los Ángeles',
    description: 'Café de especialidad, brunch y barra poblana en el Centro Histórico de Puebla.',
    url: 'https://www.casadelosangelespuebla.com/eden',
    images: [
      {
        url: 'https://www.casadelosangelespuebla.com/eden/eden-logo.jpg',
        width: 840,
        height: 840,
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
}

// El menú vive en public/eden/index.html (fuente única, también accesible por QR).
// Aquí lo servimos dentro de la app para que traiga el Header y Footer reales del sitio.
export default function EdenPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'public', 'eden', 'index.html'), 'utf8')
  const css = file.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? ''
  const body = file.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? ''
  return <EdenMenu css={css} html={body} />
}
