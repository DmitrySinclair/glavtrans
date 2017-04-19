(function socialBlockToggle() {
    var button = $('.social-block__button'),
        content = $('.social-block__content');

    content.add(button).on('click', function(e) {
        e.stopPropagation();
    });

    button.on('click', function handleClick(e) {
        e.preventDefault();
        button.toggleClass('social-block__button--open');
        content.toggleClass('social-block__content--open');
        $(document).on('keyup', handleEsc);
    });

    $(document).on('click', closeBlock);

    function handleEsc(e) {
        if (e.keyCode == 27) {
            closeBlock();
            $(document).off('keyup', handleEsc);
        }
    }

    function closeBlock() {
        button.removeClass('social-block__button--open');
        content.removeClass('social-block__content--open');
    }
})();