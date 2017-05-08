function animatePath() {
    window.pathTimeline = null;

    var paths = [
        {
            selector: "#path-1",
            speed: 10
        },
        {
            selector: "#path-2",
            speed: 6.5
        },
        {
            selector: "#path-3",
            speed: 7.5
        }
    ];

    // Set links to the next path
    for (var i = 0; i < paths.length; i++) {
        paths[i].next = paths[i + 1];
    }
    paths[paths.length - 1].next = paths[0];

    // Start animation loop
    animate(paths[0]);

    function animate(path) {
        var values = MorphSVGPlugin.pathDataToBezier(path.selector);

        pathTimeline = new TimelineLite();

        pathTimeline.to("#dot", path.speed, {
            bezier: { values: values, type: "cubic", autoRotate: false },
            ease: Power0.easeNone,
            onComplete: function() {
                switchSlide();
                // Resume loop
                animate(path.next);
            }
        });
    }

    function switchSlide() {
        // Switch slide if user not interact with slider
        var isTouched = $('.slider').hasClass('slider--touched');
        if (!isTouched) {
            imageSlider.slick('slickNext');
        }
    }
}

module.exports = animatePath;
