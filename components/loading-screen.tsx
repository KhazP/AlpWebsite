"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function LoadingScreen() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const name = "Alp Yalay"

  useEffect(() => {
    // Simple timeout to hide loading screen
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  }

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, -10, 0],
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: Math.random() > 0.5 ? "#fc52ff" : "#00e1f4",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                variants={particleVariants}
                animate="animate"
                transition={{
                  delay: Math.random() * 2,
                  duration: 2 + Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center z-10 relative">
            {/* Avatar */}
            <motion.div className="mb-6" variants={itemVariants}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alpface-XaxIdCkA6rU20A2ulrhY6D6BdvSpOA.webp"
                  alt="Alp Yalay"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover relative z-10"
                  priority
                />
              </div>
            </motion.div>

            {/* Name */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-heading font-bold">
                {name.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={letterVariants}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Progress Bar */}
            <motion.div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4" variants={itemVariants}>
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                variants={progressVariants}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="text-sm text-gray-400"
              variants={itemVariants}
              animate={{
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              {t("loading.text")}
            </motion.div>
          </div>

          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
