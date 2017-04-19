(function handleButton() {
    var button = document.querySelectorAll('.button:not(.button--form)');
    if (button.length) {
        for (var i = 0; i < button.length; i++) {
            button[i].addEventListener('click', function() {
                this.classList.add('button--click');
            }, false);
        }
    }
})();