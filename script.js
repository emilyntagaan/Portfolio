// ===================================
// NAVIGATION SCROLL EFFECT
// ===================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// MOBILE MENU TOGGLE - FIXED VERSION
// ===================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ABOUT SECTION - TAB NAVIGATION
// ===================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ===================================
// PARALLAX EFFECT FOR HOME SECTION (DISABLED ON MOBILE)
// ===================================
const profileFrame = document.querySelector('.profile-frame');
const introContent = document.querySelector('.intro-content');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.scrollY;
        const homeSection = document.querySelector('.home-section');
        
        if (homeSection && scrolled < homeSection.offsetHeight) {
            if (profileFrame) {
                profileFrame.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            if (introContent) {
                introContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        }
    } else {
        if (profileFrame) profileFrame.style.transform = '';
        if (introContent) introContent.style.transform = '';
    }
});

// ===================================
// DYNAMIC TYPING EFFECT
// ===================================
function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const professionalTitle = document.querySelector('.professional-title');
    if (professionalTitle) {
        const originalText = professionalTitle.textContent;
        professionalTitle.style.opacity = '0';
        
        setTimeout(() => {
            professionalTitle.style.opacity = '1';
            typeWriter(professionalTitle, originalText, 80);
        }, 1000);
    }
});

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================
const buttons = document.querySelectorAll('.btn, .project-link, .linkedin-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .project-link, .linkedin-link {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// ===================================
// PROJECT CARDS HOVER EFFECT (DISABLED ON MOBILE)
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// SKILLS — Animate bars on scroll
// ===================================
(function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    skillCards.forEach(card => observer.observe(card));
})();

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
`;
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');

const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--chocolate), #7a5229);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 16px rgba(154, 103, 53, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .scroll-to-top.visible { opacity: 1; visibility: visible; }
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(154, 103, 53, 0.4);
        background: linear-gradient(135deg, var(--primary-green), var(--dark-green));
    }
    .scroll-to-top svg { width: 24px; height: 24px; }
    @media (max-width: 768px) {
        .scroll-to-top { bottom: 1.5rem; right: 1.5rem; width: 45px; height: 45px; }
        .scroll-to-top svg { width: 20px; height: 20px; }
    }
`;
document.head.appendChild(scrollTopStyle);
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    highlightNavigation();
}, 10));

// ===================================
// RESPONSIVE BEHAVIOR UPDATES
// ===================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c👋 Hello Developer!', 'font-size: 24px; font-weight: bold; color: #55883b;');
console.log('%cInterested in the code? Let\'s connect!', 'font-size: 14px; color: #9A6735;');
console.log('%c📧 emilyntagaan18@gmail.com', 'font-size: 12px; color: #3d6029;');

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

const a11yStyle = document.createElement('style');
a11yStyle.textContent = `
    body.keyboard-nav *:focus {
        outline: 3px solid var(--primary-green);
        outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(a11yStyle);

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const homeElements = document.querySelectorAll('.home-section [class*="fadeInUp"]');
    homeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

document.documentElement.style.visibility = 'visible';