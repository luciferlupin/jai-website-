/**
 * Design Systems & Engineering Specs - Apple-Style Interactive Micro-Interactions
 * Powers 3D Card Parallax, Live Gauge Sweeps, and Animated Node Flow.
 */
(() => {
    const initDesignSpecInteractions = () => {
        // 1. Apple-Style 3D Mouse Parallax Tilt for Spec Blueprint Cards
        const specCards = document.querySelectorAll('.spec-col, .spec-vis-card, .spec-tech-card');

        specCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });

        // 2. Interactive Arc Gauge Sweep Animation
        const gaugeContainer = document.querySelector('.card-cyan-grid');
        const gaugeArc = document.querySelector('.gauge-arc-path');
        const gaugeVal = document.querySelector('.gauge-value');
        const gaugeNeedleDot = document.querySelector('.gauge-needle-dot');

        if (gaugeContainer && gaugeArc && gaugeVal) {
            let isSwept = false;

            const toggleGauge = (forceActive = null) => {
                const active = forceActive !== null ? forceActive : !isSwept;
                isSwept = active;

                if (active) {
                    // Peak 100/100 Core Web Vitals Performance State
                    gaugeVal.textContent = '100%';
                    gaugeArc.setAttribute('d', 'M 15 60 A 45 45 0 1 1 105 60');
                    gaugeArc.setAttribute('stroke', '#10b981');
                    if (gaugeNeedleDot) {
                        gaugeNeedleDot.setAttribute('cx', '105');
                        gaugeNeedleDot.setAttribute('cy', '60');
                        gaugeNeedleDot.setAttribute('fill', '#10b981');
                    }
                } else {
                    // High 98% Default State
                    gaugeVal.textContent = '98%';
                    gaugeArc.setAttribute('d', 'M 15 60 A 45 45 0 1 1 96 40');
                    gaugeArc.setAttribute('stroke', '#10b981');
                    if (gaugeNeedleDot) {
                        gaugeNeedleDot.setAttribute('cx', '96');
                        gaugeNeedleDot.setAttribute('cy', '40');
                        gaugeNeedleDot.setAttribute('fill', '#10b981');
                    }
                }
            };

            gaugeContainer.addEventListener('mouseenter', () => toggleGauge(true));
            gaugeContainer.addEventListener('mouseleave', () => toggleGauge(false));
            gaugeContainer.addEventListener('click', () => toggleGauge());
        }

        // 3. TAM / SAM / SOM Concentric Segment Hover Highlights
        const circlesWrapper = document.querySelector('.concentric-circles-wrapper');
        if (circlesWrapper) {
            const som = circlesWrapper.querySelector('.circle-som');
            const sam = circlesWrapper.querySelector('.circle-sam');
            const tam = circlesWrapper.querySelector('.circle-tam');

            if (som) {
                som.addEventListener('mouseenter', (e) => {
                    e.stopPropagation();
                    som.style.borderColor = '#2563eb';
                    som.style.boxShadow = '0 0 18px rgba(37, 99, 235, 0.3)';
                });
                som.addEventListener('mouseleave', () => {
                    som.style.borderColor = '#2563eb';
                    som.style.boxShadow = 'none';
                });
            }

            if (sam) {
                sam.addEventListener('mouseenter', (e) => {
                    e.stopPropagation();
                    sam.style.borderColor = '#2563eb';
                    sam.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.2)';
                });
                sam.addEventListener('mouseleave', () => {
                    sam.style.borderColor = '#94a3b8';
                    sam.style.boxShadow = 'none';
                });
            }

            if (tam) {
                tam.addEventListener('mouseenter', () => {
                    tam.style.borderColor = '#2563eb';
                    tam.style.boxShadow = '0 0 24px rgba(37, 99, 235, 0.15)';
                });
                tam.addEventListener('mouseleave', () => {
                    tam.style.borderColor = '#cbd5e1';
                    tam.style.boxShadow = 'none';
                });
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDesignSpecInteractions);
    } else {
        initDesignSpecInteractions();
    }
})();
