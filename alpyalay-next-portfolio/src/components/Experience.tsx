'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CollapsibleSection from './CollapsibleSection'; // Import the sub-component

// Define data structures
interface ExperienceItem {
  titleEn: string;
  titleTr: string;
  subtitleEn?: string;
  subtitleTr?: string;
  dateEn: string;
  dateTr: string;
  descriptionEn: string;
  descriptionTr: string;
  icon?: string; // e.g., '🏢', '🎓'
}

interface CertificationItem {
  titleEn: string;
  titleTr: string;
  issuerEn: string;
  issuerTr: string;
  dateEn: string;
  dateTr: string;
  icon?: string; // e.g., '📜'
}

const workHistoryData: ExperienceItem[] = [
  {
    icon: '🏢',
    titleEn: 'Junior Social Media Manager', titleTr: 'Jr. Sosyal Medya Yöneticisi',
    subtitleEn: 'Muse İstanbul', subtitleTr: 'Muse İstanbul',
    dateEn: 'Apr 2024 - Aug 2024', dateTr: 'Nis 2024 - Ağu 2024',
    descriptionEn: 'Managed social media accounts for iGA Istanbul Airport and its CEO. Creative writing and translation of social media content.',
    descriptionTr: 'iGA İstanbul Havalimanı ve CEO\'su için sosyal medya hesaplarını yönettim. Sosyal medya içeriklerinin yaratıcı yazımı ve çevirisini yaptım.'
  },
  {
    icon: '🛎️', // Using a bellhop bell as a placeholder for concierge-bell
    titleEn: 'Barista, Waiter, Cashier', titleTr: 'Barista, Garson, Kasiyer',
    subtitleEn: 'Asma Yaprağı', subtitleTr: 'Asma Yaprağı',
    dateEn: 'Jul 2015 - Sep 2021 | Alaçatı, Turkey', dateTr: 'Tem 2015 - Eyl 2021 | Alaçatı, Türkiye',
    descriptionEn: 'Maintained responsibility for daily operations and electronic banking payments using various methods. Supervised customer service quality and financial management. Greeted customers, took orders, and delivered food and drinks while focusing on restaurant management.',
    descriptionTr: 'Çeşitli yöntemler kullanarak günlük operasyonlardan ve elektronik bankacılık ödemelerinden sorumluydum. Müşteri hizmetleri kalitesini ve finansal yönetimi denetledim. Müşterileri karşıladım, sipariş aldım, yiyecek/içecek servisi yaptım ve restoran yönetimine odaklandım.'
  },
  {
    icon: '🎓', // Placeholder for user-graduate
    titleEn: 'Intern', titleTr: 'Stajyer',
    subtitleEn: 'Şafak Tercüme', subtitleTr: 'Şafak Tercüme',
    dateEn: 'Feb 2021 - Mar 2021', dateTr: 'Şub 2021 - Mar 2021',
    descriptionEn: 'Internship at a translation agency, gaining experience in translation workflows.',
    descriptionTr: 'Çeviri iş akışları konusunda deneyim kazanmak için bir çeviri bürosunda staj yaptım.'
  }
];

const educationData: ExperienceItem[] = [
  {
    icon: '🏛️', // Placeholder for university
    titleEn: "Bachelor's Degree in Translation and Interpreting", titleTr: 'Mütercim-Tercümanlık Lisans Derecesi',
    subtitleEn: 'Izmir University of Economics', subtitleTr: 'İzmir Ekonomi Üniversitesi',
    dateEn: 'Sep 2018 - Jun 2022 | Izmir, Turkey', dateTr: 'Eyl 2018 - Haz 2022 | İzmir, Türkiye',
    descriptionEn: 'Specialized in Economic Translation, Legal Translation & Transcreation. Learned SDL Trados & SmartCat, participated in Photographic Activities. GPA: 2.86, Last Semester: 3.45',
    descriptionTr: 'Ekonomi Çevirisi, Hukuk Çevirisi ve Yaratıcı Uyarlama (Transcreation) alanlarında uzmanlaştım. SDL Trados ve SmartCat kullanmayı öğrendim, Fotoğrafçılık Aktivitelerine katıldım. Ortalama: 2.86, Son Dönem: 3.45'
  },
  {
    icon: '🏫', // Placeholder for school
    titleEn: 'High School Diploma', titleTr: 'Lise Diploması',
    subtitleEn: 'Pera Fine Arts High School', subtitleTr: 'Pera Güzel Sanatlar Lisesi',
    dateEn: 'Sep 2014 - Jun 2018 | Istanbul, Turkey', dateTr: 'Eyl 2014 - Haz 2018 | İstanbul, Türkiye',
    descriptionEn: 'Art Studies, Photography, English',
    descriptionTr: 'Sanat Çalışmaları, Fotoğrafçılık, İngilizce'
  },
  {
    icon: '👶', // Placeholder for child / primary school
    titleEn: 'Primary and Middle School', titleTr: 'İlk ve Orta Okul',
    subtitleEn: 'Sisli Terakki Lisesi', subtitleTr: 'Şişli Terakki Lisesi',
    dateEn: 'Sep 2005 - Jun 2014 | Istanbul, Turkey', dateTr: 'Eyl 2005 - Haz 2014 | İstanbul, Türkiye',
    descriptionEn: 'Primary School Diploma, Middle School Diploma, and 9th Grade. Studied in the International Baccalaureate (IB) Class.',
    descriptionTr: 'İlkokul Diploması, Ortaokul Diploması ve 9. Sınıf. Uluslararası Bakalorya (IB) Sınıfında okudum.'
  },
   {
    icon: '🧸', // Placeholder for baby / kindergarten
    titleEn: 'Kindergarten', titleTr: 'Anaokulu',
    subtitleEn: 'Robert College', subtitleTr: 'Robert Koleji',
    dateEn: 'Sep 2001 - Jun 2005 | Istanbul, Turkey', dateTr: 'Eyl 2001 - Haz 2005 | İstanbul, Türkiye',
    descriptionEn: 'Extensive English Education from Childhood',
    descriptionTr: 'Çocukluktan İtibaren Kapsamlı İngilizce Eğitimi'
  }
];

