// ===================================
// API CONFIGURATION
// ===================================

// GitHub API Configuration
const GITHUB_USERNAME = 'emilyntagaan';

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = '_bLTiMPdlxDlC_T3L';
const EMAILJS_SERVICE_ID = 'service_1zy16sm';
const EMAILJS_TEMPLATE_ID = 'template_a0hew8g';

// Mailchimp Configuration
const MAILCHIMP_API_KEY = 'b9e543b9d18fb96b60ecd64e4d9891b4-us15';
const MAILCHIMP_AUDIENCE_ID = '2bfc95679b';
const MAILCHIMP_SERVER_PREFIX = 'us15';

// Project images
const PROJECT_IMAGES = {
    'qUeueNO': 'https://raw.githubusercontent.com/emilyntagaan/qUeueNO/main/queueno.png',
    'NORTE': 'https://raw.githubusercontent.com/emilyntagaan/NORTE/main/norte.png',
    'ALAMATIKO': 'https://raw.githubusercontent.com/emilyntagaan/ALAMATIKO/main/alamatiko.png',
    'File-Manager-System': 'https://raw.githubusercontent.com/emilyntagaan/File-Manager-System/main/file.png',
    'SciBrain': 'https://raw.githubusercontent.com/emilyntagaan/SciBrain/main/scibrain.png',
    'Print-To-Bee-Information-System': 'https://raw.githubusercontent.com/emilyntagaan/Print-To-Bee-Information-System/main/print.png'
};

// ===================================
// CAROUSEL STATE
// ===================================

let carouselProjects = [];
let currentCarouselIndex = 0;
let cardsPerView = 3;

function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function updateCarouselButtons() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!prevBtn || !nextBtn) return;

    cardsPerView = getCardsPerView();
    const totalSlides = Math.ceil(carouselProjects.length / cardsPerView);
    const currentSlide = Math.floor(currentCarouselIndex / cardsPerView);

    // Disable/enable buttons
    prevBtn.disabled = currentCarouselIndex === 0;
    nextBtn.disabled = currentCarouselIndex + cardsPerView >= carouselProjects.length;

    // Update dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === currentSlide ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                currentCarouselIndex = i * cardsPerView;
                renderCarouselProjects();
                updateCarouselButtons();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Update counter
    const counter = document.getElementById('carousel-counter');
    if (counter) {
        const visibleEnd = Math.min(currentCarouselIndex + cardsPerView, carouselProjects.length);
        counter.textContent = `${currentCarouselIndex + 1}–${visibleEnd} of ${carouselProjects.length}`;
    }
}

function renderCarouselProjects() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    cardsPerView = getCardsPerView();
    const visibleProjects = carouselProjects.slice(currentCarouselIndex, currentCarouselIndex + cardsPerView);

    // Animate out
    track.style.opacity = '0';
    track.style.transform = 'translateX(8px)';

    setTimeout(() => {
        track.innerHTML = visibleProjects.map((project, idx) => buildProjectCard(project, currentCarouselIndex + idx + 1)).join('');
        // Animate in
        track.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        track.style.opacity = '1';
        track.style.transform = 'translateX(0)';
    }, 180);
}

