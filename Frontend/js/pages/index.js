import { getCurrentUser } from '../auth.js';
import { Candidate } from '../models/Candidate.js';

document.addEventListener('DOMContentLoaded', async () => {
    let user = getCurrentUser();

    if (!user || user.role !== 'candidate') {
        window.location.href = 'login.html';
        return;
    }

    // --- ELEMENTOS ---
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePlan = document.getElementById('profilePlan');
    const availabilityBtn = document.getElementById('availabilityBtn');
    const statusBadge = document.getElementById('statusBadge');
    const skillsContainer = document.getElementById('skillsContainer');
    const jobsTableBody = document.querySelector('#jobsTable tbody');
    
    const navHome = document.getElementById('navHome');
    const navSuscripciones = document.getElementById('navSuscripciones');
    const homePage = document.getElementById('homePage');
    const suscripcionesPage = document.getElementById('suscripcionesPage');

    const currentCandidate = new Candidate(
        user.id, user.name, user.email, user.isAvailable, user.skills, user.experience
    );

    // --- NAVEGACIÓN SPA ---
    const showPage = (page) => {
        if (page === 'home') {
            homePage.classList.add('active-page');
            suscripcionesPage.classList.remove('active-page');
            navHome.classList.add('active');
            navSuscripciones.classList.remove('active');
        } else {
            homePage.classList.remove('active-page');
            suscripcionesPage.classList.add('active-page');
            navHome.classList.remove('active');
            navSuscripciones.classList.add('active');
        }
    };

    navHome.addEventListener('click', () => showPage('home'));
    navSuscripciones.addEventListener('click', () => showPage('suscripciones'));

    // --- RENDERIZADO ---
    const loadProfileData = () => {
        if (profileName) profileName.textContent = currentCandidate.name;
        if (profileEmail) profileEmail.textContent = currentCandidate.email;
        
        // Renderizar el plan debajo del correo
        if (profilePlan) {
            const userPlan = user.plan || 'Free';
            profilePlan.textContent = `Plan: ${userPlan}`;
            
            // Cambiar color según el plan
            if (userPlan === 'Pro') {
                profilePlan.className = "badge rounded-pill bg-primary plan-badge text-uppercase";
            } else if (userPlan === 'Premium') {
                profilePlan.className = "badge rounded-pill bg-warning text-dark plan-badge text-uppercase";
            } else {
                profilePlan.className = "badge rounded-pill bg-light text-primary border border-primary plan-badge text-uppercase";
            }
        }

        if (skillsContainer) {
            skillsContainer.innerHTML = (currentCandidate.skills || []).map(skill => 
                `<span class="badge bg-light text-dark border me-1">${skill}</span>`
            ).join('') || '<span class="text-muted small">Sin habilidades</span>';
        }
    };

    const updateUIStatus = (isAvailable) => {
        if (!statusBadge || !availabilityBtn) return;
        statusBadge.textContent = isAvailable ? "Disponible" : "Búsqueda Pausada";
        statusBadge.className = isAvailable ? "badge bg-success p-2 fs-6" : "badge bg-secondary p-2 fs-6";
        availabilityBtn.textContent = isAvailable ? "Desactivar Disponibilidad" : "Activar Disponibilidad";
        availabilityBtn.className = isAvailable ? "btn btn-danger fw-bold" : "btn btn-primary fw-bold";
    };

    const loadJobs = async () => {
        try {
            const res = await fetch('http://localhost:3000/jobs');
            const jobs = await res.json();
            if (jobsTableBody) {
                jobsTableBody.innerHTML = jobs.map(j => `
                    <tr>
                        <td class="fw-bold text-primary ps-4">${j.title}</td>
                        <td class="small">${j.description}</td>
                        <td><span class="badge bg-info text-dark">Activa</span></td>
                    </tr>`).join('') || '<tr><td colspan="3" class="text-center py-4">No hay vacantes</td></tr>';
            }
        } catch (e) { console.error(e); }
    };

    // --- ACCIÓN SELECCIONAR PLAN ---
    window.selectPlan = async (planName) => {
        if (!confirm(`¿Cambiar al plan ${planName}?`)) return;
        try {
            const res = await fetch(`http://localhost:3000/candidates/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: planName })
            });

            if (res.ok) {
                // Actualizar objeto en memoria y sesión
                user.plan = planName;
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                
                // Refrescar UI y volver al inicio
                loadProfileData();
                alert(`Plan ${planName} activado.`);
                showPage('home');
            }
        } catch (e) { console.error(e); }
    };

    // --- EDICIÓN DE PERFIL ---
    const editProfileForm = document.getElementById('editProfileForm');
    document.getElementById('editProfileModal').addEventListener('show.bs.modal', () => {
        document.getElementById('editName').value = currentCandidate.name;
        document.getElementById('editExperience').value = currentCandidate.experience || "";
        document.getElementById('editSkills').value = currentCandidate.skills ? currentCandidate.skills.join(', ') : "";
    });

    editProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedInfo = {
            name: document.getElementById('editName').value.trim(),
            experience: document.getElementById('editExperience').value.trim(),
            skills: document.getElementById('editSkills').value.split(',').map(s => s.trim()).filter(s => s !== "")
        };

        try {
            const res = await fetch(`http://localhost:3000/candidates/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedInfo)
            });
            if (res.ok) {
                sessionStorage.setItem('currentUser', JSON.stringify({ ...user, ...updatedInfo }));
                window.location.reload();
            }
        } catch (e) { console.error(e); }
    });

    availabilityBtn.addEventListener('click', async () => {
        const newStatus = !currentCandidate.isAvailable;
        const updated = await currentCandidate.updateAvailability(newStatus);
        if (updated) {
            user.isAvailable = newStatus;
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            updateUIStatus(newStatus);
        }
    });

    document.getElementById('btnLogout').addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    loadProfileData();
    updateUIStatus(currentCandidate.isAvailable);
    loadJobs();
});