const honorsData: ExperienceItem[] = [
  {
    icon: '🏆', // Placeholder for award / certificate
    titleEn: 'Certificate of Achievement', titleTr: 'Başarı Belgesi',
    subtitleEn: 'Polymaths in the Republican Era Poster Exhibition', subtitleTr: 'Cumhuriyet Dönemi Polimatları Poster Sergisi',
    dateEn: 'May 2022', dateTr: 'Mayıs 2022',
    descriptionEn: 'Received Honourable Mention Award for outstanding contribution to the exhibition.',
    descriptionTr: 'Sergiye katkılarımdan dolayı Mansiyon Ödülü aldım.'
  }
];

const certificationsData: CertificationItem[] = [
  {
    icon: '📜', // Placeholder for certificate / microsoft
    titleEn: 'Microsoft Office Specialist: Microsoft Office 2010 (MOS)', titleTr: 'Microsoft Office Uzmanı: Microsoft Office 2010 (MOS)',
    issuerEn: 'Microsoft', issuerTr: 'Microsoft',
    dateEn: 'Date Issued: 2010', dateTr: 'Veriliş Tarihi: 2010'
  }
];

const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-xxl bg-background-DEFAULT">
      <div className="container mx-auto px-md">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-xl relative pb-sm
                       after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                       after:w-[70px] after:h-[3px] after:bg-primary-DEFAULT after:rounded-sm">
          {t('Experience', 'Deneyim')}
        </h2>

        <div className="space-y-md">
          <CollapsibleSection titleEn="Work History" titleTr="İş Geçmişi" icon="💼" initiallyOpen={true}>
            <div className="space-y-lg">
              {workHistoryData.map((item, index) => (
                <div key={`work-${index}`} className="experience-item p-sm rounded-md hover:bg-background-alt/50 transition-colors duration-fast">
                  <h4 className="text-lg font-semibold text-accent-DEFAULT flex items-center gap-xs">
                    {item.icon && <span className="text-xl">{item.icon}</span>}
                    {t(item.titleEn, item.titleTr)}
                  </h4>
                  {item.subtitleEn && <h5 className="text-md font-medium text-text-primary mb-xs">{t(item.subtitleEn, item.subtitleTr)}</h5>}
                  <p className="text-xs text-text-muted mb-sm">{t(item.dateEn, item.dateTr)}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{t(item.descriptionEn, item.descriptionTr)}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection titleEn="Education" titleTr="Eğitim" icon="🎓">
            <div className="space-y-lg">
              {educationData.map((item, index) => (
                <div key={`edu-${index}`} className="experience-item p-sm rounded-md hover:bg-background-alt/50 transition-colors duration-fast">
                  <h4 className="text-lg font-semibold text-accent-DEFAULT flex items-center gap-xs">
                    {item.icon && <span className="text-xl">{item.icon}</span>}
                    {t(item.titleEn, item.titleTr)}
                  </h4>
                  {item.subtitleEn && <h5 className="text-md font-medium text-text-primary mb-xs">{t(item.subtitleEn, item.subtitleTr)}</h5>}
                  <p className="text-xs text-text-muted mb-sm">{t(item.dateEn, item.dateTr)}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{t(item.descriptionEn, item.descriptionTr)}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection titleEn="Honors & Awards" titleTr="Başarılar & Ödüller" icon="🏆">
             <div className="space-y-lg">
              {honorsData.map((item, index) => (
                <div key={`honor-${index}`} className="experience-item p-sm rounded-md hover:bg-background-alt/50 transition-colors duration-fast">
                  <h4 className="text-lg font-semibold text-accent-DEFAULT flex items-center gap-xs">
                    {item.icon && <span className="text-xl">{item.icon}</span>}
                    {t(item.titleEn, item.titleTr)}
                  </h4>
                  {item.subtitleEn && <h5 className="text-md font-medium text-text-primary mb-xs">{t(item.subtitleEn, item.subtitleTr)}</h5>}
                  <p className="text-xs text-text-muted mb-sm">{t(item.dateEn, item.dateTr)}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{t(item.descriptionEn, item.descriptionTr)}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection titleEn="Certifications" titleTr="Sertifikalar" icon="📜">
            <ul className="space-y-md">
              {certificationsData.map((cert, index) => (
                <li key={`cert-${index}`} className="experience-item p-sm rounded-md hover:bg-background-alt/50 transition-colors duration-fast">
                  <h4 className="text-lg font-semibold text-accent-DEFAULT flex items-center gap-xs">
                    {cert.icon && <span className="text-xl">{cert.icon}</span>}
                    {t(cert.titleEn, cert.titleTr)}
                  </h4>
                  <h5 className="text-md font-medium text-text-primary">{t(cert.issuerEn, cert.issuerTr)}</h5>
                  <p className="text-xs text-text-muted">{t(cert.dateEn, cert.dateTr)}</p>
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        </div>
      </div>
    </section>
  );
};

export default Experience;
