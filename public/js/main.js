document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const currentUrl = new URL(window.location.href);
    const hasSearchQuery = currentUrl.searchParams.has('search');

    if (!hasSearchQuery) {
        document.getElementById('search-input').focus();
    }

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input');
        const searchTerms = searchInput.value.trim();
        if (searchTerms) {
            window.location.href = `/?search=${encodeURIComponent(searchTerms)}`;
        }
    });

    const backToTopButton = createButton('images/back_to_top.png', scrollToTop, 'back-to-top-button');
    document.body.appendChild(backToTopButton);
    console.log('Back to top button created:', backToTopButton);

    const PercentOfPage = document.documentElement.scrollHeight * 0.10;

    window.onscroll = function() {
        if (document.body.scrollTop > PercentOfPage || document.documentElement.scrollTop > PercentOfPage) {
            backToTopButton.style.opacity = "1";
        } else {
            backToTopButton.style.opacity = "0";
        }
    };

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    function createButton(content, onClick, ...classes) {
        const button = document.createElement('button');
        button.addEventListener('click', onClick);
        button.classList.add(...classes);

        const img = document.createElement('img');
        img.src = content;
        img.classList.add('button-icon');
        button.appendChild(img);

        return button;
    }

    const preview = document.createElement('div');
    preview.id = 'preview';
    document.body.appendChild(preview);

    document.querySelectorAll('.media-item a').forEach(anchor => {
        let hoverTimeout;
        anchor.addEventListener('mouseover', function() {
            hoverTimeout = setTimeout(() => {
                const href = this.getAttribute('href');
                const isVideo = href.endsWith('.webm') || href.endsWith('.mp4');

                preview.innerHTML = '';
                const media = isVideo ? document.createElement('video') : document.createElement('img');
                media.src = href;
                if (isVideo) {
                    media.autoplay = true;
                    media.loop = true;
                    media.muted = true;
                }
                preview.appendChild(media);
                preview.style.display = 'flex';
            }, 250);
        });

        anchor.addEventListener('mouseout', function() {
            clearTimeout(hoverTimeout);
            preview.style.display = 'none';
        });
    });

    function decodeHtmlEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    function abbreviateFilename(filename) {
        const maxLength = 52;
        if (filename.length <= maxLength) return filename;
    
        const extensionIndex = filename.lastIndexOf('.');
        const extension = extensionIndex !== -1 ? filename.substring(extensionIndex) : '';
        const basename = extensionIndex !== -1 ? filename.substring(0, extensionIndex) : filename;
    
        if (basename.length <= maxLength - 3) return filename;

        return basename.substring(0, maxLength - 3) + '(...)' + extension;
    }

    document.querySelectorAll('.media-item p').forEach(function(p) {
        const fullFilename = decodeHtmlEntities(p.textContent);
        p.title = fullFilename;

        const abbreviatedFilename = abbreviateFilename(fullFilename);
        p.textContent = abbreviatedFilename;
    });
});
