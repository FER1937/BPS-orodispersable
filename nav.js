// Unified site navigation (dropdowns, mobile menu) and direct B2B lead form submission
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

    // Direct Web Form Submission (replaces mailto: client dependency)
    var forms = document.querySelectorAll('.cta-form');
    for (var k = 0; k < forms.length; k++) {
        (function (form) {
            // Update button label dynamically when switching between Formulation Evaluation and Licensing Inquiry
            var radios = form.querySelectorAll('input[name="inquiry_type"]');
            var submitBtn = form.querySelector('button[type="submit"]');
            function syncButtonLabel() {
                if (!submitBtn) return;
                var checked = form.querySelector('input[name="inquiry_type"]:checked');
                if (checked && checked.value.indexOf('Licensing') !== -1) {
                    submitBtn.textContent = 'Send Licensing Inquiry';
                } else {
                    submitBtn.textContent = 'Request Formulation Evaluation';
                }
            }
            for (var r = 0; r < radios.length; r++) {
                radios[r].addEventListener('change', syncButtonLabel);
            }
            syncButtonLabel();

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                var checkedReason = form.querySelector('input[name="inquiry_type"]:checked');
                var inquiryType = checkedReason ? checkedReason.value : 'Evaluate a formulation (API feasibility)';
                var nameInput = form.querySelector('[name="name"]');
                var companyInput = form.querySelector('[name="company"]');
                var positionInput = form.querySelector('[name="position"]');
                var emailInput = form.querySelector('[name="email"]');
                var detailsInput = form.querySelector('[name="project_details"]');

                var name = nameInput ? nameInput.value.trim() : '';
                var company = companyInput ? companyInput.value.trim() : '';
                var position = positionInput ? positionInput.value.trim() : '';
                var email = emailInput ? emailInput.value.trim() : '';
                var details = detailsInput ? detailsInput.value.trim() : '';

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending request...';
                }

                var payload = {
                    _subject: '[BPsynergies] ' + inquiryType + ' — ' + company,
                    Inquiry_Reason: inquiryType,
                    Full_Name: name,
                    Company: company,
                    Position: position,
                    Corporate_Email: email,
                    What_would_you_like_to_develop_or_improve: details || 'Not specified',
                    Source_Page: window.location.href,
                    _template: 'table',
                    _captcha: 'false'
                };

                function showConfirmation() {
                    var card = form.closest('.cta-card');
                    var confirmBox = card ? card.querySelector('.form-confirmation') : null;
                    if (confirmBox) {
                        var summaryEl = confirmBox.querySelector('.form-confirmation-summary');
                        if (summaryEl) {
                            summaryEl.textContent =
                                'We have registered your request (' + inquiryType + ') for ' + company +
                                '. Our scientific and business development team in Barcelona will reply to ' + email +
                                ' within 1–2 business days.';
                        }
                        form.style.display = 'none';
                        confirmBox.style.display = 'block';
                    }
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        syncButtonLabel();
                    }
                }

                fetch('https://formsubmit.co/ajax/info@bpsynergies.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(function (res) { return res.json(); })
                .then(function () {
                    showConfirmation();
                    form.reset();
                })
                .catch(function () {
                    showConfirmation();
                    form.reset();
                });
            });

            var card = form.closest('.cta-card');
            var resetBtn = card ? card.querySelector('.form-reset-btn') : null;
            if (resetBtn) {
                resetBtn.addEventListener('click', function () {
                    var confirmBox = card.querySelector('.form-confirmation');
                    if (confirmBox) confirmBox.style.display = 'none';
                    form.style.display = 'block';
                    syncButtonLabel();
                });
            }
        })(forms[k]);
    }
});
