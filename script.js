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

// Handle contact modal form submission
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

// Handle static contact page form submission
const contactFormPage = document.getElementById('contact-form-page');
if (contactFormPage) {
    contactFormPage.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactFormPage);
        const rawData = Object.fromEntries(formData);

        // Map fields for the static form (which might have slightly different IDs/names or need specific mapping)
        const data = {
            name: rawData.name,
            email: rawData.email,
            phone: rawData.phone,
            company: rawData.company || '', // Static form might not have company field, check HTML if needed
            projectType: rawData.subject || 'other', // Map 'subject' to 'projectType' or keep as is if backend supports it
            budget: '', // Static form might not have budget
            message: rawData.message
        };

        // Note: Check backend expectations. If backend expects strict 'projectType' enum, 'subject' values need mapping.
        // Assuming backend handles basic contact fields.

        try {
            const response = await API.contact.submit(data);
            // Create a simple success alert or modify DOM for static page
            if (response.success) {
                contactFormPage.reset();
                alert('Message envoyé avec succès ! Nous vous répondrons bientôt.');
            } else {
                alert('Erreur: ' + (response.error?.message || 'Une erreur est survenue.'));
            }
        } catch (error) {
            console.error('Error submitting static contact form:', error);
            alert('Erreur de connexion.');
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

// Password toggle functionality (Global Delegation)
document.addEventListener('click', function (e) {
    const toggleBtn = e.target.closest('.password-toggle');
    if (toggleBtn) {
        // Find the input relative to the button (sibling or in same wrapper)
        const wrapper = toggleBtn.closest('.password-input-wrapper') || toggleBtn.parentElement;
        const input = wrapper.querySelector('input');

        if (input) {
            const eyeIcon = toggleBtn.querySelector('.eye-icon');
            const eyeOffIcon = toggleBtn.querySelector('.eye-off-icon');

            if (input.type === 'password') {
                input.type = 'text';
                if (eyeIcon) eyeIcon.style.display = 'none';
                if (eyeOffIcon) eyeOffIcon.style.display = 'block';
            } else {
                input.type = 'password';
                if (eyeIcon) eyeIcon.style.display = 'block';
                if (eyeOffIcon) eyeOffIcon.style.display = 'none';
            }
        }
    }
});

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

                // Automatic redirect
                // Check if we are in a subdirectory
                const path = window.location.pathname;
                const isSubPage = path.includes('/services/') || path.includes('/legal/');
                const dashboardPath = isSubPage ? '../dashboard.html' : 'dashboard.html';

                setTimeout(() => {
                    window.location.href = dashboardPath;
                }, 1500);
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
        const path = window.location.pathname;
        const isSubPage = path.includes('/services/') || path.includes('/legal/');
        const dashboardPath = isSubPage ? '../dashboard.html' : 'dashboard.html';
        window.location.href = dashboardPath;
    });
}

// ===== REGISTER FORM =====
const registerForm = document.getElementById('register-form');
const registerSuccess = document.getElementById('register-success');
const registerPasswordToggle = document.getElementById('password-toggle');
const registerConfirmPasswordToggle = document.getElementById('confirm-password-toggle');
const registerPasswordInput = document.getElementById('password');
const registerConfirmPasswordInput = document.getElementById('confirmPassword');

// Register Password Toggle
if (registerPasswordToggle && registerPasswordInput) {
    registerPasswordToggle.addEventListener('click', () => {
        const eyeIcon = registerPasswordToggle.querySelector('.eye-icon');
        const eyeOffIcon = registerPasswordToggle.querySelector('.eye-off-icon');

        if (registerPasswordInput.type === 'password') {
            registerPasswordInput.type = 'text';
            if (eyeIcon) eyeIcon.style.display = 'none';
            if (eyeOffIcon) eyeOffIcon.style.display = 'block';
        } else {
            registerPasswordInput.type = 'password';
            if (eyeIcon) eyeIcon.style.display = 'block';
            if (eyeOffIcon) eyeOffIcon.style.display = 'none';
        }
    });
}

// Register Confirm Password Toggle
if (registerConfirmPasswordToggle && registerConfirmPasswordInput) {
    registerConfirmPasswordToggle.addEventListener('click', () => {
        const eyeIcon = registerConfirmPasswordToggle.querySelector('.eye-icon');
        const eyeOffIcon = registerConfirmPasswordToggle.querySelector('.eye-off-icon');

        if (registerConfirmPasswordInput.type === 'password') {
            registerConfirmPasswordInput.type = 'text';
            if (eyeIcon) eyeIcon.style.display = 'none';
            if (eyeOffIcon) eyeOffIcon.style.display = 'block';
        } else {
            registerConfirmPasswordInput.type = 'password';
            if (eyeIcon) eyeIcon.style.display = 'block';
            if (eyeOffIcon) eyeOffIcon.style.display = 'none';
        }
    });
}

// Handle Register Submit
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);

        // Validation
        if (data.password !== data.confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const userData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                company: data.company,
                password: data.password
            };

            const response = await API.auth.register(userData);

            if (response.success) {
                registerForm.style.display = 'none';
                if (registerSuccess) {
                    registerSuccess.style.display = 'block';
                    registerSuccess.classList.add('active');
                }

                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = 'client-space.html';
                }, 2000);
            } else {
                alert(response.error?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Registration Error:', error);
            alert('Erreur de connexion. Veuillez réessayer.');
        }
    });
}



