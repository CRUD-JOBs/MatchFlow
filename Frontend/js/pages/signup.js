import {registerCandidate, registerCompany, saveSession, getCurrentSession, isAuthenticated} from '../api.js';

// Verificar si ya hay una sesión activa al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    // Si ya está autenticado, redirigir
    if (isAuthenticated()) {
        const session = getCurrentSession();
        redirectByRole(session);
        return;
    }
    // Configurar el formulario de signup
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    // Agregar validación en tiempo real para las contraseñas
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('signupConfirmPassword');

    if (password && confirmPassword) {
        confirmPassword.addEventListener('input', () => {
            if (confirmPassword.value && password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Las contraseñas no coinciden');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });

        password.addEventListener('input', () => {
            if (confirmPassword.value && password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Las contraseñas no coinciden');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });
    }
});

// Manejar el envío del formulario de signup
async function handleSignup(e) {
    e.preventDefault();
    // Obtener valores del formulario
    const name = document.getElementById('signupFullname').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const role = document.getElementById('loginRole').value;
    // Validar que se haya seleccionado un rol
    if (role === 'select') {
        showError('Por favor, selecciona un rol (Candidato o Empresa)');
        return;
    }
    // Validar campos vacíos
    if (!name || !email || !password || !confirmPassword) {
        showError('Por favor, completa todos los campos');
        return;
    }
    // Validar formato de email
    if (!isValidEmail(email)) {
        showError('Por favor, ingresa un email válido');
        return;
    }
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        showError('Las contraseñas no coinciden');
        return;
    }
    // Validar longitud de contraseña
    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    // Validar que el nombre tenga al menos 2 caracteres
    if (name.length < 2) {
        showError('El nombre debe tener al menos 2 caracteres');
        return;
    }

    // Deshabilitar botón de submit
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"> </span> Creando cuenta...';
    try {
        let user;
        // Registrar según el rol seleccionado
        if (role === 'candidate') {
            user = await registerCandidate(name, email, password);
        } else if (role === 'company') {
            user = await registerCompany(name, email, password);
        }
        // Guardar sesión
        saveSession(user);
        // Mostrar mensaje de éxito
        showSuccess('¡Cuenta creada exitosamente! Redirigiendo...');
        // Limpiar formulario
        e.target.reset();
        // Redirigir después de un breve delay
        setTimeout(() => {
            redirectByRole(user);
        }, 1500);
    } catch (error) {
        console.error('Error en signup:', error);
        
        // Mostrar mensaje de error específico
        if (error.message.includes('already registered')) {
            showError('Este email ya está registrado. Por favor, inicia sesión');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            showError('Error de conexión. Verifica que el servidor esté corriendo en http://localhost:3000');
        } else {
            showError('Error al crear la cuenta. Por favor, intenta de nuevo');
        }
        // Rehabilitar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Sign Up';
    }
}

// Redirigir según el rol del usuario
function redirectByRole(user) {
    if (user.role === 'candidate') {
        window.location = './index.html';
    } else if (user.role === 'company') {
        window.location = './dashboard.html';
    }
}

// Validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar mensaje de error
function showError(message) {
    // Remover alertas previas
    removeAlerts();

    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show mt-3';
    alert.role = 'alert';
    alert.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill me-2"> </i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"> </button>
    `;

    const form = document.getElementById('signupForm');
    form.insertAdjacentElement('beforebegin', alert);
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Mostrar mensaje de éxito
function showSuccess(message) {
    // Remover alertas previas
    removeAlerts();

    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show mt-3';
    alert.role = 'alert';
    alert.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"> </i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"> </button>
    `;

    const form = document.getElementById('signupForm');
    form.insertAdjacentElement('beforebegin', alert);
}

// Remover todas las alertas
function removeAlerts() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => alert.remove());
}

// Exportar funciones para uso global si es necesario
window.handleSignup = handleSignup;