function callbackForm() {
    var form = $('#callback'),
        formContent = $('#callback-form'),
        success = $('#callback-success'),
        successClose = $('#callback-close-success'),
        button = $('#callback-submit'),
        cancel = $('#callback-cancel'),
        name = $('#callback-name'),
        num = $('#callback-num'),
        state = {
            name: {
                empty: true,
                validated: false
            },
            num: {
                empty: true,
                validated: false
            },
            agree: {
                validated: false
            }
        };

    // Apply mask to the num field
    applyMask(num);

    // On typing end
    stopTyping(name, checkName);
    stopTyping(num, checkNum);

    // On focus change
    name.on('focusout', checkName);
    num.on('focusout', checkNum);

    // On agreement change
    $('#agreement').on('click', function() {
        checkAgreement();
        handleButtonsActivity();
    });

    // On form submit
    form.on('submit', function(e) {
        e.preventDefault();

        // Check agreement
        checkAgreement();

        if (state.name.validated && state.num.validated && state.agree.validated) {
            // Ajax request will be here

            // Show success message
            formContent.hide();
            success.show();
        }
    });

    // On success close
    successClose.on('click', function() {
        // Hide success message
        formContent.show();
        success.hide();

        // Clear fields
        clearFields();
    });

    // Show tooltip
    button.on('mouseenter', function() {
        $('.callback__tooltip').removeClass('callback__tooltip--show');
        // Show first empty field next to the submit button
        if (state.name.empty) {
            $('#callback-tooltip-name').addClass('callback__tooltip--show');
        } else if (state.num.empty) {
            $('#callback-tooltip-num').addClass('callback__tooltip--show');
        } else if (!state.agree.validated) {
            $('#callback-tooltip-agree').addClass('callback__tooltip--show');
        }
    });

    // Clear fields
    $('#callback-cancel').on('click', clearFields);

    function clearFields() {
        name.add(num).val("").parent().removeClass('error').removeClass('success');
        state.name.empty = state.num.empty = true;
        state.name.validated = state.num.validated = false;
        handleButtonsActivity();
    }

    function applyMask(field) {
        field.inputmask({
            mask: "+7 (999) 999 99",
            androidHack: "rtfm"
        });
    }

    function stopTyping(input, callback) {
        var timer,
            interval = 500;

        input.on('keydown', function(){
            clearTimeout(timer);
            if (input.val()) {
                timer = setTimeout(done, interval);
            }
        });

        function done() {
            callback();
        }
    }

    function checkName() {
        // Mark field as touched
        state.name.empty = !name.val().trim().length;

        // Validate field
        var result = validateName(name);

        // Set validation status 
        state.name.validated = result;

        // Update button state
        handleButtonsActivity();

        function validateName( _input ) {
            var reg_name = /^[_a-zA-Z0-9а-яА-ЯёЁ ]+$/i;

            var result = reg_name.test( _input.val().trim() );

            if ( result ) {				
                _input.parent().removeClass( 'error' ).addClass('success');
            } else {
                _input
                    .focus(function() {
                        $(this)
                        .off('focus')
                        .parent()
                        .removeClass('error');
                    })
                    .parent().addClass( 'error' ).removeClass('success');
            } 

            return result;
        }

        return result;
    }

    function checkNum() {
        var result = num.inputmask("isComplete");

        // Mark field as touched
        state.num.empty = !num.inputmask('unmaskedvalue').trim().length;
        
        // Validate field field
        if (result) {
            num.parent().removeClass('error').addClass('success');
        } else {
            num.focus(function() {
                $(this)
                    .off('focus')
                    .parent()
                    .removeClass('error');
            })
            .parent().addClass('error').removeClass('success');
        }

        // Set validation status
        state.num.validated = result;

        // Update button state
        handleButtonsActivity();

        return result;
    }

    function handleButtonsActivity() {
        // Submit button
        (state.name.validated && state.num.validated && state.agree.validated)? 
            button.removeClass('btn--disabled'):
            button.addClass('btn--disabled');

        // Cancel button
        (!state.name.empty || !state.num.empty)?
            cancel.parent().removeClass('btn__wrap--hidden'):
            cancel.parent().addClass('btn__wrap--hidden');
    }

    function checkAgreement() {
        var checked = $('#agreement:checked').length;
        
        checked? 
            state.agree.validated = true: 
            state.agree.validated = false;
    }
}



module.exports = callbackForm;