"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Brain, Zap, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: {
    name: string
    icon: React.ReactNode
    color: string
  }
}

export default function LatestBlogsSection() {
  const { t } = useLanguage()

  const blogPosts: BlogPost[] = [
    {
      id: "battle-talent-case-study",
      slug: "case-studies/battle-talent", // MODIFIED SLUG TO POINT TO NEW PATH
      title: t("blog.battle.title") || "Case Study: Bringing Battle Talent VR to Turkish Players",
      excerpt:
        t("blog.battle.excerpt") ||
        "A comprehensive look at the ongoing Turkish localization project for Battle Talent VR game, showcasing problem-solving in challenging localization environments.",
      date: t("blog.battle.date") || "January 2021 - Present",
      readTime: t("blog.battle.readTime") || "12 min",
      category: {
        name: t("blog.category.casestudy") || "Case Study",
        icon: <Brain className="w-3 h-3 mr-1" />,
        color: "purple",
      },
    },
    {
      id: "automation-2025",
      slug: "automation-trends-2025",
      title: t("blog.automation.title") || "TBD - Blog Post Coming Soon",
      excerpt:
        t("blog.automation.excerpt") ||
        "This blog post is currently in development. Stay tuned for insights on emerging automation technologies.",
      date: t("blog.automation.date") || "Coming Soon",
      readTime: t("blog.automation.readTime") || "TBD",
      category: {
        name: t("blog.category.automation") || "Automation",
        icon: <Zap className="w-3 h-3 mr-1" />,
        color: "cyan",
      },
    },
    {
      id: "ai-safety",
      slug: "ai-safety-ethics",
      title: t("blog.ai.title") || "TBD - Blog Post Coming Soon",
      excerpt:
        t("blog.ai.excerpt") ||
        "This blog post is currently in development. Stay tuned for discussions on AI ethics and safety.",
      date: t("blog.ai.date") || "Coming Soon",
      readTime: t("blog.ai.readTime") || "TBD",
      category: {
        name: t("blog.category.safety") || "AI Safety",
        icon: <Shield className="w-3 h-3 mr-1" />,
        color: "red",
      },
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("blog.title")} <span className="text-gradient">{t("blog.insights")}</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{t("blog.subtitle")}</p>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Link href={`/${post.slug}`}> {/* MODIFIED to ensure leading slash for correct path generation */}
                <Card className="glass h-full flex flex-col cursor-pointer transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Badge
                      variant="secondary"
                      className={`bg-${post.category.color}-500/20 text-${post.category.color}-300 border-${post.category.color}-500/30 self-start mb-4`}
                    >
                      {post.category.icon}
                      {post.category.name}
                    </Badge>

                    <h3 className="text-xl font-bold mb-3 text-white">{post.title}</h3>

                    <p className="text-gray-400 mb-6 flex-grow">{post.excerpt}</p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover p-0">
                        {t("blog.read")} <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
