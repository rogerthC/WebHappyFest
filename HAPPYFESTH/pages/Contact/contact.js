// Validación y experiencia de usuario para el formulario de contacto
const form = document.getElementById('contact-form');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const check = document.getElementById('check');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Validate fields
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

    const submitButton = form.querySelector('button');
    if(submitButton) submitButton.textContent = 'Enviando...';

    // Try local server first
    const payload = {
        nombre: nombre.value,
        email: email.value,
        asunto: asunto.value,
        message: mensaje.value,
        consent: check.checked ? 'accepted' : 'no'
    };

    fetch('http://localhost:3333/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(r=> r.json()).then(data=>{
        if(data && data.ok){
            if(submitButton) submitButton.textContent = 'Enviado ✓';
            form.reset();
            return;
        }
        // fallback: submit natively to FormSubmit
        form.submit();
    }).catch(err => {
        console.warn('Local email server failed:', err);
        // fallback: submit natively to FormSubmit
        form.submit();
    }).finally(()=>{
        setTimeout(()=>{ if(submitButton) submitButton.textContent = 'Enviar Mensaje'; }, 2500);
    });
});

// UX: Quitar error al escribir
[nombre, email, asunto, mensaje, check].forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('input-error');
    });
});
