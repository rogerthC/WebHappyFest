// Validación y experiencia de usuario para el formulario de contacto
const form = document.getElementById('contact-form');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const check = document.getElementById('check');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valido = true;
    [nombre, email, asunto, mensaje].forEach(input => {
        input.classList.remove('input-error');
        if (!input.value.trim()) {
            input.classList.add('input-error');
            valido = false;
        }
    });
    if (!check.checked) {
        check.classList.add('input-error');
        valido = false;
    } else {
        check.classList.remove('input-error');
    }
    if (!valido) return;
    form.querySelector('button').textContent = 'Enviando...';
    setTimeout(() => {
        form.reset();
        form.querySelector('button').textContent = 'Mensaje enviado ✓';
        setTimeout(() => {
            form.querySelector('button').textContent = 'Enviar Mensaje';
        }, 2000);
    }, 1200);
});

// UX: Quitar error al escribir
[nombre, email, asunto, mensaje, check].forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('input-error');
    });
});
