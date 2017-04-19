var passInputs;

(function($){
    $.fn.setCursorToTextEnd = function() {
        var $initialVal = this.val();
        this.val($initialVal);
    };
})(jQuery);

(function toggleEdit() {
    $('.account-prime-info__button').on('click', function(e) {
        e.preventDefault();
        // Disable all fields
        disableAllInputs();
        // Enable current one and set caret to the end
        $(this).prev('.account-prime-info__input').removeAttr('disabled').focus().setCursorToTextEnd();
    });

    function disableAllInputs() {
        $('.account-prime-info:not(.account-prime-info--pass) .account-prime-info__input').attr('disabled', true)
    }
})();

(function imageUpload() {
    var $form = $('.drop-photo');

    var droppedFiles = false;

    $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    })
    .on('dragover dragenter', function() {
        $form.addClass('is-dragover');
    })
    .on('dragleave dragend drop', function() {
        $form.removeClass('is-dragover');
    })
    .on('drop', handleFileAttach);

    $('.drop-photo__file').on('change', handleFileAttach);

    function handleFileAttach(e) {
        if (e.originalEvent.dataTransfer) {
            droppedFiles = e.originalEvent.dataTransfer.files;
        } else {
            droppedFiles = $(this).get(0).files;
        }

        $('.account-photo__selected').removeClass('account-photo__selected--hidden');

        var name = droppedFiles[0].name,
            size = droppedFiles[0].size + " КБ";
        $('.account-photo__selected-name').text(name);
        $('.account-photo__selected-size').text(size);

        $('.account-photo__selected-pic').addClass('account-photo__selected-pic--hidden');

        // Clear select field
        clearPhotoSelect();
    }

    $('.account-photo__selected-delete').on('click', function(e) {
        e.preventDefault();
        clearPhotoAttach();
    });
})();

(function imageSelect() {
    $('.account-gallery__faces li').on('click', clearPhotoAttach);
    $('#clear-gallery').on('click', function(e) {
        e.preventDefault();
        clearPhotoSelect();
    })
})();

(function toggleGallery() {
    $('#toggle-gallery').on('click', function(e) {
        e.preventDefault();

        var wrapper = $('.account-gallery__content'),
            open = wrapper.hasClass('account-gallery__content--open');

        if (!open) {
            $(this).text('закрыть');
            wrapper.slideDown();
        } else {
            $(this).text('галерея');
            wrapper.slideUp();
        }

        wrapper.toggleClass('account-gallery__content--open');
    });
})();

function clearPhotoAttach() {
    // Clear file
    var input = $('.drop-photo__file');
    input.replaceWith(input.val('').clone(true));
    $('.account-photo__selected').addClass('account-photo__selected--hidden');
}

function clearPhotoSelect() {
    $('.account-gallery__faces input').each(function(index, item) {
        item.checked = false;
    });
}

(function validatePassword() {
    passInputs = {
        passOld: {
            selector: '#pass-old',
            state: false,
            validate: function() {
                var result = $(this.selector).val().trim().length >= 5;
                result ? this.state = true : this.state = false;
                showState.apply(this);
            }
        },
        passNew: {
            selector: '#pass-new',
            state: false,
            validate: function() {
                var result = $(this.selector).val().trim().length >= 5;
                result ? this.state = true : this.state = false;
                showState.apply(this);
            }
        },
        passConfirm: {
            selector: '#pass-confirm',
            state: false,
            validate: function() {
                var result = $(this.selector).val() === $(passInputs.passNew.selector).val()
                    && $(this.selector).val().length >= 5;
                result ? this.state = true : this.state = false;
                showState.apply(this);
            }
        }
    };

    function showState() {
        var field = $(this.selector);

        if (this.state) {
            field.removeClass('error').addClass('success');
        } else {
            field.removeClass('success').addClass('error');
        }

        field.on('focus click keyup', function() {
            field.removeClass('error').removeClass('success');
        });
    }

    for (var key in passInputs) {
        var input = passInputs[key];

        (function(input) {
            stopTyping(input.selector, function() {
                input.validate();
            });

            $(input.selector).on('focusout', function() {
                if ($(this).val().length) input.validate();
            });
        })(input);
    }

    function stopTyping(input, callback) {
        var timer,
            interval = 500;

        $(input).keyup(function(){
            clearTimeout(timer);
            if ($(input).val()) {
                timer = setTimeout(callback, interval);
            }
        });
    }
})();

