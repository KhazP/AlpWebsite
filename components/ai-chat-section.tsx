"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Send, Bot, User, Sparkles, RefreshCw, Copy, ThumbsUp, ThumbsDown, Check, Plus, Mic, AudioWaveform } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { findBestMatch } from "@/lib/utils"

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
    content: `Alp has diverse experience in Technical Production, Web Development, and Localization. Here is his journey:

**Technical Producer** at Çağla Cabaoğlu Gallery (Aug 2025 - Present)
• Lead end‑to‑end delivery of the gallery website: scope, backlog, sprints, vendor/stack decisions, accessibility, SEO, Q&A, and launch operations.
• Provide technical consulting on content workflows, technical areas, and integrations to improve discoverability and engagement.
• Run IT support for staff and exhibitions (devices, software, network, show PCs/kiosks).

**Junior Social Media Manager** at Muse İstanbul (Apr 2024 - Aug 2024)
• Managed, provided creative writing, and translated social media accounts/posts for iGA Istanbul Airport and its CEO Selahattin Bilgen.

**Barista, Waiter, Cashier** at Asma Yaprağı (Jul 2015 - Sep 2021)
• Worked as a Barista, Waiter, and Cashier. Focusing on Cash-flow Management and General Restaurant Management.

**Intern** at Şafak Tercüme (Feb 2021 - Mar 2021)
• Completed a 20-workday internship focused on translation processes.`,
  },
]

const skillsResponses = [
  {
    role: "assistant",
    content: `Alp's top skills cover Technical Production, Web Development, and Language Services:

**Technical Production & Development:**
• **Back-End Web Development**
• **Front-End Development**
• Microsoft Office Suite, Photoshop, Premiere Pro.
• General computer knowledge and IT support.

**Language & Translation:**
• **Translation & Interpretation** (English/Turkish)
• Localization, Transcreation, Subtitle Translation, Proofreading.
• Specialized in diplomatic, consecutive, audio-visual, literary, medical, economic, legal, media, and computer-assisted translation.
• Proficient in SDL Trados and Subtitle Edit.

**Domain Expertise:**
• Art and culture, video game lexicon, terminology.`,
  },
]

const projectResponses = [
  {
    role: "assistant",
    content: `Alp has engaged in several key projects that showcase his skills:

**Gallery Website Delivery:** Leading end-to-end delivery, including scope, sprints, stack decisions, SEO, and launch operations at Çağla Cabaoğlu Gallery.

**Localization & Translation Projects:**
• **Heroes of Hammerwatch II:** Complete Turkish localization for an action roguelite.
• **Battle Talent:** Official Turkish translation for this VR sword-fighting game.
• **Localization Comparison Tool:** Python-based application to deepen technical skills.
• **F1 Regulations Assistant:** Specialized AI assistant for information management.
• **AutoTidy:** Utility application for file management.

Each project demonstrates his blend of technical and linguistic abilities.`,
  },
]

const translationResponses = [
  {
    role: "assistant",
    content: `Alp brings passion for language interpretation and translation into the digital world. His services include:

**Localization & Transcreation:** Adapting content for cultural nuances and creative marketing impact.
**Subtitle Translation:** For audio-visual media.
**Proofreading:** Ensuring quality and accuracy.
**Specialized Translation:** Diplomatic, consecutive, literary, medical, economic, legal, media, and technical fields.

He uses tools like SDL Trados and Subtitle Edit to deliver high-quality results.`,
  },
]

const educationResponses = [
  {
    role: "assistant",
    content: `Alp's educational background includes:

**İzmir Ekonomi Üniversitesi** (2018 - July 2022)
• Bachelor's degree in Language Interpretation and Translation.
• Major courses in diplomatic, consecutive, audio-visual, literary, medical, economic, legal, media, and computer-assisted translation.

**Pera Güzel Sanatlar Lisesi** (2014 - 2018)
• High School Diploma, Art/Art Studies, General.

**Sisli Terakki Lisesi** (2005 - 2014)
• Primary and Middle School Diplomas.

**Robert College Child Study Center** (2001 - 2005)
• Kindergarten.

**Certificates:**
• Certificate of Achievement for participation in the Polymaths in the Republican Era Poster Exhibition (May 2022).`,
  },
]

