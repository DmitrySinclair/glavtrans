var textSlider, imageSlider;

(function slider() {
    // Init text slider
    textSlider = $('.text-slider__cont');
    textSlider.slick({
        fade: true,
        dots: true,
        appendArrows: '.text-slider__arrows',
        asNavFor: '.image-slider',
    });

    $('.text-slider__controls').prepend($('.text-slider .slick-dots'));


    // Init image slider
    imageSlider = $('.image-slider');
    imageSlider.slick({
        fade: true,
        arrows: false,
        asNavFor: '.text-slider__cont',
    });

    // Indicate user interaction
    $('.text-slider__controls').on('click', function() {
        $('.slider').addClass('slider--touched');
    });
})();