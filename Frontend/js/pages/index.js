// index.js (frontend puro)

document.addEventListener("DOMContentLoaded", () => {
  renderCandidate();
});

function renderCandidate() {
  const candidate = JSON.parse(localStorage.getItem("currentUser"));

  // Si no hay sesión o no es candidato, no renderizar
  if (!candidate || candidate.role !== "candidate") return;

  // Render datos básicos
  document.querySelector("[data-user-name]").textContent = candidate.name;
  document.querySelector("[data-user-email]").textContent = candidate.email;
  document.querySelector("[data-user-active]").textContent =
    candidate.isOpen ? "Activo" : "Inactivo";

  const btn = document.querySelector("[data-user-work]");
  btn.textContent = candidate.isOpen ? "Desactivar" : "Activar";

  // Toggle estado laboral
  btn.addEventListener("click", async () => {
    candidate.isOpen = !candidate.isOpen;

    // Persistir local
    localStorage.setItem("currentUser", JSON.stringify(candidate));

    // Actualizar UI
    document.querySelector("[data-user-active]").textContent =
      candidate.isOpen ? "Activo" : "Inactivo";
    btn.textContent = candidate.isOpen ? "Desactivar" : "Activar";

    // (Opcional pero recomendado) sincronizar con backend
    try {
      await fetch(`http://127.0.0.1:3000/candidates/${candidate.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOpen: candidate.isOpen })
      });
    } catch (err) {
      console.error("Error sincronizando estado:", err);
    }
  });
}
