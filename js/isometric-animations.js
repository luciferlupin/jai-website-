/**
 * 3D Isometric Systems & Interactive Animations (Light Theme Agency Edition)
 * Tailored specifically for Curious Kaizer's Web Engineering, AI Automation, Headless Commerce & Cloud Infrastructure.
 */
(() => {
    const initIsometricAnimations = () => {
        // 1. Interactive 3D Mouse Tilt Parallax for Isometric Architecture Cards
        const isoCards = document.querySelectorAll('.iso-card');
        
        isoCards.forEach(card => {
            const inner = card.querySelector('.iso-card-inner');
            if (!inner) return;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
            });

            card.addEventListener('mouseleave', () => {
                inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });

        // 2. Neural AI & Particle Warp Stream Canvas (Card #2 - AI Automation Pipeline)
        const matrixCanvas = document.getElementById('iso-matrix-canvas');
        if (matrixCanvas) {
            const ctx = matrixCanvas.getContext('2d');
            let animationFrameId;
            let width, height;

            const resizeCanvas = () => {
                const rect = matrixCanvas.parentElement.getBoundingClientRect();
                width = matrixCanvas.width = rect.width * (window.devicePixelRatio || 1);
                height = matrixCanvas.height = rect.height * (window.devicePixelRatio || 1);
                ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
            };

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            // Particles traveling along hyperbolic curve with AI & digital agency tokens
            const particles = [];
            const particleCount = 32;
            const aiTokens = ['RAG', 'GPT', 'LLM', 'AI', 'API', 'PWA', 'JSON', '0101', 'AUTH', 'EDGE', 'WASM', 'SEO'];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    angle: Math.random() * Math.PI * 2,
                    radius: 30 + Math.random() * 70,
                    speed: 0.015 + Math.random() * 0.022,
                    yProgress: Math.random(),
                    digit: aiTokens[Math.floor(Math.random() * aiTokens.length)],
                    opacity: 0.35 + Math.random() * 0.65,
                    size: 9 + Math.random() * 5
                });
            }

            const drawMatrixStream = () => {
                const w = matrixCanvas.offsetWidth;
                const h = matrixCanvas.offsetHeight;
                const centerX = w / 2;
                const centerY = h / 2;

                ctx.clearRect(0, 0, w, h);

                particles.forEach(p => {
                    p.angle += p.speed;
                    p.yProgress += 0.009;
                    if (p.yProgress > 1) {
                        p.yProgress = 0;
                        p.angle = Math.random() * Math.PI * 2;
                        p.digit = aiTokens[Math.floor(Math.random() * aiTokens.length)];
                    }

                    // Hyperboloid radius formula: r(y) narrowed in center
                    const normY = p.yProgress - 0.5; // -0.5 to 0.5
                    const waistFactor = 0.4 + 2.2 * (normY * normY); // narrow at middle, wide at top/bottom
                    const currentRadius = p.radius * waistFactor;

                    // Isometric projection coordinates
                    const posX = centerX + Math.cos(p.angle) * currentRadius * 0.95;
                    const posY = centerY + (p.yProgress - 0.5) * (h * 0.72) + Math.sin(p.angle) * currentRadius * 0.35;

                    ctx.save();
                    ctx.font = `700 ${p.size}px "Inter", "JetBrains Mono", sans-serif`;
                    ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity * (1 - Math.abs(normY) * 0.75)})`;
                    ctx.shadowColor = '#2563eb';
                    ctx.shadowBlur = 8;
                    ctx.fillText(p.digit, posX, posY);
                    ctx.restore();
                });

                animationFrameId = requestAnimationFrame(drawMatrixStream);
            };

            // Observer to run animation only when visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!animationFrameId) drawMatrixStream();
                    } else {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(matrixCanvas);
        }

        // 3. Dynamic Telemetry Counter Updates for Architecture Badges
        const isoTags = document.querySelectorAll('.iso-dynamic-tag');
        if (isoTags.length > 0) {
            setInterval(() => {
                isoTags.forEach(tag => {
                    const type = tag.dataset.type;
                    if (type === 'inp') {
                        const ms = Math.floor(14 + Math.random() * 8);
                        tag.textContent = `[INP: ${ms}ms]`;
                    } else if (type === 'ai') {
                        const rate = (4.0 + Math.random() * 1.8).toFixed(1);
                        tag.textContent = `[RAG: ${rate}k/s]`;
                    } else if (type === 'sla') {
                        const slaList = ['[99.99% SLA]', '[99.999% SLA]', '[100% UPTIME]'];
                        tag.textContent = slaList[Math.floor(Math.random() * slaList.length)];
                    } else if (type === 'tx') {
                        const tx = (12.5 + Math.random() * 4.2).toFixed(1);
                        tag.textContent = `[TX: ${tx}k/s]`;
                    } else if (type === 'vault') {
                        const vList = ['[AES-256 VAULT]', '[ZERO-TRUST ACTIVE]', '[ENCRYPTED CORE]'];
                        tag.textContent = vList[Math.floor(Math.random() * vList.length)];
                    } else if (type === 'regions') {
                        const reg = Math.floor(300 + Math.random() * 25);
                        tag.textContent = `[${reg}+ REGIONS]`;
                    }
                });
            }, 2400);
        }

        // 4. Icon Matrix Dynamic Active Cell Pulsing
        const matrixCells = Array.from(document.querySelectorAll('.matrix-icon-cell'));
        if (matrixCells.length > 0) {
            const initialActiveIndices = [3, 10, 18, 24, 31, 38, 45];
            initialActiveIndices.forEach(idx => {
                if (matrixCells[idx]) matrixCells[idx].classList.add('is-active');
            });

            setInterval(() => {
                const currentActive = matrixCells.filter(c => c.classList.contains('is-active'));
                if (currentActive.length > 0) {
                    const cellToDeactivate = currentActive[Math.floor(Math.random() * currentActive.length)];
                    cellToDeactivate.classList.remove('is-active');
                }
                const inactiveCells = matrixCells.filter(c => !c.classList.contains('is-active'));
                if (inactiveCells.length > 0) {
                    const cellToActivate = inactiveCells[Math.floor(Math.random() * inactiveCells.length)];
                    cellToActivate.classList.add('is-active');
                }
            }, 1200);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIsometricAnimations);
    } else {
        initIsometricAnimations();
    }
})();
