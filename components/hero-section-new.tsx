"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function HeroSectionNew() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.9])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Spring animations for smoother mouse following
  const springX = useSpring(0, { stiffness: 50, damping: 20 })
  const springY = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    springX.set(mousePosition.x)
    springY.set(mousePosition.y)
  }, [mousePosition, springX, springY])

  const rotateX = useTransform(springY, [-1, 1], [10, -10])
  const rotateY = useTransform(springX, [-1, 1], [-10, 10])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000 bg-[#05050a]"
    >
      {/* 3D Background Grid/Plane */}
      <motion.div
        style={{
          rotateX: 60,
          rotateZ: 0,
          y: y1,
        }}
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,204,113,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(46,204,113,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] transform scale-[2]"></div>
      </motion.div>

      {/* Floating Geometric Elements - 3D feel */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-primary/20 rounded-full"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
              rotateX: 60,
              rotateZ: i * 30,
            }}
            animate={{
              rotateZ: [i * 30, i * 30 + 360],
            }}
            transition={{
              duration: 30 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <motion.div
        style={{ opacity, scale, rotateX, rotateY }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Decorative top label */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
        >
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Portfolio 2024</span>
        </motion.div>

        {/* Main Title - 3D Typography */}
        <h1 className="relative text-[12vw] md:text-[150px] font-black leading-none tracking-tighter select-none mix-blend-screen">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
          >
            ALP
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/40 mt-[-2vw] md:mt-[-30px]"
          >
            YALAY
          </motion.div>

          {/* 3D Shadow/Echo Effect */}
          <motion.span
             style={{ x: useTransform(springX, [-1, 1], [-20, 20]), y: useTransform(springY, [-1, 1], [-20, 20]) }}
             className="absolute inset-0 text-primary/5 blur-sm z-0 pointer-events-none"
             aria-hidden="true"
          >
            ALP<br/>YALAY
          </motion.span>
        </h1>

        {/* Subtitle & Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 md:mt-12 space-y-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-lg md:text-2xl font-light tracking-wide text-gray-300">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              {t("hero.title.translator")}
            </span>
            <span className="hidden md:inline text-gray-600">/</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              {t("hero.title.localizer")}
            </span>
          </div>

          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-400 leading-relaxed">
            {t("hero.description")}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute left-1/2 transform -translate-x-1/2 mt-24"
        >
           <motion.div
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
             className="w-[1px] h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
           />
        </motion.div>

      </motion.div>

      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05050a] to-transparent z-20 pointer-events-none"></div>
    </section>
  )
}
