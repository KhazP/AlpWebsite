"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Brain, Workflow, BarChart3, MessageSquare, Code, Database, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "AI Development",
    subtitle: "Intelligent Solutions",
    color: "from-primary to-primary/60",
    size: "large",
    position: "top-left",
    clickable: true,
    chatMessage:
      "I'm interested in AI development services. Can you tell me about your machine learning and AI solutions?",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    subtitle: "Streamlined Workflows",
    color: "from-secondary to-secondary/60",
    size: "medium",
    position: "top-right",
    clickable: true,
    chatMessage: "I need help with process automation. What workflow optimization solutions do you offer?",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    subtitle: "Actionable Insights",
    color: "from-accent to-accent/60",
    size: "medium",
    position: "middle-left",
    clickable: true,
    chatMessage: "I'm looking for data analytics solutions. How can you help me extract insights from my data?",
  },
  {
    icon: MessageSquare,
    title: "Chatbot Development",
    subtitle: "Conversational AI",
    color: "from-primary to-secondary",
    size: "small",
    position: "middle-right",
    clickable: true,
    chatMessage:
      "I'm interested in chatbot development services. Can you tell me more about your conversational AI solutions?",
  },
  {
    icon: Code,
    title: "Custom Software",
    subtitle: "Bespoke Solutions",
    color: "from-secondary to-accent",
    size: "medium",
    position: "bottom-left",
    clickable: true,
    chatMessage: "I need custom software development. What bespoke solutions can you create for my business?",
  },
  {
    icon: Database,
    title: "Data Management",
    subtitle: "Efficient Systems",
    color: "from-accent to-primary",
    size: "small",
    position: "bottom-right",
    clickable: true,
    chatMessage: "I need help with data management solutions. What services do you offer for efficient data systems?",
  },
]

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleServiceClick = (service: any) => {
    if (service.clickable) {
      // Scroll to AI chat section
      const chatSection = document.getElementById("experience")
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: "smooth" })

        // Wait for scroll to complete, then trigger chat message
        setTimeout(() => {
          // Dispatch custom event to trigger chat message
          window.dispatchEvent(
            new CustomEvent("triggerChatMessage", {
              detail: { message: service.chatMessage },
            }),
          )
        }, 1000)
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const getCardSize = (size: string) => {
    // Desktop grid classes
    const desktopClasses = {
      large: "lg:col-span-2 lg:row-span-2 lg:h-80",
      medium: "lg:col-span-1 lg:row-span-2 lg:h-80",
      small: "lg:col-span-1 lg:row-span-1 lg:h-36",
    }

    // Mobile: all cards are the same size
    const mobileClasses = "col-span-1 h-48"

    return `${mobileClasses} ${desktopClasses[size as keyof typeof desktopClasses] || desktopClasses.small}`
  }

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6">
            MY BEST QUALITY <span className="text-gradient italic">SERVICES</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        {/* Responsive Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${getCardSize(service.size)} group relative cursor-pointer`}
                onClick={() => handleServiceClick(service)}
              >
                <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-white/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 relative overflow-hidden h-full flex flex-col justify-between">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  {/* Floating Icon Background */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-white/5 to-white/10 blur-xl group-hover:scale-110 transition-transform duration-500"></div>

                  {/* Clickable Indicator */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MessageSquare className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-3 md:mb-4">
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} p-3 md:p-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                      >
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base mb-2">{service.subtitle}</p>
                      <p className="text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to chat about this service
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <div className="mt-3 md:mt-4 self-end">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>

                  {/* Geometric Decoration */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border border-white/10 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-sm md:text-base"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
