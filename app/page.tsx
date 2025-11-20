"use client"

import { useEffect, useState } from "react"
import FloatingSidebar from "@/components/floating-sidebar"
import HeroSectionNew from "@/components/hero-section-new"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import LatestBlogsSection from "@/components/latest-blogs-section"
import AIChatSection from "@/components/ai-chat-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ScrollAnimations from "@/components/scroll-animations"
import GlobalBackground from "@/components/global-background"
import SectionIndicators from "@/components/section-indicators"

let hasInitialLoadCompleted = false

export default function Home() {
  // Initialize to true immediately so content is always rendered behind the loader
  const [isLoaded, setIsLoaded] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true)

    // Preload the avatar image
    const avatarImage = new Image()
    avatarImage.src = "/images/alp-avatar.webp"
    avatarImage.onload = () => {
      console.log("Avatar image loaded")
    }

    // We don't need the timer for isLoaded anymore as we want it immediate
    // but we keep the variable for compatibility if needed later
    hasInitialLoadCompleted = true


    return () => {
      // No cleanup needed
    }
  }, [])

  // Don't render anything during SSR to avoid hydration issues
  if (!isClient) {
    return <div className="min-h-screen bg-[#0a0a0f]"></div>
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <GlobalBackground />
      {isLoaded && (
        <>
          <FloatingSidebar />
          <SectionIndicators />
          <HeroSectionNew />
          <AboutSection />
          <ProjectsSection />
          <AIChatSection />
          <LatestBlogsSection />
          <ContactSection />
          <Footer />
          <ScrollAnimations />
        </>
      )}
    </main>
  )
}
