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

    // Header shrinks slightly once the page is scrolled
    const header = document.querySelector('.header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Highlight the nav link for the section currently in view
    const links = [...navLinks.querySelectorAll('a[href^="#"]:not(.btn-primary)')];
    const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    links.forEach(l => {
                        const on = l.getAttribute('href') === '#' + en.target.id;
                        l.classList.toggle('active-link', on);
                        on ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current');
                    });
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(sec => spy.observe(sec));
    }

    // Gallery lightbox
    const lb = document.getElementById('lightbox');
    const lbImg = lb.querySelector('img');
    const items = [...document.querySelectorAll('.gallery-item')];
    let current = 0, lastFocus = null;

    const show = (i) => {
        current = (i + items.length) % items.length;
        const img = items[current].querySelector('img');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
    };
    const openLb = (i) => {
        lastFocus = document.activeElement;
        show(i);
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
        lb.querySelector('.lb-close').focus();
    };
    const closeLb = () => {
        lb.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    };
    items.forEach((it, i) => it.addEventListener('click', () => openLb(i)));
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', (e) => {
        if (lb.hidden) return;
        if (e.key === 'Escape') closeLb();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
});
