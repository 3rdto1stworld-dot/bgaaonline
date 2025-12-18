// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        
        // Change icon
        if (mobileMenu.classList.contains('active')) {
            mobileMenuIcon.className = 'fas fa-times';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuBtn.setAttribute('aria-label', 'Close menu');
        } else {
            mobileMenuIcon.className = 'fas fa-bars';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuIcon.className = 'fas fa-bars';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
        }
    });
    
    // Close menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-btn');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuIcon.className = 'fas fa-bars';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
        });
    });
    
    // Animate stats counter (optional)
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = `+${Math.floor(current)}`;
        }, 30);
    });
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Process line animation on scroll
    const processLines = document.querySelectorAll('.process-line');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = '100%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    processLines.forEach(line => {
        observer.observe(line);
    });
});
