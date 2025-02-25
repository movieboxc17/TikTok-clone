document.addEventListener('DOMContentLoaded', () => {
    const videoManager = new VideoManager();
    const interactions = new Interactions();
    
    // Initialize video feed
    const videoFeed = document.getElementById('videoFeed');
    CONFIG.videos.forEach(videoData => {
        videoFeed.appendChild(videoManager.createVideoElement(videoData));
    });

    // Handle tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Implement feed switching logic here
        });
    });

    // Handle navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // Implement page navigation logic here
        });
    });
});
