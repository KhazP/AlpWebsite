'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Define the structure for footer navigation links (same as Navbar for consistency)
interface FooterLinkItem {
  href: string;
  en: string;
  tr: string;
}

const footerLinks: FooterLinkItem[] = [
  { href: '#home', en: 'Home', tr: 'Ana Sayfa' },
  { href: '#about', en: 'About', tr: 'Hakkımda' },
  { href: '#experience', en: 'Experience', tr: 'Deneyim' },
  { href: '#translations', en: 'Translations', tr: 'Çeviriler' },
  { href: '#web-dev-projects', en: 'Projects', tr: 'Projelerim' },
  { href: '#contact', en: 'Contact', tr: 'İletişim' },
];

// SVGs for social icons (simple versions)
const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor" {...props}>
    {/* Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.3zm37.4 2.6c-2.9-.7-4.9-2.6-4.6-4.6s2.9-3.3 5.9-2.6c2.9 .7 4.9 2.6 4.6 4.6s-2.9 3.3-5.9 2.6zM244.2 51.7C108.3 51.7 0 159.7 0 295.1c0 109.4 69.8 202.8 165.5 235.2 12.2 2.3 16.6-5.2 16.6-11.5 0-5.7-.2-20.8-.2-40.7 -63.5 13.9-77.1-30.5-77.1-30.5 -11-27.9-26.9-35.3-26.9-35.3 -21.9-14.9 1.6-14.6 1.6-14.6 24.2 1.7 36.9 24.8 36.9 24.8 21.5 36.8 56.4 26.2 70.1 20.1 2.2-15.6 8.4-26.2 15.2-32.2 -53.5-6.1-109.7-26.8-109.7-118.5 .1-26.2 8.9-47.6 23.6-64.5 -2.4-6.1-10.2-30.4 2.2-63.5 0 0 20.1-6.4 66 24.6 19.1-5.3 39.6-8 59.9-8 20.3 0 40.8 2.7 59.9 8 45.8-31 65.7-24.6 65.7-24.6 12.4 33.1 4.6 57.4 2.2 63.5 14.7 16.9 23.5 38.3 23.5 64.5 0 91.9-56.3 112.3-110 118.3 8.7 7.5 16.4 22.5 16.4 45.3 0 32.7-.3 59.1-.3 67.1 0 6.4 4.4 14 16.7 11.4C426.4 497.8 496 404.3 496 295.1S380.1 51.7 244.2 51.7z"/>
  </svg>
);

const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" {...props}>
    {/* Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.5V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
  </svg>
);


const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background-alt text-text-secondary py-xl border-t border-border text-sm">
      <div className="container mx-auto px-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-lg mb-lg">
          {/* Footer Logo */}
          <div className="flex items-center gap-sm">
            <Image
              src="/Assets/alplogo.webp" // Path relative to /public directory
              alt={t('Alp Yalay Logo', 'Alp Yalay Logosu')}
              width={35}
              height={35}
              className="rounded-full"
            />
            <p className="font-heading text-lg font-semibold text-text-primary">
              {t('Alp Yalay', 'Alp Yalay')}
            </p>
          </div>

          {/* Footer Links */}
          <nav aria-label={t('Footer navigation', 'Altbilgi navigasyonu')}>
            <ul className="flex flex-wrap justify-center md:justify-start gap-x-md gap-y-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                        className="hover:text-primary-DEFAULT hover:underline transition-colors duration-fast">
                    {t(link.en, link.tr)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex gap-md">
            <a
              href="https://github.com/KhazP"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('GitHub', 'GitHub')}
              className="text-text-secondary hover:text-primary-DEFAULT transition-colors duration-fast"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/alpyalay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('LinkedIn', 'LinkedIn')}
              className="text-text-secondary hover:text-primary-DEFAULT transition-colors duration-fast"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>
            {/* Add other social links as needed */}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center pt-lg border-t border-border/50">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} {t('Alp Yalay. All Rights Reserved.', 'Alp Yalay. Tüm Hakları Saklıdır.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
