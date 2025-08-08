// Portfolio JavaScript Functions

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme();
        this.init();
    }

    loadTheme() {
        return localStorage.getItem('portfolio-theme') || 'dark';
    }

    saveTheme(theme) {
        localStorage.setItem('portfolio-theme', theme);
    }

    setTheme(theme) {
        const body = document.body;
        
        // Remove all theme classes
        body.classList.remove('light', 'dark', 'theme-neon', 'theme-gradient');
        
        // Add current theme class
        if (theme === 'light') {
            body.classList.add('light');
        } else if (theme === 'dark') {
            body.classList.add('dark');
        } else if (theme === 'neon') {
            body.classList.add('dark', 'theme-neon');
        } else if (theme === 'gradient') {
            body.classList.add('dark', 'theme-gradient');
        }
        
        this.currentTheme = theme;
        this.saveTheme(theme);
        this.updateActiveThemeButton();
    }

    updateActiveThemeButton() {
        const buttons = document.querySelectorAll('.theme-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === this.currentTheme) {
                btn.classList.add('active');
            }
        });
    }

    init() {
        this.setTheme(this.currentTheme);
        
        // Add event listeners to theme buttons
        const themeButtons = document.querySelectorAll('.theme-btn');
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setTheme(btn.dataset.theme);
            });
        });
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.activeSection = 'home';
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupSectionObserver();
        this.setupParallax();
        this.setupAnimations();
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                this.scrollToSection(href);
                this.hideMobileMenu();
            });
        });
    }

    scrollToSection(href) {
        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
        });
    }

    hideMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.remove('show');
    }

    setupSectionObserver() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));
    }

    setActiveSection(sectionId) {
        this.activeSection = sectionId;
        
        // Update navigation links
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    setupParallax() {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-bg-overlay');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
    }

    setupAnimations() {
        const animateElements = document.querySelectorAll('.section-header, .about-content, .timeline-item, .skill-category, .project-card, .cert-type-card, .contact-form-container');
        
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            animateObserver.observe(element);
        });
    }
}

// Skills Animation
class SkillsAnimator {
    constructor() {
        this.init();
    }

    init() {
        const skillsSection = document.querySelector('.skills-section');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animateSkillBars();
                    }
                });
            },
            { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
        );

        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        skillBars.forEach((bar) => {
            const width = bar.getAttribute('data-width');
            if (width) {
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }
}

// Image Error Handling
class ImageHandler {
    constructor() {
        this.init();
    }

    init() {
        // Handle profile image error
        const profileImg = document.querySelector('.avatar-img');
        if (profileImg) {
            profileImg.addEventListener('error', () => {
                profileImg.style.display = 'none';
                const fallback = document.querySelector('.avatar-fallback');
                if (fallback) {
                    fallback.style.display = 'flex';
                }
            });
        }

        // Handle certificate images error
        const certImages = document.querySelectorAll('.certificate-img');
        certImages.forEach(img => {
            img.addEventListener('error', () => {
                img.style.display = 'none';
                const fallback = img.nextElementSibling;
                if (fallback && fallback.classList.contains('certificate-fallback')) {
                    fallback.style.display = 'flex';
                }
            });
        });
    }
}

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.init();
    }

    init() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            this.showToast('Error', 'Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showToast('Error', 'Please enter a valid email address.', 'error');
            return;
        }

        // Success message
        this.showToast('Message Sent!', "Thank you for your message! I'll get back to you soon.", 'success');
        
        // Reset form
        e.target.reset();
    }

    showToast(title, description, type = 'success') {
        const toast = document.getElementById('toast');
        const toastTitle = toast.querySelector('.toast-title');
        const toastDescription = toast.querySelector('.toast-description');
        const toastIcon = toast.querySelector('.toast-icon i');
        
        toastTitle.textContent = title;
        toastDescription.textContent = description;
        
        if (type === 'error') {
            toastIcon.className = 'fas fa-exclamation-circle';
            toastIcon.style.color = '#ef4444';
        } else {
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = '#10b981';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new SkillsAnimator();
    new ImageHandler();
    new ContactFormHandler();
    
    // Add click handlers for hero buttons
    const viewProjectsBtn = document.querySelector('.hero-buttons .btn-primary');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', () => scrollToSection('projects'));
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Hide mobile menu on resize
    const mobileMenu = document.querySelector('.mobile-menu');
    if (window.innerWidth >= 768) {
        mobileMenu.classList.remove('show');
    }
});

// Export functions for global access
window.scrollToSection = scrollToSection;
