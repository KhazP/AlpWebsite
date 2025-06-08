"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import anime from "animejs"

const experiences = [
  {
    company: "Muse İstanbul",
    position: "Junior Social Media Manager",
    period: "Apr 2024 - Aug 2024",
    description:
      "Managed social media accounts for iGA Istanbul Airport, creating engaging content and monitoring performance metrics.",
    achievements: [
      "Created and scheduled social media content for multiple platforms",
      "Analyzed engagement metrics to optimize content strategy",
      "Collaborated with marketing team on campaign development",
    ],
    technologies: ["Social Media Management", "Content Creation", "Analytics", "Marketing"],
  },
  {
    company: "Asma Yaprağı",
    position: "Barista, Waiter, Cashier",
    period: "Jul 2015 - Sep 2021",
    description: "Handled customer service and financial management in a fast-paced restaurant environment.",
    achievements: [
      "Managed cash transactions and daily financial reconciliation",
      "Provided excellent customer service in a high-volume setting",
      "Trained new staff members on procedures and customer service standards",
    ],
    technologies: ["Customer Service", "Cash Handling", "Team Coordination", "Training"],
  },
  {
    company: "Şafak Tercüme",
    position: "Intern",
    period: "Feb 2021 - Mar 2021",
    description: "Gained practical experience in professional translation workflows and processes.",
    achievements: [
      "Assisted with translation projects under senior translator supervision",
      "Learned industry-standard CAT tools and translation management systems",
      "Contributed to quality assurance processes for completed translations",
    ],
    technologies: ["Translation", "CAT Tools", "Quality Assurance", "Project Management"],
  },
]

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  // Changed once to false and reduced threshold to ensure better triggering
  const isInView = useInView(ref, { once: false, amount: 0.1, fallback: true })
  const controls = useAnimation()
  const timelineRef = useRef<HTMLDivElement>(null)

  // Ensure animations run when component mounts
  useEffect(() => {
    controls.start("visible")
  }, [controls])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      // Animate timeline elements
      if (timelineRef.current) {
        anime({
          targets: timelineRef.current.querySelectorAll(".timeline-dot"),
          scale: [0, 1],
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 800,
          delay: anime.stagger(300),
          // Added complete callback to ensure final state
          complete: () => {
            // Set final state to ensure visibility
            const elements = timelineRef.current?.querySelectorAll(".timeline-dot")
            if (elements) {
              elements.forEach((el) => {
                ;(el as HTMLElement).style.opacity = "1"
                ;(el as HTMLElement).style.transform = "scale(1)"
              })
            }
          },
        })

        anime({
          targets: timelineRef.current.querySelectorAll(".timeline-line"),
          scaleY: [0, 1],
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1200,
          delay: 300,
          // Added complete callback to ensure final state
          complete: () => {
            // Set final state to ensure visibility
            const elements = timelineRef.current?.querySelectorAll(".timeline-line")
            if (elements) {
              elements.forEach((el) => {
                ;(el as HTMLElement).style.opacity = "1"
                ;(el as HTMLElement).style.transform = "scaleY(1)"
              })
            }
          },
        })

        anime({
          targets: timelineRef.current.querySelectorAll(".experience-card"),
          translateX: [40, 0],
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 800,
          delay: anime.stagger(300),
          // Added complete callback to ensure final state
          complete: () => {
            // Set final state to ensure visibility
            const elements = timelineRef.current?.querySelectorAll(".experience-card")
            if (elements) {
              elements.forEach((el) => {
                ;(el as HTMLElement).style.opacity = "1"
                ;(el as HTMLElement).style.transform = "translateX(0)"
              })
            }
          },
        })
      }
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-gradient-to-b from-card/50 to-background">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
          style={{ opacity: 1 }} // Fallback opacity
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            My professional journey in translation and localization
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="max-w-5xl mx-auto" ref={timelineRef}>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2 timeline-line origin-top"></div>

            {/* Experience items */}
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative mb-12 md:mb-24 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 ml-12" : "md:pl-12 ml-12 md:ml-auto"
                }`}
                style={{
                  width: "100%",
                  maxWidth: "45%",
                  opacity: 1, // Fallback opacity
                }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0 ? "left-0 md:right-0 md:left-auto" : "left-0"
                  } w-4 h-4 rounded-full bg-primary transform translate-x-[-8px] md:translate-x-[-50%] timeline-dot z-10`}
                  style={{ opacity: 1 }} // Fallback opacity
                ></div>

                {/* Content */}
                <motion.div
                  className="glass p-6 md:p-8 experience-card"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                    transition: { duration: 0.2 },
                  }}
                  style={{ opacity: 1 }} // Fallback opacity
                >
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/20 text-primary mb-4">
                    {exp.period}
                  </span>
                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">{exp.position}</h3>
                  <h4 className="text-lg text-gray-300 mb-4">{exp.company}</h4>
                  <p className="text-gray-400 mb-4">{exp.description}</p>

                  {/* Key achievements */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h5 className="text-sm font-medium mb-2 text-secondary">Key Achievements</h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-400">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-2"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs rounded-full bg-card/50 text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume download button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          style={{ opacity: 1 }} // Fallback opacity
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass bg-primary/10 hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(46, 204, 113, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Full Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
