// Servicios para mostrar en la página
const services = [
  {
    icon: '../../assets/icons/img/inicio.png',
    title: 'Bodas',
    desc: 'Haz realidad la boda de tus sueños con ambientación, decoración, música y coordinación total. Cada detalle, único y especial.',
    ejemplos: 'Ver ejemplos',
    link: '../Catalog/catalog.html'
  },
  {
    icon: '../../assets/icons/img/inicio.png',
    title: 'Eventos Corporativos',
    desc: 'Organiza congresos, lanzamientos y reuniones con un toque elegante y profesional. Imagen y experiencia que marcan diferencia.',
    ejemplos: 'Ver ejemplos',
    link: '../Catalog/catalog.html'
  },
  {
    icon: '../../assets/icons/img/inicio.png',
    title: 'Fiesta de Cumpleaños',
    desc: 'Celebra cumpleaños para grandes y pequeños, con temáticas, animación y detalles personalizados para una fiesta única.',
    ejemplos: 'Ver ejemplos',
    link: '../Catalog/catalog.html'
  },
  {
    icon: '../../assets/icons/img/inicio.png',
    title: 'Aniversarios',
    desc: 'Celebra los años juntos con organización, decoración y momentos inolvidables. Creamos recuerdos para toda la vida.',
    ejemplos: 'Ver ejemplos',
    link: '../Catalog/catalog.html'
  },
  {
    icon: '../../assets/icons/img/inicio.png',
    title: 'Baby Showers',
    desc: 'Organizamos baby showers originales, divertidos y emotivos. Decoración, juegos y detalles para recibir al nuevo integrante.',
    ejemplos: 'Ver ejemplos',
    link: '../Catalog/catalog.html'
  },
  {
    icon: '../../assets/icons/img/inicio.png',
    title: 'Eventos Especiales',
    desc: 'Desde fiestas temáticas hasta galas y recepciones. Nos adaptamos a cualquier idea para hacerla realidad.',
    ejemplos: 'Ver ejemplos',
    link: '../Catalog/catalog.html'
  }
];

function renderServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = '';
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <img src="${service.icon}" alt="${service.title}" class="service-icon" />
      <h3 class="service-title">${service.title}</h3>
      <p class="service-desc">${service.desc}</p>
      <div class="service-links">
        <span class="service-link" onclick="window.location.href='${service.link}'">${service.ejemplos}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.onload = () => {
  renderServices();
};
