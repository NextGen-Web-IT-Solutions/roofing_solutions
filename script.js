document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Keep the footer copyright year current automatically
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const closeMenu = () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        navLinks.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    };

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.contains('active');
        isOpen ? closeMenu() : openMenu();
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close the menu if the user taps/clicks outside of it
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Close the menu on Escape for keyboard users
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
            mobileMenuBtn.focus();
        }
    });
});