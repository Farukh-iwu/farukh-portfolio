(function () {
    var STYLE_ID = 'back-to-top-style';
    var BUTTON_ID = 'back-to-top-btn';

    function ensureStyles() {
        if (document.getElementById(STYLE_ID)) {
            return;
        }

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = [
            '#' + BUTTON_ID + ' {',
            '  position: fixed;',
            '  right: 20px;',
            '  bottom: 24px;',
            '  z-index: 1600;',
            '  border: none;',
            '  border-radius: 999px;',
            '  padding: 11px 16px;',
            '  background: linear-gradient(135deg, #0f766e, #0ea5a6);',
            '  color: #ffffff;',
            '  font: 600 0.95rem/1 "Segoe UI", Tahoma, sans-serif;',
            '  letter-spacing: 0.2px;',
            '  cursor: pointer;',
            '  box-shadow: 0 12px 24px rgba(15, 118, 110, 0.35);',
            '  opacity: 0;',
            '  transform: translateY(12px);',
            '  pointer-events: none;',
            '  transition: opacity 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;',
            '}',
            '#' + BUTTON_ID + '.is-visible {',
            '  opacity: 1;',
            '  transform: translateY(0);',
            '  pointer-events: auto;',
            '}',
            '#' + BUTTON_ID + ':hover {',
            '  box-shadow: 0 16px 28px rgba(14, 165, 166, 0.42);',
            '}',
            '#' + BUTTON_ID + ':focus-visible {',
            '  outline: 2px solid #99f6e4;',
            '  outline-offset: 2px;',
            '}',
            '@media (max-width: 640px) {',
            '  #' + BUTTON_ID + ' {',
            '    right: 14px;',
            '    bottom: 18px;',
            '    padding: 10px 14px;',
            '    font-size: 0.9rem;',
            '  }',
            '}'
        ].join('\n');

        document.head.appendChild(style);
    }

    function initButton() {
        if (document.getElementById(BUTTON_ID)) {
            return;
        }

        var button = document.createElement('button');
        button.id = BUTTON_ID;
        button.type = 'button';
        button.setAttribute('aria-label', 'Back to top');
        button.setAttribute('title', 'Back to top');
        button.textContent = 'Top';

        var showAfter = Math.max(300, Math.floor(window.innerHeight * 0.6));

        function syncVisibility() {
            if (window.scrollY > showAfter) {
                button.classList.add('is-visible');
            } else {
                button.classList.remove('is-visible');
            }
        }

        button.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', syncVisibility, { passive: true });
        window.addEventListener('resize', function () {
            showAfter = Math.max(300, Math.floor(window.innerHeight * 0.6));
            syncVisibility();
        });

        document.body.appendChild(button);
        syncVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            ensureStyles();
            initButton();
        });
    } else {
        ensureStyles();
        initButton();
    }
})();
