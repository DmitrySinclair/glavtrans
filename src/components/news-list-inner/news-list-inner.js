(function newsList() {
    detailButton();

    $('.main-news-inner__load').on('click', function handleLoadClick() {
        loadButton();
        loadNews();
    });

    function loadButton() {
        var load = $('.main-news-inner__load');
        load.addClass('main-news-inner__load--click');

        setTimeout(function removeClass() {
            load.removeClass('main-news-inner__load--click');
        }, 300);
    }

    function loadNews() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/dist/html/more-news-inner.html', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = xhr.responseText;
                    var news = $('.news-list-inner');
                    var existedElements = news.find('.news-list-inner__item');
                    var expandHeight = existedElements.outerHeight(true);

                    // Hide preloaded elements
                    news.addClass('news-list-inner--hide-preloaded');
                    existedElements.addClass('news-list-inner__item--existed');

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
                        news.removeClass('news-list-inner--hide-preloaded');
                        existedElements.removeClass('news-list-inner__item--existed');

                        // Update handlers
                        detailButton();
                    });
                }
            }
        };

        xhr.send();
    };


    function detailButton() {
        var button = document.querySelectorAll('.news-list-inner__img');
        if (button.length) {
            for (var i = 0; i < button.length; i++) {
                button[i].addEventListener('click', function() {
                    this.classList.add('news-list-inner__img--click');
                }, false);
            }
        }
    };
})();

