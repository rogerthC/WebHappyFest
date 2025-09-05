// Datos de ejemplo para eventos
const eventos = [
    {
        id: 1,
        titulo: "Cumpleaños Infantiles/Juveniles",
        descripcion: "Fiestas llenas de diversión, juegos y sorpresas para todas las edades. Hacemos de su día algo inolvidable.",
        imagen: "../../assets/icons/img/catalog/cumpleaños.png", // CAMBIAR IMAGEN
        categoria: "cumpleaños",
        tags: ["Infantil", "Juvenil"],
        precios: [
            { nombre: "Paquete Básico", precio: "Consultar" },
            { nombre: "Paquete Premium", precio: "Consultar" }
        ]
    },
    {
        id: 2,
        titulo: "Bodas y Aniversarios",
        descripcion: "Celebra el amor con una boda de ensueño o un aniversario memorable. Cuidamos cada detalle para que sea perfecto.",
        imagen: "../../assets/icons/img/catalog/bodas.png", // CAMBIAR IMAGEN
        categoria: "bodas",
        tags: ["Boda", "Aniversario"],
        precios: [
            { nombre: "Boda Íntima", precio: "Consultar" },
            { nombre: "Gran Celebración", precio: "Consultar" }
        ]
    },
    {
        id: 3,
        titulo: "Bautizos y Primeras Comuniones",
        descripcion: "Organizamos celebraciones familiares llenas de significado y alegría para un día tan especial y emotivo.",
        imagen: "../../assets/icons/img/catalog/bautizo.png", // CAMBIAR IMAGEN
        categoria: "aniversarios", // Usamos 'aniversarios' para otras celebraciones
        tags: ["Familiar", "Religioso"],
        precios: [
            { nombre: "Recepción", precio: "Consultar" }
        ]
    },
    {
        id: 4,
        titulo: "Graduaciones y Fiestas de Promoción",
        descripcion: "Festeja el fin de una etapa y el comienzo de un nuevo futuro con una fiesta de graduación espectacular.",
        imagen: "../../assets/icons/img/catalog/graduacion.png", // CAMBIAR IMAGEN
        categoria: "corporativos", // Usamos 'corporativos' para eventos formales
        tags: ["Graduación", "Promoción"],
        precios: [
            { nombre: "Paquete Graduado", precio: "Consultar" }
        ]
    },
    {
        id: 5,
        titulo: "Eventos Empresariales/Corporativos",
        descripcion: "Desde conferencias hasta galas. Proyecta la mejor imagen de tu empresa con un evento profesional e impecable.",
        imagen: "../../assets/icons/img/catalog/corporativo.png", // CAMBIAR IMAGEN
        categoria: "corporativos",
        tags: ["Empresarial", "Networking"],
        precios: [
            { nombre: "Media Jornada", precio: "Consultar" },
            { nombre: "Jornada Completa", precio: "Consultar" }
        ]
    },
    {
        id: 6,
        titulo: "Baby Showers y Despedidas",
        descripcion: "Celebra la llegada de un nuevo miembro a la familia o el fin de la soltería con una fiesta única y divertida.",
        imagen: "../../assets/icons/img/catalog/babyshower.png", // CAMBIAR IMAGEN
        categoria: "cumpleaños", // Usamos 'cumpleaños' para fiestas personales
        tags: ["Baby Shower", "Despedida"],
        precios: [
            { nombre: "Paquete Celebración", precio: "Consultar" }
        ]
    },
    {
        id: 7,
        titulo: "Fiestas Temáticas",
        descripcion: "Halloween, Navidad, Año Nuevo... ¡La temática la pones tú! Nosotros creamos la atmósfera perfecta.",
        imagen: "../../assets/icons/img/placeholder-tematica.jpg", // CAMBIAR IMAGEN
        categoria: "cumpleaños",
        tags: ["Halloween", "Navidad"],
        precios: [
            { nombre: "Fiesta Temática", precio: "Consultar" }
        ]
    },
    {
        id: 8,
        titulo: "Reuniones Privadas y Cenas Familiares",
        descripcion: "Organizamos encuentros íntimos y cenas especiales con un ambiente acogedor y menús personalizados.",
        imagen: "../../assets/icons/img/placeholder-cena.jpg", // CAMBIAR IMAGEN
        categoria: "aniversarios",
        tags: ["Privado", "Cena"],
        precios: [
            { nombre: "Cena Privada", precio: "Consultar" }
        ]
    }
];

