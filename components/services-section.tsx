"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Brain, Workflow, BarChart3, MessageSquare, Code, Database } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "AI Development",
    description: "Custom AI solutions tailored to your business needs",
    features: ["Machine Learning Models", "Neural Networks", "Computer Vision", "NLP Solutions"],
    color: "from-primary to-primary/60",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Streamline workflows and eliminate repetitive tasks",
    features: ["RPA Implementation", "Workflow Optimization", "API Integration", "Task Automation"],
    color: "from-secondary to-secondary/60",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Transform raw data into actionable business insights",
    features: ["Predictive Analytics", "Data Visualization", "Business Intelligence", "Performance Metrics"],
    color: "from-accent to-accent/60",
  },
  {
    icon: MessageSquare,
    title: "Chatbot Development",
    description: "Intelligent conversational interfaces for customer engagement",
    features: ["Natural Language Processing", "Multi-platform Support", "Voice Integration", "24/7 Availability"],
    color: "from-primary to-secondary",
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Bespoke software solutions for unique business requirements",
    features: ["Full-stack Development", "API Development", "System Integration", "Cloud Solutions"],
    color: "from-secondary to-accent",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Efficient data storage, processing, and management systems",
    features: ["Database Design", "Data Migration", "Real-time Processing", "Data Security"],
    color: "from-accent to-primary",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent"></div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            MY BEST QUALITY <span className="text-gradient italic">SERVICES</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Delivering cutting-edge AI and automation solutions that transform businesses and drive innovation
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div key={index} variants={itemVariants} className="group relative">
                <div className="glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden h-full">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + featureIndex * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 group-hover:bg-secondary transition-colors duration-300"></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
