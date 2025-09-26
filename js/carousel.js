document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.work-showcase-track');
    const carouselItems = document.querySelectorAll('.work-showcase-item');
    
    // Clone the first set of items for seamless looping
    carouselItems.forEach(item => {
        const clone = item.cloneNode(true);
        carouselTrack.appendChild(clone);
    });
    
    // Set the width of the track to accommodate all items
    const itemWidth = carouselItems[0].offsetWidth + 20; // 20px for gap
    carouselTrack.style.width = `${itemWidth * carouselItems.length * 2}px`;
    
    // Animation
    let position = 0;
    const speed = 0.5; // Adjust speed here (lower is slower)
    
    function animate() {
        position -= speed;
        
        // Reset position to create infinite loop
        if (position <= -itemWidth * carouselItems.length) {
            position = 0;
        }
        
        carouselTrack.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }
    
    // Start animation after page loads
    window.addEventListener('load', () => {
        // Small delay to ensure everything is loaded
        setTimeout(animate, 500);
    });
    
    // Pause animation on hover (optional, but you mentioned no hover effects)
    // carouselTrack.addEventListener('mouseenter', () => {
    //     isPaused = true;
    // });
    
    // carouselTrack.addEventListener('mouseleave', () => {
    //     isPaused = false;
    // });
});