const eventosPorPagina = 8; // Ajustado para mostrar todos los eventos
let paginaActual = 1;
let categoriaActual = "todos";
let ordenActual = "recientes";

function filtrarEventos() {
    let filtrados = eventos;
    if (categoriaActual !== "todos") {
        filtrados = filtrados.filter(e => e.categoria === categoriaActual);
    }
    // Ordenamiento (simulado)
    if (ordenActual === "populares") {
        filtrados = filtrados.slice().reverse();
    }
    return filtrados;
}

function renderizarEventos() {
    const grid = document.getElementById("events-grid");
    grid.innerHTML = "";
    const filtrados = filtrarEventos();
    
    // Ocultar paginación si no es necesaria
    const paginacion = document.querySelector('.pagination');
    const totalPaginas = Math.ceil(filtrados.length / eventosPorPagina);
    if (totalPaginas <= 1) {
        paginacion.style.display = 'none';
    } else {
        paginacion.style.display = 'flex';
    }

    const inicio = (paginaActual - 1) * eventosPorPagina;
    const fin = inicio + eventosPorPagina;
    const eventosPagina = filtrados.slice(inicio, fin);
    eventosPagina.forEach(evento => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
            <img src="${evento.imagen}" alt="${evento.titulo}" class="event-img">
            <div class="event-content">
                <div class="event-title">${evento.titulo}</div>
                <div class="event-desc">${evento.descripcion}</div>
                <div class="event-tags">
                    ${evento.tags.map(tag => `<span class=\"event-tag\">${tag}</span>`).join("")}
                </div>
                <div class="event-actions">
                    <a href="#" class="ver-detalles-btn" data-id="${evento.id}">Ver detalles</a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    document.getElementById("page-info").textContent = `${paginaActual} / ${Math.max(1, totalPaginas)}`;
    document.getElementById("prev-page").disabled = paginaActual === 1;
    document.getElementById("next-page").disabled = paginaActual >= totalPaginas;

    // Asignar eventos a los botones "Ver detalles"
    document.querySelectorAll('.ver-detalles-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.dataset.id);
            mostrarModalDetalles(id);
        });
    });
}

// Filtros de categoría
const categoryBtns = document.querySelectorAll(".category");
categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        categoriaActual = btn.dataset.category;
        paginaActual = 1;
        renderizarEventos();
    });
});

// Ordenamiento
const orderSelect = document.getElementById("order-select");
orderSelect.addEventListener("change", () => {
    ordenActual = orderSelect.value;
    paginaActual = 1;
    renderizarEventos();
});

// Paginación
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");
prevBtn.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        renderizarEventos();
    }
});
nextBtn.addEventListener("click", () => {
    const filtrados = filtrarEventos();
    const totalPaginas = Math.ceil(filtrados.length / eventosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizarEventos();
    }
});


// Modal de detalles
const modal = document.getElementById('modal-detalles');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalPrecios = document.getElementById('modal-precios');

function mostrarModalDetalles(id) {
    const evento = eventos.find(e => e.id === id);
    if (!evento) return;
    modalTitle.textContent = evento.titulo;
    if (evento.precios && evento.precios.length > 0) {
        modalPrecios.innerHTML = evento.precios.map(p => `<div><strong>${p.nombre}:</strong> ${p.precio}</div>`).join('');
    } else {
        modalPrecios.innerHTML = '<div>No hay precios disponibles.</div>';
    }
    modal.style.display = 'block';
}

closeModal.onclick = function() {
    modal.style.display = 'none';
};
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Inicializar
renderizarEventos();
