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

// Encapsula el CSS del menú bajo .eden-page prefijando cada selector
// (compatible con navegadores viejos, sin depender de CSS nesting).
// Así los selectores genéricos del menú (footer, *, section…) no tocan el sitio.
function scopeCss(css: string): string {
  const scoped = css
    // html/body/:root pasan a ser el contenedor del menú
    .replace('html{scroll-behavior:smooth}', '')
    .replace(':root{', '.eden-page{')
    .replace(/\bbody\{/, '.eden-page{')
    // overflow en el contenedor rompería position:sticky del índice
    .replace('overflow-x:hidden;', '')
    // prefijar cada selector de regla (líneas que abren bloque, excepto @media);
    // el selector y su "{" viven siempre en la misma línea
    .replace(/^([ \t]*)([^@\s}{][^{\n]*)\{/gm, (_m, indent: string, selector: string) => {
      if (selector.startsWith('.eden-page')) return `${indent}${selector}{`
      const prefixed = selector
        .split(',')
        .map((s) => `.eden-page ${s.trim()}`)
        .join(',')
      return `${indent}${prefixed}{`
    })
  // overflow-x:hidden en html/body (globals.css + clase Tailwind del body)
  // rompe position:sticky; clip recorta igual sin crear contenedor de scroll.
  // Se incluye .overflow-x-hidden para ganarle en especificidad a la utility.
  // Solo aplica en esta página.
  // El offset real del header se mide en el cliente (EdenMenu) y se expone como
  // la variable --eden-h; aquí solo declaramos su uso con un fallback de 116px.
  const headerOffset =
    '@media (min-width:768px){.eden-page{padding-top:var(--eden-h,116px)}.eden-page nav.index{top:var(--eden-h,116px)}.eden-page section{scroll-margin-top:calc(var(--eden-h,116px) + 64px)}}'
  return `html{scroll-behavior:smooth}\nhtml,body,.overflow-x-hidden{overflow-x:clip}\n${headerOffset}\n${scoped}`
}

// El menú vive en public/eden/index.html (fuente única, también accesible por QR).
// Aquí lo servimos dentro de la app; el CSS llega ya encapsulado desde el servidor.
export default function EdenPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'public', 'eden', 'index.html'), 'utf8')
  const rawCss = file.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? ''
  const body = file.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? ''
  return <EdenMenu css={scopeCss(rawCss)} html={body} />
}
