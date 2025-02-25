class Interactions {
    constructor() {
        this.shareMenu = document.querySelector('.share-menu');
        this.initializeShareMenu();
        this.setupEventListeners();
    }

    initializeShareMenu() {
        const shareGrid = this.shareMenu.querySelector('.share-grid');
        CONFIG.shareOptions.forEach(option => {
            const shareItem = this.createShareItem(option);
            shareGrid.appendChild(shareItem);
        });
    }

    createShareItem(option) {
        const div = document.createElement('div');
        div.className = 'share-item';
        div.innerHTML = `
            <div class="share-icon" style="background-color: ${option.color}">
                <i class="${option.icon}"></i>
            </div>
            <span>${option.name}</span>
        `;
        div.addEventListener('click', () => this.handleShare(option));
        return div;
    }

    handleShare(option) {
        // Implement sharing functionality based on the option
        console.log(`Sharing via ${option.name}`);
        this.closeShareMenu();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.share')) {
                this.openShareMenu();
            } else if (!e.target.closest('.share-menu') || e.target.closest('.close-share')) {
                this.closeShareMenu();
            }
        });
    }

    openShareMenu() {
        this.shareMenu.classList.add('active');
    }

    closeShareMenu() {
        this.shareMenu.classList.remove('active');
    }
}
