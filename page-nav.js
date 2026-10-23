// Builds the sticky "On this page" bar on artifact pages from each section's h2,
// and highlights the section currently in view.
(function () {
    function slugify(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    }

    // Short label for the nav: use data-nav when set, otherwise the heading text minus emoji
    function labelFor(section, heading) {
        if (section.hasAttribute('data-nav')) {
            return section.getAttribute('data-nav');
        }
        return heading.textContent.replace(/[^\w\s&'()/:.,-]/g, '').trim();
    }

    function init() {
        var nav = document.querySelector('.page-nav');
        if (!nav) {
            return;
        }

        var sections = Array.prototype.slice.call(
            document.querySelectorAll('.analysis-section, .professional-reflection')
        ).filter(function (section) {
            return section.querySelector('h2');
        });

        var links = sections.map(function (section) {
            var heading = section.querySelector('h2');
            var label = labelFor(section, heading);
            if (!section.id) {
                section.id = slugify(label);
            }

            var link = document.createElement('a');
            link.href = '#' + section.id;
            link.textContent = label;
            nav.appendChild(link);
            return link;
        });

        if (!('IntersectionObserver' in window)) {
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                var index = sections.indexOf(entry.target);
                links.forEach(function (link, i) {
                    link.classList.toggle('active', i === index);
                });
                // Keep the active pill visible when the bar scrolls sideways on phones
                var active = links[index];
                if (active) {
                    nav.scrollTo({ left: active.offsetLeft - 12, behavior: 'smooth' });
                }
            });
        }, { rootMargin: '-30% 0px -60% 0px' });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
