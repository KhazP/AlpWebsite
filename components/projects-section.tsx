"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, type PanInfo, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Gamepad2, Globe, Code, FileText, Bot } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

const projects = [
  {
    title: "Heroes of Hammerwatch II",
    description: {
      en: "Complete Turkish localization for this action roguelite, employing a hybrid approach that combines traditional translation with AI-Assisted post-editing.",
      tr: "Bu aksiyon roguelite oyunu için tam Türkçe lokalizasyon, geleneksel çeviri ile AI destekli düzenlemeyi birleştiren hibrit bir yaklaşım kullanarak.",
    },
    longDescription: {
      en: "A fan translation project for Heroes of Hammerwatch II, providing Turkish players with a fully localized gaming experience. The translation process involved manual translation followed by AI-assisted editing for terminology management and consistency.",
      tr: "Heroes of Hammerwatch II için bir fan çeviri projesi, Türk oyunculara tamamen yerelleştirilmiş bir oyun deneyimi sunuyor. Çeviri süreci, terminoloji yönetimi ve tutarlılık için AI destekli düzenleme ile takip edilen manuel çeviri içeriyordu.",
    },
    tags: {
      en: ["Game Localization", "Turkish", "Fan Translation", "AI-Assisted"],
      tr: ["Oyun Lokalizasyonu", "Türkçe", "Fan Çevirisi", "AI Destekli"],
    },
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/heroesofhammerwatch2-rcAcOfJBGuCpqeOYmPvCz7Z1QIxnv4.webp",
    links: {
      steam: "https://steamcommunity.com/app/1781750/workshop/",
      github: "#",
    },
    features: {
      en: ["Complete UI Translation", "In-game Text", "Item Descriptions", "Character Dialogues"],
      tr: ["Tam UI Çevirisi", "Oyun İçi Metin", "Eşya Açıklamaları", "Karakter Diyalogları"],
    },
    color: "from-blue-500/20 to-purple-500/20",
    hasSteem: true,
  },
  {
    title: "Battle Talent",
    description: {
      en: "Official Turkish translation for this physics-based VR sword-fighting game, providing professional localization services to ensure the game is accessible to Turkish-speaking players.",
      tr: "Bu fizik tabanlı VR kılıç dövüşü oyunu için resmi Türkçe çeviri, oyunun Türkçe konuşan oyunculara erişilebilir olmasını sağlamak için profesyonel lokalizasyon hizmetleri sunuyor.",
    },
    longDescription: {
      en: "As the official translator for Battle Talent, I provided comprehensive Turkish localization for this popular VR game. The project involved translating all game elements including UI, tutorials, weapon descriptions, and in-game text while maintaining the game's tone and style.",
      tr: "Battle Talent'ın resmi çevirmeni olarak, bu popüler VR oyunu için kapsamlı Türkçe lokalizasyon sağladım. Proje, oyunun tonunu ve stilini korurken UI, öğreticiler, silah açıklamaları ve oyun içi metinler dahil tüm oyun öğelerini çevirmeyi içeriyordu.",
    },
    tags: {
      en: ["Official Translation", "VR Game", "Turkish", "Steam"],
      tr: ["Resmi Çeviri", "VR Oyunu", "Türkçe", "Steam"],
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/battletalent-7yy7EnRPv5pFAR4meq34EAWQcDhzEO.webp",
    links: {
      steam: "https://store.steampowered.com/app/1325900/Battle_Talent/",
      caseStudy: "https://alpyalay.org/CaseStudyPage/battle-talent-case-study.html",
    },
    features: {
      en: ["UI Translation", "Tutorial Content", "Weapon Descriptions", "Game Mechanics"],
      tr: ["UI Çevirisi", "Öğretici İçerik", "Silah Açıklamaları", "Oyun Mekanikleri"],
    },
    color: "from-purple-500/20 to-blue-500/20",
    hasSteem: true,
  },
  {
    title: "Localization Comparison Tool",
    description: {
      en: "A Python-based application built with the Flet framework that streamlines the comparison of localization files, helping identify added and removed strings.",
      tr: "Flet framework ile oluşturulmuş Python tabanlı bir uygulama, lokalizasyon dosyalarının karşılaştırılmasını kolaylaştırır ve eklenen ve kaldırılan dizeleri belirlemeye yardımcı olur.",
    },
    longDescription: {
      en: "This tool helps translators and developers quickly identify added, removed, and changed strings in different file formats (CSV, LANG, XML, JSON). It's particularly useful for tracking changes between game updates or different versions of translated content.",
      tr: "Bu araç, çevirmenlerin ve geliştiricilerin farklı dosya formatlarında (CSV, LANG, XML, JSON) eklenen, kaldırılan ve değiştirilen dizeleri hızlıca belirlemesine yardımcı olur. Özellikle oyun güncellemeleri veya çevrilmiş içeriğin farklı sürümleri arasındaki değişiklikleri takip etmek için kullanışlıdır.",
    },
    tags: {
      en: ["Python", "Flet", "Open Source", "Utility"],
      tr: ["Python", "Flet", "Açık Kaynak", "Yardımcı Program"],
    },
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/localizationappthumbnail-8kRQaMAT9L3dWIMJ9ou7ImnBsLLhDY.webp",
    links: {
      github: "https://github.com/KhazP/Localization-Comparison-Tool",
    },
    features: {
      en: ["File Comparison", "Multiple Format Support", "String Tracking", "Change Visualization"],
      tr: ["Dosya Karşılaştırma", "Çoklu Format Desteği", "Dize Takibi", "Değişiklik Görselleştirme"],
    },
    color: "from-blue-500/20 to-cyan-500/20",
    hasSteem: false,
  },
  {
    title: "F1 Regulations Assistant",
    description: {
      en: "A specialized AI assistant that helps users understand F1 regulations, covering the 2024, 2025, and 2026 rulesets with official FIA documentation.",
      tr: "Kullanıcıların F1 yönetmeliklerini anlamalarına yardımcı olan özelleşmiş bir AI asistanı, resmi FIA belgeleri ile 2024, 2025 ve 2026 kural setlerini kapsıyor.",
    },
    longDescription: {
      en: "This AI assistant provides clear, concise explanations about Formula 1 regulations based on official FIA documentation. It can analyze images to verify regulation compliance and answer detailed questions about technical and sporting regulations.",
      tr: "Bu AI asistanı, resmi FIA belgelerine dayalı olarak Formula 1 yönetmelikleri hakkında açık ve öz açıklamalar sağlar. Yönetmelik uyumluluğunu doğrulamak için görüntüleri analiz edebilir ve teknik ve sportif yönetmelikler hakkında ayrıntılı soruları yanıtlayabilir.",
    },
    tags: {
      en: ["AI", "ChatGPT", "Gemini", "Formula 1"],
      tr: ["AI", "ChatGPT", "Gemini", "Formula 1"],
    },
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f1regassistantthumbnail-LCj9bFRAZrDLggQopLJDuk6V2iaZXT.webp",
    links: {
      chatgpt: "https://chatgpt.com/g/g-eaNLvlHI7-f1-regulations-assistant",
      gemini: "https://gemini.google.com/gem/7016463ffba5",
    },
    features: {
      en: ["Regulation Explanations", "Image Analysis", "Technical Documentation", "Rule Compliance"],
      tr: ["Yönetmelik Açıklamaları", "Görüntü Analizi", "Teknik Dokümantasyon", "Kural Uyumluluğu"],
    },
    color: "from-purple-500/20 to-pink-500/20",
    hasSteem: false,
  },
  {
    title: "AutoTidy",
    description: {
      en: "A utility application that automatically organizes computer folders by moving old files or files with specific names into organized 'Cleanup' folders sorted by date.",
      tr: "Eski dosyaları veya belirli isimlerdeki dosyaları tarihe göre sıralanmış düzenli 'Temizlik' klasörlerine taşıyarak bilgisayar klasörlerini otomatik olarak düzenleyen bir yardımcı program uygulaması.",
    },
    longDescription: {
      en: "AutoTidy is a background utility that keeps your computer organized by automatically sorting files in specified folders (like Downloads or Screenshots) into dated cleanup folders. It helps maintain a clean workspace without manual intervention.",
      tr: "AutoTidy, belirtilen klasörlerdeki (İndirilenler veya Ekran Görüntüleri gibi) dosyaları otomatik olarak tarihli temizlik klasörlerine sıralayarak bilgisayarınızı düzenli tutan bir arka plan yardımcı programıdır. Manuel müdahale olmadan temiz bir çalışma alanı korunmasına yardımcı olur.",
    },
    tags: {
      en: ["Python", "PyQt6", "Automation", "Utility"],
      tr: ["Python", "PyQt6", "Otomasyon", "Yardımcı Program"],
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autotidy-0yxdgIas5qoZgrM9ILXQ0TSmwmlCDV.webp",
    links: {
      github: "https://github.com/KhazP/AutoTidy",
    },
    features: {
      en: ["Automatic Organization", "Background Processing", "Date-based Sorting", "Custom Rules"],
      tr: ["Otomatik Düzenleme", "Arka Plan İşleme", "Tarih Tabanlı Sıralama", "Özel Kurallar"],
    },
    color: "from-cyan-500/20 to-emerald-500/20",
    hasSteem: false,
  },
]

export default function ProjectsSection() {
  const { t, language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1, fallback: true })
  const controls = useAnimation()

  // State for carousel logic
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  // Variants for sliding animations
  const slideVariants = {
    enter: (direction: number) => {
      if (direction === 0) return { opacity: 1, scale: 1 } // Instant visibility for morph
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => {
      if (direction === 0) return { opacity: 0, scale: 1, transition: { duration: 0.2 } }
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: {
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }
      }
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const nextProject = () => {
    setDirection(1)
    setIsExpanded(false)
    setTimeout(() => setActiveIndex((prev) => (prev + 1) % projects.length), 10)
  }

  const prevProject = () => {
    setDirection(-1)
    setIsExpanded(false)
    setTimeout(() => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length), 10)
  }

  const jumpToProject = (index: number) => {
    setDirection(0)
    setIsExpanded(false)
    setActiveIndex(index)
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      nextProject()
    } else if (swipe > swipeConfidenceThreshold) {
      prevProject()
    }
  }

  const getProjectIcon = (index: number) => {
    const icons = [
      <Gamepad2 key="gamepad" className="w-5 h-5 text-white" />,
      <Gamepad2 key="gamepad2" className="w-5 h-5 text-white" />,
      <Code key="code" className="w-5 h-5 text-white" />,
      <Bot key="bot" className="w-5 h-5 text-white" />,
      <FileText key="filetext" className="w-5 h-5 text-white" />,
    ]
    return icons[index] || <Globe className="w-5 h-5 text-white" />
  }

  const renderProjectButtons = (project: any) => {
    const buttons = []

    // Steam button for projects with Steam links
    if (project.links.steam) {
      buttons.push(
        <motion.a
          key="steam"
          href={project.links.steam}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass bg-blue-600/20 hover:bg-blue-600/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          {t("projects.steam")}
        </motion.a>,
      )
    }

    // Case Study button for Battle Talent
    if (project.links.caseStudy) {
      buttons.push(
        <motion.a
          key="casestudy"
          href={project.links.caseStudy}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass hover:bg-card/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={16} />
          {t("projects.casestudy")}
        </motion.a>,
      )
    }

    // GitHub button
    if (project.links.github && project.links.github !== "#") {
      buttons.push(
        <motion.a
          key="github"
          href={project.links.github}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass hover:bg-card/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} />
          {t("projects.github")}
        </motion.a>,
      )
    }

    // ChatGPT and Gemini icons for F1 Regulations Assistant
    if (project.links.chatgpt) {
      buttons.push(
        <motion.a
          key="chatgpt"
          href={project.links.chatgpt}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass bg-green-600/20 hover:bg-green-600/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          target="_blank"
          rel="noopener noreferrer"
          title="ChatGPT"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142-.0852 4.783-2.7582a.7712.7712 0 0 0 .7806 0l5.8428 3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142.0852-4.7735 2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
          </svg>
          {t("projects.chatgpt")}
        </motion.a>,
      )
    }

    if (project.links.gemini) {
      buttons.push(
        <motion.a
          key="gemini"
          href={project.links.gemini}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass bg-blue-600/20 hover:bg-blue-600/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          target="_blank"
          rel="noopener noreferrer"
          title="Gemini"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {t("projects.gemini")}
        </motion.a>,
      )
    }

    return buttons
  }

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(var(--primary),0.1),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
          style={{ opacity: 1 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {t("projects.title").split(" ")[0]}{" "}
            <span className="text-gradient">{t("projects.title").split(" ")[1]}</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="relative" ref={projectsRef}>
          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:flex absolute top-1/2 -left-12 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={prevProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>

          <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={nextProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Project Content with Swipe Support */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={slideVariants}
                className="grid md:grid-cols-2 gap-8 items-center project-card w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: "grabbing" }}
              >
                <div className="order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        {getProjectIcon(activeIndex)}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold">{projects[activeIndex].title}</h3>
                    </div>

                    <motion.p
                      className="text-gray-300"
                      initial={{ height: "auto" }}
                      animate={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded
                        ? typeof projects[activeIndex].longDescription === "object"
                          ? projects[activeIndex].longDescription[language]
                          : projects[activeIndex].longDescription
                        : typeof projects[activeIndex].description === "object"
                          ? projects[activeIndex].description[language]
                          : projects[activeIndex].description}
                    </motion.p>

                    <motion.button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-sm text-primary hover:text-secondary transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {isExpanded ? t("projects.read.less") : t("projects.read.more")}
                    </motion.button>

                    <div className="flex flex-wrap gap-2">
                      {(typeof projects[activeIndex].tags === "object"
                        ? projects[activeIndex].tags[language]
                        : projects[activeIndex].tags
                      ).map((tag) => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full glass border border-primary/20"
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h4 className="text-lg font-medium">{t("projects.features")}</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {(typeof projects[activeIndex].features === "object"
                          ? projects[activeIndex].features[language]
                          : projects[activeIndex].features
                        ).map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                          >
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">{renderProjectButtons(projects[activeIndex])}</div>
                  </motion.div>
                </div>

                <div className="order-1 md:order-2">
                  <motion.div
                    className="gradient-border p-1 rounded-2xl overflow-hidden"
                    layoutId={direction === 0 ? `project-container-${projects[activeIndex].title}` : undefined}
                  >
                    <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${projects[activeIndex].color} p-4`}>
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: 1 }}
                        transition={{ duration: 0.3 }}
                        className="neomorphic overflow-hidden rounded-lg"
                        layoutId={direction === 0 ? `project-image-${projects[activeIndex].title}` : undefined}
                      >
                        <Image
                          src={projects[activeIndex].image || "/placeholder.svg"}
                          alt={projects[activeIndex].title}
                          width={800}
                          height={600}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => jumpToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary w-6" : "bg-gray-600 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="lg:hidden text-center mt-4">
            <p className="text-sm text-gray-400">{t("projects.swipe.hint")}</p>
          </div>
        </div>

        {/* Mobile Navigation Buttons - Positioned Higher */}
        <div className="lg:hidden flex justify-center mt-6 gap-4">
          <motion.button
            onClick={prevProject}
            className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={nextProject}
            className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Additional projects preview */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {projects
            .filter((_, idx) => idx !== activeIndex)
            .slice(0, 3)
            .map((project, idx) => (
              <motion.div
                key={idx}
                className="glass p-5 rounded-xl hover:bg-card/30 transition-all cursor-pointer project-card"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => jumpToProject(projects.findIndex((p) => p.title === project.title))}
                layoutId={`project-container-${project.title}`}
              >
                <motion.div
                  className="h-40 mb-4 overflow-hidden rounded-lg"
                  layoutId={`project-image-${project.title}`}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                  {typeof project.description === "object" ? project.description[language] : project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {(typeof project.tags === "object" ? project.tags[language] : project.tags).slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 border border-primary/20">
                      {tag}
                    </span>
                  ))}
                  {(typeof project.tags === "object" ? project.tags[language] : project.tags).length > 2 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700">
                      +{(typeof project.tags === "object" ? project.tags[language] : project.tags).length - 2}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  )
}
