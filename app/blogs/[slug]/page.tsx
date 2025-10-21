"use client"

export const runtime = "edge"

import type React from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Brain,
  Zap,
  Shield,
  AlertTriangle,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const categoryBadgeColorClasses: Record<string, string> = {
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  red: "bg-red-500/20 text-red-300 border-red-500/30",
  default: "bg-slate-500/20 text-slate-300 border-slate-500/30",
}

const tagBadgeColorClasses: Record<string, string> = {
  purple: "bg-purple-900/20 text-purple-300 border-purple-500/40",
  cyan: "bg-cyan-900/20 text-cyan-300 border-cyan-500/40",
  red: "bg-red-900/20 text-red-300 border-red-500/40",
  default: "bg-slate-900/20 text-slate-300 border-slate-500/40",
}

interface BlogPost {
  slug: string
  titleKey: string
  excerptKey: string
  content: React.ReactNode
  dateKey: string
  readTimeKey: string
  authorKey: string
  category: {
    nameKey: string
    icon: React.ReactNode
    color: string
  }
  tags: Array<{
    nameKey: string
    icon: React.ReactNode
    color: string
  }>
}

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const { t } = useLanguage()

  const blogPosts: Record<string, BlogPost> = {
    "automation-trends-2025": {
      slug: "automation-trends-2025",
      titleKey: "blog.automation.title",
      excerptKey: "blog.automation.excerpt",
      dateKey: "blog.automation.date",
      readTimeKey: "blog.automation.readTime",
      authorKey: "casestudy.author",
      category: {
        nameKey: "blog.category.automation",
        icon: <Zap className="w-3 h-3 mr-1" />,
        color: "cyan",
      },
      tags: [
        {
          nameKey: "blog.category.automation",
          icon: <Zap className="w-3 h-3 mr-1" />,
          color: "cyan",
        },
      ],
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
            <p className="text-gray-300 leading-relaxed">
              This blog post is currently in development.
            </p>
          </div>
        </div>
      ),
    },
    "ai-safety-ethics": {
      slug: "ai-safety-ethics",
      titleKey: "blog.ai.title",
      excerptKey: "blog.ai.excerpt",
      dateKey: "blog.ai.date",
      readTimeKey: "blog.ai.readTime",
      authorKey: "casestudy.author",
      category: {
        nameKey: "blog.category.safety",
        icon: <Shield className="w-3 h-3 mr-1" />,
        color: "red",
      },
      tags: [
        {
          nameKey: "blog.category.safety",
          icon: <Shield className="w-3 h-3 mr-1" />,
          color: "red",
        },
      ],
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
            <p className="text-gray-300 leading-relaxed">
              This blog post is currently in development.
            </p>
          </div>
        </div>
      ),
    },
  }

  const post = blogPosts[slug]

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("blog.notfound.title")}</h1>
        <p>{t("blog.notfound.message")}</p>
        <Button asChild className="mt-6">
          <Link href="/">{t("blog.back")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 -z-10" />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12 md:py-20"
      >
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("blog.back")}
            </Link>
          </Button>

          <article>
            <header className="mb-12">
              <Badge
                variant="secondary"
                className={`${categoryBadgeColorClasses[post.category.color] ?? categoryBadgeColorClasses.default} self-start mb-4`}
              >
                {post.category.icon}
                {t(post.category.nameKey)}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {t(post.titleKey)}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{t(post.dateKey)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{t(post.readTimeKey)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{t(post.authorKey)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag.nameKey}
                    variant="outline"
                    className={tagBadgeColorClasses[tag.color] ?? tagBadgeColorClasses.default}
                  >
                    {tag.icon}
                    {t(tag.nameKey)}
                  </Badge>
                ))}
              </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none">
              {post.content}
            </div>
          </article>

          <footer className="mt-16 pt-8 border-t border-gray-800">
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                {t("casestudy.cta.title")}
              </h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                {t("casestudy.cta.description")}
              </p>
              <Button asChild size="lg">
                <Link href="/#contact">
                  {t("casestudy.cta.button")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  )
}
