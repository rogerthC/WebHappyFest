// Testimonios dinámicos
const testimonials = [
  {
    text: '"Eventos Elegantes hizo de nuestra boda un sueño hecho realidad. Cada detalle fue perfecto y nuestros invitados quedaron maravillados con la decoración y el servicio."',
    name: 'Carolina Mendoza',
    meta: 'Boda, Marzo 2023',
    img: '../../assets/icons/img/inicio.png',
    stars: 5
  },
  {
    text: '"Contratamos sus servicios para un evento corporativo y superaron nuestras expectativas. Profesionales, creativos y con una atención al cliente excepcional."',
    name: 'Ricardo Fuentes',
    meta: 'Evento Corporativo, Junio 2023',
    img: '../../assets/icons/img/inicio.png',
    stars: 5
  },
  {
    text: '"La fiesta de cumpleaños que organizaron para mi hijo fue mágica. Se encargaron de todo y pudimos disfrutar sin preocupaciones. ¡Volveremos a contratarlos!"',
    name: 'Alejandra Vega',
    meta: 'Cumpleaños, Mayo 2023',
    img: '../../assets/icons/img/inicio.png',
    stars: 5
  }
];

let testimonialIndex = 0;
function renderTestimonials() {
  const slider = document.getElementById('testimonials-slider');
  slider.innerHTML = '';
  // Mostrar 3 testimonios (puedes hacer un slider automático si hay más)
  for (let i = 0; i < 3; i++) {
    const t = testimonials[(testimonialIndex + i) % testimonials.length];
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
      <div class="testimonial-text">${t.text}</div>
      <div class="testimonial-user">
        <img src="${t.img}" class="testimonial-user-img" alt="${t.name}" />
        <div class="testimonial-user-info">
          <span class="testimonial-user-name">${t.name}</span>
          <span class="testimonial-user-meta">${t.meta}</span>
        </div>
      </div>
    `;
    slider.appendChild(card);
  }
}

function startTestimonialSlider() {
  renderTestimonials();
  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonials();
  }, 5000);
}
// Imágenes temáticas para el hero (agrega más imágenes en assets/icons/img/ si lo deseas)
const heroImages = [
  '../../assets/icons/img/inicio.png',
  '../../assets/icons/img/logo.png',
  // Puedes agregar más imágenes aquí
];

let heroIndex = 0;
function setHeroImage(idx) {
  document.getElementById('hero-bg').style.backgroundImage = `url('${heroImages[idx]}')`;
}

function startHeroRotation() {
  setHeroImage(heroIndex);
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    setHeroImage(heroIndex);
  }, 3500);
}

window.onload = () => {
  startHeroRotation();
  startTestimonialSlider();

  // Formulario de contacto interactivo
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('¡Gracias por contactarnos! Pronto te responderemos.');
      form.reset();
    });
  }
};
