// JavaScript for Case Study Page (if needed in the future)

document.addEventListener('DOMContentLoaded', () => {
    console.log("Case study page loaded.");

    const langSwitchContainers = document.querySelectorAll('.lang-switch'); // Find all lang switch containers
    const translatableElements = document.querySelectorAll('[data-lang-en], [data-lang-tr]');
    const htmlTag = document.documentElement;
    const titleTag = document.querySelector('title');
    const descriptionTag = document.querySelector('meta[name="description"]');
    const floatingButton = document.getElementById('return-to-main');

    const setLanguage = (lang) => {
        if (lang !== 'en' && lang !== 'tr') lang = 'en'; // Default

        // Update text content more safely
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text !== null) {
                // Check if the element contains only text or specific allowed tags (like <i> or <strong>)
                const allowedTags = ['i', 'strong'];
                const hasNonAllowedChildren = Array.from(el.childNodes).some(node =>
                    node.nodeType === Node.ELEMENT_NODE && !allowedTags.includes(node.tagName.toLowerCase())
                );

                // Simple check for leading/trailing icons/strong tags within the data attribute itself
                const containsTagsInData = /<[a-z][\s\S]*>/i.test(text);

                if (containsTagsInData && !hasNonAllowedChildren) {
                     // If data attribute has HTML and element structure is simple, use innerHTML
                     el.innerHTML = text;
                } else if (!hasNonAllowedChildren && el.firstElementChild && allowedTags.includes(el.firstElementChild.tagName.toLowerCase())) {
                    // Handle case with leading icon/strong (like in back-link)
                    const firstChildHTML = el.firstElementChild.outerHTML;
                    // Use textContent for the rest to avoid parsing issues if data attribute contains HTML
                    const textContentOnly = text.replace(/<[a-z].*?>.*?<\/[a-z]>\s*/i, '').trim();
                    el.innerHTML = firstChildHTML + ' '; // Add space after element
                    // Append the text as a text node
                    el.appendChild(document.createTextNode(textContentOnly));
                }
                 else {
                    // For simple text or elements where we don't want to preserve complex inner HTML,
                    // set textContent directly.
                    el.textContent = text;
                }
            }
        });

        // Update HTML lang attribute
        htmlTag.setAttribute('lang', lang);

        // Update Title tag
        if (titleTag) {
             const titleText = titleTag.getAttribute(`data-lang-${lang}`);
             if (titleText) {
                document.title = titleText; // Update document title directly
             }
        }
        // Update Meta Description
        if (descriptionTag) {
            const descText = descriptionTag.getAttribute(`data-lang-${lang}`);
            if (descText) {
                descriptionTag.setAttribute('content', descText);
            }
        }

        // Update floating button aria-label and title
        if (floatingButton) {
            const ariaLabel = floatingButton.getAttribute(`data-lang-${lang}-aria-label`);
            const titleText = floatingButton.getAttribute(`data-lang-${lang}-title`);
            if (ariaLabel) floatingButton.setAttribute('aria-label', ariaLabel);
            if (titleText) floatingButton.setAttribute('title', titleText);
        }


        // Update button active states in all switchers
        langSwitchContainers.forEach(container => {
            container.querySelectorAll('button[data-lang]').forEach(btn => {
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });

        // Store preference
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (e) {
            console.warn("Could not save language preference to localStorage:", e);
        }
    };

    // Add event listeners to all language buttons
    langSwitchContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && e.target.hasAttribute('data-lang')) {
                const selectedLang = e.target.getAttribute('data-lang');
                setLanguage(selectedLang);
            }
        });
    });

    // --- Initial Language Setup ---
    let preferredLanguage = 'en'; // Default
    try {
        const storedLang = localStorage.getItem('preferredLanguage');
        if (storedLang === 'en' || storedLang === 'tr') {
            preferredLanguage = storedLang;
        }
    } catch (e) {
        console.warn("Could not read language preference from localStorage:", e);
    }

    // Apply the initial language
    setLanguage(preferredLanguage);

});
