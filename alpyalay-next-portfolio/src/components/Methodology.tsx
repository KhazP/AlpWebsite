'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface MethodologyStep {
  titleEn: string;
  titleTr: string;
  descriptionEn: string;
  descriptionTr: string;
}

const methodologyStepsData: MethodologyStep[] = [
  {
    titleEn: 'Manual Translation',
    titleTr: 'Manuel Çeviri',
    descriptionEn: "I start with traditional translation, applying my linguistic knowledge, cultural understanding, and specialized domain expertise.",
    descriptionTr: "Dilbilimsel bilgimi, kültürel anlayışımı ve özel alan uzmanlığımı uygulayarak geleneksel çeviri ile başlarım."
  },
  {
    titleEn: 'AI-Assisted Editing',
    titleTr: 'Yapay Zeka Destekli Düzenleme',
    descriptionEn: "I employ advanced AI models like Claude 3.7 Sonnet & Gemini 2.5 Pro to enhance consistency, and increase workflow speed in the editing phase.",
    descriptionTr: "Düzenleme aşamasında tutarlılığı artırmak ve iş akışı hızını yükseltmek için Claude 3.7 Sonnet ve Gemini 2.5 Pro gibi gelişmiş YZ modellerini kullanıyorum."
  },
  {
    titleEn: 'Technical Verification',
    titleTr: 'Manuel Doğrulama', // Note: Original HTML said "Manuel Doğrulama", but "Teknik Doğrulama" might be closer to "Technical Verification". Using "Manuel Doğrulama" to match original for now.
    descriptionEn: "My technical background allows me to verify technical accuracy and ensure proper implementation in software contexts.",
    descriptionTr: "Teknik geçmişim, teknik doğruluğu doğrulamama ve yazılım bağlamlarında doğru uygulamayı sağlamama olanak tanır."
  }
];

const Methodology: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="methodology" className="py-xxl bg-background-alt">
      <div className="container mx-auto px-md">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-xl relative pb-sm
                       after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                       after:w-[70px] after:h-[3px] after:bg-primary-DEFAULT after:rounded-sm">
          {t('My Approach', 'Yaklaşımım')}
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-xl md:gap-xxl">
          {/* Image */}
          <div className="md:w-1/3 lg:w-2/5 order-1 md:order-2">
            <Image
              src="/Assets/alpface.webp" // Using alpface.webp as placeholder, original had a different one.
              alt={t('Translation Process', 'Çeviri Sürecim')}
              width={400}
              height={400}
              className="rounded-lg shadow-xl object-cover w-full max-w-sm mx-auto md:max-w-full aspect-square"
            />
          </div>

          {/* Text Content */}
          <div className="md:w-2/3 lg:w-3/5 md:order-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold font-heading text-accent-DEFAULT mb-md">
              {t('Hybrid Translation Methodology', 'Hibrit Çeviri Metodolojisi')}
            </h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-lg">
              {t(
                "I believe in combining the best of human linguistic expertise with cutting-edge technology. My translation process represents an up-to-date approach that leverages both traditional skills and advanced AI tools:",
                "İnsan dil uzmanlığını en son teknolojiyle birleştirmeye inanıyorum. Çeviri sürecim, hem geleneksel becerilerden hem de gelişmiş YZ araçlarından yararlanan güncel bir yaklaşımı temsil eder:"
              )}
            </p>

            <div className="space-y-lg">
              {methodologyStepsData.map((step, index) => (
                <div key={index} className="flex items-start gap-md">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-DEFAULT text-background-DEFAULT rounded-full flex items-center justify-center font-bold text-lg shadow-md group-hover:bg-accent-DEFAULT group-hover:scale-110 transition-all duration-fast">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg md:text-xl font-semibold font-heading text-text-primary mb-xs">
                      {t(step.titleEn, step.titleTr)}
                    </h4>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                      {t(step.descriptionEn, step.descriptionTr)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
