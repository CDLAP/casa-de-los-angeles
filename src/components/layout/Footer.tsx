'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'Café', href: '/#menu' },
    { label: 'Museo', href: '/#nosotros' },
    { label: 'Boutique', href: '/#boutique' },
    { label: 'Atelier', href: '/#atelier' },
    { label: 'Prensa', href: '/#rueda-de-prensa' },
    { label: 'Mercado', href: '/#mercado' },
    { label: 'Contacto', href: '/#contacto' },
  ]

  return (
    <footer className="bg-[#3F1F26] text-cream">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        
        {/* Mobile: Centrado y elegante */}
        {/* Desktop: Grid de 4 columnas */}
        <div className="flex flex-col items-center text-center lg:text-left lg:items-start lg:grid lg:grid-cols-4 lg:gap-12">

          {/* Brand */}
          <div className="mb-12 lg:mb-0">
            <div className="mb-4 flex justify-center lg:justify-start">
              <div className="relative w-44 h-24">
                <Image
                  src="/images/logo-short-1000x1000.png"
                  alt="Casa de los Ángeles"
                  fill
                  className="object-contain opacity-80"
                />
              </div>
            </div>
            <h4 className="font-serif text-xl text-gold mb-3">Casa de los Ángeles</h4>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              Café, arte y boutique en el corazón histórico de Puebla.
            </p>
          </div>

          {/* Navigation - Horizontal en mobile, vertical en desktop */}
          <div className="mb-12 lg:mb-0">
            <h4 className="font-serif text-lg text-gold mb-6">Navegación</h4>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:flex-col lg:gap-y-3 lg:gap-x-0">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-cream/70 hover:text-gold transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mb-12 lg:mb-0">
            <h4 className="font-serif text-lg text-gold mb-6">Contacto</h4>
            <div className="space-y-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Casa+de+los+Angeles+Palafox+222+Puebla"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 justify-center lg:justify-start text-cream/70 hover:text-gold transition-colors group"
              >
                <MapPin size={16} className="text-gold/60 mt-0.5 flex-shrink-0 group-hover:text-gold" />
                <span className="text-sm leading-relaxed">
                  Palafox y Mendoza 222<br />
                  Centro Histórico, Puebla
                </span>
              </a>
              <a
                href="tel:+522206224222"
                className="flex items-center gap-3 justify-center lg:justify-start text-cream/70 hover:text-gold transition-colors group"
              >
                <Phone size={16} className="text-gold/60 flex-shrink-0 group-hover:text-gold" />
                <span className="text-sm">220 622 4222</span>
              </a>
              <a
                href="mailto:contacto@casadelosangelespuebla.com"
                className="flex items-center gap-3 justify-center lg:justify-start text-cream/70 hover:text-gold transition-colors group"
              >
                <Mail size={16} className="text-gold/60 flex-shrink-0 group-hover:text-gold" />
                <span className="text-sm">contacto@casadelosangelespuebla.com</span>
              </a>
            </div>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-6">Horario</h4>
            <p className="text-cream/70 text-sm mb-2">Lunes a Domingo</p>
            <p className="text-gold font-serif text-lg mb-8">9:00 AM — 10:00 PM</p>

            <div className="flex justify-center lg:justify-start">
              <motion.a
                href="https://instagram.com/casa_de_los_angeles_puebla"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-custom">
        <div className="h-px bg-cream/10" />
      </div>

      {/* Bottom Bar */}
      <div className="container-custom py-6 flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-cream/40 text-xs">
          © {currentYear} Casa de los Ángeles
        </p>
        <div className="flex items-center gap-4 text-xs">
          <Link href="/privacidad" className="text-cream/40 hover:text-gold transition-colors">
            Privacidad
          </Link>
          <span className="text-cream/20">·</span>
          <Link href="/terminos" className="text-cream/40 hover:text-gold transition-colors">
            Términos
          </Link>
          <span className="text-cream/20">·</span>
          <a
            href="https://mataai.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/40 hover:text-gold transition-colors"
          >
            MATA AI Studio
          </a>
        </div>
      </div>
    </footer>
  )
}
