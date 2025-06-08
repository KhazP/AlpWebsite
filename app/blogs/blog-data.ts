import type React from "react"
import {
  Brain,
  Zap,
  Shield,
  AlertTriangle,
} from "lucide-react"

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

export const blogPosts: Record<string, BlogPost> = {
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
              {"casestudy.overview.title"}
            </h2>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {"casestudy.overview.project"}:
                    </strong>{" "}
                    {"casestudy.overview.project.value"}
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {"casestudy.overview.client"}:
                    </strong>{" "}
                    {"casestudy.overview.client.value"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {"casestudy.overview.platform"}:
                    </strong>{" "}
                    {"casestudy.overview.platform.value"}
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {"casestudy.overview.timeline"}:
                    </strong>{" "}
                    {"casestudy.overview.timeline.value"}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                <strong className="text-white">
                  {"casestudy.overview.volume"}:
                </strong>{" "}
                {"casestudy.overview.volume.value"}
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {"casestudy.intro.title"}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {"casestudy.intro.content"}
            </p>
          </div>

          {/* The Challenge */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              {"casestudy.challenge.title"}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {"casestudy.challenge.intro"}
            </p>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-300 mb-2">
                  {"casestudy.challenge.indirect.title"}
                </h3>
                <p className="text-sm text-gray-300">
                  {"casestudy.challenge.indirect.content"}
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-orange-300 mb-2">
                  {"casestudy.challenge.tooling.title"}
                </h3>
                <p className="text-sm text-gray-300">
                  {"casestudy.challenge.tooling.content"}
                </p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-300 mb-2">
                  {"casestudy.challenge.terminology.title"}
                </h3>
                <p className="text-sm text-gray-300">
                  {"casestudy.challenge.terminology.content"}
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">
                  {"casestudy.challenge.testing.title"}
                </h3>
                <p className="text-sm text-gray-300">
                  {"casestudy.challenge.testing.content"}
                </p>
              </div>
            </div>
          </div>

          {/* Process & Solution */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="w-6 h-6 text-cyan-400" />
              {"casestudy.process.title"}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {"casestudy.process.intro"}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-cyan-300 mb-2">
                  {"casestudy.process.research.title"}
                </h3>
                <p className="text-sm text-gray-300">
                  {"casestudy.process.research.content"}
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-green-300 mb-2">
                  {"casestudy.process.glossary.title"}
                </h3>
                <p className="text-sm text-gray-300">
                  {"casestudy.process.glossary.content"}
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-purple-300 mb-2">
                  {"casestudy.process.lqa.title"}
                </h3>
                <p className="text-sm text-gray-300">
                  {"casestudy.process.lqa.content"}
                </p>
              </div>
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-pink-300 mb-2">
                  {"casestudy.process.hybrid.title"}
                </h3>
                <p className="text-sm text-gray-300">
                  {"casestudy.process.hybrid.content"}
                </p>
              </div>
            </div>
          </div>

          {/* Results & Impact */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-400" />
              {"casestudy.results.title"}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {"casestudy.results.intro"}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-green-300">
                    {"casestudy.results.accessibility.title"}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {"casestudy.results.accessibility.content"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-cyan-300">
                    {"casestudy.results.engagement.title"}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {"casestudy.results.engagement.content"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-purple-300">
                    {"casestudy.results.feedback.title"}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {"casestudy.results.feedback.content"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {"casestudy.conclusion.title"}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {"casestudy.conclusion.content"}
            </p>
          </div>
        </div>
      ),
    },
  } 