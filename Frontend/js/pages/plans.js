import Candidate from "../models/Candidate.js";
import { getCurrentSession, isAuthenticated } from "../api.js";

// Verificar sesión
if (!isAuthenticated()) {
    alert("You must log in first");
    window.location.href = "./login.html";
}

// Obtener usuario logueado
const session = getCurrentSession();

// Solo candidatos pueden cambiar plan
if (session.role !== "candidate") {
    alert("Only candidates can access this page");
    window.location.href = "./dashboard.html";
}

// Función para cambiar plan
async function selectPlan(planName) {
    try {
        const candidate = await Candidate.getCandidate(session.id);

        if (!candidate) {
            alert("Error loading candidate");
            return;
        }

        // Evitar cambiar al mismo plan
        if (candidate.plan === planName) {
            alert("You already have this plan");
            return;
        }

        await candidate.changePlan(planName);

        alert("Plan updated to: " + planName);

        // Redirigir al perfil
        window.location.href = "./";
    } catch (error) {
        console.error(error);
        alert("Error updating plan");
    }
}

// Botones
document.getElementById("planFree")
    .addEventListener("click", () => selectPlan("free"));

document.getElementById("planPro")
    .addEventListener("click", () => selectPlan("pro1"));

document.getElementById("planPremium")
    .addEventListener("click", () => selectPlan("pro2"));
