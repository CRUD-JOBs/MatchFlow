import {getCurrentSession, isAuthenticated, getCompany, getCandidates, getJobOffersByCompany, getMatchesByCompany} from '../api.js';

// Variables globales
let currentCompany = null;
let aspirantesMatch = [];
let aspirantesNuevos = [];

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', async () => {
    // Verificar autenticación
    if (!isAuthenticated()) {
        window.location.href = '../../login.html';
        return;
    }
    const session = getCurrentSession();
    // Verificar que sea una empresa
    if (session.role !== 'company') {
        alert('Acceso denegado. Esta área es solo para empresas.');
        window.location.href = '../../login.html';
        return;
    }
    // Cargar datos de la empresa
    await loadCompanyData(session.id);
    // Configurar navegación del sidebar
    setupSidebar();
    // Configurar toggle del sidebar
    setupSidebarToggle();
    // Cargar datos iniciales
    await loadDashboardData();
});

// CARGA DE DATOS
async function loadCompanyData(companyId) {
    try {
        currentCompany = await getCompany(companyId);
        // Actualizar información en el hero
        const companyNameElements = document.querySelectorAll('[data-user-name]');
        companyNameElements.forEach(element => {
            element.textContent = currentCompany.name;
        });
        console.log('Empresa cargada:', currentCompany);
    } catch (error) {
        console.error('Error al cargar datos de la empresa:', error);
        showError('Error al cargar los datos de la empresa');
    }
}

async function loadDashboardData() {
    try {
        // Cargar ofertas de trabajo
        const jobOffers = await getJobOffersByCompany(currentCompany.id);
        // Cargar matches
        const matches = await getMatchesByCompany(currentCompany.id);
        // Cargar todos los candidatos
        const allCandidates = await getCandidates();
        // Actualizar estadísticas en el dashboard
        updateDashboardStats(jobOffers, allCandidates, matches);
        console.log('Datos del dashboard cargados');
    } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
    }
}

function updateDashboardStats(jobOffers, candidates, matches) {
    // Actualizar contador de vacantes activas
    const activeJobsElement = document.querySelector('.card-body h3');
    if (activeJobsElement) {
        const activeJobs = jobOffers.filter(job => job.state === 'on-going').length;
        activeJobsElement.textContent = activeJobs;
    }
    // Actualizar información en el hero
    const heroText = document.querySelector('.hero p');
    if (heroText) {
        const activeJobs = jobOffers.filter(job => job.state === 'on-going').length;
        const ongoingProcesses = matches.filter(match => match.state !== 'hired').length;
        heroText.textContent = `Sector: Tecnología · Vacantes activas: ${activeJobs} · Procesos en curso: ${ongoingProcesses}`;
    }
}

// CONFIGURACIÓN DE NAVEGACIÓN
function setupSidebar() {
    document.querySelectorAll(".menu-link").forEach(link => {
        link.addEventListener("click", () => {
            // Remover clase active de todos los links
            document.querySelectorAll(".menu-link").forEach(l => l.classList.remove("active"));
            // Agregar clase active al link clickeado
            link.classList.add("active");
            // Ocultar todas las páginas
            document.querySelectorAll(".page").forEach(p => p.classList.remove("active-page"));
            // Mostrar la página correspondiente
            const pageId = link.dataset.page;
            const page = document.getElementById(pageId);
            if (page) {
                page.classList.add("active-page");
            }
        });
    });
}

function setupSidebarToggle() {
    const toggleBtn = document.getElementById("toggleSidebar");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const sidebar = document.getElementById("sidebar");
            if (sidebar) {
                sidebar.classList.toggle("collapsed");
            }
        });
    }
}

// GESTIÓN DE ASPIRANTES

// Datos de ejemplo (estos deberían venir de la API en producción)
function initializeAspirantesData() {
    aspirantesMatch = [
        {
            id: 1,
            nombre: "Juan Pérez",
            profesion: "Ingeniero IA",
            estado: "Disponible",
            experiencia: "3 años",
            email: "juan@mail.com",
            ubicacion: "Remoto",
            skills: ["Python", "Machine Learning", "SQL"]
        }
    ];
    aspirantesNuevos = [
        {
            id: 2,
            nombre: "Ana Gómez",
            profesion: "Data Scientist",
            estado: "Disponible",
            experiencia: "2 años",
            email: "ana@mail.com",
            ubicacion: "Medellín",
            skills: ["Pandas", "SQL", "Python"]
        },
        {
            id: 3,
            nombre: "Carlos Ruiz",
            profesion: "Frontend Developer",
            estado: "Disponible",
            experiencia: "4 años",
            email: "carlos@mail.com",
            ubicacion: "Bogotá",
            skills: ["React", "JavaScript", "CSS"]
        }
    ];
}

