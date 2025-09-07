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
        // Controlla se il consenso è già stato dato
        if (localStorage.getItem('cookieAccepted') !== 'true') {
            // Mostra banner con animazione
            banner.style.display = 'flex';
            setTimeout(() => banner.classList.add('show'), 100);

            // Al click salva consenso e nasconde banner
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookieAccepted', 'true');
                banner.classList.remove('show');
                setTimeout(() => banner.style.display = 'none', 500);
            });
        } else {
            // Se accettato, assicurati che il banner sia nascosto
            banner.style.display = 'none';
        }
    }

    // ============================
    // MAPPA (opzionale: attiva solo se esiste l’elemento)
    // ============================
    /*
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([44.42850, 8.74959], 18);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([44.42850, 8.74959]).addTo(map)
            .bindPopup('Ferramenta Luxardo<br>Via Carlo Camozzini 51/R, Voltri, Genova')
            .openPopup();
    }
    */

    // ============================
    // BODY LOADED CLASS (per animazioni eventuali)
    // ============================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // === CAROSELLO ===
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;
        const slideInterval = 2500;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        if (slides.length > 0) {
            showSlide(currentSlide);
            setInterval(nextSlide, slideInterval);
        }

    });
});