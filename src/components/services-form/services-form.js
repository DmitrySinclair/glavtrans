(function footerCallback() {
    var name = $('#services-name'),
        tel = $('#services-tel'),
        com = $('#services-com'),
        submit = $('#services-form-submit'),
        form = $('#services-form');

    submit.on('click', function handleSubmit(e) {

        var namePlaceholder = name.prop('placeholder'),
            nameResult = validateName(name, namePlaceholder, namePlaceholder);

        var telPlaceholder = tel.prop('placeholder'),
            telResult = validateTel(tel, telPlaceholder, telPlaceholder);

        var comPlaceholder = com.prop('placeholder'),
            comResult = validateName(com, comPlaceholder, comPlaceholder);

        if (telResult && nameResult && comResult) {
            var data = form.serialize() + "&web_form_submit=отправить";
            var formUrl = form.attr('action');
            $.ajax({
                type:'post',
                url:formUrl,
                data:data,
                dataType:'json',
                success:function(result)
                {
                   openLightbox(result.header, result.message);
                }
            });

        }

        e.preventDefault();
    });

    function openLightbox(header, message) {
        $.fancybox.open({
            src: '#success-services-message',
            type: 'inline',
            opts: {
                onComplete: function() {
                    $('.fancybox-container').addClass('success-modal');
                    $('#success-services-name').text(name.val());
                    $('#success-services-header').text(header);
                    $('#success-services-text').text(message);
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