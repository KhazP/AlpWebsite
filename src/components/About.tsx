'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Data for the component - can be moved to a separate file later
const infoboxData = [
  { labelEn: 'Languages', labelTr: 'Diller', valueEn: 'Turkish ↔ English', valueTr: 'Türkçe ↔ İngilizce' },
  { labelEn: 'Location', labelTr: 'Konum', valueEn: 'Kadıköy, Istanbul, Türkiye', valueTr: 'Kadıköy, İstanbul, Türkiye' },
  { labelEn: 'Tests', labelTr: 'Sınavlar', valueEn: 'TOEFL iBT®: 92', valueTr: 'TOEFL iBT®: 92' },
  { labelEn: 'Specialization', labelTr: 'Uzmanlık', valueEn: 'Game Localization', valueTr: 'Oyun Yerelleştirme' },
  { labelEn: 'Education', labelTr: 'Eğitim', valueEn: 'Izmir University of Economics', valueTr: 'İzmir Ekonomi Üniversitesi' },
  { labelEn: 'Degree', labelTr: 'Derece', valueEn: 'Translation & Interpretation', valueTr: 'Mütercim-Tercümanlık' },
];

const skillsData = {
  translationLocalization: {
    titleEn: 'Translation & Localization', titleTr: 'Çeviri & Yerelleştirme',
    items: [
      { en: 'Video Game Localization', tr: 'Video Oyunu Yerelleştirme' },
      { en: 'Technical Translation', tr: 'Teknik Çeviri' },
      { en: 'Legal Translation', tr: 'Hukuki Çeviri' },
      { en: 'Website Localization', tr: 'Web Sitesi Yerelleştirme' },
      { en: 'Subtitling', tr: 'Altyazı Çevirisi' },
      { en: 'Post-editing', tr: 'Son Düzenleme (Post-editing)' },
      { en: 'Transcreation', tr: 'Yaratıcı Uyarlama (Transcreation)' },
      { en: 'Proofreading', tr: 'Düzeltme (Proofreading)' },
      { en: 'Quality Assurance', tr: 'Kalite Kontrolü (QA)' },
      { en: 'Terminology Management', tr: 'Terim Yönetimi' },
      { en: 'Machine Translation', tr: 'Makine Çevirisi' },
    ]
  },
  technicalSkills: {
    titleEn: 'Technical Skills', titleTr: 'Teknik Yetenekler',
    items: [
      { en: 'SDL Trados', tr: 'SDL Trados' },
      { en: 'CAT Tools', tr: 'CAT Araçları' },
      { en: 'Microsoft Office Suite', tr: 'Microsoft Office Paketi' },
      { en: 'Adobe Photoshop', tr: 'Adobe Photoshop' },
      { en: 'Davinci Resolve', tr: 'Davinci Resolve' },
      { en: 'AI-Assisted Translation', tr: 'Yapay Zeka Destekli Çeviri' },
      { en: 'AI Aided Programming (Vibe Coding)', tr: 'YZ Destekli Programlama' },
      { en: 'Localization Engineering', tr: 'Yerelleştirme Mühendisliği' },
      { en: 'Video Editing', tr: 'Video Düzenleme' },
    ]
  },
  managementSoftSkills: {
    titleEn: 'Management & Soft Skills', titleTr: 'Yönetim & İletişim Becerileri',
    items: [
      { en: 'Project Management', tr: 'Proje Yönetimi' },
      { en: 'Project Planning', tr: 'Proje Planlama' },
      { en: 'Team Leadership', tr: 'Takım Liderliği' },
      { en: 'Cross-Cultural Communication', tr: 'Kültürlerarası İletişim' },
      { en: 'Customer Service', tr: 'Müşteri Hizmetleri' },
      { en: 'Research Skills', tr: 'Araştırma Yeteneği' },
      { en: 'Teamwork', tr: 'Takım Çalışması' },
      { en: 'Social Media Management', tr: 'Sosyal Medya Yönetimi' },
      { en: 'Web Content Writing', tr: 'Web İçeriği Yazma' },
    ]
  }
};

