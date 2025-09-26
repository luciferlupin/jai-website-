document.addEventListener('DOMContentLoaded', function() {
    // Get all process steps and timeline line
    const steps = document.querySelectorAll('.process-step');
    const timelineLine = document.querySelector('.timeline-line');
    const timelineSection = document.querySelector('.process-section');
    let animationTriggered = false;
    
    // Function to check if element is in viewport
    const isInViewport = (element, offset = 0) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= 0
        );
    };

    // Function to animate steps with proper timing
    const animateSteps = () => {
        if (!timelineLine) return;
        
        // Animate the timeline line first
        timelineLine.classList.add('animate');
        
        // Calculate the position of each step relative to the timeline
        steps.forEach((step, index) => {
            const delay = 200 * index; // 200ms between each step
            
            setTimeout(() => {
                step.classList.add('animate');
                
                // Animate the step number with a slight delay
                const stepNumber = step.querySelector('.step-number');
                if (stepNumber) {
                    setTimeout(() => {
                        stepNumber.style.animation = 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards, pulse 1.5s ease-out 0.5s 2';
                    }, 100);
                }
                
                // Animate the content with a slight delay
                const content = step.querySelector('.step-content');
                if (content) {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }
                
            }, delay);
        });
    };

    // Function to handle scroll events
    const handleScroll = () => {
        if (animationTriggered || !timelineSection) return;
        
        if (isInViewport(timelineSection, 200)) {
            animationTriggered = true;
            animateSteps();
        }
    };

    // Initial check on page load
    if (isInViewport(timelineSection, 200)) {
        animationTriggered = true;
        animateSteps();
    }

    // Add scroll event listener with debounce
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 50);
    }, { passive: true });

    // Recalculate on window resize
    window.addEventListener('resize', handleScroll);
    
    // Trigger animations on page load if needed
    window.addEventListener('load', () => {
        if (isInViewport(timelineSection, 200)) {
            animationTriggered = true;
            animateSteps();
        }
    });
});
