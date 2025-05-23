'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext'; // Adjust path if your context is elsewhere
import { NextPage } from 'next';
import Head from 'next/head';

// Helper for SVG Icons (can be moved to a separate icons file later)
const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const BattleTalentCaseStudyPage: NextPage = () => {
  const { t, language, setLanguage } = useLanguage();

  const pageTitle = t("Case Study: Battle Talent Turkish Localization | Alp Yalay", "Vaka Çalışması: Battle Talent Türkçe Yerelleştirmem | Alp Yalay");
  const metaDescription = t("Case study detailing the Turkish localization of the VR game Battle Talent by Alp Yalay.", "VR oyunu Battle Talent'ın Türkçe yerelleştirme sürecimi detaylandıran vaka çalışmam.");

  // Data for the page, directly embedded
  const overviewData = [
    { labelEn: "Project:", labelTr: "Proje:", valueEn: "Turkish Localization of Battle Talent", valueTr: "Battle Talent'ın Türkçe Yerelleştirilmesi" },
    { labelEn: "Client:", labelTr: "Müşteri:", valueEn: "CyDream Technologies Limited", valueTr: "CyDream Technologies Limited" },
    { labelEn: "Platform:", labelTr: "Platform:", valueEn: "Steam VR, Meta Quest", valueTr: "Steam VR, Meta Quest" },
    { labelEn: "Timeline:", labelTr: "Süreç:", valueEn: "January 2021 - Present (Ongoing)", valueTr: "Ocak 2021 - Günümüz (Devam Ediyor)" },
    { labelEn: "Volume:", labelTr: "Kapsam:", valueEn: "Approx. 14,700 words / 86,000 characters (as of April 2025)", valueTr: "Yaklaşık 14.700 kelime / 86.000 karakter (Nisan 2025 itibarıyla)" },
  ];

  // Use a more specific type for sections if needed, for now 'any' for brevity
  const sections: {titleEn: string, titleTr: string, content: any[]}[] = [
    {
      titleEn: "Introduction", titleTr: "Giriş",
      content: [
        { type: 'paragraph', en: "This case study details the ongoing Turkish localization project for Battle Talent, a physics-based VR rogue-lite action game developed by CyDream Technologies. Undertaken initially as a personal challenge while completing university studies in Translation & Interpretation, this project served as a crucial first step into the world of professional game localization, demanding adaptability, resourcefulness, and a long-term commitment.", tr: "Bu vaka çalışmasında, CyDream Technologies tarafından geliştirilen fizik tabanlı VR rogue-lite aksiyon oyunu Battle Talent için yürüttüğüm ve halen devam eden Türkçe yerelleştirme projesini detaylandırıyorum. Mütercim-Tercümanlık eğitimim sırasında kişisel bir hedef olarak başladığım bu proje, profesyonel oyun yerelleştirme dünyasına attığım ilk adımdı ve bu süreçte adaptasyon, yaratıcılık ve uzun soluklu bir adanmışlık göstermemi gerektirdi." }
      ]
    },
    {
      titleEn: "The Challenge: Navigating Early Career Localization Hurdles", titleTr: "Karşılaştığım Zorluklar: Kariyer Başlangıcında Yerelleştirme Engellerini Aşmak",
      content: [
        { type: 'paragraph', en: "The primary objective was to proactively seek practical game localization experience, applying academic knowledge to a real-world project and demonstrating capability in the field. However, this ambition came with several significant hurdles:", tr: "Temel amacım, akademik bilgilerimi gerçek bir projeye uygulayarak ve bu alandaki yeteneklerimi göstererek pratik oyun yerelleştirme deneyimi kazanmaktı. Ancak bu hedefi gerçekleştirmeye çalışırken bazı önemli engellerle karşılaştım:" },
        { type: 'list', items: [
          { strongEn: "Indirect Source Text:", strongTr: "Dolaylı Kaynak Metin:", textEn: "The English text used as the source for Turkish translation was itself a non-professional translation from the original Simplified Chinese, introducing a layer of potential ambiguity and requiring careful interpretation.", textTr: "Türkçe çeviri için kaynak olarak kullandığım İngilizce metin, oyunun orijinal dili olan Basitleştirilmiş Çince'den profesyonel olmayan bir çeviriydi. Bu durum, potansiyel anlam belirsizlikleri yaratıyor ve metni dikkatle yorumlamamı gerektiriyordu." },
          { strongEn: "Tooling & Workflow Constraints:", strongTr: "Araç ve İş Akışı Kısıtlamaları:", textEn: "The localization process relied entirely on a shared Google Sheet for all translators across different languages. This lacked the robust features of standard CAT tools, making terminology management and consistency tracking difficult, especially in the early stages.", textTr: "Yerelleştirme süreci, farklı dillerdeki tüm çevirmenlerin kullandığı ortak bir Google Sheets üzerinden yürütülüyordu. Bu yöntem, standart CAT araçlarının sunduğu gelişmiş özelliklerden yoksundu ve özellikle projenin başlarında terminoloji yönetimi ile tutarlılık takibini oldukça zorlaştırdı." },
          { strongEn: "Terminology & Consistency:", strongTr: "Terminoloji ve Tutarlılık:", textEn: "Establishing appropriate Turkish terminology for unique game concepts (e.g., weapon types like 'Rapier', spell names like 'Abyssal Faith Spell') was challenging due to the lack of established Turkish gaming glossaries or accessible translation memories. Ensuring consistency across the growing text volume (~14.7k words) within the Google Sheet environment required meticulous effort.", textTr: "Oyuna özgü konseptler (örneğin, 'Rapier' gibi silah türleri, 'Abyssal Faith Spell' gibi büyü adları) için uygun Türkçe karşılıkları bulmak, yerleşik Türkçe oyun sözlüklerinin veya erişilebilir çeviri belleklerinin olmaması nedeniyle zordu. Google Sheets ortamında sürekli artan metin hacmi (~14.7 bin kelime) boyunca tutarlılığı korumak büyük bir özen gerektiriyordu." },
          { strongEn: "Limited Testing Environment:", strongTr: "Sınırlı Test Ortamı:", textEn: "No dedicated developer build was available for testing. Validating translations required waiting for monthly public game updates and then testing playthroughs within the live VR environment – a physically demanding and time-consuming process for a game with a relatively small Turkish player base, limiting feedback opportunities.", textTr: "Çevirileri test etmek için özel bir geliştirici sürümü (build) alamıyordum. Bu yüzden çevirileri doğrulamak için her ay yayınlanan herkese açık oyun güncellemelerini beklemem ve ardından oyunu bizzat VR ortamında oynamam gerekiyordu. Nispeten küçük bir Türk oyuncu kitlesi olan bu oyun için test süreci hem fiziksel olarak yorucu hem de zaman alıcıydı, bu da geri bildirim alma imkanlarımı kısıtlıyordu." },
          { strongEn: "Lack of Formal Guidance:", strongTr: "Resmi Kılavuz Eksikliği:", textEn: "While the developers were supportive, no formal style guide or glossary was provided initially, requiring proactive establishment of localization standards for Turkish.", textTr: "Geliştiriciler destekleyici olsalar da, başlangıçta resmi bir stil kılavuzu veya terimler sözlüğü sağlamadılar. Bu durum, Türkçe yerelleştirme standartlarını proaktif olarak benim belirlememi gerektirdi." }
        ]}
      ]
    },
     {
      titleEn: "Process & Solution: Adaptability and Continuous Improvement", titleTr: "Sürecim ve Çözümlerim: Adaptasyon ve Sürekli Gelişim",
      content: [
        { type: 'paragraph', en: "Despite the constraints, a pragmatic and evolving workflow was established:", tr: "Kısıtlamalara rağmen, pragmatik ve zamanla geliştirdiğim bir iş akışı oluşturdum:" },
        { type: 'list', items: [
          { strongEn: "Research-Driven Translation:", strongTr: "Araştırmaya Dayalı Çeviri:", textEn: "Each term or string was approached with research, utilizing online dictionaries (Tureng.com), cross-referencing translations in other Turkish-localized games, and occasionally leveraging AI for obscure terms. Translations were entered directly into the shared Google Sheet.", textTr: "Her terim veya metin parçasını çevirmeden önce araştırma yaptım; Tureng.com gibi çevrimiçi sözlükleri kullandım, diğer Türkçe yerelleştirilmiş oyunlardaki çevirilerle karşılaştırmalar yaptım ve zaman zaman anlaşılması güç terimler için yapay zekadan destek aldım. Çevirileri doğrudan ortak Google Sheets'e girdim." },
          { strongEn: "Personal Glossary Development:", strongTr: "Kişisel Terim Sözlüğü Oluşturma:", textEn: "A personal glossary was created and maintained to track key terms and ensure consistency, with plans to develop a dedicated terminology management app.", textTr: "Anahtar terimleri takip etmek ve tutarlılığı sağlamak amacıyla kişisel bir terim sözlüğü oluşturdum ve bunu sürekli güncel tuttum. İleride bu amaçla özel bir terminoloji yönetimi uygulaması geliştirme planım da var." },
          { strongEn: "Post-Update LQA:", strongTr: "Güncelleme Sonrası Kalite Kontrolü (LQA):", textEn: "Following each monthly game update, dedicated time was spent testing the newly added or modified Turkish strings within the VR game itself, identifying and correcting errors or awkward phrasing (post-editing).", textTr: "Her aylık oyun güncellemesinden sonra, yeni eklenen veya değiştirilen Türkçe metinleri oyunun içinde bizzat VR ortamında test etmek, hataları veya kulağa hoş gelmeyen ifadeleri tespit edip düzeltmek (post-editing) için özel zaman ayırdım." },
          { strongEn: "Leveraging AI for Consistency:", strongTr: "Tutarlılık İçin Yapay Zeka Kullanımı:", textEn: "To address the consistency challenges inherent in the spreadsheet-based workflow, a 'Hybrid Translation Methodology' was adopted as Large Language Models became more capable (specifically Gemini 1.5 Pro as of April 2025). The entire translation text was periodically fed into the AI, which helped identify potential inconsistencies (e.g., flagging similar source terms translated differently, variations in standard UI phrasing) that were difficult to spot manually in the spreadsheet format, allowing for targeted rectification.", textTr: "E-tablo tabanlı iş akışının getirdiği tutarlılık zorluklarının üstesinden gelmek için, Büyük Dil Modelleri geliştikçe (özellikle Nisan 2025 itibarıyla Gemini 1.5 Pro ile) bir 'Hibrit Çeviri Metodolojisi' benimsedim. Tüm çeviri metnini periyodik olarak yapay zekaya analiz ettirdim. Bu yöntem, e-tablo formatında elle fark etmesi zor olan potansiyel tutarsızlıkları (örneğin, benzer kaynak terimlerin farklı çevrilmesi, standart arayüz ifadelerindeki farklılıklar) belirlememe yardımcı oldu ve gerekli düzeltmeleri yapmamı sağladı." },
          { strongEn: "Community & Developer Communication:", strongTr: "Topluluk ve Geliştirici İletişimi:", textEn: "Active participation in the dedicated translator Discord channel facilitated communication with other language translators and the development team for clarifications, bug reporting, and feedback.", textTr: "Çevirmenlere özel Discord kanalına aktif katılarak, hem diğer dillerdeki çevirmenlerle hem de geliştirici ekiple sürekli iletişim halinde oldum. Bu sayede belirsiz noktaları netleştirdim, hataları raporladım ve geri bildirim alışverişinde bulundum." },
          { strongEn: "Iterative Refinement:", strongTr: "Sürekli İyileştirme:", textEn: "Recognizing the learning curve, older translations were revisited and updated over the years to reflect improved skills, better terminology choices, and a deeper understanding of localization best practices.", textTr: "Öğrenme sürecimin bir parçası olarak, yıllar içinde edindiğim yeni becerileri, daha isabetli terim seçimlerimi ve yerelleştirme konusundaki derinleşen anlayışımı yansıtmak amacıyla eski çevirilerimi düzenli olarak gözden geçirdim ve güncelledim." }
        ]}
      ]
    },
    {
      titleEn: "Results & Impact: Delivering Value and Fostering Growth", titleTr: "Sonuçlar ve Etkileri: Değer Yaratmak ve Kişisel Gelişimim",
      content: [
        { type: 'paragraph', en: "The ongoing localization effort has successfully made Battle Talent accessible to its Turkish-speaking audience and yielded significant personal development:", tr: "Devam eden bu yerelleştirme çabam, Battle Talent'ı Türkçe konuşan oyuncu kitlesi için erişilebilir kılarken, aynı zamanda benim için de önemli bir kişisel gelişim fırsatı sundu:" },
        { type: 'list', items: [
            { strongEn: "Enhanced Accessibility for Turkish Players:", strongTr: "Türk Oyuncular İçin Artırılmış Erişilebilirlik:", textEn: "Delivered and maintained a complete Turkish localization, making the VR experience fully accessible and enjoyable for the Turkish-speaking player base. Developer data indicated approximately 84 players were engaging with the game in or near Turkey. While direct feedback was scarce, 5 Steam reviews were posted in Turkish.", textTr: "Oyunun tam Türkçe yerelleştirmesini tamamladım ve güncel tuttum; bu sayede VR deneyimini Türkçe konuşan oyuncular için tamamen erişilebilir ve keyifli hale getirdim. Geliştirici verilerine göre, Türkiye ve çevresinde yaklaşık 84 oyuncu oyunu Türkçe olarak oynuyordu. Doğrudan geri bildirim sayısı az olsa da, Steam üzerinde Türkçe olarak 5 inceleme yayınlandı." },
            { strongEn: "Strong Developer Relationship:", strongTr: "Geliştiriciyle Kurulan Güçlü İlişki:", textEn: "Trust was established and maintained with CyDream Technologies, who relied on this sole effort for the Turkish market. Communication remained open and positive via Discord.", textTr: "Türkiye pazarı için yürüttüğüm bu çalışmaya güvenen CyDream Technologies ile sağlam bir güven ilişkisi kurdum ve bunu sürdürdüm. Discord üzerinden iletişimimiz her zaman açık ve olumluydu." },
            { strongEn: "Solidified Career Path:", strongTr: "Pekişen Kariyer Hedefim:", textEn: "The project confirmed a passion for game localization and highlighted the need for quality localization in the Turkish market, noting a lack of resources for aspiring localizers.", textTr: "Bu proje, oyun yerelleştirmeye olan tutkumu pekiştirdi ve Türkiye pazarında kaliteli yerelleştirmeye duyulan ihtiyacı görmemi sağladı. Aynı zamanda bu alanda ilerlemek isteyenler için kaynak eksikliğini de fark ettim." },
            { strongEn: "Demonstrated Resilience & Adaptability:", strongTr: "Gösterdiğim Direnç ve Adaptasyon Yeteneği:", textEn: "Successfully navigating the project's constraints (indirect source text, basic tools, limited testing) showcased problem-solving skills and commitment.", textTr: "Projenin getirdiği kısıtlamaların (dolaylı kaynak metin, basit araçlar, sınırlı test imkanı) üstesinden başarıyla gelmem, problem çözme becerilerimi ve projeye olan bağlılığımı gösterdi." },
            { strongEn: "Foundation for Future Projects:", strongTr: "Gelecek Projelerime Sağladığı Katkı:", textEn: "The experience gained provided the confidence and skillset to take on larger, more complex localization projects, such as Heroes of Hammerwatch II. It underscored the importance of devotion to long-term projects involving continuous updates.", textTr: "Burada kazandığım deneyim, Heroes of Hammerwatch II gibi daha büyük ve karmaşık yerelleştirme projelerini üstlenmem için gereken özgüveni ve becerileri kazanmamı sağladı. Ayrıca, sürekli güncellemeler alan uzun soluklu projelere adanmışlığın ne kadar önemli olduğunu anlamama yardımcı oldu." },
            { strongEn: "Skill Development:", strongTr: "Geliştirdiğim Beceriler:", textEn: "The project honed skills in technical translation, terminology management, LQA in VR, post-editing, cross-cultural communication (within the translation team), and integrating AI tools effectively into the workflow.", textTr: "Bu proje sayesinde; teknik çeviri, terminoloji yönetimi, VR ortamında LQA yapma, post-editing (son düzenleme), (çeviri ekibi içinde) kültürlerarası iletişim ve yapay zeka araçlarını iş akışıma etkili bir şekilde entegre etme gibi becerilerimi geliştirdim." }
        ]}
      ]
    },
    {
      titleEn: "Conclusion", titleTr: "Sonuç",
      content: [
        { type: 'paragraph', en: "The Battle Talent Turkish localization project stands as a testament to proactive learning and dedication. Overcoming initial challenges related to resources, tools, and testing methodology, this ongoing effort not only delivered a valuable localization for Turkish VR gamers but also provided an invaluable foundation, shaping a dedicated approach to game localization characterized by continuous improvement, adaptability, and a commitment to quality.", tr: "Battle Talent Türkçe yerelleştirme projesi, proaktif öğrenme yaklaşımımın ve adanmışlığımın bir göstergesidir. Kaynaklar, araçlar ve test metodolojisi gibi konularda başlangıçta karşılaştığım zorlukların üstesinden gelerek yürüttüğüm bu devam eden çalışma, yalnızca Türk VR oyuncuları için değerli bir yerelleştirme sunmakla kalmadı, aynı zamanda sürekli gelişim, adaptasyon ve kaliteye adanmışlıkla şekillenen oyun yerelleştirme yaklaşımımın temelini atan paha biçilmez bir deneyim oldu." }
      ]
    }
  ];


  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        {/* Add other relevant meta tags for this specific page if needed */}
      </Head>

      <div className="bg-background-DEFAULT min-h-screen"> {/* Ensure page background covers screen */}
        {/* Case Study Header */}
        <header className="bg-background-alt py-lg border-b border-border mb-xl">
          <div className="container mx-auto px-md flex flex-col">
            <div className="flex justify-between items-center w-full mb-md">
              <Link href="/#translations" className="flex items-center gap-xs text-primary-DEFAULT hover:text-accent-DEFAULT transition-colors text-sm">
                <ArrowLeftIcon className="w-4 h-4" />
                {t('Back to Portfolio', 'Portfolyoma Dön')}
              </Link>
              <div className="flex gap-xs">
                <button
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                  className={`px-sm py-xs text-xs font-medium rounded-sm border transition-colors
                              ${language === 'en' ? 'bg-primary-DEFAULT text-text-on-dark border-primary-DEFAULT' : 'bg-transparent text-text-primary border-text-secondary hover:bg-background-DEFAULT'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  aria-pressed={language === 'tr'}
                  className={`px-sm py-xs text-xs font-medium rounded-sm border transition-colors
                              ${language === 'tr' ? 'bg-primary-DEFAULT text-text-on-dark border-primary-DEFAULT' : 'bg-transparent text-text-primary border-text-secondary hover:bg-background-DEFAULT'}`}
                >
                  TR
                </button>
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold font-heading text-text-primary leading-tight">
              {t('Case Study: Bringing Battle Talent VR to Turkish Players', 'Vaka Çalışması: Battle Talent VR\'ı Türk Oyuncularla Buluşturma Serüvenim')}
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-xxl">
          <div className="container mx-auto px-md">
            <section className="mb-xl p-lg bg-card-bg border border-border rounded-lg shadow-lg">
              <h2 className="text-xl md:text-2xl font-bold font-heading text-accent-DEFAULT mb-lg pb-sm border-b-2 border-primary-DEFAULT inline-block">
                {t('Project Overview', 'Projeye Genel Bakış')}
              </h2>
              <ul className="space-y-sm text-sm text-text-secondary">
                {overviewData.map(item => (
                  <li key={item.labelEn}>
                    <strong className="font-semibold text-text-primary">{t(item.labelEn, item.labelTr)} </strong>
                    {t(item.valueEn, item.valueTr)}
                  </li>
                ))}
              </ul>
            </section>

            {sections.map((section, idx) => (
              <section key={idx} className="mb-xl p-lg bg-card-bg border border-border rounded-lg shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold font-heading text-accent-DEFAULT mb-lg pb-sm border-b-2 border-primary-DEFAULT inline-block">
                  {t(section.titleEn, section.titleTr)}
                </h2>
                {section.content.map((item, itemIdx) => {
                  if (item.type === 'paragraph') {
                    return <p key={itemIdx} className="text-text-secondary mb-md leading-relaxed text-base">{t(item.en, item.tr)}</p>;
                  }
                  if (item.type === 'list') {
                    return (
                      <ul key={itemIdx} className="list-disc space-y-sm pl-md text-text-secondary text-base">
                        {item.items.map((listItem: any, listItemIdx: number) => (
                          <li key={listItemIdx}>
                            <strong className="font-semibold text-text-primary">{t(listItem.strongEn, listItem.strongTr)} </strong>
                            {t(listItem.textEn, listItem.textTr)}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </section>
            ))}
          </div>
        </main>

        {/* Case Study Footer */}
        <footer className="bg-background-alt py-lg mt-xxl border-t border-border text-center text-sm text-text-secondary">
          <div className="container mx-auto px-md">
            <p>&copy; {new Date().getFullYear()} Alp Yalay.
              <Link href="/#translations" className="text-primary-DEFAULT hover:text-accent-DEFAULT hover:underline ml-sm">
                {t('Return to main portfolio', 'Ana portfolyoma dön')}
              </Link>
            </p>
          </div>
        </footer>

        {/* Floating button to main portfolio */}
        <Link href="/#home"
              className="fixed bottom-5 right-5 bg-primary-DEFAULT text-text-on-dark w-12 h-12 rounded-full
                         flex items-center justify-center text-2xl shadow-lg
                         hover:bg-accent-DEFAULT hover:scale-110 transition-all duration-300"
              aria-label={t("Return to main portfolio", "Ana portfolyoma dön")}
              title={t("Return to main portfolio", "Ana portfolyoma dön")}>
          <HomeIcon className="w-6 h-6" />
        </Link>
      </div>
    </>
  );
};

export default BattleTalentCaseStudyPage;
