(function toggleMobileMenu() {
    $('.mobile-menu__item-link--more').on('click', function(e) {
        e.preventDefault();
        $(document).off('click', closeMobileMenu);
        $('.mobile-menu__more').toggleClass('mobile-menu__more--visible');
        $('.wrapper').toggleClass('wrapper--overlay');
        $('html').toggleClass('hide-scroll');

        setTimeout(function() {
            $(document).on('click', closeMobileMenu);
        }, 250);
    });

    function closeMobileMenu() {
        $('.mobile-menu__more').removeClass('mobile-menu__more--visible');
        $('.wrapper').removeClass('wrapper--overlay');
        $('html').removeClass('hide-scroll');
        $(document).off('click', closeMobileMenu);
    }
})();