// Crear fila de tabla para aspirante
function crearFilaAspirante(a, tipo) {
    return `
        <tr>
            <td>${a.id}</td>
            <td>${a.nombre}</td>
            <td>${a.profesion}</td>
            <td>
                <span class="badge bg-success">${a.estado}</span>
            </td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#perfilModal" onclick="window.verPerfil(${a.id}, '${tipo}')"> <i class="bi bi-eye me-1"> </i> Ver perfil </button>
                ${tipo === "nuevo" 
                    ? `<button class="btn btn-sm btn-success ms-2" onclick="window.iniciarProceso(${a.id})">
                        <i class="bi bi-plus-circle me-1"></i> Iniciar proceso
                    </button>`
                    : ""
                }
            </td>
        </tr>
    `;
}

// Ver aspirantes de una vacante
function verAspirantes(puesto) {
    // Inicializar datos si no están cargados
    if (aspirantesMatch.length === 0 && aspirantesNuevos.length === 0) {
        initializeAspirantesData();
    }
    // Ocultar todas las páginas
    document.querySelectorAll(".page").forEach(p =>
        p.classList.remove("active-page")
    );
    // Mostrar página de aspirantes
    const aspirantesPage = document.getElementById("aspirantes");
    if (aspirantesPage) {
        aspirantesPage.classList.add("active-page");
    }
    // Actualizar título
    const puestoTitulo = document.getElementById("puestoTitulo");
    if (puestoTitulo) {
        puestoTitulo.innerHTML = `<i class="bi bi-briefcase me-2"> </i>${puesto}`;
    }
    // Cargar tablas
    const tablaMatch = document.getElementById("tablaMatch");
    const tablaNuevos = document.getElementById("tablaNuevos");

    if (tablaMatch && tablaNuevos) {
        tablaMatch.innerHTML = "";
        tablaNuevos.innerHTML = "";
        // Llenar tabla de matches
        aspirantesMatch.forEach(a => {
            tablaMatch.innerHTML += crearFilaAspirante(a, "match");
        });
        // Llenar tabla de nuevos aspirantes
        aspirantesNuevos.forEach(a => {
            tablaNuevos.innerHTML += crearFilaAspirante(a, "nuevo");
        });
    }
}

// Ver perfil detallado de un aspirante
function verPerfil(id, tipo) {
    const lista = tipo === "match" ? aspirantesMatch : aspirantesNuevos;
    const aspirante = lista.find(x => x.id === id);

    if (!aspirante) {
        console.error('Aspirante no encontrado');
        return;
    }
    // Actualizar modal con información del aspirante
    const perfilNombre = document.getElementById("perfilNombre");
    const perfilProfesion = document.getElementById("perfilProfesion");
    const perfilEstado = document.getElementById("perfilEstado");
    const perfilExperiencia = document.getElementById("perfilExperiencia");
    const perfilEmail = document.getElementById("perfilEmail");
    const perfilUbicacion = document.getElementById("perfilUbicacion");

    if (perfilNombre) perfilNombre.textContent = aspirante.nombre;
    if (perfilProfesion) perfilProfesion.textContent = aspirante.profesion;
    if (perfilEstado) perfilEstado.textContent = aspirante.estado;
    if (perfilExperiencia) perfilExperiencia.textContent = aspirante.experiencia;
    if (perfilEmail) perfilEmail.textContent = aspirante.email;
    if (perfilUbicacion) perfilUbicacion.textContent = aspirante.ubicacion;
}

// Iniciar proceso de contratación
function iniciarProceso(aspiranteId) {
    const aspirante = aspirantesNuevos.find(a => a.id === aspiranteId);
    
    if (!aspirante) {
        showError('Aspirante no encontrado');
        return;
    }

    if (confirm(`¿Deseas iniciar el proceso de contratación con ${aspirante.nombre}?`)) {
        // Mover de nuevos a matches
        aspirantesNuevos = aspirantesNuevos.filter(a => a.id !== aspiranteId);
        aspirantesMatch.push(aspirante);
        // Recargar tablas
        const tablaMatch = document.getElementById("tablaMatch");
        const tablaNuevos = document.getElementById("tablaNuevos");

        if (tablaMatch && tablaNuevos) {
            tablaMatch.innerHTML = "";
            tablaNuevos.innerHTML = "";

            aspirantesMatch.forEach(a => {
                tablaMatch.innerHTML += crearFilaAspirante(a, "match");
            });

            aspirantesNuevos.forEach(a => {
                tablaNuevos.innerHTML += crearFilaAspirante(a, "nuevo");
            });
        }

        showSuccess(`Proceso iniciado con ${aspirante.nombre}`);
    }
}

// MENSAJES Y NOTIFICACIONES
function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill me-2"> </i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"> </button>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"> </i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"> </button>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// EXPORTAR FUNCIONES GLOBALES
window.verAspirantes = verAspirantes;
window.verPerfil = verPerfil;
window.iniciarProceso = iniciarProceso;