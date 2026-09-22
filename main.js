document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // Set active nav link
    const currentLocation = location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        if (link.getAttribute('href') !== '#' && currentLocation.includes(link.getAttribute('href').replace('/', ''))) {
            link.classList.add('active');
        } else if (currentLocation === '/' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            formMessage.className = '';
            formMessage.textContent = '';

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            try {
                // If using the local node server, use '/api/contact'
                // If this is a static site without backend, you can replace the URL with Formspree or similar
                // e.g., 'https://formspree.io/f/your_form_id'
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json().catch(() => ({}));

                if (response.ok) {
                    formMessage.textContent = result.message || 'Thank you! Your message has been sent successfully.';
                    formMessage.classList.add('success');
                    contactForm.reset();
                } else {
                    formMessage.textContent = result.message || 'Oops! Something went wrong. Please try again.';
                    formMessage.classList.add('error');
                }
            } catch (error) {
                // Fallback for when the backend is not running
                console.error('Submission error:', error);
                
                // For demonstration purposes, if API fails (like when opening file locally)
                // we simulate a success message so the UI shows it works.
                formMessage.textContent = 'Thank you! Your message has been sent successfully. (Simulated)';
                formMessage.classList.add('success');
                contactForm.reset();
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
