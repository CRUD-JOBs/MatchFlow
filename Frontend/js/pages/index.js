import { getCurrentUser } from '../auth.js';
import { Candidate } from '../models/Candidate.js';

document.addEventListener('DOMContentLoaded', async () => {
    const user = getCurrentUser();

    // 1. Verificación de sesión
    if (!user || user.role !== 'candidate') {
        window.location.href = 'login.html';
        return;
    }

    // 2. Instancia del modelo
    const currentCandidate = new Candidate(
        user.id, 
        user.name, 
        user.email, 
        user.isAvailable, 
        user.skills, 
        user.experience
    );

    // 3. Selección de elementos del DOM
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const availabilityBtn = document.getElementById('availabilityBtn');
    const statusBadge = document.getElementById('statusBadge');
    const jobsTableBody = document.querySelector('#jobsTable tbody');

    /**
     * Inyecta los datos del usuario en el HTML
     */
    const loadProfileData = () => {
        if (profileName) profileName.textContent = currentCandidate.name;
        if (profileEmail) profileEmail.textContent = currentCandidate.email;
    };

    /**
     * Actualiza la interfaz según la disponibilidad
     */
    const updateUIStatus = (isAvailable) => {
        if (!statusBadge || !availabilityBtn) return;

        if (isAvailable) {
            statusBadge.textContent = "Disponible";
            statusBadge.className = "badge bg-success p-2 fs-6";
            availabilityBtn.textContent = "Desactivar Disponibilidad";
            availabilityBtn.className = "btn btn-danger";
        } else {
            statusBadge.textContent = "Búsqueda Pausada";
            statusBadge.className = "badge bg-secondary p-2 fs-6";
            availabilityBtn.textContent = "Activar Disponibilidad";
            availabilityBtn.className = "btn btn-primary";
        }
    };git

    // 4. Inicialización
    loadProfileData();
    updateUIStatus(currentCandidate.isAvailable);

    // 5. Evento para cambiar disponibilidad
    if (availabilityBtn) {
        availabilityBtn.addEventListener('click', async () => {
            const newStatus = !currentCandidate.isAvailable;
            const updated = await currentCandidate.updateAvailability(newStatus);
            
            if (updated) {
                currentCandidate.isAvailable = newStatus;
                user.isAvailable = newStatus;
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                updateUIStatus(newStatus);
            }
        });
    }

    // 6. Carga de ofertas de trabajo
    const loadJobs = async () => {
        try {
            const response = await fetch('http://localhost:3000/jobs');
            const jobs = await response.json();
            
            if (jobsTableBody) {
                jobsTableBody.innerHTML = jobs.map(job => `
                    <tr>
                        <td>${job.title}</td>
                        <td>${job.description}</td>
                        <td><span class="badge bg-info text-dark">${job.status}</span></td>
                        
                    </tr>
                `).join('');
            }
        } catch (error) {
            console.error("Error al cargar ofertas:", error);
        }
    };

    loadJobs();
});