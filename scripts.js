/**
 * Main JavaScript file for Alp Yalay Portfolio Website
 * Author: GitHub Copilot
 * Version: 1.1
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive); // Toggle ARIA attribute
    });

    // Add aria-controls to hamburger if navLinksContainer has an ID
    if (navLinksContainer.id) {
        hamburger.setAttribute('aria-controls', navLinksContainer.id);
    } else {
        // Assign an ID if it doesn't have one
        navLinksContainer.id = 'main-nav-links';
        hamburger.setAttribute('aria-controls', 'main-nav-links');
    }
    // Initialize hamburger state
    hamburger.setAttribute('aria-expanded', 'false');
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });
    
    // Add navbar scroll effect
    window.addEventListener('scroll', () => {
        updateNavbar();
        highlightActiveSection();
    });
    
    // Update navbar based on scroll position
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Highlight active section in navbar
    function highlightActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize the navbar state on page load
    updateNavbar();
    highlightActiveSection();
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm ? contactForm.querySelectorAll('input, textarea') : [];
    const formResult = document.getElementById('form-result'); // Get form result div
    
    // Add required field indicators and validation feedback elements
    formInputs.forEach(input => {
        // Add required field indicator
        if (input.hasAttribute('required')) {
            const label = input.previousElementSibling;
            if (label) {
                label.innerHTML += ' <span class="required">*</span>';
            }
        }
        
        // Create validation feedback element
        const feedback = document.createElement('div');
        feedback.className = 'form-feedback';
        input.parentNode.appendChild(feedback);
        
        // Add validation on input
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input));
    });
    
    function validateInput(input) {
        const feedback = input.nextElementSibling;
        const value = input.value.trim();
        
        // Reset validation state
        input.classList.remove('is-valid', 'is-invalid');
        feedback.textContent = '';
        
        if (!value && input.hasAttribute('required')) {
            input.classList.add('is-invalid');
            feedback.textContent = 'This field is required';
            return false;
        }
        
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('is-invalid');
                feedback.textContent = 'Please enter a valid email address';
                return false;
            }
        }
        
        input.classList.add('is-valid');
        return true;
    }
    
    // Handle contact form submission with Web3Forms
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all inputs
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) return;
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            formResult.innerHTML = "Please wait...";
            formResult.style.display = "block";
            
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // Show success message
                    const successMessageContainer = document.createElement('div'); // Create a container
                    successMessageContainer.className = 'form-success-message-container';
                    successMessageContainer.setAttribute('aria-live', 'assertive'); // Announce success immediately

                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle" aria-hidden="true"></i>
                        <h4>Message Sent!</h4>
                        <p>Thank you for reaching out. I'll get back to you soon.</p>
                    `;
                    successMessageContainer.appendChild(successMessage); // Add message to container

                    // Replace form with success message container
                    contactForm.style.opacity = '0';
                    setTimeout(() => {
                        contactForm.innerHTML = ''; // Clear original form content
                        contactForm.appendChild(successMessageContainer); // Append the container
                        contactForm.style.opacity = '1';
                        formResult.style.display = 'none'; // Hide the initial result div
                    }, 300);
                } else {
                    console.log(response);
                    formResult.innerHTML = json.message || "Something went wrong! Please try again."; // Use formResult for errors
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            })
            .catch(error => {
                console.log(error);
                formResult.innerHTML = "Something went wrong! Please try again."; // Use formResult for errors
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Handle special case for "#" links
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate position accounting for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle collapsible sections
    document.querySelectorAll('.collapsible-header').forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.closest('.collapsible'); // Use closest to find parent
            const content = parent.querySelector('.collapsible-content');
            const isActive = parent.classList.toggle('active');

            header.setAttribute('aria-expanded', isActive);
            if (isActive) {
                content.removeAttribute('hidden');
            } else {
                content.setAttribute('hidden', '');
            }
        });
        // Initialize state
        const content = header.nextElementSibling;
        if (content && content.classList.contains('collapsible-content')) {
             header.setAttribute('aria-expanded', 'false');
             content.setAttribute('hidden', ''); // Ensure content is hidden initially
        }
    });
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.about-content, .project-card, .translation-card, .step, .section-title');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use 'visible' class for elements that need it (like section titles, steps)
                    if (entry.target.classList.contains('section-title') || entry.target.classList.contains('step')) {
                        entry.target.classList.add('visible');
                    } else {
                        // Use 'fade-in' or 'card-visible' for others
                        entry.target.classList.add(entry.target.classList.contains('card-animated') ? 'card-visible' : 'fade-in');
                    }
                    elementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            // Add base animation classes
            if (element.classList.contains('project-card') || element.classList.contains('translation-card')) {
                element.classList.add('card-animated');
            } else if (!element.classList.contains('section-title') && !element.classList.contains('step')) {
                element.classList.add('fade-in-element');
            }
            elementObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => {
            if (element.classList.contains('section-title') || element.classList.contains('step')) {
                element.classList.add('visible');
            } else {
                 element.classList.add(element.classList.contains('card-animated') ? 'card-visible' : 'fade-in');
            }
        });
    }
    
    // Fix methodology section image
    const methodologyImage = document.querySelector('.methodology-image img');
    if (methodologyImage && methodologyImage.dataset.src && methodologyImage.src.includes('data:image')) { // Check if placeholder is set
        // Lazy loading logic will handle replacing src, no need to fix here unless data-src is wrong
        // If data-src was wrong: methodologyImage.dataset.src = 'Assets/alpface.png';
    } else if (methodologyImage && methodologyImage.src.includes('example.com')) {
         // Fallback if not using data-src properly
         methodologyImage.src = 'Assets/alpface.png';
    }
    
    // Add staggered delay index to cards
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    const translationCards = document.querySelectorAll('.translations-grid .translation-card');

    projectCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
    translationCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });

    // Add debounced scroll handler for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        }
    }
    
    const debouncedScroll = debounce(() => {
        updateNavbar();
        highlightActiveSection();
    }, 50);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Improved lazy load images function
    const lazyImages = document.querySelectorAll('img[loading="lazy"][data-src]'); // Select only images with data-src
    
    // Function to load images
    function loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.onload = function() {
                img.removeAttribute('data-src');
            };
        }
    }
    
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        lazyImages.forEach(img => {
            loadImage(img);
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        loadImage(img);
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                loadImage(img);
            });
        }
    }

    // Add "Back to Top" button functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.setAttribute('title', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});