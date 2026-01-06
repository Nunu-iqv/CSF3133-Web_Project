// java.js
function changeTheme() {
    document.body.classList.toggle("light");
}

function validateForm() {
    alert("Review Submitted Successfully!");
    return false;
}

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('active');
}

// Dropdown toggle for mobile
function toggleDropdown(element) {
    if (window.innerWidth <= 768) {
        element.parentElement.classList.toggle('active');
    }
}

// Close menus when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
        document.querySelector('.main-nav').classList.remove('active');
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Slideshow functionality
let slideIndex = 0;
let slideshowInterval;

function startSlideshow() {
    const slides = document.querySelectorAll('.slide');
    
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Add active class to current slide
    slides[slideIndex].classList.add('active');
    
    // Move to next slide
    slideIndex++;
    
    // Reset to first slide if at end
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
}

// Initialize slideshow when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start the slideshow
    startSlideshow();
    
    // Change slide every 5 seconds
    slideshowInterval = setInterval(startSlideshow, 3000);
    
    // Optional: Pause slideshow on hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', function() {
        clearInterval(slideshowInterval);
    });
    
    hero.addEventListener('mouseleave', function() {
        slideshowInterval = setInterval(startSlideshow, 3000);
    });
});