'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Loader from '@/components/animations/Loader'
import StickyAngel from '@/components/layout/StickyAngel'

const standalonePages = ['/lineamientos']

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStandalone = standalonePages.includes(pathname)
  const isHome = pathname === '/'

  if (isStandalone) {
    return <main>{children}</main>
  }

  return (
    <>
      {isHome && <Loader />}
      <Header />
      <StickyAngel />
      <main>{children}</main>
      <Footer />
    </>
  )
}
