(function footerCallback() {
    var step1 = $('#step-1'),
        step2 = $('#step-2'),
        name = step1.find('input'),
        tel = step2.find('input'),
        submit = $('#callback-submit'),
        step = 0;

    submit.on('click', function handleSubmit(e) {
        if (step == 0) {
            var namePlaceholder = name.prop('placeholder'),
                nameResult = validateName(name, namePlaceholder, namePlaceholder);

            if (nameResult) {
                setTimeout(function nextStep() {
                    step1.hide();
                    step2.show();
                    step++;
                }, 500);
            }
        } else {
            var telPlaceholder = tel.prop('placeholder'),
                telResult = validateTel(tel, telPlaceholder, telPlaceholder);

            if (telResult) {
                openLightbox();
            }
        }

        e.preventDefault();
    });

    function openLightbox() {
        $.fancybox.open({
            src: '#success-message',
            type: 'inline',
            opts: {
                onComplete: function() {
                    $('.fancybox-container').addClass('success-modal');
                    $('#success-name').text($('#step-1 input').val());
                }
            }
        });
    }

    function validateName( _input, _placeholder, _error ) {
        var reg_name = /^[_a-zA-Z0-9а-яА-ЯёЁ ]+$/i;

        var result = reg_name.test( $( _input ).val() );

        if ( result ) $( _input ).removeClass( 'error' ).addClass('success')
        else $( _input )
            .attr('placeholder', _error || 'Заполните поле')
            .focus(function() {
                $(this)
                    .attr('placeholder', _placeholder || '')
                    .off('focus')
                    .removeClass('error');
            })
            .addClass( 'error' ).removeClass('success');

        return result;
    }

    function validateTel( _input, _placeholder, _error ) {
        var reg_tel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/i;

        var result = reg_tel.test( $( _input ).val() );

        if ( result ) $( _input ).removeClass( 'error' ).addClass('success')
        else $( _input )
            .attr('placeholder', _error || 'Заполните поле')
            .focus(function() {
                $(this)
                    .attr('placeholder', _placeholder || '')
                    .off('focus')
                    .removeClass('error');
            })
            .addClass( 'error' ).removeClass('success');

        return result;
    }
})();