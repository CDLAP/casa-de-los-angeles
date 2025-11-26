'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import MenuSection from '@/components/sections/MenuSection'
// import Gallery from '@/components/sections/Gallery'
import Events from '@/components/sections/Events'
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
      <Experience />
      <MenuSection />
      {/* <Gallery /> */}
      <Events />
      <Contact />
    </>
  )
}
