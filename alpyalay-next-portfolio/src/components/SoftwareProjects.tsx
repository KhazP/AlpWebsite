'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProjectCard, { ProjectCardProps } from './ProjectCard';

const softwareProjectsData: ProjectCardProps[] = [
  {
    id: 'loc-comparison-tool',
    type: 'software',
    imageSrc: '/Assets/localizationappthumbnail.webp',
    imageAltEn: 'Localization Comparison Tool Screenshot',
    imageAltTr: 'Yerelleştirme Karşılaştırma Aracı Ekran Görüntüsü',
    titleEn: 'Localization Comparison Tool',
    titleTr: 'Yerelleştirme Karşılaştırma Aracı',
    descriptionEn: "A Python-based application built with the Flet framework that streamlines the comparison of localization files. This tool helps translators and developers quickly identify added and removed strings in different file formats (CSV, XML, LANG, JSON). Example Use Case: Locating untranslated strings after application/game translations and/or updates.",
    descriptionTr: "Yerelleştirme dosyalarının karşılaştırılmasını kolaylaştıran, Flet framework ile oluşturulmuş Python tabanlı bir uygulama. Bu araç, çevirmenlerin ve geliştiricilerin farklı dosya formatlarındaki (CSV, XML, LANG, JSON) eklenen/kaldırılan dizeleri hızla belirlemesine yardımcı olur. Örnek Kullanım: Uygulama/oyun çevirileri veya güncellemelerinden sonra çevrilmemiş dizeleri bulma.",
    features: [
      { en: 'Python', tr: 'Python' },
      { en: 'Flet', tr: 'Flet' },
      { en: 'Open Source', tr: 'Açık Kaynak' },
    ],
    links: [
      { href: 'https://github.com/KhazP/Localization-Comparison-Tool', textEn: 'View on GitHub', textTr: 'GitHub\'da Görüntüle', isPrimary: true },
    ],
  },
  {
    id: 'f1-gpt',
    type: 'software',
    imageSrc: '/Assets/f1regassistantthumbnail.webp',
    imageAltEn: 'F1 Regulations Assistant GPT Screenshot',
    imageAltTr: 'F1 FIA Asistanı GPT Ekran Görüntüsü',
    titleEn: 'F1 Regulations Assistant GPTs',
    titleTr: 'F1 FIA Asistanı GPT\'si',
    descriptionEn: "A specialized AI assistant that helps users understand F1 regulations, covering the 2024, 2025, and 2026 rulesets. Leveraging official FIA documentation, it provides clear, concise explanations and can analyze images to verify regulation compliance. PS. ChatGPT version is no longer updated.",
    descriptionTr: "Kullanıcıların 2024, 2025 ve 2026 F1 kurallarını anlamalarına yardımcı olan özel bir YZ asistanı. Resmi FIA belgelerini kullanarak net, öz açıklamalar sağlar ve kural uyumluluğunu doğrulamak için görüntüleri analiz edebilir. Not: ChatGPT sürümü artık güncellenmemektedir.",
    details: [
        { labelEn: 'ChatGPT Version', labelTr: 'ChatGPT Sürümü', valueEn: 'Full functionality with live openf1.org API integration, but with inferior AI Model', valueTr: 'Canlı openf1.org API entegrasyonu ile tam işlevsellik, ancak daha düşük yetenekli YZ Modeli ile' },
        { labelEn: 'Gemini Version', labelTr: 'Gemini Sürümü', valueEn: 'Core regulation knowledge without API integration, but has Gemini 2.5 Pro', valueTr: 'API entegrasyonu olmadan temel kural bilgisi, ancak Gemini 2.5 Pro ile' }
    ],
    features: [
      { en: 'AI Development', tr: 'YZ Geliştirme' },
      { en: 'Technical Documentation', tr: 'Teknik Dokümantasyon' },
      { en: 'Formula 1', tr: 'Formula 1' },
    ],
    links: [
      { href: 'https://chatgpt.com/g/g-eaNLvlHI7-f1-regulations-assistant', textEn: 'Try on ChatGPT', textTr: 'ChatGPT\'de Dene' },
      { href: 'https://gemini.google.com/gem/7016463ffba5', textEn: 'Try on Gemini', textTr: 'Gemini\'de Dene' },
    ],
  },
  {
    id: 'autotidy',
    type: 'software',
    imageSrc: '/Assets/autotidy.webp',
    imageAltEn: 'AutoTidy Application Screenshot',
    imageAltTr: 'AutoTidy Uygulaması Ekran Görüntüsü',
    titleEn: 'AutoTidy',
    titleTr: 'AutoTidy',
    descriptionEn: "Keeps your computer folders (like Downloads, Screenshots or Desktop) tidy automatically! This app for Windows and Linux cleans up by moving old files, or files with specific names (like screenshots), into organized 'Cleanup' folders sorted by date. It works in the background.",
    descriptionTr: "Bilgisayar klasörlerinizi (İndirilenler, Ekran Görüntüleri veya Masaüstü gibi) otomatik olarak düzenli tutar! Windows ve Linux için bu uygulama, eski dosyaları veya belirli adlara sahip dosyaları (ekran görüntüleri gibi) tarihe göre sıralanmış düzenli 'Temizlik' klasörlerine taşıyarak temizler. Arka planda çalışır.",
    features: [
      { en: 'Python', tr: 'Python' },
      { en: 'PyQt6', tr: 'PyQt6' },
      { en: 'Automation', tr: 'Otomasyon' },
      { en: 'Utility', tr: 'Yardımcı Program' },
      { en: 'Windows', tr: 'Windows' },
      { en: 'Linux', tr: 'Linux' },
    ],
    links: [
      { href: 'https://github.com/KhazP/AutoTidy', textEn: 'View on GitHub', textTr: 'GitHub\'da Görüntüle', isPrimary: true },
    ],
  },
];

const SoftwareProjects: React.FC = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const projectsToShow = showAll ? softwareProjectsData : softwareProjectsData.slice(0, 2); // Show 2 by default

  return (
    <section id="software-ai-projects" className="py-xxl bg-background-alt"> {/* Alternating background from WebDev */}
      <div className="container mx-auto px-md">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-xl relative pb-sm
                       after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                       after:w-[70px] after:h-[3px] after:bg-primary-DEFAULT after:rounded-sm">
          {t('Software & AI Projects', 'Yazılım & YZ Projeleri')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {projectsToShow.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        {softwareProjectsData.length > 2 && (
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

export default SoftwareProjects;
