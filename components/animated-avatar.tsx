"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// Dynamically import anime.js to ensure it only runs on the client
const AnimePromise = import("animejs").then((mod) => mod.default || mod)

export default function AnimatedAvatar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animeLoaded, setAnimeLoaded] = useState(false)

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === "undefined") return

    // Load anime.js dynamically
    let anime: any
    const elements: HTMLDivElement[] = []
    let cleanup: (() => void) | undefined

    const initializeAnimation = async () => {
      try {
        anime = await AnimePromise
        setAnimeLoaded(true)

        if (!containerRef.current || !anime) return

        // Create floating elements around the avatar
        const container = containerRef.current
        const shapes = 6
        const colors = ["#fc52ff", "#00e1f4", "#ffb800"]

        for (let i = 0; i < shapes; i++) {
          const element = document.createElement("div")
          const size = Math.random() * 10 + 5
          const color = colors[Math.floor(Math.random() * colors.length)]

          element.className = "absolute rounded-full"
          element.style.width = `${size}px`
          element.style.height = `${size}px`
          element.style.backgroundColor = color
          element.style.boxShadow = `0 0 10px ${color}`
          element.style.zIndex = "1"

          // Position elements in a circle around the avatar
          const angle = (i / shapes) * Math.PI * 2
          const radius = 140
          const x = Math.cos(angle) * radius + 150
          const y = Math.sin(angle) * radius + 150

          element.style.left = `${x}px`
          element.style.top = `${y}px`

          container.appendChild(element)
          elements.push(element)

          // Animate each element
          anime({
            targets: element,
            translateX: anime.random(-20, 20),
            translateY: anime.random(-20, 20),
            scale: [0.8, 1.2],
            opacity: [0.6, 1],
            easing: "easeInOutQuad",
            duration: anime.random(2000, 4000),
            loop: true,
            direction: "alternate",
            delay: anime.random(0, 1000),
          })
        }

        // Create glowing effect for the avatar
        anime({
          targets: ".avatar-glow",
          boxShadow: [
            "0 0 10px rgba(252, 82, 255, 0.5)",
            "0 0 20px rgba(252, 82, 255, 0.7)",
            "0 0 30px rgba(0, 225, 244, 0.5)",
            "0 0 20px rgba(252, 82, 255, 0.7)",
            "0 0 10px rgba(252, 82, 255, 0.5)",
          ],
          easing: "easeInOutSine",
          duration: 6000,
          loop: true,
        })

        // Set up cleanup function
        cleanup = () => {
          elements.forEach((element) => {
            if (container.contains(element)) {
              container.removeChild(element)
            }
          })
        }
      } catch (error) {
        console.error("Error initializing anime.js:", error)
      }
    }

    initializeAnimation()

    // Cleanup function
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[500px] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          delay: 0.3,
          duration: 1.5,
        }}
      >
        <div className="avatar-glow rounded-full p-1 bg-gradient-to-r from-primary to-secondary">
          <div className="bg-card rounded-full p-2 backdrop-blur-sm">
            <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden border-2 border-white/10">
              <Image src="/images/ibrahim-avatar.png" alt="Ibrahim Mustafa" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl"></div>
      </div>

      {/* Text element */}
      <motion.div
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-sm font-medium text-gradient">AI Automation Expert</span>
      </motion.div>
    </motion.div>
  )
}
