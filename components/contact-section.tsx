"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type FormData = {
  name: string
  email: string
  message: string
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

export default function ContactSection() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })

  // Form errors state
  const [errors, setErrors] = useState<FormErrors>({})

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t("contact.form.error.name.required")
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t("contact.form.error.name.length")
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t("contact.form.error.email.required")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.form.error.email.invalid")
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t("contact.form.error.message.required")
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contact.form.error.message.length")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form before submission
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Get the form element and submit it to Web3Forms
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsSubmitted(true)
          // Reset form
          setFormData({
            name: "",
            email: "",
            message: "",
          })
        } else {
          // Show error if submission fails
          alert("Something went wrong. Please try again.")
        }
      })
      .catch((err) => {
        console.error("Error submitting form:", err)
        alert("Something went wrong. Please try again.")
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(var(--primary),0.1),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {t("contact.title").split(" ")[0]} {t("contact.title").split(" ")[1]}{" "}
            <span className="text-gradient">{t("contact.title").split(" ")[2]}</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">{t("contact.email")}</h3>
                <p className="text-gray-400">alpyalay@gmail.com</p>
              </div>
            </div>

            <div className="glass p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-secondary/20">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">{t("contact.phone")}</h3>
                <p className="text-gray-400">+90 555 123 4567</p>
              </div>
            </div>

            <div className="glass p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-accent/20">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">{t("contact.location")}</h3>
                <p className="text-gray-400">Istanbul, Turkey</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="neomorphic p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{t("contact.form.success.title")}</h3>
                  <p className="text-gray-300">{t("contact.form.success.message")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Web3Forms Required Fields */}
                  <input type="hidden" name="access_key" value="f592ab44-0b05-47b0-919b-4b2b62efe706" />
                  <input type="hidden" name="subject" value="New Contact Form Submission - Translation Services" />
                  <input type="hidden" name="from_name" value="Alp Yalay Portfolio" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-card/50 border ${errors.name ? "border-red-500" : "border-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder={t("contact.form.name.placeholder")}
                    />
                    {errors.name && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-card/50 border ${errors.email ? "border-red-500" : "border-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder={t("contact.form.email.placeholder")}
                    />
                    {errors.email && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 bg-card/50 border ${errors.message ? "border-red-500" : "border-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none`}
                      placeholder={t("contact.form.message.placeholder")}
                    ></textarea>
                    {errors.message && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glass px-6 py-3 rounded-lg font-medium border border-primary/20 bg-primary/10 text-white hover:bg-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-scale"
                  >
                    {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
