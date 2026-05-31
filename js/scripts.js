document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close menu when clicking on a nav link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
    
    // Portfolio item interaction
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Handle both click and touch events for mobile
    portfolioItems.forEach(item => {
        // Remove hover effect on touch devices
        if ('ontouchstart' in window) {
            item.classList.add('touch-device');
        }
        
        // Toggle active class on click/tap
        item.addEventListener('click', function(e) {
            // Don't toggle if clicking on a link inside the overlay
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Close other open portfolio items
            portfolioItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            this.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!item.contains(e.target) && !e.target.classList.contains('portfolio-item')) {
                item.classList.remove('active');
            }
        });
    });
    
    // Sticky Navigation on Scroll & Active Link Scroll Spy
    const navbar = document.querySelector('.site-header');
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchorLinks = document.querySelectorAll('.nav-links a');
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        const isMobileMenuOpen = navLinks && navLinks.classList.contains('active');
        
        // 1. Jitter-Proof Show/Hide Navigation Logic
        if (currentScroll <= 0 || isMobileMenuOpen) {
            // Keep nav fully visible at the top of the page or when mobile hamburger is open
            navbar.style.transform = 'translateY(0)';
            if (currentScroll <= 0) {
                navbar.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        } else if (Math.abs(currentScroll - lastScroll) >= 10) {
            // Only update nav visibility if scroll delta is greater than 10px to prevent jitter
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scroll Down - Hide Navbar
                navbar.style.transform = 'translateY(-120%)';
            } else {
                // Scroll Up - Show Navbar
                navbar.style.transform = 'translateY(0)';
                navbar.classList.add('scrolled');
            }
            lastScroll = currentScroll;
        }
        
        // 2. Active Link Scroll Spy Highlight (runs continuously on every pixel scrolled)
        const scrollSpyOffset = 180; // offset for floating nav + spacing
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (currentScroll + scrollSpyOffset >= sectionTop && currentScroll + scrollSpyOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // When on Home section (scrolled near the top), highlight "Home" so it shows the active line
        if (currentSectionId === 'home' || currentScroll < 150) {
            currentSectionId = 'home';
        }
        
        if (currentSectionId) {
            navAnchorLinks.forEach(link => {
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial run on DOM load to set correct initial highlights
    handleScroll();
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Custom direct scroll for Home to go to the absolute top of the page
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 110;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    

    // Package cards animation
    const packageCards = document.querySelectorAll('.service-card');
    
    // Add initial styles to package cards
    packageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
    });
    
    // Intersection Observer for package cards
    const packageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each package card
    packageCards.forEach(card => {
        packageObserver.observe(card);
    });
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .contact-info');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .contact-info');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
    });
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 100);
    
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    const successMessage = document.getElementById('subscription-success');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(newsletterForm);
            
            // Submit the form using fetch
            fetch(newsletterForm.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
            .then(() => {
                // Hide form and show success message
                newsletterForm.style.display = 'none';
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Error:', error);
                // Fallback to normal form submission if fetch fails
                newsletterForm.submit();
            });
        });
    }
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll, { passive: true });
    
    // FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        
        // Hide answers by default in JS
        if (answer) {
            answer.style.maxHeight = '0px';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease';
            answer.style.opacity = '0';
        }
        
        item.addEventListener('click', function(e) {
            // Prevent close when clicking inside the answer content (like links or paragraphs)
            if (e.target.closest('.faq-answer')) {
                return;
            }
            
            const isOpen = item.classList.contains('active');
            
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0px';
                        otherAnswer.style.opacity = '0';
                    }
                }
            });
            
            // Toggle current FAQ item
            if (isOpen) {
                item.classList.remove('active');
                if (answer) {
                    answer.style.maxHeight = '0px';
                    answer.style.opacity = '0';
                }
            } else {
                item.classList.add('active');
                if (answer) {
                    answer.style.maxHeight = `${answer.scrollHeight}px`;
                    answer.style.opacity = '1';
                }
            }
        });
    });

    // Add loading animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
    
    // Remove loader after page is fully loaded
    setTimeout(function() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 500);

    // 'Our Expertise' Premium Card Scroll Stacking & Visual Dynamics
    const cards = document.querySelectorAll('.saas-scroll-section .sticky-card');
    if (cards.length > 0) {
        const stackOffset = 30;
        
        const updateStack = () => {
            const isDesktop = window.innerWidth > 768;
            
            cards.forEach((card, index) => {
                const cardContent = card.querySelector('.card-content');
                if (!cardContent) return;
                
                if (!isDesktop) {
                    // Reset mobile styles
                    card.style.top = 'auto';
                    card.style.zIndex = 'auto';
                    cardContent.style.setProperty('--card-transform', 'none');
                    cardContent.style.opacity = '1';
                    cardContent.style.filter = 'none';
                    return;
                }
                
                // Desktop Sticky positioning offsets
                card.style.top = `${100 + index * stackOffset}px`;
                card.style.zIndex = index + 1;
                
                const rect = card.getBoundingClientRect();
                const topLimit = 100 + index * stackOffset;
                const viewportHeight = window.innerHeight;
                const eightyPercentViewport = viewportHeight * 0.8;
                
                // If scrolled past 80% viewport threshold, calculate progress
                const scrollProgress = Math.max(0, Math.min(1, (eightyPercentViewport - rect.top) / 400));
                
                if (rect.top <= eightyPercentViewport) {
                    const scale = 1 - (scrollProgress * 0.05);
                    const translateY = scrollProgress * -15;
                    
                    cardContent.style.setProperty('--card-transform', `scale(${scale}) translateY(${translateY}px)`);
                    cardContent.style.opacity = '1';
                    cardContent.style.filter = 'none';
                } else {
                    cardContent.style.setProperty('--card-transform', 'scale(1) translateY(0)');
                    cardContent.style.opacity = '1';
                    cardContent.style.filter = 'none';
                }
            });
        };
        
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateStack);
        }, { passive: true });
        window.addEventListener('resize', updateStack);
        // Initial run
        updateStack();
    }
});


