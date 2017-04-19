(function likeButton() {
    var like = document.querySelector('#blog-like-button');
    if (like) {
        like.addEventListener('click', function handleLike() {
            this.classList.toggle('blog-item__like-plus--liked');
        });
    }
})();

(function asideMoreButton() {
    var button = document.querySelectorAll('.blog-aside__img');
    if (button.length) {
        for (var i = 0; i < button.length; i++) {
            button[i].addEventListener('click', function() {
                this.classList.add('blog-aside__img--click');
            }, false);
        }
    }
})();