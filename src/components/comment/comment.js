(function newsList() {
    $('.comment__load').on('click', function handleLoadClick() {
        loadButton();
        loadNews();
    });

    function loadButton() {
        var load = $('.comment__load');
        load.addClass('comment__load--click');

        setTimeout(function removeClass() {
            load.removeClass('comment__load--click');
        }, 300);
    }

    function loadNews() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/dist/html/comment-ajax.html', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = xhr.responseText;
                    var news = $('.comment');
                    var existedElements = news.find('.comment__item');
                    var expandHeight = existedElements.outerHeight(true);

                    // Hide preloaded elements
                    news.addClass('comment--hide-preloaded');
                    existedElements.addClass('comment__item--existed');

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
                            news.removeClass('comment--hide-preloaded');
                            existedElements.removeClass('comment__item--existed');
                        });
                }
            }
        };

        xhr.send();
    };
})();