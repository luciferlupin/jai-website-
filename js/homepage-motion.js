(() => {
    const initHomepageMotion = () => {
        const desktop = window.matchMedia('(min-width: 1200px)');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (!desktop.matches) {
            return;
        }

        const revealGroups = [
            ['.work-showcase .work-showcase-item'],
            ['#process .section-header', '#process .process-step', '#process .process-cta'],
            ['#expertise .section-header', '#expertise .sticky-card', '#expertise .expertise-cta'],
            ['#technology .tech-arch-container'],
            ['#why-choose-us .why-us-header', '#why-choose-us .bento-card'],
            ['.testimonials-apple-section .testimonials-header-container', '.testimonials-apple-section .testi-card'],
            ['#what-we-built .section-header', '#what-we-built .built-card'],
            ['#portfolio .section-header-centered', '#portfolio .portfolio-card-premium'],
            ['#faq .section-header', '#faq .faq-card-item'],
            ['#book-call .booking-premium-banner', '#book-call .booking-card-wrapper']
        ];

        const elements = [];

        revealGroups.forEach((selectors) => {
            let index = 0;

            selectors.forEach((selector) => {
                document.querySelectorAll(selector).forEach((element) => {
                    element.classList.add('ck-reveal-item');
                    element.style.setProperty('--ck-reveal-index', String(index % 4));
                    elements.push(element);
                    index += 1;
                });
            });
        });

        document.body.classList.add('ck-motion-ready');

        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            elements.forEach((element) => element.classList.add('is-revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -8% 0px'
        });

        elements.forEach((element) => observer.observe(element));
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHomepageMotion, { once: true });
    } else {
        initHomepageMotion();
    }
})();
