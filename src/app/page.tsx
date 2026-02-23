'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import CafeSection from '@/components/sections/CafeSection'
import Boutique from '@/components/sections/Boutique'
import Atelier from '@/components/sections/Atelier'
import RuedaPrensa from '@/components/sections/RuedaPrensa'
import MercadoSection from '@/components/sections/MercadoSection'
import Contact from '@/components/sections/Contact'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CafeSection />
      <Boutique />
      <Atelier />
      <RuedaPrensa />
      <MercadoSection />
      <Contact />
    </>
  )
}
