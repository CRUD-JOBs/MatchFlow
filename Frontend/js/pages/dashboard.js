import { getCurrentUser } from '../auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    const user = getCurrentUser();

    // 1. Verificación de Seguridad
    if (!user || user.role !== 'company') {
        window.location.href = 'login.html';
        return;
    }

    // 2. Referencias del DOM
    const companyNameDisplay = document.getElementById('companyNameDisplay');
    const totalJobsDisplay = document.getElementById('totalJobs');
    const totalCandidatesDisplay = document.getElementById('totalCandidates');
    const activeProcessesDisplay = document.getElementById('activeProcesses');
    const jobsTableBody = document.getElementById('jobsTableBody');
    const candidatesTableBody = document.getElementById('candidatesTableBody');
    const createJobForm = document.getElementById('createJobForm');

    // 3. Inicialización de Interfaz
    if (companyNameDisplay) companyNameDisplay.textContent = user.name;

    /**
     * Gestión de Navegación del Sidebar (SPA)
     */
    const menuLinks = document.querySelectorAll('.menu-link');
    const sections = document.querySelectorAll('.page');

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPage = link.getAttribute('data-page');
            
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active-page');
                if (section.id === targetPage) {
                    section.classList.add('active-page');
                }
            });
        });
    });

    /**
     * Carga y Procesamiento de Datos
     */
    async function loadAllData() {
        try {
            const [jobsRes, candRes] = await Promise.all([
                fetch('http://localhost:3000/jobs'),
                fetch('http://localhost:3000/candidates')
            ]);

            const allJobs = await jobsRes.json();
            const allCandidates = await candRes.json();

            // Filtrado de datos por empresa
            const myJobs = allJobs.filter(j => j.companyId === user.id);
            const myInProcess = allCandidates.filter(c => c.assignedCompanyId === user.id && c.processStatus !== 'pendiente');

            // Actualización de Métricas en el Dashboard
            if (totalJobsDisplay) totalJobsDisplay.textContent = myJobs.length;
            if (totalCandidatesDisplay) totalCandidatesDisplay.textContent = allCandidates.length;
            if (activeProcessesDisplay) activeProcessesDisplay.textContent = myInProcess.length;

            renderJobsTable(myJobs);
            renderCandidatesTable(allCandidates, user.id);

        } catch (error) {
            console.error("Error técnico al cargar datos:", error);
        }
    }

    /**
     * Renderizado de Tabla Mis Ofertas
     */
    function renderJobsTable(jobs) {
        if (!jobsTableBody) return;
        jobsTableBody.innerHTML = jobs.map(j => `
            <tr>
                <td>#${j.id}</td>
                <td class="fw-bold">${j.title}</td>
                <td>${j.category || 'N/A'}</td>
                <td><span class="badge bg-success">Activa</span></td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger" onclick="window.deleteJob('${j.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Renderizado de Tabla Gestión de Candidatos
     * Implementa lógica de bloqueo por reserva de terceros
     */
    function renderCandidatesTable(candidates, currentCompanyId) {
        if (!candidatesTableBody) return;
        candidatesTableBody.innerHTML = candidates.map(c => {
            // Normalización de estados
            const reservedBy = c.reservedBy || null;
            const processStatus = c.processStatus || 'pendiente';
            const isReservedByOther = reservedBy !== null && reservedBy !== currentCompanyId;
            const isReservedByMe = reservedBy === currentCompanyId;

            return `
            <tr class="${isReservedByOther ? 'opacity-50' : ''}">
                <td>
                    ${c.name} 
                    ${isReservedByOther ? '<i class="bi bi-lock-fill text-muted ms-1" title="Reservado por otra empresa"></i>' : ''}
                </td>
                <td>${c.experience || 'N/A'}</td>
                <td>
                    <span class="badge ${c.isAvailable ? 'bg-info' : 'bg-secondary'}">
                        ${c.isAvailable ? 'Disponible' : 'No disponible'}
                    </span>
                </td>
                <td>
                    <select class="form-select form-select-sm" 
                            ${isReservedByOther ? 'disabled' : ''} 
                            onchange="window.updateProcess('${c.id}', this.value)">
                        <option value="pendiente" ${processStatus === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="contactado" ${processStatus === 'contactado' ? 'selected' : ''}>Contactado</option>
                        <option value="entrevistado" ${processStatus === 'entrevistado' ? 'selected' : ''}>Entrevistado</option>
                        <option value="contratado" ${processStatus === 'contratado' ? 'selected' : ''}>Contratado</option>
                        <option value="descartado" ${processStatus === 'descartado' ? 'selected' : ''}>Descartado</option>
                    </select>
                </td>
                <td class="text-end">
                    <button class="btn btn-sm ${isReservedByMe ? 'btn-warning' : 'btn-outline-warning'}" 
                            ${isReservedByOther ? 'disabled' : ''} 
                            onclick="window.toggleReserve('${c.id}', ${isReservedByMe})">
                        <i class="bi ${isReservedByMe ? 'bi-lock-fill' : 'bi-lock'}"></i>
                        ${isReservedByMe ? 'Liberar' : (isReservedByOther ? 'Bloqueado' : 'Reservar')}
                    </button>
                </td>
            </tr>
            `;
        }).join('');
    }

    /**
     * Funciones Globales (Accesibles desde el DOM)
     */
    window.toggleReserve = async (candidateId, isCurrentlyReservedByMe) => {
        const newReservedValue = isCurrentlyReservedByMe ? null : user.id;
        try {
            const res = await fetch(`http://localhost:3000/candidates/${candidateId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reservedBy: newReservedValue })
            });
            if (res.ok) await loadAllData();
        } catch (e) { console.error("Error al reservar:", e); }
    };

    window.updateProcess = async (candidateId, newStatus) => {
        try {
            const res = await fetch(`http://localhost:3000/candidates/${candidateId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    processStatus: newStatus, 
                    assignedCompanyId: user.id 
                })
            });
            if (res.ok) await loadAllData();
        } catch (e) { console.error("Error al actualizar proceso:", e); }
    };

    window.deleteJob = async (jobId) => {
        if (!confirm("¿Está seguro de eliminar esta oferta permanentemente?")) return;
        try {
            const res = await fetch(`http://localhost:3000/jobs/${jobId}`, { method: 'DELETE' });
            if (res.ok) await loadAllData();
        } catch (e) { console.error("Error al eliminar vacante:", e); }
    };

    /**
     * Creación de Nueva Oferta
     */
    if (createJobForm) {
        createJobForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newJob = {
                companyId: user.id,
                title: document.getElementById('jobTitleInput').value.trim(),
                category: document.getElementById('jobCategoryInput').value,
                description: document.getElementById('jobDescriptionInput').value.trim(),
                status: "Activa"
            };

            try {
                const res = await fetch('http://localhost:3000/jobs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newJob)
                });

                if (res.ok) {
                    createJobForm.reset();
                    alert("Oferta publicada con éxito.");
                    await loadAllData();
                }
            } catch (e) { console.error("Error al publicar:", e); }
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }

    // Ejecución inicial
    loadAllData();
});