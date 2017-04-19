(function toggledBlock() {
    window.onload = function() {
        if ($('.services').length) {

            $('.services__row').append(
                '<div class="services__row-left"></div>' +
                '<div class="services__row-right"></div>'
            );

            var count;
            $('.services__item').each(function() {
                var _this = $(this);

                if (!count) {
                    count = true;
                    _this.parents('.services__row').find('.services__row-left').append(_this);
                } else {
                    count = false;
                    _this.parents('.services__row').find('.services__row-right').append(_this);
                }

                var text = _this.find('.services__item-text');
                text.css("height", text.outerHeight(true)).hide();
            });
        }
    }

    var animated = false;

    $('.services__row .services__item-ind').on('click', function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        var hidden = $(this).parent().next(),
            item = $(this).parent().parent(),
            opClass = 'services__item-text--opacity',
            parendClass = 'services__item--open',
            hasClass = hidden.hasClass(opClass);


        if (!animated) {
            animated = true;

            $(this).toggleClass('services__item-label--active');

            hidden.slideToggle(250, function() {
                animated = false;
            });

            if (!hasClass) {
                item.addClass(parendClass);
                setTimeout(function() {
                    hidden.addClass(opClass);
                    hidden.css('height', '');
                }, 250);
            } else {
                item.removeClass(parendClass);
                hidden.removeClass(opClass);

            }
        }
    });
})();