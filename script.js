document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.display = 'none';
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close Mobile Menu When Clicking a Link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots-container');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    // Create dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Next Slide Function
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Previous Slide Function
    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Go To Specific Slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Event Listeners for Buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto Slide Change
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on Hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Menu Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and categories
            tabBtns.forEach(btn => btn.classList.remove('active'));
            menuCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding category
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
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

    // Animation on Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-img, .about-text, .menu-item, .gallery-item, .chef-card, .testimonial-card, .info-box, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.about-img, .about-text, .menu-item, .gallery-item, .chef-card, .testimonial-card, .info-box, .contact-form');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.display = 'none';
    });

    // --- Sticky Header & Active Nav Link on Scroll ---
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active Nav Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // --- NEW: Menu Section Filtering with Animation ---
    const menuTabs = document.querySelectorAll('.menu-tabs .tab-btn');
    const menuItems = document.querySelectorAll('.menu-items .menu-item');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate current active tab
            document.querySelector('.menu-tabs .tab-btn.active').classList.remove('active');
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            menuItems.forEach(item => {
                // Clear any existing animation to allow it to be re-triggered
                item.style.animation = 'none';

                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                    // Force a reflow to re-trigger the animation on the element
                    void item.offsetWidth; 
                    item.style.animation = 'fadeIn 0.5s ease-out forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- Back to Top Button ---
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    menuBtn.classList.remove('active');
                }
            }
        });
   });
});

js
const fadeEls = document.querySelectorAll('.fade-in');

function checkFadeIn() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkFadeIn);
checkFadeIn();

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const loginModal = document.getElementById("login-modal");
  const closeLogin = document.getElementById("close-login");
  const loginForm = document.getElementById("login-form");

  // Show Login Modal
  loginBtn.addEventListener("click", (e) => {
     e.preventDefault();
     loginModal.style.display = "flex";
  });

  // Close Modal
  closeLogin.addEventListener("click", () => {
     loginModal.style.display = "none";
  });

  // Login Submit
  loginForm.addEventListener("submit", (e) => {
     e.preventDefault();
     loginModal.style.display = "none";
     loginBtn.style.display = "none";
     logoutBtn.style.display = "inline-block";
     alert("Logged in successfully!");
  });

  // Logout Click
  logoutBtn.addEventListener("click", (e) => {
     e.preventDefault();
     loginBtn.style.display = "inline-block";
     logoutBtn.style.display = "none";
     alert("Logged out successfully!");
   });
});
