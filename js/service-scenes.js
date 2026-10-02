(() => {
    const scenes = document.querySelectorAll('.service-scene');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const visible = new Set();
    const update = () => scenes.forEach(scene => {
        const playing = visible.has(scene) && !document.hidden && !reduced.matches;
        scene.classList.toggle('is-visible', playing);
        const svg = scene.querySelector('svg');
        if (playing) svg.unpauseAnimations();
        else svg.pauseAnimations();
    });
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
        });
        update();
    }, { threshold: 0.1 });
    scenes.forEach(scene => observer.observe(scene));
    reduced.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
})();
