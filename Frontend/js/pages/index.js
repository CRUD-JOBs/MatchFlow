import Candidate from "../models/Candidate.js";

const renderCandidate = async () => {
    const candidate = Candidate.createCandidate(
        JSON.parse(sessionStorage.getItem("currentUser"))
    );

    console.log(candidate);

    if (candidate === null) return;

    const message = document.getElementById("profileMessage");

    const nameEl = document.querySelector("[data-user-name]");
    const activeBadge = document.querySelector("[data-user-active]");
    const emailEl = document.querySelector("[data-user-email]");
    const phoneEl = document.querySelector("[data-user-phone]");
    const cityEl = document.querySelector("[data-user-city]");

    nameEl.textContent = candidate.name;
    emailEl.textContent = candidate.email;
    phoneEl.textContent = candidate.phone || "No registrado";
    cityEl.textContent = candidate.city || "No registrada";

    activeBadge.textContent = candidate.isOpen ? "Activo" : "Inactivo";
    activeBadge.className = candidate.isOpen
        ? "badge bg-success"
        : "badge bg-secondary";

    const btn = document.querySelector("[data-user-work]");
    btn.textContent = candidate.isOpen ? "Desactivar" : "Activar";

    btn.addEventListener("click", async () => {
        if (candidate.isOpen) {
            await candidate.closeToWork();
            btn.textContent = "Activar";

            activeBadge.textContent = "Inactivo";
            activeBadge.className = "badge bg-secondary";
        } else {
            await candidate.openToWork();
            btn.textContent = "Desactivar";

            activeBadge.textContent = "Activo";
            activeBadge.className = "badge bg-success";
        }

        sessionStorage.setItem("currentUser", JSON.stringify(candidate));
    });

    const editBtn = document.querySelector("[data-edit-profile]");
    let isEditing = false;

    editBtn.addEventListener("click", () => {
        if (!isEditing) {
            convertNameToInput();
            convertEmailToInput();
            convertPhoneToInput();
            convertCityToInput();

            editBtn.textContent = "Guardar cambios";
            isEditing = true;
        } else {
            getEditedValues();
            restoreProfileView();

            editBtn.textContent = "Editar perfil";
            isEditing = false;

            
            message.textContent = "Perfil actualizado correctamente ✅";
            message.className = "text-success mt-2";

            setTimeout(() => {
                message.textContent = "";
            }, 3000);
        }
    });
};



function convertNameToInput() {
    convertToInput("[data-user-name]", "text");
}

function convertEmailToInput() {
    convertToInput("[data-user-email]", "email");
}

function convertPhoneToInput() {
    convertToInput("[data-user-phone]", "tel");
}

function convertCityToInput() {
    convertToInput("[data-user-city]", "text");
}

function convertToInput(selector, type) {
    const element = document.querySelector(selector);
    const value = element.textContent.trim();

    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.className = "form-control";
    input.setAttribute(selector.replace("[", "").replace("]", ""), "");

    element.replaceWith(input);
}


function getEditedValues() {
    const candidate = JSON.parse(sessionStorage.getItem("currentUser"));

    candidate.name = document.querySelector("[data-user-name]").value;
    candidate.email = document.querySelector("[data-user-email]").value;
    candidate.phone = document.querySelector("[data-user-phone]").value;
    candidate.city = document.querySelector("[data-user-city]").value;

    sessionStorage.setItem("currentUser", JSON.stringify(candidate));

    console.log("DATOS EDITADOS:", candidate);
}


function restoreProfileView() {
    restoreField("[data-user-name]");
    restoreField("[data-user-email]");
    restoreField("[data-user-phone]");
    restoreField("[data-user-city]");
}

function restoreField(selector) {
    const input = document.querySelector(selector);
    if (!input) return;

    const p = document.createElement("p");
    p.textContent = input.value || "No registrado";

    const attr = selector.replace("[", "").replace("]", "");
    p.setAttribute(attr, "");

    input.replaceWith(p);
}


document.addEventListener("DOMContentLoaded", renderCandidate);
