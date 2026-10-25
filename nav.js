// Unified site navigation: dropdown menus (click/keyboard/touch) and mobile hamburger menu
document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav-toggle');
    var dropdowns = document.querySelectorAll('.nav-dropdown');

    function closeDropdowns(except) {
        for (var i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i] === except) continue;
            dropdowns[i].classList.remove('open');
            var btn = dropdowns[i].querySelector('.nav-dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        }
    }

    function closeMobileMenu() {
        if (!nav) return;
        nav.classList.remove('nav-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    if (toggle && nav) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = nav.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    for (var i = 0; i < dropdowns.length; i++) {
        (function (dd) {
            var btn = dd.querySelector('.nav-dropdown-toggle');
            if (!btn) return;
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var willOpen = !dd.classList.contains('open');
                closeDropdowns(dd);
                dd.classList.toggle('open', willOpen);
                btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            });
        })(dropdowns[i]);
    }

    // Close menus after following a link (important for in-page anchors on the homepage)
    var links = document.querySelectorAll('.nav-links a');
    for (var j = 0; j < links.length; j++) {
        links[j].addEventListener('click', function () {
            closeDropdowns();
            closeMobileMenu();
        });
    }

    document.addEventListener('click', function (e) {
        if (nav && !nav.contains(e.target)) {
            closeDropdowns();
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeDropdowns();
            closeMobileMenu();
        }
    });
});
