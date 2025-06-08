"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import AnimatedText from "./animated-text"
import AnimatedAvatar from "./animated-avatar"
import { useResponsive } from "@/hooks/use-responsive"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50])

  const { isMobile } = useResponsive()
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create animated particles with Framer Motion instead of anime.js
    if (particlesRef.current) {
      const particleCount = isMobile ? 30 : 60
      const particles: HTMLDivElement[] = []

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        const size = Math.random() * 4 + 1

        particle.className = "absolute rounded-full pointer-events-none"
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.background =
          i % 3 === 0 ? "rgba(252, 82, 255, 0.7)" : i % 3 === 1 ? "rgba(0, 225, 244, 0.7)" : "rgba(255, 184, 0, 0.7)"

        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        // Use CSS animations instead of anime.js
        particle.style.animation = `float-${i % 3} ${5 + Math.random() * 5}s ease-in-out infinite`
        particle.style.animationDelay = `${Math.random() * 5}s`

        particlesRef.current.appendChild(particle)
        particles.push(particle)
      }

      // Cleanup function
      return () => {
        if (particlesRef.current) {
          particles.forEach((particle) => {
            if (particlesRef.current?.contains(particle)) {
              particlesRef.current.removeChild(particle)
            }
          })
        }
      }
    }
  }, [isMobile])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      {/* Grid background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      </div>

      <motion.div style={{ opacity, scale, y }} className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatedText
                text="AI Automation Expert"
                className="text-xl md:text-2xl font-medium text-secondary mb-4"
                delay={300}
              />

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold overflow-hidden">
                <AnimatedText text="Ibrahim" className="inline-block" delay={500} />
                <br />
                <AnimatedText text="Mustafa" className="inline-block" delay={800} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-lg md:text-xl text-gray-300 max-w-lg mt-6"
              >
                Transforming ideas into innovative solutions. Elevating your vision with expert design and development
                services.
              </motion.p>

              <div className="flex flex-wrap gap-4 mt-8">
                <motion.a
                  href="#projects"
                  className="glass px-8 py-3 rounded-full font-medium border border-primary/20 bg-primary/10 text-white hover:bg-primary/20 transition-all duration-300 touch-scale"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(252, 82, 255, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  className="px-8 py-3 rounded-full font-medium border border-white/10 hover:border-white/20 transition-all duration-300 touch-scale"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.7 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>
          </div>

          <div className="order-first md:order-last">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="neomorphic overflow-hidden rounded-2xl bg-gradient-to-br from-card/80 to-background/50 backdrop-blur-sm border border-white/5"
            >
              <AnimatedAvatar />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center text-sm text-gray-400 hover:text-white transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span className="mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  )
}
