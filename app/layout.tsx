import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import LoadingScreen from "@/components/loading-screen"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alpyalay.org"),
  title: "Alp Yalay | Translator & Localizer",
  description: "Portfolio of Alp Yalay, Translator & Localizer",
  keywords: ["translator", "localizer", "portfolio", "Alp Yalay"],
  authors: [{ name: "Alp Yalay" }],
  creator: "Alp Yalay",
  icons: {
    icon: "/images/alplogo.webp",
  },
  verification: {
    me: "https://mastodon.social/@alpyalay",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <LoadingScreen />
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4J01ZWL5BJ" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-4J01ZWL5BJ');
          `}
        </Script>
      </body>
    </html>
  )
}
