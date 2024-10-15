document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 200
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Smooth scrolling para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Efecto parallax para la sección hero
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Animación del header al hacer scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animación de flotación para las imágenes de placeholder
    const placeholders = document.querySelectorAll('.image-placeholder');
    placeholders.forEach(placeholder => {
        placeholder.classList.add('float-animation');
    });

    // Animación de pulso para los botones CTA
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.classList.add('pulse-animation');
    });

    // Animación de entrada para los elementos del equipo
    const teamMembers = document.querySelectorAll('.team-member');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const teamObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(50px)';
        member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        teamObserver.observe(member);
    });

    // Animación de desplazamiento para las tarjetas de oferta educativa
    const cards = document.querySelectorAll('.card');
    window.addEventListener('scroll', () => {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight && cardBottom > 0) {
                const scrollPercent = (windowHeight - cardTop) / windowHeight;
                card.style.transform = `translateX(${(1 - scrollPercent) * 100}px)`;
                card.style.opacity = scrollPercent;
            }
        });
    });

    // Validación del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                alert('Mensaje enviado con éxito!');
                contactForm.reset();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (name.value.trim() === '') {
            isValid = false;
            showError(name, 'Por favor, ingrese su nombre');
        } else {
            removeError(name);
        }

        if (email.value.trim() === '' || !isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Por favor, ingrese un email válido');
        } else {
            removeError(email);
        }

        if (message.value.trim() === '') {
            isValid = false;
            showError(message, 'Por favor, ingrese su mensaje');
        } else {
            removeError(message);
        }

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message');
        if (error) {
            formGroup.removeChild(error);
        }
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});