type ChatTopic =
  | "experience"
  | "skills"
  | "projects"
  | "translation"
  | "education"

type AssistantMessage = {
  role: "assistant"
  content: string
}

type QuickQuestionConfig = {
  topic: ChatTopic
  label: string
  message: string
}

type ServiceEventDetail = {
  message?: string
  topic?: ChatTopic
}

const responseByTopic: Record<ChatTopic, AssistantMessage> = {
  experience: experienceResponses[0],
  skills: skillsResponses[0],
  projects: projectResponses[0],
  translation: translationResponses[0],
  education: educationResponses[0],
}

const topicKeywords: { topic: ChatTopic; keywords: string[] }[] = [
  {
    topic: "translation",
    keywords: ["translation", "translate", "çeviri", "çevir", "localization", "transcreation", "subtitle"],
  },
  {
    topic: "experience",
    keywords: ["experience", "work", "job", "career", "deneyim", "iş", "kariyer", "history"],
  },
  {
    topic: "skills",
    keywords: ["skill", "skills", "know", "capabilities", "beceri", "yetenek", "tech", "development", "software"],
  },
  {
    topic: "projects",
    keywords: ["project", "projects", "portfolio", "build", "proje", "projeler", "çalışma", "gallery", "game"],
  },
  {
    topic: "education",
    keywords: ["education", "study", "degree", "school", "üniversite", "eğitim", "university", "college"],
  },
]

const servicePromptKeyMap: Partial<Record<ChatTopic, string>> = {
  translation: "experience.service.translation",
}

const getResponseForTopic = (topic: ChatTopic): AssistantMessage => {
  const response = responseByTopic[topic]
  return {
    role: response.role,
    content: response.content,
  }
}

