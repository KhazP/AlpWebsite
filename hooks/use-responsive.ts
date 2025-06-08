"use client"

import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xs")
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    // Function to update dimensions
    const updateDimensions = () => {
      const width = window.innerWidth
      setWidth(width)
      setHeight(window.innerHeight)

      // Determine current breakpoint
      if (width >= breakpoints["2xl"]) {
        setBreakpoint("2xl")
      } else if (width >= breakpoints.xl) {
        setBreakpoint("xl")
      } else if (width >= breakpoints.lg) {
        setBreakpoint("lg")
      } else if (width >= breakpoints.md) {
        setBreakpoint("md")
      } else if (width >= breakpoints.sm) {
        setBreakpoint("sm")
      } else {
        setBreakpoint("xs")
      }
    }

    // Set initial dimensions
    updateDimensions()

    // Add event listener
    window.addEventListener("resize", updateDimensions)

    // Clean up
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const isXs = breakpoint === "xs"
  const isSm = breakpoint === "sm"
  const isMd = breakpoint === "md"
  const isLg = breakpoint === "lg"
  const isXl = breakpoint === "xl"
  const is2Xl = breakpoint === "2xl"

  const isMobile = isXs || isSm
  const isTablet = isMd
  const isDesktop = isLg || isXl || is2Xl

  return {
    breakpoint,
    width,
    height,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isMobile,
    isTablet,
    isDesktop,
  }
}
