(function newsList() {
    detailButton();

    $('.blog__load').on('click', function handleLoadClick() {
        loadButton();
        loadNews();
    });

    function loadButton() {
        var load = $('.blog__load');
        load.addClass('blog__load--click');

        setTimeout(function removeClass() {
            load.removeClass('blog__load--click');
        }, 300);
    }

    function loadNews() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/dist/html/blog-ajax.html', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = xhr.responseText;
                    var news = $('.blog');
                    var existedElements = news.find('.blog__item');
                    var expandHeight = existedElements.outerHeight(true);

                    // Hide preloaded elements
                    news.addClass('blog--hide-preloaded');
                    existedElements.addClass('blog__item--existed');

                    news.css({
                        'height': news.height(),
                        'overflow': 'hidden'
                    })
                    .append(response)
                    .animate({
                        height: "+=" + expandHeight
                    }, 300, function() {
                        news.css({
                            'height': "",
                            'overflow': ""
                        });

                        // Show preloaded elements
                        news.removeClass('blog--hide-preloaded');
                        existedElements.removeClass('blog__item--existed');

                        // Update handlers
                        detailButton();
                    });
                }
            }
        };

        xhr.send();
    };


    function detailButton() {
        var button = document.querySelectorAll('.blog__img');
        if (button.length) {
            for (var i = 0; i < button.length; i++) {
                button[i].addEventListener('click', function() {
                    this.classList.add('blog__img--click');
                }, false);
            }
        }
    };
})();

