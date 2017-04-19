(function likeButton() {
    var like = document.querySelector('#like-button');
    if (like) {
        like.addEventListener('click', function handleLike() {
            this.classList.toggle('news-item__like-plus--liked');
        });
    }
})();