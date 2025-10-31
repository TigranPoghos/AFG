document.addEventListener('DOMContentLoaded', function() {
    const allVideoContainers = document.querySelectorAll('.videoJS');

    allVideoContainers.forEach(function(videoContainer) {
        const video = videoContainer.querySelector('video');
        const playButton = videoContainer.querySelector('.videoButtonJS');

        const closeButton = document.createElement('button');
        closeButton.className = 'info__video-close';
        closeButton.innerHTML = '×';
        closeButton.setAttribute('aria-label', 'Закрыть видео');
        videoContainer.appendChild(closeButton);

        video.removeAttribute('controls');

        function openFullscreen() {
            videoContainer.classList.add('fullscreen');
            video.setAttribute('controls', 'true');
            video.play();
            
            document.body.style.overflow = 'hidden';
        }

        function closeFullscreen() {
            videoContainer.classList.remove('fullscreen');
            video.removeAttribute('controls');
            video.pause();

            document.body.style.overflow = '';
        }

        playButton.addEventListener('click', function(e) {
            e.stopPropagation();
            openFullscreen();
        });

        videoContainer.addEventListener('click', function() {
            if (!videoContainer.classList.contains('fullscreen')) {
                openFullscreen();
            }
        });

        closeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            closeFullscreen();
        });

        videoContainer.addEventListener('click', function(e) {
            if (videoContainer.classList.contains('fullscreen') && e.target === videoContainer) {
                closeFullscreen();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoContainer.classList.contains('fullscreen')) {
                closeFullscreen();
            }
        });
    });
});