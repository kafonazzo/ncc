document.addEventListener("DOMContentLoaded", () => {
    // ============================
    // NAVBAR: nasconde/mostra su scroll
    // ============================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 50) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = Math.max(scrollTop, 0);
        });
    }

    // ============================
    // MENU MOBILE: toggle animato
    // ============================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // ============================
    // COOKIE BANNER
    // ============================
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (banner && acceptBtn) {
        if (localStorage.getItem('cookieAccepted') !== 'true') {
            banner.style.display = 'flex';
            setTimeout(() => banner.classList.add('show'), 100);

            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookieAccepted', 'true');
                banner.classList.remove('show');
                setTimeout(() => banner.style.display = 'none', 500);
            });
        } else {
            banner.style.display = 'none';
        }
    }

    // ============================
    // BODY LOADED CLASS (per animazioni eventuali)
    // ============================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ============================
    // CAROSELLO PRINCIPALE (slide con classe .slide)
    // ============================
    const mainSlides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    const slideInterval = 2500;

    function showSlide(index) {
        mainSlides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % mainSlides.length;
        showSlide(currentSlide);
    }

    if (mainSlides.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, slideInterval);
    }

    // ============================
    // CAROSELLO AMALFI COAST (carousel-amalfi)
    // ============================
    document.querySelectorAll(".carousel-amalfi").forEach(carousel => {
        const track = carousel.querySelector(".carousel-amalfi-track");
        if (!track) return;

        const amalfiSlides = Array.from(track.querySelectorAll(".carousel-amalfi-slide"));
        if (amalfiSlides.length === 0) return;

        const prevBtn = carousel.querySelector(".carousel-amalfi-btn.prev");
        const nextBtn = carousel.querySelector(".carousel-amalfi-btn.next");
        let index = 0;
        const autoplayInterval = 3000; // 3 secondi
        let autoplayTimer;

        // Imposta larghezza slide al resize
        function setSlideWidths() {
            const slideWidth = carousel.clientWidth;
            amalfiSlides.forEach(slide => slide.style.width = `${slideWidth}px`);
            updateCarousel();
        }

        window.addEventListener("resize", setSlideWidths);
        setSlideWidths();

        // Aggiorna carosello
        function updateCarousel() {
            const slideWidth = amalfiSlides[0].clientWidth;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        // Pulsanti
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                index = (index + 1) % amalfiSlides.length;
                updateCarousel();
                resetAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                index = (index - 1 + amalfiSlides.length) % amalfiSlides.length;
                updateCarousel();
                resetAutoplay();
            });
        }

        // Swipe touch per mobile
        let startX = 0;
        track.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            pauseAutoplay();
        });

        track.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (diff > 50) { // swipe sinistra
                index = (index + 1) % amalfiSlides.length;
                updateCarousel();
            } else if (diff < -50) { // swipe destra
                index = (index - 1 + amalfiSlides.length) % amalfiSlides.length;
                updateCarousel();
            }
            startAutoplay();
        });

        // Autoplay
        function startAutoplay() {
            autoplayTimer = setInterval(() => {
                index = (index + 1) % amalfiSlides.length;
                updateCarousel();
            }, autoplayInterval);
        }

        function pauseAutoplay() {
            clearInterval(autoplayTimer);
        }

        function resetAutoplay() {
            pauseAutoplay();
            startAutoplay();
        }

        // Pausa autoplay al mouse hover (desktop)
        carousel.addEventListener("mouseenter", pauseAutoplay);
        carousel.addEventListener("mouseleave", startAutoplay);

        // Avvia autoplay
        startAutoplay();
    });

    document.querySelectorAll(".carousel-inversa").forEach(carousel => {
        const track = carousel.querySelector(".carousel-inversa-track");
        if (!track) return;

        const slides = Array.from(track.querySelectorAll(".carousel-inversa-slide"));
        if (slides.length === 0) return;

        const prevBtn = carousel.querySelector(".carousel-inversa-btn.prev");
        const nextBtn = carousel.querySelector(".carousel-inversa-btn.next");
        let index = 0;
        const autoplayInterval = 3000; // 3 secondi
        let autoplayTimer;

        // Imposta larghezza slide al resize
        function setSlideWidths() {
            const slideWidth = carousel.clientWidth;
            slides.forEach(slide => slide.style.width = `${slideWidth}px`);
            updateCarousel();
        }

        window.addEventListener("resize", setSlideWidths);
        setSlideWidths();

        // Aggiorna carosello
        function updateCarousel() {
            const slideWidth = slides[0].clientWidth;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        // Pulsanti
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                index = (index + 1) % slides.length;
                updateCarousel();
                resetAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                index = (index - 1 + slides.length) % slides.length;
                updateCarousel();
                resetAutoplay();
            });
        }

        // Swipe touch per mobile
        let startX = 0;
        track.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            pauseAutoplay();
        });

        track.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (diff > 50) index = (index + 1) % slides.length;
            else if (diff < -50) index = (index - 1 + slides.length) % slides.length;

            updateCarousel();
            startAutoplay();
        });

        // Autoplay
        function startAutoplay() {
            autoplayTimer = setInterval(() => {
                index = (index + 1) % slides.length;
                updateCarousel();
            }, autoplayInterval);
        }

        function pauseAutoplay() {
            clearInterval(autoplayTimer);
        }

        function resetAutoplay() {
            pauseAutoplay();
            startAutoplay();
        }

        // Pausa autoplay al mouse hover (desktop)
        carousel.addEventListener("mouseenter", pauseAutoplay);
        carousel.addEventListener("mouseleave", startAutoplay);

        // Avvia autoplay
        startAutoplay();
    });
});