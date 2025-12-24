// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.step-card, .feature-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Game iframe responsive handler
function resizeGameContainer() {
    const container = document.querySelector('.game-container');
    if (container) {
        const width = container.offsetWidth;
        container.style.aspectRatio = '1';
    }
}

window.addEventListener('resize', resizeGameContainer);
window.addEventListener('load', resizeGameContainer);

// Button interaction feedback
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function() {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance: Lazy load iframes
if ('IntersectionObserver' in window) {
    const iframes = document.querySelectorAll('iframe[loading="lazy"]');
    iframes.forEach(iframe => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    iframe.src = iframe.getAttribute('data-src') || iframe.getAttribute('src');
                    obs.unobserve(iframe);
                }
            });
        });
        observer.observe(iframe);
    });
}

// Analytics tracking (optional - integrate with your analytics provider)
function trackEvent(eventName, eventData = {}) {
    if (window.gtag) {
        window.gtag('event', eventName, eventData);
    }
    console.log('Event:', eventName, eventData);
}

// Track when user scrolls to different sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('scroll_to_section', {
                    section: entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });
    observer.observe(section);
});

console.log('%c🎮 Connections Unlimited', 'font-size: 20px; color: #ffd700; font-weight: bold;');
console.log('%cWelcome to the puzzle! 🧩', 'font-size: 14px; color: #00d4ff;');
