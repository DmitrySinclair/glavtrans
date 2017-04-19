(function validateSearch() {
    $('#search-submit').on('click', function(e) {
        var value = $('#search-field').val().trim();

        if (value.length > 0) {
            console.log('success');
        } else {
            e.preventDefault();
        }
    });
})();
