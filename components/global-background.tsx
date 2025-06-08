"use client"

import { useEffect, useRef } from "react"

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const isAnimatingRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make it taller to cover the entire page
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Create grid points
    const gridSize = 30
    const points = []
    const rows = Math.ceil(canvas.height / gridSize)
    const cols = Math.ceil(canvas.width / gridSize)

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        points.push({
          x: x * gridSize,
          y: y * gridSize,
          originX: x * gridSize,
          originY: y * gridSize,
          color: Math.random() > 0.8 ? getRandomColor() : "rgba(255, 255, 255, 0.2)",
          size: Math.random() > 0.8 ? Math.random() * 3 + 1 : 1,
        })
      }
    }

    // Create gradient backgrounds
    const gradients = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.2,
        radius: canvas.width * 0.4,
        colors: ["rgba(252, 82, 255, 0.15)", "rgba(252, 82, 255, 0)"],
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.5,
        radius: canvas.width * 0.3,
        colors: ["rgba(0, 225, 244, 0.1)", "rgba(0, 225, 244, 0)"],
      },
      {
        x: canvas.width * 0.3,
        y: canvas.height * 0.8,
        radius: canvas.width * 0.35,
        colors: ["rgba(255, 184, 0, 0.08)", "rgba(255, 184, 0, 0)"],
      },
    ]

    // Helper function to get random color
    function getRandomColor() {
      const colors = [
        "rgba(252, 82, 255, 0.8)", // Primary
        "rgba(0, 225, 244, 0.8)", // Secondary
        "rgba(255, 184, 0, 0.8)", // Accent
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation variables
    let animationTime = 0
    const animationDuration = 8000 // 8 seconds for a full cycle

    // Error handling wrapper for the draw function
    const safeDraw = (timestamp: number) => {
      try {
        if (!isAnimatingRef.current) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update animation time
        animationTime = timestamp % animationDuration
        const progress = animationTime / animationDuration

        // Draw gradient backgrounds
        gradients.forEach((gradient) => {
          const offsetX = Math.sin(progress * Math.PI * 2) * 100
          const offsetY = Math.cos(progress * Math.PI * 2) * 50

          const grd = ctx.createRadialGradient(
            gradient.x + offsetX,
            gradient.y + offsetY,
            0,
            gradient.x + offsetX,
            gradient.y + offsetY,
            Math.max(gradient.radius, 1), // Ensure radius is positive
          )
          grd.addColorStop(0, gradient.colors[0])
          grd.addColorStop(1, gradient.colors[1])

          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(
            gradient.x + offsetX,
            gradient.y + offsetY,
            Math.max(gradient.radius, 1), // Ensure radius is positive
            0,
            Math.PI * 2,
          )
          ctx.fill()
        })

        // Draw grid
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
        ctx.lineWidth = 1

        // Horizontal grid lines
        for (let y = 0; y < rows; y++) {
          ctx.beginPath()
          ctx.moveTo(0, y * gridSize)
          ctx.lineTo(canvas.width, y * gridSize)
          ctx.stroke()
        }

        // Vertical grid lines
        for (let x = 0; x < cols; x++) {
          ctx.beginPath()
          ctx.moveTo(x * gridSize, 0)
          ctx.lineTo(x * gridSize, canvas.height)
          ctx.stroke()
        }

        // Draw points
        points.forEach((point, i) => {
          // Add some movement to points
          point.x = point.originX + Math.sin(progress * Math.PI * 2 + i * 0.1) * 5
          point.y = point.originY + Math.cos(progress * Math.PI * 2 + i * 0.1) * 5

          ctx.fillStyle = point.color
          ctx.beginPath()
          ctx.arc(point.x, point.y, Math.max(point.size, 0.1), 0, Math.PI * 2)
          ctx.fill()
        })

        // Add some floating particles
        for (let i = 0; i < 20; i++) {
          const x = Math.sin(progress * Math.PI * 2 + i) * canvas.width * 0.4 + canvas.width * 0.5
          const y = Math.cos(progress * Math.PI * 2 + i * 0.7) * canvas.height * 0.2 + (canvas.height * 0.3 * i) / 20

          // Calculate radius and ensure it's positive
          const radius = Math.max(1 + Math.sin(progress * Math.PI * 2 + i * 0.5) * 2, 0.5)

          ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(progress * Math.PI * 2 + i) * 0.05})`
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }

        animationRef.current = requestAnimationFrame(safeDraw)
      } catch (error) {
        console.error("Error in animation:", error);
        // If there's an error, stop the animation to prevent console spam
        isAnimatingRef.current = false;
      }
    }

    animationRef.current = requestAnimationFrame(safeDraw)

    // Cleanup
    return () => {
      isAnimatingRef.current = false;
      window.removeEventListener("resize", setCanvasSize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ pointerEvents: "none" }} />
}
