(function toTop() {
    var footerHeight = document.querySelector('footer').offsetHeight;
    scrollFromBottom.start(footerHeight, '#top-arrow', 'to-top__fixable--fixed');
    scrollFromTop.start(400, '#top-arrow', 'to-top__fixable--visible');

    var button = $('.to-top__top');
    button.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 750, 'swing');
    });
})();