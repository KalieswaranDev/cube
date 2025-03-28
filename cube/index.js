document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const toggleMobileMenu = () => {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) mobileNav.classList.toggle('active');
    };

    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) mobileMenu.addEventListener('click', toggleMobileMenu);

    // Submenu toggle for mobile
    document.querySelectorAll('.with-submenu').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileNav = document.getElementById('mobileNav');
        const isClickInside = document.querySelector('.mobile-menu')?.contains(e.target);
        
        if (mobileNav && !isClickInside && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    });

    // Smooth scroll for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animate on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Guarantee section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.guarantee-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(item);
    });

    // Hero section 2
    const observerOptions = { threshold: 0.3 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target.querySelector('.hero2-image-container');
                const content = entry.target.querySelector('.hero2-content');
                const button = entry.target.querySelector('.hero2-cta');
                
                if (image) image.classList.add('active');
                if (content) content.classList.add('active');
                if (button) {
                    setTimeout(() => {
                        button.style.transform = 'translateY(0)';
                    }, 500);
                }
            }
        });
    }, observerOptions);

    const section = document.querySelector('.hero-section2');
    if (section) sectionObserver.observe(section);

    // CTA button hover
    const ctaButton = document.querySelector('.hero2-cta');
    if (ctaButton) {
        ctaButton.addEventListener('mouseover', () => {
            ctaButton.style.transform = 'translateY(-3px)';
        });
        ctaButton.addEventListener('mouseout', () => {
            ctaButton.style.transform = 'translateY(0)';
        });
    }

    // Testimonial slider
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    if (slider && cards.length) {
        let currentIndex = 0;
        const totalSlides = cards.length;

        function getVisibleSlides() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            return 3;
        }

        let visibleSlides = getVisibleSlides();
        let totalPositions = totalSlides - visibleSlides + 1;

        function updateSlider() {
            const cardWidth = 100 / visibleSlides;
            const offset = currentIndex * cardWidth;
            slider.style.transform = `translateX(-${offset}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        }

        window.addEventListener('resize', () => {
            const newVisibleSlides = getVisibleSlides();
            if (newVisibleSlides !== visibleSlides) {
                visibleSlides = newVisibleSlides;
                totalPositions = totalSlides - visibleSlides + 1;
                currentIndex = Math.min(currentIndex, totalPositions - 1);
                updateSlider();
            }
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalPositions - 1) {
                    currentIndex++;
                    updateSlider();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        updateSlider();
    }

    // FAQ
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const toggleBtn = item.querySelector('.toggle-btn');

            if (answer && toggleBtn) {
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    toggleBtn.classList.remove('active');
                } else {
                    document.querySelectorAll('.faq-answer').forEach(ans => {
                        ans.style.maxHeight = null;
                        ans.previousElementSibling.querySelector('.toggle-btn')?.classList.remove('active');
                    });
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggleBtn.classList.add('active');
                }
            }
        });
    });

    // Product section
    const images = [
        "./assets/Productimage/P-green.webp",
        "./assets/Productimage/p-main.png",
        "./assets/Productimage/P-white.webp",
        "./assets/Productimage/p-brown.webp"
    ];

    const mainImage = document.getElementById("mainImage");
    const dotsContainer = document.getElementById("dotsContainer");
    const thumbnails = document.querySelectorAll(".product-additional-image");

    if (mainImage && dotsContainer) {
        let currentIndex = 0;

        images.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("product-dot");
            if (index === 0) dot.classList.add("product-active");
            dot.addEventListener("click", () => setImage(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".product-dot");

        function updateGallery() {
            mainImage.classList.add("fade");
            setTimeout(() => {
                mainImage.src = images[currentIndex];
                mainImage.classList.remove("fade");
            }, 200);
            dots.forEach((dot, index) => dot.classList.toggle("product-active", index === currentIndex));
            thumbnails.forEach((thumbnail, index) => thumbnail.classList.toggle("product-active", index === currentIndex));
        }

        function changeImage(direction) {
            currentIndex = (currentIndex + direction + images.length) % images.length;
            updateGallery();
        }

        function setImage(index) {
            currentIndex = index;
            updateGallery();
        }

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener("click", () => setImage(index));
        });

        function updateCartLink() {
            const flavor = document.querySelector('input[name="flavor"]:checked')?.value;
            const subscription = document.querySelector('input[name="subscription"]:checked')?.value;
            const addToCartLink = document.getElementById("addToCartLink");

            if (flavor && subscription && addToCartLink) {
                const cartLinks = {
                    "original-single-kit": "https://shop.example.com/cart?item=alcami-original-single",
                    "original-double-kit": "https://shop.example.com/cart?item=alcami-original-double",
                    "original-try-once": "https://shop.example.com/cart?item=alcami-original-once",
                    "matcha-single-kit": "https://shop.example.com/cart?item=alcami-matcha-single",
                    "matcha-double-kit": "https://shop.example.com/cart?item=alcami-matcha-double",
                    "matcha-try-once": "https://shop.example.com/cart?item=alcami-matcha-once",
                    "cacao-single-kit": "https://shop.example.com/cart?item=alcami-cacao-single",
                    "cacao-double-kit": "https://shop.example.com/cart?item=alcami-cacao-double",
                    "cacao-try-once": "https://shop.example.com/cart?item=alcami-cacao-once"
                };
                const key = `${flavor}-${subscription}`;
                addToCartLink.href = cartLinks[key] || "https://shop.example.com/cart?item=alcami-original-single";
            }
        }

        updateGallery();
        updateCartLink();
    }

    // Comparison table
    const headers = ['BENEFITS', 'ALCAMI', 'MUD/WTR', 'RYZE', 'EVERYDAY DOSE'];
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
            cell.setAttribute('data-label', headers[index]);
        });
    });
});

// seach

