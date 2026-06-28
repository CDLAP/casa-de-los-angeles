'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '@/components/sections/Hero'
import JulioBanner from '@/components/sections/JulioBanner'
import About from '@/components/sections/About'
// import CafeSection from '@/components/sections/CafeSection' // oculto a petición del cliente
// import Boutique from '@/components/sections/Boutique' // oculto a petición del cliente
import RuedaPrensa from '@/components/sections/RuedaPrensa'
import MercadoSection from '@/components/sections/MercadoSection'
import Contact from '@/components/sections/Contact'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// CLIENTE: banner promocional Mercado de los Ángeles — Edición Julio.
// Apagar (false) cuando termine la convocatoria.
const SHOW_JULIO_BANNER = true

export default function Home() {
  return (
    <>
      {SHOW_JULIO_BANNER && <JulioBanner />}
      <Hero navOffset={!SHOW_JULIO_BANNER} showFacade={!SHOW_JULIO_BANNER} />
      {/* <CafeSection /> oculto a petición del cliente */}
      <About />
      {/* <Boutique /> oculto a petición del cliente */}
      <MercadoSection />
      <RuedaPrensa />
      <Contact />
    </>
  )
}
