"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

const FluidLoader = () => {
  // Generate random initial positions for the bubbles, memoized to prevent re-render jumps
  const bubbles = useMemo(() => Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 40, // 40-80px
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
  })), [])

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Gooey Filter */}
      <svg className="absolute hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ filter: "url(#goo)" }}
      >
        {/* Central Core */}
        <motion.div
          className="absolute w-20 h-20 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Orbiting Bubbles */}
        {bubbles.map((bubble, i) => (
          <motion.div
            key={bubble.id}
            className="absolute bg-primary/80 rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
            }}
            animate={{
              x: [0, bubble.x * 1.5, -bubble.x * 1.5, 0],
              y: [0, bubble.y * 1.5, -bubble.y * 1.5, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 3 + i, // Staggered durations
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              times: [0, 0.33, 0.66, 1],
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function LoadingScreen() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const name = "Alp Yalay"

  useEffect(() => {
    // Minimum load time of 2 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // Custom bezier for smooth "curtain" effect
            },
          }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Fluid Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <FluidLoader />
            </motion.div>

            {/* Name Text */}
            <motion.div className="mt-8 relative">
              <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-gradient-enhanced">
                {name.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + index * 0.05,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="mt-6 text-sm md:text-base text-primary/60 font-medium tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {t("loading.text")}
              </motion.span>
            </motion.div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Subtle glowing orb in background */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(46,204,113,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(46,204,113,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
