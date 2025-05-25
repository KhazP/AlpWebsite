/**
 * Main JavaScript file for Alp Yalay Portfolio Website
 * Version: 2.1 (Standard CSS Compatibility, Language Switching)
 * Author: Alp Yalay & AI Assistant
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Functionality ---
    const navbar = document.querySelector('.navbar');
    const hamburgerButton = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.nav-links'); // The ul/div holding the links
    const allNavLinks = document.querySelectorAll('.nav-link'); // All navigation links (desktop and mobile if separate)
    
    // Important: Define sections early so it's available for all functions
    const sections = document.querySelectorAll('main section[id], header[id]'); // Include header for home section

    // Track if a link was manually clicked
    let userClickedLink = false;
    let currentActiveSection = '';
    let clickedSectionTimer;

    // --- Active Section Highlighting ---
    function highlightActiveSection() {
        // Skip auto-highlight if user just clicked a link (for 1 second)
        if (userClickedLink) return;

        let currentSectionId = 'home'; // Default to home
        const scrollPosition = window.pageYOffset;
        const navbarHeight = navbar.offsetHeight;
        const activationOffset = window.innerHeight * 0.4;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - activationOffset; // Activate when section is closer to middle

            if (scrollPosition >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

         // Special case for reaching the bottom of the page - highlight last section
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
             const lastSection = sections[sections.length - 1];
             if (lastSection) {
                 currentSectionId = lastSection.getAttribute('id');
             }
        }

        // Only update if section changed to avoid unnecessary DOM operations
        if (currentSectionId !== currentActiveSection) {
            currentActiveSection = currentSectionId;
            updateActiveLink(currentSectionId);
        }
    }

    // Separate function to update active link class
    function updateActiveLink(sectionId) {
        allNavLinks.forEach(link => {
            link.classList.remove('active'); // Use 'active' class defined in CSS
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Enhance nav link click behavior
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Clear any existing timers
            clearTimeout(clickedSectionTimer);
            
            // Get target section from href
            const targetId = this.getAttribute('href').replace('#', '');
            
            // Update active state immediately
            userClickedLink = true;
            currentActiveSection = targetId;
            
            // Remove active class from all links and add to clicked one
            allNavLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Allow scroll highlighting to take over after some time
            clickedSectionTimer = setTimeout(() => {
                userClickedLink = false;
            }, 1000); // 1 second delay
        });
    });

    // Toggle mobile menu
    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            const isExpanded = hamburgerButton.classList.toggle('active'); // Use class for styling 'X'
            hamburgerButton.setAttribute('aria-expanded', isExpanded);
            mobileMenu.classList.toggle('active'); // Use class to show/hide mobile menu
        });

        // Close mobile menu when a link inside it is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    hamburgerButton.classList.remove('active');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                    mobileMenu.classList.remove('active');
                }
            });
        });
    }

    // Navbar scroll effect (Add/remove 'scrolled' class)
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) { // Adjust scroll threshold if needed
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveSection(); // Highlight nav link on scroll
    };

    // Debounce scroll handler for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 50);
    }, { passive: true });

    // Initial check in case page loads already scrolled
    handleScroll();

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    
                    // Improved position calculation with larger offset to ensure sections are visible
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open and active
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        hamburgerButton.classList.remove('active');
                        hamburgerButton.setAttribute('aria-expanded', 'false');
                        mobileMenu.classList.remove('active');
                    }
                }
            } else if (targetId === '#') { // Handle clicking link like href="#"
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // --- Language Switching ---
    const langSwitchContainers = document.querySelectorAll('.lang-switch'); // Select all containers
    const translatableElements = document.querySelectorAll('[data-lang-en], [data-lang-tr]');
    const htmlTag = document.documentElement;
    const titleTag = document.querySelector('title');

    const setLanguage = (lang) => {
        if (lang !== 'en' && lang !== 'tr') lang = 'en'; // Default

        // Update text content
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            // Check if the element contains HTML tags (like the <i> in headers)
            const firstChild = el.firstElementChild;
            if (firstChild && (firstChild.tagName === 'I' || firstChild.tagName === 'i')) {
                 // If it starts with an icon, preserve it and update the text node after it
                 const iconHTML = firstChild.outerHTML;
                 // Find the text node (might be null if no text after icon)
                 let textNode = firstChild.nextSibling;
                 while(textNode && textNode.nodeType !== Node.TEXT_NODE) {
                     textNode = textNode.nextSibling;
                 }
                 if (textNode && text) {
                     textNode.textContent = ' ' + text.replace(/<i.*?><\/i>\s*/i, '').trim(); // Update text, remove potential icon tags from data attribute
                 } else if (text) {
                     // If no text node found, append the text after the icon
                     el.innerHTML = iconHTML + ' ' + text.replace(/<i.*?><\/i>\s*/i, '').trim();
                 }
            } else if (text !== null) {
                // Otherwise, just set the text content directly
                el.textContent = text;
            }
        });

        // Update HTML lang attribute
        htmlTag.setAttribute('lang', lang);

        // Update Title tag
        if (titleTag) {
             const titleText = titleTag.getAttribute(`data-lang-${lang}`);
             if (titleText) {
                titleTag.textContent = titleText;
             }
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
        container.querySelectorAll('button[data-lang]').forEach(button => {
            button.addEventListener('click', () => {
                const selectedLang = button.getAttribute('data-lang');
                setLanguage(selectedLang);
            });
        });
    });


    // Get preferred language on load
    let preferredLang = 'en'; // Default
     try {
        preferredLang = localStorage.getItem('preferredLanguage') || 'en';
     } catch (e) {
         console.warn("Could not read language preference from localStorage:", e);
     }
    // Apply the language initially - Moved this call lower to ensure button text is set correctly after DOM manipulation
    // setLanguage(preferredLang);


    // --- Collapsible Sections ---
    document.querySelectorAll('.collapsible-header').forEach(header => {
        // Add click event listener to each collapsible header
        header.addEventListener('click', function() {
            // Toggle the aria-expanded state
            const isCurrentlyExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isCurrentlyExpanded);
            
            // Get the content element
            const content = this.nextElementSibling;
            
            // Toggle the hidden attribute for accessibility
            if (isCurrentlyExpanded) {
                // Add hidden attribute after animation completes
                setTimeout(() => {
                    content.setAttribute('hidden', '');
                }, 500); // Match this with the animation duration
            } else {
                // Remove hidden attribute immediately to start animation
                content.removeAttribute('hidden');
            }
            
            // Log to help with debugging
            console.log('Collapsible clicked:', this.querySelector('h3').textContent);
            console.log('New expanded state:', !isCurrentlyExpanded);
        });
    });

    // Initialize collapsibles on page load
    document.querySelectorAll('.collapsible-header').forEach(header => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const content = header.nextElementSibling;
        
        if (!isExpanded && content) {
            content.setAttribute('hidden', '');
        }
    });


    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Adjust threshold (0.1 means 10% visible)
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }


    // --- Contact Form Handling (Web3Forms) ---
    const contactForm = document.getElementById('contactForm');
    const formResult = document.getElementById('form-result');
    const formSuccessContainer = document.getElementById('form-success-message-container');
    const formInputs = contactForm ? contactForm.querySelectorAll('input[required], textarea[required]') : [];

    // Add required indicators dynamically if label exists
    formInputs.forEach(input => {
        const label = contactForm.querySelector(`label[for="${input.id}"]`);
        if (label && !label.querySelector('.required-indicator')) { // Check if already added
            const requiredSpan = document.createElement('span');
            requiredSpan.className = 'required-indicator'; // Use class for styling
            requiredSpan.textContent = '*';
            requiredSpan.style.color = 'var(--error-color)'; // Style directly or via CSS
            requiredSpan.style.marginLeft = '2px';
            label.appendChild(requiredSpan);
        }
    });

    // Basic real-time validation feedback
    function validateInput(input) {
        const feedbackEl = input.nextElementSibling; // Assuming .form-feedback div is next sibling
        let isValid = true;
        let message = '';

        // Check required
        if (input.hasAttribute('required') && input.value.trim() === '') {
            isValid = false;
            message = 'This field is required.'; // Simple required message
        }
        // Check email format
        else if (input.type === 'email' && input.value.trim() !== '') { // Only validate format if not empty
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                isValid = false;
                message = 'Please enter a valid email address.';
            }
        }

        // Update styles and feedback message
        if (!isValid) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            if (feedbackEl && feedbackEl.classList.contains('form-feedback')) {
                feedbackEl.textContent = message;
                feedbackEl.style.color = 'var(--error-color)';
            }
        } else {
            input.classList.remove('invalid');
            // Optionally add valid class only if field is not empty or not required
            if (input.value.trim() !== '' || !input.hasAttribute('required')) {
                 input.classList.add('valid');
            } else {
                 input.classList.remove('valid'); // Remove valid if required and empty
            }

             if (feedbackEl && feedbackEl.classList.contains('form-feedback')) {
                feedbackEl.textContent = ''; // Clear message on valid
            }
        }
        return isValid;
    }

    // Add blur validation listeners
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Frontend Validation on Submit
            let isFormValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                if (formResult) {
                    formResult.textContent = 'Please correct the errors above.';
                    formResult.className = 'form-feedback error'; // Use classes for styling
                }
                // Focus the first invalid input
                contactForm.querySelector('.invalid')?.focus();
                return; // Stop submission
            }

            // --- If valid, proceed with submission ---
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML; // Store original button content

            if (formResult) {
                formResult.textContent = 'Sending...';
                formResult.className = 'form-feedback loading'; // Use classes
            }
            submitButton.disabled = true;
            // Add a simple spinner icon using Font Awesome
            submitButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;


            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.ok) {
                    if (formResult) formResult.textContent = ''; // Clear message area
                    
                    // Reset form but keep it visible
                    contactForm.reset();
                    
                    // Re-enable button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    
                    // Show success message
                    if(formSuccessContainer) {
                        formSuccessContainer.style.display = 'block'; 
                        formSuccessContainer.classList.add('visible');
                    }
                } else {
                    console.error('Form submission error:', jsonResponse);
                    if (formResult) {
                        formResult.textContent = jsonResponse.message || 'An error occurred. Please try again.';
                        formResult.className = 'form-feedback error';
                    }
                     // Re-enable button on error
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }
            })
            .catch((error) => {
                console.error('Network error:', error);
                 if (formResult) {
                    formResult.textContent = 'Network error. Please check connection.';
                    formResult.className = 'form-feedback error';
                 }
                  // Re-enable button on error
                 submitButton.disabled = false;
                 submitButton.innerHTML = originalButtonText;
            });
        });

        // Add event listener for the success message close button
        const closeButton = document.querySelector('.form-success-message .close-btn');
        if (closeButton && formSuccessContainer) {
            closeButton.addEventListener('click', () => {
                formSuccessContainer.style.display = 'none';
                formSuccessContainer.classList.remove('visible');
            });
        }
    }


    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }, { passive: true });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Fix missing image dimensions ---
    function ensureImageDimensions() {
        // Find all images that don't have both width and height attributes
        const images = document.querySelectorAll('img:not([width][height])');
        
        images.forEach(img => {
            // Get natural dimensions or set defaults based on image location/context
            if (img.src.includes('heroesofhammerwatch2.webp') || img.src.includes('battletalent.webp') ||
                img.src.includes('localizationappthumbnail.webp') || img.src.includes('f1regassistantthumbnail.webp') ||
                img.src.includes('alp.webp') || img.src.includes('can.webp')) {
                
                // Project/translation card images
                if (!img.hasAttribute('width')) img.setAttribute('width', '600');
                if (!img.hasAttribute('height')) img.setAttribute('height', '400');
            } 
            else if (img.classList.contains('methodology-image') || 
                    (img.parentElement && img.parentElement.classList.contains('methodology-image'))) {
                
                // Methodology image
                if (!img.hasAttribute('width')) img.setAttribute('width', '400');
                if (!img.hasAttribute('height')) img.setAttribute('height', '400');
            }
            
            // Handle images that load later
            img.addEventListener('load', () => {
                if (img.naturalWidth && !img.hasAttribute('width')) {
                    img.setAttribute('width', img.naturalWidth);
                }
                if (img.naturalHeight && !img.hasAttribute('height')) {
                    img.setAttribute('height', img.naturalHeight);
                }
            });
        });
    }
    
    // Run the function on page load
    ensureImageDimensions();


    // --- Show More/Less Projects ---
    const toggleProjectButtons = document.querySelectorAll('.toggle-projects-btn');

    toggleProjectButtons.forEach(button => {
        const gridId = button.getAttribute('data-target-grid');
        const grid = document.getElementById(gridId);
        if (!grid) return;

        const hiddenProjects = grid.querySelectorAll('.project-card.hidden-project');
        const showMoreContainer = button.closest('.show-more-container');

        // Hide button container if there are no hidden projects (or <= 2 total)
        const totalProjects = grid.querySelectorAll('.project-card').length;
        if (hiddenProjects.length === 0 || totalProjects <= 2) {
            if (showMoreContainer) {
                showMoreContainer.style.display = 'none';
            }
            return; // Don't add listener if button isn't needed
        }

        // Function to update button text based on state and language
        const updateButtonText = (btn, isExpanded, currentLang) => {
            const showMoreText = btn.getAttribute(`data-lang-${currentLang}`) || btn.getAttribute('data-lang-en');
            const showLessText = btn.getAttribute(`data-lang-${currentLang}-less`) || btn.getAttribute('data-lang-en-less');
            btn.textContent = isExpanded ? showLessText : showMoreText;
        };

        // Add click listener
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            hiddenProjects.forEach(project => {
                // Toggle the hidden class directly
                project.classList.toggle('hidden-project');
            });
            button.setAttribute('aria-expanded', !isExpanded);

            // Update button text based on the new state and current language
            const currentLang = document.documentElement.lang || 'en';
            updateButtonText(button, !isExpanded, currentLang);
        });

        // Initial button text update based on current language
        const currentLang = document.documentElement.lang || 'en';
        updateButtonText(button, false, currentLang); // Initially not expanded
    });

    // Apply the language initially (moved here to ensure button text is set correctly)
    setLanguage(preferredLang);

    // Re-run button text update on language change
    langSwitchContainers.forEach(container => {
        container.querySelectorAll('button[data-lang]').forEach(langButton => {
            langButton.addEventListener('click', () => {
                const selectedLang = langButton.getAttribute('data-lang');
                toggleProjectButtons.forEach(projButton => {
                    // Check if the button is actually visible before updating
                    const container = projButton.closest('.show-more-container');
                    if (container && container.style.display !== 'none') {
                        const isExpanded = projButton.getAttribute('aria-expanded') === 'true';
                        const updateFunc = projButton.updateTextCallback; // Retrieve the update function
                         if (typeof updateFunc === 'function') {
                            updateFunc(projButton, isExpanded, selectedLang);
                         } else { // Fallback if callback wasn't stored correctly
                             const showMoreText = projButton.getAttribute(`data-lang-${selectedLang}`) || projButton.getAttribute('data-lang-en');
                             const showLessText = projButton.getAttribute(`data-lang-${selectedLang}-less`) || projButton.getAttribute('data-lang-en-less');
                             projButton.textContent = isExpanded ? showLessText : showMoreText;
                         }
                    }
                });
            });
        });
    });

    // Store the update function on the button itself for easy access during language change
    toggleProjectButtons.forEach(button => {
        button.updateTextCallback = (btn, isExpanded, currentLang) => {
            const showMoreText = btn.getAttribute(`data-lang-${currentLang}`) || btn.getAttribute('data-lang-en');
            const showLessText = btn.getAttribute(`data-lang-${currentLang}-less`) || btn.getAttribute('data-lang-en-less');
            btn.textContent = isExpanded ? showLessText : showMoreText;
        };
    });


}); // End DOMContentLoaded