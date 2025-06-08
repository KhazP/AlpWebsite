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
      "Specializing in video game localization with Turkish ↔ English translation services. Based in Istanbul, Turkey.",
    "hero.description.mobile": "Specializing in video game localization. Turkish ↔ English translation services.",
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
      "I'm Alp Yalay, a Translator & Localizer based in Istanbul, Turkey, with a degree in Translation and Interpretation from Izmir University of Economics.",
    "about.expertise":
      "My main area of expertise is video game localization. Working in this field, I use my language and technology knowledge together to deliver high-quality translations that resonate with the target audience.",
    "about.education.title": "Education & Experience",
    "about.education.degree":
      "Bachelor's Degree: Translation and Interpreting from Izmir University of Economics (2018-2022)",
    "about.education.social":
      "Junior Social Media Manager: Muse İstanbul (Apr 2024 - Aug 2024), managing social media accounts for iGA Istanbul Airport",
    "about.education.barista":
      "Barista, Waiter, Cashier: Asma Yaprağı (Jul 2015 - Sep 2021), handling customer service and financial management",
    "about.education.intern":
      "Intern: Şafak Tercüme (Feb 2021 - Mar 2021), gaining experience in translation workflows",
    "about.quote": "Bridging language gaps with precision and cultural understanding.",

    // Skills Section
    "skills.title": "My Skills",
    "skills.tech.title": "Tech Stack",
    "skills.translation.title": "Translation",
    "skills.translation.desc": "Professional translation services between Turkish and English",
    "skills.localization.title": "Localization",
    "skills.localization.desc": "Adapting content for cultural and regional appropriateness",
    "skills.technical.title": "Technical Translation",
    "skills.technical.desc": "Specialized translation for technical and software content",
    "skills.transcreation.title": "Transcreation",
    "skills.transcreation.desc": "Creative adaptation of marketing and promotional materials",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.subtitle": "A showcase of my translation work, software projects, and technical skills",
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
    "experience.title": "Chat with AI Alp",
    "experience.subtitle": "Ask about my translation services, skills, projects, or education",
    "experience.placeholder": "Ask about my translation services, skills, or projects...",
    "experience.send": "Send",
    "experience.reset": "Reset chat",
    "experience.typing": "AI Alp is typing...",
    "experience.quick.experience": "Work experience",
    "experience.quick.skills": "Skills",
    "experience.quick.projects": "Projects",
    "experience.quick.education": "Education",
    "experience.ai.greeting":
      "👋 Hi there! I'm AI Alp, your virtual assistant. Ask me about Alp's translation services or skills!",

    // Blog Section
    "blog.title": "Latest Insights",
    "blog.subtitle": "Stay updated with the latest trends and breakthroughs in AI and automation",
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
    "contact.phone": "Phone",
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
    "footer.description": "Translator & Localizer specializing in video game localization between Turkish and English.",
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
      "This case study details the ongoing Turkish localization project for Battle Talent, a physics-based VR rogue-lite action game developed by CyDream Technologies. Undertaken initially as a personal challenge while completing university studies in Translation & Interpretation, this project served as a crucial first step into the world of professional game localization, demanding adaptability, resourcefulness, and a long-term commitment.",

    "casestudy.challenge.title": "The Challenge: Navigating Early Career Localization Hurdles",
    "casestudy.challenge.intro":
      "The primary objective was to proactively seek practical game localization experience, applying academic knowledge to a real-world project and demonstrating capability in the field. However, this ambition came with several significant hurdles:",
    "casestudy.challenge.indirect.title": "Indirect Source Text",
    "casestudy.challenge.indirect.content":
      "The English text used as the source for Turkish translation was itself a non-professional translation from the original Simplified Chinese, introducing a layer of potential ambiguity and requiring careful interpretation.",
    "casestudy.challenge.tooling.title": "Tooling & Workflow Constraints",
    "casestudy.challenge.tooling.content":
      "The localization process relied entirely on a shared Google Sheet for all translators across different languages. This lacked the robust features of standard CAT tools, making terminology management and consistency tracking difficult.",
    "casestudy.challenge.terminology.title": "Terminology & Consistency",
    "casestudy.challenge.terminology.content":
      "Establishing appropriate Turkish terminology for unique game concepts was challenging due to the lack of established Turkish gaming glossaries or accessible translation memories.",
    "casestudy.challenge.testing.title": "Limited Testing Environment",
    "casestudy.challenge.testing.content":
      "No dedicated developer build was available for testing. Validating translations required waiting for monthly public game updates and testing within the live VR environment.",

    "casestudy.process.title": "Process & Solution: Adaptability and Continuous Improvement",
    "casestudy.process.intro": "Despite the constraints, a pragmatic and evolving workflow was established:",
    "casestudy.process.research.title": "Research-Driven Translation",
    "casestudy.process.research.content":
      "Each term was approached with research, utilizing online dictionaries, cross-referencing translations in other Turkish-localized games, and leveraging AI for obscure terms.",
    "casestudy.process.glossary.title": "Personal Glossary Development",
    "casestudy.process.glossary.content":
      "A personal glossary was created and maintained to track key terms and ensure consistency, with plans to develop a dedicated terminology management app.",
    "casestudy.process.lqa.title": "Post-Update LQA",
    "casestudy.process.lqa.content":
      "Following each monthly game update, dedicated time was spent testing newly added Turkish strings within the VR game itself, identifying and correcting errors.",
    "casestudy.process.hybrid.title": "Hybrid Translation Methodology",
    "casestudy.process.hybrid.content":
      "Leveraged AI (Gemini 1.5 Pro) to identify potential inconsistencies by feeding the entire translation text periodically, allowing for targeted rectification.",

    "casestudy.results.title": "Results & Impact: Delivering Value and Fostering Growth",
    "casestudy.results.intro":
      "The ongoing localization effort has successfully made Battle Talent accessible to its Turkish-speaking audience and yielded significant personal development:",
    "casestudy.results.accessibility.title": "Enhanced Accessibility for Turkish Players",
    "casestudy.results.accessibility.content":
      "Delivered and maintained a complete Turkish localization, making the VR experience fully accessible for Turkish-speaking players. Developer data indicated approximately 84 players engaging with the game in Turkey.",
    "casestudy.results.relationship.title": "Strong Developer Relationship",
    "casestudy.results.relationship.content":
      "Trust was established and maintained with CyDream Technologies, who relied on this sole effort for the Turkish market.",
    "casestudy.results.career.title": "Solidified Career Path",
    "casestudy.results.career.content":
      "The project confirmed a passion for game localization and highlighted the need for quality localization in the Turkish market.",
    "casestudy.results.foundation.title": "Foundation for Future Projects",
    "casestudy.results.foundation.content":
      "The experience provided confidence and skillset to take on larger, more complex localization projects, such as Heroes of Hammerwatch II.",

    "casestudy.conclusion.title": "Conclusion",
    "casestudy.conclusion.content":
      "The Battle Talent Turkish localization project stands as a testament to proactive learning and dedication. Overcoming initial challenges related to resources, tools, and testing methodology, this ongoing effort not only delivered a valuable localization for Turkish VR gamers but also provided an invaluable foundation, shaping a dedicated approach to game localization characterized by continuous improvement, adaptability, and a commitment to quality.",

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
    "hero.title.a": "BİR",
    "hero.title.translator": "ÇEVİRMEN VE",
    "hero.title.localizer": "YERELLEŞTİRİCİ",
    "hero.description":
      "Video oyun lokalizasyonunda uzmanlaşmış, Türkçe ↔ İngilizce çeviri hizmetleri sunuyorum. İstanbul, Türkiye merkezli.",
    "hero.description.mobile": "Video oyun lokalizasyonunda uzmanlaşmış. Türkçe ↔ İngilizce çeviri hizmetleri.",
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
      "Ben Alp Yalay, İstanbul, Türkiye merkezli bir Çevirmen ve Yerelleştiriciyim. İzmir Ekonomi Üniversitesi'nden Çeviribilim bölümü mezunuyum.",
    "about.expertise":
      "Ana uzmanlık alanım video oyun lokalizasyonudur. Bu alanda çalışırken, dil ve teknoloji bilgimi bir araya getirerek hedef kitleye hitap eden yüksek kaliteli çeviriler sunuyorum.",
    "about.education.title": "Eğitim ve Deneyim",
    "about.education.degree": "Lisans Derecesi: İzmir Ekonomi Üniversitesi Çeviribilim (2018-2022)",
    "about.education.social":
      "Genç Sosyal Medya Uzmanı: Muse İstanbul (Nisan 2024 - Ağustos 2024), iGA İstanbul Havalimanı sosyal medya hesaplarını yönettim",
    "about.education.barista":
      "Barista, Garson, Kasiyer: Asma Yaprağı (Temmuz 2015 - Eylül 2021), müşteri hizmetleri ve mali yönetim",
    "about.education.intern":
      "Stajyer: Şafak Tercüme (Şubat 2021 - Mart 2021), profesyonel çeviri iş akışlarında deneyim kazandım",
    "about.quote": "Dil boşluklarını hassasiyet ve kültürel anlayışla köprülüyorum.",

    // Skills Section
    "skills.title": "Yeteneklerim",
    "skills.tech.title": "Teknoloji Yığını",
    "skills.translation.title": "Çeviri",
    "skills.translation.desc": "Türkçe ve İngilizce arasında profesyonel çeviri hizmetleri",
    "skills.localization.title": "Lokalizasyon",
    "skills.localization.desc": "İçeriği kültürel ve bölgesel uygunluk için uyarlama",
    "skills.technical.title": "Teknik Çeviri",
    "skills.technical.desc": "Teknik ve yazılım içeriği için özelleşmiş çeviri",
    "skills.transcreation.title": "Transkrasyon",
    "skills.transcreation.desc": "Pazarlama ve tanıtım materyallerinin yaratıcı uyarlaması",

    // Projects Section
    "projects.title": "Öne Çıkan Projeler",
    "projects.subtitle": "Çeviri çalışmalarım, yazılım projelerim ve teknik becerilerimin bir vitrinı",
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
    "experience.title": "AI Alp ile Sohbet Et",
    "experience.subtitle": "Çeviri hizmetlerim, becerilerim, projelerim veya eğitimim hakkında sor",
    "experience.placeholder": "Çeviri hizmetlerim, becerilerim veya projelerim hakkında sor...",
    "experience.send": "Gönder",
    "experience.reset": "Sohbeti sıfırla",
    "experience.typing": "AI Alp yazıyor...",
    "experience.quick.experience": "İş deneyimi",
    "experience.quick.skills": "Beceriler",
    "experience.quick.projects": "Projeler",
    "experience.quick.education": "Eğitim",
    "experience.ai.greeting":
      "👋 Merhaba! Ben AI Alp, sanal asistanınız. Alp'in çeviri hizmetleri veya becerileri hakkında sorularınızı sorabilirsiniz!",

    // Blog Section
    "blog.title": "Son Görüşler",
    "blog.blog.subtitle": "AI ve otomasyon alanındaki en son trendler ve atılımlardan haberdar olun",
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
    "contact.phone": "Telefon",
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
      "Türkçe ve İngilizce arasında video oyun lokalizasyonunda uzmanlaşmış Çevirmen ve Yerelleştirici.",
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
      "Bu vaka çalışması, CyDream Technologies tarafından geliştirilen fizik tabanlı VR rogue-lite aksiyon oyunu Battle Talent için devam eden Türkçe lokalizasyon projesini detaylandırıyor. Başlangıçta Çeviribilim lisans eğitimi sırasında kişisel bir meydan okuma olarak üstlenilen bu proje, profesyonel oyun lokalizasyonu dünyasına atılan kritik ilk adım olarak hizmet etti ve uyum sağlama, kaynak bulma ve uzun vadeli bağlılık gerektirdi.",

    "casestudy.challenge.title": "Zorluk: Erken Kariyer Lokalizasyon Engellerinde Gezinmek",
    "casestudy.challenge.intro":
      "Birincil hedef, akademik bilgiyi gerçek dünya projesine uygulayarak pratik oyun lokalizasyonu deneyimi aramak ve alandaki yeterliliği göstermekti. Ancak bu hırs birkaç önemli engelle geldi:",
    "casestudy.challenge.indirect.title": "Dolaylı Kaynak Metin",
    "casestudy.challenge.indirect.content":
      "Türkçe çeviri için kaynak olarak kullanılan İngilizce metin, kendisi orijinal Basitleştirilmiş Çince'den profesyonel olmayan bir çeviriydi, bu da potansiyel belirsizlik katmanı getirdi ve dikkatli yorumlama gerektirdi.",
    "casestudy.challenge.tooling.title": "Araç ve İş Akışı Kısıtlamaları",
    "casestudy.challenge.tooling.content":
      "Lokalizasyon süreci tamamen farklı dillerdeki tüm çevirmenler için paylaşılan bir Google Sheet'e dayanıyordu. Bu, standart CAT araçlarının güçlü özelliklerinden yoksundu ve terminoloji yönetimi ile tutarlılık takibini zorlaştırdı.",
    "casestudy.challenge.terminology.title": "Terminoloji ve Tutarlılık",
    "casestudy.challenge.terminology.content":
      "Benzersiz oyun kavramları için uygun Türkçe terminoloji oluşturmak, yerleşik Türkçe oyun sözlükleri veya erişilebilir çeviri belleklerinin eksikliği nedeniyle zordu.",
    "casestudy.challenge.testing.title": "Sınırlı Test Ortamı",
    "casestudy.challenge.testing.content":
      "Test için özel geliştirici yapısı mevcut değildi. Çevirileri doğrulamak aylık genel oyun güncellemelerini beklemeyi ve canlı VR ortamında test etmeyi gerektiriyordu.",

    "casestudy.process.title": "Süreç ve Çözüm: Uyum Sağlama ve Sürekli İyileştirme",
    "casestudy.process.intro": "Kısıtlamalara rağmen, pragmatik ve gelişen bir iş akışı kuruldu:",
    "casestudy.process.research.title": "Araştırma Odaklı Çeviri",
    "casestudy.process.research.content":
      "Her terime araştırmayla yaklaşıldı, çevrimiçi sözlükler kullanıldı, diğer Türkçe lokalize edilmiş oyunlardaki çevirilerle çapraz referans yapıldı ve belirsiz terimler için AI kullanıldı.",
    "casestudy.process.glossary.title": "Kişisel Sözlük Geliştirme",
    "casestudy.process.glossary.content":
      "Anahtar terimleri takip etmek ve tutarlılığı sağlamak için kişisel bir sözlük oluşturuldu ve sürdürüldü, özel terminoloji yönetimi uygulaması geliştirme planlarıyla.",
    "casestudy.process.lqa.title": "Güncelleme Sonrası LQA",
    "casestudy.process.lqa.content":
      "Her aylık oyun güncellemesinin ardından, VR oyununun kendisinde yeni eklenen Türkçe dizgileri test etmeye, hataları ve garip ifadeleri belirlemeye ve düzeltmeye özel zaman ayrıldı.",
    "casestudy.process.hybrid.title": "Hibrit Çeviri Metodolojisi",
    "casestudy.process.hybrid.content":
      "Tüm çeviri metnini periyodik olarak besleyerek potansiyel tutarsızlıkları belirlemek için AI'dan (Gemini 1.5 Pro) yararlanıldı, hedefli düzeltmeye olanak sağlandı.",

    "casestudy.results.title": "Sonuçlar ve Etki: Değer Sunma ve Büyümeyi Destekleme",
    "casestudy.results.intro":
      "Devam eden lokalizasyon çabası, Battle Talent'ı Türkçe konuşan kitlesine başarıyla erişilebilir hale getirdi ve önemli kişisel gelişim sağladı:",
    "casestudy.results.accessibility.title": "Türk Oyuncular için Gelişmiş Erişilebilirlik",
    "casestudy.results.accessibility.content":
      "Eksiksiz bir Türkçe lokalizasyon sunuldu ve sürdürüldü, VR deneyimini Türkçe konuşan oyuncular için tamamen erişilebilir hale getirdi. Geliştirici verileri Türkiye'de yaklaşık 84 oyuncunun oyunla etkileşim kurduğunu gösterdi.",
    "casestudy.results.relationship.title": "Güçlü Geliştirici İlişkisi",
    "casestudy.results.relationship.content":
      "Türk pazarı için bu tek çabaya güvenen CyDream Technologies ile güven kuruldu ve sürdürüldü.",
    "casestudy.results.career.title": "Sağlamlaştırılmış Kariyer Yolu",
    "casestudy.results.career.content":
      "Proje oyun lokalizasyonuna olan tutkuyu doğruladı ve Türk pazarında kaliteli lokalizasyon ihtiyacını vurguladı.",
    "casestudy.results.foundation.title": "Gelecek Projeler için Temel",
    "casestudy.results.foundation.content":
      "Deneyim, Heroes of Hammerwatch II gibi daha büyük, daha karmaşık lokalizasyon projelerini üstlenme güveni ve beceri setini sağladı.",

    "casestudy.conclusion.title": "Sonuç",
    "casestudy.conclusion.content":
      "Battle Talent Türkçe lokalizasyon projesi, proaktif öğrenme ve adanmışlığın bir kanıtı olarak duruyor. Kaynaklar, araçlar ve test metodolojisiyle ilgili başlangıç zorluklarını aşarak, bu devam eden çaba sadece Türk VR oyuncuları için değerli bir lokalizasyon sunmakla kalmadı, aynı zamanda sürekli iyileştirme, uyum sağlama ve kalite bağlılığıyla karakterize edilen oyun lokalizasyonuna adanmış bir yaklaşımı şekillendiren paha biçilmez bir temel sağladı.",

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
    return translations[language][key] || key
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
