// main.js - Inserta componentes y lógica básica

// Utilidad para cargar un componente HTML
async function loadComponent(path) {
  const res = await fetch(path);
  return await res.text();
}

// Inserta header y footer en todas las páginas
async function insertHeaderFooter() {
  const header = await loadComponent('../organisms/header.html');
  const footer = await loadComponent('../organisms/footer.html');
  document.getElementById('header-placeholder').innerHTML = header;
  document.getElementById('footer-placeholder').innerHTML = footer;
}

// Inserta formulario de contacto en index.html
async function insertContactForm() {
  const form = `<form id='contact-form' style='max-width:500px;margin:auto;'>
    <input type='text' class='input' placeholder='Nombre' required>
    <input type='email' class='input' placeholder='Correo electrónico' required>
    <input type='text' class='input' placeholder='Asunto' required>
    <textarea class='input' placeholder='Mensaje' rows='5' required></textarea>
    <button class='btn' type='submit'>Enviar</button>
  </form>`;
  const el = document.getElementById('contact-form-placeholder');
  if (el) el.innerHTML = form;
}

// Inicialización
// Renderiza cards de servicios
async function renderServices() {
  const container = document.getElementById('services-cards');
  if (!container) return;
  let html = '';
  for (let i = 0; i < 3; i++) {
    html += `<div class='card card-image-text' style='flex:1 1 250px;min-width:250px;'>
      <img src='https://placehold.co/300x200?text=Servicio+${i+1}' alt='Servicio ${i+1}' class='image'>
      <h3 class='heading'>Servicio ${i+1}</h3>
      <p>Descripción breve del servicio ${i+1}.</p>
    </div>`;
  }
  container.innerHTML = html;
}

// Renderiza cards de catálogo
async function renderCatalog() {
  const container = document.getElementById('catalog-cards');
  if (!container) return;
  let html = '';
  for (let i = 0; i < 3; i++) {
    html += `<div class='product-card card' style='flex:1 1 250px;min-width:250px;'>
      <img src='https://placehold.co/300x200?text=Evento+${i+1}' alt='Evento ${i+1}' class='image'>
      <h3 class='heading'>Evento ${i+1}</h3>
      <p>Descripción del evento ${i+1}.</p>
      <button class='btn'>Ver más</button>
    </div>`;
  }
  container.innerHTML = html;
}

// Renderiza cards de testimonios
async function renderReviews() {
  const container = document.getElementById('reviews-cards');
  if (!container) return;
  let html = '';
  for (let i = 0; i < 2; i++) {
    html += `<div class='card' style='flex:1 1 300px;min-width:300px;'>
      <p>"Excelente servicio, todo salió perfecto."</p>
      <div style='display:flex;align-items:center;gap:0.5em;'>
        <img src='https://placehold.co/48x48' alt='Cliente' style='border-radius:50%;'>
        <span><b>Cliente ${i+1}</b></span>
      </div>
    </div>`;
  }
  container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', async () => {
  await insertHeaderFooter();
  await insertContactForm();
  await renderServices();
  await renderCatalog();
  await renderReviews();
});
