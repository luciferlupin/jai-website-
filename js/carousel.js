document.addEventListener('DOMContentLoaded', function() {
    const trackLeft = document.querySelector('.track-left');
    const trackRight = document.querySelector('.track-right');
    
    if (!trackLeft || !trackRight) return;
    
    const itemsLeft = trackLeft.querySelectorAll('.work-showcase-item');
    const itemsRight = trackRight.querySelectorAll('.work-showcase-item');
    
    // Clone the items for seamless looping
    itemsLeft.forEach(item => {
        const clone = item.cloneNode(true);
        trackLeft.appendChild(clone);
    });
    itemsRight.forEach(item => {
        const clone = item.cloneNode(true);
        trackRight.appendChild(clone);
    });
    
    let itemWidth = 380 + 24; 
    
    function updateWidth() {
        if (itemsLeft[0]) {
            itemWidth = itemsLeft[0].offsetWidth + 24;
        }
        trackLeft.style.width = `${itemWidth * itemsLeft.length * 2}px`;
        trackRight.style.width = `${itemWidth * itemsRight.length * 2}px`;
    }
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    // Animation states
    let posLeft = 0;
    // Offset the right track initially so they don't look completely synchronized/mirrored
    let posRight = -itemWidth * itemsRight.length * 0.5;
    
    const speed = 0.6; // Speed index
    
    function animate() {
        // Track Left (Scrolls Left)
        posLeft -= speed;
        if (posLeft <= -itemWidth * itemsLeft.length) {
            posLeft = 0;
        }
        trackLeft.style.transform = `translateX(${posLeft}px)`;
        
        // Track Right (Scrolls Right)
        posRight += speed;
        if (posRight >= 0) {
            posRight = -itemWidth * itemsRight.length;
        }
        trackRight.style.transform = `translateX(${posRight}px)`;
        
        requestAnimationFrame(animate);
    }
    
    setTimeout(animate, 500);
});
