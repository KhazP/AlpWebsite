import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { Open_Sans, Poppins } from '@next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = 'https://alpyalay.org'; // Define site URL for absolute paths

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Important for resolving relative asset paths in OG images etc.
  title: {
    default: 'Alp Yalay | Translator & Localizer',
    template: '%s | Alp Yalay',
  },
  description: 'Alp Yalay: Translator & Localizer specializing in game localization, and technical translation. Bridging language and technology.',
  keywords: ['Alp Yalay', 'translator', 'localizer', 'developer', 'game localization', 'technical translation', 'software localization', 'website localization', 'Turkish translation', 'çevirmen', 'yerelleştirme', 'oyun yerelleştirme'],
  authors: [{ name: 'Alp Yalay', url: siteUrl }],
  creator: 'Alp Yalay',
  manifest: '/manifest.json', // Example, if you add a manifest later
  icons: {
    icon: '/Assets/alplogo.webp', // Path relative to /public
    apple: '/Assets/alplogo.webp',
  },
  openGraph: {
    title: 'Alp Yalay | Translator & Localizer',
    description: 'Alp Yalay: Translator & Localizer specializing in game localization, technical translation, and Python development. Bridging language and technology.',
    url: siteUrl,
    siteName: 'Alp Yalay Portfolio',
    images: [
      {
        url: '/Assets/alpface.webp', // Path relative to /public, Next.js will make it absolute with metadataBase
        width: 300,
        height: 300,
        alt: 'Alp Yalay Profile Picture',
      },
    ],
    locale: 'en_US', // Default locale
    type: 'website',
  },
  // For alternate languages (if you set up different locales in Next.js routing later)
  // alternates: {
  //   languages: {
  //     'en-US': 'https://alpyalay.org/en',
  //     'tr-TR': 'https://alpyalay.org/tr',
  //   },
  // },
  // Add other global metadata like robots, verification tags if needed
  // robots: { index: true, follow: true },
};

const jsonLdProfilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Alp Yalay",
    "url": siteUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": siteUrl
    },
    "jobTitle": "Translator & Localizer",
    "description": "Passionate translator and localizer from Turkey specializing in game localization and technical translation, bridging linguistic expertise with technical knowledge.",
    "image": `${siteUrl}/Assets/alpface.webp`, // Absolute URL
    "email": "contact@alpyalay.org",
    "knowsLanguage": ["en-US", "tr-TR"],
    "workLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Istanbul",
        "addressRegion": "Istanbul",
        "addressCountry": "TR"
      }
    },
    "worksFor": {
        "@type": "Organization",
        "name": "Self-Employed/Freelance"
    },
    "sameAs": [
      "https://github.com/KhazP",
      "https://www.linkedin.com/in/alp-yalay/" // Corrected LinkedIn URL
    ],
    "knowsAbout": ["Translation", "Localization", "Game Localization", "Technical Translation", "Python"],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Izmir University of Economics"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Istanbul",
      "addressRegion": "Istanbul",
      "addressCountry": "TR"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Translation Services",
          "description": "Professional translation between Turkish and English, specializing in technical and legal content."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Game Localization",
          "description": "Comprehensive localization services for video games, ensuring cultural relevance and linguistic accuracy for Turkish audiences."
        }
      }
    ]
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${poppins.variable}`}>
      <head> {/* You can add <link rel="me" href="https://mastodon.social/@alpyalay"> here if not in metadata */}
         <link rel="me" href="https://mastodon.social/@alpyalay" />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main className="pt-navbar">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <Script
          id="json-ld-profilepage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfilePage) }}
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
          strategy="lazyOnload"
          defer
        />
         {/* Google Analytics Script - ensure G-4J01ZWL5BJ is your correct ID */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4J01ZWL5BJ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4J01ZWL5BJ');
          `}
        </Script>
      </body>
    </html>
  );
}
