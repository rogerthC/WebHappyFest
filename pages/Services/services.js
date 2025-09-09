// Servicios para mostrar en la página
const services = [
  {
    images: [
      '../../assets/icons/img/boda/boda1.png',
      '../../assets/icons/img/boda/boda2.png',
      '../../assets/icons/img/boda/boda3.png'
    ],
    title: 'Bodas',
    desc: 'Haz realidad la boda de tus sueños con ambientación, decoración, música y coordinación total. Cada detalle, único y especial.',
    link: '../Catalog/catalog.html'
  },
  {
    images: [
      '../../assets/icons/img/corporativo/corporativo1.png',
      '../../assets/icons/img/corporativo/corporativo2.png',
      '../../assets/icons/img/corporativo/corporativo3.png'
    ],
    title: 'Eventos Corporativos',
    desc: 'Organiza congresos, lanzamientos y reuniones con un toque elegante y profesional. Imagen y experiencia que marcan diferencia.',
    link: '../Catalog/catalog.html'
  },
  {
    images: [
      '../../assets/icons/img/cumpleaños/cumpleaños1.png',
      '../../assets/icons/img/cumpleaños/cumpleaños2.png',
      '../../assets/icons/img/cumpleaños/cumpleaños3.png'
    ],
    title: 'Fiesta de Cumpleaños',
    desc: 'Celebra cumpleaños para grandes y pequeños, con temáticas, animación y detalles personalizados para una fiesta única.',
    link: '../Catalog/catalog.html'
  },
  {
    images: [
      '../../assets/icons/img/aniversario/aniversario1.png',
      '../../assets/icons/img/aniversario/aniversario2.png',
      '../../assets/icons/img/aniversario/aniversario3.png'
    ],
    title: 'Aniversarios',
    desc: 'Celebra los años juntos con organización, decoración y momentos inolvidables. Creamos recuerdos para toda la vida.',
    link: '../Catalog/catalog.html'
  },
  {
    images: [
      '../../assets/icons/img/babyshower/babyshower1.png',
      '../../assets/icons/img/babyshower/babyshower2.png',
      '../../assets/icons/img/babyshower/babyshower3.png'
    ],
    title: 'Baby Showers',
    desc: 'Organizamos baby showers originales, divertidos y emotivos. Decoración, juegos y detalles para recibir al nuevo integrante.',
    link: '../Catalog/catalog.html'
  },
  {
    images: [
      '../../assets/icons/img/especial/especial1.png',
      '../../assets/icons/img/especial/especial2.png',
      '../../assets/icons/img/especial/especial3.png'
    ],
    title: 'Eventos Especiales',
    desc: 'Desde fiestas temáticas hasta galas y recepciones. Nos adaptamos a cualquier idea para hacerla realidad.',
    link: '../Catalog/catalog.html'
  }
];

function renderServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = '';
  services.forEach((service, idx) => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="carousel" id="carousel-${idx}">
        <img src="${service.images[0]}" class="carousel-img" />
      </div>
      <h3 class="service-title">${service.title}</h3>
      <p class="service-desc">${service.desc}</p>
    `;
    grid.appendChild(card);
  });
}

window.onload = () => {
  renderServices();
  initCarousels();
};

function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel, idx) => {
    let current = 0;
    const imgs = services[idx].images;
    const imgTag = carousel.querySelector('.carousel-img');
    setInterval(() => {
      current = (current + 1) % imgs.length;
      imgTag.src = imgs[current];
    }, 2500); // Cambia cada 2.5 segundos
  });
}
