"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { GraduationCap, Languages, Award, FileText } from "lucide-react"

const stats = [
  {
    icon: GraduationCap,
    value: "2022",
    label: "Bachelor's Degree",
    description: "Translation and Interpreting",
    color: "from-primary to-primary/60",
  },
  {
    icon: Languages,
    value: "2",
    label: "Languages",
    description: "Turkish and English",
    color: "from-secondary to-secondary/60",
  },
  {
    icon: Award,
    value: "92",
    label: "TOEFL Score",
    description: "English proficiency",
    color: "from-accent to-accent/60",
  },
  {
    icon: FileText,
    value: "2+",
    label: "Game Translations",
    description: "Official and fan projects",
    color: "from-primary to-secondary",
  },
]

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()
  const [counters, setCounters] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      // Animate counters
      stats.forEach((stat, index) => {
        const finalValue = Number.parseInt(stat.value.replace(/\D/g, ""))
        let current = 0
        const increment = finalValue / 60 // 60 frames for smooth animation

        const timer = setInterval(() => {
          current += increment
          if (current >= finalValue) {
            current = finalValue
            clearInterval(timer)
          }

          setCounters((prev) => {
            const newCounters = [...prev]
            newCounters[index] = Math.floor(current)
            return newCounters
          })
        }, 16) // ~60fps
      })
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const displayValue = stat.value.includes("+")
              ? `${counters[index]}+`
              : stat.value.includes("%")
                ? `${counters[index]}%`
                : counters[index].toString()

            return (
              <motion.div key={index} variants={itemVariants} className="relative group">
                <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  {/* Icon */}
                  <div className="relative z-10 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3 flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      className="text-3xl lg:text-4xl font-bold mb-2"
                      initial={{ scale: 0.5 }}
                      animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <span className="text-gradient">{displayValue}</span>
                    </motion.div>

                    <h3 className="text-lg font-semibold mb-2 text-white">{stat.label}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{stat.description}</p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
