// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll with Offset for Fixed Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fade In Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 25, 47, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Typing Effect for Hero Title (subtle animation)
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle ? heroTitle.textContent : '';

if (heroTitle) {
    heroTitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after a small delay
    setTimeout(typeWriter, 800);
}

// Parallax Effect for Hero Section
const heroSection = document.querySelector('.hero');
const heroRight = document.querySelector('.hero-right');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroRight && scrolled < window.innerHeight) {
        heroRight.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Active Navigation Link Highlight
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.style.color = 'var(--text-light)');
            if (navLink) {
                navLink.style.color = 'var(--accent-cyan)';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Stagger Animation for Project Cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Skill Tags Hover Effect
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Contact Items Hover Animation
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('svg');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('svg');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const hasPlus = target.includes('+');
        const hasPercent = target.includes('%');
        const hasDollar = target.includes('$');
        const hasM = target.includes('M');
        
        let finalNumber = parseFloat(target.replace(/[^0-9.]/g, ''));
        let current = 0;
        const increment = finalNumber / 50;
        
        const updateCounter = () => {
            if (current < finalNumber) {
                current += increment;
                let displayValue = Math.ceil(current);
                
                if (hasDollar) displayValue = '$' + displayValue;
                if (hasM) displayValue = displayValue + 'M';
                if (hasPercent) displayValue = displayValue + '%';
                if (hasPlus) displayValue = displayValue + '+';
                
                stat.textContent = displayValue;
                setTimeout(updateCounter, 30);
            } else {
                stat.textContent = target;
            }
        };
        
        // Start animation when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(stat.closest('.hero-stats'));
    });
}

// Initialize stats animation
if (document.querySelector('.stat-number')) {
    animateStats();
}

// Add Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console Easter Egg
console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #64ffda;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 16px; color: #8892b0;');
console.log('%cLet\'s connect and discuss AI-driven product innovation.', 'font-size: 14px; color: #ccd6f6;');
console.log('%c📧 pandeyraunak007@gmail.com', 'font-size: 14px; color: #64ffda;');