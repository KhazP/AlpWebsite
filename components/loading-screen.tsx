"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function LoadingScreen() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [portalActive, setPortalActive] = useState(false)
  const name = "Alp Yalay"

  useEffect(() => {
    // Minimum load time of 2 seconds
    const timer = setTimeout(() => {
      setPortalActive(true)
      // Give the portal animation time to play before unmounting
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Shared bubble data
  const bubbles = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        size: Math.random() * 40 + 40, // 40-80px
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      })),
    [],
  )

  return (
    <AnimatePresence>
      {loading && (
        <>
          {/* 
            SVG MASK DEFINITION
            This is hidden but defines the mask used by the overlay.
            White = Visible (The black overlay)
            Black = Transparent (The portal hole)
          */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="goo-mask">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
              <mask id="portal-mask">
                <rect width="100%" height="100%" fill="white" />
                <g filter="url(#goo-mask)">
                  {/* Central Core - Expands to create the hole */}
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="40"
                    fill="black"
                    animate={
                      portalActive
                        ? {
                          r: 2000, // Massive radius to cover screen
                        }
                        : {
                          scale: [1, 1.2, 1],
                        }
                    }
                    transition={
                      portalActive
                        ? {
                          duration: 1.5,
                          ease: [0.7, 0, 0.3, 1],
                        }
                        : {
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }
                    }
                  />
                  {/* Orbiting Bubbles - Part of the hole */}
                  {bubbles.map((bubble, i) => (
                    <motion.circle
                      key={`mask-${bubble.id}`}
                      cx="50%"
                      cy="50%"
                      r={bubble.size / 2}
                      fill="black"
                      animate={
                        portalActive
                          ? {
                            x: bubble.x * 10,
                            y: bubble.y * 10,
                            r: 0, // Shrink bubbles as portal opens
                          }
                          : {
                            x: [0, bubble.x * 1.5, -bubble.x * 1.5, 0],
                            y: [0, bubble.y * 1.5, -bubble.y * 1.5, 0],
                            scale: [1, 0.8, 1.2, 1],
                          }
                      }
                      transition={
                        portalActive
                          ? { duration: 1 }
                          : {
                            duration: 3 + i,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            times: [0, 0.33, 0.66, 1],
                          }
                      }
                    />
                  ))}
                </g>
              </mask>
            </defs>
          </svg>

          {/* 
            MAIN OVERLAY 
            This is the black screen that covers the site.
            It uses the mask defined above.
          */}
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
            style={{ mask: "url(#portal-mask)", WebkitMask: "url(#portal-mask)" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {/* 
              VISIBLE BLOB LAYER
              This sits ON TOP of the masked overlay.
              It provides the green color and fades out.
            */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
              animate={
                portalActive
                  ? {
                    opacity: 0,
                    scale: 1.5,
                  }
                  : {
                    opacity: 1,
                    scale: 1,
                  }
              }
              transition={{ duration: 0.8, ease: "easeIn" }}
            >
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="absolute hidden">
                  <defs>
                    <filter id="goo-visible">
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
                  style={{ filter: "url(#goo-visible)" }}
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
                      key={`visible-${bubble.id}`}
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
                        duration: 3 + i,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        times: [0, 0.33, 0.66, 1],
                      }}
                    />
                  ))}
                </div>
              </div>

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
            </motion.div>

            {/* Decorative Background Elements - Fades out with portal */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={portalActive ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
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
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
