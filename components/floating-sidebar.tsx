"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, MessageCircle, Menu, X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "./language-switcher"

// Update the navItems to use translation keys
const navItems = [
  { name: "nav.home", href: "#home", icon: Home },
  { name: "nav.about", href: "#about", icon: User },
  { name: "nav.projects", href: "#projects", icon: Briefcase },
  { name: "nav.experience", href: "#ai-chat", icon: MessageCircle },
  { name: "nav.contact", href: "#contact", icon: MessageCircle },
]

export default function FloatingSidebar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Increase threshold to hide nav initially
      setScrolled(scrollPosition > 300)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Navigation - Only visible after scrolling */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="hidden lg:block fixed z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.nav
              key="sidenav"
              initial={{
                x: -100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: -100,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="fixed left-6 glass backdrop-blur-xl rounded-2xl border border-white/10 p-4"
              style={{
                background: "rgba(10, 10, 15, 0.9)",
                top: "35%",
                transform: "translateY(50%)",
                zIndex: 50,
              }}
            >
              <div className="flex flex-col space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-center mb-2"
                >
                  <Link href="#home" className="text-lg font-heading font-bold">
                    <span className="text-gradient">AY</span>
                  </Link>
                </motion.div>

                {navItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.name}
                      className="relative group"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 relative ${
                          activeSection === item.href.substring(1)
                            ? "bg-primary/20 text-primary"
                            : "text-gray-400 hover:text-white hover:bg-white/10"
                        }`}
                        title={t(item.name)}
                      >
                        <Icon size={20} />
                        {activeSection === item.href.substring(1) && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl border border-primary/30"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </Link>

                      {/* Tooltip */}
                      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-card/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10 translate-x-2 group-hover:translate-x-0">
                        {t(item.name)}
                      </div>
                    </motion.div>
                  )
                })}

                {/* Language switcher in sidebar */}
                <div className="pt-2 border-t border-white/10">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="lg:hidden fixed top-4 right-4 z-50 flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-12 h-12 glass backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center text-white"
              style={{ background: "rgba(10, 10, 15, 0.9)" }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-16 right-0 glass backdrop-blur-xl rounded-2xl border border-white/10 p-4 min-w-[200px]"
                  style={{ background: "rgba(10, 10, 15, 0.95)" }}
                >
                  <div className="flex flex-col space-y-3">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                            activeSection === item.href.substring(1)
                              ? "bg-primary/20 text-primary"
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <Icon size={18} />
                          <span className="text-sm font-medium">{t(item.name)}</span>
                        </Link>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
