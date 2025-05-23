'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProjectCard, { ProjectCardProps } from './ProjectCard';

const webDevProjectsData: ProjectCardProps[] = [
  {
    id: 'portfolio-website',
    type: 'web',
    imageSrc: '/Assets/alp.webp',
    imageAltEn: 'Alp Yalay Portfolio Website Screenshot',
    imageAltTr: 'Alp Yalay Portfolyo Websitesi Ekran Görüntüsü',
    titleEn: 'Portfolio Website',
    titleTr: 'Portfolyo Web Sitesi',
    descriptionEn: 'My personal portfolio website showcasing translation work, projects, and professional experience. Built with HTML, CSS, and JavaScript for a responsive, multilingual experience.',
    descriptionTr: 'Çeviri çalışmalarımı, projelerimi ve profesyonel deneyimimi sergileyen kişisel portfolyo web sitem. Duyarlı, çok dilli bir deneyim için HTML, CSS ve JavaScript ile oluşturuldu.',
    features: [
      { en: 'HTML', tr: 'HTML' },
      { en: 'CSS', tr: 'CSS' },
      { en: 'JavaScript', tr: 'JavaScript' },
      { en: 'Responsive Design', tr: 'Duyarlı Tasarım' },
    ],
    links: [
      { href: 'https://github.com/KhazP/AlpWebsite', textEn: 'View on GitHub', textTr: 'GitHub\'da Görüntüle', isPrimary: true },
    ],
  },
  {
    id: 'can-maden-website',
    type: 'web',
    imageSrc: '/Assets/can.webp',
    imageAltEn: 'Can Maden Website Screenshot',
    imageAltTr: 'Can Maden Websitesi Ekran Görüntüsü',
    titleEn: 'Can Maden Website',
    titleTr: 'Can Maden Web Sitesi',
    descriptionEn: 'A custom-designed website developed for Can Maden, featuring a modern, responsive design with clean aesthetics and optimized performance.',
    descriptionTr: 'Can Maden için geliştirilmiş özel tasarımlı web sitesi; modern, duyarlı tasarım, sade estetik ve optimize edilmiş performans içerir.',
    features: [
      { en: 'HTML', tr: 'HTML' },
      { en: 'CSS', tr: 'CSS' },
      { en: 'JavaScript', tr: 'JavaScript' },
      { en: 'Web Design', tr: 'Web Tasarım' },
    ],
    links: [
      { href: 'https://github.com/KhazP/CanMadenWebsite', textEn: 'View on GitHub', textTr: 'GitHub\'da Görüntüle', isPrimary: true },
      { href: 'https://canmadenart.tr/', textEn: 'Visit Website', textTr: 'Web Sitesini Ziyaret Et' },
    ],
  },
  {
    id: 'sait-maden-website',
    type: 'web',
    imageSrc: '/Assets/sait.webp',
    imageAltEn: 'Sait Maden Archival Website Screenshot',
    imageAltTr: 'Sait Maden Arşiv Websitesi Ekran Görüntüsü',
    titleEn: 'Sait Maden Archival Website',
    titleTr: 'Sait Maden Arşiv Web Sitesi',
    descriptionEn: 'This project is a static website created to document and preserve the artistic legacy and contributions of Sait Maden (1931-2013), an artist known for his groundbreaking work in Turkish graphic design, typography, poetry, and translation.',
    descriptionTr: 'Türk grafik tasarımı, tipografi, şiir ve çeviri alanlarındaki çalışmalarıyla tanınan sanatçı Sait Maden\'in (1931-2013) sanatsal mirasını ve katkılarını belgelemek ve korumak amacıyla oluşturulan statik bir web sitesi projesi.',
    features: [
      { en: 'HTML', tr: 'HTML' },
      { en: 'CSS', tr: 'CSS' },
      { en: 'JavaScript', tr: 'JavaScript' },
      { en: 'Digital Archive', tr: 'Dijital Arşiv' },
    ],
    links: [
      { href: 'https://github.com/KhazP/SaitMadenWebsite', textEn: 'View on GitHub', textTr: 'GitHub\'da Görüntüle', isPrimary: true },
      { href: 'https://saitmadenwebsite.pages.dev/', textEn: 'Visit Website', textTr: 'Web Sitesini Ziyaret Et' },
    ],
  },
];

const WebDevProjects: React.FC = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const projectsToShow = showAll ? webDevProjectsData : webDevProjectsData.slice(0, 2); // Show 2 by default

  return (
    <section id="web-dev-projects" className="py-xxl bg-background-DEFAULT"> {/* Alternating background from Translations */}
      <div className="container mx-auto px-md">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-xl relative pb-sm
                       after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                       after:w-[70px] after:h-[3px] after:bg-primary-DEFAULT after:rounded-sm">
          {t('Web Development Projects', 'Web Geliştirme Projeleri')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {projectsToShow.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        {webDevProjectsData.length > 2 && (
          <div className="text-center mt-lg">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-primary-DEFAULT text-text-on-dark font-semibold px-lg py-md rounded-md
                             hover:bg-primary-hover transform hover:-translate-y-px shadow-lg hover:shadow-xl transition-all duration-fast"
            >
              {showAll ? t('Show Less...', 'Daha Az Göster...') : t('Show More...', 'Daha Fazla Göster...')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebDevProjects;
