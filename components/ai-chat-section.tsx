"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Send, Bot, User, Sparkles, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

// Predefined chat messages
const initialMessages = [
  {
    role: "assistant",
    content: "👋 Hi there! I'm AI Alp, your virtual assistant. I can share information about Alp's professional journey, skills, and project experiences. How can I help you today?",
  },
]

const experienceResponses = [
  {
    role: "assistant",
    content: `Alp has a growing professional experience. Here's a summary of his journey so far:

**Junior Social Media Manager** at Muse İstanbul (Apr 2024 - Aug 2024)
• Managed social media accounts, including for iGA Istanbul Airport.
• Focused on creating engaging content and analyzing performance metrics.
• Contributed to marketing team collaborations and campaign execution.

**Barista, Waiter, Cashier** at Asma Yaprağı (Jul 2015 - Sep 2021)
• Developed customer service and financial management skills in a dynamic environment.
• Honed his ability to provide excellent service in a high-volume setting.

**Intern** at Şafak Tercüme (Feb 2021 - Mar 2021)
• Gained experience in professional translation workflows and industry practices.`,
  },
]

const skillsResponses = [
  {
    role: "assistant",
    content: `Alp possesses a diverse skill set, with a focus on:

**Translation** - Expertise in professional translation between Turkish and English.
**Localization** - Adapting content effectively for cultural nuances.
**Technical Translation** - Experience in specialized translation for technical domains.
**Game Localization** - Skills in translating video games and related materials.
**Transcreation** - Experience with creative adaptation of marketing materials to maintain impact across languages.

He is proficient with tools like SDL Trados, SmartCat, Microsoft Office, and various CAT tools, and is committed to enhancing his technical capabilities.`,
  },
]

const projectResponses = [
  {
    role: "assistant",
    content: `Alp has engaged in several key projects that showcase his skills and development:

**Heroes of Hammerwatch II** - This project provided an opportunity to work on the complete Turkish localization for an action roguelite, which enhanced his understanding of game-specific language and workflows.
**Battle Talent** - Undertaking the official Turkish translation for this VR sword-fighting game where he translated immersive experiences.
**Localization Comparison Tool** - Building this Python-based application deepened his technical skills and understanding of practical localization needs.
**F1 Regulations Assistant** - Creating this specialized AI assistant provided experience in AI application and information management.
**AutoTidy** - Developing this utility application provided practical experience in software development and problem-solving.

Each project demonstrates his growing translation, localization, and technical abilities.`,
  },
]

const translationResponses = [
  {
    role: "assistant",
    content: `Alp offers professional translation services between Turkish and English. He focuses on understanding client needs and delivering quality work in areas such as:

**Document Translation** - Accurate translation of various document types.
**Website Translation** - Adapting web content effectively for Turkish audiences.
**Technical Translation** - Experience in specialized translation of technical documents.
**Certified Translation** - Knowledge of requirements for official translations for legal and academic purposes.
**Proofreading** - Attention to detail to ensure quality assurance for existing translations.

He is ready to discuss your specific project requirements and how he can contribute to your goals.`,
  },
]

const localizationResponses = [
  {
    role: "assistant",
    content: `Alp has a strong interest and growing expertise in localization services, especially for video games. His competence includes:

**Game Localization** - Localizing video games for the Turkish market.
**UI/UX Localization** - Adapting user interfaces for Turkish users.
**Cultural Adaptation** - Ensuring content is culturally appropriate and resonant.
**Terminology Management** - Maintaining consistent and accurate terminology.
**Localization Testing** - Verifying translations in context to ensure quality.

He is ready to understand the type of content you're looking to localize and apply his skills.`,
  },
]

const technicalTranslationResponses = [
  {
    role: "assistant",
    content: `Alp possesses strong technical translation skills. He provides precise and contextually accurate translations for:

**Software Documentation** - Experience in translating user manuals and guides.
**Technical Specifications** - Accurate translation of technical details.
**API Documentation** - Translating developer documentation effectively.
**Technical Manuals** - Converting complex instructions between languages.
**Scientific Content** - Translating research papers and scientific documents.

He understands that technical translation requires precision and domain knowledge, and is committed to excellence in these areas.`,
  },
]

