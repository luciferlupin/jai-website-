document.addEventListener('DOMContentLoaded', function() {
    const texts = [
        'Stunning Websites',
        'Powerful Web Apps',
        'E-commerce Solutions',
        'SEO-Optimized Sites'
    ];
    
    const typingText = document.querySelector('.typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // milliseconds
    let deleteSpeed = 50; // milliseconds
    let pauseEnd = 2000; // pause at the end of each word
    let pauseStart = 500; // pause at the start of each word
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Delete characters
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = deleteSpeed;
        } else {
            // Type characters
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100 + Math.random() * 50; // Random typing speed for natural feel
        }
        
        // Check if we've finished typing a word
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end of the word
            typingSpeed = pauseEnd;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to the next word
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = pauseStart;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect after a short delay
    setTimeout(type, 1000);
});
