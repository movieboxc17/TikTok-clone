class Interactions {
    constructor() {
        this.initializeLikeSystem();
        this.initializeFavoriteSystem();
    }

    initializeLikeSystem() {
        const likeButtons = document.querySelectorAll('.like');
        likeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const isLiked = button.classList.contains('liked');
                const countElement = button.querySelector('.count');
                const currentCount = this.parseCount(countElement.textContent);

                if (isLiked) {
                    button.classList.remove('liked');
                    countElement.textContent = this.formatCount(currentCount - 1);
                    button.querySelector('.interaction-icon').style.color = 'white';
                } else {
                    button.classList.add('liked');
                    countElement.textContent = this.formatCount(currentCount + 1);
                    button.querySelector('.interaction-icon').style.color = '#fe2c55';
                    this.triggerLikeAnimation(button);
                }
            });
        });
    }

    initializeFavoriteSystem() {
        const favoriteButtons = document.querySelectorAll('.bookmark');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const isFavorited = button.classList.contains('favorited');
                const countElement = button.querySelector('.count');
                const currentCount = this.parseCount(countElement.textContent);

                if (isFavorited) {
                    button.classList.remove('favorited');
                    countElement.textContent = this.formatCount(currentCount - 1);
                    button.querySelector('.interaction-icon').style.color = 'white';
                } else {
                    button.classList.add('favorited');
                    countElement.textContent = this.formatCount(currentCount + 1);
                    button.querySelector('.interaction-icon').style.color = '#ffeb3b';
                    this.triggerFavoriteAnimation(button);
                }
            });
        });
    }

    triggerLikeAnimation(button) {
        const heart = document.createElement('div');
        heart.className = 'heart-animation';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        button.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }

    triggerFavoriteAnimation(button) {
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    parseCount(countStr) {
        const num = parseFloat(countStr);
        if (countStr.endsWith('K')) return num * 1000;
        if (countStr.endsWith('M')) return num * 1000000;
        return num;
    }

    formatCount(count) {
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
        return count.toString();
    }
}
