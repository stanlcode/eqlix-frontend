// ===================================
// EQLIX MEDIA CREATION - JavaScript
// Interactive Features & Animations
// ===================================

// ===== ACTIVE PAGE HIGHLIGHTING =====
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        // Remove any existing active classes
        link.classList.remove('active');

        // Check if this link matches the current page
        if (linkHref) {
            // Extract filename from href (handle both relative and absolute paths)
            const linkPage = linkHref.split('/').pop().split('#')[0];

            // Special cases for different page types
            if (currentPage === linkPage) {
                link.classList.add('active');
            }
            // Handle index.html and root
            else if ((currentPage === '' || currentPage === 'index.html') && (linkPage === 'index.html' || linkHref === '#services')) {
                // Don't highlight on index page
            }
            // Handle about.html for Agence menu
            else if (currentPage === 'about.html' && linkHref === 'about.html') {
                link.classList.add('active');
            }
            // Handle service pages
            else if (currentPage.includes('.html') && linkPage === currentPage) {
                link.classList.add('active');
            }
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// ===== DARK MODE TOGGLE =====
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const logoImg = document.querySelector('.logo-img');

// Check for saved dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// Function to update logo based on dark mode
function updateLogo(isDark) {
    if (logoImg) {
        logoImg.src = isDark ? 'images/logo-dark.png' : 'images/logo.png';
    }
}

// Initialize dark mode if enabled
if (isDarkMode) {
    body.classList.add('dark-mode');
    updateLogo(true);
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkModeActive = body.classList.contains('dark-mode');

        // Update logo
        updateLogo(isDarkModeActive);

        // Save preference
        if (isDarkModeActive) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}


// ===== STICKY HEADER =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    if (!header) return;
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        header.style.padding = '12px 0';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        header.style.padding = '20px 0';
    }

    lastScroll = currentScroll;
});

// ===== LANGUAGE SELECTOR =====
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'fr';

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        langButtons.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Get selected language
        currentLang = btn.dataset.lang;

        // Update content
        updateLanguage(currentLang);
    });
});

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-fr]');

    elements.forEach(el => {
        if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        } else if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        }
    });
}

// ===== TABS SYSTEM =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        // Remove active class from all buttons and contents
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ===== TESTIMONIALS CAROUSEL =====
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('testimonial-prev');
const nextBtn = document.getElementById('testimonial-next');
let currentTestimonial = 0;

function showTestimonial(index) {
    if (!testimonialCards.length) return;

    testimonialCards.forEach(card => card.classList.remove('active'));

    if (index >= testimonialCards.length) {
        currentTestimonial = 0;
    } else if (index < 0) {
        currentTestimonial = testimonialCards.length - 1;
    } else {
        currentTestimonial = index;
    }

    testimonialCards[currentTestimonial].classList.add('active');
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });
}

// Auto-rotate testimonials
if (testimonialCards.length > 0) {
    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
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

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll('.feature-card, .workflow-step, .testimonial-card, .portfolio-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== MAGNETIC BUTTON EFFECT =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== PARALLAX EFFECT FOR HERO =====
const hero = document.querySelector('.hero');
const heroGradient = document.querySelector('.hero-gradient');

window.addEventListener('scroll', () => {
    if (!hero) return;
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroGradient && scrolled < hero.offsetHeight) {
        heroGradient.style.transform = `translate(${scrolled * parallaxSpeed}px, ${scrolled * parallaxSpeed}px)`;
    }
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONTACT MODAL =====
const contactModal = document.getElementById('contact-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const successClose = document.getElementById('success-close');

// Function to open modal
function openContactModal() {
    if (contactModal) {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Function to close modal
function closeContactModal() {
    if (contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            if (contactForm) {
                contactForm.classList.remove('hidden');
                contactForm.reset();
            }
            if (successMessage) {
                successMessage.classList.remove('active');
            }
        }, 300);
    }
}

// Export to global
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;

// Close listeners
if (modalClose) modalClose.addEventListener('click', closeContactModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeContactModal);
if (successClose) successClose.addEventListener('click', closeContactModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
        closeContactModal();
    }
});

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const rawData = Object.fromEntries(formData);

        // Transform keys to match backend expectations (camelCase)
        const data = {
            name: rawData.name,
            email: rawData.email,
            phone: rawData.phone,
            company: rawData.company,
            projectType: rawData['project-type'], // Convert kebab-case to camelCase
            budget: rawData.budget,
            message: rawData.message
        };

        try {
            // Appel API réel
            const response = await API.contact.submit(data);

            if (response.success) {
                contactForm.classList.add('hidden');
                if (successMessage) successMessage.classList.add('active');
            } else {
                alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            alert('Erreur de connexion. Veuillez réessayer.');
        }
    });
}

// ===== HERO SLIDER =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function startSlider() {
        stopSlider();
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startSlider();
        });
    });

    document.addEventListener('visibilitychange', () => {
        document.hidden ? stopSlider() : startSlider();
    });

    startSlider();
}

// ===== PORTFOLIO FILTERING =====
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initPortfolioFilters();
});

// ===== LOGIN MODAL =====
const loginModal = document.getElementById('login-modal');
const loginOverlay = document.getElementById('login-overlay');
const loginClose = document.getElementById('login-close');
const loginForm = document.getElementById('login-form');
const loginSuccessMessage = document.getElementById('login-success-message');
const loginSuccessClose = document.getElementById('login-success-close');
const passwordToggle = document.getElementById('password-toggle');
const passwordInput = document.getElementById('login-password');

// Function to open login modal
function openLoginModal() {
    if (loginModal) {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Function to close login modal
function closeLoginModal() {
    if (loginModal) {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            if (loginForm) {
                loginForm.classList.remove('hidden');
                loginForm.reset();
            }
            if (loginSuccessMessage) {
                loginSuccessMessage.classList.remove('active');
            }
        }, 300);
    }
}

// Export to global
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;

// Close listeners
if (loginClose) loginClose.addEventListener('click', closeLoginModal);
if (loginOverlay) loginOverlay.addEventListener('click', closeLoginModal);
if (loginSuccessClose) loginSuccessClose.addEventListener('click', closeLoginModal);

// ESC key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
        closeLoginModal();
    }
});

// Password toggle functionality
if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
        const eyeIcon = passwordToggle.querySelector('.eye-icon');
        const eyeOffIcon = passwordToggle.querySelector('.eye-off-icon');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            if (eyeIcon) eyeIcon.style.display = 'none';
            if (eyeOffIcon) eyeOffIcon.style.display = 'block';
        } else {
            passwordInput.type = 'password';
            if (eyeIcon) eyeIcon.style.display = 'block';
            if (eyeOffIcon) eyeOffIcon.style.display = 'none';
        }
    });
}

// Handle login form submission
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);

        try {
            // Appel API réel
            const response = await API.auth.login(data);

            if (response.success) {
                loginForm.classList.add('hidden');
                if (loginSuccessMessage) loginSuccessMessage.classList.add('active');
            } else {
                alert(response.error?.message || 'Erreur de connexion. Vérifiez vos identifiants.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Erreur de connexion. Veuillez réessayer.');
        }
    });
}

// Handle login success button - redirect to dashboard
if (loginSuccessClose) {
    loginSuccessClose.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
}

console.log('EQLIX MEDIA CREATION - Website loaded successfully! 🚀');
