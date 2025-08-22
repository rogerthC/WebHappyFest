// Cargador de componentes (Atomic Design -> organisms)
(async function loadComponents(){
  const hosts = document.querySelectorAll("[data-component]");
  for (const host of hosts) {
    const url = host.getAttribute("data-component");
    try {
      const res = await fetch(url);
      host.outerHTML = await res.text();
    } catch (e) {
      host.innerHTML = "<p>Error al cargar componente: " + url + "</p>";
    }
  }
})();

// Realza el link activo al hacer scroll
const setActive = () => {
  const ids = ["servicios","catalogo","testimonios","contacto"];
  let current = null;
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) current = id;
  });
  document.querySelectorAll(".nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
};
document.addEventListener("scroll", setActive);
window.addEventListener("load", setActive);

// Suaviza el scroll en los enlaces internos
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href^='#']");
  if (!a) return;
  const id = a.getAttribute("href").slice(1);
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 64, behavior: "smooth" });
  }
});

// Validación sencilla del formulario de contacto (sin backend)
document.addEventListener("submit", (e) => {
  const form = e.target.closest("#contactForm");
  if (!form) return;
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (!data.nombre || !data.correo){
    alert("Por favor, completa tu nombre y correo.");
    return;
  }
  alert("¡Gracias, " + data.nombre + "! Tu mensaje fue enviado (demo).");
  form.reset();
});
