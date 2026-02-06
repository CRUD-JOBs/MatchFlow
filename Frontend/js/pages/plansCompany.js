import Company from "../classes/Company.js";
import { getCurrentSession } from "../api.js";

document.addEventListener("DOMContentLoaded", async () => {
// Obtener sesión actual
const session = getCurrentSession();


// Validar que haya login y que sea empresa
if (!session || session.role !== "company") {
    alert("You must log in as a company first");
    window.location.href = "/login.html";
    return;
}

// Obtener objeto empresa
const company = await Company.getCompany(session.id);

if (!company) {
    alert("Error loading company data");
    return;
}

// FREE PLAN
document.getElementById("companyPlanFree").addEventListener("click", async () => {
    await company.changePlan("free");
    alert("Free plan activated");
    window.location.href = "/dashboard.html";
});

// PRO PLAN
document.getElementById("companyPlanPro").addEventListener("click", async () => {
    await company.changePlan("pro");
    alert("Pro plan activated");
    window.location.href = "/dashboard.html";
});

// PREMIUM PLAN
document.getElementById("companyPlanPremium").addEventListener("click", async () => {
    await company.changePlan("premium");
    alert("Premium plan activated");
    window.location.href = "/dashboard.html";
});


});
