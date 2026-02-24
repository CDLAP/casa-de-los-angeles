'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface NativeLightboxProps {
  src: string
  alt: string
  open: boolean
  onClose: () => void
}

export default function NativeLightbox({ src, alt, open, onClose }: NativeLightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  // Transform state
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [backdropOpacity, setBackdropOpacity] = useState(1)
  const [isDismissing, setIsDismissing] = useState(false)

  // Touch tracking refs (no re-renders needed)
  const touchState = useRef({
    startY: 0,
    startX: 0,
    lastDist: 0,
    lastScale: 1,
    lastX: 0,
    lastY: 0,
    isPinching: false,
    isPanning: false,
    isDragging: false,
    startTranslateX: 0,
    startTranslateY: 0,
  })

  // Reset on open
  useEffect(() => {
    if (open) {
      setScale(1)
      setTranslate({ x: 0, y: 0 })
      setBackdropOpacity(1)
      setIsDismissing(false)
    }
  }, [open])

  const dismiss = useCallback(() => {
    setIsDismissing(true)
    setBackdropOpacity(0)
    setTranslate(t => ({ ...t, y: window.innerHeight }))
    setTimeout(onClose, 250)
  }, [onClose])

  // Distance between two touches
  const getTouchDist = (t1: Touch, t2: Touch) => {
    const dx = t1.clientX - t2.clientX
    const dy = t1.clientY - t2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const getTouchCenter = (t1: Touch, t2: Touch) => ({
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  })

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const ts = touchState.current

    if (e.touches.length === 2) {
      // Pinch start
      ts.isPinching = true
      ts.isDragging = false
      ts.lastDist = getTouchDist(e.touches[0], e.touches[1])
      ts.lastScale = scale
      ts.startTranslateX = translate.x
      ts.startTranslateY = translate.y
    } else if (e.touches.length === 1) {
      ts.startY = e.touches[0].clientY
      ts.startX = e.touches[0].clientX
      ts.startTranslateX = translate.x
      ts.startTranslateY = translate.y
      ts.isPinching = false

      if (scale > 1.05) {
        // Pan mode when zoomed
        ts.isPanning = true
        ts.isDragging = false
      } else {
        // Drag to dismiss mode
        ts.isDragging = true
        ts.isPanning = false
      }
    }
  }, [scale, translate])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const ts = touchState.current

    if (ts.isPinching && e.touches.length === 2) {
      e.preventDefault()
      const newDist = getTouchDist(e.touches[0], e.touches[1])
      const ratio = newDist / ts.lastDist
      const newScale = Math.min(Math.max(ts.lastScale * ratio, 0.5), 4)
      setScale(newScale)
    } else if (ts.isPanning && e.touches.length === 1) {
      e.preventDefault()
      const dx = e.touches[0].clientX - ts.startX
      const dy = e.touches[0].clientY - ts.startY
      setTranslate({
        x: ts.startTranslateX + dx,
        y: ts.startTranslateY + dy,
      })
    } else if (ts.isDragging && e.touches.length === 1) {
      const dy = e.touches[0].clientY - ts.startY
      const dx = e.touches[0].clientX - ts.startX

      // Only vertical drag
      if (Math.abs(dy) > Math.abs(dx) || Math.abs(translate.y) > 10) {
        setTranslate({ x: 0, y: dy })
        // Fade backdrop as you drag
        const progress = Math.min(Math.abs(dy) / 300, 1)
        setBackdropOpacity(1 - progress * 0.6)
        // Scale down slightly as you drag
        setScale(1 - progress * 0.1)
      }
    }
  }, [translate.y])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const ts = touchState.current

    if (ts.isPinching) {
      ts.isPinching = false
      // Snap back if too small
      if (scale < 1) {
        setScale(1)
        setTranslate({ x: 0, y: 0 })
      }
      return
    }

    if (ts.isPanning) {
      ts.isPanning = false
      // Snap back if not zoomed anymore
      if (scale <= 1.05) {
        setTranslate({ x: 0, y: 0 })
      }
      return
    }

    if (ts.isDragging) {
      ts.isDragging = false
      // Dismiss if dragged enough
      if (Math.abs(translate.y) > 120) {
        dismiss()
      } else {
        // Snap back
        setScale(1)
        setTranslate({ x: 0, y: 0 })
        setBackdropOpacity(1)
      }
    }
  }, [scale, translate.y, dismiss])

  // Double tap to zoom
  const lastTap = useRef(0)
  const handleTap = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) return // only on end
    const now = Date.now()
    if (now - lastTap.current < 300) {
      // Double tap
      if (scale > 1.05) {
        setScale(1)
        setTranslate({ x: 0, y: 0 })
      } else {
        setScale(2.5)
      }
    }
    lastTap.current = now
  }, [scale])

  // Desktop: click to close, scroll to zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale(s => Math.min(Math.max(s * delta, 0.5), 4))
  }, [])

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Close only if not zoomed and clicking backdrop area
    if (scale <= 1.05) {
      onClose()
    } else {
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    }
  }, [scale, onClose])

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100] touch-none select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black transition-opacity duration-100"
            style={{ opacity: backdropOpacity * 0.92 }}
          />

          {/* Image container */}
          <div
            ref={imgRef}
            className="absolute inset-0 flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => { handleTouchEnd(e); handleTap(e) }}
            onWheel={handleWheel}
            onClick={handleClick}
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              transition: isDismissing
                ? 'transform 0.25s ease-out'
                : (touchState.current.isDragging || touchState.current.isPinching || touchState.current.isPanning)
                  ? 'none'
                  : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={1600}
              className="max-h-[90vh] w-auto h-auto object-contain pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Hint pill — only at scale 1 */}
          {scale <= 1.05 && !isDismissing && (
            <motion.div
              className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-cream/50 text-xs tracking-wide">Desliza hacia abajo para cerrar</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
