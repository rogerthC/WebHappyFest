// Testimonios destacados (slider)
const testimonios = [
    {
        nombre: "Sofía Martínez",
        rol: "Novia feliz",
        texto: "¡La boda fue un sueño! El equipo de HappyFest cuidó cada detalle y superó nuestras expectativas.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        estrellas: 5
    },
    {
        nombre: "Carlos Rodríguez",
        rol: "Director de empresa",
        texto: "Nuestro evento corporativo fue impecable. Puntualidad, profesionalismo y creatividad.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        estrellas: 5
    },
    {
        nombre: "Ana López",
        rol: "Cumpleañera",
        texto: "Mi fiesta de cumpleaños fue mágica. ¡Gracias por hacerme sentir tan especial!",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        estrellas: 5
    }
];

let testimonioActual = 0;

function renderizarTestimonios() {
    const slider = document.getElementById('testimonials-slider');
    slider.innerHTML = '';
    const t = testimonios[testimonioActual];
    slider.innerHTML = `
        <div class="testimonial-card">
            <img src="${t.avatar}" alt="${t.nombre}" class="testimonial-avatar">
            <div class="testimonial-name">${t.nombre}</div>
            <div class="testimonial-role">${t.rol}</div>
            <div class="testimonial-text">${t.texto}</div>
            <div class="testimonial-stars">${'★'.repeat(t.estrellas)}${'☆'.repeat(5-t.estrellas)}</div>
        </div>
    `;
}

document.getElementById('prev-testimonial').onclick = function() {
    testimonioActual = (testimonioActual - 1 + testimonios.length) % testimonios.length;
    renderizarTestimonios();
};
document.getElementById('next-testimonial').onclick = function() {
    testimonioActual = (testimonioActual + 1) % testimonios.length;
    renderizarTestimonios();
};

// Experiencias de clientes
const experiencias = [
    {
        titulo: "Boda El Recuerdo",
        texto: "El equipo de HappyFest se encargó de todo. Fue un día inolvidable, la decoración y la organización fueron perfectas.",
        imagen: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        estrellas: 5
    },
    {
        titulo: "Evento Corporativo Único",
        texto: "La logística y el ambiente profesional hicieron que nuestro evento fuera un éxito total.",
        imagen: "https://images.unsplash.com/photo-1515168833906-d2a3b82b3027?auto=format&fit=crop&w=400&q=80",
        estrellas: 5
    },
    {
        titulo: "Aniversario Memorable",
        texto: "Celebramos nuestro aniversario y todo salió mejor de lo esperado. ¡Gracias HappyFest!",
        imagen: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        estrellas: 5
    },
    {
        titulo: "Fiesta Temática Inolvidable",
        texto: "La creatividad y el entusiasmo del equipo hicieron que la fiesta fuera única.",
        imagen: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
        estrellas: 5
    }
];

function renderizarExperiencias() {
    const grid = document.getElementById('experiences-grid');
    grid.innerHTML = '';
    experiencias.forEach(exp => {
        grid.innerHTML += `
            <div class="experience-card">
                <div class="experience-title">${exp.titulo}</div>
                <div class="experience-text">${exp.texto}</div>
                <img src="${exp.imagen}" alt="${exp.titulo}" class="experience-img">
                <div class="experience-stars">${'★'.repeat(exp.estrellas)}${'☆'.repeat(5-exp.estrellas)}</div>
            </div>
        `;
    });
}

// Citas de clientes
const citas = [
    { texto: "¡Magia en cada detalle!", autor: "Lucía Herrera" },
    { texto: "Superaron mis expectativas en todo momento.", autor: "Raúl Jiménez" },
    { texto: "Puntualidad, calidad y calidez.", autor: "Patricia Salinas" },
    { texto: "Sin duda, los volvería a elegir.", autor: "Marcos Díaz" }
];

function renderizarCitas() {
    const grid = document.getElementById('quotes-grid');
    grid.innerHTML = '';
    citas.forEach(cita => {
        grid.innerHTML += `
            <div class="quote-card">
                <div>“${cita.texto}”</div>
                <div style="font-size:0.95rem;color:#888;margin-top:8px;">- ${cita.autor}</div>
            </div>
        `;
    });
}

// Inicializar todo
renderizarTestimonios();
renderizarExperiencias();
renderizarCitas();
