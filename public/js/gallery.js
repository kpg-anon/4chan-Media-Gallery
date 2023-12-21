(function() {
    'use strict';

    const prefix = 'ig-';
    let galleryContainer, galleryImage, counter, thumbnailBar;
    let currentIndex = 0;
    let images = [];
    const thumbnailVisibleCount = 7;
    let autoScrollInterval;
    let hoveredMediaLink = null;

    function autoScrollThumbnailBar(direction, step) {
        if (autoScrollInterval) clearInterval(autoScrollInterval);

        autoScrollInterval = setInterval(() => {
            thumbnailBar.scrollLeft += step * direction;
        }, 20);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function initGallery() {
        addEventListeners();
        setupAutoScrollEvents();
        document.querySelectorAll('.media-item a').forEach(anchor => {
            anchor.addEventListener('mouseover', function() {
            hoveredMediaLink = this.href;
        });
        anchor.addEventListener('mouseout', function() {
            hoveredMediaLink = null;
        });
    });
    }

    function createGallery() {
        if (galleryContainer) {
            galleryContainer.remove();
            galleryContainer = null;
            return;
        }

        galleryContainer = document.createElement('div');
        galleryContainer.id = prefix + 'galleryContainer';

        galleryImage = document.createElement('img');
        galleryImage.id = prefix + 'galleryImage';

        counter = document.createElement('div');
        counter.id = prefix + 'imageCounter';
        counter.textContent = `${currentIndex + 1}/${images.length}`;

        const closeButton = createButton('images/close_dark.png', closeGallery, prefix + 'close-button');
        const downloadButton = createButton('images/download_button.png', downloadCurrentMedia, prefix + 'download-button');
        const nextButton = createButton('images/navigate_right_dark.png', () => navigateGallery(1), prefix + 'nav-button', prefix + 'next-button');
        const prevButton = createButton('images/navigate_left_dark.png', () => navigateGallery(-1), prefix + 'nav-button', prefix + 'prev-button');

        thumbnailBar = document.createElement('div');
        thumbnailBar.id = prefix + 'thumbnailBar';

        images.forEach((media, index) => {
            const thumb = document.createElement('img');
            thumb.src = media.thumbnail;
            thumb.classList.add(prefix + 'thumbnail');
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateGallery();
            });
            thumbnailBar.appendChild(thumb);
        });

        galleryContainer.append(galleryImage, counter, closeButton, downloadButton, nextButton, prevButton, thumbnailBar);
        document.body.appendChild(galleryContainer);
        updateGallery();
    }

    function createButton(content, onClick, ...classes) {
            const button = document.createElement('button');
            button.addEventListener('click', onClick);
            button.classList.add(...classes);

            const img = document.createElement('img');
            img.src = content.startsWith('images/') ? content : 'images/download-button-fixed.png';
            img.classList.add('button-icon');
            button.appendChild(img);
            return button;
    }

    function navigateGallery(direction) {
        const totalImages = images.length;
        currentIndex = (currentIndex + direction + totalImages) % totalImages;
        updateGallery();
    }

    function closeGallery() {
        galleryContainer.remove();
        galleryContainer = null;
    }

    function updateGallery() {
        if (images.length > 0 && galleryContainer) {
            const currentMedia = images[currentIndex];

            if (galleryContainer.contains(galleryImage)) {
                galleryContainer.removeChild(galleryImage);
            }

            if (currentMedia.isVideo) {
                galleryImage = document.createElement('video');
                galleryImage.controls = true;
                galleryImage.autoplay = true;
                galleryImage.loop = true;
                galleryImage.muted = true;
            } else {
                galleryImage = document.createElement('img');
            }
            galleryImage.src = currentMedia.src;
            galleryImage.id = prefix + 'galleryImage';
            galleryContainer.insertBefore(galleryImage, counter);

            counter.textContent = `${currentIndex + 1}/${images.length}`;
            updateThumbnails();
        }
    }

    function updateThumbnails() {
        const thumbnails = Array.from(thumbnailBar.children);
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle(prefix + 'active', index === currentIndex);
        });

        const selectedThumbnail = thumbnails[currentIndex];
        thumbnailBar.scrollLeft = selectedThumbnail.offsetLeft - thumbnailBar.offsetWidth / 2 + selectedThumbnail.offsetWidth / 2;
    }

    function findImages() {
        images = [];
        const mediaItems = document.querySelectorAll('.media-item');
        mediaItems.forEach(item => {
            const anchor = item.querySelector('a');
            const img = item.querySelector('img');
            const title = item.querySelector('p').title;
            const isVideo = anchor.href.endsWith('.mp4') || anchor.href.endsWith('.webm');

            images.push({
                thumbnail: img.src,
                src: anchor.href,
                title: decodeURIComponent(title),
                isVideo: isVideo
            });
        });
    }

    function downloadCurrentMedia() {
        const currentMedia = images[currentIndex];
        const link = document.createElement('a');
        link.href = currentMedia.src;
        link.download = currentMedia.title;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function getFilenameFromUrl(url) {
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const proxiedUrl = queryParams.get('url');

    if (proxiedUrl) {
        const decodedUrl = decodeURIComponent(proxiedUrl);
        const urlParts = decodedUrl.split('/');
        return urlParts[urlParts.length - 1];
    }

    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
    }

    function addEventListeners() {
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'g') {
            if (!images.length) findImages();
            createGallery();
        }

        if (galleryContainer) {
            switch (e.key) {
                case 'ArrowRight':
                    navigateGallery(1);
                    break;
                case 'ArrowLeft':
                    navigateGallery(-1);
                    break;
                case 'Escape':
                    closeGallery();
                    break;
                case 's':
                case 'S':
                    downloadCurrentMedia();
                    e.preventDefault();
                    break;
            }
        }
    });

    document.querySelectorAll('.media-item a').forEach(anchor => {
        anchor.addEventListener('mouseover', function() {
            hoveredMediaLink = this.href;
        });
        anchor.addEventListener('mouseout', function() {
            hoveredMediaLink = null;
        });
    });

    document.addEventListener('keydown', function(e) {
        if ((e.key === 's' || e.key === 'S') && hoveredMediaLink && !galleryContainer) {
            const link = document.createElement('a');
            link.href = hoveredMediaLink;
            link.download = getFilenameFromUrl(hoveredMediaLink);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            e.preventDefault();
            }
        });
    }

    function setupAutoScrollEvents() {
        const leftScrollArea = document.createElement('div');
        const rightScrollArea = document.createElement('div');
        
        leftScrollArea.style.cssText = 'position: fixed; bottom: 0; left: 0; width: 50px; height: 80px; z-index: 100;';
        rightScrollArea.style.cssText = 'position: fixed; bottom: 0; right: 0; width: 50px; height: 80px; z-index: 100;';
        
        leftScrollArea.addEventListener('mouseover', () => autoScrollThumbnailBar(-1, 10));
        leftScrollArea.addEventListener('mouseout', stopAutoScroll);
        rightScrollArea.addEventListener('mouseover', () => autoScrollThumbnailBar(1, 10));
        rightScrollArea.addEventListener('mouseout', stopAutoScroll);
        
        document.body.appendChild(leftScrollArea);
        document.body.appendChild(rightScrollArea);
    }

    initGallery();
})();
