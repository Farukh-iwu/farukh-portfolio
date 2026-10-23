(function () {
    function captionFor(trigger) {
        if (trigger.hasAttribute('data-caption')) {
            return trigger.getAttribute('data-caption');
        }
        var img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
        return img ? (img.getAttribute('alt') || '') : '';
    }

    function srcFor(trigger) {
        return trigger.tagName === 'IMG' ? trigger.getAttribute('src') : trigger.getAttribute('data-full');
    }

    function init() {
        var triggers = Array.prototype.slice.call(
            document.querySelectorAll('.gallery-card, .evidence-media img')
        );
        if (!triggers.length) {
            return;
        }

        var lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.innerHTML =
            '<button class="lightbox-close" aria-label="Close image">&times;</button>' +
            '<button class="lightbox-nav lightbox-prev" aria-label="Previous image">&lt;</button>' +
            '<button class="lightbox-nav lightbox-next" aria-label="Next image">&gt;</button>' +
            '<div class="lightbox-body">' +
            '<img class="lightbox-image" src="" alt="Full size evidence image">' +
            '<p class="lightbox-caption"></p>' +
            '</div>';
        document.body.appendChild(lightbox);

        var image = lightbox.querySelector('.lightbox-image');
        var caption = lightbox.querySelector('.lightbox-caption');
        var prevBtn = lightbox.querySelector('.lightbox-prev');
        var nextBtn = lightbox.querySelector('.lightbox-next');
        var currentIndex = 0;

        if (triggers.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        function openAt(index) {
            currentIndex = (index + triggers.length) % triggers.length;
            var trigger = triggers[currentIndex];
            image.src = srcFor(trigger);
            caption.textContent = captionFor(trigger);
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
        }

        function close() {
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
            image.src = '';
        }

        triggers.forEach(function (trigger, index) {
            trigger.addEventListener('click', function () {
                openAt(index);
            });
        });

        lightbox.querySelector('.lightbox-close').addEventListener('click', close);
        prevBtn.addEventListener('click', function () { openAt(currentIndex - 1); });
        nextBtn.addEventListener('click', function () { openAt(currentIndex + 1); });

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                close();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('open')) {
                return;
            }
            if (e.key === 'Escape') {
                close();
            } else if (e.key === 'ArrowLeft') {
                openAt(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                openAt(currentIndex + 1);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
