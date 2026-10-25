// Initialize ScrollReveal for below-the-fold sections (Hero renders immediately for optimal LCP)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '20px',
            duration: 650,
            delay: 0,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            reset: false
        });

        sr.reveal('section:not(.hero) [data-reveal="left"]', { origin: 'left' });
        sr.reveal('section:not(.hero) [data-reveal="right"]', { origin: 'right' });
        sr.reveal('section:not(.hero) [data-reveal="bottom"]', { origin: 'bottom', interval: 80 });
        sr.reveal('section:not(.hero) [data-reveal="scale"]', { scale: 0.98, duration: 700 });
    }

    // Fast sequential badge reveal in Hero (does not block LCP image)
    setTimeout(() => {
        document.querySelector('.card-1')?.classList.add('revealed');
    }, 150);

    setTimeout(() => {
        document.querySelector('.card-2')?.classList.add('revealed');
    }, 300);

    setTimeout(() => {
        document.querySelector('.card-3')?.classList.add('revealed');
    }, 450);

    // Header scroll effect
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        if (!header || !nav) return;
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.92)';
            header.style.boxShadow = '0 10px 40px rgba(0, 51, 102, 0.1)';
            nav.style.height = '76px';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.75)';
            header.style.boxShadow = 'none';
            nav.style.height = '';
        }
    }, { passive: true });

    // Smooth in-page anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || targetId === '#seccion-blog') return;

            e.preventDefault();

            if (targetId === '#top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) return;

            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});