const detectTopicFromText = (text: string): ChatTopic | null => {
  const keywords = topicKeywords.flatMap(tk => tk.keywords)
  const match = findBestMatch(text, keywords)

  if (match) {
    return topicKeywords.find(tk => tk.keywords.includes(match))?.topic || null
  }
  return null
}

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
  const getInitialMessages = useCallback(
    () => [
      {
        role: "assistant",
        content: t("experience.ai.greeting"),
      },
    ],
    [t],
  )

  const [messages, setMessages] = useState(() => getInitialMessages())
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const controls = useAnimation()

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const quickQuestions: QuickQuestionConfig[] = [
    {
      topic: "experience",
      label: t("experience.quick.experience"),
      message: t("experience.quick.message.experience"),
    },
    {
      topic: "skills",
      label: t("experience.quick.skills"),
      message: t("experience.quick.message.skills"),
    },
    {
      topic: "projects",
      label: t("experience.quick.projects"),
      message: t("experience.quick.message.projects"),
    },
    {
      topic: "education",
      label: t("experience.quick.education"),
      message: t("experience.quick.message.education"),
    },
  ]

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
  }, [getInitialMessages])

  // Listen for service click events
  useEffect(() => {
    const handleServiceMessage = (event: Event) => {
      const customEvent = event as CustomEvent<ServiceEventDetail>
      const detail = customEvent.detail

      if (!detail) {
        return
      }

      const resolvedTopic =
        detail.topic ??
        (detail.message ? detectTopicFromText(detail.message.toLowerCase()) : null)

      const serviceKey = resolvedTopic ? servicePromptKeyMap[resolvedTopic] : undefined
      const resolvedMessage = detail.message ?? (serviceKey ? t(serviceKey) : undefined)

      if (!resolvedMessage) {
        return
      }

      const userMessage = { role: "user" as const, content: resolvedMessage }
      setMessages((prev) => [...prev, userMessage])
      setIsTyping(true)

      setTimeout(() => {
        const response: AssistantMessage = resolvedTopic
          ? getResponseForTopic(resolvedTopic)
          : { role: "assistant", content: t("experience.response.service") }

        setMessages((prev) => [...prev, response])
        setIsTyping(false)
      }, 1500)
    }

    window.addEventListener("triggerChatMessage", handleServiceMessage as EventListener)
    return () => window.removeEventListener("triggerChatMessage", handleServiceMessage as EventListener)
  }, [t])

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

    const submittedInput = input

    // Add user message
    const userMessage = { role: "user" as const, content: submittedInput }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Focus back on input after submission
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    // Simulate AI response
    setTimeout(() => {
      const topic = detectTopicFromText(submittedInput.toLowerCase())
      const response: AssistantMessage = topic
        ? getResponseForTopic(topic)
        : { role: "assistant", content: t("experience.response.general") }

      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: QuickQuestionConfig) => {
    // Simulate user clicking a quick question
    const userMessage = { role: "user" as const, content: question.message }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = getResponseForTopic(question.topic)
      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const resetChat = () => {
    setMessages(getInitialMessages())
  }

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content.replace(/<[^>]*>?/gm, '')) // simplistic HTML strip for copy
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
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
    <section id="ai-chat" className="py-20 md:py-32 relative bg-[#212121] text-white">
      {/* ... existing background */}

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Minimal ambient glow */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-8"
          style={{ opacity: 1 }}
        >
           {/* Minimal Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
              </div>
             <span className="font-bold text-xl">AlpGPT</span>
             <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-400">3.5</span>
          </motion.div>
        </motion.div>

        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col min-h-[600px]" ref={chatContainerRef}>
          <motion.div
            className="flex-1 flex flex-col overflow-hidden"
            variants={chatElementVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >

            {/* Chat messages */}
            <div
              ref={chatMessagesRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth no-scrollbar"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.length === 0 && (
                 <div className="h-full flex items-center justify-center">
                     <div className="bg-white/5 px-4 py-2 rounded-full text-sm text-gray-300">hello</div>
                 </div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start w-full"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                    {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 flex items-center justify-center mr-4 mt-1">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                    )}

                  <div
                    className={`max-w-[85%] ${
                      message.role === "user"
                      ? "bg-[#2f2f2f] text-white rounded-3xl px-5 py-3"
                      : "text-gray-100 px-0 py-1"
                    }`}
                  >
                    <div
                      className="text-base leading-relaxed rich-text"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />

                    {/* Action Bar for Assistant */}
                    {message.role === "assistant" && (
                         <div className="flex items-center gap-2 mt-3 text-gray-400">
                             <button
                                onClick={() => handleCopy(message.content, index)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                                title="Copy"
                             >
                                {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                             </button>
                             <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Good response">
                                 <ThumbsUp size={16} />
                             </button>
                             <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Bad response">
                                 <ThumbsDown size={16} />
                             </button>
                             <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Regenerate">
                                 <RefreshCw size={16} />
                             </button>
                         </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start w-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 flex items-center justify-center mr-4 mt-1">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                  <div className="text-gray-100 px-0 py-1">
                    <div className="flex gap-1 h-6 items-center">
                      <span
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions - Centered pills */}
             {messages.length < 3 && (
                <div className="px-4 pb-4 flex flex-wrap gap-2 justify-center">
                {quickQuestions.map((question) => (
                    <button
                    key={question.topic}
                    type="button"
                    onClick={() => handleQuickQuestion(question)}
                    className="px-4 py-2 text-sm rounded-xl bg-[#2f2f2f] border border-white/5 text-gray-300 hover:bg-[#3f3f3f] hover:text-white transition-colors"
                    >
                    {question.label}
                    </button>
                ))}
                </div>
             )}


            {/* Chat input area */}
            <div className="p-4 md:pb-8">
              <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
                <div className="relative flex items-center bg-[#2f2f2f] rounded-3xl border border-white/10 focus-within:border-white/20 transition-colors">
                    <button type="button" className="p-3 ml-1 text-gray-400 hover:text-white transition-colors">
                        <Plus size={20} />
                    </button>
                    <input
                    type="text"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("experience.placeholder")}
                    className="flex-1 bg-transparent text-white px-2 py-4 focus:outline-none placeholder:text-gray-500"
                    autoComplete="off"
                    />
                     <div className="flex items-center pr-2 gap-1">
                        {input.trim() ? (
                             <button
                             type="submit"
                             className="p-2 rounded-full bg-white text-black hover:opacity-90 transition-opacity"
                             >
                             <Send size={18} />
                             </button>
                        ) : (
                             <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors">
                                 <AudioWaveform size={20} />
                             </button>
                        )}
                     </div>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-gray-500">AlpGPT can make mistakes. Check important info.</p>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
