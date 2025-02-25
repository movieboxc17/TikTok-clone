class VideoManager {
    constructor() {
        this.currentVideo = null;
        this.videos = [];
        this.observer = null;
        this.initializeObserver();
    }

    initializeObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        video.play();
                        this.currentVideo = video;
                    } else {
                        entry.target.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );
    }

    createVideoElement(videoData) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.innerHTML = `
            <video src="${videoData.url}" loop></video>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
            <div class="volume-control">
                <input type="range" class="volume-slider" min="0" max="100" value="100">
            </div>
            ${this.createInteractionButtons(videoData)}
            ${this.createVideoInfo(videoData)}
        `;

        const video = videoContainer.querySelector('video');
        this.setupVideoListeners(video);
        this.observer.observe(video);
        return videoContainer;
    }

    createInteractionButtons(videoData) {
        return `
            <div class="interaction-buttons">
                <div class="profile-pic"></div>
                <button class="interaction-button like" data-count="${videoData.likes}">
                    <i class="fas fa-heart interaction-icon"></i>
                    <span class="count">${this.formatNumber(videoData.likes)}</span>
                </button>
                <!-- Add other interaction buttons -->
            </div>
        `;
    }

    createVideoInfo(videoData) {
        return `
            <div class="video-info">
                <h3 class="username">${videoData.username} 
                    ${videoData.isVerified ? '<i class="fas fa-check-circle verified"></i>' : ''}
                </h3>
                <p class="description">${videoData.description}</p>
                <div class="sound-info">
                    <i class="fas fa-music"></i>
                    ${videoData.sound}
                </div>
            </div>
        `;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    setupVideoListeners(video) {
        let lastTap = 0;
        
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            video.closest('.video-container').querySelector('.progress').style.width = `${progress}%`;
        });

        video.addEventListener('touchstart', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 500 && tapLength > 0) {
                this.handleDoubleTap(video, e);
            }
            lastTap = currentTime;
        });
    }

    handleDoubleTap(video, event) {
        const likeButton = video.closest('.video-container').querySelector('.like');
        const count = likeButton.querySelector('.count');
        const currentCount = parseInt(likeButton.dataset.count) + 1;
        likeButton.dataset.count = currentCount;
        count.textContent = this.formatNumber(currentCount);
        
        // Add heart animation at tap position
        this.createHeartAnimation(event);
    }

    createHeartAnimation(event) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart heart-animation';
        heart.style.left = `${event.touches[0].clientX}px`;
        heart.style.top = `${event.touches[0].clientY}px`;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}
