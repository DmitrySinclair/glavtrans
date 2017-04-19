(function mainSlider() {
    var slider = $('.slider__cont');
    slider.slick({
        fade: true,
        dots: true,
        appendArrows: '.slider__controls',
        autoplay: true,
        autoPlaySpeed: 7000
    });

    slider.on('beforeChange', function() {
        setTimeout(function() {
            var color = slider.find('.slick-active').data('color');
            changeHeaderColor(color);
        }, 25);
    });
})();

function changeHeaderColor(color) {
    var header = $('.header');
    header.css('background-color', color);
}