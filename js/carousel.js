/**
 * Work Showcase Carousel Handler
 * High-performance, viewport-aware video playback & infinite marquee management.
 */
document.addEventListener('DOMContentLoaded', function() {
    const showcaseVideos = document.querySelectorAll('.work-showcase video');
    if (!showcaseVideos.length) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    showcaseVideos.forEach(video => {
        video.muted = true;
        video.playsInline = true;
        video.preload = 'none'; // Prevent simultaneous downloading of 38MB of videos on page load
    });

    if (prefersReducedMotion) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        // Fallback: only play after user starts interacting or window is fully idle
        window.addEventListener('scroll', function onFirstScroll() {
            showcaseVideos.forEach(video => {
                video.preload = 'auto';
                video.play().catch(() => {});
            });
            window.removeEventListener('scroll', onFirstScroll);
        }, { passive: true, once: true });
        return;
    }

    // Viewport-aware playback observer - saves GPU/CPU and bandwidth
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.paused) {
                    video.preload = 'auto';
                    video.play().catch(() => {});
                }
            } else {
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '100px 0px 100px 0px'
    });

    showcaseVideos.forEach(video => videoObserver.observe(video));
});

