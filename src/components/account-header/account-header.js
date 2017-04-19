(function handleSearch() {
    var button = $('.main-buttons__account'),
        content = $('.account-header');

    $(document).on('click', close);

    $('.account-header-wrap').on('click', function (e) {
        e.stopPropagation();
    });

    button.on('click', function handleClick(e) {
        e.preventDefault();
        button.addClass('main-buttons__account--open');
        content.addClass('account-header--open');
        $(document).on('keyup', escClose);

        content.on('click', close);
    });


    function escClose(e) {
        if (e.keyCode == 27) {
            close();
            $(document).off('keyup', escClose);
        }
    }

    function close() {
        button.removeClass('main-buttons__account--open');
        content.removeClass('account-header--open');
    }
})();