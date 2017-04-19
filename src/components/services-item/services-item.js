(function showAllScroll() {
    var bottomHeight = $('footer').outerHeight(),
        topHeight = $('header').outerHeight(),
        button = $('.services-item__show-all');

    button.removeClass('services-item__show-all--hidden')

    scrollFromBottom.start(bottomHeight, button, "fix-bottom");
    scrollFromTop.start(topHeight, button, "fix-top");
})();

(function showAllColorbox() {
    $('.services-item__all').addClass('services-item__all--hidden');
    $('.services-item__show-all').fancybox({
        focus: false,
        baseClass: 'show-all-modal'
    });
})();