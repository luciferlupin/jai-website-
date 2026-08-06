(() => {
    const initHeroProcessSequence = () => {
        const flow = document.querySelector('#home .process-sequence');
        const svg = flow?.querySelector('.journey-arch-svg');
        const path = flow?.querySelector('.journey-arch-progress');
        const discoveryCard = flow?.querySelector('.card-discovery');
        const strategyCard = flow?.querySelector('.card-strategy');
        const mockupCard = flow?.querySelector('.card-mockup');
        const launchCard = flow?.querySelector('.card-launch');
        const deployCompletion = flow?.querySelector('.deploy-live-status') || launchCard;

        if (!flow || !svg || !path || !discoveryCard || !strategyCard || !mockupCard || !launchCard) {
            return;
        }

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

            // Normalized control points for the visible journey curve:
            // M 1 1 C 252 108, 748 108, 999 1 in a 1000 × 110 viewBox.
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
            const targetLocalTop = svgLocalTop
                + (curveY * svgRect.height);
            node.style.setProperty('top', `${targetLocalTop}px`, 'important');
        };

        let frameRequest = 0;

        const updateResponsiveStops = () => {
            cancelAnimationFrame(frameRequest);
            frameRequest = requestAnimationFrame(() => {
                const strategyStop = clipInsetForCard(strategyCard);
                const mockupStop = clipInsetForCard(mockupCard);

                flow.style.setProperty('--arch-clip-two', `${strategyStop.toFixed(3)}%`);
                flow.style.setProperty('--arch-clip-three', `${mockupStop.toFixed(3)}%`);
                flow.dataset.archClipTwo = strategyStop.toFixed(3);
                flow.dataset.archClipThree = mockupStop.toFixed(3);

                // Align all nodes exactly to the SVG curve path
                nodes.forEach(alignNodeToPath);
            });
        };

        updateResponsiveStops();
        window.addEventListener('resize', updateResponsiveStops, { passive: true });

        if ('ResizeObserver' in window) {
            const observer = new ResizeObserver(updateResponsiveStops);
            observer.observe(flow);
            observer.observe(svg);
            observer.observe(strategyCard);
            observer.observe(mockupCard);
        }

        const isMobile = () => window.matchMedia('(max-width: 600px)').matches;

        let loopTimeout = null;
        let stageTimers = [];

        const clearAllTimers = () => {
            stageTimers.forEach(window.clearTimeout);
            stageTimers = [];
            if (loopTimeout) {
                window.clearTimeout(loopTimeout);
                loopTimeout = null;
            }
        };

        const setActiveStage = (stage) => {
            flow.dataset.activeStage = stage;
        };

        const queueStage = (stage, delay) => {
            stageTimers.push(window.setTimeout(() => setActiveStage(stage), delay));
        };

        const finishSequence = () => {
            if (flow.dataset.processState === 'complete') {
                return;
            }

            clearAllTimers();
            flow.dataset.processState = 'complete';
            flow.dataset.activeStage = 'complete';
            flow.classList.add('is-complete');
            flow.classList.remove('is-running');
        };

        const startSequence = () => {
            clearAllTimers();
            flow.dataset.processState = 'running';
            flow.classList.remove('is-complete');
            flow.classList.remove('is-running');

            // Force reflow while is-running is removed so CSS animations restart cleanly from 0s
            void flow.offsetWidth;

            setActiveStage('meeting');
            flow.classList.add('is-running');
            queueStage('strategy', 1660);
            queueStage('build', 3270);
            queueStage('launch', 4980);

            if (isMobile()) {
                // On phone screen: loop endlessly back to Discovery card after cycle completes (~6740ms)
                loopTimeout = window.setTimeout(() => {
                    if (isMobile() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        flow.classList.remove('is-running');
                        requestAnimationFrame(() => {
                            startSequence();
                        });
                    } else {
                        finishSequence();
                    }
                }, 6740);
            } else {
                // On desktop: finish sequence after one complete run
                loopTimeout = window.setTimeout(finishSequence, 7200);
            }
        };

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            finishSequence();
            return;
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                startSequence();
            });
        });

        deployCompletion.addEventListener('animationend', (event) => {
            if (!isMobile() && event.animationName === 'deployLiveComplete') {
                finishSequence();
            }
        });

        // Handle resize between mobile and desktop dynamically
        let wasMobile = isMobile();
        window.addEventListener('resize', () => {
            updateResponsiveStops();
            const nowMobile = isMobile();
            if (nowMobile !== wasMobile) {
                wasMobile = nowMobile;
                startSequence();
            }
        }, { passive: true });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroProcessSequence, { once: true });
    } else {
        initHeroProcessSequence();
    }
})();
