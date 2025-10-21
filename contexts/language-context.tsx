"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "tr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.blog": "Blog",

    // Hero Section
    "hero.greeting": "👋 Hi, I'm Alp Yalay",
    "hero.title.a": "A",
    "hero.title.translator": "TRANSLATOR &",
    "hero.title.localizer": "LOCALIZER",
    "hero.description":
      "I offer Turkish ↔ English translation services with a focus on video game localization. Based in Istanbul, Turkey.",
    "hero.description.mobile": "Video game localization and Turkish ↔ English translation services.",
    "hero.cta.contact": "Contact Me",
    "hero.scroll": "Discover More",
    "hero.status": "Available for projects",
    "hero.languages": "Languages",
    "hero.toefl": "TOEFL Score",
    "hero.game": "Game",
    "hero.localization": "Localization",

    // About Section
    "about.title": "About Me",
    "about.who.title": "Who I Am",
    "about.who.description":
      "I'm Alp Yalay, a Translator and Localizer based in Istanbul, Turkey. I graduated from Izmir University of Economics with a degree in Translation and Interpretation. I focus on video game localization, combining my passion for language and technology to help make games accessible to a wider audience.",
    "about.education.title": "Education & Experience",
    "about.education.degree":
      "Bachelor's Degree: Translation and Interpreting, Izmir University of Economics (2018-2022)",
    "about.education.social":
      "Social Media Intern: Muse İstanbul (Apr 2024 - Aug 2024), assisted with managing social media accounts for iGA Istanbul Airport",
    "about.education.barista":
      "Barista, Waiter, Cashier: Asma Yaprağı (Jul 2015 - Sep 2021), handling customer service and financial management",
    "about.education.intern":
      "Intern: Şafak Tercüme (Feb 2021 - Mar 2021), gaining experience in translation workflows",
    "about.quote": "Bridging language gaps with precision and cultural understanding.",
    "about.expertise": "My Areas of Focus",

    // Skills Section
    "skills.title": "My Skills",
    "skills.tech.title": "Technologies I Use",
    "skills.translation.title": "Translation",
    "skills.translation.desc": "Translation services between Turkish and English",
    "skills.localization.title": "Localization",
    "skills.localization.desc": "Adapting content for cultural and regional relevance",
    "skills.technical.title": "Technical Translation",
    "skills.technical.desc": "Translation for technical and software content",
    "skills.transcreation.title": "Transcreation",
    "skills.transcreation.desc": "Creative adaptation of marketing and promotional materials",

    // Projects Section
    "projects.title": "My Projects",
    "projects.subtitle": "A showcase of my translation work, software projects, and technical skills.",
    "projects.swipe.hint": "Swipe left or right to navigate projects",
    "projects.read.more": "Read more",
    "projects.read.less": "Show less",
    "projects.features": "Key Features",
    "projects.steam": "Steam",
    "projects.github": "GitHub",
    "projects.casestudy": "Case Study",
    "projects.chatgpt": "ChatGPT",
    "projects.gemini": "Gemini",

    // Experience/AI Chat Section
    "experience.title": "Chat with AlpGPT 3.5",
    "experience.subtitle": "Chat with AlpGPT 3.5 to learn about Alp's professional journey, skills, projects, and educational background.",
    "experience.placeholder": "Ask AlpGPT 3.5 about Alp's translation journey, skills, or projects...",
    "experience.send": "Send",
    "experience.reset": "Reset chat",
    "experience.typing": "AlpGPT 3.5 is typing...",
    "experience.quick.experience": "Work experience",
    "experience.quick.skills": "Skills",
    "experience.quick.projects": "Projects",
    "experience.quick.education": "Education",
    "experience.ai.greeting":
      "👋 Hi there! I'm AlpGPT 3.5, your AI assistant. I can help you learn about Alp's professional journey, skills, and project experiences.",

    // Blog Section
    "blog.title": "My Latest Articles",
    "blog.subtitle": "Stay updated with the latest trends and breakthroughs in AI and automation.",
    "blog.read": "Read",
    "blog.min.read": "min read",
    "blog.insights": "Insights",
    "blog.battle.title": "Case Study: Bringing Battle Talent VR to Turkish Players",
    "blog.battle.excerpt":
      "A comprehensive look at the ongoing Turkish localization project for Battle Talent VR game, showcasing problem-solving in challenging localization environments.",
    "blog.battle.date": "January 2021 - Present",
    "blog.battle.readTime": "12 min",
    "blog.automation.title": "TBD - Blog Post Coming Soon",
    "blog.automation.excerpt":
      "This blog post is currently in development. Stay tuned for insights on emerging automation technologies.",
    "blog.automation.date": "Coming Soon",
    "blog.automation.readTime": "TBD",
    "blog.ai.title": "TBD - Blog Post Coming Soon",
    "blog.ai.excerpt":
      "This blog post is currently in development. Stay tuned for discussions on AI ethics and safety.",
    "blog.ai.date": "Coming Soon",
    "blog.ai.readTime": "TBD",
    "blog.category.casestudy": "Case Study",
    "blog.category.automation": "Automation",
    "blog.category.safety": "AI Safety",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle":
      "Have a translation project in mind or want to discuss a localization collaboration? I'd love to hear from you!",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.name.placeholder": "Your name",
    "contact.form.email.placeholder": "Your email",
    "contact.form.message.placeholder": "Your message",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.success.title": "Message Sent!",
    "contact.form.success.message": "Thank you for reaching out. I'll get back to you as soon as possible.",
    "contact.form.error.name.required": "Name is required",
    "contact.form.error.name.length": "Name must be at least 2 characters",
    "contact.form.error.email.required": "Email is required",
    "contact.form.error.email.invalid": "Please enter a valid email address",
    "contact.form.error.message.required": "Message is required",
    "contact.form.error.message.length": "Message must be at least 10 characters",

    // Footer
    "footer.description": "Translator & Localizer focusing on video game localization between Turkish and English.",
    "footer.links": "Quick Links",
    "footer.services": "Services",
    "footer.services.translation": "Translation",
    "footer.services.localization": "Localization",
    "footer.services.game": "Game Localization",
    "footer.services.technical": "Technical Translation",
    "footer.services.transcreation": "Transcreation",
    "footer.copyright": "All rights reserved.",

    // Loading Screen
    "loading.text": "Initializing Translation Services...",

    // Stats
    "stats.degree": "Bachelor's Degree",
    "stats.degree.desc": "Translation and Interpreting",
    "stats.languages": "Languages",
    "stats.languages.desc": "Turkish and English",
    "stats.toefl": "TOEFL Score",
    "stats.toefl.desc": "English proficiency",
    "stats.projects": "Game Translations",
    "stats.projects.desc": "Official and fan projects",

    // Work Experience
    "work.title": "Work Experience",
    "work.subtitle": "My professional journey in translation and localization",
    "work.achievements": "Key Achievements",
    "work.resume": "Download Full Resume",

    // Case Study
    "casestudy.title": "Case Study: Bringing Battle Talent VR to Turkish Players",
    "casestudy.excerpt":
      "A comprehensive look at the ongoing Turkish localization project for Battle Talent VR game, showcasing problem-solving in challenging localization environments.",
    "casestudy.date": "January 2021 - Present",
    "casestudy.readTime": "12 min",
    "casestudy.author": "Alp Yalay",
    "casestudy.category": "Case Study",
    "casestudy.tag.localization": "Game Localization",
    "casestudy.tag.vr": "VR Gaming",
    "casestudy.tag.turkish": "Turkish Translation",

    // Case Study Content
    "casestudy.overview.title": "Project Overview",
    "casestudy.overview.project": "Project",
    "casestudy.overview.project.value": "Turkish Localization of Battle Talent",
    "casestudy.overview.client": "Client",
    "casestudy.overview.client.value": "CyDream Technologies Limited",
    "casestudy.overview.platform": "Platform",
    "casestudy.overview.platform.value": "Steam VR, Meta Quest",
    "casestudy.overview.timeline": "Timeline",
    "casestudy.overview.timeline.value": "January 2021 - Present (Ongoing)",
    "casestudy.overview.volume": "Volume",
    "casestudy.overview.volume.value": "Approx. 14,700 words / 86,000 characters (as of April 2025)",

    "casestudy.intro.title": "Introduction",
    "casestudy.intro.content":
      "This case study details the ongoing Turkish localization project for Battle Talent, a physics-based VR rogue-lite action game by CyDream Technologies. I initially took on this project out of personal interest while completing my university studies in Translation & Interpretation. It served as an important first step into game localization, helping me develop adaptability, resourcefulness, and a long-term perspective.",

    "casestudy.challenge.title": "The Challenges: Navigating Localization Hurdles Early in My Career",
    "casestudy.challenge.intro":
      "My main goal was to gain practical game localization experience by applying my academic knowledge to a real-world project and demonstrating my abilities in this field. However, I encountered several significant hurdles along the way:",
    "casestudy.challenge.indirect.content":
      "The English text used as the source for the Turkish translation was itself a non-professional translation from the original Simplified Chinese. This introduced potential ambiguities and required careful interpretation.",
    "casestudy.challenge.tooling.content":
      "The localization process for all languages relied on a shared Google Sheet. This lacked the robust features of standard CAT tools, making terminology management and consistency tracking more difficult.",
    "casestudy.challenge.terminology.content":
      "Finding suitable Turkish terminology for unique game concepts was challenging due to the lack of established Turkish gaming glossaries or readily accessible translation memories.",
    "casestudy.challenge.testing.content":
      "No dedicated developer build was available for testing. Validating translations meant waiting for monthly public game updates and testing within the live VR environment.",

    "casestudy.process.title": "My Process & Solutions: Adaptability and Continuous Improvement",
    "casestudy.process.intro": "Despite the constraints, I established a pragmatic and evolving workflow:",
    "casestudy.process.research.content":
      "I approached each term with research, utilizing online dictionaries, cross-referencing with other Turkish-localized games, and leveraging AI for more obscure terms.",
    "casestudy.process.glossary.content":
      "I created and maintained a personal glossary to track key terms and ensure consistency, and I plan to develop a dedicated terminology management app.",
    "casestudy.process.lqa.content":
      "Following each monthly game update, I dedicated time to test the newly added Turkish strings within the VR game itself, identifying and correcting errors or awkward phrasing.",
    "casestudy.process.hybrid.content":
      "I periodically fed the entire translation text into AI (Gemini 1.5 Pro) to identify potential inconsistencies, allowing for targeted corrections.",

    "casestudy.results.title": "Results & Impact: Delivering Value and Fostering Growth",
    "casestudy.results.intro":
      "The ongoing localization effort has successfully made Battle Talent accessible to its Turkish-speaking audience and has been a significant source of personal development for me:",
    "casestudy.results.accessibility.content":
      "I delivered and have maintained a complete Turkish localization, making the VR experience fully accessible for Turkish-speaking players. Developer data indicated that approximately 84 players in Turkey were engaging with the game in Turkish.",
    "casestudy.results.relationship.content":
      "I established and maintained a relationship of trust with CyDream Technologies, who relied on my efforts for the Turkish market.",
    "casestudy.results.career.title": "Shaping My Career Path",
    "casestudy.results.career.content":
      "This project solidified my passion for game localization and deepened my understanding of the need for quality localization in the Turkish market.",
    "casestudy.results.foundation.title": "A Stepping Stone for Future Projects",
    "casestudy.results.foundation.content":
      "This experience gave me the confidence and skillset to take on larger, more complex localization projects, such as Heroes of Hammerwatch II.",

    "casestudy.conclusion.title": "Conclusion",
    "casestudy.conclusion.content":
      "The Battle Talent Turkish localization project is a testament to my commitment to proactive learning and dedication. Overcoming initial challenges related to resources, tools, and testing methodology, this ongoing effort has not only delivered a valuable localization for Turkish VR gamers but has also provided an invaluable foundation, shaping my approach to game localization—one characterized by continuous improvement, adaptability, and a commitment to quality.",

    "casestudy.metrics.title": "Key Project Metrics",
    "casestudy.metrics.words": "Words Translated",
    "casestudy.metrics.years.short": "Years",
    "casestudy.metrics.ongoing": "Ongoing Project",
    "casestudy.metrics.players": "Turkish Players Reached",

    "casestudy.cta.title": "Ready to Discuss Your Localization Project?",
    "casestudy.cta.description":
      "Let's talk about how I can help bring your game or content to Turkish audiences with the same dedication and quality.",
    "casestudy.cta.button": "Start the Conversation",

    "blog.back": "Back to Home",
    "blog.notfound.title": "Blog Post Not Found",
    "blog.notfound.message": "The blog post you're looking for doesn't exist.",
  },
  tr: {
    // Navigation
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımda",
    "nav.skills": "Yetenekler",
    "nav.projects": "Projeler",
    "nav.experience": "Deneyim",
    "nav.contact": "İletişim",
    "nav.blog": "Blog",

    // Hero Section
    "hero.greeting": "👋 Merhaba, ben Alp Yalay",
    "hero.title.a": "",
    "hero.title.translator": "ÇEVİRMEN VE",
    "hero.title.localizer": "YERELLEŞTİRİCİ",
    "hero.description":
      "Video oyunlarının yerelleştirilmesi alanına odaklanmış, Türkçe ve İngilizce dilleri arasında çeviri hizmetleri sunuyorum. İstanbul, Türkiye'de çalışmalarıma devam ediyorum.",
    "hero.description.mobile": "Video oyunlarının yerelleştirilmesi ve Türkçe ↔ İngilizce çeviri hizmetleri.",
    "hero.cta.contact": "İletişime Geç",
    "hero.scroll": "Daha Fazlasını Keşfet",
    "hero.status": "Projeler için müsait",
    "hero.languages": "Diller",
    "hero.toefl": "TOEFL Puanı",
    "hero.game": "Oyun",
    "hero.localization": "Lokalizasyon",

    // About Section
    "about.title": "Hakkımda",
    "about.who.title": "Ben Kimim",
    "about.who.description":
      "Ben Alp Yalay. İzmir Ekonomi Üniversitesi Çeviribilim bölümü mezunu, İstanbul'da yaşayan bir çevirmenim. Özellikle video oyunlarının yerelleştirilmesi alanına odaklandım. Dil ve teknoloji bilgimi kullanarak hedef kitleye uygun, akıcı ve kaliteli çeviriler sunmak için özenle çalışıyorum.",
    "about.education.title": "Eğitim ve Deneyimlerim",
    "about.education.degree": "Lisans Derecesi: İzmir Ekonomi Üniversitesi, Çeviribilim (2018-2022)",
    "about.education.social":
      "Sosyal Medya Stajyeri: Muse İstanbul (Nisan 2024 - Ağustos 2024). iGA İstanbul Havalimanı sosyal medya hesaplarının yönetimine destek verdim.",
    "about.education.barista":
      "Barista, Garson, Kasiyer: Asma Yaprağı (Temmuz 2015 - Eylül 2021). Müşteri hizmetleri ve finansal yönetim konularında çalıştım.",
    "about.education.intern":
      "Stajyer: Şafak Tercüme (Şubat 2021 - Mart 2021). Profesyonel çeviri süreçlerinde deneyim edindim.",
    "about.quote": "Diller arasındaki engelleri hassasiyet ve kültürel anlayışla aşmayı hedefliyorum.",
    "about.expertise": "Odak Alanlarım",

    // Skills Section
    "skills.title": "Yeteneklerim",
    "skills.tech.title": "Kullandığım Teknolojiler",
    "skills.translation.title": "Çeviri",
    "skills.translation.desc": "Türkçe ve İngilizce arasında çeviri hizmetleri",
    "skills.localization.title": "Lokalizasyon",
    "skills.localization.desc": "İçeriği kültürel ve bölgesel uygunluk için uyarlama",
    "skills.technical.title": "Teknik Çeviri",
    "skills.technical.desc": "Teknik ve yazılım içeriği için çeviri",
    "skills.transcreation.title": "Transkrasyon",
    "skills.transcreation.desc": "Pazarlama ve tanıtım materyallerinin yaratıcı uyarlaması",

    // Projects Section
    "projects.title": "Öne Çıkan Projelerim",
    "projects.subtitle": "Çeviri çalışmalarımı, yazılım projelerimi ve teknik becerilerimi burada bulabilirsiniz.",
    "projects.swipe.hint": "Projelerde gezinmek için sola veya sağa kaydırın",
    "projects.read.more": "Devamını oku",
    "projects.read.less": "Daha az göster",
    "projects.features": "Temel Özellikler",
    "projects.steam": "Steam",
    "projects.github": "GitHub",
    "projects.casestudy": "Vaka Çalışması",
    "projects.chatgpt": "ChatGPT",
    "projects.gemini": "Gemini",

    // Experience/AI Chat Section
    "experience.title": "AlpGPT 3.5 ile Sohbet Et",
    "experience.subtitle": "Alp'in profesyonel yolculuğu, becerileri, projeleri ve eğitim geçmişi hakkında bilgi almak için AlpGPT 3.5 ile sohbet edin.",
    "experience.placeholder": "AlpGPT 3.5'e Alp'in çeviri yolculuğu, becerileri veya projeleri hakkında soru sorun...",
    "experience.send": "Gönder",
    "experience.reset": "Sohbeti sıfırla",
    "experience.typing": "AlpGPT 3.5 yazıyor...",
    "experience.quick.experience": "İş deneyimi",
    "experience.quick.skills": "Beceriler",
    "experience.quick.projects": "Projeler",
    "experience.quick.education": "Eğitim",
    "experience.ai.greeting":
      "👋 Merhaba! Ben AlpGPT 3.5, yapay zeka asistanınız. Alp'in profesyonel yolculuğu, becerileri ve proje deneyimleri hakkında bilgi edinmenize yardımcı olabilirim.",

    // Blog Section
    "blog.title": "Son Yazılarım",
    "blog.subtitle": "Yapay zeka ve otomasyon alanındaki en son trendler ve gelişmelerden haberdar olun.",
    "blog.read": "Oku",
    "blog.min.read": "dk okuma",
    "blog.insights": "Görüşler",
    "blog.battle.title": "Vaka Çalışması: Battle Talent VR'ı Türk Oyunculara Getirmek",
    "blog.battle.excerpt":
      "Battle Talent VR oyunu için devam eden Türkçe lokalizasyon projesine kapsamlı bir bakış, zorlu lokalizasyon ortamlarında problem çözmeyi sergiliyor.",
    "blog.battle.date": "Ocak 2021 - Devam Ediyor",
    "blog.battle.readTime": "12 dk",
    "blog.automation.title": "TBD - Blog Yazısı Yakında Geliyor",
    "blog.automation.excerpt":
      "Bu blog yazısı şu anda geliştirilmekte. Gelişmekte olan otomasyon teknolojileri hakkında görüşler için bizi takip edin.",
    "blog.automation.date": "Yakında",
    "blog.automation.readTime": "TBD",
    "blog.ai.title": "TBD - Blog Yazısı Yakında Geliyor",
    "blog.ai.excerpt":
      "Bu blog yazısı şu anda geliştirilmekte. AI etiği ve güvenliği üzerine tartışmalar için bizi takip edin.",
    "blog.ai.date": "Yakında",
    "blog.ai.readTime": "TBD",
    "blog.category.casestudy": "Vaka Çalışması",
    "blog.category.automation": "Otomasyon",
    "blog.category.safety": "AI Güvenliği",

    // Contact Section
    "contact.title": "İletişime Geçin",
    "contact.subtitle":
      "Aklınızda bir çeviri projesi var mı veya lokalizasyon işbirliği tartışmak istiyor musunuz? Sizden haber almayı çok isterim!",
    "contact.email": "E-posta",
    "contact.location": "Konum",
    "contact.form.name": "Ad",
    "contact.form.email": "E-posta",
    "contact.form.message": "Mesaj",
    "contact.form.name.placeholder": "Adınız",
    "contact.form.email.placeholder": "E-posta adresiniz",
    "contact.form.message.placeholder": "Mesajınız",
    "contact.form.send": "Mesaj Gönder",
    "contact.form.sending": "Gönderiliyor...",
    "contact.form.success.title": "Mesaj Gönderildi!",
    "contact.form.success.message": "İletişime geçtiğiniz için teşekkürler. En kısa sürede size geri döneceğim.",
    "contact.form.error.name.required": "Ad gereklidir",
    "contact.form.error.name.length": "Ad en az 2 karakter olmalıdır",
    "contact.form.error.email.required": "E-posta gereklidir",
    "contact.form.error.email.invalid": "Lütfen geçerli bir e-posta adresi girin",
    "contact.form.error.message.required": "Mesaj gereklidir",
    "contact.form.error.message.length": "Mesaj en az 10 karakter olmalıdır",

    // Footer
    "footer.description":
      "Türkçe ve İngilizce arasında video oyun lokalizasyonuna ilgi duyan Çevirmen ve Yerelleştirici.",
    "footer.links": "Hızlı Bağlantılar",
    "footer.services": "Hizmetler",
    "footer.services.translation": "Çeviri",
    "footer.services.localization": "Lokalizasyon",
    "footer.services.game": "Oyun Lokalizasyonu",
    "footer.services.technical": "Teknik Çeviri",
    "footer.services.transcreation": "Transkrasyon",
    "footer.copyright": "Tüm hakları saklıdır.",

    // Loading Screen
    "loading.text": "Çeviri Hizmetleri Başlatılıyor...",

    // Stats
    "stats.degree": "Lisans Derecesi",
    "stats.degree.desc": "Çeviribilim",
    "stats.languages": "Diller",
    "stats.languages.desc": "Türkçe ve İngilizce",
    "stats.toefl": "TOEFL Puanı",
    "stats.toefl.desc": "İngilizce yeterliliği",
    "stats.projects": "Oyun Çevirileri",
    "stats.projects.desc": "Resmi ve fan projeleri",

    // Work Experience
    "work.title": "İş Deneyimi",
    "work.subtitle": "Çeviri ve lokalizasyondaki profesyonel yolculuğum",
    "work.achievements": "Temel Başarılar",
    "work.resume": "Tam Özgeçmişi İndir",

    // Case Study
    "casestudy.title": "Vaka Çalışması: Battle Talent VR'ı Türk Oyunculara Getirmek",
    "casestudy.excerpt":
      "Battle Talent VR oyunu için devam eden Türkçe lokalizasyon projesine kapsamlı bir bakış, zorlu lokalizasyon ortamlarında problem çözmeyi sergiliyor.",
    "casestudy.date": "Ocak 2021 - Devam Ediyor",
    "casestudy.readTime": "12 dk",
    "casestudy.author": "Alp Yalay",
    "casestudy.category": "Vaka Çalışması",
    "casestudy.tag.localization": "Oyun Lokalizasyonu",
    "casestudy.tag.vr": "VR Oyunları",
    "casestudy.tag.turkish": "Türkçe Çeviri",

    // Case Study Content
    "casestudy.overview.title": "Proje Genel Bakış",
    "casestudy.overview.project": "Proje",
    "casestudy.overview.project.value": "Battle Talent Türkçe Lokalizasyonu",
    "casestudy.overview.client": "Müşteri",
    "casestudy.overview.client.value": "CyDream Technologies Limited",
    "casestudy.overview.platform": "Platform",
    "casestudy.overview.platform.value": "Steam VR, Meta Quest",
    "casestudy.overview.timeline": "Zaman Çizelgesi",
    "casestudy.overview.timeline.value": "Ocak 2021 - Devam Ediyor",
    "casestudy.overview.volume": "Hacim",
    "casestudy.overview.volume.value": "Yaklaşık 14.700 kelime / 86.000 karakter (Nisan 2025 itibariyle)",

    "casestudy.intro.title": "Giriş",
    "casestudy.intro.content":
      "Bu vaka çalışması, CyDream Technologies tarafından geliştirilen fizik tabanlı VR rogue-lite aksiyon oyunu Battle Talent için devam eden Türkçe lokalizasyon projesini detaylandırıyor. Başlangıçta Çeviribilim lisans eğitimi sırasında kişisel bir ilgiyle başladığım bu proje, oyun lokalizasyonu dünyasına adım atmamda önemli bir rol oynadı ve uyum sağlama, kaynakları doğru kullanma ve uzun vadeli bir bakış açısı geliştirmemi sağladı.",

    "casestudy.challenge.title": "Zorluklar: Kariyerimin Başlangıcındaki Lokalizasyon Engelleri",
    "casestudy.challenge.intro":
      "Temel amacım, akademik bilgilerimi gerçek bir projeye uygulayarak pratik oyun lokalizasyonu deneyimi kazanmak ve bu alandaki yeteneklerimi göstermekti. Ancak bu süreçte bazı önemli engellerle karşılaştım:",
    "casestudy.challenge.indirect.title": "Dolaylı Kaynak Metin",
    "casestudy.challenge.indirect.content":
      "Türkçe çevirinin kaynağı olan İngilizce metin, orijinal Basitleştirilmiş Çince metinden profesyonel olmayan bir çeviriydi. Bu durum, metinde olası anlam belirsizliklerine yol açıyor ve dikkatli bir yorumlama gerektiriyordu.",
    "casestudy.challenge.tooling.title": "Araç ve İş Akışı Kısıtlamaları",
    "casestudy.challenge.tooling.content":
      "Yerelleştirme süreci, farklı dillerdeki tüm çevirmenler için ortak kullanılan bir Google E-Tablosu üzerinden yürütülüyordu. Bu yöntem, standart CAT araçlarının sunduğu güçlü özelliklerden yoksundu ve terminoloji yönetimi ile tutarlılık takibini zorlaştırıyordu.",
    "casestudy.challenge.terminology.title": "Terminoloji ve Tutarlılık",
    "casestudy.challenge.terminology.content":
      "Oyuna özgü kavramlar için uygun Türkçe karşılıklar bulmak, yerleşik Türkçe oyun sözlüklerinin veya erişilebilir çeviri belleklerinin olmaması nedeniyle zordu.",
    "casestudy.challenge.testing.title": "Sınırlı Test Ortamı",
    "casestudy.challenge.testing.content":
      "Test için özel bir geliştirici sürümü mevcut değildi. Çevirilerin doğrulanması, aylık olarak yayınlanan genel oyun güncellemelerini beklemeyi ve testleri canlı VR ortamında yapmayı gerektiriyordu.",

    "casestudy.process.title": "Süreç ve Çözümlerim: Uyum Sağlama ve Sürekli Gelişim",
    "casestudy.process.intro": "Kısıtlamalara rağmen, pratik ve gelişime açık bir iş akışı oluşturdum:",
    "casestudy.process.research.title": "Araştırma Odaklı Çeviri",
    "casestudy.process.research.content":
      "Her bir terime araştırma yaparak yaklaştım. Çevrimiçi sözlüklerden yararlandım, diğer Türkçe yerelleştirilmiş oyunlardaki çevirilerle karşılaştırmalar yaptım ve anlaşılması zor terimler için yapay zekadan destek aldım.",
    "casestudy.process.glossary.title": "Kişisel Sözlük Geliştirme",
    "casestudy.process.glossary.content":
      "Anahtar terimleri takip etmek ve tutarlılığı sağlamak amacıyla kişisel bir sözlük oluşturdum ve bunu düzenli olarak güncelledim. Ayrıca, özel bir terminoloji yönetimi uygulaması geliştirmeyi planlıyorum.",
    "casestudy.process.lqa.title": "Güncelleme Sonrası LQA",
    "casestudy.process.lqa.content":
      "Her aylık oyun güncellemesinin ardından, VR oyunu içinde yeni eklenen Türkçe metinleri test etmeye, hataları ve kulağa doğal gelmeyen ifadeleri belirleyip düzeltmeye özel zaman ayırdım.",
    "casestudy.process.hybrid.title": "Hibrit Çeviri Metodolojisi",
    "casestudy.process.hybrid.content":
      "Tüm çeviri metnini düzenli aralıklarla Gemini 1.5 Pro'ya yükleyerek olası tutarsızlıkları belirledim ve bu sayede hedefli düzeltmeler yapabildim.",

    "casestudy.results.title": "Sonuçlar ve Etkileri: Değer Yaratmak ve Gelişimi Desteklemek",
    "casestudy.results.intro":
      "Devam eden yerelleştirme çabalarım, Battle Talent'ın Türkçe konuşan kitleye başarıyla ulaşmasını sağladı ve kişisel gelişimime önemli katkılarda bulundu:",
    "casestudy.results.accessibility.title": "Türk Oyuncular için Gelişmiş Erişilebilirlik",
    "casestudy.results.accessibility.content":
      "Tamamlanmış bir Türkçe yerelleştirme sundum ve bunun sürekliliğini sağladım. Bu sayede VR deneyimi, Türkçe konuşan oyuncular için tamamen erişilebilir hale geldi. Geliştirici verilerine göre, Türkiye'de yaklaşık 84 oyuncu oyunu Türkçe olarak deneyimledi.",
    "casestudy.results.relationship.title": "Güçlü Geliştirici İlişkisi",
    "casestudy.results.relationship.content":
      "Türk pazarı için yürüttüğüm bu çalışma sayesinde CyDream Technologies ile güvene dayalı bir ilişki kurdum ve bu ilişkiyi sürdürdüm.",
    "casestudy.results.career.title": "Kariyer Yolumun Şekillenmesi",
    "casestudy.results.career.content":
      "Bu proje, oyun lokalizasyonuna olan ilgimi pekiştirdi ve Türk pazarında kaliteli lokalizasyon ihtiyacını daha iyi anlamamı sağladı.",
    "casestudy.results.foundation.title": "Gelecek Projeler İçin Bir Adım",
    "casestudy.results.foundation.content":
      "Bu deneyim, Heroes of Hammerwatch II gibi daha büyük ve karmaşık lokalizasyon projelerini üstlenmem için bana güven ve beceri kazandırdı.",

    "casestudy.conclusion.title": "Sonuç",
    "casestudy.conclusion.content":
      "Battle Talent Türkçe lokalizasyon projesi, öğrenmeye ve gelişime verdiğim önemin bir göstergesidir. Kaynaklar, araçlar ve test metodolojisiyle ilgili başlangıçtaki zorlukların üstesinden gelerek yürüttüğüm bu çalışma, sadece Türk VR oyuncuları için değerli bir lokalizasyon sunmakla kalmadı, aynı zamanda sürekli iyileştirme, uyum sağlama ve kaliteye verdiğim önemle karakterize edilen oyun lokalizasyonuna yönelik yaklaşımımı şekillendiren önemli bir deneyim oldu.",

    "casestudy.metrics.title": "Temel Proje Metrikleri",
    "casestudy.metrics.words": "Çevrilen Kelimeler",
    "casestudy.metrics.years.short": "Yıl",
    "casestudy.metrics.ongoing": "Devam Eden Proje",
    "casestudy.metrics.players": "Ulaşılan Türk Oyuncular",

    "casestudy.cta.title": "Lokalizasyon Projenizi Tartışmaya Hazır mısınız?",
    "casestudy.cta.description":
      "Oyununuzu veya içeriğinizi aynı adanmışlık ve kaliteyle Türk kitlelerine nasıl getirebileceğim konusunda konuşalım.",
    "casestudy.cta.button": "Sohbeti Başlat",

    "blog.back": "Ana Sayfaya Dön",
    "blog.notfound.title": "Blog Yazısı Bulunamadı",
    "blog.notfound.message": "Aradığınız blog yazısı mevcut değil.",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "tr")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    const langSpecificTranslations = translations[language] as Record<string, string>;
    // Check if the key exists, even if its value is an empty string
    if (Object.prototype.hasOwnProperty.call(langSpecificTranslations, key)) {
      return langSpecificTranslations[key];
    }
    return key; // Fallback to key only if the key truly doesn't exist
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