function buildProjectCard(project, number) {
    const numLabel = String(number).padStart(2, '0');
    return `
        <div class="project-card">
            <div class="project-image-wrapper">
                ${project.image
                    ? `<img src="${project.image}" alt="${project.name} preview" class="project-image" />`
                    : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#c1e899,#e6f0dc);display:flex;align-items:center;justify-content:center;color:#55883b;font-size:2.5rem;">📁</div>`
                }
                <div class="project-image-overlay">
                    <div class="project-overlay-links">
                        <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="overlay-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                            GitHub
                        </a>
                    </div>
                </div>
                <div class="project-number">${numLabel}</div>
                <div class="github-badge" style="position:absolute;top:1rem;left:1rem;background:rgba(0,0,0,0.65);color:white;padding:0.4rem 0.85rem;border-radius:20px;font-size:0.78rem;display:flex;align-items:center;gap:0.45rem;backdrop-filter:blur(6px);">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                </div>
            </div>
            <div class="project-content">
                <div class="project-meta">
                    <span class="project-type-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                        Repository
                    </span>
                </div>
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    <span class="tech-tag">${project.languages || 'Code'}</span>
                    <span class="tech-tag">⭐ ${project.stars}</span>
                    <span class="tech-tag" style="margin-left:auto;opacity:0.65;">Updated ${project.updated}</span>
                </div>
                <div class="project-links">
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link code-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    `;
}

function injectCarouselShell() {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) return;

    // Replace the entire container with carousel shell
    const section = projectsContainer.closest('.projects-section') || projectsContainer.parentElement;

    const carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'carousel-wrapper';
    carouselWrapper.innerHTML = `
        <div class="carousel-controls-top">
            <span id="carousel-counter" class="carousel-counter"></span>
            <div class="carousel-nav-btns">
                <button id="carousel-prev" class="carousel-nav-btn" aria-label="Previous projects" disabled>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <button id="carousel-next" class="carousel-nav-btn" aria-label="Next projects">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="carousel-viewport">
            <div id="carousel-track" class="projects-container carousel-track"></div>
        </div>
        <div id="carousel-dots" class="carousel-dots"></div>
    `;

    projectsContainer.replaceWith(carouselWrapper);

    // Wire up nav buttons
    document.getElementById('carousel-prev').addEventListener('click', () => {
        cardsPerView = getCardsPerView();
        if (currentCarouselIndex > 0) {
            currentCarouselIndex = Math.max(0, currentCarouselIndex - cardsPerView);
            renderCarouselProjects();
            updateCarouselButtons();
        }
    });

    document.getElementById('carousel-next').addEventListener('click', () => {
        cardsPerView = getCardsPerView();
        if (currentCarouselIndex + cardsPerView < carouselProjects.length) {
            currentCarouselIndex += cardsPerView;
            renderCarouselProjects();
            updateCarouselButtons();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    const viewport = carouselWrapper.querySelector('.carousel-viewport');
    viewport.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        cardsPerView = getCardsPerView();
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentCarouselIndex + cardsPerView < carouselProjects.length) {
                currentCarouselIndex += cardsPerView;
            } else if (diff < 0 && currentCarouselIndex > 0) {
                currentCarouselIndex = Math.max(0, currentCarouselIndex - cardsPerView);
            }
            renderCarouselProjects();
            updateCarouselButtons();
        }
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        cardsPerView = getCardsPerView();
        if (e.key === 'ArrowLeft' && currentCarouselIndex > 0) {
            currentCarouselIndex = Math.max(0, currentCarouselIndex - cardsPerView);
            renderCarouselProjects();
            updateCarouselButtons();
        } else if (e.key === 'ArrowRight' && currentCarouselIndex + cardsPerView < carouselProjects.length) {
            currentCarouselIndex += cardsPerView;
            renderCarouselProjects();
            updateCarouselButtons();
        }
    });

    // Recalculate on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newCPV = getCardsPerView();
            if (newCPV !== cardsPerView) {
                cardsPerView = newCPV;
                // Snap index to a clean page boundary
                currentCarouselIndex = Math.floor(currentCarouselIndex / cardsPerView) * cardsPerView;
                renderCarouselProjects();
                updateCarouselButtons();
            }
        }, 200);
    });
}

// ===================================
// API #1: GITHUB API - Display Projects (with carousel)
// ===================================

async function fetchGitHubProjects() {
    if (!GITHUB_USERNAME || GITHUB_USERNAME === 'YOUR_GITHUB_USERNAME') {
        console.log('GitHub username not configured. Keeping default projects.');
        return;
    }

    // Inject carousel shell before fetching
    injectCarouselShell();

    const track = document.getElementById('carousel-track');
    if (track) {
        track.innerHTML = `
            <div class="loading-projects" style="text-align:center;padding:4rem;grid-column:1/-1;">
                <div style="width:50px;height:50px;border:5px solid #c1e899;border-top-color:#55883b;border-radius:50%;margin:0 auto 1rem;animation:spin 1s linear infinite;"></div>
                <p style="color:var(--text-primary);">Loading projects from GitHub...</p>
            </div>
        `;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);

        if (!response.ok) throw new Error('Failed to fetch repositories');

        const repos = await response.json();
        carouselProjects = repos
            .filter(repo => !repo.fork)
            .map(repo => ({
                image: PROJECT_IMAGES[repo.name] || null,
                name: repo.name,
                description: repo.description || 'No description available.',
                languages: repo.language || 'Code',
                stars: repo.stargazers_count,
                url: repo.html_url,
                updated: new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            }));

        currentCarouselIndex = 0;
        renderCarouselProjects();
        updateCarouselButtons();

    } catch (error) {
        console.error('GitHub API Error:', error);
        // Restore original static container on error
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        if (carouselWrapper) {
            const fallback = document.createElement('div');
            fallback.className = 'projects-container';
            fallback.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-primary);opacity:0.6;">Could not load GitHub projects. Please check your connection.</p>`;
            carouselWrapper.replaceWith(fallback);
        }
    }
}

