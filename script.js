// ============================================
// DREAMY SCRUNCH — MAIN JAVASCRIPT
// Shared across all pages
// ============================================

// ========== WAIT FOR DOM TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. HAMBURGER MENU TOGGLE
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking on a link (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside (on backdrop)
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('open')) {
                const isClickInside = navLinks.contains(e.target) || hamburger.contains(e.target);
                if (!isClickInside) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('open');
                    document.body.style.overflow = '';
                }
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // 2. SCROLL HEADER SHADOW EFFECT
    // ========================================
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ========================================
    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 4. PRODUCT FILTER FUNCTIONALITY
    // (Used on Scrunchies page)
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                productCards.forEach(card => {
                    // Check if card has data-category attribute
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Add a small animation
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========================================
    // 5. CONTACT FORM HANDLER
    // (Used on Contact page)
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName')?.value?.trim() || '';
            const email = document.getElementById('email')?.value?.trim() || '';
            const message = document.getElementById('message')?.value?.trim() || '';

            // Validation
            if (!fullName || !email || !message) {
                showNotification('Please fill in all fields 💕', 'error');
                return false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address 📧', 'error');
                return false;
            }

            // Build WhatsApp message (URL encoded)
            const whatsappMessage = `Hi Dreamy Scrunch! 💕%0A%0A*Name:* ${encodeURIComponent(fullName)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(message)}`;
            const whatsappURL = `https://wa.me/919999999999?text=${whatsappMessage}`;

            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');

            // Show success message
            showNotification('✨ Message sent! We\'ll get back to you on WhatsApp.', 'success');

            // Reset form
            contactForm.reset();
        });
    }

    // ========================================
    // 6. NOTIFICATION SYSTEM
    // ========================================
    function showNotification(message, type = 'success') {
        // Remove any existing notification
        const existingNotification = document.querySelector('.dreamy-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'dreamy-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            max-width: 400px;
            padding: 18px 24px;
            border-radius: 16px;
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            font-weight: 500;
            color: #fff;
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0,0,0,0.20);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
        `;

        // Set color based on type
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #25D366, #1da851)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        } else {
            notification.style.background = 'var(--charcoal)';
        }

        notification.textContent = message;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
            notification.style.pointerEvents = 'auto';
        }, 50);

        // Auto dismiss after 5 seconds
        const timeout = setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }, 5000);

        // Allow click to dismiss
        notification.addEventListener('click', function() {
            clearTimeout(timeout);
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        });
    }

    // ========================================
    // 7. LAZY LOAD IMAGES (placeholder effect)
    // ========================================
    // This adds a subtle fade-in effect to product cards
    const cards = document.querySelectorAll('.product-card');
    
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    } else {
        // Fallback for older browsers
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    // ========================================
    // 8. WHATSAPP BUTTON TRACKING (Optional)
    // ========================================
    document.querySelectorAll('.btn-whatsapp, a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // You can add analytics tracking here
            // Example: console.log('WhatsApp clicked:', this.textContent.trim());
            
            // If it's a product card, log the product name
            const productCard = this.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h3')?.textContent || 'Unknown Product';
                console.log(`📱 WhatsApp Order: ${productName}`);
            }
        });
    });

    // ========================================
    // 9. KEYBOARD NAVIGATION SUPPORT
    // ========================================
    // Add keyboard support for buttons
    document.querySelectorAll('.filter-btn, .btn-primary, .btn-secondary, .btn-whatsapp').forEach(button => {
        if (button.getAttribute('role') !== 'button') {
            button.setAttribute('role', 'button');
        }
    });

    // ========================================
    // 10. CONSOLE GREET
    // ========================================
    console.log('✨ Dreamy Scrunch — Handmade with love ✨');
    console.log('📸 Instagram: @dreamyscrunch');
    console.log('📧 Email: dreamyscrunch@gmail.com');
    console.log('💬 WhatsApp: +91 99999 99999');

}); // End DOMContentLoaded
