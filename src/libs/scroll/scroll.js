var scrollFromTop = (function() {
    var scrollTopState;

    function catchScroll( _amount, _element, _class ) {
        var _html = document.documentElement,
            _window = window;

        checkScrollPos();

        _window.addEventListener('scroll', checkScrollPos);

        function checkScrollPos() {
            var scrolled = _window.pageYOffset || _html.scrollTop;

            if ( scrolled >= _amount ) {
                scrollTopState = true;
            } else {
                scrollTopState = false;
            }

            addClasses();
        }

        function addClasses() {
            if ( scrollTopState === true ) {
                $(_element).addClass( _class );
            } else {
                $(_element).removeClass( _class );
            }
        }
    }

    return {
        start: catchScroll
    };
})();

var scrollFromBottom = (function() {
    var scrollState;

    function catchScroll( _amount, _element, _class ) {
        var _body = document.body,
            _html = document.documentElement,
            _window = window;

        checkScrollPos();

        _window.addEventListener('scroll', checkScrollPos);

        function checkScrollPos() {
            var scrolled = _window.pageYOffset || _html.scrollTop;

            var documentHeight = Math.max( _body.scrollHeight, _body.offsetHeight,
                _html.clientHeight, _html.scrollHeight, _html.offsetHeight );
            var windowHeight = _window.innerHeight;

            var scrolledBottom = documentHeight - windowHeight - scrolled;

            if ( scrolledBottom >= _amount ) {
                scrollState = true;
            } else {
                scrollState = false;
            }

            addClasses();
        }

        function addClasses() {
            if ( scrollState === true ) {
                $(_element).addClass( _class );
            } else {
                $(_element).removeClass( _class );
            }
        }
    }

    return {
        start: catchScroll
    };
})();