(() => {
    const initHeroProcessSequence = () => {
        const flow = document.querySelector('#home .process-sequence');
        const svg = flow?.querySelector('.journey-arch-svg');
        const path = flow?.querySelector('.journey-arch-progress');
        const discoveryCard = flow?.querySelector('.card-discovery');
        const strategyCard = flow?.querySelector('.card-strategy');
        const mockupCard = flow?.querySelector('.card-mockup');
        const launchCard = flow?.querySelector('.card-launch');
        const deployCompletion = flow?.querySelector('.deploy-live-status');

        if (!flow || !svg || !path || !discoveryCard || !strategyCard || !mockupCard || !launchCard || !deployCompletion) {
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

        const stageTimers = [];

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

            stageTimers.forEach(window.clearTimeout);
            flow.dataset.processState = 'complete';
            flow.dataset.activeStage = 'complete';
            flow.classList.add('is-complete');
            flow.classList.remove('is-running');
        };

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            finishSequence();
            return;
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                flow.dataset.processState = 'running';
                setActiveStage('meeting');
                flow.classList.add('is-running');
                queueStage('strategy', 1660);
                queueStage('build', 3270);
                queueStage('launch', 4980);
            });
        });

        deployCompletion.addEventListener('animationend', (event) => {
            if (event.animationName === 'deployLiveComplete') {
                finishSequence();
            }
        }, { once: true });

        window.setTimeout(finishSequence, 7200);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroProcessSequence, { once: true });
    } else {
        initHeroProcessSequence();
    }
})();
