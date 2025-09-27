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
    
    // Sticky Navigation on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll Down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll Up
            navbar.style.transform = 'translateY(0)';
            navbar.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

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
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .contact-info, .contact-form');
        
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
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .contact-info, .contact-form');
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
    window.addEventListener('scroll', animateOnScroll);

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
});
