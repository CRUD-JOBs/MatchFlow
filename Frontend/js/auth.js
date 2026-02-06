/**
 * Realiza la petición al servidor para validar credenciales
 */
export async function login(email, password) {
    try {
        // Intento 1: Buscar en la colección de candidatos
        const resCan = await fetch(`http://localhost:3000/candidates?email=${email}&password=${password}`);
        const candidates = await resCan.json();
        
        if (candidates.length > 0) {
            sessionStorage.setItem('currentUser', JSON.stringify(candidates[0]));
            return { success: true, role: 'candidate' };
        }

        // Intento 2: Buscar en la colección de empresas
        const resCom = await fetch(`http://localhost:3000/companies?email=${email}&password=${password}`);
        const companies = await resCom.json();

        if (companies.length > 0) {
            sessionStorage.setItem('currentUser', JSON.stringify(companies[0]));
            return { success: true, role: 'company' };
        }

        return { success: false, message: "Usuario o contraseña incorrectos" };
    } catch (error) {
        console.error("Error en fetch (auth.js):", error);
        throw error;
    }
}

export function getCurrentUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}