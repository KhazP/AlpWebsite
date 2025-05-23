'use client'; // This directive is essential for components using hooks like useState, useEffect, usePathname

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext'; // Ensure this path is correct

// Define the structure for navigation links
interface NavLinkItem {
  href: string;
  en: string;
  tr: string;
}

const navLinks: NavLinkItem[] = [
  { href: '#home', en: 'Home', tr: 'Ana Sayfa' },
  { href: '#about', en: 'About', tr: 'Hakkımda' },
  { href: '#experience', en: 'Experience', tr: 'Deneyim' },
  { href: '#translations', en: 'Translations', tr: 'Çeviriler' },
  { href: '#web-dev-projects', en: 'Projects', tr: 'Projelerim' }, // Combined projects
  { href: '#contact', en: 'Contact', tr: 'İletişim' },
];

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname(); // Gets the current path, e.g., '/' or '/about'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll handler for navbar style changes
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => { // Corrected function name
    setIsMobileMenuOpen(false);
  }

  // Determine active section based on pathname or fragment
  // For a single-page app structure with hash links, window.location.hash might be more reliable if using Next.js Link for scrolling.
  // However, for true page navigation, pathname is correct. We'll assume section IDs match page routes or hashes.
  let activeSection = 'home'; // Default
  if (typeof window !== 'undefined') {
    const hash = window.location.hash;
    if (hash) {
      activeSection = hash.substring(1);
    } else {
      // Fallback for pages that might not use hashes directly in URL but are navigated to
      // This part needs careful handling depending on how routing vs. scrolling is implemented
      const pathSegments = pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        activeSection = pathSegments[pathSegments.length - 1];
      }
    }
  }
  // More robust active link detection based on scroll will be handled by an IntersectionObserver approach later if needed,
  // similar to the original scripts.js, for sections on a single page.
  // For now, this handles basic cases and direct hash links.

  const NavLinksComponent: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => (
    <ul className={`flex ${isMobile ? 'flex-col space-y-4 items-center' : 'flex-row space-x-lg'}`}>
      {navLinks.map((link) => {
        // Check if the current link's href matches the active section or the pathname
        // For single page app with sections, href will be like "#about".
        // For multi-page app, href could be "/about".
        const isActive = link.href === `#${activeSection}` || link.href === pathname; // Corrected template literal

        return (
          <li key={link.href}>
            <Link href={link.href}
                  className={`font-main font-medium pb-1 transition-colors duration-fast
                              ${isActive
                                ? 'text-text-primary border-b-2 border-primary-DEFAULT'
                                : 'text-text-secondary hover:text-text-primary'}
                              ${isMobile ? 'text-lg' : 'text-base'}`}
                  onClick={isMobile ? closeMobileMenu : undefined} // Close mobile menu on link click
                  aria-current={isActive ? 'page' : undefined}>
              {t(link.en, link.tr)}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const LanguageSwitcherComponent: React.FC<{isMobile?: boolean}> = ({ isMobile = false}) => (
    <div className={`flex gap-xs ${isMobile ? 'mt-4' : ''}`}>
      <button
        onClick={() => setLanguage('en')}
        className={`px-sm py-xs text-xs font-semibold rounded-sm border
                    ${language === 'en'
                      ? 'bg-primary-DEFAULT text-text-on-dark border-primary-DEFAULT'
                      : 'bg-transparent text-text-on-dark border-text-on-dark/70 hover:bg-secondary hover:border-primary-dark'}`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('tr')}
        className={`px-sm py-xs text-xs font-semibold rounded-sm border
                    ${language === 'tr'
                      ? 'bg-primary-DEFAULT text-text-on-dark border-primary-DEFAULT'
                      : 'bg-transparent text-text-on-dark border-text-on-dark/70 hover:bg-secondary hover:border-primary-dark'}`}
        aria-pressed={language === 'tr'}
      >
        TR
      </button>
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-medium ease-in-out border-b
                   ${isScrolled ? 'h-[calc(theme(height.navbar)-10px)] bg-background-DEFAULT/95 shadow-lg border-border' 
                                : 'h-navbar bg-background-DEFAULT/90 shadow-md border-transparent'}`}>
      <div className="container mx-auto px-md h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-sm" onClick={isMobileMenuOpen ? closeMobileMenu : undefined}>
          <Image
            src="/Assets/alplogo.webp" // Assuming logo is in public/Assets
            alt="Alp Yalay Logo"
            width={35} // Original width 40, slightly smaller based on styles.css
            height={35} // Original height 40
            className={`rounded-full transition-transform duration-medium ${isScrolled ? 'scale-90' : ''}`}
          />
          <span className="font-heading text-xl font-bold text-text-primary tracking-tight">
            {t('Alp Yalay', 'Alp Yalay')}
          </span>
        </Link>

        {/* Desktop Navigation & Language Switcher */}
        <div className="hidden md:flex items-center space-x-lg">
          <NavLinksComponent />
          <LanguageSwitcherComponent />
        </div>

        {/* Mobile Hamburger Button & Language Switcher (Order reversed for visual layout) */}
        <div className="md:hidden flex items-center gap-md">
          <LanguageSwitcherComponent />
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-text-primary hover:bg-background-alt focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={t('Toggle menu', 'Menüyü değiştir')}
          >
            <span className="sr-only">{t('Open main menu', 'Ana menüyü aç')}</span>
            {/* Icon: 3 bars when closed, X when open */}
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-text-primary transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background-DEFAULT/95 shadow-lg pb-lg pt-md" id="mobile-menu">
          <div className="container mx-auto px-md flex flex-col items-center">
            <NavLinksComponent isMobile={true} />
            {/* Mobile language switcher is already outside, but could be duplicated here if design requires */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