const transcreationResponses = [
  {
    role: "assistant",
    content: `Alp offers transcreation services, focusing on adapting marketing and creative content effectively:

**Marketing Materials** - Creative adaptation of marketing campaigns to ensure they resonate with the target audience.
**Advertising Copy** - Crafting culturally relevant translations of advertisements.
**Slogans & Taglines** - Creating impactful messaging that connects with local sensibilities.
**Brand Voice** - Maintaining a consistent brand voice across different languages and cultures.
**Creative Content** - Adapting creative works while preserving their original intent and impact.

He believes transcreation is key to ensuring content has the same emotional resonance and impact in the target language and is ready to apply his skills.`,
  },
]

const educationResponses = [
  {
    role: "assistant",
    content: `Alp's educational background provides a solid foundation for his professional expertise:

**Bachelor's Degree** - Translation and Interpreting from Izmir University of Economics (2018-2022). This program equipped him with fundamental translation and interpreting skills.
**TOEFL Score** - A score of 92 demonstrates his advanced proficiency in English, which is crucial for his work.
**Specialized Training** - He has undertaken specialized training in game localization and technical translation, deepening his expertise.
**Software Proficiency** - He is proficient with CAT tools like SDL Trados and SmartCat.
**Continuous Learning** - Alp is committed to lifelong learning and regularly updates his skills through online courses, workshops, and practical experience to maintain a high level of expertise.`,
  },
]

// Rich text formatting function
const formatMessage = (content: string) => {
  // Convert **text** to bold
  let formatted = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  // Convert bullet points to proper list items
  formatted = formatted.replace(/^• (.+)$/gm, "<li>$1</li>")

  // Wrap consecutive list items in ul tags
  formatted = formatted.replace(/(<li>.*<\/li>\s*)+/gs, "<ul>$&</ul>")

  // Convert line breaks to proper spacing
  formatted = formatted.replace(/\n\n/g, "<br><br>")
  formatted = formatted.replace(/\n/g, "<br>")

  return formatted
}

