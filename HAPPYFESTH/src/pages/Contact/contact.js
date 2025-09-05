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
    // Enviar el formulario al endpoint definido en el atributo action (FormSubmit) usando fetch
    const submitButton = form.querySelector('button');
    submitButton.textContent = 'Enviando...';

    const url = form.action;
    const formData = new FormData(form);

    fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(async response => {
        if (response.ok) {
            // Mostrar mensaje de éxito y resetear
            submitButton.textContent = 'Enviado ✓';
            form.reset();
        } else {
            const text = await response.text();
            console.error('Form submit failed:', text);
            submitButton.textContent = 'Error al enviar';
            // fallback: abrir mailto con los datos
            const mailto = `mailto:marche.dev00@gmail.com?subject=${encodeURIComponent(asunto.value)}&body=${encodeURIComponent('Nombre: '+nombre.value+'\nEmail: '+email.value+'\n\n'+mensaje.value)}`;
            window.open(mailto, '_blank');
        }
    }).catch(err => {
        console.error('Network or CORS error:', err);
        submitButton.textContent = 'Error de red';
        // fallback a mailto
        const mailto = `mailto:marche.dev00@gmail.com?subject=${encodeURIComponent(asunto.value)}&body=${encodeURIComponent('Nombre: '+nombre.value+'\nEmail: '+email.value+'\n\n'+mensaje.value)}`;
        window.open(mailto, '_blank');
    }).finally(() => {
        setTimeout(() => submitButton.textContent = 'Enviar Mensaje', 2500);
    });
});

// UX: Quitar error al escribir
[nombre, email, asunto, mensaje, check].forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('input-error');
    });
});
