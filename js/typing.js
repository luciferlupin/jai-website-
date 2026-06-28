document.addEventListener('DOMContentLoaded', function() {
    const texts = [
        'Your competitors have a website. Let\'s build one that\'s better.',
        'A website people actually remember.',
        'Built to make your business look serious.',
        'Stop losing customers to a bad website.',
        'Your business deserves better than a template.',
        'The website your business should have had years ago.',
        'Make a first impression that actually matters.',
        'People judge your business in seconds. Make them count.',
        'A website that earns trust before you say a word.',
        'Turn visitors into customers, not bounce rates.',
        'Built for businesses that want to grow.',
        'Look bigger. Sell better. Grow faster.',
        'Your website is your best salesperson.',
        'We build websites that make businesses money.'
    ];
    
    const typingText = document.querySelector('.typing-text');
    let textIndex = 0;
    let charIndex = texts[0].length; // Start with the first text fully typed
    let isDeleting = true; // Start by deleting
    let typingSpeed = 50; 
    let deleteSpeed = 30; 
    let pauseEnd = 3000; 
    let pauseStart = 500; 
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = deleteSpeed;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50 + Math.random() * 30;
            
            // Color transition from blue (#2563eb) to black based on character position
            const progress = charIndex / currentText.length;
            const redValue = Math.round(37 * (1 - progress));
            const greenValue = Math.round(99 * (1 - progress));
            const blueValue = Math.round(235 * (1 - progress));
            typingText.style.color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = pauseEnd;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = pauseStart;
            typingText.style.color = '#2563eb';
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Set initial color to match fully typed black text
    typingText.style.color = 'rgb(0, 0, 0)';
    setTimeout(type, pauseEnd); // Wait for the pause before deleting first text

    // Tech stack dynamic info cycling
    const techTextElement = document.querySelector('.tech-dynamic-text');
    if (techTextElement) {
        const techTexts = [
            'Thoughtful strategy, modern technology, and seamless interactions.',
            'Fast, scalable, and reliable digital experiences.',
            'Custom AI solutions that streamline operations and drive efficiency.',
            'High-converting digital products designed for business outcomes.',
            'Crafting pixel-perfect designs translated into powerful code.'
        ];
        let techIndex = 0;
        
        function rotateTechText() {
            techTextElement.style.opacity = '0';
            techTextElement.style.transform = 'translateY(8px)';
            
            setTimeout(() => {
                techIndex = (techIndex + 1) % techTexts.length;
                techTextElement.textContent = techTexts[techIndex];
                techTextElement.style.opacity = '1';
                techTextElement.style.transform = 'translateY(0)';
            }, 500);
        }
        
        techTextElement.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setInterval(rotateTechText, 4000);
    }
});
