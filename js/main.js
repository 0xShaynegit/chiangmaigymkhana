// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
            });
        });
    }
});

// Initialize GLightbox after page load for deferred loading
window.addEventListener('load', function() {
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '[data-glightbox]',
            touchNavigation: true,
            loop: true
        });
    }
});
