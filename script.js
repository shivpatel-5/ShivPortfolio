document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. HAMBURGER MENU LOGIC (Existing) ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // === 2. SCROLL REVEAL ANIMATION ===
    // Select all cards and main headings
    const revealElements = document.querySelectorAll('.project-card, .comp-entry, .entry, .vol-entry, h1, .bio-section');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // How many pixels into view before revealing

        revealElements.forEach((el) => {
            // Add the initial 'reveal' class if not present
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }

            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();


    // === 3. AUTOMATIC COLLAPSIBLE CARDS ===
    // Define the selector for all card types across your different pages
    const cardSelectors = '.project-card, .comp-entry, .entry, .vol-entry';
    const cards = document.querySelectorAll(cardSelectors);

    cards.forEach(card => {
        // Find the "Header" part of the card. 
        // This logic varies slightly per page, so we look for common header classes.
        const header = card.querySelector('.project-header, .comp-header, .vol-header, h3');
        
        if (header) {
            // Create a container for the hidden details
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'details-content';

            // Move everything *except* the header into the wrapper
            // We convert childNodes to an array to avoid live-list issues
            const children = Array.from(card.children);
            
            children.forEach(child => {
                // If the child is NOT the header (and not the role title in student clubs), move it.
                if (child !== header && !child.classList.contains('role-title')) {
                    contentWrapper.appendChild(child);
                }
            });

            // Append the wrapper back to the card
            card.appendChild(contentWrapper);

            // Create the Toggle Button
            const btn = document.createElement('button');
            btn.className = 'toggle-btn';
            btn.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';

            // Insert button after the header (or role title if it exists)
            const roleTitle = card.querySelector('.role-title');
            if (roleTitle) {
                roleTitle.parentNode.insertBefore(btn, roleTitle.nextSibling);
            } else {
                header.parentNode.insertBefore(btn, header.nextSibling);
            }

            // Click Event
            btn.addEventListener('click', () => {
                const isOpen = contentWrapper.classList.contains('open');
                
                if (isOpen) {
                    contentWrapper.classList.remove('open');
                    btn.classList.remove('active');
                    btn.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';
                } else {
                    contentWrapper.classList.add('open');
                    btn.classList.add('active');
                    btn.innerHTML = 'Close Details <i class="fas fa-chevron-up"></i>';
                }
            });
        }
    });

    // === 4. 3D HOVER TILT EFFECT ===
    cards.forEach(card => {
        card.classList.add('tilt-card'); // Add CSS class

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            // 20 is the intensity divider (higher number = less tilt)
            const xRotate = -((y - rect.height / 2) / 20); 
            const yRotate = ((x - rect.width / 2) / 20);

            card.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset position when mouse leaves
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

});
