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
    content: "👋 Hi there! I'm AI Alp, your virtual assistant. Ask me about Alp's translation services or skills!",
  },
]

const experienceResponses = [
  {
    role: "assistant",
    content: `Alp has experience in translation and social media management:

**Junior Social Media Manager** at Muse İstanbul (Apr 2024 - Aug 2024)
• Managed social media accounts for iGA Istanbul Airport
• Created engaging content and monitored performance metrics
• Collaborated with marketing team on campaigns

**Barista, Waiter, Cashier** at Asma Yaprağı (Jul 2015 - Sep 2021)
• Handled customer service and financial management
• Provided excellent service in a high-volume setting

**Intern** at Şafak Tercüme (Feb 2021 - Mar 2021)
• Gained experience in professional translation workflows`,
  },
]

const skillsResponses = [
  {
    role: "assistant",
    content: `Alp specializes in:

**Translation** - Professional translation between Turkish and English
**Localization** - Adapting content for cultural appropriateness
**Technical Translation** - Specialized translation for technical content
**Game Localization** - Translating video games and related materials
**Transcreation** - Creative adaptation of marketing materials

He's proficient with tools like SDL Trados, SmartCat, Microsoft Office, and various CAT tools.`,
  },
]

const projectResponses = [
  {
    role: "assistant",
    content: `Alp has worked on several translation projects:

**Heroes of Hammerwatch II** - Complete Turkish localization for this action roguelite
**Battle Talent** - Official Turkish translation for this VR sword-fighting game
**Localization Comparison Tool** - A Python-based application for comparing localization files
**F1 Regulations Assistant** - A specialized AI assistant for F1 regulations
**AutoTidy** - A utility application for organizing computer folders

Each project demonstrates his expertise in translation, localization, and technical skills.`,
  },
]

const translationResponses = [
  {
    role: "assistant",
    content: `Alp offers professional translation services between Turkish and English:

**Document Translation** - Accurate translation of various document types
**Website Translation** - Localization of web content for Turkish audiences
**Technical Translation** - Specialized translation of technical documents
**Certified Translation** - Official translations for legal and academic purposes
**Proofreading** - Quality assurance for existing translations

Would you like to discuss a specific translation project?`,
  },
]

const localizationResponses = [
  {
    role: "assistant",
    content: `Alp specializes in localization services, particularly for video games:

**Game Localization** - Complete localization of video games for Turkish market
**UI/UX Localization** - Adapting user interfaces for Turkish users
**Cultural Adaptation** - Ensuring content is culturally appropriate
**Terminology Management** - Maintaining consistent terminology
**Localization Testing** - Verifying translations in context

What type of content are you looking to localize?`,
  },
]

const technicalTranslationResponses = [
  {
    role: "assistant",
    content: `Alp provides technical translation services:

**Software Documentation** - Translating user manuals and guides
**Technical Specifications** - Accurate translation of technical details
**API Documentation** - Translating developer documentation
**Technical Manuals** - Converting complex instructions between languages
**Scientific Content** - Translating research papers and scientific documents

Technical translation requires precision and domain knowledge, which Alp has developed through his education and experience.`,
  },
]

const transcreationResponses = [
  {
    role: "assistant",
    content: `Alp offers transcreation services for marketing and creative content:

**Marketing Materials** - Creative adaptation of marketing campaigns
**Advertising Copy** - Culturally relevant translations of advertisements
**Slogans & Taglines** - Creating impactful messaging that resonates
**Brand Voice** - Maintaining consistent brand voice across languages
**Creative Content** - Adapting creative works while preserving intent

Transcreation goes beyond translation to ensure content has the same impact and emotional resonance in the target language.`,
  },
]

const educationResponses = [
  {
    role: "assistant",
    content: `Alp's educational background:

**Bachelor's Degree** - Translation and Interpreting from Izmir University of Economics (2018-2022)
**TOEFL Score** - 92, demonstrating advanced English proficiency
**Specialized Training** - Game localization and technical translation
**Software Proficiency** - Trained in CAT tools like SDL Trados and SmartCat
**Continuous Learning** - Regularly updates skills through online courses and workshops`,
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
            "I can tell you about Alp's translation services, skills, projects, or education. What would you like to know?",
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
