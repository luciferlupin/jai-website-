const initTimeline = () => {
    const steps = document.querySelectorAll('.process-step');
    const timelineLine = document.querySelector('.timeline-line');
    const timelineContainer = document.querySelector('.process-timeline');
    
    if (!timelineContainer || !timelineLine) return;

    // Reset styles for dynamic script-controlled scaleY
    timelineLine.style.height = '100%';
    timelineLine.style.transform = 'translateX(-50%) scaleY(0)';
    timelineLine.style.transformOrigin = 'top center';
    timelineLine.style.transition = 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)'; // Super snappy tracking ease
    timelineLine.style.background = '#2563eb'; // Force blue color

    // Cached metrics to prevent layout thrashing (120fps scrolling optimization)
    let containerTop = 0;
    let containerHeight = 0;
    let stepMetrics = [];

    const updateMetrics = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        
        // Cache container position
        const containerRect = timelineContainer.getBoundingClientRect();
        containerTop = containerRect.top + scrollTop;
        containerHeight = containerRect.height;
        
        // Cache each step position
        stepMetrics = Array.from(steps).map((step) => {
            const rect = step.getBoundingClientRect();
            return {
                element: step,
                top: rect.top + scrollTop,
                animated: step.classList.contains('animate'),
                stepNumber: step.querySelector('.step-number'),
                content: step.querySelector('.step-content')
            };
        });
    };

    const handleScroll = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const viewportHeight = window.innerHeight;
        
        // 1. Dynamic line progress (Using 100% layout-reflow-free cached coordinates)
        const startPoint = scrollTop + viewportHeight * 0.65;
        const scrolled = startPoint - containerTop;
        const total = containerHeight - (viewportHeight * 0.3); // 0.65 - 0.35 = 0.3 viewport difference
        
        let progress = scrolled / total;
        progress = Math.max(0, Math.min(1, progress));
        
        timelineLine.style.transform = `translateX(-50%) scaleY(${progress})`;

        // 2. Step animations trigger (Layout-reflow-free loop)
        stepMetrics.forEach((metric) => {
            if (metric.animated) return;
            
            if (metric.top <= scrollTop + viewportHeight * 0.8) {
                metric.animated = true;
                metric.element.classList.add('animate');
                
                // Animate step number
                if (metric.stepNumber) {
                    setTimeout(() => {
                        metric.stepNumber.style.animation = 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards, pulse 1.5s ease-out 0.5s 2';
                    }, 100);
                }
                
                // Fade in step content
                if (metric.content) {
                    metric.content.style.opacity = '1';
                    metric.content.style.transform = 'translateY(0)';
                }
            }
        });
    };

    // Calculate metrics initially
    updateMetrics();

    // Listen to Lenis scroll event
    if (window.lenis) {
        window.lenis.on('scroll', handleScroll);
    } else {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initial check on load
    handleScroll();
    
    // Recalculate metrics on resize/load to ensure responsiveness
    window.addEventListener('resize', () => {
        updateMetrics();
        handleScroll();
    });
    window.addEventListener('load', () => {
        updateMetrics();
        handleScroll();
    });
};

if (document.readyState !== 'loading') {
    initTimeline();
} else {
    document.addEventListener('DOMContentLoaded', initTimeline);
}
