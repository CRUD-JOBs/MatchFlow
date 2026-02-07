import { getCurrentUser } from '../auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    let user = getCurrentUser();

    // 1. Verificación de Seguridad y Rol
    if (!user || user.role !== 'company') {
        window.location.href = 'login.html';
        return;
    }

    // 2. Referencias del DOM
    const companyNameDisplay = document.getElementById('companyNameDisplay');
    const companyInfoSubtitle = document.getElementById('companyInfoSubtitle');
    const currentPlanBadge = document.getElementById('currentPlanBadge');
    const sections = document.querySelectorAll('.page');
    const menuLinks = document.querySelectorAll('.menu-link');
    const createJobForm = document.getElementById('createJobForm');

    // --- INTERFAZ Y NAVBAR ---
    const updateHeader = () => {
        if (companyNameDisplay) companyNameDisplay.textContent = user.name;
        if (companyInfoSubtitle) companyInfoSubtitle.textContent = `Sector: ${user.description || 'Tecnología'}`;
        
        if (currentPlanBadge) {
            const plan = user.plan || 'Free';
            currentPlanBadge.textContent = plan;
            currentPlanBadge.className = `badge rounded-pill ms-2 plan-badge text-uppercase ${
                plan === 'Pro' ? 'bg-primary' : 
                plan === 'Premium' ? 'bg-warning text-dark' : 'bg-secondary'
            }`;
        }
    };

    // --- NAVEGACIÓN SPA ---
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-page');
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            sections.forEach(s => s.classList.toggle('active-page', s.id === target));
        });
    });

    // --- CARGA Y SINCRONIZACIÓN DE DATOS ---
    async function loadAllData() {
        try {
            const [jRes, cRes] = await Promise.all([
                fetch('http://localhost:3000/jobs'),
                fetch('http://localhost:3000/candidates')
            ]);

            const allJobs = await jRes.json();
            const allCandidates = await cRes.json();

            // Filtrar vacantes propias
            const myJobs = allJobs.filter(j => String(j.companyId) === String(user.id));
            
            // Renderizar tablas
            renderJobsTable(myJobs);
            renderCandidatesTable(allCandidates);

            // Actualizar Contadores del Dashboard
            document.getElementById('totalJobs').textContent = myJobs.length;
            document.getElementById('totalCandidates').textContent = allCandidates.length;
            
            // "En Mi Proceso" cuenta candidatos reservados por esta empresa
            const myReserved = allCandidates.filter(c => String(c.reservedBy) === String(user.id));
            document.getElementById('activeProcesses').textContent = myReserved.length;

        } catch (e) {
            console.error("Error al sincronizar con el servidor:", e);
        }
    }

    // --- RENDERIZADO DE TABLAS ---
    function renderJobsTable(jobs) {
        const body = document.getElementById('jobsTableBody');
        if (!body) return;
        
        body.innerHTML = jobs.length > 0 
            ? jobs.map(j => `
                <tr>
                    <td>#${j.id}</td>
                    <td class="fw-bold">${j.title}</td>
                    <td><span class="badge bg-light text-dark border">${j.category}</span></td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="window.deleteJob('${j.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`).join('')
            : '<tr><td colspan="4" class="text-center py-4 text-muted">No has publicado vacantes aún.</td></tr>';
    }

    function renderCandidatesTable(candidates) {
        const body = document.getElementById('candidatesTableBody');
        if (!body) return;

        // LÓGICA DE VISIBILIDAD: Ocultar si está reservado por otra empresa
        const visibleCandidates = candidates.filter(c => 
            !c.reservedBy || String(c.reservedBy) === String(user.id)
        );

        body.innerHTML = visibleCandidates.map(c => {
            const isReservedByMe = String(c.reservedBy) === String(user.id);
            
            return `
                <tr class="${isReservedByMe ? 'table-info' : ''}">
                    <td>
                        <i class="bi bi-person-circle me-2 text-secondary"></i>
                        <strong>${c.name}</strong>
                        ${isReservedByMe ? '<span class="badge bg-primary ms-2">Tu Reserva</span>' : ''}
                    </td>
                    <td>${c.experience || 'N/A'}</td>
                    <td>
                        <span class="badge ${c.isAvailable ? 'bg-success' : 'bg-secondary'}">
                            ${c.isAvailable ? 'Disponible' : 'En proceso'}
                        </span>
                    </td>
                    <td class="text-end">
                        <button class="btn btn-sm ${isReservedByMe ? 'btn-danger' : 'btn-outline-primary'} fw-bold" 
                                onclick="window.toggleReserve('${c.id}', ${isReservedByMe})">
                            <i class="bi ${isReservedByMe ? 'bi-unlock' : 'bi-lock'} me-1"></i>
                            ${isReservedByMe ? 'Liberar' : 'Reservar'}
                        </button>
                    </td>
                </tr>`;
        }).join('');
    }

    // --- ACCIONES GLOBALES (Window Object) ---
    window.toggleReserve = async (candidateId, currentlyReservedByMe) => {
        const reserveValue = currentlyReservedByMe ? null : String(user.id);
        
        try {
            const res = await fetch(`http://localhost:3000/candidates/${candidateId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    reservedBy: reserveValue,
                    isAvailable: currentlyReservedByMe // Si libero, vuelve a estar disponible
                })
            });

            if (res.ok) {
                await loadAllData();
            }
        } catch (e) {
            console.error("Error en la operación de reserva:", e);
        }
    };

    window.deleteJob = async (id) => {
        if (!confirm("¿Eliminar esta oferta permanentemente?")) return;
        try {
            const res = await fetch(`http://localhost:3000/jobs/${id}`, { method: 'DELETE' });
            if (res.ok) await loadAllData();
        } catch (e) { console.error(e); }
    };

    window.selectPlan = async (planName) => {
        if (!confirm(`¿Confirmas el cambio al plan ${planName}?`)) return;
        try {
            const res = await fetch(`http://localhost:3000/companies/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: planName })
            });
            if (res.ok) {
                user.plan = planName;
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                updateHeader();
                alert(`Plan ${planName} activado.`);
                document.querySelector('[data-page="dashboard"]').click();
            }
        } catch (e) { console.error(e); }
    };

    // --- EVENTOS DE FORMULARIO ---
    createJobForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newJob = {
            companyId: user.id,
            title: document.getElementById('jobTitleInput').value,
            category: document.getElementById('jobCategoryInput').value,
            description: document.getElementById('jobDescriptionInput').value,
            status: "Activa",
            createdAt: new Date().toISOString()
        };

        const res = await fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newJob)
        });

        if (res.ok) {
            alert("Oferta publicada.");
            createJobForm.reset();
            await loadAllData();
        }
    });

    // --- LOGOUT ---
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    // Inicialización
    updateHeader();
    loadAllData();
});