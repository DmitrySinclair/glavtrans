(function footerCallback() {
    var step1 = $('#port-step-1'),
        step2 = $('#port-step-2'),
        name = step1.find('input'),
        tel = step2.find('input'),
        submit = $('#portfolio-form-submit'),
        step = 0;

    submit.on('click', function handleSubmit(e) {

        var namePlaceholder = name.prop('placeholder'),
            nameResult = validateName(name, namePlaceholder, namePlaceholder);

        var telPlaceholder = tel.prop('placeholder'),
            telResult = validateTel(tel, telPlaceholder, telPlaceholder);

        if (telResult && nameResult) {
            openLightbox();
        }

        e.preventDefault();
    });

    function openLightbox() {
        $.fancybox.open({
            src: '#success-portfolio-message',
            type: 'inline',
            opts: {
                onComplete: function() {
                    $('.fancybox-container').addClass('success-modal');
                    $('#success-portfolio-name').text($('#port-step-1 input').val());
                }
            }
        });
    }

    function validateName( _input, _placeholder, _error ) {
        var reg_name = /^[_a-zA-Z0-9а-яА-ЯёЁ ]+$/i;

        var result = reg_name.test( $( _input ).val() );

        if ( result ) $( _input ).removeClass( 'error' ).addClass('success')
        else $( _input )
            .attr('placeholder', _error || 'заполните поле')
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
            .attr('placeholder', _error || 'заполните поле')
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