document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeOptions = document.getElementById('theme-options');
    const themeOptionBtns = document.querySelectorAll('.theme-option');
    const root = document.documentElement;
    
    // Theme color variables
    const themeColors = {
        red: { primary: '#FF3B30', secondary: '#E0352B' },
        blue: { primary: '#2AABEE', secondary: '#229ED9' },
        green: { primary: '#34C759', secondary: '#30D158' },
        purple: { primary: '#AF52DE', secondary: '#9F44D3' },
        orange: { primary: '#FF9500', secondary: '#FF8000' },
        pink: { primary: '#FF2D55', secondary: '#E0284B' },
        indigo: { primary: '#5856D6', secondary: '#4F4DC7' },
        teal: { primary: '#5AC8FA', secondary: '#50B3E0' }
    };
    
    // Set default theme (red) or load saved theme
    const savedTheme = localStorage.getItem('exteraTheme') || 'red';
    
    // Apply theme function
    function applyTheme(themeName) {
        const colors = themeColors[themeName];
        root.style.setProperty('--primary-color', colors.primary);
        root.style.setProperty('--secondary-color', colors.secondary);
        
        // Update active state
        themeOptionBtns.forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-theme="${themeName}"]`).classList.add('active');
        
        // Update theme toggle button color
        themeToggle.style.backgroundColor = colors.primary;
        
        // Save theme preference
        localStorage.setItem('exteraTheme', themeName);
        
        // Close theme options after selection
        themeOptions.classList.remove('show');
    }
    
    // Initialize theme
    applyTheme(savedTheme);
    
    // Toggle theme options visibility
    themeToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        themeOptions.classList.toggle('show');
    });
    
    // Add click event to theme options
    themeOptionBtns.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const themeName = this.getAttribute('data-theme');
            applyTheme(themeName);
        });
    });
    
    // Close theme options when clicking outside
    document.addEventListener('click', function() {
        if (themeOptions.classList.contains('show')) {
            themeOptions.classList.remove('show');
        }
    });
    
    // Prevent closing when clicking inside theme options
    themeOptions.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|tablet|Nexus 7|Nexus 10/i.test(navigator.userAgent);
    
    // Add device-specific classes to body
    if (isMobile) document.body.classList.add('is-mobile');
    if (isTablet) document.body.classList.add('is-tablet');
    if (!isMobile && !isTablet) document.body.classList.add('is-desktop');


    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (navLinks) {
                navLinks.classList.toggle('show');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.theme-options') && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
        }
    });
    
    // Show/hide up button on scroll
    const upBtn = document.querySelector('.up-btn');
    const scrollThreshold = 300; // Show button after scrolling 300px
    
    function toggleUpButton() {
        if (window.scrollY > scrollThreshold) {
            upBtn.classList.add('show');
        } else {
            upBtn.classList.remove('show');
        }
    }
    
    // Initial check
    toggleUpButton();
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleUpButton);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    if (navLinks) {
                        navLinks.classList.remove('show');
                    }
                }
            }
        });
    });
    
    // Navigation highlighting removed - no longer needed
    
    // Add animations on scroll
    const animateElements = document.querySelectorAll('.feature-card, .feature-row, .team-card, .download-card');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on initial load
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .feature-row, .team-card, .download-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.animate, .feature-row.animate, .team-card.animate, .download-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.show a {
            margin: 10px 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);
});
               