export default function AIChatSection() {
  const { t } = useLanguage()
  // ... existing state and effects

  // Update initial messages to use translations
  const getInitialMessages = () => [
    {
      role: "assistant",
      content: t("experience.ai.greeting"),
    },
  ]

  const [messages, setMessages] = useState(getInitialMessages())
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const controls = useAnimation()

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Update the component when language changes
  useEffect(() => {
    setMessages(getInitialMessages())
  }, [t])

  // Listen for service click events
  useEffect(() => {
    const handleServiceMessage = (event: any) => {
      const { message } = event.detail
      if (message) {
        // Add user message
        const userMessage = { role: "user", content: message }
        setMessages((prev) => [...prev, userMessage])
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
          let response
          const lowercaseMessage = message.toLowerCase()

          if (lowercaseMessage.includes("translation")) {
            response = translationResponses[0]
          } else if (lowercaseMessage.includes("localization")) {
            response = localizationResponses[0]
          } else if (lowercaseMessage.includes("technical")) {
            response = technicalTranslationResponses[0]
          } else if (lowercaseMessage.includes("transcreation")) {
            response = transcreationResponses[0]
          } else {
            response = {
              role: "assistant",
              content:
                "Thank you for your interest! I'd be happy to discuss this service with you. What specific requirements do you have?",
            }
          }

          setMessages((prev) => [...prev, response])
          setIsTyping(false)
        }, 1500)
      }
    }

    window.addEventListener("triggerChatMessage", handleServiceMessage)
    return () => window.removeEventListener("triggerChatMessage", handleServiceMessage)
  }, [])

  const scrollToBottom = () => {
    // Only scroll within the chat container, not the entire page
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Focus back on input after submission
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    // Simulate AI response
    setTimeout(() => {
      let response
      const lowercaseInput = input.toLowerCase()

      if (lowercaseInput.includes("experience") || lowercaseInput.includes("work") || lowercaseInput.includes("job")) {
        response = experienceResponses[0]
      } else if (lowercaseInput.includes("skill") || lowercaseInput.includes("know") || lowercaseInput.includes("do")) {
        response = skillsResponses[0]
      } else if (
        lowercaseInput.includes("project") ||
        lowercaseInput.includes("portfolio") ||
        lowercaseInput.includes("build")
      ) {
        response = projectResponses[0]
      } else if (lowercaseInput.includes("translation") || lowercaseInput.includes("translate")) {
        response = translationResponses[0]
      } else if (lowercaseInput.includes("localization") || lowercaseInput.includes("localize")) {
        response = localizationResponses[0]
      } else if (lowercaseInput.includes("technical") || lowercaseInput.includes("tech")) {
        response = technicalTranslationResponses[0]
      } else if (lowercaseInput.includes("transcreation") || lowercaseInput.includes("creative")) {
        response = transcreationResponses[0]
      } else if (
        lowercaseInput.includes("education") ||
        lowercaseInput.includes("study") ||
        lowercaseInput.includes("degree")
      ) {
        response = educationResponses[0]
      } else {
        response = {
          role: "assistant",
          content:
            "I can share insights into Alp's professional journey, skills, project experiences, or educational background. What are you curious about?",
        }
      }

      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    // Simulate user clicking a quick question
    const userMessage = { role: "user", content: question }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response

      if (question.includes("experience")) {
        response = experienceResponses[0]
      } else if (question.includes("skills")) {
        response = skillsResponses[0]
      } else if (question.includes("projects")) {
        response = projectResponses[0]
      } else if (question.includes("education")) {
        response = educationResponses[0]
      }

      if (response) {
        setMessages((prev) => [...prev, response])
      }
      setIsTyping(false)
    }, 1500)
  }

  const resetChat = () => {
    setMessages(getInitialMessages())
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const chatElementVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-gradient-to-b from-card/50 to-background">
      {/* ... existing background */}

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
          className="text-center mb-12"
          style={{ opacity: 1 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {t("experience.title").split(" ")[0]}{" "}
            <span className="text-gradient">
              {t("experience.title").split(" ")[1]} {t("experience.title").split(" ")[2]}
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            {t("experience.subtitle")}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="max-w-3xl mx-auto" ref={chatContainerRef}>
          <motion.div
            className="glass rounded-2xl overflow-hidden chat-element"
            variants={chatElementVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">AI Alp</h3>
                  <p className="text-xs text-gray-400">Virtual Assistant</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title={t("experience.reset")}
                type="button"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {/* Chat messages - Fixed height container with internal scrolling */}
            <div
              ref={chatMessagesRef}
              className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === "user" ? "bg-primary/20 text-white" : "bg-card/50 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === "assistant" ? (
                        <Bot size={16} className="text-primary" />
                      ) : (
                        <User size={16} className="text-secondary" />
                      )}
                      <span className="text-xs font-medium">{message.role === "assistant" ? "AI Alp" : "You"}</span>
                    </div>
                    <div
                      className="text-sm rich-text"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="max-w-[80%] rounded-2xl p-3 bg-card/50 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} className="text-primary" />
                      <span className="text-xs font-medium">AI Alp</span>
                    </div>
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="p-3 border-t border-white/10 flex gap-2 overflow-x-auto hide-scrollbar">
              <button
                type="button"
                onClick={() => handleQuickQuestion("Tell me about Alp's work experience")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                {t("experience.quick.experience")}
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("What are Alp's skills?")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                {t("experience.quick.skills")}
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Tell me about Alp's projects")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                {t("experience.quick.projects")}
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Tell me about Alp's education")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                {t("experience.quick.education")}
              </button>
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("experience.placeholder")}
                  className="flex-1 bg-card/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <Send size={18} className="text-white" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* AI Assistant image */}
          <motion.div
            className="mt-8 flex justify-center chat-element"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 glow-effect">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alpface-XaxIdCkA6rU20A2ulrhY6D6BdvSpOA.webp"
                  alt="Alp Yalay"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
