(function scrollAnimations() {
    window.sr = ScrollReveal();

    sr.reveal('.portfolio-item__img', {
        origin: 'left',
        distance: '100px',
        viewFactor: 0.6,
    });

    sr.reveal('.portfolio-item__result-image', {
        origin: 'right',
        distance: '100px',
        viewFactor: 0.6,
    });

    sr.reveal('.portfolio-item__result-conc-img', {
        origin: 'left',
        distance: '100px',
        viewFactor: 0.6,
    });
})();