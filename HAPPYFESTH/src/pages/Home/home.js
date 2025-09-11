// home.js

// --- Contenido estático ---
const testimonials = [
    {
        text: 'Happy Fest hizo de nuestra boda un sueño hecho realidad. Cada detalle fue perfecto y nuestros invitados quedaron maravillados con la decoración y el servicio.',
        name: 'Carolina Mendoza',
        meta: 'Boda, Marzo 2023',
        img: '../../assets/icons/img/testimonios/bodarecuerdo.jpeg',
        stars: 5
    },
    {
        text: 'Contratamos sus servicios para un evento corporativo y superaron nuestras expectativas. Profesionales, creativos y con una atención al cliente excepcional.',
        name: 'Ricardo Fuentes',
        meta: 'Evento Corporativo, Junio 2023',
        img: '../../assets/icons/img/testimonios/corporativo.jpeg',
        stars: 5
    },
    {
        text: 'La fiesta de cumpleaños que organizaron para mi hijo fue mágica. Se encargaron de todo y pudimos disfrutar sin preocupaciones. ¡Volveremos a contratarlos!',
        name: 'Alejandra Vega',
        meta: 'Cumpleaños, Mayo 2023',
        img: '../../assets/icons/img/testimonios/aviversario.jpeg',
        stars: 5
    },
    {
        text: '¡Increíble servicio! La atención al detalle es impecable. Nuestra celebración fue un éxito gracias a su equipo. ¡Muy recomendados!',
        name: 'Ana García',
        meta: 'Aniversario, Enero 2023',
        img: '../../assets/icons/img/testimonios/tematica.jpeg',
        stars: 5
    }
];

// Imágenes del hero (asegúrate de que existan en la carpeta assets)
const heroImages = [
    '../../assets/icons/img/inicio.png',
    '../../assets/icons/img/boda/boda2.png',
    '../../assets/icons/img/especial/especial1.png'
];

// --- Funciones para la interactividad ---

// Carrusel de Testimonios
let currentTestimonialIndex = 0;
let autoSlideInterval = null;
const testimonialsSlider = document.getElementById('testimonials-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
        <div class="testimonial-stars">${'★'.repeat(testimonial.stars)}${'☆'.repeat(5-testimonial.stars)}</div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <div class="testimonial-user">
            <img src="${testimonial.img}" class="testimonial-user-img" alt="Foto de ${testimonial.name}" />
            <div class="testimonial-user-info">
                <span class="testimonial-user-name">${testimonial.name}</span>
                <span class="testimonial-user-meta">${testimonial.meta}</span>
            </div>
        </div>
    `;
    return card;
}

function renderTestimonials() {
    if (!testimonialsSlider) return;
    testimonialsSlider.innerHTML = '';
    testimonials.forEach((t) => {
        const card = createTestimonialCard(t);
        testimonialsSlider.appendChild(card);
    });
    updateSliderPosition(); // Asegura la posición inicial
}

function updateSliderPosition() {
    if (!testimonialsSlider || testimonials.length === 0) return;
    const card = testimonialsSlider.querySelector('.testimonial-card');
    if (!card) return;
    const style = getComputedStyle(card);
    const gap = 24; // coincide con CSS
    const cardWidth = card.offsetWidth + gap;
    testimonialsSlider.scrollTo({ left: currentTestimonialIndex * cardWidth, behavior: 'smooth' });
}

function resetTimer() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateSliderPosition();
    }, 4500);
}

if (testimonialsSlider && prevBtn && nextBtn) {
    renderTestimonials();
    resetTimer();

    prevBtn.addEventListener('click', () => {
        currentTestimonialIndex = Math.max(0, currentTestimonialIndex - 1);
        updateSliderPosition();
        resetTimer();
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateSliderPosition();
        resetTimer();
    });

    window.addEventListener('resize', updateSliderPosition);

    testimonialsSlider.addEventListener('mouseenter', () => { if (autoSlideInterval) clearInterval(autoSlideInterval); });
    testimonialsSlider.addEventListener('mouseleave', resetTimer);
}

// Rotación del fondo del Hero Section con crossfade
function startHeroRotation() {
    const heroBg = document.getElementById('hero-bg');
    if (!heroBg || heroImages.length === 0) return;

    // Preload
    heroImages.forEach(src => { const i = new Image(); i.src = src; });

    let heroIndex = 0;
    heroBg.style.transition = 'opacity 0.6s ease-in-out, transform 6s linear';
    heroBg.style.opacity = 0;

    function changeImage() {
        heroBg.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
        heroBg.style.transform = 'scale(1.03)';
        setTimeout(() => {
            heroBg.style.opacity = 1;
            heroBg.style.transform = 'scale(1)';
        }, 60);
        heroIndex = (heroIndex + 1) % heroImages.length;
    }

    changeImage();
    setInterval(() => {
        heroBg.style.opacity = 0;
        setTimeout(changeImage, 500);
    }, 5200);
}

// Animación de elementos al hacer scroll
function setupScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// Control del Header al hacer scroll
function setupHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

// Inicio de la aplicación al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    startHeroRotation();
    setupScrollAnimations();
    setupHeaderScroll();
    updateSliderPosition();

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por contactarnos! Pronto te responderemos.');
            form.reset();
        });
    }
});