const About: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-xxl bg-background-alt">
      <div className="container mx-auto px-md">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-xl relative pb-sm
                       after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                       after:w-[70px] after:h-[3px] after:bg-primary-DEFAULT after:rounded-sm">
          {t('About Me', 'Hakkımda')}
        </h2>

        <div className="flex flex-col md:flex-row gap-xl">
          {/* Character Infobox */}
          <div className="md:w-1/3 lg:w-1/4 bg-card-bg border border-border rounded-md shadow-lg overflow-hidden self-start">
            <div className="bg-primary-DEFAULT text-background-DEFAULT p-md text-center">
              <h3 className="text-xl font-semibold font-heading mb-xs">{t('Alp Yalay', 'Alp Yalay')}</h3>
              <span className="text-sm italic opacity-90">{t('Translator & Localizer', 'Çevirmen & Yerelleştirici')}</span>
            </div>
            <div className="p-md space-y-sm">
              {infoboxData.map((item, index) => (
                <div key={index} className="flex text-sm border-b border-border/50 pb-sm last:border-b-0 last:pb-0">
                  <span className="font-bold w-[100px] text-label flex-shrink-0">{t(item.labelEn, item.labelTr)}</span>
                  <span className="text-text-secondary flex-grow break-words">{t(item.valueEn, item.valueTr)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Text & Skills */}
          <div className="md:w-2/3 lg:w-3/4">
            <div className="about-bio mb-lg">
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-md">
                {t(
                  "I am a translator and localizer based in Istanbul, Turkey, with a degree in Translation and Interpretation from Izmir University of Economics. My main area of expertise is video game localization. Working in this field, I use my language and technology knowledge together.",
                  "İstanbul, Türkiye'de yaşayan bir çevirmen ve yerelleştiriciyim. İzmir Ekonomi Üniversitesi Mütercim-Tercümanlık bölümü mezunuyum. Ana uzmanlık alanım video oyunu yerelleştirmesidir. Bu alanda dil ve teknoloji bilgilerimi birleştirerek çalışıyorum."
                )}
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-md">
                {t(
                  "My professional experience includes an internship at Şafak Tercüme, providing exposure to translation agency workflows, and a role as Junior Social Media Manager at Muse İstanbul, where responsibilities included content translation and creative writing. These experiences have provided practical familiarity with localization processes for technical and marketing content.",
                  "Mesleki deneyimim arasında, çeviri ajansı iş akışlarına aşinalık kazandığım Şafak Tercüme stajı ve içerik çevirisi ile yaratıcı yazarlık sorumluluklarını üstlendiğim Muse İstanbul'daki Junior Sosyal Medya Yöneticiliği bulunmaktadır. Bu deneyimler, teknik ve pazarlama içerikleri için yerelleştirme süreçlerinde pratik bilgi edinmemi sağladı."
                )}
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-md">
                {t(
                  "Beyond translation, I apply technical skills to localization challenges. I developed the Localization Comparison Tool using Python and the Flet framework on VS Code (utilizing Github Copilot) to assist in comparing file versions and identifying string changes. I utilize SubtitleEdit to take on professional contracts from various agencies to translate/subtitle social media content.",
                  "Çevirinin ötesinde, yerelleştirme zorluklarına teknik becerilerimi uyguluyorum. Dosya sürümlerini karşılaştırmaya ve dize değişikliklerini belirlemeye yardımcı olmak için Python ve Flet framework'ü ile Yerelleştirme Karşılaştırma Aracı'nı geliştirdim. Çeşitli ajanslardan profesyonel sözleşmelerle sosyal medya içeriklerini çevirmek/altyazılamak için SubtitleEdit kullanıyorum."
                )}
              </p>
               <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                {t(
                  "In translation projects, such as the Turkish localization for 'Heroes of Hammerwatch II', I often use a hybrid methodology. This typically involves manual translation followed by AI-assisted editing, utilizing models like Gemini 2.5 Pro for tasks like consistency checking and post-editing. I continue to research the application of AI/ML and LLMs in translation to enhance workflow efficiency while maintaining quality standards.",
                  "'Heroes of Hammerwatch II' Türkçe yerelleştirmesi gibi çeviri projelerinde genellikle hibrit bir metodoloji kullanıyorum. Bu genellikle manuel çeviriyi ve ardından tutarlılık kontrolü ve son düzenleme gibi görevler için Gemini 2.5 Pro gibi modelleri kullanarak yapay zeka destekli düzenlemeyi içerir. Kalite standartlarını korurken iş akışı verimliliğini artırmak için çeviride YZ/MÖ ve LLM'lerin uygulanmasını araştırmaya devam ediyorum."
                )}
              </p>
            </div>

            <div className="skills">
              <h3 className="text-xl font-semibold font-heading text-primary-DEFAULT border-b-2 border-primary-dark pb-xs mb-md inline-block">
                {t('My Skills', 'Yeteneklerim')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
                {(Object.keys(skillsData) as Array<keyof typeof skillsData>).map((key) => (
                  <div key={key} className="skill-category">
                    <h4 className="text-lg font-semibold font-heading text-accent-DEFAULT mb-sm">
                      {t(skillsData[key].titleEn, skillsData[key].titleTr)}
                    </h4>
                    <ul className="space-y-xs list-disc list-inside pl-sm">
                      {skillsData[key].items.map((item, index) => (
                        <li key={index} className="text-text-secondary text-sm marker:text-primary-DEFAULT">
                          {t(item.en, item.tr)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
