document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    if (!signupForm) {
        console.error("Error: No se encontró el formulario con ID 'signupForm'");
        return;
    }

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtención de valores del DOM
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;

        // Validación de rol seleccionado
        if (!role || role === "" || role === "select") {
            alert("Por favor, seleccione un rol válido (Candidato o Empresa).");
            return;
        }

        const endpoint = role === 'candidate' ? 'candidates' : 'companies';

        try {
            // 1. Verificar si el correo ya existe en el endpoint seleccionado
            const checkRes = await fetch(`http://localhost:3000/${endpoint}?email=${email}`);
            const existingUsers = await checkRes.json();

            if (existingUsers.length > 0) {
                alert("Este correo electrónico ya está registrado.");
                return;
            }

            // 2. Construir el objeto del nuevo usuario
            const newUser = {
                name,
                email,
                password,
                role,
                ...(role === 'candidate' 
                    ? { isAvailable: true, skills: [], experience: "" } 
                    : { description: "" })
            };

            // 3. Guardar en la base de datos
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert("Registro exitoso.");
                // REDIRECCIÓN: Lleva al usuario al login tras el éxito
                window.location.href = 'login.html';
            } else {
                alert("Error al guardar los datos en el servidor.");
            }

        } catch (error) {
            console.error("Error técnico:", error);
            alert("No se pudo conectar con el servidor (json-server).");
        }
    });
});