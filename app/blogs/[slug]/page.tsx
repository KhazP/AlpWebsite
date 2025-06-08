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
    "battle-talent-case-study": {
      slug: "battle-talent-case-study",
      titleKey: "casestudy.title",
      excerptKey: "casestudy.excerpt",
      dateKey: "casestudy.date",
      readTimeKey: "casestudy.readTime",
      authorKey: "casestudy.author",
      category: {
        nameKey: "casestudy.category",
        icon: <Brain className="w-3 h-3 mr-1" />,
        color: "purple",
      },
      tags: [
        {
          nameKey: "casestudy.tag.localization",
          icon: <Brain className="w-3 h-3 mr-1" />,
          color: "purple",
        },
        {
          nameKey: "casestudy.tag.vr",
          icon: <Zap className="w-3 h-3 mr-1" />,
          color: "cyan",
        },
        {
          nameKey: "casestudy.tag.turkish",
          icon: <Shield className="w-3 h-3 mr-1" />,
          color: "green",
        },
      ],
      content: (
        <div className="space-y-8">
          {/* Project Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-400" />
              {t("casestudy.overview.title")}
            </h2>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {t("casestudy.overview.project")}:
                    </strong>{" "}
                    {t("casestudy.overview.project.value")}
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {t("casestudy.overview.client")}:
                    </strong>{" "}
                    {t("casestudy.overview.client.value")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {t("casestudy.overview.platform")}:
                    </strong>{" "}
                    {t("casestudy.overview.platform.value")}
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {t("casestudy.overview.timeline")}:
                    </strong>{" "}
                    {t("casestudy.overview.timeline.value")}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                <strong className="text-white">
                  {t("casestudy.overview.volume")}:
                </strong>{" "}
                {t("casestudy.overview.volume.value")}
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {t("casestudy.intro.title")}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {t("casestudy.intro.content")}
            </p>
          </div>

          {/* The Challenge */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              {t("casestudy.challenge.title")}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {t("casestudy.challenge.intro")}
            </p>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-300 mb-2">
                  {t("casestudy.challenge.indirect.title")}
                </h3>
                <p className="text-sm text-gray-300">
                  {t("casestudy.challenge.indirect.content")}
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-orange-300 mb-2">
                  {t("casestudy.challenge.tooling.title")}
                </h3>
                <p className="text-sm text-gray-300">
                  {t("casestudy.challenge.tooling.content")}
                </p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-300 mb-2">
                  {t("casestudy.challenge.terminology.title")}
                </h3>
                <p className="text-sm text-gray-300">
                  {t("casestudy.challenge.terminology.content")}
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">
                  {t("casestudy.challenge.testing.title")}
                </h3>
                <p className="text-sm text-gray-300">
                  {t("casestudy.challenge.testing.content")}
                </p>
              </div>
            </div>
          </div>

          {/* Process & Solution */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="w-6 h-6 text-cyan-400" />
              {t("casestudy.process.title")}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {t("casestudy.process.intro")}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-cyan-300 mb-2">
                  {t("casestudy.process.research.title")}
                </h3>
                <p className="text-sm text-gray-300">
                  {t("casestudy.process.research.content")}
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-green-300 mb-2">
                  {t("casestudy.process.glossary.title")}
                </h3>
                <p className="text-sm text-gray-300">
                  {t("casestudy.process.glossary.content")}
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-purple-300 mb-2">
                  {t("casestudy.process.lqa.title")}
                </h3>
                <p className="text-sm text-gray-300">
                  {t("casestudy.process.lqa.content")}
                </p>
              </div>
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-pink-300 mb-2">
                  {t("casestudy.process.hybrid.title")}
                </h3>
                <p className="text-sm text-gray-300">
                  {t("casestudy.process.hybrid.content")}
                </p>
              </div>
            </div>
          </div>

          {/* Results & Impact */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-400" />
              {t("casestudy.results.title")}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {t("casestudy.results.intro")}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-green-300">
                    {t("casestudy.results.accessibility.title")}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t("casestudy.results.accessibility.content")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-cyan-300">
                    {t("casestudy.results.relationship.title")}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t("casestudy.results.relationship.content")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-purple-300">
                    {t("casestudy.results.career.title")}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t("casestudy.results.career.content")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-yellow-300">
                    {t("casestudy.results.foundation.title")}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t("casestudy.results.foundation.content")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {t("casestudy.conclusion.title")}
            </h2>
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-lg p-6">
              <p className="text-gray-300 leading-relaxed">
                {t("casestudy.conclusion.content")}
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {t("casestudy.metrics.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-300">
                  14,700+
                </div>
                <div className="text-sm text-gray-300">
                  {t("casestudy.metrics.words")}
                </div>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-300">
                  4+ {t("casestudy.metrics.years.short")}
                </div>
                <div className="text-sm text-gray-300">
                  {t("casestudy.metrics.ongoing")}
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-300">84</div>
                <div className="text-sm text-gray-300">
                  {t("casestudy.metrics.players")}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
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
            <p className="text-gray-300 leading-relaxed">This blog post is currently in development.</p>
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
            <p className="text-gray-300 leading-relaxed">This blog post is currently in development.</p>
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
                className={`bg-${post.category.color}-500/20 text-${post.category.color}-300 border-${post.category.color}-500/30 self-start mb-4`}
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
                    className={`bg-${tag.color}-900/20 text-${tag.color}-300 border-${tag.color}-500/40`}
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
