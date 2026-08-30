(() => {
    const initHeroProcessSequence = () => {
        const flow = document.querySelector('#home .process-sequence');
        const svg = flow?.querySelector('.journey-arch-svg');
        const path = flow?.querySelector('.journey-arch-progress');
        const discoveryCard = flow?.querySelector('.card-discovery');
        const strategyCard = flow?.querySelector('.card-strategy');
        const mockupCard = flow?.querySelector('.card-mockup');
        const launchCard = flow?.querySelector('.card-launch');

        if (!flow || !svg || !path || !discoveryCard || !strategyCard || !mockupCard || !launchCard) {
            return;
        }

        const cards = [discoveryCard, strategyCard, mockupCard, launchCard];
        const stepPills = flow.querySelectorAll('.mobile-step-pill');
        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

        const clipInsetForCard = (card) => {
            const svgRect = svg.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + (cardRect.width / 2);
            const reachedProgress = clamp(
                (cardCenterX - svgRect.left) / svgRect.width,
                0,
                1
            );
            return 100 - (reachedProgress * 100);
        };

        const nodes = [
            flow.querySelector('.node-step-1'),
            flow.querySelector('.node-step-2'),
            flow.querySelector('.node-step-3'),
            flow.querySelector('.node-step-4')
        ];

        const alignNodeToPath = (node) => {
            if (!node) return;
            const svgRect = svg.getBoundingClientRect();
            if (svgRect.width === 0) return;

            const nodeRect = node.getBoundingClientRect();
            const nodeCenterX = nodeRect.left + (nodeRect.width / 2);
            const targetX = clamp((nodeCenterX - svgRect.left) / svgRect.width, 0, 1);
            const cubicAt = (p0, p1, p2, p3, t) => {
                const inverse = 1 - t;
                return (inverse ** 3 * p0)
                    + (3 * inverse ** 2 * t * p1)
                    + (3 * inverse * t ** 2 * p2)
                    + (t ** 3 * p3);
            };

            let low = 0;
            let high = 1;
            let curveT = 0;

            for (let i = 0; i < 15; i++) {
                curveT = (low + high) / 2;
                const curveX = cubicAt(0.001, 0.252, 0.748, 0.999, curveT);
                if (curveX < targetX) {
                    low = curveT;
                } else {
                    high = curveT;
                }
            }

            const curveY = cubicAt(1 / 110, 108 / 110, 108 / 110, 1 / 110, curveT);
            const flowRect = flow.getBoundingClientRect();
            const svgLocalTop = svgRect.top - flowRect.top;
            const targetLocalTop = svgLocalTop + (curveY * svgRect.height);
            node.style.setProperty('top', `${targetLocalTop}px`, 'important');
        };

        let frameRequest = 0;
        const updateResponsiveStops = () => {
            if (window.innerWidth <= 768) return;
            cancelAnimationFrame(frameRequest);
            frameRequest = requestAnimationFrame(() => {
                const strategyStop = clipInsetForCard(strategyCard);
                const mockupStop = clipInsetForCard(mockupCard);

                flow.style.setProperty('--arch-clip-two', `${strategyStop.toFixed(3)}%`);
                flow.style.setProperty('--arch-clip-three', `${mockupStop.toFixed(3)}%`);
                flow.dataset.archClipTwo = strategyStop.toFixed(3);
                flow.dataset.archClipThree = mockupStop.toFixed(3);

                nodes.forEach(alignNodeToPath);
            });
        };

        updateResponsiveStops();
        window.addEventListener('resize', updateResponsiveStops, { passive: true });

        if ('ResizeObserver' in window) {
            const observer = new ResizeObserver(updateResponsiveStops);
            observer.observe(flow);
            observer.observe(svg);
        }

        // ==========================================
        // Mobile Interactive Step Controller
        // ==========================================
        const isMobile = () => window.innerWidth <= 768;
        let currentStepIndex = 0;
        let mobileTimer = null;
        let isUserInteracting = false;
        let userResumeTimer = null;

        const setMobileStep = (index, userInitiated = false) => {
            currentStepIndex = (index + cards.length) % cards.length;
            flow.dataset.mobileStep = currentStepIndex;

            // Activate target card, deactivate others
            cards.forEach((card, i) => {
                if (i === currentStepIndex) {
                    card.classList.add('is-mobile-active');
                } else {
                    card.classList.remove('is-mobile-active');
                }
            });

            // Update interactive step pills
            stepPills.forEach((pill, i) => {
                const isActive = (i === currentStepIndex);
                pill.classList.toggle('active', isActive);
                pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            if (userInitiated) {
                isUserInteracting = true;
                clearTimeout(userResumeTimer);
                clearInterval(mobileTimer);
                // Pause auto-play for 4.5s after manual user tap, then resume
                userResumeTimer = setTimeout(() => {
                    isUserInteracting = false;
                    startMobileAutoPlay();
                }, 4500);
            }
        };

        const startMobileAutoPlay = () => {
            clearInterval(mobileTimer);
            if (!isMobile()) return;
            mobileTimer = setInterval(() => {
                if (isMobile() && !isUserInteracting && !document.hidden) {
                    setMobileStep(currentStepIndex + 1);
                }
            }, 3200);
        };

        // Attach click listeners to mobile step pills
        stepPills.forEach((pill, index) => {
            pill.addEventListener('click', (e) => {
                e.stopPropagation();
                setMobileStep(index, true);
            });
        });

        // Tapping card on mobile advances to next step
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                if (isMobile()) {
                    setMobileStep(currentStepIndex + 1, true);
                }
            });
        });

        // Swipe gesture support on mobile cards
        let touchStartX = 0;
        let touchEndX = 0;
        flow.addEventListener('touchstart', (e) => {
            if (!isMobile()) return;
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        flow.addEventListener('touchend', (e) => {
            if (!isMobile()) return;
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    // Swiped left -> next step
                    setMobileStep(currentStepIndex + 1, true);
                } else {
                    // Swiped right -> previous step
                    setMobileStep(currentStepIndex - 1, true);
                }
            }
        }, { passive: true });

        // Initialize state based on current viewport
        const handleViewportInit = () => {
            if (isMobile()) {
                setMobileStep(0);
                startMobileAutoPlay();
            } else {
                clearInterval(mobileTimer);
                cards.forEach(card => card.classList.remove('is-mobile-active'));
                flow.classList.add('is-running');
                updateResponsiveStops();
            }
        };

        handleViewportInit();

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleViewportInit, 150);
        }, { passive: true });

        // Pause timer when tab is inactive
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(mobileTimer);
            } else if (isMobile()) {
                startMobileAutoPlay();
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroProcessSequence, { once: true });
    } else {
        initHeroProcessSequence();
    }
})();
