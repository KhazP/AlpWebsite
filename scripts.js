/**
 * Main JavaScript file for Alp Yalay Portfolio Website
 * Author: GitHub Copilot
 * Version: 1.0
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
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
    
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
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Add required field indicators and validation feedback elements
    formInputs.forEach(input => {
        // Add required field indicator
        if (input.hasAttribute('required')) {
            const label = input.previousElementSibling;
            label.innerHTML += ' <span class="required">*</span>';
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
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h4>Message Sent!</h4>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                `;
                
                // Replace form with success message
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                    contactForm.style.opacity = '1';
                }, 300);
            }, 1500);
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
            const parent = header.parentElement;
            parent.classList.toggle('active');
        });
    });
    
    // Add animation on scroll
    const fadeInElements = document.querySelectorAll('.about-content, .project-card, .translation-card, .step');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeInElements.forEach(element => {
            element.classList.add('fade-in-element');
            fadeInObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        fadeInElements.forEach(element => {
            element.classList.add('fade-in');
        });
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Fix methodology section image
    const methodologyImage = document.querySelector('.methodology-image img');
    if (methodologyImage && methodologyImage.src.includes('example.com')) {
        methodologyImage.src = 'Assets/alpface.png';
    }
    
    // Add scroll-triggered animations for project and translation cards
    const animatedCards = document.querySelectorAll('.project-card, .translation-card');
    
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        animatedCards.forEach(card => {
            card.classList.add('card-animated');
            cardObserver.observe(card);
        });
    }
    
    // Add hover effect for cards
    animatedCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 30px rgba(35, 122, 58, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Add smooth scroll effect with speed adjustment based on distance
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                
                // Adjust duration based on distance
                const duration = Math.min(Math.abs(distance), 1000);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
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
        };
    }
    
    const debouncedScroll = debounce(() => {
        updateNavbar();
        highlightActiveSection();
    }, 50);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Handle contact form submission with Web3Forms
    const formResult = document.getElementById('form-result');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
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
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <h4>Message Sent!</h4>
                        <p>Thank you for reaching out. I'll get back to you soon.</p>
                    `;
                    
                    // Replace form with success message
                    contactForm.style.opacity = '0';
                    setTimeout(() => {
                        contactForm.innerHTML = '';
                        contactForm.appendChild(successMessage);
                        contactForm.style.opacity = '1';
                    }, 300);
                } else {
                    console.log(response);
                    formResult.innerHTML = json.message || "Something went wrong! Please try again.";
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            })
            .catch(error => {
                console.log(error);
                formResult.innerHTML = "Something went wrong! Please try again.";
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }
});