// ===================================
// API #2: EMAILJS - Contact Form
// ===================================

function initEmailJS() {
    console.log('Initializing EmailJS...');
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) { console.error('Contact form not found!'); return; }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();

        const submitBtn = this.querySelector('.submit-btn');
        const formStatus = document.getElementById('form-status');
        const nameInput = this.querySelector('#user_name');
        const emailInput = this.querySelector('#user_email');
        const subjectInput = this.querySelector('#subject');
        const messageInput = this.querySelector('#message');

        let isValid = true;

        if (nameInput.value.trim().length < 2) { showError(nameInput, 'Please enter your full name'); isValid = false; } else { clearError(nameInput); }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) { showError(emailInput, 'Please enter a valid email address'); isValid = false; } else { clearError(emailInput); }
        if (subjectInput.value.trim().length < 3) { showError(subjectInput, 'Please enter a subject'); isValid = false; } else { clearError(subjectInput); }
        if (messageInput.value.trim().length < 10) { showError(messageInput, 'Message must be at least 10 characters'); isValid = false; } else { clearError(messageInput); }

        if (!isValid) return false;

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';

        try {
            const response = await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this);
            console.log('✓ Email sent successfully:', response);
            formStatus.className = 'form-status success';
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formStatus.style.display = 'block';
            this.reset();
            this.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
            setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
        } catch (error) {
            console.error('✗ EmailJS Error:', error);
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Failed to send message. Please try again or email me directly at emilyntagaan18@gmail.com';
            formStatus.style.display = 'block';
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }

        return false;
    });

    console.log('EmailJS initialized successfully');
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.querySelector('.error-message').textContent = message;
}

function clearError(input) {
    input.closest('.form-group').classList.remove('error');
}

// ===================================
// API #3: MAILCHIMP - Newsletter
// ===================================

function initMailchimp() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;

    if (!MAILCHIMP_API_KEY || MAILCHIMP_API_KEY === 'YOUR_MAILCHIMP_API_KEY' ||
        !MAILCHIMP_AUDIENCE_ID || MAILCHIMP_AUDIENCE_ID === 'YOUR_AUDIENCE_ID') {
        console.log('Mailchimp not configured');
        return;
    }

    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();

        const emailInput = this.querySelector('#newsletter-email');
        const submitBtn = this.querySelector('button');
        const formStatus = document.getElementById('newsletter-status');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Please enter a valid email address';
            formStatus.style.display = 'block';
            return false;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formStatus.style.display = 'none';

        try {
            const response = await fetch('/.netlify/functions/mailchimp-subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput.value.trim() })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Subscription failed');

            formStatus.className = 'form-status success';
            formStatus.textContent = '✓ Successfully subscribed! Check your email for confirmation.';
            formStatus.style.display = 'block';
            this.reset();
            setTimeout(() => { formStatus.style.display = 'none'; }, 7000);
        } catch (error) {
            console.error('Mailchimp Error:', error);
            formStatus.className = 'form-status error';
            formStatus.textContent = error.message.includes('already subscribed') || error.message.includes('already a list member')
                ? '✓ You\'re already subscribed!'
                : '✗ Subscription failed. Please try again later.';
            formStatus.style.display = 'block';
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }

        return false;
    });

    console.log('Mailchimp initialized');
}

// ===================================
// INITIALIZE ALL APIS
// ===================================

function waitForEmailJS(callback) {
    if (typeof emailjs !== 'undefined') {
        callback();
    } else {
        setTimeout(() => waitForEmailJS(callback), 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAPIs);
} else {
    initAPIs();
}

function initAPIs() {
    console.log('Initializing APIs...');
    waitForEmailJS(() => {
        initEmailJS();
        initMailchimp();
        fetchGitHubProjects();
    });
}