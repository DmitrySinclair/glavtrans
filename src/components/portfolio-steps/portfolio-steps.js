(function stepsModal() {
    $('.portfolio-steps__content').hide();

    $('.portfolio-steps__step').fancybox({
        baseClass: 'portfolio-modal',
        focus: false,
        hash: true
    });

    $('.content-close').on('click', function() {
        $.fancybox.close();
    });
})();