"use client"

import { useEffect, useRef } from "react"

export default function ScrollAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Initialize the Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            // Once the animation has played, we can stop observing this element
            observerRef.current?.unobserve(entry.target)
            
            // Ensure the element stays visible even if it goes out of view
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "translateY(0)";
            }, 1000);
          }
        })
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: "0px 0px -100px 0px", // Adjust the trigger point (negative value means it triggers before the element is fully in view)
      },
    )

    // Get all elements with the fade-in-up class
    const fadeElements = document.querySelectorAll(".fade-in-up")

    // Observe each element
    fadeElements.forEach((element) => {
      observerRef.current?.observe(element)
    })

    // Cleanup
    return () => {
      if (observerRef.current) {
        fadeElements.forEach((element) => {
          observerRef.current?.unobserve(element)
        })
      }
    }
  }, [])

  return null
}