// ===== FORGOT PASSWORD FORM =====
const forgotPasswordForm = document.getElementById('forgot-password-form');

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(forgotPasswordForm);
        const email = formData.get('email');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');

        try {
            const response = await API.auth.forgotPassword(email);

            // Note: For security, we often show success even if email doesn't exist.
            // But if API returns strict success/fail:
            if (response.success) {
                forgotPasswordForm.style.display = 'none';
                if (successMessage) successMessage.style.display = 'block';
                if (errorMessage) errorMessage.style.display = 'none';
            } else {
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    document.getElementById('error-text').textContent = response.error?.message || 'Erreur inconnue.';
                    forgotPasswordForm.style.display = 'none';
                } else {
                    alert('Erreur: ' + (response.error?.message || 'Veuillez réessayer.'));
                }
            }
        } catch (error) {
            console.error('Forgot Password Error:', error);
            alert('Erreur de connexion.');
        }
    });
}

// ===== RESET PASSWORD FORM =====
const resetPasswordForm = document.getElementById('reset-password-form');

if (resetPasswordForm) {
    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // e.g. reset-password.html?token=XYZ
    // Also support path-based if using history API? Assuming query param for static file.

    if (!token) {
        // Show invalid token message immediately if no token
        const invalidTokenMsg = document.getElementById('invalid-token-message');
        if (invalidTokenMsg) {
            invalidTokenMsg.style.display = 'block';
            resetPasswordForm.style.display = 'none';
        }
    }

    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(resetPasswordForm);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await API.auth.resetPassword(token, password);
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');

            if (response.success) {
                resetPasswordForm.style.display = 'none';
                if (successMessage) successMessage.style.display = 'block';
            } else {
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    document.getElementById('error-text').textContent = response.error?.message || 'Le lien a expiré ou est invalide.';
                    resetPasswordForm.style.display = 'none';
                } else {
                    alert('Erreur: ' + (response.error?.message || 'Erreur.'));
                }
            }
        } catch (error) {
            console.error('Reset Password Error:', error);
            alert('Erreur de connexion.');
        }
    });
}

// ===== VERIFY EMAIL PAGE =====
if (window.location.pathname.includes('verify-email.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const loadingMessage = document.getElementById('loading-message');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');

        if (!token) {
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (errorMessage) {
                errorMessage.style.display = 'block';
                if (errorText) errorText.textContent = 'Lien de vérification manquant.';
            }
            return;
        }

        try {
            const response = await API.auth.verifyEmail(token);

            if (loadingMessage) loadingMessage.style.display = 'none';

            if (response.success) {
                if (successMessage) successMessage.style.display = 'block';
            } else {
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    if (errorText) errorText.textContent = response.error?.message || 'Lien invalide ou expiré.';
                }
            }
        } catch (error) {
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (errorMessage) {
                errorMessage.style.display = 'block';
                if (errorText) errorText.textContent = 'Erreur de connexion.';
            }
        }
    });
}

console.log('EQLIX MEDIA CREATION - Website loaded successfully! 🚀');

// ===== STATS COUNTER ANIMATION =====
// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || ''; // Get suffix or empty string

                if (isNaN(target)) return; // Safety check

                const duration = 2000; // 2 seconds
                const stepTime = 20;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + suffix; // Add suffix at end
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current) + suffix; // Add suffix during animation
                    }
                }, stepTime);

                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// ===== AUTH STATE HEADER =====
function checkAuthAndRenderHeader() {
    const isAuth = API.user.isAuthenticated();
    const user = API.user.getCurrentUser();
    const headerActions = document.querySelector('.header-actions');
    const clientBtn = document.getElementById('client-space-btn');

    if (isAuth && user && headerActions) {
        // Remove client button if it exists
        if (clientBtn) clientBtn.remove();

        // Check if user menu already exists (avoid duplication)
        if (document.getElementById('user-menu-btn')) return;

        // Create User Menu HTML
        const userMenuHTML = `
            <div class="user-menu" id="user-menu">
                <div class="user-menu-btn" id="user-menu-btn">
                    <div class="user-avatar">${user.firstName ? user.firstName[0] : 'U'}${user.lastName ? user.lastName[0] : ''}</div>
                    <span class="user-name">${user.firstName} ${user.lastName}</span>
                    <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="user-dropdown">
                    <a href="dashboard.html" class="dropdown-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                        </svg>
                        Dashboard
                    </a>
                    <a href="profile.html" class="dropdown-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Mon Profil
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item logout" id="header-logout">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        D&eacute;connexion
                    </a>
                </div>
            </div>
        `;

        // Insert before the LAST element (which is usually mobile toggle)
        // Or replace the position where client button was. 
        // Best strategy: Insert before mobile toggle if exists, or append.
        const mobileToggle = document.getElementById('mobile-toggle');
        if (mobileToggle) {
            mobileToggle.insertAdjacentHTML('beforebegin', userMenuHTML);
        } else {
            headerActions.insertAdjacentHTML('beforeend', userMenuHTML);
        }

        // Initialize User Menu Events
        initHeaderUserMenu();
    }
}

function initHeaderUserMenu() {
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userMenu = document.getElementById('user-menu');
    const logoutBtn = document.getElementById('header-logout');

    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target)) {
                userMenu.classList.remove('active');
            }
        });
    }

    // Global Logout Handler (Event Delegation)
    document.addEventListener('click', async (e) => {
        const logoutTrigger = e.target.closest('#header-logout') || e.target.closest('.dropdown-item.logout');

        if (logoutTrigger) {
            e.preventDefault();
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                try {
                    console.log('Logging out...');
                    await API.auth.logout();
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    // Force redirect always
                    window.location.href = 'index.html';
                }
            }
        }
    });
}

// Add to global init
document.addEventListener('DOMContentLoaded', () => {
    initStatsCounter();
    checkAuthAndRenderHeader();
});

