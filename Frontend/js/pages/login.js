// Corregido: un solo nivel de salida (../) para llegar a /js/auth.js desde /js/pages/
import { login } from '../auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) {
        console.error("Error: No se encontró el formulario con ID 'loginForm'");
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailElement = document.getElementById('email');
        const passwordElement = document.getElementById('password');

        if (!emailElement || !passwordElement) {
            console.error("Error: No se encontraron los inputs de email o password");
            return;
        }

        const email = emailElement.value;
        const password = passwordElement.value;

        try {
            const result = await login(email, password);

            if (result.success) {
                // Redirección a los nuevos nombres de archivo
                if (result.role === 'candidate') {
                    window.location.href = 'index.html';
                } else if (result.role === 'company') {
                    window.location.href = 'dashboard.html';
                }
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error en el proceso de login:", error);
            alert("Error de conexión con el servidor");
        }
    });
});