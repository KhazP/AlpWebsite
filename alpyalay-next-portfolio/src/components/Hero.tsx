'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // For the "Get In Touch" button
import { useLanguage } from '@/context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  // Optimized star generation
  const starCount = 15;
  const shootingStarCount = 5;

  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen text-center bg-background-DEFAULT text-text-primary overflow-hidden pt-navbar"> {/* pt-navbar to avoid overlap */}
      {/* Night Sky Background and Animations */}
      <div className="absolute inset-0 z-0 pointer-events-none night-sky"> {/* Use night-sky class from globals.css */}
        {Array.from({ length: shootingStarCount }).map((_, i) => (
          <div key={`shooting-${i}`} className="shooting-star"></div>
        ))}
        {Array.from({ length: starCount }).map((_, i) => (
          <div key={`star-${i}`} className="star"></div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-md flex flex-col md:flex-row items-center justify-center gap-xl md:gap-xxl py-lg md:py-xl text-left">
        {/* Text Content */}
        <div className="md:flex-1 max-w-xl md:max-w-none md:order-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-xs text-shadow-lg animate-fadeInUp">
            {t('Alp Yalay', 'Alp Yalay')}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium font-heading text-primary-DEFAULT mb-md animate-fadeInUp animation-delay-200">
            {t('Translator & Localizer', 'Çevirmen & Yerelleştirici')}
          </h2>
          <Link
            href="#contact"
            className="inline-block bg-primary-DEFAULT text-text-on-dark font-semibold px-lg py-md rounded-md
                       hover:bg-primary-hover transform hover:-translate-y-px shadow-lg hover:shadow-xl transition-all duration-fast
                       animate-fadeInUp animation-delay-400"
          >
            {t('Get In Touch', 'İletişime Geçin')}
          </Link>
        </div>

        {/* Image */}
        <div className="md:flex-shrink-0 md:order-2 mt-lg md:mt-0 animate-fadeInUp animation-delay-600">
          <Image
            src="/Assets/alpface.webp" // Assuming image is in public/Assets
            alt={t('Alp Yalay', 'Alp Yalay')}
            width={300} // Original width
            height={300} // Original height
            priority // Preload this LCP image
            className="rounded-full object-cover w-[250px] h-[250px] md:w-[300px] md:h-[300px] shadow-2xl border-3 border-primary-dark hover:scale-105 transition-transform duration-medium"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
