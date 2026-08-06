document.addEventListener('DOMContentLoaded', function() {
    // Keep the homepage technical canvas and footer consistent across the site.
    const isHomepage = Boolean(document.getElementById('home'));
    document.body.classList.add('home-wantace-background');
    if (!isHomepage) {
        document.body.classList.add('shared-home-background');
    }

    const existingFooter = document.querySelector('footer');
    if (existingFooter && !existingFooter.classList.contains('footer-wantace')) {
        existingFooter.outerHTML = `
            <footer class="footer-wantace" role="contentinfo" data-shared-footer="true">
                <div class="footer-bg-glow"></div>
                <div class="container">
                    <div class="footer-card">
                        <div class="footer-card-grid">
                            <div class="footer-col" data-aos="fade-up" data-aos-duration="600">
                                <a href="index.html" class="footer-brand-logo">
                                    <div class="wantace-logo-box"><i class="fas fa-code"></i></div>
                                    <span class="brand-name">Curious Kaizer</span>
                                </a>
                            </div>

                            <div class="footer-col" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                                <div class="col-header">LINKS</div>
                                <ul class="col-links">
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="services.html">Services</a></li>
                                    <li><a href="portfolio.html">Case Studies</a></li>
                                    <li><a href="index.html#process">Process</a></li>
                                </ul>
                            </div>

                            <div class="footer-col" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
                                <div class="col-header">COMPANY</div>
                                <ul class="col-links">
                                    <li><a href="index.html#why-choose-us">About</a></li>
                                    <li><a href="pricing.html#faq">FAQ</a></li>
                                </ul>
                            </div>

                            <div class="footer-col" data-aos="fade-up" data-aos-duration="600" data-aos-delay="300">
                                <div class="col-header">CONTACT</div>
                                <ul class="col-links contact-links">
                                    <li><a href="https://wa.me/918595121436" target="_blank" rel="noopener"><span class="contact-icon-circle wa"><i class="fab fa-whatsapp"></i></span>+91 85951 21436</a></li>
                                    <li><a href="mailto:info@curiouskaizer.com"><span class="contact-icon-circle mail"><i class="fas fa-envelope"></i></span>info@curiouskaizer.com</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="footer-social-row" data-aos="fade-up" data-aos-duration="600" data-aos-delay="400">
                            <span class="social-label">Our Socials</span>
                            <div class="social-divider"></div>
                            <div class="social-badges">
                                <a href="https://www.linkedin.com/company/curious-kaizer/" class="social-badge linkedin-badge" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                                <a href="https://www.instagram.com/curiouskaizer/" class="social-badge instagram-badge" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>

                        <div class="footer-bottom-row" data-aos="fade-up" data-aos-duration="600" data-aos-delay="500">
                            <div class="copyright-text">© 2026 Curious Kaizer</div>
                            <div class="legal-links">
                                <a href="privacy.html">Privacy Policy</a>
                                <span class="link-separator">|</span>
                                <a href="terms.html">Terms of Services</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    document.querySelectorAll('.footer-sparkle').forEach((sparkle) => sparkle.remove());

    // Use the Capabilities header as the visual system for every primary section heading.
    const sectionHeadingConfigs = [
        { selector: '#process .section-header', label: 'Process' },
        { selector: '#expertise .section-header', label: 'Capabilities' },
        { selector: '#technology .tech-central-content', label: 'Technology' },
        { selector: '#why-choose-us .why-us-header', label: 'Why Us' },
        { selector: '.testimonials-apple-section .testimonials-header-container', label: 'Testimonials' },
        { selector: '#what-we-built .section-header', label: 'Our Work' },
        { selector: '#portfolio .section-header-centered', label: 'Case Studies' },
        { selector: '#faq .section-header', label: 'FAQ' },
        { selector: '#book-call .banner-content', label: 'Schedule Meeting' },
        { selector: '.subpage-hero > .container', label: 'Overview' },
        { selector: '#cta-services > .container', label: 'Get Started' },
        { selector: '.faq-accordion-section > .container > div:first-child', label: 'FAQ' },
        { selector: '.booking-calendar-section > .container > div:first-child', label: 'Scheduling' },
        { selector: '.product-features-section > .container > div:first-child', label: 'Capabilities' },
        { selector: '.product-pricing-section > .container > div:first-child', label: 'Licensing' },
        { selector: '.blog-social-feeds .social-feeds-header', label: 'Social' }
    ];

    const styledSectionHeadings = new Set();

    const addSectionTitleAccent = (title) => {
        let accent = title.querySelector('.highlight-blue, .highlight-blue-light, .ck-section-title-accent');
        const directNodes = Array.from(title.childNodes);
        const trailingTextNode = directNodes
            .slice()
            .reverse()
            .find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());

        if (accent && trailingTextNode && directNodes.indexOf(trailingTextNode) > directNodes.indexOf(accent)) {
            accent.classList.remove('ck-section-title-accent');
            accent = null;
        }

        if (!accent) {
            if (trailingTextNode && title.children.length > 0) {
                accent = document.createElement('span');
                accent.textContent = ` ${trailingTextNode.textContent.trim()}`;
                trailingTextNode.replaceWith(accent);
            } else if (title.children.length === 0) {
                const words = title.textContent.trim().split(/\s+/);
                const accentWordCount = words.length > 2 ? 2 : 1;
                const leadWords = words.slice(0, -accentWordCount);
                const accentWords = words.slice(-accentWordCount);

                title.textContent = '';
                if (leadWords.length) {
                    title.append(document.createTextNode(`${leadWords.join(' ')} `));
                }

                accent = document.createElement('span');
                accent.textContent = accentWords.join(' ');
                title.append(accent);
            } else {
                accent = Array.from(title.children)
                    .filter((element) => !element.classList.contains('seo-subpage-pre-title'))
                    .pop();
            }
        }

        if (accent) {
            accent.classList.add('ck-section-title-accent');
        }

        title.querySelectorAll('span').forEach((span) => {
            if (span !== accent && !span.classList.contains('seo-subpage-pre-title')) {
                span.style.removeProperty('color');
            }
        });
    };

    sectionHeadingConfigs.forEach(({ selector, label }) => {
        document.querySelectorAll(selector).forEach((headingContainer) => {
            if (styledSectionHeadings.has(headingContainer)) {
                return;
            }

            const section = headingContainer.closest('section');
            const title = headingContainer.querySelector('h1, h2');

            if (!section || !title) {
                return;
            }

            styledSectionHeadings.add(headingContainer);
            section.classList.add('ck-heading-section');
            headingContainer.classList.add('ck-section-heading');
            title.classList.add('ck-section-title');

            let kicker = headingContainer.querySelector(
                '.hero-badge, .hero-badge-apple, .tech-category-badge, .why-us-badge, .testi-badge, .built-top-badge, .ck-section-kicker'
            );

            if (!kicker) {
                const preTitle = title.querySelector('.seo-subpage-pre-title');
                if (preTitle) {
                    kicker = preTitle;
                    headingContainer.insertBefore(kicker, title);
                }
            }

            if (!kicker) {
                kicker = document.createElement('div');
                kicker.textContent = label;
                headingContainer.insertBefore(kicker, title);
            }

            kicker.classList.add('ck-section-kicker');

            const summary = Array.from(headingContainer.children)
                .find((element) => element.tagName === 'P');

            if (summary) {
                summary.classList.add('ck-section-summary');
            }

            addSectionTitleAccent(title);
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !expanded);
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
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
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
    let activeSectionId = '';

    function updateActiveLink(activeId) {
        if (!activeId || activeId === activeSectionId) return;
        activeSectionId = activeId;
        
        if (navAnchorLinks.length > 0) {
            navAnchorLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${activeId}` || href === `index.html#${activeId}` || href === `./index.html#${activeId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }

    // IntersectionObserver for Layout-Reflow-Free active section detection (Only on Home Page)
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '' || window.location.pathname.endsWith('/');
    if (isHomePage && sections.length > 0 && navAnchorLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-180px 0px -40% 0px',
            threshold: 0
        };
        
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    if (currentScroll >= 150 || id === 'home') {
                        updateActiveLink(id);
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => spyObserver.observe(section));
    }
    
    function handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const isMobileMenuOpen = navLinks && navLinks.classList.contains('active');
        
        // 1. Add/remove scrolled class based on scroll threshold (50px)
        const scrollThreshold = 50;
        if (navbar) {
            const innerNavbar = navbar.querySelector('.navbar');
            if (currentScroll > scrollThreshold) {
                navbar.classList.add('scrolled');
                if (innerNavbar) innerNavbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
                if (innerNavbar) innerNavbar.classList.remove('scrolled');
            }
        }

        // Jitter-Proof Show/Hide Navigation Logic on scroll direction
        if (navbar) {
            if (currentScroll <= 0 || isMobileMenuOpen) {
                // Keep nav fully visible at the top of the page or when mobile hamburger is open
                navbar.style.transform = 'translateY(0)';
                lastScroll = currentScroll;
            } else if (Math.abs(currentScroll - lastScroll) >= 10) {
                // Only update nav visibility if scroll delta is greater than 10px to prevent jitter
                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scroll Down - Hide Navbar
                    navbar.style.transform = 'translateY(-120%)';
                } else {
                    // Scroll Up - Show Navbar
                    navbar.style.transform = 'translateY(0)';
                }
                lastScroll = currentScroll;
            }
        }
        
        // Force highlight "home" when scrolled to the very top
        if (currentScroll < 150) {
            updateActiveLink('home');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial run on DOM load to set correct initial highlights
    handleScroll();
    
    // Smooth Scrolling for Anchor Links (integrated with Lenis)
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href) return;
            
            // Check if it's a local anchor link or links to homepage anchors (e.g. #portfolio or index.html#portfolio)
            const isLocalAnchor = href.startsWith('#') && href !== '#';
            const isHomepageAnchor = (href.startsWith('index.html#') || href.startsWith('./index.html#')) && 
                                      (window.location.pathname.endsWith('/') || 
                                       window.location.pathname.endsWith('/index.html') || 
                                       window.location.pathname === '' ||
                                       !window.location.pathname.includes('.html'));
            
            if (isLocalAnchor || isHomepageAnchor) {
                const targetId = href.split('#')[1];
                if (!targetId) return;
                
                if (targetId === 'home') {
                    e.preventDefault();
                    closeMobileMenu();
                    scrollToTop();
                    return;
                }
                
                try {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        closeMobileMenu();
                        scrollToElement(targetElement);
                    }
                } catch (err) {
                    console.warn('Smooth scroll navigation failed for selector:', targetId, err);
                }
            }
        });
    });

    function closeMobileMenu() {
        const navLinksEl = document.getElementById('navLinks');
        const navToggleEl = document.getElementById('navToggle');
        if (navLinksEl && navLinksEl.classList.contains('active')) {
            navLinksEl.classList.remove('active');
            if (navToggleEl) navToggleEl.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }

    function scrollToTop() {
        if (window.lenis) {
            window.lenis.scrollTo(0);
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    function scrollToElement(element) {
        const navbarEl = document.querySelector('.navbar');
        const offset = navbarEl ? navbarEl.offsetHeight + 20 : 100;
        
        if (window.lenis) {
            window.lenis.scrollTo(element, {
                offset: -offset
            });
        } else {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    // Full-Width Process Stage Motion Switcher
    const stageNavBtns = document.querySelectorAll('.stage-nav-btn');
    const stagePanes = document.querySelectorAll('.graphic-stage-pane');
    let currentProcessStage = 1;
    let processAutoTimer = null;

    function activateProcessStage(stageNum) {
        currentProcessStage = stageNum;
        stageNavBtns.forEach(btn => {
            if (parseInt(btn.getAttribute('data-stage')) === stageNum) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        stagePanes.forEach(pane => {
            if (pane.id === `stage-pane-${stageNum}`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }

    if (stageNavBtns.length > 0) {
        stageNavBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const stage = parseInt(btn.getAttribute('data-stage'));
                activateProcessStage(stage);
                resetProcessTimer();
            });
        });

        function startProcessTimer() {
            processAutoTimer = setInterval(() => {
                let nextStage = currentProcessStage + 1;
                if (nextStage > 4) nextStage = 1;
                activateProcessStage(nextStage);
            }, 4500);
        }

        function resetProcessTimer() {
            if (processAutoTimer) clearInterval(processAutoTimer);
            startProcessTimer();
        }

        startProcessTimer();
    }
    
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
    const faqItems = document.querySelectorAll('.faq-card-item, .faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent close when clicking inside the answer content (like links or paragraphs)
            if (e.target.closest('.faq-card-answer, .faq-answer')) {
                return;
            }
            
            const isOpen = item.classList.contains('active');
            
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-card-toggle i, .faq-toggle-icon i');
                    if (otherIcon) {
                        otherIcon.className = 'fas fa-plus';
                    }
                }
            });
            
            // Toggle current FAQ item
            const currentIcon = item.querySelector('.faq-card-toggle i, .faq-toggle-icon i');
            if (isOpen) {
                item.classList.remove('active');
                if (currentIcon) {
                    currentIcon.className = 'fas fa-plus';
                }
            } else {
                item.classList.add('active');
                if (currentIcon) {
                    currentIcon.className = 'fas fa-minus';
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
        const updateStack = () => {
            const isDesktop = window.innerWidth > 768;
            const startTop = isDesktop ? 90 : 75;
            const offsetStep = 0; // Set to 0 for full overlapping deck effect
            
            cards.forEach((card, index) => {
                const cardContent = card.querySelector('.card-content');
                if (!cardContent) return;
                
                card.style.top = `${startTop + index * offsetStep}px`;
                card.style.zIndex = (index + 1) * 10;
            });
        };
        
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateStack);
        }, { passive: true });
        window.addEventListener('resize', updateStack, { passive: true });
        // Initial run
        updateStack();
    }



    // ==========================================================================
    // PORTFOLIO ROI CALCULATOR (PropVest)
    // ==========================================================================
    const propPriceInput = document.getElementById('prop-price');
    const groupDiscountInput = document.getElementById('group-discount');
    const initInvestInput = document.getElementById('init-invest');
    const expRentInput = document.getElementById('exp-rent');
    const appreciationRateInput = document.getElementById('appreciation-rate');
    const holdingPeriodInput = document.getElementById('holding-period');

    function updateCalculator() {
        if (!propPriceInput) return;

        const propPrice = parseFloat(propPriceInput.value);
        const groupDiscount = parseFloat(groupDiscountInput.value);
        const initInvest = parseFloat(initInvestInput.value);
        const expRent = parseFloat(expRentInput.value);
        const appreciationRate = parseFloat(appreciationRateInput.value);
        const holdingPeriod = parseFloat(holdingPeriodInput.value);

        // Update slider value labels
        document.getElementById('prop-price-val').textContent = '$' + propPrice.toLocaleString();
        document.getElementById('group-discount-val').textContent = groupDiscount + '%';
        document.getElementById('init-invest-val').textContent = '$' + initInvest.toLocaleString();
        document.getElementById('exp-rent-val').textContent = '$' + expRent.toLocaleString();
        document.getElementById('appreciation-rate-val').textContent = appreciationRate + '%';
        document.getElementById('holding-period-val').textContent = holdingPeriod + ' Years';

        // Calculations
        const discountedPrice = propPrice * (1 - groupDiscount / 100);
        const ownershipShare = initInvest / discountedPrice;
        
        // 1. Annual Rental Yield = (Rent * 12) / Discounted Price
        const annualRentalYield = ((expRent * 12) / discountedPrice) * 100;
        
        // 2. Monthly Cash Flow = Rent * Ownership Share
        const monthlyCashFlow = expRent * ownershipShare;
        
        // 3. Future Property Value = Prop Price * (1 + appreciation)^holding
        const futureValue = propPrice * Math.pow(1 + appreciationRate / 100, holdingPeriod);
        
        // 4. Capital Gain = Future Value - Discounted Price
        const capitalGain = futureValue - discountedPrice;
        const investorShareCapGain = capitalGain * ownershipShare;
        
        // 5. Total Rental Profit = Rent * 12 * holding * ownership share
        const totalRentalProfit = expRent * 12 * holdingPeriod * ownershipShare;
        
        // 6. Total Profit = Capital Gain Share + Rental Profit
        const totalProfit = investorShareCapGain + totalRentalProfit;
        
        // 7. Projected ROI % = Total Profit / Initial Investment * 100
        const projectedROI = (totalProfit / initInvest) * 100;

        // Render Outputs
        document.getElementById('out-yield').textContent = annualRentalYield.toFixed(2) + '%';
        document.getElementById('out-cashflow').textContent = '$' + Math.round(monthlyCashFlow).toLocaleString();
        document.getElementById('out-roi').textContent = projectedROI.toFixed(1) + '%';
        document.getElementById('out-capgain').textContent = '$' + Math.round(investorShareCapGain).toLocaleString();
        document.getElementById('out-future-val').textContent = '$' + Math.round(futureValue).toLocaleString();
        document.getElementById('out-total-profit').textContent = '$' + Math.round(totalProfit).toLocaleString();
    }

    if (propPriceInput) {
        [propPriceInput, groupDiscountInput, initInvestInput, expRentInput, appreciationRateInput, holdingPeriodInput].forEach(input => {
            input.addEventListener('input', updateCalculator);
        });
        updateCalculator();
    }
});
