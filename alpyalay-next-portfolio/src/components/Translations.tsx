'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProjectCard, { ProjectCardProps } from './ProjectCard'; // Import the reusable card

// Sample Data (To be replaced or expanded)
const translationProjectsData: ProjectCardProps[] = [
  {
    id: 'hoh2',
    type: 'translation',
    imageSrc: '/Assets/heroesofhammerwatch2.webp',
    imageAltEn: 'Heroes of Hammerwatch II Screenshot',
    imageAltTr: 'Heroes of Hammerwatch II Ekran Görüntüsü',
    titleEn: 'Heroes of Hammerwatch II (Fan Translation)',
    titleTr: 'Heroes of Hammerwatch II (Fan Çevirisi)',
    descriptionEn: "Complete Turkish localization for this action roguelite, employing a hybrid approach that combines traditional translation with AI-Assisted post-editing for terminology management, and continuity. Currently in post-translation polish phase with regular updates.",
    descriptionTr: "Bu aksiyon roguelite oyunu için tam Türkçe yerelleştirme. Terim yönetimi ve süreklilik için geleneksel çeviriyi YZ destekli son düzenleme ile birleştiren hibrit bir yaklaşım kullanıldı. Şu anda düzenli güncellemelerle çeviri sonrası düzeltme aşamasında.",
    details: [
      { labelEn: 'Status', labelTr: 'Durum', valueEn: 'Post-translation polish', valueTr: 'Çeviri sonrası düzeltme' },
      { labelEn: 'Process', labelTr: 'Süreç', valueEn: 'Manual translation with post-editing', valueTr: 'Son düzenleme ile manuel çeviri' }
    ],
    links: [
      { href: 'https://steamcommunity.com/app/1781750/workshop/', textEn: 'View on Steam Workshop', textTr: 'Steam Atölyesi\'nde Görüntüle', isPrimary: true }
    ]
  },
  {
    id: 'battle-talent',
    type: 'translation',
    imageSrc: '/Assets/battletalent.webp',
    imageAltEn: 'Battle Talent VR Game Screenshot',
    imageAltTr: 'Battle Talent VR Oyunu Ekran Görüntüsü',
    titleEn: 'Battle Talent (Official Translation)',
    titleTr: 'Battle Talent (Resmi Çeviri)',
    descriptionEn: 'Official Turkish translation for this physics-based VR sword-fighting game. Provided professional localization services to ensure the game is accessible to Turkish-speaking players.',
    descriptionTr: 'Bu fizik tabanlı VR kılıç dövüşü oyununun resmi Türkçe çevirisi. Oyunun Türkçe konuşan oyuncular için erişilebilir olmasını sağlamak amacıyla profesyonel yerelleştirme hizmetleri sağlandı.',
    details: [
      { labelEn: 'Type', labelTr: 'Tür', valueEn: 'Official localization', valueTr: 'Resmi yerelleştirme' },
      { labelEn: 'Platform', labelTr: 'Platform', valueEn: 'Steam VR', valueTr: 'Steam VR' }
    ],
    links: [
      { href: 'https://store.steampowered.com/app/1325900/Battle_Talent/', textEn: 'View Game on Steam', textTr: 'Oyunu Steam\'de Görüntüle', isPrimary: true },
      { href: '/projects/case-studies/battle-talent-case-study', textEn: 'Case Study', textTr: 'Vaka İncelemesi', isCaseStudy: true } // Placeholder for internal link
    ]
  }
  // Add more translation projects here
];

const Translations: React.FC = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const projectsToShow = showAll ? translationProjectsData : translationProjectsData.slice(0, 2); // Show 2 by default

  return (
    <section id="translations" className="py-xxl bg-background-alt">
      <div className="container mx-auto px-md">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-xl relative pb-sm
                       after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                       after:w-[70px] after:h-[3px] after:bg-primary-DEFAULT after:rounded-sm">
          {t('Translation Work', 'Çeviri Çalışmaları')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {projectsToShow.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        {translationProjectsData.length > 2 && (
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

export default Translations;
