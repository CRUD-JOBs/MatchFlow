import {clearSession, getCurrentSession, isAuthenticated} from '../api.js';

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay sesión activa
    if (!isAuthenticated()) {
        // Si no hay sesión, redirigir a login
        window.location = './login.html';
        return;
    }
    // Cargar información del usuario actual
    loadUserInfo();
    // Configurar botón de logout si existe
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    // También configurar cualquier otro botón de logout que pueda existir
    const logoutBtns = document.querySelectorAll('.btn-logout, [data-action="logout"]');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });
});

// Función para manejar el logout
function handleLogout(e) {
    if (e) {
        e.preventDefault();
    }
    // Confirmar logout
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        // Limpiar sesión
        clearSession();
        // Mostrar mensaje temporal
        showLogoutMessage();
        // Redirigir a login después de un breve delay
        setTimeout(() => {
            window.location = './login.html';
        }, 1000);
    }
}

// Cargar información del usuario actual
function loadUserInfo() {
    const session = getCurrentSession();
    
    if (session) {
        // Actualizar elementos que muestren el nombre del usuario
        const userNameElements = document.querySelectorAll('[data-user-name]');
        userNameElements.forEach(element => {
            element.textContent = session.name;
        });

        // Actualizar elementos que muestren el email del usuario
        const userEmailElements = document.querySelectorAll('[data-user-email]');
        userEmailElements.forEach(element => {
            element.textContent = session.email;
        });

        // Actualizar elementos que muestren el rol del usuario
        const userRoleElements = document.querySelectorAll('[data-user-role]');
        userRoleElements.forEach(element => {
            const roleText = session.role === 'candidate' ? 'Candidato' : 'Empresa';
            element.textContent = roleText;
        });
        }
}

// Mostrar mensaje de logout
function showLogoutMessage() {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    // Crear mensaje
    const message = document.createElement('div');
    message.className = 'alert alert-success text-center';
    message.style.cssText = `
        padding: 30px;
        border-radius: 15px;
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    message.innerHTML = `
        <i class="bi bi-check-circle-fill" style="font-size: 3rem; color: #10b981;"> </i>
        <h4 class="mt-3 mb-2"> Sesión cerrada </h4>
        <p class="mb-0"> Redirigiendo al login... </p>
    `;

    overlay.appendChild(message);
    document.body.appendChild(overlay);
}

// Función para verificar si el usuario tiene permisos según su rol
function checkUserRole(requiredRole) {
    const session = getCurrentSession();
    
    if (!session) {
        window.location = './login.html';
        return false;
    }
    if (session.role !== requiredRole) {
        alert('No tienes permisos para acceder a esta página');
        handleLogout();
        return false;
    }
    return true;
}

// Exportar funciones para uso global
window.handleLogout = handleLogout;
window.loadUserInfo = loadUserInfo;
window.checkUserRole = checkUserRole;