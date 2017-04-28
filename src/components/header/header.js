(function handleMenu() {
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
})();

(function fixedMenu() {
    // Enable fix/hide effects on 200 scroll
    scrollFromTop.start(200, '.top-menu', 'top-menu--fixed');
    scrollFromTop.start(200, '.header', 'header--scrolled');

    // Trigger fix/hide state
    var header = document.querySelector('.header');
    var myElement = document.querySelector(".top-menu");
    var headroom  = new Headroom(myElement, {
        tolerance: 10,
        onPin : function() {
            header.classList.add('header--empty');
        },
        onUnpin : function() {
            header.classList.remove('header--empty');
        },
    });
    headroom.init();
})/*()*/; // Just disable fixed menu here
