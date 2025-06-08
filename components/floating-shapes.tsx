"use client"

import { useEffect, useRef } from "react"
import anime from "animejs"

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create shapes
    const shapeCount = 15
    const shapes = []
    const container = containerRef.current
    const colors = ["#fc52ff", "#00e1f4", "#ffb800"]
    const shapeTypes = ["circle", "triangle", "square", "plus"]

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement("div")
      const size = Math.random() * 40 + 10
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]

      shape.className = "absolute"
      shape.style.width = `${size}px`
      shape.style.height = `${size}px`
      shape.style.opacity = `${Math.random() * 0.5 + 0.1}`
      shape.style.zIndex = "-1"

      if (type === "circle") {
        shape.style.borderRadius = "50%"
        shape.style.border = `2px solid ${color}`
      } else if (type === "triangle") {
        shape.style.width = "0"
        shape.style.height = "0"
        shape.style.borderLeft = `${size / 2}px solid transparent`
        shape.style.borderRight = `${size / 2}px solid transparent`
        shape.style.borderBottom = `${size}px solid ${color}`
      } else if (type === "square") {
        shape.style.border = `2px solid ${color}`
      } else if (type === "plus") {
        shape.innerHTML = `
          <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        `
      }

      // Position randomly within container
      shape.style.left = `${Math.random() * 100}%`
      shape.style.top = `${Math.random() * 100}%`

      container.appendChild(shape)
      shapes.push(shape)
    }

    // Animate shapes
    shapes.forEach((shape) => {
      const translateX = anime.random(-20, 20)
      const translateY = anime.random(-20, 20)
      const rotate = anime.random(-180, 180)
      const duration = anime.random(3000, 5000)
      const delay = anime.random(0, 1000)

      anime({
        targets: shape,
        translateX: [0, translateX],
        translateY: [0, translateY],
        rotate: rotate,
        opacity: [shape.style.opacity, Math.random() * 0.7 + 0.1],
        easing: "easeInOutQuad",
        duration: duration,
        delay: delay,
        direction: "alternate",
        loop: true,
      })
    })

    // Cleanup
    return () => {
      shapes.forEach((shape) => {
        if (container.contains(shape)) {
          container.removeChild(shape)
        }
      })
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
}
