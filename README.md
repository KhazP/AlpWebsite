# 👨‍💻 Alp Yalay Portfolio Website 🌐

[![Website](https://img.shields.io/website?url=https://alpyalay.org&label=alpyalay.org&style=for-the-badge)](https://alpyalay.org)
[![Code License: MIT](https://img.shields.io/badge/Code%20License-MIT-green.svg?style=for-the-badge)](LICENSE.md)
[![Maintained by: KhazP](https://img.shields.io/badge/Maintained%20by-KhazP-blue.svg?style=for-the-badge)](https://github.com/KhazP)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

![Alp Yalay Portfolio Screenshot](./Assets/alp.webp) 
> **A personal portfolio website showcasing my work as a translator, localizer, and developer with a focus on game localization and technical translation.**

---

## 📖 Table of Contents

* [Overview](#overview)
* [✨ Core Features](#-core-features)
* [🚀 Technologies Used](#-technologies-used)
* [📄 Site & Page Structure](#️-site--page-structure)
* [📱 Responsive Design Details](#-responsive-design-details)
* [🔒 Privacy & Compliance](#-privacy--compliance)
* [🌐 Viewing the Website](#-viewing-the-website)
* [🛠️ Development Setup (Simple)](#️-development-setup-simple)
* [🔮 Future Enhancements (Potential)](#-future-enhancements-potential)
* [🤝 Reporting Issues](#-reporting-issues)
* [📜 Disclaimer](#-disclaimer)
* [📄 License](#-license)
* [📞 Contact & Credits](#-contact--credits)

---

## Overview

This portfolio website serves as a comprehensive showcase of my professional experience, skills, and projects. The site features a responsive design and modern UI, highlighting my unique blend of linguistic expertise and technical knowledge. It aims to present my work in translation, localization, and development, with a special focus on game localization and technical translation.

---

## ✨ Core Features

* **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices.
* **Dark Theme**: Modern dark theme with accent colors for improved readability and aesthetics.
* **Interactive Elements**: Collapsible sections, hover effects, and smooth scrolling.
* **Multilingual Support**: Switchable content between English and Turkish.
* **Web3Forms Integration**: Functional contact form with server-side submission for inquiries.
* **Portfolio Sections**: Dedicated sections for:
    * About Me (including skills, education, experience, honors)
    * Translation Work (showcasing localization projects like Battle Talent and Heroes of Hammerwatch II)
    * Web Development Projects (Portfolio Website, Can Maden Website, Sait Maden Archival Website)
    * Software & AI Projects (Localization Comparison Tool, F1 Regulations Assistant, AutoTidy)
    * Methodology (detailing my approach to translation and localization)
* **Accessibility Focused**: Developed with semantic HTML and ARIA attributes.
* **SEO Optimized**: Includes `sitemap.xml` and `robots.txt`.
* **Case Studies**: Detailed page for projects like the Battle Talent localization.

---

## 🚀 Technologies Used

* **Frontend**:
    * HTML5
    * CSS3 (Custom styles, no frameworks)
    * JavaScript (Vanilla JS with no dependencies)
* **Fonts & Icons**:
    * Google Fonts (Funnel Display, Open Sans)
    * Font Awesome for icons
* **APIs & Services**:
    * Web3Forms (for contact form processing)
    * Google Analytics (for website traffic analysis)
* **Development Tools**:
    * Visual Studio Code
    * GitHub Copilot

---

## 📄 Site & Page Structure

The website is a single-page application (`index.html`) with distinct sections. A separate HTML page (`CaseStudyPage/battle-talent-case-study.html`) provides a detailed case study.

### Main Sections in `index.html`:
* **Header**: Logo, navigation links, language switcher.
* **Hero**: Introduction and call to action.
* **About Me**: Detailed biography, skills, infobox (languages, location, tests, specialization, education, degree).
* **Experience**: Collapsible sections for Work History, Education, Honors & Awards, and Certifications.
* **Translations**: Showcase of translation projects with images, descriptions, status, process, and links.
* **Web Development Projects**: Grid of web development projects with images, descriptions, features, and links.
* **Software & AI Projects**: Grid of software and AI projects with images, descriptions, features, and links.
* **Methodology**: Explanation of my hybrid translation approach.
* **Contact**: Contact information and a functional contact form.
* **Footer**: Logo, navigation links, social media links, copyright.

### Supporting Files:
* `styles.css`: Main stylesheet for the website.
* `scripts.js`: JavaScript for interactivity, language switching, form handling, etc.
* `robots.txt`: Instructions for web crawlers.
* `sitemap.xml`: Sitemap for search engine indexing.
* `LICENSE.md`: MIT License for the project.
* `CaseStudyPage/`: Directory containing the HTML, CSS, and JS for the Battle Talent case study.
* `Assets/`: Directory for images, logos, and other static resources.

---

## 📱 Responsive Design Details

The website employs CSS media queries to adapt the layout and styling for various screen sizes:
* **Mobile-First Approach**: Base styles are designed for smaller screens.
* **Tablet Enhancements (@media (min-width: 768px))**:
    * Desktop language switcher becomes visible.
    * Mobile navigation and hamburger menu are hidden.
    * Hero section content and image rearrange to a row layout.
    * About section content arranges into a row with the infobox alongside the text.
    * Skill categories display in three columns.
    * Translation and project grids switch to a two-column layout.
    * Methodology section arranges image and text in a row.
    * Contact section info and form arrange in a row.
* **Large Screens (@media (min-width: 1024px))**:
    * Container width increases.
    * Font sizes for titles and hero content are further enlarged.

---

## 🔒 Privacy & Compliance

* **Contact Form**: Uses Web3Forms for submission, which has its own privacy policy. A `botcheck` hidden field is included as a simple spam prevention measure.
* **hCaptcha**: Integrated into the contact form to prevent spam.
* **Analytics**: Google Analytics is used; users should be informed via a privacy policy (not currently in the repo but recommended).
* **No Cookies (Directly by Site)**: The website itself does not set cookies directly, but embedded services like Google Analytics or hCaptcha might. A cookie consent banner would be a good addition for GDPR compliance if targeting EU users.

---

## 🌐 Viewing the Website

The live website can be viewed at: **https://alpyalay.org**

---

## 🛠️ Development Setup (Simple)

1.  Clone the repository:
    ```bash
    git clone [https://github.com/KhazP/AlpWebsite.git](https://github.com/KhazP/AlpWebsite.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd AlpWebsite
    ```
3.  Open `index.html` in your web browser.

No complex build steps are required as it's a static site built with HTML, CSS, and vanilla JavaScript.

---

## 🔮 Future Enhancements (Potential)

* **Blog/Articles Section**: To share insights on localization, translation, or development.
* **Enhanced Animations/Transitions**: Using a library like GSAP (a cheat sheet is in `Assets/Docs/`) for more dynamic visual effects.
* **PWA Conversion**: For offline access and app-like experience.
* **CMS Integration**: For easier content management if the site grows significantly.
* **Automated End-to-End Testing**.
* **Privacy Policy Page & Cookie Consent Banner**.

---

## 🤝 Reporting Issues

If you find any bugs, typos, or areas for improvement, please open an issue on the [GitHub repository](https://github.com/KhazP/AlpWebsite/issues).

---

## 📜 Disclaimer

The information and projects showcased on this website are for portfolio purposes. Some game translation projects are fan translations or official contributions as detailed in their respective descriptions.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 📞 Contact & Credits

* **Maintained by**: Alp Yalay (KhazP)
* **Contact**: contact@alpyalay.org
* **GitHub**: [KhazP](https://github.com/KhazP)
* **LinkedIn**: [Alp Yalay](https://linkedin.com/in/alpyalay)
