function handleMenu() {
    $('.main-buttons__menu, .hidden-menu__close').on('click', toggleMenu)
        .add('.hidden-menu').on('click', preventClose);

    function toggleMenu(e) {
        e.preventDefault();
        $('.hidden-menu').toggleClass('hidden-menu--open');
        $('.wrapper').toggleClass('wrapper--overlay');
        $('html').toggleClass('hide-scroll');
        $('.main-tel').toggleClass('main-tel--hidden');
        $('.main-logo').toggleClass('main-logo--white');
        $(document).on('keyup', handleEscMenu);

        setTimeout(function() {
            $(document).on('click', closeMenu);
        }, 250);
    }

    function handleEscMenu(e) {
        if (e.keyCode == 27) {
            closeMenu();
            $(document).off('keyup', handleEscMenu);
        }
    }

    function closeMenu() {
        $('.hidden-menu').removeClass('hidden-menu--open');
        $('.wrapper').removeClass('wrapper--overlay');
        $('html').removeClass('hide-scroll');
        $('.main-tel').removeClass('main-tel--hidden');
        $('.main-logo').removeClass('main-logo--white');
        $(document).off('click', closeMenu);
    }

    function preventClose(e) {
        e.stopPropagation();
    }
}

module.exports = handleMenu;
