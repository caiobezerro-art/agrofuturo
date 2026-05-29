"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  type: "leaf" | "dot"
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const particleCount = 50

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: Math.random() * 0.5 + 0.2,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.2,
      type: Math.random() > 0.7 ? "leaf" : "dot",
    })

    const init = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle())
      }
    }

    const drawLeaf = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(Math.sin(Date.now() * 0.001 + x) * 0.5)
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.bezierCurveTo(size, -size, size, size, 0, size * 1.5)
      ctx.bezierCurveTo(-size, size, -size, -size, 0, -size)
      const isDark = theme === "dark"
      ctx.fillStyle = isDark
        ? `rgba(34, 197, 94, ${opacity})`
        : `rgba(22, 163, 74, ${opacity})`
      ctx.fill()
      ctx.restore()
    }

    const drawDot = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath()
      ctx.arc(x, y, size / 2, 0, Math.PI * 2)
      const isDark = theme === "dark"
      ctx.fillStyle = isDark
        ? `rgba(74, 222, 128, ${opacity})`
        : `rgba(34, 197, 94, ${opacity})`
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.y > canvas.height + 20) {
          particle.y = -20
          particle.x = Math.random() * canvas.width
        }
        if (particle.x < -20) particle.x = canvas.width + 20
        if (particle.x > canvas.width + 20) particle.x = -20

        if (particle.type === "leaf") {
          drawLeaf(particle.x, particle.y, particle.size, particle.opacity)
        } else {
          drawDot(particle.x, particle.y, particle.size, particle.opacity)
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
