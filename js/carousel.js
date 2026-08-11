/**
 * Work Showcase Carousel Handler
 * CSS Hardware-Accelerated Infinite Marquee System
 */
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all videos play automatically on iOS / Safari / Edge
    const showcaseVideos = document.querySelectorAll('.work-showcase video');
    showcaseVideos.forEach(video => {
        video.muted = true;
        video.play().catch(() => {});
    });
});