(function handleFormSubmit() {
    // On form submit
    $('#account-info').on('submit', function(e) {
        // Check info fields
        var info = true;
        $('.account-prime-info:not(.account-prime-info--pass) input').each(function(index, element) {
            var result = !!element.value.trim().length;
            info = info && result;

            if (!result) {
                $(element).on('click focus keyup', function() {
                    $(this).parent().removeClass('error');
                }).parent().addClass('error');
            }
        });

        // Check pass fields
        var pass = true;
        $('.account-prime-info--pass input').each(function(index, element) {
            var result = !element.value.trim().length;
            pass = pass && result;
        });

        // If fields is changed
        if (!pass) {
            pass = true;
            // Check validation
            for (var key in passInputs) {
                var input = passInputs[key];
                (function(input) {
                    input.validate();
                    pass = pass && input.state;
                })(input);
            }
        }


        // If info and pass is not ok
        if (!info || !pass) {
            // Prevent form submission
            e.preventDefault();
        }

        // Scroll to the most top error
        if (!info) {
            scrollToElement('.account__content');
        }

        function scrollToElement(element) {
            $('html, body').animate({
                scrollTop: $(element).offset().top
            }, 500);
        }
    });
})();



(function handleContactsSubmit() {
    $('#account-contacts').on('submit', function(e) {
        var phone = validateTel('#contacts-name'),
            email = validateEmail('#contacts-email');

        if (!phone || !email) {
            e.preventDefault();
        }
    });



})();

(function subscriptionSelect() {
    var cachedValue = $('#subscription-select').val(),
        cachedState = $('.account-subscription__selected').hasClass('hidden'),
        value,
        state = cachedState,
        email = false;

    $('#subscription-dropdown li').on('click', function() {
        value = $(this).text();
        $('#subscription-select').val(value);
        compareCache();
    });

    $('#subscription-del').on('click', function(e) {
        e.preventDefault();
        $('.account-subscription__selected').addClass('hidden');

        // Uncheck indicator so subscription cancel can be visible on form submit
        $('#subscription-status').attr('checked', false);

        state = true;
        compareCache();
    });

    $('#change-subscription-email').on('click', function() {
        email = true;
        compareCache();
    });

    function compareCache() {
        var button = $('#subscription-submit'),
            visibleClass = 'contacts__submit--visible';

        if (value !== cachedValue || state !== cachedState || email) {
            button.addClass(visibleClass);
        } else {
            button.removeClass(visibleClass);
        }
    }

    $('#account-subscription').on('submit', function(e) {
       if (!validateEmail('#subscription-email')) {
           e.preventDefault();
       }
    });
})();

function validateTel(_input) {
    var reg_tel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/i;

    var result = reg_tel.test( $(_input).val() );

    if ( result ) $(_input).parent().removeClass('error').addClass('success')
    else $(_input)
        .focus(function() {
            $(this)
                .off('focus')
                .parent()
                .removeClass('error');
        })
        .parent().addClass( 'error' ).removeClass('success');

    return result;
}

function validateEmail(_input) {
    var reg_email = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

    var result = reg_email.test( $(_input).val() );

    if ( result ) $(_input).parent().removeClass( 'error' ).addClass('success')
    else $(_input)
        .focus(function() {
            $(this)
                .off('focus')
                .parent()
                .removeClass('error');
        })
        .parent().addClass( 'error' ).removeClass('success');

    return result;
}