// Initialize ScrollReveal
document.addEventListener('DOMContentLoaded', () => {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 1200,
        delay: 100,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        reset: false
    });

    // Reveal animations
    sr.reveal('[data-reveal="left"]', { origin: 'left' });
    sr.reveal('[data-reveal="right"]', { origin: 'right' });
    sr.reveal('[data-reveal="bottom"]', { origin: 'bottom', interval: 150 });
    sr.reveal('[data-reveal="scale"]', { scale: 0.95, duration: 1500 });

    // Sequential badge animations
    setTimeout(() => {
        document.querySelector('.card-1')?.classList.add('revealed');
    }, 600);

    setTimeout(() => {
        document.querySelector('.card-2')?.classList.add('revealed');
    }, 1000);

    setTimeout(() => {
        document.querySelector('.card-3')?.classList.add('revealed');
    }, 1400);

    // Header scroll effect
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = '0 10px 40px rgba(0, 51, 102, 0.1)';
            nav.style.height = '70px';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.75)';
            header.style.boxShadow = 'none';
            nav.style.height = '90px';
        }
    });

    // Form submission with real email functionality
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const company = document.getElementById('company').value;
            const position = document.getElementById('position').value;
            const email = document.getElementById('email').value;

            // Create email content
            const recipient = 'info@bpsynergies.com';
            const subject = 'Request for Licensing Dossier';
            const body = `Dear BPsynergies Team,

I am interested in receiving the Licensing Dossier for your taste-masking technologies and waterless formulations.

Contact Information:
- Name: ${name}
- Company: ${company}
- Position: ${position}
- Email: ${email}

I look forward to learning more about licensing opportunities.

Best regards,
${name}`;

            // Create mailto link
            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show confirmation message
            const submitBtn = leadForm.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Email Client Opened - Please Send';
            submitBtn.style.background = '#10B981';

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.background = '';
                leadForm.reset();
            }, 5000);
        });
    }

    // Navigation with instant jump and elegant fade-in
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // Ignore empty anchors
            if (targetId === '#') return;

            // Handle scroll to top (logo click)
            if (targetId === '#top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) return;

            // Calculate position
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Instant jump to section
            window.scrollTo({
                top: offsetPosition,
                behavior: 'auto'
            });

            // Add fade-in animation to target section
            target.style.opacity = '0';
            target.style.transform = 'translateY(30px) scale(0.98)';

            requestAnimationFrame(() => {
                target.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                target.style.opacity = '1';
                target.style.transform = 'translateY(0) scale(1)';

                // Reset after animation
                setTimeout(() => {
                    target.style.transition = '';
                    target.style.opacity = '';
                    target.style.transform = '';
                }, 650);
            });
        });
    });
});


// Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('tech-modal');
    const trigger = document.getElementById('tech-trigger');
    const closeBtn = document.getElementById('modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    if (modal && trigger) {
        trigger.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Directly set modal visibility without ScrollReveal
            const container = modal.querySelector('.modal-container');
            if (container) {
                container.style.opacity = '1';
                container.style.transform = 'scale(1)';
            }
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Escape key to close
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
