"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  speed: number
  opacity: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Create particles
    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 150)
      const colors = [
        "rgba(252, 82, 255, 0.8)", // Primary (neon purple)
        "rgba(0, 225, 244, 0.8)", // Secondary (cyan)
        "rgba(255, 184, 0, 0.8)", // Accent (gold)
        "rgba(252, 82, 255, 0.4)", // Primary (lower opacity)
        "rgba(0, 225, 244, 0.4)", // Secondary (lower opacity)
        "rgba(255, 184, 0, 0.4)", // Accent (lower opacity)
      ]

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }

      return particles
    }

    particlesRef.current = createParticles()

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      const gridSpacing = 50
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw glow around mouse
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        200,
      )
      gradient.addColorStop(0, "rgba(252, 82, 255, 0.2)")
      gradient.addColorStop(0.5, "rgba(0, 225, 244, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 200, 0, Math.PI * 2)
      ctx.fill()

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        // Move particles
        particle.y += particle.speed

        // Reset particles when they go off screen
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.x = Math.random() * canvas.width
        }

        // Attract particles to mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const angle = Math.atan2(dy, dx)
          const force = (200 - distance) / 2000
          particle.x += Math.cos(angle) * force * distance
          particle.y += Math.sin(angle) * force * distance
        }
      })

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    drawParticles()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ pointerEvents: "none" }} />
}
