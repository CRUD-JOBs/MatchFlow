import { getCurrentUser } from '../auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    const candidatesTableBody = document.querySelector('#candidatesTable tbody');

    const loadCandidates = async () => {
        try {
            const response = await fetch('http://localhost:3000/candidates');
            const candidates = await response.json();

            candidatesTableBody.innerHTML = '';

            candidates.forEach(can => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${can.name}</td>
                    <td>${can.skills.join(', ')}</td>
                    <td>
                        <span class="badge ${can.isAvailable ? 'bg-success' : 'bg-danger'}">
                            ${can.isAvailable ? 'Disponible' : 'No Disponible'}
                        </span>
                    </td>
                    <td>
                        <select class="form-select form-select-sm status-select" data-id="${can.id}">
                            <option value="pending">Pendiente</option>
                            <option value="contacted">Contactado</option>
                            <option value="interviewed">Entrevistado</option>
                            <option value="hired">Contratado</option>
                            <option value="rejected">Descartado</option>
                        </select>
                    </td>
                `;
                candidatesTableBody.appendChild(row);
            });

            // Agregar eventos a los selectores de estado
            document.querySelectorAll('.status-select').forEach(select => {
                select.addEventListener('change', async (e) => {
                    const candidateId = e.target.dataset.id;
                    const newStatus = e.target.value;
                    await updateCandidateProcess(candidateId, newStatus);
                });
            });

        } catch (error) {
            console.error("Error al cargar candidatos:", error);
        }
    };

    const updateCandidateProcess = async (id, status) => {
        // Aquí se actualizaría la tabla 'applications' en db.json
        console.log(`Actualizando candidato ${id} a estado: ${status}`);
        // Implementación de fetch PATCH aquí...
    };

    loadCandidates();
});