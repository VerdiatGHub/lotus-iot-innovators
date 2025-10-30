// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Music Toggle and Autoplay
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const musicOverlay = document.getElementById('musicOverlay');
const enableMusicBtn = document.getElementById('enableMusic');
const skipMusicBtn = document.getElementById('skipMusic');
let isPlaying = false;

// Check if user has a music preference saved
const musicPreference = localStorage.getItem('musicEnabled');

// Try to autoplay music
const tryAutoplay = () => {
    bgMusic.play()
        .then(() => {
            // Autoplay succeeded
            isPlaying = true;
            musicToggle.classList.add('playing');
            if (musicOverlay) {
                musicOverlay.classList.remove('show');
            }
            localStorage.setItem('musicEnabled', 'true');
        })
        .catch(() => {
            // Autoplay blocked - show overlay on home page only
            if (musicOverlay && musicPreference !== 'false') {
                setTimeout(() => {
                    musicOverlay.classList.add('show');
                }, 500);
            }
        });
};

// Handle enable music button
if (enableMusicBtn) {
    enableMusicBtn.addEventListener('click', () => {
        bgMusic.play();
        isPlaying = true;
        musicToggle.classList.add('playing');
        musicOverlay.classList.remove('show');
        localStorage.setItem('musicEnabled', 'true');
    });
}

// Handle skip music button
if (skipMusicBtn) {
    skipMusicBtn.addEventListener('click', () => {
        musicOverlay.classList.remove('show');
        localStorage.setItem('musicEnabled', 'false');
    });
}

// Music toggle button
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        isPlaying = false;
        localStorage.setItem('musicEnabled', 'false');
    } else {
        bgMusic.play();
        musicToggle.classList.add('playing');
        isPlaying = true;
        localStorage.setItem('musicEnabled', 'true');
    }
});

// Try autoplay on page load
window.addEventListener('load', () => {
    // If user previously enabled music, autoplay
    if (musicPreference === 'true') {
        tryAutoplay();
    } else if (musicPreference === null) {
        // First visit - try autoplay
        tryAutoplay();
    }
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Animated Counter
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when they come into view
            if (entry.target.classList.contains('counter')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .fade-up, .counter').forEach(el => {
    observer.observe(el);
});

// Particles Effect for Hero Section
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(16, 185, 129, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth Scroll
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

// Tab Functionality (Features Page)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const formData = new FormData(contactForm);
        
        // Simple validation
        let isValid = true;
        formData.forEach((value, key) => {
            if (key !== 'phone' && !value.trim()) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Simulate form submission (in production, this would send to a server)
        formMessage.textContent = 'Thank you for your message! We will get back to you within 24-48 hours.';
        formMessage.className = 'form-message success';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 300);
        }, 3000);
    });
}

// Scroll to Top on Page Load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Add scroll animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Auto-play music option (disabled by default for better UX)
// Uncomment the following lines to enable auto-play (may be blocked by browsers)
/*
window.addEventListener('load', () => {
    setTimeout(() => {
        bgMusic.play()
            .then(() => {
                musicToggle.classList.add('playing');
                isPlaying = true;
            })
            .catch(err => {
                console.log('Auto-play prevented:', err);
            });
    }, 1000);
});
*/

// Scroll to element functionality
document.querySelectorAll('.scroll-to').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offset = 100; // Offset for fixed navbar
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('%c🌸 Lotus IoT - Smart Monitoring System 🌸', 'color: #10b981; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped by Lotus Innovators Team', 'color: #3b82f6; font-size: 14px;');
console.log('%cMekong Tech Business Challenge 2025', 'color: #8b5cf6; font-size: 12px;');
