// Datos de ejemplo para eventos
const eventos = [
    {
        id: 1,
        titulo: "Boda Jardín Primaveral",
        descripcion: "Organiza tu celebración al aire libre con la naturaleza como testigo. Decoración floral y ambiente romántico.",
        imagen: "../../assets/icons/img/inicio.png",
        categoria: "bodas",
        tags: ["Hacienda Los Olivos"],
        precios: [
            { nombre: "Básico", precio: "$15,000 MXN" },
            { nombre: "Premium", precio: "$25,000 MXN" }
        ]
    },
    {
        id: 2,
        titulo: "Lanzamiento Tecnológico",
        descripcion: "Presenta tu producto en un montaje profesional con tecnología de punta y networking.",
        imagen: "../../assets/icons/img/inicio.png",
        categoria: "corporativos",
        tags: ["Centro Convenciones"],
        precios: [
            { nombre: "Estándar", precio: "$18,000 MXN" }
        ]
    },
    {
        id: 3,
        titulo: "Cumpleaños Safari",
        descripcion: "Celebra el cumpleaños infantil con decoración de animales y actividades temáticas.",
        imagen: "../../assets/icons/img/inicio.png",
        categoria: "cumpleaños",
        tags: ["Villa Encantada"],
        precios: [
            { nombre: "Infantil", precio: "$8,000 MXN" }
        ]
    },
    {
        id: 4,
        titulo: "Bodas de Plata",
        descripcion: "Celebra tus 25 años de matrimonio con un evento elegante y emotivo.",
        imagen: "../../assets/icons/img/inicio.png",
        categoria: "aniversarios",
        tags: ["Salón Imperial"],
        precios: [
            { nombre: "Celebración", precio: "$12,000 MXN" }
        ]
    },
    {
        id: 5,
        titulo: "Gala Benéfica Anual",
        descripcion: "Evento de recaudación de fondos con ambiente sofisticado y servicio de catering premium.",
        imagen: "../../assets/icons/img/inicio.png",
        categoria: "corporativos",
        tags: ["Palacio de Bellas Artes"],
        precios: [
            { nombre: "Gala", precio: "$30,000 MXN" }
        ]
    },
    {
        id: 6,
        titulo: "Boda Destino Playa",
        descripcion: "Ceremonia frente al mar y fiesta inolvidable en la playa.",
        imagen: "../../assets/icons/img/inicio.png",
        categoria: "bodas",
        tags: ["Playa del Carmen"],
        precios: [
            { nombre: "Playa", precio: "$22,000 MXN" }
        ]
    }
];

const eventosPorPagina = 6;
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
    const totalPaginas = Math.ceil(filtrados.length / eventosPorPagina);
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
    document.getElementById("page-info").textContent = `${paginaActual} / ${totalPaginas}`;
    document.getElementById("prev-page").disabled = paginaActual === 1;
    document.getElementById("next-page").disabled = paginaActual === totalPaginas;

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
