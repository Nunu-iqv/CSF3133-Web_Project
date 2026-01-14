// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize slider
    initSlider();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize dropdowns
    initDropdowns();
    
    // Initialize review form
    initReviewForm();
    
    // Initialize watchlist buttons
    initWatchlist();
});

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    // Show slide function
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Handle index boundaries
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        // Show current slide and activate dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        showSlide(index);
        resetInterval();
    }
    
    // Auto slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Event listeners for buttons
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Pause on hover
    const slider = document.querySelector('.banner-slider');
    slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        startInterval();
    });
    
    // Initialize
    showSlide(0);
    startInterval();
}

// Mobile Menu
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileBtn');
    const mainNav = document.getElementById('mainNav');
    const navContainer = mainNav.querySelector('.nav-container');
    
    mobileBtn.addEventListener('click', function() {
        navContainer.classList.toggle('active');
        document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mainNav.contains(event.target) && !mobileBtn.contains(event.target)) {
            navContainer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            navContainer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Dropdowns for mobile
function initDropdowns() {
    const dropdownBtns = document.querySelectorAll('.dropdown > .nav-btn');
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside (mobile only)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            dropdownBtns.forEach(btn => {
                const dropdown = btn.parentElement;
                if (!dropdown.contains(event.target) && dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
}

// Review Form
function initReviewForm() {
    const form = document.getElementById('reviewForm');
    const reviewText = document.getElementById('review');
    const charCount = document.getElementById('charCount');
    
    // Character counter
    if (reviewText && charCount) {
        reviewText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            // Update color based on count
            if (count > 450) {
                charCount.style.color = '#ff4757';
            } else if (count > 400) {
                charCount.style.color = '#ffa502';
            } else {
                charCount.style.color = '';
            }
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const movie = document.getElementById('movie').value.trim();
            const rating = document.getElementById('rating').value;
            const review = document.getElementById('review').value.trim();
            const agree = document.getElementById('agree').checked;
            
            // Validation checks
            if (!name || !email || !movie || !rating || !review) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }
            
            if (review.length < 50) {
                showAlert('Review must be at least 50 characters long.', 'error');
                return;
            }
            
            if (!agree) {
                showAlert('Please confirm that this is your honest opinion.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Thank you for your review! It has been submitted successfully.', 'success');
            form.reset();
            charCount.textContent = '0';
            charCount.style.color = '';
        });
    }
}

// Watchlist functionality
function initWatchlist() {
    const watchlistBtns = document.querySelectorAll('.watchlist-btn');
    
    watchlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.className = 'fas fa-heart';
                this.style.background = '#ff4757';
                showAlert('Added to watchlist!', 'success');
            } else {
                icon.className = 'far fa-heart';
                this.style.background = '';
                showAlert('Removed from watchlist.', 'info');
            }
        });
    });
}

// Alert notification
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button class="alert-close">&times;</button>
    `;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-width: 300px;
        max-width: 400px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        alert.style.background = '#2ed573';
    } else if (type === 'error') {
        alert.style.background = '#ff4757';
    } else if (type === 'info') {
        alert.style.background = '#3742fa';
    }
    
    // Close button
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        margin: 0;
    `;
    
    closeBtn.addEventListener('click', function() {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    });
    
    // Add to document
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Close mobile menu if open
                const navContainer = document.querySelector('.nav-container');
                if (navContainer.classList.contains('active')) {
                    navContainer.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    } else {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Load image
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                // Handle broken images
                this.style.opacity = '1';
                this.src = 'https://via.placeholder.com/300x450/333/fff?text=Movie+Poster';
            });
        }
    });
});

/*submit review*/
function showToast() {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// In your form submit handler:
// showToast();