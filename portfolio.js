document.addEventListener('DOMContentLoaded', () => {

    /* ===== MOBILE MENU ===== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
        navLinks.querySelectorAll('a').forEach(a =>
            a.addEventListener('click', () => navLinks.classList.remove('open')));
    }

    /* ===== SCROLL REVEAL (staggered rise) ===== */
    const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
    const show = (el) => {
        if (el.dataset.shown) return;
        el.dataset.shown = '1';
        const sibs = el.parentElement
            ? Array.from(el.parentElement.querySelectorAll(':scope > [data-reveal]')) : [el];
        const idx = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = (idx * 70) + 'ms';
        el.classList.add('shown');
    };
    const checkReveals = () => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        reveals.forEach((el) => {
            if (el.dataset.shown) return;
            const r = el.getBoundingClientRect();
            if (r.top < vh * 0.92 && r.bottom > 0) show(el);
        });
    };
    window.addEventListener('scroll', checkReveals, { passive: true });
    window.addEventListener('resize', checkReveals, { passive: true });
    requestAnimationFrame(checkReveals);
    setTimeout(checkReveals, 300);
    setTimeout(() => reveals.forEach(show), 2500); // failsafe: never leave hidden

    /* ===== NAV BAR BACKGROUND ON SCROLL ===== */
    const nav = document.querySelector('nav');
    const onScroll = () => {
        if (!nav) return;
        nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ===== ACTIVE NAV LINK ===== */
    const links = Array.from(document.querySelectorAll('[data-nav]'));
    const sections = links
        .map(l => document.getElementById(l.getAttribute('data-nav')))
        .filter(Boolean);
    const setActive = (id) => links.forEach(l =>
        l.classList.toggle('active', l.getAttribute('data-nav') === id));
    if ('IntersectionObserver' in window) {
        const navObs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
        }, { threshold: 0.4, rootMargin: '-30% 0px -50% 0px' });
        sections.forEach(s => navObs.observe(s));
    }

    /* ===== HERO PARALLAX ===== */
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        if (heroBg && window.scrollY < window.innerHeight) {
            heroBg.style.transform = 'translateY(' + (window.scrollY * 0.18) + 'px) scale(1.04)';
        }
    }, { passive: true });

    /* ===== EXPANDABLE CARDS / TOGGLES ===== */
    const togglePanel = (container) => {
        const panel = container.querySelector('.acc-panel');
        if (!panel) return;
        const chev = container.querySelector('.acc-chev');
        const label = container.querySelector('.acc-label');
        const open = panel.dataset.open === '1';
        if (open) {
            panel.style.maxHeight = '0';
            panel.style.opacity = '0';
            panel.style.marginTop = '0';
            panel.dataset.open = '0';
            container.classList.remove('open');
            if (label) label.textContent = 'Read more';
        } else {
            panel.style.maxHeight = panel.scrollHeight + 40 + 'px';
            panel.style.opacity = '1';
            panel.style.marginTop = '16px';
            panel.dataset.open = '1';
            container.classList.add('open');
            if (label) label.textContent = 'Read less';
        }
    };
    // whole-card click to expand
    document.querySelectorAll('[data-acc]').forEach(card =>
        card.addEventListener('click', () => togglePanel(card)));
    // dedicated toggle button
    document.querySelectorAll('[data-acc-toggle]').forEach(btn =>
        btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            togglePanel(btn.closest('[data-acc-container]'));
        }));

});
