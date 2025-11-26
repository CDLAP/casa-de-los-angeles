'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Logo - Tamaño visible y bien presente */}
            <div className="mb-3 flex justify-center lg:justify-start">
              <div className="relative w-32 h-16">
                <Image
                  src="/images/logo-short-1000x1000.png"
                  alt="Casa de los Ángeles"
                  fill
                  className="object-contain object-center lg:object-left opacity-80"
                />
              </div>
            </div>
            {/* Título - Más cerca del logo */}
            <h4 className="font-serif text-lg text-gold mb-4 text-center lg:text-left">Casa de los Ángeles</h4>
            {/* Descripción */}
            <p className="text-cream/70 text-sm leading-relaxed text-center lg:text-left">
              Un espacio único en el corazón histórico de Puebla donde el café artesanal, 
              la cultura y el arte se encuentran en una experiencia sublime.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-6">Navegación</h4>
            <ul className="space-y-3">
              {['Inicio', 'Nosotros', 'Menú', 'Galería', 'Eventos', 'Contacto'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`}
                    className="text-cream/70 hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-cream/70 text-sm">
                  Av. Don Juan de Palafox y Mendoza 222<br />
                  Centro Histórico, 72000<br />
                  Puebla, México
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <a href="tel:+522206224222" className="text-cream/70 hover:text-gold transition-colors text-sm">
                  +52 220 622 4222
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <a href="mailto:contacto@casadelosangelespuebla.com" className="text-cream/70 hover:text-gold transition-colors text-sm">
                  contacto@casadelosangelespuebla.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-6">Horarios</h4>
            <ul className="space-y-2 text-sm text-cream/70 mb-8">
              <li className="flex justify-between">
                <span>Lunes a Domingo</span>
                <span>8:00 AM a 8:00 PM</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href="https://instagram.com/casa_de_los_angeles_puebla"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/70 hover:border-gold hover:text-gold transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-xs">
            © {currentYear} Casa de los Ángeles. Todos los derechos reservados.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-xs items-center">
            <div className="flex gap-6">
              <Link href="/privacidad" className="text-cream/50 hover:text-gold transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-cream/50 hover:text-gold transition-colors">
                Términos
              </Link>
            </div>
            <a 
              href="https://mataai.studio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-gold transition-colors"
            >
              Created by MATA AI Generative Studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
