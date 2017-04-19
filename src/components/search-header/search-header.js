(function handleSearch() {
    var button = $('.main-buttons__search'),
        search = $('.header-search');

    $(document).on('click', closeSearch);

    $('.header-search-wrap').on('click', function (e) {
        e.stopPropagation();
    });

    button.on('click', function handleClick(e) {
        e.preventDefault();
        button.addClass('main-buttons__search--open');
        search.addClass('header-search--open');
        $(document).on('keyup', handleEscSearch);

        window.setTimeout(function () {
            $('.header-search__input').get(0).focus();
        }, 350);
    });


    function handleEscSearch(e) {
        if (e.keyCode == 27) {
            closeSearch();
            $(document).off('keyup', handleEscSearch);
        }
    }

    function closeSearch() {
        button.removeClass('main-buttons__search--open');
        search.removeClass('header-search--open');
    }
})();