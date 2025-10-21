"use client"

import { motion } from "framer-motion"
import { Github, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 relative">
      <div className="container mx-auto px-4">
        <div className="glass p-8 rounded-2xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-gradient">Alp Yalay</h3>
              <p className="text-gray-400 mb-4 max-w-xs">{t("footer.description")}</p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/KhazP"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="Github"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/alp-yalay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">{t("footer.links")}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                    {t("nav.home")}
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    {t("nav.about")}
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-400 hover:text-white transition-colors">
                    {t("nav.skills")}
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                    {t("nav.projects")}
                  </a>
                </li>
                <li>
                  <a href="#ai-chat" className="text-gray-400 hover:text-white transition-colors">
                    {t("nav.experience")}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    {t("nav.contact")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">{t("footer.services")}</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">{t("footer.services.translation")}</li>
                <li className="text-gray-400">{t("footer.services.localization")}</li>
                <li className="text-gray-400">{t("footer.services.game")}</li>
                <li className="text-gray-400">{t("footer.services.technical")}</li>
                <li className="text-gray-400">{t("footer.services.transcreation")}</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>
              &copy; {currentYear} Alp Yalay. {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
