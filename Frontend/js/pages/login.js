import { authenticateCandidate, authenticateCompany, saveSession, getCurrentSession, isAuthenticated} from '../api.js';

// Verificar si ya hay una sesión activa al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    // Si ya está autenticado, redirigir
    if (isAuthenticated()) {
        const session = getCurrentSession();
        redirectByRole(session);
        return;
    }
    // Configurar el formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Manejar el envío del formulario de login
async function handleLogin(e) {
    e.preventDefault();
    // Obtener valores del formulario
    const name = document.getElementById('loginFullname').value.trim();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;
    // Validar que se haya seleccionado un rol
    if (role === 'select') {
        showError('Por favor, selecciona un rol (Candidato o Empresa)');
        return;
    }
    // Validar campos vacíos
    if (!name || !email || !password) {
        showError('Por favor, completa todos los campos');
        return;
    }
    // Validar formato de email
    if (!isValidEmail(email)) {
        showError('Por favor, ingresa un email válido');
        return;
    }
    // Deshabilitar botón de submit
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"> </span> Iniciando sesión...';
    try {
        let user;
        // Autenticar según el rol seleccionado
        if (role === 'candidate') {
            user = await authenticateCandidate(email, password);
        } else if (role === 'company') {
            user = await authenticateCompany(email, password);
        }
        // Verificar que el nombre coincida
        if (user.name.toLowerCase() !== name.toLowerCase()) {
            throw new Error('El nombre no coincide con la cuenta');
        }
        // Guardar sesión
        saveSession(user);
        // Mostrar mensaje de éxito
        showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
        // Redirigir después de un breve delay
        setTimeout(() => {
            redirectByRole(user);
        }, 1000);
    } catch (error) {
        console.error('Error en login:', error);
        // Mostrar mensaje de error específico
        if (error.message.includes('not found')) {
            showError('No se encontró una cuenta con este email');
        } else if (error.message.includes('Invalid password')) {
            showError('Contraseña incorrecta');
        } else if (error.message.includes('nombre')) {
            showError(error.message);
        } else {
            showError('Error al iniciar sesión. Verifica tus credenciales');
        }
        // Rehabilitar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Log In';
    }
}

// Redirigir según el rol del usuario
function redirectByRole(user) {
    if (user.role === 'candidate') {
        window.location = './';
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

    const form = document.getElementById('loginForm');
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

    const form = document.getElementById('loginForm');
    form.insertAdjacentElement('beforebegin', alert);
}

// Remover todas las alertas
function removeAlerts() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => alert.remove());
}

// Exportar funciones para uso global si es necesario
window.handleLogin = handleLogin;